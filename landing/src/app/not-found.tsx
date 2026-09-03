import type { Metadata } from 'next';
import Link from 'next/link';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { appLinks } from '@/content/navigation';

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

/**
 * Własny tytuł zakładki. Bez tego strona 404 dziedziczy tytuł strony
 * głównej i w historii przeglądarki wygląda jak zwykłe wejście na serwis.
 */
export const metadata: Metadata = {
  // Bez `robots` — Next dokłada tu `noindex` sam, a podanie własnego
  // zostawiało w kodzie strony dwa takie same znaczniki.
  title: 'Nie ma takiej strony · BusiKM',
};

const skroty = [
  {
    href: '/co-robi/dyspozytornia',
    label: 'Dyspozytornia',
    opis: 'Zlecenia, mapa i kierowcy na jednym ekranie',
  },
  {
    href: '/cennik',
    label: 'Cennik',
    opis: 'Dwa plany, od 149 zł netto miesięcznie',
  },
  {
    href: '/pomoc',
    label: 'Centrum pomocy',
    opis: 'Odpowiedzi na najczęstsze pytania',
  },
  {
    href: '/kontakt',
    label: 'Kontakt',
    opis: 'Napisz — odpisujemy tego samego dnia',
  },
];

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-paper px-6 pt-20 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
          <Container>
            <Eyebrow>Błąd 404</Eyebrow>

            <h1 className="mt-4 max-w-[16ch] text-h1-m font-bold text-balance lg:mt-5 lg:text-h1">
              Tej strony tu nie ma.
            </h1>

            <p className="mt-5 max-w-[58ch] text-lead-m text-pretty text-muted lg:mt-6 lg:text-lead">
              Może w odnośniku zgubiła się literówka, a może adres się
              zmienił. Jeśli trafiłeś tu z naszej strony — napisz, poprawimy.
            </p>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row lg:mt-10">
              <Button href="/" fullWidth className="sm:w-auto">
                Wróć na stronę główną
              </Button>
              <Button
                href={appLinks.demo}
                variant="secondary"
                fullWidth
                className="sm:w-auto"
              >
                Zobacz demo
              </Button>
            </div>

            <div className="mt-14 border-t border-line pt-8 lg:mt-20 lg:pt-10">
              <div className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase lg:text-caption">
                Może szukasz jednego z tych miejsc
              </div>

              <div className="mt-6 grid gap-x-10 gap-y-1 lg:grid-cols-2">
                {skroty.map((s) => (
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
