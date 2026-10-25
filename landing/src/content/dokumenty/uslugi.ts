import type { Tlumaczenia } from '@/i18n/jezyki';

/**
 * Dokumenty prawne usługi BusiKM (aplikacja webowa i mobilna).
 *
 * Ich jedynym źródłem jest API backendu, a publiczne strony wyświetla
 * aplikacja webowa pod app.busikm.pl. Landing ich nie powiela: dwa komplety
 * tych samych dokumentów rozjeżdżały się przy pierwszej zmianie (AUD-RODO-02,
 * BKM-2787). Stare adresy na busikm.pl przekierowuje `next.config.ts`.
 *
 * Odnośniki są zewnętrzne, więc `@/i18n/Link` zostawia je bez zmian także
 * na stronie angielskiej. Wiążąca jest wersja polska i tylko taka istnieje,
 * stąd te same adresy w obu językach.
 */
export const ADRES_APLIKACJI = 'https://app.busikm.pl';

export const dokumentyUslugi = {
  regulamin: `${ADRES_APLIKACJI}/regulamin`,
  prywatnosc: `${ADRES_APLIKACJI}/polityka-prywatnosci`,
  powierzenie: `${ADRES_APLIKACJI}/umowa-powierzenia`,
  retencja: `${ADRES_APLIKACJI}/polityka-retencji`,
  podprocesorzy: `${ADRES_APLIKACJI}/podprocesorzy`,
} as const;

/** Nazwy dokumentów usługi tak, jak wypisujemy je w stopce i pod dokumentem. */
export const tytulyUslugi: Tlumaczenia<Record<keyof typeof dokumentyUslugi, string>> = {
  pl: {
    regulamin: 'Regulamin',
    prywatnosc: 'Polityka prywatności usługi BusiKM',
    powierzenie: 'Umowa powierzenia',
    retencja: 'Polityka retencji',
    podprocesorzy: 'Podprocesorzy',
  },
  en: {
    regulamin: 'Terms of Service',
    prywatnosc: 'BusiKM Service Privacy Policy',
    powierzenie: 'Data Processing Agreement',
    retencja: 'Retention Policy',
    podprocesorzy: 'Subprocessors',
  },
};
