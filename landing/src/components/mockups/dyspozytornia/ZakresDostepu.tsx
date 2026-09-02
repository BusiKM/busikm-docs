const zakres = [
  ['Zlecenia, mapa, kierowcy', true],
  ['Rozmowa z kierowcą', true],
  ['Dokumenty i terminy', true],
  ['Przychód, koszty, zysk', false],
  ['Faktury i komplet dla księgowej', false],
] as const;

/** Co dyspozytor widzi, a czego nie — przełącznik widoku. */
export function ZakresDostepu() {
  return (
    <div className="flex flex-col gap-5 rounded-panel bg-mist p-7 lg:gap-6 lg:p-12">
      <div className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase lg:text-caption">
        Widok
      </div>

      <div className="inline-flex self-start rounded-btn border border-line bg-white p-1 text-[14px] font-semibold lg:text-[15px]">
        <span className="rounded-[9px] px-4 py-2.5 text-muted lg:px-5">Właściciel</span>
        <span className="rounded-[9px] bg-ink px-4 py-2.5 text-paper lg:px-5">Dyspozytor</span>
      </div>

      <div className="flex flex-col text-[14px] leading-relaxed lg:text-[15px]">
        {zakres.map(([co, widzi], i) => (
          <div
            key={co}
            className={`flex justify-between gap-3 py-3 ${
              i < zakres.length - 1 ? 'border-b border-line' : ''
            } ${widzi ? '' : 'text-muted'}`}
          >
            <span>{co}</span>
            <span className={widzi ? 'font-semibold text-green-ink' : ''}>
              {widzi ? 'widzi' : 'nie widzi'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
