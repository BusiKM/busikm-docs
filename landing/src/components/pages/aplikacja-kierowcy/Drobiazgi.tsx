import Link from 'next/link';
import { Section } from '@/components/ui/Section';
import { StoreBadges } from '@/components/ui/StoreBadges';

const kafelki = [
  'Tryb nocny',
  'Sześć języków',
  'Powiadomienia o nowym zleceniu',
  'Bateria wystarcza na całą zmianę',
  'Podgląd własnych tras z historii',
  'Kontakt z biurem jednym tapnięciem',
];

/** Drobiazgi, odznaki sklepów i odnośnik do roli. */
export function Drobiazgi() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Drobiazgi, które widać dopiero w trasie.
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {kafelki.map((k) => (
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
            Kto tego używa:{' '}
            <Link href="/dla-kogo/kierowca" className="text-blue-light">
              Kierowca →
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
