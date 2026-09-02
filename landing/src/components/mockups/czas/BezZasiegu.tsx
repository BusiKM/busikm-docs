/** Pasek dnia z luką w zasięgu — i dowód, że luka też się policzyła. */
export function BezZasiegu() {
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="flex flex-wrap justify-between gap-x-3 text-muted">
        <span>Marek W. · dziś</span>
        <span>tunel Brenner · brak zasięgu 12:05–12:38</span>
      </div>

      <div className="flex h-4 gap-0.5 overflow-hidden rounded-lg" aria-hidden>
        <span className="w-[38%] bg-blue" />
        <span className="w-[12%] bg-blue opacity-45" />
        <span className="w-[30%] bg-blue" />
        <span className="w-[8%] bg-ink" />
        <span className="w-[12%] bg-line" />
      </div>

      <div className="flex justify-between gap-3 text-[12px] text-muted lg:text-[13px]">
        <span>06:10</span>
        <span className="truncate">
          <span className="lg:hidden">12:05–12:38 · w telefonie</span>
          <span className="hidden lg:inline">12:05–12:38 · liczyło się w telefonie</span>
        </span>
        <span>14:20</span>
      </div>

      <div className="mt-1.5 flex flex-col border-t border-line">
        {[
          ['Jazda w tunelu', '33 min', false],
          ['Zapisane w telefonie', 'tak', true],
          ['Dosłane po powrocie sygnału', '12:39', false],
        ].map(([label, value, mocny], i) => (
          <div
            key={label as string}
            className={`flex justify-between gap-3 py-2.5 ${i < 2 ? 'border-b border-line' : ''}`}
          >
            <span>{label}</span>
            <span className={mocny ? 'font-semibold text-green-ink' : ''}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
