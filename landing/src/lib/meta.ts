/**
 * Zdarzenia dla piksela Meta.
 *
 * Wołamy je po udanej akcji na stronie. Jeżeli piksela nie ma – brak zgody
 * na reklamę albo brak identyfikatora – `window.fbq` nie istnieje i funkcja
 * po prostu nic nie robi. Dzięki temu formularze nie muszą znać stanu zgody.
 *
 * Nie przekazujemy tu żadnych danych osobowych (imienia ani e-maila),
 * tylko nazwę zdarzenia i źródło formularza.
 */
type ZdarzenieMeta = 'Lead' | 'Contact';

export function zdarzenieMeta(nazwa: ZdarzenieMeta, parametry?: Record<string, string>) {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', nazwa, parametry);
}
