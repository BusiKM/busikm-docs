import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const rings = [
  { value: '6:07', gradient: 'conic-gradient(#0B5FFF 0 68%, #26262B 68% 100%)' },
  { value: '0:40', gradient: 'conic-gradient(#FAFAFA 0 85%, #26262B 85% 100%)' },
  { value: '11:00', gradient: 'conic-gradient(#30D158 0 100%, #26262B 100% 100%)' },
] as const;

const drivers = [
  { who: 'Marek W.', vehicle: 'WZ 4821K', tone: 'text-ink-muted' },
  { who: 'Tomasz L.', vehicle: 'PO 2093J', tone: 'text-green' },
  { who: 'Piotr K.', vehicle: 'GD 7710R', tone: 'text-ink-muted' },
] as const;

/** Teksty w kolejności tablic `rings` i `drivers`. */
const TEKSTY: Tlumaczenia<{
  pierscienie: readonly { of: string; label: string }[];
  stany: readonly string[];
  dzis: string;
}> = {
  pl: {
    pierscienie: [
      { of: 'z 9:00', label: 'Jazda' },
      { of: 'do przerwy', label: 'Przerwa' },
      { of: 'wykonany', label: 'Odpoczynek' },
    ],
    stany: ['przerwa za 40 min', 'w normie', 'odpoczynek'],
    dzis: 'dziś, 14:20',
  },
  en: {
    pierscienie: [
      { of: 'of 9:00', label: 'Driving' },
      { of: 'to break', label: 'Break' },
      { of: 'taken', label: 'Rest' },
    ],
    stany: ['break in 40 min', 'within limits', 'resting'],
    dzis: 'today, 14:20',
  },
};

/** Jazda, przerwa, odpoczynek — liczniki i lista kierowców. */
export function PierscienieCzasu() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-5 rounded-card border border-line-dark bg-surface text-paper p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:gap-7 lg:p-8 lg:text-[13px]">
      <div className="hidden justify-between text-ink-muted lg:flex">
        <span>Marek W. · WZ 4821K</span>
        <span>{t.dzis}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:gap-4">
        {rings.map((ring, i) => (
          <div key={ring.value} className="flex flex-col items-center gap-2 lg:gap-3">
            <div
              className="flex size-20 items-center justify-center rounded-full lg:size-30"
              style={{ background: ring.gradient }}
            >
              <div className="flex size-[62px] flex-col items-center justify-center rounded-full bg-surface lg:size-24">
                <b className="text-[14px] lg:text-[20px]">{ring.value}</b>
                <span className="hidden text-[11px] text-ink-muted lg:block">{t.pierscienie[i].of}</span>
              </div>
            </div>
            <span className="text-ink-muted">{t.pierscienie[i].label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1.5 lg:gap-2">
        {drivers.map((d, i) => (
          <div
            key={d.who}
            className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2 lg:rounded-[10px] lg:px-3 lg:py-2.5"
          >
            <span className="truncate">
              {d.who}
              <span className="hidden lg:inline"> · {d.vehicle}</span>
            </span>
            <span className={`flex-none ${d.tone}`}>{t.stany[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
