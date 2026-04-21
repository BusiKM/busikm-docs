# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Opis repozytorium

To jest repozytorium **dokumentacji i strony marketingowej** projektu BusiKM — platformy SaaS do automatycznej ewidencji przebiegu pojazdow 2,5-3,5 t. Zawiera:

- `docs/` — pliki `.md` z dokumentacja techniczna i biznesowa (po polsku)
- `site/` — strona marketingowa busikm.pl (Astro 6 + Tailwind CSS 4)

Kod zrodlowy platformy (backend, mobile, web) znajduje sie w oddzielnych repozytoriach.

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

- **Framework**: Astro 6 (static output) + Tailwind CSS 4 (via Vite plugin) + @astrojs/sitemap
- **Layouty**: `BaseLayout.astro` (bazowy) → `MarketingLayout.astro` (strony marketingowe) / `DocsLayout.astro` (dokumentacja techniczna)
- **Komponenty**: `site/src/components/` — podzial na `layout/`, `home/`, `shared/`, `diagrams/`, `biznes/`, `guides/`, `tech/`
- **Strony marketingowe**: index, cennik, funkcje, roadmapa, strony per rola (dla-kierowcow, dla-wlascicieli, dla-ksiegowych, dla-biur-rachunkowych)
- **Strony docs**: `site/src/pages/docs/` — renderowane z danych z `docs/*.md`
- **Skrypty pomocnicze**: `site/scripts/generate-icons.mjs`, `site/scripts/generate-og.mjs`

## Struktura dokumentacji (`docs/`)

Wszystkie dokumenty sa w `docs/` i pisane po polsku:

- **PROJECT_OVERVIEW.md** — wizja, misja, rynek, model biznesowy, timeline
- **ARCHITECTURE.md** — architektura techniczna, stack, wzorce (RBAC, CompanyScopedMixin, TenantContextMiddleware, AbstractFKIntegration)
- **DATABASE_SCHEMA.md** — schemat baz danych (PostgreSQL + MongoDB + Redis)
- **API_SPECIFICATION.md** — specyfikacja API (OpenAPI 3.0, drf-spectacular)
- **FK_INTEGRATION.md** — integracje z systemami FK (Insert GT EDI++, Comarch, Symfonia, KSeF)
- **FEATURES.md** — pelna matryca funkcji per rola i per plan subskrypcyjny
- **SPRINT_PLAN.md** — plan sprintow
- **ROADMAP_3Y.md** — roadmapa 3-letnia
- **DEPLOYMENT.md** — deployment i infrastruktura
- **SECURITY.md** — bezpieczenstwo
- **MONITORING.md** — monitoring (Sentry, Prometheus, Grafana, Uptime Kuma)
- **MOBILE_APP.md**, **WEB_APP.md** — specyfikacje aplikacji mobilnej i webowej
- **USER_GUIDE_*.md** — podreczniki uzytkownika per rola (DRIVER, OWNER, ACCOUNTANT, AF)
- **SUBSCRIPTION_MANAGEMENT.md**, **MONETIZATION.md**, **MARKETING_PLAN.md** — model biznesowy
- **GLOSSARY.md** — slownik pojec

## Stack technologiczny projektu (dokumentowany)

| Warstwa | Technologia |
|---------|-------------|
| Backend | Django 5.x + DRF + Celery + Daphne (ASGI) |
| Mobile | React Native + Expo SDK 52+ + Expo Router v4 + Zustand |
| Web | Next.js 14 (App Router) + Tailwind + SWR + Recharts + Mapbox |
| Bazy danych | PostgreSQL 16 (dane relacyjne) + MongoDB 7 (GPS/logi) + Redis 7 (cache/broker) |
| Storage | S3 (DigitalOcean Spaces) / MinIO |
| CI/CD | GitHub Actions + EAS Build + Vercel |
| API Docs | drf-spectacular (OpenAPI 3.0) -> orval (generowany klient TS) |

## Kluczowe wzorce architektoniczne (dokumentowane)

- **RBAC** — 4 role: `driver`, `owner`, `accountant`, `accounting_firm`
- **CompanyScopedMixin** — izolacja danych miedzy firmami (tenant isolation)
- **TenantContextMiddleware** — przelaczanie kontekstu firmy dla biur rachunkowych (header `X-Company-Context`, cache Redis TTL 8h)
- **AbstractFKIntegration** — wzorzec Strategy dla integracji FK
- **API-first** — schema OpenAPI generowana z DRF, klient TS generowany przez orval
- **Conventional Commits** — format: `<type>(<scope>): <opis>`
- **Git flow** — feature/* -> develop -> staging -> main

## Konwencje

- Dokumenty w `docs/` pisane po polsku
- Polskie znaki diakrytyczne w naglowkach, ale w tresci technicznej czesto bez (np. nazwy klas, opisy pol)
- Tabele Markdown jako glowny format prezentacji danych
- Kazdy dokument zawiera date ostatniej aktualizacji na koncu
- Strona marketingowa (`site/`): komponenty Astro, Tailwind CSS 4 utility classes, strona w jezyku polskim
