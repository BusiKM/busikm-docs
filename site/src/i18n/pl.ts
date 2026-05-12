/**
 * PL translations — BKM-552.
 * Klucze są semantyczne (np. `hero.title`); używane przez `t(key, locale)`.
 * Trzymamy tylko shared snippets (nav, footer, common CTAs). Strona-specific
 * content piszemy bezpośrednio w `.astro` (czytelniej i typowo dla Astro).
 */

export const pl = {
  meta: {
    siteDescription:
      'BusiKM — europejski system R&D integrujący transport drogowy 2,5–3,5 t z księgowością. 6 autorskich komponentów badawczo-rozwojowych. Tachograf G2V2, AETR, OCR paragonów w 6 językach, eksport do FK.',
  },
  nav: {
    features: 'Funkcje',
    pricing: 'Cennik',
    docs: 'Docs',
    forWhom: 'Dla kogo',
    roadmap: 'Roadmapa',
    technology: 'Technologia',
    g2v2: 'G2V2',
    tryDemo: 'Wypróbuj demo',
    bookMeeting: 'Umów spotkanie',
  },
  forWhom: {
    accountingFirms: { label: 'Dla Biur Rachunkowych', desc: 'Panel multi-klient · 3 mies. gratis' },
    owners: { label: 'Dla Właścicieli Firm', desc: 'Dashboard floty · raporty MF' },
    accountants: { label: 'Dla Księgowych', desc: 'Eksport FK · Insert GT · Comarch' },
    drivers: { label: 'Dla Kierowców', desc: 'Aplikacja mobilna · GPS w tle' },
  },
  footer: {
    rights: 'Wszelkie prawa zastrzeżone.',
    contact: 'Kontakt',
  },
  common: {
    learnMore: 'Dowiedz się więcej',
    seeTechnology: 'Zobacz technologię',
    backToHome: 'Wróć na stronę główną',
  },
  theme: {
    toggleLabel: 'Przełącz motyw',
    light: 'Jasny',
    dark: 'Ciemny',
    system: 'Systemowy',
  },
  lang: {
    pl: 'Polski',
    en: 'English',
    switchTo: 'Zmień język',
  },
} as const;

export type Translations = typeof pl;
