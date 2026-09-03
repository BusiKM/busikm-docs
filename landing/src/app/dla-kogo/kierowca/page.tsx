import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { OsDnia } from '@/components/ui/OsDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/kierowca-rola/Hero';
import { dzienKierowcy } from '@/components/pages/kierowca-rola/dzien';
import { Ekrany } from '@/components/pages/kierowca-rola/Ekrany';
import { CoWidzisz } from '@/components/pages/kierowca-rola/CoWidzisz';

export const metadata = pageMetadata('dla-kogo/kierowca');

const pytania = [
  [
    'Czy szef będzie mnie śledził po godzinach?',
    'Nie. Trasa nagrywa się między „Rozpocznij” a „Zakończ”. Po zakończeniu pozycja nie jest zbierana.',
  ],
  [
    'Muszę mieć drugi telefon?',
    'Nie. Działa na Twoim. Firmowych danych nie zostawia po odejściu z pracy.',
  ],
  ['Nie znam się na aplikacjach.', 'Trzy przyciski. Kod od szefa, własne hasło i jedziesz.'],
] as const;

const nieRobisz = [
  'zbierasz paragony w reklamówce',
  'przeskakujesz między aplikacjami',
  'liczysz godziny na kartce',
  'tłumaczysz przez telefon, gdzie jesteś',
  'przepisujesz adres z wiadomości do nawigacji',
];

/**
 * Kierowca — strona roli wg projektu „BusiKM Dla kierowcy" z Claude Design
 * (design/14-kierowca). Treść: docs/landing/05, rozdział B4.
 *
 * Jedyna strona serwisu pisana do kierowcy, nie do właściciela: ciemna od góry
 * do dołu, krótsza, większa typografia, zdania po sześć słów. Ani słowa
 * o marży, kosztach firmy i o tym, co widzi szef.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OsDnia naglowek="Twój dzień." punkty={dzienKierowcy} tone="surface" />
        <Ekrany />
        <PrzekreslonaLista rzeczy={nieRobisz} tone="surface" />
        <CoWidzisz />
        <Akordeon heading="Trzy pytania" items={pytania} tone="surface" />
      </main>
      <FinalCta nota="To pracodawca wybiera narzędzia. Ale to Ty spędzasz w tym osiem godzin dziennie — pokaż mu tę stronę." />
      <Footer />
    </>
  );
}
