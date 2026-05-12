/**
 * Path mapping PL ↔ EN — BKM-552 (i18n setup for EU Grant Readiness).
 *
 * PL slug bez prefixu (busikm.pl/funkcje), EN z prefixem (busikm.pl/en/features).
 * Slug tłumaczone (nie `/en/funkcje` lecz `/en/features`).
 * Strony PL-only (tu nie wymienione) → LangSwitcher fallback do `/en/`.
 */

export type Locale = 'pl' | 'en';

export const LOCALES: readonly Locale[] = ['pl', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'pl';

/** Translated slug pairs. PL ścieżka → EN ścieżka. */
const PL_TO_EN: Record<string, string> = {
  '/': '/en/',
  '/funkcje': '/en/features',
  '/cennik': '/en/pricing',
  '/technologia': '/en/technology',
};

const EN_TO_PL: Record<string, string> = Object.fromEntries(
  Object.entries(PL_TO_EN).map(([pl, en]) => [en, pl])
);

/** Normalize trailing slash dla matching. */
function normalize(path: string): string {
  if (path === '/' || path === '/en/') return path;
  return path.replace(/\/$/, '');
}

/**
 * Daje URL na drugim locale dla aktualnej ścieżki.
 * Jeśli strona nie ma tłumaczenia — fallback do home odpowiedniego locale.
 */
export function getAlternateUrl(currentPath: string, target: Locale): string {
  const path = normalize(currentPath);

  if (target === 'en') {
    if (path.startsWith('/en')) return path; // już EN
    return PL_TO_EN[path] ?? '/en/'; // fallback do EN home
  }

  // target === 'pl'
  if (!path.startsWith('/en')) return path; // już PL
  return EN_TO_PL[path] ?? '/'; // fallback do PL home
}

/** Wykrywa locale z URL (PL gdy bez `/en/` prefixu). */
export function detectLocale(path: string): Locale {
  return path.startsWith('/en') ? 'en' : 'pl';
}

/** Daje pełną listę alternates dla SEO hreflang (siteUrl-aware). */
export function getHreflangAlternates(currentPath: string, siteUrl: string): Array<{
  hreflang: string;
  href: string;
}> {
  const path = normalize(currentPath);
  const plPath = path.startsWith('/en') ? EN_TO_PL[path] ?? '/' : path;
  const enPath = path.startsWith('/en') ? path : PL_TO_EN[path] ?? '/en/';
  return [
    { hreflang: 'pl', href: new URL(plPath, siteUrl).toString() },
    { hreflang: 'en', href: new URL(enPath, siteUrl).toString() },
    { hreflang: 'x-default', href: new URL(plPath, siteUrl).toString() },
  ];
}
