import { Section } from '@/components/ui/Section';

const raporty = [
  { tytul: 'Per pojazd', wiersze: [['WZ 4821K', '34%'], ['PO 2093J', '29%'], ['GD 7710R', '27%']] },
  { tytul: 'Per kierowca', wiersze: [['Marek W.', '35%'], ['Piotr K.', '31%'], ['Tomasz L.', '26%']] },
  { tytul: 'Per kraj', wiersze: [['Niemcy', '33%'], ['Włochy', '36%'], ['Czechy', '19%']] },
] as const;

/** 06 — ta sama marża pokrojona na trzy sposoby. */
export function Raporty() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              06
            </div>
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              Raporty
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Per pojazd, per kierowca, per kraj.
          </p>
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          {raporty.map((r) => (
            <div
              key={r.tytul}
              data-reveal
              className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[15px] lg:p-7 lg:text-caption"
            >
              <div className="text-[17px] font-semibold">{r.tytul}</div>
              <div className="flex flex-col">
                {r.wiersze.map(([co, marza]) => (
                  <div
                    key={co}
                    className="flex justify-between gap-3 border-t border-line py-2"
                  >
                    <span>{co}</span>
                    <b>{marza}</b>
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
