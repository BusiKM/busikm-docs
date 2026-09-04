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

W konfiguracji mobilnej stoi `largest-contentful-paint: 12000 ms`, czyli
czterokrotność progu Google. To nie jest zgoda na wolną stronę.

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
| `resource-summary:script:size` | 1400 KB | Bajty nie zależą od obciążenia maszyny. Ktoś dorzuci ciężką bibliotekę — widać od razu. |
| `resource-summary:total:size` | 2100 KB | To samo dla całej strony, razem z obrazami. |
| `cumulative-layout-shift` | 0,1 | Przeskoki układu wynikają z HTML i CSS, nie z procesora. Próg równy progowi Google. |
| `categories:seo` | 100 | Deterministyczne: tytuł, opis, indeksowalność, poprawne odnośniki. |
| `categories:best-practices` | 100 | Deterministyczne. |
| `categories:accessibility` | ≥ 90 | Deterministyczne. Dziś 92–100. |

Regresję ładunku łapią budżety bajtowe, a nie wynik wydajności — dlatego
to one są tu najważniejsze.

## Dwa znane ostrzeżenia

Ustawione na `warn`, żeby były widoczne i nie blokowały pracy.

### `link-in-text-block`

Odnośniki wewnątrz akapitów są odróżnialne **wyłącznie kolorem**. WCAG 1.4.1
wymaga albo podkreślenia, albo kontrastu ≥ 3:1 między odnośnikiem a otaczającym
tekstem.

Policzone: `--color-blue` #0B5FFF wobec `--color-muted` #6C6C74 daje **1,01:1**.
Oba kolory mają niemal identyczną jasność. Kolorem tego **nie da się naprawić** —
nawet granat #062B80 dochodzi tylko do 2,42:1 i wygląda prawie czarno.

Jedyne wyjście to podkreślenie odnośników w tekście ciągłym. To zmiana
widoczna w projekcie, więc czeka na decyzję.

### `color-contrast`

Dotyczy wyłącznie **makiet produktu**, nie treści strony. W makietach stoją
przyciemnione karty telefonów w tle (`opacity-60`, `opacity-80`) dające efekt
talii. Tekst w nich dziedziczy przezroczystość i po skomponowaniu z ciemnym
tłem daje 3,04–3,35:1 przy wymaganych 4,5:1.

WCAG zwalnia z wymogu kontrastu tekst będący częścią obrazu o istotnej treści
wizualnej, a to dokładnie ten przypadek — ale axe nie ma jak tego rozpoznać.

## Realna rzecz do poprawy

Lighthouse wskazuje **750 ms na nieużywanym JavaScripcie**. Strona główna
wysyła ~830 KB skryptów (nieskompresowanych), `/kontakt` ~1,2 MB — ta druga
ciągnie klienta Firebase, potrzebnego tylko przy wysyłce formularza.

Zysk byłby prawdziwy i widoczny także w polu, nie tylko w laboratorium.
Kierunek: ładować Firebase dopiero przy pierwszej interakcji z formularzem,
zamiast przy wejściu na stronę.

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
