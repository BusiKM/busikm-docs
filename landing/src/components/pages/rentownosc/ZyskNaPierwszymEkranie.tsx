import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Liczba = { label: string; value: string; mocna: boolean };

const TEKSTY: Tlumaczenia<{ tytul: string; tresc: string; liczby: readonly Liczba[] }> = {
  pl: {
    tytul: 'Zysk na pierwszym ekranie',
    tresc: 'Przychód, koszty i zysk, na bieżąco.',
    liczby: [
      { label: 'Przychód · wrzesień', value: '184 320 zł', mocna: false },
      { label: 'Koszty', value: '121 840 zł', mocna: false },
      { label: 'Zysk', value: '62 480 zł', mocna: true },
    ],
  },
  en: {
    tytul: 'Profit on the first screen',
    tresc: 'Revenue, costs and profit, as they happen.',
    liczby: [
      { label: 'Revenue · September', value: 'PLN 184,320', mocna: false },
      { label: 'Costs', value: 'PLN 121,840', mocna: false },
      { label: 'Profit', value: 'PLN 62,480', mocna: true },
    ],
  },
};

/** 01 — trzy liczby, które właściciel widzi zaraz po zalogowaniu. */
export function ZyskNaPierwszymEkranie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.tytul}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-muted lg:text-lead">
            {t.tresc}
          </p>
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          {t.liczby.map((l) => (
            <div
              key={l.label}
              data-reveal
              className={`rounded-card p-6 lg:p-8 ${
                l.mocna
                  ? 'bg-ink text-paper shadow-card'
                  : 'border border-line bg-white shadow-card'
              }`}
            >
              <div className={`text-[13px] lg:text-caption ${l.mocna ? 'text-ink-muted' : 'text-muted'}`}>
                {l.label}
              </div>
              <div
                className={`mt-2.5 text-[34px] tracking-[-0.03em] lg:mt-3 lg:text-[48px] ${
                  l.mocna ? 'font-bold' : 'font-semibold'
                }`}
              >
                {l.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
