'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Section, Eyebrow } from '@/components/ui/Section';
import { appLinks } from '@/content/navigation';
import { plans } from '@/content/cennik';

/**
 * 6.18 — cennik. Przełącznik miesięcznie / rocznie, jak w projekcie.
 *
 * Ta sama sekcja otwiera stronę `/cennik` — tam dostaje nadtytuł i nagłówek
 * pierwszego stopnia, bo jest nagłówkiem strony, a nie jedną z sekcji.
 */
export function Cennik({
  nadtytul,
  jakoH1 = false,
}: {
  nadtytul?: string;
  jakoH1?: boolean;
} = {}) {
  const [yearly, setYearly] = useState(false);
  const period = yearly ? 'rok' : 'mies.';

  const tab = (active: boolean) =>
    `cursor-pointer rounded-[9px] px-4 py-2.5 text-[14px] font-semibold transition-colors lg:px-5 lg:text-[15px] ${
      active ? 'bg-white text-ink shadow-tab' : 'text-muted'
    }`;

  return (
    <Section id="cennik">
      <div className="flex flex-col gap-8 lg:items-center lg:gap-14">
        <div className="flex flex-col gap-5 lg:items-center lg:gap-6 lg:text-center">
          {nadtytul && <Eyebrow>{nadtytul}</Eyebrow>}
          {jakoH1 ? (
            <h1 data-reveal className="text-display-m font-bold text-balance lg:text-display">
              Płacisz za pojazdy. <br className="hidden lg:inline" />
              Nie za ludzi.
            </h1>
          ) : (
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Płacisz za pojazdy. Nie za ludzi.
            </h2>
          )}
          <p
            data-reveal
            className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
          >
            Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się
            do abonamentu.
          </p>
        </div>

        <div
          data-reveal
          className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-4"
        >
          <div className="inline-flex rounded-btn border border-line bg-mist p-1">
            <button type="button" onClick={() => setYearly(false)} className={tab(!yearly)}>
              Miesięcznie
            </button>
            <button type="button" onClick={() => setYearly(true)} className={tab(yearly)}>
              Rocznie
            </button>
          </div>
          <span className="rounded-full bg-blue-soft px-2.5 py-[5px] text-[13px] font-semibold text-blue-dark lg:px-3 lg:py-1.5 lg:text-caption">
            2 miesiące gratis
          </span>
        </div>

        <div
          data-reveal-group
          className="grid w-full gap-2.5 lg:max-w-[880px] lg:grid-cols-2 lg:gap-6"
        >
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={`relative flex flex-col gap-5 rounded-card bg-white p-7 lg:gap-8 lg:rounded-panel lg:p-10 ${
                plan.highlighted ? 'border-2 border-blue' : 'border border-line'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-blue px-2.5 py-1 text-[12px] font-semibold text-white lg:left-10 lg:px-3 lg:text-[13px]">
                  Najczęściej wybierany
                </span>
              )}

              <div className="flex flex-col gap-3">
                <div className="text-[19px] font-semibold lg:text-[22px]">{plan.name}</div>
                <div className="flex items-baseline gap-1.5 lg:gap-2">
                  <span className="text-[40px] font-bold tracking-[-0.03em] lg:text-5xl">
                    {yearly ? plan.yearly : plan.monthly}
                  </span>
                  <span className="text-[15px] text-muted lg:text-body">
                    zł netto / {period}
                  </span>
                </div>
              </div>

              <div className="flex flex-col border-y border-line text-caption leading-relaxed lg:text-[15px]">
                {plan.specs.map(([label, value], i) => (
                  <div
                    key={label}
                    className={`flex justify-between gap-3 py-2.5 lg:py-3 ${
                      i > 0 ? 'border-t border-line' : ''
                    }`}
                  >
                    <span className="text-muted">{label}</span>
                    <b className="text-right">{value}</b>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 text-caption leading-relaxed lg:gap-2.5 lg:text-[15px]">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex gap-2.5 lg:gap-3">
                    <span aria-hidden className="text-blue">
                      ✓
                    </span>
                    {feature}
                  </div>
                ))}
              </div>

              <Link
                href={appLinks.trial}
                className={`mt-auto flex h-12 items-center justify-center rounded-btn text-[16px] font-semibold lg:h-13 lg:text-body ${
                  plan.highlighted
                    ? 'bg-blue text-white hover:bg-blue-dark hover:text-white'
                    : 'border border-line text-ink hover:border-muted hover:text-ink'
                }`}
              >
                Wypróbuj 14 dni
              </Link>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="max-w-[560px] text-[13px] leading-relaxed text-muted lg:text-center lg:text-caption"
        >
          Bez umowy na czas określony. Rezygnujesz jednym kliknięciem. Twoje dane pobierzesz
          zawsze — także po rezygnacji.
        </p>
      </div>
    </Section>
  );
}
