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
import { Hero } from '@/components/pages/czas/Hero';
import { Liczniki } from '@/components/pages/czas/Liczniki';
import { Przypomnienie } from '@/components/pages/czas/Przypomnienie';
import { Tachograf } from '@/components/pages/czas/Tachograf';
import { ListaKierowcow } from '@/components/mockups/czas/ListaKierowcow';
import { BezZasiegu } from '@/components/mockups/czas/BezZasiegu';
import { KartaMiesieczna } from '@/components/mockups/czas/KartaMiesieczna';
import { DniWKrajach } from '@/components/mockups/czas/DniWKrajach';

export const generateMetadata = metadataPodstrony('co-robi/czas-pracy');

type Tekst = { tytul: string; tresc: string };

const TEKSTY: Tlumaczenia<{
  pytania: readonly (readonly [string, string])[];
  naglowekPytan: string;
  drobiazgi: string[];
  lista: Tekst;
  zasieg: Tekst;
  karta: Tekst & { label: string; note: string };
  kraje: Tekst;
  ktoUzywa: string;
  link1: string;
  link2: string;
}> = {
  pl: {
    pytania: [
      [
        'Czy to zastępuje tachograf?',
        'Nie i nie próbuje. Tachograf zapisuje, BusiKM pokazuje kierowcy, ile jeszcze może jechać.',
      ],
      [
        'Skąd system wie, że kierowca jedzie?',
        'Z trasy, która zapisuje się w telefonie od przycisku „Zacznij dzień”, i z etapu zlecenia. Status zmienia się sam, a przerwę czy odpoczynek kierowca zapisuje jednym przyciskiem.',
      ],
      [
        'Czy liczniki działają też w kraju?',
        'Przy przewozie międzynarodowym aplikacja pokazuje liczniki według przepisów UE: jazdę ciągłą, dzienną, tydzień i dwa tygodnie. W kraju pokazuje dzienny czas pracy i odpoczynek.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Przerwy zapisane bez zasięgu dochodzą później',
      'Powiadomienie 15 minut przed przerwą',
      'Ręczna korekta z podanym powodem',
      'Podgląd tygodnia i miesiąca',
      'Status kierowcy widoczny w dyspozytorni',
      'Karta miesięczna w PDF',
    ],
    lista: {
      tytul: 'Ty widzisz to samo',
      tresc:
        'Lista kierowców ze statusem: jedzie, na przerwie, odpoczywa, dostępny. Wszyscy na jednym ekranie.',
    },
    zasieg: {
      tytul: 'Działa bez zasięgu',
      tresc:
        'Liczniki liczy serwer. Bez sieci telefon pokazuje ostatni stan, a przerwy i odpoczynki zapisane bez zasięgu czekają w kolejce i dochodzą, gdy wróci sygnał.',
    },
    karta: {
      tytul: 'Miesięczna karta do wydruku',
      tresc: 'Gotowa, bez przepisywania. Do teczki albo do księgowej.',
      label: 'Karta miesięczna do wydruku · desktop',
      note: 'Dni, godziny jazdy, pracy i odpoczynku, kraje; podsumowanie i przycisk PDF. Jasna, jak wydruk.',
    },
    kraje: {
      tytul: 'Dni w każdym kraju',
      tresc: 'Liczone z trasy. Możesz poprawić ręcznie, jeśli coś wyglądało inaczej.',
    },
    ktoUzywa: 'Kto tego używa:',
    link1: 'Kierowca →',
    link2: 'Właściciel →',
  },
  en: {
    pytania: [
      [
        'Does this replace the tachograph?',
        'No, and it doesn’t try to. The tachograph records; BusiKM shows the driver how much longer they can drive.',
      ],
      [
        'How does the system know the driver is driving?',
        'From the route, which records on the phone from the moment they start the day, and from the stage the order is at. The status changes by itself, and the driver logs a break or a rest with one button.',
      ],
      [
        'Do the counters work on domestic jobs too?',
        'On international jobs the app shows counters under the EU rules: continuous driving, daily, weekly and two-weekly. On domestic jobs it shows daily working time and rest.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'Breaks logged with no signal go through later',
      'A notification 15 minutes before a break',
      'Manual correction with a reason given',
      'Week and month view',
      'Driver status visible in Dispatch',
      'Monthly sheet as a PDF',
    ],
    lista: {
      tytul: 'You see the same thing',
      tresc:
        'A list of drivers with their status: driving, on a break, resting, available. Everyone on one screen.',
    },
    zasieg: {
      tytul: 'Works with no signal',
      tresc:
        'The server does the counting. With no network the phone shows the last known state, and breaks and rest logged with no signal wait in a queue until it’s back.',
    },
    karta: {
      tytul: 'A monthly sheet to print',
      tresc: 'Ready, with no copying out. For the file or for your accountant.',
      label: 'Monthly sheet to print · desktop',
      note: 'Days, hours of driving, work and rest, countries; a summary and a PDF button. Light, like a printout.',
    },
    kraje: {
      tytul: 'Days in each country',
      tresc: 'Counted from the route. You can correct them by hand if things looked different.',
    },
    ktoUzywa: 'Who uses it:',
    link1: 'Driver →',
    link2: 'Owner →',
  },
};

/**
 * Czas pracy i przerwy – podstrona wg projektu „BusiKM Czas pracy i przerwy"
 * z Claude Design (design/08-czas-pracy). Treść: docs/landing/05, rozdział A4.
 *
 * Na tej stronie nie ma ani jednego numeru rozporządzenia ani kwoty kary –
 * reguła z docs/landing/02.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Liczniki />
        <Przypomnienie />

        <Blok
          numer="03"
          tytul={t.lista.tytul}
          tresc={t.lista.tresc}
          makieta={<ListaKierowcow />}
        />

        <Tachograf />

        <Blok
          strona="left"
          numer="04"
          tytul={t.zasieg.tytul}
          tresc={t.zasieg.tresc}
          makieta={<BezZasiegu />}
        />

        <Blok
          tone="ink"
          numer="05"
          tytul={t.karta.tytul}
          tresc={t.karta.tresc}
          makieta={
            <MockupSlot
              file="mockup-czas-karta-desktop.png"
              label={t.karta.label}
              note={t.karta.note}
              ratio="4:3"
              dark
            >
              <KartaMiesieczna />
            </MockupSlot>
          }
        />

        <Blok
          strona="left"
          numer="06"
          tytul={t.kraje.tytul}
          tresc={t.kraje.tresc}
          makieta={<DniWKrajach />}
        />

        <Drobiazgi
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/kierowca">
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
