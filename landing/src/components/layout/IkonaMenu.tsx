/**
 * Znak menu — dwie kreski, które składają się w krzyżyk.
 *
 * Dwie, nie trzy, i to jest wybór na rzecz samego ruchu. Przy trzech kreskach
 * środkowa musi zniknąć, zanim skrajne zdążą się obrócić — inaczej przecina
 * powstający krzyżyk. Gaśnięcie w tle obrotu zawsze wygląda jak dwie animacje
 * naraz. Przy dwóch kreskach nie ma czego chować: te same dwa elementy
 * zjeżdżają do środka i obracają się o ±45°, więc widać jeden ciągły ruch,
 * a zamknięcie jest nim odtworzonym wstecz.
 *
 * Krzywa `cubic-bezier(0.16, 1, 0.3, 1)` jest ta sama, co przy wjeździe sekcji
 * i cyfrach licznika: szybki start, spokojne dojście.
 *
 * Przy `prefers-reduced-motion` przejścia skraca globalna reguła
 * z `globals.css` — stan zmienia się wtedy natychmiast i nic tu nie trzeba
 * dopisywać.
 *
 * ## Lista animowanych właściwości
 *
 * Tailwind 4 nie składa już `transform`, tylko ustawia osobne właściwości:
 * `rotate: 45deg`, `translate: …`. Napisane z rozpędu
 * `transition-[transform,opacity]` animowałoby więc właściwość, której te
 * klasy w ogóle nie dotykają, a kreski przeskakiwałyby z 0° na 45° w jednej
 * klatce. Wyglądało to na działającą animację dopóki nie zmierzyło się kątów
 * w trakcie przejścia.
 *
 * ## Geometria
 *
 * Pudło ma 20 px, kreska 2 px, `top-1/2` stawia jej górną krawędź na 10 px.
 * Środek kreski wypada więc na 11 px i `-translate-y-px` sprowadza go na 10.
 * Stan zamknięty rozsuwa kreski o 4 px w każdą stronę — razem 8 px odstępu.
 * Wartości w pikselach, nie w procentach: przy kresce wysokiej na 2 px `-50%`
 * to raptem 1 px i mieszanie jednostek tylko utrudnia czytanie.
 */

const KRESKA =
  'absolute top-1/2 left-0 h-0.5 w-5 rounded-full duration-300 transition-[rotate,translate] ease-[cubic-bezier(0.16,1,0.3,1)]';

export function IkonaMenu({
  otwarte,
  className = 'bg-ink',
}: {
  otwarte: boolean;
  /** Kolor kresek — na jasnym pasku `bg-ink`, na ciemnej listwie `bg-paper`. */
  className?: string;
}) {
  return (
    <span aria-hidden className="relative block size-5">
      <span
        className={`${KRESKA} ${className} ${
          otwarte ? '-translate-y-px rotate-45' : '-translate-y-[5px] rotate-0'
        }`}
      />
      <span
        className={`${KRESKA} ${className} ${
          otwarte ? '-translate-y-px -rotate-45' : 'translate-y-[3px] rotate-0'
        }`}
      />
    </span>
  );
}
