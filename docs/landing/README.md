# Dokumentacja landingu BusiKM

Komplet materiałów do zaprojektowania i zbudowania nowej strony busikm.pl — opartej na
**finalnej wersji aplikacji** (backlog BusiKM v2, stan na 1 września 2026), a nie na tym,
czym produkt był w czasach pilotażu.

## Pliki

| Plik | Co zawiera | Dla kogo |
|---|---|---|
| [`01-produkt-finalny.md`](01-produkt-finalny.md) | Co aplikacja **naprawdę robi** — pełny inwentarz funkcji per rola, co wypadło z produktu, tabela twierdzeń do potwierdzenia | Ty, przed akceptacją treści |
| [`02-odbiorcy-i-jezyk.md`](02-odbiorcy-i-jezyk.md) | Kto to czyta, czego się boi, jak do niego mówić. Słownik tłumaczeń „technicznie → po ludzku”, lista słów zakazanych | Copy, Claude Design |
| [`03-architektura-informacji.md`](03-architektura-informacji.md) | Nawigacja, mapa wszystkich stron, adresy URL, system przycisków, ścieżka demo | Claude Design, implementacja |
| [`04-homepage.md`](04-homepage.md) | Strona główna sekcja po sekcji, z gotową treścią do wklejenia | Claude Design, implementacja |
| [`05-podstrony.md`](05-podstrony.md) | Każda podstrona z nawigacji — cel, sekcje, treść | Claude Design (druga tura) |
| [`06-animacje.md`](06-animacje.md) | System animacji przy przewijaniu w stylu apple.com — poziomy, parametry, implementacja | Implementacja w Next.js |
| [`07-prompt-claude-design.md`](07-prompt-claude-design.md) | **Gotowe prompty do wklejenia w Claude Design** — najpierw strona główna, potem podstrony | Ty, do skopiowania |
| [`08-makiety-i-zdjecia.md`](08-makiety-i-zdjecia.md) | Ramki zastępcze w miejsce zrzutów, nazewnictwo plików, oprawa graficzna sekcji, sygnały „to jest dla transportu” | Claude Design, implementacja |

## Co wklejasz do Claude Design

**Tylko `07-prompt-claude-design.md`, i to fragment: PROMPT 1.** Reszta plików zostaje
w repo — to materiał źródłowy i decyzje, nie treść dla projektanta.

## Jak tego użyć

1. Przeczytaj `01` i zaakceptuj albo popraw tabelę twierdzeń — to jedyne miejsce, gdzie
   decydujemy, co wolno obiecać na stronie.
2. Przeczytaj treść strony głównej w `04`. Zmieniaj śmiało — nagłówki są dobrane pod rytm,
   ale to Twój produkt i Twój język.
3. Wklej **PROMPT 1** z `07` do Claude Design. Dostajesz projekt strony głównej.
4. Po akceptacji projektu wklejaj kolejne prompty (2, 3, 4…) — po jednym na podstronę.
5. Dopiero potem implementacja w `landing/` — z `06` jako specyfikacją animacji.

## Zasada nadrzędna

Strona jest **pierwszym kontaktem** właściciela firmy transportowej z produktem.
Ma odpowiadać na jego pytania, nie opowiadać o naszej technologii.

Każde zdanie przechodzi jeden test: **czy właściciel firmy z pięcioma busami powiedziałby
to swoimi słowami?** Jeśli nie — przepisujemy.
