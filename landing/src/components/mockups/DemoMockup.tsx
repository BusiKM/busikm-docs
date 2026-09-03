import { Chrome } from '@/components/mockups/Chrome';

const role = ['Właściciel', 'Dyspozytor', 'Księgowa'] as const;
const menu = ['Pulpit', 'Zlecenia', 'Mapa', 'Koszty'] as const;

const liczby = [
  ['Przychód', '184 320 zł', false],
  ['Koszty', '121 840 zł', false],
  ['Zysk', '62 480 zł', true],
] as const;

const zlecenia = [
  ['WAW → MIL', 'w trasie', 'text-blue'],
  ['POZ → RTM', 'załadunek', ''],
  ['GDA → HAM', 'rozliczone', 'text-green-ink'],
] as const;

/**
 * Demo od środka: pasek „to demo", przełącznik roli i pulpit właściciela.
 *
 * Przełącznik roli jest tu najważniejszy — to on w minutę pokazuje trzy różne
 * stanowiska pracy, i to on jest głównym argumentem strony `/demo`.
 */
export function DemoMockup() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white text-[11px] shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label="demo.busikm.pl · Trans-Bus Kowalski" />

      <div className="flex items-center justify-between gap-3 bg-blue-soft px-3.5 py-1.5 font-medium text-blue">
        <span className="truncate">
          <span className="lg:hidden">To demo. Dane resetują się co noc.</span>
          <span className="hidden lg:inline">
            To demo z przykładową firmą. Dane wracają do porządku każdej nocy.
          </span>
        </span>
        <span className="flex-none text-muted">tylko do odczytu</span>
      </div>

      <div className="grid flex-1 grid-cols-[92px_1fr] lg:grid-cols-[150px_1fr]">
        <div className="flex flex-col gap-1.5 overflow-hidden border-r border-line p-2.5 lg:p-3">
          <div className="px-2.5 text-[10px] tracking-[0.08em] text-muted uppercase">Widok</div>
          <div className="flex flex-col gap-0.5 font-semibold">
            {role.map((r, i) => (
              <span
                key={r}
                className={`rounded-[7px] px-2.5 py-1.5 ${
                  i === 0 ? 'bg-ink text-paper' : 'text-muted'
                }`}
              >
                {r}
              </span>
            ))}
          </div>
          <div aria-hidden className="my-1 h-px bg-line" />
          {menu.map((m, i) => (
            <span
              key={m}
              className={`rounded-lg px-2.5 py-1 ${
                i === 0 ? 'bg-blue-soft font-semibold text-blue-dark' : 'text-muted'
              }`}
            >
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-3 p-3.5 lg:p-4.5">
          <div className="grid grid-cols-3 gap-2">
            {liczby.map(([label, value, mocna]) => (
              <div
                key={label as string}
                className={`rounded-[10px] border border-line p-2.5 ${mocna ? 'bg-mist' : ''}`}
              >
                <div className="text-muted">{label}</div>
                <b className="text-[13px] lg:text-[15px]">{value}</b>
              </div>
            ))}
          </div>

          <div className="grid flex-1 grid-cols-[1.3fr_1fr] gap-2">
            <div className="relative overflow-hidden rounded-[10px] bg-mist">
              <svg
                viewBox="0 0 300 160"
                preserveAspectRatio="none"
                className="size-full"
                aria-hidden
              >
                <path
                  d="M 250 20 C 200 50, 150 80, 110 100 S 50 140, 30 150"
                  fill="none"
                  stroke="#0B5FFF"
                  strokeWidth="3"
                />
                <circle cx="130" cy="90" r="5" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
              </svg>
              <div className="absolute top-2 left-2 rounded-md border border-line bg-white px-2 py-1 font-semibold">
                Warszawa → Mediolan
              </div>
            </div>

            <div className="flex flex-col gap-1.5 rounded-[10px] border border-line p-2.5">
              <div className="text-muted">Zlecenia dziś</div>
              {zlecenia.map(([trasa, stan, kolor]) => (
                <div key={trasa} className="flex justify-between gap-2">
                  <span>{trasa}</span>
                  <span className={kolor}>{stan}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
