import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/wlasciciel/Hero';
import { TwojDzien } from '@/components/pages/wlasciciel/TwojDzien';
import { Ekrany } from '@/components/pages/wlasciciel/Ekrany';
import { CzegoNieRobisz } from '@/components/pages/wlasciciel/CzegoNieRobisz';
import { CoWidzisz } from '@/components/pages/wlasciciel/CoWidzisz';

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

/**
 * Właściciel — strona roli wg projektu „BusiKM Dla właściciela" z Claude Design
 * (design/11-wlasciciel). Treść: docs/landing/05, rozdział B1.
 *
 * Szkielet strony roli jest inny niż podstron obszarowych: oś dnia zamiast
 * numerowanych bloków, lista przekreślona i zakres dostępu w dwóch kolumnach.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TwojDzien />
        <Ekrany />
        <CzegoNieRobisz />
        <CoWidzisz />
        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
