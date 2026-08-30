const costs = [
  { label: 'Paliwo', value: '− 1 486 zł' },
  { label: 'Myto', value: '− 412 zł' },
  { label: 'Dieta kierowcy', value: '− 640 zł' },
  { label: 'Amortyzacja', value: '− 318 zł' },
];

/** Karta jednego zlecenia z rozbiciem kosztów i dużą liczbą zysku. */
export function ProfitCard() {
  return (
    <div className="rounded-panel border border-white/8 bg-surface p-6 lg:p-8">
      <div className="flex items-baseline justify-between">
        <div className="text-[22px] font-semibold tracking-[-0.01em] lg:text-[28px]">
          Warszawa → Berlin
        </div>
        <div className="hidden font-mono text-caption text-paper/55 lg:block">
          ZL/2026/08/131
        </div>
      </div>

      <div className="mt-5 flex justify-between border-b border-white/8 pb-3.5 text-[15px] lg:mt-7 lg:pb-4 lg:text-body">
        <span className="text-paper/62">
          Fracht · 1 240 EUR<span className="hidden lg:inline"> · kurs 4,28</span>
        </span>
        <span className="font-semibold">5 307 zł</span>
      </div>

      <div className="mt-3.5 flex flex-col gap-2.5 text-[15px] lg:mt-4 lg:gap-3.5 lg:text-body">
        {costs.map((cost) => (
          <div key={cost.label} className="flex justify-between">
            <span className="text-paper/62">{cost.label}</span>
            <span>{cost.value}</span>
          </div>
        ))}
      </div>

      <div className="my-5 h-px bg-white/8 lg:my-6" />

      <div className="lg:flex lg:items-baseline lg:justify-between">
        <span className="block text-caption text-paper/55">Zostaje · marża 46%</span>
        <span className="block text-[44px] leading-[1.05] font-bold tracking-[-0.025em] lg:text-h1">
          2 451 zł
        </span>
      </div>
    </div>
  );
}
