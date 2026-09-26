import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  kierowca: string;
  calaSciezka: string;
  wynik: string;
  opis: string;
  twojaPraca: string;
  poStronieKierowcy: string;
}> = {
  pl: {
    kierowca: 'kierowca',
    calaSciezka: 'Cała ścieżka',
    wynik: '~10 minut',
    opis: 'Twojej pracy. Resztę robi kierowca i system.',
    twojaPraca: 'Twoja praca · 10 min',
    poStronieKierowcy: 'po stronie kierowcy',
  },
  en: {
    kierowca: 'driver',
    calaSciezka: 'The whole path',
    wynik: '~10 minutes',
    opis: 'Of your time. The driver and the system do the rest.',
    twojaPraca: 'Your work · 10 min',
    poStronieKierowcy: 'on the driver’s side',
  },
};

/** Udziały odcinków są proporcjonalne do minut, więc pasek pokazuje realny rozkład pracy. */
function odcinki(kierowca: string) {
  return [
    { etykieta: '1 · 2 min', udzial: 2 },
    { etykieta: '2 · 1 min', udzial: 1 },
    { etykieta: '3 · 2 min', udzial: 2 },
    { etykieta: '4 · 3 min', udzial: 3 },
    { etykieta: `5 · ${kierowca}`, udzial: 1.5, kierowca: true },
    { etykieta: '6 · 1 min', udzial: 1 },
    { etykieta: '7 · 1 min', udzial: 1 },
  ];
}

/**
 * Licznik czasu — najmocniejszy argument tej strony: cała ścieżka to około
 * dziesięciu minut pracy właściciela. Piąty odcinek jest przerywany, bo nie
 * jest jego pracą.
 */
export function PasekPostepu() {
  const t = TEKSTY[biezacyJezyk()];
  const lista = odcinki(t.kierowca);
  return (
    <div
      data-reveal
      className="grid gap-8 rounded-panel bg-ink p-7 text-paper lg:grid-cols-[1fr_2fr] lg:items-center lg:gap-12 lg:p-12"
    >
      <div className="flex flex-col gap-1.5">
        <div className="text-[12px] font-medium tracking-[0.1em] text-ink-muted uppercase lg:text-caption">
          {t.calaSciezka}
        </div>
        <div className="text-[34px] leading-none font-bold tracking-[-0.03em] sm:text-[44px] lg:text-[64px]">
          {t.wynik}
        </div>
        <div className="mt-1.5 text-[15px] text-ink-muted lg:text-body">
          {t.opis}
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        <div className="flex h-3 gap-1" aria-hidden>
          {lista.map((o) => (
            <span
              key={o.etykieta}
              style={{ flex: o.udzial }}
              className={`rounded-md ${
                o.kierowca ? 'border border-dashed border-ink-faint bg-line-dark-2' : 'bg-blue'
              }`}
            />
          ))}
        </div>

        <div className="hidden gap-1 text-[10px] text-ink-muted sm:flex lg:text-[12px]" aria-hidden>
          {lista.map((o) => (
            <span key={o.etykieta} style={{ flex: o.udzial }} className="min-w-0 truncate">
              {o.etykieta}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-1.5 text-[12px] text-ink-muted lg:text-[13px]">
          <span className="flex items-center gap-2">
            <span aria-hidden className="size-2.5 rounded-[3px] bg-blue" />
            {t.twojaPraca}
          </span>
          <span className="flex items-center gap-2">
            <span
              aria-hidden
              className="size-2.5 rounded-[3px] border border-dashed border-ink-faint bg-line-dark-2"
            />
            {t.poStronieKierowcy}
          </span>
        </div>
      </div>
    </div>
  );
}
