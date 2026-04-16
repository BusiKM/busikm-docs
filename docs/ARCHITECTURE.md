# BusiKM - Architektura Techniczna

> Dokument opisuje architekture systemu BusiKM - platformy do zarzadzania
> ewidencja przebiegu pojazdow dla firm i biur rachunkowych.

---

## 1. Diagram architektury systemu

```
+---------------------+     +---------------------+
|   Aplikacja Mobile  |     |    Panel Webowy      |
|  (React Native /    |     |  (Next.js 14 /       |
|   Expo SDK 52+)     |     |   Vercel)            |
+----------+----------+     +----------+----------+
           |                           |
           |        HTTPS/WSS          |
           +----------+   +------------+
                      |   |
                      v   v
              +-------+---+--------+
              |   API Gateway /    |
              |   Daphne (ASGI)    |
              |   port 8000        |
              +--------+-----------+
                       |
          +------------+-------------+
          |                          |
          v                          v
+---------+----------+   +-----------+---------+
|  Django 5.x + DRF  |   |  Celery Workers     |
|  drf-spectacular    |   |  - default          |
|  RBAC / Middleware  |   |  - reports           |
+----+-----+----+----+   |  Celery Beat (cron) |
     |     |    |         +--+-------+----------+
     |     |    |            |       |
     v     v    v            v       v
+----+-+ +-+----+-+  +------+--+ +--+-------+
| PG16 | | Mongo7 |  | Redis 7 | | S3/MinIO |
| rel. | | GPS /  |  | cache   | | pliki    |
| data | | logi   |  | broker  | | PDF/img  |
+------+ +--------+  | blackl. | +----------+
                      +---------+
```

---

## 2. Stack technologiczny

| Warstwa       | Technologia                          | Uzasadnienie                                                      |
|---------------|--------------------------------------|-------------------------------------------------------------------|
| Backend       | Django 5.x + DRF                     | Dojrzaly ekosystem, ORM, migracje, wbudowany admin                |
| API Docs      | drf-spectacular (OpenAPI 3.0)        | Automatyczna dokumentacja, generowanie klienta TS                 |
| Async/WS      | Daphne (ASGI)                        | WebSocket dla powiadomien w czasie rzeczywistym                   |
| Task Queue    | Celery + Celery Beat                 | Raporty PDF, obliczenia dystansu, zadania cykliczne               |
| Mobile        | React Native + Expo SDK 52+          | Jeden codebase iOS/Android, OTA updates, EAS Build                |
| Routing (mob) | Expo Router v4                       | File-based routing, deep linking, typowane sciezki                |
| State (mob)   | Zustand                              | Lekki, minimalny boilerplate, kompatybilny z React Native         |
| HTTP (mob)    | Axios                                | Interceptory, automatyczny refresh tokenow                        |
| Web           | Next.js 14 App Router                | SSR/SSG, React Server Components, optymalizacja SEO               |
| CSS           | Tailwind CSS                         | Utility-first, szybki prototyping, brak CSS-in-JS runtime         |
| Data (web)    | SWR                                  | Cache-first fetching, rewalidacja, mutacje optymistyczne          |
| Wykresy       | Recharts                             | Deklaratywne wykresy React, responsywnosc                         |
| Mapy          | Mapbox GL                            | Wizualizacja tras GPS, klastry, heatmapy                          |
| DB relacyjna  | PostgreSQL 16                        | ACID, partycjonowanie, full-text search, JSON support             |
| DB dokumentowa| MongoDB 7                            | Dane GPS/logi - elastyczny schemat, geo-indeksy, time-series      |
| Cache/Broker  | Redis 7                              | Cache sesji, broker Celery, blacklist JWT, kontekst AF             |
| Storage       | S3 (DigitalOcean Spaces) / MinIO     | Kompatybilnosc S3 API, MinIO lokalnie, Spaces na produkcji        |
| Monitoring    | Sentry + Prometheus + Grafana        | Bledy (Sentry), metryki (Prometheus), dashboardy (Grafana)        |
| Uptime        | Uptime Kuma                          | Monitoring dostepnosci endpointow, alerty                         |
| CI/CD         | GitHub Actions + EAS Build + Vercel  | Automatyzacja buildow, deploymentow, testow                       |

---

## 3. Backend (Django + DRF + Celery + Daphne)

### 3.1 Struktura projektu

```
backend/
  config/           # settings, urls, asgi/wsgi, celery
  apps/
    accounts/       # User, Company, Role, auth JWT
    vehicles/       # Vehicle, VehicleDocument
    trips/          # Trip, GPSPoint, DistanceCalculation
    reports/        # Report, PDFExport, ReportSchedule
    integrations/   # AbstractFKIntegration, providers
    notifications/  # WebSocket consumers, push
  core/             # mixins, permissions, generators, middleware
```

### 3.2 Django + DRF

- **Django 5.x** - framework backendowy z ORM, migracjami i panelem admin.
- **DRF** - serializatory, viewsety, paginacja (CursorPagination dla list GPS).
- **drf-spectacular** - generowanie schematu OpenAPI 3.0, UI Swagger/Redoc.
- Kazdy viewset dziedziczy po `CompanyScopedMixin` (filtrowanie po firmie).
- Uprawnienia oparte na `RBAC` z czterema rolami systemowymi.

### 3.3 Celery + Celery Beat

Trzy kolejki workerow:

| Worker          | Kolejka       | Zadania                                          |
|-----------------|---------------|--------------------------------------------------|
| celery-default  | `default`     | Powiadomienia, e-maile, integracje FK            |
| celery-reports  | `reports`     | Generowanie PDF (WeasyPrint), eksporty CSV/XLSX  |
| celery-beat     | (scheduler)   | Raporty cykliczne, czyszczenie tokenow, backupy  |

### 3.4 Daphne (ASGI/WebSocket)

- Daphne obsluguje polaczenia WebSocket dla powiadomien real-time.
- Django Channels z warstwami Redis jako channel layer.
- Consumers: `NotificationConsumer`, `TripTrackingConsumer`.
- Autentykacja WS przez token JWT w query string.

---

## 4. Mobile (React Native + Expo)

### 4.1 Architektura

```
mobile/
  app/                  # Expo Router v4 (file-based routing)
    (auth)/             # ekrany logowania/rejestracji
    (tabs)/             # glowna nawigacja tabowa
      trips/            # lista/szczegoly przejazdow
      vehicles/         # zarzadzanie pojazdami
      reports/          # raporty i eksporty
      settings/         # ustawienia profilu
  components/           # komponenty wspoldzielone
  stores/               # Zustand stores
  services/             # API client (Axios), GPS service
  hooks/                # custom hooks
```

### 4.2 Kluczowe mechanizmy

- **Expo SDK 52+** z prebuildowanymi modolami natywnymi.
- **Expo Router v4** - nawigacja oparta na plikach, typowane parametry tras.
- **Zustand** - stan globalny: `useAuthStore`, `useTripStore`, `useSettingsStore`.
- **Axios** z interceptorami - automatyczny refresh JWT, retry na 401.
- **expo-location** - sledzenie GPS w tle (background location tracking).
- **expo-task-manager** - zadania w tle dla rejestracji punktow GPS.
- **EAS Build** - natywne buildy iOS/Android w chmurze.
- **OTA Updates** - aktualizacje JS bez przechodzenia przez App Store.

---

## 5. Web (Next.js 14)

### 5.1 Architektura

```
web/
  app/
    (auth)/             # logowanie, rejestracja
    (dashboard)/        # panel glowny
      trips/            # przejazdy - tabela, filtry, mapa
      vehicles/         # flota pojazdow
      reports/          # raporty z wykresami (Recharts)
      company/          # ustawienia firmy, uzytkownicy
      integrations/     # konfiguracja FK
    api/                # route handlers (proxy/BFF)
  components/           # shadcn/ui + komponenty wlasne
  lib/                  # API client, utilities, hooks
```

### 5.2 Kluczowe mechanizmy

- **App Router** - React Server Components, streaming, Suspense.
- **SWR** - fetching danych z automatyczna rewalidacja i cache.
- **Tailwind CSS** - utility-first styling, ciemny motyw, responsywnosc.
- **Recharts** - wykresy: przebieg miesieczny, koszty, porownania pojazdow.
- **Mapbox GL** - wizualizacja tras na mapie, heatmapy intensywnosci.
- **Generowany klient API** (orval) - typowany, zsynchronizowany ze schema OpenAPI.

---

## 6. Strategia bazodanowa

### 6.1 Rozdzial odpowiedzialnosci

```
+------------------+    +------------------+    +------------------+
|  PostgreSQL 16   |    |   MongoDB 7      |    |    Redis 7       |
+------------------+    +------------------+    +------------------+
| - Uzytkownicy    |    | - Punkty GPS     |    | - Cache sesji    |
| - Firmy          |    | - Logi aktywnosci|    | - Broker Celery  |
| - Pojazdy        |    | - Surowe dane    |    | - JWT blacklist  |
| - Przejazdy      |    |   telemetryczne  |    | - Kontekst AF    |
| - Raporty        |    | - Audyt zmian    |    | - Rate limiting  |
| - Integracje FK  |    |                  |    | - Channel layer  |
| - Uprawnienia    |    |                  |    |   (WebSocket)    |
+------------------+    +------------------+    +------------------+
    ACID / ORM             Geo-indeksy            TTL / Pub-Sub
    Migracje               Time-series            In-memory
```

### 6.2 Przepyw danych GPS

```
Telefon (GPS)
     |
     v
POST /api/trips/{id}/gps-points/
     |
     v
Django (walidacja, serializacja)
     |
     +---> MongoDB (zapis surowych punktow GPS)
     |
     v
Celery task: calculate_distance
     |
     +---> Odczyt punktow z MongoDB
     |     Algorytm: Haversine + filtr Kalmana
     |
     +---> PostgreSQL (update Trip.distance_km)
     |
     +---> WebSocket: powiadomienie o aktualizacji
```

---

## 7. Storage (S3 / MinIO)

- **Produkcja**: DigitalOcean Spaces (kompatybilne z S3 API).
- **Lokal/dev**: MinIO w kontenerze Docker.
- **django-storages** - jednolity interfejs `default_file_storage`.

Przechowywane obiekty:

| Bucket / prefix     | Zawartosc                              |
|----------------------|----------------------------------------|
| `media/avatars/`     | Zdjecia profilowe uzytkownikow         |
| `media/documents/`   | Skany dokumentow pojazdow              |
| `reports/pdf/`       | Wygenerowane raporty PDF               |
| `reports/csv/`       | Eksporty CSV/XLSX                      |
| `backups/`           | Kopie zapasowe baz danych              |

Pliki sa podpisywane (presigned URLs) z TTL 15 minut.

---

## 8. Wzorce architektoniczne

### 8.1 RBAC - Role-Based Access Control

Cztery role systemowe:

| Rola              | Opis                                  | Uprawnienia                            |
|-------------------|---------------------------------------|----------------------------------------|
| `driver`          | Kierowca                              | CRUD wlasnych przejazdow, odczyt auta  |
| `owner`           | Wlasciciel firmy                      | Pelny dostep do zasobow firmy          |
| `accountant`      | Ksiegowy wewnetrzny                   | Raporty, przejazdy, pojazdy (RO)       |
| `accounting_firm` | Biuro rachunkowe                      | Dostep do wielu firm klientow          |

Implementacja: custom permission classes DRF (`IsDriver`, `IsOwner`, `IsAccountant`,
`IsAccountingFirm`) + dekoratory na viewsetach.

### 8.2 CompanyScopedMixin

```python
class CompanyScopedMixin:
    """Automatyczne filtrowanie querysetu po firmie uzytkownika."""

    def get_queryset(self):
        qs = super().get_queryset()
        return qs.filter(company=self.request.user.active_company)
```

Kazdy viewset operujacy na danych firmowych dziedziczy po tym mixinie.
Eliminuje ryzyko wycieku danych miedzy firmami (tenant isolation).

### 8.3 TenantContextMiddleware

Middleware dla roli `accounting_firm` - biuro rachunkowe obslugujace wielu klientow.

```python
class TenantContextMiddleware:
    """Przelaczanie kontekstu firmy dla biur rachunkowych."""

    def __call__(self, request):
        if request.user.role == 'accounting_firm':
            company_id = request.headers.get('X-Company-Context')
            # Walidacja: czy AF ma dostep do tej firmy
            request.user.active_company = self._resolve(company_id)
        # Kontekst przechowywany w Redis (TTL 8h)
```

### 8.4 AbstractFKIntegration

Wzorzec Strategy dla integracji z systemami FK (finansowo-ksiegowymi).

```python
class AbstractFKIntegration(ABC):
    """Bazowa klasa dla integracji z systemami FK."""

    @abstractmethod
    def export_trips(self, trips, format): ...

    @abstractmethod
    def sync_vehicles(self, company): ...

    @abstractmethod
    def generate_ewidencja(self, month, year): ...

# Konkretne implementacje:
class OptimaPKIntegration(AbstractFKIntegration): ...
class SymfoniaIntegration(AbstractFKIntegration): ...
class WFirmaIntegration(AbstractFKIntegration): ...
```

### 8.5 BasePDFGenerator

Generowanie dokumentow PDF z polskimi fontami.

```python
class BasePDFGenerator:
    """WeasyPrint HTML -> PDF z fontami Noto Sans."""

    template_name: str
    font_family = 'Noto Sans'  # pelne wsparcie polskich znakow

    def generate(self, context) -> bytes:
        html = render_to_string(self.template_name, context)
        return weasyprint.HTML(string=html).write_pdf()

# Uzycie:
class TripReportPDF(BasePDFGenerator):
    template_name = 'reports/trip_report.html'
```

---

## 9. API-first (OpenAPI -> generowany klient)

### 9.1 Pipeline

```
Django ViewSet + Serializer
         |
         v
drf-spectacular (schema generation)
         |
         v
/api/schema/ (OpenAPI 3.0 JSON/YAML)
         |
         v
orval (code generation)
         |
    +----+----+
    |         |
    v         v
 Mobile    Web
 (Axios)   (SWR/fetch)
 typed     typed
 client    client
```

### 9.2 Zasady

- Schema generowana automatycznie z serializatorow i viewsetow DRF.
- `orval` generuje typowanego klienta TypeScript z hookami SWR (web) i funkcjami Axios (mobile).
- Kazda zmiana API wymaga aktualizacji schematu i regeneracji klienta.
- CI sprawdza, czy wygenerowany klient jest aktualny (`orval --check`).

---

## 10. Git flow i branching strategy

### 10.1 Diagram przeplywu

```
feature/*  ----+
bugfix/*   ----|---> develop ---> staging ---> main
hotfix/*   ----+         |           |           |
                         |           |           |
                    auto-deploy  auto-deploy  manual
                    (dev env)    (QA env)     (prod)
```

### 10.2 Branche i ochrona

| Branch      | Deploy        | Ochrona                              |
|-------------|---------------|--------------------------------------|
| `feature/*` | -             | PR do develop                        |
| `develop`   | dev (auto)    | 1 approve                            |
| `staging`   | staging (auto)| 1 approve + CI green                 |
| `main`      | prod (manual) | 2 approves + CI green                |

### 10.3 Konwencja commitow

```
feat(trips): dodaj filtrowanie przejazdow po dacie
fix(auth): napraw refresh token rotation
docs(api): zaktualizuj schema OpenAPI
chore(ci): dodaj krok lintowania w pipeline
```

Format: `<type>(<scope>): <opis>` (Conventional Commits).

---

## 11. Infrastruktura

### 11.1 Docker Compose (lokalne srodowisko)

```yaml
services:                   # 10+ kontenerow
  web:                      # Django + Daphne (ASGI)
  celery:                   # Worker - default queue
  celery-beat:              # Scheduler periodycznych taskow
  celery-reports:           # Worker - reports queue (WeasyPrint)
  postgres:                 # PostgreSQL 16
  redis:                    # Redis 7
  mongo:                    # MongoDB 7
  minio:                    # S3-compatible storage (lokal)
  prometheus:               # Zbieranie metryk
  grafana:                  # Dashboardy monitoringu
```

### 11.2 CI/CD Pipeline

```
git push (feature branch)
     |
     v
GitHub Actions
     |
     +---> Lint (ruff, eslint, prettier)
     |---> Testy (pytest, jest, detox)
     |---> Build schema OpenAPI
     |---> Sprawdz wygenerowanego klienta
     |
     v
Merge do develop/staging
     |
     +---> Docker build + push (GHCR)
     |---> Deploy na srodowisko (auto)
     |
     v
Merge do main (manual approval)
     |
     +---> Deploy produkcyjny
     |---> EAS Build (mobile - App Store / Google Play)
     |---> Vercel deploy (web)
```

### 11.3 Diagram autentykacji JWT

```
Klient                    API                    Redis
  |                        |                       |
  |-- POST /auth/login --> |                       |
  |                        |-- weryfikacja ------> |
  |<-- access + refresh -- |                       |
  |                        |                       |
  |-- GET /api/trips ----> |                       |
  |   (Authorization:      |                       |
  |    Bearer <access>)    |-- sprawdz blacklist ->|
  |                        |<- OK ----------------|
  |<-- 200 dane ---------- |                       |
  |                        |                       |
  |-- POST /auth/refresh ->|                       |
  |   (refresh token)      |-- blacklist stary --->|
  |                        |<- zapisano -----------|
  |<-- nowy access --------| (rotation)            |
  |    + nowy refresh      |                       |
```

---

## 12. Konwencje kodu

### 12.1 Backend (Python)

- **Formatter**: `ruff format` (kompatybilny z Black).
- **Linter**: `ruff check` z zestawem regul (pyflakes, isort, pep8-naming).
- **Testy**: `pytest` + `factory_boy` + `faker`. Pokrycie minimum 80%.
- **Nazewnictwo**: snake_case dla modulow/funkcji, PascalCase dla klas.
- **Docstringi**: Google style na publicznych metodach.
- **Type hints**: wymagane w sygnaturach funkcji.

### 12.2 Mobile (TypeScript / React Native)

- **Formatter/Linter**: ESLint + Prettier.
- **Testy**: Jest (unit) + Detox (E2E).
- **Nazewnictwo**: camelCase dla zmiennych/funkcji, PascalCase dla komponentow.
- **Komponenty**: funkcyjne z hookami, brak klas.
- **Stan**: Zustand stores w dedykowanych plikach (`stores/`).

### 12.3 Web (TypeScript / Next.js)

- **Formatter/Linter**: ESLint + Prettier + eslint-plugin-tailwindcss.
- **Testy**: Jest/Vitest (unit), Playwright (E2E).
- **Komponenty**: React Server Components domyslnie, `'use client'` tylko gdy potrzebne.
- **Styling**: Tailwind utility classes, brak inline styles.
- **Importy**: aliasy sciezkowe (`@/components`, `@/lib`).

### 12.4 Wspolne zasady

- Kazdy PR musi przejsc review i CI przed merge.
- Brak commitow bezposrednio na `develop`, `staging`, `main`.
- Zmienne srodowiskowe w `.env` (nigdy w kodzie).
- Sekrety w GitHub Secrets / Doppler.
- Logowanie strukturalne (JSON) na produkcji.

---

> Ostatnia aktualizacja: 2026-04-15
