import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Który z okresów jest wybrany — trzeci, 30 dni. */
const WYBRANY = 2;

type Teksty = {
  tytul: string;
  dokument: string;
  okresy: readonly string[];
  dzis: string;
  przypomnienie: string;
  termin: string;
  kanaly: readonly string[];
  wlaczone: string;
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    tytul: 'Przypominaj wcześniej',
    dokument: 'Ubezpieczenie OC · PO 2093J',
    okresy: ['7 dni', '14 dni', '30 dni', '60 dni', '90 dni'],
    dzis: 'dziś',
    przypomnienie: 'przypomnienie · 30 dni przed',
    termin: 'termin · 12.10',
    kanaly: ['Mail do Ciebie', 'Powiadomienie w aplikacji', 'Drugie przypomnienie · 7 dni przed'],
    wlaczone: 'włączone',
  },
  en: {
    tytul: 'Remind me ahead',
    dokument: 'Third-party liability insurance · PO 2093J',
    okresy: ['7 days', '14 days', '30 days', '60 days', '90 days'],
    dzis: 'today',
    przypomnienie: 'reminder · 30 days before',
    termin: 'deadline · 12 Oct',
    kanaly: ['Email to you', 'In-app notification', 'Second reminder · 7 days before'],
    wlaczone: 'on',
  },
};

/** Ile dni wcześniej przypomnieć — z osią czasu pod spodem. */
export function UstawPrzypomnienie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <b className="text-[16px] lg:text-[18px]">{t.tytul}</b>
        <span className="text-muted">{t.dokument}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {t.okresy.map((o, i) => (
          <span
            key={o}
            className={`rounded-full px-3.5 py-2.5 lg:px-4 ${
              i === WYBRANY
                ? 'bg-ink font-semibold text-paper'
                : 'border border-line text-muted'
            }`}
          >
            {o}
          </span>
        ))}
      </div>

      <div className="relative mt-2 h-14" aria-hidden>
        <div className="absolute inset-x-0 top-6.5 h-1 rounded-[2px] bg-mist" />
        <div className="absolute top-6.5 left-0 h-1 w-[72%] rounded-[2px] bg-blue" />
        <div className="absolute top-0 left-0 text-[12px] text-muted">{t.dzis}</div>
        <div className="absolute top-5 left-[calc(72%-6px)] size-4 rounded-full border-[3px] border-blue bg-white" />
        <div className="absolute top-10 left-[calc(72%-40px)] text-[12px] font-semibold whitespace-nowrap">
          {t.przypomnienie}
        </div>
        <div className="absolute top-0 right-0 text-[12px] text-muted">{t.termin}</div>
      </div>

      <div className="flex flex-col border-t border-line pt-2">
        {t.kanaly.map((co, i) => (
          <div
            key={co}
            className={`flex justify-between gap-3 py-2.5 ${i < 2 ? 'border-b border-line' : ''}`}
          >
            <span>{co}</span>
            <span className="flex-none font-semibold text-green-ink">{t.wlaczone}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
