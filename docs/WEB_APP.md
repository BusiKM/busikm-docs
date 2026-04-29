# BusiKM -- Specyfikacja techniczna panelu webowego

## 1. Stos technologiczny

| Warstwa            | Technologia                              |
| ------------------ | ---------------------------------------- |
| Framework          | Next.js 16 (App Router)                  |
| Jezyk              | TypeScript (strict mode)                 |
| Stylowanie         | Tailwind CSS                             |
| Pobieranie danych  | SWR                                      |
| Stan klienta       | Zustand                                  |
| Wykresy            | Recharts                                 |
| Mapy               | Mapbox GL + react-map-gl                 |
| Komponenty UI      | Radix UI (primitives)                    |
| Powiadomienia      | Sonner (toasty)                          |
| Formularze         | react-hook-form + zod (walidacja)        |

---

## 2. Struktura projektu

```
busikm-web/
  src/
    app/
      (auth)/             # Strony autoryzacji (login, register, forgot-password)
      (dashboard)/        # Strony panelu (chronione middleware)
      (marketing)/        # Strony publiczne (landing, cennik, kontakt)
      api/
        proxy/[...path]/  # BFF proxy do backendu
      layout.tsx          # Root layout
    components/
      ui/                 # Komponenty bazowe (Button, Input, Dialog, Sheet, Badge)
      layout/             # Sidebar, Topbar, Breadcrumb, MobileNav
    lib/                  # Konfiguracja (axios, swr, mapbox, utils)
    hooks/                # Hooki (useAuth, useClient, useMediaQuery, useDebounce)
    stores/               # Zustand stores (auth, ui, notifications)
    types/                # Typy TypeScript (generowane z OpenAPI + manualne)
  public/                 # Statyczne zasoby
  middleware.ts           # Edge middleware (auth guard, role redirect)
  tailwind.config.ts      # Konfiguracja Tailwind
  next.config.ts          # Konfiguracja Next.js
```

---

## 3. Autoryzacja

### Strategia ciasteczek

| Ciasteczko       | Typ        | Cel                                    |
| ---------------- | ---------- | -------------------------------------- |
| `access_token`   | httpOnly   | Token dostepu -- niedostepny z JS      |
| `refresh_token`  | httpOnly   | Token odswiezania -- niedostepny z JS  |
| `user_data`      | non-httpOnly| Dane uzytkownika (rola, email) -- dostepny z JS |

### Middleware (Edge Runtime)

Plik `middleware.ts` wykonuje sie na kazdym urzadzeniu edge:

1. **Auth guard**: sprawdza obecnosc `access_token`. Brak -> przekierowanie do `/login`.
2. **Role redirect**: po zalogowaniu kieruje uzytkownika do odpowiedniego dashboardu na podstawie roli.
3. **Kontekst AF**: sprawdza naglowek `X-Client-Context` dla uzytkownikow AF (Authorized Fleet).
4. **Odswiezanie tokena**: jesli `access_token` wygasa w ciagu 60s, probuje refresh na edge.

### BFF Proxy

Route handler: `src/app/api/proxy/[...path]/route.ts`

- Przechwytuje wszystkie zapytania klienta do API.
- Dodaje `Authorization: Bearer <token>` z ciasteczka httpOnly.
- Przekazuje zapytanie do backendu Django.
- Zwraca odpowiedz do klienta (bez eksponowania tokena).

SWR fetcher uzywa BFF proxy:

```typescript
const fetcher = (url: string) => fetch(`/api/proxy${url}`).then(res => res.json());
```

---

## 4. Klient API

### Podwojny klient

| Kontekst          | Metoda                  | Cache              |
| ----------------- | ----------------------- | ------------------- |
| Server Components | `fetch` z tokenem z cookie | ISR cache (Next.js) |
| Client Components | SWR hooks               | SWR cache (pamiec)  |

### Generowanie z OpenAPI (orval)

- Zrodlo: schemat OpenAPI backendu (`/api/schema/`).
- Wyjscie: typy TypeScript + hooki SWR dla kazdego endpointu.
- Komenda: `npx orval --config orval.config.ts`.
- Automatyczna regeneracja w CI po zmianie schematu.

```typescript
// Wygenerowany hook
export const useTrips = (params?: TripsListParams) =>
  useSWR<TripListResponse>(
    params ? ['/trips/', params] : '/trips/',
    fetcher
  );
```

---

## 5. Layout aplikacji

### Sidebar

| Urzadzenie | Zachowanie                                         |
| ---------- | -------------------------------------------------- |
| Desktop    | Rozwiniety (280px) -- pelne etykiety + ikony       |
| Tablet     | Zwiniety (72px) -- tylko ikony z tooltipami        |
| Mobile     | Ukryty -- wysuniecie przez hamburger (Sheet overlay)|

Elementy sidebara:
- Logo BusiKM (link do dashboardu).
- Menu nawigacji (ikony + etykiety).
- Przelacznik klienta AF (jesli rola AF).
- Stopka: dane uzytkownika, przycisk wylogowania.

### Topbar

- **Breadcrumb**: dynamiczna sciezka nawigacji.
- **Wyszukiwarka**: globalne wyszukiwanie (pojazdy, kierowcy, trasy).
- **Powiadomienia**: dzwonek z badge'em liczby nieprzeczytanych.
- **Dropdown uzytkownika**: profil, ustawienia, wylogowanie.

---

## 6. Dashboard wlasciciela

### Karty statystyk (SSR)

Renderowane po stronie serwera dla natychmiastowego wyswietlenia:

| Karta           | Wartosc            | Trend              |
| --------------- | ------------------- | ------------------- |
| Pojazdy         | Liczba aktywnych    | vs poprzedni miesiac|
| Kierowcy        | Liczba aktywnych    | nowi w tym miesiacu |
| Trasy           | Liczba w okresie    | vs poprzedni okres  |
| Dystans          | Suma km             | vs poprzedni okres  |

### Widgety (CSR / SWR)

- **Alerty**: lista aktywnych alertow z filtrami. Interaktywne potwierdzanie.
- **Aktywne trasy**: lista biezacych tras z auto-odswiezaniem co 30s (`refreshInterval: 30000`).
- **Wykres tras**: Recharts area chart -- trasy w czasie (dziennie/tygodniowo/miesiecznie).
- **Koszty**: podsumowanie kosztow floty (paliwo, serwis, ubezpieczenia).
- **Zgodnosc kierowcow**: widget z procentem wypelnionych obowiazkow (trasy, zdjecia licznika).

---

## 7. Tabele danych

### Technologia

Biblioteka `@tanstack/react-table` z pelna konfiguracja:

- **Sortowanie**: kliknij naglowek kolumny (asc/desc/brak).
- **Filtrowanie**: filtry per kolumna + filtr globalny.
- **Paginacja**: numerowana z wyborem liczby wierszy (10/25/50/100).
- **Zaznaczanie**: checkboxy dla akcji grupowych (eksport, usuwanie).

### Responsywnosc

| Urzadzenie | Widok                                              |
| ---------- | -------------------------------------------------- |
| Desktop    | Pelna tabela ze wszystkimi kolumnami               |
| Tablet     | Tabela z ukrytymi mniej waznym kolumnami           |
| Mobile     | Widok kart (card view) -- kazdy wiersz jako karta  |

Przelaczanie kolumn przez `useMediaQuery` -- responsywne ukrywanie (`columnVisibility`).

---

## 8. Raporty

### Typy raportow

| Typ                   | Opis                                    |
| ---------------------- | --------------------------------------- |
| Przebieg (mileage)    | Raport przebiegow pojazdow w okresie    |
| Koszty floty          | Zestawienie kosztow utrzymania floty    |
| Delegacje             | Raport delegacji kierowcow              |

### Przeplyw generowania

1. **Dialog**: uzytkownik otwiera dialog raportu i wybiera parametry (typ, okres, pojazdy/kierowcy).
2. **Podglad**: sekcja preview aktualizuje sie na zywo przy zmianie parametrow.
3. **Generowanie asynchroniczne**:
   - `POST /reports/` -> odpowiedz `202 Accepted` z `report_id`.
   - Polling statusu: `GET /reports/{report_id}/` co 2s.
   - Statusy: `pending` -> `processing` -> `completed` / `failed`.
4. **Pobieranie**: po `completed` -- przycisk pobierania. Plik serwowany z presigned S3 URL.

---

## 9. Eksport FK

### Karty integracji

| Integracja       | Status         | Opis                              |
| ---------------- | -------------- | --------------------------------- |
| Insert GT        | Aktywna        | Eksport do formatu Insert GT      |
| Comarch ERP      | Wkrotce        | Planowana integracja              |
| Symfonia         | Wkrotce        | Planowana integracja              |

### Dialog eksportu

Kroki:
1. **Typ eksportu**: wybor formatu (Insert GT / inne).
2. **Zakres danych**: picker pojazdow i/lub kierowcow.
3. **Okres**: wybor zakresu dat (kalendarz).
4. **Podglad**: tabela z danymi do wyeksportowania.
5. **Generowanie**: asynchroniczne (jak raporty -- POST -> poll -> download).

### Historia eksportow

- Tabela z lista poprzednich eksportow.
- Rozwijanie wiersza (row expand): timeline statusow, ostrzezenia, link do pobrania.
- Filtr po typie, dacie, statusie.

---

## 10. Mapa czasu rzeczywistego (post-MVP, Sprint 6)

### WebSocket (Django Channels)

Polaczenie WebSocket do serwera:

```typescript
const socket = new WebSocket(`wss://api.busikm.pl/ws/live-trips/`);
```

### Hook `useLiveTrips`

- Automatyczne polaczenie przy montowaniu komponentu.
- **Reconnect**: exponential backoff (1s, 2s, 4s, 8s, max 30s).
- **Fallback**: jesli WebSocket niedostepny, przelaczenie na polling (SWR, `refreshInterval: 10000`).
- Dane: lista aktywnych tras z pozycjami GPS w czasie rzeczywistym.

### Mapa Mapbox

- **Markery ciezarowek**: ikony obracane wedlug kierunku jazdy (bearing).
- **Kolory**: zielony = w ruchu, szary = zatrzymany.
- **Klaster**: grupowanie markerow przy duzym oddaleniu.
- **Panel boczny**: lista aktywnych tras z podstawowymi informacjami (klik -> centrowanie mapy).
- **Badge polaczenia**: wskaznik statusu WebSocket (polaczony / rozlaczony / laczenie).

---

## 11. Responsywnosc

### Zasady projektowania

- **Mobile-first**: style Tailwind od najmniejszego breakpointu w gore (`sm:`, `md:`, `lg:`, `xl:`).
- **Touch targets**: minimalny rozmiar dotyku 44x44 px na mobile.
- **Typografia**: skalowanie tekstu wzgledem viewportu.

### Adaptacje komponentow

| Komponent   | Desktop                  | Mobile                    |
| ----------- | ------------------------ | ------------------------- |
| Dialog      | Wycentrowany modal       | Sheet (wysuwany od dolu)  |
| Tabela      | Pelna tabela             | Widok kart                |
| Sidebar     | Staly panel boczny       | Hamburger -> Sheet overlay|
| Formularze  | Wielokolumnowe           | Jednokolumnowe            |
| Wykresy     | Pelny rozmiar            | Przewijane horyzontalnie  |

---

## 12. Panel AF (Authorized Fleet)

### Strony panelu AF

| Strona           | Sciezka              | Opis                                    |
| ---------------- | --------------------- | --------------------------------------- |
| Lista klientow   | `/af/clients`         | Tabela klientow z wyszukiwarka          |
| Szczegoly klienta| `/af/clients/[id]`    | Dane klienta, statystyki, flota         |
| Dodaj klienta    | `/af/clients/new`     | Wyszukiwanie po NIP + formularz         |

### Przelacznik klienta

- Dropdown w sidebarze z lista klientow AF.
- Po wybraniu klienta: cala nawigacja przelacza kontekst.
- Standardowe strony (`/fleet`, `/trips`, `/reports`) wyswietlaja dane wybranego klienta.
- Mechanizm: naglowek `X-Client-Context: <client_id>` dodawany do kazdego zapytania API.

### Dashboard zbiorczy AF

- Widok zagregowany: statystyki wszystkich klientow lacznie.
- Tabela klientow z kluczowymi metrykami (pojazdy, kierowcy, trasy, alerty).
- Szybkie akcje: przejdz do klienta, wygeneruj raport zbiorczy.
