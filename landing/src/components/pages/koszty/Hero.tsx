import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ParagonMockup } from '@/components/mockups/ParagonMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul: [string, string];
  lead: string;
  label: string;
  note: string;
}> = {
  pl: {
    eyebrow: 'Koszty i paragony',
    tytul: ['Reklamówka paragonów.', 'Do wyrzucenia.'],
    lead: 'Kierowca robi zdjęcie na stacji, wybiera rodzaj kosztu i zlecenie. Kwotę, datę i sprzedawcę BusiKM odczyta sam.',
    label: 'Moje koszty · telefon, tryb nocny',
    note: 'Ekran „Moje koszty”: zwrot dla kierowcy, liczniki „Biuro pyta”, „Do uzupełnienia”, „Gotowe” i „Zaksięgowane”, przycisk „Dodaj paragon” i lista paragonów z miesiąca. Ten sam ekran co na stronie głównej.',
  },
  en: {
    eyebrow: 'Costs and receipts',
    tytul: ['The carrier bag of receipts.', 'Bin it.'],
    lead: 'The driver takes a photo at the fuel station and picks the cost type and the order. BusiKM reads the amount, date and merchant itself.',
    label: 'My costs · phone, dark mode',
    note: 'The “My costs” screen: the driver’s refund, counters for “Office asks”, “To complete”, “Ready” and “Booked”, an “Add receipt” button and the month’s receipts. The same screen as on the home page.',
  },
};

/** Nagłówek strony – jasny, z telefonem w perspektywie i odklejonym panelem pól. */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          {t.tytul[0]} <br className="hidden lg:inline" />
          {t.tytul[1]}
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          {t.lead}
        </p>
      </Container>

      <Container className="relative mt-16 flex flex-col items-center pb-24 lg:mt-24 lg:pb-40">
        <div data-reveal className="relative w-full lg:max-w-[600px]">
          <div
            aria-hidden
            className="absolute right-[20%] bottom-10 left-[20%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[110px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-koszty-paragon-phone.png"
              label={t.label}
              note={t.note}
              ratio="9:19.5"
              box="4:5"
              noteClassName="mx-auto max-w-[600px]"
            >
              <ParagonMockup />
            </MockupSlot>
          </div>
        </div>
      </Container>
    </section>
  );
}
