import { Telefon, PasekStanu } from '@/components/mockups/Telefon';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  przerwaZa: string;
  za: string;
  jazda: string;
  z430: string;
  dzis: string;
  z900: string;
  odpoczynek: string;
  wykonany: string;
  przerwa: string;
}> = {
  pl: {
    naglowek: 'Czas pracy',
    przerwaZa: 'Przerwa za',
    za: '40 min',
    jazda: 'Jazda',
    z430: 'z 4:30',
    dzis: 'Dziś',
    z900: 'z 9:00',
    odpoczynek: 'Odpoczynek',
    wykonany: 'wykonany',
    przerwa: 'Przerwa',
  },
  en: {
    naglowek: 'Working time',
    przerwaZa: 'Break in',
    za: '40 min',
    jazda: 'Driving',
    z430: 'of 4:30',
    dzis: 'Today',
    z900: 'of 9:00',
    odpoczynek: 'Rest',
    wykonany: 'taken',
    przerwa: 'Break',
  },
};

/** Licznik czasu pracy z przypomnieniem o przerwie. */
export function EkranCzas() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Telefon>
      <PasekStanu left="10:05" right={t.naglowek} />

      <div className="mx-4 mt-4 flex items-center justify-between rounded-xl bg-surface-2 px-3.5 py-3 lg:mx-4.5">
        <span>
          {t.przerwaZa} <b>{t.za}</b>
        </span>
        <span aria-hidden className="size-2 rounded-full bg-paper" />
      </div>

      <div className="flex justify-center px-4 pt-7 pb-4">
        <div
          className="flex size-[150px] items-center justify-center rounded-full lg:size-[180px]"
          style={{ background: 'conic-gradient(#0B5FFF 0 76%, #26262B 76% 100%)' }}
        >
          <div className="flex size-[124px] flex-col items-center justify-center rounded-full bg-surface lg:size-[150px]">
            <span className="text-ink-muted">{t.jazda}</span>
            <b className="text-[28px] tracking-[-0.02em] lg:text-[34px]">3:50</b>
            <span className="text-ink-muted">{t.z430}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4 lg:px-4.5">
        <div className="rounded-[14px] bg-surface-2 p-3.5">
          <div className="text-ink-muted">{t.dzis}</div>
          <b className="text-[15px] lg:text-[16px]">6:07</b>
          <div className="text-ink-muted">{t.z900}</div>
        </div>
        <div className="rounded-[14px] bg-surface-2 p-3.5">
          <div className="text-ink-muted">{t.odpoczynek}</div>
          <b className="text-[15px] text-green lg:text-[16px]">11:00</b>
          <div className="text-ink-muted">{t.wykonany}</div>
        </div>
      </div>

      <div className="mx-4 mt-auto mb-4 rounded-2xl border border-line-dark-2 py-4 text-center text-[15px] font-semibold lg:mx-4.5 lg:mb-4.5 lg:text-[16px]">
        {t.przerwa}
      </div>
    </Telefon>
  );
}
