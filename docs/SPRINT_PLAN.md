# BusiKM — Plan sprintow

> Dokument zastepuje poprzednie pliki `JIRA_PLAN.md` i `JIRA_MIGRATION_PLAN.md`.
> Wszystkie numery ticketow sa rzeczywistymi identyfikatorami Jira (projekt BKM).

---

## 1. Przeglad harmonogramu

```
Sprint 0  [15 Apr – 30 Apr]  Infra & Setup           ████░░░░░░░░░░░░  13 items
Sprint 1  [ 1 May – 14 May]  Auth & RBAC             ████░░░░░░░░░░░░  10 items
Sprint 2  [15 May – 28 May]  Company base            ██░░░░░░░░░░░░░░   4 items
Sprint 3  [29 May – 11 Jun]  Fleet+Drivers+Mobile    ████████░░░░░░░░  16 items
Sprint 4  [12 Jun – 25 Jun]  Trips+PDF+FK+Web        ██████████░░░░░░  21 items
Sprint 5  [26 Jun –  9 Jul]  Launch MVP              ██████████░░░░░░  21 items  MVP LIVE
---------- linia MVP ----------
Sprint 6  [10 Jul – 23 Jul]  Post-MVP: AF+ext        ██████░░░░░░░░░░  11 items
Sprint 7  [24 Jul –  6 Aug]  Post-MVP: raporty+E2E   ████░░░░░░░░░░░░   8 items
```

**Sprinty 0-5 = MVP (12 tygodni).** Sprinty 6-7 = post-MVP (4 tygodnie).

| Faza     | Sprinty | Czas trwania | Liczba ticketow |
|----------|---------|--------------|-----------------|
| MVP      | 0 – 5   | 12 tygodni   | 85              |
| Post-MVP | 6 – 7   | 4 tygodnie   | 19              |
| **Razem**| 0 – 7   | 16 tygodni   | **104**         |

---

## 2. Szczegoly sprintow

### Sprint 0 — Project Setup (15 Apr – 30 Apr)

**Cel:** Infrastruktura, repozytoria, CI/CD, staging.

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-12 | Utworzenie repo: busikm-backend (Django)      | Infra         |
| BKM-13 | Utworzenie repo: busikm-mobile (React Native) | Infra         |
| BKM-14 | Utworzenie repo: busikm-web (Next.js)         | Infra         |
| BKM-15 | Docker Compose: PostgreSQL + Redis + MongoDB  | Infra         |
| BKM-16 | Django project scaffold (config, apps, settings) | Backend    |
| BKM-17 | drf-spectacular setup + Swagger UI + ReDoc    | Backend       |
| BKM-18 | CI pipeline: GitHub Actions (lint, test, build) | DevOps      |
| BKM-19 | Branch protection rules (develop, staging, main) | DevOps     |
| BKM-20 | Sentry setup (BE + mobile + web)              | Monitoring    |
| BKM-21 | Prometheus + Grafana setup                    | Monitoring    |
| BKM-22 | Jira + Confluence space setup                 | Project Mgmt  |
| BKM-23 | Staging environment provisioning              | DevOps        |
| BKM-24 | Confluence: Architecture docs (initial)       | Docs          |

**Milestone:** Repozytoria, Docker, CI, staging gotowe.

**Uwagi:** Sprint zerowy — brak velocity referencyjnej. Skupienie na automatyzacji i standardach.

---

### Sprint 1 — Auth & RBAC (1 May – 14 May)

**Cel:** Pelny cykl uwierzytelniania JWT z rolami.

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-25 | Rejestracja uzytkownika z wyborem roli        | Auth          |
| BKM-26 | Login -> JWT (access + refresh token)         | Auth          |
| BKM-27 | Refresh token rotation + blacklist (Redis)    | Auth          |
| BKM-28 | Endpoint GET /auth/me/ — profil usera         | Auth          |
| BKM-29 | Logout — blacklist refresh token              | Auth          |
| BKM-30 | CustomUser model (email login, role enum)     | Auth          |
| BKM-31 | Permission classes: IsDriver, IsOwner, etc.   | Auth          |
| BKM-32 | Rate limiting middleware (Redis)              | Auth          |
| BKM-33 | Unit testy: auth flow                         | Testing       |
| BKM-34 | Integration test: full auth cycle             | Testing       |

**Milestone:** Pelny JWT auth dzialajacy end-to-end.

**Uwagi:** BKM-30 (CustomUser) powinien byc pierwszym ticketem — migracje DB zalezne.

---

### Sprint 2 — Company, Fleet, Drivers (15 May – 28 May)

**Cel:** Modele firmowe i subskrypcyjne — fundament multi-tenancy.

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-35 | CRUD firma transportowa                       | Company       |
| BKM-38 | Company model + Subscription model            | Company       |
| BKM-40 | Testy: izolacja danych miedzy firmami         | Testing       |
| BKM-44 | Vehicle model + VehicleDocument model         | Fleet         |

**Milestone:** Company + Subscription + Vehicle models gotowe.

**Uwagi:** Tickety BKM-36 (AF), BKM-37 (multi-tenant), BKM-39 (TenantContext) przeniesione do Sprintu 6 — nie sa wymagane dla MVP. Sprint lzejszy (4 itemy) celowo — bufor na dojrzewanie auth z S1.

---

### Sprint 3 — Trips & GPS + Mobile scaffold (29 May – 11 Jun)

**Cel:** CRUD floty i kierowcow, alerty, scaffold aplikacji mobilnej.

#### Fleet (6 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-41 | CRUD pojazdow                                 | Fleet         |
| BKM-42 | Upload dokumentow                             | Fleet         |
| BKM-43 | System alertow OC/przeglad/tachograf          | Fleet         |
| BKM-45 | Alert model + Celery task                     | Fleet         |
| BKM-46 | File storage adapter S3/MinIO                 | Infra         |
| BKM-47 | Testy vehicle CRUD                            | Testing       |

#### Drivers (5 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-48 | CRUD kierowcow                                | Drivers       |
| BKM-49 | Ewidencja uprawnien i alerty PJ (basic)       | Drivers       |
| BKM-50 | Zaproszenie kierowcy email                    | Drivers       |
| BKM-51 | Driver model extensions                       | Drivers       |
| BKM-52 | Testy driver management                       | Testing       |

#### Mobile scaffold (5 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-68 | Expo scaffold + Router                        | Mobile        |
| BKM-69 | API client axios                              | Mobile        |
| BKM-70 | Zustand stores                                | Mobile        |
| BKM-71 | Ekran login/register                          | Mobile        |
| BKM-72 | Role-based navigation                         | Mobile        |

**Milestone:** Fleet + Driver CRUD dzialajace, aplikacja mobilna uruchamia sie.

**Uwagi:** Rownolegle sciezki (BE fleet/drivers + mobile scaffold) — wymaga koordynacji.

---

### Sprint 4 — Trips API + Kilometrowka + FK + Web scaffold (12 Jun – 25 Jun)

**Cel:** GPS tracking, generacja PDF kilometrowki, eksport FK, scaffold webowy.

#### Trips (9 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-53 | Start/stop trasy                              | Trips         |
| BKM-54 | Bulk GPS upload                               | Trips         |
| BKM-55 | Lista tras z filtrami                         | Trips         |
| BKM-56 | Klasyfikacja sluzbowa/prywatna                | Trips         |
| BKM-57 | Upload zdjecia drogomierza                    | Trips         |
| BKM-58 | Trip model + GPSPoint MongoDB                 | Trips         |
| BKM-59 | GPS processing Celery distance calc           | Trips         |
| BKM-60 | Object-level permissions                      | Trips         |
| BKM-61 | Testy trip lifecycle                          | Testing       |

#### Documents (3 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-62 | Generacja kilometrowki PDF (wzor MF)          | Documents     |
| BKM-65 | PDF generator service WeasyPrint              | Documents     |
| BKM-66 | Celery async PDF generation                   | Documents     |

#### Mobile (2 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-73 | GPS tracking background + batching            | Mobile        |
| BKM-74 | Ekran start/stop trasy                        | Mobile        |

#### FK Integration (4 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-92 | Research EDI++                                | FK            |
| BKM-93 | AbstractFKIntegration base                    | FK            |
| BKM-94 | Eksport EDI++                                 | FK            |
| BKM-95 | Endpoint POST /export/insert-gt/              | FK            |

#### Web scaffold (3 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-82 | Next.js scaffold                              | Web           |
| BKM-83 | Auth flow + middleware                        | Web           |
| BKM-84 | API client from OpenAPI                       | Web           |

**Milestone:** GPS tracking + kilometrowka PDF + eksport EDI++ + web auth.

**Uwagi:** Najwiekszy sprint (21 items). Wymaga scislego podzialu na podzespoly: BE trips, mobile GPS, FK, web scaffold. Priorytet: BKM-58 (model) blokuje reszte Trips.

---

### Sprint 5 — Mobile core + Web + Launch (26 Jun – 9 Jul)

**Cel:** Dokonczenie mobile/web, launch MVP, UAT.

#### Mobile (5 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-75 | Zdjecie drogomierza camera                    | Mobile        |
| BKM-76 | Lista tras infinite scroll                    | Mobile        |
| BKM-77 | Push notifications                            | Mobile        |
| BKM-78 | Flota overview owner                          | Mobile        |
| BKM-80 | EAS Build iOS+Android                         | Mobile        |

#### Web (4 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-85 | Dashboard wlasciciela                         | Web           |
| BKM-87 | Raporty kilometrowka/koszty/CSV               | Web           |
| BKM-88 | User management zaproszenia                   | Web           |
| BKM-90 | Responsive design                             | Web           |

#### FK (3 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-96 | Historia eksportow                            | FK            |
| BKM-97 | UI panel eksportu FK                          | Web           |
| BKM-99 | Confluence Insert GT guide                    | Docs          |

#### Launch (7 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-100 | Security audit                               | Launch        |
| BKM-102 | Staging deploy BE+Web+Mobile                 | Launch        |
| BKM-103 | Monitoring Grafana                           | Monitoring    |
| BKM-104 | Uptime Kuma                                  | Monitoring    |
| BKM-106 | Deployment runbook                           | Docs          |
| BKM-107 | UAT onboarding 5-10 firm                     | Launch        |
| BKM-109 | Changelog template                           | Docs          |

#### New (2 items)

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-114 | Trial management auto-expiry                 | Billing       |
| BKM-115 | Landing page 2.5t-3.5t                       | Web           |

**MILESTONE: MVP LIVE** — ustawa wchodzi w zycie.

**Uwagi:** Deadline twardy (9 Jul). BKM-107 (UAT) wymaga dzialajacego staging min. tydzien przed koncem sprintu. EAS Build (BKM-80) planowac na poczatek sprintu — review Apple moze trwac dni.

---

### Sprint 6 — Post-MVP: AF + Rozszerzenia (10 Jul – 23 Jul)

**Cel:** Biuro rachunkowe (AF), multi-tenant, rejestracja self-serve.

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-36 | Biuro rachunkowe rejestracja                  | AF            |
| BKM-37 | Multi-tenant przelaczanie                     | AF            |
| BKM-39 | TenantContext middleware                       | AF            |
| BKM-89 | Panel biura rachunkowego web                  | Web           |
| BKM-86 | Realtime mapa WebSocket                       | Web           |
| BKM-105 | Production provisioning                      | DevOps        |
| BKM-108 | Incident response playbook                   | Docs          |
| BKM-110 | Usage tracking metryki                       | Analytics     |
| BKM-111 | Self-serve registration 14-day trial         | Billing       |
| BKM-112 | AF registration 3-month trial                | Billing       |
| BKM-113 | Compliance dashboard                         | Compliance    |

**Milestone:** AF multi-tenant live, rejestracja otwarta dla nowych firm.

**Uwagi:** BKM-37 i BKM-39 sa blokujace dla BKM-89 (panel AF). Sekwencja: middleware -> model -> UI.

---

### Sprint 7 — Post-MVP: Billing prep + Raporty + E2E (24 Jul – 6 Aug)

**Cel:** Raporty zaawansowane, testy E2E, przygotowanie pod billing.

| Key    | Summary                                      | Epic          |
|--------|----------------------------------------------|---------------|
| BKM-63 | Raport kosztow floty                          | Documents     |
| BKM-64 | Zestawienie delegacji                         | Documents     |
| BKM-67 | Testy PDF validation                          | Testing       |
| BKM-91 | Playwright E2E                                | Testing       |
| BKM-98 | Testy EDI++ validation                        | Testing       |
| BKM-101 | Performance testing k6                       | Testing       |
| BKM-79 | WatermelonDB offline                          | Mobile        |
| BKM-81 | Detox E2E                                     | Testing       |

**Milestone:** Pelny zestaw funkcji, planowanie integracji Stripe billing.

**Uwagi:** Sprint testowy — idealny moment na stabilizacje przed skalowaniem.

---

## 3. Zaleznosci miedzy sprintami

```
Sprint 0 ──> Sprint 1 ──> Sprint 2 ──> Sprint 3 ──> Sprint 4 ──> Sprint 5 (MVP)
  Infra        Auth       Company      Fleet/Drv    Trips/PDF     Launch
                                         │              │
                                         └── Mobile ────┘
                                                         │
                                              Sprint 6 ──┘──> Sprint 7
                                                AF/ext        Reports/E2E
```

| Zaleznosc                          | Blokujacy        | Blokowany         |
|------------------------------------|-------------------|--------------------|
| CustomUser model                   | BKM-30 (S1)      | BKM-25, BKM-26    |
| Company model                      | BKM-38 (S2)      | BKM-41, BKM-48    |
| Vehicle model                      | BKM-44 (S2)      | BKM-41, BKM-42    |
| Trip model (MongoDB)               | BKM-58 (S4)      | BKM-53–BKM-61     |
| PDF generator                      | BKM-65 (S4)      | BKM-62, BKM-66    |
| Celery setup                       | BKM-15 (S0)      | BKM-45, BKM-59    |
| Mobile auth                        | BKM-71 (S3)      | BKM-73, BKM-74    |
| Web auth                           | BKM-83 (S4)      | BKM-85, BKM-87    |
| TenantContext middleware            | BKM-39 (S6)      | BKM-89             |
| Staging deploy                     | BKM-23 (S0)      | BKM-102            |

---

## 4. Mitygacja ryzyka

| Ryzyko                                        | Prawdop. | Wplyw  | Mitygacja                                          |
|-----------------------------------------------|----------|--------|----------------------------------------------------|
| Apple review opoznia release iOS              | Wysoki   | Wysoki | EAS Build na poczatku S5, TestFlight wczesniej     |
| GPS tracking niestabilny na Android           | Sredni   | Wysoki | Testy na fizycznych urzadzeniach od S3             |
| Wydajnosc MongoDB przy duzym GPS data         | Sredni   | Sredni | Indeksy geo2dsphere, testy obciazeniowe w S7       |
| EDI++ specyfikacja niekompletna               | Sredni   | Sredni | Research (BKM-92) na poczatku S4, konsultacja z FK |
| Przekroczenie velocity w S4/S5 (21 items)     | Wysoki   | Sredni | Priorytetyzacja MoSCoW, bufor w S2 (4 items)      |
| Opoznienie UAT z firmami pilotazowymi         | Sredni   | Wysoki | Rekrutacja firm od S3, staging deploy w polowie S5 |
| Zmiana wymagan prawnych (ustawa)              | Niski    | Wysoki | Monitoring legislacyjny, elastyczna architektura   |

---

## 5. Zalozenia velocity

| Parametr                    | Wartosc                              |
|-----------------------------|--------------------------------------|
| Dlugosc sprintu             | 2 tygodnie                           |
| Planowana velocity          | ~30 story points / sprint            |
| Rozmiar zespolu             | 2-3 developerow + 1 QA              |
| Estymacja ticketow          | Fibonacci (1, 2, 3, 5, 8, 13)       |
| Sredni rozmiar ticketu      | 3-5 SP                               |
| Bufor na nieprzewidziane    | 15-20% capacity                      |

**Uwaga:** Sprint 2 (4 itemy) celowo lzejszy — sluzy jako bufor i czas na stabilizacje auth (S1). Sprinty 4 i 5 (po 21 items) sa najciezsze — wymagaja pelnej velocity i ewentualnego wsparcia.

---

## 6. Definition of Done

Ticket uznajemy za ukonczony gdy:

- [ ] Kod przechodzi code review (min. 1 approval)
- [ ] Wszystkie testy jednostkowe przechodza (coverage >= 80%)
- [ ] Testy integracyjne przechodza na CI
- [ ] Dokumentacja API zaktualizowana (drf-spectacular)
- [ ] Brak bledow krytycznych w Sentry
- [ ] Ticket przeniesiony do Done w Jira
- [ ] Changelog zaktualizowany (od S5)

Dla sprintow launchowych (S5+):
- [ ] Deploy na staging przeszedl pomyslnie
- [ ] Smoke testy na staging zaliczone
- [ ] Metryki Grafana/Prometheus bez anomalii

---

## Podsumowanie

| Sprint | Items | Zakres                       | Daty              |
|--------|-------|------------------------------|--------------------|
| 0      | 13    | Infra                        | 15 Apr – 30 Apr   |
| 1      | 10    | Auth                         | 1 May – 14 May    |
| 2      | 4     | Company base                 | 15 May – 28 May   |
| 3      | 16    | Fleet+Drivers+Mobile scaffold| 29 May – 11 Jun   |
| 4      | 21    | Trips+PDF+FK+Web scaffold    | 12 Jun – 25 Jun   |
| 5      | 21    | Launch MVP                   | 26 Jun – 9 Jul    |
| 6      | 11    | Post-MVP: AF+extensions      | 10 Jul – 23 Jul   |
| 7      | 8     | Post-MVP: raporty+E2E        | 24 Jul – 6 Aug    |
| **Razem** | **104** |                           |                    |
