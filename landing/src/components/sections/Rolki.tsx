import { KadrRolki } from '@/components/pages/rolki/KafelRolki';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { pobierzRolki } from '@/content/rolki';
import Link from '@/i18n/Link';
import { biezacyJezyk } from '@/i18n/serwer';

/** Pod tyle kafli sekcja wygląda jak przypadek, a nie jak coś, co żyje. */
const MINIMUM = 4;

/**
 * Sześć najnowszych rolek na stronie głównej.
 *
 * Tylko po polsku, tak jak film właściciela: rolki mówią po polsku, a angielskiej
 * wersji nie ma. Bez katalogu (awaria, początek) sekcja znika w całości.
 */
export async function Rolki() {
  const jezyk = biezacyJezyk();
  if (jezyk !== 'pl') return null;
  const rolki = await pobierzRolki(jezyk);
  if (rolki.length < MINIMUM) return null;

  return (
    <Section spacing="py-20 lg:py-28">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h2">
            Minuta z firmy transportowej
          </h2>
          <p data-reveal className="mt-3 text-body text-muted">
            Nowa rolka prawie codziennie. Oglądasz tutaj, bez konta na Facebooku.
          </p>
        </div>
        <Button href="/rolki" variant="secondary" className="flex-none">
          Wszystkie rolki →
        </Button>
      </div>

      <div className="-mx-6 grid auto-cols-[150px] grid-flow-col gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:auto-cols-auto lg:grid-flow-row lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0">
        {rolki.slice(0, 6).map((r) => (
          <Link key={r.slug} href={`/rolki?rolka=${r.slug}`} className="group block rounded-card text-ink hover:text-ink">
            <KadrRolki rolka={r} sizes="(min-width: 1024px) 174px, 150px" />
            <span className="mt-2.5 block text-[14px] leading-[1.35] font-semibold group-hover:text-blue">
              {r.tytul}
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
