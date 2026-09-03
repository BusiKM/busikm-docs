import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { appLinks } from '@/content/navigation';

/**
 * Nagłówek strony roli — wyrównany do lewej, bez makiety pod spodem.
 *
 * Podstrony obszarowe otwierają się wyśrodkowanym nagłówkiem i dużym ekranem;
 * strona roli zaczyna od słów i od razu przechodzi w oś dnia.
 */
export function HeroRoli({
  nadtytul,
  tytul,
  lead,
  tone = 'paper',
}: {
  nadtytul: string;
  tytul: React.ReactNode;
  lead: string;
  tone?: 'paper' | 'ink';
}) {
  const dark = tone === 'ink';

  return (
    <section
      className={`relative overflow-hidden px-6 py-24 lg:px-12 lg:py-40 ${
        dark ? 'bg-ink text-paper' : 'bg-paper'
      }`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 bg-size-[80px_80px] lg:bg-size-[120px_120px] ${
          dark
            ? 'bg-[linear-gradient(rgba(250,250,250,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(250,250,250,.035)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)]'
        }`}
      />

      <Container className="relative flex flex-col gap-6 lg:gap-8">
        <Eyebrow dark={dark}>{nadtytul}</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          {tytul}
        </h1>
        <p
          data-reveal
          className={`max-w-[700px] text-lead-m text-pretty lg:text-lead ${
            dark ? 'text-ink-muted' : 'text-muted'
          }`}
        >
          {lead}
        </p>
        <div data-reveal className="mt-2 flex flex-col gap-2.5 lg:flex-row lg:gap-3">
          <Button href={appLinks.trial} fullWidth className="lg:w-auto">
            Wypróbuj 14 dni
          </Button>
          <Button href={appLinks.demo} variant="secondary" fullWidth className="lg:w-auto">
            Zobacz demo
          </Button>
        </div>
      </Container>
    </section>
  );
}
