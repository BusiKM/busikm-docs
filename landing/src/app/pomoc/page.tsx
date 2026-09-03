import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { pageMetadata } from '@/components/layout/PageShell';
import { Szukaj } from '@/components/pages/pomoc/Szukaj';

export const metadata = pageMetadata('pomoc');

/**
 * Centrum pomocy — wg projektu „BusiKM Pomoc" z Claude Design
 * (design/19-pomoc). Treść: docs/landing/05, rozdział C5.
 *
 * Ktoś tu trafia zniecierpliwiony, więc wyszukiwarka jest pierwszą rzeczą,
 * którą widzi, i filtruje kategorie na żywo. Bez makiet produktu.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Szukaj />

        <Section tone="ink" spacing="py-20 lg:py-28">
          <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Nie znalazłeś? <br className="hidden lg:inline" />
              Napisz.
            </h2>
            <p
              data-reveal
              className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
            >
              Odpisujemy tego samego dnia roboczego. Nie ma tu formularzy zgłoszeniowych
              z numerem sprawy.
            </p>
            <div data-reveal>
              <Button href="/kontakt">Napisz do nas</Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
