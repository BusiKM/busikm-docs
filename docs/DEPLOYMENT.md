# Wdrazanie i srodowiska - BusiKM

## Spis tresci

1. [Przeglad srodowisk](#1-przeglad-srodowisk)
2. [Srodowisko lokalne (Docker Compose)](#2-srodowisko-lokalne-docker-compose)
3. [CI/CD - GitHub Actions](#3-cicd---github-actions)
4. [Srodowisko stagingowe](#4-srodowisko-stagingowe)
5. [Srodowisko produkcyjne](#5-srodowisko-produkcyjne)
6. [Wdrazanie aplikacji mobilnej](#6-wdrazanie-aplikacji-mobilnej)
7. [Procedura rollback](#7-procedura-rollback)
8. [Zmienne srodowiskowe - referencja](#8-zmienne-srodowiskowe---referencja)
9. [Checklista przed wdrozeniem](#9-checklista-przed-wdrozeniem)
10. [Checklista po wdrozeniu](#10-checklista-po-wdrozeniu)
11. [Procedura hotfix](#11-procedura-hotfix)

---

## 1. Przeglad srodowisk

BusiKM dziala w trzech srodowiskach:

| Srodowisko  | Cel                          | Domena                    | Deploy                  |
|-------------|------------------------------|---------------------------|-------------------------|
| Local       | Rozwoj i debugowanie         | localhost:8000 / :3000    | Docker Compose          |
| Staging     | Testy integracyjne i QA      | api-staging.busikm.pl     | Auto-deploy (staging)   |
| Production  | Uzytkowicy koncowi           | api.busikm.pl             | Manual approval (main)  |

Kazde srodowisko posiada wlasne bazy danych, zmienne konfiguracyjne i klucze API.
Zasada: **kod nigdy nie trafia na produkcje bez przejscia przez staging**.

---

## 2. Srodowisko lokalne (Docker Compose)

### 2.1. Architektura uslug

Srodowisko lokalne sklada sie z 12+ uslug zdefiniowanych w Docker Compose:

| Usluga          | Obraz / Budowa       | Port  | Opis                                    |
|-----------------|----------------------|-------|-----------------------------------------|
| web             | build: .             | 8000  | Django/Daphne (HTTP + WebSocket)        |
| celery          | build: .             | -     | Worker Celery (kolejki default, gps)    |
| celery-beat     | build: .             | -     | Scheduler Celery Beat                   |
| celery-reports  | build: .             | -     | Worker Celery (kolejka reports)         |
| postgres        | postgres:16          | 5432  | Baza danych PostgreSQL + PostGIS        |
| redis           | redis:7-alpine       | 6379  | Cache, broker Celery, Channel Layer     |
| mongo           | mongo:7              | 27017 | Przechowywanie punktow GPS             |
| minio           | minio/minio          | 9000  | S3-kompatybilny storage (pliki, raporty)|
| minio-init      | minio/mc             | -     | Inicjalizacja bucketow MinIO           |
| prometheus      | prom/prometheus       | 9090  | Zbieranie metryk                        |
| grafana         | grafana/grafana      | 3001  | Wizualizacja metryk i dashboardy       |
| uptime-kuma     | louislam/uptime-kuma | 3002  | Monitoring dostepnosci uslug           |

### 2.2. Pliki konfiguracyjne

- **docker-compose.yml** - glowna definicja uslug, sieci i wolumenow
- **docker-compose.override.yml** - nadpisania lokalne (mount kodu zrodlowego, debug, porty deweloperskie)
- **.env** - zmienne srodowiskowe (nie commitowane do repozytorium)

### 2.3. Komendy Makefile

Projekt uzywa Makefile do uproszczenia codziennych operacji:

```bash
# Uruchamianie i zatrzymywanie
make up              # docker compose up -d (wszystkie uslugi)
make down            # docker compose down
make restart         # docker compose restart

# Baza danych
make migrate         # python manage.py migrate
make makemigrations  # python manage.py makemigrations
make seed            # Zaladowanie danych testowych

# Rozwoj
make shell           # python manage.py shell_plus
make bash            # bash w kontenerze web
make logs            # docker compose logs -f

# Testowanie
make test            # pytest z pokryciem kodu
make test-fast       # pytest bez pokrycia (szybszy)
make lint            # black + isort + mypy (sprawdzenie)
make format          # black + isort (autoformatowanie)

# Inne
make collectstatic   # Zebranie plikow statycznych
make createsuperuser # Utworzenie konta admina
```

### 2.4. Pierwsze uruchomienie

```bash
git clone git@github.com:busikm/busikm-backend.git
cd busikm-backend
cp .env.example .env        # Uzupelnic wartosci
make up                     # Uruchomienie uslug
make migrate                # Migracje bazy danych
make seed                   # Dane testowe
make createsuperuser        # Konto admina
```

---

## 3. CI/CD - GitHub Actions

Kazde repozytorium posiada wlasne pipeline'y CI/CD w GitHub Actions.

### 3.1. Backend (busikm-backend)

```
push/PR --> lint (black, isort, mypy) --> test (pytest) --> build (Docker) --> deploy
```

- **Lint**: sprawdzenie formatowania (black --check), importow (isort --check), typow (mypy)
- **Test**: pytest z serwisami PostgreSQL, Redis i MongoDB uruchomionymi jako GitHub Actions services
- **Build**: budowanie obrazu Docker, push do container registry
- **Deploy**: wdrozenie na staging (auto) lub produkcje (manual approval)

### 3.2. Aplikacja mobilna (busikm-mobile)

```
push/PR --> lint (eslint, tsc) --> test (jest) --> EAS build
```

- **Lint**: ESLint + TypeScript compiler check
- **Test**: Jest z React Native Testing Library
- **EAS Build**: budowanie przez Expo Application Services (development/staging/production)

### 3.3. Aplikacja webowa (busikm-web)

```
push/PR --> lint (eslint, tsc) --> test (jest/vitest) --> build (Next.js) --> Vercel deploy
```

- **Lint**: ESLint + TypeScript compiler check
- **Test**: testy jednostkowe i integracyjne
- **Build**: Next.js build z optymalizacja
- **Deploy**: Vercel auto-deploy (preview dla PR, staging/production dla galezi)

### 3.4. Skanowanie bezpieczenstwa

Cotygodniowe skanowanie uruchamiane przez cron w GitHub Actions:

- **bandit** - statyczna analiza bezpieczenstwa kodu Python
- **pip-audit** - sprawdzenie znanych podatnosci w zaleznosach Python
- **npm audit** - sprawdzenie znanych podatnosci w zaleznosach JavaScript/TypeScript

Wyniki raportowane jako GitHub Security Alerts. Krytyczne podatnosci blokuja deploy.

---

## 4. Srodowisko stagingowe

### 4.1. Infrastruktura

| Komponent       | Usluga                    | Konfiguracja              |
|-----------------|---------------------------|---------------------------|
| Backend         | Cloud (kontener Docker)   | 1x instancja Django/Daphne|
| PostgreSQL      | Managed database          | z rozszerzeniem PostGIS    |
| Redis           | Managed Redis             | Pojedyncza instancja      |
| MongoDB         | MongoDB Atlas             | Klaster M10               |
| Storage         | S3 (bucket staging)       | Osobny bucket             |
| DNS             | api-staging.busikm.pl     | Cloudflare DNS            |
| Web             | staging.busikm.pl         | Vercel (preview)          |
| SSL             | Cloudflare                | Certyfikat automatyczny   |
| Email           | Mailtrap                  | Przechwytywanie emaili    |

### 4.2. Deploy

- **Trigger**: push do galezi `staging`
- **Proces**: automatyczny (bez manual approval)
- **Dane**: seed data ladowane po kazdym resetowaniu bazy
- **Email**: Mailtrap przechwytuje wszystkie emaile (brak wysylki do prawdziwych uzytkownikow)

### 4.3. Dostep

- API: `https://api-staging.busikm.pl`
- Web: `https://staging.busikm.pl`
- Dane logowania testowe dostepne w dokumentacji zespolu

---

## 5. Srodowisko produkcyjne

### 5.1. Infrastruktura

| Komponent       | Usluga                    | Konfiguracja               |
|-----------------|---------------------------|----------------------------|
| Backend         | Cloud (kontener Docker)   | 2x instancja Django/Daphne |
| Celery Workers  | Cloud (kontenery Docker)  | 2x worker (default+gps, reports) |
| Celery Beat     | Cloud (kontener Docker)   | 1x scheduler               |
| PostgreSQL      | Managed database          | HA z automatycznym failover|
| Redis           | Managed Redis             | HA z replikami              |
| MongoDB         | MongoDB Atlas             | Klaster M30 (HA)           |
| Storage         | S3                        | Szyfrowanie at-rest        |
| CDN/WAF         | Cloudflare                | WAF, DDoS protection, SSL  |
| Web             | Vercel                    | Edge network               |
| Mobile          | EAS + App Store / Play    | Dystrybucja produkcyjna    |

### 5.2. Proces deploy

```
push to main --> GitHub Actions --> manual approval --> build --> deploy --> migrate --> smoke test --> Slack notification
```

1. **Push do main** - merge PR do galezi glownej
2. **GitHub Actions** - uruchomienie pelnego pipeline'u (lint, test, build)
3. **Manual approval** - wymagana akceptacja w GitHub Environment (`production`)
4. **Build** - budowanie obrazu Docker z tagiem wersji
5. **Deploy** - wdrozenie nowego obrazu (rolling update)
6. **Migrate** - automatyczne uruchomienie migracji bazy danych
7. **Smoke test** - automatyczne testy zdrowia (health check, kluczowe endpointy)
8. **Slack notification** - powiadomienie zespolu o statusie wdrozenia

### 5.3. Domeny produkcyjne

- API: `https://api.busikm.pl`
- Web: `https://busikm.pl` / `https://www.busikm.pl`
- Status: `https://status.busikm.pl`

---

## 6. Wdrazanie aplikacji mobilnej

### 6.1. Profile EAS Build

| Profil        | Kanal Updates  | Dystrybucja           | Zastosowanie         |
|---------------|----------------|-----------------------|----------------------|
| development   | development    | Wewnetrzna (APK/sim)  | Rozwoj lokalny       |
| staging       | staging        | TestFlight / APK      | Testy QA             |
| production    | production     | App Store / Play Store| Uzytkowicy koncowi   |

### 6.2. Dystrybucja

- **iOS**: TestFlight (staging), App Store (production)
- **Android**: APK wewnetrzna dystrybucja (staging), Google Play Store (production)

### 6.3. OTA Updates (Expo Updates)

Aktualizacje JavaScript/TypeScript bez koniecznosci nowego builda natywnego:

```bash
# Publikacja OTA update na kanal staging
eas update --branch staging --message "Fix: poprawka wyswietlania trasy"

# Publikacja OTA update na kanal produkcyjny
eas update --branch production --message "Fix: poprawka wyswietlania trasy"
```

Kazdy kanal odpowiada profilowi builda. Aplikacja sprawdza dostepnosc aktualizacji przy starcie.

---

## 7. Procedura rollback

### 7.1. Backend

**Opcja A - poprzedni obraz Docker:**
```bash
# Wdrozenie poprzedniej wersji obrazu
deploy --image busikm-backend:previous-tag
```

**Opcja B - git revert:**
```bash
git revert HEAD
git push origin main
# Pipeline CI/CD wdrozy poprawiony kod
```

W przypadku problemow z migracja bazy - reczne uruchomienie `migrate --reverse` do poprzedniej migracji.

### 7.2. Aplikacja webowa (Vercel)

Vercel umozliwia natychmiastowy rollback do dowolnego poprzedniego deployu:
- Dashboard Vercel --> Deployments --> Promote to Production

Czas rollbacku: **< 30 sekund**.

### 7.3. Aplikacja mobilna

- **OTA rollback**: publikacja poprzedniej wersji JS bundle na odpowiedni kanal
- **Nowy build**: w przypadku zmian natywnych - nowy build i dystrybucja przez TestFlight/Play Store

---

## 8. Zmienne srodowiskowe - referencja

### 8.1. Backend (Django)

| Zmienna                    | Opis                                  | Przyklad                              |
|----------------------------|---------------------------------------|---------------------------------------|
| `SECRET_KEY`               | Klucz tajny Django                    | `django-insecure-xxx` (tylko local)   |
| `DEBUG`                    | Tryb debugowania                      | `True` / `False`                      |
| `ALLOWED_HOSTS`            | Dozwolone hosty                       | `api.busikm.pl,localhost`             |
| `DATABASE_URL`             | URL bazy PostgreSQL                   | `postgres://user:pass@host:5432/db`   |
| `REDIS_URL`                | URL serwera Redis                     | `redis://host:6379/0`                 |
| `MONGO_URL`                | URL serwera MongoDB                   | `mongodb://host:27017/busikm`         |
| `CELERY_BROKER_URL`        | URL brokera Celery                    | `redis://host:6379/1`                 |
| `AWS_ACCESS_KEY_ID`        | Klucz dostepu S3                      | `AKIAIOSFODNN7EXAMPLE`                |
| `AWS_SECRET_ACCESS_KEY`    | Tajny klucz S3                        | `wJalrXUtnFEMI/K7MDENG/...`          |
| `AWS_STORAGE_BUCKET_NAME`  | Nazwa bucketu S3                      | `busikm-production`                   |
| `AWS_S3_ENDPOINT_URL`      | Endpoint S3 (MinIO lokalnie)          | `http://minio:9000`                   |
| `SENTRY_DSN`               | DSN projektu Sentry                   | `https://xxx@sentry.io/yyy`           |
| `SENTRY_ENVIRONMENT`       | Srodowisko Sentry                     | `production` / `staging`              |
| `CORS_ALLOWED_ORIGINS`     | Dozwolone originy CORS                | `https://busikm.pl`                   |
| `CSRF_TRUSTED_ORIGINS`     | Zaufane originy CSRF                  | `https://busikm.pl`                   |
| `EMAIL_BACKEND`            | Backend emailowy Django               | `django.core.mail.backends.smtp...`   |
| `EMAIL_HOST`               | Host serwera SMTP                     | `smtp.mailgun.org`                    |
| `EMAIL_PORT`               | Port SMTP                             | `587`                                 |
| `EMAIL_HOST_USER`          | Uzytkownik SMTP                       | `postmaster@busikm.pl`               |
| `EMAIL_HOST_PASSWORD`      | Haslo SMTP                            | `***`                                 |
| `EXPO_PUSH_TOKEN_KEY`      | Klucz do push notifications Expo      | `ExponentPushToken[xxx]`              |
| `DJANGO_SUPERUSER_EMAIL`   | Email superusera (seed)               | `admin@busikm.pl`                     |
| `DJANGO_SUPERUSER_PASSWORD`| Haslo superusera (seed)               | `***`                                 |

---

## 9. Checklista przed wdrozeniem

### Pre-deploy checklist

- [ ] Wszystkie testy CI przeszly pomyslnie (lint, test, build)
- [ ] PR zostal zatwierdzony przez co najmniej 1 reviewera
- [ ] Migracje bazy danych sa kompatybilne wstecz (zero-downtime)
- [ ] Zmienne srodowiskowe zostaly zaktualizowane (jesli wymagane)
- [ ] Dokumentacja API zaktualizowana (jesli zmieniono endpointy)
- [ ] Changelog zaktualizowany
- [ ] Staging przetestowany reczne przez QA
- [ ] Brak krytycznych alertow w Sentry na staging
- [ ] Feature flags ustawione poprawnie
- [ ] Komunikacja z zespolem o planowanym wdrozeniu

---

## 10. Checklista po wdrozeniu

### Post-deploy monitoring checklist

- [ ] Health check endpointu zwraca 200 OK
- [ ] Smoke testy przeszly pomyslnie
- [ ] Brak nowych bledow w Sentry (5 minut obserwacji)
- [ ] Metryki Grafana w normie (latency, error rate, CPU, memory)
- [ ] Uptime Kuma - wszystkie monitory zielone
- [ ] Celery workers dzialaja (sprawdzenie flower/logs)
- [ ] WebSocket polaczenia dzialaja
- [ ] Losowe testy reczne kluczowych funkcji
- [ ] Potwierdzenie na Slack o pomyslnym wdrozeniu
- [ ] Monitorowanie przez 30 minut po wdrozeniu

---

## 11. Procedura hotfix

W przypadku krytycznego bledu na produkcji:

### Krok po kroku

1. **Branch**: utworzenie galezi `hotfix/opis-bledu` z `main`
2. **Fix**: implementacja poprawki z minimalnym zakresem zmian
3. **PR**: utworzenie Pull Request z opisem problemu i rozwiazania
4. **Review**: wymagana **1 akceptacja** (przyspieszona procedura)
5. **Merge**: merge do `main`
6. **Deploy**: deploy na produkcje (manual approval w GitHub Environment)
7. **Weryfikacja**: sprawdzenie poprawki na produkcji
8. **Cherry-pick**: przeniesienie poprawki na galaz `staging` i `develop`

```bash
# Przyklad procedury hotfix
git checkout main
git pull origin main
git checkout -b hotfix/fix-gps-parsing

# ... implementacja poprawki ...

git add .
git commit -m "hotfix: fix GPS coordinate parsing for edge case"
git push origin hotfix/fix-gps-parsing

# Po merge do main i deploy na produkcje:
git checkout staging
git cherry-pick <commit-hash>
git push origin staging

git checkout develop
git cherry-pick <commit-hash>
git push origin develop
```

### Zasady hotfix

- Hotfix dotyczy **wylacznie krytycznych bledow** na produkcji
- Minimalny zakres zmian - tylko to co niezbedne
- Przyspieszone review (1 zamiast 2 akceptacji)
- Obowiazkowe cherry-pick na staging i develop
- Post-mortem po kazdym hotfixie (co poszlo nie tak, jak zapobiec w przyszlosci)
