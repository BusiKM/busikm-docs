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
        'Czy muszę korzystać z e-faktur?',
        'Wysyłka na mail działa tak jak dotąd. E-faktura jest drugim kanałem — włączasz ją wtedy, kiedy chcesz.',
      ],
      [
        'Co, jeśli klient chce faktury w euro?',
        'Wystawiasz w euro. Kurs i data przeliczenia zostają na dokumencie.',
      ],
      [
        'Czy faktura trafia od razu do księgowej?',
        'Tak, wchodzi do zestawienia sprzedaży za ten miesiąc. Księgowa nie musi o nią prosić.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Numeracja ciągła, bez luk',
      'Termin płatności liczony od wysyłki',
      'Przypomnienie o zaległej płatności',
      'Podgląd przed wysyłką',
      'Ten sam dokument w PDF i w e-fakturze',
      'Duplikat na życzenie klienta',
    ],
    wysylka: {
      tytul: 'Wysyłka jednym kliknięciem',
      tresc:
        'Plik idzie na mail klienta i do systemu e-faktur w tej samej chwili. Widzisz, że doszło.',
      label: 'Okno wysyłki · desktop',
      note: 'Mail klienta, załącznik PDF, przełącznik e-faktury, status „dostarczone”.',
    },
    kontrahenci: {
      tytul: 'Kontrahenci w jednym miejscu',
      tresc:
        'Raz wprowadzony klient podpowiada się przy każdym następnym zleceniu, z adresem i numerem.',
    },
    historia: {
      tytul: 'Historia',
      tresc: 'Co, komu i kiedy wysłano. Każdy dokument do podejrzenia i pobrania ponownie.',
      label: 'Lista dokumentów · desktop, tryb nocny',
      note: 'Wystawione dokumenty z datami wysyłki i statusem: dostarczone, zapłacone, termin.',
    },
    ktoUzywa: 'Kto tego używa:',
    link1: 'Właściciel →',
    link2: 'Księgowa →',
  },
  en: {
    pytania: [
      [
        'Do I have to use e-invoices?',
        'Sending by email works just as before. The e-invoice is a second channel — you switch it on when you want to.',
      ],
      [
        'What if a client wants an invoice in euros?',
        'You issue it in euros. The exchange rate and conversion date stay on the document.',
      ],
      [
        'Does the invoice go straight to my accountant?',
        'Yes, it goes into that month’s sales summary. Your accountant doesn’t have to ask for it.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'Continuous numbering, no gaps',
      'Payment term counted from sending',
      'Reminder about an overdue payment',
      'Preview before sending',
      'The same document as PDF and e-invoice',
      'A duplicate when the client asks',
    ],
    wysylka: {
      tytul: 'Sent in one click',
      tresc:
        'The file goes to the client’s email and to the e-invoicing system at the same moment. You can see it arrived.',
      label: 'Send window · desktop',
      note: 'Client email, PDF attachment, e-invoice toggle, “delivered” status.',
    },
    kontrahenci: {
      tytul: 'Clients in one place',
      tresc:
        'Enter a client once and they’re suggested on every order after that, with address and tax number.',
    },
    historia: {
      tytul: 'History',
      tresc: 'What was sent, to whom and when. Every document ready to view and download again.',
      label: 'Document list · desktop, dark mode',
      note: 'Issued documents with sending dates and status: delivered, paid, due.',
    },
    ktoUzywa: 'Who uses it:',
    link1: 'Owner →',
    link2: 'Accountant →',
  },
};

/**
 * Zlecenia i faktury — podstrona wg projektu „BusiKM Zlecenia i faktury"
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
