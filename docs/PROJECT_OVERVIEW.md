# BusiKM — Przegląd projektu

> Data utworzenia: 15 kwietnia 2026
> Typ dokumentu: Strategiczny przegląd projektu
> Dokumentacja powiązana: [ROADMAP.md](./ROADMAP.md) | [JIRA_PLAN.md](./JIRA_PLAN.md) | [OPENAPI_STRATEGY.md](./OPENAPI_STRATEGY.md)

---

## 1. Wizja i misja

**Wizja:** Każda polska mobilna mikrofirma prowadzi elektroniczną kilometrówkę — bez papierów, bez błędów, bez ryzyka kontroli US.

**Misja:** BusiKM automatyzuje ewidencję przebiegu samochodów osobowych w działalności gospodarczej, eliminując papierowe formularze i integrując się z systemami księgowymi. Dajemy kierowcom aplikację mobilną, właścicielom JDG i mikrofirm — panel zarządzania, a księgowym i biurom rachunkowym — gotowe eksporty do FK z prawidłowymi proporcjami VAT.

**Cel strategiczny:** Zdobycie pozycji lidera na polskim rynku e-kilometrówek w segmencie JDG / mikrofirm i jako standardowe narzędzie biur rachunkowych w ciągu 24 miesięcy od uruchomienia. Planowane wyjście z inwestycji (sprzedaż spółki) w Q2 2029.

---

## 2. Problem

### Trzy obszary podatkowe wymagające ewidencji

Brak prawidłowej kilometrówki naraża firmę na utratę odliczeń w trzech niezależnych obszarach:

| Obszar | Podstawa prawna | Skutek braku ewidencji |
|--------|-----------------|------------------------|
| 100% odliczenia VAT od pojazdu firmowego | art. 86a ustawy o VAT + druk VAT-26 | Spadek do 50% VAT, korekta JPK wstecz, dopłata + odsetki |
| 100% kosztów pojazdu w PIT/CIT | art. 23 ust. 7 ustawy o PIT | Koszty zakwestionowane przez US, dopłata podatku |
| Zwrot km dla pracowników bez PIT | art. 21 ust. 1 pkt 23b ustawy o PIT | Zwrot opodatkowany jako przychód, składki ZUS |

Stawki ewidencji: **Dz.U. 2023 poz. 5** — 0,89 / 1,15 / 0,69 / 0,42 zł/km wg pojemności silnika.

### Obecna rzeczywistość

| Aspekt | Stan obecny | Konsekwencje |
|---|---|---|
| Format ewidencji | Papierowe formularze lub Excel | Błędy, brak standaryzacji, łatwo zgubić |
| Wprowadzanie danych | Ręczne, po zakończeniu miesiąca z pamięci | Opóźnienia, przeinaczenia, "wpisz tam coś" |
| Weryfikowalność w US | Brak twardych dowodów GPS | Trudno udowodnić służbowy charakter trasy |
| Zgodność z przepisami | Niejednolita | Ryzyko korekt JPK i dopłat 15 000 – 40 000 zł |
| Integracja z FK | Brak lub ręczne przepisywanie | Podwójna praca księgowych, błędy w VAT |

### Kary i ryzyko kontroli US

- Kontrola podatkowa może sięgnąć **5 lat wstecz**.
- Brak / nieprawidłowa ewidencja → korekta JPK + dopłata zaległego VAT (różnica 100% vs 50%) → 15 000 – 40 000 zł plus odsetki za zwłokę.
- Brak ewidencji → koszty pojazdu zakwestionowane w PIT/CIT → kolejna dopłata podatku.
- Hook emocjonalny dla klienta: **"spij spokojnie wiedząc, że dokumentacja wytrzyma kontrolę"**, nie "zaoszczędź 2h w miesiącu".

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

Polska 2026: **2,8 mln aktywnych firm** (REGON), 96% to mikrofirmy, 82,4% nowych rejestracji to JDG.

| Segment | Wielkość | Źródło |
|---|---|---|
| **A. JDG mobile (1 auto)** | 400 000 – 600 000 firm | REGON, GUS, szacunek własny |
| **B. Mikrofirma 2–5 aut** | 150 000 – 250 000 firm | szacunek własny |
| **C. Biura rachunkowe (kanał)** | 17 181 biur | rejestr Krajowej Izby Doradców Podatkowych |
| Wzrost organiczny | ~50 000 nowych JDG/rok | GUS rejestracje |
| TAM (Total Addressable Market) | ~150 mln zł/rok | mix Starter/Professional + kanał BR |

### Persony użytkowników

| Persona | Opis | Główna potrzeba |
|---|---|---|
| **Marek (kierowca pracowniczy)** | 38 lat, handlowiec, Toyota Corolla firmowa, 3 000–4 000 km/mies., Śląsk | "GPS sam zapisuje" — 10 sekund × kilkanaście razy zamiast 60 minut na koniec miesiąca |
| **Jan (właściciel JDG)** | 38 lat, handlowiec / budowlaniec / serwisant / doradca, jedno auto na leasingu | Kilometrówka która **wytrzyma kontrolę US** |
| **Ania (księgowa)** | 34 lata, główna księgowa firmy budowlanej, 18 aut, Poznań | Eksport z **właściwymi proporcjami VAT** + twarde liczby dla CFO |
| **Magda (właścicielka BR)** | 41 lat, biuro rachunkowe, 3 pracownice, 90 klientów, Wrocław | Klient sam zatwierdza trasę → gotowy plik do importu w Comarch → klienci korzystają gratis |

### Segmenty docelowe

- **JDG mobile** — handlowcy, doradcy, budowlańcy, serwisanci. 1 auto na leasingu. Biuro rachunkowe 250–400 zł/mies. Hook: ochrona przed kontrolą US.
- **Mikrofirmy 2–5 aut** — budowlane, sprzątające, kurierskie, agencje handlowe. Mix VAT-26 / 50% VAT / prywatne.
- **Firmy z księgową wewnętrzną** — 5–50 aut, mix proporcji VAT, potrzebują eksportu do FK.
- **Biura rachunkowe** — 17 181 firm w Polsce, kluczowy kanał dystrybucji (1 BR = 5–20 klientów = 25 500 pojazdów przy 10% adopcji).

> Szczegółowy plan komunikacji per persona, kalendarz treści i program partnerski BR — patrz [MARKETING_PLAN.md](./MARKETING_PLAN.md).

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

1. **Jedyne rozwiązanie łączące GPS + kilometrówkę MF + eksport FK** w jednej platformie, w cenie 19–29 zł/pojazd.
2. **Zaprojektowane dla JDG i mikrofirm** — konkurenci flotowi celują w segment 50+ pojazdów (50–150 zł/pojazd, kompleksowe wdrożenia).
3. **Trzy obszary podatkowe ochronione** — art. 86a (VAT), art. 23 ust. 7 (PIT/CIT), art. 21 ust. 1 pkt 23b (zwroty pracownicze) w jednym narzędziu.
4. **Niski próg wejścia** — plan Free + reverse trial eliminuje barierę zakupu.
5. **Kanał biur rachunkowych** — model "klienci gratis dopóki BR ma sub" eliminuje tarcie sprzedażowe; 17 181 BR = ogromne pole dystrybucji.

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
