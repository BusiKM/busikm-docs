const rows = [
  { date: '04.08', route: 'Warszawa → Berlin', purpose: 'Przewóz', odometer: '184 210', km: '574' },
  { date: '06.08', route: 'Berlin → Hamburg', purpose: 'Przewóz', odometer: '184 498', km: '288' },
  { date: '09.08', route: 'Hamburg → Poznań', purpose: 'Przewóz', odometer: '185 121', km: '623' },
  { date: '12.08', route: 'Poznań → Praga', purpose: 'Przewóz', odometer: '185 553', km: '432' },
];

const grid = 'grid grid-cols-[84px_1.5fr_1fr_88px_76px] gap-2';

/** Kilometrówka za miesiąc — tabela z przyciskiem „Pobierz PDF". */
export function MileageTable() {
  return (
    <div className="rounded-panel border border-line bg-white p-5 shadow-card lg:p-7">
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-semibold lg:text-body">
          Kilometrówka · sierpień 2026
        </div>
        <div className="hidden h-9 items-center rounded-btn bg-blue px-4 text-caption font-semibold text-white lg:inline-flex">
          Pobierz PDF
        </div>
      </div>

      {/* desktop — pełna tabela */}
      <div className="hidden lg:block">
        <div className={`${grid} border-b border-line pt-5 pb-2.5 text-caption text-muted`}>
          <div>Data</div>
          <div>Trasa</div>
          <div>Cel</div>
          <div>Licznik</div>
          <div>km</div>
        </div>
        {rows.map((row, i) => (
          <div
            key={row.date}
            className={`${grid} py-3.5 text-[15px] ${
              i < rows.length - 1 ? 'border-b border-mist' : ''
            }`}
          >
            <div className="text-muted">{row.date}</div>
            <div>{row.route}</div>
            <div>{row.purpose}</div>
            <div>{row.odometer}</div>
            <div>{row.km}</div>
          </div>
        ))}
      </div>

      {/* mobile — skrócona lista */}
      <div className="mt-3 flex flex-col lg:hidden">
        {rows.slice(0, 3).map((row) => (
          <div
            key={row.date}
            className="flex justify-between border-t border-mist py-2.5 text-[15px]"
          >
            <span>
              {row.date} · {row.route}
            </span>
            <span>{row.km}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3.5 lg:mt-3.5 lg:pt-[18px]">
        <span className="text-caption text-muted">
          Razem<span className="hidden lg:inline"> w miesiącu</span>
        </span>
        <span className="text-[22px] font-semibold tracking-[-0.01em] lg:text-[28px]">
          4 118 km
        </span>
      </div>

      <div className="mt-4 flex h-11 items-center justify-center rounded-btn bg-blue text-[15px] font-semibold text-white lg:hidden">
        Pobierz PDF
      </div>
    </div>
  );
}
