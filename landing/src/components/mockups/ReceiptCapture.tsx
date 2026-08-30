const recognized =
  'rounded-btn border border-green/45 bg-green/10 px-3.5 py-3 text-body';
const scan =
  'repeating-linear-gradient(135deg, #E3E3E6 0 8px, #EDEDF0 8px 16px)';

/** Telefon ze zdjęciem paragonu i formularzem — pola rozpoznane na zielono. */
export function ReceiptCapture() {
  return (
    <div className="rounded-panel border border-line bg-white p-5 shadow-card lg:grid lg:grid-cols-[220px_1fr] lg:items-center lg:gap-8 lg:p-8">
      {/* mobile — samo zdjęcie */}
      <div
        className="flex h-[140px] items-end justify-center rounded-card pb-3 lg:hidden"
        style={{ background: scan }}
      >
        <span className="font-mono text-[12px] text-muted">zdjęcie paragonu</span>
      </div>

      {/* desktop — telefon */}
      <div className="hidden h-[400px] w-[220px] rounded-panel bg-ink p-2.5 lg:block">
        <div className="flex h-full w-full flex-col gap-2.5 rounded-card bg-mist p-3.5">
          <div className="text-caption text-muted">Paragon · Shell Legnica</div>
          <div
            className="flex flex-1 items-end justify-center rounded-btn pb-3.5"
            style={{ background: scan }}
          >
            <span className="font-mono text-[12px] text-muted">zdjęcie paragonu</span>
          </div>
          <div className="flex h-10 items-center justify-center rounded-btn bg-blue text-[15px] font-semibold text-white">
            Wyślij
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-3 lg:mt-0 lg:gap-3.5">
        <div>
          <div className="hidden text-caption text-muted lg:block">Kwota</div>
          <div className={`${recognized} font-semibold lg:mt-1.5`}>742,19 zł</div>
        </div>
        <div className="lg:hidden">
          <div className={recognized}>12.08.2026 · Shell Polska</div>
        </div>
        <div className="hidden lg:block">
          <div className="text-caption text-muted">Data</div>
          <div className={`${recognized} mt-1.5`}>12.08.2026</div>
        </div>
        <div className="hidden lg:block">
          <div className="text-caption text-muted">Sprzedawca</div>
          <div className={`${recognized} mt-1.5`}>Shell Polska</div>
        </div>
        <div>
          <div className="hidden text-caption text-muted lg:block">
            Pojazd i zlecenie
          </div>
          <div className="rounded-btn border border-line bg-mist px-3.5 py-3 text-body lg:mt-1.5">
            WZ 4821K · ZL/2026/08/144
          </div>
        </div>
      </div>
    </div>
  );
}
