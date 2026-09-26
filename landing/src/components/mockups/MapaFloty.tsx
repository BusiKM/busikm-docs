import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  wTrasie: string;
  zaladunek: string;
  naBazie: string;
  naZywo: string;
  trasa: string;
  naMiejscu: string;
  doRozladunku: string;
}> = {
  pl: {
    wTrasie: 'w trasie',
    zaladunek: 'załadunek',
    naBazie: 'na bazie',
    naZywo: 'na żywo',
    trasa: 'Marek W. · Warszawa → Mediolan',
    naMiejscu: 'Na miejscu',
    doRozladunku: ' · 214 km do rozładunku',
  },
  en: {
    wTrasie: 'on the road',
    zaladunek: 'loading',
    naBazie: 'at base',
    naZywo: 'live',
    trasa: 'Marek W. · Warsaw → Milan',
    naMiejscu: 'Arrives',
    doRozladunku: ' · 214 km to unloading',
  },
};

/** Mapa floty na żywo — trzy pojazdy i dymek z godziną dojazdu. */
export function MapaFloty() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="relative h-[260px] overflow-hidden rounded-card border border-line bg-mist shadow-card lg:aspect-16/10 lg:h-auto lg:rounded-panel lg:bg-white">
      <div className="absolute inset-0 bg-mist bg-[linear-gradient(rgba(10,10,11,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.05)_1px,transparent_1px)] bg-size-[64px_64px]" />

      <svg
        viewBox="0 0 1120 700"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <path d="M 720 200 C 640 300, 560 380, 520 460 S 440 600, 400 640" fill="none" stroke="#0B5FFF" strokeWidth="3" />
        <path d="M 600 230 C 480 240, 380 220, 280 260" fill="none" stroke="#0B5FFF" strokeWidth="3" opacity=".6" />
        <path d="M 640 120 C 560 150, 480 150, 420 140" fill="none" stroke="#0B5FFF" strokeWidth="3" opacity=".4" />
        <circle cx="720" cy="200" r="6" fill="#0B5FFF" />
        <circle cx="600" cy="230" r="6" fill="#0B5FFF" />
        <circle cx="640" cy="120" r="6" fill="#0B5FFF" />
        <circle cx="536" cy="430" r="9" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
        <circle cx="400" cy="236" r="9" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
        <circle cx="470" cy="150" r="9" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
      </svg>

      <div className="absolute top-5 left-5 hidden gap-4 rounded-btn border border-line bg-white px-3.5 py-2.5 text-[13px] lg:flex">
        <span>
          <b>3</b> {t.wTrasie}
        </span>
        <span className="text-muted">
          <b className="text-ink">1</b> {t.zaladunek}
        </span>
        <span className="text-muted">
          <b className="text-ink">3</b> {t.naBazie}
        </span>
      </div>

      <div className="absolute top-5 right-5 hidden rounded-full border border-line bg-white px-3 py-1.5 text-[12px] text-muted lg:block">
        <span className="text-green-ink">●</span> {t.naZywo}
      </div>

      <div className="absolute right-3.5 bottom-3.5 left-3.5 flex flex-col gap-1 rounded-[10px] border border-line bg-white px-3 py-2.5 text-[12px] shadow-card lg:top-[56%] lg:right-auto lg:bottom-auto lg:left-1/2 lg:w-auto lg:rounded-[14px] lg:px-4 lg:py-3.5 lg:text-[13px]">
        <b className="lg:text-[15px]">WZ 4821K</b>
        <span className="hidden lg:block">{t.trasa}</span>
        <span className="text-muted lg:hidden">Marek W.</span>
        <span className="text-muted">
          {t.naMiejscu} <b className="text-ink">08:00</b>
          <span className="hidden lg:inline">{t.doRozladunku}</span>
        </span>
      </div>
    </div>
  );
}
