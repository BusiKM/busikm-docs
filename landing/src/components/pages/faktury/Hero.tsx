import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ZlecenieIFaktura } from '@/components/mockups/faktury/ZlecenieIFaktura';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek1: string;
  naglowek2: string;
  lead: string;
  label: string;
  note: string;
}> = {
  pl: {
    eyebrow: 'Zlecenia i faktury',
    naglowek1: 'Ze zlecenia robi się faktura.',
    naglowek2: 'Klient ma ją, zanim wrócisz do biura.',
    lead: 'Kierowca kończy kurs, Ty sprawdzasz kwotę i wysyłasz do KSeF. Mail z PDF do klienta zlecasz od razu – wyjdzie po nadaniu numeru. Niczego nie przepisujesz.',
    label: 'Karta faktury · desktop 1440',
    note: 'Faktura FV/031/10/2026: droga wystawiona → w KSeF → u klienta → zapłacona, windykacja z odsetkami, przypomnieniem i notą obciążeniową, obok numer KSeF z plikiem XML i kodem QR oraz stan płatności.',
  },
  en: {
    eyebrow: 'Orders and invoices',
    naglowek1: 'The order turns into an invoice.',
    naglowek2: 'The client has it before you’re back at the office.',
    lead: 'The driver finishes the job, you check the amount and send it to KSeF. You schedule the email with the PDF right away – it goes out once KSeF assigns a number. Nothing to retype.',
    label: 'Invoice card · desktop 1440',
    note: 'Invoice FV/031/10/2026: its path issued → in KSeF → with the client → paid, debt collection with interest, a reminder and a debit note, alongside the KSeF number with the XML file and QR code, and the payment status.',
  },
};

/** Nagłówek strony – jasny, na siatce, z pełnym oknem aplikacji pod spodem. */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
      />

      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1080px] text-display-m font-bold text-balance lg:text-display"
        >
          {t.naglowek1} <br className="hidden lg:inline" />
          {t.naglowek2}
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          {t.lead}
        </p>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div
          aria-hidden
          className="absolute right-[10%] bottom-40 left-[10%] h-30 rounded-[50%] bg-blue opacity-25 blur-[70px] lg:bottom-50 lg:h-50 lg:blur-[120px]"
        />
        <div data-reveal className="relative">
          <MockupSlot
            file="mockup-faktury-ekran-desktop.png"
            label={t.label}
            note={t.note}
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <ZlecenieIFaktura />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
