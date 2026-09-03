const kraje = [
  ['Niemcy', '6', '49 €', '1 258 zł'],
  ['Włochy', '5', '53 €', '1 134 zł'],
  ['Austria', '3', '57 €', '464 zł'],
] as const;

/** Rozliczenie kierowcy: dni za granicą, diety, wypłata. */
export function RozliczenieKierowcy() {
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[12px] text-muted lg:text-[13px]">Rozliczenie · sierpień</div>
          <b className="text-[16px] lg:text-[18px]">Marek W.</b>
        </div>
        <span className="flex-none text-muted">WZ 4821K</span>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          ['Dni za granicą', '14', false],
          ['Diety', '2 856 zł', false],
          ['Do wypłaty', '9 640 zł', true],
        ].map(([label, value, strong]) => (
          <div
            key={label as string}
            className={`rounded-[14px] border border-line p-3.5 ${strong ? 'bg-mist' : ''}`}
          >
            <div className="text-[11px] text-muted lg:text-[12px]">{label}</div>
            <b className="text-[17px] lg:text-[20px]">{value}</b>
          </div>
        ))}
      </div>

      <div className="flex flex-col border-t border-line text-[12px] lg:text-[13px]">
        <div className="grid grid-cols-[1fr_44px_56px_76px] gap-3 border-b border-line py-2.5 text-muted lg:grid-cols-[1fr_60px_70px_90px]">
          <span>Kraj</span>
          <span>Dni</span>
          <span>Stawka</span>
          <span className="text-right">Razem</span>
        </div>
        {kraje.map(([kraj, dni, stawka, razem], i) => (
          <div
            key={kraj}
            className={`grid grid-cols-[1fr_44px_56px_76px] gap-3 py-2.5 lg:grid-cols-[1fr_60px_70px_90px] ${
              i < kraje.length - 1 ? 'border-b border-line' : ''
            }`}
          >
            <span>{kraj}</span>
            <span>{dni}</span>
            <span>{stawka}</span>
            <span className="text-right">{razem}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 text-muted">
        <span>Dni liczone z trasy, nie z notatek</span>
        <span className="font-semibold text-green-ink">gotowe do wczytania</span>
      </div>
    </div>
  );
}
