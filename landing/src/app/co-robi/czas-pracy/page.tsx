import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/czas/Hero';
import { Liczniki } from '@/components/pages/czas/Liczniki';
import { Przypomnienie } from '@/components/pages/czas/Przypomnienie';
import { Tachograf } from '@/components/pages/czas/Tachograf';
import { ListaKierowcow } from '@/components/mockups/czas/ListaKierowcow';
import { BezZasiegu } from '@/components/mockups/czas/BezZasiegu';
import { KartaMiesieczna } from '@/components/mockups/czas/KartaMiesieczna';
import { DniWKrajach } from '@/components/mockups/czas/DniWKrajach';

export const metadata = pageMetadata('co-robi/czas-pracy');

const pytania = [
  [
    'Czy to zastępuje tachograf?',
    'Nie i nie próbuje. Tachograf zapisuje, BusiKM pokazuje kierowcy, ile jeszcze może jechać.',
  ],
  [
    'Skąd system wie, że kierowca jedzie?',
    'Z trasy, która nagrywa się w telefonie od przycisku „Rozpocznij trasę”.',
  ],
  [
    'Co, gdy kierowca zapomni zakończyć trasę?',
    'Aplikacja mu przypomni, a Ty możesz poprawić godzinę ręcznie, z podanym powodem.',
  ],
] as const;

const drobiazgi = [
  'Licznik widoczny na ekranie blokady',
  'Sygnał dźwiękowy przed przerwą',
  'Ręczna korekta z podanym powodem',
  'Podgląd tygodnia i miesiąca',
  'Status kierowcy widoczny w dyspozytorni',
  'Karta miesięczna w PDF',
];

/**
 * Czas pracy i przerwy — podstrona wg projektu „BusiKM Czas pracy i przerwy"
 * z Claude Design (design/08-czas-pracy). Treść: docs/landing/05, rozdział A4.
 *
 * Na tej stronie nie ma ani jednego numeru rozporządzenia ani kwoty kary —
 * reguła z docs/landing/02.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Liczniki />
        <Przypomnienie />

        <Blok
          numer="03"
          tytul="Ty widzisz to samo"
          tresc="Lista kierowców ze statusem: jedzie, na przerwie, odpoczywa, dostępny. Wszyscy na jednym ekranie."
          makieta={<ListaKierowcow />}
        />

        <Tachograf />

        <Blok
          strona="left"
          numer="04"
          tytul="Działa bez zasięgu"
          tresc="Liczniki chodzą w telefonie. Dane dosyłają się, gdy wróci sygnał."
          makieta={<BezZasiegu />}
        />

        <Blok
          tone="ink"
          numer="05"
          tytul="Miesięczna karta do wydruku"
          tresc="Gotowa, bez przepisywania. Do teczki albo do księgowej."
          makieta={
            <MockupSlot
              file="mockup-czas-karta-desktop.png"
              label="Karta miesięczna do wydruku · desktop"
              note="Dni, godziny jazdy, pracy i odpoczynku, kraje; podsumowanie i przycisk PDF. Jasna, jak wydruk."
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
          tytul="Dni w każdym kraju"
          tresc="Liczone z trasy. Możesz poprawić ręcznie, jeśli coś wyglądało inaczej."
          makieta={<DniWKrajach />}
        />

        <Drobiazgi
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
              <Link href="/dla-kogo/kierowca">
                Kierowca →
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
