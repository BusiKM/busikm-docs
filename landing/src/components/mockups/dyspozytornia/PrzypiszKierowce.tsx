import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const kandydaci = [
  { kto: 'Jan S.', pojazd: 'KR 5512M', wariant: 'best' },
  { kto: 'Anna R.', pojazd: 'WZ 7734F', wariant: 'ok' },
  { kto: 'Marek W.', pojazd: 'WZ 4821K', wariant: 'off' },
  { kto: 'Piotr K.', pojazd: 'GD 7710R', wariant: 'off' },
] as const;

/** Stan i etykieta każdego kandydata — kolejność jak w `kandydaci`. */
const TEKSTY: Tlumaczenia<{
  naglowek: string;
  termin: string;
  opisy: readonly (readonly [string, string])[];
}> = {
  pl: {
    naglowek: 'Przypisz kierowcę · Łódź → Praga',
    termin: 'czw. 06:00',
    opisy: [
      ['Uprawnienia ważne · 9:00 jazdy wolne', 'podpowiedź'],
      ['Uprawnienia ważne · 4:10 jazdy wolne', 'możliwe'],
      ['W drodze do Mediolanu', 'zajęty'],
      ['Odpoczynek do 05:30', 'odpoczynek'],
    ],
  },
  en: {
    naglowek: 'Assign a driver · Łódź → Prague',
    termin: 'Thu 06:00',
    opisy: [
      ['Licence valid · 9:00 driving left', 'suggested'],
      ['Licence valid · 4:10 driving left', 'possible'],
      ['On the way to Milan', 'busy'],
      ['Resting until 05:30', 'resting'],
    ],
  },
};

/** Przypisanie kierowcy z podpowiedzią systemu. */
export function PrzypiszKierowce() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-line-dark bg-surface p-6 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-7 lg:text-[13px]">
      <div className="mb-1.5 flex justify-between gap-3 text-ink-muted">
        <span>{t.naglowek}</span>
        <span className="flex-none">{t.termin}</span>
      </div>

      {kandydaci.map((k, i) => (
        <div
          key={k.kto}
          className={`flex items-center justify-between gap-3 rounded-[14px] p-3.5 ${
            k.wariant === 'best'
              ? 'border border-blue bg-surface-2'
              : k.wariant === 'ok'
                ? 'bg-surface-2'
                : 'bg-surface-3'
          }`}
        >
          <div className={k.wariant === 'off' ? 'text-ink-muted' : undefined}>
            <b className="text-paper">{k.kto}</b> · {k.pojazd}
            <div className="mt-0.5 text-ink-muted">{t.opisy[i][0]}</div>
          </div>
          <span
            className={`flex-none ${
              k.wariant === 'best' ? 'font-semibold text-green' : 'text-ink-muted'
            }`}
          >
            {t.opisy[i][1]}
          </span>
        </div>
      ))}
    </div>
  );
}
