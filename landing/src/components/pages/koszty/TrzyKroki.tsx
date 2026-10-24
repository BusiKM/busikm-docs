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
      ['01', 'Zdjęcie zamiast wpisywania', 'Pstryka paragon, wybiera rodzaj kosztu, czym zapłacił i zlecenie. Kwotę, datę, NIP i sprzedawcę BusiKM odczyta sam po wysłaniu. Poprawia tylko wtedy, gdy biuro o coś zapyta.'],
      ['02', 'Trafia tam, gdzie trzeba', 'Do tego zlecenia i tego kierowcy. Bez segregowania wieczorem przy stole.'],
    ],
    pola: [
      ['Rodzaj', 'Paliwo'],
      ['Zapłacono', 'Karta firmowa'],
      ['Zlecenie', 'Poznań → Rotterdam'],
    ],
    pstryk: { kiedy: '11:38 · stacja Orlen, Świecko', puenta: 'Pstryk.' },
    formularz: { kiedy: '11:38 · „Wyślij paragon”', puenta: 'Trzy wybory i gotowe.' },
    uCiebie: {
      kiedy: '11:39 · u Ciebie',
      wiersze: ['Kwota · 612,40 zł', 'Sprzedawca · Orlen', 'Kierowca · Tomasz L.'],
      puenta: 'Odczytane i już tam, gdzie trzeba.',
    },
  },
  en: {
    punkty: [
      ['01', 'A photo instead of typing', 'The driver snaps the receipt and picks the cost type, how it was paid and the order. BusiKM reads the amount, date, tax ID and merchant itself once it’s sent. They only step in if the office has a question.'],
      ['02', 'It lands where it belongs', 'On the right order and the right driver. No sorting paper at the kitchen table at night.'],
    ],
    pola: [
      ['Type', 'Fuel'],
      ['Paid with', 'Company card'],
      ['Order', 'Poznań → Rotterdam'],
    ],
    pstryk: { kiedy: '11:38 · Orlen station, Świecko', puenta: 'Snap.' },
    formularz: { kiedy: '11:38 · “Send receipt”', puenta: 'Three taps and done.' },
    uCiebie: {
      kiedy: '11:39 · on your screen',
      wiersze: ['Amount · PLN 612.40', 'Merchant · Orlen', 'Driver · Tomasz L.'],
      puenta: 'Read and already where it belongs.',
    },
  },
};

/** 01 + 02 – droga paragonu w trzech kadrach: pstryk, formularz, Twój ekran. */
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
