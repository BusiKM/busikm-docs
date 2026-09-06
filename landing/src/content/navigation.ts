/**
 * Nawigacja — jedno źródło dla paska, menu mobilnego i stopki.
 * Treść wg docs/landing/03-architektura-informacji.md.
 *
 * Każda pozycja niesie korzyść (`label`) i zdanie wyjaśnienia (`benefit`) —
 * nawigacja ma sprzedawać, nie wypisywać nazwy modułów.
 */

export type NavLeaf = {
  href: string;
  label: string;
  benefit: string;
  /** Gdzie ta rola pracuje — nadtytuł na karcie w menu „Dla kogo". */
  device?: string;
};

export type NavGroup = {
  /** Nagłówek kolumny w menu — szary, wersalikami. */
  heading: string;
  items: NavLeaf[];
};

export type NavEntry =
  | { kind: 'link'; href: string; label: string }
  | {
      kind: 'mega';
      label: string;
      /**
       * Prefiks działu — służy wyłącznie do podświetlenia pozycji, gdy
       * czytelnik jest na którejś z jej podstron. Sama pozycja nigdzie
       * nie prowadzi: jest tylko wyzwalaczem menu.
       */
      href: string;
      groups: NavGroup[];
      promo?: { href: string; label: string; benefit: string };
      /** Wąskie menu w jednej kolumnie zamiast pełnej szerokości. */
      compact?: boolean;
      /** Karty zamiast listy — układ z arkusza „Dla kogo". */
      cards?: boolean;
    };

export const coRobi: NavGroup[] = [
  {
    heading: 'W trasie',
    items: [
      {
        href: '/co-robi/aplikacja-kierowcy',
        label: 'Aplikacja kierowcy',
        benefit: 'Nawigacja, trasa i koszty w jednej aplikacji',
      },
      {
        href: '/co-robi/trasy-i-mapa',
        label: 'Trasy i mapa floty',
        benefit: 'Widzisz, gdzie jest każdy bus. Bez dzwonienia',
      },
      {
        href: '/co-robi/czas-pracy',
        label: 'Czas pracy i przerwy',
        benefit: 'Wiesz, kiedy kierowca musi stanąć',
      },
    ],
  },
  {
    heading: 'W biurze',
    items: [
      {
        href: '/co-robi/dyspozytornia',
        label: 'Dyspozytornia',
        benefit: 'Cały dzień pracy na jednym ekranie',
      },
      {
        href: '/co-robi/zlecenia-i-faktury',
        label: 'Zlecenia i faktury',
        benefit: 'Ze zlecenia robi się faktura. Klient dostaje ją od razu',
      },
      {
        href: '/co-robi/rentownosc',
        label: 'Ile zostaje',
        benefit: 'Zysk na każdym kursie, na bieżąco',
      },
    ],
  },
  {
    heading: 'Na koniec miesiąca',
    items: [
      {
        href: '/co-robi/koszty-i-paragony',
        label: 'Koszty i paragony',
        benefit: 'Zdjęcie zamiast reklamówki pod siedzeniem',
      },
      {
        href: '/co-robi/dane-dla-ksiegowej',
        label: 'Dane dla księgowej',
        benefit: 'Komplet dokumentów jednym przyciskiem',
      },
      {
        href: '/co-robi/dokumenty-i-terminy',
        label: 'Dokumenty i terminy',
        benefit: 'Nic nie wygaśnie po cichu',
      },
    ],
  },
];

export const dlaKogo: NavGroup[] = [
  {
    heading: 'Cztery role',
    items: [
      {
        href: '/dla-kogo/wlasciciel',
        label: 'Właściciel',
        benefit: 'Zysk, koszty i cała flota na jednym ekranie',
        device: 'Przeglądarka',
      },
      {
        href: '/dla-kogo/dyspozytor',
        label: 'Dyspozytor',
        benefit: 'Zlecenia, mapa i kierowca w jednym miejscu',
        device: 'Przeglądarka',
      },
      {
        href: '/dla-kogo/ksiegowa',
        label: 'Księgowa',
        benefit: 'Komplet dokumentów jednym przyciskiem',
        device: 'Przeglądarka',
      },
      {
        href: '/dla-kogo/kierowca',
        label: 'Kierowca',
        benefit: 'Jeden przycisk: rusz. Resztą zajmuje się telefon',
        device: 'Telefon',
      },
    ],
  },
];

export const navigation: NavEntry[] = [
  {
    kind: 'mega',
    label: 'Co robi',
    href: '/co-robi',
    groups: coRobi,
    promo: {
      href: '/demo',
      label: 'Zobacz demo',
      benefit: 'Przygotowujemy je. Zostaw adres, a damy znać w dniu uruchomienia.',
    },
  },
  { kind: 'mega', label: 'Dla kogo', href: '/dla-kogo', groups: dlaKogo, cards: true },
  { kind: 'link', href: '/cennik', label: 'Cennik' },
  {
    kind: 'mega',
    label: 'Pomoc',
    href: '/pomoc',
    compact: true,
    groups: [
      {
        heading: 'Pomoc',
        items: [
          { href: '/pomoc', label: 'Centrum pomocy', benefit: 'Odpowiedzi na najczęstsze pytania' },
          { href: '/pomoc/pierwsze-kroki', label: 'Pierwsze kroki', benefit: 'Od konta do pierwszej faktury' },
          { href: '/kontakt', label: 'Kontakt', benefit: 'Odpisujemy tego samego dnia' },
          { href: '/status', label: 'Status usługi', benefit: 'Czy wszystko działa' },
        ],
      },
    ],
  },
];

/** Nota pod menu „Dla kogo" — role są zbiorem, nie wyborem. */
export const rolesNote =
  'W małej firmie jedna osoba nosi dwie role. Przełączasz widok jednym kliknięciem.';

export const footerColumns = [
  { heading: 'Co robi', items: coRobi.flatMap((g) => g.items) },
  { heading: 'Dla kogo', items: dlaKogo[0].items },
  {
    heading: 'Firma',
    items: [
      { href: '/cennik', label: 'Cennik', benefit: '' },
      { href: '/demo', label: 'Demo', benefit: '' },
      { href: '/pomoc', label: 'Pomoc', benefit: '' },
      { href: '/kontakt', label: 'Kontakt', benefit: '' },
      { href: '/status', label: 'Status usługi', benefit: '' },
    ],
  },
  {
    heading: 'Prawne',
    items: [
      { href: '/regulamin', label: 'Regulamin', benefit: '' },
      { href: '/prywatnosc', label: 'Polityka prywatności', benefit: '' },
      { href: '/powierzenie-danych', label: 'Powierzenie danych', benefit: '' },
      { href: '/podprocesorzy', label: 'Podprocesorzy', benefit: '' },
    ],
  },
];

/**
 * Adresy aplikacji — w jednym miejscu, bo część nie jest jeszcze docelowa.
 *
 * `login` prowadzi na własną stronę, nie do aplikacji. Publicznej
 * rejestracji jeszcze nie ma (BKM-1858, etap 2 backlogu), a wersja testowa
 * na stagingu wpuszcza wyłącznie firmy z grupy testowej — odesłanie tam
 * wszystkich kończyłoby się ekranem logowania, na którym nikt się nie
 * zaloguje. `/zaloguj` mówi, na czym stoimy, zbiera adres i zostawia wyjście
 * osobom, które konto testowe już mają.
 *
 * `trial` prowadzi na cennik z tego samego powodu.
 */
export const appLinks = {
  trial: '/cennik',
  demo: '/demo',
  login: '/zaloguj',
} as const;

/**
 * Menu na telefonie — jedna lista sekcji, każda w tym samym rytmie.
 *
 * Wcześniej ten sam panel mieszał trzy wzorce: „Co robi" jako lista
 * z opisami, „Dla kogo" jako pigułki bez opisów, a Cennik, Pomoc i Zaloguj
 * jako rząd samych napisów. Przy okazji **cztery podstrony Pomocy nie miały
 * na telefonie żadnej drogi wejścia** — pozycja prowadziła prosto na
 * `/pomoc`, a Pierwsze kroki, Kontakt i Status usługi były osiągalne
 * wyłącznie ze stopki.
 *
 * Sekcje z rozwijanych menu budują się same, więc nowa podstrona dopisana
 * do `navigation` pojawi się tu bez ruszania nagłówka. Pozycje bez
 * rozwinięcia (dziś Cennik) też się dobierają — brakujący opis dokłada
 * `OPISY_POZYCJI`.
 */
export type SekcjaMenu = { heading: string; items: NavLeaf[] };

/** Zdania dla pozycji, które nie mają własnego rozwinięcia w `navigation`. */
const OPISY_POZYCJI: Record<string, string> = {
  '/cennik': 'Ile zapłacisz przy swojej liczbie pojazdów',
};

export const menuMobilne: SekcjaMenu[] = [
  ...navigation
    .filter((e): e is Extract<NavEntry, { kind: 'mega' }> => e.kind === 'mega')
    .map((e) => ({ heading: e.label, items: e.groups.flatMap((g) => g.items) })),
  {
    heading: 'Zacznij',
    items: [
      ...navigation
        .filter((e): e is Extract<NavEntry, { kind: 'link' }> => e.kind === 'link')
        .map((e) => ({ href: e.href, label: e.label, benefit: OPISY_POZYCJI[e.href] ?? '' })),
      {
        href: appLinks.demo,
        label: 'Zobacz demo',
        benefit: 'Przygotowujemy je — zostaw adres, damy znać',
      },
      {
        href: appLinks.login,
        label: 'Zaloguj się',
        benefit: 'Konta otwieramy wkrótce',
      },
    ],
  },
];
