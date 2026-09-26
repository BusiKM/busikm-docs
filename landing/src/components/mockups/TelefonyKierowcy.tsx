import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  potem: string;
  dojazd: string;
  trasa: string;
  wTrasie: string;
  rozladunek: string;
  nawiguj: string;
  koszt: string;
  dodajKoszt: string;
  razem: string;
  pola: readonly (readonly [string, string, string])[];
  zlecenie: string;
  zapisz: string;
}> = {
  pl: {
    potem: 'Brenner, potem A22',
    dojazd: 'dojazd',
    trasa: 'Warszawa → Mediolan',
    wTrasie: 'w trasie',
    rozladunek: 'Rozładunek: Via Tortona 12 · 08:00',
    nawiguj: 'Nawiguj',
    koszt: 'Koszt',
    dodajKoszt: 'Dodaj koszt',
    razem: 'RAZEM',
    pola: [
      ['Kwota', '103,30 €', '103,30 € · 442 zł'],
      ['Rodzaj', 'Paliwo', 'Paliwo'],
      ['Pojazd', 'WZ 4821K', 'WZ 4821K'],
    ],
    zlecenie: 'Zlecenie',
    zapisz: 'Zapisz',
  },
  en: {
    potem: 'Brenner, then A22',
    dojazd: 'arrival',
    trasa: 'Warsaw → Milan',
    wTrasie: 'en route',
    rozladunek: 'Unloading: Via Tortona 12 · 08:00',
    nawiguj: 'Navigate',
    koszt: 'Cost',
    dodajKoszt: 'Add cost',
    razem: 'TOTAL',
    pola: [
      ['Amount', '€103.30', '€103.30 · PLN 442'],
      ['Type', 'Fuel', 'Fuel'],
      ['Vehicle', 'WZ 4821K', 'WZ 4821K'],
    ],
    zlecenie: 'Order',
    zapisz: 'Save',
  },
};

/** Dwa telefony pod kątem, w trybie nocnym — nawigacja i dodawanie kosztu. */
export function TelefonyKierowcy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="relative h-[440px] lg:flex lg:h-[720px] lg:items-center lg:justify-center">
      <div
        aria-hidden
        className="absolute bottom-0 left-[20%] right-[20%] h-25 bg-blue opacity-40 blur-[60px] lg:bottom-5 lg:left-[15%] lg:right-[15%] lg:h-35 lg:blur-[90px]"
      />

      {/* lewy — nawigacja */}
      <div className="absolute top-[30px] left-0 h-[390px] w-45 rotate-[-8deg] rounded-[30px] border border-[#2A2A30] bg-black p-[7px] shadow-[0_30px_60px_rgba(0,0,0,.6)] lg:top-15 lg:left-10 lg:h-[585px] lg:w-[270px] lg:rounded-[44px] lg:p-2.5 lg:shadow-[0_40px_80px_rgba(0,0,0,.6)]">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-surface text-[10px] lg:rounded-[36px] lg:text-[12px]">
          <div className="flex justify-between px-3 pt-3.5 text-ink-muted lg:px-4.5 lg:pt-5.5">
            <span>03:12</span>
            <span>WZ 4821K</span>
          </div>

          <div className="relative m-2.5 flex-1 overflow-hidden rounded-xl bg-surface-3 lg:mx-3.5 lg:mt-4.5 lg:mb-0 lg:rounded-[18px]">
            <svg viewBox="0 0 220 320" preserveAspectRatio="none" className="size-full" aria-hidden>
              <path
                d="M 60 300 C 100 240, 90 190, 120 140 S 170 60, 180 20"
                fill="none"
                stroke="#0B5FFF"
                strokeWidth="5"
              />
              <circle cx="112" cy="150" r="8" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
            </svg>
            <div className="absolute top-3.5 right-3.5 left-3.5 hidden justify-between rounded-xl bg-surface-2 p-3 lg:flex">
              <div>
                <div className="text-[18px] font-semibold">A1 · 214 km</div>
                <div className="text-ink-muted">{t.potem}</div>
              </div>
              <div className="text-right">
                <div className="text-[18px] font-semibold">08:00</div>
                <div className="text-ink-muted">{t.dojazd}</div>
              </div>
            </div>
          </div>

          <div className="mx-2.5 mb-2.5 rounded-xl bg-surface-2 p-2.5 lg:m-3.5 lg:rounded-[18px] lg:p-4">
            <div className="flex justify-between gap-2">
              <b className="lg:text-[14px]">{t.trasa}</b>
              <span className="hidden text-green lg:inline">{t.wTrasie}</span>
            </div>
            <div className="mt-1 hidden text-ink-muted lg:block">
              {t.rozladunek}
            </div>
            <div className="mt-1.5 flex gap-2 lg:mt-3">
              <span className="flex-1 rounded-lg bg-blue py-1.5 text-center font-semibold text-white lg:rounded-[10px] lg:py-2.5">
                {t.nawiguj}
              </span>
              <span className="hidden flex-1 rounded-[10px] border border-line-dark-2 py-2.5 text-center lg:block">
                {t.koszt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* prawy — dodawanie kosztu */}
      <div className="absolute top-0 right-0 z-2 h-[390px] w-45 rotate-[5deg] rounded-[30px] border border-[#2A2A30] bg-black p-[7px] shadow-[0_40px_70px_rgba(0,0,0,.7)] lg:top-5 lg:right-5 lg:h-[585px] lg:w-[270px] lg:rounded-[44px] lg:p-2.5 lg:shadow-[0_50px_100px_rgba(0,0,0,.7)]">
        <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-surface text-[10px] lg:rounded-[36px] lg:text-[12px]">
          <div className="flex justify-between px-3 pt-3.5 text-ink-muted lg:px-4.5 lg:pt-5.5">
            <span>03:14</span>
            <span>{t.dodajKoszt}</span>
          </div>

          <div className="mx-2.5 mt-1.5 flex h-[110px] items-center justify-center rounded-xl bg-[#1E1E22] lg:mx-3.5 lg:mt-4.5 lg:h-[190px] lg:rounded-[18px]">
            <div className="flex h-22 w-17.5 flex-col gap-1.5 rounded-[4px] bg-mist p-3 font-mono text-[8px] text-ink lg:h-[150px] lg:w-30">
              <div className="hidden text-center font-bold lg:block">OMV Brno</div>
              <div className="hidden justify-between lg:flex">
                <span>Diesel 78,4 l</span>
                <span>96,20 €</span>
              </div>
              <div className="hidden justify-between border-t border-line-strong pt-1 font-bold lg:flex">
                <span>{t.razem}</span>
                <span>103,30 €</span>
              </div>
            </div>
          </div>

          <div className="m-2.5 flex flex-col gap-1.5 lg:m-3.5 lg:gap-2">
            {t.pola.map(([label, short, full]) => (
              <div
                key={label}
                className="flex justify-between gap-2 rounded-lg bg-surface-2 p-2 lg:rounded-xl lg:px-3.5 lg:py-3"
              >
                <span className="text-ink-muted">{label}</span>
                <b className="truncate">
                  <span className="lg:hidden">{short}</span>
                  <span className="hidden lg:inline">{full}</span>
                </b>
              </div>
            ))}
            <div className="hidden justify-between gap-2 rounded-xl bg-surface-2 px-3.5 py-3 lg:flex">
              <span className="text-ink-muted">{t.zlecenie}</span>
              <b>{t.trasa}</b>
            </div>
          </div>

          <div className="mx-2.5 mt-auto mb-2.5 rounded-[10px] bg-blue py-2.5 text-center text-[12px] font-semibold text-white lg:mx-3.5 lg:mb-3.5 lg:rounded-[14px] lg:py-4 lg:text-[15px]">
            {t.zapisz}
          </div>
        </div>
      </div>
    </div>
  );
}
