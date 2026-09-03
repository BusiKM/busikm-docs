'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { JsonLd } from '@/components/seo/JsonLd';
import { pytaniaIOdpowiedzi } from '@/components/seo/schema';

/**
 * Pytania w akordeonie — ten sam układ na stronie głównej i na podstronach.
 * Domyślnie wszystkie zamknięte.
 *
 * Przy okazji wystawia te same pytania jako dane strukturalne — skoro
 * odpowiedzi i tak stoją w kodzie strony, opisanie ich robotowi nic nie
 * kosztuje. Znacznik jest tu, a nie na dwudziestu stronach osobno, żeby
 * treść widoczna i treść dla wyszukiwarki nie mogły się rozjechać.
 */
export function Akordeon({
  id,
  heading,
  items,
  tone = 'paper',
}: {
  id?: string;
  heading: string;
  items: readonly (readonly [string, string])[];
  tone?: 'paper' | 'mist' | 'surface';
}) {
  const [open, setOpen] = useState(-1);
  const dark = tone === 'surface';
  const linia = dark ? 'border-line-dark' : 'border-line';
  const drugi = dark ? 'text-ink-muted' : 'text-muted';

  return (
    <Section id={id} tone={tone}>
      <JsonLd dane={pytaniaIOdpowiedzi(items)} />
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold lg:text-h2">
          {heading}
        </h2>

        <div className={`flex flex-col border-t ${linia}`}>
          {items.map(([question, answer], i) => {
            const isOpen = open === i;
            return (
              <div key={question} className={`border-b ${linia}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[19px] leading-tight font-semibold tracking-[-0.01em] lg:py-6 lg:text-[22px]"
                >
                  <span>{question}</span>
                  <span
                    aria-hidden
                    className={`flex-none text-[22px] font-normal lg:text-[24px] ${drugi}`}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className={`pb-6 text-[16px] leading-relaxed lg:pr-16 lg:pb-7 lg:text-body ${drugi}`}>
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
