import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Raport = { tytul: string; wiersze: readonly (readonly [string, string])[] };

const TEKSTY: Tlumaczenia<{ tytul: string; tresc: string; raporty: readonly Raport[] }> = {
  pl: {
    tytul: 'Raporty',
    tresc: 'Per pojazd, per kierowca, per kraj.',
    raporty: [
      { tytul: 'Per pojazd', wiersze: [['WZ 4821K', '34%'], ['PO 2093J', '29%'], ['GD 7710R', '27%']] },
      { tytul: 'Per kierowca', wiersze: [['Marek W.', '35%'], ['Piotr K.', '31%'], ['Tomasz L.', '26%']] },
      { tytul: 'Per kraj', wiersze: [['Niemcy', '33%'], ['Włochy', '36%'], ['Czechy', '19%']] },
    ],
  },
  en: {
    tytul: 'Reports',
    tresc: 'By vehicle, by driver, by country.',
    raporty: [
      { tytul: 'By vehicle', wiersze: [['WZ 4821K', '34%'], ['PO 2093J', '29%'], ['GD 7710R', '27%']] },
      { tytul: 'By driver', wiersze: [['Marek W.', '35%'], ['Piotr K.', '31%'], ['Tomasz L.', '26%']] },
      { tytul: 'By country', wiersze: [['Germany', '33%'], ['Italy', '36%'], ['Czechia', '19%']] },
    ],
  },
};

/** 06 — ta sama marża pokrojona na trzy sposoby. */
export function Raporty() {
  const t = TEKSTY[biezacyJezyk()];
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
              {t.tytul}
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-3 lg:gap-4">
          {t.raporty.map((r) => (
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
