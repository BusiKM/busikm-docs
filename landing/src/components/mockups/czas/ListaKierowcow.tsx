type Kierowca = {
  kto: string;
  co: string;
  krotki: string;
  stan: string;
  tone?: 'muted' | 'green';
  tylkoDesktop?: boolean;
};

const kierowcy: Kierowca[] = [
  { kto: 'Marek W.', co: 'WZ 4821K · jazda 6:07', krotki: 'jazda 6:07', stan: 'jedzie' },
  { kto: 'Tomasz L.', co: 'PO 2093J · jazda 3:20', krotki: 'jazda 3:20', stan: 'jedzie' },
  { kto: 'Jan S.', co: 'KR 5512M · od 14:05', krotki: 'od 14:05', stan: 'na przerwie', tone: 'muted' },
  { kto: 'Piotr K.', co: 'GD 7710R · do 05:30', krotki: 'do 05:30', stan: 'odpoczywa', tone: 'muted' },
  { kto: 'Anna R.', co: 'baza Kraków', krotki: 'Kraków', stan: 'dostępna', tone: 'green' },
  { kto: 'Ołeh K.', co: 'baza Warszawa', krotki: 'Warszawa', stan: 'dostępny', tone: 'green', tylkoDesktop: true },
];

const tony = { muted: 'text-muted', green: 'text-green-ink' } as const;

/** Wszyscy kierowcy ze statusem na jednym ekranie. */
export function ListaKierowcow() {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-line bg-white p-5 text-[13px] shadow-card lg:p-7 lg:text-caption">
      <div className="mb-1 flex justify-between gap-3 text-muted">
        <span>
          Kierowcy · <span className="hidden lg:inline">dziś </span>14:20
        </span>
        <span className="flex-none">9 osób</span>
      </div>

      {kierowcy.map((k) => (
        <div
          key={k.kto}
          className={`grid grid-cols-[1fr_auto] items-center gap-3 rounded-btn bg-mist px-3.5 py-3 lg:grid-cols-[1fr_1fr_112px] ${
            k.tylkoDesktop ? 'hidden lg:grid' : ''
          }`}
        >
          <b className="truncate">{k.kto}</b>
          <span className="truncate text-right text-muted lg:text-left">
            <span className="lg:hidden">{k.krotki}</span>
            <span className="hidden lg:inline">{k.co}</span>
          </span>
          <span
            className={`col-span-2 font-semibold lg:col-span-1 lg:text-right ${
              k.tone ? tony[k.tone] : ''
            }`}
          >
            {k.stan}
          </span>
        </div>
      ))}
    </div>
  );
}
