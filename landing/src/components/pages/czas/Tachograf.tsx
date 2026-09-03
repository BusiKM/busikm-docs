import { Section, Eyebrow } from '@/components/ui/Section';

const karty = [
  {
    kto: 'Tachograf',
    czasownik: 'zapisuje',
    punkty: ['Jest wymagany.', 'Rejestruje jazdę i postoje.', 'Zostaje w pojeździe.'],
    nasza: false,
  },
  {
    kto: 'BusiKM',
    czasownik: 'pokazuje',
    punkty: ['Ile jeszcze można jechać.', 'Kiedy trzeba stanąć.', 'Na ekranie kierowcy i u Ciebie.'],
    nasza: true,
  },
] as const;

/**
 * Najważniejsza sekcja tej strony. Rozbraja nieporozumienie, że BusiKM ma
 * zastąpić tachograf — bez ikon ostrzegawczych i bez czerwieni, samym
 * zestawieniem dwóch czasowników.
 */
export function Tachograf() {
  return (
    <Section tone="ink" spacing="py-28 lg:py-50">
      <div className="flex flex-col gap-12 lg:items-center lg:gap-24">
        <div className="flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
          <h2 data-reveal className="text-display-m font-bold text-balance lg:text-display">
            Tachograf zapisuje. <br className="hidden lg:inline" />
            BusiKM pokazuje.
          </h2>
          <p
            data-reveal
            className="max-w-[760px] text-lead-m text-pretty text-ink-muted lg:text-lead"
          >
            Tachograf jest wymagany i robi swoje: rejestruje. BusiKM go nie zastępuje
            i nie udaje. Jest po to, żeby kierowca <b className="text-paper">widział</b> na
            ekranie, ile jeszcze może jechać i kiedy musi stanąć.
          </p>
        </div>

        <div data-reveal-group className="grid w-full gap-2.5 lg:grid-cols-2 lg:gap-6">
          {karty.map((k) => (
            <div
              key={k.kto}
              data-reveal
              className={`flex flex-col gap-6 rounded-panel bg-surface p-7 lg:min-h-90 lg:gap-8 lg:p-14 ${
                k.nasza
                  ? 'border border-blue shadow-[0_40px_100px_rgba(11,95,255,.18)]'
                  : 'border border-line-dark'
              }`}
            >
              <Eyebrow dark>{k.kto}</Eyebrow>
              <div
                className={`text-h2-m font-bold tracking-[-0.025em] lg:text-h1 ${
                  k.nasza ? '' : 'text-ink-muted'
                }`}
              >
                {k.czasownik}
              </div>
              <div className="mt-auto flex flex-col gap-2.5 text-[16px] leading-relaxed text-ink-muted lg:gap-3 lg:text-body">
                {k.punkty.map((p) => (
                  <span key={p}>{p}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
