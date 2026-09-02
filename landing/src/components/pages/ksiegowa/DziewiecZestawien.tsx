import { Section } from '@/components/ui/Section';

const zestawienia = [
  ['Sprzedaż', '42'],
  ['Zakupy', '37'],
  ['Koszty', '318'],
  ['Przebieg', '7 pojazdów'],
  ['Delegacje', '9 kierowców'],
  ['Czas pracy', '9 kierowców'],
  ['Kursy walut', '22 dni'],
  ['Opłaty drogowe', '61'],
  ['Korekty', '2'],
] as const;

/** 03 — dziewięć zestawień jako siatka kafelków z licznikami. */
export function DziewiecZestawien() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              03
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Dziewięć zestawień
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            Sprzedaż, zakupy, koszty, przebieg, delegacje, czas pracy, kursy walut
            i pozostałe.
          </p>
        </div>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {zestawienia.map(([nazwa, licznik]) => (
            <div
              key={nazwa}
              data-reveal
              className="flex min-h-25 items-end justify-between gap-2 rounded-card border border-line-dark bg-surface p-4.5 lg:min-h-30 lg:p-7"
            >
              <span className="text-[15px] font-semibold lg:text-body">{nazwa}</span>
              <span className="flex-none text-[12px] text-ink-muted lg:text-[13px]">
                {licznik}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
