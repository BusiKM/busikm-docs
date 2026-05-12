/**
 * EN translations — BKM-552.
 * Struktura identyczna z `pl.ts` (TypeScript `Translations` typ z `pl.ts`).
 */

import type { Translations } from './pl';

export const en: Translations = {
  meta: {
    siteDescription:
      'BusiKM — European deep-tech R&D platform unifying road transport (vans 2.5–3.5 t) with accounting. 6 in-house research components: tachograph parser, Bluetooth ITS, EU border detection, AETR diet engine, XAI fuel anomaly, multi-tenant.',
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
