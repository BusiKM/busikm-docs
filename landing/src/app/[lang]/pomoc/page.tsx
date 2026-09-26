import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { Szukaj } from '@/components/pages/pomoc/Szukaj';
import { grupyWyszukiwarki } from '@/content/pomoc';
import type { Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('pomoc');

const TEKSTY: Tlumaczenia<{ naglowek: React.ReactNode; lead: string; przycisk: string }> = {
  pl: {
    naglowek: (
      <>
        Nie znalazłeś? <br className="hidden lg:inline" />
        Napisz.
      </>
    ),
    lead: 'Odpisujemy tego samego dnia roboczego. Nie ma tu formularzy zgłoszeniowych z numerem sprawy.',
    przycisk: 'Napisz do nas',
  },
  en: {
    naglowek: (
      <>
        Couldn’t find it? <br className="hidden lg:inline" />
        Write to us.
      </>
    ),
    lead: 'We reply the same working day. No support tickets, no case numbers.',
    przycisk: 'Write to us',
  },
};

/**
 * Centrum pomocy — wg projektu „BusiKM Pomoc" z Claude Design
 * (design/19-pomoc). Treść: docs/landing/05, rozdział C5.
 *
 * Ktoś tu trafia zniecierpliwiony, więc wyszukiwarka jest pierwszą rzeczą,
 * którą widzi, i filtruje kategorie na żywo. Bez makiet produktu.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <Szukaj grupy={grupyWyszukiwarki(jezyk)} />

        <Section tone="ink" spacing="py-20 lg:py-28">
          <div className="flex flex-col items-center gap-6 text-center lg:gap-8">
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
            <p
              data-reveal
              className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
            >
              {t.lead}
            </p>
            <div data-reveal>
              <Button href="/kontakt">{t.przycisk}</Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
