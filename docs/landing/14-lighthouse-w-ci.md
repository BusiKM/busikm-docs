# Lighthouse w CI

Przy każdym PR strona jest mierzona w dwóch profilach — **desktop i mobile** —
na czterech adresach: `/`, `/cennik`, `/kontakt` i `/co-robi/aplikacja-kierowcy`.
Każdy trzy razy, liczy się mediana.

Progi: `landing/.lighthouserc.desktop.json` i `.lighthouserc.mobile.json`.

## Czego to nie robi

**Wynik Lighthouse nie jest czynnikiem rankingowym.** Google pozycjonuje na
podstawie **Core Web Vitals zebranych od prawdziwych użytkowników** (zbiór
CrUX), a nie z symulacji laboratoryjnej. Lighthouse służy do czegoś innego:
łapie regresję, zanim trafi na produkcję.

Progi Google dla „dobrego" wyniku:

| Metryka | Dobrze | Wymaga poprawy | Słabo |
|---|---|---|---|
| LCP | ≤ 2,5 s | 2,5–4,0 s | > 4,0 s |
| INP | ≤ 200 ms | 200–500 ms | > 500 ms |
| CLS | ≤ 0,1 | 0,1–0,25 | > 0,25 |

**Prawdziwe liczby czytaj w Search Console → Podstawowe wskaźniki
internetowe.** To one decydują o pozycji, i tylko one.

## Dlaczego progi mobilne wyglądają rozpaczliwie

W konfiguracji mobilnej stoi `largest-contentful-paint: 11500 ms`, czyli
ponad czterokrotność progu Google. Dla porównania desktop ma **2500 ms**,
czyli dokładnie próg Google — tam mieścimy się z zapasem (zmierzone 1492 ms).

Mobilny próg **nie jest zgodą na wolną stronę**.

`next start` **nie kompresuje odpowiedzi** — sprawdzone: ta sama
`Content-Length` z nagłówkiem `Accept-Encoding: gzip` i bez, żadnego
`Content-Encoding`. Profil mobilny Lighthouse symuluje wolne 4G (1,6 Mb/s),
więc nieskompresowane 1,7 MB zajmuje samym transferem około 8 sekund.
Stąd zmierzone LCP 7,4–10,2 s.

Na produkcji kompresję robi brzeg sieci Vercela i te same zasoby ważą
kilkakrotnie mniej. Zmierzone lokalnie liczby mówią więc o środowisku
pomiarowym, nie o stronie.

Progi mobilne są ustawione **tuż nad zmierzoną bazą**, żeby złapać moment,
w którym coś się pogorszy. Nie próbuj ich czytać jako oceny szybkości.

## Co naprawdę pilnuje jakości

Metryki odporne na szybkość maszyny i na brak kompresji — i to one są
prawdziwą bramką:

| Asercja | Próg | Dlaczego działa |
|---|---|---|
| `resource-summary:script:size` | 900 KB | Bajty nie zależą od obciążenia maszyny. Ktoś dorzuci ciężką bibliotekę — widać od razu. |
| `resource-summary:total:size` | 1850 KB | To samo dla całej strony, razem z obrazami. |
| `cumulative-layout-shift` | 0,1 | Przeskoki układu wynikają z HTML i CSS, nie z procesora. Próg równy progowi Google. |
| `categories:seo` | 100 | Deterministyczne: tytuł, opis, indeksowalność, poprawne odnośniki. |
| `categories:best-practices` | 100 | Deterministyczne. |
| `categories:accessibility` | ≥ 95 | Deterministyczne. Dziś 96–100. |

Regresję ładunku łapią budżety bajtowe, a nie wynik wydajności — dlatego
to one są tu najważniejsze.

## Jedno znane ostrzeżenie

`link-in-text-block` i `color-contrast` zostają na `warn`, żeby były widoczne
i nie blokowały pracy. Pierwsze jest już naprawione i nie powinno wracać —
gdyby wróciło, znaczy to, że ktoś dodał odnośnik poza akapitem. Drugie
opisane niżej.

### `color-contrast`

Dotyczy wyłącznie **makiet produktu**, nie treści strony. W makietach stoją
przyciemnione karty telefonów w tle (`opacity-60`, `opacity-80`) dające efekt
talii. Tekst w nich dziedziczy przezroczystość i po skomponowaniu z ciemnym
tłem daje 3,04–3,35:1 przy wymaganych 4,5:1.

WCAG zwalnia z wymogu kontrastu tekst będący częścią obrazu o istotnej treści
wizualnej, a to dokładnie ten przypadek — ale axe nie ma jak tego rozpoznać.

## Co już poprawione

**Firebase ładuje się dopiero przy wysyłce.** Klient Firebase wchodził do
paczki każdej strony z formularzem — `/kontakt` wysyłał przez to 1198 KB
skryptów, choć odwiedzający najczęściej tylko czyta i wychodzi. Po zamianie
importu na `import()` w miejscu zapisu: **805 KB, czyli o 33% mniej**,
a cała strona z 1407 na 1014 KB. Szczegóły w `lib/firebase.ts`.

**Odnośniki w tekście ciągłym są podkreślone.** Wcześniej odróżniał je sam
kolor, co narusza WCAG 1.4.1. Kolorem nie dało się tego naprawić: `--color-blue`
#0B5FFF wobec `--color-muted` #6C6C74 daje **1,01:1** — oba mają niemal
identyczną jasność, a norma wymaga 3:1. Nawet granat #062B80 dochodzi tylko
do 2,42:1 i wygląda prawie czarno.

Reguła w `globals.css` obejmuje `p a` i `li a`, czyli dokładnie to, co norma
nazywa blokiem tekstu — przyciski i nadtytuły zostają bez podkreślenia.
Dostępność `/kontakt`, `/prywatnosc`, `/regulamin` i `/pomoc` wzrosła z 96
do **100**.

Jeśli dodajesz odnośnik w zdaniu, umieść go w `<p>` albo `<li>`. Odnośnik
w `<span>` regule umknie — tak właśnie było w stopce dokumentów prawnych.

## Aktualizacja progów po optymalizacji

Progi są bazą, nie celem. Po każdej poprawie wydajności zmierz na nowo
i **zejdź nimi w dół**, inaczej przestaną cokolwiek łapać:

```bash
cd landing
npm run build
npx @lhci/cli@latest autorun --config=.lighthouserc.mobile.json
```

Raporty lądują w `landing/.lighthouseci/` (katalog jest w `.gitignore`).
W CI te same pliki są do pobrania jako artefakt `lighthouse-<profil>`,
przez czternaście dni, także po nieudanym przebiegu.
