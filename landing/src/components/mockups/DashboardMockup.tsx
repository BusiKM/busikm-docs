function Tile({
  label,
  value,
  className = '',
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-card bg-mist p-3.5 lg:p-4 ${className}`}>
      <div className="text-caption text-muted">{label}</div>
      <div className="mt-0.5 text-[22px] font-semibold tracking-[-0.01em] lg:mt-1 lg:text-[28px]">
        {value}
      </div>
    </div>
  );
}

/** Pulpit właściciela — bohater sekcji hero. */
export function DashboardMockup() {
  return (
    <div className="rounded-panel border border-line bg-white p-4 text-left shadow-hero lg:p-7">
      <div className="grid gap-2.5 lg:grid-cols-[1.35fr_1fr] lg:gap-6">
        <div className="flex flex-col rounded-card bg-mist p-4 lg:min-h-[300px] lg:p-5">
          <div className="text-caption text-muted">
            Trasa w toku · Warszawa → Berlin
          </div>
          <svg viewBox="0 0 420 200" className="mt-2 w-full flex-1 lg:mt-3">
            <polyline
              points="30,160 90,130 150,138 220,92 300,74 390,40"
              fill="none"
              stroke="#0B5FFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="30" cy="160" r="6" fill="#0B5FFF" />
            <circle cx="220" cy="92" r="5" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
            <circle cx="390" cy="40" r="6" fill="#0A0A0B" />
          </svg>
          <div className="hidden justify-between text-caption text-muted lg:flex">
            <span>06:20 start</span>
            <span>412 km</span>
          </div>
        </div>

        <div className="flex flex-col gap-2.5 lg:gap-3">
          <div className="grid grid-cols-2 gap-2.5 lg:gap-3">
            <Tile label="Kilometry" value="18 420" />
            <Tile label="Zlecenia" value="31" className="hidden lg:block" />
            <Tile label="Zostaje" value="42 180 zł" className="lg:hidden" />
          </div>
          <Tile
            label="Zostaje w tym miesiącu"
            value="42 180 zł"
            className="hidden lg:block"
          />
          <div className="flex-1 rounded-card bg-mist p-3.5 lg:p-4">
            <div className="mb-2 text-caption text-muted lg:mb-2.5">
              Ostatnie zlecenia
            </div>
            <div className="flex flex-col gap-2 text-[15px] lg:gap-2.5">
              <div className="flex justify-between">
                <span>Poznań → Hamburg</span>
                <span className="text-green">gotowe</span>
              </div>
              <div className="hidden justify-between lg:flex">
                <span>Łódź → Praga</span>
                <span className="text-green">gotowe</span>
              </div>
              <div className="flex justify-between">
                <span>Warszawa → Berlin</span>
                <span className="text-muted">w drodze</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
