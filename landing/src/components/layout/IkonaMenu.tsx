/**
 * Znak menu — trzy kreski, które składają się w krzyżyk.
 *
 * Wcześniej były dwie kreski, a po otwarciu podmieniał je znak „×" wstawiony
 * jako tekst. Podmiana była skokowa i nie niosła żadnej informacji o tym, co
 * się właśnie stało.
 *
 * Teraz to jeden i ten sam obiekt w dwóch stanach: skrajne kreski zjeżdżają
 * do środka i obracają się w krzyżyk, środkowa znika zapadając się wszerz.
 * Ruch mówi wprost „to samo miejsce, inny stan", zamiast wymieniać ikonę na
 * inną — i dzięki temu zamknięcie jest po prostu tym ruchem odtworzonym
 * wstecz.
 *
 * Krzywa `cubic-bezier(0.16, 1, 0.3, 1)` jest ta sama, co przy wjeździe
 * sekcji i cyfrach licznika: szybki start, spokojne dojście. Środkowa kreska
 * gaśnie krócej niż trwa obrót, żeby nie przecinać powstającego krzyżyka.
 *
 * Przy `prefers-reduced-motion` przejścia skraca globalna reguła
 * z `globals.css` — stan zmienia się wtedy natychmiast i nic tu nie trzeba
 * dopisywać.
 */

/**
 * Lista animowanych właściwości jest tu istotna i łatwo ją przeoczyć.
 *
 * Tailwind 4 nie składa już `transform`, tylko ustawia osobne właściwości:
 * `rotate: 45deg`, `translate: …`, `scale: …`. Napisane z rozpędu
 * `transition-[transform,opacity]` animowało więc właściwość, której te klasy
 * w ogóle nie dotykają — środkowa kreska gasła płynnie, a skrajne przeskakiwały
 * z 0° na 45° w jednej klatce. Wyglądało to jak działająca animacja dopóki nie
 * zmierzyło się kątów w trakcie przejścia.
 *
 * Przesunięcia trzymamy w pikselach, nie w procentach: kreska ma 2 px wysokości,
 * więc `-50%` to raptem 1 px i mieszanie jednostek tylko utrudniałoby czytanie
 * tych wartości.
 */
const KRESKA =
  'absolute top-1/2 left-0 h-0.5 w-5 rounded-full transition-[rotate,translate,scale,opacity] ease-[cubic-bezier(0.16,1,0.3,1)]';

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
        className={`${KRESKA} ${className} duration-300 ${
          otwarte ? '-translate-y-px rotate-45' : '-translate-y-[7px] rotate-0'
        }`}
      />
      <span
        className={`${KRESKA} ${className} -translate-y-px duration-200 ${
          otwarte ? 'scale-x-0 opacity-0' : 'scale-x-100 opacity-100'
        }`}
      />
      <span
        className={`${KRESKA} ${className} duration-300 ${
          otwarte ? '-translate-y-px -rotate-45' : 'translate-y-[5px] rotate-0'
        }`}
      />
    </span>
  );
}
