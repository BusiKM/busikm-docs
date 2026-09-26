import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Cennik } from '@/components/sections/Cennik';
import { Akordeon } from '@/components/ui/Akordeon';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { Kalkulator } from '@/components/pages/cennik/Kalkulator';
import { Tabela } from '@/components/pages/cennik/Tabela';

export const generateMetadata = metadataPodstrony('cennik');

type Pytania = readonly (readonly [string, string])[];

const TEKSTY: Tlumaczenia<{ nadtytul: string; naglowekPytan: string; pytania: Pytania }> = {
  pl: {
    nadtytul: 'Cennik',
    naglowekPytan: 'Pytania o płatności',
    pytania: [
      [
        'Jak dostanę fakturę?',
        'Automatycznie, na maila, co miesiąc. Z NIP-em, który podałeś przy zakładaniu konta.',
      ],
      [
        'Co po 14 dniach?',
        'Wybierasz plan i płacisz za pierwszy okres. Jeśli nie wybierzesz, konto przechodzi w tryb tylko do odczytu — nic nie ginie.',
      ],
      [
        'Mogę zmienić plan w trakcie?',
        'Tak, w obie strony. Różnicę rozliczamy proporcjonalnie do dni.',
      ],
      [
        'Jak rezygnuję?',
        'Jednym kliknięciem w ustawieniach konta. Bez telefonu, bez pisma, bez okresu wypowiedzenia.',
      ],
      [
        'Co z moimi danymi po rezygnacji?',
        'Pobierzesz je zawsze, także po. Zlecenia, koszty, trasy i dokumenty w plikach, które otworzysz bez nas.',
      ],
    ],
  },
  en: {
    nadtytul: 'Pricing',
    naglowekPytan: 'Questions about payment',
    pytania: [
      [
        'How do I get an invoice?',
        'Automatically, by email, every month. With the tax ID (NIP) you gave when you set up your account.',
      ],
      [
        'What happens after 14 days?',
        'You choose a plan and pay for the first period. If you don’t, your account switches to read-only — nothing is lost.',
      ],
      [
        'Can I change plans along the way?',
        'Yes, in both directions. We settle the difference pro rata, by the day.',
      ],
      [
        'How do I cancel?',
        'In one click in your account settings. No phone call, no letter, no notice period.',
      ],
      [
        'What happens to my data after I cancel?',
        'You can always download it, afterwards too. Orders, costs, routes and documents, in files you can open without us.',
      ],
    ],
  },
};

/**
 * Cennik — wg projektu „BusiKM Cennik" z Claude Design (design/15-cennik).
 * Treść: docs/landing/05, rozdział C3.
 *
 * O tej stronie decyduje kalkulator, nie karty planów: człowiek ma w pięć
 * sekund zobaczyć, ile zapłaci przy swojej liczbie pojazdów.
 */
export default async function Page({ params }: ParametryJezyka) {
  const t = TEKSTY[await jezykZParametrow(params)];
  return (
    <>
      <Header />
      <main>
        <Cennik nadtytul={t.nadtytul} jakoH1 />
        <Kalkulator />
        <Tabela />
        <Akordeon heading={t.naglowekPytan} items={t.pytania} tone="mist" />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
