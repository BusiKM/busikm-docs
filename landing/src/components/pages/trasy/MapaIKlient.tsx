import { Section } from '@/components/ui/Section';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  punkty: readonly (readonly [string, string, string])[];
  pytanieKiedy: string;
  pytanie: string;
  klikKiedy: string;
  kurs: string;
  gdzie: string;
  kiedyNaMiejscu: string;
  jutro: string;
  odpowiedzKiedy: string;
  odpowiedz: string;
  puenta: string;
}> = {
  pl: {
    punkty: [
      ['01', 'Mapa na żywo', 'Każdy bus jako punkt na mapie. Klikasz i masz kierowcę, zlecenie i godzinę dojazdu.'],
      ['02', 'Klient pyta, Ty odpowiadasz', 'W pięć sekund, bez telefonu do kierowcy i bez wyrywania go z jazdy.'],
    ],
    pytanieKiedy: '09:41 · telefon od klienta',
    pytanie: '„Gdzie jest mój ładunek do Mediolanu?”',
    klikKiedy: '09:41 · klikasz punkt na mapie',
    kurs: 'Marek W. · Warszawa → Mediolan',
    gdzie: 'Bolzano, A22 · na miejscu',
    kiedyNaMiejscu: '08:00',
    jutro: 'jutro',
    odpowiedzKiedy: '09:41 · odpowiadasz',
    odpowiedz: '„Jest pod Bolzano. Jutro o ósmej u Państwa.”',
    puenta: 'Kierowca jedzie dalej. Nikt do niego nie dzwonił.',
  },
  en: {
    punkty: [
      ['01', 'Live map', 'Every van is a dot on the map. Click it and you have the driver, the order and the arrival time.'],
      ['02', 'The client asks, you answer', 'In five seconds, without calling the driver or pulling them away from the wheel.'],
    ],
    pytanieKiedy: '09:41 · a call from a client',
    pytanie: '“Where’s my load for Milan?”',
    klikKiedy: '09:41 · you click the dot on the map',
    kurs: 'Marek W. · Warsaw → Milan',
    gdzie: 'Bolzano, A22 · arriving',
    kiedyNaMiejscu: '08:00',
    jutro: 'tomorrow',
    odpowiedzKiedy: '09:41 · you answer',
    odpowiedz: '“It’s near Bolzano. With you at eight tomorrow.”',
    puenta: 'The driver keeps driving. Nobody called him.',
  },
};

/**
 * 01 + 02 — jedna scena w trzech kadrach: pytanie klienta, kliknięcie w mapę,
 * odpowiedź. Ostatni kadr jest niebieski, bo to on jest puentą.
 */
export function MapaIKlient() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {t.punkty.map(([numer, tytul, tresc]) => (
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
            className="flex flex-col gap-4 rounded-card border border-line-dark bg-surface p-6 lg:p-8"
          >
            <div className="text-[13px] text-ink-muted">{t.pytanieKiedy}</div>
            <div className="text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              {t.pytanie}
            </div>
          </div>

          <div
            data-reveal
            className="relative flex flex-col gap-3.5 overflow-hidden rounded-card border border-line-dark bg-surface p-6 lg:p-8"
          >
            <svg
              viewBox="0 0 300 200"
              preserveAspectRatio="none"
              className="absolute inset-0 size-full opacity-35"
              aria-hidden
            >
              <path
                d="M 260 30 C 200 70, 160 110, 120 140 S 60 180, 30 190"
                fill="none"
                stroke="#0B5FFF"
                strokeWidth="3"
              />
            </svg>
            <div className="relative text-[13px] text-ink-muted">{t.klikKiedy}</div>
            <div className="relative flex flex-col gap-1 rounded-[14px] border border-line-dark bg-surface-2 px-4 py-3.5 text-[13px]">
              <b className="text-[15px]">WZ 4821K</b>
              <span>{t.kurs}</span>
              <span className="text-ink-muted">
                {t.gdzie} <b className="text-paper">{t.kiedyNaMiejscu}</b> {t.jutro}
              </span>
            </div>
          </div>

          <div data-reveal className="flex flex-col gap-4 rounded-card bg-blue p-6 text-white lg:p-8">
            <div className="text-[13px] text-white">{t.odpowiedzKiedy}</div>
            <div className="text-[19px] leading-snug font-semibold tracking-[-0.01em] lg:text-[22px]">
              {t.odpowiedz}
            </div>
            <div className="mt-auto text-[14px] text-white">
              {t.puenta}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
