'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { linkProbny, nazwaPlanu, type PlanId } from '@/content/zainteresowanie';

const MAX = 25;

/** Start do trzech pojazdów, dalej Firma; powyżej dziesięciu każdy kolejny +29 zł. */
function wylicz(pojazdy: number) {
  const plan: PlanId = pojazdy <= 3 ? 'start' : 'firma';
  const ponad = Math.max(0, pojazdy - 10);
  const cena = pojazdy <= 3 ? 149 : 299 + ponad * 29;
  const dopisek = ponad > 0 ? `299 + ${ponad} × 29 zł` : null;
  return { plan, cena, dopisek };
}

function odmiana(n: number) {
  if (n === 1) return 'pojazd';
  if (n >= 2 && n <= 4) return 'pojazdy';
  return 'pojazdów';
}

/**
 * Najważniejszy element tej strony: nie ile kosztuje plan, tylko ile zapłaci
 * ten konkretny człowiek przy swojej liczbie pojazdów.
 */
export function Kalkulator() {
  const [pojazdy, setPojazdy] = useState(7);
  const { plan, cena, dopisek } = wylicz(pojazdy);

  const skrot = (n: number) =>
    `cursor-pointer rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors lg:px-4 lg:text-caption ${
      pojazdy === n
        ? 'bg-paper text-ink'
        : 'border border-line-dark text-ink-muted hover:border-line-dark-2'
    }`;

  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-6 lg:gap-8">
          <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
            <label htmlFor="pojazdy">Ile masz pojazdów?</label>
          </h2>

          <div className="flex items-baseline gap-3">
            <span className="text-[56px] leading-none font-bold tracking-[-0.03em] lg:text-[72px]">
              {pojazdy}
            </span>
            <span className="text-lead-m text-ink-muted lg:text-lead">{odmiana(pojazdy)}</span>
          </div>

          <input
            id="pojazdy"
            type="range"
            min={1}
            max={MAX}
            value={pojazdy}
            onChange={(e) => setPojazdy(Number(e.target.value))}
            className="w-full accent-blue"
          />

          <div className="flex justify-between text-[12px] text-ink-muted lg:text-[13px]">
            <span>3 · koniec Start</span>
            <span>10 · koniec Firma</span>
            <span>{MAX}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[2, 7, 14].map((n) => (
              <button key={n} type="button" onClick={() => setPojazdy(n)} className={skrot(n)}>
                {n} {odmiana(n)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-panel border border-line-dark bg-surface p-7 lg:gap-6 lg:p-14">
          <div className="text-[13px] text-ink-muted lg:text-caption">Zapłacisz miesięcznie</div>
          <div className="text-[64px] leading-none font-bold tracking-[-0.04em] lg:text-[96px]">
            {cena} zł
          </div>
          <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            netto · plan <b className="text-paper">{nazwaPlanu(plan)}</b>
            {dopisek && <> · {dopisek}</>}
          </p>
          <p className="text-lead-m font-semibold text-balance lg:text-lead">
            Tyle samo, ilu byś nie miał kierowców.
          </p>

          <div className="mt-2 flex flex-col gap-2.5">
            {/* Kalkulator wie, do którego planu doszedł suwak — niech ta
                wiedza jedzie dalej. Okres miesięczny, bo taką kwotę pokazuje. */}
            <Button href={linkProbny({ plan, okres: 'miesiecznie' })} fullWidth>
              Wypróbuj 14 dni
            </Button>
            <p className="text-[13px] text-ink-muted lg:text-caption">
              Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
