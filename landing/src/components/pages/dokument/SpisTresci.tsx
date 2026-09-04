'use client';

import { useEffect, useState } from 'react';
import { kotwica, type Paragraf } from '@/content/dokumenty/typy';

/**
 * Spis treści — przyklejony na desktopie, składany na telefonie.
 *
 * Aktywna pozycja idzie z obserwatora przecięć: dokument prawny czyta się
 * długo i łatwo zgubić miejsce, w którym się jest.
 */
export function SpisTresci({ paragrafy }: { paragrafy: Paragraf[] }) {
  const [aktywny, setAktywny] = useState(paragrafy[0]?.numer ?? '');
  const [otwarty, setOtwarty] = useState(false);

  useEffect(() => {
    // Mapa budowana w środku: zależy wyłącznie od `paragrafy`, a tworzona
    // przy renderze byłaby za każdym razem nową referencją.
    const mapaKotwic = new Map(paragrafy.map((p) => [kotwica(p.numer), p.numer]));

    const naglowki = paragrafy
      .map((p) => document.getElementById(kotwica(p.numer)))
      .filter((e): e is HTMLElement => Boolean(e));
    if (naglowki.length === 0) return;

    const io = new IntersectionObserver(
      (wpisy) => {
        const widoczne = wpisy.filter((w) => w.isIntersecting);
        // Aktualizacja funkcyjna, nie odczyt z domknięcia: `aktywny` zostawał
        // tam z pierwszego renderu, więc nieudane wyszukanie kotwicy cofało
        // spis do pierwszej pozycji zamiast zostawić bieżącą.
        if (widoczne.length > 0)
          setAktywny((biezacy) => mapaKotwic.get(widoczne[0].target.id) ?? biezacy);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    naglowki.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [paragrafy]);

  const pozycje = (
    <ol className="flex flex-col gap-1">
      {paragrafy.map((p) => {
        const czynny = aktywny === p.numer;
        return (
          <li key={p.numer}>
            <a
              href={`#${kotwica(p.numer)}`}
              onClick={() => setOtwarty(false)}
              className={`flex gap-2.5 rounded-lg px-3 py-2 text-[14px] leading-snug transition-colors lg:text-[15px] ${
                czynny ? 'bg-blue-soft font-medium text-blue-dark' : 'text-muted hover:text-ink'
              }`}
            >
              <span className="flex-none tabular-nums">{p.numer}</span>
              <span>{p.tytul}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <details
        open={otwarty}
        onToggle={(e) => setOtwarty((e.currentTarget as HTMLDetailsElement).open)}
        className="rounded-card border border-line bg-white lg:hidden"
      >
        <summary className="cursor-pointer list-none px-4 py-3.5 text-[15px] font-semibold">
          Spis treści · {paragrafy.length}{' '}
          {paragrafy.length === 1 ? 'punkt' : paragrafy.length < 5 ? 'punkty' : 'punktów'}
        </summary>
        <div className="px-2 pb-3">{pozycje}</div>
      </details>

      <nav aria-label="Spis treści" className="hidden lg:sticky lg:top-28 lg:block">
        <div className="mb-4 text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
          Spis treści
        </div>
        {pozycje}
      </nav>
    </>
  );
}
