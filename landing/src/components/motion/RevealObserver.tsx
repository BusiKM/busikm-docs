'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Wejście treści przy przewijaniu — poziom 1 z docs/landing/06-animacje.md.
 *
 * Obserwuje `[data-reveal]`, nadaje `.is-visible` i przestaje obserwować.
 * Kaskadę w grupie ustawia zmienna `--i` nadawana dzieciom `[data-reveal-group]`.
 *
 * Stan ukryty włącza się wyłącznie wtedy, gdy JavaScript wystartował
 * (atrybut `data-reveal="on"` ustawiany skryptem w `layout.tsx`) — bez niego
 * strona jest w całości widoczna.
 *
 * Dwie rzeczy, bez których treść potrafi zostać niewidoczna:
 *
 * 1. Obserwator startuje na nowo przy każdej zmianie adresu. Komponent siedzi
 *    w głównym układzie, który przy przejściu między stronami nie jest
 *    montowany ponownie — bez `pathname` w zależnościach nowa strona nigdy
 *    nie trafiłaby pod obserwację i zostałaby przy `opacity: 0`.
 * 2. Węzły dokładane później (strumieniowanie, Suspense) łapie
 *    `MutationObserver`.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;

    // Bez obserwatora albo przy prośbie o mniej ruchu pokazujemy wszystko od razu.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      root.removeAttribute('data-reveal');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      },
      // Element wchodzi, gdy jego góra minie 88% wysokości okna.
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );

    /** Kaskada w grupie plus objęcie obserwacją wszystkiego, co jeszcze ukryte. */
    const zbierz = (zakres: ParentNode) => {
      zakres.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((grupa) => {
        Array.from(grupa.children).forEach((dziecko, i) => {
          if (dziecko instanceof HTMLElement && dziecko.hasAttribute('data-reveal')) {
            dziecko.style.setProperty('--i', String(Math.min(i, 5)));
          }
        });
      });

      zakres
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach((el) => io.observe(el));
    };

    zbierz(document);

    const mo = new MutationObserver((zmiany) => {
      for (const zmiana of zmiany) {
        for (const wezel of zmiana.addedNodes) {
          if (!(wezel instanceof HTMLElement)) continue;
          if (wezel.hasAttribute('data-reveal') && !wezel.classList.contains('is-visible')) {
            io.observe(wezel);
          }
          zbierz(wezel);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
