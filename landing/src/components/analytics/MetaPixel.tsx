'use client';

import { useEffect, useRef, useSyncExternalStore, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

import { odczytajZgodeMarketingowa, subskrybujZgode, zgodaNaSerwerze } from './zgoda';

/**
 * Piksel Meta — ładowany dopiero po zgodzie na reklamę.
 *
 * Identyfikator siedzi w `NEXT_PUBLIC_META_PIXEL_ID`. Bez niego komponent nie
 * robi nic, więc lokalnie i w podglądach na Vercelu nic nie trafia do Mety.
 *
 * `autoConfig` wyłączony: piksel nie zbiera sam kliknięć ani treści strony,
 * wysyłamy tylko to, co wpisaliśmy w kod — odsłony i zapis na listę.
 */

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Odsłony przy przechodzeniu między stronami — ta sama zasada co w GA4:
 * pierwszą wysyła skrypt startowy, tutaj tylko kolejne przejścia.
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
    if (!PIXEL_ID || !window.fbq) return;
    window.fbq('track', 'PageView');
  }, [sciezka, parametry]);

  return null;
}

export function MetaPixel() {
  const zgoda = useSyncExternalStore(subskrybujZgode, odczytajZgodeMarketingowa, zgodaNaSerwerze);

  if (!PIXEL_ID || zgoda !== 'tak') return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('set', 'autoConfig', false, '${PIXEL_ID}');
          fbq('init', '${PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <Suspense fallback={null}>
        <OdslonyStron />
      </Suspense>
    </>
  );
}
