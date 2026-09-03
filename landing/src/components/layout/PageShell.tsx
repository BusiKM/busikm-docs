import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Container } from '@/components/ui/Container';
import { pages } from '@/content/pages';

/**
 * Szkielet podstrony — etap 0.
 *
 * Strona ma nagłówek, metadane i działające linki, a treść czeka na projekt
 * z Claude Design. Sekcje dochodzą w etapach 2 i 3, zgodnie z
 * docs/landing/05-podstrony.md.
 */

/**
 * Metadane podstrony.
 *
 * Właściwa budowa siedzi w `lib/metadata.ts` — tu zostaje tylko przekazanie
 * dalej, bo wszystkie podstrony importują tę nazwę stąd i nie ma powodu
 * przepisywać dwudziestu kilku plików.
 */
export { pageMetadata } from '@/lib/metadata';

export function PageShell({ slug }: { slug: string }) {
  const page = pages[slug];
  if (!page) throw new Error(`Brak opisu strony: ${slug}`);

  const [first, second] = page.heading.split('\n');

  return (
    <>
      <Header />
      <main>
        <section className="bg-paper px-5 pt-16 pb-20 lg:px-10 lg:pt-[120px] lg:pb-28">
          <Container>
            {page.eyebrow && (
              <div
                data-reveal
                className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase lg:text-caption"
              >
                {page.eyebrow}
              </div>
            )}

            <h1
              data-reveal
              className="mt-4 max-w-[18ch] text-h1-m font-bold text-balance lg:mt-5 lg:text-h1"
            >
              {first}
              {second && (
                <>
                  <br className="hidden lg:inline" />{' '}
                  <span className="text-muted lg:text-ink">{second}</span>
                </>
              )}
            </h1>

            <p
              data-reveal
              className="mt-5 max-w-[62ch] text-lead-m text-pretty text-muted lg:mt-6 lg:text-lead"
            >
              {page.lead}
            </p>

            {page.outline && (
              <div
                data-reveal-group
                className="mt-12 grid gap-x-10 gap-y-3 border-t border-line pt-8 lg:mt-16 lg:grid-cols-2 lg:pt-10"
              >
                <div
                  data-reveal
                  className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase lg:col-span-2"
                >
                  Co znajdzie się na tej stronie
                </div>
                {page.outline.map((item) => (
                  <div
                    key={item}
                    data-reveal
                    className="flex gap-3 py-1 text-body text-ink/70"
                  >
                    <span aria-hidden className="text-muted">
                      ·
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            )}

            <p
              data-reveal
              className="mt-12 max-w-[60ch] rounded-card border border-dashed border-line bg-mist p-6 text-[15px] text-muted lg:mt-16"
            >
              Ta strona czeka na projekt. Treść jest gotowa i opisana
              w dokumentacji — dochodzi układ i makiety.
            </p>
          </Container>
        </section>
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
