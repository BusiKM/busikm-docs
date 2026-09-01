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
      /** Adres huba — pozycja w pasku też jest klikalna. */
      href: string;
      groups: NavGroup[];
      promo?: { href: string; label: string; benefit: string };
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
      },
      {
        href: '/dla-kogo/dyspozytor',
        label: 'Dyspozytor',
        benefit: 'Zlecenia, mapa i kierowca w jednym miejscu',
      },
      {
        href: '/dla-kogo/ksiegowa',
        label: 'Księgowa',
        benefit: 'Komplet dokumentów jednym przyciskiem',
      },
      {
        href: '/dla-kogo/kierowca',
        label: 'Kierowca',
        benefit: 'Jeden przycisk: rusz. Resztą zajmuje się telefon',
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
      benefit: 'Prawdziwa aplikacja z przykładową firmą. Bez zakładania konta.',
    },
  },
  { kind: 'mega', label: 'Dla kogo', href: '/dla-kogo', groups: dlaKogo },
  { kind: 'link', href: '/cennik', label: 'Cennik' },
  { kind: 'link', href: '/pomoc', label: 'Pomoc' },
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

/** Adresy aplikacji — dopóki nie ma docelowych, trzymamy je w jednym miejscu. */
export const appLinks = {
  trial: '/cennik',
  demo: '/demo',
  login: 'https://app.busikm.pl',
} as const;
