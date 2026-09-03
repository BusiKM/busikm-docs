import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { OsDnia } from '@/components/ui/OsDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { ZakresRoli } from '@/components/ui/ZakresRoli';
import { pageMetadata } from '@/components/layout/PageShell';
import { dzienWlasciciela } from '@/components/pages/wlasciciel/dzien';
import { Ekrany } from '@/components/pages/wlasciciel/Ekrany';

export const metadata = pageMetadata('dla-kogo/wlasciciel');

const pytania = [
  [
    'Czy muszę siedzieć w tym cały dzień?',
    'Nie. Rano trzy liczby na pulpicie, resztę robi dyspozytor i kierowcy.',
  ],
  [
    'Prowadzę firmę sam, bez dyspozytora.',
    'Wtedy masz obie role na jednym koncie. Nic nie dopłacasz, bo płacisz za pojazdy, nie za ludzi.',
  ],
  [
    'Czy zobaczę, ile zarobiłem, zanim skończy się miesiąc?',
    'Tak, na bieżąco. Marża każdego kursu przelicza się, gdy kierowca doda paragon.',
  ],
] as const;

const nieRobisz = [
  'dzwonisz z pytaniem „gdzie jesteś”',
  'przepisujesz zlecenia do arkusza',
  'zbierasz paragony z kabin',
  'liczysz marżę po kwartale',
  'pilnujesz terminów w kalendarzu na ścianie',
];

/**
 * Właściciel — strona roli wg projektu „BusiKM Dla właściciela" z Claude Design
 * (design/11-wlasciciel). Treść: docs/landing/05, rozdział B1.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroRoli
          nadtytul="Dla właściciela"
          tytul={
            <>
              Wiesz, ile zostaje. <br className="hidden lg:inline" />
              I gdzie jest każdy bus.
            </>
          }
          lead="Bez dzwonienia do kierowców, bez przepisywania do arkusza, bez czekania na koniec kwartału."
        />
        <OsDnia punkty={dzienWlasciciela} />
        <Ekrany />
        <PrzekreslonaLista rzeczy={nieRobisz} />
        <ZakresRoli
          naglowek="Co widzisz, a czego nie musisz."
          kolumny={[
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
          ]}
        />
        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
