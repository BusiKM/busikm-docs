const zakres = [
  ['Komplet dokumentów i eksporty', true],
  ['Faktury, koszty, diety', true],
  ['Zlecenia, mapa, kierowcy', false],
  ['Rozmowy z kierowcami', false],
] as const;

/** Zaproszenie księgowej z zewnątrz i zakres jej dostępu. */
export function ZaproszenieKsiegowej() {
  return (
    <div className="mx-auto flex w-full max-w-[460px] flex-col gap-5 rounded-card border border-line-dark bg-surface p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">Zaproś księgową</b>
        <span className="flex-none text-ink-muted">tylko do odczytu</span>
      </div>

      <div className="truncate rounded-xl border border-line-dark-2 p-3.5">
        ewa.m@biuro-rachunkowe.pl
      </div>

      <div className="flex flex-col border-t border-line-dark">
        {zakres.map(([co, widzi], i) => (
          <div
            key={co}
            className={`flex justify-between gap-3 py-2.5 lg:py-[11px] ${
              i < zakres.length - 1 ? 'border-b border-line-dark' : ''
            } ${widzi ? '' : 'text-ink-muted'}`}
          >
            <span>{co}</span>
            <span className={widzi ? 'font-semibold text-green' : ''}>
              {widzi ? 'widzi' : 'nie widzi'}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-blue p-3.5 text-center font-semibold text-white">
        Wyślij zaproszenie
      </div>
    </div>
  );
}
