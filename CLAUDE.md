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

Statystyki postępu są w **dwóch miejscach** i muszą być zsynchronizowane:

1. **`site/src/pages/roadmapa.astro`** — sekcja `hero-seq-5` (hero stats: ukończone tickety, sprinty gotowe, tickety w backlogu, MVP LIVE) + tytuł "X sprintów za nami" w hero.
2. **`site/src/pages/index.astro`** — sekcja `STATUS PRODUKTU` (ok. linia 860): tytuł "X sprintów za nami. MVP LIVE…" oraz 4 karty (`ukończonych ticketów`, `sprintów gotowych`, `integracje FK`, `MVP LIVE`).
3. **`site/public/llms.txt`** — sekcja "Stan wdrożenia".

**Przy każdej zmianie sprintów/ticketów (np. zamknięcie sprintu w Jirze) zaktualizuj WSZYSTKIE TRZY miejsca razem.** Pojedyncza zmiana tylko na roadmapie powoduje rozjazd narracji na stronie głównej.

Źródłem prawdy są zamknięte sprinty w Jirze (BusiKM Cloud) — sprawdzaj przez `closedSprints()` JQL.
