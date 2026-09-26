import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Co dyspozytor widzi. Kolejność jak w `zakres` niżej. */
const WIDZI = [true, true, true, false, false] as const;

const TEKSTY: Tlumaczenia<{
  widok: string;
  wlasciciel: string;
  dyspozytor: string;
  zakres: readonly string[];
  widzi: string;
  nieWidzi: string;
}> = {
  pl: {
    widok: 'Widok',
    wlasciciel: 'Właściciel',
    dyspozytor: 'Dyspozytor',
    zakres: [
      'Zlecenia, mapa, kierowcy',
      'Rozmowa z kierowcą',
      'Dokumenty i terminy',
      'Przychód, koszty, zysk',
      'Faktury i komplet dla księgowej',
    ],
    widzi: 'widzi',
    nieWidzi: 'nie widzi',
  },
  en: {
    widok: 'View',
    wlasciciel: 'Owner',
    dyspozytor: 'Dispatcher',
    zakres: [
      'Orders, map, drivers',
      'Messages with drivers',
      'Documents and deadlines',
      'Revenue, costs, profit',
      'Invoices and the accountant’s pack',
    ],
    widzi: 'sees',
    nieWidzi: 'doesn’t see',
  },
};

/** Co dyspozytor widzi, a czego nie — przełącznik widoku. */
export function ZakresDostepu() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-5 rounded-panel bg-mist p-7 lg:gap-6 lg:p-12">
      <div className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase lg:text-caption">
        {t.widok}
      </div>

      <div className="inline-flex self-start rounded-btn border border-line bg-white p-1 text-[14px] font-semibold lg:text-[15px]">
        <span className="rounded-[9px] px-4 py-2.5 text-muted lg:px-5">{t.wlasciciel}</span>
        <span className="rounded-[9px] bg-ink px-4 py-2.5 text-paper lg:px-5">{t.dyspozytor}</span>
      </div>

      <div className="flex flex-col text-[14px] leading-relaxed lg:text-[15px]">
        {t.zakres.map((co, i) => (
          <div
            key={co}
            className={`flex justify-between gap-3 py-3 ${
              i < t.zakres.length - 1 ? 'border-b border-line' : ''
            } ${WIDZI[i] ? '' : 'text-muted'}`}
          >
            <span>{co}</span>
            <span className={WIDZI[i] ? 'font-semibold text-green-ink' : ''}>
              {WIDZI[i] ? t.widzi : t.nieWidzi}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
