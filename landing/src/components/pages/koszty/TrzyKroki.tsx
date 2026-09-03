import { Section } from '@/components/ui/Section';

const punkty = [
  ['01', 'Zdjęcie zamiast wpisywania', 'Pstryka paragon, formularz wypełnia się sam. Poprawia tylko wtedy, gdy coś się nie zgadza.'],
  ['02', 'Trafia tam, gdzie trzeba', 'Do tego zlecenia, tego pojazdu, tego kierowcy. Bez segregowania wieczorem przy stole.'],
] as const;

const pola = [
  ['Kwota', '151,50 €'],
  ['Sprzedawca', 'Shell'],
  ['Rodzaj', 'Paliwo'],
] as const;

/** 01 + 02 — droga paragonu w trzech kadrach: pstryk, formularz, Twój ekran. */
export function TrzyKroki() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {punkty.map(([numer, tytul, tresc]) => (
            <div key={numer} className="flex flex-col gap-4 lg:gap-6">
              <div
                data-reveal
                className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
              >
                {numer}
              </div>
              <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
                {tytul}
              </h2>
              <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
                {tresc}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          <div
            data-reveal
            className="flex min-h-45 flex-col gap-5 rounded-card border border-line-dark bg-surface p-6 lg:min-h-55 lg:p-8"
          >
            <div className="text-[13px] text-ink-muted">11:38 · stacja Shell, Rotterdam</div>
            <div
              aria-hidden
              className="h-21 w-16 rotate-[-4deg] rounded-[4px] bg-mist"
            />
            <div className="mt-auto text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              Pstryk.
            </div>
          </div>

          <div
            data-reveal
            className="flex min-h-45 flex-col gap-5 rounded-card border border-line-dark bg-surface p-6 lg:min-h-55 lg:p-8"
          >
            <div className="text-[13px] text-ink-muted">11:38 · formularz</div>
            <div className="flex flex-col gap-1.5 text-[13px]">
              {pola.map(([label, value]) => (
                <div
                  key={label}
                  className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2"
                >
                  <span className="text-ink-muted">{label}</span>
                  <b>{value}</b>
                </div>
              ))}
            </div>
            <div className="mt-auto text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              Wypełnia się samo.
            </div>
          </div>

          <div
            data-reveal
            className="flex min-h-45 flex-col gap-5 rounded-card bg-blue p-6 text-white lg:min-h-55 lg:p-8"
          >
            <div className="text-[13px] text-white">11:39 · u Ciebie</div>
            <div className="flex flex-col gap-1.5 text-[14px]">
              <span>Zlecenie · Poznań → Rotterdam</span>
              <span>Pojazd · PO 2093J</span>
              <span>Kierowca · Tomasz L.</span>
            </div>
            <div className="mt-auto text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              Już tam, gdzie trzeba.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
