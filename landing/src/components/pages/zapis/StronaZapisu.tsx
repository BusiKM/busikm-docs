import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { FormularzZapisu } from '@/components/pages/zapis/FormularzZapisu';
import type { OpisListy } from '@/content/zapisy';

/**
 * Wspólny szkielet stron wczesnego dostępu — `/demo` i `/zaloguj`.
 *
 * Jeden ekran, bez stopki i bez finału: jedynym wyjściem stąd ma być
 * zostawienie adresu albo powrót nagłówkiem. Ten sam rytm, co miała
 * poprzednia wersja `/demo`.
 *
 * Prawa kolumna należy do strony — demo pokazuje ekran produktu, dostęp
 * do aplikacji co innego.
 */
export function StronaZapisu({
  opis,
  children,
  podFormularzem,
}: {
  opis: OpisListy;
  /** Prawa kolumna — makieta albo cokolwiek, co niesie treść strony. */
  children: React.ReactNode;
  /** Drobne wyjście awaryjne pod formularzem, np. dla osób z kontem testowym. */
  podFormularzem?: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-paper px-6 py-16 lg:px-12 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
        />

        <Container className="relative grid gap-12 lg:grid-cols-[480px_1fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8 lg:gap-9">
            <div className="flex flex-col gap-5">
              <Eyebrow>{opis.eyebrow}</Eyebrow>
              <h1
                data-reveal
                className="text-display-m font-bold text-balance lg:text-[56px] lg:leading-[1.05] lg:tracking-[-0.03em]"
              >
                {opis.naglowek}
              </h1>
              <div
                data-reveal
                className="flex flex-col gap-1.5 text-[17px] leading-relaxed text-muted lg:text-[19px]"
              >
                {opis.lead.map((zdanie) => (
                  <span key={zdanie}>{zdanie}</span>
                ))}
              </div>
            </div>

            <div data-reveal>
              <FormularzZapisu opis={opis} />
            </div>

            {podFormularzem && (
              <div data-reveal className="border-t border-line pt-6">
                {podFormularzem}
              </div>
            )}
          </div>

          <div data-reveal className="relative flex flex-col gap-5">
            {children}
          </div>
        </Container>
      </main>
    </>
  );
}
