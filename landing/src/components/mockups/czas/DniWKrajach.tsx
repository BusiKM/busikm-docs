import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Kraj = { kraj: string; dni: string; udzial: number; kolor: string; poprawione?: string };

const TEKSTY: Tlumaczenia<{
  kraje: Kraj[];
  kto: string;
  dopisek: string;
  zrodlo: string;
  poprawione: string;
}> = {
  pl: {
    kraje: [
      { kraj: 'Polska', dni: '17 dni', udzial: 55, kolor: '#C9CBD1' },
      { kraj: 'Niemcy', dni: '6 dni', udzial: 19, kolor: '#6E6E76' },
      { kraj: 'Włochy', dni: '5 dni', udzial: 16, kolor: '#0A46C0', poprawione: '4 dni' },
      { kraj: 'Austria', dni: '3 dni', udzial: 10, kolor: '#0B5FFF' },
    ],
    kto: 'Marek W. · sierpień',
    dopisek: ' · dni w krajach',
    zrodlo: 'z trasy',
    poprawione: 'poprawione ręcznie · „nocleg za granicą”',
  },
  en: {
    kraje: [
      { kraj: 'Poland', dni: '17 days', udzial: 55, kolor: '#C9CBD1' },
      { kraj: 'Germany', dni: '6 days', udzial: 19, kolor: '#6E6E76' },
      { kraj: 'Italy', dni: '5 days', udzial: 16, kolor: '#0A46C0', poprawione: '4 days' },
      { kraj: 'Austria', dni: '3 days', udzial: 10, kolor: '#0B5FFF' },
    ],
    kto: 'Marek W. · August',
    dopisek: ' · days per country',
    zrodlo: 'from the route',
    poprawione: 'corrected by hand · “overnight abroad”',
  },
};

/** Dni w krajach policzone z trasy — z jedną pozycją poprawioną ręcznie. */
export function DniWKrajach() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="flex justify-between gap-3 text-muted">
        <span className="truncate">
          {t.kto}<span className="hidden lg:inline">{t.dopisek}</span>
        </span>
        <span className="flex-none">{t.zrodlo}</span>
      </div>

      <div className="flex h-3 gap-0.5 overflow-hidden rounded-md" aria-hidden>
        {t.kraje.map((k) => (
          <span key={k.kraj} style={{ width: `${k.udzial}%`, background: k.kolor }} />
        ))}
      </div>

      <div className="mt-1 flex flex-col border-t border-line">
        {t.kraje.map((k, i) => (
          <div
            key={k.kraj}
            className={`flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1 py-2.5 ${
              i < t.kraje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span>{k.kraj}</span>
            <span className="flex flex-wrap items-center justify-end gap-2.5">
              {k.poprawione && <span className="text-muted line-through">{k.poprawione}</span>}
              <b className={k.poprawione ? '' : 'font-normal'}>{k.dni}</b>
              {k.poprawione && (
                <span className="rounded-full bg-mist px-2 py-[3px] text-[11px] text-muted lg:text-[12px]">
                  {t.poprawione}
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
