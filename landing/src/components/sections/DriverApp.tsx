import { Container } from '@/components/ui/Container';
import { DriverPhones } from '@/components/mockups/DriverPhones';

const points = [
  'Zlecenia i nawigacja',
  'Zdjęcie licznika i paragonu',
  'Czas pracy i przerwy',
];

export function DriverApp() {
  return (
    <section id="app" className="bg-ink px-5 py-24 text-paper lg:px-10 lg:py-40">
      <Container className="grid lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <div className="text-caption font-medium tracking-[0.12em] text-paper/55">
            BUSIKM KIEROWCA
          </div>
          <h2 className="mt-5 text-h1-m font-bold lg:mt-6 lg:text-h1">
            Cały dzień pracy w kieszeni.
          </h2>
          <p className="mt-5 text-lead-m text-pretty text-paper/62 lg:mt-7 lg:text-lead">
            Kierowca dostaje kod, wpisuje go w aplikacji i jest w środku. Bez
            zakładania konta, bez haseł od Ciebie. Aplikacja działa też bez zasięgu
            — wszystko dośle, gdy tylko złapie sygnał.
          </p>

          <div className="mt-8 flex flex-col gap-3.5 text-body lg:mt-12 lg:grid lg:grid-cols-3 lg:gap-6">
            {points.map((point) => (
              <div key={point} className="border-t border-white/14 pt-3.5 lg:pt-4">
                {point}
              </div>
            ))}
          </div>

          {/* mobile — telefon między treścią a odznakami */}
          <div className="my-10 lg:hidden">
            <DriverPhones />
          </div>

          <div className="flex flex-col gap-3 lg:mt-12 lg:flex-row">
            <div className="flex h-[52px] items-center justify-center rounded-btn border border-white/22 px-6 text-[15px] font-medium">
              Pobierz na iPhone
            </div>
            <div className="flex h-[52px] items-center justify-center rounded-btn border border-white/22 px-6 text-[15px] font-medium">
              Pobierz na Androida
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <DriverPhones />
        </div>
      </Container>
    </section>
  );
}
