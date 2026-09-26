import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { metadataPodstrony } from '@/lib/metadata';
import { biezacyJezyk, jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { Hero } from '@/components/pages/dyspozytornia/Hero';
import { JedenEkran } from '@/components/pages/dyspozytornia/JedenEkran';
import { TrasaIZmiana } from '@/components/pages/dyspozytornia/TrasaIZmiana';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { KartaZlecenia } from '@/components/mockups/dyspozytornia/KartaZlecenia';
import { PrzypiszKierowce } from '@/components/mockups/dyspozytornia/PrzypiszKierowce';
import { Rozmowa } from '@/components/mockups/dyspozytornia/Rozmowa';
import { ZakresDostepu } from '@/components/mockups/dyspozytornia/ZakresDostepu';

export const generateMetadata = metadataPodstrony('co-robi/dyspozytornia');

const KLASY_STATUSOW = [
  'bg-mist text-ink',
  'bg-blue-soft text-blue-dark',
  'bg-mist text-ink',
  'bg-green/14 text-green-ink',
] as const;

type Tekst = { tytul: string; tresc: string };

const TEKSTY: Tlumaczenia<{
  pytania: readonly (readonly [string, string])[];
  naglowekPytan: string;
  drobiazgi: string[];
  statusy: string[];
  zlecenie: Tekst & { label: string; note: string };
  przypisanie: Tekst;
  rozmowa: Tekst;
  stanowisko: Tekst;
  ktoUzywa: string;
  dyspozytor: string;
  wlasciciel: string;
}> = {
  pl: {
    pytania: [
      [
        'Czy dyspozytor widzi, ile zarabiam?',
        'Nie musi. Prowadzi trasy i zlecenia. Pieniądze widzi właściciel i osoba od rozliczeń.',
      ],
      [
        'Czy mogę być dyspozytorem i właścicielem naraz?',
        'Tak, i tak jest najczęściej. Przełączasz widok jednym kliknięciem.',
      ],
      [
        'Ilu dyspozytorów mogę dodać?',
        'Tylu, ilu potrzebujesz. Płacisz za pojazdy, nie za ludzi.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Zlecenie z pliku klienta',
      'Podpowiedź wolnego kierowcy',
      'Historia zleceń z filtrami',
      'Wysyłka zlecenia na telefon',
      'Statusy widoczne u klienta',
      'Dwa zlecenia na jednym przejeździe',
    ],
    statusy: ['przyjęte', 'w drodze', 'rozładunek', 'dostarczone'],
    zlecenie: {
      tytul: 'Zlecenie od przyjęcia po rozliczenie',
      tresc:
        'Zleceniodawca, załadunek, rozładunek, terminy, stawka. Status widać na liście: przyjęte, w drodze, rozładunek, dostarczone.',
      label: 'Karta zlecenia · desktop',
      note: 'Zleceniodawca, załadunek, rozładunek, stawka, kierowca i pojazd; pasek statusów u dołu.',
    },
    przypisanie: {
      tytul: 'Kierowca i pojazd w dwie sekundy',
      tresc: 'Przypisujesz, a system podpowiada, kto ma ważne uprawnienia i wolny czas pracy.',
    },
    rozmowa: {
      tytul: 'Rozmowa bez wychodzenia z ekranu',
      tresc:
        'Piszesz do kierowcy stąd. Nie szukasz numeru, nie dzwonisz, nie tłumaczysz przez telefon, gdzie ma skręcić.',
    },
    stanowisko: {
      tytul: 'Dyspozytor to osobne stanowisko',
      tresc:
        'Ma własny dostęp. Widzi to, czego potrzebuje do prowadzenia tras — nie musi widzieć rozliczeń firmy. W małej firmie właściciel przełącza się na ten widok jednym kliknięciem.',
    },
    ktoUzywa: 'Kto tego używa:',
    dyspozytor: 'Dyspozytor →',
    wlasciciel: 'Właściciel →',
  },
  en: {
    pytania: [
      [
        'Can the dispatcher see how much I earn?',
        'They don’t need to. They run routes and orders. The money is for the owner and whoever does the books.',
      ],
      [
        'Can I be the dispatcher and the owner at once?',
        'Yes, and that’s the most common set-up. You switch views with one click.',
      ],
      [
        'How many dispatchers can I add?',
        'As many as you need. You pay for vans, not for people.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'Order from the client’s file',
      'Suggests a free driver',
      'Order history with filters',
      'Order sent to the driver’s phone',
      'Statuses the client can see',
      'Two orders on one run',
    ],
    statusy: ['accepted', 'on the road', 'unloading', 'delivered'],
    zlecenie: {
      tytul: 'An order from acceptance to settlement',
      tresc:
        'Client, loading, unloading, deadlines, rate. The status shows on the list: accepted, on the road, unloading, delivered.',
      label: 'Order card · desktop',
      note: 'Client, loading, unloading, rate, driver and vehicle; status bar at the bottom.',
    },
    przypisanie: {
      tytul: 'Driver and van in two seconds',
      tresc: 'You assign, and the system suggests who has a valid licence and working time left.',
    },
    rozmowa: {
      tytul: 'Talk without leaving the screen',
      tresc:
        'You message the driver from here. No looking up numbers, no calls, no explaining over the phone where to turn.',
    },
    stanowisko: {
      tytul: 'Dispatcher is a role of its own',
      tresc:
        'They get their own access. They see what they need to run routes — not the company’s accounts. In a small firm the owner switches to this view with one click.',
    },
    ktoUzywa: 'Who uses it:',
    dyspozytor: 'Dispatcher →',
    wlasciciel: 'Owner →',
  },
};

/**
 * Dyspozytornia — podstrona wg projektu „BusiKM Dyspozytornia" z Claude Design
 * (design/03-dyspozytornia). Treść: docs/landing/05, rozdział A2.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JedenEkran />

        <Blok
          numer="02"
          tytul={t.zlecenie.tytul}
          tresc={t.zlecenie.tresc}
          dodatek={
            <div className="flex flex-wrap gap-2 text-[14px] font-medium">
              {t.statusy.map((nazwa, i) => (
                <span key={nazwa} className={`rounded-full px-3.5 py-2 ${KLASY_STATUSOW[i]}`}>
                  {nazwa}
                </span>
              ))}
            </div>
          }
          makieta={
            <MockupSlot
              file="mockup-dyspozytornia-zlecenie-desktop.png"
              label={t.zlecenie.label}
              note={t.zlecenie.note}
              ratio="4:3"
            >
              <KartaZlecenia />
            </MockupSlot>
          }
        />

        <Blok
          tone="ink"
          strona="left"
          numer="03"
          tytul={t.przypisanie.tytul}
          tresc={t.przypisanie.tresc}
          makieta={<PrzypiszKierowce />}
        />

        <TrasaIZmiana />

        <Blok
          tone="ink"
          numer="06"
          tytul={t.rozmowa.tytul}
          tresc={t.rozmowa.tresc}
          makieta={<Rozmowa />}
        />

        <Blok
          strona="left"
          numer="07"
          tytul={t.stanowisko.tytul}
          tresc={t.stanowisko.tresc}
          makieta={<ZakresDostepu />}
        />

        <Drobiazgi
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/dyspozytor">
                {t.dyspozytor}
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/wlasciciel">
                {t.wlasciciel}
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
