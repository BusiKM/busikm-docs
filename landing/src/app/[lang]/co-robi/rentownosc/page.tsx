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
import { Hero } from '@/components/pages/rentownosc/Hero';
import { ZyskNaPierwszymEkranie } from '@/components/pages/rentownosc/ZyskNaPierwszymEkranie';
import { MarzaIZmiana } from '@/components/pages/rentownosc/MarzaIZmiana';
import { Raporty } from '@/components/pages/rentownosc/Raporty';
import { RozbicieKosztow } from '@/components/mockups/rentownosc/RozbicieKosztow';
import { PorownanieMiesiecy } from '@/components/mockups/rentownosc/PorownanieMiesiecy';

export const generateMetadata = metadataPodstrony('co-robi/rentownosc');

type Teksty = {
  pytania: readonly (readonly [string, string])[];
  drobiazgi: readonly string[];
  koszty: { tytul: string; tresc: string };
  porownanie: { tytul: string; tresc: string; label: string; note: string };
  ktoUzywa: string;
  wlasciciel: string;
  pytaniaNaglowek: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    pytania: [
      [
        'Skąd system wie, ile kosztowało paliwo?',
        'Z paragonu, który kierowca sfotografował w trasie, albo z faktury karty paliwowej. Kwotę, datę i sprzedawcę BusiKM odczyta sam.',
      ],
      [
        'Czy amortyzacja też jest liczona?',
        'Tak, w kosztach auta. Na karcie pojazdu widzisz koszt na kilometr, a amortyzacja wchodzi do wyniku miesiąca. Na kursy jej nie rozkładamy.',
      ],
      [
        'Co z kosztami, które nie należą do żadnego kursu?',
        'Leasing, polisa, serwis – to koszty auta. Wchodzą do wyniku miesiąca i do kosztu na kilometr na karcie pojazdu, a wynik zlecenia zostaje czysty: fracht minus koszty kursu i diety.',
      ],
    ],
    drobiazgi: [
      'Waluty przeliczone po kursie NBP',
      'Sortowanie zleceń po marży',
      'Zlecenie poniżej progu marży widać od razu',
      'Koszt na kilometr na karcie pojazdu',
      'Eksport do arkusza',
      'Podgląd bez zamykania miesiąca',
    ],
    koszty: {
      tytul: 'Wszystkie koszty w środku',
      tresc: 'Na kursie: paliwo, opłaty drogowe, nocleg, parking, podwykonawca i diety kierowcy. Amortyzacja, leasing i polisa – w kosztach auta i w wyniku miesiąca.',
    },
    porownanie: {
      tytul: 'Porównanie okresów',
      tresc: 'Pulpit porównuje z poprzednim tygodniem, miesiącem albo rokiem. Raport „Wynik” pokazuje miesiąc po miesiącu, a bieżący miesiąc z prognozą do końca.',
      label: 'Raporty → Wynik · desktop, tryb nocny',
      note: 'Raporty, zakładka Wynik: przychód, koszty, zysk, marża i zysk na kilometr z różnicą do poprzedniego okresu, niżej wykres miesiąc po miesiącu z prognozą do końca bieżącego miesiąca.',
    },
    ktoUzywa: 'Kto tego używa:',
    wlasciciel: 'Właściciel →',
    pytaniaNaglowek: 'Trzy pytania',
  },
  en: {
    pytania: [
      [
        'How does it know what the fuel cost?',
        'From the receipt the driver photographed on the road, or from the fuel card invoice. BusiKM reads the amount, date and merchant by itself.',
      ],
      [
        'Is depreciation counted too?',
        'Yes, in the vehicle’s costs. The vehicle card shows the cost per kilometre, and depreciation goes into the monthly result. We don’t spread it across jobs.',
      ],
      [
        'What about costs that don’t belong to any job?',
        'Lease, insurance, servicing – those are vehicle costs. They go into the monthly result and the cost per kilometre on the vehicle card, so the order result stays clean: freight minus run costs and allowances.',
      ],
    ],
    drobiazgi: [
      'Currencies converted at the NBP rate',
      'Orders sorted by margin',
      'An order below the margin threshold shows up straight away',
      'Cost per kilometre on the vehicle card',
      'Export to a spreadsheet',
      'Preview without closing the month',
    ],
    koszty: {
      tytul: 'Every cost counted',
      tresc: 'On the run: fuel, tolls, overnight stay, parking, subcontractor and the driver’s per diems (daily travel allowance). Depreciation, lease and insurance – in the vehicle’s costs and the monthly result.',
    },
    porownanie: {
      tytul: 'Compare periods',
      tresc: 'The dashboard compares with the previous week, month or year. The “Result” report shows month by month, with a forecast to the end of the current month.',
      label: 'Reports → Result · desktop, dark mode',
      note: 'Reports, Result tab: revenue, costs, profit, margin and profit per kilometre with the change on the previous period, and below, a month-by-month chart with a forecast to the end of the current month.',
    },
    ktoUzywa: 'Who uses it:',
    wlasciciel: 'Owner →',
    pytaniaNaglowek: 'Three questions',
  },
};

/**
 * Ile zostaje – podstrona wg projektu „BusiKM Ile zostaje" z Claude Design
 * (design/05-rentownosc). Treść: docs/landing/05, rozdział A7.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ZyskNaPierwszymEkranie />
        <MarzaIZmiana />

        <Blok
          numer="04"
          tytul={t.koszty.tytul}
          tresc={t.koszty.tresc}
          makieta={<RozbicieKosztow />}
        />

        <Blok
          tone="ink"
          strona="left"
          numer="05"
          tytul={t.porownanie.tytul}
          tresc={t.porownanie.tresc}
          makieta={
            <MockupSlot
              file="mockup-zysk-porownanie-desktop.png"
              label={t.porownanie.label}
              note={t.porownanie.note}
              ratio="4:3"
              dark
            >
              <PorownanieMiesiecy />
            </MockupSlot>
          }
        />

        <Raporty />

        <Drobiazgi
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/wlasciciel">
                {t.wlasciciel}
              </Link>
            </>
          }
        />

        <Akordeon heading={t.pytaniaNaglowek} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
