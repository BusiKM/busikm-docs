/**
 * Języki serwisu.
 *
 * Polski stoi pod adresami bez przedrostka (`/cennik`), angielski pod `/en`
 * (`/en/pricing`). Wewnętrznie obie wersje żyją w jednym drzewie
 * `app/[lang]/…` — `proxy.ts` przepisuje adres publiczny na wewnętrzny.
 */
export const jezyki = ['pl', 'en'] as const;

export type Jezyk = (typeof jezyki)[number];

export const JEZYK_DOMYSLNY: Jezyk = 'pl';

/** Ciasteczko z wyborem z przełącznika EN/PL. Wygrywa z wykrywaniem. */
export const CIASTKO_JEZYKA = 'jezyk';

/** Treść w obu językach — jeden obiekt, żeby żadna wersja nie została w tyle. */
export type Tlumaczenia<T> = Record<Jezyk, T>;

export function czyJezyk(wartosc: unknown): wartosc is Jezyk {
  return typeof wartosc === 'string' && (jezyki as readonly string[]).includes(wartosc);
}

/** Znacznik `lang` / `hreflang` i `og:locale` dla danego języka. */
export const KODY: Record<Jezyk, { lang: string; locale: string }> = {
  pl: { lang: 'pl-PL', locale: 'pl_PL' },
  en: { lang: 'en', locale: 'en_GB' },
};
