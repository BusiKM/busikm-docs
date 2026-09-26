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
import { Hero } from '@/components/pages/dokumenty/Hero';
import { WJednymMiejscu } from '@/components/pages/dokumenty/WJednymMiejscu';
import { StatusEkran } from '@/components/pages/dokumenty/StatusEkran';
import { WydrukIKolor } from '@/components/pages/dokumenty/WydrukIKolor';
import { UstawPrzypomnienie } from '@/components/mockups/dokumenty/UstawPrzypomnienie';
import { TelefonKierowcy } from '@/components/mockups/dokumenty/TelefonKierowcy';

export const generateMetadata = metadataPodstrony('co-robi/dokumenty-i-terminy');

type Teksty = {
  pytania: readonly (readonly [string, string])[];
  drobiazgi: readonly string[];
  przypomnienie: { tytul: string; tresc: string };
  kierowca: { tytul: string; tresc: string; label: string; note: string };
  ktoUzywa: string;
  wlascicielLink: string;
  kierowcaLink: string;
  pytaniaNaglowek: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    pytania: [
      [
        'Skąd system zna daty?',
        'Wpisujesz je raz przy dokumencie. Po odnowieniu przesuwasz termin jednym kliknięciem.',
      ],
      [
        'Czy przypomnienie przyjdzie mailem?',
        'Tak, mailem i w aplikacji. Kierowca dostaje swoje na telefon.',
      ],
      [
        'Co, gdy dokument dotyczy tylko jednego pojazdu?',
        'Wtedy siedzi przy tym pojeździe i nie miesza się z resztą floty.',
      ],
    ],
    drobiazgi: [
      'Skan dokumentu przy pozycji',
      'Przypomnienie mailem i w aplikacji',
      'Termin przesuwasz jednym kliknięciem po odnowieniu',
      'Historia poprzednich polis i przeglądów',
      'Dokumenty pojazdu widoczne dla kierowcy w trasie',
      'Lista do wydruku na jedną stronę',
    ],
    przypomnienie: {
      tytul: 'Przypomnienie z wyprzedzeniem',
      tresc: 'Na długo przed terminem, nie dzień po. Sam ustawiasz, ile dni wcześniej.',
    },
    kierowca: {
      tytul: 'Kierowca też dostaje swoje',
      tresc: 'O jego prawie jazdy i badaniach przypominamy jemu, nie tylko Tobie.',
      label: 'Dokumenty kierowcy · telefon, tryb nocny',
      note: 'Telefon kierowcy z jego dokumentami i najbliższym terminem badania u góry.',
    },
    ktoUzywa: 'Kto tego używa:',
    wlascicielLink: 'Właściciel →',
    kierowcaLink: 'Kierowca →',
    pytaniaNaglowek: 'Trzy pytania',
  },
  en: {
    pytania: [
      [
        'Where do the dates come from?',
        'You enter them once, with the document. After a renewal, you move the deadline with one click.',
      ],
      [
        'Will the reminder come by email?',
        'Yes, by email and in the app. The driver gets theirs on the phone.',
      ],
      [
        'What if a document only applies to one vehicle?',
        'Then it sits with that vehicle and doesn’t get mixed up with the rest of the fleet.',
      ],
    ],
    drobiazgi: [
      'The document scan sits with the entry',
      'Reminders by email and in the app',
      'Move the deadline with one click after a renewal',
      'History of past policies and inspections',
      'Vehicle documents visible to the driver on the road',
      'A printable list on a single page',
    ],
    przypomnienie: {
      tytul: 'Reminders well ahead',
      tresc: 'Long before the deadline, not the day after. You decide how many days ahead.',
    },
    kierowca: {
      tytul: 'The driver gets theirs too',
      tresc: 'We remind them about their driving licence and medical checks — not just you.',
      label: 'Driver’s documents · phone, dark mode',
      note: 'The driver’s phone with their documents and the next medical check at the top.',
    },
    ktoUzywa: 'Who uses it:',
    wlascicielLink: 'Owner →',
    kierowcaLink: 'Driver →',
    pytaniaNaglowek: 'Three questions',
  },
};

/**
 * Dokumenty i terminy — podstrona wg projektu „BusiKM Dokumenty i terminy"
 * z Claude Design (design/10-dokumenty-i-terminy). Treść: docs/landing/05, rozdział A9.
 *
 * Jedyna strona w serwisie, na której wolno użyć koloru `amber` — i tylko dla
 * dokumentu, który zaraz wygaśnie.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WJednymMiejscu />

        <Blok
          numer="02"
          tytul={t.przypomnienie.tytul}
          tresc={t.przypomnienie.tresc}
          makieta={<UstawPrzypomnienie />}
        />

        <Blok
          tone="ink"
          strona="left"
          numer="03"
          tytul={t.kierowca.tytul}
          tresc={t.kierowca.tresc}
          makieta={
            <MockupSlot
              file="mockup-dokumenty-kierowca-phone.png"
              label={t.kierowca.label}
              note={t.kierowca.note}
              ratio="9:19.5"
              box="6:7"
              // Zrzut ma szeroki kadr 4:3 z telefonem zajmującym 30% jego
              // szerokości — bez powiększenia wychodzi na 158 px w kolumnie
              // mającej 520. Ta sama wartość, co przy pozostałych telefonach.
              imageScale={1.8}
              imageScaleTelefon={1.8}
              dark
              noteClassName="mx-auto max-w-[520px]"
            >
              <TelefonKierowcy />
            </MockupSlot>
          }
        />

        <StatusEkran />
        <WydrukIKolor />

        <Drobiazgi
          tone="mist"
          kafelki={t.drobiazgi}
          stopka={
            <>
              {t.ktoUzywa}{' '}
              <Link href="/dla-kogo/wlasciciel">
                {t.wlascicielLink}
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/kierowca">
                {t.kierowcaLink}
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
