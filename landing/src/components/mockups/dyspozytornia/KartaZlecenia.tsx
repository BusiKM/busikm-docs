const wiersze = [
  ['Zleceniodawca', 'Alpina Logistics'],
  ['Stawka', '3 900 €'],
  ['Załadunek', '2.09 · 06:00'],
  ['Rozładunek', '3.09 · 08:00'],
  ['Ładunek', '8 palet · 1 240 kg'],
  ['Kierowca · pojazd', 'Marek W. · WZ 4821K'],
] as const;

const etapy = ['przyjęte', 'w drodze', 'rozładunek', 'dostarczone'] as const;

/** Karta zlecenia z paskiem statusów u dołu. */
export function KartaZlecenia() {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 text-[12px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-muted">Zlecenie · 2026/09/041</div>
          <b className="text-[17px] lg:text-[20px]">Warszawa → Mediolan</b>
        </div>
        <span className="flex-none rounded-full bg-blue-soft px-3 py-1.5 font-semibold text-blue-dark">
          w drodze
        </span>
      </div>

      <div className="grid gap-x-6 border-t border-line pt-2 lg:grid-cols-2 lg:gap-y-2.5">
        {wiersze.map(([klucz, wartosc], i) => (
          <div
            key={klucz}
            className={`flex justify-between gap-3 py-2 ${i < 4 ? 'border-b border-line' : ''}`}
          >
            <span className="text-muted">{klucz}</span>
            <span className={klucz === 'Stawka' ? 'font-bold' : ''}>{wartosc}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          {etapy.map((etap, i) => (
            <span
              key={etap}
              className={`h-1.5 flex-1 rounded-full ${i < 2 ? 'bg-blue' : 'bg-line'}`}
            />
          ))}
        </div>
        <div className="flex justify-between text-[11px] text-muted lg:text-[12px]">
          {etapy.map((etap) => (
            <span key={etap}>{etap}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
