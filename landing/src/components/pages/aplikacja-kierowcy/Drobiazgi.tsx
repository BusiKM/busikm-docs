import Link from '@/i18n/Link';
import { Section } from '@/components/ui/Section';
import { StoreBadges } from '@/components/ui/StoreBadges';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  kafelki: string[];
  ktoUzywa: string;
  kierowca: string;
}> = {
  pl: {
    naglowek: 'Drobiazgi, które widać dopiero w trasie.',
    kafelki: [
      'Tryb nocny',
      'Sześć języków',
      'Powiadomienia o nowym zleceniu',
      'Bateria wystarcza na całą zmianę',
      'Podgląd własnych tras z historii',
      'Kontakt z biurem jednym tapnięciem',
    ],
    ktoUzywa: 'Kto tego używa:',
    kierowca: 'Kierowca →',
  },
  en: {
    naglowek: 'Small things you only notice on the road.',
    kafelki: [
      'Dark mode',
      'Six languages',
      'New order notifications',
      'Battery lasts the whole shift',
      'Your own past routes to look back on',
      'Call the office in one tap',
    ],
    ktoUzywa: 'Who uses it:',
    kierowca: 'Driver →',
  },
};

/** Drobiazgi, odznaki sklepów i odnośnik do roli. */
export function Drobiazgi() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {t.kafelki.map((k) => (
            <div
              key={k}
              data-reveal
              className="rounded-card border border-line-dark bg-surface p-4.5 text-[15px] font-semibold lg:min-h-30 lg:p-7 lg:text-body"
            >
              {k}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 border-t border-line-dark pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:pt-16">
          <StoreBadges />
          <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {t.ktoUzywa}{' '}
            <Link href="/dla-kogo/kierowca" className="text-blue-light">
              {t.kierowca}
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
