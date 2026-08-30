/** Kalendarz-licznik do najbliższego pobrania danych. Spokojny fakt, nie alarm. */
export function TachographCard() {
  return (
    <div className="rounded-panel border border-white/8 bg-surface p-6 lg:p-8">
      <div className="text-caption text-paper/55">
        Najbliższe pobranie danych z karty kierowcy
      </div>
      <div className="mt-2 text-[44px] leading-[1.05] font-bold tracking-[-0.025em] text-amber lg:mt-3 lg:text-h1">
        12 dni
      </div>
      <div className="text-[15px] text-paper/62 lg:mt-1 lg:text-body">
        termin: 7 września 2026
      </div>

      <div className="hidden lg:block">
        <div className="my-7 h-px bg-white/8" />
        <div className="flex flex-col gap-3.5 text-body">
          <div className="flex justify-between">
            <span className="text-paper/62">Karta kierowcy · co 28 dni</span>
            <span>7.09</span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper/62">Tachograf · co 90 dni</span>
            <span>4.11</span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper/62">Pojazdy objęte obowiązkiem</span>
            <span>6</span>
          </div>
        </div>
      </div>
    </div>
  );
}
