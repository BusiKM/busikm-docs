# BusiKM - Monetyzacja i Model Biznesowy

> Dokument opisuje strategię monetyzacji platformy BusiKM, plany subskrypcji, strategię cenową,
> prognozy przychodowe oraz strukturę kosztów. Szczegóły techniczne implementacji subskrypcji
> opisano w [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).

---

## Spis treści

1. [Model biznesowy](#1-model-biznesowy)
2. [Plany subskrypcji](#2-plany-subskrypcji)
3. [Strategia trial i onboarding](#3-strategia-trial-i-onboarding)
4. [Pricing discovery (odkrywanie ceny)](#4-pricing-discovery)
5. [Prognozy przychodowe](#5-prognozy-przychodowe)
6. [Unit economics](#6-unit-economics)
7. [Struktura kosztów](#7-struktura-kosztów)
8. [Roadmapa billingowa](#8-roadmapa-billingowa)
9. [Biuro rachunkowe jako kanał dystrybucji](#9-biuro-rachunkowe-jako-kanał-dystrybucji)
10. [Wycena i perspektywa exit](#10-wycena-i-perspektywa-exit)

---

## 1. Model biznesowy

BusiKM stosuje model **SaaS per-vehicle/month** — standard branżowy dla oprogramowania flotowego.

### Kluczowe założenia

- **Jednostka rozliczeniowa**: pojazd/miesiąc (nie użytkownik, nie firma).
- **Minimalna opłata miesięczna**: każdy plan płatny ma minimalną kwotę, niezależnie od liczby pojazdów.
  Zapobiega to sytuacji, w której firma z 1 pojazdem płaci symboliczną kwotę.
- **Rozliczenie roczne**: 15% rabatu przy płatności z góry za 12 miesięcy.
- **Waluta**: PLN (rynek polski). Przyszłościowo EUR dla ekspansji.
- **Faktura VAT**: automatyczna generacja dla każdej płatności.

### Dlaczego per-vehicle?

| Alternatywa         | Wada                                                     |
|----------------------|----------------------------------------------------------|
| Per-user             | Firmy ograniczają liczbę kont, dzielą loginy             |
| Per-firma (flat fee) | Nie skaluje się — duża firma płaci tyle co mała          |
| Per-trip             | Nieprzewidywalne koszty, zniechęca do rejestrowania tras  |
| **Per-vehicle**      | **Intuicyjne, przewidywalne, skaluje się z flotą**       |

Model per-vehicle jest stosowany przez liderów rynku (Flotman, GPS Guardian, Cartrack)
i jest zrozumiały dla klientów — "płacę za każdy samochód w firmie".

---

## 2. Plany subskrypcji

### Tabela planów

| Cecha                        | Free          | Starter                  | Professional              | Enterprise                |
|------------------------------|---------------|--------------------------|---------------------------|---------------------------|
| **Cena**                     | 0 PLN         | 59 PLN/pojazd/mies.      | 89 PLN/pojazd/mies.       | 149 PLN/pojazd/mies.      |
| **Min. opłata miesięczna**   | —             | 149 PLN                  | 249 PLN                   | indywidualnie             |
| **Max pojazdów**             | 1             | 10                       | 50                        | bez limitu                |
| **Max kierowców**            | 1             | 10                       | 50                        | bez limitu                |
| **Śledzenie GPS**            | tak           | tak                      | tak                       | tak                       |
| **Ewidencja przebiegu**      | tak           | tak                      | tak                       | tak                       |
| **Raporty PDF**              | nie           | tak                      | tak                       | tak                       |
| **Eksport CSV/Excel**        | nie           | nie                      | tak                       | tak                       |
| **Eksport do FK**            | nie           | nie                      | tak                       | tak                       |
| **Powiadomienia push**       | nie           | tak                      | tak                       | tak                       |
| **Mapa real-time**           | nie           | nie                      | tak                       | tak                       |
| **Multi-tenant (AF)**        | nie           | nie                      | nie                       | tak                       |
| **Dostęp API**               | nie           | nie                      | nie                       | tak                       |
| **Dedykowane wsparcie**      | nie           | nie                      | nie                       | tak                       |
| **Raporty zaawansowane**     | nie           | nie                      | tak                       | tak                       |
| **Rozliczenie roczne**       | —             | 50 PLN/poj./mies. (-15%) | 76 PLN/poj./mies. (-15%)  | indywidualnie (-15%)      |

### Logika minimów

Minimalna opłata miesięczna zapewnia rentowność małych kont:

- **Starter**: min 149 PLN = pokrycie kosztów nawet przy 1-2 pojazdach
  (firma z 1 pojazdem płaci 149 PLN, z 3+ płaci 59 PLN × N)
- **Professional**: min 249 PLN = pokrycie kosztów przy małych flotach
  (firma z 1-2 pojazdami płaci 249 PLN, z 3+ płaci 89 PLN × N)

### Feature gating

Techniczne ograniczanie funkcji opisano w [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).
Middleware feature gating jest przygotowane w kodzie, ale nieaktywne do momentu uruchomienia Stripe.

---

## 3. Strategia trial i onboarding

### 3.1 Nowe firmy — Reverse Trial (14 dni)

Każda nowa firma rejestrująca się samodzielnie otrzymuje:

1. **Dzień 0-14**: pełny dostęp do planu **Professional** (wszystkie funkcje).
2. **Dzień 14**: automatyczny downgrade do planu **Free** (1 pojazd, bez raportów).
3. **Cel**: użytkownik poznaje wartość, a po downgrade odczuwa "stratę" (loss aversion).

Reverse trial konwertuje lepiej niż klasyczny freemium, ponieważ użytkownik musi
aktywnie zrezygnować z funkcji, które już poznał.

### 3.2 Firmy pilotażowe (UAT)

Firmy uczestniczące w testach pilotażowych (User Acceptance Testing):

- **6 miesięcy** planu Professional za darmo.
- Ustawiane ręcznie w panelu admina (`subscription_plan = professional`, `trial_end = +6m`).
- Po zakończeniu pilotu: standardowy cennik lub indywidualna oferta.

### 3.3 Biura rachunkowe (AF)

Biura rachunkowe jako strategiczni partnerzy:

- **3 miesiące** planu Enterprise za darmo.
- **Warunek**: minimum 3 obsługiwane firmy-klienty w BusiKM.
- Cel: AF testuje multi-tenant, a klienci AF korzystają z integracji FK.

### 3.4 Klienci biur rachunkowych

Firmy dołączające przez biuro rachunkowe:

- **3 miesiące** planu Professional za darmo.
- Trial **zsynchronizowany** z trialem AF — start odliczania od momentu aktywacji AF.
- Po zakończeniu: klient przechodzi na plan płatny lub Free.

### 3.5 Auto-extend dla nieaktywnych

Mechanizm retencji dla użytkowników, którzy nie zdążyli przetestować:

- Jeśli użytkownik ma **0 zarejestrowanych tras** w okresie trial → automatyczne przedłużenie o **+7 dni**.
- Jednorazowe — drugie przedłużenie nie przysługuje.
- Cel: dać szansę użytkownikom, którzy się zarejestrowali ale nie zaczęli korzystać.

> Szczegóły techniczne: trial management, cron jobs, powiadomienia —
> patrz [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).

---

## 4. Pricing discovery

### Dlaczego nie ustalamy cen na etapie MVP?

Ceny podane w sekcji 2 to **docelowe widełki**, nie finalne wartości.
Ostateczna cena zostanie ustalona na podstawie danych z pilotu.

### 4.1 Metoda Van Westendorp

Każdej firmie pilotażowej zadajemy 4 pytania:

1. **Przy jakiej cenie za pojazd/miesiąc uważasz usługę za tanią?** (za dobrą cenę)
2. **Przy jakiej cenie za pojazd/miesiąc uważasz usługę za drogą, ale jeszcze akceptowalną?**
3. **Przy jakiej cenie za pojazd/miesiąc usługa byłaby za droga — nie kupiłbyś?**
4. **Przy jakiej cenie za pojazd/miesiąc usługa wydaje się zbyt tania — podejrzanie?**

Wyniki: punkt przecięcia krzywych wskazuje optymalną cenę (PSM — Price Sensitivity Meter).

### 4.2 Analiza danych użytkowania

Dane z modułu Usage Tracking (Redis → PostgreSQL, migawki miesięczne):

| Metryka                   | Cel analizy                                      |
|---------------------------|--------------------------------------------------|
| Liczba tras/miesiąc       | Korelacja z gotowością do płacenia               |
| Użycie raportów PDF/CSV   | Wartość funkcji premium                          |
| Częstotliwość logowania   | Zaangażowanie = wyższa tolerancja cenowa         |
| Liczba pojazdów/firma     | Segmentacja — małe vs. średnie floty             |
| Użycie eksportu FK        | Kluczowe dla klientów AF                         |

### 4.3 Benchmark konkurencji

Analiza polskiego rynku fleet management SaaS:

| Konkurent        | Model cenowy         | Zakres cen             |
|------------------|----------------------|------------------------|
| Flotman          | per-vehicle/month    | 69-129 PLN             |
| GPS Guardian     | per-vehicle/month    | 49-99 PLN              |
| Cartrack         | per-vehicle/month    | 79-149 PLN             |
| AutoPlan         | per-firma flat fee   | 199-599 PLN            |
| **Średnia rynkowa** | —                 | **50-120 PLN/pojazd**  |

BusiKM celuje w **środek rynku** (59-89 PLN) z wyraźną wartością dodaną: integracja z FK.

### 4.4 Timeline decyzji cenowej

| Kamień milowy             | Termin                 | Działanie                              |
|---------------------------|------------------------|----------------------------------------|
| Launch pilotu             | Miesiąc 0              | Free access dla firm pilotażowych      |
| Ankieta Van Westendorp    | Miesiąc 1              | Zbieranie danych cenowych              |
| Analiza Usage Tracking    | Miesiąc 2              | Korelacja użycie vs. gotowość płatnicza|
| **Decyzja cenowa**        | **Miesiąc 2-3**        | **Ustalenie finalnych cen**            |
| Uruchomienie Stripe       | Miesiąc 3-4            | Automatyczny billing                   |

---

## 5. Prognozy przychodowe

### 5.1 Scenariusz konserwatywny

Założenia: organiczny wzrost, brak agresywnego marketingu, wolna konwersja pilotów.

| Miesiąc | Firmy (total) | Firmy (płacące) | Śr. pojazdów | Pojazdy płacące | Śr. ARPU/poj. | MRR          | ARR          |
|---------|---------------|-----------------|---------------|-----------------|----------------|--------------|--------------|
| 3       | 10            | 0 (pilot)       | 3             | 0               | —              | 0 PLN        | —            |
| 6       | 50            | 30              | 5             | 150             | 75 PLN         | 11 250 PLN   | 135 000 PLN  |
| 12      | 150           | 100             | 6             | 600             | 80 PLN         | 48 000 PLN   | 576 000 PLN  |
| 24      | 500           | 350             | 7             | 2 450           | 85 PLN         | 208 250 PLN  | 2 499 000 PLN|
| 36      | 1 500         | 1 000           | 8             | 8 000           | 85 PLN         | 680 000 PLN  | 8 160 000 PLN|

### 5.2 Scenariusz bazowy

Założenia: umiarkowany marketing, aktywna współpraca z AF, dobra konwersja.

| Miesiąc | Firmy (total) | MRR              | ARR              |
|---------|---------------|------------------|------------------|
| 6       | 100           | 30 000 PLN       | 360 000 PLN      |
| 12      | 300           | 125 000 PLN      | 1 500 000 PLN    |
| 24      | 1 000         | 500 000 PLN      | 6 000 000 PLN    |
| 36      | 3 000         | 1 667 000 PLN    | 20 000 000 PLN   |

### 5.3 Scenariusz optymistyczny

Założenia: viralowy wzrost przez biura rachunkowe (1 AF = 10-20 firm klientów),
silny product-market fit, szybka ekspansja.

| Miesiąc | Firmy (total) | MRR              | ARR              |
|---------|---------------|------------------|------------------|
| 6       | 200           | 60 000 PLN       | 720 000 PLN      |
| 12      | 500           | 250 000 PLN      | 3 000 000 PLN    |
| 24      | 2 000         | 1 000 000 PLN    | 12 000 000 PLN   |
| 36      | 5 000         | 2 917 000 PLN    | 35 000 000 PLN   |

### Kluczowy driver: efekt mnożnikowy AF

W scenariuszu optymistycznym kluczowe jest pozyskanie biur rachunkowych:

- 1 biuro rachunkowe = średnio 10-20 obsługiwanych firm
- Pozyskanie 20 AF × 15 firm/AF = 300 firm w jednym kwartale
- AF pełni rolę zaufanego doradcy — konwersja znacznie wyższa niż cold outreach

---

## 6. Unit economics

### Kluczowe metryki

| Metryka                          | Wartość docelowa       | Komentarz                                    |
|----------------------------------|------------------------|----------------------------------------------|
| **CAC (self-serve)**             | < 500 PLN              | SEO, content marketing, referrals            |
| **CAC (kanał AF)**               | < 2 000 PLN            | Koszt pozyskania AF + onboarding             |
| **ARPU/firma/miesiąc**           | 400-680 PLN            | Śr. 5-8 pojazdów × 80 PLN                   |
| **LTV (Lifetime Value)**         | 15 360 PLN             | 8 poj. × 80 PLN × 24 mies.                  |
| **LTV/CAC ratio (self-serve)**   | > 30×                  | 15 360 / 500 = 30.7×                        |
| **LTV/CAC ratio (AF channel)**   | > 7×                   | 15 360 / 2 000 = 7.7×                       |
| **Monthly churn**                | < 5%                   | Cel: < 3% po roku                            |
| **Net Revenue Retention (NRR)**  | > 110%                 | Expansion revenue (więcej pojazdów)          |
| **Gross margin**                 | > 80%                  | SaaS — niski koszt krańcowy per user         |

### Kalkulacja LTV

```
LTV = Średnia liczba pojazdów × ARPU/pojazd × Średni lifetime (miesiące)
LTV = 8 × 80 PLN × 24 = 15 360 PLN

Przy uwzględnieniu expansion (firmy dodają pojazdy):
LTV_adj = 15 360 × 1.1 (NRR) ≈ 16 896 PLN
```

### Próg rentowności per firma

```
Koszt obsługi firmy/miesiąc ≈ 40-80 PLN (infra + support)
Min. przychód na pokrycie kosztów: 80 PLN/miesiąc
= 1 pojazd na planie Professional (89 PLN) → rentowne od 1 pojazdu
```

---

## 7. Struktura kosztów

### 7.1 Koszty infrastruktury (MVP)

| Komponent                | Koszt miesięczny    | Uwagi                                |
|--------------------------|---------------------|--------------------------------------|
| VPS / Cloud hosting      | 50-100 PLN          | DigitalOcean / Hetzner               |
| PostgreSQL (managed)     | 30-80 PLN           | Lub self-hosted na VPS               |
| MongoDB (GPS data)       | 30-80 PLN           | Atlas free tier → paid               |
| Redis                    | 20-40 PLN           | Cache, sessions, usage tracking      |
| Storage (S3/Spaces)      | 10-30 PLN           | Raporty PDF, eksporty                |
| Monitoring               | 10-25 PLN           | Sentry, uptime monitoring            |
| Email (transakcyjne)     | 0-20 PLN            | SendGrid free tier na start          |
| **Razem (MVP)**          | **150-375 PLN**     | **Przy <100 użytkowników**           |

### 7.2 Koszt per user (skalowanie)

| Skala              | Koszt/user/miesiąc | Główne składniki                      |
|--------------------|--------------------|-----------------------------------------|
| 1-100 firm         | ~5 PLN             | Infra dzielona, overhead duży          |
| 100-500 firm       | ~3 PLN             | Ekonomia skali, lepsze wykorzystanie   |
| 500-2000 firm      | ~2 PLN             | Optymalizacja, bulk pricing            |
| 2000+ firm         | ~1.5 PLN           | Pełna ekonomia skali SaaS             |

### 7.3 Struktura kosztów operacyjnych

| Kategoria            | % przychodu   | Komentarz                                     |
|----------------------|---------------|-----------------------------------------------|
| **Infrastruktura**   | 5-15%         | Maleje z skalą (SaaS leverage)                |
| **Development**      | 40-60%        | Główny koszt — zespół developerski            |
| **Marketing**        | 10-20%        | Content, SEO, AF partnerships                 |
| **Support**          | 5-10%         | Help desk, onboarding, documentation          |
| **Admin/inne**       | 5-10%         | Księgowość, prawo, biuro                      |
| **Gross margin**     | **>80%**      | **Typowy dla SaaS**                           |

---

## 8. Roadmapa billingowa

### Fazy wdrożenia

| Faza       | Sprint  | Zakres                                          | Status             |
|------------|---------|--------------------------------------------------|--------------------|
| **Faza 0** | Sprint 5 (launch) | Brak automatycznego billingu. Rozliczenia ręczne (przelew bankowy) dla firm pilotażowych i wczesnych klientów. | Planowane |
| **Faza 1** | Sprint 6 | Feature gating aktywne w middleware. Przycisk "Skontaktuj się" przy funkcjach premium. Ręczna zmiana planów w panelu admina. | Planowane |
| **Faza 2** | Sprint 7+ | Integracja Stripe Billing + Checkout + Customer Portal. Automatyczne płatności, faktury, self-serve upgrade/downgrade. | Planowane |

### Stripe — planowane integracje

| Funkcja Stripe               | Zastosowanie w BusiKM                           |
|------------------------------|--------------------------------------------------|
| **Stripe Billing**           | Subskrypcje recurring, proration, metered billing |
| **Stripe Checkout**          | Strona płatności (hosted) — szybki onboarding     |
| **Customer Portal**          | Self-serve: zmiana planu, dane karty, faktury     |
| **Przelewy24 (BLIK)**       | Popularna metoda płatności w Polsce               |
| **SEPA Direct Debit**        | Dla klientów EU (przyszła ekspansja)              |
| **Karty kredytowe/debetowe** | Visa, Mastercard — standard                       |
| **Stripe Tax**               | Automatyczne naliczanie VAT                       |
| **Faktury VAT**              | Automatyczna generacja i wysyłka                  |
| **Webhooks**                 | Synchronizacja statusu płatności z BusiKM         |

### Feature gating middleware

Middleware jest **przygotowane w kodzie** ale **nieaktywne** do uruchomienia Stripe:

```
Request → Auth middleware → Feature gate middleware → Route handler
                               ↓
                    Sprawdź plan firmy → Czy funkcja dozwolona?
                               ↓                    ↓
                           TAK → kontynuuj      NIE → 403 + upgrade prompt
```

Szczegóły implementacji: [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).

---

## 9. Biuro rachunkowe jako kanał dystrybucji

### Efekt mnożnikowy

```
1 biuro rachunkowe (AF) = 5-20 firm klientów

Pozyskanie 50 AF × śr. 12 klientów = 600 firm
Przy konwersji 60% na płatne = 360 firm płacących
Przy śr. 6 pojazdów × 80 PLN = 172 800 PLN MRR
```

### Dlaczego AF to idealny kanał?

| Czynnik                         | Wartość dla BusiKM                                   |
|---------------------------------|------------------------------------------------------|
| **Zaufanie klientów**           | AF jest doradcą — rekomendacja ma dużą wagę          |
| **Naturalny kontekst**          | Ewidencja przebiegu = temat księgowy                 |
| **Wielokrotna dystrybucja**     | 1 AF = wiele firm, nie trzeba pozyskiwać osobno      |
| **Niski churn**                 | Klient nie zmienia narzędzia jeśli AF je rekomenduje |
| **Integracja FK**               | Eksport danych do systemu FK biura — lock-in         |

### Model współpracy z AF

#### Faza 1 (launch — pilot)

- AF otrzymuje **3 miesiące Enterprise za darmo** (warunek: min 3 klientów).
- Klienci AF: **3 miesiące Professional za darmo**.
- Cel: walidacja modelu, zbieranie feedbacku.

#### Faza 2 (post-pilot — skalowanie)

- **Pakiety cenowe**: AF + N klientów = rabat grupowy.
  - AF + 5 klientów: 10% rabatu dla wszystkich
  - AF + 10 klientów: 15% rabatu
  - AF + 20 klientów: 20% rabatu
- AF negocjuje indywidualne warunki Enterprise.

#### Faza 3 (post-MVP — program partnerski)

- **AF Referral Program**: AF otrzymuje prowizję od przychodów z poleconych klientów.
  - Opcja A: % od przychodu (np. 10-15%) przez 12 miesięcy.
  - Opcja B: jednorazowa premia za pozyskanie (np. 500 PLN/firma).
- Panel partnerski: AF widzi swoich klientów, ich status subskrypcji, prowizje.
- Materiały marketingowe: white-label landing page, szablony emaili.

---

## 10. Wycena i perspektywa exit

### Wyceny SaaS

Firmy SaaS wyceniane są jako mnożnik ARR (Annual Recurring Revenue).
Mnożnik zależy od wzrostu, retencji, marży i skali rynku.

| Kategoria firmy SaaS          | Typowy mnożnik ARR |
|--------------------------------|--------------------|
| Niska wzrostowość (<20% YoY)  | 3-5×               |
| Średnia wzrostowość (20-50%)  | 5-8×               |
| Wysoka wzrostowość (>50%)     | 8-12×              |
| Hiperwzrost (>100%)           | 12-20×             |

### Scenariusze wyceny (rok 3 — miesiąc 36)

| Scenariusz       | ARR (rok 3)      | Mnożnik | Wycena          |
|------------------|-------------------|---------|-----------------|
| Konserwatywny    | 8 160 000 PLN     | 5×      | 40 800 000 PLN  |
| Bazowy           | 20 000 000 PLN    | 7×      | 140 000 000 PLN |
| Optymistyczny    | 35 000 000 PLN    | 8×      | 280 000 000 PLN |

### Czynniki wpływające na wycenę

**Podnoszące mnożnik:**
- Wysoki NRR (>120%) — klienci naturalnie rosną
- Niski churn (<3% monthly)
- Kanał AF — trudny do skopiowania competitive moat
- Integracja FK — lock-in, switching cost
- Rynek regulowany (ewidencja przebiegu wymagana prawnie)

**Obniżające mnożnik:**
- Koncentracja na jednym rynku (Polska)
- Mały TAM (Total Addressable Market) w porównaniu do globalnych SaaS
- Zależność od kanału AF (ryzyko koncentracji)

### Potencjalne ścieżki exit

1. **Akwizycja przez dostawcę FK** — np. Comarch, Sage, Insert (Symfonia) — BusiKM jako moduł flotowy.
2. **Akwizycja przez firmę fleet management** — konsolidacja rynku polskiego.
3. **Akwizycja przez PE/VC** — buy-and-build w segmencie SaaS B2B.
4. **Dalszy wzrost organiczny** — ekspansja na CEE (Czechy, Słowacja, Rumunia).

---

## Podsumowanie

| Element                  | Decyzja                                                  |
|--------------------------|----------------------------------------------------------|
| Model cenowy             | Per-vehicle/month z minimalną opłatą                     |
| Plany                    | Free / Starter / Professional / Enterprise               |
| Waluta                   | PLN (docelowo EUR)                                       |
| Pricing MVP              | Docelowe widełki — finalna cena po pilotażu              |
| Trial                    | 14-day reverse trial (Professional → Free)               |
| Billing MVP              | Ręczny (przelew) → Stripe (Sprint 7+)                   |
| Kanał dystrybucji        | Biura rachunkowe (AF) — efekt mnożnikowy                 |
| Target ARR (rok 3, baza) | 20M PLN                                                  |
| Target wycena (rok 3)    | 40-280M PLN (zależnie od scenariusza)                    |

> Implementacja techniczna subskrypcji, feature gating, trial management i integracji Stripe
> jest opisana w [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).
