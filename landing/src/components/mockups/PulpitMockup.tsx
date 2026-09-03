import { Chrome } from '@/components/mockups/Chrome';

const kpi = [
  { label: 'Przychód · wrzesień', value: '184 320 zł', short: '184 320', strong: false },
  { label: 'Koszty', value: '121 840 zł', short: '121 840', strong: false },
  { label: 'Zysk', value: '62 480 zł', short: '62 480', strong: true },
];

const orders = [
  { route: 'Warszawa → Mediolan', who: 'WZ 4821K · Marek W.', status: 'W trasie', tone: 'blue' },
  { route: 'Poznań → Rotterdam', who: 'PO 2093J · Tomasz L.', status: 'Załadunek', tone: 'mist' },
  { route: 'Gdańsk → Hamburg', who: 'GD 7710R · Piotr K.', status: 'Rozliczone', tone: 'green' },
] as const;

const tones = {
  blue: 'bg-blue-soft text-blue-dark',
  mist: 'bg-mist text-ink',
  green: 'bg-green/14 text-green-ink',
} as const;

/** Pulpit właściciela — bohater sekcji hero. */
export function PulpitMockup() {
  return (
    <div className="overflow-hidden rounded-card border border-line bg-white shadow-hero lg:aspect-16/10 lg:rounded-panel">
      <Chrome label="app.busikm.pl · Pulpit · wrzesień 2026" />

      <div className="grid h-[calc(100%-44px)] lg:grid-cols-[200px_1fr]">
        <div className="hidden flex-col gap-1.5 border-r border-line px-4 py-6 text-caption text-muted lg:flex">
          {['Pulpit', 'Zlecenia', 'Mapa', 'Kierowcy', 'Pojazdy', 'Koszty', 'Faktury', 'Księgowa'].map(
            (item, i) => (
              <div
                key={item}
                className={`rounded-[10px] px-3 py-2 ${
                  i === 0 ? 'bg-blue-soft font-semibold text-blue-dark' : ''
                }`}
              >
                {item}
              </div>
            ),
          )}
        </div>

        <div className="flex flex-col gap-3 p-4 text-[12px] lg:gap-6 lg:px-8 lg:py-7">
          <div className="text-muted lg:hidden">Pulpit · wrzesień 2026</div>

          <div className="grid grid-cols-3 gap-2 lg:gap-4">
            {kpi.map((k) => (
              <div
                key={k.label}
                className={`rounded-btn border border-line p-2.5 lg:rounded-card lg:px-[22px] lg:py-5 ${
                  k.strong ? 'bg-mist' : ''
                }`}
              >
                <div className="text-[10px] text-muted lg:text-[13px]">{k.label}</div>
                <div
                  className={`mt-1 text-[14px] tracking-[-0.02em] lg:mt-2 lg:text-[32px] ${
                    k.strong ? 'font-bold' : 'font-semibold'
                  }`}
                >
                  <span className="lg:hidden">{k.short}</span>
                  <span className="hidden lg:inline">{k.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid flex-1 gap-3 lg:grid-cols-[1.3fr_1fr] lg:gap-4">
            <div className="relative h-[120px] overflow-hidden rounded-btn border border-line bg-mist lg:h-auto lg:rounded-card">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.05)_1px,transparent_1px)] bg-size-[48px_48px]" />
              <svg
                viewBox="0 0 400 260"
                preserveAspectRatio="none"
                className="absolute inset-0 size-full"
                aria-hidden
              >
                <path
                  d="M 320 40 C 260 90, 220 120, 170 150 S 90 200, 60 230"
                  fill="none"
                  stroke="#0B5FFF"
                  strokeWidth="3"
                />
                <circle cx="320" cy="40" r="6" fill="#0B5FFF" />
                <circle cx="60" cy="230" r="6" fill="#0B5FFF" />
                <circle cx="190" cy="138" r="7" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
              </svg>
              <div className="absolute top-2.5 left-2.5 rounded-md border border-line bg-white px-2 py-1 text-[11px] font-semibold lg:top-3.5 lg:left-3.5 lg:rounded-lg lg:px-2.5 lg:py-1.5 lg:text-[12px]">
                Warszawa → Mediolan
              </div>
              <div className="absolute top-[44%] left-[48%] hidden rounded-lg border border-line bg-white px-2.5 py-1.5 text-[12px] lg:block">
                <b>WZ 4821K</b> · Marek W. · 14:20
              </div>
            </div>

            <div className="flex flex-col gap-1 rounded-btn border-line text-[12px] lg:gap-3 lg:rounded-card lg:border lg:px-5 lg:py-[18px] lg:text-[13px]">
              <div className="hidden text-muted lg:block">Zlecenia dziś</div>
              {orders.map((o, i) => (
                <div
                  key={o.route}
                  className={`flex items-center justify-between gap-2 py-2 ${
                    i < orders.length - 1 ? 'border-b border-line' : ''
                  }`}
                >
                  <div className="min-w-0">
                    <b className="block truncate">{o.route}</b>
                    <div className="hidden text-muted lg:block">{o.who}</div>
                  </div>
                  <span
                    className={`flex-none rounded-full px-2 py-1 font-medium lg:px-2.5 ${tones[o.tone]}`}
                  >
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
