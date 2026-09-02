import { Section, Eyebrow } from '@/components/ui/Section';

const grupy = [
  {
    grupa: 'Pojazdy',
    ile: '7 pojazdów',
    wiersze: [
      ['Ubezpieczenie OC/AC', '7'],
      ['Przegląd techniczny', '7'],
      ['Winieta, tachograf', '14'],
    ],
  },
  {
    grupa: 'Firma',
    ile: 'Trans-Bus Kowalski',
    wiersze: [
      ['Licencja wspólnotowa', '1'],
      ['Ubezpieczenie przewoźnika', '1'],
      ['Zabezpieczenie finansowe', '1'],
    ],
  },
  {
    grupa: 'Kierowcy',
    ile: '9 kierowców',
    wiersze: [
      ['Prawo jazdy', '9'],
      ['Badania lekarskie i psychologiczne', '18'],
      ['Uprawnienia', '9'],
    ],
  },
] as const;

/** 01 — trzy szuflady, które stały się jedną listą. */
export function WJednymMiejscu() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Wszystko w jednym miejscu
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            Pojazdy, firma, kierowcy. Jedna lista zamiast trzech szuflad i jednego segregatora.
          </p>
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          {grupy.map((g) => (
            <div
              key={g.grupa}
              data-reveal
              className="flex flex-col gap-4 rounded-card border border-line-dark bg-surface p-6 text-[13px] lg:gap-4.5 lg:p-8 lg:text-caption"
            >
              <Eyebrow dark>{g.grupa}</Eyebrow>
              <div className="text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
                {g.ile}
              </div>
              <div className="flex flex-col border-t border-line-dark">
                {g.wiersze.map(([co, ile], i) => (
                  <div
                    key={co}
                    className={`flex justify-between gap-3 py-2.5 ${
                      i < g.wiersze.length - 1 ? 'border-b border-line-dark' : ''
                    }`}
                  >
                    <span>{co}</span>
                    <span className="flex-none text-ink-muted">{ile}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
