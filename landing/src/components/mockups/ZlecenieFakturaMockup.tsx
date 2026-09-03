const orderRows = [
  ['Klient', 'Alpina Logistics'],
  ['Załadunek', '2.09 · 06:00'],
  ['Rozładunek', '3.09 · 08:00'],
  ['Kierowca', 'Marek W. · WZ 4821K'],
] as const;

/** Ze zlecenia powstaje faktura — dwie karty i strzałka między nimi. */
export function ZlecenieFakturaMockup() {
  return (
    <div className="grid items-center gap-2.5 rounded-card border border-line bg-white p-4 text-[12px] shadow-card lg:aspect-4/3 lg:grid-cols-[1fr_24px_1fr] lg:gap-3 lg:p-7">
      <div className="flex h-full flex-col gap-2.5 rounded-[10px] border border-line p-3 lg:rounded-[14px] lg:p-[18px]">
        <div className="text-muted">Zlecenie · 2026/09/041</div>
        <b className="lg:text-[15px]">Warszawa → Mediolan</b>
        <div className="flex justify-between">
          <span className="text-muted">Fracht</span>
          <b>3 900 €</b>
        </div>
        {orderRows.map(([k, v]) => (
          <div key={k} className="hidden justify-between lg:flex">
            <span className="text-muted">{k}</span>
            <span>{v}</span>
          </div>
        ))}
        <span className="mt-auto hidden self-start rounded-full bg-green/14 px-2.5 py-1.5 font-semibold text-green-ink lg:inline">
          Kurs zakończony
        </span>
      </div>

      <div className="text-center text-[18px] text-blue lg:text-[22px]">
        <span className="lg:hidden">↓</span>
        <span className="hidden lg:inline">→</span>
      </div>

      <div className="flex h-full flex-col gap-2.5 rounded-[10px] border border-line bg-paper p-3 lg:rounded-[14px] lg:p-[18px]">
        <div className="text-muted">Faktura · FV/2026/09/041</div>
        <b className="hidden lg:block lg:text-[15px]">Alpina Logistics S.r.l.</b>
        <div className="hidden justify-between lg:flex">
          <span>Transport Warszawa → Mediolan</span>
          <span>3 900 €</span>
        </div>
        <div className="hidden justify-between text-muted lg:flex">
          <span>Termin płatności</span>
          <span>30 dni</span>
        </div>
        <div className="flex justify-between gap-2 border-t border-line pt-2">
          <b>Razem</b>
          <b>3 900 € · 16 692 zł</b>
        </div>
        <div className="mt-auto flex flex-col gap-2">
          <div className="rounded-lg bg-blue py-2 text-center font-semibold text-white lg:rounded-[10px] lg:py-2.5">
            Wyślij
          </div>
          <div className="flex gap-1.5">
            <span className="flex-1 rounded-md border border-line py-1.5 text-center">
              <span className="text-green-ink">●</span> mail
            </span>
            <span className="flex-1 rounded-md border border-line py-1.5 text-center">
              <span className="text-green-ink">●</span> e-faktura
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
