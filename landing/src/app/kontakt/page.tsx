import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { pageMetadata } from '@/components/layout/PageShell';
import { Formularz } from '@/components/pages/kontakt/Formularz';
import { Adres } from '@/components/pages/kontakt/Adres';

export const metadata = pageMetadata('kontakt');

/**
 * Kontakt — wg projektu „BusiKM Kontakt" z Claude Design (design/21-kontakt).
 * Treść: docs/landing/05, rozdział C7.
 *
 * Bez numeru telefonu, dopóki nie ma kogoś, kto go odbierze. Zamiast tego
 * wprost: kiedy odpisujemy i kto odpisuje.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main className="bg-paper px-6 pt-20 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Eyebrow>Kontakt</Eyebrow>
            <h1
              data-reveal
              className="text-display-m font-bold text-balance lg:text-[80px] lg:leading-[1.05] lg:tracking-[-0.03em]"
            >
              Napisz. <br className="hidden lg:inline" />
              Odpisujemy tego samego dnia.
            </h1>
            <p
              data-reveal
              className="max-w-[680px] text-lead-m text-pretty text-muted lg:text-lead"
            >
              W dni robocze, między 8:00 a 17:00. Odpowiada człowiek, nie automat z numerem
              zgłoszenia.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div data-reveal>
              <Formularz />
            </div>
            <div data-reveal>
              <Adres />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
