import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Koszty jednego kursu — razem 2 496 € przy frachcie 3 900 €, czyli marża 36%.
 *
 * Największą pozycją jest kierowca, nie paliwo. Tak to wygląda w transporcie
 * busami: pięć dni pracy człowieka kosztuje więcej niż tankowanie. Bez tej
 * pozycji rozbicie kosztów wyglądałoby optymistycznie w sposób, który każdy
 * przewoźnik rozpozna jako nieprawdziwy.
 *
 * Kilometraż jest liczony w obie strony (3 280 km), bo pojazd musi wrócić —
 * sama trasa Warszawa → Mediolan to 1 640 km.
 */
type Teksty = {
  costs: readonly { label: string; detail: string; value: string }[];
  zlecenie: string;
  trasa: string;
  wTrasie: string;
  fracht: string;
  kwotaFrachtu: string;
  zysk: string;
  kwotaZysku: string;
  kwotaZyskuPln: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    costs: [
      { label: 'Kierowca', detail: ' · wynagrodzenie i dieta, 5 dni', value: '− 1 060 €' },
      { label: 'Paliwo', detail: ' · 6 paragonów', value: '− 716 €' },
      { label: 'Opłaty drogowe', detail: ' · AT, IT', value: '− 291 €' },
      { label: 'Amortyzacja', detail: ' · 3 280 km', value: '− 273 €' },
      { label: 'Nocleg', detail: ' · Brenner', value: '− 156 €' },
    ],
    zlecenie: 'Zlecenie · 2026/09/041',
    trasa: 'Warszawa → Mediolan',
    wTrasie: 'w trasie',
    fracht: 'Fracht',
    kwotaFrachtu: '3 900 €',
    zysk: 'Zysk na kursie',
    kwotaZysku: '1 404 €',
    kwotaZyskuPln: ' · 6 009 zł',
  },
  en: {
    costs: [
      { label: 'Driver', detail: ' · pay and daily allowance, 5 days', value: '− €1,060' },
      { label: 'Fuel', detail: ' · 6 receipts', value: '− €716' },
      { label: 'Road tolls', detail: ' · AT, IT', value: '− €291' },
      { label: 'Depreciation', detail: ' · 3,280 km', value: '− €273' },
      { label: 'Overnight stay', detail: ' · Brenner', value: '− €156' },
    ],
    zlecenie: 'Order · 2026/09/041',
    trasa: 'Warsaw → Milan',
    wTrasie: 'en route',
    fracht: 'Freight',
    kwotaFrachtu: '€3,900',
    zysk: 'Profit on this job',
    kwotaZysku: '€1,404',
    kwotaZyskuPln: ' · PLN 6,009',
  },
};

/**
 * Karta jednego zlecenia z rozbiciem kosztów i zyskiem na dole.
 *
 * Stoi w dwóch miejscach — w sekcji „Ile zostaje" na stronie głównej i w
 * nagłówku podstrony o rentowności. Oba miejsca czekają na ten sam zrzut
 * (`mockup-zysk-karta-desktop.png`), więc rysowana wersja musi być jedna:
 * dwie różne liczby zysku dla tego samego kursu przeczyłyby sobie nawzajem.
 */
export function KartaZysku() {
  const t = TEKSTY[biezacyJezyk()];
  const costs = t.costs;
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line-dark bg-surface text-paper p-4 text-[12px] shadow-[0_40px_100px_rgba(11,95,255,.18),0_30px_60px_rgba(0,0,0,.6)] lg:aspect-4/3 lg:gap-3 lg:p-7 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="hidden text-ink-muted lg:block">{t.zlecenie}</div>
          <b className="text-[14px] lg:text-[18px]">{t.trasa}</b>
        </div>
        <span className="hidden rounded-full bg-blue-soft px-2.5 py-[5px] font-semibold text-blue lg:inline">
          {t.wTrasie}
        </span>
      </div>

      <div className="flex justify-between border-b border-line-dark py-1.5 lg:py-2.5">
        <span>{t.fracht}</span>
        <b>{t.kwotaFrachtu}</b>
      </div>

      {costs.map((c, i) => (
        <div
          key={c.label}
          className={`flex justify-between text-ink-muted lg:py-1.5 ${
            i === costs.length - 1 ? 'border-b border-line-dark pb-1.5 lg:pb-2' : ''
          }`}
        >
          <span>
            {c.label}
            <span className="hidden lg:inline">{c.detail}</span>
          </span>
          <span>{c.value}</span>
        </div>
      ))}

      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <div className="text-ink-muted">{t.zysk}</div>
          <div className="text-[18px] font-bold tracking-[-0.02em] text-green lg:text-[30px]">
            {t.kwotaZysku}
            <span className="hidden lg:inline">{t.kwotaZyskuPln}</span>
          </div>
        </div>
        <div className="hidden h-11 items-end gap-1 lg:flex" aria-hidden>
          {[30, 45, 40, 70, 100].map((h, i) => (
            <span
              key={h}
              className={`w-2 rounded-[2px] ${i === 4 ? 'bg-blue' : 'bg-line-dark-2'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
