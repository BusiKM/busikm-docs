import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Teksty = {
  naglowek: string;
  liczby: readonly (readonly [string, string, boolean])[];
  kolumny: readonly [string, string, string, string];
  kraje: readonly (readonly [string, string, string, string])[];
  zrodlo: string;
  gotowe: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    naglowek: 'Rozliczenie · sierpień',
    liczby: [
      ['Dni za granicą', '14', false],
      ['Diety', '2 856 zł', false],
      ['Do wypłaty', '9 640 zł', true],
    ],
    kolumny: ['Kraj', 'Dni', 'Stawka', 'Razem'],
    kraje: [
      ['Niemcy', '6', '49 €', '1 258 zł'],
      ['Włochy', '5', '53 €', '1 134 zł'],
      ['Austria', '3', '57 €', '464 zł'],
    ],
    zrodlo: 'Dni liczone z trasy, nie z notatek',
    gotowe: 'gotowe do wczytania',
  },
  en: {
    naglowek: 'Settlement · August',
    liczby: [
      ['Days abroad', '14', false],
      ['Per diems', 'PLN 2,856', false],
      ['To pay', 'PLN 9,640', true],
    ],
    kolumny: ['Country', 'Days', 'Rate', 'Total'],
    kraje: [
      ['Germany', '6', '€49', 'PLN 1,258'],
      ['Italy', '5', '€53', 'PLN 1,134'],
      ['Austria', '3', '€57', 'PLN 464'],
    ],
    zrodlo: 'Days counted from the route, not from notes',
    gotowe: 'ready to import',
  },
};

/** Rozliczenie kierowcy: dni za granicą, diety, wypłata. */
export function RozliczenieKierowcy() {
  const t = TEKSTY[biezacyJezyk()];
  const { kraje } = t;
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[12px] text-muted lg:text-[13px]">{t.naglowek}</div>
          <b className="text-[16px] lg:text-[18px]">Marek W.</b>
        </div>
        <span className="flex-none text-muted">WZ 4821K</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {t.liczby.map(([label, value, strong]) => (
          <div
            key={label}
            className={`rounded-[14px] border border-line p-3.5 ${strong ? 'bg-mist' : ''}`}
          >
            <div className="text-[11px] text-muted lg:text-[12px]">{label}</div>
            <b className="text-[17px] lg:text-[20px]">{value}</b>
          </div>
        ))}
      </div>

      <div className="flex flex-col border-t border-line text-[12px] lg:text-[13px]">
        <div className="grid grid-cols-[1fr_44px_56px_76px] gap-3 border-b border-line py-2.5 text-muted lg:grid-cols-[1fr_60px_70px_90px]">
          <span>{t.kolumny[0]}</span>
          <span>{t.kolumny[1]}</span>
          <span>{t.kolumny[2]}</span>
          <span className="text-right">{t.kolumny[3]}</span>
        </div>
        {kraje.map(([kraj, dni, stawka, razem], i) => (
          <div
            key={kraj}
            className={`grid grid-cols-[1fr_44px_56px_76px] gap-3 py-2.5 lg:grid-cols-[1fr_60px_70px_90px] ${
              i < kraje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span>{kraj}</span>
            <span>{dni}</span>
            <span>{stawka}</span>
            <span className="text-right">{razem}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-muted">
        <span>{t.zrodlo}</span>
        <span className="font-semibold text-green-ink">{t.gotowe}</span>
      </div>
    </div>
  );
}
