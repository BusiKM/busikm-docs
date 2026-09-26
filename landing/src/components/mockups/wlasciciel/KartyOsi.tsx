import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Cztery drobne karty przy osi dnia. Nie są makietami do podmiany — to
 * ilustracje przy punktach osi, mają być mniejsze i cichsze niż ekrany
 * z sekcji „Cztery ekrany".
 */

const TEKSTY: Tlumaczenia<{
  pulpit: [string, string, boolean][];
  uwaga: string;
  mapaDojazd: string;
  trasa: string;
  zakonczony: string;
  fracht: string;
  fracht3900: string;
  wystaw: string;
  pobierz: string;
  zestawien: string;
  gotowe: string;
}> = {
  pl: {
    pulpit: [
      ['Przychód', '184 320', false],
      ['Koszty', '121 840', false],
      ['Zysk', '62 480', true],
    ],
    uwaga: 'Dziś uwagi wymaga: 1 dokument',
    mapaDojazd: 'na miejscu 08:00',
    trasa: 'Warszawa → Mediolan',
    zakonczony: 'zakończony',
    fracht: 'Fracht',
    fracht3900: '3 900 €',
    wystaw: 'Wystaw i wyślij',
    pobierz: 'Pobierz komplet za sierpień',
    zestawien: '9 zestawień',
    gotowe: '9 z 9 gotowe',
  },
  en: {
    pulpit: [
      ['Revenue', '184,320', false],
      ['Costs', '121,840', false],
      ['Profit', '62,480', true],
    ],
    uwaga: 'Needs attention today: 1 document',
    mapaDojazd: 'arrives 08:00',
    trasa: 'Warsaw → Milan',
    zakonczony: 'completed',
    fracht: 'Freight',
    fracht3900: '€3,900',
    wystaw: 'Issue and send',
    pobierz: 'Download everything for August',
    zestawien: '9 reports',
    gotowe: '9 of 9 ready',
  },
};

const ramka =
  'rounded-2xl border border-line-dark bg-surface p-4 text-[11px] lg:p-4.5';

/** 7:10 — trzy liczby pulpitu. */
export function KartaPulpit() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} grid grid-cols-3 gap-2`}>
      {t.pulpit.map(([label, value, zysk]) => (
        <div
          key={label}
          className={`rounded-[10px] border border-line-dark p-2.5 ${zysk ? 'bg-surface-2' : ''}`}
        >
          <div className="text-ink-muted">{label}</div>
          <b className={`text-[13px] ${zysk ? 'text-green' : ''}`}>{value}</b>
        </div>
      ))}
      <div className="col-span-3 pt-1 text-ink-muted">{t.uwaga}</div>
    </div>
  );
}

/** 11:40 — bus na mapie z godziną dojazdu. */
export function KartaMapa() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl border border-line-dark bg-surface text-paper">
      <svg
        viewBox="0 0 320 130"
        preserveAspectRatio="none"
        className="size-full"
        aria-hidden
      >
        <path
          d="M 280 20 C 220 50, 180 70, 140 90 S 70 115, 30 120"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="3"
        />
        <circle cx="150" cy="86" r="6" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
      </svg>
      <div className="absolute top-3 left-3.5 rounded-lg bg-surface-2 px-2.5 py-2 text-[11px]">
        <b>WZ 4821K</b> · Bolzano
        <div className="text-ink-muted">{t.mapaDojazd}</div>
      </div>
    </div>
  );
}

/** 16:20 — zakończony kurs gotowy do zafakturowania. */
export function KartaFaktura() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2.5 text-[12px]`}>
      <div className="flex justify-between gap-3">
        <span className="truncate">{t.trasa}</span>
        <span className="flex-none text-green">{t.zakonczony}</span>
      </div>
      <div className="flex justify-between gap-3 border-t border-line-dark pt-2">
        <span className="text-ink-muted">{t.fracht}</span>
        <b>{t.fracht3900}</b>
      </div>
      <div className="rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
        {t.wystaw}
      </div>
    </div>
  );
}

/** koniec miesiąca — jeden przycisk dla księgowej. */
export function KartaEksport() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2.5 text-[12px]`}>
      <div className="rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
        {t.pobierz}
      </div>
      <div className="flex justify-between gap-3 text-ink-muted">
        <span>{t.zestawien}</span>
        <span className="text-green">{t.gotowe}</span>
      </div>
    </div>
  );
}
