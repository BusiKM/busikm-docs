import Link from '@/i18n/Link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { stan, naglowek, nota, czesci, zdarzenia } from '@/content/status';
import type { Tlumaczenia } from '@/i18n/jezyki';

export const generateMetadata = metadataPodstrony('status');

const TEKSTY: Tlumaczenia<{
  podpis: string;
  historia: string;
  brakPrzerw: string;
  cosNieDziala: string;
  napisz: string;
}> = {
  pl: {
    podpis:
      'Stan sprawdzamy i zmieniamy ręcznie. O przerwie piszemy tutaj, a klientom wysyłamy maila.',
    historia: 'Historia przerw · ostatnie dwanaście miesięcy',
    brakPrzerw: 'W ostatnich dwunastu miesiącach nie było przerw.',
    cosNieDziala: 'Coś nie działa, a tu świeci na zielono?',
    napisz: 'Napisz do nas.',
  },
  en: {
    podpis:
      'We check and update this page by hand. If there’s an outage, we post it here and email our customers.',
    historia: 'Outage history · last twelve months',
    brakPrzerw: 'There have been no outages in the last twelve months.',
    cosNieDziala: 'Something’s not working, but it’s green here?',
    napisz: 'Let us know.',
  },
};

/** Kolor niesie tu znaczenie — to jedyne takie miejsce poza dokumentami. */
const kropki: Record<'ok' | 'uwaga' | 'przerwa', string> = {
  ok: 'bg-green shadow-[0_0_0_10px_rgba(48,209,88,.16)]',
  uwaga: 'bg-amber shadow-[0_0_0_10px_rgba(255,149,0,.16)]',
  przerwa: 'bg-red shadow-[0_0_0_10px_rgba(255,59,48,.16)]',
};

const male: Record<'ok' | 'uwaga' | 'przerwa', string> = {
  ok: 'bg-green',
  uwaga: 'bg-amber',
  przerwa: 'bg-red',
};

const tonStanu = stan === 'ok' ? 'ok' : stan === 'czesciowa' ? 'uwaga' : 'przerwa';

/**
 * Status usługi — wg projektu „BusiKM Status" z Claude Design
 * (design/22-status). Treść: docs/landing/05, rozdział C8.
 *
 * Najprostsza strona serwisu: jedno pytanie, jedna odpowiedź, widoczna
 * z drugiego końca pokoju. Bez nagłówka sprzedażowego, bez finału,
 * bez przycisków do wypróbowania.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main>
        <section className="bg-paper px-6 pt-20 pb-16 lg:px-12 lg:pt-32 lg:pb-24">
          <Container className="flex flex-col items-center gap-8 text-center lg:gap-10">
            <Eyebrow>Status</Eyebrow>

            <div className="flex items-center gap-5 lg:gap-8">
              <span
                aria-hidden
                className={`size-5 flex-none rounded-full lg:size-7 ${kropki[tonStanu]}`}
              />
              <h1 className="text-display-m font-bold text-balance lg:text-display">
                {naglowek[jezyk]}
              </h1>
            </div>

            <p className="text-[14px] leading-relaxed text-muted lg:text-caption">
              {t.podpis}
            </p>

            {nota && (
              <p className="max-w-[640px] rounded-card border border-line bg-white px-6 py-5 text-[16px] leading-relaxed text-pretty lg:px-7 lg:text-body">
                {nota[jezyk]}
              </p>
            )}
          </Container>
        </section>

        <section className="bg-paper px-6 pb-20 lg:px-12 lg:pb-32">
          <div className="mx-auto flex max-w-[720px] flex-col border-t border-line">
            {czesci.map((c) => (
              <div
                key={c.nazwa.pl}
                className="flex items-center justify-between gap-5 border-b border-line py-5 text-[18px] font-semibold tracking-[-0.01em] lg:py-6 lg:text-[22px]"
              >
                <span>{c.nazwa[jezyk]}</span>
                <span
                  className={`flex flex-none items-center gap-2.5 text-[15px] font-medium lg:gap-3 lg:text-body ${
                    c.ton === 'ok' ? 'text-muted' : 'text-ink'
                  }`}
                >
                  <span aria-hidden className={`size-2.5 rounded-full ${male[c.ton]}`} />
                  {c.slowo[jezyk]}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-mist px-6 py-16 lg:px-12 lg:py-28">
          <div className="mx-auto flex max-w-[720px] flex-col gap-8 lg:gap-10">
            <h2 className="text-h3-m font-semibold lg:text-h3">
              {t.historia}
            </h2>

            {zdarzenia.length === 0 ? (
              <p className="text-lead-m text-muted lg:text-lead">
                {t.brakPrzerw}
              </p>
            ) : (
              <div className="flex flex-col border-t border-line">
                {zdarzenia.map((z) => (
                  <div
                    key={z.id}
                    className="grid gap-3 border-b border-line py-6 lg:grid-cols-[200px_1fr] lg:gap-8 lg:py-7"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-[16px] font-semibold lg:text-body">{z.data[jezyk]}</span>
                      <span className="text-[14px] text-muted lg:text-caption">{z.czas[jezyk]}</span>
                    </div>
                    <div className="flex flex-col gap-2 text-[16px] leading-relaxed lg:text-body">
                      <span>{z.co[jezyk]}</span>
                      <span className="text-muted">{z.zrobione[jezyk]}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="pt-4 text-[16px] leading-relaxed text-muted lg:text-body">
              {t.cosNieDziala}{' '}
              <Link href="/kontakt" className="font-medium text-blue">
                {t.napisz}
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
