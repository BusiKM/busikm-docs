import Link from '@/i18n/Link';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { appLinks } from '@/content/navigation';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Strona 404.
 *
 * Bez tego pliku Next pokazuje własną — po angielsku, bez nagłówka, stopki
 * i stylu serwisu.
 *
 * Odnośniki niżej to nie mapa całego serwisu, tylko cztery miejsca, do
 * których faktycznie ktoś chciał trafić. Wyliczanie wszystkiego pomaga
 * mniej niż wskazanie najbliższego wyjścia.
 */

const TEKSTY: Tlumaczenia<{
  tytul: string;
  blad: string;
  naglowek: string;
  lead: string;
  wroc: string;
  demo: string;
  moze: string;
  skroty: { href: string; label: string; opis: string }[];
}> = {
  pl: {
    tytul: 'Nie ma takiej strony · BusiKM',
    blad: 'Błąd 404',
    naglowek: 'Tej strony tu nie ma.',
    lead: 'Może w odnośniku zgubiła się literówka, a może adres się zmienił. Jeśli trafiłeś tu z naszej strony — napisz, poprawimy.',
    wroc: 'Wróć na stronę główną',
    demo: 'Zobacz demo',
    moze: 'Może szukasz jednego z tych miejsc',
    skroty: [
      {
        href: '/co-robi/dyspozytornia',
        label: 'Dyspozytornia',
        opis: 'Zlecenia, mapa i kierowcy na jednym ekranie',
      },
      { href: '/cennik', label: 'Cennik', opis: 'Dwa plany, od 149 zł netto miesięcznie' },
      { href: '/pomoc', label: 'Centrum pomocy', opis: 'Odpowiedzi na najczęstsze pytania' },
      { href: '/kontakt', label: 'Kontakt', opis: 'Napisz — odpisujemy tego samego dnia' },
    ],
  },
  en: {
    tytul: 'Page not found · BusiKM',
    blad: 'Error 404',
    naglowek: 'This page isn’t here.',
    lead: 'Maybe the link has a typo, or the address has changed. If you got here from our site — let us know and we’ll fix it.',
    wroc: 'Back to the home page',
    demo: 'See the demo',
    moze: 'Maybe you’re looking for one of these',
    skroty: [
      {
        href: '/co-robi/dyspozytornia',
        label: 'Dispatch',
        opis: 'Orders, map and drivers on one screen',
      },
      { href: '/cennik', label: 'Pricing', opis: 'Two plans, from PLN 149 net per month' },
      { href: '/pomoc', label: 'Help centre', opis: 'Answers to the most common questions' },
      { href: '/kontakt', label: 'Contact', opis: 'Write to us — we reply the same day' },
    ],
  },
};

export function StronaNieZnaleziona() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <>
      <Header />
      <main>
        <section className="bg-paper px-6 pt-20 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
          <Container>
            <Eyebrow>{t.blad}</Eyebrow>

            <h1 className="mt-4 max-w-[16ch] text-h1-m font-bold text-balance lg:mt-5 lg:text-h1">
              {t.naglowek}
            </h1>

            <p className="mt-5 max-w-[58ch] text-lead-m text-pretty text-muted lg:mt-6 lg:text-lead">
              {t.lead}
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:mt-10">
              <Button href="/" fullWidth className="sm:w-auto">
                {t.wroc}
              </Button>
              <Button
                href={appLinks.demo}
                variant="secondary"
                fullWidth
                className="sm:w-auto"
              >
                {t.demo}
              </Button>
            </div>

            <div className="mt-14 border-t border-line pt-8 lg:mt-20 lg:pt-10">
              <div className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase lg:text-caption">
                {t.moze}
              </div>

              <div className="mt-6 grid gap-x-10 gap-y-1 lg:grid-cols-2">
                {t.skroty.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group flex flex-col gap-0.5 border-b border-line py-4 text-ink hover:text-ink lg:py-5"
                  >
                    <span className="text-[17px] font-semibold group-hover:text-blue lg:text-lead">
                      {s.label}
                    </span>
                    <span className="text-[15px] text-muted lg:text-body">
                      {s.opis}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

/** Tytuł zakładki strony 404 w danym języku. */
export const tytulNieZnalezionej = (jezyk: Jezyk) => TEKSTY[jezyk].tytul;
