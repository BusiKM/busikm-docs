import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

/** Lista zleceń po wejściu kodem. */
export function EkranZlecenia() {
  return (
    <Telefon>
      <PasekStanu left="05:40" right="Marek W." />

      <div className="px-4 pt-4 text-[20px] font-semibold lg:px-4.5 lg:pt-5 lg:text-[22px]">
        Dziś
      </div>

      <div className="flex flex-col gap-2 px-4 py-3 lg:px-4.5">
        <div className="rounded-2xl border border-[#2A2A30] bg-surface-2 p-4">
          <div className="flex justify-between gap-2">
            <b className="text-[13px] lg:text-[14px]">Warszawa → Mediolan</b>
            <span className="text-blue">06:00</span>
          </div>
          <div className="mt-1.5 text-ink-muted">Załadunek · ul. Marywilska 44</div>
          <div className="text-ink-muted">Rozładunek jutro 08:00 · Via Tortona 12</div>
          <div className="mt-3 rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
            Otwórz
          </div>
        </div>

        <div className="rounded-2xl bg-surface-2 p-4">
          <div className="flex justify-between gap-2">
            <b className="text-[13px] lg:text-[14px]">Mediolan → Warszawa</b>
            <span className="text-ink-muted">czw.</span>
          </div>
          <div className="mt-1.5 text-ink-muted">Załadunek 14:00 · Corsico</div>
        </div>
      </div>

      <div className="px-4 pb-1.5 text-[10px] tracking-[0.08em] text-ink-muted uppercase lg:px-4.5 lg:text-[11px]">
        Zakończone
      </div>

      <div className="flex flex-col gap-2 px-4 lg:px-4.5">
        {[
          ['Poznań → Berlin', 'rozliczone'],
          ['Warszawa → Poznań', 'rozliczone'],
        ].map(([route, state]) => (
          <div
            key={route}
            className="flex justify-between gap-2 rounded-[14px] bg-surface-3 px-4 py-2.5"
          >
            <span className="truncate">{route}</span>
            <span className="flex-none text-green">{state}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-around border-t border-line-dark pt-3 pb-4 text-[10px] text-ink-muted lg:text-[11px]">
        <span className="text-paper">Zlecenia</span>
        <span>Trasa</span>
        <span>Koszty</span>
        <span>Czas</span>
      </div>
    </Telefon>
  );
}
