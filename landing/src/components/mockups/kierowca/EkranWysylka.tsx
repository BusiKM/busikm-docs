import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

const kolejka = [
  ['Punkty trasy', '142 · od 12:05', false],
  ['Paragon · OMV Brno', '103,30 € · zdjęcie', false],
  ['Przerwa 12:40–13:25', 'czas pracy', false],
  ['Zdjęcie licznika', '184 210 km', true],
] as const;

/** Ekran „Do wysłania" — co czeka na sygnał. */
export function EkranWysylka() {
  return (
    <Telefon glow>
      <PasekStanu left="13:20" right="brak zasięgu" />

      <div className="px-4 pt-5 text-[20px] font-semibold lg:px-4.5 lg:pt-6 lg:text-[22px]">
        Do wysłania
      </div>
      <div className="px-4 pt-1.5 text-ink-muted lg:px-4.5">
        Wyślą się same, gdy wróci sygnał.
      </div>

      <div className="flex flex-col gap-2 p-4 lg:p-4.5">
        {kolejka.map(([title, meta, sent]) => (
          <div
            key={title}
            className={`flex items-center justify-between gap-2 rounded-[14px] p-3.5 ${
              sent ? 'bg-surface-3' : 'bg-surface-2'
            }`}
          >
            <div className="min-w-0">
              <b className="block truncate">{title}</b>
              <div className="truncate text-ink-muted">{meta}</div>
            </div>
            {sent ? (
              <span className="flex-none text-green">wysłane</span>
            ) : (
              <span
                aria-hidden
                className="size-2.5 flex-none rounded-full border-2 border-ink-muted"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mx-4 mt-auto mb-4 rounded-[14px] border border-line-dark py-3.5 text-center text-ink-muted lg:mx-4.5 lg:mb-4.5">
        3 rzeczy czekają · 1,2 MB
      </div>
    </Telefon>
  );
}
