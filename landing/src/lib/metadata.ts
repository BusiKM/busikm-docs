import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';

import { serwis, nieindeksowane } from '@/content/seo';
import { pages } from '@/content/pages';

/**
 * Budowanie metadanych stron.
 *
 * Next scala metadane warstwowo, ale **płytko**: gdy podstrona poda własny
 * obiekt `openGraph`, ten z `layout.tsx` przepada w całości — razem z obrazem,
 * nazwą serwisu, językiem i typem. Dlatego każda podstrona dostaje tu pełny
 * `openGraph` i `twitter`, a nie tylko tytuł z opisem.
 */

/**
 * Wymiary obrazu podglądu, odczytane z samego pliku.
 *
 * Czytamy je zamiast wpisywać na sztywno, bo obraz OG powstaje w Figmie
 * i bywa podmieniany — a Facebook i LinkedIn ufają `og:image:width`
 * bardziej niż samemu plikowi, więc rozjazd psuje kadrowanie kafelka.
 *
 * PNG trzyma wymiary w nagłówku IHDR na stałych pozycjach. JPEG wymaga
 * przejścia po segmentach aż do ramki SOF — dlatego dwie ścieżki.
 */
function wymiaryObrazu(plik: string): { width: number; height: number } | null {
  try {
    const b = fs.readFileSync(path.join(process.cwd(), 'public', plik));

    // PNG: sygnatura 8 bajtów, potem długość i „IHDR", więc szerokość
    // leży na bajtach 16–19, a wysokość na 20–23.
    if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) {
      return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    }

    // JPEG: po 0xFFD8 idą segmenty `FF <znacznik> <długość>`. Wymiary niesie
    // ramka SOF — wszystkie warianty poza 0xC4 (tablice Huffmana), 0xC8
    // (rozszerzenie JPEG) i 0xCC (kodowanie arytmetyczne).
    if (b.length > 4 && b.readUInt16BE(0) === 0xffd8) {
      let i = 2;
      while (i < b.length - 9) {
        if (b[i] !== 0xff) {
          i += 1;
          continue;
        }
        const znacznik = b[i + 1];
        const sof =
          (znacznik >= 0xc0 && znacznik <= 0xcf) &&
          znacznik !== 0xc4 &&
          znacznik !== 0xc8 &&
          znacznik !== 0xcc;
        if (sof) return { height: b.readUInt16BE(i + 5), width: b.readUInt16BE(i + 7) };
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  } catch {
    /* pusto — obsługa niżej */
  }
  return null;
}

const obraz = wymiaryObrazu(serwis.ogImage);

if (!obraz) {
  // Lepiej zatrzymać budowanie niż wypuścić stronę z podglądem, którego nie
  // ma albo którego wymiary są zmyślone — błąd zobaczymy w logu wdrożenia,
  // a nie dopiero w kafelku wklejonym na LinkedInie.
  throw new Error(
    `Nie udało się odczytać wymiarów obrazu podglądu: public${serwis.ogImage}`,
  );
}

/** Obraz podglądu w formie, jakiej oczekuje `Metadata`. */
export const obrazPodgladu = {
  url: serwis.ogImage,
  width: obraz.width,
  height: obraz.height,
  alt: `${serwis.nazwa} — ${serwis.tytul.split('—')[1]?.trim() ?? serwis.nazwa}`,
};

/**
 * Dyrektywy dla robotów.
 *
 * `max-image-preview: large` decyduje o tym, czy Google pokaże przy wyniku
 * duży obrazek, czy miniaturę — bez tego domyślnie dostajemy miniaturę.
 * `max-snippet: -1` zdejmuje limit długości opisu w wyniku.
 */
const roboty = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
} as const;

type Opcje = {
  /** Nadpisuje tytuł zakładki, gdy ten z `pages` nie pasuje. */
  tytul?: string;
  opis?: string;
};

/**
 * Metadane podstrony na podstawie jej ścieżki (bez wiodącego ukośnika).
 *
 * Ta sama funkcja obsługuje strony pełne i szkielety — o tym, czy strona
 * trafia do indeksu, decyduje lista `nieindeksowane` w `content/seo.ts`.
 */
export function pageMetadata(slug: string, opcje: Opcje = {}): Metadata {
  const page = pages[slug];
  if (!page) throw new Error(`Brak opisu strony: ${slug}`);

  // Tytuł w wyniku wyszukiwania jest rozdzielony od nazwy strony: `seoTitle`
  // mówi językiem zapytań, `title` zostaje krótką nazwą do okruszków i menu.
  // Gdy `seoTitle` nie ma, doklejamy markę — chyba że nazwa już ją niesie
  // („BusiKM dla kierowcy"), bo powtórzenie zjada limit ~60 znaków.
  const nazwa = page.seoTitle ?? page.title;
  const zMarka = nazwa.includes(serwis.nazwa);
  const tytul = opcje.tytul ?? (zMarka ? nazwa : `${nazwa} · ${serwis.nazwa}`);
  const opis = opcje.opis ?? page.description;
  const sciezka = `/${slug}`;
  const wIndeksie = !nieindeksowane.includes(sciezka);

  return {
    title: tytul,
    description: opis,
    alternates: { canonical: sciezka },
    robots: wIndeksie ? roboty : { index: false, follow: true },
    openGraph: {
      type: 'website',
      locale: serwis.locale,
      siteName: serwis.nazwa,
      url: sciezka,
      title: tytul,
      description: opis,
      images: [obrazPodgladu],
    },
    twitter: {
      card: 'summary_large_image',
      title: tytul,
      description: opis,
      images: [serwis.ogImage],
    },
  };
}

/** Metadane strony głównej — tytuł bez przyrostka, bo sam niesie markę. */
export function metadataStronyGlownej(): Metadata {
  return {
    metadataBase: new URL(serwis.url),
    title: {
      default: serwis.tytul,
      /** Podstrony podają pełny tytuł same, więc szablon zostawia go w spokoju. */
      template: '%s',
    },
    description: serwis.opis,
    applicationName: serwis.nazwa,
    generator: undefined,
    referrer: 'origin-when-cross-origin',
    creator: serwis.nazwa,
    publisher: serwis.nazwa,
    category: 'business',
    alternates: { canonical: '/' },
    robots: roboty,
    formatDetection: { telephone: false, address: false, email: false },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      locale: serwis.locale,
      siteName: serwis.nazwa,
      url: '/',
      title: serwis.tytul,
      description: serwis.opis,
      images: [obrazPodgladu],
    },
    twitter: {
      card: 'summary_large_image',
      title: serwis.tytul,
      description: serwis.opis,
      images: [serwis.ogImage],
    },
    /**
     * Kod z Google Search Console. Trzymany w zmiennej środowiskowej, bo
     * dochodzi dopiero przy pierwszej weryfikacji domeny — bez niego
     * Next po prostu nie wypisze znacznika.
     */
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      ],
      apple: '/apple-touch-icon.png',
      other: [{ rel: 'mask-icon', url: '/mask-icon.svg', color: '#0B5FFF' }],
    },
  };
}
