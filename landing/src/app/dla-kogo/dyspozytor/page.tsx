import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { OsDnia } from '@/components/ui/OsDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { ZakresRoli } from '@/components/ui/ZakresRoli';
import { pageMetadata } from '@/components/layout/PageShell';
import { dzienDyspozytora } from '@/components/pages/dyspozytor/dzien';
import { Ekrany } from '@/components/pages/dyspozytor/Ekrany';

export const metadata = pageMetadata('dla-kogo/dyspozytor');

const pytania = [
  [
    'Czy zobaczę, ile firma zarabia?',
    'Nie. Widzisz koszty kursu, żeby prowadzić dzień, ale wynik firmy zostaje u właściciela.',
  ],
  [
    'Ilu kierowców udźwignie jeden ekran?',
    'Tylu, ilu masz. Lista filtruje się po statusie: jedzie, na przerwie, dostępny.',
  ],
  [
    'Co, gdy kierowca nie odbiera?',
    'Widzisz jego ostatnią pozycję z godziną i piszesz wiadomość w aplikacji. Odczyta, gdy stanie.',
  ],
] as const;

const nieRobisz = [
  'dzwonisz do kierowcy trzy razy dziennie',
  'przepisujesz adres do nawigacji',
  'szukasz w zeszycie, kto ma wolne godziny',
  'tłumaczysz klientowi, że oddzwonisz',
];

/**
 * Dyspozytor — strona roli wg projektu „BusiKM Dla dyspozytora" z Claude Design
 * (design/12-dyspozytor). Treść: docs/landing/05, rozdział B2.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroRoli
          nadtytul="Dla dyspozytora"
          tytul="Cały dzień pracy na jednym ekranie."
          lead="Zlecenia, mapa i kierowca obok siebie. Bez przeskakiwania między oknami i bez dzwonienia trzy razy dziennie."
        />
        <OsDnia punkty={dzienDyspozytora} />
        <Ekrany />
        <PrzekreslonaLista rzeczy={nieRobisz} />
        <ZakresRoli
          naglowek="Co widzisz, a czego nie widzisz."
          kolumny={[
            {
              nadtytul: 'Widzisz',
              pozycje: [
                'Wszystkie zlecenia',
                'Całą flotę',
                'Kierowców i ich czas pracy',
                'Trasy i koszty kursu',
              ],
            },
            {
              nadtytul: 'Nie widzisz',
              pozycje: ['Wypłat', 'Marży firmy', 'Faktur'],
              tresc: 'Pieniądze zostają u właściciela.',
              przygaszona: true,
            },
          ]}
        />
        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
