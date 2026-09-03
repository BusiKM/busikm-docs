import { Container } from '@/components/ui/Container';

/**
 * Sekcja strony głównej — rytm z projektu: 96 px odstępu na telefonie,
 * 160 px na desktopie, 24 px marginesu bocznego na telefonie, treść w 1120 px.
 */
type SectionProps = {
  id?: string;
  /** Tło sekcji. Ciemna sekcja to moment, w którym czytelnik ma się zatrzymać. */
  tone?: 'paper' | 'mist' | 'ink' | 'surface';
  /** Nadpisuje domyślne odstępy pionowe. */
  spacing?: string;
  className?: string;
  children: React.ReactNode;
};

const tones = {
  paper: 'bg-paper',
  mist: 'bg-mist',
  ink: 'bg-ink text-paper',
  surface: 'bg-surface text-paper',
} as const;

export function Section({
  id,
  tone = 'paper',
  spacing = 'py-24 lg:py-40',
  className = '',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden px-6 lg:px-12 ${tones[tone]} ${spacing} ${className}`}
    >
      <Container className="relative">{children}</Container>
    </section>
  );
}

/** Nadtytuł — 12/14 px, wersaliki, rozstrzelony. */
export function Eyebrow({
  children,
  dark = false,
  className = '',
  ...rest
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={`text-[12px] font-medium tracking-[0.1em] uppercase lg:text-caption ${
        dark ? 'text-ink-muted' : 'text-muted'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** Lista punktów z niebieską kropką — powtarza się w ośmiu sekcjach. */
export function Bullets({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <div
      data-reveal-group
      className={`flex flex-col gap-2 text-[16px] leading-relaxed lg:gap-2.5 lg:text-body ${
        dark ? 'text-paper' : 'text-ink'
      }`}
    >
      {items.map((item) => (
        <div key={item} data-reveal className="flex gap-2.5 lg:gap-3">
          <span
            aria-hidden
            className="mt-[10px] size-1.5 flex-none rounded-full bg-blue lg:mt-[11px]"
          />
          {item}
        </div>
      ))}
    </div>
  );
}
