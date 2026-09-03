import { Section } from '@/components/ui/Section';

const steps = [
  ['01', 'Kierowca rusza', 'Włącza trasę w telefonie. Robi zdjęcie licznika. Tyle.'],
  [
    '02',
    'Dane same lecą',
    'Trasa, kilometry, czas pracy, paragony. Wszystko ląduje u Ciebie — nawet wtedy, gdy kierowca nie ma zasięgu.',
  ],
  [
    '03',
    'Miesiąc się zamyka',
    'Faktury dla klientów, koszty, przebieg i komplet dla księgowej. Jednym przyciskiem.',
  ],
] as const;

/** 6.4 — trzy ruchy. */
export function TrzyRuchy() {
  return (
    <Section spacing="py-24 lg:py-40">
      <div className="flex flex-col gap-12 lg:gap-24">
        <h2
          data-reveal
          className="max-w-[900px] text-h2-m font-bold text-balance lg:text-h1"
        >
          Trzy ruchy. Reszta dzieje się bez Ciebie.
        </h2>

        <div data-reveal-group className="grid gap-9 lg:grid-cols-3 lg:gap-12">
          {steps.map(([n, title, body]) => (
            <div key={n} data-reveal className="flex flex-col gap-2.5 lg:gap-5">
              <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
                {n}
              </div>
              <div className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">{title}</div>
              <div className="text-[16px] leading-relaxed text-muted lg:text-body">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
