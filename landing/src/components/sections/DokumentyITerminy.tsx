import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DokumentyMockup } from '@/components/mockups/DokumentyMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  bullets: string[];
  label: string;
  opis: string;
}> = {
  pl: {
    naglowek: 'Nic nie wygaśnie po cichu.',
    lead: 'Ubezpieczenie, przegląd, licencja, prawo jazdy, badania kierowców. System pilnuje dat i przypomina wcześniej – Tobie i dyspozytorowi.',
    bullets: [
      'Wszystko w jednym miejscu – pojazdy, firma, kierowcy',
      'Przypomnienia 60, 30, 14 i 3 dni przed terminem',
      'Jeden ekran pokazuje, co wymaga uwagi w tym miesiącu',
    ],
    label: 'Dokumenty i terminy · desktop',
    opis: 'Dokumenty: u góry liczniki – po terminie, brakuje, kończą się w 30 dni, w porządku – niżej lista z datą ważności i stanem każdego dokumentu.',
  },
  en: {
    naglowek: 'Nothing expires quietly.',
    lead: 'Insurance, vehicle inspection, transport licence, driving licence, drivers’ medicals. The system keeps track of the dates and reminds you early – you and the dispatcher.',
    bullets: [
      'Everything in one place – vans, company, drivers',
      'Reminders 60, 30, 14 and 3 days before the deadline',
      'One screen shows what needs attention this month',
    ],
    label: 'Documents and deadlines · desktop',
    opis: 'Documents: counters at the top – overdue, missing, expiring within 30 days, in order – and below, a list with each document’s expiry date and status.',
  },
};

/** 6.13 – dokumenty i terminy. Jedyne miejsce na stronie z kolorem amber. */
export function DokumentyITerminy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.lead}
          </p>
          <Bullets items={t.bullets} />
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dokumenty-terminy-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
          >
            <DokumentyMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
