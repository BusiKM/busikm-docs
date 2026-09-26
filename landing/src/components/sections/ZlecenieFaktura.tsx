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
    lead: 'Zlecenie i faktura to jedno. Kierowca kończy kurs, Ty sprawdzasz kwotę i wysyłasz — plik na mail klienta i zgłoszenie do systemu e-faktur, jednym kliknięciem. Nic nie przepisujesz.',
    bullets: [
      'Faktura powstaje z danych zlecenia',
      'Wysyłka do klienta i do systemu e-faktur jednym kliknięciem',
      'Korekty i zaliczki tą samą ścieżką',
    ],
    label: 'Zlecenie i faktura · desktop',
    opis: 'Karta zlecenia po lewej, faktura po prawej, strzałka między nimi, przycisk „Wyślij”, znaczniki: mail, e-faktura.',
  },
  en: {
    tytul1: 'The order becomes the invoice.',
    tytul2: 'Your client has it before you’re back at the office.',
    lead: 'The order and the invoice are one and the same. The driver finishes the job, you check the amount and send it — a file to the client’s inbox and a submission to KSeF, Poland’s national e-invoicing system, in one click. Nothing to retype.',
    bullets: [
      'The invoice is built from the order data',
      'Sent to the client and to KSeF in one click',
      'Corrections and advance invoices go the same way',
    ],
    label: 'Order and invoice · desktop',
    opis: 'Order card on the left, invoice on the right, an arrow between them, a “Send” button, tags: email, e-invoice.',
  },
};

/** 6.7 — ze zlecenia robi się faktura. */
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
          Odstęp u góry tylko na telefonie. Powiększenie działa w obie strony,
          więc przy skali 1,9 zrzut wychodzi ponad swoje pudło o 110 px.
          Sam monitor zaczyna się jednak niżej — nad nim jest pusty margines
          pliku — i wystarcza `mt-20`, czyli 80 px, żeby nie nachodził
          na listę powyżej.
        */}
        <div data-reveal className="mt-20 lg:order-1 lg:mt-0">
          <MockupSlot
            file="mockup-faktury-zlecenie-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
            imageScale={1.5}
            // Na telefonie zrzut wychodzi poza kolumnę tekstu, aż na pełną
            // szerokość ekranu — inaczej pulpit jest nieczytelnie mały.
            //
            // 1,9 wyliczone tak, żeby nic nie zostało ucięte. Sama ramka
            // monitora zajmuje 58% szerokości kadru — reszta to podstawka
            // i pusty margines pliku — więc przy pudle 327 px daje to 361 px
            // z 375 dostępnych, czyli po 7 px zapasu z każdej strony.
            imageScaleTelefon={1.9}
          >
            <ZlecenieFakturaMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
