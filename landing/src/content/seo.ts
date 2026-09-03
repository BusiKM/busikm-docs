/**
 * Dane dla wyszukiwarek — jedno źródło.
 *
 * Wszystko, co dotyczy widoczności strony w Google, wychodzi stąd: adresy
 * kanoniczne, mapa strony, dane strukturalne i metadane podstron. Jeżeli
 * dochodzi nowa podstrona, dopisujesz ją w `trasy` — inaczej nie trafi
 * do `sitemap.xml`.
 */

/** Adres produkcyjny. Kanoniczne adresy i mapa strony budują się na nim. */
export const serwis = {
  url: 'https://busikm.pl',
  nazwa: 'BusiKM',
  /**
   * Tytuł strony głównej w wyniku wyszukiwania.
   *
   * Nie jest to hasło z nagłówka. Nagłówek „Kierowca jedzie. Reszta dzieje
   * się sama." sprzedaje komuś, kto już jest na stronie — ale nie zawiera
   * ani jednego słowa, które ktoś wpisuje w Google. Tytuł prowadzi frazą,
   * której szuka właściciel firmy transportowej, i dopiero potem podaje markę.
   */
  tytul: 'Program do zarządzania transportem busami · BusiKM',
  opis:
    'Ewidencja przebiegu pojazdu, czas pracy kierowców, zlecenia i faktury w jednym programie. Dla firm transportowych z busami 2,5–3,5 t. 14 dni za darmo.',
  /**
   * Krótsza wersja do podglądu w mediach społecznościowych. Wersja dla Google
   * ma 150 znaków i gubi na telefonie całe „14 dni za darmo" — czyli jedyne
   * wezwanie do działania w całym podglądzie.
   */
  opisOg:
    'Ewidencja przebiegu, czas pracy kierowców, zlecenia i faktury w jednym programie. Dla firm z busami 2,5–3,5 t. 14 dni gratis.',
  jezyk: 'pl',
  locale: 'pl_PL',
  /** Obraz do podglądu w mediach społecznościowych — w `public/`. */
  ogImage: '/og-image/og-image.jpg',
  /** Znak firmowy dla danych strukturalnych. Google woli rastrowy, kwadratowy. */
  logo: '/web-app-manifest-512x512.png',
} as const;

/**
 * Data ostatniej zmiany treści — trafia do `sitemap.xml` jako `lastmod`.
 *
 * Trzymana ręcznie, bo alternatywy kłamią: data budowania zmienia się przy
 * każdym wdrożeniu, a czas pliku po `git clone` na Vercelu jest czasem
 * klonowania, nie edycji. Google ignoruje `lastmod`, któremu przestaje ufać,
 * więc lepiej mieć datę rzadszą i prawdziwą.
 *
 * Aktualizuj przy istotnej zmianie treści strony — nie przy poprawce literówki.
 */
const ZMIENIONO = '2026-09-03';

export type Priorytet = 0.2 | 0.3 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1;
export type Czestotliwosc = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type Trasa = {
  /** Ścieżka od korzenia, bez ukośnika na końcu. Strona główna to `''`. */
  sciezka: string;
  priorytet: Priorytet;
  czestotliwosc: Czestotliwosc;
  zmieniono?: string;
};

/**
 * Strony wystawione wyszukiwarkom. Kolejność jest kolejnością w `sitemap.xml`
 * — od najważniejszej.
 */
export const trasy: Trasa[] = [
  { sciezka: '', priorytet: 1, czestotliwosc: 'weekly' },

  { sciezka: '/cennik', priorytet: 0.9, czestotliwosc: 'monthly' },
  { sciezka: '/demo', priorytet: 0.8, czestotliwosc: 'monthly' },

  { sciezka: '/co-robi/aplikacja-kierowcy', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/dyspozytornia', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/trasy-i-mapa', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/czas-pracy', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/zlecenia-i-faktury', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/koszty-i-paragony', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/rentownosc', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/dane-dla-ksiegowej', priorytet: 0.8, czestotliwosc: 'monthly' },
  { sciezka: '/co-robi/dokumenty-i-terminy', priorytet: 0.8, czestotliwosc: 'monthly' },

  { sciezka: '/dla-kogo/wlasciciel', priorytet: 0.7, czestotliwosc: 'monthly' },
  { sciezka: '/dla-kogo/dyspozytor', priorytet: 0.7, czestotliwosc: 'monthly' },
  { sciezka: '/dla-kogo/ksiegowa', priorytet: 0.7, czestotliwosc: 'monthly' },
  { sciezka: '/dla-kogo/kierowca', priorytet: 0.7, czestotliwosc: 'monthly' },

  { sciezka: '/pomoc', priorytet: 0.6, czestotliwosc: 'monthly' },
  { sciezka: '/pomoc/pierwsze-kroki', priorytet: 0.6, czestotliwosc: 'monthly' },
  { sciezka: '/kontakt', priorytet: 0.5, czestotliwosc: 'yearly' },
  { sciezka: '/status', priorytet: 0.3, czestotliwosc: 'daily' },

  { sciezka: '/regulamin', priorytet: 0.2, czestotliwosc: 'yearly' },
  { sciezka: '/prywatnosc', priorytet: 0.2, czestotliwosc: 'yearly' },
  { sciezka: '/powierzenie-danych', priorytet: 0.2, czestotliwosc: 'yearly' },
  { sciezka: '/podprocesorzy', priorytet: 0.2, czestotliwosc: 'yearly' },
];

export const dataZmiany = (t: Trasa) => new Date(t.zmieniono ?? ZMIENIONO);

/**
 * Strony wyłączone z indeksu.
 *
 * `/dla-kogo` to szkielet z jednym zdaniem „ta strona czeka na projekt", do
 * którego nie prowadzi już żaden odnośnik — pozycja w menu jest wyłącznie
 * wyzwalaczem. Wpuszczenie jej do indeksu dołożyłoby serwisowi pustą stronę,
 * a Google liczy takie do oceny całości.
 */
export const nieindeksowane = ['/dla-kogo'];

/**
 * Ścieżki, których roboty nie mają po co odwiedzać.
 *
 * Świadomie **nie ma tu `/_next/`**. Google renderuje stronę tak jak
 * przeglądarka i potrzebuje do tego skryptów oraz arkuszy — zablokowanie
 * katalogu z zasobami to klasyczny sposób na to, żeby robot zobaczył
 * pustą stronę zamiast treści.
 */
export const zablokowane = ['/api/'];
