import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/ksiegowa/Hero';
import { MiesiacIFormat } from '@/components/pages/ksiegowa/MiesiacIFormat';
import { DziewiecZestawien } from '@/components/pages/ksiegowa/DziewiecZestawien';
import { ZamkniecieIHistoria } from '@/components/pages/ksiegowa/ZamkniecieIHistoria';
import { Walidacja } from '@/components/mockups/ksiegowa/Walidacja';
import { RozliczenieKierowcy } from '@/components/mockups/ksiegowa/RozliczenieKierowcy';
import { ZaproszenieKsiegowej } from '@/components/mockups/ksiegowa/ZaproszenieKsiegowej';

export const metadata = pageMetadata('co-robi/dane-dla-ksiegowej');

const pytania = [
  [
    'Czy moja księgowa będzie musiała się przestawiać?',
    'Nie. Pobiera plik i wczytuje do programu, którego już używa.',
  ],
  [
    'A jeśli mam biuro rachunkowe, nie księgową na etacie?',
    'To samo. Zapraszasz je mailem i dostaje własny dostęp do Twojej firmy.',
  ],
  [
    'Co, jeśli używa programu, którego nie ma na liście?',
    'Jest jeszcze zwykły arkusz, z osobną zakładką na każde zestawienie.',
  ],
] as const;

const drobiazgi = [
  'Kurs waluty zapisany przy dokumencie',
  'Zdjęcie paragonu zostaje dowodem',
  'Zestawienie użytych kursów za okres',
  'Wydruk karty czasu pracy',
  'Podgląd przed pobraniem',
  'Dostęp tylko do odczytu',
];

/**
 * Dane dla księgowej — podstrona wg projektu „BusiKM Dane dla księgowej"
 * z Claude Design (design/04-dane-dla-ksiegowej). Treść: docs/landing/05, rozdział A8.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MiesiacIFormat />
        <DziewiecZestawien />

        <Blok
          numer="04"
          tytul="System sam mówi, czego brakuje"
          tresc="Zanim plik pójdzie dalej, widać, co jest niekompletne."
          makieta={
            <MockupSlot
              file="mockup-ksiegowa-walidacja-desktop.png"
              label="Walidacja przed eksportem · desktop"
              note="Lista zestawień ze statusem komplet / do uzupełnienia i krótkim opisem braku. Bez czerwieni."
              ratio="4:3"
            >
              <Walidacja />
            </MockupSlot>
          }
        />

        <ZamkniecieIHistoria />

        <Blok
          strona="left"
          numer="07"
          tytul="Rozliczenie kierowców"
          tresc="Dni za granicą, diety, wypłata. Gotowe do wczytania."
          makieta={
            <MockupSlot
              file="mockup-ksiegowa-diety-desktop.png"
              label="Rozliczenie kierowcy z dietami · desktop"
              note="Trzy liczby (dni za granicą, diety, do wypłaty), tabela krajów z dniami i stawkami."
              ratio="4:3"
            >
              <RozliczenieKierowcy />
            </MockupSlot>
          }
        />

        <Blok
          tone="ink"
          numer="08"
          tytul="Księgowa z zewnątrz"
          tresc="Zapraszasz ją mailem, dostaje własny dostęp i widzi tylko to, co powinna."
          makieta={<ZaproszenieKsiegowej />}
        />

        <Drobiazgi
          tone="mist"
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
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
