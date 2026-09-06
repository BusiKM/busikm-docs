'use client';

import { useEffect, useState } from 'react';
import { kotwicaRozdzialu } from '@/content/pomoc/typy';

/**
 * Spis rozdziałów artykułu — przyklejony na desktopie, składany na telefonie.
 *
 * Instrukcja czyta się inaczej niż tekst ciągły: człowiek szuka jednego
 * rozdziału, robi to, co tam napisano, i wraca po następny. Dlatego spis
 * zostaje na ekranie, a aktywna pozycja idzie z obserwatora przecięć.
 *
 * Ten sam wzorzec, co w dokumentach prawnych — z jedną różnicą: tam
 * numerujemy paragrafy, tu nie ma czego numerować, bo rozdziały są etapami
 * jednej czynności, a nie punktami umowy.
 */
export function SpisRozdzialow({ rozdzialy }: { rozdzialy: { tytul: string }[] }) {
  const [aktywny, setAktywny] = useState(rozdzialy[0]?.tytul ?? '');
  const [otwarty, setOtwarty] = useState(false);

  useEffect(() => {
    const mapa = new Map(rozdzialy.map((r) => [kotwicaRozdzialu(r.tytul), r.tytul]));

    const naglowki = rozdzialy
      .map((r) => document.getElementById(kotwicaRozdzialu(r.tytul)))
      .filter((e): e is HTMLElement => Boolean(e));
    if (naglowki.length === 0) return;

    const io = new IntersectionObserver(
      (wpisy) => {
        const widoczne = wpisy.filter((w) => w.isIntersecting);
        if (widoczne.length > 0)
          setAktywny((biezacy) => mapa.get(widoczne[0].target.id) ?? biezacy);
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    naglowki.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [rozdzialy]);

  if (rozdzialy.length < 2) return null;

  const pozycje = (
    <ol className="flex flex-col gap-1">
      {rozdzialy.map((r) => {
        const czynny = aktywny === r.tytul;
        return (
          <li key={r.tytul}>
            <a
              href={`#${kotwicaRozdzialu(r.tytul)}`}
              onClick={() => setOtwarty(false)}
              className={`block rounded-lg px-3 py-2 text-[14px] leading-snug transition-colors lg:text-[15px] ${
                czynny ? 'bg-blue-soft font-medium text-blue-dark' : 'text-muted hover:text-ink'
              }`}
            >
              {r.tytul}
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
          W tym artykule · {rozdzialy.length}{' '}
          {rozdzialy.length < 5 ? 'rozdziały' : 'rozdziałów'}
        </summary>
        <div className="px-2 pb-3">{pozycje}</div>
      </details>

      <nav aria-label="W tym artykule" className="hidden lg:sticky lg:top-28 lg:block">
        <div className="mb-4 text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
          W tym artykule
        </div>
        {pozycje}
      </nav>
    </>
  );
}
