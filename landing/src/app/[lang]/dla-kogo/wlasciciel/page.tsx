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
import { dzienWlasciciela } from '@/components/pages/wlasciciel/dzien';
import { Ekrany } from '@/components/pages/wlasciciel/Ekrany';

export const generateMetadata = metadataPodstrony('dla-kogo/wlasciciel');

type Tresc = {
  nadtytul: string;
  tytul: React.ReactNode;
  lead: string;
  nieRobisz: string[];
  zakres: { naglowek: string; kolumny: [KolumnaZakresu, KolumnaZakresu] };
  pytaniaNaglowek: string;
  pytania: [string, string][];
};

const TEKSTY: Tlumaczenia<Tresc> = {
  pl: {
    nadtytul: 'Dla właściciela',
    tytul: (
      <>
        Wiesz, ile zostaje. <br className="hidden lg:inline" />
        I gdzie jest każdy bus.
      </>
    ),
    lead: 'Bez dzwonienia do kierowców, bez przepisywania do arkusza, bez czekania na koniec kwartału.',
    nieRobisz: [
      'dzwonisz z pytaniem „gdzie jesteś”',
      'przepisujesz zlecenia do arkusza',
      'zbierasz paragony z kabin',
      'liczysz marżę po kwartale',
      'pilnujesz terminów w kalendarzu na ścianie',
    ],
    zakres: {
      naglowek: 'Co widzisz, a czego nie musisz.',
      kolumny: [
        {
          nadtytul: 'Widzisz',
          tytul: 'Wszystko.',
          tresc: 'Każde zlecenie, każdy koszt, każdą trasę, wszystkie pieniądze.',
        },
        {
          nadtytul: 'Nie musisz',
          tytul: 'Wchodzić w to codziennie.',
          tresc: 'Dyspozytor prowadzi dzień, księgowa zamyka miesiąc, Ty patrzysz na wynik.',
        },
      ],
    },
    pytaniaNaglowek: 'Trzy pytania',
    pytania: [
      [
        'Czy muszę siedzieć w tym cały dzień?',
        'Nie. Rano zaglądasz do „Do zrobienia” na pulpicie, resztę robi dyspozytor i kierowcy.',
      ],
      [
        'Prowadzę firmę sam, bez dyspozytora.',
        'Wtedy dyspozytornię masz u siebie w menu. Nic nie dopłacasz, bo płacisz za pojazdy, nie za ludzi.',
      ],
      [
        'Czy zobaczę, ile zarobiłem, zanim skończy się miesiąc?',
        'Tak, na bieżąco. Marża kursu przelicza się, gdy paragon od kierowcy ma komplet danych.',
      ],
    ],
  },
  en: {
    nadtytul: 'For owners',
    tytul: (
      <>
        You know what you keep. <br className="hidden lg:inline" />
        And where every van is.
      </>
    ),
    lead: 'No phoning drivers, no copying into a spreadsheet, no waiting for the end of the quarter.',
    nieRobisz: [
      'call to ask “where are you?”',
      'copy orders into a spreadsheet',
      'collect receipts from the cabs',
      'work out your margin a quarter late',
      'track deadlines on a wall calendar',
    ],
    zakres: {
      naglowek: 'What you see, and what you don’t have to do.',
      kolumny: [
        {
          nadtytul: 'You see',
          tytul: 'Everything.',
          tresc: 'Every order, every cost, every route, all the money.',
        },
        {
          nadtytul: 'You don’t have to',
          tytul: 'Deal with it every day.',
          tresc: 'The dispatcher runs the day, the accountant closes the month, you look at the result.',
        },
      ],
    },
    pytaniaNaglowek: 'Three questions',
    pytania: [
      [
        'Do I have to sit in front of it all day?',
        'No. In the morning you check “To do” on the dashboard; the dispatcher and drivers do the rest.',
      ],
      [
        'I run the company alone, with no dispatcher.',
        'Then dispatch is right there in your menu. You pay nothing extra, because you pay for vehicles, not people.',
      ],
      [
        'Will I see what I’ve earned before the month ends?',
        'Yes, as it happens. The margin on a job recalculates once the driver’s receipt has all its details.',
      ],
    ],
  },
};

/**
 * Właściciel – strona roli wg projektu „BusiKM Dla właściciela" z Claude Design
 * (design/11-wlasciciel). Treść: docs/landing/05, rozdział B1.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <HeroRoli nadtytul={t.nadtytul} tytul={t.tytul} lead={t.lead} />
        <OsDnia punkty={dzienWlasciciela[jezyk]} />
        <Ekrany />
        <PrzekreslonaLista rzeczy={t.nieRobisz} />
        <ZakresRoli naglowek={t.zakres.naglowek} kolumny={t.zakres.kolumny} />
        <Akordeon heading={t.pytaniaNaglowek} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
