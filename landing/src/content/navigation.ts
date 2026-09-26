import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

/**
 * Nawigacja — jedno źródło dla paska, menu mobilnego i stopki.
 * Treść wg docs/landing/03-architektura-informacji.md.
 *
 * Wszystkie odnośniki są polskie — na stronie angielskiej zamienia je
 * `i18n/Link` (albo `lokalizuj`). Teksty idą w obu językach.
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

type Teksty = {
  coRobi: NavGroup[];
  dlaKogo: NavGroup[];
  menu: { coRobi: string; dlaKogo: string; cennik: string; pomoc: string };
  promo: { label: string; benefit: string };
  pomoc: NavLeaf[];
  rolesNote: string;
  stopka: { firma: string; prawne: string; items: NavLeaf[]; dokumenty: NavLeaf[] };
  zacznij: { heading: string; cennik: string; demo: NavLeaf; login: NavLeaf };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    coRobi: [
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
    ],
    dlaKogo: [
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
    ],
    menu: { coRobi: 'Co robi', dlaKogo: 'Dla kogo', cennik: 'Cennik', pomoc: 'Pomoc' },
    promo: {
      label: 'Zobacz demo',
      benefit: 'Przygotowujemy je. Zostaw adres, a damy znać w dniu uruchomienia.',
    },
    pomoc: [
      { href: '/pomoc', label: 'Centrum pomocy', benefit: 'Odpowiedzi na najczęstsze pytania' },
      { href: '/pomoc/pierwsze-kroki', label: 'Pierwsze kroki', benefit: 'Od konta do pierwszej faktury' },
      { href: '/kontakt', label: 'Kontakt', benefit: 'Odpisujemy tego samego dnia' },
      { href: '/status', label: 'Status usługi', benefit: 'Czy wszystko działa' },
    ],
    rolesNote:
      'W małej firmie jedna osoba nosi dwie role. Przełączasz widok jednym kliknięciem.',
    stopka: {
      firma: 'Firma',
      prawne: 'Prawne',
      items: [
        { href: '/cennik', label: 'Cennik', benefit: '' },
        { href: '/demo', label: 'Demo', benefit: '' },
        { href: '/pomoc', label: 'Pomoc', benefit: '' },
        { href: '/kontakt', label: 'Kontakt', benefit: '' },
        { href: '/status', label: 'Status usługi', benefit: '' },
      ],
      dokumenty: [
        { href: '/regulamin', label: 'Regulamin', benefit: '' },
        { href: '/prywatnosc', label: 'Polityka prywatności', benefit: '' },
        { href: '/powierzenie-danych', label: 'Powierzenie danych', benefit: '' },
        { href: '/podprocesorzy', label: 'Podprocesorzy', benefit: '' },
      ],
    },
    zacznij: {
      heading: 'Zacznij',
      cennik: 'Ile zapłacisz przy swojej liczbie pojazdów',
      demo: {
        href: '/demo',
        label: 'Zobacz demo',
        benefit: 'Przygotowujemy je — zostaw adres, damy znać',
      },
      login: { href: '/zaloguj', label: 'Zaloguj się', benefit: 'Konta otwieramy wkrótce' },
    },
  },
  en: {
    coRobi: [
      {
        heading: 'On the road',
        items: [
          {
            href: '/co-robi/aplikacja-kierowcy',
            label: 'Driver app',
            benefit: 'Navigation, route and costs in one app',
          },
          {
            href: '/co-robi/trasy-i-mapa',
            label: 'Routes and fleet map',
            benefit: 'See where every van is. No phone calls',
          },
          {
            href: '/co-robi/czas-pracy',
            label: 'Working time and breaks',
            benefit: 'Know when a driver has to stop',
          },
        ],
      },
      {
        heading: 'In the office',
        items: [
          {
            href: '/co-robi/dyspozytornia',
            label: 'Dispatch',
            benefit: 'The whole working day on one screen',
          },
          {
            href: '/co-robi/zlecenia-i-faktury',
            label: 'Orders and invoices',
            benefit: 'An order turns into an invoice. The client gets it right away',
          },
          {
            href: '/co-robi/rentownosc',
            label: 'What you keep',
            benefit: 'Profit on every job, as it happens',
          },
        ],
      },
      {
        heading: 'At month end',
        items: [
          {
            href: '/co-robi/koszty-i-paragony',
            label: 'Costs and receipts',
            benefit: 'A photo instead of a bag of receipts under the seat',
          },
          {
            href: '/co-robi/dane-dla-ksiegowej',
            label: 'Data for your accountant',
            benefit: 'The full document pack in one click',
          },
          {
            href: '/co-robi/dokumenty-i-terminy',
            label: 'Documents and deadlines',
            benefit: 'Nothing expires without you knowing',
          },
        ],
      },
    ],
    dlaKogo: [
      {
        heading: 'Four roles',
        items: [
          {
            href: '/dla-kogo/wlasciciel',
            label: 'Owner',
            benefit: 'Profit, costs and the whole fleet on one screen',
            device: 'Browser',
          },
          {
            href: '/dla-kogo/dyspozytor',
            label: 'Dispatcher',
            benefit: 'Orders, map and drivers in one place',
            device: 'Browser',
          },
          {
            href: '/dla-kogo/ksiegowa',
            label: 'Accountant',
            benefit: 'The full document pack in one click',
            device: 'Browser',
          },
          {
            href: '/dla-kogo/kierowca',
            label: 'Driver',
            benefit: 'One button: go. The phone handles the rest',
            device: 'Phone',
          },
        ],
      },
    ],
    menu: { coRobi: 'Features', dlaKogo: 'Who it’s for', cennik: 'Pricing', pomoc: 'Help' },
    promo: {
      label: 'See the demo',
      benefit: 'We’re building it. Leave your email and we’ll let you know on launch day.',
    },
    pomoc: [
      { href: '/pomoc', label: 'Help centre', benefit: 'Answers to the most common questions' },
      { href: '/pomoc/pierwsze-kroki', label: 'Getting started', benefit: 'From sign-up to your first invoice' },
      { href: '/kontakt', label: 'Contact', benefit: 'We reply the same day' },
      { href: '/status', label: 'Service status', benefit: 'Is everything working' },
    ],
    rolesNote:
      'In a small company one person often wears two hats. Switch views with one click.',
    stopka: {
      firma: 'Company',
      prawne: 'Legal',
      items: [
        { href: '/cennik', label: 'Pricing', benefit: '' },
        { href: '/demo', label: 'Demo', benefit: '' },
        { href: '/pomoc', label: 'Help', benefit: '' },
        { href: '/kontakt', label: 'Contact', benefit: '' },
        { href: '/status', label: 'Service status', benefit: '' },
      ],
      dokumenty: [
        { href: '/regulamin', label: 'Terms of Service', benefit: '' },
        { href: '/prywatnosc', label: 'Privacy Policy', benefit: '' },
        { href: '/powierzenie-danych', label: 'Data Processing Agreement', benefit: '' },
        { href: '/podprocesorzy', label: 'Subprocessors', benefit: '' },
      ],
    },
    zacznij: {
      heading: 'Get started',
      cennik: 'What you’ll pay for your number of vehicles',
      demo: {
        href: '/demo',
        label: 'See the demo',
        benefit: 'We’re building it — leave your email and we’ll let you know',
      },
      login: { href: '/zaloguj', label: 'Sign in', benefit: 'Accounts open soon' },
    },
  },
};

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
 * `opisyPozycji`.
 */
export type SekcjaMenu = { heading: string; items: NavLeaf[] };

/** Nawigacja w danym języku — pasek, menu mobilne i stopka. */
export function nawigacja(jezyk: Jezyk) {
  const t = TEKSTY[jezyk];

  const navigation: NavEntry[] = [
    {
      kind: 'mega',
      label: t.menu.coRobi,
      href: '/co-robi',
      groups: t.coRobi,
      promo: { href: appLinks.demo, ...t.promo },
    },
    { kind: 'mega', label: t.menu.dlaKogo, href: '/dla-kogo', groups: t.dlaKogo, cards: true },
    { kind: 'link', href: '/cennik', label: t.menu.cennik },
    {
      kind: 'mega',
      label: t.menu.pomoc,
      href: '/pomoc',
      compact: true,
      groups: [{ heading: t.menu.pomoc, items: t.pomoc }],
    },
  ];

  /** Zdania dla pozycji, które nie mają własnego rozwinięcia w `navigation`. */
  const opisyPozycji: Record<string, string> = { '/cennik': t.zacznij.cennik };

  const menuMobilne: SekcjaMenu[] = [
    ...navigation
      .filter((e): e is Extract<NavEntry, { kind: 'mega' }> => e.kind === 'mega')
      .map((e) => ({ heading: e.label, items: e.groups.flatMap((g) => g.items) })),
    {
      heading: t.zacznij.heading,
      items: [
        ...navigation
          .filter((e): e is Extract<NavEntry, { kind: 'link' }> => e.kind === 'link')
          .map((e) => ({ href: e.href, label: e.label, benefit: opisyPozycji[e.href] ?? '' })),
        t.zacznij.demo,
        t.zacznij.login,
      ],
    },
  ];

  return {
    coRobi: t.coRobi,
    dlaKogo: t.dlaKogo,
    navigation,
    /** Nota pod menu „Dla kogo" — role są zbiorem, nie wyborem. */
    rolesNote: t.rolesNote,
    menuMobilne,
    /** Kolumny stopki — bez dokumentów prawnych, te mają własny pasek na dole. */
    kolumnyStopki: [
      { heading: t.menu.coRobi, items: t.coRobi.flatMap((g) => g.items) },
      { heading: t.menu.dlaKogo, items: t.dlaKogo[0].items },
      { heading: t.stopka.firma, items: t.stopka.items },
    ],
    dokumenty: t.stopka.dokumenty,
  };
}
