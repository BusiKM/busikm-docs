'use client';

import { otworzUstawieniaCookie } from './zgoda';

/**
 * Odnośnik w stopce, który przywraca baner zgody.
 *
 * Polityka prywatności obiecuje, że zgodę da się cofnąć „w każdej chwili".
 * Bez tego przycisku jedyną drogą byłoby czyszczenie danych witryny
 * w przeglądarce — a to nie jest wycofanie zgody, tylko obejście.
 */
export function PrzyciskCookie() {
  return (
    <button
      type="button"
      onClick={otworzUstawieniaCookie}
      className="text-caption text-ink-muted underline underline-offset-2 hover:text-paper"
    >
      Ustawienia cookie
    </button>
  );
}
