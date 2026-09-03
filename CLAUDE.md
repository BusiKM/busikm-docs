# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Opis repozytorium

To jest repozytorium **strony marketingowej** projektu BusiKM — platformy SaaS do zarządzania transportem busami 2,5–3,5 t i automatycznej ewidencji przebiegu pojazdów. Zawiera:

- `landing/` — strona marketingowa busikm.pl (Next.js 16 App Router + Tailwind CSS 4)
- `docs/landing/` — **dokumentacja nowej strony** oparta na finalnej wersji aplikacji (backlog BusiKM v2): inwentarz produktu i tabela twierdzeń, odbiorcy i język, architektura informacji, treść strony głównej i podstron, system animacji, gotowe prompty do Claude Design. **Zacznij tu przed jakąkolwiek zmianą treści na stronie.**

**Poprzednia wersja strony (Astro 6, katalog `site/`) została usunięta** — jest dostępna wyłącznie w historii gita (ostatni commit z `site/` na `main`, sprzed mergu gałęzi `feat/landing-nextjs`). Nie odtwarzaj z niej plików bez wyraźnej prośby użytkownika.

Dokumentacja techniczna i biznesowa (`PROJECT_OVERVIEW`, `ARCHITECTURE`, `FEATURES`, `MONETIZATION`, `SUBSCRIPTION_MANAGEMENT`, `MARKETING_PLAN`, user guides itd.) została przeniesiona do repozytorium backendu. Kod źródłowy platformy (backend, mobile, web) znajduje się w oddzielnych repozytoriach.

## Komendy — strona marketingowa (`landing/`)

Wszystkie komendy uruchamiane z katalogu `landing/`:

```bash
cd landing
npm install          # instalacja zależności
npm run dev          # serwer deweloperski na localhost:3000 (Turbopack)
npm run build        # build produkcyjny
npm run start        # podgląd buildu produkcyjnego
npm run lint         # ESLint
```

Deploy: Vercel. **Root Directory projektu w Vercelu musi wskazywać na `landing/`** — wcześniej wskazywał na `site/` (Astro).

## Architektura strony (`landing/`)

- **Framework**: Next.js 16 (App Router, Turbopack) + React 19 + TypeScript 5.9 + Tailwind CSS 4 (przez `@tailwindcss/postcss`)
- **Wejście**: `src/app/layout.tsx` (fonty przez `next/font/google`, metadata: title/description, favicony, manifest, OG) → `src/app/page.tsx` (kolejność sekcji landingu)
- **Komponenty**:
  - `src/components/layout/` — Header (nawigacja + menu mobilne), Footer, Logo
  - `src/components/sections/` — Hero, HowItWorks, FeatureSection (wspólny szkielet sekcji A–F), Tachograph, DriverApp, OneInvoice, Pricing, Faq, FinalCta
  - `src/components/mockups/` — makiety produktu (DashboardMockup, DriveTimeRings, MileageTable, OrderCard, ReceiptCapture, ProfitCard, ExportPack, TachographCard, DriverPhones)
  - `src/components/ui/` — Button, Container, TechCaption
- **Server Components domyślnie**; `'use client'` tylko tam, gdzie jest stan: `Header`, `Pricing`, `Faq`
- **Responsywność**: mobile-first, przełącznikiem na desktop jest breakpoint `lg:` (projekt powstał z artboardów 390 i 1440)
- **Assety statyczne**: `landing/public/` — favicony i PWA (`favicon.*`, `apple-touch-icon.png`, `mask-icon.svg`, `site.webmanifest`, `web-app-manifest-*.png`), `logo/logo.svg`, `og-image/og-image.jpg`, `llms.txt`, pitch deck PDF, podpisy e-mail (`podpis-*.html`)
- **SEO i analityka**: `src/content/seo.ts` (adresy, lista tras, wykluczenia z indeksu) → `src/lib/metadata.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/seo/` (dane strukturalne), `src/components/analytics/` (GA4 za zgodą + baner cookie). Pełny opis: `docs/landing/10-seo-i-analityka.md`. **Nowa podstrona musi dostać wpis w `trasy` w `seo.ts`**, inaczej nie trafi do mapy strony. `robots.txt` i `sitemap.xml` są generowane — nie dokładaj ich do `public/`

## Design system (`landing/src/app/globals.css`)

Cały system designu zdefiniowany w `@theme {}` — to jedyne źródło tokenów:

- **Kolory**: `--color-ink` #0A0A0B, `--color-paper` #FAFAFA, `--color-surface` #111113, `--color-mist` #F2F2F4, `--color-line` #E3E3E6, `--color-muted` #6E6E76, `--color-blue` #0B5FFF (+ `-dark` #0A46C0 na hover, `-soft` #E8EFFE — pigułka aktywnej pozycji w nawigacji), `--color-amber` #FF9500 (tylko sekcja tachografu), `--color-green` #30D158
- **Fonty**: `--font-sans` (Inter), `--font-mono` (IBM Plex Mono) — ładowane przez `next/font/google` jako zmienne CSS
- **Skala typograficzna**: `--text-display`, `-h1`, `-h2`, `-h3`, `-lead`, `-body`, `-caption` oraz warianty mobilne z sufiksem `-m` (`--text-display-m`, `--text-h1-m`, …), każdy z własnym `--line-height` i `--letter-spacing`
- **Promienie**: `--radius-btn` 12px, `--radius-card` 20px, `--radius-panel` 28px
- **Cienie**: `--shadow-card`, `--shadow-hero`, `--shadow-blue`, `--shadow-phone`, `--shadow-tab`, `--shadow-nav` (pasek nawigacji po przewinięciu 24px)

Używaj tokenów z `@theme` zamiast hardkodowanych wartości kolorów i rozmiarów.

> Uwaga: **same pliki favicon** pochodzą jeszcze z poprzedniej identyfikacji — narysowane w #005CE8, podczas gdy landing używa #0B5FFF. `site.webmanifest` i `theme-color` zostały już poprawione na #0B5FFF, więc pasek przeglądarki jest zgodny; niespójny zostaje wyłącznie kolor samych ikon. Zestaw trzeba wygenerować ponownie (RealFaviconGenerator).

## Stack technologiczny platformy (dokumentowany w repo backendu, nie w tym repo)

| Warstwa | Technologia |
|---------|-------------|
| Backend | Django 5.x + DRF + Celery + Daphne (ASGI) |
| Mobile | React Native + Expo SDK 52+ + Expo Router v4 + Zustand |
| Web | Next.js 16 (App Router) + Tailwind + SWR + Recharts + Mapbox |
| Bazy danych | PostgreSQL 16 + MongoDB 7 + Redis 7 |
| CI/CD | GitHub Actions + EAS Build + Vercel |

## Kluczowe wzorce architektoniczne platformy (dokumentowane)

- **RBAC** — 4 role: `driver`, `owner`, `accountant`, `accounting_firm`
- **CompanyScopedMixin** — izolacja danych między firmami (tenant isolation)
- **TenantContextMiddleware** — przełączanie kontekstu firmy (header `X-Company-Context`)
- **AbstractFKIntegration** — wzorzec Strategy dla integracji z systemami FK
- **API-first** — schema OpenAPI z DRF → klient TS przez orval

## Konwencje

- Strona marketingowa (`landing/`) w języku polskim, komponenty React + Tailwind CSS 4 utility classes
- **Conventional Commits** — format: `<type>(<scope>): <opis>`
- **Git flow** — feature/* -> develop -> staging -> main

## Aktualizacja statystyk sprintów / ticketów

⚠️ **Strona `/roadmapa` i sekcja `STATUS PRODUKTU` nie zostały jeszcze przeniesione do `landing/`** — zniknęły razem z Astro. Do czasu ich odtworzenia jedynym miejscem ze statystykami postępu jest:

1. **`landing/public/llms.txt`** — sekcja "Stan wdrożenia".

Po odtworzeniu roadmapy w Next.js dojdą dwa kolejne miejsca (strona roadmapy + sekcja statusu na stronie głównej) i **wszystkie trzeba będzie aktualizować razem** — pojedyncza zmiana tylko na roadmapie powoduje rozjazd narracji na stronie głównej.

Źródłem prawdy są zamknięte sprinty w Jirze (BusiKM Cloud, cloudId `5b62c056-d341-4ff3-90d4-8dd0a04df072`) — sprawdzaj przez `closedSprints()` JQL.

## UPDATE ROADMAP — pełen cykl aktualizacji

Komenda **`UPDATE ROADMAP`** (lub jej wariant po polsku) uruchamia pełną resynchronizację strony z aktualnym stanem Jiry, łącznie z **predykcją daty MVP** na podstawie rzeczywistego tempa pracy.

⚠️ **Stan po przejściu na Next.js**: strona roadmapy nie istnieje jeszcze w `landing/`. Kroki 1–4 (dane z Jiry, drift, predykcja MVP) wykonuj bez zmian — ich wynik jest potrzebny do `llms.txt`. Kroki 5 i 6.1–6.2 (restrukturyzacja kart sprintów i faz na stronie) wykonasz dopiero po odtworzeniu roadmapy w Next.js; do tego czasu aktualizujesz wyłącznie `landing/public/llms.txt`. Opis struktury `roadmapa.astro` poniżej zostaje jako specyfikacja tego, co trzeba odtworzyć.

### Krok 1 — pobierz dane z Jiry (Atlassian MCP)

Odpytaj Atlassian MCP (`searchJiraIssuesUsingJql`) i zapisz w pamięci roboczej:

- **Sprinty zamknięte**: nazwa, planowana data zakończenia (z poprzedniej wersji roadmapy — dopóki strony nie ma, weź ją z sekcji "Stan wdrożenia" w `llms.txt` albo z historii gita: `git show <commit>:site/src/pages/roadmapa.astro`), faktyczna `completeDate` (Jira), liczba `Done` ticketów.
- **Sprinty aktywne i przyszłe**: nazwa, planowane `startDate` / `endDate`.
- **Backlog**: liczba ticketów w statusach innych niż Done (mapowanie do "ticketów w backlogu").
- **Łączna liczba ticketów Done** (suma per sprint zamknięty).

### Krok 2 — policz drift (algorytm predykcji)

```
ORIG_MVP = "2026-05-30"   // pierwotna data MVP LIVE w roadmapie
```

Dla **każdego** zamkniętego sprintu policz:
```
delta_i = actual_complete_date - planned_end_date   // w dniach (ujemne = szybciej, dodatnie = wolniej)
```

**Drift kumulatywny** (jak daleko jesteśmy od pierwotnego planu w momencie ostatnio zamkniętego sprintu):
```
drift_total = delta_ostatniego_zamknietego_sprintu
```
(używamy ostatniego, bo sprinty są sekwencyjne — drift propaguje się do następnych)

**Drift per sprint** (czy systematycznie idziemy szybciej/wolniej, czy to chwilowe):
```
avg_drift = mean([delta_1, delta_2, ..., delta_n])
```

### Krok 3 — przesuń przyszłe sprinty

Dla każdego sprintu w `futureSprints` (jeszcze niezamkniętego):
```
new_start = planned_start + drift_total
new_end   = planned_end   + drift_total
```

Jeśli `avg_drift` jest spójnie ujemny lub dodatni (wszystkie ostatnie 3 sprinty miały ten sam znak driftu), dodaj **dodatkowy bufor**:
```
new_end_sprint_k = new_end + (k * avg_drift)
```
gdzie `k` to numer sprintu od ostatniego zamkniętego (sprinty oddalone w czasie kumulują niepewność).

### Krok 4 — przewidziana data MVP LIVE

```
predicted_MVP = last_future_sprint.new_end
```

Jeśli `|predicted_MVP - ORIG_MVP| <= 2 dni` → zostaw **30 maja 2026** (małe wahnięcia nie zmieniają komunikacji).

Jeśli odchylenie > 2 dni → zaktualizuj datę MVP wszędzie:
- format krótki: `"29 maj"`, `"3 cze"`, `"27 maj"` (skróty miesięcy: sty, lut, mar, kwi, maj, cze, lip, sie, wrz, paź, lis, gru)
- format długi: `"29-30 maja 2026"`, `"3-4 czerwca 2026"` (zakres 2 dni — pierwszy dzień to zakończenie ostatniego sprintu, drugi to bufor wdrożeniowy)

### Krok 5 — restrukturyzacja roadmapy (sprinty + fazy)

`roadmapa.astro` ma dwie sekcje:
- **"UKOŃCZONE SPRINTY"** — wszystkie zamknięte sprinty z datami faktycznego zakończenia.
- **"FAZY PRZED NAMI"** — pogrupowane przyszłe sprinty (Faza 1, Faza 2, …) z planowanymi datami.

**5a. Przenieś nowo zamknięte sprinty do "Ukończone sprinty"**

Dla każdego sprintu który właśnie został zamknięty (jest w Jirze `closed`, ale w `roadmapa.astro` siedzi w sekcji fazowej):
- Wytnij kartę z odpowiedniej fazy (zazwyczaj Faza 1).
- Wstaw na koniec sekcji "Ukończone sprinty" (chronologicznie).
- Zmień status: zwykły `DONE` badge (taki sam jak wszystkie pozostałe karty zamknięte). **NIE dodawaj badge "DONE · ŚWIEŻO" ani border-2 — to wygląda tandetnie.** Ostatni zamknięty sprint wygląda identycznie jak reszta.
- W tytule i podtytule karty wpisuj tylko nazwę sprintu, datę i liczbę ticketów. Bez dopisków typu "ukończony 4 maja" czy "ostatni ukończony sprint".

**5b. Renumeracja faz**

Jeśli **wszystkie** sprinty z Fazy 1 zostały zamknięte:
- Faza 1 znika z sekcji "Fazy przed nami" (jej sprinty siedzą już w "Ukończone").
- Faza 2 staje się **Fazą 1** (zmień nagłówek, identyfikator `id="faza-1"`, kolor jeśli zależy od indeksu, kolejność w tablicy `phases`).
- Faza 3 → Faza 2, Faza 4 → Faza 3, …
- Zaktualizuj wszystkie wewnętrzne odwołania (anchor linki `#faza-N`, etykiety w komponentach `<a href="#faza-...">`).

Jeśli faza jest **częściowo** zamknięta (część sprintów done, część nie) → numer fazy zostaje, w kartach zamknięte sprinty są wycięte (poszły do "Ukończone"), zostają tylko aktywne/przyszłe.

**5c. Liczba faz przed nami**

W hero (lub stat-pasie pod hero) jeśli jest komunikat typu "X faz do MVP" / "Faza 1 z 4" — przelicz po renumeracji:
- `total_phases_remaining = liczba_faz_z_co_najmniej_jednym_otwartym_sprintem`
- Zaktualizuj tekst.

### Krok 6 — update wszystkich plików

Zaktualizuj synchronicznie:

1. **`landing/public/llms.txt`** — sekcja "Stan wdrożenia": dzisiejsza data, liczby, data MVP, lista zamkniętych sprintów. **To jedyny plik do aktualizacji, dopóki roadmapa nie wróci na stronę.**
2. *(po odtworzeniu roadmapy w Next.js)* strona roadmapy:
   - Hero stats: liczba ukończonych ticketów, `N/35` sprintów, ticketów w backlogu, data MVP LIVE (skrócona).
   - Tytuł hero "X sprintów za nami".
   - Sekcja "Ukończone sprinty" — wstawione nowe karty (krok 5a).
   - Sekcja "Fazy przed nami" — renumerowane (krok 5b), daty po driftowaniu (krok 3).
   - Wszystkie anchor linki (`#faza-1`, `#faza-2`, …) i komponenty `<a>` zsynchronizowane z nową numeracją.
3. *(po odtworzeniu sekcji `STATUS PRODUKTU` na stronie głównej)*:
   - Tytuł "X sprintów za nami. MVP LIVE …".
   - 4 karty (`ukończonych ticketów`, `N/35 sprintów gotowych`, `3 integracje FK`, skrócona data MVP).

### Krok 7 — raport zmian

Po aktualizacji wypisz krótkie podsumowanie:
```
Drift: -2 dni (szybciej niż plan)
Zamknięte: S6b (132 ticketów łącznie, +8 vs poprzednia synchronizacja)
Faza 1 zamknięta → Faza 2 staje się Fazą 1
MVP: 30 maja 2026 → 28 maja 2026 (skrót: "28 maj")
Pliki: llms.txt
```

Następnie zaproponuj commit (`fix(roadmap): sync sprint X done · MVP shifted to …`) i czekaj na komendę commitu — nie commituj automatycznie.

### Edge cases

- **Brak `completeDate` w Jirze** dla sprintu oznaczonego jako closed → użyj `endDate` (planowanej).
- **Wszystkie zamknięte sprinty mają `delta = 0`** → drift = 0, nie ruszaj dat.
- **Drift > 14 dni** → sygnał ostrzegawczy, dopytaj użytkownika czy datę MVP rzeczywiście przesuwać tak mocno.
- **Sprinty rozłożone na fazy** (np. Faza 1 / Faza 2 w `roadmapa.astro`) → drift propaguje przez WSZYSTKIE następne sprinty bez względu na fazę.
