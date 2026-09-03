const okresy = ['7 dni', '14 dni', '30 dni', '60 dni', '90 dni'] as const;

/** Ile dni wcześniej przypomnieć — z osią czasu pod spodem. */
export function UstawPrzypomnienie() {
  return (
    <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <b className="text-[16px] lg:text-[18px]">Przypominaj wcześniej</b>
        <span className="text-muted">Ubezpieczenie OC · PO 2093J</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {okresy.map((o) => (
          <span
            key={o}
            className={`rounded-full px-3.5 py-2.5 lg:px-4 ${
              o === '30 dni'
                ? 'bg-ink font-semibold text-paper'
                : 'border border-line text-muted'
            }`}
          >
            {o}
          </span>
        ))}
      </div>

      <div className="relative mt-2 h-14" aria-hidden>
        <div className="absolute inset-x-0 top-6.5 h-1 rounded-[2px] bg-mist" />
        <div className="absolute top-6.5 left-0 h-1 w-[72%] rounded-[2px] bg-blue" />
        <div className="absolute top-0 left-0 text-[12px] text-muted">dziś</div>
        <div className="absolute top-5 left-[calc(72%-6px)] size-4 rounded-full border-[3px] border-blue bg-white" />
        <div className="absolute top-10 left-[calc(72%-40px)] text-[12px] font-semibold whitespace-nowrap">
          przypomnienie · 30 dni przed
        </div>
        <div className="absolute top-0 right-0 text-[12px] text-muted">termin · 12.10</div>
      </div>

      <div className="flex flex-col border-t border-line pt-2">
        {[
          'Mail do Ciebie',
          'Powiadomienie w aplikacji',
          'Drugie przypomnienie · 7 dni przed',
        ].map((co, i) => (
          <div
            key={co}
            className={`flex justify-between gap-3 py-2.5 ${i < 2 ? 'border-b border-line' : ''}`}
          >
            <span>{co}</span>
            <span className="flex-none font-semibold text-green-ink">włączone</span>
          </div>
        ))}
      </div>
    </div>
  );
}
