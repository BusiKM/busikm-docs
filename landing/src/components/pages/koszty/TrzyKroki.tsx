import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Teksty = {
  punkty: readonly (readonly [string, string, string])[];
  pola: readonly (readonly [string, string])[];
  pstryk: { kiedy: string; puenta: string };
  formularz: { kiedy: string; puenta: string };
  uCiebie: { kiedy: string; wiersze: readonly string[]; puenta: string };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    punkty: [
      ['01', 'Zdjęcie zamiast wpisywania', 'Pstryka paragon, formularz wypełnia się sam. Poprawia tylko wtedy, gdy coś się nie zgadza.'],
      ['02', 'Trafia tam, gdzie trzeba', 'Do tego zlecenia, tego pojazdu, tego kierowcy. Bez segregowania wieczorem przy stole.'],
    ],
    pola: [
      ['Kwota', '151,50 €'],
      ['Sprzedawca', 'Shell'],
      ['Rodzaj', 'Paliwo'],
    ],
    pstryk: { kiedy: '11:38 · stacja Shell, Rotterdam', puenta: 'Pstryk.' },
    formularz: { kiedy: '11:38 · formularz', puenta: 'Wypełnia się samo.' },
    uCiebie: {
      kiedy: '11:39 · u Ciebie',
      wiersze: ['Zlecenie · Poznań → Rotterdam', 'Pojazd · PO 2093J', 'Kierowca · Tomasz L.'],
      puenta: 'Już tam, gdzie trzeba.',
    },
  },
  en: {
    punkty: [
      ['01', 'A photo instead of typing', 'The driver snaps the receipt and the form fills itself in. They only step in if something doesn’t match.'],
      ['02', 'It lands where it belongs', 'On the right order, the right van, the right driver. No sorting paper at the kitchen table at night.'],
    ],
    pola: [
      ['Amount', '€151.50'],
      ['Merchant', 'Shell'],
      ['Type', 'Fuel'],
    ],
    pstryk: { kiedy: '11:38 · Shell station, Rotterdam', puenta: 'Snap.' },
    formularz: { kiedy: '11:38 · form', puenta: 'Fills itself in.' },
    uCiebie: {
      kiedy: '11:39 · on your screen',
      wiersze: ['Order · Poznań → Rotterdam', 'Vehicle · PO 2093J', 'Driver · Tomasz L.'],
      puenta: 'Already where it belongs.',
    },
  },
};

/** 01 + 02 — droga paragonu w trzech kadrach: pstryk, formularz, Twój ekran. */
export function TrzyKroki() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {t.punkty.map(([numer, tytul, tresc]) => (
            <div key={numer} className="flex flex-col gap-4 lg:gap-6">
              <div
                data-reveal
                className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
              >
                {numer}
              </div>
              <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
                {tytul}
              </h2>
              <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
                {tresc}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          <div
            data-reveal
            className="flex min-h-45 flex-col gap-5 rounded-card border border-line-dark bg-surface p-6 lg:min-h-55 lg:p-8"
          >
            <div className="text-[13px] text-ink-muted">{t.pstryk.kiedy}</div>
            <div
              aria-hidden
              className="h-21 w-16 rotate-[-4deg] rounded-[4px] bg-mist"
            />
            <div className="mt-auto text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              {t.pstryk.puenta}
            </div>
          </div>

          <div
            data-reveal
            className="flex min-h-45 flex-col gap-5 rounded-card border border-line-dark bg-surface p-6 lg:min-h-55 lg:p-8"
          >
            <div className="text-[13px] text-ink-muted">{t.formularz.kiedy}</div>
            <div className="flex flex-col gap-1.5 text-[13px]">
              {t.pola.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2"
                >
                  <span className="text-ink-muted">{label}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <div className="mt-auto text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              {t.formularz.puenta}
            </div>
          </div>

          <div
            data-reveal
            className="flex min-h-45 flex-col gap-5 rounded-card bg-blue p-6 text-white lg:min-h-55 lg:p-8"
          >
            <div className="text-[13px] text-white">{t.uCiebie.kiedy}</div>
            <div className="flex flex-col gap-1.5 text-[14px]">
              {t.uCiebie.wiersze.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </div>
            <div className="mt-auto text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              {t.uCiebie.puenta}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
