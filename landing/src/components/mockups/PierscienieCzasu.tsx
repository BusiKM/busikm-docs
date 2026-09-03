const rings = [
  { value: '6:07', of: 'z 9:00', label: 'Jazda', gradient: 'conic-gradient(#0B5FFF 0 68%, #26262B 68% 100%)' },
  { value: '0:40', of: 'do przerwy', label: 'Przerwa', gradient: 'conic-gradient(#FAFAFA 0 85%, #26262B 85% 100%)' },
  { value: '11:00', of: 'wykonany', label: 'Odpoczynek', gradient: 'conic-gradient(#30D158 0 100%, #26262B 100% 100%)' },
] as const;

const drivers = [
  { who: 'Marek W.', vehicle: 'WZ 4821K', state: 'przerwa za 40 min', tone: 'text-ink-muted' },
  { who: 'Tomasz L.', vehicle: 'PO 2093J', state: 'w normie', tone: 'text-green' },
  { who: 'Piotr K.', vehicle: 'GD 7710R', state: 'odpoczynek', tone: 'text-ink-muted' },
] as const;

/** Jazda, przerwa, odpoczynek — liczniki i lista kierowców. */
export function PierscienieCzasu() {
  return (
    <div className="flex flex-col gap-5 rounded-card border border-line-dark bg-surface text-paper p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:gap-7 lg:p-8 lg:text-[13px]">
      <div className="hidden justify-between text-ink-muted lg:flex">
        <span>Marek W. · WZ 4821K</span>
        <span>dziś, 14:20</span>
      </div>

      <div className="grid grid-cols-3 gap-2 lg:gap-4">
        {rings.map((ring) => (
          <div key={ring.label} className="flex flex-col items-center gap-2 lg:gap-3">
            <div
              className="flex size-20 items-center justify-center rounded-full lg:size-30"
              style={{ background: ring.gradient }}
            >
              <div className="flex size-[62px] flex-col items-center justify-center rounded-full bg-surface lg:size-24">
                <b className="text-[14px] lg:text-[20px]">{ring.value}</b>
                <span className="hidden text-[11px] text-ink-muted lg:block">{ring.of}</span>
              </div>
            </div>
            <span className="text-ink-muted">{ring.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1.5 lg:gap-2">
        {drivers.map((d) => (
          <div
            key={d.who}
            className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2 lg:rounded-[10px] lg:px-3 lg:py-2.5"
          >
            <span className="truncate">
              {d.who}
              <span className="hidden lg:inline"> · {d.vehicle}</span>
            </span>
            <span className={`flex-none ${d.tone}`}>{d.state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
