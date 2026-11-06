import { firma } from '@/content/firma';
import { appLinks, nawigacja } from '@/content/navigation';
import { MEDIA } from '@/content/media';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

/**
 * Rolki z naszej strony na Facebooku, odtwarzane u nas.
 *
 * Katalog i pliki leżą w R2, nie w repozytorium: nowa rolka prawie codziennie
 * nie może znaczyć PR-a i wdrożenia prawie codziennie. Co godzinę dopisuje ją
 * `media-worker/rolki/synchronizuj.mjs`, a strona sama ją podnosi po najwyżej
 * `ODSWIEZANIE` sekundach. Pełny opis: docs/landing/17-rolki.md.
 */

/** `ROLKI_URL` nadpisuje adres przy podglądzie paczki z dysku. */
const ADRES = process.env.ROLKI_URL || `${MEDIA}/rolki`;
const ODSWIEZANIE = 900;

export const TEMATY = ['trasa', 'biuro', 'miesiac', 'firma'] as const;
export type Temat = (typeof TEMATY)[number];

export type Rolka = {
  slug: string;
  tytul: string;
  opis: string;
  temat: Temat;
  /** ISO 8601. Daje kolejność: najnowsza pierwsza. */
  data: string;
  /** Data do pokazania, liczona na serwerze – kalendarz nie zależy od strefy czytelnika. */
  dataTekst: string;
  sekundy: number;
  film: string;
  okladka: string;
  /** Rolka na Facebooku – tam są komentarze. */
  facebook: string;
  /** Dokąd prowadzi przycisk pod filmem. */
  cel: { href: string; etykieta: string };
};

const DEMO: Tlumaczenia<string> = { pl: 'Zobacz demo', en: 'See the demo' };
const CENNIK: Tlumaczenia<string> = { pl: 'Zobacz cennik', en: 'See pricing' };
const ZOBACZ: Tlumaczenia<string> = { pl: 'Zobacz', en: 'See' };

function celRolki(cel: string, jezyk: Jezyk): Rolka['cel'] {
  if (cel === '/cennik') return { href: cel, etykieta: CENNIK[jezyk] };
  const funkcja = nawigacja(jezyk)
    .coRobi.flatMap((g) => g.items)
    .find((i) => i.href === cel);
  if (funkcja) return { href: cel, etykieta: `${ZOBACZ[jezyk]}: ${funkcja.label}` };
  return { href: appLinks.demo, etykieta: DEMO[jezyk] };
}

const PLIK = /^pliki\/[a-z0-9.-]+$/;

/** Katalog przychodzi spoza kodu, więc wpis, który czegoś nie ma, po prostu odpada. */
function poprawna(w: Record<string, unknown>): boolean {
  return (
    typeof w.slug === 'string' &&
    /^[a-z0-9-]+$/.test(w.slug) &&
    typeof w.tytul === 'string' &&
    typeof w.opis === 'string' &&
    TEMATY.includes(w.temat as Temat) &&
    typeof w.data === 'string' &&
    !Number.isNaN(Date.parse(w.data)) &&
    typeof w.sekundy === 'number' &&
    PLIK.test(String(w.plik)) &&
    PLIK.test(String(w.okladka))
  );
}

/**
 * Rolki od najnowszej. Awaria magazynu to pusta lista, a nie błąd budowania:
 * strona bez rolek działa dalej, a CI nie może zależeć od cudzej sieci.
 */
export async function pobierzRolki(jezyk: Jezyk): Promise<Rolka[]> {
  let surowe: Record<string, unknown>[];
  try {
    const odp = await fetch(`${ADRES}/katalog.json`, {
      next: { revalidate: ODSWIEZANIE },
      signal: AbortSignal.timeout(5000),
    });
    if (!odp.ok) return [];
    surowe = await odp.json();
    if (!Array.isArray(surowe)) return [];
  } catch {
    return [];
  }

  const daty = new Intl.DateTimeFormat(jezyk === 'pl' ? 'pl-PL' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Europe/Warsaw',
  });

  return surowe
    .filter(poprawna)
    .map((w) => {
      const slug = w.slug as string;
      return {
        slug,
        tytul: w.tytul as string,
        opis: w.opis as string,
        temat: w.temat as Temat,
        data: w.data as string,
        dataTekst: daty.format(new Date(w.data as string)),
        sekundy: w.sekundy as number,
        film: `${ADRES}/${w.plik}`,
        okladka: `${ADRES}/${w.okladka}`,
        facebook:
          typeof w.fb === 'string' && /^\d+$/.test(w.fb)
            ? `https://www.facebook.com/reel/${w.fb}`
            : firma.facebook,
        cel: celRolki(typeof w.cel === 'string' ? w.cel : '/demo', jezyk),
      };
    })
    .sort((a, b) => Date.parse(b.data) - Date.parse(a.data));
}

/** `0:47` – czas trwania na kaflu i w odtwarzaczu. */
export function czasFilmu(sekundy: number): string {
  const s = Math.max(0, Math.floor(sekundy));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
