import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Cennik } from '@/components/sections/Cennik';
import { Akordeon } from '@/components/ui/Akordeon';
import { pageMetadata } from '@/components/layout/PageShell';
import { Kalkulator } from '@/components/pages/cennik/Kalkulator';
import { Tabela } from '@/components/pages/cennik/Tabela';

export const metadata = pageMetadata('cennik');

const pytania = [
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
] as const;

/**
 * Cennik — wg projektu „BusiKM Cennik" z Claude Design (design/15-cennik).
 * Treść: docs/landing/05, rozdział C3.
 *
 * O tej stronie decyduje kalkulator, nie karty planów: człowiek ma w pięć
 * sekund zobaczyć, ile zapłaci przy swojej liczbie pojazdów.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Cennik nadtytul="Cennik" jakoH1 />
        <Kalkulator />
        <Tabela />
        <Akordeon heading="Pytania o płatności" items={pytania} tone="mist" />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
