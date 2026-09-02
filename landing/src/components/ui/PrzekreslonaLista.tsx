import { Section } from '@/components/ui/Section';

/**
 * „Czego już nie robisz" — lista przekreślona, bez komentarza przy pozycjach.
 * Przekreślenie ma być czytelne, nie dekoracyjne: grube i w kolorze tekstu
 * podstawowego, na przygaszonych słowach.
 */
export function PrzekreslonaLista({
  naglowek = 'Czego już nie robisz.',
  rzeczy,
  tone = 'mist',
}: {
  naglowek?: string;
  rzeczy: readonly string[];
  tone?: 'mist' | 'ink' | 'surface';
}) {
  const dark = tone !== 'mist';

  return (
    <Section tone={tone}>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {naglowek}
        </h2>

        <div data-reveal-group className="flex flex-col">
          {rzeczy.map((r, i) => (
            <div
              key={r}
              data-reveal
              className={`border-t py-4 text-[20px] leading-tight font-semibold tracking-[-0.01em] line-through decoration-[3px] lg:py-6 lg:text-h3 ${
                dark
                  ? 'border-line-dark text-[#55555C] decoration-paper'
                  : 'border-line text-muted decoration-ink'
              } ${i === rzeczy.length - 1 ? 'border-b' : ''}`}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
