import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  rodzaj: string;
  data: string;
  wEuro: string;
  kwotaEuro: string;
  wZlotych: string;
  kwotaZlote: string;
  wiersze: readonly (readonly [string, string, string])[];
  stopka: string;
}> = {
  pl: {
    rodzaj: 'Koszt · paliwo',
    data: '2.09.2026',
    wEuro: 'W euro',
    kwotaEuro: '151,50 €',
    wZlotych: 'W złotych',
    kwotaZlote: '648,42 zł',
    wiersze: [
      ['Kurs', '4,2800 zł', '4,2800 zł'],
      ['Data przeliczenia', '1.09.2026 · dzień przed dokumentem', '1.09.2026'],
      ['Zapisane przy dokumencie', 'na stałe', 'na stałe'],
    ],
    stopka: 'Nikt nie odtwarza kursu z tabeli trzy tygodnie później.',
  },
  en: {
    rodzaj: 'Cost · fuel',
    data: '2 Sep 2026',
    wEuro: 'In euro',
    kwotaEuro: '€151.50',
    wZlotych: 'In złoty',
    kwotaZlote: 'PLN 648.42',
    wiersze: [
      ['Rate', 'PLN 4.2800', 'PLN 4.2800'],
      ['Conversion date', '1 Sep 2026 · day before the document', '1 Sep 2026'],
      ['Saved with the document', 'for good', 'for good'],
    ],
    stopka: 'Nobody digs the rate out of a table three weeks later.',
  },
};

/** Koszt w euro i w złotych — z kursem zapisanym przy dokumencie. */
export function KursWaluty() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line-dark bg-surface text-paper p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">{t.rodzaj}</div>
          <b className="text-[16px] lg:text-[18px]">Shell · Rotterdam</b>
        </div>
        <span className="flex-none text-ink-muted">{t.data}</span>
      </div>

      <div className="flex items-end gap-4 border-y border-line-dark py-4">
        <div>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">{t.wEuro}</div>
          <div className="text-[26px] font-bold tracking-[-0.03em] lg:text-[36px]">{t.kwotaEuro}</div>
        </div>
        <span aria-hidden className="pb-1.5 text-[19px] text-ink-muted lg:text-[22px]">
          →
        </span>
        <div>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">{t.wZlotych}</div>
          <div className="text-[26px] font-bold tracking-[-0.03em] lg:text-[36px]">{t.kwotaZlote}</div>
        </div>
      </div>

      <div className="flex flex-col">
        {t.wiersze.map(([label, value, krotki], i) => (
          <div
            key={label}
            className={`flex justify-between gap-3 py-2.5 ${
              i < 2 ? 'border-b border-line-dark' : ''
            }`}
          >
            <span className="text-ink-muted">{label}</span>
            <span className={i === 2 ? 'font-semibold text-green' : ''}>
              <span className="lg:hidden">{krotki}</span>
              <span className="hidden lg:inline">{value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto text-[12px] text-ink-muted lg:text-[13px]">
        {t.stopka}
      </div>
    </div>
  );
}
