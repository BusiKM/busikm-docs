import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ naglowek: string; items: readonly (readonly [string, string])[] }> = {
  pl: {
    naglowek: 'Cztery rzeczy, których nie będziesz już robił.',
    items: [
      ['Dzwonisz do kierowcy: „gdzie jesteś?”', 'Widzisz go na mapie'],
      ['Wieczorem przepisujesz do Excela', 'Liczy się samo, w trakcie'],
      ['Zbierasz paragony z reklamówki', 'Kierowca robi zdjęcie w trasie'],
      ['Odpisujesz księgowej, czego brakuje', 'Dostaje komplet jednym przyciskiem'],
    ],
  },
  en: {
    naglowek: 'Four things you won’t be doing any more.',
    items: [
      ['You ring the driver: “Where are you?”', 'You see them on the map'],
      ['You copy it all into Excel at night', 'It adds up by itself, as it happens'],
      ['You dig receipts out of a carrier bag', 'The driver snaps a photo on the road'],
      ['You tell your accountant what’s missing', 'They get the full set with one button'],
    ],
  },
};

/** 6.2 — co znika z dnia. Zdanie przekreślone i zdanie po nim. */
export function CzteryRzeczy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="mist">
      <div className="flex flex-col gap-12 lg:gap-20">
        <h2
          data-reveal
          className="max-w-[720px] text-h2-m font-semibold text-balance lg:text-h2"
        >
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid gap-7 lg:grid-cols-4 lg:gap-10">
          {t.items.map(([before, after]) => (
            <div
              key={after}
              data-reveal
              className="flex flex-col gap-2 border-t border-line pt-5 lg:gap-3.5 lg:pt-6"
            >
              <div className="text-[16px] leading-relaxed text-muted line-through lg:text-body">
                {before}
              </div>
              <div className="text-[22px] leading-tight font-semibold tracking-[-0.01em]">
                {after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
