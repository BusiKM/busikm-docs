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
    lead: 'Ubezpieczenie, przegląd, licencja, prawo jazdy, badania kierowców. System pilnuje dat i mówi wcześniej — Tobie i kierowcy.',
    bullets: [
      'Wszystko w jednym miejscu — pojazdy, firma, kierowcy',
      'Przypomnienie na długo przed terminem, Tobie i kierowcy',
      'Jeden ekran pokazuje, co wymaga uwagi w tym miesiącu',
    ],
    label: 'Dokumenty i terminy · desktop',
    opis: 'Lista dokumentów posortowana po dniach do końca ważności, paski w trzech kolorach. Amber tylko tu.',
  },
  en: {
    naglowek: 'Nothing expires quietly.',
    lead: 'Insurance, vehicle inspection, transport licence, driving licence, drivers’ medicals. The system keeps track of the dates and tells you early — you and the driver.',
    bullets: [
      'Everything in one place — vans, company, drivers',
      'A reminder well before the deadline, for you and the driver',
      'One screen shows what needs attention this month',
    ],
    label: 'Documents and deadlines · desktop',
    opis: 'A list of documents sorted by days until expiry, bars in three colours. Amber only here.',
  },
};

/** 6.13 — dokumenty i terminy. Jedyne miejsce na stronie z kolorem amber. */
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
