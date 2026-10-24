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
        'Nie. Trasa zapisuje się od „Zacznij dzień” do licznika końcowego przy „Zakończ dzień”. Telefon może zostać w kieszeni.',
      ],
      [
        'Co, gdy telefon straci zasięg?',
        'Trasa zapisuje się dalej w telefonie i dosyła, gdy sygnał wróci. Na mapie zostaje ostatnia znana pozycja z godziną.',
      ],
      [
        'Czy to śledzenie kierowcy po godzinach?',
        'Nie. Zapis trwa od „Zacznij dzień” do „Zakończ dzień”, a na prywatną przerwę kierowca może go wstrzymać. Po zakończeniu dnia pozycja nie jest zbierana.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Ostatnia znana pozycja zostaje po utracie zasięgu',
      'Filtr po kierowcy i po pojeździe',
      'Kilometry z trasy, nie z licznika przepisanego ręcznie',
      'Ślad przejazdu do odtworzenia',
      'Podgląd trasy z dowolnego dnia',
      'Mapa w trybie nocnym',
    ],
    przeliczenie: {
      tytul: 'Trasa układa się sama',
      tresc:
        'Wpisujesz punkty – system ustawia kolejność postojów, liczy kilometry i czas. Godzina dojazdu odświeża się z pozycji auta. Gdy chcesz inaczej, klikasz „Zmień trasę” i wybierasz wariant: najszybszy albo bez płatnych dróg. Możesz też omijać płatne drogi, autostrady i promy. Nową trasę widzi kierowca w aplikacji, a klient na stronie śledzenia widzi nową godzinę dojazdu.',
      label: 'Wybór trasy · desktop',
      note: 'Zlecenie Olsztyn → München, „Wybierz trasę”: dwa warianty na mapie – najszybsza 11 h 53 min, 1167 km, i bez płatnych dróg 12 h 10 min, 1294 km – oraz przyciski omijania: płatne drogi, autostrady, promy.',
    },
    historia: {
      tytul: 'Historia tras',
      tresc: 'Każdy przejazd zapisany: kilometry, czas i ślad do odtworzenia. Filtrujesz po kierowcy i pojeździe, sprawdzasz po miesiącu i po roku.',
      label: 'Lista tras z filtrami · desktop, tryb nocny',
      note: 'Trasy: filtry statusu, kierowcy, pojazdu, roku i miesiąca. Kolumny: data, kierowca, pojazd, dystans i stan potwierdzenia przez kierowcę i właściciela.',
    },
    ktoUzywa: 'Kto tego używa:',
    link1: 'Dyspozytor →',
    link2: 'Właściciel →',
  },
  en: {
    pytania: [
      [
        'Does the driver have to switch anything on?',
        'No. The route records from “Start the day” to the final odometer reading at “End the day”. The phone can stay in their pocket.',
      ],
      [
        'What if the phone loses signal?',
        'The route keeps saving on the phone and is sent once the signal is back. The map keeps the last known position with the time.',
      ],
      [
        'Is this tracking the driver after hours?',
        'No. Recording runs from “Start the day” to “End the day”, and the driver can pause it for a private break. Once the day is over, no position is collected.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'Last known position stays after signal is lost',
      'Filter by driver and by vehicle',
      'Kilometres from the route, not an odometer copied by hand',
      'A replayable trace of every trip',
      'Route view for any day',
      'Map in dark mode',
    ],
    przeliczenie: {
      tytul: 'The route plans itself',
      tresc:
        'You enter the stops – the system puts them in order and works out the kilometres and time. The arrival time updates from the van’s position. Want it different? Click “Change route” and pick an option: fastest or no toll roads. You can also avoid toll roads, motorways and ferries. The driver sees the new route in the app, and the client sees the new arrival time on the tracking page.',
      label: 'Choosing a route · desktop',
      note: 'Order Olsztyn → München, “Choose route”: two options on the map – fastest at 11 h 53 min, 1,167 km, and no toll roads at 12 h 10 min, 1,294 km – plus avoid buttons: toll roads, motorways, ferries.',
    },
    historia: {
      tytul: 'Route history',
      tresc: 'Every trip on record: kilometres, time and a trace you can replay. Filter by driver and vehicle, and check it a month or a year later.',
      label: 'Route list with filters · desktop, dark mode',
      note: 'Trips: filters for status, driver, vehicle, year and month. Columns: date, driver, vehicle, distance and confirmation by the driver and the owner.',
    },
    ktoUzywa: 'Who uses it:',
    link1: 'Dispatcher →',
    link2: 'Owner →',
  },
};

/**
 * Trasy i mapa floty – podstrona wg projektu „BusiKM Trasy i mapa floty"
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
