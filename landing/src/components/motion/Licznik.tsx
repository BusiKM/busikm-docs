'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Licznik kwoty — cyfry przetaczają się przy zmianie okresu rozliczenia.
 *
 * Kwota nie podmienia się skokiem: dolicza od poprzedniej wartości do nowej,
 * a każda cyfra, która się po drodze zmienia, wjeżdża od dołu i wypycha
 * poprzednią do góry. Jedności przewijają się dziesiątki razy, tysiące raz —
 * dlatego kaskada bierze się sama z doliczania, bez ręcznych opóźnień.
 *
 * ## Czego tu nie ma i dlaczego
 *
 * Pierwsza wersja stawiała taśmę cyfr na **ułamkowej** pozycji
 * `liczba / 10^i mod 10`, jak w mechanicznym liczniku. Wygląda to dobrze
 * w ruchu i jest błędne w spoczynku: przy 1490 kolumna setek wypada na 4,90,
 * czyli w połowie drogi między 4 a 5. Na ekranie widać było „590" zamiast
 * „490". Ułamek nie niesie tam ruchu, tylko wartość niższych cyfr.
 *
 * Dlatego kolumna stoi zawsze na całkowitej cyfrze, a ruch robi wjazd
 * i wyjazd dwóch warstw. Wynik w spoczynku jest zawsze dokładny.
 *
 * Przy `prefers-reduced-motion` kwota zmienia się od razu.
 */

/** Ile trwa doliczenie. Dłużej wygląda ślamazarnie, krócej gubi efekt. */
const CZAS = 850;

/** Wyhamowanie na końcu — ostatnie cyfry siadają spokojnie, bez odbicia. */
const wyhamuj = (t: number) => 1 - Math.pow(1 - t, 5);

const dlugosc = (n: number) => Math.max(1, Math.floor(Math.log10(Math.max(1, n))) + 1);

/** Jedna kolumna cyfr. Trzyma poprzednią wartość, żeby ją wypchnąć w górę. */
function Kolumna({ cyfra, widoczna }: { cyfra: number; widoczna: boolean }) {
  const [stan, setStan] = useState({ teraz: cyfra, przed: cyfra, obrot: 0 });

  // Poprawka stanu w trakcie renderu, nie w efekcie. React przerywa wtedy
  // render i powtarza go z nową wartością, zanim cokolwiek trafi na ekran —
  // przez efekt stara cyfra mignęłaby przez jedną klatkę przed animacją.
  if (stan.teraz !== cyfra) {
    setStan({ teraz: cyfra, przed: stan.teraz, obrot: stan.obrot + 1 });
  }

  return (
    <span
      aria-hidden
      className="relative inline-block overflow-hidden align-top transition-[width,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ height: '1em', width: widoczna ? '0.62em' : '0em', opacity: widoczna ? 1 : 0 }}
    >
      {/* Klucz z numerem obrotu wymusza ponowne uruchomienie animacji przy
          każdej zmianie cyfry — bez niego druga zmiana z rzędu nie ruszyłaby. */}
      {stan.obrot > 0 && (
        <span
          key={`w-${stan.obrot}`}
          className="cyfra-wyjazd absolute inset-0 flex items-start justify-center"
        >
          {stan.przed}
        </span>
      )}
      <span
        key={`t-${stan.obrot}`}
        className={`absolute inset-0 flex items-start justify-center ${
          stan.obrot > 0 ? 'cyfra-wjazd' : ''
        }`}
      >
        {stan.teraz}
      </span>
    </span>
  );
}

export function Licznik({
  wartosc,
  className = '',
}: {
  /** Kwota w złotych, bez separatorów — formatowanie robi komponent. */
  wartosc: number;
  className?: string;
}) {
  const [biezaca, setBiezaca] = useState(wartosc);
  const zrodlo = useRef(wartosc);
  const uchwyt = useRef(0);

  useEffect(() => {
    const od = zrodlo.current;
    if (od === wartosc) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      zrodlo.current = wartosc;
      // Wyjątek świadomy. Reguła broni przed kaskadą renderów, a to jest
      // sterownik animacji: efekt synchronizuje stan Reacta z zegarem
      // przeglądarki (rAF) i o to w efektach chodzi. Ta gałąź to w dodatku
      // pojedynczy skok do wartości docelowej dla kogoś, kto wyłączył ruch
      // w systemie — nie pętla. Przepuszczenie jej przez rAF opóźniłoby
      // kwotę o klatkę dokładnie tym osobom, które prosiły o brak animacji.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBiezaca(wartosc);
      return;
    }

    let start: number | null = null;
    const krok = (czas: number) => {
      if (start === null) start = czas;
      const t = Math.min(1, (czas - start) / CZAS);
      setBiezaca(Math.round(od + (wartosc - od) * wyhamuj(t)));
      if (t < 1) uchwyt.current = requestAnimationFrame(krok);
      else {
        zrodlo.current = wartosc;
        setBiezaca(wartosc);
      }
    };
    cancelAnimationFrame(uchwyt.current);
    uchwyt.current = requestAnimationFrame(krok);
    return () => cancelAnimationFrame(uchwyt.current);
  }, [wartosc]);

  // Liczba kolumn bierze się z celu, nie z wartości bieżącej — inaczej
  // szerokość skakałaby w trakcie doliczania.
  const kolumny = dlugosc(wartosc);

  return (
    <span
      className={`inline-flex items-baseline tabular-nums ${className}`}
      role="text"
      aria-label={Math.round(wartosc).toLocaleString('pl-PL')}
    >
      {Array.from({ length: kolumny }, (_, idx) => {
        const poz = kolumny - 1 - idx;
        const dzielnik = Math.pow(10, poz);
        // Spacja co trzy cyfry, licząc od końca — pojawia się razem z tysiącami.
        const zeSpacja = idx > 0 && (kolumny - idx) % 3 === 0;
        return (
          <span key={poz} className="inline-flex items-baseline">
            {zeSpacja && <span aria-hidden className="inline-block" style={{ width: '0.24em' }} />}
            <Kolumna
              cyfra={Math.floor(biezaca / dzielnik) % 10}
              // Wiodące zero chowamy, dopóki kwota do niego nie dorośnie.
              widoczna={poz === 0 || biezaca >= dzielnik}
            />
          </span>
        );
      })}
    </span>
  );
}
