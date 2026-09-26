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
import { Hero } from '@/components/pages/koszty/Hero';
import { TrzyKroki } from '@/components/pages/koszty/TrzyKroki';
import { Kategorie } from '@/components/pages/koszty/Kategorie';
import { Dowod } from '@/components/pages/koszty/Dowod';
import { KursWaluty } from '@/components/mockups/koszty/KursWaluty';
import { KosztyFirmowe } from '@/components/mockups/koszty/KosztyFirmowe';

export const generateMetadata = metadataPodstrony('co-robi/koszty-i-paragony');

type Teksty = {
  pytania: readonly (readonly [string, string])[];
  drobiazgi: readonly string[];
  waluta: { tytul: string; tresc: string; label: string; note: string };
  firmowe: { tytul: string; tresc: string };
  ktoUzywa: string;
  kierowca: string;
  ksiegowa: string;
  pytaniaNaglowek: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    pytania: [
      [
        'Co, gdy paragon jest zmięty albo wyblakły?',
        'Kierowca poprawia kwotę ręcznie. Zdjęcie i tak zostaje przy koszcie.',
      ],
      ['Czy kierowca widzi koszty całej firmy?', 'Nie. Widzi tylko to, co sam dodał.'],
      [
        'Czy paliwo z karty flotowej też wchodzi?',
        'Tak, jako koszt firmowy. Tego nie trzeba fotografować.',
      ],
    ],
    drobiazgi: [
      'Paragon dodany bez zasięgu czeka w telefonie',
      'Ten sam paragon nie wejdzie dwa razy',
      'Koszt widać u właściciela od razu',
      'Podpowiedź kategorii po sprzedawcy',
      'Filtr kosztów po pojeździe',
      'Zdjęcia wychodzą razem z zestawieniem',
    ],
    waluta: {
      tytul: 'Obca waluta',
      tresc:
        'Przeliczona po kursie z dnia. Kurs zostaje przy dokumencie na stałe, nie trzeba go potem odtwarzać.',
      label: 'Koszt w euro z kursem · desktop, tryb nocny',
      note: 'Kwota w euro i w złotych, kurs, data przeliczenia, zapisane przy dokumencie.',
    },
    firmowe: {
      tytul: 'Koszty firmowe też',
      tresc: 'Leasing, ubezpieczenie, serwis. Nie tylko to, co w trasie.',
    },
    ktoUzywa: 'Kto tego używa:',
    kierowca: 'Kierowca →',
    ksiegowa: 'Księgowa →',
    pytaniaNaglowek: 'Trzy pytania',
  },
  en: {
    pytania: [
      [
        'What if the receipt is crumpled or faded?',
        'The driver corrects the amount by hand. The photo stays with the cost either way.',
      ],
      ['Can the driver see the whole company’s costs?', 'No. Only what they added themselves.'],
      [
        'Does fuel paid with a fleet card count too?',
        'Yes, as a company cost. There’s nothing to photograph.',
      ],
    ],
    drobiazgi: [
      'A receipt added with no signal waits on the phone',
      'The same receipt can’t go in twice',
      'The owner sees the cost straight away',
      'Category suggested from the merchant',
      'Filter costs by vehicle',
      'Photos go out with the report',
    ],
    waluta: {
      tytul: 'Foreign currency',
      tresc:
        'Converted at the day’s exchange rate. The rate stays with the document for good, so nobody has to dig it up later.',
      label: 'Cost in euro with the exchange rate · desktop, dark mode',
      note: 'Amount in euro and in złoty, the rate and the conversion date, saved with the document.',
    },
    firmowe: {
      tytul: 'Company costs too',
      tresc: 'Leasing, insurance, servicing. Not just what happens on the road.',
    },
    ktoUzywa: 'Who uses it:',
    kierowca: 'Driver →',
    ksiegowa: 'Accountant →',
    pytaniaNaglowek: 'Three questions',
  },
};

/**
 * Koszty i paragony — podstrona wg projektu „BusiKM Koszty i paragony"
 * z Claude Design (design/09-koszty-i-paragony). Treść: docs/landing/05, rozdział A6.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
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
          tytul={t.waluta.tytul}
          tresc={t.waluta.tresc}
          makieta={
            <MockupSlot
              file="mockup-koszty-kurs-desktop.png"
              label={t.waluta.label}
              note={t.waluta.note}
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
          tytul={t.firmowe.tytul}
          tresc={t.firmowe.tresc}
          makieta={<KosztyFirmowe />}
        />

        <Drobiazgi
          tone="mist"
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/kierowca">
                {t.kierowca}
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/ksiegowa">
                {t.ksiegowa}
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
