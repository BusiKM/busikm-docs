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

### Tabela planów dla firm

| Cecha                        | Free          | Starter                       | Professional                  |
|------------------------------|---------------|-------------------------------|-------------------------------|
| **Cena**                     | 0 zł          | 19 zł/pojazd/mies.            | 29 zł/pojazd/mies.            |
| **Min. opłata miesięczna**   | —             | 38 zł                         | 319 zł                        |
| **Max pojazdów**             | 1             | 10                            | 50                            |
| **Max kierowców**            | 1             | 10                            | 50                            |
| **Śledzenie GPS**            | tak           | tak                           | tak                           |
| **Ewidencja przebiegu**      | tak           | tak                           | tak                           |
| **Klasyfikacja tras**        | tak           | tak                           | tak                           |
| **Zdjęcia licznika**         | tak           | tak                           | tak                           |
| **Raporty PDF (art. 86a)**   | nie           | tak                           | tak                           |
| **Eksport CSV**              | nie           | tak                           | tak                           |
| **Eksport CSV/Excel**        | nie           | tylko CSV                     | tak (CSV/Excel)               |
| **Eksport do FK**            | nie           | nie                           | tak (Insert GT, Comarch, Symfonia) |
| **Alerty dokumentów (push)** | nie           | tak                           | tak                           |
| **Alerty dokumentów (e-mail)**| nie          | nie                           | tak                           |
| **Mapa floty real-time**     | nie           | nie                           | tak                           |
| **Dashboard zgodności**      | nie           | nie                           | tak                           |
| **Tryb offline**             | nie           | nie                           | tak                           |
| **Zaproszenia kierowców**    | nie           | tak                           | tak                           |
| **Rozliczenie roczne**       | —             | -15% rabatu                   | -15% rabatu                   |

Powyżej 50 pojazdów na planie Professional → kontakt indywidualny (`kontakt@busikm.pl`). Brak osobnego planu o nazwie "Enterprise" — flota 50+ otrzymuje warunki dopasowane do skali.

### Tabela cen dla biur rachunkowych

Plan `af_standard`: rozliczenie **per aktywny pojazd klienta** (aktywny = min. 1 trasa w danym miesiącu kalendarzowym).

| Liczba aktywnych pojazdów łącznie u klientów BR | Cena za pojazd / mies. |
|-------------------------------------------------|------------------------|
| 1–30                                            | 49 zł                  |
| 31–80                                           | 39 zł                  |
| 81+                                             | 29 zł                  |

Klienci biura rachunkowego (status `af_client`) korzystają z BusiKM **gratis** dopóki BR ma aktywną subskrypcję `af_standard` (lub `af_trial`). Funkcjonalnie odpowiadają planowi Professional.

### Logika minimów

Minimalna opłata miesięczna zapewnia rentowność małych kont:

- **Starter**: min 38 zł = stawka za 2 pojazdy (firma z 1 pojazdem płaci 38 zł, z 3+ płaci 19 zł × N).
- **Professional**: min 319 zł = stawka za 11 pojazdów (firma z 1–10 pojazdami płaci 319 zł, z 11+ płaci 29 zł × N).

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

- **3 miesiące pełnego panelu BR za darmo** (`af_trial`) — bez karty kredytowej, bez wymogu minimalnej liczby klientów. BR podłącza klientów we własnym tempie.
- Po trialu: **14 dni grace period**, potem decyzja:
  - kontynuacja jako `af_standard` — rozliczenie **per aktywny pojazd klienta** (49 / 39 / 29 zł wg tieru),
  - downgrade do BR Free — read-only podgląd klientów, paywall na PDF / eksport FK / dashboard zbiorczy.
- Cel: BR testuje panel multi-tenant z realnymi klientami; im więcej podłączy w trakcie trialu, tym silniejszy efekt loss aversion przy potencjalnym downgrade.

### 3.4 Klienci biur rachunkowych

Firmy dołączające przez biuro rachunkowe (status `af_client`):

- **Pełny dostęp odpowiadający planowi Professional za 0 zł**, dopóki BR ma aktywną subskrypcję `af_trial` lub `af_standard`. Brak własnej karty kredytowej, brak własnej subskrypcji.
- Klient nie ma własnej daty wygaśnięcia — życie subskrypcji zsynchronizowane z subskrypcją BR.
- Jeśli BR przejdzie na BR Free (lub anuluje subskrypcję): klient traci status `af_client` i może wybrać:
  - kontynuację samodzielnie w planie Starter (19 zł/poj.) lub Professional (29 zł/poj.),
  - przejście do innego biura rachunkowego z aktywnym `af_standard`,
  - korzystanie z planu Free (1 pojazd, bez raportów).
- Cała historia tras i dokumentów pozostaje w systemie niezależnie od scenariusza.

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

BusiKM celuje w **niski koniec rynku** (19–29 zł/pojazd) z wyraźną wartością dodaną: integracja z FK i panel dla biur rachunkowych. Strategia: agresywne ceny + kanał BR jako efekt mnożnikowy.

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

> **Założenia bazowe prognoz:** średnia ARPU/pojazd ≈ 27 zł (mix planów: ~40% Starter @ 19 zł, ~50% Professional @ 29 zł, ~10% BR `af_standard` w średnim tierze ~39 zł). Klienci BR (`af_client`) są nievliczani jako "płacący" — to BR rozlicza ich pojazdy w modelu hurtowym.

### 5.1 Scenariusz konserwatywny

Założenia: organiczny wzrost, brak agresywnego marketingu, wolna konwersja pilotów.

| Miesiąc | Firmy (total) | Firmy (płacące) | Śr. pojazdów | Pojazdy płacące | Śr. ARPU/poj. | MRR          | ARR          |
|---------|---------------|-----------------|---------------|-----------------|----------------|--------------|--------------|
| 3       | 10            | 0 (pilot)       | 3             | 0               | —              | 0 zł         | —            |
| 6       | 50            | 30              | 5             | 150             | 25 zł          | 3 750 zł     | 45 000 zł    |
| 12      | 150           | 100             | 6             | 600             | 27 zł          | 16 200 zł    | 194 400 zł   |
| 24      | 500           | 350             | 7             | 2 450           | 28 zł          | 68 600 zł    | 823 200 zł   |
| 36      | 1 500         | 1 000           | 8             | 8 000           | 28 zł          | 224 000 zł   | 2 688 000 zł |

### 5.2 Scenariusz bazowy

Założenia: umiarkowany marketing, aktywna współpraca z BR, dobra konwersja.

| Miesiąc | Firmy (total) | MRR              | ARR              |
|---------|---------------|------------------|------------------|
| 6       | 100           | 10 000 zł        | 120 000 zł       |
| 12      | 300           | 42 000 zł        | 504 000 zł       |
| 24      | 1 000         | 168 000 zł       | 2 016 000 zł     |
| 36      | 3 000         | 560 000 zł       | 6 720 000 zł     |

### 5.3 Scenariusz optymistyczny

Założenia: viralowy wzrost przez biura rachunkowe (1 BR = 10–20 firm klientów),
silny product-market fit, szybka ekspansja.

| Miesiąc | Firmy (total) | MRR              | ARR              |
|---------|---------------|------------------|------------------|
| 6       | 200           | 20 000 zł        | 240 000 zł       |
| 12      | 500           | 84 000 zł        | 1 008 000 zł     |
| 24      | 2 000         | 336 000 zł       | 4 032 000 zł     |
| 36      | 5 000         | 980 000 zł       | 11 760 000 zł    |

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
| **CAC (self-serve)**             | < 200 zł               | SEO, content marketing, referrals            |
| **CAC (kanał BR)**               | < 800 zł               | Koszt pozyskania BR + onboarding             |
| **ARPU/firma/miesiąc**           | 135–225 zł             | Śr. 5–8 pojazdów × 27 zł                     |
| **LTV (Lifetime Value)**         | 5 184 zł               | 8 poj. × 27 zł × 24 mies.                    |
| **LTV/CAC ratio (self-serve)**   | > 25×                  | 5 184 / 200 = 25.9×                          |
| **LTV/CAC ratio (BR channel)**   | > 6×                   | 5 184 / 800 = 6.5×                           |
| **Monthly churn**                | < 5%                   | Cel: < 3% po roku                            |
| **Net Revenue Retention (NRR)**  | > 110%                 | Expansion revenue (więcej pojazdów)          |
| **Gross margin**                 | > 80%                  | SaaS — niski koszt krańcowy per user         |

### Kalkulacja LTV

```
LTV = Średnia liczba pojazdów × ARPU/pojazd × Średni lifetime (miesiące)
LTV = 8 × 27 zł × 24 = 5 184 zł

Przy uwzględnieniu expansion (firmy dodają pojazdy):
LTV_adj = 5 184 × 1.1 (NRR) ≈ 5 702 zł
```

### Próg rentowności per firma

```
Koszt obsługi firmy/miesiąc ≈ 15–30 zł (infra + support)
Min. przychód na pokrycie kosztów: 30 zł/miesiąc
= 2 pojazdy na planie Starter (38 zł) → rentowne od 2 pojazdów
= 1 pojazd na planie Professional (319 zł min.) → wysoce rentowne
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
1 biuro rachunkowe (BR) = 5–20 firm klientów

Pozyskanie 50 BR × śr. 12 klientów × śr. 6 pojazdów = 3 600 aktywnych pojazdów
Mix tierów: ~40% w 31–80 (39 zł), ~50% w 81+ (29 zł), ~10% w 1–30 (49 zł)
Średnia ARPU/pojazd ≈ 33 zł → MRR z kanału BR ≈ 118 800 zł
Klienci BR (af_client) korzystają gratis — przychód generuje wyłącznie BR.
```

### Dlaczego AF to idealny kanał?

| Czynnik                         | Wartość dla BusiKM                                   |
|---------------------------------|------------------------------------------------------|
| **Zaufanie klientów**           | AF jest doradcą — rekomendacja ma dużą wagę          |
| **Naturalny kontekst**          | Ewidencja przebiegu = temat księgowy                 |
| **Wielokrotna dystrybucja**     | 1 AF = wiele firm, nie trzeba pozyskiwać osobno      |
| **Niski churn**                 | Klient nie zmienia narzędzia jeśli AF je rekomenduje |
| **Integracja FK**               | Eksport danych do systemu FK biura — lock-in         |

### Model współpracy z BR

#### Faza 1 (launch — pilot)

- BR otrzymuje **3 miesiące pełnego panelu BR za darmo** (`af_trial`), bez wymogu min. liczby klientów.
- Klienci BR (`af_client`) korzystają z BusiKM **gratis** dopóki BR ma aktywną subskrypcję.
- Cel: walidacja modelu, zbieranie feedbacku.

#### Faza 2 (post-pilot — skalowanie)

- **Standardowy cennik `af_standard`**: 49 / 39 / 29 zł per aktywny pojazd klienta (tiery 1–30 / 31–80 / 81+).
- Rabat -15% przy rozliczeniu rocznym z góry.
- Klienci nadal korzystają gratis — koszt ponosi wyłącznie BR.

#### Faza 3 (post-MVP — program partnerski)

- **Program partnerski BR**: dodatkowe benefity dla biur z dużym wolumenem.
  - Wyższe rabaty roczne dla 200+ aktywnych pojazdów.
  - Dedykowany opiekun handlowy.
  - White-label panelu BR (subdomena, logo, kolory) — opcja w cenniku indywidualnym.
- Panel partnerski: BR widzi swoich klientów, status pojazdów, faktury, dashboard oszczędności.
- Materiały marketingowe: szablony emaili dla klientów, broszury, kalkulator oszczędności do osadzenia na stronie BR.

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

| Scenariusz       | ARR (rok 3)       | Mnożnik | Wycena          |
|------------------|-------------------|---------|-----------------|
| Konserwatywny    | 2 688 000 zł      | 5×      | 13 440 000 zł   |
| Bazowy           | 6 720 000 zł      | 7×      | 47 040 000 zł   |
| Optymistyczny    | 11 760 000 zł     | 8×      | 94 080 000 zł   |

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
| Model cenowy (firmy)     | Per-vehicle/month z minimalną opłatą                     |
| Model cenowy (BR)        | Per aktywny pojazd klienta, tiery 49 / 39 / 29 zł        |
| Plany                    | Free / Starter / Professional + `af_standard` (BR)       |
| Waluta                   | PLN (docelowo EUR)                                       |
| Pricing MVP              | Docelowe widełki — finalna cena po pilotażu              |
| Trial firm               | 14 dni Professional → Free                               |
| Trial BR                 | 3 miesiące pełnego panelu, 14 dni grace, → BR Free       |
| Billing MVP              | Ręczny (przelew) → Stripe (Sprint 7+)                    |
| Kanał dystrybucji        | Biura rachunkowe (BR) — efekt mnożnikowy                 |
| Target ARR (rok 3, baza) | 6,7 M zł                                                 |
| Target wycena (rok 3)    | 13–94 M zł (zależnie od scenariusza)                     |

> Implementacja techniczna subskrypcji, feature gating, trial management i integracji Stripe
> jest opisana w [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).
