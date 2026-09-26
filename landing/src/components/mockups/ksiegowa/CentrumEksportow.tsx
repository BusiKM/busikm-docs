import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Teksty = {
  zestawienia: readonly (readonly [string, string])[];
  naglowek: string;
  miesiac: string;
  przycisk: string;
  kompletnosc: [string, string];
  ostatnie: string;
  stan: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    zestawienia: [
      ['Sprzedaż', '42 faktury'],
      ['Czas pracy', '9 kierowców'],
      ['Zakupy', '37 faktur'],
      ['Kursy walut', '22 dni'],
      ['Koszty', '318 paragonów'],
      ['Opłaty drogowe', '61'],
      ['Przebieg', '7 pojazdów'],
      ['Korekty', '2'],
      ['Delegacje i diety', '9 kierowców'],
    ],
    naglowek: 'Komplet dla księgowej',
    miesiac: 'Sierpień 2026',
    przycisk: 'Pobierz komplet za sierpień',
    kompletnosc: ['Kompletność', '9 z 9 gotowe'],
    ostatnie: 'Ostatnie pobranie: 1.09, 09:14 · Ewa M.',
    stan: 'Miesiąc otwarty',
  },
  en: {
    zestawienia: [
      ['Sales', '42 invoices'],
      ['Working time', '9 drivers'],
      ['Purchases', '37 invoices'],
      ['Exchange rates', '22 days'],
      ['Costs', '318 receipts'],
      ['Tolls', '61'],
      ['Mileage', '7 vehicles'],
      ['Corrections', '2'],
      ['Business trips and per diems', '9 drivers'],
    ],
    naglowek: 'Full set for your accountant',
    miesiac: 'August 2026',
    przycisk: 'Download the full set for August',
    kompletnosc: ['Completeness', '9 of 9 ready'],
    ostatnie: 'Last download: 1 Sep, 09:14 · Ewa M.',
    stan: 'Month open',
  },
};

/** Stos arkuszy: komplet dla księgowej za wybrany miesiąc. */
export function CentrumEksportow() {
  const t = TEKSTY[biezacyJezyk()];
  const { zestawienia } = t;
  return (
    <div className="relative mx-auto h-[420px] w-full max-w-[760px] lg:h-[620px]">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-15 h-40 bg-blue opacity-30 blur-[90px] lg:h-50 lg:blur-[120px]"
      />

      <div className="absolute inset-x-[10%] top-0 h-[340px] rotate-[-5deg] rounded-card border border-line-dark bg-surface-3 opacity-55 lg:inset-x-[10%] lg:h-[520px]" />
      <div className="absolute inset-x-[6%] top-4 h-[340px] rotate-[-2.5deg] rounded-card border border-line-dark bg-[#161619] opacity-80 lg:top-6 lg:h-[520px]" />

      <div className="absolute inset-x-0 top-8 flex h-[360px] flex-col gap-3 rounded-card border border-[#2A2A30] bg-surface text-paper p-5 text-[12px] shadow-[0_40px_100px_rgba(0,0,0,.6)] lg:inset-x-[2.5%] lg:top-12 lg:h-[520px] lg:gap-4.5 lg:p-8 lg:text-caption">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-[11px] text-ink-muted lg:text-[13px]">
              {t.naglowek}
            </div>
            <b className="text-[18px] tracking-[-0.01em] lg:text-[22px]">{t.miesiac}</b>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <div className="rounded-xl border border-line-dark-2 px-4 py-3 text-ink-muted">
              Comarch Optima ▾
            </div>
            <div className="rounded-xl bg-blue px-4.5 py-3 font-semibold text-white">
              {t.przycisk}
            </div>
          </div>
        </div>

        <div className="grid gap-x-10 border-t border-line-dark pt-2 lg:grid-cols-2">
          {zestawienia.map(([nazwa, licznik], i) => (
            <div
              key={nazwa}
              className={`flex justify-between gap-3 py-2 lg:py-[11px] ${
                i < zestawienia.length - 1 ? 'border-b border-line-dark' : ''
              } ${i > 5 ? 'hidden lg:flex' : ''}`}
            >
              <span>{nazwa}</span>
              <span className="text-ink-muted">{licznik}</span>
            </div>
          ))}
          <div className="hidden justify-between gap-3 py-[11px] lg:flex">
            <span>{t.kompletnosc[0]}</span>
            <span className="text-green">{t.kompletnosc[1]}</span>
          </div>
        </div>

        <div className="mt-auto flex flex-wrap justify-between gap-2 text-[11px] text-ink-muted lg:text-[13px]">
          <span>{t.ostatnie}</span>
          <span>{t.stan}</span>
        </div>
      </div>
    </div>
  );
}
