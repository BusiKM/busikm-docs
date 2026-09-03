import { Chrome } from '@/components/mockups/Chrome';

type Koszt = {
  data: string;
  sprzedawca: string;
  kategoria: string;
  pojazd: string;
  zlecenie: string;
  kwota: string;
  /** Koszt firmowy nie ma zdjęcia — miniatura zostaje pusta. */
  bezZdjecia?: boolean;
  tylkoDesktop?: boolean;
};

const koszty: Koszt[] = [
  { data: '2.09', sprzedawca: 'Shell · Rotterdam', kategoria: 'Paliwo', pojazd: 'PO 2093J · Tomasz L.', zlecenie: 'Poznań → Rotterdam', kwota: '648,42 zł' },
  { data: '2.09', sprzedawca: 'OMV · Brno', kategoria: 'Paliwo', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warszawa → Mediolan', kwota: '442,12 zł' },
  { data: '2.09', sprzedawca: 'ASFINAG · A13', kategoria: 'Opłaty drogowe', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warszawa → Mediolan', kwota: '112,40 zł' },
  { data: '2.09', sprzedawca: 'Hotel Brenner Nord', kategoria: 'Hotel', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warszawa → Mediolan', kwota: '333,84 zł', tylkoDesktop: true },
  { data: '1.09', sprzedawca: 'Stena Line · Gdynia', kategoria: 'Prom', pojazd: 'GD 7710R · Piotr K.', zlecenie: 'Gdańsk → Hamburg', kwota: '1 240,00 zł', tylkoDesktop: true },
  { data: '1.09', sprzedawca: 'Leasing · rata 9/36', kategoria: 'Koszt firmowy', pojazd: 'PO 2093J', zlecenie: '—', kwota: '2 890,00 zł', bezZdjecia: true },
];

const kolumny =
  'grid grid-cols-[28px_1fr_74px] items-center gap-3 lg:grid-cols-[48px_70px_1.4fr_1fr_1fr_1fr_110px] lg:gap-3.5';

/** Koszty miesiąca z miniaturą paragonu przy każdym wierszu. */
export function ListaKosztow() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label="app.busikm.pl · Koszty · wrzesień 2026" />

      <div className="flex flex-1 flex-col gap-3 p-5 text-[12px] lg:gap-3 lg:px-10 lg:py-8 lg:text-caption">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {['1–30 września ▾', 'Pojazd: wszystkie ▾', 'Kategoria: wszystkie ▾'].map((f, i) => (
              <span
                key={f}
                className={`rounded-full border border-line bg-mist px-3 py-1.5 text-[12px] lg:text-[13px] ${
                  i > 0 ? 'hidden lg:inline' : ''
                }`}
              >
                {f}
              </span>
            ))}
          </div>
          <span className="flex-none text-muted">
            <span className="lg:hidden">318 · 121 840 zł</span>
            <span className="hidden lg:inline">318 kosztów · 121 840 zł</span>
          </span>
        </div>

        <div className={`${kolumny} border-b border-line py-2.5 text-[12px] text-muted lg:text-[13px]`}>
          <span />
          <span className="hidden lg:block">Data</span>
          <span>Sprzedawca</span>
          <span className="hidden lg:block">Kategoria</span>
          <span className="hidden lg:block">Pojazd · kierowca</span>
          <span className="hidden lg:block">Zlecenie</span>
          <span className="text-right">Kwota</span>
        </div>

        {koszty.map((k) => (
          <div
            key={k.sprzedawca}
            className={`${kolumny} border-b border-line pb-2.5 last:border-0 ${
              k.tylkoDesktop ? 'hidden lg:grid' : ''
            }`}
          >
            <span
              aria-hidden
              className={`h-9 w-7 rounded-[4px] lg:h-12 lg:w-10 ${
                k.bezZdjecia ? 'border border-dashed border-line' : 'border border-line bg-mist'
              }`}
            />
            <span className="hidden text-muted lg:block">{k.data}</span>
            <div className="min-w-0">
              <b className="block truncate">{k.sprzedawca}</b>
              <span className="block truncate text-muted lg:hidden">
                {k.data} · {k.kategoria}
              </span>
            </div>
            <span className="hidden truncate lg:block">{k.kategoria}</span>
            <span className="hidden truncate text-muted lg:block">{k.pojazd}</span>
            <span className="hidden truncate text-muted lg:block">{k.zlecenie}</span>
            <span className="text-right">{k.kwota}</span>
          </div>
        ))}

        <div className="mt-auto text-[12px] text-muted lg:text-[13px]">
          Miniatura = zdjęcie paragonu. Klikasz i widzisz oryginał.
        </div>
      </div>
    </div>
  );
}
