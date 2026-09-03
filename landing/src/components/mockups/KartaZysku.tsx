/**
 * Koszty jednego kursu — razem 2 496 € przy frachcie 3 900 €, czyli marża 36%.
 *
 * Największą pozycją jest kierowca, nie paliwo. Tak to wygląda w transporcie
 * busami: pięć dni pracy człowieka kosztuje więcej niż tankowanie. Bez tej
 * pozycji rozbicie kosztów wyglądałoby optymistycznie w sposób, który każdy
 * przewoźnik rozpozna jako nieprawdziwy.
 *
 * Kilometraż jest liczony w obie strony (3 280 km), bo pojazd musi wrócić —
 * sama trasa Warszawa → Mediolan to 1 640 km.
 */
const costs = [
  { label: 'Kierowca', detail: ' · wynagrodzenie i dieta, 5 dni', value: '− 1 060 €' },
  { label: 'Paliwo', detail: ' · 6 paragonów', value: '− 716 €' },
  { label: 'Opłaty drogowe', detail: ' · AT, IT', value: '− 291 €' },
  { label: 'Amortyzacja', detail: ' · 3 280 km', value: '− 273 €' },
  { label: 'Nocleg', detail: ' · Brenner', value: '− 156 €' },
] as const;

/**
 * Karta jednego zlecenia z rozbiciem kosztów i zyskiem na dole.
 *
 * Stoi w dwóch miejscach — w sekcji „Ile zostaje" na stronie głównej i w
 * nagłówku podstrony o rentowności. Oba miejsca czekają na ten sam zrzut
 * (`mockup-zysk-karta-desktop.png`), więc rysowana wersja musi być jedna:
 * dwie różne liczby zysku dla tego samego kursu przeczyłyby sobie nawzajem.
 */
export function KartaZysku() {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line-dark bg-surface text-paper p-4 text-[12px] shadow-[0_40px_100px_rgba(11,95,255,.18),0_30px_60px_rgba(0,0,0,.6)] lg:aspect-4/3 lg:gap-3 lg:p-7 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="hidden text-ink-muted lg:block">Zlecenie · 2026/09/041</div>
          <b className="text-[14px] lg:text-[18px]">Warszawa → Mediolan</b>
        </div>
        <span className="hidden rounded-full bg-blue-soft px-2.5 py-[5px] font-semibold text-blue lg:inline">
          w trasie
        </span>
      </div>

      <div className="flex justify-between border-b border-line-dark py-1.5 lg:py-2.5">
        <span>Fracht</span>
        <b>3 900 €</b>
      </div>

      {costs.map((c, i) => (
        <div
          key={c.label}
          className={`flex justify-between text-ink-muted lg:py-1.5 ${
            i === costs.length - 1 ? 'border-b border-line-dark pb-1.5 lg:pb-2' : ''
          }`}
        >
          <span>
            {c.label}
            <span className="hidden lg:inline">{c.detail}</span>
          </span>
          <span>{c.value}</span>
        </div>
      ))}

      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <div className="text-ink-muted">Zysk na kursie</div>
          <div className="text-[18px] font-bold tracking-[-0.02em] text-green lg:text-[30px]">
            1 404 €<span className="hidden lg:inline"> · 6 009 zł</span>
          </div>
        </div>
        <div className="hidden h-11 items-end gap-1 lg:flex" aria-hidden>
          {[30, 45, 40, 70, 100].map((h, i) => (
            <span
              key={h}
              className={`w-2 rounded-[2px] ${i === 4 ? 'bg-blue' : 'bg-line-dark-2'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
