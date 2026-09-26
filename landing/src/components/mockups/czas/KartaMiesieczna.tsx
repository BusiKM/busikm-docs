import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Dzien = {
  dzien: string;
  trasa: string;
  skrot: string;
  jazda: string;
  praca: string;
  odp: string;
  kraje: string;
  wolne?: boolean;
  tylkoDesktop?: boolean;
};

const TEKSTY: Tlumaczenia<{
  dni: Dzien[];
  naglowek: string;
  kolumny: { dzien: string; trasa: string; jazda: string; praca: string; odp: string; kraje: string };
  dalej: string;
  razem: string;
  jazda: string;
  praca: string;
  zaGranica: string;
  pobierz: string;
}> = {
  pl: {
    dni: [
      { dzien: '1.08', trasa: 'Warszawa → Berlin', skrot: 'WAW → BER', jazda: '7:10', praca: '8:45', odp: '11:00', kraje: 'PL · DE' },
      { dzien: '2.08', trasa: 'Berlin → Rotterdam', skrot: 'BER → RTM', jazda: '6:40', praca: '8:10', odp: '11:30', kraje: 'DE · NL' },
      { dzien: '3.08', trasa: 'Rotterdam → Poznań', skrot: 'RTM → POZ', jazda: '8:50', praca: '9:30', odp: '9:00', kraje: 'NL · DE · PL' },
      { dzien: '4.08', trasa: 'odpoczynek tygodniowy', skrot: 'odpoczynek', jazda: '—', praca: '—', odp: '24:00', kraje: 'PL', wolne: true },
      { dzien: '5.08', trasa: 'Poznań → Wiedeń', skrot: 'POZ → VIE', jazda: '7:05', praca: '8:20', odp: '11:00', kraje: 'PL · CZ · AT', tylkoDesktop: true },
    ],
    naglowek: 'Karta czasu pracy · sierpień 2026',
    kolumny: { dzien: 'Dzień', trasa: 'Trasa', jazda: 'Jazda', praca: 'Praca', odp: 'Odp.', kraje: 'Kraje' },
    dalej: '26 dni dalej',
    razem: 'Razem:',
    jazda: 'jazda 148:20',
    praca: ' · praca 176:05',
    zaGranica: ' · 14 dni za granicą',
    pobierz: 'Pobierz PDF',
  },
  en: {
    dni: [
      { dzien: '1 Aug', trasa: 'Warsaw → Berlin', skrot: 'WAW → BER', jazda: '7:10', praca: '8:45', odp: '11:00', kraje: 'PL · DE' },
      { dzien: '2 Aug', trasa: 'Berlin → Rotterdam', skrot: 'BER → RTM', jazda: '6:40', praca: '8:10', odp: '11:30', kraje: 'DE · NL' },
      { dzien: '3 Aug', trasa: 'Rotterdam → Poznań', skrot: 'RTM → POZ', jazda: '8:50', praca: '9:30', odp: '9:00', kraje: 'NL · DE · PL' },
      { dzien: '4 Aug', trasa: 'weekly rest', skrot: 'rest', jazda: '—', praca: '—', odp: '24:00', kraje: 'PL', wolne: true },
      { dzien: '5 Aug', trasa: 'Poznań → Vienna', skrot: 'POZ → VIE', jazda: '7:05', praca: '8:20', odp: '11:00', kraje: 'PL · CZ · AT', tylkoDesktop: true },
    ],
    naglowek: 'Working time sheet · August 2026',
    kolumny: { dzien: 'Day', trasa: 'Route', jazda: 'Drive', praca: 'Work', odp: 'Rest', kraje: 'Countries' },
    dalej: '26 more days',
    razem: 'Total:',
    jazda: 'driving 148:20',
    praca: ' · work 176:05',
    zaGranica: ' · 14 days abroad',
    pobierz: 'Download PDF',
  },
};

/* Kolumny stałe policzone pod najdłuższą wartość, żeby na trasę zostało
   miejsce — przy 56 px na godzinę wychodziło „Rotterdam → Poz…". */
const kolumny =
  'grid grid-cols-[36px_1fr_42px_46px] gap-2 lg:grid-cols-[36px_1fr_44px_44px_48px_76px]';

/** Karta czasu pracy do wydruku — jasna, bo to wydruk, nie ekran. */
export function KartaMiesieczna() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-2 rounded-card bg-mist p-5 text-[11px] text-ink shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-7 lg:text-[12px]">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-muted">{t.naglowek}</div>
          <b className="text-[16px] lg:text-[18px]">Marek W.</b>
        </div>
        <div className="flex-none text-right text-muted">
          WZ 4821K
          <br />
          Trans-Bus Kowalski
        </div>
      </div>

      <div className={`${kolumny} border-y border-line-strong py-2 text-muted`}>
        <span>{t.kolumny.dzien}</span>
        <span>{t.kolumny.trasa}</span>
        <span className="hidden text-right lg:block">{t.kolumny.jazda}</span>
        <span className="text-right lg:hidden">{t.kolumny.jazda}</span>
        <span className="hidden text-right lg:block">{t.kolumny.praca}</span>
        <span className="text-right">{t.kolumny.odp}</span>
        <span className="hidden lg:block">{t.kolumny.kraje}</span>
      </div>

      {t.dni.map((d) => (
        <div
          key={d.dzien}
          className={`${kolumny} border-b border-line py-1.5 ${
            d.tylkoDesktop ? 'hidden lg:grid' : ''
          }`}
        >
          <span>{d.dzien}</span>
          <span className={`truncate ${d.wolne ? 'text-muted' : ''}`}>
            <span className="lg:hidden">{d.skrot}</span>
            <span className="hidden lg:inline">{d.trasa}</span>
          </span>
          <span className="text-right">{d.jazda}</span>
          <span className="hidden text-right lg:block">{d.praca}</span>
          <span className="text-right">{d.odp}</span>
          <span className="hidden truncate text-muted lg:block">{d.kraje}</span>
        </div>
      ))}

      <div className={`${kolumny} py-1.5 text-muted`}>
        <span>…</span>
        <span className="truncate">{t.dalej}</span>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line-strong pt-2.5">
        <span>
          <b>{t.razem}</b> {t.jazda}
          <span className="hidden lg:inline">{t.praca}</span>{t.zaGranica}
        </span>
        <span className="flex-none rounded-lg bg-ink px-3 py-2 font-semibold text-paper">
          {t.pobierz}
        </span>
      </div>
    </div>
  );
}
