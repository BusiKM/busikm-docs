import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Pozycja = { co: string; opis?: string; stan: 'komplet' | 'brak' };

type Teksty = {
  tytul: string;
  miesiac: string;
  pozycje: readonly Pozycja[];
  komplet: string;
  brak: string;
  gotowe: string;
  pokaz: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    tytul: 'Sprawdzenie przed pobraniem',
    miesiac: 'sierpień 2026',
    pozycje: [
      { co: 'Sprzedaż · 42 faktury', stan: 'komplet' },
      { co: 'Zakupy · 37 faktur', stan: 'komplet' },
      {
        co: 'Koszty · 318 paragonów',
        opis: '3 paragony bez zlecenia · Tomasz L., 14–16.08',
        stan: 'brak',
      },
      {
        co: 'Delegacje · 9 kierowców',
        opis: '1 kurs bez potwierdzonego rozładunku',
        stan: 'brak',
      },
      { co: 'Czas pracy · 9 kierowców', stan: 'komplet' },
    ],
    komplet: 'komplet',
    brak: 'do uzupełnienia',
    gotowe: '7 z 9 gotowe',
    pokaz: 'Pokaż braki',
  },
  en: {
    tytul: 'Check before download',
    miesiac: 'August 2026',
    pozycje: [
      { co: 'Sales · 42 invoices', stan: 'komplet' },
      { co: 'Purchases · 37 invoices', stan: 'komplet' },
      {
        co: 'Costs · 318 receipts',
        opis: '3 receipts with no order · Tomasz L., 14–16 Aug',
        stan: 'brak',
      },
      {
        co: 'Business trips · 9 drivers',
        opis: '1 job with no confirmed unloading',
        stan: 'brak',
      },
      { co: 'Working time · 9 drivers', stan: 'komplet' },
    ],
    komplet: 'complete',
    brak: 'to complete',
    gotowe: '7 of 9 ready',
    pokaz: 'Show what’s missing',
  },
};

/** Sprawdzenie kompletności przed pobraniem. Bez czerwieni. */
export function Walidacja() {
  const t = TEKSTY[biezacyJezyk()];
  const { pozycje } = t;
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">{t.tytul}</b>
        <span className="flex-none text-muted">{t.miesiac}</span>
      </div>

      <div className="flex flex-col border-t border-line">
        {pozycje.map((p, i) => (
          <div
            key={p.co}
            className={`flex items-center justify-between gap-4 py-3 ${
              i < pozycje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <div className="min-w-0">
              <span>{p.co}</span>
              {p.opis && (
                <div className="text-[12px] text-muted lg:text-[13px]">{p.opis}</div>
              )}
            </div>
            {p.stan === 'komplet' ? (
              <span className="flex-none font-semibold text-green-ink">{t.komplet}</span>
            ) : (
              <span className="flex-none rounded-full bg-mist px-2.5 py-1.5 font-semibold whitespace-nowrap">
                {t.brak}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-muted">{t.gotowe}</span>
        <span className="rounded-[10px] border border-line px-4 py-2.5 font-semibold">
          {t.pokaz}
        </span>
      </div>
    </div>
  );
}
