'use client';

import { useEffect, useRef, useState } from 'react';

type StickySceneProps = {
  /** Ile taktów ma scena — tyle razy podmienia się treść. */
  beats: number;
  /** Renderuje treść dla aktywnego taktu. */
  children: (active: number) => React.ReactNode;
  className?: string;
};

/**
 * Scena przyklejona — poziom 3 z docs/landing/06-animacje.md.
 *
 * Sekcja trzyma się ekranu przez `beats` taktów przewijania, a w środku
 * podmienia się treść. Używamy jej dokładnie trzy razy na stronie głównej:
 * „Cztery osoby", „Aplikacja kierowcy", „Trzy ruchy".
 *
 * Poniżej `lg` i przy `prefers-reduced-motion` scena wyłącza się sama —
 * takty lecą jeden pod drugim jako zwykłe sekcje. Przewijania nie
 * przechwytujemy nigdy.
 */
export function StickyScene({ beats, children, className = '' }: StickySceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wide = window.matchMedia('(min-width: 1024px)');

    const apply = () => setEnabled(motionOk && wide.matches);
    apply();
    wide.addEventListener('change', apply);
    return () => wide.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      // Postęp od chwili, gdy góra sceny dotknie górnej krawędzi okna.
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return;

      const progress = Math.min(Math.max(-rect.top / travel, 0), 0.999);
      setActive(Math.floor(progress * beats));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled, beats]);

  if (!enabled) {
    return (
      <div className={className}>
        {Array.from({ length: beats }, (_, i) => (
          <div key={i}>{children(i)}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height: `${(beats + 1) * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {children(active)}
      </div>
    </div>
  );
}
