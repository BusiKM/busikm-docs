import { Telefon, PasekStanu } from '@/components/mockups/Telefon';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Które pozycje już poszły. Kolejność jak w `kolejka` niżej. */
const WYSLANE = [false, false, false, true] as const;

const TEKSTY: Tlumaczenia<{
  brakZasiegu: string;
  naglowek: string;
  lead: string;
  kolejka: readonly (readonly [string, string])[];
  wyslane: string;
  stopka: string;
}> = {
  pl: {
    brakZasiegu: 'brak zasięgu',
    naglowek: 'Do wysłania',
    lead: 'Wyślą się same, gdy wróci sygnał.',
    kolejka: [
      ['Punkty trasy', '142 · od 12:05'],
      ['Paragon · OMV Brno', '103,30 € · zdjęcie'],
      ['Przerwa 12:40–13:25', 'czas pracy'],
      ['Zdjęcie licznika', '184 210 km'],
    ],
    wyslane: 'wysłane',
    stopka: '3 rzeczy czekają · 1,2 MB',
  },
  en: {
    brakZasiegu: 'no signal',
    naglowek: 'To send',
    lead: 'They’ll send themselves once the signal is back.',
    kolejka: [
      ['Route points', '142 · since 12:05'],
      ['Receipt · OMV Brno', '€103.30 · photo'],
      ['Break 12:40–13:25', 'working time'],
      ['Odometer photo', '184,210 km'],
    ],
    wyslane: 'sent',
    stopka: '3 items waiting · 1.2 MB',
  },
};

/** Ekran „Do wysłania" — co czeka na sygnał. */
export function EkranWysylka() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Telefon glow>
      <PasekStanu left="13:20" right={t.brakZasiegu} />

      <div className="px-4 pt-5 text-[20px] font-semibold lg:px-4.5 lg:pt-6 lg:text-[22px]">
        {t.naglowek}
      </div>
      <div className="px-4 pt-1.5 text-ink-muted lg:px-4.5">
        {t.lead}
      </div>

      <div className="flex flex-col gap-2 p-4 lg:p-4.5">
        {t.kolejka.map(([title, meta], i) => (
          <div
            key={title}
            className={`flex items-center justify-between gap-2 rounded-[14px] p-3.5 ${
              WYSLANE[i] ? 'bg-surface-3' : 'bg-surface-2'
            }`}
          >
            <div className="min-w-0">
              <b className="block truncate">{title}</b>
              <div className="truncate text-ink-muted">{meta}</div>
            </div>
            {WYSLANE[i] ? (
              <span className="flex-none text-green">{t.wyslane}</span>
            ) : (
              <span
                aria-hidden
                className="size-2.5 flex-none rounded-full border-2 border-ink-muted"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mx-4 mt-auto mb-4 rounded-[14px] border border-line-dark py-3.5 text-center text-ink-muted lg:mx-4.5 lg:mb-4.5">
        {t.stopka}
      </div>
    </Telefon>
  );
}
