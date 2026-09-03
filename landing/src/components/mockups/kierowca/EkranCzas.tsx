import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

/** Licznik czasu pracy z przypomnieniem o przerwie. */
export function EkranCzas() {
  return (
    <Telefon>
      <PasekStanu left="10:05" right="Czas pracy" />

      <div className="mx-4 mt-4 flex items-center justify-between rounded-xl bg-surface-2 px-3.5 py-3 lg:mx-4.5">
        <span>
          Przerwa za <b>40 min</b>
        </span>
        <span aria-hidden className="size-2 rounded-full bg-paper" />
      </div>

      <div className="flex justify-center px-4 pt-7 pb-4">
        <div
          className="flex size-[150px] items-center justify-center rounded-full lg:size-[180px]"
          style={{ background: 'conic-gradient(#0B5FFF 0 76%, #26262B 76% 100%)' }}
        >
          <div className="flex size-[124px] flex-col items-center justify-center rounded-full bg-surface lg:size-[150px]">
            <span className="text-ink-muted">Jazda</span>
            <b className="text-[28px] tracking-[-0.02em] lg:text-[34px]">3:50</b>
            <span className="text-ink-muted">z 4:30</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 px-4 lg:px-4.5">
        <div className="rounded-[14px] bg-surface-2 p-3.5">
          <div className="text-ink-muted">Dziś</div>
          <b className="text-[15px] lg:text-[16px]">6:07</b>
          <div className="text-ink-muted">z 9:00</div>
        </div>
        <div className="rounded-[14px] bg-surface-2 p-3.5">
          <div className="text-ink-muted">Odpoczynek</div>
          <b className="text-[15px] text-green lg:text-[16px]">11:00</b>
          <div className="text-ink-muted">wykonany</div>
        </div>
      </div>

      <div className="mx-4 mt-auto mb-4 rounded-2xl border border-line-dark-2 py-4 text-center text-[15px] font-semibold lg:mx-4.5 lg:mb-4.5 lg:text-[16px]">
        Przerwa
      </div>
    </Telefon>
  );
}
