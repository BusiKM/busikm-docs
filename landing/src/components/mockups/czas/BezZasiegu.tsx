import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Który wiersz podsumowania jest zielony. Kolejność jak w `wiersze` niżej. */
const MOCNY = [false, true, false] as const;

const TEKSTY: Tlumaczenia<{
  kto: string;
  luka: string;
  lukaKrotko: string;
  lukaDlugo: string;
  wiersze: readonly (readonly [string, string])[];
}> = {
  pl: {
    kto: 'Marek W. · dziś',
    luka: 'tunel Brenner · brak zasięgu 12:05–12:38',
    lukaKrotko: '12:05–12:38 · w telefonie',
    lukaDlugo: '12:05–12:38 · liczyło się w telefonie',
    wiersze: [
      ['Jazda w tunelu', '33 min'],
      ['Zapisane w telefonie', 'tak'],
      ['Dosłane po powrocie sygnału', '12:39'],
    ],
  },
  en: {
    kto: 'Marek W. · today',
    luka: 'Brenner tunnel · no signal 12:05–12:38',
    lukaKrotko: '12:05–12:38 · on the phone',
    lukaDlugo: '12:05–12:38 · counted on the phone',
    wiersze: [
      ['Driving in the tunnel', '33 min'],
      ['Saved on the phone', 'yes'],
      ['Sent once signal was back', '12:39'],
    ],
  },
};

/** Pasek dnia z luką w zasięgu — i dowód, że luka też się policzyła. */
export function BezZasiegu() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="flex flex-wrap justify-between gap-x-3 text-muted">
        <span>{t.kto}</span>
        <span>{t.luka}</span>
      </div>

      <div className="flex h-4 gap-0.5 overflow-hidden rounded-lg" aria-hidden>
        <span className="w-[38%] bg-blue" />
        <span className="w-[12%] bg-blue opacity-45" />
        <span className="w-[30%] bg-blue" />
        <span className="w-[8%] bg-ink" />
        <span className="w-[12%] bg-line" />
      </div>

      <div className="flex justify-between gap-3 text-[12px] text-muted lg:text-[13px]">
        <span>06:10</span>
        <span className="truncate">
          <span className="lg:hidden">{t.lukaKrotko}</span>
          <span className="hidden lg:inline">{t.lukaDlugo}</span>
        </span>
        <span>14:20</span>
      </div>

      <div className="mt-1.5 flex flex-col border-t border-line">
        {t.wiersze.map(([label, value], i) => (
          <div
            key={label}
            className={`flex justify-between gap-3 py-2.5 ${i < 2 ? 'border-b border-line' : ''}`}
          >
            <span>{label}</span>
            <span className={MOCNY[i] ? 'font-semibold text-green-ink' : ''}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
