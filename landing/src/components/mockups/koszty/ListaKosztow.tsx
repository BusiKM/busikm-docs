import { Chrome } from '@/components/mockups/Chrome';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

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

type Teksty = {
  chrome: string;
  filtry: readonly string[];
  sumaKrotka: string;
  suma: string;
  kolumny: { data: string; sprzedawca: string; kategoria: string; pojazd: string; zlecenie: string; kwota: string };
  koszty: Koszt[];
  stopka: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    chrome: 'app.busikm.pl · Koszty · wrzesień 2026',
    filtry: ['1–30 września ▾', 'Pojazd: wszystkie ▾', 'Kategoria: wszystkie ▾'],
    sumaKrotka: '318 · 121 840 zł',
    suma: '318 kosztów · 121 840 zł',
    kolumny: { data: 'Data', sprzedawca: 'Sprzedawca', kategoria: 'Kategoria', pojazd: 'Pojazd · kierowca', zlecenie: 'Zlecenie', kwota: 'Kwota' },
    koszty: [
      { data: '2.09', sprzedawca: 'Shell · Rotterdam', kategoria: 'Paliwo', pojazd: 'PO 2093J · Tomasz L.', zlecenie: 'Poznań → Rotterdam', kwota: '648,42 zł' },
      { data: '2.09', sprzedawca: 'OMV · Brno', kategoria: 'Paliwo', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warszawa → Mediolan', kwota: '442,12 zł' },
      { data: '2.09', sprzedawca: 'ASFINAG · A13', kategoria: 'Opłaty drogowe', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warszawa → Mediolan', kwota: '112,40 zł' },
      { data: '2.09', sprzedawca: 'Hotel Brenner Nord', kategoria: 'Hotel', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warszawa → Mediolan', kwota: '333,84 zł', tylkoDesktop: true },
      { data: '1.09', sprzedawca: 'Stena Line · Gdynia', kategoria: 'Prom', pojazd: 'GD 7710R · Piotr K.', zlecenie: 'Gdańsk → Hamburg', kwota: '1 240,00 zł', tylkoDesktop: true },
      { data: '1.09', sprzedawca: 'Leasing · rata 9/36', kategoria: 'Koszt firmowy', pojazd: 'PO 2093J', zlecenie: '—', kwota: '2 890,00 zł', bezZdjecia: true },
    ],
    stopka: 'Miniatura = zdjęcie paragonu. Klikasz i widzisz oryginał.',
  },
  en: {
    chrome: 'app.busikm.pl · Costs · September 2026',
    filtry: ['1–30 September ▾', 'Vehicle: all ▾', 'Category: all ▾'],
    sumaKrotka: '318 · PLN 121,840',
    suma: '318 costs · PLN 121,840',
    kolumny: { data: 'Date', sprzedawca: 'Merchant', kategoria: 'Category', pojazd: 'Vehicle · driver', zlecenie: 'Order', kwota: 'Amount' },
    koszty: [
      { data: '2 Sep', sprzedawca: 'Shell · Rotterdam', kategoria: 'Fuel', pojazd: 'PO 2093J · Tomasz L.', zlecenie: 'Poznań → Rotterdam', kwota: 'PLN 648.42' },
      { data: '2 Sep', sprzedawca: 'OMV · Brno', kategoria: 'Fuel', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warsaw → Milan', kwota: 'PLN 442.12' },
      { data: '2 Sep', sprzedawca: 'ASFINAG · A13', kategoria: 'Tolls', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warsaw → Milan', kwota: 'PLN 112.40' },
      { data: '2 Sep', sprzedawca: 'Hotel Brenner Nord', kategoria: 'Hotel', pojazd: 'WZ 4821K · Marek W.', zlecenie: 'Warsaw → Milan', kwota: 'PLN 333.84', tylkoDesktop: true },
      { data: '1 Sep', sprzedawca: 'Stena Line · Gdynia', kategoria: 'Ferry', pojazd: 'GD 7710R · Piotr K.', zlecenie: 'Gdańsk → Hamburg', kwota: 'PLN 1,240.00', tylkoDesktop: true },
      { data: '1 Sep', sprzedawca: 'Lease · instalment 9/36', kategoria: 'Company cost', pojazd: 'PO 2093J', zlecenie: '—', kwota: 'PLN 2,890.00', bezZdjecia: true },
    ],
    stopka: 'Thumbnail = photo of the receipt. Click it to see the original.',
  },
};

const kolumny =
  'grid grid-cols-[28px_1fr_74px] items-center gap-3 lg:grid-cols-[48px_70px_1.4fr_1fr_1fr_1fr_110px] lg:gap-3.5';

/** Koszty miesiąca z miniaturą paragonu przy każdym wierszu. */
export function ListaKosztow() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label={t.chrome} />

      <div className="flex flex-1 flex-col gap-3 p-5 text-[12px] lg:gap-3 lg:px-10 lg:py-8 lg:text-caption">
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {t.filtry.map((f, i) => (
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
            <span className="lg:hidden">{t.sumaKrotka}</span>
            <span className="hidden lg:inline">{t.suma}</span>
          </span>
        </div>

        <div className={`${kolumny} border-b border-line py-2.5 text-[12px] text-muted lg:text-[13px]`}>
          <span />
          <span className="hidden lg:block">{t.kolumny.data}</span>
          <span>{t.kolumny.sprzedawca}</span>
          <span className="hidden lg:block">{t.kolumny.kategoria}</span>
          <span className="hidden lg:block">{t.kolumny.pojazd}</span>
          <span className="hidden lg:block">{t.kolumny.zlecenie}</span>
          <span className="text-right">{t.kolumny.kwota}</span>
        </div>

        {t.koszty.map((k) => (
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
          {t.stopka}
        </div>
      </div>
    </div>
  );
}
