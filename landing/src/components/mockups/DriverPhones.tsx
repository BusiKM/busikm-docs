function TodayPhone({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-[400px] w-[200px] rounded-[36px] border border-white/10 bg-surface p-2.5 shadow-phone lg:h-[480px] lg:w-[240px] lg:p-3 ${className}`}
    >
      <div className="flex h-full w-full flex-col gap-2.5 rounded-[28px] bg-ink p-4 lg:gap-3 lg:rounded-[26px] lg:p-[18px]">
        <div className="text-[15px] font-semibold lg:text-body">Dziś</div>
        <div className="rounded-card bg-surface p-3 lg:p-3.5">
          <div className="text-[15px] font-semibold">Warszawa → Berlin</div>
          <div className="mt-0.5 text-caption text-paper/55 lg:mt-1">
            06:20 · 574 km
          </div>
        </div>
        <div className="rounded-card bg-surface p-3 lg:p-3.5">
          <div className="text-[15px] font-semibold">Berlin → Hamburg</div>
          <div className="mt-0.5 text-caption text-paper/55 lg:mt-1">
            jutro · 288 km
          </div>
        </div>
        <div className="mt-auto flex h-[46px] items-center justify-center rounded-btn bg-blue text-body font-semibold lg:h-12">
          Rusz w trasę
        </div>
      </div>
    </div>
  );
}

function RoutePhone() {
  return (
    <div className="h-[480px] w-[240px] rotate-[4deg] rounded-[36px] border border-white/10 bg-surface p-3 shadow-phone">
      <div className="flex h-full w-full flex-col gap-3 rounded-[26px] bg-ink p-[18px]">
        <div className="text-caption text-paper/55">W trasie · 3:15 jazdy</div>
        <svg viewBox="0 0 180 220" className="w-full">
          <polyline
            points="20,200 50,150 92,140 120,80 160,30"
            fill="none"
            stroke="#0B5FFF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="20" cy="200" r="5" fill="#0B5FFF" />
          <circle cx="160" cy="30" r="5" fill="#FAFAFA" />
        </svg>
        <div className="mt-auto flex flex-col gap-2.5">
          <div className="flex h-11 items-center justify-center rounded-btn border border-white/22 text-[15px]">
            Zdjęcie licznika
          </div>
          <div className="flex h-11 items-center justify-center rounded-btn border border-white/22 text-[15px]">
            Paragon
          </div>
        </div>
      </div>
    </div>
  );
}

/** Dwa telefony pod lekkim kątem — lista zleceń i ekran trasy. */
export function DriverPhones() {
  return (
    <div className="flex items-end justify-center gap-6 py-0 lg:py-10">
      <TodayPhone className="lg:-rotate-[4deg]" />
      <div className="hidden lg:block">
        <RoutePhone />
      </div>
    </div>
  );
}
