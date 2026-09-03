'use client';

import { useEffect, useRef } from 'react';

/**
 * Płynące kształty — tło karty „Z BusiKM" na stronie głównej.
 *
 * Pięć miękkich brył dryfuje po ciemnym tle, zmieniając kształt i przenikając
 * się nawzajem. Rysowane na canvasie 2D, bez żadnej biblioteki.
 *
 * ## Paleta
 *
 * Świadomie **poza systemem znaczeń**. W BusiKM bursztyn znaczy „dokument
 * zaraz wygaśnie", czerwień „przerwa w usłudze", zieleń „gotowe" — użycie
 * ich do dekoracji odebrałoby im to znaczenie wszędzie indziej. Zostaje
 * niebieski marki jako kotwica plus fiolet i morski, których nie ma nigdzie
 * poza tą kartą.
 *
 * Kolory są nasycone, bo czytelność tekstu załatwia osobne przyciemnienie
 * w miejscach, gdzie tekst faktycznie leży — góra i dół karty. Środek
 * zostaje w pełni odsłonięty. Sprawdzane pomiarem wyrenderowanych pikseli
 * w kilkudziesięciu klatkach, nie na oko.
 *
 * ## Jak to jest liczone
 *
 * Bryły powstają na osobnym płótnie **czterokrotnie mniejszym**, a potem są
 * rozciągane na docelowy rozmiar z jednym rozmyciem. Dzięki temu na klatkę
 * przypada kilkanaście tysięcy pikseli zamiast kilkuset tysięcy, a miękkość
 * krawędzi bierze się z samego skalowania, nie z kosztownego filtra na
 * każdej bryle.
 *
 * Animacja zatrzymuje się, gdy karta wyjedzie z ekranu albo gdy karta
 * przeglądarki zejdzie na drugi plan. Przy `prefers-reduced-motion`
 * rysujemy jedną nieruchomą klatkę.
 */

type Bryla = {
  /** Środek w ułamkach szerokości i wysokości — układ trzyma się przy zmianie rozmiaru. */
  x: number;
  y: number;
  /** Promień jako ułamek krótszego boku. */
  r: number;
  /** Ile wypustek ma kontur — stąd „różne kształty", a nie pięć kółek. */
  loby: number;
  /** Jak mocno kontur faluje. */
  amplituda: number;
  /** Prędkość dryfu i obrotu; różne, żeby ruch nigdy się nie zapętlał widocznie. */
  tempo: number;
  faza: number;
  kolor: string;
};

const BRYLY: Bryla[] = [
  { x: 0.20, y: 0.34, r: 0.60, loby: 3, amplituda: 0.30, tempo: 0.055, faza: 0.0, kolor: '#0B5FFF' },
  { x: 0.76, y: 0.26, r: 0.52, loby: 5, amplituda: 0.36, tempo: 0.041, faza: 1.7, kolor: '#8B2BF0' },
  { x: 0.82, y: 0.68, r: 0.54, loby: 4, amplituda: 0.32, tempo: 0.067, faza: 3.1, kolor: '#00C2D4' },
  { x: 0.32, y: 0.74, r: 0.48, loby: 6, amplituda: 0.38, tempo: 0.049, faza: 4.4, kolor: '#E0189B' },
  { x: 0.52, y: 0.46, r: 0.42, loby: 4, amplituda: 0.34, tempo: 0.073, faza: 5.6, kolor: '#3D5BFF' },
];

/** Ile razy mniejsze płótno robocze. Wyżej = taniej i bardziej miękko. */
const SKALA = 3;
/** Tło karty — ten sam `--color-ink`, co reszta ciemnych sekcji. */
const TLO = '#0A0A0B';

function rysuj(
  ctx: CanvasRenderingContext2D,
  robocze: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
) {
  const rw = robocze.canvas.width;
  const rh = robocze.canvas.height;
  const bok = Math.min(rw, rh);

  robocze.globalCompositeOperation = 'source-over';
  robocze.fillStyle = TLO;
  robocze.fillRect(0, 0, rw, rh);

  // `lighter` sumuje kanały, więc nachodzące bryły rozjaśniają się w miejscu
  // przecięcia — stąd wrażenie przenikania, a nie nakładania kartek.
  robocze.globalCompositeOperation = 'lighter';

  for (const b of BRYLY) {
    const dryf = t * b.tempo;
    const cx = (b.x + Math.sin(dryf + b.faza) * 0.09) * rw;
    const cy = (b.y + Math.cos(dryf * 0.83 + b.faza) * 0.09) * rh;
    const promien = b.r * bok;

    robocze.beginPath();
    const KROKI = 72;
    for (let i = 0; i <= KROKI; i++) {
      const kat = (i / KROKI) * Math.PI * 2;
      // Dwa nakładające się sinusy o różnych okresach — kontur faluje
      // nieregularnie i nie wraca do tej samej formy.
      const fala =
        1 +
        Math.sin(kat * b.loby + dryf * 2.1 + b.faza) * b.amplituda +
        Math.sin(kat * (b.loby + 2) - dryf * 1.3) * b.amplituda * 0.4;
      const r = promien * fala * 0.62;
      const x = cx + Math.cos(kat) * r;
      const y = cy + Math.sin(kat) * r;
      if (i === 0) robocze.moveTo(x, y);
      else robocze.lineTo(x, y);
    }
    robocze.closePath();

    // Rdzeń pełnym kolorem, dopiero zewnętrzna trzecia część wygasa —
    // inaczej przy `lighter` bryła jest ledwo widoczną poświatą zamiast
    // wyraźnym kształtem.
    const g = robocze.createRadialGradient(cx, cy, 0, cx, cy, promien);
    g.addColorStop(0, b.kolor);
    g.addColorStop(0.45, b.kolor);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    robocze.fillStyle = g;
    robocze.fill();
  }

  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, w, h);
  ctx.filter = 'blur(10px)';
  ctx.drawImage(robocze.canvas, 0, 0, w, h);
  ctx.filter = 'none';
}

export function PlynaceKsztalty({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const robocze = document.createElement('canvas').getContext('2d', { alpha: false });
    if (!robocze) return;

    // Piksele urządzenia ograniczone do 2 — na telefonach z DPR 3 i 4 dalsze
    // zagęszczanie nic nie wnosi, a kosztuje wprost proporcjonalnie.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let klatka = 0;
    let widoczna = true;
    let ruch = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const wymiaruj = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width || !r.height) return;
      w = Math.round(r.width * dpr);
      h = Math.round(r.height * dpr);
      canvas.width = w;
      canvas.height = h;
      robocze.canvas.width = Math.max(2, Math.round(w / SKALA));
      robocze.canvas.height = Math.max(2, Math.round(h / SKALA));
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      rysuj(ctx, robocze, w, h, klatka);
    };

    let start: number | null = null;
    const petla = (czas: number) => {
      if (start === null) start = czas;
      klatka = (czas - start) / 1000;
      rysuj(ctx, robocze, w, h, klatka);
      if (ruch && widoczna) uchwyt = requestAnimationFrame(petla);
    };
    let uchwyt = 0;

    const wznow = () => {
      cancelAnimationFrame(uchwyt);
      if (!ruch || !widoczna) return;
      start = null;
      uchwyt = requestAnimationFrame(petla);
    };

    const ro = new ResizeObserver(wymiaruj);
    ro.observe(canvas);

    // Poza ekranem nie ma po co liczyć — karta stoi w połowie strony.
    const io = new IntersectionObserver(
      ([w]) => {
        widoczna = w.isIntersecting;
        wznow();
      },
      { rootMargin: '120px' },
    );
    io.observe(canvas);

    const naKarcie = () => {
      widoczna = !document.hidden;
      wznow();
    };
    document.addEventListener('visibilitychange', naKarcie);

    const pm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const naRuchu = () => {
      ruch = !pm.matches;
      wznow();
      if (!ruch) rysuj(ctx, robocze, w, h, 0);
    };
    pm.addEventListener('change', naRuchu);

    wymiaruj();
    wznow();

    return () => {
      cancelAnimationFrame(uchwyt);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', naKarcie);
      pm.removeEventListener('change', naRuchu);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`absolute inset-0 size-full ${className}`}
      // Płótno jest dekoracją — bez tego zabrałoby kliknięcia odnośnikom,
      // gdyby kiedyś w karcie takie się pojawiły.
      style={{ pointerEvents: 'none' }}
    />
  );
}
