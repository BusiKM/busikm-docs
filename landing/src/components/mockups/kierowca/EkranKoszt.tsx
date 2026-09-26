import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  pola: readonly (readonly [string, string])[];
  diesel: string;
  dieselKwota: string;
  adblue: string;
  razem: string;
  suma: string;
  rozpoznane: string;
  zapisz: string;
}> = {
  pl: {
    naglowek: 'Dodaj koszt',
    pola: [
      ['Kwota', '103,30 € · 442 zł'],
      ['Data', '2.09.2026'],
      ['Rodzaj', 'Paliwo'],
      ['Zlecenie', 'Warszawa → Mediolan'],
      ['Pojazd', 'WZ 4821K'],
    ],
    diesel: 'Diesel 78,4 l',
    dieselKwota: '96,20 €',
    adblue: '7,10 €',
    razem: 'RAZEM',
    suma: '103,30 €',
    rozpoznane: 'rozpoznane',
    zapisz: 'Zapisz',
  },
  en: {
    naglowek: 'Add cost',
    pola: [
      ['Amount', '€103.30 · PLN 442'],
      ['Date', '2 Sep 2026'],
      ['Type', 'Fuel'],
      ['Order', 'Warsaw → Milan'],
      ['Vehicle', 'WZ 4821K'],
    ],
    diesel: 'Diesel 78.4 l',
    dieselKwota: '€96.20',
    adblue: '€7.10',
    razem: 'TOTAL',
    suma: '€103.30',
    rozpoznane: 'recognised',
    zapisz: 'Save',
  },
};

/** Dodawanie kosztu ze zdjęcia paragonu. */
export function EkranKoszt() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Telefon glow>
      <PasekStanu left="11:42" right={t.naglowek} />

      <div className="relative mx-3.5 mt-4 flex h-[150px] items-center justify-center rounded-[18px] bg-[#1E1E22] lg:h-[190px]">
        <div className="flex w-[100px] flex-col gap-1.5 rounded-[4px] bg-mist p-3 font-mono text-[7px] text-ink lg:w-30 lg:text-[8px]">
          <div className="text-center font-bold">OMV Brno</div>
          <div className="flex justify-between">
            <span>{t.diesel}</span>
            <span>{t.dieselKwota}</span>
          </div>
          <div className="flex justify-between">
            <span>AdBlue</span>
            <span>{t.adblue}</span>
          </div>
          <div className="flex justify-between border-t border-line-strong pt-1 font-bold">
            <span>{t.razem}</span>
            <span>{t.suma}</span>
          </div>
        </div>
        <div className="absolute right-3 bottom-3 rounded-full bg-green/16 px-2.5 py-1.5 font-semibold text-green">
          {t.rozpoznane}
        </div>
      </div>

      <div className="m-3.5 flex flex-col gap-2">
        {t.pola.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-2 rounded-xl bg-surface-2 px-3.5 py-3"
          >
            <span className="text-ink-muted">{label}</span>
            <b className="truncate">{value}</b>
          </div>
        ))}
      </div>

      <div className="mx-3.5 mt-auto mb-3.5 rounded-[14px] bg-blue py-4 text-center text-[14px] font-semibold text-white lg:text-[15px]">
        {t.zapisz}
      </div>
    </Telefon>
  );
}
