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
        'Tak, i tak jest najczęściej. Dyspozytornię masz w menu, obok pulpitu i faktur.',
      ],
      [
        'Ilu dyspozytorów mogę dodać?',
        'Tylu, ilu potrzebujesz. Płacisz za pojazdy, nie za ludzi.',
      ],
    ],
    naglowekPytan: 'Trzy pytania',
    drobiazgi: [
      'Plik zlecenia dołączony do kursu',
      'Podpowiedź, kto zdąży',
      'Historia zleceń z filtrami',
      'Oddajesz kurs podwykonawcy – widzisz marżę i czy ma ważne OCP',
      'Link śledzenia dla klienta',
      'Doładunek po drodze',
    ],
    statusy: ['przyjęte', 'przypisane', 'w trasie', 'dostarczone'],
    zlecenie: {
      tytul: 'Zlecenie od przyjęcia po rozliczenie',
      tresc:
        'Zleceniodawca, załadunek, rozładunek, terminy, stawka. Pasek u góry karty pokazuje, gdzie jest kurs: przyjęte, przypisane, załadowane, w trasie, dostarczone, zafakturowane.',
      label: 'Karta zlecenia · desktop',
      note: 'Zlecenie Wrocław → Milano, zakładka Przegląd: pasek etapów, postoje z mapą, kierowca i auto z przyciskami „Zadzwoń” i „Napisz”, fracht i marża.',
    },
    przypisanie: {
      tytul: 'Przypisujesz auto, które zdąży',
      tresc: 'System podpowiada, które auto i kierowca zdążą na załadunek: dojazd, odpoczynek i czas jazdy, ładowność, ważne dokumenty. Przy reszcie pisze, dlaczego nie.',
    },
    rozmowa: {
      tytul: 'Do kierowcy piszesz jednym kliknięciem',
      tresc:
        '„Napisz” na karcie kursu otwiera czat zlecenia. Nie szukasz numeru, a cała rozmowa zostaje przy kursie. Wolisz zadzwonić – obok jest „Zadzwoń”.',
    },
    stanowisko: {
      tytul: 'Dyspozytor to osobne stanowisko',
      tresc:
        'Ma własny dostęp. Widzi to, czego potrzebuje do prowadzenia tras – nie widzi faktur, kosztów firmy ani raportów. W małej firmie właściciel otwiera dyspozytornię z menu, bo ma ją u siebie.',
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
        'Yes, and that’s the most common set-up. Dispatch sits in your menu, next to the dashboard and invoices.',
      ],
      [
        'How many dispatchers can I add?',
        'As many as you need. You pay for vans, not for people.',
      ],
    ],
    naglowekPytan: 'Three questions',
    drobiazgi: [
      'The client’s order file attached to the run',
      'A hint on who will make it',
      'Order history with filters',
      'You hand a run to a subcontractor – you see the margin and whether their carrier’s insurance (OCP) is valid',
      'A tracking link for the client',
      'An extra pickup on the way',
    ],
    statusy: ['accepted', 'assigned', 'on the road', 'delivered'],
    zlecenie: {
      tytul: 'An order from acceptance to settlement',
      tresc:
        'Client, loading, unloading, deadlines, rate. The bar at the top of the card shows where the run is: accepted, assigned, loaded, on the road, delivered, invoiced.',
      label: 'Order card · desktop',
      note: 'Order Wrocław → Milano, Overview tab: progress bar, stops with a map, driver and van with “Call” and “Message” buttons, freight and margin.',
    },
    przypisanie: {
      tytul: 'You assign a van that will make it',
      tresc: 'The system suggests which van and driver will make the pickup: approach time, rest and driving time, payload, valid documents. For the rest it says why not.',
    },
    rozmowa: {
      tytul: 'Message the driver in one click',
      tresc:
        '“Message” on the run card opens the order chat. No looking up numbers, and the whole conversation stays with the run. Rather call? “Call” is right next to it.',
    },
    stanowisko: {
      tytul: 'Dispatcher is a role of its own',
      tresc:
        'They get their own access. They see what they need to run routes – not invoices, company costs or reports. In a small firm the owner opens dispatch from the menu, because it’s there for them too.',
    },
    ktoUzywa: 'Who uses it:',
    dyspozytor: 'Dispatcher →',
    wlasciciel: 'Owner →',
  },
};

/**
 * Dyspozytornia – podstrona wg projektu „BusiKM Dyspozytornia" z Claude Design
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
