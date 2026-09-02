import { Section } from '@/components/ui/Section';

const rzeczy = [
  'dzwonisz z pytaniem „gdzie jesteś”',
  'przepisujesz zlecenia do arkusza',
  'zbierasz paragony z kabin',
  'liczysz marżę po kwartale',
  'pilnujesz terminów w kalendarzu na ścianie',
];

/** Lista przekreślona — przekreślenie ma być czytelne, nie dekoracyjne. */
export function CzegoNieRobisz() {
  return (
    <Section tone="mist">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Czego już nie robisz.
        </h2>

        <div data-reveal-group className="flex flex-col">
          {rzeczy.map((r, i) => (
            <div
              key={r}
              data-reveal
              className={`border-t border-line py-4 text-[20px] leading-tight font-semibold tracking-[-0.01em] text-muted line-through decoration-ink decoration-[3px] lg:py-6 lg:text-h3 ${
                i === rzeczy.length - 1 ? 'border-b' : ''
              }`}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
