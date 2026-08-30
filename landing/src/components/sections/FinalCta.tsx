import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export function FinalCta() {
  return (
    <section className="bg-ink px-5 py-28 text-center text-paper lg:px-10 lg:py-[180px]">
      <Container width="cta">
        <h2 className="text-display-m font-bold lg:text-display">
          Zacznij od jednej trasy.
        </h2>
        <p className="mt-5 text-lead-m text-paper/62 lg:mt-7 lg:text-lead">
          14 dni bez opłat. Bez umowy. Bez dzwonienia do handlowca.
        </p>
        <div className="mt-8 flex flex-col gap-3 lg:mt-11 lg:flex-row lg:justify-center lg:gap-3.5">
          <Button href="#trial" fullWidth className="lg:w-auto">
            Wypróbuj 14 dni
          </Button>
          <Button href="#demo" variant="secondaryDark" fullWidth className="lg:w-auto">
            Zobacz demo
          </Button>
        </div>
      </Container>
    </section>
  );
}
