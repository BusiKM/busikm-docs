import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/koszty/Hero';
import { TrzyKroki } from '@/components/pages/koszty/TrzyKroki';
import { Kategorie } from '@/components/pages/koszty/Kategorie';
import { Dowod } from '@/components/pages/koszty/Dowod';
import { KursWaluty } from '@/components/mockups/koszty/KursWaluty';
import { KosztyFirmowe } from '@/components/mockups/koszty/KosztyFirmowe';

export const metadata = pageMetadata('co-robi/koszty-i-paragony');

const pytania = [
  [
    'Co, gdy paragon jest zmięty albo wyblakły?',
    'Kierowca poprawia kwotę ręcznie. Zdjęcie i tak zostaje przy koszcie.',
  ],
  ['Czy kierowca widzi koszty całej firmy?', 'Nie. Widzi tylko to, co sam dodał.'],
  [
    'Czy paliwo z karty flotowej też wchodzi?',
    'Tak, jako koszt firmowy. Tego nie trzeba fotografować.',
  ],
] as const;

const drobiazgi = [
  'Paragon dodany bez zasięgu czeka w telefonie',
  'Ten sam paragon nie wejdzie dwa razy',
  'Koszt widać u właściciela od razu',
  'Podpowiedź kategorii po sprzedawcy',
  'Filtr kosztów po pojeździe',
  'Zdjęcia wychodzą razem z zestawieniem',
];

/**
 * Koszty i paragony — podstrona wg projektu „BusiKM Koszty i paragony"
 * z Claude Design (design/09-koszty-i-paragony). Treść: docs/landing/05, rozdział A6.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrzyKroki />
        <Kategorie />

        <Blok
          tone="ink"
          strona="left"
          numer="04"
          tytul="Obca waluta"
          tresc="Przeliczona po kursie z dnia. Kurs zostaje przy dokumencie na stałe, nie trzeba go potem odtwarzać."
          makieta={
            <MockupSlot
              file="mockup-koszty-kurs-desktop.png"
              label="Koszt w euro z kursem · desktop, tryb nocny"
              note="Kwota w euro i w złotych, kurs, data przeliczenia, zapisane przy dokumencie."
              ratio="4:3"
              dark
            >
              <KursWaluty />
            </MockupSlot>
          }
        />

        <Dowod />

        <Blok
          tone="ink"
          numer="06"
          tytul="Koszty firmowe też"
          tresc="Leasing, ubezpieczenie, serwis. Nie tylko to, co w trasie."
          makieta={<KosztyFirmowe />}
        />

        <Drobiazgi
          tone="mist"
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
              <Link href="/dla-kogo/kierowca" className="text-blue">
                Kierowca →
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/ksiegowa" className="text-blue">
                Księgowa →
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
