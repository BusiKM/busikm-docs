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

**Podstrony** trzymają ten sam schemat: `mockup-<obszar>-<ekran>-<urządzenie>.png`.
Pełna lista powstanie razem z projektami podstron.

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

## 6. Kiedy podmieniamy

1. Powstaje kod ekranu w aplikacji.
2. Robimy zrzut w rozdzielczości dwukrotnej, na czystych danych demo
   (te same nazwy tras i numery rejestracyjne, co w makietach).
3. Wrzucamy plik do `landing/public/mockups/` pod nazwą z tabeli w punkcie 3.
4. Ramka znika sama.

Do czasu podmiany strona jest w pełni gotowa do pokazania — ramki są elementem projektu,
a nie dziurą w nim.
