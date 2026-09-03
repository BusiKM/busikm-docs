import { Chrome } from '@/components/mockups/Chrome';

const orders = [
  { route: 'Warszawa → Mediolan', short: 'WAW → MIL', rate: '3 900 €', meta: 'Załadunek 06:00 · Marek W. · WZ 4821K', metaShort: 'Marek W.', state: 'active' },
  { route: 'Poznań → Rotterdam', short: 'POZ → RTM', rate: '2 650 €', meta: 'W trasie · Tomasz L. · PO 2093J', metaShort: 'Tomasz L.', state: 'plain' },
  { route: 'Gdańsk → Hamburg', short: 'GDA → HAM', rate: '1 800 €', meta: 'Rozładunek 12:30 · Piotr K. · GD 7710R', metaShort: 'Piotr K.', state: 'plain' },
  { route: 'Łódź → Wiedeń', short: 'ŁDZ → VIE', rate: '4 200 zł', meta: 'Nieprzypisane · podpowiedź: Anna R.', metaShort: 'nieprzypisane', state: 'empty' },
] as const;

/** Ekran dyspozytora — zlecenia, mapa i rozmowa obok siebie. */
export function DyspozytorniaMockup() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label="Dyspozytornia · wtorek, 2 września" />

      <div className="grid h-[200px] grid-cols-[1fr_1.1fr_1fr] text-[11px] lg:h-[calc(100%-44px)] lg:grid-cols-[320px_1fr_300px] lg:text-[13px]">
        <div className="flex flex-col gap-1.5 border-r border-line p-2.5 lg:gap-2 lg:p-[22px]">
          <div className="mb-2 hidden justify-between text-muted lg:flex">
            <span>Zlecenia · 6</span>
            <span className="font-semibold text-blue">+ Nowe</span>
          </div>
          {orders.map((o, i) => (
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
            <div className="text-muted">Na miejscu 08:00</div>
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
                WZ 4821K · wszystko ważne <span className="text-green-ink">●</span>
              </div>
            </div>
          </div>

          <div className="mt-1 flex flex-1 flex-col gap-1.5 lg:mt-2 lg:gap-2">
            <div className="max-w-[85%] self-start rounded-lg bg-mist p-1.5 lg:rounded-xl lg:px-3 lg:py-2.5">
              <span className="lg:hidden">Ruszam 06:10.</span>
              <span className="hidden lg:inline">Załadunek gotowy, ruszam 06:10.</span>
            </div>
            <div className="max-w-[85%] self-end rounded-lg bg-blue p-1.5 text-white lg:rounded-xl lg:px-3 lg:py-2.5">
              <span className="lg:hidden">Jedź.</span>
              <span className="hidden lg:inline">Jedź. Rozładunek jutro 08:00.</span>
            </div>
            <div className="hidden max-w-[85%] self-start rounded-xl bg-mist px-3 py-2.5 lg:block">
              Tankowanie pod Brnem, paragon dodany.
            </div>
          </div>

          <div className="hidden rounded-xl border border-line px-3.5 py-2.5 text-muted lg:block">
            Napisz do kierowcy…
          </div>
        </div>
      </div>
    </div>
  );
}
