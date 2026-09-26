import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Które wiadomości pisze dyspozytor. Kolejność jak w `wiadomosci` niżej. */
const MOJE = [false, true, false, true, false] as const;

const TEKSTY: Tlumaczenia<{
  status: string;
  wiadomosci: readonly string[];
  pole: string;
}> = {
  pl: {
    status: 'WZ 4821K · w drodze · A22',
    wiadomosci: [
      'Załadunek gotowy, ruszam 06:10.',
      'Jedź. Rozładunek jutro 08:00.',
      'Tankowanie pod Brnem, paragon dodany.',
      'Korek na A22, trasa poprawiona. Masz nową w telefonie.',
      'Widzę. Dzięki.',
    ],
    pole: 'Napisz do kierowcy…',
  },
  en: {
    status: 'WZ 4821K · on the road · A22',
    wiadomosci: [
      'Loaded, leaving at 06:10.',
      'Go ahead. Unloading tomorrow 08:00.',
      'Filled up near Brno, receipt added.',
      'Jam on the A22, route updated. The new one’s on your phone.',
      'Got it. Thanks.',
    ],
    pole: 'Message the driver…',
  },
};

/** Rozmowa z kierowcą wewnątrz dyspozytorni. */
export function Rozmowa() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col gap-3 rounded-card border border-line-dark bg-surface p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-7 lg:text-caption">
      <div className="flex items-center gap-3 border-b border-line-dark pb-3.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#1C1C21] font-semibold text-blue-light">
          MW
        </span>
        <div>
          <b>Marek W.</b>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">
            {t.status}
          </div>
        </div>
      </div>

      {t.wiadomosci.map((tresc, i) => (
        <div
          key={tresc}
          className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${
            MOJE[i] ? 'self-end bg-blue text-white' : 'self-start bg-surface-2'
          }`}
        >
          {tresc}
        </div>
      ))}

      <div className="mt-2 rounded-xl border border-line-dark-2 px-3.5 py-3 text-ink-muted">
        {t.pole}
      </div>
    </div>
  );
}
