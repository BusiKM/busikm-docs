# Projekty z Claude Design

Tu trafiają eksporty artboardów. Kod powstaje **na ich podstawie**, ale źródłem
treści pozostaje `docs/landing/` — jeśli w projekcie zmieni się jakieś zdanie,
najpierw wraca ono do dokumentacji, dopiero potem do kodu.

## Nazewnictwo

```
design/
  01-home/                  strona główna          ✅ zaimplementowana
  02-aplikacja-kierowcy/    fala 1, prompt 2       ✅ zaimplementowana
  03-dyspozytornia/         fala 1, prompt 3       ✅ zaimplementowana
  04-dane-dla-ksiegowej/    fala 1, prompt 4       ✅ zaimplementowana
  05-rentownosc/            fala 1, prompt 5       ✅ zaimplementowana
  06-zlecenia-i-faktury/    fala 2, prompt 6        ✅ zaimplementowana
  07-trasy-i-mapa/          fala 2, prompt 7        ✅ zaimplementowana
  08-czas-pracy/            fala 2, prompt 8        ✅ zaimplementowana
  09-koszty-i-paragony/     fala 2, prompt 9        ✅ zaimplementowana
  10-dokumenty-i-terminy/   fala 2, prompt 10       ✅ zaimplementowana
  11-wlasciciel/            fala 3, prompt 11       ✅ zaimplementowana
  12-dyspozytor/            fala 3, prompt 12       ✅ zaimplementowana
  13-ksiegowa/              fala 3, prompt 13       ✅ zaimplementowana
  14-kierowca/              fala 3, prompt 14       ✅ zaimplementowana
  15-cennik/                fala 3, prompt 15       ✅ zaimplementowana
  16-demo/                  fala 3, prompt 16       ✅ zaimplementowana
  17-co-robi/               ← fala 4, prompt 17
  18-dla-kogo/              ← fala 4, prompt 18
  19-pomoc/                 ← fala 4, prompt 19
  20-pierwsze-kroki/        ← fala 4, prompt 20
  21-kontakt/               ← fala 4, prompt 21
  22-status/                ← fala 4, prompt 22
  23-prawne/                ← fala 4, prompt 23 (jeden wzorzec na cztery strony)
```

Fale 1–3 są zamknięte. Katalogi fali 4 czekają na eksporty.

**Fala 3 prawie nie potrzebuje nowych zrzutów** — strony ról składają ekrany
narysowane w falach 1 i 2. Przy każdej makiecie w prompcie podana jest nazwa pliku
z poprzedniej fali; ma być dokładnie ta sama.

Numer odpowiada kolejności z `docs/landing/09-workflow-wdrozenia.md`.
W katalogu ląduje wyeksportowany plik canvasu (`*.dc.html`) razem z tym,
co Claude Design dołoży obok.

## Zanim wrzucisz eksport

Sprawdź, czy projekt zawiera trzy artboardy:

1. **Desktop 1440** — cała strona od nawigacji do stopki
2. **Telefon 390** — cała strona, z otwartym menu jako osobnym stanem
3. **Stany nawigacji** *(tylko przy stronie głównej)* — pasek domyślny,
   po przewinięciu, oba rozwinięte menu, menu na telefonie

Trzeci najczęściej umyka, a bez niego trzeba zgadywać stany paska.

## Co dalej

Po wrzuceniu eksportu daj znać — przepisuję projekt na komponenty w `landing/`
i wypisuję każdą rozbieżność między projektem a dokumentacją do decyzji.
