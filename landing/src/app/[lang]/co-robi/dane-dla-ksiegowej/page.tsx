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
import { Hero } from '@/components/pages/ksiegowa/Hero';
import { MiesiacIFormat } from '@/components/pages/ksiegowa/MiesiacIFormat';
import { DziewiecZestawien } from '@/components/pages/ksiegowa/DziewiecZestawien';
import { ZamkniecieIHistoria } from '@/components/pages/ksiegowa/ZamkniecieIHistoria';
import { Walidacja } from '@/components/mockups/ksiegowa/Walidacja';
import { RozliczenieKierowcy } from '@/components/mockups/ksiegowa/RozliczenieKierowcy';
import { ZaproszenieKsiegowej } from '@/components/mockups/ksiegowa/ZaproszenieKsiegowej';

export const generateMetadata = metadataPodstrony('co-robi/dane-dla-ksiegowej');

type Teksty = {
  pytania: readonly (readonly [string, string])[];
  drobiazgi: readonly string[];
  walidacja: { tytul: string; tresc: string; label: string; note: string };
  kierowcy: { tytul: string; tresc: string; label: string; note: string };
  zewnatrz: { tytul: string; tresc: string };
  ktoUzywa: string;
  ksiegowa: string;
  pytaniaNaglowek: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    pytania: [
      [
        'Czy moja księgowa będzie musiała się przestawiać?',
        'Nie. Pobiera plik i wczytuje do programu, którego już używa.',
      ],
      [
        'A jeśli mam biuro rachunkowe, nie księgową na etacie?',
        'To samo. Zapraszasz je mailem i dostaje własny dostęp do Twojej firmy.',
      ],
      [
        'Co, jeśli używa programu, którego nie ma na liście?',
        'Jest jeszcze zwykły arkusz, z osobną zakładką na każde zestawienie.',
      ],
    ],
    drobiazgi: [
      'Kurs waluty zapisany przy dokumencie',
      'Zdjęcie paragonu zostaje dowodem',
      'Zestawienie użytych kursów za okres',
      'Wydruk karty czasu pracy',
      'Podgląd przed pobraniem',
      'Dostęp tylko do odczytu',
    ],
    walidacja: {
      tytul: 'System sam mówi, czego brakuje',
      tresc: 'Zanim plik pójdzie dalej, widać, co jest niekompletne.',
      label: 'Walidacja przed eksportem · desktop',
      note: 'Lista zestawień ze statusem komplet / do uzupełnienia i krótkim opisem braku. Bez czerwieni.',
    },
    kierowcy: {
      tytul: 'Rozliczenie kierowców',
      tresc: 'Dni za granicą, diety, wypłata. Gotowe do wczytania.',
      label: 'Rozliczenie kierowcy z dietami · desktop',
      note: 'Trzy liczby (dni za granicą, diety, do wypłaty), tabela krajów z dniami i stawkami.',
    },
    zewnatrz: {
      tytul: 'Księgowa z zewnątrz',
      tresc: 'Zapraszasz ją mailem, dostaje własny dostęp i widzi tylko to, co powinna.',
    },
    ktoUzywa: 'Kto tego używa:',
    ksiegowa: 'Księgowa →',
    pytaniaNaglowek: 'Trzy pytania',
  },
  en: {
    pytania: [
      [
        'Will my accountant have to change how they work?',
        'No. They download the file and import it into the software they already use.',
      ],
      [
        'What if I use an accounting office rather than an in-house accountant?',
        'Same thing. You invite them by email and they get their own access to your company.',
      ],
      [
        'What if their software isn’t on the list?',
        'There’s always a plain spreadsheet, with a separate tab for each report.',
      ],
    ],
    drobiazgi: [
      'Exchange rate saved with the document',
      'The receipt photo stays as proof',
      'Summary of the exchange rates used in the period',
      'Printable working-time sheet',
      'Preview before you download',
      'Read-only access',
    ],
    walidacja: {
      tytul: 'It tells you what’s missing',
      tresc: 'Before the file goes anywhere, you can see what’s incomplete.',
      label: 'Check before export · desktop',
      note: 'List of reports marked complete / to complete, with a short note on what’s missing. No red.',
    },
    kierowcy: {
      tytul: 'Driver settlements',
      tresc: 'Days abroad, per diems (statutory daily travel allowances), pay. Ready to import.',
      label: 'Driver settlement with per diems · desktop',
      note: 'Three numbers (days abroad, per diems, to pay) and a table of countries with days and rates.',
    },
    zewnatrz: {
      tytul: 'An outside accountant',
      tresc: 'Invite them by email. They get their own access and see only what they should.',
    },
    ktoUzywa: 'Who uses it:',
    ksiegowa: 'Accountant →',
    pytaniaNaglowek: 'Three questions',
  },
};

/**
 * Dane dla księgowej — podstrona wg projektu „BusiKM Dane dla księgowej"
 * z Claude Design (design/04-dane-dla-ksiegowej). Treść: docs/landing/05, rozdział A8.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MiesiacIFormat />
        <DziewiecZestawien />

        <Blok
          numer="04"
          tytul={t.walidacja.tytul}
          tresc={t.walidacja.tresc}
          makieta={
            <MockupSlot
              file="mockup-ksiegowa-walidacja-desktop.png"
              label={t.walidacja.label}
              note={t.walidacja.note}
              ratio="4:3"
            >
              <Walidacja />
            </MockupSlot>
          }
        />

        <ZamkniecieIHistoria />

        <Blok
          strona="left"
          numer="07"
          tytul={t.kierowcy.tytul}
          tresc={t.kierowcy.tresc}
          makieta={
            <MockupSlot
              file="mockup-ksiegowa-diety-desktop.png"
              label={t.kierowcy.label}
              note={t.kierowcy.note}
              ratio="4:3"
            >
              <RozliczenieKierowcy />
            </MockupSlot>
          }
        />

        <Blok
          tone="ink"
          numer="08"
          tytul={t.zewnatrz.tytul}
          tresc={t.zewnatrz.tresc}
          makieta={<ZaproszenieKsiegowej />}
        />

        <Drobiazgi
          tone="mist"
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
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
