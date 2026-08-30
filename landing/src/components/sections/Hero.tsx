import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { DashboardMockup } from '@/components/mockups/DashboardMockup';

export function Hero() {
  return (
    <section className="bg-paper px-5 pt-16 pb-24 lg:px-10 lg:pt-[140px] lg:pb-[120px]">
      <Container className="lg:text-center">
        <h1 className="text-display-m font-bold lg:text-display">
          Kierowca jedzie.{' '}
          <br className="hidden lg:inline" />
          Reszta dzieje się sama.
        </h1>
        <p className="mt-6 max-w-[720px] text-lead-m text-pretty text-muted lg:mx-auto lg:mt-8 lg:text-lead">
          BusiKM zamienia trasy Twoich kierowców w kilometrówkę, ewidencję czasu
          pracy i komplet dokumentów dla księgowej. Bez Excela. Bez przepisywania.
        </p>

        <div className="mt-8 flex flex-col gap-3 lg:mt-10 lg:flex-row lg:justify-center lg:gap-3.5">
          <Button href="#trial" fullWidth className="lg:w-auto">
            Wypróbuj 14 dni
          </Button>
          <Button href="#demo" variant="secondary" fullWidth className="lg:w-auto">
            Zobacz demo — bez rejestracji
          </Button>
        </div>

        <p className="mt-4 text-caption text-muted lg:mt-5">
          Pierwsze 14 dni bez opłat. Rezygnujesz jednym kliknięciem.
        </p>

        <div className="mt-12 lg:mt-[88px]">
          <DashboardMockup />
        </div>
      </Container>
    </section>
  );
}
