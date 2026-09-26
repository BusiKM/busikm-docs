import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  orderRows: readonly (readonly [string, string])[];
  zlecenie: string;
  trasa: string;
  fracht: string;
  kwota: string;
  zakonczony: string;
  faktura: string;
  pozycja: string;
  termin: string;
  dni: string;
  razem: string;
  suma: string;
  wyslij: string;
  eFaktura: string;
}> = {
  pl: {
    orderRows: [
      ['Klient', 'Alpina Logistics'],
      ['Załadunek', '2.09 · 06:00'],
      ['Rozładunek', '3.09 · 08:00'],
      ['Kierowca', 'Marek W. · WZ 4821K'],
    ],
    zlecenie: 'Zlecenie · 2026/09/041',
    trasa: 'Warszawa → Mediolan',
    fracht: 'Fracht',
    kwota: '3 900 €',
    zakonczony: 'Kurs zakończony',
    faktura: 'Faktura · FV/2026/09/041',
    pozycja: 'Transport Warszawa → Mediolan',
    termin: 'Termin płatności',
    dni: '30 dni',
    razem: 'Razem',
    suma: '3 900 € · 16 692 zł',
    wyslij: 'Wyślij',
    eFaktura: 'e-faktura',
  },
  en: {
    orderRows: [
      ['Client', 'Alpina Logistics'],
      ['Loading', '2 Sep · 06:00'],
      ['Unloading', '3 Sep · 08:00'],
      ['Driver', 'Marek W. · WZ 4821K'],
    ],
    zlecenie: 'Order · 2026/09/041',
    trasa: 'Warsaw → Milan',
    fracht: 'Freight',
    kwota: '€3,900',
    zakonczony: 'Job completed',
    faktura: 'Invoice · FV/2026/09/041',
    pozycja: 'Transport Warsaw → Milan',
    termin: 'Payment terms',
    dni: '30 days',
    razem: 'Total',
    suma: '€3,900 · PLN 16,692',
    wyslij: 'Send',
    eFaktura: 'e-invoice',
  },
};

/** Ze zlecenia powstaje faktura — dwie karty i strzałka między nimi. */
export function ZlecenieFakturaMockup() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="grid items-center gap-2.5 rounded-card border border-line bg-white p-4 text-[12px] shadow-card lg:aspect-4/3 lg:grid-cols-[1fr_24px_1fr] lg:gap-3 lg:p-7">
      <div className="flex h-full flex-col gap-2.5 rounded-[10px] border border-line p-3 lg:rounded-[14px] lg:p-[18px]">
        <div className="text-muted">{t.zlecenie}</div>
        <b className="lg:text-[15px]">{t.trasa}</b>
        <div className="flex justify-between">
          <span className="text-muted">{t.fracht}</span>
          <b>{t.kwota}</b>
        </div>
        {t.orderRows.map(([k, v]) => (
          <div key={k} className="hidden justify-between lg:flex">
            <span className="text-muted">{k}</span>
            <span>{v}</span>
          </div>
        ))}
        <span className="mt-auto hidden self-start rounded-full bg-green/14 px-2.5 py-1.5 font-semibold text-green-ink lg:inline">
          {t.zakonczony}
        </span>
      </div>

      <div className="text-center text-[18px] text-blue lg:text-[22px]">
        <span className="lg:hidden">↓</span>
        <span className="hidden lg:inline">→</span>
      </div>

      <div className="flex h-full flex-col gap-2.5 rounded-[10px] border border-line bg-paper p-3 lg:rounded-[14px] lg:p-[18px]">
        <div className="text-muted">{t.faktura}</div>
        <b className="hidden lg:block lg:text-[15px]">Alpina Logistics S.r.l.</b>
        <div className="hidden justify-between lg:flex">
          <span>{t.pozycja}</span>
          <span>{t.kwota}</span>
        </div>
        <div className="hidden justify-between text-muted lg:flex">
          <span>{t.termin}</span>
          <span>{t.dni}</span>
        </div>
        <div className="flex justify-between gap-2 border-t border-line pt-2">
          <b>{t.razem}</b>
          <b>{t.suma}</b>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <div className="rounded-lg bg-blue py-2 text-center font-semibold text-white lg:rounded-[10px] lg:py-2.5">
            {t.wyslij}
          </div>
          <div className="flex gap-1.5">
            <span className="flex-1 rounded-md border border-line py-1.5 text-center">
              <span className="text-green-ink">●</span> mail
            </span>
            <span className="flex-1 rounded-md border border-line py-1.5 text-center">
              <span className="text-green-ink">●</span> {t.eFaktura}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
