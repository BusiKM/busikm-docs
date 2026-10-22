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
      'zgadujesz, czy paragon doszedł do biura',
      'liczysz godziny na kartce',
      'tłumaczysz przez telefon, gdzie jesteś',
      'przepisujesz adres z wiadomości do nawigacji',
    ],
    pytaniaNaglowek: 'Trzy pytania',
    pytania: [
      [
        'Czy szef będzie mnie śledził po godzinach?',
        'Nie. Trasa zapisuje się od „Zacznij dzień” do końca dnia, a na prywatną przerwę wstrzymasz zapis jednym przyciskiem. Po zakończeniu pozycja nie jest zbierana.',
      ],
      [
        'Muszę mieć drugi telefon?',
        'Nie. Działa na Twoim. Firmowych danych nie zostawia po odejściu z pracy.',
      ],
      ['Nie znam się na aplikacjach.', 'Jeden przycisk na każdy etap dnia. Kod z maila od szefa, własne hasło i jedziesz.'],
    ],
    nota: 'To pracodawca wybiera narzędzia. Ale to Ty spędzasz w tym osiem godzin dziennie – pokaż mu tę stronę.',
  },
  en: {
    osNaglowek: 'Your day.',
    nieRobisz: [
      'keep receipts in a carrier bag',
      'wonder whether your receipt reached the office',
      'add up your hours on paper',
      'explain over the phone where you are',
      'copy the address from a message into the satnav',
    ],
    pytaniaNaglowek: 'Three questions',
    pytania: [
      [
        'Will my boss track me after hours?',
        'No. The route records from “Start the day” until the day ends, and one button pauses it for a private break. After you finish, your position isn’t collected.',
      ],
      [
        'Do I need a second phone?',
        'No. It runs on yours. It leaves no company data behind when you change jobs.',
      ],
      ['I’m not good with apps.', 'One button for each stage of the day. A code from your boss by email, your own password, and off you go.'],
    ],
    nota: 'Your employer chooses the tools. But you’re the one using them eight hours a day – show them this page.',
  },
};

/**
 * Kierowca – strona roli wg projektu „BusiKM Dla kierowcy" z Claude Design
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
