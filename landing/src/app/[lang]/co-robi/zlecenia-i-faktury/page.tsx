import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { metadataPodstrony } from '@/lib/metadata';
import { biezacyJezyk, jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { Hero } from '@/components/pages/faktury/Hero';
import { JednoZrodlo } from '@/components/pages/faktury/JednoZrodlo';
import { KorektyIWaluty } from '@/components/pages/faktury/KorektyIWaluty';
import { OknoWysylki } from '@/components/mockups/faktury/OknoWysylki';
import { Kontrahenci } from '@/components/mockups/faktury/Kontrahenci';
import { ListaDokumentow } from '@/components/mockups/faktury/ListaDokumentow';

export const generateMetadata = metadataPodstrony('co-robi/zlecenia-i-faktury');

type Tekst = { tytul: string; tresc: string };

const TEKSTY: Tlumaczenia<{
  pytania: readonly (readonly [string, string])[];
  naglowekPytan: string;
  drobiazgi: string[];
  wysylka: Tekst & { label: string; note: string };
  kontrahenci: Tekst;
  historia: Tekst & { label: string; note: string };
  ktoUzywa: string;
  link1: string;
  link2: string;
}> = {
  pl: {
    pytania: [
      [
        'Czy faktura musi iść przez KSeF?',
        'Tak. Faktury idą przez KSeF, a BusiKM wysyła je za Ciebie. Gdy KSeF nie działa, wystawiasz w trybie offline, a system dośle fakturę później.',
      ],
      [
        'Co, jeśli klient chce faktury w euro?',
        'Wystawiasz w euro. Kurs NBP z dnia przed datą sprzedaży zostaje zapisany na dokumencie.',
      ],
      [
        'Czy faktura trafia od razu do księgowej?',
        'Tak, trafia do rejestru VAT sprzedaży za ten miesiąc. Księgowa widzi ją w BusiKM i nie musi o nią prosić.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Numeracja ciągła, bez luk',
      'Termin płatności z karty klienta',
      'Przypomnienia o płatności – Ty klikasz „Wyślij”',
      'CMR wypełnia się sam z danych zlecenia',
      'PDF z kodem QR z KSeF',
      'PDF wyślesz ponownie jednym kliknięciem',
    ],
    wysylka: {
      tytul: 'Jednym przyciskiem do KSeF',
      tresc:
        'Klikasz „Wystaw i wyślij do KSeF”. Wysyłkę do klienta zlecasz od razu – PDF z kodem QR wyjdzie mailem, razem z CMR, gdy KSeF nada numer. Na fakturze widzisz drogę: wystawiona, w KSeF, u klienta, zapłacona. Chcesz wysłać jeszcze raz albo na inny adres – masz „Wyślij klientowi”.',
      label: 'Okno „Wyślij klientowi” · desktop',
      note: 'Wysyłka FV/031/10/2026: adres z karty klienta, temat i treść z numerem KSeF, obok podgląd maila z załącznikiem PDF i przycisk „Wyślij”.',
    },
    kontrahenci: {
      tytul: 'Kontrahenci w jednym miejscu',
      tresc:
        'Wpisujesz NIP albo numer VAT z UE – nazwa i adres wpisują się same z GUS i VIES. Co noc sprawdzamy status VAT i rachunek na Białej Liście, a klient podpowiada się przy każdym kolejnym zleceniu.',
    },
    historia: {
      tytul: 'Kto nie zapłacił',
      tresc: 'Widzisz, kto zalega, ile dni i ile wpłynie w najbliższych tygodniach. Odsetki i rekompensatę 40 € BusiKM policzy sam. Przypomnienie albo notę wysyłasz jednym kliknięciem.',
      label: 'Lista faktur · desktop, tryb nocny',
      note: 'Faktury: liczniki – do zapłaty, po terminie, zapłacone, KSeF – zakładki od szkiców po korekty, w tabeli termin płatności, stan płatności i status w KSeF.',
    },
    ktoUzywa: 'Kto tego używa:',
    link1: 'Właściciel →',
    link2: 'Księgowa →',
  },
  en: {
    pytania: [
      [
        'Does the invoice have to go through KSeF?',
        'Yes. Invoices go through KSeF, and BusiKM sends them for you. If KSeF is down, you issue in offline mode and the system sends the invoice later.',
      ],
      [
        'What if a client wants an invoice in euros?',
        'You issue it in euros. The NBP rate from the day before the date of sale is saved on the document.',
      ],
      [
        'Does the invoice go straight to my accountant?',
        'Yes, it goes into that month’s sales VAT register. Your accountant sees it in BusiKM and doesn’t have to ask for it.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'Continuous numbering, no gaps',
      'Payment term taken from the client card',
      'Payment reminders – you click “Send”',
      'The CMR fills itself in from the order details',
      'PDF with the KSeF QR code',
      'Resend the PDF in one click',
    ],
    wysylka: {
      tytul: 'One button to KSeF',
      tresc:
        'You click “Issue and send to KSeF”. You schedule the email to the client straight away – the PDF with a QR code goes out, along with the CMR, as soon as KSeF assigns a number. On the invoice you see its path: issued, in KSeF, with the client, paid. Want to send it again or to another address? There’s “Send to client”.',
      label: '“Send to client” window · desktop',
      note: 'Sending FV/031/10/2026: the address from the client card, a subject and message with the KSeF number, and a preview of the email with the PDF attached and a “Send” button.',
    },
    kontrahenci: {
      tytul: 'Clients in one place',
      tresc:
        'You type in the Polish tax number (NIP) or an EU VAT number – the name and address fill in by themselves from the Polish business register (GUS) and VIES. Every night we check the VAT status and the bank account on the Polish VAT White List, and the client is suggested on every order after that.',
    },
    historia: {
      tytul: 'Who hasn’t paid',
      tresc: 'You see who owes you, how many days late, and how much is coming in over the next few weeks. BusiKM works out the interest and the €40 compensation itself. You send a reminder or a debit note in one click.',
      label: 'Invoice list · desktop, dark mode',
      note: 'Invoices: counters – due, overdue, paid, KSeF – tabs from drafts to corrections, and a table with payment terms, payment status and KSeF status.',
    },
    ktoUzywa: 'Who uses it:',
    link1: 'Owner →',
    link2: 'Accountant →',
  },
};

/**
 * Zlecenia i faktury – podstrona wg projektu „BusiKM Zlecenia i faktury"
 * z Claude Design (design/06-zlecenia-i-faktury). Treść: docs/landing/05, rozdział A5.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JednoZrodlo />

        <Blok
          numer="02"
          tytul={t.wysylka.tytul}
          tresc={t.wysylka.tresc}
          makieta={
            <MockupSlot
              file="mockup-faktury-wysylka-desktop.png"
              label={t.wysylka.label}
              note={t.wysylka.note}
              ratio="4:3"
            >
              <OknoWysylki />
            </MockupSlot>
          }
        />

        <KorektyIWaluty />

        <Blok
          strona="left"
          numer="05"
          tytul={t.kontrahenci.tytul}
          tresc={t.kontrahenci.tresc}
          makieta={<Kontrahenci />}
        />

        <Blok
          tone="ink"
          numer="06"
          tytul={t.historia.tytul}
          tresc={t.historia.tresc}
          makieta={
            <MockupSlot
              file="mockup-faktury-historia-desktop.png"
              label={t.historia.label}
              note={t.historia.note}
              ratio="4:3"
              dark
            >
              <ListaDokumentow />
            </MockupSlot>
          }
        />

        <Drobiazgi
          tone="mist"
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/wlasciciel">
                {t.link1}
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/ksiegowa">
                {t.link2}
              </Link>
            </>
          }
        />

        <Akordeon heading={t.naglowekPytan} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
