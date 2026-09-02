const pozycje = [
  { co: 'Sprzedaż · 42 faktury', stan: 'komplet' },
  { co: 'Zakupy · 37 faktur', stan: 'komplet' },
  {
    co: 'Koszty · 318 paragonów',
    opis: '3 paragony bez zlecenia · Tomasz L., 14–16.08',
    stan: 'brak',
  },
  {
    co: 'Delegacje · 9 kierowców',
    opis: '1 kurs bez potwierdzonego rozładunku',
    stan: 'brak',
  },
  { co: 'Czas pracy · 9 kierowców', stan: 'komplet' },
] as const;

/** Sprawdzenie kompletności przed pobraniem. Bez czerwieni. */
export function Walidacja() {
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">Sprawdzenie przed pobraniem</b>
        <span className="flex-none text-muted">sierpień 2026</span>
      </div>

      <div className="flex flex-col border-t border-line">
        {pozycje.map((p, i) => (
          <div
            key={p.co}
            className={`flex items-center justify-between gap-4 py-3 ${
              i < pozycje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <div className="min-w-0">
              <span>{p.co}</span>
              {'opis' in p && (
                <div className="text-[12px] text-muted lg:text-[13px]">{p.opis}</div>
              )}
            </div>
            {p.stan === 'komplet' ? (
              <span className="flex-none font-semibold text-green-ink">komplet</span>
            ) : (
              <span className="flex-none rounded-full bg-mist px-2.5 py-1.5 font-semibold whitespace-nowrap">
                do uzupełnienia
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-muted">7 z 9 gotowe</span>
        <span className="rounded-[10px] border border-line px-4 py-2.5 font-semibold">
          Pokaż braki
        </span>
      </div>
    </div>
  );
}
