'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { linkProbny, nazwaPlanu, type PlanId } from '@/content/zainteresowanie';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

const MAX = 25;

/** Start do trzech pojazdów, dalej Firma; powyżej dziesięciu każdy kolejny +29 zł. */
function wylicz(pojazdy: number) {
  const plan: PlanId = pojazdy <= 3 ? 'start' : 'firma';
  const ponad = Math.max(0, pojazdy - 10);
  const cena = pojazdy <= 3 ? 149 : 299 + ponad * 29;
  return { plan, cena, ponad };
}

const TEKSTY: Tlumaczenia<{
  pytanie: string;
  odmiana: (n: number) => string;
  koniecStart: string;
  koniecFirma: string;
  zaplacisz: string;
  kwota: (n: number) => string;
  dopisek: (ponad: number) => string;
  puenta: string;
  wezwanie: string;
  drobne: string;
}> = {
  pl: {
    pytanie: 'Ile masz pojazdów?',
    odmiana: (n) => {
      if (n === 1) return 'pojazd';
      if (n >= 2 && n <= 4) return 'pojazdy';
      return 'pojazdów';
    },
    koniecStart: '3 · koniec Start',
    koniecFirma: '10 · koniec Firma',
    zaplacisz: 'Zapłacisz miesięcznie',
    kwota: (n) => `${n} zł`,
    dopisek: (ponad) => `299 + ${ponad} × 29 zł`,
    puenta: 'Tyle samo, ilu byś nie miał kierowców.',
    wezwanie: 'Wypróbuj 14 dni',
    drobne: 'Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.',
  },
  en: {
    pytanie: 'How many vehicles do you have?',
    odmiana: (n) => (n === 1 ? 'vehicle' : 'vehicles'),
    koniecStart: '3 · Start ends',
    koniecFirma: '10 · Business ends',
    zaplacisz: 'You pay per month',
    kwota: (n) => `PLN ${n}`,
    dopisek: (ponad) => `PLN 299 + ${ponad} × PLN 29`,
    puenta: 'The same, however many drivers you have.',
    wezwanie: 'Try 14 days free',
    drobne: 'You pay nothing for the first 14 days. Cancel in one click.',
  },
};

/**
 * Najważniejszy element tej strony: nie ile kosztuje plan, tylko ile zapłaci
 * ten konkretny człowiek przy swojej liczbie pojazdów.
 */
export function Kalkulator() {
  const jezyk: Jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const [pojazdy, setPojazdy] = useState(7);
  const { plan, cena, ponad } = wylicz(pojazdy);
  const dopisek = ponad > 0 ? t.dopisek(ponad) : null;

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
            <label htmlFor="pojazdy">{t.pytanie}</label>
          </h2>

          <div className="flex items-baseline gap-3">
            <span className="text-[56px] leading-none font-bold tracking-[-0.03em] lg:text-[72px]">
              {pojazdy}
            </span>
            <span className="text-lead-m text-ink-muted lg:text-lead">{t.odmiana(pojazdy)}</span>
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
            <span>{t.koniecStart}</span>
            <span>{t.koniecFirma}</span>
            <span>{MAX}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[2, 7, 14].map((n) => (
              <button key={n} type="button" onClick={() => setPojazdy(n)} className={skrot(n)}>
                {n} {t.odmiana(n)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 rounded-panel border border-line-dark bg-surface p-7 lg:gap-6 lg:p-14">
          <div className="text-[13px] text-ink-muted lg:text-caption">{t.zaplacisz}</div>
          <div className="text-[64px] leading-none font-bold tracking-[-0.04em] lg:text-[96px]">
            {t.kwota(cena)}
          </div>
          <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {jezyk === 'pl' ? (
              <>
                netto · plan <b className="text-paper">{nazwaPlanu(plan, jezyk)}</b>
              </>
            ) : (
              <>
                net · <b className="text-paper">{nazwaPlanu(plan, jezyk)}</b> plan
              </>
            )}
            {dopisek && <> · {dopisek}</>}
          </p>
          <p className="text-lead-m font-semibold text-balance lg:text-lead">{t.puenta}</p>

          <div className="mt-2 flex flex-col gap-2.5">
            {/* Kalkulator wie, do którego planu doszedł suwak — niech ta
                wiedza jedzie dalej. Okres miesięczny, bo taką kwotę pokazuje. */}
            <Button href={linkProbny({ plan, okres: 'miesiecznie' })} fullWidth>
              {t.wezwanie}
            </Button>
            <p className="text-[13px] text-ink-muted lg:text-caption">{t.drobne}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
