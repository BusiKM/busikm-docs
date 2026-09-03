# BusiKM — landing (Next.js)

Przepisanie artboardu `design/Landing page ze systemem designu/BusiKM Landing.dc.html`
na Next.js 16 (App Router) + Tailwind CSS 4. Copy, kolory, typografia i struktura
sekcji zachowane 1:1 z projektu; spec: `uploads/PROMPT_claude_design_landing_busikm.md`.

## Uruchomienie

```bash
cd landing
npm install
npm run dev      # http://localhost:3000
npm run build    # build produkcyjny
```

Wymaga Node >= 20.

## Struktura

```
src/app/globals.css          tokeny designu (@theme) — artboard „SYSTEM"
src/app/layout.tsx           Inter + IBM Plex Mono (next/font), metadata
src/app/page.tsx             kolejność sekcji landingu
src/components/layout/       Header (sticky, blur), Footer
src/components/sections/     sekcje strony
src/components/mockups/      makiety interfejsu (bohaterowie sekcji)
src/components/ui/           Button, Container, TechCaption
```

## Design system

| Token | Wartość | Zastosowanie |
|---|---|---|
| `ink` | `#0A0A0B` | tekst na jasnym, tło sekcji ciemnych |
| `paper` | `#FAFAFA` | tło sekcji jasnych |
| `surface` | `#111113` | karty na ciemnym |
| `mist` | `#F2F2F4` | karty na jasnym |
| `line` | `#E3E3E6` | krawędzie |
| `muted` | `#6E6E76` | tekst drugorzędny |
| `blue` | `#0B5FFF` | akcja główna, linki |
| `amber` | `#FF9500` | **tylko** sekcja tachografowa |
| `green` | `#30D158` | stany „gotowe" w makietach |

Skala typograficzna: `text-display` / `text-h1` / `text-h2` / `text-h3` / `text-lead` /
`text-body` / `text-caption` — wraz z wariantami mobilnymi (`-m`), np.
`text-h1-m lg:text-h1`. Promienie: `rounded-btn` (12), `rounded-card` (20),
`rounded-panel` (28). Cienie: `shadow-card`, `shadow-hero`, `shadow-blue`, `shadow-phone`.

## Responsywność

Breakpoint `lg` (1024px) rozdziela artboard mobilny (390) od desktopowego (1440).
Wszystkie wartości z artboardu mobilnego (typografia, odstępy, uproszczone
warianty makiet) obowiązują poniżej `lg`.

Dwa miejsca schodzą poniżej 390px, bo projekt nie definiuje węższych ekranów —
bez tego strona przewijałaby się w poziomie na iPhone SE (320px):

- `DriveTimeRings` — pierścienie mają `max-w-[88px]` i zwężają się proporcjonalnie
  poniżej 390px (przy 390 zostaje dokładnie 88px z projektu);
- `Pricing` — etykieta „2 miesiące gratis" schodzi pod przełącznik poniżej 360px.

Sprawdzone bez przewijania poziomego: 320 · 360 · 375 · 390 · 414 · 428 · 640 ·
768 · 834 · 1024 · 1280 · 1440 · 1920.

## Nawigacja

`Header` realizuje arkusz „Nawigacja — stany": pasek 72 px, białe tło z rozmyciem
20 px, dolna linia `ink/8`, wyśrodkowane menu, po prawej „Zaloguj się" i pigułka
„Zobacz demo".

| Stan | Realizacja |
|---|---|
| domyślny | bez cienia, pozycje `text-ink/60` |
| po przewinięciu 24 px | `shadow-nav` (listener `scroll`) |
| hover pozycji | `text-ink` |
| pozycja aktywna | pigułka `bg-blue-soft` + `text-ink`, waga 600 |
| hover przycisku | `#0A46C0` (`blue-dark`) |
| mobile zamknięte | logo · pigułka „Demo" · hamburger |
| mobile otwarte | nakładka `paper`, pozycje 28 px, aktywna na niebiesko, dwa przyciski |

Aktywna pozycja wynika z pozycji przewinięcia — nasłuch `scroll` sprawdza, która
sekcja (`#jak-to-dziala`, `#dlakogo`, `#cennik`, `#pomoc`, `#kontakt`) jest pod
paskiem. Nakładka menu mobilnego musi być **poza** `<header>`: `backdrop-filter`
tworzy containing block dla `position: fixed` i nakładka miałaby zerową wysokość.

Znak w pasku pochodzi z `landing/public/logo/logo.svg` (biały glif) osadzonego na
kaflu `blue` o promieniu 29% — komponent `Logo`.

## Odstępstwa od artboardu

Hamburger w projekcie jest statyczny — tutaj otwiera nakładkę z nawigacją
(`Header` jest komponentem klienckim). „Kontakt" nie ma własnej sekcji na
landingu, więc kotwiczy w stopce przy danych kontaktowych.
