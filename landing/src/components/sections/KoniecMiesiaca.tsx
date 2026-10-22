import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EksportMockup } from '@/components/mockups/EksportMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul1: string;
  tytul2: string;
  lead: string;
  bullets: string[];
  nota: string;
  label: string;
  opis: string;
}> = {
  pl: {
    tytul1: 'Księgowa dostaje komplet.',
    tytul2: 'Jednym przyciskiem.',
    lead: 'Wybiera miesiąc, klika „Pobierz paczkę dla biura” i ma wszystko: dekrety do FK, rejestry VAT, płace i diety, delegacje, ewidencje przebiegu i JPK. W formacie, który wczyta do programu, którego już używa.',
    bullets: [
      'Comarch Optima, Insert GT, Symfonia albo Excel',
      'Pięć kroków miesiąca, przy każdym braku odnośnik',
      'Zamknięty miesiąc blokuje zmiany wstecz',
    ],
    nota: 'Księgowa może być z zewnątrz. Zapraszasz ją mailem, dostaje własny dostęp.',
    label: 'Rozliczenia → Eksporty · desktop',
    opis: 'Rozliczenia, zakładka Eksporty: dekrety do FK z wyborem programu (Comarch Optima, Insert GT, Symfonia), rejestry VAT, lista płac i diety, delegacje kierowców, ewidencje przebiegu, zwrot VAT z UE i JPK_FA, u góry przycisk „Pobierz paczkę dla biura”.',
  },
  en: {
    tytul1: 'Your accountant gets the full set.',
    tytul2: 'With one button.',
    lead: 'They pick the month, click “Download the package for the office” and have everything: ledger entries, VAT registers, payroll and allowances, business trips, mileage logs and JPK files. In a format they can load into the software they already use.',
    bullets: [
      'Comarch Optima, Insert GT, Symfonia or Excel',
      'Five month-end steps, each gap with a link to fix it',
      'A closed month locks changes after the fact',
    ],
    nota: 'Your accountant can be external. You invite them by email and they get their own login.',
    label: 'Settlements → Exports · desktop',
    opis: 'Settlements, Exports tab: ledger entries with a choice of software (Comarch Optima, Insert GT, Symfonia), VAT registers, payroll and allowances, drivers’ business trips, mileage logs, EU VAT refund and JPK_FA, with a “Download the package for the office” button at the top.',
  },
};

/** 6.12 – komplet dla księgowej. */
export function KoniecMiesiaca() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:order-2">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {t.lead}
          </p>
          <Bullets dark items={t.bullets} />
          <p data-reveal className="text-[13px] leading-relaxed text-ink-muted lg:text-caption">
            {t.nota}
          </p>
        </div>

        <div data-reveal className="lg:order-1">
          <MockupSlot
            file="mockup-ksiegowa-eksport-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
            dark
          >
            <EksportMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
