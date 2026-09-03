'use client';

import { useEffect, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import { odczytajZgode, ZDARZENIE_ZMIANY, type Zgoda } from './zgoda';

/**
 * Google Analytics 4 — ładowany dopiero po zgodzie.
 *
 * Identyfikator siedzi w `NEXT_PUBLIC_GA_ID`. Bez niego komponent nie robi
 * nic, więc lokalnie i w podglądach na Vercelu ruch nie zaśmieca statystyk.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Odsłony przy przechodzeniu między stronami.
 *
 * App Router zmienia adres bez przeładowania dokumentu, więc GA4 zliczyłby
 * tylko pierwszą stronę. Dlatego automatyczna odsłona jest wyłączona
 * (`send_page_view: false`), a wysyłamy ją sami przy każdej zmianie ścieżki.
 */
function OdslonyStron() {
  const sciezka = usePathname();
  const parametry = useSearchParams();

  useEffect(() => {
    if (!GA_ID || !window.gtag) return;
    const zapytanie = parametry.toString();
    window.gtag('event', 'page_view', {
      page_path: zapytanie ? `${sciezka}?${zapytanie}` : sciezka,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [sciezka, parametry]);

  return null;
}

export function Analytics() {
  const [zgoda, setZgoda] = useState<Zgoda>(null);

  useEffect(() => {
    setZgoda(odczytajZgode());
    const reakcja = (e: Event) => setZgoda((e as CustomEvent<Zgoda>).detail);
    window.addEventListener(ZDARZENIE_ZMIANY, reakcja);
    return () => window.removeEventListener(ZDARZENIE_ZMIANY, reakcja);
  }, []);

  if (!GA_ID || zgoda !== 'tak') return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-start" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted'
          });
          gtag('config', '${GA_ID}', {
            send_page_view: false,
            // Polityka prywatności mówi, że ciasteczka analityczne wygasają
            // po 14 miesiącach. GA4 domyślnie ustawia dwa lata, więc bez tej
            // linijki dokument mówiłby nieprawdę. 425 dni = 14 miesięcy.
            cookie_expires: 36720000,
            cookie_flags: 'SameSite=Lax;Secure'
          });
          gtag('event', 'page_view', {
            page_path: location.pathname + location.search,
            page_location: location.href,
            page_title: document.title
          });
        `}
      </Script>
      {/* `useSearchParams` wymaga granicy Suspense — bez niej cała strona
          przechodzi na renderowanie po stronie klienta i traci statyczność. */}
      <Suspense fallback={null}>
        <OdslonyStron />
      </Suspense>
    </>
  );
}
