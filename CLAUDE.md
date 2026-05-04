# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Opis repozytorium

To jest repozytorium **strony marketingowej** projektu BusiKM — platformy SaaS do automatycznej ewidencji przebiegu pojazdów osobowych w działalności gospodarczej. Zawiera wyłącznie:

- `site/` — strona marketingowa busikm.pl (Astro 6 + Tailwind CSS 4)

Dokumentacja techniczna i biznesowa (`PROJECT_OVERVIEW`, `ARCHITECTURE`, `FEATURES`, `MONETIZATION`, `SUBSCRIPTION_MANAGEMENT`, `MARKETING_PLAN`, user guides itd.) została przeniesiona do repozytorium backendu. Kod źródłowy platformy (backend, mobile, web) znajduje się w oddzielnych repozytoriach.

## Komendy — strona marketingowa (`site/`)

Wszystkie komendy uruchamiane z katalogu `site/`:

```bash
cd site
npm install          # instalacja zaleznosci (wymaga Node >= 22.12.0)
npm run dev          # serwer deweloperski na localhost:4321
npm run build        # build produkcyjny do site/dist/
npm run preview      # podglad buildu produkcyjnego
```

Deploy: Vercel (statyczny output, konfiguracja w `site/vercel.json`).

## Architektura strony (`site/`)

- **Framework**: Astro 6 (static output) + Tailwind CSS 4 (via `@tailwindcss/vite` plugin) + @astrojs/sitemap
- **Lancuch layoutow**: `BaseLayout.astro` (SEO, OG, fonty, analytics) → `MarketingLayout.astro` (Header + Footer + scroll reveal) / `DocsLayout.astro` (sidebar + prose)
- **Komponenty**: `site/src/components/layout/` — Header, Footer, Logo. Nowe komponenty tworzyc w odpowiednich podkatalogach `components/`
- **Strony marketingowe**: index, cennik, funkcje, roadmapa, strony per rola (`dla-kierowcow`, `dla-wlascicieli`, `dla-ksiegowych`, `dla-biur-rachunkowych`)
- **Strony docs**: `site/src/pages/docs/` — strony dokumentacji technicznej
- **Skrypty pomocnicze**: `site/scripts/generate-icons.mjs`, `site/scripts/generate-og.mjs`
- **Konfiguracja Astro**: `site/astro.config.mjs` — `site: 'https://busikm.pl'`, output `static`, Tailwind przez Vite plugin

## Design system (`site/src/styles/global.css`)

Caly system designu zdefiniowany w `@theme {}` w pliku `global.css`:

- **Brand**: `--color-brand: #005CE8` (Confidence Blue), warianty: `-light`, `-dark`, `-subtle`, `-border`
- **Grayscale**: Apple-neutral skala `--color-gray-50` do `--color-gray-950`
- **Semantic**: `--color-success` (zielony), `--color-warning` (pomaranczowy), `--color-danger` (czerwony)
- **UI tokens**: `--color-surface`, `--color-border`, `--color-text`, `--color-text-secondary`
- **Fonty**: `--font-display` (Plus Jakarta Sans — naglowki), `--font-sans` (DM Sans — body), `--font-mono` (JetBrains Mono)
- **Animacje**: klasy `.reveal` i `.reveal-stagger` (IntersectionObserver, klasa `.is-visible`), `.hero-seq-1` do `.hero-seq-5` (sekwencja ladowania hero)

Uzywaj tokenow z `@theme` zamiast hardkodowanych wartosci kolorow.

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
- **CompanyScopedMixin** — izolacja danych miedzy firmami (tenant isolation)
- **TenantContextMiddleware** — przelaczanie kontekstu firmy (header `X-Company-Context`)
- **AbstractFKIntegration** — wzorzec Strategy dla integracji z systemami FK
- **API-first** — schema OpenAPI z DRF → klient TS przez orval

## Konwencje

- Strona marketingowa (`site/`) w jezyku polskim, komponenty Astro + Tailwind CSS 4 utility classes
- **Conventional Commits** — format: `<type>(<scope>): <opis>`
- **Git flow** — feature/* -> develop -> staging -> main

## Aktualizacja statystyk sprintów / ticketów

Statystyki postępu są w **trzech miejscach** i muszą być zsynchronizowane:

1. **`site/src/pages/roadmapa.astro`** — sekcja `hero-seq-5` (hero stats: ukończone tickety, sprinty gotowe, tickety w backlogu, MVP LIVE) + tytuł "X sprintów za nami" w hero + lista sprintów z datami w sekcjach faz.
2. **`site/src/pages/index.astro`** — sekcja `STATUS PRODUKTU` (ok. linia 860): tytuł "X sprintów za nami. MVP LIVE…" oraz 4 karty (`ukończonych ticketów`, `sprintów gotowych`, `integracje FK`, `MVP LIVE`).
3. **`site/public/llms.txt`** — sekcja "Stan wdrożenia".

**Przy każdej zmianie sprintów/ticketów (np. zamknięcie sprintu w Jirze) zaktualizuj WSZYSTKIE TRZY miejsca razem.** Pojedyncza zmiana tylko na roadmapie powoduje rozjazd narracji na stronie głównej.

Źródłem prawdy są zamknięte sprinty w Jirze (BusiKM Cloud, cloudId `5b62c056-d341-4ff3-90d4-8dd0a04df072`) — sprawdzaj przez `closedSprints()` JQL.

## UPDATE ROADMAP — pełen cykl aktualizacji

Komenda **`UPDATE ROADMAP`** (lub jej wariant po polsku) uruchamia pełną resynchronizację strony z aktualnym stanem Jiry, łącznie z **predykcją daty MVP** na podstawie rzeczywistego tempa pracy.

### Krok 1 — pobierz dane z Jiry (Atlassian MCP)

Odpytaj Atlassian MCP (`searchJiraIssuesUsingJql`) i zapisz w pamięci roboczej:

- **Sprinty zamknięte**: nazwa, planowana data zakończenia (z poprzedniej wersji `roadmapa.astro`), faktyczna `completeDate` (Jira), liczba `Done` ticketów.
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
- Zmień status: `DONE`, dodaj rzeczywistą datę zakończenia (`completeDate` z Jiry).
- Karty zamkniętych sprintów mają zwykle border zielony / akcent success.

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

1. **`site/src/pages/roadmapa.astro`**:
   - Hero stats: liczba ukończonych ticketów, `N/35` sprintów, ticketów w backlogu, data MVP LIVE (skrócona).
   - Tytuł hero "X sprintów za nami".
   - Sekcja "Ukończone sprinty" — wstawione nowe karty (krok 5a).
   - Sekcja "Fazy przed nami" — renumerowane (krok 5b), daty po driftowaniu (krok 3).
   - Wszystkie anchor linki (`#faza-1`, `#faza-2`, …) i komponenty `<a>` zsynchronizowane z nową numeracją.
2. **`site/src/pages/index.astro`** (sekcja `STATUS PRODUKTU`):
   - Tytuł "X sprintów za nami. MVP LIVE …".
   - 4 karty (`ukończonych ticketów`, `N/35 sprintów gotowych`, `3 integracje FK`, skrócona data MVP).
3. **`site/public/llms.txt`** — sekcja "Stan wdrożenia": dzisiejsza data, liczby, data MVP, lista zamkniętych sprintów.

### Krok 7 — raport zmian

Po aktualizacji wypisz krótkie podsumowanie:
```
Drift: -2 dni (szybciej niż plan)
Zamknięte: S6b (132 ticketów łącznie, +8 vs poprzednia synchronizacja)
Faza 1 zamknięta → Faza 2 staje się Fazą 1
MVP: 30 maja 2026 → 28 maja 2026 (skrót: "28 maj")
Pliki: roadmapa.astro, index.astro, llms.txt
```

Następnie zaproponuj commit (`fix(roadmap): sync sprint X done · MVP shifted to …`) i czekaj na komendę commitu — nie commituj automatycznie.

### Edge cases

- **Brak `completeDate` w Jirze** dla sprintu oznaczonego jako closed → użyj `endDate` (planowanej).
- **Wszystkie zamknięte sprinty mają `delta = 0`** → drift = 0, nie ruszaj dat.
- **Drift > 14 dni** → sygnał ostrzegawczy, dopytaj użytkownika czy datę MVP rzeczywiście przesuwać tak mocno.
- **Sprinty rozłożone na fazy** (np. Faza 1 / Faza 2 w `roadmapa.astro`) → drift propaguje przez WSZYSTKIE następne sprinty bez względu na fazę.
