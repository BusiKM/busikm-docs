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
        'Z paragonu, który kierowca pstryknął w trasie. Kwota i sprzedawca wpisują się same.',
      ],
      [
        'Czy amortyzacja też jest liczona?',
        'Tak, rozkładana na kursy. Możesz ją wyłączyć, jeśli wolisz patrzeć na sam wynik gotówkowy.',
      ],
      [
        'Co z kosztami, które nie należą do żadnego kursu?',
        'Leasing, ubezpieczenie, serwis — wchodzą jako koszty stałe i rozkładają się na przejechane kilometry.',
      ],
    ],
    drobiazgi: [
      'Waluty przeliczone po kursie z dnia',
      'Sortowanie zleceń po marży',
      'Zlecenie na minusie widać od razu',
      'Koszty stałe rozłożone na kursy',
      'Eksport do arkusza',
      'Podgląd bez zamykania miesiąca',
    ],
    koszty: {
      tytul: 'Wszystkie koszty w środku',
      tresc: 'Paliwo, opłaty drogowe, hotel, dieta, amortyzacja.',
    },
    porownanie: {
      tytul: 'Porównanie okresów',
      tresc: 'Czy ten miesiąc jest lepszy od poprzedniego.',
      label: 'Porównanie miesięcy · desktop, tryb nocny',
      note: 'Dwa miesiące obok siebie, słupki tygodniowe, różnica w złotych i procentach.',
    },
    ktoUzywa: 'Kto tego używa:',
    wlasciciel: 'Właściciel →',
    pytaniaNaglowek: 'Trzy pytania',
  },
  en: {
    pytania: [
      [
        'How does it know what the fuel cost?',
        'From the receipt the driver snapped on the road. The amount and the merchant fill themselves in.',
      ],
      [
        'Is depreciation counted too?',
        'Yes, spread across the jobs. You can switch it off if you’d rather see the cash result on its own.',
      ],
      [
        'What about costs that don’t belong to any job?',
        'Lease, insurance, servicing — they go in as fixed costs and are spread across the kilometres driven.',
      ],
    ],
    drobiazgi: [
      'Currencies converted at the day’s rate',
      'Orders sorted by margin',
      'A loss-making order shows up straight away',
      'Fixed costs spread across jobs',
      'Export to a spreadsheet',
      'Preview without closing the month',
    ],
    koszty: {
      tytul: 'Every cost counted',
      tresc: 'Fuel, tolls, hotel, per diems (the driver’s daily travel allowance), depreciation.',
    },
    porownanie: {
      tytul: 'Compare periods',
      tresc: 'Is this month better than the last one?',
      label: 'Month comparison · desktop, dark mode',
      note: 'Two months side by side, weekly bars, the difference in złoty and per cent.',
    },
    ktoUzywa: 'Who uses it:',
    wlasciciel: 'Owner →',
    pytaniaNaglowek: 'Three questions',
  },
};

/**
 * Ile zostaje — podstrona wg projektu „BusiKM Ile zostaje" z Claude Design
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
