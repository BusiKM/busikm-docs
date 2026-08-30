import { Container } from '@/components/ui/Container';

const today = [
  'GPS i monitoring',
  'program do rozliczania czasu pracy',
  'system do zleceń i faktur',
  'arkusz, który prowadzisz sam',
];

const withBusikm = ['Jedno konto.', 'Jeden rachunek.', 'Wszystko rozmawia ze sobą.'];

export function OneInvoice() {
  return (
    <section id="dlakogo" className="bg-paper px-5 py-24 lg:px-10 lg:py-40">
      <Container>
        <h2 className="text-h1-m font-bold lg:text-center lg:text-h1">
          Jedna faktura zamiast czterech.
        </h2>

        <div className="mt-8 grid gap-4 lg:mt-[88px] lg:grid-cols-2 lg:gap-6">
          <div className="rounded-card border border-line bg-mist p-7 lg:p-10">
            <div className="text-caption tracking-[0.08em] text-muted">
              DZIŚ PŁACISZ OSOBNO ZA
            </div>
            <div className="mt-5 flex flex-col gap-3.5 text-lead-m leading-[1.4] text-muted lg:mt-7 lg:gap-[18px] lg:text-lead">
              {today.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-line bg-white p-7 shadow-card lg:p-10">
            <div className="text-caption tracking-[0.08em] text-blue">Z BUSIKM</div>
            <div className="mt-5 flex flex-col gap-3 text-h3-m font-semibold lg:mt-7 lg:gap-[18px] lg:text-h3 lg:leading-[1.3]">
              {withBusikm.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
