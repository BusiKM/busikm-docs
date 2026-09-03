import { Section } from '@/components/ui/Section';

/**
 * Blok „numer + nagłówek + zdanie" z makietą obok — podstawowy rytm podstron.
 * Makieta raz po lewej, raz po prawej.
 */
export function Blok({
  numer,
  tytul,
  tresc,
  makieta,
  dodatek,
  strona = 'right',
  tone = 'paper',
}: {
  numer: string;
  tytul: string;
  tresc: string;
  makieta: React.ReactNode;
  /** Coś pod treścią — pigułki statusów, lista, cokolwiek. */
  dodatek?: React.ReactNode;
  /** Po której stronie makieta na desktopie. */
  strona?: 'left' | 'right';
  tone?: 'paper' | 'ink';
}) {
  const dark = tone === 'ink';

  return (
    <Section tone={tone}>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div
          className={`flex flex-col gap-4 lg:gap-6 ${strona === 'left' ? 'lg:order-2' : ''}`}
        >
          <div
            data-reveal
            className={`text-[13px] font-semibold tracking-[0.06em] lg:text-caption ${
              dark ? 'text-blue-light' : 'text-blue'
            }`}
          >
            {numer}
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {tytul}
          </h2>
          <p
            data-reveal
            className={`text-[16px] leading-relaxed lg:text-body ${dark ? 'text-ink-muted' : 'text-muted'}`}
          >
            {tresc}
          </p>
          {dodatek && <div data-reveal>{dodatek}</div>}
        </div>

        <div data-reveal className={strona === 'left' ? 'lg:order-1' : ''}>
          {makieta}
        </div>
      </div>
    </Section>
  );
}
