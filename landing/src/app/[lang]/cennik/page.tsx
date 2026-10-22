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
        'Automatycznie, na maila, po każdej opłacie. Z NIP-em, który podałeś przy zakładaniu konta, i ze stawką VAT „zw.” – cena z cennika jest ceną końcową.',
      ],
      [
        'Co po 14 dniach?',
        'Jeśli w trakcie próby wybrałeś plan i podałeś kartę, pierwsza opłata schodzi dopiero po okresie próbnym. Jeśli nie, konto przechodzi w tryb tylko do odczytu – nic nie ginie.',
      ],
      [
        'Mogę zmienić plan w trakcie?',
        'Tak, w obie strony. Różnicę rozliczamy proporcjonalnie do dni.',
      ],
      [
        'Jak rezygnuję?',
        'Sam, w Ustawienia → Plan i płatności → Otwórz panel płatności. Bez telefonu i bez pisma. Dostęp zostaje do końca opłaconego okresu.',
      ],
      [
        'Co z moimi danymi po rezygnacji?',
        'Konto zostaje do odczytu. Pobierasz faktury, ewidencje przebiegu, zestawienia i eksporty – w plikach, które otworzysz bez nas.',
      ],
    ],
  },
  en: {
    nadtytul: 'Pricing',
    naglowekPytan: 'Questions about payment',
    pytania: [
      [
        'How do I get an invoice?',
        'Automatically, by email, after every payment. With the tax ID (NIP) you gave when you set up your account, at the “zw.” (VAT-exempt) rate – the price on this page is the final price.',
      ],
      [
        'What happens after 14 days?',
        'If you picked a plan and added a card during the trial, the first payment is taken only once the trial ends. If you didn’t, your account switches to read-only – nothing is lost.',
      ],
      [
        'Can I change plans along the way?',
        'Yes, in both directions. We settle the difference pro rata, by the day.',
      ],
      [
        'How do I cancel?',
        'Yourself, in Settings → Plan and payments → Open payment panel. No phone call, no letter. You keep access until the end of the period you’ve paid for.',
      ],
      [
        'What happens to my data after I cancel?',
        'Your account stays read-only. You can download invoices, mileage logs, reports and exports – in files you can open without us.',
      ],
    ],
  },
};

/**
 * Cennik – wg projektu „BusiKM Cennik" z Claude Design (design/15-cennik).
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
