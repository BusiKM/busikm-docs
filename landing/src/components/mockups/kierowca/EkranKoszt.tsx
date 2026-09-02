import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

const pola = [
  ['Kwota', '103,30 € · 442 zł'],
  ['Data', '2.09.2026'],
  ['Rodzaj', 'Paliwo'],
  ['Zlecenie', 'Warszawa → Mediolan'],
  ['Pojazd', 'WZ 4821K'],
] as const;

/** Dodawanie kosztu ze zdjęcia paragonu. */
export function EkranKoszt() {
  return (
    <Telefon glow>
      <PasekStanu left="11:42" right="Dodaj koszt" />

      <div className="relative mx-3.5 mt-4 flex h-[150px] items-center justify-center rounded-[18px] bg-[#1E1E22] lg:h-[190px]">
        <div className="flex w-[100px] flex-col gap-1.5 rounded-[4px] bg-mist p-3 font-mono text-[7px] text-ink lg:w-30 lg:text-[8px]">
          <div className="text-center font-bold">OMV Brno</div>
          <div className="flex justify-between">
            <span>Diesel 78,4 l</span>
            <span>96,20 €</span>
          </div>
          <div className="flex justify-between">
            <span>AdBlue</span>
            <span>7,10 €</span>
          </div>
          <div className="flex justify-between border-t border-line-strong pt-1 font-bold">
            <span>RAZEM</span>
            <span>103,30 €</span>
          </div>
        </div>
        <div className="absolute right-3 bottom-3 rounded-full bg-green/16 px-2.5 py-1.5 font-semibold text-green">
          rozpoznane
        </div>
      </div>

      <div className="m-3.5 flex flex-col gap-2">
        {pola.map(([label, value]) => (
          <div
            key={label}
            className="flex justify-between gap-2 rounded-xl bg-surface-2 px-3.5 py-3"
          >
            <span className="text-ink-muted">{label}</span>
            <b className="truncate">{value}</b>
          </div>
        ))}
      </div>

      <div className="mx-3.5 mt-auto mb-3.5 rounded-[14px] bg-blue py-4 text-center text-[14px] font-semibold text-white lg:text-[15px]">
        Zapisz
      </div>
    </Telefon>
  );
}
