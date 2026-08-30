const stages = ['Przyjęte', 'W drodze', 'Rozładunek', 'Dostarczone'];

/** Kartka zlecenia ze statusami jako oś pozioma. */
export function OrderCard() {
  return (
    <div className="rounded-panel border border-line bg-white p-5 shadow-card lg:p-8">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-mono text-[13px] text-muted lg:text-caption">
            ZL/2026/08/144
          </div>
          <div className="mt-1 text-[22px] font-semibold tracking-[-0.01em] lg:mt-1.5 lg:text-[28px]">
            Poznań → Hamburg
          </div>
        </div>
        <div className="hidden text-right text-caption text-muted lg:block">
          Marek W.
          <br />
          WZ 4821K
        </div>
      </div>

      <div className="relative mt-7 lg:mt-10">
        <div className="absolute top-1 right-[5px] left-[5px] h-0.5 bg-line lg:top-[5px] lg:right-1.5 lg:left-1.5" />
        <div className="absolute top-1 left-[5px] h-0.5 w-[62%] bg-green lg:top-[5px] lg:left-1.5" />
        <div className="relative flex justify-between">
          {stages.map((stage, i) => (
            <div
              key={stage}
              className={`h-2.5 w-2.5 rounded-full lg:h-3 lg:w-3 ${
                i < 3 ? 'bg-green' : 'bg-line'
              }`}
            />
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[13px] lg:mt-3.5 lg:text-caption">
          {stages.map((stage, i) => (
            <span
              key={stage}
              className={
                i === 2 ? 'font-semibold' : i === 3 ? 'text-muted' : undefined
              }
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-9 hidden grid-cols-3 gap-3 lg:grid">
        <div className="rounded-card bg-mist p-4">
          <div className="text-caption text-muted">CMR</div>
          <div className="mt-1 text-[15px] font-semibold text-green">podpisany</div>
        </div>
        <div className="rounded-card bg-mist p-4">
          <div className="text-caption text-muted">Fracht</div>
          <div className="mt-1 text-[15px] font-semibold">1 850 EUR</div>
        </div>
        <div className="rounded-card bg-mist p-4">
          <div className="text-caption text-muted">Faktura</div>
          <div className="mt-1 text-[15px] font-semibold text-muted">w kolejce</div>
        </div>
      </div>
    </div>
  );
}
