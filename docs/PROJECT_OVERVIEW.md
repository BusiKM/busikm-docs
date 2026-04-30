# BusiKM — Przegląd projektu

> Data utworzenia: 15 kwietnia 2026
> Typ dokumentu: Strategiczny przegląd projektu
> Dokumentacja powiązana: [ROADMAP.md](./ROADMAP.md) | [JIRA_PLAN.md](./JIRA_PLAN.md) | [OPENAPI_STRATEGY.md](./OPENAPI_STRATEGY.md)

---

## 1. Wizja i misja

**Wizja:** Każda polska firma transportowa prowadzi elektroniczną kilometrówkę — bez papierów, bez błędów, bez kar.

**Misja:** BusiKM automatyzuje ewidencję przebiegu pojazdów 2,5–3,5 t, eliminując papierowe formularze i integrując się z systemami księgowymi. Dajemy kierowcom aplikację mobilną, właścicielom flot — panel zarządzania, a księgowym — gotowe eksporty do FK.

**Cel strategiczny:** Zdobycie pozycji lidera na polskim rynku e-kilometrówek dla segmentu SMB w ciągu 24 miesięcy od uruchomienia. Planowane wyjście z inwestycji (sprzedaż spółki) w Q2 2029.

---

## 2. Problem

### Nowe przepisy

Od lipca 2026 r. wchodzi w życie nowelizacja ustawy o transporcie drogowym, która nakłada na pojazdy o DMC 2,5–3,5 t obowiązek prowadzenia ewidencji przebiegu (kilometrówki) zgodnej ze wzorem Ministerstwa Finansów.

### Obecna rzeczywistość

| Aspekt | Stan obecny | Konsekwencje |
|---|---|---|
| Format ewidencji | Papierowe formularze lub Excel | Błędy, brak standaryzacji |
| Wprowadzanie danych | Ręczne, po zakończeniu trasy | Opóźnienia, przeinaczenia |
| Kontrola | Brak weryfikacji w czasie rzeczywistym | Właściciel nie wie, co się dzieje z flotą |
| Zgodność z przepisami | Niejednolita | Ryzyko kar do 12 000 PLN za pojazd |
| Integracja z FK | Brak lub ręczne przepisywanie | Podwójna praca księgowych |

### Kary i ryzyko

- Brak prowadzenia ewidencji: kara administracyjna do **12 000 PLN/pojazd**.
- Nieprawidłowa ewidencja: kara do **8 000 PLN** + korekty podatkowe.
- Firmy mają **3 miesiące** na dostosowanie się — czas nagli.

---

## 3. Rozwiązanie

BusiKM to platforma SaaS, która automatyzuje cały cykl ewidencji przebiegu:

1. **Automatyczny zapis tras** — aplikacja mobilna śledzi przejazd przez GPS, zapisuje trasę, dystans i czas bez ingerencji kierowcy.
2. **Generowanie raportów PDF** — kilometrówka zgodna ze wzorem MF, gotowa do wydruku lub przesłania do urzędu.
3. **Eksport do systemów FK** — natywna integracja z Insert GT (format EDI++), z możliwością rozszerzenia na inne systemy.
4. **Panel flotowy** — właściciel/dyspozytor widzi pojazdy na mapie, zatwierdza trasy, zarządza kierowcami.
5. **Tryb biura rachunkowego** — jedno konto obsługuje wielu klientów, zbiorczy eksport danych.

---

## 4. Rynek docelowy

### Wielkość rynku

| Segment | Szacunek | Źródło |
|---|---|---|
| Pojazdy 2,5–3,5 t w Polsce | ~300 000 | CEPiK, GUS |
| Firmy posiadające takie pojazdy | ~80 000 | szacunek własny |
| Segment SMB (5–20 pojazdów) | ~25 000 firm | szacunek własny |
| TAM (Total Addressable Market) | ~90 mln PLN/rok | przy śr. 30 PLN/pojazd/mies. |

### Persony użytkowników

| Persona | Opis | Główna potrzeba |
|---|---|---|
| **Kierowca** | Pracownik w terenie, korzysta z telefonu | Prosta aplikacja, która działa w tle |
| **Właściciel / Dyspozytor** | Zarządza flotą 5–20 pojazdów | Podgląd floty, zatwierdzanie tras, kontrola kosztów |
| **Księgowy** | Wewnętrzny lub zewnętrzny | Gotowe raporty MF, eksport do Insert GT |
| **Biuro rachunkowe** | Obsługuje wielu klientów transportowych | Multi-tenant, zbiorczy eksport, fakturowanie |

### Segmenty docelowe

- Polskie firmy transportowe SMB (5–20 pojazdów o DMC 2,5–3,5 t)
- Firmy kurierskie z własnymi busami
- Firmy budowlane posiadające flotę vanów
- Biura rachunkowe obsługujące klientów transportowych

---

## 5. Kluczowe funkcje

### MVP (Sprint 0–5, 12 tygodni)

| Moduł | Funkcje |
|---|---|
| Aplikacja mobilna (RN/Expo) | Rejestracja GPS w tle, start/stop trasy, podgląd historii |
| Panel webowy (Next.js 16) | Dashboard floty, mapa pojazdów, zatwierdzanie tras |
| Backend API (Django REST) | Zarządzanie użytkownikami, pojazdami, trasami; RBAC |
| Raporty | PDF kilometrówki wg wzoru MF, filtrowanie po dacie/pojeździe |
| Eksport FK | Eksport EDI++ do Insert GT |
| Administracja | Rejestracja firmy, zaproszenia, role użytkowników |

### Post-MVP (Sprint 6–7)

- Tryb biura rachunkowego (multi-client)
- Powiadomienia push i alerty
- Integracja z kolejnymi systemami FK
- Moduł raportów zaawansowanych (koszty paliwa, amortyzacja)

Szczegółowy plan sprintów: [ROADMAP.md](./ROADMAP.md)

---

## 6. Model biznesowy

Subskrypcja per pojazd / miesiąc z 3 planami dla firm i osobnym modelem hurtowym dla biur rachunkowych:

| Plan | Cena/pojazd/mies. | Min. opłata | Limit pojazdów | Kluczowe cechy |
|---|---|---|---|---|
| Free | 0 zł | — | 1 | GPS, ewidencja, klasyfikacja, zdjęcia licznika |
| Starter | 19 zł | 38 zł | 10 | + raporty PDF (art. 86a), CSV, alerty push |
| Professional | 29 zł | 319 zł | 50 | + eksport FK (Insert GT, Comarch, Symfonia), mapa real-time, dashboard zgodności, offline |

Powyżej 50 pojazdów → kontakt indywidualny. Rozliczenie roczne: rabat -15%.

**Plan dla biur rachunkowych** (`af_standard`) — rozliczenie per aktywny pojazd klienta (aktywny = min. 1 trasa w miesiącu):

| Liczba aktywnych pojazdów | Cena za pojazd / mies. |
|---------------------------|------------------------|
| 1–30                      | 49 zł                  |
| 31–80                     | 39 zł                  |
| 81+                       | 29 zł                  |

Klienci biura rachunkowego (`af_client`) korzystają z BusiKM **gratis** dopóki BR ma aktywną subskrypcję.

**Strategia pozyskiwania klientów:**

- **Reverse trial 14 dni** — nowy użytkownik dostaje plan Professional na 14 dni, po czym wraca do Free.
- **Pilot 6 miesięcy** — pierwsi klienci korzystają bezpłatnie przez 6 miesięcy w zamian za feedback.
- **Biura rachunkowe** — 3 miesiące pełnego panelu BR za darmo, 14 dni grace, potem rozliczenie hurtowe per aktywny pojazd.

Szczegóły monetyzacji: [MONETIZATION.md](./MONETIZATION.md). Implementacja techniczna subskrypcji: [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).

---

## 7. Przewaga konkurencyjna

| Kryterium | BusiKM | Papier / Excel | Konkurenci (ogólne GPS) |
|---|---|---|---|
| Zgodność ze wzorem MF | Natywna, automatyczna | Ręczna | Brak lub ograniczona |
| Eksport do Insert GT (EDI++) | Wbudowany | Brak | Brak |
| GPS tracking w tle | Tak (RN/Expo) | Nie dotyczy | Tak, ale bez kilometrówki |
| Tryb biura rachunkowego | Multi-client | Nie dotyczy | Brak |
| Cena dla SMB | Od 0 zł (Free) / 19 zł (Starter) | Koszt pracy | Wysoka (rozwiązania flotowe) |
| Czas wdrożenia | Minuty (self-service) | Nie dotyczy | Dni/tygodnie |

**Kluczowe wyróżniki:**

1. **Jedyne rozwiązanie łączące GPS + kilometrówkę MF + eksport FK** w jednej platformie.
2. **Zaprojektowane dla segmentu 2,5–3,5 t** — konkurenci celują w ciężki transport (powyżej 3,5 t).
3. **Niski próg wejścia** — plan Free + reverse trial eliminuje barierę zakupu.
4. **Kanał biur rachunkowych** — skalowalne pozyskiwanie klientów B2B2B.

---

## 8. Timeline

```
Kwi 2026    Maj 2026    Cze 2026    Lip 2026    Sie 2026    Wrz 2026
───┬───────────┬───────────┬───────────┬───────────┬───────────┬───
   │ Sprint 0  │ Sprint 1-2│ Sprint 3-4│ Sprint 5  │ Sprint 6  │ Sprint 7
   │ Setup     │ Core API  │ Mobile +  │ MVP       │ Post-MVP  │ BR moduł
   │ DevOps    │ + Web     │ Raporty   │ Launch    │ Features  │ + skala
   │           │           │           │     ▲     │           │
   │           │           │           │     │     │           │
   │           │           │           │  USTAWA   │           │
   │           │           │           │  WCHODZI  │           │
   │           │           │           │  W ŻYCIE  │           │
```

| Kamień milowy | Data | Opis |
|---|---|---|
| Sprint 0 — Setup | Kwiecień 2026 | Infrastruktura, CI/CD, OpenAPI, Jira |
| Sprint 1–2 — Core | Maj 2026 | API użytkowników, pojazdów, tras; panel webowy |
| Sprint 3–4 — Mobile & Raporty | Czerwiec 2026 | Aplikacja mobilna, GPS, generowanie PDF |
| Sprint 5 — MVP Launch | Lipiec 2026 | Eksport FK, testy z pilotami, soft launch |
| Wejście ustawy w życie | Lipiec 2026 | Deadline regulacyjny |
| Sprint 6–7 — Post-MVP | Sierpień–Wrzesień 2026 | Biuro rachunkowe, powiadomienia, skala |
| Wyjście z inwestycji | Q2 2029 | Planowana sprzedaż spółki |

Szczegółowy plan techniczny: [ROADMAP.md](./ROADMAP.md) | Plan Jira: [JIRA_PLAN.md](./JIRA_PLAN.md)

---

## 9. Zespół i organizacja

### Stack technologiczny

| Warstwa | Technologia |
|---|---|
| Backend API | Django REST Framework (Python 3.12) |
| Aplikacja mobilna | React Native + Expo |
| Panel webowy | Next.js 16 (App Router) |
| Baza relacyjna | PostgreSQL |
| Baza GPS / telemetria | MongoDB |
| Cache / kolejki | Redis |
| CI/CD | GitHub Actions |
| Dokumentacja API | OpenAPI 3.0 (drf-spectacular) |
| Project management | Jira + Confluence |

### Organizacja pracy

- Podejście **AI-driven development** — Claude Code jako pair-programmer.
- Metodyka **API-first** — kontrakty OpenAPI przed implementacją ([OPENAPI_STRATEGY.md](./OPENAPI_STRATEGY.md)).
- Sprinty 2-tygodniowe, zarządzane w Jira ([JIRA_PLAN.md](./JIRA_PLAN.md)).
- Code review obowiązkowe, coverage minimum 80%.

---

## 10. Dokumentacja powiązana

| Dokument | Opis |
|---|---|
| [ROADMAP.md](./ROADMAP.md) | Plan techniczny, architektura, sprinty, stack |
| [JIRA_PLAN.md](./JIRA_PLAN.md) | Struktura Jira — epiki, stories, taski |
| [JIRA_MIGRATION_PLAN.md](./JIRA_MIGRATION_PLAN.md) | Plan migracji projektu do Jira |
| [OPENAPI_STRATEGY.md](./OPENAPI_STRATEGY.md) | Strategia API-first z drf-spectacular |
| `MONETIZATION.md` *(planowany)* | Szczegółowy model monetyzacji i cennik |
| `COMPETITORS.md` *(planowany)* | Analiza konkurencji |
| `PERSONAS.md` *(planowany)* | Szczegółowe persony użytkowników i user journeys |
