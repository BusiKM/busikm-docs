type Przejazd = {
  data: string;
  trasa: string;
  skrot: string;
  kto: string;
  km: string;
  czas: string;
  tylkoDesktop?: boolean;
};

const przejazdy: Przejazd[] = [
  { data: '2.09', trasa: 'Warszawa → Mediolan', skrot: 'WAW → MIL', kto: 'Marek W. · WZ 4821K', km: '1 640', czas: '19:40' },
  { data: '1.09', trasa: 'Poznań → Rotterdam', skrot: 'POZ → RTM', kto: 'Tomasz L. · PO 2093J', km: '1 120', czas: '13:15' },
  { data: '1.09', trasa: 'Gdańsk → Hamburg', skrot: 'GDA → HAM', kto: 'Piotr K. · GD 7710R', km: '680', czas: '8:05' },
  { data: '31.08', trasa: 'Mediolan → serwis Bergamo', skrot: 'MIL → serwis', kto: 'Marek W. · WZ 4821K', km: '48', czas: '0:55' },
  { data: '30.08', trasa: 'Kraków → Wiedeń', skrot: 'KRK → VIE', kto: 'Anna R. · KR 5512M', km: '420', czas: '5:30', tylkoDesktop: true },
];

/**
 * Kolumny: data, trasa, km, czas. Kierowca i pojazd idą pod trasę — osobną
 * kolumną w karcie 4:3 na pół szerokości ucinały się do „Marek W. · WZ 4…".
 */
const kolumny = 'grid grid-cols-[44px_1fr_52px_52px] gap-2.5 lg:grid-cols-[60px_1fr_64px_60px]';

/** Historia przejazdów z filtrami — także tych bez zlecenia. */
export function ListaTras() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line-dark bg-surface text-paper p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">Trasy · wrzesień</b>
        <span className="flex-none text-ink-muted">
          <span className="lg:hidden">38 · 21 460 km</span>
          <span className="hidden lg:inline">38 przejazdów · 21 460 km</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {['1–30 września ▾', 'Kierowca: wszyscy ▾', 'Pojazd: wszystkie ▾'].map((f, i) => (
          <span
            key={f}
            className={`rounded-full border border-line-dark bg-surface-2 px-3 py-1.5 ${
              i > 0 ? 'hidden lg:inline' : ''
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      <div className={`${kolumny} border-b border-line-dark py-2.5 text-ink-muted`}>
        <span>Data</span>
        <span>Trasa · kierowca</span>
        <span className="text-right">km</span>
        <span className="text-right">Czas</span>
      </div>

      {przejazdy.map((p) => (
        <div
          key={p.trasa}
          className={`${kolumny} items-center border-b border-line-dark py-2 lg:py-2.5 ${
            p.tylkoDesktop ? 'hidden lg:grid' : ''
          }`}
        >
          <span className="text-ink-muted">{p.data}</span>
          <div className="min-w-0">
            <b className="block truncate">
              <span className="lg:hidden">{p.skrot}</span>
              <span className="hidden lg:inline">{p.trasa}</span>
            </b>
            <span className="block truncate text-[11px] text-ink-muted lg:text-[12px]">
              {p.kto}
            </span>
          </div>
          <span className="text-right">{p.km}</span>
          <span className="text-right">{p.czas}</span>
        </div>
      ))}

      <div className="mt-auto flex justify-between gap-4 pt-1 text-ink-muted">
        <span className="hidden lg:block">Postoje dłuższe niż 15 min zaznaczone na trasie</span>
        <span className="lg:hidden">Postoje zaznaczone</span>
        <span className="flex-none">eksport do arkusza</span>
      </div>
    </div>
  );
}
