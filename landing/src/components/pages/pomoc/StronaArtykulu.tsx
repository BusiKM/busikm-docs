import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { SpisRozdzialow } from '@/components/pages/pomoc/SpisRozdzialow';
import { firma } from '@/content/firma';
import { artykulPoSlugu, kategorie } from '@/content/pomoc';
import { kotwicaRozdzialu, NAZWY_ROL, type Artykul, type Blok } from '@/content/pomoc/typy';

/** Szerokość wiersza pilnowana w znakach — tak się mierzy czytelność. */
const KOLUMNA = 'max-w-[62ch]';

/**
 * Kroki — ponumerowana lista z pionową kreską łączącą.
 *
 * Numer w kółku, a nie sam `<ol>` z kropką: instrukcję czyta się z ekranu
 * telefonu w połowie wykonanej czynności i trzeba móc na pierwszy rzut oka
 * znaleźć miejsce, w którym się jest. Kreska między kółkami mówi, że to
 * kolejność, a nie zbiór równorzędnych opcji.
 *
 * Kreska wychodzi z kółka i kończy się na następnym, więc rysuje ją każdy
 * element oprócz ostatniego — `last:before:hidden`.
 */
function Kroki({ kroki }: { kroki: { tytul: string; opis?: string }[] }) {
  return (
    <ol className={`${KOLUMNA} flex flex-col`}>
      {kroki.map((k, i) => (
        <li
          key={k.tytul}
          className="relative flex gap-4 pb-6 last:pb-0 before:absolute before:top-9 before:bottom-0 before:left-[15px] before:w-px before:bg-line before:content-[''] last:before:hidden"
        >
          <span className="relative z-1 flex size-8 flex-none items-center justify-center rounded-full bg-blue text-[14px] font-semibold text-white tabular-nums">
            {i + 1}
          </span>
          <div className="flex flex-col gap-1.5 pt-1">
            <span className="font-semibold text-pretty">{k.tytul}</span>
            {k.opis && <span className="text-muted text-pretty">{k.opis}</span>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/**
 * Wyróżnienie — uwaga albo zapowiedź.
 *
 * Dwa warianty, bo mówią o czym innym. „Uwaga" ostrzega przed czymś, co jest
 * i co da się zepsuć. „Jeszcze tego nie ma" mówi o czymś, czego nie ma —
 * i musi wyglądać inaczej, żeby nikt nie szukał opisanego przycisku.
 */
function Wyroznienie({ typ, tresc }: { typ: 'uwaga' | 'wkrotce'; tresc: string }) {
  const uwaga = typ === 'uwaga';

  return (
    <div
      className={`${KOLUMNA} flex flex-col gap-2 rounded-card p-5 lg:p-6 ${
        uwaga ? 'bg-blue-soft' : 'border border-dashed border-line bg-mist'
      }`}
    >
      <div
        className={`text-[12px] font-medium tracking-[0.1em] uppercase ${
          uwaga ? 'text-blue-dark' : 'text-muted'
        }`}
      >
        {uwaga ? 'Uwaga' : 'Jeszcze tego nie ma'}
      </div>
      <p className="text-pretty">{tresc}</p>
    </div>
  );
}

function Tresc({ blok }: { blok: Blok }) {
  if (blok.typ === 'akapit') {
    return <p className={`${KOLUMNA} text-pretty`}>{blok.tresc}</p>;
  }

  if (blok.typ === 'kroki') {
    return <Kroki kroki={blok.kroki} />;
  }

  if (blok.typ === 'lista') {
    return (
      <div className={`${KOLUMNA} flex flex-col gap-3`}>
        {blok.wstep && <p className="text-pretty">{blok.wstep}</p>}
        <ul className="flex flex-col gap-2.5">
          {blok.punkty.map((p) => (
            <li key={p} className="flex gap-3 text-pretty">
              <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-blue" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (blok.typ === 'uwaga' || blok.typ === 'wkrotce') {
    return <Wyroznienie typ={blok.typ} tresc={blok.tresc} />;
  }

  // Tabela. Własny kontener z przewijaniem — na telefonie szeroka tabela ma
  // jechać w poziomie sama, a nie ciągnąć za sobą całej strony.
  return (
    <div className="-mx-6 overflow-x-auto px-6 lg:mx-0 lg:px-0">
      <table className="w-full min-w-[420px] border-collapse text-left text-[15px] lg:text-body">
        <thead>
          <tr className="border-b border-ink">
            {blok.naglowki.map((n) => (
              <th key={n} className="py-3 pr-5 font-semibold last:pr-0">
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
  );
}

/** Etykieta w pasku pod tytułem — rola, miejsce w aplikacji, czas. */
function Znacznik({ etykieta, wartosc }: { etykieta: string; wartosc: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium tracking-[0.1em] text-muted uppercase">
        {etykieta}
      </span>
      <span className="text-[15px] font-medium">{wartosc}</span>
    </div>
  );
}

/**
 * Strona artykułu pomocy — jeden układ na wszystkie instrukcje.
 *
 * Kolejność na ekranie jest kolejnością pytań, które zadaje ktoś, kto tu
 * trafił: co to da (lead), czy to o mnie (role), gdzie tego szukać (ścieżka
 * w aplikacji), ile zajmie (czas), co przygotować (zanim), jak to zrobić
 * (rozdziały). Dopiero na końcu — dokąd dalej.
 */
export function StronaArtykulu({ artykul }: { artykul: Artykul }) {
  const kategoria = kategorie.find((k) => k.id === artykul.kategoria);
  const powiazane = (artykul.powiazane ?? [])
    .map(artykulPoSlugu)
    .filter((a): a is Artykul => Boolean(a));

  return (
    <>
      <Header />
      <main className="bg-paper px-6 pt-16 pb-20 lg:px-12 lg:pt-24 lg:pb-28">
        <Container className="flex flex-col gap-10 lg:gap-14">
          <div className="flex flex-col gap-4 lg:gap-5">
            <nav aria-label="Ścieżka" className="flex items-center gap-3 text-[14px] text-muted">
              <Link href="/pomoc" className="text-muted hover:text-ink">
                Pomoc
              </Link>
              <span aria-hidden>›</span>
              <span className="font-medium tracking-[0.1em] uppercase">{kategoria?.nazwa}</span>
            </nav>

            <h1 className="text-h1-m font-bold text-balance lg:text-h1">{artykul.tytul}</h1>
            <p className={`${KOLUMNA} text-lead-m text-pretty text-muted lg:text-lead`}>
              {artykul.lead}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:items-start lg:gap-16">
            <SpisRozdzialow rozdzialy={artykul.rozdzialy} />

            <div className="flex min-w-0 flex-col gap-10 lg:gap-14">
              <div className="flex flex-wrap gap-x-10 gap-y-5 border-y border-line py-5">
                <Znacznik
                  etykieta="Dla kogo"
                  wartosc={artykul.role.map((r) => NAZWY_ROL[r]).join(' · ')}
                />
                {artykul.gdzie && <Znacznik etykieta="Gdzie" wartosc={artykul.gdzie} />}
                {artykul.czas && <Znacznik etykieta="Ile zajmie" wartosc={artykul.czas} />}
              </div>

              {artykul.zanim && (
                <div
                  className={`${KOLUMNA} flex flex-col gap-3.5 rounded-card bg-blue-soft p-6 lg:p-8`}
                >
                  <div className="text-[12px] font-medium tracking-[0.1em] text-blue-dark uppercase">
                    Przygotuj przed startem
                  </div>
                  <ul className="flex flex-col gap-2 text-[16px] leading-relaxed text-pretty lg:text-body">
                    {artykul.zanim.map((z) => (
                      <li key={z} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1.5 flex-none rounded-full bg-blue" />
                        <span>{z}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex min-w-0 flex-col gap-12 lg:gap-16">
                {artykul.rozdzialy.map((r) => (
                  <section key={r.tytul} className="flex min-w-0 flex-col gap-5 lg:gap-6">
                    <h2
                      id={kotwicaRozdzialu(r.tytul)}
                      className="scroll-mt-28 text-h3-m font-semibold tracking-[-0.01em] text-balance lg:text-h3"
                    >
                      {r.tytul}
                    </h2>

                    <div className="flex min-w-0 flex-col gap-5 text-[16px] leading-relaxed lg:gap-6 lg:text-body">
                      {r.bloki.map((b, i) => (
                        <Tresc key={i} blok={b} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {powiazane.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-line pt-8">
                  <div className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
                    Dalej przyda się
                  </div>
                  <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-4">
                    {powiazane.map((a) => (
                      <Link
                        key={a.slug}
                        href={`/pomoc/${a.slug}`}
                        className="flex flex-col gap-2 rounded-card border border-line bg-white p-5 text-ink shadow-card transition-colors hover:border-blue lg:p-6"
                      >
                        <span className="text-[17px] font-semibold tracking-[-0.01em]">
                          {a.tytul}
                        </span>
                        <span className="text-[15px] leading-relaxed text-muted">{a.lead}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8 text-[15px] lg:text-body">
                <Link href="/pomoc" className="font-medium text-ink hover:text-blue">
                  ← Wróć do centrum pomocy
                </Link>
                <span className="text-muted">
                  Coś tu nie zgadza się z tym, co widzisz na ekranie?{' '}
                  <a href={`mailto:${firma.email}`} className="text-blue">
                    Napisz
                  </a>
                  .
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
