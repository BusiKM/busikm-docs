const kraje = [
  { kraj: 'Polska', dni: '17 dni', udzial: 55, kolor: '#C9CBD1' },
  { kraj: 'Niemcy', dni: '6 dni', udzial: 19, kolor: '#6E6E76' },
  { kraj: 'Włochy', dni: '5 dni', udzial: 16, kolor: '#0A46C0', poprawione: '4 dni' },
  { kraj: 'Austria', dni: '3 dni', udzial: 10, kolor: '#0B5FFF' },
];

/** Dni w krajach policzone z trasy — z jedną pozycją poprawioną ręcznie. */
export function DniWKrajach() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="flex justify-between gap-3 text-muted">
        <span className="truncate">
          Marek W. · sierpień<span className="hidden lg:inline"> · dni w krajach</span>
        </span>
        <span className="flex-none">z trasy</span>
      </div>

      <div className="flex h-3 gap-0.5 overflow-hidden rounded-md" aria-hidden>
        {kraje.map((k) => (
          <span key={k.kraj} style={{ width: `${k.udzial}%`, background: k.kolor }} />
        ))}
      </div>

      <div className="mt-1 flex flex-col border-t border-line">
        {kraje.map((k, i) => (
          <div
            key={k.kraj}
            className={`flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1 py-2.5 ${
              i < kraje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span>{k.kraj}</span>
            <span className="flex flex-wrap items-center justify-end gap-2.5">
              {k.poprawione && <span className="text-muted line-through">{k.poprawione}</span>}
              <b className={k.poprawione ? '' : 'font-normal'}>{k.dni}</b>
              {k.poprawione && (
                <span className="rounded-full bg-mist px-2 py-[3px] text-[11px] text-muted lg:text-[12px]">
                  poprawione ręcznie · „nocleg za granicą”
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
