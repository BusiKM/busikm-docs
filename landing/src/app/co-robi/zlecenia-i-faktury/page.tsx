import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/faktury/Hero';
import { JednoZrodlo } from '@/components/pages/faktury/JednoZrodlo';
import { KorektyIWaluty } from '@/components/pages/faktury/KorektyIWaluty';
import { OknoWysylki } from '@/components/mockups/faktury/OknoWysylki';
import { Kontrahenci } from '@/components/mockups/faktury/Kontrahenci';
import { ListaDokumentow } from '@/components/mockups/faktury/ListaDokumentow';

export const metadata = pageMetadata('co-robi/zlecenia-i-faktury');

const pytania = [
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
] as const;

const drobiazgi = [
  'Numeracja ciągła, bez luk',
  'Termin płatności liczony od wysyłki',
  'Przypomnienie o zaległej płatności',
  'Podgląd przed wysyłką',
  'Ten sam dokument w PDF i w e-fakturze',
  'Duplikat na życzenie klienta',
];

/**
 * Zlecenia i faktury — podstrona wg projektu „BusiKM Zlecenia i faktury"
 * z Claude Design (design/06-zlecenia-i-faktury). Treść: docs/landing/05, rozdział A5.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JednoZrodlo />

        <Blok
          numer="02"
          tytul="Wysyłka jednym kliknięciem"
          tresc="Plik idzie na mail klienta i do systemu e-faktur w tej samej chwili. Widzisz, że doszło."
          makieta={
            <MockupSlot
              file="mockup-faktury-wysylka-desktop.png"
              label="Okno wysyłki · desktop"
              note="Mail klienta, załącznik PDF, przełącznik e-faktury, status „dostarczone”."
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
          tytul="Kontrahenci w jednym miejscu"
          tresc="Raz wprowadzony klient podpowiada się przy każdym następnym zleceniu, z adresem i numerem."
          makieta={<Kontrahenci />}
        />

        <Blok
          tone="ink"
          numer="06"
          tytul="Historia"
          tresc="Co, komu i kiedy wysłano. Każdy dokument do podejrzenia i pobrania ponownie."
          makieta={
            <MockupSlot
              file="mockup-faktury-historia-desktop.png"
              label="Lista dokumentów · desktop, tryb nocny"
              note="Wystawione dokumenty z datami wysyłki i statusem: dostarczone, zapłacone, termin."
              ratio="4:3"
              dark
            >
              <ListaDokumentow />
            </MockupSlot>
          }
        />

        <Drobiazgi
          tone="mist"
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
              <Link href="/dla-kogo/wlasciciel" className="text-blue">
                Właściciel →
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/ksiegowa" className="text-blue">
                Księgowa →
              </Link>
            </>
          }
        />

        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
