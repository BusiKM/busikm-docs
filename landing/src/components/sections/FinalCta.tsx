import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { appLinks } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  proba: string;
  demo: string;
}> = {
  pl: {
    naglowek: 'Zacznij od jednej trasy.',
    lead: '14 dni bez opłat. Bez umowy. Bez dzwonienia do handlowca.',
    proba: 'Wypróbuj 14 dni',
    demo: 'Zobacz demo',
  },
  en: {
    naglowek: 'Start with one route.',
    lead: '14 days free. No contract. No calls with a salesperson.',
    proba: 'Try 14 days free',
    demo: 'See the demo',
  },
};

/**
 * 6.21 — finał. Ten sam na stronie głównej i na wszystkich podstronach.
 *
 * `nota` dochodzi tylko na stronie kierowcy: to jedyne miejsce, gdzie
 * czytelnik nie jest osobą, która kupuje.
 */
export function FinalCta({ nota }: { nota?: string } = {}) {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink" spacing="py-24 lg:py-50">
      <div
        aria-hidden
        className="absolute right-[30%] -bottom-50 left-[30%] h-100 bg-blue opacity-25 blur-[160px]"
      />

      <div className="relative flex flex-col items-center gap-6 text-center lg:gap-8">
        <h2 data-reveal className="text-display-m font-bold text-balance lg:text-display">
          {t.naglowek}
        </h2>
        <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
          {t.lead}
        </p>
        <div data-reveal className="mt-2 flex w-full flex-col gap-2.5 lg:w-auto lg:flex-row lg:gap-3">
          <Button href={appLinks.trial} fullWidth className="lg:w-auto">
            {t.proba}
          </Button>
          <Button href={appLinks.demo} variant="secondaryDark" fullWidth className="lg:w-auto">
            {t.demo}
          </Button>
        </div>

        {nota && (
          <p
            data-reveal
            className="mt-6 max-w-[640px] border-t border-line-dark pt-8 text-[15px] leading-relaxed text-pretty text-ink-muted lg:mt-10 lg:text-body"
          >
            {nota}
          </p>
        )}
      </div>
    </Section>
  );
}
