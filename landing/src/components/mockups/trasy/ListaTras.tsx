import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Przejazd = {
  data: string;
  trasa: string;
  skrot: string;
  kto: string;
  km: string;
  czas: string;
  tylkoDesktop?: boolean;
};

const TEKSTY: Tlumaczenia<{
  przejazdy: Przejazd[];
  naglowek: string;
  licznikKrotki: string;
  licznik: string;
  filtry: readonly string[];
  kolumny: readonly [string, string, string, string];
  postoje: string;
  postojeKrotko: string;
  eksport: string;
}> = {
  pl: {
    przejazdy: [
      { data: '2.09', trasa: 'Warszawa → Mediolan', skrot: 'WAW → MIL', kto: 'Marek W. · WZ 4821K', km: '1 640', czas: '19:40' },
      { data: '1.09', trasa: 'Poznań → Rotterdam', skrot: 'POZ → RTM', kto: 'Tomasz L. · PO 2093J', km: '1 120', czas: '13:15' },
      { data: '1.09', trasa: 'Gdańsk → Hamburg', skrot: 'GDA → HAM', kto: 'Piotr K. · GD 7710R', km: '680', czas: '8:05' },
      { data: '31.08', trasa: 'Mediolan → serwis Bergamo', skrot: 'MIL → serwis', kto: 'Marek W. · WZ 4821K', km: '48', czas: '0:55' },
      { data: '30.08', trasa: 'Kraków → Wiedeń', skrot: 'KRK → VIE', kto: 'Anna R. · KR 5512M', km: '420', czas: '5:30', tylkoDesktop: true },
    ],
    naglowek: 'Trasy · wrzesień',
    licznikKrotki: '38 · 21 460 km',
    licznik: '38 przejazdów · 21 460 km',
    filtry: ['1–30 września ▾', 'Kierowca: wszyscy ▾', 'Pojazd: wszystkie ▾'],
    kolumny: ['Data', 'Trasa · kierowca', 'km', 'Czas'],
    postoje: 'Postoje dłuższe niż 15 min zaznaczone na trasie',
    postojeKrotko: 'Postoje zaznaczone',
    eksport: 'eksport do arkusza',
  },
  en: {
    przejazdy: [
      { data: '2 Sep', trasa: 'Warsaw → Milan', skrot: 'WAW → MIL', kto: 'Marek W. · WZ 4821K', km: '1,640', czas: '19:40' },
      { data: '1 Sep', trasa: 'Poznań → Rotterdam', skrot: 'POZ → RTM', kto: 'Tomasz L. · PO 2093J', km: '1,120', czas: '13:15' },
      { data: '1 Sep', trasa: 'Gdańsk → Hamburg', skrot: 'GDA → HAM', kto: 'Piotr K. · GD 7710R', km: '680', czas: '8:05' },
      { data: '31 Aug', trasa: 'Milan → garage, Bergamo', skrot: 'MIL → garage', kto: 'Marek W. · WZ 4821K', km: '48', czas: '0:55' },
      { data: '30 Aug', trasa: 'Kraków → Vienna', skrot: 'KRK → VIE', kto: 'Anna R. · KR 5512M', km: '420', czas: '5:30', tylkoDesktop: true },
    ],
    naglowek: 'Routes · September',
    licznikKrotki: '38 · 21,460 km',
    licznik: '38 runs · 21,460 km',
    filtry: ['1–30 September ▾', 'Driver: all ▾', 'Vehicle: all ▾'],
    kolumny: ['Date', 'Route · driver', 'km', 'Time'],
    postoje: 'Stops longer than 15 min marked on the route',
    postojeKrotko: 'Stops marked',
    eksport: 'export to spreadsheet',
  },
};

/**
 * Kolumny: data, trasa, km, czas. Kierowca i pojazd idą pod trasę — osobną
 * kolumną w karcie 4:3 na pół szerokości ucinały się do „Marek W. · WZ 4…".
 */
const kolumny = 'grid grid-cols-[44px_1fr_52px_52px] gap-2.5 lg:grid-cols-[60px_1fr_64px_60px]';

/** Historia przejazdów z filtrami — także tych bez zlecenia. */
export function ListaTras() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line-dark bg-surface text-paper p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">{t.naglowek}</b>
        <span className="flex-none text-ink-muted">
          <span className="lg:hidden">{t.licznikKrotki}</span>
          <span className="hidden lg:inline">{t.licznik}</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {t.filtry.map((f, i) => (
          <span
            key={f}
            className={`rounded-full border border-line-dark bg-surface-2 px-3 py-1.5 ${
              i > 0 ? 'hidden lg:inline' : ''
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      <div className={`${kolumny} border-b border-line-dark py-2.5 text-ink-muted`}>
        <span>{t.kolumny[0]}</span>
        <span>{t.kolumny[1]}</span>
        <span className="text-right">{t.kolumny[2]}</span>
        <span className="text-right">{t.kolumny[3]}</span>
      </div>

      {t.przejazdy.map((p) => (
        <div
          key={p.trasa}
          className={`${kolumny} items-center border-b border-line-dark py-2 lg:py-2.5 ${
            p.tylkoDesktop ? 'hidden lg:grid' : ''
          }`}
        >
          <span className="text-ink-muted">{p.data}</span>
          <div className="min-w-0">
            <b className="block truncate">
              <span className="lg:hidden">{p.skrot}</span>
              <span className="hidden lg:inline">{p.trasa}</span>
            </b>
            <span className="block truncate text-[11px] text-ink-muted lg:text-[12px]">
              {p.kto}
            </span>
          </div>
          <span className="text-right">{p.km}</span>
          <span className="text-right">{p.czas}</span>
        </div>
      ))}

      <div className="mt-auto flex justify-between gap-4 pt-1 text-ink-muted">
        <span className="hidden lg:block">{t.postoje}</span>
        <span className="lg:hidden">{t.postojeKrotko}</span>
        <span className="flex-none">{t.eksport}</span>
      </div>
    </div>
  );
}
