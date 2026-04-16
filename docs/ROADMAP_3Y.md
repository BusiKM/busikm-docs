# BusiKM — Roadmapa 3-letnia: od MVP do sprzedazy firmy

> Data utworzenia: 15 kwietnia 2026
> Horyzont: Q3 2026 — Q2 2029
> Cel: od uruchomienia MVP do sprzedazy spolki (exit)
> Dokumentacja powiazana: [ROADMAP.md](./ROADMAP.md) | [MONETIZATION.md](./MONETIZATION.md) | [SPRINT_PLAN.md](./SPRINT_PLAN.md)

---

## Spis tresci

1. [Podsumowanie](#1-podsumowanie)
2. [Rok 1: H2 2026 — Launch + Product-Market Fit](#2-rok-1-h2-2026--launch--product-market-fit)
3. [Rok 2: 2027 — Skalowanie + Funkcje AI](#3-rok-2-2027--skalowanie--funkcje-ai)
4. [Rok 3: 2028-Q2 2029 — Skala + Przygotowanie do Exit](#4-rok-3-2028-q2-2029--skala--przygotowanie-do-exit)
5. [Prognozy przychodowe](#5-prognozy-przychodowe)
6. [Tabela KPI](#6-tabela-kpi)
7. [Plan rozwoju zespolu](#7-plan-rozwoju-zespolu)
8. [Czynniki ryzyka](#8-czynniki-ryzyka)

---

## 1. Podsumowanie

BusiKM to platforma SaaS do zarzadzania flota, tras i kilometrowek dla firm transportowych
i biur rachunkowych w Polsce (docelowo CEE). Roadmapa obejmuje 3 lata: od uruchomienia MVP
(lipiec 2026) przez skalowanie i ekspansje miedzynarodowa, az do sprzedazy spolki w 2029 roku.

**Kamienie milowe:**

| Okres         | Kamien milowy                          | Docelowy ARR       |
|---------------|----------------------------------------|---------------------|
| Q3 2026       | MVP live, 10 firm pilotazowych         | —                   |
| Q4 2026       | Monetyzacja, 100 platnych firm         | 360 000 PLN         |
| Q2 2027       | Funkcje AI (RAG, OCR)                  | 1 800 000 PLN       |
| Q3 2027       | Ekspansja CZ/SK                        | 3 000 000 PLN       |
| Q4 2027       | Klienci enterprise, e-TOLL/SENT        | 4 800 000 PLN       |
| Q2 2028       | Marketplace, rozbudowa platformy       | 10 000 000 PLN      |
| Q4 2028       | Przygotowanie do exit                  | 20 000 000 PLN      |
| Q2 2029       | Sprzedaz spolki                        | 100-200M PLN wycena |

---

## 2. Rok 1: H2 2026 — Launch + Product-Market Fit

### Q3 2026 (lipiec-wrzesien): Uruchomienie MVP

> Zgodne z: [SPRINT_PLAN.md](./SPRINT_PLAN.md) — Sprinty 5-7
> Zgodne z: [ROADMAP.md](./ROADMAP.md) — Sekcja 10, Q3 2026

**Sprint 5 (26 cze — 9 lip): MVP live**
- Uruchomienie produkcyjne platformy BusiKM
- Onboarding 5-10 firm pilotazowych (reczny, white-glove)
- Landing page na busikm.pl (konwersja trial)
- System zarzadzania trialem (14-dniowy reverse trial)
- Feedback loop z firmami pilotazowymi (Slack/Teams + ankiety NPS)

**Sprint 6 (10 lip — 23 lip): Post-MVP — Biura rachunkowe + rozszerzenia**
- Pelna obsluga multi-tenant dla biur rachunkowych (AF)
- Self-serve rejestracja (bez recznego onboardingu)
- Dashboard compliance (przegladay, OC, tachograf G2V2)
- Mapa real-time (WebSocket + GPS live tracking)
- Integracja z Insert GT w wersji produkcyjnej

**Sprint 7 (24 lip — 6 sie): Post-MVP — Raporty + E2E**
- Raporty kosztow delegacji i floty
- Playwright E2E tests (web) + Detox E2E tests (mobile)
- WatermelonDB full offline mode (mobile)
- k6 performance testing (100 concurrent users, p95 < 500ms)
- Bugfixy i usprawnienia UX na podstawie feedbacku z pilotazy

**Sierpien-wrzesien 2026: Iteracja + growth**
- Kontynuacja onboardingu nowych firm
- A/B testing landing page (konwersja trial → paid)
- Content marketing: artykuly o nowych przepisach transportowych
- Outreach do biur rachunkowych (AF) — partnerstw pilotazowy
- Pierwszy webinar: "Jak automatyzowac kilometrowki zgodnie z prawem"
- Decyzja cenowa na podstawie Van Westendorp + danych uzytkowych z pilotazy

**KPI Q3 2026:**

| Metryka              | Cel           |
|----------------------|---------------|
| Zarejestrowane firmy | 50            |
| Firmy platne         | 10            |
| MRR                  | 5 000 PLN     |
| NPS (z pilotazy)     | > 30          |
| Churn                | < 10%         |

---

### Q4 2026 (pazdziernik-grudzien): Monetyzacja + Wzrost

> Zgodne z: [ROADMAP.md](./ROADMAP.md) — Sekcja 10, Q4 2026+
> Zgodne z: [MONETIZATION.md](./MONETIZATION.md)

**Billing i platnosci:**
- Stripe Billing live:
  - Checkout (embedded payment form)
  - Webhooks (invoice.paid, subscription.updated, payment_failed)
  - Customer Portal (zmiana planu, anulowanie, historia faktur)
  - Automatyczna faktura VAT (Stripe Tax lub wlasna generacja)
- Feature gating aktywowany:
  - Free: do 3 pojazdow, raporty podstawowe
  - Starter (29 PLN/pojazd/mies.): pelna funkcjonalnosc, bez FK
  - Professional (49 PLN/pojazd/mies.): integracje FK, compliance dashboard
  - Enterprise (79 PLN/pojazd/mies.): white-label, API, dedykowane wsparcie

**Integracje FK:**
- Comarch ERP Optima — pelna integracja (REST API)
  - Eksport tras i kosztow do modulu ksiegowego
  - Synchronizacja danych pojazdow
- Symfonia — integracja (XML/CSV export)
  - Generowanie plikow importowych zgodnych z formatem Symfonii

**Mobile:**
- Full offline (WatermelonDB) — sync po odzyskaniu polaczenia
- OTA updates optymalizacja (expo-updates, delta updates)
- Push notifications — konfigurowalny harmonogram alertow

**Marketing i sprzedaz:**
- Case studies z firm pilotazowych (2-3 historie sukcesu)
- Kampania Google Ads (frazy: "kilometrowka online", "ewidencja przebiegu pojazdu")
- Program partnerski AF (prowizja za poleconych klientow)
- Obecnosc na konferencji branzy transportowej

**Zespol:**
- Zatrudnienie 1 junior developer (fullstack / mobile)
- Zatrudnienie 1 customer support / success

**KPI Q4 2026:**

| Metryka              | Cel            |
|----------------------|----------------|
| Zarejestrowane firmy | 200            |
| Firmy platne         | 100            |
| MRR                  | 30 000 PLN     |
| ARR                  | 360 000 PLN    |
| Churn                | < 8%           |
| NPS                  | > 35           |

---

## 3. Rok 2: 2027 — Skalowanie + Funkcje AI

### Q1 2027 (styczen-marzec): Przygotowanie miedzynarodowe + Public API

**Public API:**
- Public REST API (dla integracji third-party)
  - Dokumentacja OpenAPI 3.0 + portal developerski
  - API keys + rate limiting per key
  - Sandbox environment dla developerow
- Webhooks:
  - trip.completed — powiadomienie o zakonczeniu trasy
  - alert.created — powiadomienie o nowym alercie (OC, przeglad)
  - export.ready — powiadomienie o gotowym eksporcie FK
  - Retry logic + webhook log w panelu klienta

**Ekspansja miedzynarodowa — research:**
- Czechy: regulacje transportowe, system FK (Pohoda, Money S3), stawki za km
- Slowacja: regulacje, system FK (Omega), specyfika rynku
- Tlumaczenie UI/UX (CZ/SK) — przygotowanie infrastruktury i18n

**Integracje krajowe:**
- KSeF (Krajowy System e-Faktur) — pelna integracja
  - Wystawianie e-faktur bezposrednio z BusiKM
  - Pobieranie e-faktur (kosztowych) dla floty

**White-label:**
- Przygotowanie architektury white-label:
  - Custom branding per AF lub duzy klient (logo, kolory, domena)
  - Izolacja danych i konfiguracji
  - Panel administracyjny white-label

**KPI Q1 2027:**

| Metryka              | Cel            |
|----------------------|----------------|
| Zarejestrowane firmy | 500            |
| Firmy platne         | 300            |
| MRR                  | 80 000 PLN     |
| ARR                  | 960 000 PLN    |
| Churn                | < 6%           |
| NPS                  | > 40           |

**Zespol:** zatrudnienie 1 mobile developer + 1 frontend developer.

---

### Q2 2027 (kwiecien-czerwiec): Funkcje AI Premium

**RAG Engine — "Asystent Przepisow":**
- AI chatbot odpowiadajacy na pytania o regulacje transportowe
- Stack: FastAPI + LangChain + ChromaDB/Pgvector
- Baza wiedzy: Dziennik Ustaw, rozporzadzenia MF, przepisy transportowe
- Aktualizacja bazy wiedzy co 24h (monitor zmian w prawie)
- Kontekst per firma (uwzglednienie typu floty, DMC, ADR)

**OCR Service:**
- Automatyczne skanowanie faktur paliwowych
  - Zdjecie paragonu/faktury → rozpoznanie kwoty, litrow, stacji
  - Automatyczne przypisanie do pojazdu i trasy
- OCR drogomierza — ulepszony model (wyzszy accuracy)

**AI optymalizacja tras:**
- Sugestie optymalizacji tras na podstawie historycznych danych GPS
- Analiza: najczestsze trasy, czas przejazdu, zuzycie paliwa
- Rekomendacje oszczednosci (alternatywne trasy, optymalizacja postojow)

**Premium AI tier:**
- Dodatkowa warstwa cenowa: +15 PLN/pojazd/mies. za funkcje AI
- Lub: pakiet AI wlaczony w plan Enterprise

**KPI Q2 2027:**

| Metryka              | Cel                        |
|----------------------|----------------------------|
| Zarejestrowane firmy | 800                        |
| MRR                  | 150 000 PLN                |
| ARR                  | 1 800 000 PLN              |
| Adopcja AI           | 20% platnych klientow      |
| Churn                | < 5%                       |

---

### Q3 2027 (lipiec-wrzesien): Uruchomienie na rynku czeskim i slowackim

**Lokalizacja aplikacji:**
- Pelne tlumaczenie UI/UX na jezyk czeski i slowacki
- Lokalizacja dokumentacji i helpu (CZ/SK)
- Obsluga lokalnych formatow dat, walut (CZK, EUR)

**Integracje z lokalnymi systemami FK:**
- Czechy: Pohoda (XML import/export), Money S3 (API)
- Slowacja: Omega (CSV/XML export)
- Lokalne konfiguracje stawek za km (czeski/slowacki regulamin)

**Partnerstwa lokalne:**
- Wspolpraca z czeskimi/slowackimi biurami rachunkowymi
- Lokalni partnerzy sprzedazowi (resellers)
- Marketing lokalny: LinkedIn CZ/SK, branozowe portale transportowe

**KPI Q3 2027:**

| Metryka              | Cel                          |
|----------------------|------------------------------|
| Firmy ogolem        | 1 200 (w tym 200 CZ/SK)     |
| MRR                  | 250 000 PLN                  |
| ARR                  | 3 000 000 PLN                |
| Churn                | < 5%                         |
| NPS                  | > 45                         |

---

### Q4 2027 (pazdziernik-grudzien): Klienci enterprise + e-TOLL/SENT

**Integracje systemow panstwowych:**
- e-TOLL — elektroniczny system poboru oplat drogowych
  - Automatyczne rozliczanie oplat drogowych per pojazd
  - Raportowanie kosztow e-TOLL w raportach floty
- SENT — system monitorowania przewozu towarow wrazliwych
  - Automatyczne generowanie zgloszen SENT
  - Sledzenie statusu zgloszen

**Funkcje enterprise:**
- SSO (SAML 2.0 / OIDC) — logowanie przez firmowy IdP
- Audit logs — pelna historia zmian z mozliwoscia eksportu
- Custom roles — definiowanie wlasnych rol i uprawnien
- SLA — gwarantowany czas odpowiedzi support (4h / 8h)

**Duze floty (100+ pojazdow):**
- Optymalizacja wydajnosci:
  - Batch operations (masowe przypisywanie tras, aktualizacja pojazdow)
  - Zoptymalizowane zapytania SQL (partycjonowanie po firmie)
  - Dedykowane instancje Redis per duzy klient
- Dashboard fleet manager — widok na setki pojazdow jednoczesnie
- Hierarchia organizacyjna (oddzialy, regiony)

**White-label — pierwsi klienci:**
- Uruchomienie white-label dla duzych sieci AF
- Custom domena, branding, onboarding
- Revenue share z partnerami white-label

**KPI Q4 2027:**

| Metryka              | Cel                          |
|----------------------|------------------------------|
| Firmy ogolem        | 1 800                        |
| MRR                  | 400 000 PLN                  |
| ARR                  | 4 800 000 PLN                |
| Klienci enterprise   | 10                           |
| Churn                | < 4%                         |
| NPS                  | > 45                         |

**Zespol:** 8 osob (4 dev, 1 PM, 1 support, 1 sales, 1 marketing).

---

## 4. Rok 3: 2028-Q2 2029 — Skala + Przygotowanie do Exit

### Q1 2028 (styczen-marzec): Finansowanie + Nowe rynki

**Finansowanie:**
- Revenue-based financing lub mala runda Series A (jesli potrzebna)
- Cel: 500K — 2M PLN na marketing + ekspansje
- Alternatywa: kontynuacja bootstrapu jesli ARR wspiera wzrost organiczny
- Przygotowanie materialow inwestorskich (pitch deck, model finansowy)

**Ekspansja: Rumunia + Wegry:**
- Duze rynki transportowe, podobne regulacje (UE)
- Lokalizacja UI/UX (RO/HU)
- Integracje z lokalnymi systemami FK:
  - Rumunia: Saga C, WinMentor
  - Wegry: Kulcs-Soft, Novitax
- Partnerstwa z lokalnymi AF

**Zaawansowany dashboard analityczny:**
- Wykorzystanie floty (% czasu w trasie vs postoj)
- Trendy kosztowe (paliwo, serwis, oplaty drogowe)
- Wydajnosc kierowcow (punktualnosc, zuzycie paliwa, styl jazdy)
- Benchmarking — porownanie z branza (anonimowe dane zagregowane)

**KPI Q1 2028:**

| Metryka              | Cel                          |
|----------------------|------------------------------|
| Firmy ogolem        | 2 500                        |
| MRR                  | 600 000 PLN                  |
| ARR                  | 7 200 000 PLN                |
| Rynki                | PL, CZ, SK, RO, HU          |
| Churn                | < 4%                         |

---

### Q2 2028 (kwiecien-czerwiec): Rozbudowa platformy

**Marketplace integracji:**
- Karty paliwowe (Orlen, Shell, BP) — automatyczny import transakcji
- Ubezpieczyciele — porownywarka OC/AC dla floty
- Serwisy oponiarskie — zarzadzanie sezonowa wymiana opon
- API dla partnerow — self-serve integracja

**Rozbudowa aplikacji kierowcy:**
- Sledzenie certyfikatow ADR (daty waznosci, powiadomienia)
- Monitoring zmeczenia kierowcy (dane z tachografu cyfrowego)
- Raportowanie czasu pracy kierowcy (zgodnosc z przepisami UE)

**AI predykcyjne:**
- Predictive maintenance — alerty serwisowe na podstawie przebiegu + historii
- Przewidywanie kosztow floty (ML na danych historycznych)
- Anomaly detection — wykrywanie nieregularnosci w trasach/zuzycui paliwa

**KPI Q2 2028:**

| Metryka              | Cel                          |
|----------------------|------------------------------|
| Firmy ogolem        | 3 500                        |
| ARR                  | 10 000 000 PLN               |
| Integracje marketplace | 10+                        |
| Churn                | < 3.5%                       |

---

### Q3 2028 (lipiec-wrzesien): Ekspansja EU

**Nowe rynki:**
- Bulgaria — duzy rynek transportu miedzynarodowego
- Kraje baltyckie: Litwa, Lotwa, Estonia
- Lokalizacja, integracje FK, partnerstwa

**Modul compliance EU:**
- CMR (Konwencja o umowie miedzynarodowego przewozu drogowego towarow)
- Reguly kabotazu (ograniczenia przewozow w krajach UE)
- Raportowanie crossborder — automatyczna klasyfikacja tras miedzynarodowych

**Multi-currency:**
- Obsluga PLN, CZK, EUR, RON, HUF, BGN
- Automatyczne przeliczanie kosztow wg kursow NBP/ECB
- Fakturowanie w lokalnej walucie klienta

**KPI Q3 2028:**

| Metryka              | Cel                          |
|----------------------|------------------------------|
| Firmy ogolem        | 5 000 (1 500 miedzynarodowych) |
| ARR                  | 15 000 000 PLN               |
| Rynki                | 9 krajow                     |
| Churn                | < 3%                         |

---

### Q4 2028 (pazdziernik-grudzien): Przygotowanie do exit

**Audyt finansowy:**
- Audyt Big 4 lub renomowana firma lokalna (np. Grant Thornton, BDO)
- Wyczyszczenie ksiegowosci — pelna transparentnosc przychodow
- Historyczne KPI udokumentowane i zweryfikowane

**Porzadki prawne:**
- IP (wlasnosc intelektualna) — pelna dokumentacja, prawa autorskie
- Umowy — ujednolicenie umow z klientami, partnerami, pracownikami
- RODO/GDPR — pelna dokumentacja compliance, DPO (jesli wymagane)
- Regulaminy, polityka prywatnosci — przeglad prawny

**Data room:**
- Przygotowanie data room dla due diligence:
  - Dokumenty korporacyjne (KRS, umowa spolki, uchwaly)
  - Finanse (bilans, P&L, cash flow — 3 lata)
  - Umowy (klienci, partnerzy, pracownicy, dostawcy)
  - Technologia (architektura, stack, IP, licencje)
  - KPI (MRR, ARR, churn, NPS, CAC, LTV — historyczne)
  - Ryzyka (identyfikacja i mitygacja)

**Optymalizacja metryk:**
- Redukcja churn do < 3%
- Maksymalizacja NPS (cel > 50)
- Sprzatanie dlugu technicznego
- Stabilizacja i automatyzacja procesow operacyjnych

**KPI Q4 2028:**

| Metryka              | Cel                          |
|----------------------|------------------------------|
| Firmy ogolem        | 6 000                        |
| ARR                  | 20 000 000 PLN               |
| Churn                | < 3%                         |
| NPS                  | > 50                         |
| Zespol               | 10-12 osob                   |

---

### Q1 2029 (styczen-marzec): Due Diligence

**Potencjalni nabywcy:**

| Typ                    | Przyklady                                         |
|------------------------|----------------------------------------------------|
| Fleet management SaaS  | Vimcar/Avrios (DE), Samsara (US), Fleet Complete   |
| Telematyka              | Cartrack, Webfleet (Bridgestone), TomTom           |
| PE funds (CEE focus)    | Abris Capital, MCI Capital, Enterprise Investors   |
| Polskie tech companies  | Asseco, Comarch, Vercom                            |
| Strategic buyers        | InsERT (Subiekt), Sage, SAP (SMB division)         |

**Proces:**
- Zaangazowanie M&A advisor / investment bank (opcjonalnie)
- Przygotowanie Information Memorandum (IM)
- Otwarcie data room dla wybranych zainteresowanych
- Proces due diligence (finansowe, prawne, technologiczne)
- Management presentations

**Docelowa wycena:**
- Metoda: 5-10x ARR (standard dla SaaS B2B)
- Przy ARR 20M PLN: wycena 100-200M PLN (25-50M EUR)
- Premium za: wzrost >100% r/r, niski churn, ekspansja miedzynarodowa, AI features

---

### Q2 2029 (kwiecien-czerwiec): Sprzedaz

**Negocjacje i zamkniecie:**
- Negocjacja warunkow (cena, earn-out, escrow)
- Podpisanie SPA (Share Purchase Agreement)
- Zamkniecie transakcji (closing)

**Okres przejsciowy:**
- Zalozyciel pozostaje 6-12 miesiecy (transition period)
- Knowledge transfer do zespolu nabywcy
- Integracja z ekosystemem nabywcy (jesli dotyczy)
- Stopniowe przekazywanie operacji

---

## 5. Prognozy przychodowe

### Scenariusz bazowy

| Kwartal   | Firmy | Platne | Sr. poj./firma | ARPU (PLN/mies.) | MRR (PLN)  | ARR (PLN)     |
|-----------|-------|--------|-----------------|-------------------|------------|---------------|
| Q3 2026   | 50    | 10     | 5               | 500               | 5 000      | 60 000        |
| Q4 2026   | 200   | 100    | 6               | 300               | 30 000     | 360 000       |
| Q1 2027   | 500   | 300    | 6               | 267               | 80 000     | 960 000       |
| Q2 2027   | 800   | 500    | 7               | 300               | 150 000    | 1 800 000     |
| Q3 2027   | 1 200 | 800    | 7               | 313               | 250 000    | 3 000 000     |
| Q4 2027   | 1 800 | 1 200  | 8               | 333               | 400 000    | 4 800 000     |
| Q1 2028   | 2 500 | 1 700  | 8               | 353               | 600 000    | 7 200 000     |
| Q2 2028   | 3 500 | 2 400  | 8               | 347               | 833 000    | 10 000 000    |
| Q3 2028   | 5 000 | 3 500  | 9               | 357               | 1 250 000  | 15 000 000    |
| Q4 2028   | 6 000 | 4 200  | 9               | 397               | 1 667 000  | 20 000 000    |
| Q1 2029   | 6 500 | 4 600  | 9               | 399               | 1 833 000  | 22 000 000    |
| Q2 2029   | 7 000 | 5 000  | 10              | 400               | 2 000 000  | 24 000 000    |

### Scenariusz konserwatywny (0.6x bazowego)

| Kwartal   | Firmy | Platne | MRR (PLN)  | ARR (PLN)     |
|-----------|-------|--------|------------|---------------|
| Q3 2026   | 30    | 5      | 2 500      | 30 000        |
| Q4 2026   | 120   | 60     | 18 000     | 216 000       |
| Q1 2027   | 300   | 180    | 48 000     | 576 000       |
| Q2 2027   | 480   | 300    | 90 000     | 1 080 000     |
| Q3 2027   | 720   | 480    | 150 000    | 1 800 000     |
| Q4 2027   | 1 080 | 720    | 240 000    | 2 880 000     |
| Q1 2028   | 1 500 | 1 020  | 360 000    | 4 320 000     |
| Q2 2028   | 2 100 | 1 440  | 500 000    | 6 000 000     |
| Q3 2028   | 3 000 | 2 100  | 750 000    | 9 000 000     |
| Q4 2028   | 3 600 | 2 520  | 1 000 000  | 12 000 000    |
| Q1 2029   | 3 900 | 2 760  | 1 100 000  | 13 200 000    |
| Q2 2029   | 4 200 | 3 000  | 1 200 000  | 14 400 000    |

### Scenariusz optymistyczny (1.5x bazowego)

| Kwartal   | Firmy  | Platne | MRR (PLN)  | ARR (PLN)     |
|-----------|--------|--------|------------|---------------|
| Q3 2026   | 75     | 15     | 7 500      | 90 000        |
| Q4 2026   | 300    | 150    | 45 000     | 540 000       |
| Q1 2027   | 750    | 450    | 120 000    | 1 440 000     |
| Q2 2027   | 1 200  | 750    | 225 000    | 2 700 000     |
| Q3 2027   | 1 800  | 1 200  | 375 000    | 4 500 000     |
| Q4 2027   | 2 700  | 1 800  | 600 000    | 7 200 000     |
| Q1 2028   | 3 750  | 2 550  | 900 000    | 10 800 000    |
| Q2 2028   | 5 250  | 3 600  | 1 250 000  | 15 000 000    |
| Q3 2028   | 7 500  | 5 250  | 1 875 000  | 22 500 000    |
| Q4 2028   | 9 000  | 6 300  | 2 500 000  | 30 000 000    |
| Q1 2029   | 9 750  | 6 900  | 2 750 000  | 33 000 000    |
| Q2 2029   | 10 500 | 7 500  | 3 000 000  | 36 000 000    |

---

## 6. Tabela KPI

Kwartalne cele do sledzenia (scenariusz bazowy):

| Kwartal   | MRR (PLN)  | ARR (PLN)     | Firmy | Platne | Churn | NPS  | CAC (PLN) | LTV (PLN) |
|-----------|------------|---------------|-------|--------|-------|------|-----------|-----------|
| Q3 2026   | 5 000      | 60 000        | 50    | 10     | < 10% | > 30 | 500       | 3 000     |
| Q4 2026   | 30 000     | 360 000       | 200   | 100    | < 8%  | > 35 | 400       | 4 500     |
| Q1 2027   | 80 000     | 960 000       | 500   | 300    | < 6%  | > 40 | 350       | 5 800     |
| Q2 2027   | 150 000    | 1 800 000     | 800   | 500    | < 5%  | > 40 | 300       | 7 200     |
| Q3 2027   | 250 000    | 3 000 000     | 1 200 | 800    | < 5%  | > 45 | 280       | 7 500     |
| Q4 2027   | 400 000    | 4 800 000     | 1 800 | 1 200  | < 4%  | > 45 | 250       | 10 000    |
| Q1 2028   | 600 000    | 7 200 000     | 2 500 | 1 700  | < 4%  | > 45 | 250       | 10 600    |
| Q2 2028   | 833 000    | 10 000 000    | 3 500 | 2 400  | < 3.5%| > 45 | 230       | 11 900    |
| Q3 2028   | 1 250 000  | 15 000 000    | 5 000 | 3 500  | < 3%  | > 50 | 220       | 14 300    |
| Q4 2028   | 1 667 000  | 20 000 000    | 6 000 | 4 200  | < 3%  | > 50 | 200       | 15 900    |
| Q1 2029   | 1 833 000  | 22 000 000    | 6 500 | 4 600  | < 3%  | > 50 | 200       | 16 000    |
| Q2 2029   | 2 000 000  | 24 000 000    | 7 000 | 5 000  | < 3%  | > 50 | 200       | 16 000    |

**Definicje metryk:**
- **MRR** — miesieczny przychod cykliczny (z aktywnych subskrypcji)
- **ARR** — roczny przychod cykliczny (MRR x 12)
- **Churn** — procent firm rezygnujacych w danym miesiacu
- **NPS** — wskaznik satysfakcji klienta (Net Promoter Score)
- **CAC** — koszt pozyskania jednego platnego klienta
- **LTV** — calkowity przychod z klienta w calym okresie wspolpracy

---

## 7. Plan rozwoju zespolu

| Okres     | Liczba osob | Role                                                        |
|-----------|-------------|--------------------------------------------------------------|
| Q3 2026   | 1           | Zalozyciel (fullstack dev + PM + biznes)                     |
| Q4 2026   | 3           | + Junior developer, + Customer support                       |
| Q1 2027   | 5           | + Mobile developer, + Frontend developer                     |
| Q2 2027   | 6           | + AI/ML engineer (RAG, OCR)                                  |
| Q3 2027   | 7           | + Sales / Business development (CZ/SK)                       |
| Q4 2027   | 8           | + Product Manager                                            |
| Q1 2028   | 9           | + Marketing specialist                                       |
| Q2 2028   | 10          | + Senior backend developer                                   |
| Q3 2028   | 11          | + DevOps / SRE                                               |
| Q4 2028   | 12          | + QA engineer                                                |

**Struktura docelowa (12 osob):**

```
CEO / Founder
├── Engineering (5 osob)
│   ├── Senior backend developer
│   ├── Mobile developer
│   ├── Frontend developer
│   ├── Junior developer
│   └── DevOps / SRE
│
├── Product (2 osoby)
│   ├── Product Manager
│   └── QA engineer
│
├── AI (1 osoba)
│   └── AI/ML engineer
│
├── Sprzedaz & Marketing (2 osoby)
│   ├── Sales / BD
│   └── Marketing specialist
│
└── Wsparcie (1 osoba)
    └── Customer support / success
```

**Koszty zespolu (szacunki miesieczne, brutto pracodawcy):**

| Okres     | Zespol | Koszt zespolu/mies. | % MRR |
|-----------|--------|---------------------|-------|
| Q3 2026   | 1      | 15 000 PLN          | 300%  |
| Q4 2026   | 3      | 35 000 PLN          | 117%  |
| Q1 2027   | 5      | 65 000 PLN          | 81%   |
| Q2 2027   | 6      | 85 000 PLN          | 57%   |
| Q3 2027   | 7      | 100 000 PLN         | 40%   |
| Q4 2027   | 8      | 120 000 PLN         | 30%   |
| Q1 2028   | 9      | 140 000 PLN         | 23%   |
| Q2 2028   | 10     | 160 000 PLN         | 19%   |
| Q3 2028   | 11     | 180 000 PLN         | 14%   |
| Q4 2028   | 12     | 200 000 PLN         | 12%   |

---

## 8. Czynniki ryzyka

### 8.1 Konkurencja

| Ryzyko                                         | Prawdopodobienstwo | Wplyw  | Mitygacja                                                |
|------------------------------------------------|--------------------|--------|----------------------------------------------------------|
| Wejscie duzego gracza (Samsara, Webfleet) na rynek PL | Srednie       | Wysoki | Fokus na niszeu (MF kilometrowka + FK integracje)        |
| Lokalni konkurenci (Flotman, GPS Guardian)      | Wysokie            | Sredni | Lepszy UX, integracje FK, AI features                    |
| Darmowe alternatywy (Excel, Google Sheets)      | Wysokie            | Sredni | Edukacja rynku, compliance jako USP                      |

### 8.2 Zmiany regulacyjne

| Ryzyko                                         | Prawdopodobienstwo | Wplyw  | Mitygacja                                                |
|------------------------------------------------|--------------------|--------|----------------------------------------------------------|
| Zmiana przepisow o kilometrowkach               | Niskie             | Wysoki | Monitor Dziennika Ustaw, szybka adaptacja                |
| Obowiazek KSeF (zmiana terminow)                | Srednie            | Sredni | Wczesna integracja KSeF, gotowa architektura             |
| Nowe regulacje EU (transport)                   | Srednie            | Sredni | Modul compliance EU, elastyczna architektura             |

### 8.3 Technologia

| Ryzyko                                         | Prawdopodobienstwo | Wplyw  | Mitygacja                                                |
|------------------------------------------------|--------------------|--------|----------------------------------------------------------|
| Przestarzalosc stacku technicznego              | Niskie             | Sredni | Regularne aktualizacje, modular architecture             |
| Awaria infrastruktury (cloud provider)          | Niskie             | Wysoki | Multi-region, backup strategy, SLA od providerow         |
| Problemy z wydajnoscia przy skali               | Srednie            | Wysoki | k6 testing, monitoring, optymalizacja od poczatku        |
| Zmiany w API Stripe / Google Maps / Expo        | Srednie            | Sredni | Abstraction layers, szybka reakcja na deprecation        |

### 8.4 Biznes i zespol

| Ryzyko                                         | Prawdopodobienstwo | Wplyw  | Mitygacja                                                |
|------------------------------------------------|--------------------|--------|----------------------------------------------------------|
| Key person dependency (1 zalozyciel)            | Wysokie            | Wysoki | Dokumentacja, zatrudnianie, knowledge sharing            |
| Trudnosc w pozyskaniu klientow                  | Srednie            | Wysoki | Wielokanalowy marketing, AF jako kanal dystrybucji       |
| Wysoki churn na poczatku                        | Srednie            | Wysoki | Feedback loop, NPS tracking, customer success            |
| Brak finansowania na ekspansje                   | Srednie            | Sredni | Bootstrap-first, revenue-based financing jako plan B     |
| Trudnosc w rekrutacji (rynek IT w PL)           | Srednie            | Sredni | Remote-first, konkurencyjne wynagrodzenia, equity       |

### 8.5 Plan mitygacji — key person dependency

Najwazniejsze ryzyko na poczatku to zaleznosc od jednej osoby (zalozyciela).
Plan redukcji tego ryzyka:

1. **Q3-Q4 2026**: Pelna dokumentacja techniczna i biznesowa (ten brief + README + ADR)
2. **Q4 2026**: Zatrudnienie junior developera — knowledge transfer
3. **Q1 2027**: Zatrudnienie 2 kolejnych developerow — zespol zdolny do pracy bez zalozyciela
4. **Q2 2027**: Product Manager — przejecie zarzadzania produktem
5. **Q4 2027**: Zespol 8-osobowy — firma dziala operacyjnie bez ciaglego nadzoru zalozyciela
6. **2028**: Procesy, playbooki, automatyzacja — firma gotowa do due diligence

---

> **Nastepny krok**: Realizacja MVP zgodnie z [SPRINT_PLAN.md](./SPRINT_PLAN.md) i [ROADMAP.md](./ROADMAP.md).
