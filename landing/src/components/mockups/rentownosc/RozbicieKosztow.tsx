type Pozycja = {
  label: string;
  detail?: string;
  kwota: string;
  udzial: number;
  kolor: string;
};

const pozycje: Pozycja[] = [
  { label: 'Paliwo', kwota: '612 €', udzial: 56, kolor: '#0B5FFF' },
  { label: 'Opłaty drogowe', kwota: '184 €', udzial: 17, kolor: '#0A46C0' },
  { label: 'Hotel', kwota: '78 €', udzial: 7, kolor: '#6E6E76' },
  { label: 'Dieta kierowcy', kwota: '96 €', udzial: 9, kolor: '#9A9AA2' },
  { label: 'Amortyzacja', detail: ' · 1 640 km', kwota: '131 €', udzial: 11, kolor: '#C9CBD1' },
];

/** Z czego składa się 1 101 € kosztów jednego kursu. */
export function RozbicieKosztow() {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:gap-4.5 lg:p-8 lg:text-caption">
      <div className="flex justify-between gap-3 text-muted">
        <span className="truncate">Koszty · Warszawa → Mediolan</span>
        <span className="flex-none">1 101 € razem</span>
      </div>

      <div className="flex h-3.5 gap-0.5 overflow-hidden rounded-[7px]" aria-hidden>
        {pozycje.map((p) => (
          <span
            key={p.label}
            style={{ width: `${p.udzial}%`, background: p.kolor }}
          />
        ))}
      </div>

      <div className="flex flex-col border-t border-line">
        {pozycje.map((p, i) => (
          <div
            key={p.label}
            className={`flex items-center justify-between gap-3 py-3 ${
              i < pozycje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span className="flex min-w-0 items-center gap-2.5">
              <span
                aria-hidden
                className="size-2.5 flex-none rounded-[3px]"
                style={{ background: p.kolor }}
              />
              <span className="truncate">
                {p.label}
                {p.detail && <span className="hidden lg:inline">{p.detail}</span>}
              </span>
            </span>
            <span className="flex-none">
              {p.kwota} · {p.udzial}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
