/**
 * Pięć drobnych kart przy osi miesiąca księgowej. Nie są makietami do podmiany —
 * to ilustracje przy punktach osi.
 */

const ramka =
  'rounded-2xl border border-line-dark bg-surface p-4 text-[11px] text-paper lg:p-4.5';

/** przez cały miesiąc — dane wpadają same. */
export function KartaWpada() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {[
        ['3.09 · faktura FV/2026/09/041', 'wpadła'],
        ['2.09 · paragon Shell · 648 zł', 'wpadł'],
        ['2.09 · trasa Warszawa → Mediolan', 'wpadła'],
      ].map(([co, stan]) => (
        <div key={co} className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2">
          <span className="truncate">{co}</span>
          <span className="flex-none text-green">{stan}</span>
        </div>
      ))}
    </div>
  );
}

/** ostatni tydzień — lista sprawdzenia mówi, czego brakuje. */
export function KartaSprawdzenie() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {[
        { co: 'Sprzedaż · 42', stan: 'komplet', brak: false },
        { co: 'Koszty · 3 bez zlecenia', stan: 'Tomasz L.', brak: true },
        { co: 'Czas pracy · 9', stan: 'komplet', brak: false },
      ].map((w) => (
        <div
          key={w.co}
          className={`flex justify-between gap-3 rounded-lg px-2.5 py-2 ${
            w.brak ? 'border border-line-dark-2 bg-surface-2' : 'bg-surface-2'
          }`}
        >
          <span className="truncate">{w.co}</span>
          <span className={`flex-none ${w.brak ? 'text-ink-muted' : 'text-green'}`}>{w.stan}</span>
        </div>
      ))}
    </div>
  );
}

/** pierwszy dzień po — wybierasz miesiąc i klikasz raz. */
export function KartaPobierz() {
  return (
    <div className={`${ramka} flex flex-col gap-2.5`}>
      <div className="flex gap-2">
        <span className="flex-1 rounded-lg border border-line-dark px-2.5 py-2 text-center text-ink-muted">
          lipiec
        </span>
        <span className="flex-1 rounded-lg border border-blue-soft-line bg-surface-2 px-2.5 py-2 text-center font-semibold">
          sierpień
        </span>
      </div>
      <div className="rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
        Pobierz komplet za sierpień
      </div>
    </div>
  );
}

/** wczytujesz — w formacie swojego programu. */
export function KartaFormat() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {[
        ['Insert', 'EPP', false],
        ['Comarch Optima', 'wybrany', true],
        ['Symfonia', 'FK', false],
        ['Zwykły arkusz', 'XLSX', false],
      ].map(([nazwa, format, wybrany]) => (
        <div
          key={nazwa as string}
          className={`flex justify-between gap-3 rounded-lg px-2.5 py-2 ${
            wybrany ? 'border border-blue-soft-line bg-surface-2' : 'bg-surface-2'
          }`}
        >
          <span className="truncate">{nazwa}</span>
          <span className={`flex-none ${wybrany ? 'text-blue-light' : 'text-ink-muted'}`}>{format}</span>
        </div>
      ))}
    </div>
  );
}

/** zamykasz miesiąc — po zamknięciu nikt nie zmieni danych wstecz. */
export function KartaZamkniecie() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      <div className="rounded-lg bg-surface-2 px-2.5 py-2">
        <div className="flex justify-between gap-3">
          <b>Sierpień 2026</b>
          <span className="flex-none text-green">zamknięty</span>
        </div>
        <div className="text-ink-muted">· 2.09, Ewa M.</div>
      </div>
      <div className="flex justify-between gap-3 rounded-lg border border-dashed border-line-dark px-2.5 py-2">
        <span>Wrzesień 2026</span>
        <span className="flex-none text-ink-muted">otwarty</span>
      </div>
    </div>
  );
}
