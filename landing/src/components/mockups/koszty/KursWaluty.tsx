/** Koszt w euro i w złotych — z kursem zapisanym przy dokumencie. */
export function KursWaluty() {
  return (
    <div className="flex flex-col gap-4 rounded-card border border-line-dark bg-surface text-paper p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">Koszt · paliwo</div>
          <b className="text-[16px] lg:text-[18px]">Shell · Rotterdam</b>
        </div>
        <span className="flex-none text-ink-muted">2.09.2026</span>
      </div>

      <div className="flex items-end gap-4 border-y border-line-dark py-4">
        <div>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">W euro</div>
          <div className="text-[26px] font-bold tracking-[-0.03em] lg:text-[36px]">151,50 €</div>
        </div>
        <span aria-hidden className="pb-1.5 text-[19px] text-ink-muted lg:text-[22px]">
          →
        </span>
        <div>
          <div className="text-[12px] text-ink-muted lg:text-[13px]">W złotych</div>
          <div className="text-[26px] font-bold tracking-[-0.03em] lg:text-[36px]">648,42 zł</div>
        </div>
      </div>

      <div className="flex flex-col">
        {[
          ['Kurs', '4,2800 zł', '4,2800 zł'],
          ['Data przeliczenia', '1.09.2026 · dzień przed dokumentem', '1.09.2026'],
          ['Zapisane przy dokumencie', 'na stałe', 'na stałe'],
        ].map(([label, value, krotki], i) => (
          <div
            key={label}
            className={`flex justify-between gap-3 py-2.5 ${
              i < 2 ? 'border-b border-line-dark' : ''
            }`}
          >
            <span className="text-ink-muted">{label}</span>
            <span className={i === 2 ? 'font-semibold text-green' : ''}>
              <span className="lg:hidden">{krotki}</span>
              <span className="hidden lg:inline">{value}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto text-[12px] text-ink-muted lg:text-[13px]">
        Nikt nie odtwarza kursu z tabeli trzy tygodnie później.
      </div>
    </div>
  );
}
