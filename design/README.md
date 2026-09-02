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
  06-zlecenia-i-faktury/    ← fala 2, prompt 6
  07-trasy-i-mapa/          ← fala 2, prompt 7
  08-czas-pracy/            ← fala 2, prompt 8
  09-koszty-i-paragony/     ← fala 2, prompt 9
  10-dokumenty-i-terminy/   ← fala 2, prompt 10
```

Fala 1 jest zamknięta. Katalogi fali 2 czekają na eksporty.

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
