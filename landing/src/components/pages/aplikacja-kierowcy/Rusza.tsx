import { Section } from '@/components/ui/Section';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  tresc: string;
  licznikPrzedStartem: string;
  licznik: string;
  zdjecie: string;
  rozpocznij: string;
  pigulki: string[];
  nagrywa: string;
}> = {
  pl: {
    naglowek: 'Rusza jednym przyciskiem',
    tresc:
      'Zdjęcie licznika, przycisk „Rozpocznij trasę” i jedzie. Telefon może zostać w kieszeni, ekran wyłączony. Trasa nagrywa się sama.',
    licznikPrzedStartem: 'Licznik przed startem',
    licznik: '184 210 km',
    zdjecie: 'zdjęcie licznika · zrobione',
    rozpocznij: 'Rozpocznij trasę',
    pigulki: ['ekran wyłączony', 'telefon w kieszeni'],
    nagrywa: 'trasa nagrywa się',
  },
  en: {
    naglowek: 'Off with one button',
    tresc:
      'A photo of the odometer, the “Start route” button, and off they go. The phone can stay in their pocket with the screen off. The route records itself.',
    licznikPrzedStartem: 'Odometer before the start',
    licznik: '184,210 km',
    zdjecie: 'odometer photo · taken',
    rozpocznij: 'Start route',
    pigulki: ['screen off', 'phone in pocket'],
    nagrywa: 'route recording',
  },
};

/** 03 — rusza jednym przyciskiem. Karta licznika zamiast telefonu. */
export function Rusza() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div
            data-reveal
            className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
          >
            03
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        <div data-reveal className="flex flex-col items-center gap-4">
          <div className="flex w-full max-w-[420px] flex-col gap-5 rounded-panel bg-ink p-7 text-paper shadow-card lg:p-8">
            <div className="flex justify-between text-[13px] text-ink-muted">
              <span>{t.licznikPrzedStartem}</span>
              <span>06:02</span>
            </div>
            <div className="text-[32px] font-bold tracking-[-0.03em] lg:text-[40px]">
              {t.licznik}
            </div>
            <div className="flex h-25 items-center justify-center rounded-2xl bg-surface-2 text-[13px] text-ink-muted lg:h-30">
              {t.zdjecie}
            </div>
            <div className="rounded-2xl bg-blue p-5 text-center text-[18px] font-semibold text-white lg:text-[20px]">
              {t.rozpocznij}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 text-[13px] text-muted lg:text-caption">
            {t.pigulki.map((p) => (
              <span key={p} className="rounded-full bg-mist px-3.5 py-2">
                {p}
              </span>
            ))}
            <span className="rounded-full bg-blue-soft px-3.5 py-2 font-semibold text-blue-dark">
              {t.nagrywa}
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}
