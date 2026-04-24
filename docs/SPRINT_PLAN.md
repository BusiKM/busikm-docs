# BusiKM — Plan sprintów

> Dokument zaktualizowany zgodnie z rzeczywistym stanem Jira (BKM board).
> Wszystkie numery ticketów są rzeczywistymi identyfikatorami Jira (projekt BKM).
> Taski bez widocznego numeru w backlogu = DONE (przeniesione do historii).

---

## 1. Przegląd harmonogramu

```
Sprint 0  [15 Apr – 30 Apr]  Infra & Setup           DONE  13 items  BKM-12–24
Sprint 1  [ 1 May – 14 May]  Auth & RBAC             DONE  10 items  BKM-25–34
Sprint 2  [15 May – 28 May]  Company base            DONE   4 items  BKM-35–44
Sprint 3  [29 May – 11 Jun]  Fleet+Drivers           DONE  11 items  BKM-41–52
Sprint 4  [23 Apr – 30 Apr]  KM+FK+Documents         ACT   35 items  BKM-62–67, BKM-121–149
Sprint 5  [ 1 May – 14 Jul]  Mobile+Web+Launch       TODO  46 items  BKM-68–78, BKM-91–115
---------- backlog pusty po Sprint 5 ----------
```

**Uwaga:** Sprinty 6 i 7 z poprzedniego planu zostały wchłonięte do Sprint 5 — Jira pokazuje Sprint 5 jako 46 items z datą do 14 Jul, backlog jest pusty.

---

## 2. Szczegóły sprintów

### Sprint 0 — Project Setup ✅ DONE

BKM-12 do BKM-24 — infrastruktura, repozytoria, CI/CD, staging, Confluence.

### Sprint 1 — Auth & RBAC ✅ DONE

BKM-25 do BKM-34 — JWT auth, CustomUser, RBAC, refresh tokens, testy.

### Sprint 2 — Company Base ✅ DONE

BKM-35, BKM-38, BKM-40, BKM-44 — Company, Subscription, Vehicle model.

### Sprint 3 — Fleet + Drivers ✅ DONE

BKM-41–52 — CRUD pojazdów i kierowców, upload dokumentów, alerty, zaproszenia.

> **Uwaga:** Mobile scaffold (BKM-68–72) z oryginalnego planu Sprint 3 — przeniesiony do Sprint 5.

---

### Sprint 4 — Kilometrówka + FK + Documents 🔄 AKTYWNY

**Daty:** 23 Apr – 30 Apr
**Cel:** Ewidencja przebiegu wg art. 86a VAT, eksport do 3 systemów FK, PDF dokumenty.
**Items:** 35

#### FK Integration — modele (11 items)

| Key | Summary | Status |
|---|---|---|
| BKM-121 | Aktualizacja modelu Company — pola FK i dane nadawcy EPP | CODE REVIEW |
| BKM-122 | Aktualizacja modelu Vehicle — pola VAT-26, VIN, silnik, typ paliwa | CODE REVIEW |
| BKM-123 | Aktualizacja modelu Trip — pola ewidencji wg art. 86a ust. 7 | IN PROGRESS |
| BKM-124 | Aktualizacja modelu Trip — potwierdzenia kierowcy i właściciela | TO DO |
| BKM-125 | Aktualizacja modelu Trip — snapshot stawki km i kosztu trasy | TO DO |
| BKM-126 | Stworzenie modelu MonthlyMileageSummary | TO DO |
| BKM-127 | Stworzenie modelu FuelInvoice | TO DO |
| BKM-128 | Stworzenie modelu MileageRate — tabela stawek km z historią | TO DO |
| BKM-129 | Aktualizacja modelu Driver — PESEL, NIP, adres EPP | TO DO |
| BKM-130 | Stworzenie modelu AuditLog — nienaruszalny dziennik zmian | TO DO |
| BKM-131 | Migracje bazy danych — wszystkie nowe i zaktualizowane modele | TO DO |

#### FK Integration — fixtures, walidacje, testy (7 items)

| Key | Summary | Status |
|---|---|---|
| BKM-132 | Fixtures — MileageRate wg Rozp. MI 22.12.2022 (Dz.U. 2023 poz. 5) | TO DO |
| BKM-133 | Walidacje biznesowe — licznik, VAT, stawki km, ciągłość ewidencji | TO DO |
| BKM-134 | Testy jednostkowe — Company, Vehicle, Driver | TO DO |
| BKM-135 | Testy jednostkowe — Trip, FuelInvoice, MileageRate | TO DO |
| BKM-136 | Testy jednostkowe — MonthlyMileageSummary i AuditLog | TO DO |
| BKM-147 | Aktualizacja modelu Vehicle — alert VAT-26 przy dodawaniu pojazdu | TO DO |
| BKM-148 | Query MileageRate — selekcja stawki po dacie (valid_from <= trip_date) | TO DO |

#### FK Integration — serializery i admin (4 items)

| Key | Summary | Status |
|---|---|---|
| BKM-137 | Aktualizacja serializerów DRF — Company, Vehicle, Driver | TO DO |
| BKM-138 | Aktualizacja serializerów DRF — Trip, FuelInvoice | TO DO |
| BKM-139 | Aktualizacja serializerów DRF — MonthlyMileageSummary, MileageRate, AuditLog | TO DO |
| BKM-140 | Aktualizacja admin Django — rejestracja nowych i zaktualizowanych modeli | TO DO |

#### FK Integration — generatory i endpointy (7 items)

| Key | Summary | Status |
|---|---|---|
| BKM-141 | Generator pliku EPP (EDI++) — Insert GT | TO DO |
| BKM-142 | Generator pliku XML — Comarch ERP Optima | TO DO |
| BKM-143 | Generator pliku TXT/AMS — Symfonia FK | TO DO |
| BKM-144 | Endpoint API — POST /exports/insert-gt/{period} | TO DO |
| BKM-145 | Endpoint API — POST /exports/comarch/{period} | TO DO |
| BKM-146 | Endpoint API — POST /exports/symfonia/{period} | TO DO |
| BKM-149 | Aktualizacja dokumentacji API — nowe endpointy i modele | TO DO |

#### Document Generation (6 items)

| Key | Summary | Status |
|---|---|---|
| BKM-62 | Generacja kilometrówki PDF (wzór MF) | TO DO |
| BKM-63 | Raport kosztów floty (CSV + PDF) | TO DO |
| BKM-64 | Zestawienie delegacji kierowców | TO DO |
| BKM-65 | PDF generator service (WeasyPrint) | TO DO |
| BKM-66 | Celery task: async PDF generation | TO DO |
| BKM-67 | Testy: PDF output validation | TO DO |

**Milestone:** Pełna ewidencja przebiegu zgodna z art. 86a VAT + eksport do Insert GT / Comarch / Symfonia + PDF kilometrówki.

**Zależności:** BKM-131 (migracje) blokuje BKM-132–149. BKM-65 (WeasyPrint) blokuje BKM-62, 66.

---

### Sprint 5 — Mobile core + Web + Launch MVP

**Daty:** 1 May – 14 Jul
**Cel:** Pełna aplikacja mobilna, panel webowy, launch MVP, UAT.
**Items:** 46

#### Mobile App — Core (11 items)

| Key | Summary |
|---|---|
| BKM-68 | Expo project scaffold + Expo Router |
| BKM-69 | API client setup (axios + interceptors) |
| BKM-70 | Zustand store: auth, trip, fleet |
| BKM-71 | Ekran login/register |
| BKM-72 | Role-based navigation (driver vs owner) |
| BKM-73 | GPS tracking: background location + batching |
| BKM-74 | Ekran start/stop trasy |
| BKM-75 | Zdjęcie drogomierza (camera + upload) |
| BKM-76 | Lista tras (infinite scroll) |
| BKM-77 | Push notifications (alerty) |
| BKM-78 | Flota overview (owner view) |

#### Web App — Dashboard (1 item)

| Key | Summary |
|---|---|
| BKM-91 | Testy: Playwright E2E |

#### FK Integration — historia i UI (8 items)

| Key | Summary |
|---|---|
| BKM-92 | Research: EDI++ format specification |
| BKM-93 | AbstractFKIntegration base class |
| BKM-94 | Eksport danych do formatu EDI++ |
| BKM-95 | Endpoint POST /export/insert-gt/ |
| BKM-96 | Historia eksportów + status tracking |
| BKM-97 | UI: panel eksportu FK w web app |
| BKM-98 | Testy: EDI++ output validation |
| BKM-99 | Confluence: Insert GT Integration Guide |

#### MVP Launch & Quality (13 items)

| Key | Summary |
|---|---|
| BKM-100 | Security audit: bandit, npm audit, OWASP |
| BKM-101 | Performance testing: k6/locust |
| BKM-102 | Staging deploy: BE + Web + Mobile |
| BKM-103 | Monitoring dashboards: Grafana |
| BKM-104 | Uptime Kuma: health check monitoring |
| BKM-105 | Production environment provisioning |
| BKM-106 | Deployment runbook (Confluence) |
| BKM-107 | UAT: onboarding 5–10 firm pilotażowych |
| BKM-108 | Incident response playbook |
| BKM-109 | Changelog / release notes template |
| BKM-110 | Usage tracking — metryki per firma |
| BKM-114 | Trial management — auto-expiry, downgrade, email |
| BKM-115 | Landing page: "Elektroniczna kilometrówka 2.5t-3.5t" |

#### Driver Management (1 item)

| Key | Summary |
|---|---|
| BKM-113 | Ewidencja uprawnień — compliance dashboard |

**MILESTONE: MVP LIVE**

**Uwagi:**
- BKM-68–78 (Mobile) przeniesione z oryginalnego Sprint 3/4
- BKM-92–99 (poprzednie FK taski) pozostają — uzupełniają nowe BKM-121–149 z S4
- Sprint trwa do 14 Jul ze względu na zakres 46 items

---

## 3. Zależności

| Zależność | Blokujący | Blokowany |
|---|---|---|
| Migracje FK | BKM-131 (S4) | BKM-132–BKM-149 |
| MileageRate fixtures | BKM-132 (S4) | BKM-133 |
| PDF generator | BKM-65 (S4) | BKM-62, BKM-66 |
| Mobile auth | BKM-71 (S5) | BKM-73, BKM-74 |
| Staging deploy | BKM-102 (S5) | BKM-107 (UAT) |

---

## 4. Definition of Done

Ticket uznajemy za ukończony gdy:

- [ ] Kod przechodzi code review (min. 1 approval)
- [ ] Testy jednostkowe przechodzą (coverage >= 80%)
- [ ] Testy integracyjne przechodzą na CI
- [ ] Dokumentacja API zaktualizowana (drf-spectacular)
- [ ] Brak błędów krytycznych w Sentry
- [ ] Ticket przeniesiony do Done w Jira

Dla FK Integration (BKM-121–BKM-149) dodatkowo:
- [ ] Walidacje biznesowe (art. 86a VAT) pokryte testami
- [ ] AuditLog tworzony dla wszystkich operacji na danych podatkowych
- [ ] Immutability MileageRate zweryfikowana testami
- [ ] Eksport przetestowany na pliku importowanym do systemu FK

---

## 5. Podsumowanie

| Sprint | Items | Zakres | Status |
|---|---|---|---|
| 0 | 13 | Infra & Setup | ✅ DONE |
| 1 | 10 | Auth & RBAC | ✅ DONE |
| 2 | 4 | Company base | ✅ DONE |
| 3 | 11 | Fleet + Drivers | ✅ DONE |
| 4 | 35 | KM + FK + Documents | 🔄 AKTYWNY (23–30 Apr) |
| 5 | 46 | Mobile + Web + Launch | TODO (1 May – 14 Jul) |

**Łącznie:** 119 items | MVP deadline: 14 Jul
