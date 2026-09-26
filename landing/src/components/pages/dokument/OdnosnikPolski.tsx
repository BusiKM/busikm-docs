'use client';

import type { ReactNode } from 'react';
import { CIASTKO_JEZYKA } from '@/i18n/jezyki';
import { odpowiednik } from '@/i18n/trasy';

/** Rok — tak samo jak w przełączniku języka. */
const ROK = 60 * 60 * 24 * 365;

/**
 * Odnośnik z angielskiego tłumaczenia do wiążącej wersji polskiej.
 *
 * Zwykłe `<a>`, nie `@/i18n/Link` — ten zamieniłby adres z powrotem na
 * angielski. Kliknięcie zapisuje wybór polskiego w ciasteczku, tak jak
 * przełącznik EN/PL: bez tego `proxy.ts` odesłałby czytelnika z ciasteczkiem
 * `en` z powrotem do tłumaczenia.
 */
export function OdnosnikPolski({
  sciezkaPl,
  children,
}: {
  sciezkaPl: string;
  children: ReactNode;
}) {
  return (
    <a
      href={odpowiednik(sciezkaPl, 'pl')}
      hrefLang="pl"
      onClick={() => {
        document.cookie = `${CIASTKO_JEZYKA}=pl; path=/; max-age=${ROK}; samesite=lax`;
      }}
      className="text-blue underline underline-offset-2"
    >
      {children}
    </a>
  );
}
