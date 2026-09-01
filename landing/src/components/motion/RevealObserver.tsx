'use client';

import { useEffect } from 'react';

/**
 * Wejście treści przy przewijaniu — poziom 1 z docs/landing/06-animacje.md.
 *
 * Obserwuje `[data-reveal]`, nadaje `.is-visible` i przestaje obserwować.
 * Kaskadę w grupie ustawia zmienna `--i` nadawana dzieciom `[data-reveal-group]`.
 *
 * Stan ukryty włącza się wyłącznie wtedy, gdy JavaScript wystartował
 * (atrybut `data-reveal="on"` ustawiany skryptem w `layout.tsx`) — bez niego
 * strona jest w całości widoczna.
 */
export function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      document.documentElement.removeAttribute('data-reveal');
      return;
    }

    // Kaskada: dzieci grupy dostają kolejne opóźnienia.
    document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        if (child instanceof HTMLElement && child.hasAttribute('data-reveal')) {
          child.style.setProperty('--i', String(Math.min(i, 5)));
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      // Element wchodzi, gdy jego góra minie 88% wysokości okna.
      { rootMargin: '0px 0px -12% 0px', threshold: 0 },
    );

    const targets = document.querySelectorAll('[data-reveal]');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
