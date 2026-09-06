# Zrzuty z aplikacji

Tu trafiają prawdziwe zrzuty ekranów BusiKM. Dopóki pliku nie ma, komponent
`MockupSlot` rysuje w jego miejscu ramkę z opisem i nazwą pliku.
**Podmiana = wrzucenie obrazu pod właściwą nazwą.** Nic więcej.

**Po wrzuceniu pliku odśwież kartę w przeglądarce.** Zmiana w `public/` nie
przeładowuje strony sama z siebie. Adres obrazka w trybie deweloperskim niesie
sygnaturę czasu pliku, więc odświeżenie zawsze pokaże nową wersję.

**Rozdzielczość:** eksportuj w dwukrotnej szerokości docelowej, czyli około
2240 px dla makiet na całą szerokość. Zrzut 1000 px będzie miękki na ekranach
Retina.

## Kadr pliku decyduje o tym, czy trzeba go powiększyć

To wracało już cztery razy w różnych miejscach, więc warto zapamiętać.

Zrzuty telefonu przychodzą w dwóch odmianach i wyglądają na stronie zupełnie
inaczej, mimo że plik „jest ten sam":

**Kadr ciasny** — telefon zajmuje 90% i więcej szerokości pliku. Wchodzi
w swoje miejsce w naturalnej wielkości, powiększenia nie potrzebuje.
Powiększony wyszedłby poza ekran.

**Kadr szeroki** — telefon stoi pośrodku poziomej ramki 4:3 i zajmuje raptem
30% jej szerokości; reszta to pusty margines. Bez powiększenia wychodzi
kilkakrotnie za mały: w kolumnie 520 px daje 158 px, a w wąskim kaflu 46 px.
Wtedy trzeba podać `imageScale` — i `imageScaleTelefon`, jeśli ma działać
także na telefonie.

**Jeśli sam robisz zrzut, kadruj ciasno.** Wtedy nikt nie musi dobierać
liczby, a plik wygląda tak samo w każdym miejscu, w które trafi.

Sprawdzone wartości dla kadru szerokiego:

| Miejsce | Pudło | Skala |
|---|---|---|
| kolumna obok tekstu | 520 px | `1.8` |
| rząd czterech kafli | 152 px | `3` |

Gdy dokładasz zrzut w nowym miejscu, spójrz na sąsiednie wywołanie
`MockupSlot`. Jeśli ma `imageScale`, Twoje prawie na pewno też potrzebuje —
brak tej wartości przy nowym pliku był przyczyną wszystkich czterech
przypadków.

## Nazewnictwo

```
mockup-<obszar>-<co-widać>-<urządzenie>.png
```

Format PNG, rozdzielczość dwukrotna, tło przezroczyste tam, gdzie makieta leży
na tle sekcji. Zrzuty robimy **na danych demo** — te same trasy i numery
rejestracyjne, co w projekcie (`Warszawa → Mediolan`, `WZ 4821K`, `Marek W.`).

## Strona główna

| Plik | Urządzenie | Co ma być widać |
|---|---|---|
| `mockup-hero-pulpit-desktop.png` | desktop 16:10 | Pulpit właściciela: przychód, koszty, zysk, mapa z trasą, trzy zlecenia |
| `mockup-dyspozytornia-ekran-desktop.png` | desktop 16:10 | Trzy kolumny: lista zleceń, mapa, panel kierowcy z rozmową |
| `mockup-kierowca-nawigacja-phone.png` | telefon 9:19.5 | Nawigacja z trasą i kartą zlecenia u dołu, tryb nocny |
| `mockup-kierowca-koszt-phone.png` | telefon 9:19.5 | Dodawanie kosztu: zdjęcie paragonu i rozpoznane pola, tryb nocny |
| `mockup-faktury-zlecenie-desktop.png` | desktop 4:3 | Karta zlecenia i faktura obok siebie, przycisk „Wyślij” |
| `mockup-zysk-karta-desktop.png` | desktop 4:3 | Karta zlecenia z rozbiciem kosztów i dużą liczbą zysku |
| `mockup-mapa-flota-desktop.png` | desktop 16:10 | Mapa Europy, trzy pojazdy, dymek z numerem i godziną dojazdu |
| `mockup-czas-pracy-pierscienie-desktop.png` | desktop 4:3 | Trzy pierścienie postępu i lista kierowców ze statusem |
| `mockup-koszty-paragon-phone.png` | telefon 9:19.5 | Zdjęcie paragonu i formularz z polami rozpoznanymi na zielono |
| `mockup-ksiegowa-eksport-desktop.png` | desktop 4:3 | Lista dziewięciu zestawień i przycisk „Pobierz komplet” |
| `mockup-dokumenty-terminy-desktop.png` | desktop 4:3 | Lista dokumentów po dniach do wygaśnięcia, paski w trzech kolorach |
| `mockup-demo-wejscie-desktop.png` | desktop 16:10 | Pulpit demo z paskiem „To jest demo” u góry |

Podstrony trzymają ten sam schemat. Pełna lista powstaje razem z projektami.
