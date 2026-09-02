import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/rentownosc/Hero';
import { ZyskNaPierwszymEkranie } from '@/components/pages/rentownosc/ZyskNaPierwszymEkranie';
import { MarzaIZmiana } from '@/components/pages/rentownosc/MarzaIZmiana';
import { Raporty } from '@/components/pages/rentownosc/Raporty';
import { RozbicieKosztow } from '@/components/mockups/rentownosc/RozbicieKosztow';
import { PorownanieMiesiecy } from '@/components/mockups/rentownosc/PorownanieMiesiecy';

export const metadata = pageMetadata('co-robi/rentownosc');

const pytania = [
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
] as const;

const drobiazgi = [
  'Waluty przeliczone po kursie z dnia',
  'Sortowanie zleceń po marży',
  'Zlecenie na minusie widać od razu',
  'Koszty stałe rozłożone na kursy',
  'Eksport do arkusza',
  'Podgląd bez zamykania miesiąca',
];

/**
 * Ile zostaje — podstrona wg projektu „BusiKM Ile zostaje" z Claude Design
 * (design/05-rentownosc). Treść: docs/landing/05, rozdział A7.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ZyskNaPierwszymEkranie />
        <MarzaIZmiana />

        <Blok
          numer="04"
          tytul="Wszystkie koszty w środku"
          tresc="Paliwo, opłaty drogowe, hotel, dieta, amortyzacja."
          makieta={<RozbicieKosztow />}
        />

        <Blok
          tone="ink"
          strona="left"
          numer="05"
          tytul="Porównanie okresów"
          tresc="Czy ten miesiąc jest lepszy od poprzedniego."
          makieta={
            <MockupSlot
              file="mockup-zysk-porownanie-desktop.png"
              label="Porównanie miesięcy · desktop, tryb nocny"
              note="Dwa miesiące obok siebie, słupki tygodniowe, różnica w złotych i procentach."
              ratio="4:3"
              dark
            >
              <PorownanieMiesiecy />
            </MockupSlot>
          }
        />

        <Raporty />

        <Drobiazgi
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
              <Link href="/dla-kogo/wlasciciel" className="text-blue">
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
