import Link from 'next/link';
import { Section } from '@/components/ui/Section';

const kafelki = [
  'Zlecenie z pliku klienta',
  'Podpowiedź wolnego kierowcy',
  'Historia zleceń z filtrami',
  'Wysyłka zlecenia na telefon',
  'Statusy widoczne u klienta',
  'Dwa zlecenia na jednym przejeździe',
];

/** Drobiazgi i odnośniki do ról. */
export function Drobiazgi() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Drobiazgi, które widać dopiero w robocie.
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

        <p className="border-t border-line-dark pt-10 text-[16px] leading-relaxed text-ink-muted lg:pt-16 lg:text-body">
          Kto tego używa:{' '}
          <Link href="/dla-kogo/dyspozytor" className="text-blue">
            Dyspozytor →
          </Link>
          <span className="mx-3">·</span>
          <Link href="/dla-kogo/wlasciciel" className="text-blue">
            Właściciel →
          </Link>
        </p>
      </div>
    </Section>
  );
}
