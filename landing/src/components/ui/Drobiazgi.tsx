import { Section } from '@/components/ui/Section';

/**
 * „Drobiazgi, które widać dopiero w robocie" — siatka kafelków zamykająca
 * każdą podstronę, plus wiersz z odnośnikami do ról.
 */
export function Drobiazgi({
  naglowek = 'Drobiazgi, które widać dopiero w robocie.',
  kafelki,
  stopka,
  tone = 'ink',
}: {
  naglowek?: string;
  kafelki: readonly string[];
  /** Wiersz pod siatką — zwykle „Kto tego używa". */
  stopka?: React.ReactNode;
  tone?: 'paper' | 'mist' | 'ink';
}) {
  const dark = tone === 'ink';

  return (
    <Section tone={tone}>
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {naglowek}
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {kafelki.map((k) => (
            <div
              key={k}
              data-reveal
              className={`rounded-card p-4.5 text-[15px] font-semibold lg:min-h-30 lg:p-7 lg:text-body ${
                dark ? 'border border-line-dark bg-surface' : 'border border-line bg-white'
              }`}
            >
              {k}
            </div>
          ))}
        </div>

        {stopka && (
          <p
            /* Odnośnik koloruje sekcja, nie strona: na ciemnym tle marka
               #0B5FFF daje tylko 3,86:1, więc potrzebny jest jaśniejszy
               wariant. Strony przekazują sam tekst odnośnika bez klasy. */
            className={`border-t pt-10 text-[16px] leading-relaxed lg:pt-16 lg:text-body ${
              dark
                ? 'border-line-dark text-ink-muted [&_a]:text-blue-light'
                : 'border-line text-muted [&_a]:text-blue'
            }`}
          >
            {stopka}
          </p>
        )}
      </div>
    </Section>
  );
}
