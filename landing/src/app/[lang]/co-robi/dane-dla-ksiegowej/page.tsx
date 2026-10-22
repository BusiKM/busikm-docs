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
        'To samo. Zapraszasz je mailem i dostaje własny dostęp do Twojej firmy. Jeśli biuro obsługuje kilka firm w BusiKM, każda zaprasza je osobno.',
      ],
      [
        'Co, jeśli używa programu, którego nie ma na liście?',
        'Rejestry VAT pobierze w Excelu albo PDF, płace i diety w Excelu albo CSV. Pliki JPK to standardowy XML.',
      ],
    ],
    drobiazgi: [
      'Kurs waluty zapisany przy dokumencie',
      'Zdjęcie paragonu zostaje dowodem',
      'Paczka robocza przed zamknięciem miesiąca',
      'Ewidencja przebiegu w PDF na każdy pojazd',
      'Podgląd przed pobraniem',
      'Zlecenia i mapa do wglądu',
    ],
    walidacja: {
      tytul: 'System sam mówi, czego brakuje',
      tresc: 'Sześć kroków miesiąca: faktury, koszty, przebieg, płace i diety, deklaracje i zamknięcie z pobraniem plików. Przy każdym widać, co jest gotowe, a przy braku – odnośnik prosto tam, gdzie go uzupełnisz.',
      label: 'Zamknięcie miesiąca · desktop',
      note: 'Rozliczenia, zakładka Miesiąc: zamknięcie września krok po kroku – faktury sprzedaży, koszty, ewidencja przebiegu, płace i diety, deklaracje – przy każdym kroku przejście do braku, obok najbliższe terminy JPK_V7M i VAT-UE oraz zamknięte poprzednie miesiące.',
    },
    kierowcy: {
      tytul: 'Rozliczenie kierowców',
      tresc: 'Dni za granicą, diety i noclegi, wynagrodzenie. Lista płac do pobrania w Excelu albo CSV.',
      label: 'Płace i diety · desktop',
      note: 'Rozliczenia, zakładka Płace i diety: kierowcy z dniami za granicą, wynagrodzeniem i dietami, obok rozliczenie Krzysztofa Kamińskiego za wrzesień – kalendarz dni w Niemczech, wynagrodzenie, diety i noclegi, kwota do rozliczenia.',
    },
    zewnatrz: {
      tytul: 'Księgowa z zewnątrz',
      tresc: 'Zapraszasz ją mailem i dostaje własny dostęp. Wystawia faktury i korekty, rejestruje wpłaty, poprawia koszty i zamyka miesiąc. Zlecenia i mapę widzi, ale ich nie zmienia.',
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
        'Same thing. You invite them by email and they get their own access to your company. If the office handles several companies in BusiKM, each one invites them separately.',
      ],
      [
        'What if their software isn’t on the list?',
        'VAT registers come as Excel or PDF, payroll and allowances as Excel or CSV. JPK files are standard XML.',
      ],
    ],
    drobiazgi: [
      'Exchange rate saved with the document',
      'The receipt photo stays as proof',
      'A draft package before the month is closed',
      'Mileage log as a PDF for each vehicle',
      'Preview before you download',
      'Orders and map to look at',
    ],
    walidacja: {
      tytul: 'It tells you what’s missing',
      tresc: 'Six month-end steps: invoices, costs, mileage, payroll and allowances, tax returns, and closing with the file download. Each shows what’s ready, and any gap comes with a link straight to where you fix it.',
      label: 'Month-end close · desktop',
      note: 'Settlements, Month tab: closing September step by step – sales invoices, costs, mileage log, payroll and allowances, tax returns – each step linking to what’s missing, with the next JPK_V7M and VAT-UE deadlines and previous closed months alongside.',
    },
    kierowcy: {
      tytul: 'Driver settlements',
      tresc: 'Days abroad, per diems (statutory daily travel allowances) and overnight allowances, pay. The payroll downloads as Excel or CSV.',
      label: 'Payroll and allowances · desktop',
      note: 'Settlements, Payroll and allowances tab: drivers with days abroad, pay and allowances, next to Krzysztof Kamiński’s September settlement – a calendar of days in Germany, pay, per diems and overnight allowances, the total to settle.',
    },
    zewnatrz: {
      tytul: 'An outside accountant',
      tresc: 'Invite them by email and they get their own access. They issue invoices and corrections, record payments, fix costs and close the month. They can see orders and the map, but can’t change them.',
    },
    ktoUzywa: 'Who uses it:',
    ksiegowa: 'Accountant →',
    pytaniaNaglowek: 'Three questions',
  },
};

/**
 * Dane dla księgowej – podstrona wg projektu „BusiKM Dane dla księgowej"
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
