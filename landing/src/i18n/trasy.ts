import type { Jezyk } from '@/i18n/jezyki';

/**
 * Adresy angielskie — jedno źródło dla proxy, odnośników, mapy strony,
 * `hreflang` i przełącznika języka.
 *
 * Klucz to ścieżka polska (ta sama, pod którą strona leży w `app/[lang]`),
 * wartość to ścieżka angielska **bez** przedrostka `/en`. Nowa podstrona
 * musi dostać tu wpis — bez niego wersja angielska nie ma adresu, a odnośnik
 * do niej zostaje polski.
 *
 * Plik jest importowany przez `proxy.ts`, więc nie może ciągnąć za sobą
 * treści strony. Stąd osobna, płaska lista slugów artykułów pomocy zamiast
 * importu z `content/pomoc`.
 */
const STRONY: Record<string, string> = {
  '': '',
  '/cennik': '/pricing',
  '/demo': '/demo',
  '/zaloguj': '/sign-in',
  '/kontakt': '/contact',
  '/status': '/status',

  '/co-robi': '/features',
  '/co-robi/aplikacja-kierowcy': '/features/driver-app',
  '/co-robi/dyspozytornia': '/features/dispatch',
  '/co-robi/trasy-i-mapa': '/features/routes-and-map',
  '/co-robi/czas-pracy': '/features/working-time',
  '/co-robi/zlecenia-i-faktury': '/features/orders-and-invoices',
  '/co-robi/koszty-i-paragony': '/features/costs-and-receipts',
  '/co-robi/rentownosc': '/features/profitability',
  '/co-robi/dane-dla-ksiegowej': '/features/accounting-export',
  '/co-robi/dokumenty-i-terminy': '/features/documents-and-deadlines',

  '/dla-kogo': '/for',
  '/dla-kogo/wlasciciel': '/for/owners',
  '/dla-kogo/dyspozytor': '/for/dispatchers',
  '/dla-kogo/ksiegowa': '/for/accountants',
  '/dla-kogo/kierowca': '/for/drivers',

  '/pomoc': '/help',
  '/pomoc/pierwsze-kroki': '/help/getting-started',

  '/regulamin': '/terms',
  '/prywatnosc': '/privacy',
  '/powierzenie-danych': '/data-processing-agreement',
  '/podprocesorzy': '/subprocessors',
};

/** Slugi artykułów pomocy: polski → angielski. */
export const SLUGI_ARTYKULOW: Record<string, string> = {
  'zakladamy-konto': 'creating-an-account',
  'dane-firmy': 'company-details',
  'dodajemy-pojazd': 'adding-a-vehicle',
  'zapraszamy-kierowce': 'inviting-a-driver',
  'kierowca-pierwsze-logowanie': 'driver-first-sign-in',
  'trasa-kierowcy': 'driver-route',
  'paragony-kierowcy': 'driver-receipts',
  'czas-pracy-kierowcy': 'driver-working-time',
  'nowe-zlecenie': 'new-order',
  dyspozytornia: 'dispatch-board',
  kontrahenci: 'clients',
  'faktura-za-zlecenie': 'invoice-for-order',
  'koszty-w-biurze': 'office-costs',
  'dokumenty-i-terminy': 'documents-and-deadlines',
  'przejazdy-i-kilometrowka': 'trips-and-mileage-log',
  'zamkniecie-miesiaca': 'month-end-close',
  'eksport-dla-ksiegowej': 'export-for-accountant',
  'raporty-i-ewidencje': 'reports-and-logs',
  'zespol-i-role': 'team-and-roles',
  'bezpieczenstwo-konta': 'account-security',
  'plan-i-rezygnacja': 'plan-and-cancellation',
};

const PL_NA_EN: Record<string, string> = {
  ...STRONY,
  ...Object.fromEntries(
    Object.entries(SLUGI_ARTYKULOW).map(([pl, en]) => [`/pomoc/${pl}`, `/help/${en}`]),
  ),
};

const EN_NA_PL: Record<string, string> = Object.fromEntries(
  Object.entries(PL_NA_EN).map(([pl, en]) => [en, pl]),
);

/** `/` i `''` to ta sama strona główna; ukośnik na końcu nic nie znaczy. */
function normalizuj(sciezka: string): string {
  const bez = sciezka.replace(/\/+$/, '');
  return bez === '/' ? '' : bez;
}

/** Czy to znana ścieżka polska (wewnętrzna). */
export function znanaSciezkaPl(sciezka: string): boolean {
  return normalizuj(sciezka) in PL_NA_EN;
}

/** Ścieżka polska dla angielskiej (bez `/en`), albo `null`, gdy jej nie ma. */
export function plZEn(sciezkaEn: string): string | null {
  return EN_NA_PL[normalizuj(sciezkaEn)] ?? null;
}

/**
 * Adres publiczny strony w danym języku.
 *
 * Przyjmuje ścieżkę polską — tak, jak zapisane są odnośniki w kodzie — razem
 * z ewentualnym `?zapytaniem` i `#kotwicą`. Adresy zewnętrzne, pliki
 * z `public/` i ścieżki spoza mapy wracają bez zmian.
 */
export function lokalizuj(href: string, jezyk: Jezyk): string {
  if (jezyk === 'pl' || !href.startsWith('/') || href.startsWith('//')) return href;

  const m = href.match(/^([^?#]*)(.*)$/);
  const sciezka = normalizuj(m?.[1] ?? href);
  const reszta = m?.[2] ?? '';

  const en = PL_NA_EN[sciezka];
  if (en === undefined) return href;
  return `/en${en}${reszta}`;
}

/**
 * Rozpoznaje język i polską ścieżkę z adresu.
 *
 * Działa na obu postaciach adresu, bo `usePathname()` zwraca w przeglądarce
 * adres publiczny (`/en/pricing`), a przy prerenderze wewnętrzny
 * (`/en/cennik`, `/pl/cennik`). Bez tego ten sam komponent wyrenderowałby
 * na serwerze i w przeglądarce co innego.
 */
export function rozpoznaj(pathname: string): { jezyk: Jezyk; sciezkaPl: string } {
  const p = normalizuj(pathname);

  if (p === '/en' || p.startsWith('/en/')) {
    const reszta = p.slice(3);
    const pl = plZEn(reszta) ?? (znanaSciezkaPl(reszta) ? normalizuj(reszta) : reszta);
    return { jezyk: 'en', sciezkaPl: pl };
  }
  if (p === '/pl' || p.startsWith('/pl/')) {
    return { jezyk: 'pl', sciezkaPl: normalizuj(p.slice(3)) };
  }
  return { jezyk: 'pl', sciezkaPl: p };
}

/** Adres tej samej strony w drugim języku — dla przełącznika i `hreflang`. */
export function odpowiednik(sciezkaPl: string, jezyk: Jezyk): string {
  return lokalizuj(sciezkaPl || '/', jezyk);
}
