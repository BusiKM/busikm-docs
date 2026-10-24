'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

/**
 * Zrzut aplikacji w pudle makiety z podglądem na cały ekran.
 *
 * Na stronie makieta jest mała – laptop zajmuje pół kolumny, więc tekstu
 * na ekranie aplikacji nie da się przeczytać. Kliknięcie w makietę albo
 * w lupę w rogu otwiera ten sam plik w pełnej rozdzielczości nad stroną.
 * Zamyka się kliknięciem w dowolne miejsce, klawiszem Esc albo krzyżykiem.
 */
export function Makieta({
  src,
  alt,
  sizes,
  unoptimized,
  imgClassName,
  imgStyle,
  etykietaPowieksz,
  etykietaZamknij,
  laptop = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  unoptimized: boolean;
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
  etykietaPowieksz: string;
  etykietaZamknij: string;
  /** Makieta w ramce laptopa 2016x1270 – lupa siada w rogu ekranu, nie pudła. */
  laptop?: boolean;
}) {
  const okno = useRef<HTMLDialogElement>(null);
  // Obraz w pełnej rozdzielczości trafia do dokumentu dopiero po pierwszym
  // otwarciu. Ukryty <dialog> nie wstrzymuje pobierania <img>, więc bez tego
  // każda makieta ściągała się dwa razy – raz zoptymalizowana na stronie,
  // raz jako pełny PNG – i strona główna ważyła prawie 8 MB (Lighthouse w CI).
  const [otwierany, setOtwierany] = useState(false);
  const otworz = () => {
    setOtwierany(true);
    okno.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={otworz}
        aria-label={`${etykietaPowieksz}: ${alt}`}
        className="group absolute inset-0 block cursor-zoom-in"
        style={{ containerType: 'size' }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className={imgClassName} style={imgStyle} unoptimized={unoptimized} />
        {laptop ? (
          // Pudło bywa 4:3, a laptop 16:10 – róg pudła wypada wtedy w pustym
          // marginesie pod laptopem. Wewnętrzna warstwa ma proporcje pliku,
          // a lupa stoi w rogu ekranu (ekran: 238..1778 x 76..1022 px).
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: 'min(100cqw, calc(100cqh * 2016 / 1270))', aspectRatio: '2016 / 1270' }}
          >
            <Lupa className="right-[13.5%] bottom-[22%]" />
          </span>
        ) : (
          <Lupa className="right-2 bottom-2 lg:right-3 lg:bottom-3" />
        )}
      </button>

      <dialog
        ref={okno}
        // Zamyka kliknięcie w dowolne miejsce – w obraz też. Nikt nie szuka
        // krzyżyka w rogu ekranu, kiedy obraz i tak zajmuje cały widok.
        onClick={() => okno.current?.close()}
        className="m-auto cursor-zoom-out max-h-[94vh] max-w-[96vw] overflow-visible bg-transparent p-0 backdrop:bg-ink/80 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          {otwierany && (
            // eslint-disable-next-line @next/next/no-img-element -- pełna rozdzielczość pliku, bez optymalizatora
            <img src={src} alt={alt} className="block max-h-[94vh] w-auto max-w-[96vw] object-contain" />
          )}
          <button
            type="button"
            onClick={() => okno.current?.close()}
            aria-label={etykietaZamknij}
            className="absolute top-2 right-2 flex size-10 items-center justify-center rounded-full bg-ink/80 text-paper shadow-card"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      </dialog>
    </>
  );
}

function Lupa({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute flex size-8 items-center justify-center rounded-full bg-ink/70 text-paper opacity-80 shadow-card backdrop-blur transition-opacity group-hover:opacity-100 lg:size-9 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5M11 8v6M8 11h6" />
      </svg>
    </span>
  );
}
