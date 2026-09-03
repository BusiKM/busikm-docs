import { Section } from '@/components/ui/Section';

const liczby = [
  { label: 'Przychód · wrzesień', value: '184 320 zł', mocna: false },
  { label: 'Koszty', value: '121 840 zł', mocna: false },
  { label: 'Zysk', value: '62 480 zł', mocna: true },
] as const;

/** 01 — trzy liczby, które właściciel widzi zaraz po zalogowaniu. */
export function ZyskNaPierwszymEkranie() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Zysk na pierwszym ekranie
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-muted lg:text-lead">
            Przychód, koszty i zysk, na bieżąco.
          </p>
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          {liczby.map((l) => (
            <div
              key={l.label}
              data-reveal
              className={`rounded-card p-6 lg:p-8 ${
                l.mocna
                  ? 'bg-ink text-paper shadow-card'
                  : 'border border-line bg-white shadow-card'
              }`}
            >
              <div className={`text-[13px] lg:text-caption ${l.mocna ? 'text-ink-muted' : 'text-muted'}`}>
                {l.label}
              </div>
              <div
                className={`mt-2.5 text-[34px] tracking-[-0.03em] lg:mt-3 lg:text-[48px] ${
                  l.mocna ? 'font-bold' : 'font-semibold'
                }`}
              >
                {l.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
