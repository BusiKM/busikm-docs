import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { Formularz } from '@/components/pages/kontakt/Formularz';
import { Adres } from '@/components/pages/kontakt/Adres';
import type { Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('kontakt');

const TEKSTY: Tlumaczenia<{ eyebrow: string; naglowek: [string, string]; lead: string }> = {
  pl: {
    eyebrow: 'Kontakt',
    naglowek: ['Napisz.', 'Odpisujemy tego samego dnia.'],
    lead: 'W dni robocze, między 8:00 a 17:00. Odpowiada człowiek, nie automat z numerem zgłoszenia.',
  },
  en: {
    eyebrow: 'Contact',
    naglowek: ['Write to us.', 'We reply the same day.'],
    lead: 'On working days, between 8:00 and 17:00 Polish time. A person replies, not a bot with a ticket number.',
  },
};

/**
 * Kontakt — wg projektu „BusiKM Kontakt" z Claude Design (design/21-kontakt).
 * Treść: docs/landing/05, rozdział C7.
 *
 * Bez numeru telefonu, dopóki nie ma kogoś, kto go odbierze. Zamiast tego
 * wprost: kiedy odpisujemy i kto odpisuje.
 */
export default async function Page({ params }: ParametryJezyka) {
  const t = TEKSTY[await jezykZParametrow(params)];
  return (
    <>
      <Header />
      <main className="bg-paper px-6 pt-20 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
        <Container className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1
              data-reveal
              className="text-display-m font-bold text-balance lg:text-[80px] lg:leading-[1.05] lg:tracking-[-0.03em]"
            >
              {t.naglowek[0]} <br className="hidden lg:inline" />
              {t.naglowek[1]}
            </h1>
            <p
              data-reveal
              className="max-w-[680px] text-lead-m text-pretty text-muted lg:text-lead"
            >
              {t.lead}
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
