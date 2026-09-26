import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { OsDnia } from '@/components/ui/OsDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { Hero } from '@/components/pages/kierowca-rola/Hero';
import { dzienKierowcy } from '@/components/pages/kierowca-rola/dzien';
import { Ekrany } from '@/components/pages/kierowca-rola/Ekrany';
import { CoWidzisz } from '@/components/pages/kierowca-rola/CoWidzisz';

export const generateMetadata = metadataPodstrony('dla-kogo/kierowca');

type Tresc = {
  osNaglowek: string;
  nieRobisz: string[];
  pytaniaNaglowek: string;
  pytania: [string, string][];
  nota: string;
};

const TEKSTY: Tlumaczenia<Tresc> = {
  pl: {
    osNaglowek: 'Twój dzień.',
    nieRobisz: [
      'zbierasz paragony w reklamówce',
      'przeskakujesz między aplikacjami',
      'liczysz godziny na kartce',
      'tłumaczysz przez telefon, gdzie jesteś',
      'przepisujesz adres z wiadomości do nawigacji',
    ],
    pytaniaNaglowek: 'Trzy pytania',
    pytania: [
      [
        'Czy szef będzie mnie śledził po godzinach?',
        'Nie. Trasa nagrywa się między „Rozpocznij” a „Zakończ”. Po zakończeniu pozycja nie jest zbierana.',
      ],
      [
        'Muszę mieć drugi telefon?',
        'Nie. Działa na Twoim. Firmowych danych nie zostawia po odejściu z pracy.',
      ],
      ['Nie znam się na aplikacjach.', 'Trzy przyciski. Kod od szefa, własne hasło i jedziesz.'],
    ],
    nota: 'To pracodawca wybiera narzędzia. Ale to Ty spędzasz w tym osiem godzin dziennie — pokaż mu tę stronę.',
  },
  en: {
    osNaglowek: 'Your day.',
    nieRobisz: [
      'keep receipts in a carrier bag',
      'jump between apps',
      'add up your hours on paper',
      'explain over the phone where you are',
      'copy the address from a message into the satnav',
    ],
    pytaniaNaglowek: 'Three questions',
    pytania: [
      [
        'Will my boss track me after hours?',
        'No. The route records between “Start” and “Finish”. After you finish, your position isn’t collected.',
      ],
      [
        'Do I need a second phone?',
        'No. It runs on yours. It leaves no company data behind when you change jobs.',
      ],
      ['I’m not good with apps.', 'Three buttons. A code from your boss, your own password, and off you go.'],
    ],
    nota: 'Your employer chooses the tools. But you’re the one using them eight hours a day — show them this page.',
  },
};

/**
 * Kierowca — strona roli wg projektu „BusiKM Dla kierowcy" z Claude Design
 * (design/14-kierowca). Treść: docs/landing/05, rozdział B4.
 *
 * Jedyna strona serwisu pisana do kierowcy, nie do właściciela: ciemna od góry
 * do dołu, krótsza, większa typografia, zdania po sześć słów. Ani słowa
 * o marży, kosztach firmy i o tym, co widzi szef.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <Hero />
        <OsDnia naglowek={t.osNaglowek} punkty={dzienKierowcy[jezyk]} tone="surface" />
        <Ekrany />
        <PrzekreslonaLista rzeczy={t.nieRobisz} tone="surface" />
        <CoWidzisz />
        <Akordeon heading={t.pytaniaNaglowek} items={t.pytania} tone="surface" />
      </main>
      <FinalCta nota={t.nota} />
      <Footer />
    </>
  );
}
