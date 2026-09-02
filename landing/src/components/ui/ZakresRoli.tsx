import { Section, Eyebrow } from '@/components/ui/Section';

export type KolumnaZakresu = {
  nadtytul: string;
  /** Jedno mocne zdanie zamiast listy — tak wygląda strona właściciela. */
  tytul?: string;
  /** Albo lista rzeczy — tak wygląda strona dyspozytora i księgowej. */
  pozycje?: readonly string[];
  tresc?: string;
  /** Przygaszona kolumna „nie widzisz". */
  przygaszona?: boolean;
};

/**
 * Zakres dostępu, po ludzku — dwie kolumny zamiast tabeli uprawnień.
 *
 * Kolumna może być mocnym zdaniem albo listą; strony ról używają obu form,
 * zależnie od tego, czy zakres da się streścić jednym słowem.
 */
export function ZakresRoli({
  naglowek,
  kolumny,
  nota,
}: {
  naglowek: string;
  kolumny: readonly [KolumnaZakresu, KolumnaZakresu];
  /** Zdanie na niebieskim tle pod kolumnami — gdy rola ma wyjątek do dopowiedzenia. */
  nota?: string;
}) {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {naglowek}
        </h2>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
          {kolumny.map((k) => (
            <div
              key={k.nadtytul}
              data-reveal
              className="flex flex-col gap-5 rounded-panel border border-line-dark bg-surface p-7 lg:gap-6 lg:p-14"
            >
              <Eyebrow dark>{k.nadtytul}</Eyebrow>

              {k.tytul && (
                <div className="text-h2-m font-semibold text-balance lg:text-h2">{k.tytul}</div>
              )}

              {k.pozycje && (
                <div
                  className={`flex flex-col text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-lead ${
                    k.przygaszona ? 'text-[#55555C]' : ''
                  }`}
                >
                  {k.pozycje.map((p, i) => (
                    <span
                      key={p}
                      className={`py-2.5 lg:py-3 ${
                        i < k.pozycje!.length - 1 ? 'border-b border-line-dark' : ''
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              )}

              {k.tresc && (
                <p className="mt-auto text-[16px] leading-relaxed text-ink-muted lg:text-body">
                  {k.tresc}
                </p>
              )}
            </div>
          ))}
        </div>

        {nota && (
          <p
            data-reveal
            className="rounded-card bg-blue-soft px-6 py-6 text-[17px] leading-relaxed font-medium text-pretty text-ink lg:px-10 lg:py-8 lg:text-lead"
          >
            {nota}
          </p>
        )}
      </div>
    </Section>
  );
}
