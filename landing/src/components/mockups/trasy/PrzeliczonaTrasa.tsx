import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  stara: string;
  dojazd: string;
  korek: string;
  nowa: string;
  przez: string;
  zysk: string;
}> = {
  pl: {
    stara: 'Stara trasa',
    dojazd: 'Dojazd',
    korek: 'korek 14 km pod Bolzano',
    nowa: 'Nowa trasa',
    przez: 'przez Brixen · SS12',
    zysk: '− 35 min · kierowca ma nową wersję',
  },
  en: {
    stara: 'Old route',
    dojazd: 'Arrival',
    korek: '14 km jam near Bolzano',
    nowa: 'New route',
    przez: 'via Brixen · SS12',
    zysk: '− 35 min · driver has the new version',
  },
};

/** Stara i nowa trasa obok siebie — zmiana z powodu korka. */
export function PrzeliczonaTrasa() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="grid grid-cols-2 gap-3 rounded-card border border-line bg-white p-5 text-[12px] shadow-card lg:aspect-4/3 lg:gap-4 lg:p-6 lg:text-[13px]">
      <div className="relative flex min-h-45 flex-col overflow-hidden rounded-[14px] bg-mist lg:min-h-0">
        <svg
          viewBox="0 0 200 260"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          aria-hidden
        >
          <path
            d="M 170 30 C 140 90, 120 130, 100 170 S 60 230, 30 240"
            fill="none"
            stroke="#6E6E76"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
          <circle cx="112" cy="140" r="12" fill="#6E6E76" opacity=".25" />
          <circle cx="112" cy="140" r="5" fill="#6E6E76" />
          <circle cx="170" cy="30" r="5" fill="#0A0A0B" />
          <circle cx="30" cy="240" r="5" fill="#0A0A0B" />
        </svg>
        <div className="relative flex flex-col gap-0.5 p-3.5">
          <span className="text-muted">{t.stara}</span>
          <b>A22 · Brenner</b>
        </div>
        <div className="relative mt-auto flex flex-col gap-0.5 bg-linear-to-t from-mist from-60% to-transparent p-3.5 pt-8">
          <span className="text-muted">{t.dojazd}</span>
          <b className="text-[16px] text-muted line-through lg:text-[18px]">08:40</b>
          <span className="text-muted">{t.korek}</span>
        </div>
      </div>

      <div className="relative flex min-h-45 flex-col overflow-hidden rounded-[14px] border border-blue-soft-line bg-mist lg:min-h-0">
        <svg
          viewBox="0 0 200 260"
          preserveAspectRatio="none"
          className="absolute inset-0 size-full"
          aria-hidden
        >
          <path
            d="M 170 30 C 190 100, 120 120, 90 180 S 60 230, 30 240"
            fill="none"
            stroke="#0B5FFF"
            strokeWidth="4"
          />
          <circle cx="170" cy="30" r="5" fill="#0B5FFF" />
          <circle cx="30" cy="240" r="5" fill="#0B5FFF" />
          <circle cx="140" cy="110" r="7" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
        </svg>
        <div className="relative flex flex-col gap-0.5 p-3.5">
          <span className="font-semibold text-blue">{t.nowa}</span>
          <b>{t.przez}</b>
        </div>
        <div className="relative mt-auto flex flex-col gap-0.5 bg-linear-to-t from-mist from-60% to-transparent p-3.5 pt-8">
          <span className="text-muted">{t.dojazd}</span>
          <b className="text-[16px] lg:text-[18px]">08:05</b>
          <span className="text-green-ink">{t.zysk}</span>
        </div>
      </div>
    </div>
  );
}
