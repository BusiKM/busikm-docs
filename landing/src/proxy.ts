import { NextResponse, type NextRequest } from 'next/server';
import { CIASTKO_JEZYKA, czyJezyk, type Jezyk } from '@/i18n/jezyki';
import { lokalizuj, plZEn, znanaSciezkaPl } from '@/i18n/trasy';

/**
 * Wybór języka i przepisanie adresu publicznego na wewnętrzny.
 *
 * Adresy publiczne: `/cennik` (polski) i `/en/pricing` (angielski).
 * Strony leżą w `app/[lang]/…` pod polskimi nazwami katalogów, więc tu
 * `/cennik` staje się `/pl/cennik`, a `/en/pricing` — `/en/cennik`.
 *
 * Który język dostaje czytelnik:
 * 1. Wybór z przełącznika EN/PL (ciasteczko) — zawsze wygrywa.
 * 2. Bez wyboru: polski, gdy wchodzi z Polski albo gdy pierwszym językiem
 *    przeglądarki jest polski. Każdy inny kraj i język → angielski.
 * 3. Roboty (Google, podglądy linków, Lighthouse) nie są przekierowywane
 *    wcale. Google indeksuje z USA — przekierowanie odcięłoby mu polską
 *    wersję, a o istnieniu obu i tak dowiaduje się z `hreflang`.
 */

const ROBOT =
  /bot|crawl|spider|slurp|lighthouse|headless|facebookexternalhit|embedly|preview|whatsapp|telegram|skype|linkedin|pinterest|vercel|curl|wget|python|node-fetch|axios|go-http/i;

function wykryj(req: NextRequest): Jezyk {
  // Nagłówek Vercela. Lokalnie go nie ma — wtedy decyduje sama przeglądarka.
  const kraj = req.headers.get('x-vercel-ip-country')?.toUpperCase();
  if (kraj === 'PL') return 'pl';

  const pierwszy = req.headers.get('accept-language')?.split(',')[0]?.trim().toLowerCase();
  if (pierwszy?.startsWith('pl')) return 'pl';

  // Nic nie wiemy (brak kraju i języka) — zostajemy przy polskim.
  if (!kraj && !pierwszy) return 'pl';
  return 'en';
}

function przekieruj(req: NextRequest, sciezka: string) {
  const url = req.nextUrl.clone();
  url.pathname = sciezka;
  const odp = NextResponse.redirect(url, 307);
  // Przekierowanie zależy od kraju i ciasteczka — nie może trafić do cache.
  odp.headers.set('Cache-Control', 'private, no-store');
  odp.headers.set('Vary', 'Cookie, Accept-Language');
  return odp;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Postać wewnętrzna nie jest adresem publicznym — `/pl/cennik` → `/cennik`.
  if (pathname === '/pl' || pathname.startsWith('/pl/')) {
    return przekieruj(req, pathname.slice(3) || '/');
  }

  const naEn = pathname === '/en' || pathname.startsWith('/en/');
  const jezykAdresu: Jezyk = naEn ? 'en' : 'pl';
  const reszta = naEn ? pathname.slice(3) : pathname;

  let sciezkaPl: string | null;
  if (naEn) {
    sciezkaPl = plZEn(reszta);
    // `/en/cennik` — polski slug pod angielskim przedrostkiem. Prowadzimy
    // pod właściwy adres zamiast dublować stronę.
    if (sciezkaPl === null && znanaSciezkaPl(reszta)) {
      return przekieruj(req, lokalizuj(reszta, 'en'));
    }
  } else {
    sciezkaPl = znanaSciezkaPl(reszta) ? reszta : null;
  }

  const robot = ROBOT.test(req.headers.get('user-agent') ?? '');
  if (!robot && sciezkaPl !== null) {
    const zCiastka = req.cookies.get(CIASTKO_JEZYKA)?.value;
    const preferowany = czyJezyk(zCiastka) ? zCiastka : wykryj(req);
    if (preferowany !== jezykAdresu) {
      return przekieruj(req, lokalizuj(sciezkaPl || '/', preferowany));
    }
  }

  const url = req.nextUrl.clone();

  // Nieznany adres → strona 404 w języku adresu, z nagłówkiem i stopką.
  // Dlatego każda nowa podstrona musi mieć wpis w `i18n/trasy.ts`.
  if (sciezkaPl === null) {
    url.pathname = `/${jezykAdresu}/nie-znaleziono`;
    return NextResponse.rewrite(url, { status: 404 });
  }

  url.pathname = `/${jezykAdresu}${sciezkaPl}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Bez API, zasobów Next, plików z `public/` (wszystko z kropką w nazwie)
  // i plików generowanych: `robots.txt`, `sitemap.xml`.
  matcher: ['/((?!api/|_next/|_vercel/|.*\\..*).*)'],
};
