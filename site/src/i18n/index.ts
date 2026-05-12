/**
 * i18n barrel — BKM-552.
 * Public API: `t(locale)` zwraca translations object, `detectLocale`, `getAlternateUrl`,
 * `getHreflangAlternates` z `path-map.ts`.
 */

import { pl } from './pl';
import { en } from './en';
import { detectLocale, getAlternateUrl, getHreflangAlternates, type Locale, DEFAULT_LOCALE, LOCALES } from './path-map';

const TRANSLATIONS = { pl, en } as const;

/** Zwraca słownik tłumaczeń dla danego locale (fallback do PL). */
export function t(locale: Locale | undefined): typeof pl {
  if (locale && locale in TRANSLATIONS) return TRANSLATIONS[locale];
  return pl;
}

export { detectLocale, getAlternateUrl, getHreflangAlternates, DEFAULT_LOCALE, LOCALES };
export type { Locale } from './path-map';
export type { Translations } from './pl';
