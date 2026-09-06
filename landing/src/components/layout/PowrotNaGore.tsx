'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Kliknięcie w odnośnik do strony, na której już jesteśmy, wraca na górę.
 *
 * ## Co naprawia
 *
 * W App Routerze odnośnik prowadzący do bieżącej trasy nie wywołuje
 * nawigacji — router widzi ten sam adres i nie robi nic. Nie ma więc czego
 * przewijać: klikasz znak BusiKM będąc na stronie głównej i strona stoi
 * w miejscu, jakby przycisk był martwy.
 *
 * Przeglądarka robi to samo przy zwykłym `<a>`, tyle że tam odświeża stronę
 * i przewinięcie wraca samo. Tutaj nie wraca nic.
 *
 * ## Dlaczego jeden nasłuch, a nie `onClick` przy każdym odnośniku
 *
 * Sam nagłówek ma ponad dwadzieścia odnośników, do tego stopka i treść stron.
 * Doklejanie obsługi do każdego z osobna znaczyłoby, że pierwszy dopisany
 * później odnośnik znów będzie martwy — a nikt tego nie zauważy, bo usterka
 * objawia się wyłącznie na stronie, na której się już jest.
 *
 * Jeden nasłuch w fazie bąbelkowania obsługuje wszystkie, także te dopisane
 * w przyszłości.
 *
 * ## Czego celowo nie dotyka
 *
 * Nie sprawdzamy `defaultPrevented` na wejściu i to jest istotne: Next `Link`
 * wywołuje `preventDefault()` we własnym uchwycie na elemencie, a ten biegnie
 * przed nasłuchem na `document`. Wycofanie się w tym miejscu blokowałoby
 * poprawkę dokładnie tam, gdzie jest potrzebna — przy każdym odnośniku Nexta.
 *
 * Odpuszczamy wszystko, co nie jest zwykłym przejściem wewnątrz serwisu:
 * kliknięcia z modyfikatorem (otwarcie w nowej karcie), środkowy przycisk,
 * `target="_blank"`, adresy zewnętrzne, `mailto:` i `tel:` oraz kotwice —
 * te ostatnie mają własny cel i przewijanie na górę byłoby ich zaprzeczeniem.
 *
 * Sposób przewijania zostawiamy CSS-owi: `scroll-behavior` w `globals.css`
 * jest płynne, a przy wyłączonym ruchu w systemie natychmiastowe. Dlatego
 * `scrollTo` nie dostaje tu `behavior` — inaczej nadpisałoby tę decyzję.
 */
export function PowrotNaGore() {
  const pathname = usePathname();

  useEffect(() => {
    const naKlik = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const odnosnik = (e.target as Element | null)?.closest?.('a');
      if (!odnosnik) return;

      const cel = odnosnik.getAttribute('target');
      if (cel && cel !== '_self') return;
      if (odnosnik.hasAttribute('download')) return;

      const surowy = odnosnik.getAttribute('href');
      if (!surowy || surowy.startsWith('#')) return;

      let adres: URL;
      try {
        adres = new URL(odnosnik.href, window.location.href);
      } catch {
        return;
      }

      if (adres.origin !== window.location.origin) return;
      if (adres.hash) return;
      if (adres.pathname !== pathname) return;
      if (window.scrollY === 0) return;

      // `preventDefault` tylko wtedy, gdy nikt nas nie uprzedził. Next `Link`
      // robi to sam w uchwycie na elemencie i po swojemu nic nie przewija —
      // nam zostaje samo przewinięcie. Przy zwykłym `<a>` musimy zatrzymać
      // przeładowanie strony, bo inaczej byłby to zwykły powrót na górę
      // okupiony pełnym odświeżeniem.
      if (!e.defaultPrevented) e.preventDefault();
      window.scrollTo({ top: 0 });
    };

    document.addEventListener('click', naKlik);
    return () => document.removeEventListener('click', naKlik);
  }, [pathname]);

  return null;
}
