import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ZlecenieFakturaMockup } from '@/components/mockups/ZlecenieFakturaMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul1: string;
  tytul2: string;
  lead: string;
  bullets: string[];
  label: string;
  opis: string;
}> = {
  pl: {
    tytul1: 'Ze zlecenia robi się faktura.',
    tytul2: 'Klient ma ją, zanim wrócisz do biura.',
    lead: 'Zlecenie i faktura to jedno. Kierowca kończy kurs, Ty sprawdzasz kwotę i klikasz „Wystaw i wyślij do KSeF”. Wysyłkę do klienta zlecasz od razu, a PDF z kodem QR wychodzi mailem, gdy KSeF nada numer. Nic nie przepisujesz.',
    bullets: [
      'Faktura powstaje z danych zlecenia',
      'KSeF jednym przyciskiem, mail do klienta po nadaniu numeru',
      'Zaliczki, korekty i faktura zbiorcza z kilku zleceń',
    ],
    label: 'Zlecenie i faktura · desktop',
    opis: 'Zlecenie Radom → Köln, zakładka Finanse: fracht w euro przeliczony po kursie NBP, koszty kursu, wynik i marża, obok faktura FV/029/10/2026 ze statusem „W KSeF” i przyciskiem „Wyślij klientowi”.',
  },
  en: {
    tytul1: 'The order becomes the invoice.',
    tytul2: 'Your client has it before you’re back at the office.',
    lead: 'The order and the invoice are one and the same. The driver finishes the job, you check the amount and click “Issue and send to KSeF”, Poland’s national e-invoicing system. You schedule the email to the client straight away, and the PDF with a QR code goes out once KSeF assigns a number. Nothing to retype.',
    bullets: [
      'The invoice is built from the order data',
      'KSeF in one click, the client’s email once the number is in',
      'Advance invoices, corrections and one invoice for several orders',
    ],
    label: 'Order and invoice · desktop',
    opis: 'Order Radom → Köln, Finance tab: freight in euros converted at the NBP rate, run costs, result and margin, next to invoice FV/029/10/2026 marked “In KSeF” with a “Send to client” button.',
  },
};

/** 6.7 – ze zlecenia robi się faktura. */
export function ZlecenieFaktura() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:order-2">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.lead}
          </p>
          <Bullets items={t.bullets} />
        </div>

        {/*
          Zrzut v2 stoi w tej samej ramce laptopa co reszta strony i wypełnia
          szerokość kadru, więc nie potrzebuje powiększenia. Poprzedni plik
          był monitorem na kwadratowym płótnie – stąd dawne skale 1,5 i 1,9.
        */}
        <div data-reveal className="lg:order-1">
          <MockupSlot
            file="mockup-faktury-zlecenie-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
          >
            <ZlecenieFakturaMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
