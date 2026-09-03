import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { pageMetadata } from '@/components/layout/PageShell';
import { PasekPostepu } from '@/components/pages/pierwsze-kroki/PasekPostepu';
import { Kroki } from '@/components/pages/pierwsze-kroki/Kroki';

export const metadata = pageMetadata('pomoc/pierwsze-kroki');

/**
 * Pierwsze kroki — wg projektu „BusiKM Pierwsze kroki" z Claude Design
 * (design/20-pierwsze-kroki). Treść: docs/landing/05, rozdział C6.
 *
 * To ten sam materiał, którego używa checklista w aplikacji, więc wygląda
 * jak lista do odhaczania, a nie jak artykuł.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-paper px-6 pt-20 pb-14 lg:px-12 lg:pt-32 lg:pb-24">
          <Container className="flex flex-col gap-8 lg:gap-14">
            <div className="flex flex-col gap-6 lg:gap-8">
              <nav
                aria-label="Ścieżka"
                className="flex items-center gap-3 text-[14px] text-muted"
              >
                <Link href="/pomoc" className="text-muted hover:text-ink">
                  Pomoc
                </Link>
                <span aria-hidden>›</span>
                <span className="font-medium tracking-[0.1em] uppercase">Pierwsze kroki</span>
              </nav>

              <h1
                data-reveal
                className="text-display-m font-bold text-balance lg:text-display"
              >
                Od konta do pierwszej faktury.
              </h1>
              <p
                data-reveal
                className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
              >
                Siedem kroków. Pierwszy zajmuje dwie minuty, ostatni robi się sam.
              </p>
            </div>

            <PasekPostepu />
          </Container>
        </section>

        <Kroki />

        <Section tone="mist" spacing="py-14 lg:py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[16px] font-medium lg:text-body">
            <Link href="/pomoc" className="text-ink hover:text-blue">
              ← Wróć do centrum pomocy
            </Link>
            <Link href="/kontakt" className="text-blue">
              Napisz do nas, jeśli coś nie działa →
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
