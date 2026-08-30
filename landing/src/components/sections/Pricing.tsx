'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

const plans = {
  start: {
    name: 'Start',
    monthly: { price: '149 zł', alt: 'rocznie 1 490 zł netto' },
    yearly: { price: '1 490 zł', alt: 'zamiast 1 788 zł — 2 miesiące gratis' },
    specs: [
      { label: 'Pojazdy', value: 'do 3' },
      { label: 'Kierowcy', value: 'bez limitu' },
      { label: 'Użytkownicy biura', value: 'bez limitu' },
    ],
    features: [
      'Zlecenia i CMR',
      'GPS i trasy',
      'Kilometrówka i VAT-26',
      'Czas pracy kierowcy',
      'Koszty i paragony',
      'Faktury i KSeF',
      'Aplikacja dla kierowców',
    ],
  },
  firma: {
    name: 'Firma',
    monthly: { price: '299 zł', alt: 'rocznie 2 990 zł netto' },
    yearly: { price: '2 990 zł', alt: 'zamiast 3 588 zł — 2 miesiące gratis' },
    specs: [
      { label: 'Pojazdy', value: 'do 10, każdy kolejny +29 zł' },
      { label: 'Kierowcy', value: 'bez limitu' },
      { label: 'Użytkownicy biura', value: 'bez limitu' },
    ],
    features: [
      'Wszystko ze Start, a do tego:',
      'Eksport do programów księgowych',
      'Rejestry VAT',
      'Raporty kosztów floty',
      'Rentowność zleceń',
    ],
  },
} as const;

function tabClass(active: boolean) {
  return `h-10 cursor-pointer rounded-[10px] px-5 text-[15px] font-semibold transition-colors ${
    active ? 'bg-white text-ink shadow-tab' : 'bg-transparent text-muted'
  }`;
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const period = yearly ? 'yearly' : 'monthly';
  const unit = yearly ? 'netto / rok' : 'netto / mies.';

  return (
    <section id="cennik" className="bg-paper px-5 pb-24 lg:px-10 lg:pb-40">
      <Container className="lg:text-center">
        <h2 className="text-h1-m font-bold lg:text-h1">
          Płacisz za pojazdy. Nie za ludzi.
        </h2>
        <p className="mt-4 max-w-[660px] text-lead-m text-muted lg:mx-auto lg:mt-6 lg:text-lead">
          Kierowcy i pracownicy biura bez limitu. Naczepy i przyczepy nie liczą się
          do abonamentu.
        </p>

        {/* Poniżej 360px etykieta schodzi pod przełącznik — przy 390 stoi obok,
            jak w projekcie. */}
        <div className="mt-7 flex flex-wrap items-center gap-3 min-[360px]:flex-nowrap lg:mt-10 lg:inline-flex lg:gap-4">
          <div className="inline-flex rounded-btn border border-line bg-mist p-1">
            <button type="button" onClick={() => setYearly(false)} className={tabClass(!yearly)}>
              Miesięcznie
            </button>
            <button type="button" onClick={() => setYearly(true)} className={tabClass(yearly)}>
              Rocznie
            </button>
          </div>
          <span className="text-caption font-semibold text-blue">
            2 miesiące gratis
          </span>
        </div>

        <div className="mt-7 grid gap-4 text-left lg:mt-14 lg:grid-cols-2 lg:gap-6">
          {(['start', 'firma'] as const).map((key) => {
            const plan = plans[key];
            const highlighted = key === 'firma';

            return (
              <div
                key={key}
                className={`relative rounded-panel bg-white p-7 lg:p-10 ${
                  highlighted
                    ? 'border-[1.5px] border-blue/45 shadow-blue'
                    : 'border border-line'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <div className="text-h3-m font-semibold lg:text-h3">{plan.name}</div>
                  {highlighted && (
                    <div className="text-[13px] font-semibold text-blue lg:absolute lg:top-10 lg:right-10 lg:text-caption">
                      Najczęściej wybierany
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-baseline gap-1.5 lg:mt-6 lg:gap-2">
                  <span className="text-[44px] leading-[1.05] font-bold tracking-[-0.025em] lg:text-h1">
                    {plan[period].price}
                  </span>
                  <span className="text-[15px] text-muted lg:text-body">{unit}</span>
                </div>
                <div className="mt-1.5 text-caption text-muted lg:mt-2">
                  {plan[period].alt}
                </div>

                <div className="my-6 flex flex-col gap-2.5 border-y border-line py-5 text-[15px] lg:my-8 lg:gap-3 lg:py-6 lg:text-body">
                  {plan.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-3">
                      <span className="text-muted">{spec.label}</span>
                      <span className="text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2.5 text-[15px] lg:gap-3 lg:text-body">
                  {plan.features.map((feature) => (
                    <div key={feature}>{feature}</div>
                  ))}
                </div>

                <a
                  href="#trial"
                  className={`mt-6 flex h-[52px] items-center justify-center rounded-btn text-body font-semibold lg:mt-8 ${
                    highlighted
                      ? 'bg-blue text-white hover:text-white'
                      : 'border border-line text-ink hover:text-ink'
                  }`}
                >
                  Wypróbuj 14 dni
                </a>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-caption text-muted lg:mt-8">
          Bez umowy na czas określony. Rezygnujesz jednym kliknięciem. Twoje dane
          pobierzesz zawsze — także po rezygnacji.
        </p>
      </Container>
    </section>
  );
}
