import { Chrome } from '@/components/mockups/Chrome';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Order = {
  route: string;
  short: string;
  rate: string;
  meta: string;
  metaShort: string;
  state: 'active' | 'plain' | 'empty';
};

type Teksty = {
  orders: Order[];
  okno: string;
  zlecenia: string;
  nowe: string;
  naMiejscu: string;
  wszystkoWazne: string;
  wiadomosci: { krotka: string; dluga: string }[];
  tankowanie: string;
  napisz: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    orders: [
      { route: 'Warszawa → Mediolan', short: 'WAW → MIL', rate: '3 900 €', meta: 'Załadunek 06:00 · Marek W. · WZ 4821K', metaShort: 'Marek W.', state: 'active' },
      { route: 'Poznań → Rotterdam', short: 'POZ → RTM', rate: '2 650 €', meta: 'W trasie · Tomasz L. · PO 2093J', metaShort: 'Tomasz L.', state: 'plain' },
      { route: 'Gdańsk → Hamburg', short: 'GDA → HAM', rate: '1 800 €', meta: 'Rozładunek 12:30 · Piotr K. · GD 7710R', metaShort: 'Piotr K.', state: 'plain' },
      { route: 'Łódź → Wiedeń', short: 'ŁDZ → VIE', rate: '4 200 zł', meta: 'Nieprzypisane · podpowiedź: Anna R.', metaShort: 'nieprzypisane', state: 'empty' },
    ],
    okno: 'Dyspozytornia · wtorek, 2 września',
    zlecenia: 'Zlecenia · 6',
    nowe: '+ Nowe',
    naMiejscu: 'Na miejscu 08:00',
    wszystkoWazne: 'wszystko ważne',
    wiadomosci: [
      { krotka: 'Ruszam 06:10.', dluga: 'Załadunek gotowy, ruszam 06:10.' },
      { krotka: 'Jedź.', dluga: 'Jedź. Rozładunek jutro 08:00.' },
    ],
    tankowanie: 'Tankowanie pod Brnem, paragon dodany.',
    napisz: 'Napisz do kierowcy…',
  },
  en: {
    orders: [
      { route: 'Warsaw → Milan', short: 'WAW → MIL', rate: '€3,900', meta: 'Loading 06:00 · Marek W. · WZ 4821K', metaShort: 'Marek W.', state: 'active' },
      { route: 'Poznań → Rotterdam', short: 'POZ → RTM', rate: '€2,650', meta: 'En route · Tomasz L. · PO 2093J', metaShort: 'Tomasz L.', state: 'plain' },
      { route: 'Gdańsk → Hamburg', short: 'GDA → HAM', rate: '€1,800', meta: 'Unloading 12:30 · Piotr K. · GD 7710R', metaShort: 'Piotr K.', state: 'plain' },
      { route: 'Łódź → Vienna', short: 'ŁDZ → VIE', rate: 'PLN 4,200', meta: 'Unassigned · suggested: Anna R.', metaShort: 'unassigned', state: 'empty' },
    ],
    okno: 'Dispatch · Tuesday, 2 September',
    zlecenia: 'Orders · 6',
    nowe: '+ New',
    naMiejscu: 'Arrives 08:00',
    wszystkoWazne: 'all documents valid',
    wiadomosci: [
      { krotka: 'Leaving 06:10.', dluga: 'Loaded, leaving at 06:10.' },
      { krotka: 'Go ahead.', dluga: 'Go ahead. Unloading tomorrow 08:00.' },
    ],
    tankowanie: 'Refuelled near Brno, receipt added.',
    napisz: 'Message the driver…',
  },
};

/** Ekran dyspozytora — zlecenia, mapa i rozmowa obok siebie. */
export function DyspozytorniaMockup() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label={t.okno} />

      <div className="grid h-[200px] grid-cols-[1fr_1.1fr_1fr] text-[11px] lg:h-[calc(100%-44px)] lg:grid-cols-[320px_1fr_300px] lg:text-[13px]">
        <div className="flex flex-col gap-1.5 border-r border-line p-2.5 lg:gap-2 lg:p-[22px]">
          <div className="mb-2 hidden justify-between text-muted lg:flex">
            <span>{t.zlecenia}</span>
            <span className="font-semibold text-blue">{t.nowe}</span>
          </div>
          {t.orders.map((o, i) => (
            <div
              key={o.route}
              className={`rounded-lg p-2 lg:rounded-[14px] lg:p-3.5 ${
                o.state === 'active'
                  ? 'border border-blue-soft-line bg-blue-soft'
                  : o.state === 'empty'
                    ? 'border border-dashed border-line'
                    : 'border border-line'
              } ${i > 2 ? 'hidden lg:block' : ''}`}
            >
              <div className="flex justify-between gap-2">
                <b className="truncate">
                  <span className="lg:hidden">{o.short}</span>
                  <span className="hidden lg:inline">{o.route}</span>
                </b>
                <span className="hidden flex-none lg:inline">{o.rate}</span>
              </div>
              <div className="mt-1 truncate text-muted">
                <span className="lg:hidden">{o.metaShort}</span>
                <span className="hidden lg:inline">{o.meta}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden bg-mist">
          <div className="absolute inset-0 hidden bg-[linear-gradient(rgba(10,10,11,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.05)_1px,transparent_1px)] bg-size-[48px_48px] lg:block" />
          <svg
            viewBox="0 0 480 400"
            preserveAspectRatio="none"
            className="absolute inset-0 size-full"
            aria-hidden
          >
            <path d="M 400 60 C 330 110, 280 160, 230 220 S 130 320, 80 350" fill="none" stroke="#0B5FFF" strokeWidth="3" />
            <path d="M 380 90 C 300 120, 250 130, 120 130" fill="none" stroke="#0B5FFF" strokeWidth="3" opacity=".5" />
            <circle cx="255" cy="190" r="7" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
            <circle cx="200" cy="130" r="7" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
            <circle cx="330" cy="105" r="7" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
          </svg>
          <div className="absolute top-[42%] left-[52%] hidden rounded-lg border border-line bg-white px-3 py-2 shadow-card lg:block">
            <b>WZ 4821K</b> · Marek W.
            <div className="text-muted">{t.naMiejscu}</div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 border-l border-line p-2.5 lg:gap-3 lg:p-[22px]">
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="hidden size-9 items-center justify-center rounded-full bg-blue-soft font-semibold text-blue-dark lg:flex">
              MW
            </span>
            <div className="min-w-0">
              <b>Marek W.</b>
              <div className="hidden truncate text-muted lg:block">
                WZ 4821K · {t.wszystkoWazne} <span className="text-green-ink">●</span>
              </div>
            </div>
          </div>

          <div className="mt-1 flex flex-1 flex-col gap-1.5 lg:mt-2 lg:gap-2">
            <div className="max-w-[85%] self-start rounded-lg bg-mist p-1.5 lg:rounded-xl lg:px-3 lg:py-2.5">
              <span className="lg:hidden">{t.wiadomosci[0].krotka}</span>
              <span className="hidden lg:inline">{t.wiadomosci[0].dluga}</span>
            </div>
            <div className="max-w-[85%] self-end rounded-lg bg-blue p-1.5 text-white lg:rounded-xl lg:px-3 lg:py-2.5">
              <span className="lg:hidden">{t.wiadomosci[1].krotka}</span>
              <span className="hidden lg:inline">{t.wiadomosci[1].dluga}</span>
            </div>
            <div className="hidden max-w-[85%] self-start rounded-xl bg-mist px-3 py-2.5 lg:block">
              {t.tankowanie}
            </div>
          </div>

          <div className="hidden rounded-xl border border-line px-3.5 py-2.5 text-muted lg:block">
            {t.napisz}
          </div>
        </div>
      </div>
    </div>
  );
}
