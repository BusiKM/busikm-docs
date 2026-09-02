const pozycje = [
  ['Leasing · rata 9/36', '2 890 zł'],
  ['Ubezpieczenie OC/AC · 1/12', '640 zł'],
  ['Serwis · wymiana oleju', '1 180 zł'],
  ['Paliwo z karty flotowej', '4 312 zł'],
] as const;

/** Koszty, których nikt nie fotografuje — a i tak wchodzą do marży. */
export function KosztyFirmowe() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line-dark bg-surface p-6 text-[13px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-8 lg:text-caption">
      <div className="flex justify-between gap-3 text-ink-muted">
        <span className="truncate">
          Koszty firmowe · PO 2093J<span className="hidden lg:inline"> · wrzesień</span>
        </span>
        <span className="flex-none">bez zdjęcia</span>
      </div>

      {pozycje.map(([label, kwota]) => (
        <div key={label} className="flex justify-between gap-3 border-t border-line-dark pt-3">
          <span className="truncate">{label}</span>
          <span className="flex-none">{kwota}</span>
        </div>
      ))}

      <div className="flex justify-between gap-3 border-y border-line-dark py-3">
        <b>Razem</b>
        <b>9 022 zł</b>
      </div>

      <div className="text-[12px] text-ink-muted lg:text-[13px]">
        Rozkładają się na przejechane kilometry i wchodzą do marży każdego kursu.
      </div>
    </div>
  );
}
