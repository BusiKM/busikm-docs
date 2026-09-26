import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Słupek na tydzień: pięć szarych to sierpień, cztery niebieskie wrzesień, ostatni jeszcze trwa. */
const sierpien = [44, 62, 52, 74, 66];
const wrzesien = [58, 78, 72, 100];

const TEKSTY: Tlumaczenia<{
  tytul: string;
  jednostka: string;
  poprzedni: string;
  poprzedniKwota: string;
  biezacy: string;
  biezacyKwota: string;
  osPoprzedni: string;
  osBiezacy: string;
  roznica: string;
  roznicaKwota: string;
}> = {
  pl: {
    tytul: 'Sierpień vs wrzesień',
    jednostka: 'zysk, zł',
    poprzedni: 'Sierpień',
    poprzedniKwota: '54 910 zł',
    biezacy: 'Wrzesień · do dziś',
    biezacyKwota: '62 480 zł',
    osPoprzedni: 'tygodnie · sierpień',
    osBiezacy: 'wrzesień',
    roznica: 'Różnica',
    roznicaKwota: '+ 7 570 zł · +14%',
  },
  en: {
    tytul: 'August vs September',
    jednostka: 'profit, PLN',
    poprzedni: 'August',
    poprzedniKwota: 'PLN 54,910',
    biezacy: 'September · to date',
    biezacyKwota: 'PLN 62,480',
    osPoprzedni: 'weeks · August',
    osBiezacy: 'September',
    roznica: 'Difference',
    roznicaKwota: '+ PLN 7,570 · +14%',
  },
};

/** Dwa miesiące obok siebie i różnica na dole. */
export function PorownanieMiesiecy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line-dark bg-surface text-paper p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:gap-5 lg:p-8 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">{t.tytul}</b>
        <span className="flex-none text-ink-muted">{t.jednostka}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-[14px] border border-line-dark p-3.5 lg:p-4">
          <div className="text-ink-muted">{t.poprzedni}</div>
          <div className="mt-1 text-[22px] font-semibold tracking-[-0.02em] lg:text-[26px]">
            {t.poprzedniKwota}
          </div>
        </div>
        <div className="rounded-[14px] border border-line-dark bg-surface-2 p-3.5 lg:p-4">
          <div className="truncate text-ink-muted">{t.biezacy}</div>
          <div className="mt-1 text-[22px] font-bold tracking-[-0.02em] text-green lg:text-[26px]">
            {t.biezacyKwota}
          </div>
        </div>
      </div>

      <div className="flex min-h-25 flex-1 items-end gap-1.5 px-1 lg:gap-2" aria-hidden>
        {sierpien.map((h, i) => (
          <span
            key={`s${i}`}
            className="flex-1 rounded-[3px] bg-line-dark-2"
            style={{ height: `${h}%` }}
          />
        ))}
        {wrzesien.map((h, i) => (
          <span
            key={`w${i}`}
            className="flex-1 rounded-[3px] bg-blue"
            style={{ height: `${h}%` }}
          />
        ))}
        <span className="h-[30%] flex-1 rounded-[3px] border border-dashed border-line-dark-2 bg-line-dark" />
      </div>

      <div className="flex justify-between text-ink-muted">
        <span>{t.osPoprzedni}</span>
        <span>{t.osBiezacy}</span>
      </div>

      <div className="flex justify-between gap-3 border-t border-line-dark pt-3">
        <span className="text-ink-muted">{t.roznica}</span>
        <b className="text-green">{t.roznicaKwota}</b>
      </div>
    </div>
  );
}
