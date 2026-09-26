'use client';

import { usePathname } from 'next/navigation';
import { CIASTKO_JEZYKA, type Jezyk } from '@/i18n/jezyki';
import { odpowiednik, rozpoznaj } from '@/i18n/trasy';

/** Rok — wybór języka nie ma powodu wygasać szybciej. */
const ROK = 60 * 60 * 24 * 365;

const NAZWY: Record<Jezyk, string> = { pl: 'Polski', en: 'English' };

function zapamietaj(jezyk: Jezyk) {
  document.cookie = `${CIASTKO_JEZYKA}=${jezyk}; path=/; max-age=${ROK}; samesite=lax`;
}

/** Kolejność jak na przycisku z briefu: EN, potem PL. */
const KOLEJNOSC: Jezyk[] = ['en', 'pl'];

/**
 * Przełącznik EN / PL.
 *
 * Prowadzi na **tę samą stronę** w drugim języku, a nie na stronę główną —
 * kto czyta cennik, chce czytać cennik. Wybór trafia do ciasteczka, które
 * `proxy.ts` stawia ponad wykrywaniem kraju i języka przeglądarki; bez tego
 * Polak czytający wersję angielską byłby odsyłany z powrotem przy każdym
 * wejściu.
 *
 * Zwykłe `<a>`, nie `next/link`: zmiana języka podmienia układ główny
 * (`<html lang>`), więc i tak kończy się pełnym przeładowaniem.
 *
 * Ciasteczko jest niezbędne do działania wybranej funkcji — zapamiętuje
 * wybór, którego czytelnik sam dokonał — więc nie wymaga zgody z banera.
 */
export function PrzelacznikJezyka({ className = '' }: { className?: string }) {
  const { jezyk: biezacy, sciezkaPl } = rozpoznaj(usePathname() ?? '/');

  return (
    <div
      role="group"
      aria-label={biezacy === 'pl' ? 'Język strony' : 'Site language'}
      className={`flex items-center rounded-full border border-line p-0.5 font-mono text-[12px] font-medium tracking-[0.06em] ${className}`}
    >
      {KOLEJNOSC.map((jezyk) => {
        const aktywny = jezyk === biezacy;
        return (
          <a
            key={jezyk}
            href={odpowiednik(sciezkaPl, jezyk)}
            hrefLang={jezyk}
            lang={jezyk}
            aria-label={NAZWY[jezyk]}
            aria-current={aktywny ? 'true' : undefined}
            onClick={() => zapamietaj(jezyk)}
            className={`flex h-7 min-w-9 items-center justify-center rounded-full px-2 uppercase transition-colors ${
              aktywny ? 'bg-ink text-paper hover:text-paper' : 'text-muted hover:text-ink'
            }`}
          >
            {jezyk}
          </a>
        );
      })}
    </div>
  );
}
