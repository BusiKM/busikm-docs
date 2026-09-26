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
import { Hero } from '@/components/pages/trasy/Hero';
import { MapaIKlient } from '@/components/pages/trasy/MapaIKlient';
import { KrajeIPrzejazd } from '@/components/pages/trasy/KrajeIPrzejazd';
import { PrzeliczonaTrasa } from '@/components/mockups/trasy/PrzeliczonaTrasa';
import { ListaTras } from '@/components/mockups/trasy/ListaTras';

export const generateMetadata = metadataPodstrony('co-robi/trasy-i-mapa');

const TEKSTY: Tlumaczenia<{
  pytania: readonly (readonly [string, string])[];
  naglowekPytan: string;
  drobiazgi: string[];
  przeliczenie: { tytul: string; tresc: string; label: string; note: string };
  historia: { tytul: string; tresc: string; label: string; note: string };
  ktoUzywa: string;
  link1: string;
  link2: string;
}> = {
  pl: {
    pytania: [
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
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Ostatnia znana pozycja zostaje po utracie zasięgu',
      'Filtr po kierowcy i po pojeździe',
      'Kilometry z trasy, nie z licznika przepisanego ręcznie',
      'Postoje dłuższe niż 15 minut zaznaczone',
      'Podgląd trasy z dowolnego dnia',
      'Mapa w trybie nocnym',
    ],
    przeliczenie: {
      tytul: 'Trasa układa się sama',
      tresc:
        'System proponuje przejazd i bierze pod uwagę, co się dzieje na drodze. Korek, wypadek, zamknięty odcinek — trasa przelicza się, a kierowca dostaje nową wersję w telefonie w tej samej chwili.',
      label: 'Trasa przeliczona · desktop',
      note: 'Stara i nowa wersja obok siebie, znacznik korka, różnica w czasie dojazdu.',
    },
    historia: {
      tytul: 'Historia tras',
      tresc: 'Każdy przejazd zapisany: kilometry, czas, postoje. Do sprawdzenia po miesiącu i po roku.',
      label: 'Lista tras z filtrami · desktop, tryb nocny',
      note: 'Filtry: data, kierowca, pojazd. Kolumny: trasa, kilometry, czas.',
    },
    ktoUzywa: 'Kto tego używa:',
    link1: 'Dyspozytor →',
    link2: 'Właściciel →',
  },
  en: {
    pytania: [
      [
        'Does the driver have to switch anything on?',
        'No. The route records from the “Start route” button, and the phone can stay in their pocket.',
      ],
      [
        'What if the phone loses signal?',
        'The route keeps saving on the phone and is sent once the signal is back. The map keeps the last known position with the time.',
      ],
      [
        'Is this tracking the driver after hours?',
        'No. Only the route of the order is recorded, between “Start” and “Finish”. Once it’s finished, no position is collected.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'Last known position stays after signal is lost',
      'Filter by driver and by vehicle',
      'Kilometres from the route, not an odometer copied by hand',
      'Stops longer than 15 minutes marked',
      'Route view for any day',
      'Map in dark mode',
    ],
    przeliczenie: {
      tytul: 'The route plans itself',
      tresc:
        'The system suggests a route and takes into account what’s happening on the road. A jam, an accident, a closed section — the route recalculates, and the driver gets the new version on their phone the same moment.',
      label: 'Recalculated route · desktop',
      note: 'Old and new version side by side, a traffic jam marker, the difference in arrival time.',
    },
    historia: {
      tytul: 'Route history',
      tresc: 'Every run on record: kilometres, time, stops. There to check a month or a year later.',
      label: 'Route list with filters · desktop, dark mode',
      note: 'Filters: date, driver, vehicle. Columns: route, kilometres, time.',
    },
    ktoUzywa: 'Who uses it:',
    link1: 'Dispatcher →',
    link2: 'Owner →',
  },
};

/**
 * Trasy i mapa floty — podstrona wg projektu „BusiKM Trasy i mapa floty"
 * z Claude Design (design/07-trasy-i-mapa). Treść: docs/landing/05, rozdział A3.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MapaIKlient />

        <Blok
          numer="03"
          tytul={t.przeliczenie.tytul}
          tresc={t.przeliczenie.tresc}
          makieta={
            <MockupSlot
              file="mockup-trasy-przeliczenie-desktop.png"
              label={t.przeliczenie.label}
              note={t.przeliczenie.note}
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
          tytul={t.historia.tytul}
          tresc={t.historia.tresc}
          makieta={
            <MockupSlot
              file="mockup-trasy-lista-desktop.png"
              label={t.historia.label}
              note={t.historia.note}
              ratio="4:3"
              dark
            >
              <ListaTras />
            </MockupSlot>
          }
        />

        <KrajeIPrzejazd />

        <Drobiazgi
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/dyspozytor">
                {t.link1}
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/wlasciciel">
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
