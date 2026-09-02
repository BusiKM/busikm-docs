import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { appLinks } from '@/content/navigation';

/**
 * Nagłówek strony roli — jasny, na siatce, wyrównany do lewej.
 *
 * Podstrony obszarowe mają nagłówek wyśrodkowany z makietą pod spodem;
 * strona roli zaczyna od słów i od razu przechodzi w oś dnia.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 py-24 lg:px-12 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
      />

      <Container className="relative flex flex-col gap-6 lg:gap-8">
        <Eyebrow>Dla właściciela</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          Wiesz, ile zostaje. <br className="hidden lg:inline" />
          I gdzie jest każdy bus.
        </h1>
        <p data-reveal className="max-w-[680px] text-lead-m text-pretty text-muted lg:text-lead">
          Bez dzwonienia do kierowców, bez przepisywania do arkusza, bez czekania na koniec
          kwartału.
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
