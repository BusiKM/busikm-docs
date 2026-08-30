import { Container } from '@/components/ui/Container';
import { TechCaption } from '@/components/ui/TechCaption';

type FeatureSectionProps = {
  id?: string;
  /** Duży nagłówek — korzyść, nigdy nazwa techniczna. */
  title: string;
  /** Jedno zdanie pod nagłówkiem. */
  body: string;
  /** Szary podpis techniczny na dole. */
  caption: string;
  mockup: React.ReactNode;
  /** Po której stronie makieta na desktopie — układ naprzemienny. */
  mockupSide: 'left' | 'right';
  dark?: boolean;
  /** Odstępy pionowe sekcji (różne per sekcja w projekcie). */
  spacing: string;
};

export function FeatureSection({
  id,
  title,
  body,
  caption,
  mockup,
  mockupSide,
  dark = false,
  spacing,
}: FeatureSectionProps) {
  const columns =
    mockupSide === 'left'
      ? 'lg:grid-cols-[1.15fr_0.85fr]'
      : 'lg:grid-cols-[0.85fr_1.15fr]';

  return (
    <section
      id={id}
      className={`px-5 lg:px-10 ${spacing} ${dark ? 'bg-ink text-paper' : 'bg-paper'}`}
    >
      <Container className={`grid gap-8 lg:items-center lg:gap-20 ${columns}`}>
        <div className={mockupSide === 'left' ? 'lg:order-2' : undefined}>
          <h2 className="text-h2-m font-bold lg:text-h2 lg:font-semibold">{title}</h2>
          <p
            className={`mt-4 text-body lg:mt-5 ${dark ? 'text-paper/62' : 'text-muted'}`}
          >
            {body}
          </p>
          <div className="hidden lg:block">
            <TechCaption dark={dark}>{caption}</TechCaption>
          </div>
        </div>

        <div className={mockupSide === 'left' ? 'lg:order-1' : undefined}>
          {mockup}
          {/* Na mobile podpis idzie pod makietą — wewnątrz wrappera, żeby
              odstęp wynosił 24px z projektu, a nie 24px + gap siatki. */}
          <div className="lg:hidden">
            <TechCaption dark={dark}>{caption}</TechCaption>
          </div>
        </div>
      </Container>
    </section>
  );
}
