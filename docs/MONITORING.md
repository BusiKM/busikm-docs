# Monitoring i obserwowalnosc - BusiKM

## Spis tresci

1. [Cztery filary obserwowalnosci](#1-cztery-filary-obserwowalnosci)
2. [Sentry - sledzenie bledow](#2-sentry---sledzenie-bledow)
3. [Prometheus - metryki](#3-prometheus---metryki)
4. [Grafana - wizualizacja](#4-grafana---wizualizacja)
5. [Metryki biznesowe](#5-metryki-biznesowe)
6. [Reguly alertow](#6-reguly-alertow)
7. [Uptime Kuma - monitoring dostepnosci](#7-uptime-kuma---monitoring-dostepnosci)
8. [Kanaly powiadomien](#8-kanaly-powiadomien)
9. [Reagowanie na incydenty](#9-reagowanie-na-incydenty)

---

## 1. Cztery filary obserwowalnosci

System monitoringu BusiKM opiera sie na czterech filarach:

| Filar       | Narzedzie            | Zakres                                    |
|-------------|----------------------|-------------------------------------------|
| Bledy       | Sentry               | Sledzenie wyjatkow, performance, sessions |
| Metryki     | Prometheus + Grafana  | Metryki systemowe, aplikacyjne, biznesowe |
| Dostepnosc  | Uptime Kuma           | Monitoring endpointow i uslug            |
| Logi        | Structured logging    | JSON logi z korelacja request ID         |

Kazdy filar dziala niezaleznie - awaria jednego nie wplywa na pozostale.
Dane z wszystkich filarow sa dostepne zarowno dla srodowiska staging jak i production.

---

## 2. Sentry - sledzenie bledow

### 2.1. Projekty

| Projekt          | Platforma         | SDK                        |
|------------------|-------------------|----------------------------|
| busikm-backend   | Python / Django   | sentry-sdk[django,celery]  |
| busikm-mobile    | React Native      | @sentry/react-native       |
| busikm-web       | Next.js           | @sentry/nextjs             |

### 2.2. Konfiguracja srodowisk

Kazdy projekt raportuje do dwoch srodowisk:
- **staging** - bledy z api-staging.busikm.pl i staging.busikm.pl
- **production** - bledy z api.busikm.pl i busikm.pl

### 2.3. Funkcje

- **Error tracking** - automatyczne przechwytywanie wyjatkow z pelnym stack trace
- **Performance monitoring** - sledzenie czasu odpowiedzi endpointow, transakcji bazodanowych, zapytan zewnetrznych
- **Session replay** (web) - nagrywanie sesji uzytkownikow w celu odtworzenia kontekstu bledu
- **Release tracking** - powiazanie bledow z konkretnymi wersjami kodu (integracja z GitHub commits)

### 2.4. Alerty Sentry

- Nowy blad (pierwszy wystapienie) - natychmiastowe powiadomienie
- Regresja bledu (ponowne wystapienie po oznaczeniu jako rozwiazany) - natychmiastowe powiadomienie
- Wysoki wolumen bledow (>50 w ciagu 1h) - eskalacja

### 2.5. Scrubbing danych wrazliwych

Sentry automatycznie usuwa z raportow nastepujace dane:
- `password`, `passwd`, `secret`, `token`
- `NIP` (Numer Identyfikacji Podatkowej)
- `PESEL` (numer identyfikacyjny osoby fizycznej)
- `credit_card`, `card_number`
- Naglowki `Authorization`, `Cookie`

Konfiguracja w `sentry_sdk.init()` poprzez parametr `before_send` oraz `Data Scrubber` w ustawieniach projektu.

---

## 3. Prometheus - metryki

### 3.1. Cele scrapowania (scrape targets)

| Target              | Endpoint                  | Port  | Opis                              |
|---------------------|---------------------------|-------|-----------------------------------|
| django              | /metrics                  | 8000  | Metryki Django (django-prometheus)|
| postgres-exporter   | /metrics                  | 9187  | Metryki PostgreSQL                |
| redis-exporter      | /metrics                  | 9121  | Metryki Redis                     |
| mongodb-exporter    | /metrics                  | 9216  | Metryki MongoDB                   |
| celery-exporter     | /metrics                  | 9808  | Metryki Celery (kolejki, taski)   |
| node-exporter       | /metrics                  | 9100  | Metryki systemu operacyjnego      |
| prometheus          | /metrics                  | 9090  | Metryki samego Prometheusa        |

### 3.2. Konfiguracja

```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: "django"
    static_configs:
      - targets: ["web:8000"]
  # ... pozostale targety
```

### 3.3. Retencja danych

- **Lokalne**: 15 dni (ograniczona przestrzen dyskowa)
- **Staging**: 30 dni
- **Production**: 30 dni

---

## 4. Grafana - wizualizacja

### 4.1. Dashboardy

| Dashboard           | Zawartosc                                                  |
|---------------------|-------------------------------------------------------------|
| System Overview     | CPU, RAM, dysk, siec - przeglad calej infrastruktury       |
| Django API          | Request rate, latency (p50/p95/p99), error rate, endpointy  |
| Celery Workers      | Aktywne taski, kolejki, czas wykonania, bledy workerow      |
| Infrastructure      | PostgreSQL, Redis, MongoDB - polaczenia, pamiec, operacje   |
| Business Metrics    | Aktywne trasy, punkty GPS, raporty, firmy, powiadomienia   |
| Alerts & SLA        | Aktywne alerty, historia incydentow, metryki SLA           |

### 4.2. Zmienne

Kazdy dashboard posiada selektor srodowiska:
- **environment**: `staging` / `production`

Umozliwia to przelaczanie miedzy srodowiskami na jednej instancji Grafany.

### 4.3. Provisioning

Dashboardy sa zarzadzane jako kod (JSON):
- Pliki JSON w repozytorium `busikm-infra/grafana/dashboards/`
- Automatyczne ladowanie przy starcie Grafany (provisioning)
- Zmiany w dashboardach wymagaja PR i review

---

## 5. Metryki biznesowe

Dedykowane metryki Prometheus eksponowane przez aplikacje Django:

| Metryka                                 | Typ     | Opis                                          |
|-----------------------------------------|---------|-----------------------------------------------|
| `busikm_active_trips`                   | Gauge   | Liczba aktualnie aktywnych tras               |
| `busikm_gps_points_ingested_total`      | Counter | Laczna liczba przyjeteych punktow GPS         |
| `busikm_trips_completed_total`          | Counter | Laczna liczba zakonczonych tras               |
| `busikm_report_generated_total`         | Counter | Laczna liczba wygenerowanych raportow         |
| `busikm_export_generated_total`         | Counter | Laczna liczba wygenerowanych eksportow        |
| `busikm_registered_companies`           | Gauge   | Liczba zarejestrowanych firm                  |
| `busikm_push_notifications_sent_total`  | Counter | Laczna liczba wyslanych push notifications    |
| `busikm_alerts_generated_total`         | Counter | Laczna liczba wygenerowanych alertow floty    |
| `busikm_rate_limit_exceeded_total`      | Counter | Liczba przekroczen rate limitu                |

Metryki sa eksponowane przez `django-prometheus` na endpoincie `/metrics` i scrapowane co 15 sekund.

---

## 6. Reguly alertow

### 6.1. Alerty infrastrukturalne

| Alert                      | Warunek                                    | Severity | Czas      |
|----------------------------|--------------------------------------------|----------|-----------|
| ServiceDown                | Instancja nie odpowiada na scrape          | critical | 1 min     |
| HighErrorRate              | HTTP 5xx > 5% requestow                   | critical | 5 min     |
| HighLatency                | p95 latency > 2s                           | warning  | 5 min     |
| PostgresConnectionsHigh    | Aktywne polaczenia > 80% max              | warning  | 5 min     |
| PostgresReplicationLag     | Lag replikacji > 30s                       | critical | 2 min     |
| RedisMemoryHigh            | Uzycie pamieci > 80%                      | warning  | 5 min     |
| DiskSpaceLow               | Wolna przestrzen < 15%                     | warning  | 5 min     |
| DiskSpaceCritical          | Wolna przestrzen < 5%                      | critical | 1 min     |

### 6.2. Alerty aplikacyjne

| Alert                      | Warunek                                    | Severity | Czas      |
|----------------------------|--------------------------------------------|----------|-----------|
| CeleryQueueBacklog         | Zadania w kolejce > 100                    | warning  | 5 min     |
| CeleryWorkerDown           | Worker nie odpowiada                       | critical | 2 min     |
| NoGPSIngestion             | Brak nowych punktow GPS przez 10 min       | warning  | 10 min    |
| HighCeleryTaskFailureRate  | Bledy taskow > 10% w ciagu 15 min         | warning  | 15 min    |

### 6.3. Konfiguracja w Prometheus

```yaml
groups:
  - name: busikm-infrastructure
    rules:
      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Usluga {{ $labels.job }} jest niedostepna"
          description: "{{ $labels.instance }} nie odpowiada od ponad 1 minuty."

      - alert: HighErrorRate
        expr: |
          sum(rate(django_http_responses_total_by_status_total{status=~"5.."}[5m]))
          /
          sum(rate(django_http_responses_total_by_status_total[5m]))
          > 0.05
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Wysoki wskaznik bledow HTTP 5xx"
          description: "Ponad 5% requestow konczy sie bledem 5xx."
```

---

## 7. Uptime Kuma - monitoring dostepnosci

### 7.1. Monitory

| Monitor              | Typ        | URL / Host                    | Interwat | Timeout |
|----------------------|------------|-------------------------------|----------|---------|
| API Health           | HTTP(s)    | /api/health/                  | 60s      | 10s     |
| API Auth             | HTTP(s)    | /api/v1/auth/token/ (POST)    | 300s     | 10s     |
| API Detailed         | HTTP(s)    | /api/health/detailed/         | 120s     | 10s     |
| Web                  | HTTP(s)    | https://busikm.pl             | 60s      | 10s     |
| Web Login            | HTTP(s)    | https://busikm.pl/login       | 300s     | 10s     |
| Swagger              | HTTP(s)    | /api/docs/                    | 300s     | 10s     |
| WebSocket            | WebSocket  | wss://api.busikm.pl/ws/       | 120s     | 10s     |
| PostgreSQL           | TCP        | postgres:5432                 | 60s      | 5s      |
| Redis                | TCP        | redis:6379                    | 60s      | 5s      |
| MongoDB              | TCP        | mongo:27017                   | 60s      | 5s      |
| Prometheus           | HTTP       | prometheus:9090/-/healthy     | 60s      | 5s      |
| Grafana              | HTTP       | grafana:3000/api/health       | 60s      | 5s      |
| SSL Certificate      | HTTP(s)    | https://api.busikm.pl         | 86400s   | 10s     |

### 7.2. Strona statusu

Publiczna strona statusu dostepna pod adresem: **https://status.busikm.pl**

Wyswietla aktualny stan wszystkich monitorowanych uslug oraz historie incydentow.
Automatyczne aktualizowanie statusu na podstawie wynikow monitorow.

---

## 8. Kanaly powiadomien

### 8.1. Konfiguracja

| Kanal       | Zakres                   | Odbiorcy              | Czas reakcji   |
|-------------|--------------------------|------------------------|----------------|
| Email       | Wszystkie alerty         | Caly zespol            | < 1h           |
| Slack       | Critical                 | Kanal #busikm-alerts   | < 15 min       |
| PagerDuty   | Production critical      | On-call engineer       | < 5 min        |

### 8.2. Szczegoly

- **Email**: powiadomienia o wszystkich alertach (warning + critical). Wysylane na grupowa skrzynke zespolu.
- **Slack**: kanal `#busikm-alerts` otrzymuje tylko alerty o severity `critical`. Integracja z Prometheus Alertmanager i Sentry.
- **PagerDuty**: planowany post-MVP. Docelowo obsluga dyzurow (on-call rotation) i eskalacji dla krytycznych alertow produkcyjnych.

### 8.3. Eskalacja

```
Warning  -->  Email (zespol)
                |
                v  (jesli nierozwiazany w 30 min)
Critical -->  Email + Slack (#busikm-alerts)
                |
                v  (jesli nierozwiazany w 15 min, post-MVP)
Emergency --> PagerDuty (on-call engineer)
```

---

## 9. Reagowanie na incydenty

### 9.1. Proces (skrot)

Pelna procedura opisana jest w osobnym dokumencie (Incident Response Playbook).
Ponizej podsumowanie glownych krokow:

```
Wykrycie --> Klasyfikacja --> Reakcja --> Komunikacja --> Rozwiazanie --> Post-mortem
```

### 9.2. Klasyfikacja incydentow

| Severity | Opis                                          | Czas reakcji | Przyklad                       |
|----------|-----------------------------------------------|--------------|--------------------------------|
| SEV-1    | Calkowita niedostepnosc produkcji             | < 15 min     | API nie odpowiada              |
| SEV-2    | Powazan degradacja uslugi                     | < 30 min     | Brak zapisu GPS, bledy 50%+    |
| SEV-3    | Czesciowa degradacja, obejscie dostepne       | < 2h         | Wolne generowanie raportow     |
| SEV-4    | Drobny problem, brak wplywu na uzytkownikow   | < 24h        | Blad w logach, alert warning   |

### 9.3. Kroki reakcji

1. **Wykrycie** - alert z Prometheus/Sentry/Uptime Kuma lub zgloszenie uzytkownika
2. **Klasyfikacja** - okreslenie severity (SEV-1 do SEV-4) na podstawie wplywu
3. **Reakcja** - przypisanie odpowiedzialnej osoby, rozpoczecie diagnostyki
4. **Komunikacja** - informacja na Slack, aktualizacja strony statusu (SEV-1, SEV-2)
5. **Rozwiazanie** - wdrozenie poprawki lub rollback (patrz: [Procedura rollback](DEPLOYMENT.md#7-procedura-rollback))
6. **Post-mortem** - analiza przyczyn w ciagu 48h (SEV-1, SEV-2). Dokument zawiera:
   - Chronologie zdarzenia (timeline)
   - Przyczyne glowna (root cause)
   - Co zadzialo, co nie zadzialo
   - Dzialania naprawcze (action items) z przypisanymi osobami i terminami

### 9.4. Narzedzia diagnostyczne

W trakcie incydentu zespol korzysta z:

- **Sentry** - analiza bledow i stack trace
- **Grafana** - przeglad metryk w czasie rzeczywistym
- **Uptime Kuma** - weryfikacja dostepnosci uslug
- **Logi aplikacji** - przeszukiwanie strukturyzowanych logow JSON
- **Django Admin** - inspekcja danych w bazie (tylko odczyt na produkcji)
- **Flower** - monitoring taskow Celery
- **psql / mongosh** - bezposrednie zapytania do baz (w ostatecznosci)
