'use client';

import { useEffect, useRef } from 'react';

/**
 * Film w pętli bez dźwięku, który rusza dopiero, gdy czytelnik do niego
 * dojedzie, i zatrzymuje się, gdy go minie. Dźwięk i pełny ekran zostają
 * w natywnych kontrolkach — przeglądarka i tak nie pozwoli wystartować
 * z dźwiękiem bez kliknięcia.
 *
 * Przy `prefers-reduced-motion` film sam nie rusza; stoi na kadrze
 * startowym i czeka na „odtwórz".
 */
export function Film({
  src,
  poster,
  label,
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Po kliknięciu „pauza" nie wznawiamy filmu przy kolejnym przewinięciu.
    let zatrzymanyRecznie = false;
    const naPauze = () => {
      if (video.dataset.auto !== 'pauza') zatrzymanyRecznie = true;
      delete video.dataset.auto;
    };
    video.addEventListener('pause', naPauze);

    const obserwator = new IntersectionObserver(
      ([wpis]) => {
        if (wpis.isIntersecting) {
          if (!zatrzymanyRecznie) video.play().catch(() => {});
        } else if (!video.paused) {
          video.dataset.auto = 'pauza';
          video.pause();
        }
      },
      { threshold: 0.4 },
    );
    obserwator.observe(video);
    return () => {
      obserwator.disconnect();
      video.removeEventListener('pause', naPauze);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      aria-label={label}
      className="block aspect-video w-full bg-ink"
      muted
      loop
      playsInline
      controls
      preload="metadata"
    />
  );
}
