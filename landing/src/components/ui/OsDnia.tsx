import { Section } from '@/components/ui/Section';

export type PunktDnia = {
  /** Godzina albo „koniec" — pierwsza, duża linia w kolumnie po lewej. */
  godzina: React.ReactNode;
  /** Druga linia, wersalikami: pora dnia, zakres dat albo nic. */
  pora?: string;
  tresc: string;
  /** Drobna karta obok treści — ilustracja tego jednego momentu. */
  karta?: React.ReactNode;
};

/**
 * Serce strony roli — jeden dzień na osi czasu.
 *
 * Trzy kolumny: godzina, linia z kropką, treść z drobną kartą obok. Na telefonie
 * kolumna godziny się zwęża, ale linia zostaje — to ona trzyma całość razem.
 */
export function OsDnia({
  naglowek = 'Twój dzień z BusiKM.',
  punkty,
  skala = 'godziny',
  tone = 'ink',
}: {
  naglowek?: string;
  punkty: PunktDnia[];
  tone?: 'ink' | 'surface';
  /**
   * Godziny są krótkie i znoszą duży stopień; słowa („przez cały miesiąc")
   * przy tym samym rozmiarze rozjeżdżają kolumnę na cztery linie.
   */
  skala?: 'godziny' | 'slowa';
}) {
  const stopien =
    skala === 'slowa'
      ? 'text-[19px] leading-tight tracking-[-0.02em] lg:text-[28px]'
      : 'text-[24px] leading-none tracking-[-0.03em] lg:text-[40px]';

  return (
    <Section tone={tone}>
      <div className="flex flex-col gap-12 lg:gap-24">
        <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
          {naglowek}
        </h2>

        <div
          data-reveal-group
          className="grid grid-cols-[76px_1px_1fr] gap-x-5 lg:grid-cols-[200px_1px_1fr] lg:gap-x-16"
        >
          {punkty.map((p, i) => {
            const ostatni = i === punkty.length - 1;
            return (
              <div key={i} className="contents">
                <div
                  data-reveal
                  className={`flex flex-col gap-1 ${ostatni ? '' : 'pb-12 lg:pb-24'}`}
                >
                  <div className={`font-bold ${stopien}`}>{p.godzina}</div>
                  {p.pora && (
                    <div className="text-[11px] font-medium tracking-[0.1em] text-ink-muted uppercase lg:text-caption">
                      {p.pora}
                    </div>
                  )}
                </div>

                <div
                  aria-hidden
                  className={`relative ${
                    ostatni
                      ? 'bg-linear-to-b from-line-dark from-60% to-transparent'
                      : 'bg-line-dark'
                  }`}
                >
                  <span className="absolute top-2 -left-[7px] size-[15px] rounded-full bg-blue shadow-[0_0_0_6px_rgba(11,95,255,.2)]" />
                </div>

                <div
                  data-reveal
                  className={`grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10 ${
                    ostatni ? '' : 'pb-12 lg:pb-24'
                  }`}
                >
                  <p className="text-lead-m text-pretty lg:text-lead">{p.tresc}</p>
                  {p.karta}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
