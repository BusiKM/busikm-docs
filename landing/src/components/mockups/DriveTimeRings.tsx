type RingProps = {
  value: string;
  label: string;
  labelDesktop: string;
  gradient: string;
};

function Ring({ value, label, labelDesktop, gradient }: RingProps) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5 lg:gap-3.5">
      {/* max-w trzyma 88px z projektu przy ≥390, poniżej pierścień się zwęża */}
      <div
        className="flex aspect-square w-full max-w-[88px] items-center justify-center rounded-full lg:max-w-[116px]"
        style={{ background: gradient }}
      >
        <div className="flex h-3/4 w-3/4 items-center justify-center rounded-full bg-surface text-[15px] font-semibold lg:h-[88px] lg:w-[88px] lg:text-body">
          {value}
        </div>
      </div>
      <div className="text-[13px] text-paper/55 min-[390px]:text-caption">
        <span className="lg:hidden">{label}</span>
        <span className="hidden lg:inline">{labelDesktop}</span>
      </div>
    </div>
  );
}

const track = 'rgba(255,255,255,.09)';

/** Pierścienie jazda / przerwa / odpoczynek + lista kierowców. */
export function DriveTimeRings() {
  return (
    <div className="rounded-panel border border-white/8 bg-surface p-4 min-[390px]:p-6 lg:p-8">
      <div className="flex justify-between gap-2 min-[390px]:gap-3 lg:gap-7">
        <Ring
          value="3:15"
          label="Jazda"
          labelDesktop="Jazda · limit 4:30"
          gradient={`conic-gradient(#0B5FFF 0 72%, ${track} 72% 100%)`}
        />
        <Ring
          value="45m"
          label="Przerwa"
          labelDesktop="Przerwa · odbyta"
          gradient={`conic-gradient(#30D158 0 100%, ${track} 100% 100%)`}
        />
        <Ring
          value="3:00"
          label="Odpoczynek"
          labelDesktop="Odpoczynek · z 9:00"
          gradient={`conic-gradient(#0B5FFF 0 33%, ${track} 33% 100%)`}
        />
      </div>

      <div className="mt-6 mb-[18px] h-px bg-white/8 lg:mt-8 lg:mb-6" />

      <div className="flex flex-col gap-3 text-[15px] lg:gap-4 lg:text-body">
        <div className="flex justify-between">
          <span>Marek W.</span>
          <span className="text-green">w normie</span>
        </div>
        <div className="flex justify-between">
          <span>Tomasz L.</span>
          <span className="text-amber">przerwa za 40 min</span>
        </div>
        <div className="hidden justify-between lg:flex">
          <span>Adam S.</span>
          <span className="text-paper/55">odpoczynek</span>
        </div>
      </div>
    </div>
  );
}
