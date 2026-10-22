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
    lead: 'Kierowca robi zdjęcie na stacji, wybiera rodzaj kosztu i zlecenie. Kwotę, datę i sprzedawcę BusiKM odczyta sam, a koszt trafia do właściwego zlecenia.',
    bullets: [
      'Paliwo, opłaty drogowe, hotel, prom, parking, naprawa',
      'Koszt w obcej walucie przeliczony po kursie z dnia',
      'Faktury z KSeF i z maila wpadają same',
    ],
    label: 'Moje koszty · telefon, tryb nocny',
    opis: 'Ekran „Moje koszty”: zwrot dla kierowcy, liczniki „Biuro pyta”, „Do uzupełnienia”, „Gotowe” i „Zaksięgowane”, przycisk „Dodaj paragon” i lista paragonów z miesiąca.',
  },
  en: {
    naglowek: 'A carrier bag of receipts. Straight in the bin.',
    lead: 'The driver takes a photo at the fuel station and picks the cost type and the order. BusiKM reads the amount, date and seller itself, and the cost goes to the right order.',
    bullets: [
      'Fuel, tolls, hotel, ferry, parking, repairs',
      'Foreign-currency costs converted at the day’s rate',
      'Invoices from KSeF and email arrive by themselves',
    ],
    label: 'My costs · phone, dark mode',
    opis: 'The “My costs” screen: the driver’s refund, counters for “Office asks”, “To complete”, “Ready” and “Booked”, an “Add receipt” button and the month’s receipts.',
  },
};

/** 6.11 – koszty i paragony. */
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
