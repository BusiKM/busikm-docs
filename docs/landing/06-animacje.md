# 06 · Animacje przy przewijaniu

Cel: strona ma się zachowywać jak apple.com — treść **wchodzi** w pole widzenia,
nie po prostu tam jest. Ruch ma być spokojny, krótki i przewidywalny.

**Zasada nadrzędna:** animacja nigdy nie opóźnia czytania. Jeśli ktoś przewija szybko,
ma zobaczyć gotową stronę, a nie czekać, aż coś się dolezie.

---

## Wspólne parametry

```
krzywa      cubic-bezier(0.16, 1, 0.3, 1)     — szybki start, miękkie hamowanie
czas        700 ms                             — treść
            900 ms                             — duże makiety
            400 ms                             — drobne stany (hover, zakładki)
przesunięcie 28 px w górę                       — nigdy więcej niż 40 px
kaskada     90 ms między elementami w grupie    — maks. 6 elementów, potem razem
próg        element wchodzi, gdy jego góra minie 88% wysokości okna
powtarzanie NIE — każdy element animuje się raz
```

Kolory tła sekcji **nie** przechodzą płynnie — ciemna sekcja zaczyna się ostrą krawędzią,
tak jak w projekcie. Animujemy treść, nie tło.

---

## Poziom 1 — wejście treści *(cała strona)*

Domyślne zachowanie każdego nagłówka, akapitu, karty i makiety.

```
z:  opacity 0, translateY(28px)
do: opacity 1, translateY(0)
```

Grupy (kolumny, kafelki, punkty) wchodzą kaskadą co 90 ms.

## Poziom 2 — hero *(przy wejściu na stronę)*

Sekwencja po załadowaniu, co 120 ms: nagłówek → podtytuł → przyciski → podpis → makieta.

Makieta dodatkowo: `scale(0.96) → 1` w 900 ms, cień pogłębia się w tym samym czasie.

Przy przewijaniu makieta odjeżdża w górę **maksymalnie o 40 px** względem strony
i lekko traci na przezroczystości. Bez większego ruchu — to nie ma być karuzela.

## Poziom 3 — sceny przyklejone *(dokładnie trzy na stronie)*

Sekcja trzyma się ekranu (`position: sticky`) przez kilka „taktów” przewijania,
a w środku podmienia się treść. To jest ten efekt, który ludzie nazywają „jak u Apple”.

Używamy **tylko** w trzech miejscach:

| Sekcja | Takty | Co się dzieje |
|---|---|---|
| **4 · Cztery osoby** | 4 | Podmienia się makieta ekranu, podświetla nazwa aktywnej roli |
| **7 · Aplikacja kierowcy** | 3 | Zmienia się ekran w telefonie: nawigacja → dodanie kosztu → „Do wysłania” |
| **5 · Trzy ruchy** | 3 | Zapala się kolejny numer, poprzedni gaśnie do 40% |

Reguły:
- łączna wysokość sceny: `100vh × (liczba taktów + 1)`,
- przejście między taktami: 400 ms, treść krzyżuje się przezroczystością,
- **nie przechwytujemy przewijania** — kółko myszy działa normalnie, można przelecieć scenę,
- na telefonie sceny przyklejone **wyłączamy** — zamiast nich zwykłe wejście z poziomu 1,
  jeden takt pod drugim.

## Poziom 4 — liczby

Liczby na pulpicie, w kartach zysku i w cenniku liczą się od zera przy wejściu w kadr.
1200 ms, wyhamowanie na końcu. Format polski, ze spacją jako separatorem tysięcy.

Jedna liczba dostaje więcej uwagi: **zysk w sekcji „Ile zostaje”**. Po policzeniu,
z opóźnieniem 600 ms, do listy kosztów „dopada” nowa pozycja i liczba przelicza się w dół.
To jest wizualny dowód zdania „liczba zmienia się w trakcie”.

## Poziom 5 — drobne stany

- Przyciski: tło i cień 200 ms, bez podskakiwania
- Karty: cień głębszy o jeden stopień w 200 ms, `translateY(-2px)`
- Nawigacja: cień pod paskiem pojawia się po przewinięciu 24 px, 200 ms
- Nawigacja, zmiana stanu: tło 300 ms, treść krzyżuje się przezroczystością
  z przesunięciem 4 px, 300 ms. Kierunek przewijania czytany w `requestAnimationFrame`,
  z progiem 8 px — szczegóły w `03`
- Rozwijane menu: 180 ms, wejście z `translateY(-6px)`
- Akordeon pytań: wysokość 240 ms, znacznik obraca się w tym samym czasie

---

## Czego nie robimy

- **Nie przechwytujemy przewijania.** Nigdy.
- **Nie animujemy poziomo** — żadnych karuzeli, żadnych „przewiń w bok”.
- **Nie ruszamy tekstu paralaksą.** Paralaksa tylko na makietach, maks. 40 px.
- **Nie animujemy dłużej niż 900 ms.**
- **Nie animujemy przy ponownym wejściu w kadr** — raz i koniec.
- **Nie animujemy niczego nad zgięciem strony poza sekwencją hero.**

---

## Mniej ruchu

```css
@media (prefers-reduced-motion: reduce) {
  /* wszystko widoczne od razu, zero przesunięć, zero liczenia liczb */
}
```

To nie jest opcja — to warunek publikacji. Sceny przyklejone w tym trybie zamieniają się
w zwykłe sekcje jedna pod drugą.

---

## Implementacja w Next.js

Bez dodatkowych bibliotek. Wystarczy `IntersectionObserver` i CSS.

**Wejście treści** — jeden komponent kliencki montowany raz w `layout.tsx`:

```tsx
// obserwuje [data-reveal], nadaje klasę .is-visible, przestaje obserwować
// kaskada przez zmienną --i ustawianą na elemencie
```

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 700ms cubic-bezier(.16,1,.3,1) calc(var(--i, 0) * 90ms),
    transform 700ms cubic-bezier(.16,1,.3,1) calc(var(--i, 0) * 90ms);
}
[data-reveal].is-visible { opacity: 1; transform: none; }
```

**Sceny przyklejone** — `position: sticky` na wewnętrznym opakowaniu, wysokość zewnętrznego
opakowania liczona z liczby taktów, aktywny takt wyliczany ze `scrollY` względem sekcji
(w `requestAnimationFrame`, nie w każdym zdarzeniu przewijania).

**Docelowo** można to przepisać na `animation-timeline: view()` — wtedy przeglądarka
robi całą robotę. Dziś trzymamy to za `@supports`, jako ulepszenie, nie jako podstawę.

**Uwaga wydajnościowa:** animujemy wyłącznie `opacity` i `transform`.
Nigdy `height`, `top`, `margin` ani `box-shadow` w scenach przyklejonych.
