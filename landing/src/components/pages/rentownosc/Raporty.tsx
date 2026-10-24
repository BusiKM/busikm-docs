import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Raport = { tytul: string; wiersze: readonly (readonly [string, string])[] };

const TEKSTY: Tlumaczenia<{ tytul: string; tresc: string; raporty: readonly Raport[] }> = {
  pl: {
    tytul: 'Raporty',
    tresc: 'Flota: koszt na kilometr i dni pracy każdego auta. Kierowcy: zysk z ich tras w złotych – to widzi tylko właściciel. Kierunki: marża według kraju rozładunku.',
    raporty: [
      { tytul: 'Flota', wiersze: [['WZ 4821K', '0,92 zł/km · 22 dni'], ['PO 2093J', '1,04 zł/km · 20 dni'], ['GD 7710R', '1,11 zł/km · 18 dni']] },
      { tytul: 'Kierowcy', wiersze: [['Marek W.', '18 400 zł'], ['Piotr K.', '15 900 zł'], ['Tomasz L.', '12 300 zł']] },
      { tytul: 'Kierunki', wiersze: [['Niemcy', '33%'], ['Włochy', '36%'], ['Czechy', '19%']] },
    ],
  },
  en: {
    tytul: 'Reports',
    tresc: 'Fleet: cost per kilometre and working days for each van. Drivers: profit from their routes in złoty – only the owner sees this. Destinations: margin by unloading country.',
    raporty: [
      { tytul: 'Fleet', wiersze: [['WZ 4821K', 'PLN 0.92/km · 22 days'], ['PO 2093J', 'PLN 1.04/km · 20 days'], ['GD 7710R', 'PLN 1.11/km · 18 days']] },
      { tytul: 'Drivers', wiersze: [['Marek W.', 'PLN 18,400'], ['Piotr K.', 'PLN 15,900'], ['Tomasz L.', 'PLN 12,300']] },
      { tytul: 'Destinations', wiersze: [['Germany', '33%'], ['Italy', '36%'], ['Czechia', '19%']] },
    ],
  },
};

/** 06 – trzy raporty: koszt auta, zysk kierowcy, marża kierunku. */
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
                {r.wiersze.map(([co, wartosc]) => (
                  <div
                    key={co}
                    className="flex justify-between gap-3 border-t border-line py-2"
                  >
                    <span>{co}</span>
                    <b>{wartosc}</b>
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
