import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/trasy/Hero';
import { MapaIKlient } from '@/components/pages/trasy/MapaIKlient';
import { KrajeIPrzejazd } from '@/components/pages/trasy/KrajeIPrzejazd';
import { PrzeliczonaTrasa } from '@/components/mockups/trasy/PrzeliczonaTrasa';
import { ListaTras } from '@/components/mockups/trasy/ListaTras';

export const metadata = pageMetadata('co-robi/trasy-i-mapa');

const pytania = [
  [
    'Czy kierowca musi coś włączać?',
    'Nie. Trasa nagrywa się od przycisku „Rozpocznij trasę”, telefon może zostać w kieszeni.',
  ],
  [
    'Co, gdy telefon straci zasięg?',
    'Trasa zapisuje się dalej w telefonie i dosyła, gdy sygnał wróci. Na mapie zostaje ostatnia znana pozycja z godziną.',
  ],
  [
    'Czy to śledzenie kierowcy po godzinach?',
    'Nie. Nagrywa się trasa zlecenia, między „Rozpocznij” a „Zakończ”. Po zakończeniu pozycja nie jest zbierana.',
  ],
] as const;

const drobiazgi = [
  'Ostatnia znana pozycja zostaje po utracie zasięgu',
  'Filtr po kierowcy i po pojeździe',
  'Kilometry z trasy, nie z licznika przepisanego ręcznie',
  'Postoje dłuższe niż 15 minut zaznaczone',
  'Podgląd trasy z dowolnego dnia',
  'Mapa w trybie nocnym',
];

/**
 * Trasy i mapa floty — podstrona wg projektu „BusiKM Trasy i mapa floty"
 * z Claude Design (design/07-trasy-i-mapa). Treść: docs/landing/05, rozdział A3.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MapaIKlient />

        <Blok
          numer="03"
          tytul="Trasa układa się sama"
          tresc="System proponuje przejazd i bierze pod uwagę, co się dzieje na drodze. Korek, wypadek, zamknięty odcinek — trasa przelicza się, a kierowca dostaje nową wersję w telefonie w tej samej chwili."
          makieta={
            <MockupSlot
              file="mockup-trasy-przeliczenie-desktop.png"
              label="Trasa przeliczona · desktop"
              note="Stara i nowa wersja obok siebie, znacznik korka, różnica w czasie dojazdu."
              ratio="4:3"
            >
              <PrzeliczonaTrasa />
            </MockupSlot>
          }
        />

        <Blok
          tone="ink"
          strona="left"
          numer="04"
          tytul="Historia tras"
          tresc="Każdy przejazd zapisany: kilometry, czas, postoje. Do sprawdzenia po miesiącu i po roku."
          makieta={
            <MockupSlot
              file="mockup-trasy-lista-desktop.png"
              label="Lista tras z filtrami · desktop, tryb nocny"
              note="Filtry: data, kierowca, pojazd. Kolumny: trasa, kilometry, czas."
              ratio="4:3"
              dark
            >
              <ListaTras />
            </MockupSlot>
          }
        />

        <KrajeIPrzejazd />

        <Drobiazgi
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
              <Link href="/dla-kogo/dyspozytor">
                Dyspozytor →
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/wlasciciel">
                Właściciel →
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
