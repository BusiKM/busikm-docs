import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { PasekPostepu } from '@/components/pages/pierwsze-kroki/PasekPostepu';
import { Kroki } from '@/components/pages/pierwsze-kroki/Kroki';
import type { Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('pomoc/pierwsze-kroki');

const TEKSTY: Tlumaczenia<{
  sciezka: string;
  pomoc: string;
  biezaca: string;
  naglowek: string;
  lead: string;
  wroc: string;
  kontakt: string;
}> = {
  pl: {
    sciezka: 'Ścieżka',
    pomoc: 'Pomoc',
    biezaca: 'Pierwsze kroki',
    naglowek: 'Od konta do pierwszej faktury.',
    lead: 'Siedem kroków. Pierwszy zajmuje dwie minuty, ostatni robi się sam.',
    wroc: '← Wróć do centrum pomocy',
    kontakt: 'Napisz do nas, jeśli coś nie działa →',
  },
  en: {
    sciezka: 'Breadcrumb',
    pomoc: 'Help',
    biezaca: 'Getting started',
    naglowek: 'From account to first invoice.',
    lead: 'Seven steps. The first takes two minutes, the last one does itself.',
    wroc: '← Back to the help centre',
    kontakt: 'Write to us if something doesn’t work →',
  },
};

/**
 * Pierwsze kroki — wg projektu „BusiKM Pierwsze kroki" z Claude Design
 * (design/20-pierwsze-kroki). Treść: docs/landing/05, rozdział C6.
 *
 * To ten sam materiał, którego używa checklista w aplikacji, więc wygląda
 * jak lista do odhaczania, a nie jak artykuł.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <section className="bg-paper px-6 pt-20 pb-14 lg:px-12 lg:pt-32 lg:pb-24">
          <Container className="flex flex-col gap-8 lg:gap-14">
            <div className="flex flex-col gap-6 lg:gap-8">
              <nav
                aria-label={t.sciezka}
                className="flex items-center gap-3 text-[14px] text-muted"
              >
                <Link href="/pomoc" className="text-muted hover:text-ink">
                  {t.pomoc}
                </Link>
                <span aria-hidden>›</span>
                <span className="font-medium tracking-[0.1em] uppercase">{t.biezaca}</span>
              </nav>

              <h1
                data-reveal
                className="text-display-m font-bold text-balance lg:text-display"
              >
                {t.naglowek}
              </h1>
              <p
                data-reveal
                className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
              >
                {t.lead}
              </p>
            </div>

            <PasekPostepu />
          </Container>
        </section>

        <Kroki />

        <Section tone="mist" spacing="py-14 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[16px] font-medium lg:text-body">
            <Link href="/pomoc" className="text-ink hover:text-blue">
              {t.wroc}
            </Link>
            <Link href="/kontakt" className="text-blue">
              {t.kontakt}
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
