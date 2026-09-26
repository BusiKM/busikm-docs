import { Chrome } from '@/components/mockups/Chrome';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Kolumna = {
  grupa: string;
  ile: string;
  pozycje: readonly { co: string; kto: string; kiedy: string; pilne?: boolean }[];
  reszta: string;
};

type Teksty = {
  chrome: string;
  miesiac: string;
  tytul: string;
  podsumowanie: string;
  kolumny: readonly Kolumna[];
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    chrome: 'app.busikm.pl · Dokumenty · status na wrzesień',
    miesiac: 'Wrzesień 2026',
    tytul: 'Jedna rzecz wymaga uwagi w tym miesiącu.',
    podsumowanie: '17 dokumentów · 16 w porządku',
    kolumny: [
      {
        grupa: 'Pojazdy',
        ile: '7',
        pozycje: [
          { co: 'Ubezpieczenie OC', kto: 'PO 2093J', kiedy: '9 dni', pilne: true },
          { co: 'Przegląd techniczny', kto: 'WZ 4821K', kiedy: '88 dni' },
        ],
        reszta: 'pozostałe 12 · w porządku',
      },
      {
        grupa: 'Firma',
        ile: '3',
        pozycje: [{ co: 'Licencja wspólnotowa', kto: 'Firma', kiedy: '214 dni' }],
        reszta: 'pozostałe 2 · w porządku',
      },
      {
        grupa: 'Kierowcy',
        ile: '9',
        pozycje: [{ co: 'Badania lekarskie', kto: 'Tomasz L.', kiedy: '41 dni' }],
        reszta: 'pozostałe 26 · w porządku',
      },
    ],
  },
  en: {
    chrome: 'app.busikm.pl · Documents · status for September',
    miesiac: 'September 2026',
    tytul: 'One thing needs your attention this month.',
    podsumowanie: '17 documents · 16 all fine',
    kolumny: [
      {
        grupa: 'Vehicles',
        ile: '7',
        pozycje: [
          { co: 'Third-party liability insurance', kto: 'PO 2093J', kiedy: '9 days', pilne: true },
          { co: 'Roadworthiness test', kto: 'WZ 4821K', kiedy: '88 days' },
        ],
        reszta: 'other 12 · all fine',
      },
      {
        grupa: 'Company',
        ile: '3',
        pozycje: [{ co: 'Community licence', kto: 'Company', kiedy: '214 days' }],
        reszta: 'other 2 · all fine',
      },
      {
        grupa: 'Drivers',
        ile: '9',
        pozycje: [{ co: 'Medical check', kto: 'Tomasz L.', kiedy: '41 days' }],
        reszta: 'other 26 · all fine',
      },
    ],
  },
};

/** Status miesiąca: tylko to, co wymaga uwagi. Reszta jako liczba. */
export function StatusMiesiaca() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label={t.chrome} />

      <div className="flex flex-1 flex-col gap-6 p-5 text-[13px] lg:gap-7 lg:p-10 lg:text-caption">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
          <div>
            <div className="text-[12px] text-muted lg:text-[13px]">{t.miesiac}</div>
            <b className="text-[18px] tracking-[-0.01em] text-balance lg:text-[24px]">
              {t.tytul}
            </b>
          </div>
          <span className="text-muted">{t.podsumowanie}</span>
        </div>

        {/* Karty mają wysokość treści i stoją w pionowym środku kadru. Rozciągnięte
            na całą wysokość zostawiały w środku po 280 px pustki — a to, że dwie
            kolumny mają po jednej pozycji, jest tu sensem, nie usterką. */}
        <div className="flex flex-1 items-center">
          <div className="grid w-full gap-2.5 lg:grid-cols-3 lg:gap-4">
          {t.kolumny.map((k) => (
            <div
              key={k.grupa}
              className="flex flex-col gap-3 rounded-card border border-line p-4 lg:p-6"
            >
              <div className="flex justify-between gap-3">
                <span className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase lg:text-caption">
                  {k.grupa}
                </span>
                <span className="text-muted">{k.ile}</span>
              </div>

              {k.pozycje.map((p) => (
                <div
                  key={p.co}
                  className={`flex items-center justify-between gap-3 rounded-[14px] p-3.5 ${
                    p.pilne ? 'border border-amber/35 bg-[#FFF4E5]' : 'bg-mist'
                  }`}
                >
                  <div className="min-w-0">
                    <b className="block truncate">{p.co}</b>
                    <div className="truncate text-muted">{p.kto}</div>
                  </div>
                  <span className={`flex-none ${p.pilne ? 'font-bold text-amber-ink' : ''}`}>
                    {p.kiedy}
                  </span>
                </div>
              ))}

              <div className="border-t border-line pt-3 text-[12px] text-muted lg:text-[13px]">
                {k.reszta}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
