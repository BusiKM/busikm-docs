import { Section, Eyebrow } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Która kolumna ma w tle kreskę trasy. Kolejność jak w `kolumny` niżej. */
const Z_MAPA = [false, true, false] as const;

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  kolumny: readonly (readonly [string, string])[];
}> = {
  pl: {
    naglowek: 'Jeden ekran zamiast czterech okien',
    lead: 'Po lewej zlecenia, w środku mapa, po prawej kierowca. Wszystko widać naraz.',
    kolumny: [
      ['Po lewej', 'Zlecenia'],
      ['W środku', 'Mapa'],
      ['Po prawej', 'Kierowca'],
    ],
  },
  en: {
    naglowek: 'One screen instead of four windows',
    lead: 'Orders on the left, the map in the middle, the driver on the right. Everything in view at once.',
    kolumny: [
      ['On the left', 'Orders'],
      ['In the middle', 'Map'],
      ['On the right', 'Driver'],
    ],
  },
};

/** 01 — trzy kolumny jednego ekranu, każda jako osobna karta. */
export function JedenEkran() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            {t.lead}
          </p>
        </div>

        <div
          data-reveal-group
          className="grid gap-2.5 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-4"
        >
          {t.kolumny.map(([gdzie, co], i) => (
            <div
              key={co}
              data-reveal
              className="relative flex min-h-35 flex-col justify-between gap-6 overflow-hidden rounded-card border border-line-dark bg-surface p-6 lg:min-h-50 lg:p-8"
            >
              {Z_MAPA[i] && (
                <svg
                  viewBox="0 0 300 200"
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full opacity-50"
                  aria-hidden
                >
                  <path
                    d="M 260 30 C 200 70, 160 110, 120 140 S 60 180, 30 190"
                    fill="none"
                    stroke="#0B5FFF"
                    strokeWidth="3"
                  />
                </svg>
              )}
              <Eyebrow dark className="relative">
                {gdzie}
              </Eyebrow>
              <div className="relative text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
                {co}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
