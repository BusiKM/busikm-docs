import { Section } from '@/components/ui/Section';

const items = [
  ['Dzwonisz do kierowcy: „gdzie jesteś?”', 'Widzisz go na mapie'],
  ['Wieczorem przepisujesz do Excela', 'Liczy się samo, w trakcie'],
  ['Zbierasz paragony z reklamówki', 'Kierowca robi zdjęcie w trasie'],
  ['Odpisujesz księgowej, czego brakuje', 'Dostaje komplet jednym przyciskiem'],
] as const;

/** 6.2 — co znika z dnia. Zdanie przekreślone i zdanie po nim. */
export function CzteryRzeczy() {
  return (
    <Section tone="mist">
      <div className="flex flex-col gap-12 lg:gap-20">
        <h2
          data-reveal
          className="max-w-[720px] text-h2-m font-semibold text-balance lg:text-h2"
        >
          Cztery rzeczy, których nie będziesz już robił.
        </h2>

        <div data-reveal-group className="grid gap-7 lg:grid-cols-4 lg:gap-10">
          {items.map(([before, after]) => (
            <div
              key={after}
              data-reveal
              className="flex flex-col gap-2 border-t border-line pt-5 lg:gap-3.5 lg:pt-6"
            >
              <div className="text-[16px] leading-relaxed text-muted line-through lg:text-body">
                {before}
              </div>
              <div className="text-[22px] leading-tight font-semibold tracking-[-0.01em]">
                {after}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
