import { Section } from '@/components/ui/Section';

const steps = [
  ['Dodajesz pojazd', '2 minuty', 'Numer rejestracyjny i tyle.'],
  ['Zapraszasz kierowcę', '1 minuta', 'Dostaje kod. Wpisuje go w aplikacji i już jest w środku.'],
  ['Kierowca rusza', 'od razu', 'Pierwsza trasa pojawia się u Ciebie tego samego dnia.'],
] as const;

/** 6.16 — pierwszy dzień. */
export function PierwszyDzien() {
  return (
    <Section tone="mist">
      <div className="flex flex-col gap-8 lg:gap-20">
        <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
          Pierwsza trasa jeszcze dziś.
        </h2>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-6">
          {steps.map(([title, time, body]) => (
            <div
              key={title}
              data-reveal
              className="flex flex-col gap-2 rounded-card border border-line bg-white p-5 lg:gap-4 lg:p-8"
            >
              <div className="flex items-baseline justify-between gap-3">
                <div className="text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">
                  {title}
                </div>
                <span className="flex-none text-[13px] font-semibold text-blue lg:text-caption">
                  {time}
                </span>
              </div>
              <div className="text-[15px] leading-relaxed text-muted lg:text-body">{body}</div>
            </div>
          ))}
        </div>

        <p data-reveal className="text-[13px] leading-relaxed text-muted lg:text-caption">
          Nie ma wdrożenia, szkolenia ani spotkania z handlowcem.
        </p>
      </div>
    </Section>
  );
}
