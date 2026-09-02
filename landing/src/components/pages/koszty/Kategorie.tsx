import { Section } from '@/components/ui/Section';

const kategorie = [
  'Paliwo',
  'Opłaty drogowe',
  'Hotel',
  'Posiłek',
  'Prom',
  'Parking',
  'Naprawa',
] as const;

/** 03 — kategorie jako pigułki, pierwsza wybrana. */
export function Kategorie() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div
            data-reveal
            className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
          >
            03
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Kategorie z życia
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Paliwo, opłaty drogowe, hotel, posiłek, prom, parking, naprawa.
          </p>
        </div>

        <div
          data-reveal
          className="flex flex-wrap gap-2.5 text-[15px] font-medium lg:gap-3 lg:text-body"
        >
          {kategorie.map((k, i) => (
            <span
              key={k}
              className={`rounded-full px-5 py-3.5 lg:px-6 lg:py-4 ${
                i === 0 ? 'bg-ink text-paper' : 'border border-line bg-white'
              }`}
            >
              {k}
            </span>
          ))}
          <span className="rounded-full border border-dashed border-line px-5 py-3.5 text-muted lg:px-6 lg:py-4">
            podpowiedź po sprzedawcy
          </span>
        </div>
      </div>
    </Section>
  );
}
