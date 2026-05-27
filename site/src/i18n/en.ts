/**
 * EN translations — BKM-552.
 * Struktura identyczna z `pl.ts` (TypeScript `Translations` typ z `pl.ts`).
 */

import type { Translations } from './pl';

export const en: Translations = {
  meta: {
    siteDescription:
      'BusiKM — Poland\'s first e-TMS (Transport Management System) designed from the ground up for international transport with vans 2.5–3.5 t and accounting firms serving them. G2V2 tachograph, AETR working time, real-time GPS, receipt OCR in 6 languages, export to Insert GT, Comarch ERP Optima and Symfonia FK, KSeF e-invoicing, foreign per-diem.',
  },
  nav: {
    features: 'Features',
    pricing: 'Pricing',
    docs: 'Docs',
    forWhom: 'For whom',
    roadmap: 'Roadmap',
    technology: 'Technology',
    g2v2: 'G2V2',
    tryDemo: 'Try demo',
    bookMeeting: 'Book a meeting',
  },
  forWhom: {
    accountingFirms: { label: 'For Accounting Firms', desc: 'Multi-client panel · 3 mo. free' },
    owners: { label: 'For Fleet Owners', desc: 'Fleet dashboard · MoF reports' },
    accountants: { label: 'For Accountants', desc: 'FK export · Insert GT · Comarch' },
    drivers: { label: 'For Drivers', desc: 'Mobile app · background GPS' },
  },
  footer: {
    rights: 'All rights reserved.',
    contact: 'Contact',
  },
  common: {
    learnMore: 'Learn more',
    seeTechnology: 'Explore technology',
    backToHome: 'Back to home',
  },
  theme: {
    toggleLabel: 'Toggle theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  lang: {
    pl: 'Polski',
    en: 'English',
    switchTo: 'Change language',
  },
};
