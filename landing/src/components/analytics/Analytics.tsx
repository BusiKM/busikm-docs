'use client';

import { useEffect, useRef, useSyncExternalStore, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import { odczytajZgode, subskrybujZgode, zgodaNaSerwerze } from './zgoda';
import { DEMO_URL } from '@/content/navigation';

/**
 * Google Analytics 4 – ładowany dopiero po zgodzie.
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
 * App Router zmienia adres bez przeładowania dokumentu, więc GA4 sam zliczyłby
 * tylko tę stronę, na której skrypt wystartował. Pierwszą odsłonę zostawiamy
 * jednak `gtag`-owi (`send_page_view` domyślnie włączone), a tutaj obsługujemy
 * wyłącznie **kolejne** przejścia – stąd pominięcie pierwszego przebiegu.
 *
 * Bez tego pominięcia pierwsza strona liczy się dwa razy: raz z konfiguracji
 * skryptu, raz z tego efektu przy montowaniu.
 */
function OdslonyStron() {
  const sciezka = usePathname();
  const parametry = useSearchParams();
  const pierwszy = useRef(true);

  useEffect(() => {
    if (pierwszy.current) {
      pierwszy.current = false;
      return;
    }
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

/**
 * Wejścia do demo – zdarzenie `demo_open` przy kliknięciu w odnośnik do demo
 * w aplikacji, z informacją, z której strony przyszło.
 *
 * Jeden nasłuch na dokumencie zamiast kodu w każdym przycisku: odnośników do
 * demo jest kilkanaście (nagłówek, hero, strony ról, sekcja demo, 404)
 * i każdy nowy liczy się sam. Rusza tylko po zgodzie, razem z resztą GA4.
 */
function WejsciaDoDemo() {
  useEffect(() => {
    const naKlik = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a || !window.gtag) return;
      if (!a.getAttribute('href')?.startsWith(DEMO_URL)) return;
      window.gtag('event', 'demo_open', { page_path: window.location.pathname });
    };
    document.addEventListener('click', naKlik, { capture: true });
    return () => document.removeEventListener('click', naKlik, { capture: true });
  }, []);
  return null;
}

export function Analytics() {
  // Zgoda mieszka w `localStorage`, poza Reactem. Czytana wprost ze źródła,
  // nie przepisywana do stanu efektem – inaczej każde wejście na stronę
  // kosztuje dodatkowy render, a decyzja z innej karty w ogóle nie dochodzi.
  const zgoda = useSyncExternalStore(subskrybujZgode, odczytajZgode, zgodaNaSerwerze);

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
            // Polityka prywatności mówi, że ciasteczka analityczne wygasają
            // po 14 miesiącach. GA4 domyślnie ustawia dwa lata, więc bez tej
            // linijki dokument mówiłby nieprawdę. 425 dni = 14 miesięcy.
            cookie_expires: 36720000,
            cookie_flags: 'SameSite=Lax;Secure'
          });
        `}
      </Script>
      {/* `useSearchParams` wymaga granicy Suspense – bez niej cała strona
          przechodzi na renderowanie po stronie klienta i traci statyczność. */}
      <Suspense fallback={null}>
        <OdslonyStron />
      </Suspense>
      <WejsciaDoDemo />
    </>
  );
}
