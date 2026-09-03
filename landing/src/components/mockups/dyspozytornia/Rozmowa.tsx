const wiadomosci = [
  ['Załadunek gotowy, ruszam 06:10.', false],
  ['Jedź. Rozładunek jutro 08:00.', true],
  ['Tankowanie pod Brnem, paragon dodany.', false],
  ['Korek na A22, trasa poprawiona. Masz nową w telefonie.', true],
  ['Widzę. Dzięki.', false],
] as const;

/** Rozmowa z kierowcą wewnątrz dyspozytorni. */
export function Rozmowa() {
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col gap-3 rounded-card border border-line-dark bg-surface p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-7 lg:text-caption">
      <div className="flex items-center gap-3 border-b border-line-dark pb-3.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-[#1C1C21] font-semibold text-blue-light">
          MW
        </span>
        <div>
          <b>Marek W.</b>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">
            WZ 4821K · w drodze · A22
          </div>
        </div>
      </div>

      {wiadomosci.map(([tresc, moje]) => (
        <div
          key={tresc}
          className={`max-w-[80%] rounded-xl px-3.5 py-2.5 ${
            moje ? 'self-end bg-blue text-white' : 'self-start bg-surface-2'
          }`}
        >
          {tresc}
        </div>
      ))}

      <div className="mt-2 rounded-xl border border-line-dark-2 px-3.5 py-3 text-ink-muted">
        Napisz do kierowcy…
      </div>
    </div>
  );
}
