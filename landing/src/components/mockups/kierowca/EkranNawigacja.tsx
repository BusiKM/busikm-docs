import { Telefon, PasekStanu } from '@/components/mockups/Telefon';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  dalej: string;
  dojazd: string;
  zaktualizowana: string;
  trasa: string;
  wTrasie: string;
  rozladunek: string;
}> = {
  pl: {
    dalej: 'Brenner, potem A22',
    dojazd: 'dojazd',
    zaktualizowana: 'trasa zaktualizowana · 07:12',
    trasa: 'Warszawa → Mediolan',
    wTrasie: 'w trasie',
    rozladunek: 'Rozładunek: Via Tortona 12 · 08:00',
  },
  en: {
    dalej: 'Brenner, then A22',
    dojazd: 'arrival',
    zaktualizowana: 'route updated · 07:12',
    trasa: 'Warsaw → Milan',
    wTrasie: 'en route',
    rozladunek: 'Unloading: Via Tortona 12 · 08:00',
  },
};

/** Nawigacja w tej samej aplikacji, z kartą zlecenia u dołu. */
export function EkranNawigacja() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Telefon glow>
      <PasekStanu left="07:15" right="WZ 4821K" />

      <div className="relative mx-3.5 mt-4 flex-1 overflow-hidden rounded-[18px] bg-surface-3">
        <svg viewBox="0 0 220 320" preserveAspectRatio="none" className="size-full" aria-hidden>
          <path
            d="M 60 300 C 100 240, 90 190, 120 140 S 170 60, 180 20"
            fill="none"
            stroke="#0B5FFF"
            strokeWidth="5"
          />
          <circle cx="112" cy="150" r="8" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
        </svg>

        <div className="absolute inset-x-3 top-3 flex justify-between rounded-xl bg-surface-2 p-3">
          <div>
            <div className="text-[16px] font-semibold lg:text-[18px]">A1 · 214 km</div>
            <div className="text-ink-muted">{t.dalej}</div>
          </div>
          <div className="text-right">
            <div className="text-[16px] font-semibold lg:text-[18px]">08:00</div>
            <div className="text-ink-muted">{t.dojazd}</div>
          </div>
        </div>

        <div className="absolute bottom-3 left-3 rounded-full bg-surface-2 px-3 py-2 text-green">
          {t.zaktualizowana}
        </div>
      </div>

      <div className="m-3.5 rounded-[18px] bg-surface-2 p-4">
        <div className="flex justify-between gap-2">
          <b className="text-[13px] lg:text-[14px]">{t.trasa}</b>
          <span className="text-green">{t.wTrasie}</span>
        </div>
        <div className="mt-1 text-ink-muted">{t.rozladunek}</div>
      </div>
    </Telefon>
  );
}
