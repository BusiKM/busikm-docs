import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Wiersz = { co: string; kto: string; pct: number; kolor: string; kiedy: string; pilne?: boolean };

type Teksty = {
  wydruk: {
    tytul: string;
    tresc: string;
    naglowek: string;
    pozycje: readonly (readonly [string, string])[];
    reszta: string;
    stopka: string;
  };
  kolor: {
    tytul: string;
    tresc: string;
    wiersze: readonly Wiersz[];
    legenda: readonly (readonly [string, string])[];
  };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    wydruk: {
      tytul: 'Wydruk listy',
      tresc: 'Dla siebie albo dla księgowej, na jedną stronę.',
      naglowek: 'Dokumenty · wrzesień 2026',
      pozycje: [
        ['Ubezpieczenie OC · PO 2093J', '12.10'],
        ['Badania lek. · Tomasz L.', '13.10'],
        ['Przegląd · WZ 4821K', '29.11'],
        ['Licencja wspólnotowa', '04.04.27'],
      ],
      reszta: '… 13 kolejnych',
      stopka: 'Wydrukowano 2.09.2026 · busikm.pl',
    },
    kolor: {
      tytul: 'Kolor ostrzegawczy tylko tutaj',
      tresc:
        'Pomarańczowy w całym serwisie jest zarezerwowany dla dokumentu, który zaraz wygaśnie. Jak go zobaczysz, od razu wiesz, o co chodzi.',
      wiersze: [
        { co: 'Ubezpieczenie OC', kto: 'PO 2093J', pct: 12, kolor: 'bg-amber', kiedy: '9 dni', pilne: true },
        { co: 'Badania lekarskie', kto: 'Tomasz L.', pct: 34, kolor: 'bg-blue', kiedy: '41 dni' },
        { co: 'Prawo jazdy', kto: 'Marek W.', pct: 92, kolor: 'bg-green', kiedy: '3 lata' },
      ],
      legenda: [
        ['bg-amber', 'zaraz wygaśnie'],
        ['bg-blue', 'w tym kwartale'],
        ['bg-green', 'w porządku'],
      ],
    },
  },
  en: {
    wydruk: {
      tytul: 'Printable list',
      tresc: 'For you or your accountant, on a single page.',
      naglowek: 'Documents · September 2026',
      pozycje: [
        ['Third-party liability insurance · PO 2093J', '12 Oct'],
        ['Medical check · Tomasz L.', '13 Oct'],
        ['Roadworthiness test · WZ 4821K', '29 Nov'],
        ['Community licence', '4 Apr 2027'],
      ],
      reszta: '… 13 more',
      stopka: 'Printed 2 Sep 2026 · busikm.pl',
    },
    kolor: {
      tytul: 'The warning colour lives here only',
      tresc:
        'Across the whole site, orange is reserved for a document that’s about to expire. When you see it, you know straight away what it means.',
      wiersze: [
        { co: 'Third-party liability insurance', kto: 'PO 2093J', pct: 12, kolor: 'bg-amber', kiedy: '9 days', pilne: true },
        { co: 'Medical check', kto: 'Tomasz L.', pct: 34, kolor: 'bg-blue', kiedy: '41 days' },
        { co: 'Driving licence', kto: 'Marek W.', pct: 92, kolor: 'bg-green', kiedy: '3 years' },
      ],
      legenda: [
        ['bg-amber', 'about to expire'],
        ['bg-blue', 'this quarter'],
        ['bg-green', 'all fine'],
      ],
    },
  },
};

/** 05 + 06 — wydruk i jedyne miejsce w serwisie z kolorem ostrzegawczym. */
export function WydrukIKolor() {
  const { wydruk, kolor } = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          tone="surface"
          numer="05"
          tytul={wydruk.tytul}
          tresc={wydruk.tresc}
        >
          <div className="mx-auto flex w-full max-w-[300px] flex-col gap-2 rounded-xl bg-mist p-5 text-[12px] text-ink shadow-[0_20px_50px_rgba(0,0,0,.5)] lg:aspect-1/1.2 lg:p-6">
            <div className="flex justify-between gap-3 text-muted">
              <span>{wydruk.naglowek}</span>
              <span>1/1</span>
            </div>
            <b>Trans-Bus Kowalski</b>
            {wydruk.pozycje.map(([co, kiedy], i) => (
              <div
                key={co}
                className={`flex justify-between gap-3 border-t py-1.5 ${
                  i === 0 ? 'border-line-strong' : 'border-line'
                }`}
              >
                <span className="truncate">{co}</span>
                <span className="flex-none">{kiedy}</span>
              </div>
            ))}
            <div className="border-t border-line py-1.5 text-muted">{wydruk.reszta}</div>
            <div className="mt-auto text-muted">{wydruk.stopka}</div>
          </div>
        </KartaBloku>

        <KartaBloku
          tone="surface"
          numer="06"
          tytul={kolor.tytul}
          tresc={kolor.tresc}
        >
          <div className="flex flex-col gap-3 text-[13px] lg:text-caption">
            {kolor.wiersze.map((w) => (
              <div
                key={w.co}
                className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[14px] border border-line-dark bg-ink p-3.5 lg:grid-cols-[1fr_120px_64px] lg:px-4"
              >
                <div className="min-w-0">
                  <b className="block truncate">{w.co}</b>
                  <div className="truncate text-ink-muted">{w.kto}</div>
                </div>
                <div className="hidden h-1.5 overflow-hidden rounded-[3px] bg-line-dark lg:block">
                  <div className={`h-full ${w.kolor}`} style={{ width: `${w.pct}%` }} />
                </div>
                <span className={`text-right ${w.pilne ? 'font-bold text-amber' : ''}`}>
                  {w.kiedy}
                </span>
              </div>
            ))}

            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 text-[12px] text-ink-muted lg:text-[13px]">
              {kolor.legenda.map(([barwa, opis]) => (
                <span key={opis} className="flex items-center gap-2">
                  <span aria-hidden className={`size-2.5 rounded-[3px] ${barwa}`} />
                  {opis}
                </span>
              ))}
            </div>
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
