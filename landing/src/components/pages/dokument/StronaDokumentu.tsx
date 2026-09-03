import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { SpisTresci } from '@/components/pages/dokument/SpisTresci';
import { firma } from '@/content/firma';
import { kotwica, type Blok, type Dokument } from '@/content/dokumenty/typy';

/** Szerokość wiersza pilnowana w znakach, nie w pikselach — tak się to czyta. */
const KOLUMNA = 'max-w-[62ch]';

function Tresc({ blok }: { blok: Blok }) {
  if (blok.typ === 'akapit') {
    return <p className={`${KOLUMNA} text-pretty`}>{blok.tresc}</p>;
  }

  if (blok.typ === 'lista') {
    return (
      <div className={`${KOLUMNA} flex flex-col gap-3`}>
        {blok.wstep && <p className="text-pretty">{blok.wstep}</p>}
        <ol className="flex list-decimal flex-col gap-2.5 pl-5 marker:text-muted">
          {blok.punkty.map((p) => (
            <li key={p} className="pl-1 text-pretty">
              {p}
            </li>
          ))}
        </ol>
      </div>
    );
  }

  if (blok.typ === 'definicje') {
    return (
      <div className={`${KOLUMNA} flex flex-col gap-3`}>
        {blok.wstep && <p className="text-pretty">{blok.wstep}</p>}
        <dl className="flex flex-col gap-2.5">
          {blok.pozycje.map((d) => (
            <div key={d.termin} className="text-pretty">
              <dt className="inline font-semibold">{d.termin}</dt>{' '}
              <dd className="inline">— {d.opis}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-3">
      {/* Tabela ma własny kontener: na telefonie przewija się poziomo,
          a strona pod spodem nie. */}
      <div className="-mx-6 min-w-0 overflow-x-auto px-6 lg:mx-0 lg:px-0">
        <table className="w-full min-w-[640px] border-collapse text-left text-[14px] lg:text-[15px]">
          <thead>
            <tr className="border-b border-line-strong">
              {blok.naglowki.map((n) => (
                <th key={n} className="py-3 pr-5 align-bottom font-semibold last:pr-0">
                  {n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blok.wiersze.map((w) => (
              <tr key={w[0]} className="border-b border-line">
                {w.map((k, i) => (
                  <td
                    key={k}
                    className={`py-3.5 pr-5 align-top last:pr-0 ${i === 0 ? 'font-medium' : 'text-muted'}`}
                  >
                    {k}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {blok.stopka && <p className="text-[14px] text-muted">{blok.stopka}</p>}
    </div>
  );
}

/**
 * Wzorzec strony dokumentu prawnego — wg projektu „BusiKM Dokument prawny"
 * z Claude Design (design/23-prawne). Jeden układ na cztery adresy.
 *
 * To jedyne miejsce w serwisie, gdzie wolno używać języka prawnego, więc układ
 * robi wszystko, żeby ten tekst dało się przeczytać: wiersz do 62 znaków,
 * przyklejony spis treści, streszczenie prostym językiem przed treścią.
 */
export function StronaDokumentu({
  dokument,
  pozostale,
}: {
  dokument: Dokument;
  pozostale: { href: string; tytul: string }[];
}) {
  return (
    <>
      <Header />
      <main className="bg-paper px-6 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-28">
        <Container className="flex flex-col gap-10 lg:gap-14">
          <div className="flex flex-col gap-4 lg:gap-5">
            <Eyebrow>Dokument</Eyebrow>
            <h1 className="text-h1-m font-bold text-balance lg:text-h1">{dokument.tytul}</h1>
            <p className="text-[14px] text-muted lg:text-caption">
              Obowiązuje od {dokument.obowiazujeOd} · wersja {dokument.wersja}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start lg:gap-16">
            <SpisTresci paragrafy={dokument.paragrafy} />

            <div className="flex min-w-0 flex-col gap-10 lg:gap-14">
              <div className={`${KOLUMNA} flex flex-col gap-3.5 rounded-card bg-blue-soft p-6 lg:p-8`}>
                <div className="text-[12px] font-medium tracking-[0.1em] text-blue uppercase">
                  W skrócie
                </div>
                <ul className="flex flex-col gap-2 text-[16px] leading-relaxed text-pretty lg:text-body">
                  {dokument.wSkrocie.map((z) => (
                    <li key={z}>{z}</li>
                  ))}
                </ul>
                <p className="text-[13px] text-muted lg:text-caption">
                  To streszczenie ułatwia czytanie, ale nie zastępuje dokumentu. Wiążąca jest
                  treść poniżej.
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-12 lg:gap-16">
                {dokument.paragrafy.map((p) => (
                  <section key={p.numer} className="flex min-w-0 flex-col gap-5 lg:gap-6">
                    <h2
                      id={kotwica(p.numer)}
                      className="flex scroll-mt-28 flex-col gap-1.5 lg:flex-row lg:items-baseline lg:gap-4"
                    >
                      <span className="text-[14px] font-semibold text-blue lg:text-caption">
                        {p.numer}
                      </span>
                      <span className="text-h3-m font-semibold tracking-[-0.01em] lg:text-h3">
                        {p.tytul}
                      </span>
                    </h2>

                    <div className="flex min-w-0 flex-col gap-4 text-[16px] leading-relaxed lg:gap-5 lg:text-body">
                      {p.bloki.map((b, i) => (
                        <Tresc key={i} blok={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-line pt-8 text-[15px] text-muted lg:text-body">
                <span>Ostatnia zmiana: {dokument.ostatniaZmiana}</span>
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  Pozostałe dokumenty:
                  {pozostale.map((d, i) => (
                    <span key={d.href} className="flex items-center gap-2">
                      <Link href={d.href} className="text-blue">
                        {d.tytul}
                      </Link>
                      {i < pozostale.length - 1 && <span aria-hidden>·</span>}
                    </span>
                  ))}
                </span>
                <span>
                  Masz pytanie do tego dokumentu? Napisz:{' '}
                  <a href={`mailto:${firma.email}`} className="text-blue">
                    {firma.email}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
