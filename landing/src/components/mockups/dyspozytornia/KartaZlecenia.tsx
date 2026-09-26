import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Pozycja stawki w `wiersze` — pogrubiona. */
const STAWKA = 1;

const TEKSTY: Tlumaczenia<{
  numer: string;
  trasa: string;
  status: string;
  wiersze: readonly (readonly [string, string])[];
  etapy: readonly string[];
}> = {
  pl: {
    numer: 'Zlecenie · 2026/09/041',
    trasa: 'Warszawa → Mediolan',
    status: 'w drodze',
    wiersze: [
      ['Zleceniodawca', 'Alpina Logistics'],
      ['Stawka', '3 900 €'],
      ['Załadunek', '2.09 · 06:00'],
      ['Rozładunek', '3.09 · 08:00'],
      ['Ładunek', '8 palet · 1 240 kg'],
      ['Kierowca · pojazd', 'Marek W. · WZ 4821K'],
    ],
    etapy: ['przyjęte', 'w drodze', 'rozładunek', 'dostarczone'],
  },
  en: {
    numer: 'Order · 2026/09/041',
    trasa: 'Warsaw → Milan',
    status: 'on the road',
    wiersze: [
      ['Client', 'Alpina Logistics'],
      ['Rate', '€3,900'],
      ['Loading', '2 Sep · 06:00'],
      ['Unloading', '3 Sep · 08:00'],
      ['Load', '8 pallets · 1,240 kg'],
      ['Driver · vehicle', 'Marek W. · WZ 4821K'],
    ],
    etapy: ['accepted', 'on the road', 'unloading', 'delivered'],
  },
};

/** Karta zlecenia z paskiem statusów u dołu. */
export function KartaZlecenia() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 text-[12px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-muted">{t.numer}</div>
          <b className="text-[17px] lg:text-[20px]">{t.trasa}</b>
        </div>
        <span className="flex-none rounded-full bg-blue-soft px-3 py-1.5 font-semibold text-blue-dark">
          {t.status}
        </span>
      </div>

      <div className="grid gap-x-6 border-t border-line pt-2 lg:grid-cols-2 lg:gap-y-2.5">
        {t.wiersze.map(([klucz, wartosc], i) => (
          <div
            key={klucz}
            className={`flex justify-between gap-3 py-2 ${i < 4 ? 'border-b border-line' : ''}`}
          >
            <span className="text-muted">{klucz}</span>
            <span className={i === STAWKA ? 'font-bold' : ''}>{wartosc}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          {t.etapy.map((etap, i) => (
            <span
              key={etap}
              className={`h-1.5 flex-1 rounded-full ${i < 2 ? 'bg-blue' : 'bg-line'}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-muted lg:text-[12px]">
          {t.etapy.map((etap) => (
            <span key={etap}>{etap}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
