/**
 * Cztery drobne karty przy osi dnia. Nie są makietami do podmiany — to
 * ilustracje przy punktach osi, mają być mniejsze i cichsze niż ekrany
 * z sekcji „Cztery ekrany".
 */

const ramka =
  'rounded-2xl border border-line-dark bg-surface p-4 text-[11px] lg:p-4.5';

/** 7:10 — trzy liczby pulpitu. */
export function KartaPulpit() {
  return (
    <div className={`${ramka} grid grid-cols-3 gap-2`}>
      {[
        ['Przychód', '184 320', false],
        ['Koszty', '121 840', false],
        ['Zysk', '62 480', true],
      ].map(([label, value, zysk]) => (
        <div
          key={label as string}
          className={`rounded-[10px] border border-line-dark p-2.5 ${zysk ? 'bg-surface-2' : ''}`}
        >
          <div className="text-ink-muted">{label}</div>
          <b className={`text-[13px] ${zysk ? 'text-green' : ''}`}>{value}</b>
        </div>
      ))}
      <div className="col-span-3 pt-1 text-ink-muted">Dziś uwagi wymaga: 1 dokument</div>
    </div>
  );
}

/** 11:40 — bus na mapie z godziną dojazdu. */
export function KartaMapa() {
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl border border-line-dark bg-surface text-paper">
      <svg
        viewBox="0 0 320 130"
        preserveAspectRatio="none"
        className="size-full"
        aria-hidden
      >
        <path
          d="M 280 20 C 220 50, 180 70, 140 90 S 70 115, 30 120"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="3"
        />
        <circle cx="150" cy="86" r="6" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
      </svg>
      <div className="absolute top-3 left-3.5 rounded-lg bg-surface-2 px-2.5 py-2 text-[11px]">
        <b>WZ 4821K</b> · Bolzano
        <div className="text-ink-muted">na miejscu 08:00</div>
      </div>
    </div>
  );
}

/** 16:20 — zakończony kurs gotowy do zafakturowania. */
export function KartaFaktura() {
  return (
    <div className={`${ramka} flex flex-col gap-2.5 text-[12px]`}>
      <div className="flex justify-between gap-3">
        <span className="truncate">Warszawa → Mediolan</span>
        <span className="flex-none text-green">zakończony</span>
      </div>
      <div className="flex justify-between gap-3 border-t border-line-dark pt-2">
        <span className="text-ink-muted">Fracht</span>
        <b>3 900 €</b>
      </div>
      <div className="rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
        Wystaw i wyślij
      </div>
    </div>
  );
}

/** koniec miesiąca — jeden przycisk dla księgowej. */
export function KartaEksport() {
  return (
    <div className={`${ramka} flex flex-col gap-2.5 text-[12px]`}>
      <div className="rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
        Pobierz komplet za sierpień
      </div>
      <div className="flex justify-between gap-3 text-ink-muted">
        <span>9 zestawień</span>
        <span className="text-green">9 z 9 gotowe</span>
      </div>
    </div>
  );
}
