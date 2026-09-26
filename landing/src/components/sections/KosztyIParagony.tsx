import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ParagonMockup } from '@/components/mockups/ParagonMockup';
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
    naglowek: 'Reklamówka paragonów. Do wyrzucenia.',
    lead: 'Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same, a koszt trafia do właściwego zlecenia i właściwego pojazdu.',
    bullets: [
      'Paliwo, opłaty drogowe, hotel, prom, parking, naprawa',
      'Obca waluta przeliczona automatycznie',
      'Zdjęcie zostaje jako dowód',
    ],
    label: 'Koszt z paragonu · telefon',
    opis: 'Telefon ze zdjęciem paragonu (perspektywa), obok „odklejony” panel z rozpoznanymi polami podświetlonymi na zielono.',
  },
  en: {
    naglowek: 'A carrier bag of receipts. Straight in the bin.',
    lead: 'The driver takes a photo at the fuel station. The amount, date and seller fill themselves in, and the cost goes to the right order and the right van.',
    bullets: [
      'Fuel, tolls, hotel, ferry, parking, repairs',
      'Foreign currency converted automatically',
      'The photo stays on file as proof',
    ],
    label: 'Cost from a receipt · phone',
    opis: 'A phone with a photo of a receipt (in perspective), next to it a “peeled-off” panel with the recognised fields highlighted in green.',
  },
};

/** 6.11 — koszty i paragony. */
export function KosztyIParagony() {
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
            file="mockup-koszty-paragon-phone.png"
            label={t.label}
            note={t.opis}
            ratio="9:19.5"
            box="4:5"
          >
            <ParagonMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
