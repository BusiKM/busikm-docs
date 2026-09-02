# 08 · Makiety, tła i miejsca na zdjęcia

Prawdziwe zrzuty aplikacji powstaną dopiero wtedy, gdy będzie działający kod.
Do tego czasu **każde miejsce na obraz jest ramką zastępczą** — z opisem, co dokładnie
ma się tam znaleźć, i z nazwą pliku, którym to zastąpimy.

Zasada: podmiana ma polegać na wrzuceniu pliku o właściwej nazwie do właściwego katalogu.
Nic więcej.

---

## 1. Ramka zastępcza

Każda ramka zajmuje **dokładnie tyle miejsca, co docelowy obraz** — dzięki temu po podmianie
nic nie skacze.

Zawiera cztery rzeczy:

```
┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
│  DO PODMIANY · EKRAN WŁAŚCICIELA · DESKTOP 1440      │  ← rodzaj i urządzenie
│                                                       │
│  Pulpit po zalogowaniu: trzy liczby u góry            │  ← co ma być na obrazie
│  (przychód, koszty, zysk), mapa z trasą               │
│  Warszawa → Mediolan, lista trzech zleceń             │
│  ze statusami.                                        │
│                                                       │
│  mockup-hero-pulpit-desktop.png          16:10        │  ← nazwa pliku i proporcje
└─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

**Wygląd ramki:** obrys przerywany w kolorze `line`, tło `mist` (na sekcjach jasnych)
albo `surface` (na ciemnych), promień jak karty — 20 px. Tekst w foncie technicznym,
kolorem `muted`. Etykieta „DO PODMIANY” drobna, wersalikami, w rogu.

**Ramka nie udaje interfejsu.** Nie rysujemy w niej atrapy wykresów — ma być widać,
że to miejsce czeka na obraz.

### Komponent w Next.js

```tsx
<MockupSlot
  device="desktop"                                   // desktop | phone | phone-pair
  file="mockup-hero-pulpit-desktop.png"
  ratio="16/10"
  label="Ekran właściciela"
>
  Pulpit po zalogowaniu: trzy liczby u góry (przychód, koszty, zysk),
  mapa z trasą Warszawa → Mediolan, lista trzech zleceń ze statusami.
</MockupSlot>
```

Po dostarczeniu pliku komponent podmienia się na `next/image` z tą samą proporcją.
Docelowo `MockupSlot` sam sprawdza, czy plik istnieje w `landing/public/mockups/`,
i pokazuje ramkę tylko wtedy, gdy go nie ma — wtedy podmiana to samo wrzucenie pliku.

---

## 2. Nazewnictwo plików

Katalog: **`landing/public/mockups/`**

```
mockup-<obszar>-<co-widać>-<urządzenie>.png
```

- **obszar** — nazwa sekcji albo podstrony: `hero`, `dyspozytornia`, `kierowca`, `faktury`,
  `zysk`, `mapa`, `czas-pracy`, `koszty`, `ksiegowa`, `dokumenty`
- **co widać** — jednym słowem albo dwoma: `pulpit`, `nawigacja`, `koszt`, `lista`, `karta`
- **urządzenie** — `desktop` (1440), `phone` (390), `phone-pair` (dwa telefony)

Format: **PNG**, dwukrotna gęstość (`@2x` w pliku źródłowym, wynikowy plik bez sufiksu).
Tło przezroczyste tam, gdzie makieta leży na tle sekcji.

**Kadruj do treści.** Zrzut wyeksportowany na kwadratowym płótnie z szerokim marginesem
(tak wychodzą oprawy w iMaca) zajmuje w pudle sekcji połowę tego, co powinien —
`object-contain` dopasowuje całe płótno, razem z pustką. Zmierzone: iMac na płótnie
12800 × 12800 wypełniał 58% szerokości pudła 4:3.

Doraźnie ratuje to `imageScale` w `MockupSlot` (powiększa obraz ponad pudło, nie ruszając
układu sekcji) — ale lepszy jest ciasny kadr w eksporcie. Wtedy nic nie trzeba nadpisywać
w kodzie.

---

## 3. Lista wszystkich obrazów — strona główna

| # | Sekcja | Plik | Urządzenie | Co ma być widać |
|---|---|---|---|---|
| 02 | Hero | `mockup-hero-pulpit-desktop.png` | desktop 16:10 | Pulpit właściciela: przychód, koszty, **zysk**, mapa z trasą, trzy zlecenia ze statusami |
| 06 | Dyspozytornia | `mockup-dyspozytornia-ekran-desktop.png` | desktop 16:10 | Trzy kolumny: lista zleceń, mapa, panel kierowcy z rozmową |
| 07 | Aplikacja kierowcy | `mockup-kierowca-nawigacja-phone.png` | telefon 9:19.5 | Nawigacja z trasą i kartą zlecenia u dołu, **tryb nocny** |
| 07 | Aplikacja kierowcy | `mockup-kierowca-koszt-phone.png` | telefon 9:19.5 | Dodawanie kosztu: zdjęcie paragonu i rozpoznane pola, **tryb nocny** |
| 08 | Zlecenie → faktura | `mockup-faktury-zlecenie-desktop.png` | desktop 4:3 | Karta zlecenia i faktura obok siebie, przycisk „Wyślij”, znaczniki mail i e-faktura |
| 09 | Ile zostaje | `mockup-zysk-karta-desktop.png` | desktop 4:3 | Karta zlecenia Warszawa → Mediolan z rozbiciem kosztów i dużą liczbą zysku |
| 10 | Mapa i trasa | `mockup-mapa-flota-desktop.png` | desktop 16:10 | Mapa Europy, trzy pojazdy, dymek z numerem rejestracyjnym i godziną dojazdu |
| 11 | Czas pracy | `mockup-czas-pracy-pierscienie-desktop.png` | desktop 4:3 | Trzy pierścienie postępu i lista kierowców ze statusem |
| 12 | Koszty i paragony | `mockup-koszty-paragon-phone.png` | telefon 9:19.5 | Zdjęcie paragonu i formularz z polami rozpoznanymi na zielono |
| 13 | Koniec miesiąca | `mockup-ksiegowa-eksport-desktop.png` | desktop 4:3 | Lista dziewięciu zestawień, przycisk „Pobierz komplet za sierpień” |
| 14 | Dokumenty | `mockup-dokumenty-terminy-desktop.png` | desktop 4:3 | Lista dokumentów po dniach do końca ważności, paski w trzech kolorach |
| 16 | Demo | `mockup-demo-wejscie-desktop.png` | desktop 16:10 | Pulpit demo z paskiem „To jest demo” u góry |

---

## 3a. Lista obrazów — podstrony

Ten sam schemat: `mockup-<obszar>-<ekran>-<urządzenie>.png`. Wiersze bez gwiazdki
to zrzuty tylko dla podstrony; **z gwiazdką** — ten sam plik, co na stronie głównej.

| Podstrona | Plik | Urządzenie | Co ma być widać |
|---|---|---|---|
| Aplikacja kierowcy | `mockup-kierowca-telefony-phone.png` | dwa telefony | Dwa telefony pod kątem: lista zleceń i nawigacja, tryb nocny |
| Aplikacja kierowcy | `mockup-kierowca-zlecenia-phone.png` | telefon 9:19.5 | Lista zleceń dnia ze statusami, tryb nocny |
| Aplikacja kierowcy | `mockup-kierowca-nawigacja-phone.png` \* | telefon 9:19.5 | Nawigacja z kartą zlecenia u dołu, tryb nocny |
| Aplikacja kierowcy | `mockup-kierowca-koszt-phone.png` \* | telefon 9:19.5 | Dodawanie kosztu ze zdjęciem paragonu, tryb nocny |
| Aplikacja kierowcy | `mockup-kierowca-czas-phone.png` | telefon 9:19.5 | Licznik czasu pracy, tryb nocny |
| Aplikacja kierowcy | `mockup-kierowca-wysylka-phone.png` | telefon 9:19.5 | Ekran „Do wysłania" — co czeka na zasięg, tryb nocny |
| Dyspozytornia | `mockup-dyspozytornia-ekran-desktop.png` \* | desktop 16:10 | Trzy kolumny: zlecenia, mapa, panel kierowcy |
| Dyspozytornia | `mockup-dyspozytornia-zlecenie-desktop.png` | desktop 4:3 | Karta zlecenia z przypisaniem kierowcy |
| Dyspozytornia | `mockup-dyspozytornia-trasa-desktop.png` | desktop 4:3 | Podgląd trasy ze zmianą w trakcie jazdy |
| Dane dla księgowej | `mockup-ksiegowa-eksport-desktop.png` \* | desktop 4:3 | Centrum eksportów, przycisk „Pobierz komplet" |
| Dane dla księgowej | `mockup-ksiegowa-walidacja-desktop.png` | desktop 4:3 | Lista zestawień: komplet / do uzupełnienia. Bez czerwieni |
| Dane dla księgowej | `mockup-ksiegowa-diety-desktop.png` | desktop 4:3 | Rozliczenie kierowcy: dni za granicą, diety, wypłata |
| Ile zostaje | `mockup-zysk-karta-desktop.png` \* | desktop 4:3 | Karta kursu z rozbiciem kosztów i zyskiem na dole |
| Ile zostaje | `mockup-zysk-tabela-desktop.png` | desktop 16:10 | Zlecenia po marży, wyróżniony wiersz po dodaniu paragonu |
| Ile zostaje | `mockup-zysk-porownanie-desktop.png` | desktop 4:3 | Dwa miesiące, słupki tygodniowe, różnica w zł i procentach |
| Zlecenia i faktury | `mockup-faktury-ekran-desktop.png` | desktop 16:10 | Pełne okno: zlecenie, strzałka, faktura, „Wystaw i wyślij" |
| Zlecenia i faktury | `mockup-faktury-wysylka-desktop.png` | desktop 4:3 | Okno wysyłki: adresat, PDF, przełącznik e-faktury, status |
| Zlecenia i faktury | `mockup-faktury-historia-desktop.png` | desktop 4:3 | Wystawione dokumenty z datą wysyłki i stanem |

**Uwaga o `mockup-faktury-*`.** Strona główna ma `mockup-faktury-zlecenie-desktop.png` —
zwartą kartę 4:3 w połowie szerokości. Podstrona ma `mockup-faktury-ekran-desktop.png` —
pełne okno przeglądarki 16:10. To dwa różne zrzuty tego samego procesu, więc dwie nazwy.
Przyrostek `-ekran-` zarezerwowany jest dla pełnego okna aplikacji, tak jak
w `mockup-dyspozytornia-ekran-desktop.png`.

---

## 4. Oprawa — żeby nie było jałowo

Sama ramka na gładkim tle wygląda pusto. Każda makieta ma **oprawę**, która jest częścią
projektu i zostaje po podmianie obrazu.

| Sekcja | Oprawa |
|---|---|
| **Hero** | Pulpit uniesiony nad stroną, pod nim miękka poświata w kolorze `blue` rozmyta na 120 px. W tle, bardzo delikatnie, kontur mapy Europy z jedną świecącą linią trasy. Kontrast konturu: ledwo widoczny, 4–6% |
| **Aplikacja kierowcy** | Dwa telefony pod lekkim kątem (−8° i +5°), jeden wysunięty do przodu. Ciemne tło, pod telefonami poświata jak od świateł na drodze. Za nimi rozmyta krzywa trasy |
| **Mapa i trasa** | **Tło całej sekcji**: siatka południków i równoleżników, bardzo delikatna, oraz jedna trasa jako świecąca krzywa przecinająca sekcję na ukos |
| **Ile zostaje** | Ciemne tło, karta zlecenia unosi się z cieniem `shadow-blue`. Obok, poza kartą, duża liczba zysku jako element typograficzny — nie wewnątrz makiety |
| **Koszty i paragony** | Telefon w perspektywie, obok „odklejony” od niego panel z rozpoznanymi polami — jakby dane wyskakiwały ze zdjęcia |
| **Koniec miesiąca** | Kilka arkuszy w perspektywie, jeden na wierzchu — stos dokumentów, który zaraz pójdzie do księgowej |
| **Dokumenty i terminy** | Lista na jasnym tle, po prawej wąska kolumna pasków statusu jako element rytmiczny |
| **Cztery osoby** | Cztery różne ekrany, każdy w innym kadrze: desktop, desktop, desktop, telefon. Widać, że to cztery różne stanowiska pracy |

**Zasady oprawy:**
- poświaty subtelne, jednotonowe — nigdy tęczowe,
- kąt nachylenia telefonów zawsze mały (do 10°), inaczej wygląda jak reklama z 2015 roku,
- tła sekcyjne mają kontrast **poniżej 8%** względem tła — mają być tłem, nie wzorem,
- nic nie może przeszkadzać w czytaniu nagłówka.

---

## 5. Widać transport od pierwszej sekundy

Właściciel firmy transportowej ma w ciągu dwóch sekund poznać, że to jest **dla niego**.
Nie przez logotypy ciężarówek — przez konkret.

**W makietach zawsze prawdziwe dane z jego świata:**
- trasy z nazwami: `Warszawa → Mediolan`, `Poznań → Rotterdam`, `Gdańsk → Kraków`
- numery rejestracyjne w polskim formacie: `WZ 4821K`, `PO 2093J`
- imiona kierowców: `Marek W.`, `Tomasz L.`, `Adam S.`
- słownictwo: fracht, załadunek, rozładunek, opłata drogowa, dieta, przewoźnik
- kwoty w złotych **i** w euro, bo połowa kosztów jest zagraniczna

**W hero, nad nagłówkiem, jedna linia wersalikami:**
> BUSY 2,5–3,5 T · TRANSPORT KRAJOWY I MIĘDZYNARODOWY

To zdejmuje całą niepewność „czy to dla mnie” zanim ktokolwiek zacznie czytać.

**Czego nie robimy:** ikon ciężarówek, zdjęć autostrad o zachodzie słońca, kierowców
z kciukiem w górę, rysunkowych busów. Transport widać po danych, nie po obrazkach.

---

## 4a. Kształt pudła to nie to samo, co proporcje zrzutu

`MockupSlot` ma dwa osobne parametry:

- **`ratio`** — proporcje, w jakich należy wyeksportować zrzut. Trafiają do notki
  „do podmiany", żeby było wiadomo, co przygotować.
- **`box`** — kształt miejsca, które makieta zajmuje w układzie strony.
  Domyślnie taki sam jak `ratio`.

Rozdzielenie jest konieczne przy telefonach. Zrzut telefonu ma proporcje 9:19.5,
ale pudło o takim kształcie w kolumnie szerokiej na 660 px miałoby **1430 px
wysokości** — telefon wisiałby w pustce, a reszta sekcji zjechałaby w dół.

Dlatego w sekcji czterech ról wszystkie cztery zakładki dostają `box="16:10"`.
Telefon mieści się w tym samym pudle co ekrany przeglądarki, wyśrodkowany,
a przełączanie zakładek nie zmienia wysokości sekcji ani o piksel.

**Reguła:** gdy w jednym miejscu przełączają się makiety o różnych proporcjach,
wszystkie dostają to samo `box`.

## 5a. Podmiana pliku pod tą samą nazwą

Optymalizator obrazów Next trzyma wynik **pod adresem, a nie pod zawartością pliku**.
Po nadpisaniu zrzutu tą samą nazwą oddaje stary obraz z tym samym ETagiem, aż do
restartu serwera — plik statyczny zmienia ETag poprawnie, zoptymalizowany nie.
`minimumCacheTTL: 0` tego nie naprawia.

Dlatego `MockupSlot` w trybie deweloperskim dokłada do adresu sygnaturę czasu
ostatniej zmiany pliku i omija optymalizator (`unoptimized`). Wrzucasz nowy plik,
odświeżasz stronę i widzisz nowy obraz. W produkcji zostaje czysty adres
i optymalizacja, bo tam pliki nie zmieniają się w locie.

**Uwaga:** zmiana pliku w `public/` nie przeładowuje strony sama z siebie —
po wrzuceniu zrzutu trzeba odświeżyć kartę.

## 6. Kiedy podmieniamy

1. Powstaje kod ekranu w aplikacji.
2. Robimy zrzut w rozdzielczości dwukrotnej, na czystych danych demo
   (te same nazwy tras i numery rejestracyjne, co w makietach).
3. Wrzucamy plik do `landing/public/mockups/` pod nazwą z tabeli w punkcie 3.
4. Ramka znika sama.

Do czasu podmiany strona jest w pełni gotowa do pokazania — ramki są elementem projektu,
a nie dziurą w nim.
