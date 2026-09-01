# Projekty z Claude Design

Tu trafiają eksporty artboardów. Kod powstaje **na ich podstawie**, ale źródłem
treści pozostaje `docs/landing/` — jeśli w projekcie zmieni się jakieś zdanie,
najpierw wraca ono do dokumentacji, dopiero potem do kodu.

## Nazewnictwo

```
design/
  01-home/            strona główna
  02-aplikacja-kierowcy/
  03-dyspozytornia/
  04-dane-dla-ksiegowej/
  05-rentownosc/
  ...
```

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
