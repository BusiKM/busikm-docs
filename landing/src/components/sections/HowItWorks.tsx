import { Container } from '@/components/ui/Container';

const steps = [
  {
    number: '01',
    title: 'Kierowca rusza',
    body: 'Włącza trasę w telefonie. Robi zdjęcie licznika. Tyle.',
  },
  {
    number: '02',
    title: 'Dane same lecą',
    body: 'Trasa, kilometry, czas pracy, paragony. Wszystko ląduje u Ciebie, nawet gdy kierowca nie ma zasięgu.',
  },
  {
    number: '03',
    title: 'Miesiąc się zamyka',
    body: 'Kilometrówka, koszty, faktury i komplet dla księgowej. Gotowe do pobrania.',
  },
];

export function HowItWorks() {
  return (
    <section id="jak-to-dziala" className="bg-paper px-5 py-24 lg:px-10 lg:py-40">
      <Container>
        <h2 className="text-h1-m font-bold lg:text-center lg:text-h1">
          Trzy rzeczy dzieją się bez Ciebie.
        </h2>
        <div className="mt-12 flex flex-col gap-10 lg:mt-24 lg:grid lg:grid-cols-3 lg:gap-10">
          {steps.map((step) => (
            <div key={step.number}>
              <div className="font-mono text-caption text-muted">{step.number}</div>
              <h3 className="mt-2.5 text-h3-m font-semibold lg:mt-4 lg:text-h3">
                {step.title}
              </h3>
              <p className="mt-2 text-body text-muted lg:mt-3">{step.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
