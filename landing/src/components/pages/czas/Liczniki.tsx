import { Section } from '@/components/ui/Section';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const liczniki = [
  { value: '6:07', udzial: 68, kolor: 'bg-blue' },
  { value: '0:40', udzial: 85, kolor: 'bg-ink' },
  { value: '11:00', udzial: 100, kolor: 'bg-green' },
  { value: '1:15', udzial: 30, kolor: 'bg-[#9A9AA2]' },
] as const;

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  /** Nazwa i opis każdego licznika — kolejność jak w `liczniki`. */
  opisy: readonly (readonly [string, string])[];
}> = {
  pl: {
    naglowek: 'Liczniki idą same',
    lead: 'Jazda, przerwa, odpoczynek, dyspozycyjność. Nikt nic nie zapisuje w zeszycie.',
    opisy: [
      ['Jazda', 'z 9:00 limitu dziennego'],
      ['Przerwa', 'do następnej przerwy'],
      ['Odpoczynek', 'wykonany w nocy'],
      ['Dyspozycyjność', 'załadunek i oczekiwanie'],
    ],
  },
  en: {
    naglowek: 'The counters run themselves',
    lead: 'Driving, break, rest, availability. Nobody writes anything down in a notebook.',
    opisy: [
      ['Driving', 'of the 9:00 daily limit'],
      ['Break', 'until the next break'],
      ['Rest', 'taken overnight'],
      ['Availability', 'loading and waiting'],
    ],
  },
};

/** 01 — cztery liczniki, które chodzą same. */
export function Liczniki() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-muted lg:text-lead">
            {t.lead}
          </p>
        </div>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {liczniki.map((l, i) => (
            <div
              key={l.kolor}
              data-reveal
              className="flex flex-col gap-3 rounded-card border border-line bg-white p-5 shadow-card lg:p-8"
            >
              <div className="text-[13px] text-muted lg:text-caption">{t.opisy[i][0]}</div>
              <div className="text-[30px] font-semibold tracking-[-0.03em] lg:text-[40px]">
                {l.value}
              </div>
              <div className="h-1.5 overflow-hidden rounded-[3px] bg-mist" aria-hidden>
                <div className={`h-full ${l.kolor}`} style={{ width: `${l.udzial}%` }} />
              </div>
              <div className="text-[12px] text-muted lg:text-[13px]">{t.opisy[i][1]}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
