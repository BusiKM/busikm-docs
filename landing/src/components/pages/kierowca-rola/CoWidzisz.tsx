import { Section, Eyebrow } from '@/components/ui/Section';
import { StoreBadges } from '@/components/ui/StoreBadges';

const rzeczy = [
  'Swoje zlecenia',
  'Swoją trasę',
  'Swoje koszty',
  'Swój czas pracy',
  'Swoje dokumenty',
];

/**
 * Zakres w wersji dla kierowcy — jedna kolumna zamiast dwóch, bo pytanie
 * brzmi inaczej niż u pozostałych ról: nie „co widzę", tylko „czy szef
 * widzi mnie". Odpowiedź stoi na końcu, wytłuszczona.
 */
export function CoWidzisz() {
  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="flex flex-col gap-10 lg:gap-14">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Co widzisz w aplikacji.
          </h2>

          <div data-reveal-group className="flex flex-col">
            {rzeczy.map((r, i) => (
              <span
                key={r}
                data-reveal
                className={`py-3 text-[22px] leading-snug font-semibold tracking-[-0.01em] lg:py-3.5 lg:text-h3 ${
                  i < rzeczy.length - 1 ? 'border-b border-line-dark' : ''
                }`}
              >
                {r}
              </span>
            ))}
          </div>

          <p data-reveal className="text-lead-m font-semibold text-balance lg:text-lead">
            Nic o innych kierowcach i nic o pieniądzach firmy.
          </p>
        </div>

        <div data-reveal className="flex flex-col gap-5 lg:mt-2 lg:gap-6">
          <Eyebrow dark>Aplikacja</Eyebrow>
          <StoreBadges />
        </div>
      </div>
    </Section>
  );
}
