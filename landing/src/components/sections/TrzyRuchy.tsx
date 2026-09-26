import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  steps: readonly (readonly [string, string, string])[];
}> = {
  pl: {
    naglowek: 'Trzy ruchy. Reszta dzieje się bez Ciebie.',
    steps: [
      ['01', 'Kierowca rusza', 'Włącza trasę w telefonie. Robi zdjęcie licznika. Tyle.'],
      [
        '02',
        'Dane same lecą',
        'Trasa, kilometry, czas pracy, paragony. Wszystko ląduje u Ciebie — nawet wtedy, gdy kierowca nie ma zasięgu.',
      ],
      [
        '03',
        'Miesiąc się zamyka',
        'Faktury dla klientów, koszty, przebieg i komplet dla księgowej. Jednym przyciskiem.',
      ],
    ],
  },
  en: {
    naglowek: 'Three moves. The rest happens without you.',
    steps: [
      ['01', 'The driver sets off', 'Starts the route on the phone. Snaps the odometer. That’s it.'],
      [
        '02',
        'The data sends itself',
        'Route, kilometres, working time, receipts. It all lands with you — even when the driver has no signal.',
      ],
      [
        '03',
        'The month closes',
        'Client invoices, costs, mileage and the full set for your accountant. With one button.',
      ],
    ],
  },
};

/** 6.4 — trzy ruchy. */
export function TrzyRuchy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section spacing="py-24 lg:py-40">
      <div className="flex flex-col gap-12 lg:gap-24">
        <h2
          data-reveal
          className="max-w-[900px] text-h2-m font-bold text-balance lg:text-h1"
        >
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid gap-9 lg:grid-cols-3 lg:gap-12">
          {t.steps.map(([n, title, body]) => (
            <div key={n} data-reveal className="flex flex-col gap-2.5 lg:gap-5">
              <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
                {n}
              </div>
              <div className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">{title}</div>
              <div className="text-[16px] leading-relaxed text-muted lg:text-body">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
