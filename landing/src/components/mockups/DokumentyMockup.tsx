type Row = {
  name: string;
  who: string;
  pct: number;
  color: string;
  left: string;
  urgent?: boolean;
  /** Ostatni wiersz nie mieści się na telefonie. */
  wide?: boolean;
};

const rows: Row[] = [
  { name: 'Ubezpieczenie OC', who: 'PO 2093J', pct: 12, color: 'bg-amber', left: '9 dni', urgent: true },
  { name: 'Badania lekarskie', who: 'Tomasz L.', pct: 34, color: 'bg-blue', left: '41 dni' },
  { name: 'Przegląd techniczny', who: 'WZ 4821K', pct: 55, color: 'bg-blue', left: '88 dni' },
  { name: 'Licencja wspólnotowa', who: 'Firma', pct: 78, color: 'bg-green', left: '214 dni' },
  { name: 'Prawo jazdy', who: 'Marek W.', pct: 92, color: 'bg-green', left: '3 lata', wide: true },
];

/** Dokumenty posortowane po dniach do końca ważności. Jedyne miejsce z amber. */
export function DokumentyMockup() {
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-4 text-[12px] shadow-card lg:aspect-4/3 lg:p-7 lg:text-[13px]">
      <div className="hidden justify-between text-muted lg:flex">
        <span>Dokumenty · wrzesień</span>
        <span>posortowane po terminie</span>
      </div>

      <div data-reveal-group className="flex flex-col lg:gap-2.5">
        {rows.map((row, i) => (
          <div
            key={row.name}
            data-reveal
            className={`grid grid-cols-[1fr_70px_46px] items-center gap-2.5 py-2.5 lg:grid-cols-[1fr_130px_60px] lg:gap-3.5 lg:py-3 ${
              i < rows.length - 1 ? 'border-b border-line' : ''
            } ${row.wide ? 'hidden lg:grid' : ''}`}
          >
            <div className="min-w-0">
              <b className="block truncate">{row.name}</b>
              <div className="truncate text-muted">{row.who}</div>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-mist">
              <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }} />
            </div>
            <span className={`text-right ${row.urgent ? 'font-semibold' : ''}`}>{row.left}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto hidden text-muted lg:block">
        Przypomnienie wysłane: Tobie i Tomaszowi L. · 30 dni wcześniej
      </div>
    </div>
  );
}
