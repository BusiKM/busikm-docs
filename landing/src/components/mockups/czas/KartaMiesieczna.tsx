type Dzien = {
  dzien: string;
  trasa: string;
  skrot: string;
  jazda: string;
  praca: string;
  odp: string;
  kraje: string;
  wolne?: boolean;
  tylkoDesktop?: boolean;
};

const dni: Dzien[] = [
  { dzien: '1.08', trasa: 'Warszawa → Berlin', skrot: 'WAW → BER', jazda: '7:10', praca: '8:45', odp: '11:00', kraje: 'PL · DE' },
  { dzien: '2.08', trasa: 'Berlin → Rotterdam', skrot: 'BER → RTM', jazda: '6:40', praca: '8:10', odp: '11:30', kraje: 'DE · NL' },
  { dzien: '3.08', trasa: 'Rotterdam → Poznań', skrot: 'RTM → POZ', jazda: '8:50', praca: '9:30', odp: '9:00', kraje: 'NL · DE · PL' },
  { dzien: '4.08', trasa: 'odpoczynek tygodniowy', skrot: 'odpoczynek', jazda: '—', praca: '—', odp: '24:00', kraje: 'PL', wolne: true },
  { dzien: '5.08', trasa: 'Poznań → Wiedeń', skrot: 'POZ → VIE', jazda: '7:05', praca: '8:20', odp: '11:00', kraje: 'PL · CZ · AT', tylkoDesktop: true },
];

/* Kolumny stałe policzone pod najdłuższą wartość, żeby na trasę zostało
   miejsce — przy 56 px na godzinę wychodziło „Rotterdam → Poz…". */
const kolumny =
  'grid grid-cols-[36px_1fr_42px_46px] gap-2 lg:grid-cols-[36px_1fr_44px_44px_48px_76px]';

/** Karta czasu pracy do wydruku — jasna, bo to wydruk, nie ekran. */
export function KartaMiesieczna() {
  return (
    <div className="flex flex-col gap-2 rounded-card bg-mist p-5 text-[11px] text-ink shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-7 lg:text-[12px]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-muted">Karta czasu pracy · sierpień 2026</div>
          <b className="text-[16px] lg:text-[18px]">Marek W.</b>
        </div>
        <div className="flex-none text-right text-muted">
          WZ 4821K
          <br />
          Trans-Bus Kowalski
        </div>
      </div>

      <div className={`${kolumny} border-y border-line-strong py-2 text-muted`}>
        <span>Dzień</span>
        <span>Trasa</span>
        <span className="hidden text-right lg:block">Jazda</span>
        <span className="text-right lg:hidden">Jazda</span>
        <span className="hidden text-right lg:block">Praca</span>
        <span className="text-right">Odp.</span>
        <span className="hidden lg:block">Kraje</span>
      </div>

      {dni.map((d) => (
        <div
          key={d.dzien}
          className={`${kolumny} border-b border-line py-1.5 ${
            d.tylkoDesktop ? 'hidden lg:grid' : ''
          }`}
        >
          <span>{d.dzien}</span>
          <span className={`truncate ${d.wolne ? 'text-muted' : ''}`}>
            <span className="lg:hidden">{d.skrot}</span>
            <span className="hidden lg:inline">{d.trasa}</span>
          </span>
          <span className="text-right">{d.jazda}</span>
          <span className="hidden text-right lg:block">{d.praca}</span>
          <span className="text-right">{d.odp}</span>
          <span className="hidden truncate text-muted lg:block">{d.kraje}</span>
        </div>
      ))}

      <div className={`${kolumny} py-1.5 text-muted`}>
        <span>…</span>
        <span className="truncate">26 dni dalej</span>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-strong pt-2.5">
        <span>
          <b>Razem:</b> jazda 148:20
          <span className="hidden lg:inline"> · praca 176:05</span> · 14 dni za granicą
        </span>
        <span className="flex-none rounded-lg bg-ink px-3 py-2 font-semibold text-paper">
          Pobierz PDF
        </span>
      </div>
    </div>
  );
}
