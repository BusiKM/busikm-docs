const fields = [
  ['Sprzedawca', 'Shell · Rotterdam', 'Shell'],
  ['Data', '2.09.2026', '2.09.2026'],
  ['Kwota', '151,50 € · 648,42 zł', '151,50 €'],
  ['Rodzaj', 'Paliwo', 'Paliwo'],
  ['Zlecenie · pojazd', 'Poznań → Rotterdam · PO 2093J', 'PO 2093J'],
] as const;

/** Telefon ze zdjęciem paragonu i odklejony panel z rozpoznanymi polami. */
export function ParagonMockup() {
  return (
    <div className="relative h-[400px] lg:flex lg:h-[600px] lg:items-center">
      <div className="absolute top-5 left-0 h-[360px] w-[170px] rounded-[30px] bg-ink p-[7px] shadow-[0_20px_40px_rgba(0,0,0,.14)] [transform:perspective(900px)_rotateY(14deg)_rotate(-3deg)] lg:relative lg:top-0 lg:h-[520px] lg:w-60 lg:rounded-[40px] lg:p-[9px] lg:[transform:perspective(1200px)_rotateY(14deg)_rotate(-3deg)]">
        <div className="flex h-full flex-col gap-2.5 overflow-hidden rounded-3xl bg-mist p-2.5 text-[11px] lg:rounded-[32px] lg:gap-0 lg:p-0">
          <div className="hidden justify-between px-4 pt-5 text-muted lg:flex">
            <span>11:42</span>
            <span>Nowy koszt</span>
          </div>
          <div className="flex flex-1 items-center justify-center rounded-xl bg-[#D9D9DE] lg:m-3.5 lg:rounded-2xl">
            <div className="flex w-[90px] flex-col gap-1.5 rounded-[3px] bg-white p-3 font-mono text-[8px] shadow-[0_4px_12px_rgba(0,0,0,.1)] lg:w-[140px]">
              <div className="text-center font-bold">Shell · Rotterdam</div>
              <div className="hidden text-center text-muted lg:block">02.09.2026 11:38</div>
              <div className="hidden justify-between lg:flex">
                <span>Diesel 82,1 l</span>
                <span>139,50 €</span>
              </div>
              <div className="hidden justify-between lg:flex">
                <span>Myjnia</span>
                <span>12,00 €</span>
              </div>
              <div className="hidden justify-between border-t border-dashed border-line pt-1 font-bold lg:flex">
                <span>TOTAAL</span>
                <span>151,50 €</span>
              </div>
            </div>
          </div>
          <div className="rounded-[10px] bg-blue py-2.5 text-center text-[12px] font-semibold text-white lg:mx-3.5 lg:mb-3.5 lg:rounded-[14px] lg:py-3.5 lg:text-[14px]">
            Użyj zdjęcia
          </div>
        </div>
      </div>

      <div className="absolute top-[70px] right-0 flex w-[210px] flex-col gap-1.5 rounded-card border border-line bg-white p-3.5 text-[11px] shadow-[0_20px_48px_rgba(0,0,0,.1)] lg:top-[110px] lg:w-80 lg:gap-2.5 lg:p-[22px] lg:text-[13px]">
        <div className="mb-1 hidden justify-between text-muted lg:flex">
          <span>Rozpoznane pola</span>
          <span className="font-semibold text-green-ink">5 z 5</span>
        </div>
        {fields.map(([label, value, short]) => (
          <div
            key={label}
            className="flex justify-between gap-2 rounded-lg border border-green/40 bg-green/10 p-2 lg:rounded-[10px] lg:px-3 lg:py-2.5"
          >
            <span className="text-muted">{label}</span>
            <b className="truncate text-right">
              <span className="lg:hidden">{short}</span>
              <span className="hidden lg:inline">{value}</span>
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}
