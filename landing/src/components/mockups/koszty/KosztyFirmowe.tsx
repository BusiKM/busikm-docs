import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  miesiac: string;
  bezZdjecia: string;
  pozycje: readonly (readonly [string, string])[];
  razem: string;
  suma: string;
  stopka: string;
}> = {
  pl: {
    naglowek: 'Koszty firmowe · PO 2093J',
    miesiac: ' · wrzesień',
    bezZdjecia: 'bez zdjęcia',
    pozycje: [
      ['Leasing · rata 9/36', '2 890 zł'],
      ['Ubezpieczenie OC/AC · 1/12', '640 zł'],
      ['Serwis · wymiana oleju', '1 180 zł'],
      ['Paliwo z karty flotowej', '4 312 zł'],
    ],
    razem: 'Razem',
    suma: '9 022 zł',
    stopka: 'Rozkładają się na przejechane kilometry i wchodzą do marży każdego kursu.',
  },
  en: {
    naglowek: 'Company costs · PO 2093J',
    miesiac: ' · September',
    bezZdjecia: 'no photo',
    pozycje: [
      ['Lease · instalment 9/36', 'PLN 2,890'],
      ['Third-party + comprehensive · 1/12', 'PLN 640'],
      ['Service · oil change', 'PLN 1,180'],
      ['Fuel on the fleet card', 'PLN 4,312'],
    ],
    razem: 'Total',
    suma: 'PLN 9,022',
    stopka: 'Spread across the kilometres driven and counted in the margin of every job.',
  },
};

/** Koszty, których nikt nie fotografuje — a i tak wchodzą do marży. */
export function KosztyFirmowe() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line-dark bg-surface text-paper p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-8 lg:text-caption">
      <div className="flex justify-between gap-3 text-ink-muted">
        <span className="truncate">
          {t.naglowek}<span className="hidden lg:inline">{t.miesiac}</span>
        </span>
        <span className="flex-none">{t.bezZdjecia}</span>
      </div>

      {t.pozycje.map(([label, kwota]) => (
        <div key={label} className="flex justify-between gap-3 border-t border-line-dark pt-3">
          <span className="truncate">{label}</span>
          <span className="flex-none">{kwota}</span>
        </div>
      ))}

      <div className="flex justify-between gap-3 border-y border-line-dark py-3">
        <b>{t.razem}</b>
        <b>{t.suma}</b>
      </div>

      <div className="text-[12px] text-ink-muted lg:text-[13px]">
        {t.stopka}
      </div>
    </div>
  );
}
