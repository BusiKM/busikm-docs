import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { OsDnia } from '@/components/ui/OsDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { ZakresRoli, type KolumnaZakresu } from '@/components/ui/ZakresRoli';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { miesiacKsiegowej } from '@/components/pages/ksiegowa-rola/miesiac';
import { Ekrany } from '@/components/pages/ksiegowa-rola/Ekrany';

export const generateMetadata = metadataPodstrony('dla-kogo/ksiegowa');

type Tresc = {
  nadtytul: string;
  tytul: string;
  lead: string;
  osNaglowek: string;
  nieRobisz: string[];
  zakres: { naglowek: string; kolumny: [KolumnaZakresu, KolumnaZakresu]; nota: string };
  pytaniaNaglowek: string;
  pytania: [string, string][];
};

const TEKSTY: Tlumaczenia<Tresc> = {
  pl: {
    nadtytul: 'Dla księgowej',
    tytul: 'Koniec miesiąca w jednym kliknięciu.',
    lead: 'Dane wpadają przez cały miesiąc. Ty wybierasz okres, klikasz raz i masz komplet w formacie swojego programu.',
    osNaglowek: 'Twój miesiąc z BusiKM.',
    nieRobisz: [
      'prosisz o brakujące paragony',
      'przepisujesz delegacje z kartek',
      'przeliczasz waluty ręcznie',
      'sprawdzasz, czy ktoś nie zmienił danych wstecz',
      'dzwonisz po kursy z tabeli',
    ],
    zakres: {
      naglowek: 'Co widzisz, a czego nie widzisz.',
      kolumny: [
        {
          nadtytul: 'Widzisz',
          pozycje: ['Dokumenty', 'Koszty i przebieg', 'Delegacje i czas pracy', 'Kursy walut'],
          tresc: 'Wszystko za wybrany okres.',
        },
        {
          nadtytul: 'Nie widzisz',
          pozycje: ['Pozycji kierowców na mapie', 'Bieżących zleceń'],
          tresc: 'To nie Twoja robota.',
          przygaszona: true,
        },
      ],
      nota: 'Pracujesz w firmie albo obsługujesz ją z zewnątrz — i tak dostajesz zaproszenie mailem i własny dostęp, tylko do odczytu i tylko do tego, co potrzebne.',
    },
    pytaniaNaglowek: 'Trzy pytania',
    pytania: [
      [
        'Czy będę musiała się przestawiać?',
        'Nie. Pobierasz plik i wczytujesz do programu, którego już używasz.',
      ],
      [
        'Obsługuję dziewięć firm. Dziewięć kont?',
        'Nie. Jedno konto, przełączasz się między firmami, które Cię zaprosiły.',
      ],
      [
        'Co, gdy w danych czegoś brakuje?',
        'Zobaczysz to przed pobraniem, na liście sprawdzenia, razem z nazwiskiem osoby, która może to uzupełnić.',
      ],
    ],
  },
  en: {
    nadtytul: 'For accountants',
    tytul: 'Month-end in one click.',
    lead: 'Data comes in all month. You pick the period, click once and have everything in your accounting software’s format.',
    osNaglowek: 'Your month with BusiKM.',
    nieRobisz: [
      'chase missing receipts',
      'copy business trips off scraps of paper',
      'convert currencies by hand',
      'check nobody has changed past data',
      'phone round for exchange rates',
    ],
    zakres: {
      naglowek: 'What you see, and what you don’t.',
      kolumny: [
        {
          nadtytul: 'You see',
          pozycje: ['Documents', 'Costs and mileage', 'Business trips and working time', 'Exchange rates'],
          tresc: 'Everything for the period you choose.',
        },
        {
          nadtytul: 'You don’t see',
          pozycje: ['Drivers’ positions on the map', 'Live orders'],
          tresc: 'That’s not your job.',
          przygaszona: true,
        },
      ],
      nota: 'Whether you work in the company or look after it from outside, you get an email invitation and your own access — read-only, and only to what you need.',
    },
    pytaniaNaglowek: 'Three questions',
    pytania: [
      [
        'Will I have to change how I work?',
        'No. You download a file and import it into the software you already use.',
      ],
      [
        'I look after nine companies. Nine accounts?',
        'No. One account; you switch between the companies that invited you.',
      ],
      [
        'What if something is missing from the data?',
        'You’ll see it before you download, on the checklist, along with the name of the person who can fill it in.',
      ],
    ],
  },
};

/**
 * Księgowa — strona roli wg projektu „BusiKM Dla księgowej" z Claude Design
 * (design/13-ksiegowa). Treść: docs/landing/05, rozdział B3.
 *
 * Rytm inny niż na pozostałych stronach ról: oś jest miesięczna, nie godzinowa.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <HeroRoli nadtytul={t.nadtytul} tytul={t.tytul} lead={t.lead} />
        <OsDnia naglowek={t.osNaglowek} punkty={miesiacKsiegowej[jezyk]} skala="slowa" />
        <Ekrany />
        <PrzekreslonaLista rzeczy={t.nieRobisz} />
        <ZakresRoli
          naglowek={t.zakres.naglowek}
          kolumny={t.zakres.kolumny}
          nota={t.zakres.nota}
        />
        <Akordeon heading={t.pytaniaNaglowek} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
