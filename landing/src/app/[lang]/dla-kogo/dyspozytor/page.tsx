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
import { dzienDyspozytora } from '@/components/pages/dyspozytor/dzien';
import { Ekrany } from '@/components/pages/dyspozytor/Ekrany';

export const generateMetadata = metadataPodstrony('dla-kogo/dyspozytor');

type Tresc = {
  nadtytul: string;
  tytul: string;
  lead: string;
  nieRobisz: string[];
  zakres: { naglowek: string; kolumny: [KolumnaZakresu, KolumnaZakresu] };
  pytaniaNaglowek: string;
  pytania: [string, string][];
};

const TEKSTY: Tlumaczenia<Tresc> = {
  pl: {
    nadtytul: 'Dla dyspozytora',
    tytul: 'Cały dzień pracy na jednym ekranie.',
    lead: 'Kolejka zleceń i mapa floty obok siebie, a do kierowcy piszesz jednym kliknięciem. Bez przeskakiwania między oknami i bez dzwonienia trzy razy dziennie.',
    nieRobisz: [
      'dzwonisz do kierowcy trzy razy dziennie',
      'przepisujesz adres do nawigacji',
      'szukasz w zeszycie, kto ma wolne godziny',
      'tłumaczysz klientowi, że oddzwonisz',
    ],
    zakres: {
      naglowek: 'Co widzisz, a czego nie widzisz.',
      kolumny: [
        {
          nadtytul: 'Widzisz',
          pozycje: [
            'Wszystkie zlecenia',
            'Całą flotę',
            'Kierowców i ile jazdy im zostało',
            'Trasy i koszty kursu',
          ],
        },
        {
          nadtytul: 'Nie widzisz',
          pozycje: ['Wypłat', 'Marży firmy', 'Faktur'],
          tresc: 'Pieniądze zostają u właściciela.',
          przygaszona: true,
        },
      ],
    },
    pytaniaNaglowek: 'Trzy pytania',
    pytania: [
      [
        'Czy zobaczę, ile firma zarabia?',
        'Nie. Widzisz koszty kursu, żeby prowadzić dzień, ale wynik firmy zostaje u właściciela.',
      ],
      [
        'Ilu kierowców udźwignie jeden ekran?',
        'Tylu, ilu masz. Mapa filtruje auta: wszystkie, w trasie, wolne, serwis.',
      ],
      [
        'Co, gdy kierowca nie odbiera?',
        'Widzisz ostatnią pozycję auta i piszesz w czacie zlecenia. Kierowca odczyta w aplikacji, gdy stanie.',
      ],
    ],
  },
  en: {
    nadtytul: 'For dispatchers',
    tytul: 'A whole working day on one screen.',
    lead: 'The order queue and the fleet map side by side, and you message a driver in one click. No jumping between windows and no calling three times a day.',
    nieRobisz: [
      'call the driver three times a day',
      'copy the address into the satnav',
      'check a notebook for who has hours left',
      'tell the client you’ll call them back',
    ],
    zakres: {
      naglowek: 'What you see, and what you don’t.',
      kolumny: [
        {
          nadtytul: 'You see',
          pozycje: ['All orders', 'The whole fleet', 'Drivers and how much driving time they have left', 'Routes and job costs'],
        },
        {
          nadtytul: 'You don’t see',
          pozycje: ['Pay', 'Company margin', 'Invoices'],
          tresc: 'The money stays with the owner.',
          przygaszona: true,
        },
      ],
    },
    pytaniaNaglowek: 'Three questions',
    pytania: [
      [
        'Will I see how much the company earns?',
        'No. You see job costs so you can run the day, but the company’s result stays with the owner.',
      ],
      [
        'How many drivers can one screen handle?',
        'As many as you have. The map filters vans: all, on the road, free, in service.',
      ],
      [
        'What if a driver doesn’t answer?',
        'You see the van’s last position and write in the order chat. The driver reads it in the app when they stop.',
      ],
    ],
  },
};

/**
 * Dyspozytor – strona roli wg projektu „BusiKM Dla dyspozytora" z Claude Design
 * (design/12-dyspozytor). Treść: docs/landing/05, rozdział B2.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <HeroRoli nadtytul={t.nadtytul} tytul={t.tytul} lead={t.lead} />
        <OsDnia punkty={dzienDyspozytora[jezyk]} />
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
