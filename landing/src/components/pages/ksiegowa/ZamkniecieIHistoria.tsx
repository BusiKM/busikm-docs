import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Teksty = {
  zamkniecie: {
    tytul: string;
    tresc: string;
    zamkniety: [string, string];
    otwarty: [string, string];
    przycisk: string;
  };
  historia: { tytul: string; tresc: string; pliki: readonly string[]; pobierz: string };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    zamkniecie: {
      tytul: 'Zamknięcie miesiąca',
      tresc: 'Po zamknięciu nikt nie zmienia danych wstecz.',
      zamkniety: ['Lipiec 2026', 'zamknięty · 4.08, Ewa M.'],
      otwarty: ['Sierpień 2026', 'otwarty'],
      przycisk: 'Zamknij sierpień',
    },
    historia: {
      tytul: 'Historia pobrań',
      tresc: 'Każdy plik można pobrać ponownie.',
      pliki: [
        'komplet-2026-08.optima',
        'komplet-2026-07.optima',
        'diety-2026-07.xlsx',
        'komplet-2026-06.optima',
      ],
      pobierz: 'pobierz ↓',
    },
  },
  en: {
    zamkniecie: {
      tytul: 'Month-end close',
      tresc: 'Once a month is closed, nobody changes the data after the fact.',
      zamkniety: ['July 2026', 'closed · 4 Aug, Ewa M.'],
      otwarty: ['August 2026', 'open'],
      przycisk: 'Close August',
    },
    historia: {
      tytul: 'Download history',
      tresc: 'Every file can be downloaded again.',
      pliki: [
        'full-set-2026-08.optima',
        'full-set-2026-07.optima',
        'per-diems-2026-07.xlsx',
        'full-set-2026-06.optima',
      ],
      pobierz: 'download ↓',
    },
  },
};

/** 05 i 06 — dwie karty na ciemnym. */
export function ZamkniecieIHistoria() {
  const { zamkniecie, historia } = TEKSTY[biezacyJezyk()];
  const { pliki } = historia;
  return (
    <Section tone="ink">
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          tone="surface"
          numer="05"
          tytul={zamkniecie.tytul}
          tresc={zamkniecie.tresc}
        >
          <div className="flex flex-col gap-3 rounded-card border border-line-dark bg-ink p-6 text-caption">
            <div className="flex justify-between gap-3 border-b border-line-dark py-2.5">
              <span>{zamkniecie.zamkniety[0]}</span>
              <span className="flex-none text-ink-muted">{zamkniecie.zamkniety[1]}</span>
            </div>
            <div className="flex justify-between gap-3 border-b border-line-dark py-2.5">
              <span>{zamkniecie.otwarty[0]}</span>
              <span className="flex-none text-green">{zamkniecie.otwarty[1]}</span>
            </div>
            <div className="rounded-xl border border-line-dark-2 p-3 text-center font-semibold">
              {zamkniecie.przycisk}
            </div>
          </div>
        </KartaBloku>

        <KartaBloku
          tone="surface"
          numer="06"
          tytul={historia.tytul}
          tresc={historia.tresc}
        >
          <div className="flex flex-col rounded-card border border-line-dark bg-ink p-6 text-caption">
            {pliki.map((plik, i) => (
              <div
                key={plik}
                className={`flex justify-between gap-3 py-2.5 ${
                  i < pliki.length - 1 ? 'border-b border-line-dark' : ''
                }`}
              >
                <span className="truncate">{plik}</span>
                <span className="flex-none text-blue-light">{historia.pobierz}</span>
              </div>
            ))}
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
