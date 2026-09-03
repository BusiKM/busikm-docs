import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

const pozycje = [
  { co: 'Prawo jazdy · C1', kiedy: 'do 2029', stan: 'ważne' },
  { co: 'Badania psychologiczne', kiedy: 'do 2028', stan: 'ważne' },
  { co: 'Kod 95', kiedy: 'do 2028', stan: 'ważne' },
  { co: 'Dokumenty pojazdu', kiedy: 'PO 2093J · do wglądu w trasie', stan: '→' },
] as const;

/** Dokumenty kierowcy w jego telefonie — z najbliższym terminem u góry. */
export function TelefonKierowcy() {
  return (
    <Telefon>
      <PasekStanu left="07:40" right="Tomasz L." />

      <div className="px-4 pt-6 text-[20px] font-semibold lg:px-4.5 lg:text-[22px]">
        Moje dokumenty
      </div>

      <div className="mx-4 mt-4 flex flex-col gap-1.5 rounded-2xl border border-line-dark bg-surface-2 p-4 lg:mx-4.5">
        <div className="flex justify-between gap-2">
          <b className="text-[13px] lg:text-[14px]">Badania lekarskie</b>
          <span className="flex-none text-ink-muted">41 dni</span>
        </div>
        <div className="text-ink-muted">Ważne do 13.10.2026</div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-[3px] bg-line-dark">
          <div className="h-full w-[34%] bg-blue" />
        </div>
        <div className="mt-1 text-ink-muted">Przypomnimy Ci 30 dni przed. Szefowi też.</div>
      </div>

      <div className="flex flex-col gap-2 p-4 lg:p-4.5">
        {pozycje.map((p) => (
          <div
            key={p.co}
            className="flex items-center justify-between gap-2 rounded-[14px] bg-surface-3 p-3.5"
          >
            <div className="min-w-0">
              <b className="block truncate">{p.co}</b>
              <div className="truncate text-ink-muted">{p.kiedy}</div>
            </div>
            <span className={`flex-none ${p.stan === '→' ? 'text-ink-muted' : 'text-green'}`}>
              {p.stan}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-around border-t border-line-dark px-2 pt-3.5 pb-5 text-[10px] text-ink-muted lg:text-[11px]">
        <span>Zlecenia</span>
        <span>Trasa</span>
        <span>Koszty</span>
        <span className="text-paper">Dokumenty</span>
      </div>
    </Telefon>
  );
}
