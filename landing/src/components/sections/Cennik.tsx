'use client';

import { useState } from 'react';
import Link from '@/i18n/Link';
import { Section, Eyebrow } from '@/components/ui/Section';
import { linkProbny } from '@/content/zainteresowanie';
import { Licznik } from '@/components/motion/Licznik';
import { plans } from '@/content/cennik';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

const TEKSTY: Tlumaczenia<{
  naglowek: [string, string];
  lead: string;
  miesiecznie: string;
  rocznie: string;
  gratis: string;
  okres: { rok: string; miesiac: string };
  netto: string;
  wyroznienie: string;
  wezwanie: string;
  stopka: string;
}> = {
  pl: {
    naglowek: ['Płacisz za pojazdy.', 'Nie za ludzi.'],
    lead: 'Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się do abonamentu.',
    miesiecznie: 'Miesięcznie',
    rocznie: 'Rocznie',
    gratis: '2 miesiące gratis',
    okres: { rok: 'rok', miesiac: 'mies.' },
    netto: 'zł netto',
    wyroznienie: 'Najczęściej wybierany',
    wezwanie: 'Wypróbuj 14 dni',
    stopka:
      'Bez umowy na czas określony. Rezygnujesz jednym kliknięciem. Twoje dane pobierzesz zawsze — także po rezygnacji.',
  },
  en: {
    naglowek: ['You pay for vehicles.', 'Not for people.'],
    lead: 'Unlimited drivers and office staff. Trailers and semi-trailers don’t count towards your plan.',
    miesiecznie: 'Monthly',
    rocznie: 'Yearly',
    gratis: '2 months free',
    okres: { rok: 'year', miesiac: 'month' },
    netto: 'net',
    wyroznienie: 'Most popular',
    wezwanie: 'Try 14 days free',
    stopka:
      'No fixed-term contract. Cancel in one click. You can always download your data — even after you cancel.',
  },
};

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
  const jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const [yearly, setYearly] = useState(false);
  const period = yearly ? t.okres.rok : t.okres.miesiac;

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
              {t.naglowek[0]} <br className="hidden lg:inline" />
              {t.naglowek[1]}
            </h1>
          ) : (
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek.join(' ')}
            </h2>
          )}
          <p
            data-reveal
            className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
          >
            {t.lead}
          </p>
        </div>

        <div
          data-reveal
          className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-4"
        >
          <div className="inline-flex rounded-btn border border-line bg-mist p-1">
            <button type="button" onClick={() => setYearly(false)} className={tab(!yearly)}>
              {t.miesiecznie}
            </button>
            <button type="button" onClick={() => setYearly(true)} className={tab(yearly)}>
              {t.rocznie}
            </button>
          </div>
          <span className="rounded-full bg-blue-soft px-2.5 py-[5px] text-[13px] font-semibold text-blue-dark lg:px-3 lg:py-1.5 lg:text-caption">
            {t.gratis}
          </span>
        </div>

        <div
          data-reveal-group
          className="grid w-full gap-2.5 lg:max-w-[880px] lg:grid-cols-2 lg:gap-6"
        >
          {plans[jezyk].map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={`relative flex flex-col gap-5 rounded-card bg-white p-7 lg:gap-8 lg:rounded-panel lg:p-10 ${
                plan.highlighted ? 'border-2 border-blue' : 'border border-line'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-7 rounded-full bg-blue px-2.5 py-1 text-[12px] font-semibold text-white lg:left-10 lg:px-3 lg:text-[13px]">
                  {t.wyroznienie}
                </span>
              )}

              <div className="flex flex-col gap-3">
                <div className="text-[19px] font-semibold lg:text-[22px]">{plan.name}</div>
                <div className="flex items-baseline gap-1.5 lg:gap-2">
                  {/* Po angielsku waluta stoi przed kwotą: „PLN 149". */}
                  {jezyk === 'en' && (
                    <span className="text-[15px] text-muted lg:text-body">PLN</span>
                  )}
                  {/* Kwota dolicza się od poprzedniej — patrz `Licznik`.
                      Liczby w `content/cennik.ts` są tekstem ze spacją
                      rozdzielającą tysiące, więc tutaj wracają na liczbę,
                      a separator dokłada z powrotem licznik. */}
                  <Licznik
                    wartosc={Number((yearly ? plan.yearly : plan.monthly).replace(/\s/g, ''))}
                    className="text-[40px] font-bold tracking-[-0.03em] lg:text-5xl"
                  />
                  <span className="text-[15px] text-muted lg:text-body">
                    {t.netto} / {period}
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

              {/* Przycisk niesie to, co człowiek ma przed oczami: który plan
                  i który okres rozliczenia. Strona zapisu odczyta to z adresu,
                  a informacja dojedzie aż do powiadomienia na skrzynkę. */}
              <Link
                href={linkProbny({ plan: plan.id, okres: yearly ? 'rocznie' : 'miesiecznie' })}
                className={`mt-auto flex h-12 items-center justify-center rounded-btn text-[16px] font-semibold lg:h-13 lg:text-body ${
                  plan.highlighted
                    ? 'bg-blue text-white hover:bg-blue-dark hover:text-white'
                    : 'border border-line text-ink hover:border-muted hover:text-ink'
                }`}
              >
                {t.wezwanie}
              </Link>
            </div>
          ))}
        </div>

        <p
          data-reveal
          className="max-w-[560px] text-[13px] leading-relaxed text-muted lg:text-center lg:text-caption"
        >
          {t.stopka}
        </p>
      </div>
    </Section>
  );
}
