import { Section, Eyebrow } from '@/components/ui/Section';

const paid = [
  'lokalizator w busie',
  'program do rozliczania czasu pracy',
  'system do zleceń i faktur',
  'arkusz, który prowadzisz sam',
];

/** 6.17 — co to zastępuje. Bez nazw konkurencji i bez cudzych cen. */
export function JednaFaktura() {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-20">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Jedna faktura zamiast czterech.
        </h2>

        <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
          <div
            data-reveal
            className="flex flex-col gap-3 rounded-card border border-line p-6 lg:gap-5 lg:p-10"
          >
            <Eyebrow>Dziś płacisz osobno za:</Eyebrow>
            <div className="flex flex-col text-[16px] leading-relaxed lg:text-body">
              {paid.map((item, i) => (
                <div
                  key={item}
                  className={`py-2.5 lg:py-3.5 ${i < paid.length - 1 ? 'border-b border-line' : ''}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div
            data-reveal
            className="flex flex-col justify-between gap-4 rounded-card bg-ink p-6 text-paper lg:gap-5 lg:p-10"
          >
            <Eyebrow dark>Z BusiKM:</Eyebrow>
            <div className="text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
              Jedno konto. Jeden rachunek. Wszystko rozmawia ze sobą.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
