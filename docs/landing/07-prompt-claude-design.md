# 07 · Prompty do Claude Design

## Do Claude Design wkleja się TYLKO ten plik

Nie wklejaj całego katalogu `docs/landing/`. Pozostałe pliki są **dla Ciebie i dla mnie** —
to materiał źródłowy i decyzje. Claude Design dostaje wyłącznie gotowy prompt stąd.

| Plik | Gdzie trafia |
|---|---|
| `07` — **PROMPT 1** | **Wklejasz do Claude Design.** Zawiera wszystko: system wizualny, treść, makiety |
| `07` — prompty 2–14 | Wklejasz pojedynczo, po zaakceptowaniu strony głównej |
| `01`–`06`, `08` | Zostają w repo. Czytasz je Ty, korzystam z nich ja przy implementacji |

**Jak to zrobić krok po kroku:**

1. Otwórz `07-prompt-claude-design.md`.
2. Skopiuj wszystko od linii `# PROMPT 1 — STRONA GŁÓWNA` do `KONIEC PROMPTU 1`.
3. Wklej do Claude Design jako jedną wiadomość. Nic nie dodawaj.
4. Dostajesz trzy artboardy. Poprawki zgłaszasz w tej samej rozmowie, po polsku.
5. Gdy strona główna jest zaakceptowana — w **tej samej rozmowie** wklejasz PROMPT 2
   (Aplikacja kierowcy), potem 3, 4… Claude Design zna już system, więc kolejne prompty
   są krótsze.
6. Jeśli zaczynasz nową rozmowę, doklej do promptu podstrony rozdziały **3 i 4**
   z PROMPTU 1 (jak pisać + system wizualny) — inaczej projekt rozjedzie się stylistycznie.

Prompt 1 jest samodzielny: zawiera paletę, typografię, treść i opis makiet, więc nie trzeba
niczego doklejać z innych plików.

---

---
---

# PROMPT 1 — STRONA GŁÓWNA

> Skopiuj wszystko poniżej, aż do linii „KONIEC PROMPTU 1”.

---

Zaprojektuj **stronę główną produktu BusiKM** — polskiego programu dla firm transportowych
jeżdżących busami 2,5–3,5 t, w kraju i za granicą. Język strony: **polski, z polskimi znakami**.
Estetyka: **Apple** — spokojna, dorosła, dużo powietrza, duża typografia. Nie krzykliwa.

## 1. Kto to czyta

Właściciel firmy transportowej z trzema do dziesięciu busami. 35–55 lat, zaczynał jako
kierowca. Prowadzi firmę z telefonu, między jednym telefonem od klienta a drugim.
Wieczorem przepisuje coś do Excela. Nie ma cierpliwości do oprogramowania, którego trzeba
się uczyć.

Boi się, że kierowca czegoś nie ogarnie, że wdroży coś, czego nikt nie ruszy, i że nie wie,
czy na danym kursie w ogóle zarobił.

Chce, żeby się samo liczyło.

## 2. Główna obietnica

> **Kierowca jedzie. Reszta dzieje się sama.**

## 3. Jak pisać

Zdania krótkie. Często jedno słowo, kropka, drugie słowo.
Każda funkcja opisana jako to, co czuje właściciel — nigdy jako nazwa modułu.

**Słowa zakazane:** platforma, rozwiązanie, ekosystem, digitalizacja, optymalizacja
procesów, dedykowany, kompleksowy, moduł, funkcjonalność, wdrożenie, w czasie rzeczywistym
(pisz „na żywo”).

**Zakaz twardy: na stronie nie ma ani jednego numeru rozporządzenia, artykułu ustawy,
nazwy przepisu ani kwoty kary.** Piszemy o tym, co człowiek robi i widzi, nie o podstawie
prawnej.

**Tachograf to nie BusiKM.** Tachograf jest wymagany i zapisuje. BusiKM go nie zastępuje,
nie pilnuje jego terminów i tego nie sugeruje — jest **pomocą wizualną dla kierowcy**:
pokazuje na ekranie, ile jeszcze może jechać i kiedy musi stanąć. Na stronie pojawia się
wyłącznie jako jedno zdanie w sekcji o czasie pracy: „Tachograf zapisuje. BusiKM pokazuje.”

**Nie wymyślaj dowodu społecznego.** Produkt nie ma jeszcze klientów. Zero logotypów,
opinii, cytatów, gwiazdek, liczb typu „500 zadowolonych firm”. Jeśli sekcja wygląda pusto —
daj więcej powietrza, nie wymyślonego klienta.

**Nie używaj zdjęć stockowych.** Zamiast nich rysowane makiety interfejsu i typografia.

## 4. System wizualny

### Kolory
```
ink        #0A0A0B   tekst na jasnym, tło sekcji ciemnych
paper      #FAFAFA   tło sekcji jasnych
surface    #111113   karty na ciemnym
mist       #F2F2F4   karty i pasy na jasnym
line       #E3E3E6   subtelne krawędzie
muted      #6E6E76   tekst drugorzędny
blue       #0B5FFF   akcja główna, linki   (hover #0A46C0, pigułka #E8EFFE)
amber      #FF9500   TYLKO wygasające dokumenty w sekcji 6.13 — użyj raz
green      #30D158   stany „gotowe” w makietach
```

Sekcje naprzemiennie jasne i ciemne. Krawędź między nimi ostra, bez przejścia.

### Typografia
Rodzina `Inter`, stos zapasowy `-apple-system, BlinkMacSystemFont, sans-serif`.
```
display   88px / 1.05 / 700 / -0.03em     hero i finał
h1        64px / 1.08 / 700 / -0.025em
h2        40px / 1.15 / 600 / -0.02em     nagłówki sekcji
h3        28px / 1.25 / 600 / -0.01em
lead      22px / 1.5  / 400 / muted
body      17px / 1.6  / 400
caption   14px / 1.5  / 400 / muted       podpisy techniczne, nadtytuły
```
Na telefonie: display 44px, h1 34px, h2 34px, h3 22px, lead 19px.

**Duże nagłówki mają być naprawdę duże** — jedno zdanie zajmujące pół ekranu,
wokół niego pustka.

### Przestrzeń
Sekcje 160 px odstępu pionowego na desktopie, 96 px na telefonie.
Maksymalna szerokość treści 1120 px, wyśrodkowana.
Whitespace jest elementem projektu. W razie wątpliwości — więcej powietrza.

### Detale
Promienie: 12 px przyciski, 20 px karty, 28 px duże panele.
Cienie bardzo delikatne i rozmyte: `0 1px 3px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06)`.
Żadnych ostrych cieni. Gradienty tylko subtelne, jako tło — nigdy na tekście.
Przyciski: wypełniony niebieski (główny), obrysowany (drugi), tekstowy ze strzałką (trzeci).
Na jednym ekranie maksymalnie jeden niebieski przycisk.

### Makiety produktu
Zamiast zdjęć — **rysowane makiety interfejsu**: karty z liczbami, tabele, wykres,
mapa jako abstrakcyjna linia trasy, ekran telefonu. Mają wyglądać jak prawdziwy,
spokojny interfejs. Duże, centralne. To bohater każdej sekcji.

**Ważne — prawdziwe zrzuty aplikacji jeszcze nie istnieją.** W projekcie makiety mają
podwójną rolę: pokazują, co się tam znajdzie, i **są ramką do późniejszej podmiany**.
Dlatego przy każdej makiecie umieść czytelną etykietę z trzema informacjami:

```
DO PODMIANY · EKRAN WŁAŚCICIELA · DESKTOP 1440
Pulpit po zalogowaniu: trzy liczby u góry (przychód, koszty, zysk),
mapa z trasą Warszawa → Mediolan, lista trzech zleceń ze statusami.
mockup-hero-pulpit-desktop.png                              16:10
```

Nazwy plików do wpisania w projekcie:

| Sekcja | Nazwa pliku | Urządzenie |
|---|---|---|
| Hero | `mockup-hero-pulpit-desktop.png` | desktop 16:10 |
| Dyspozytornia | `mockup-dyspozytornia-ekran-desktop.png` | desktop 16:10 |
| Aplikacja kierowcy | `mockup-kierowca-nawigacja-phone.png` | telefon 9:19.5 |
| Aplikacja kierowcy | `mockup-kierowca-koszt-phone.png` | telefon 9:19.5 |
| Zlecenie → faktura | `mockup-faktury-zlecenie-desktop.png` | desktop 4:3 |
| Ile zostaje | `mockup-zysk-karta-desktop.png` | desktop 4:3 |
| Mapa i trasa | `mockup-mapa-flota-desktop.png` | desktop 16:10 |
| Czas pracy | `mockup-czas-pracy-pierscienie-desktop.png` | desktop 4:3 |
| Koszty i paragony | `mockup-koszty-paragon-phone.png` | telefon 9:19.5 |
| Koniec miesiąca | `mockup-ksiegowa-eksport-desktop.png` | desktop 4:3 |
| Dokumenty i terminy | `mockup-dokumenty-terminy-desktop.png` | desktop 4:3 |
| Demo | `mockup-demo-wejscie-desktop.png` | desktop 16:10 |

### Oprawa makiet — najważniejsze, żeby strona nie była jałowa

Sama makieta na gładkim tle wygląda pusto. **Każda dostaje oprawę, która zostaje
w projekcie także po podmianie obrazu:**

- **Hero** — pulpit uniesiony nad stroną, pod nim miękka niebieska poświata rozmyta
  na 120 px. W tle, ledwo widocznie (4–6% kontrastu), kontur mapy Europy z jedną
  świecącą linią trasy.
- **Aplikacja kierowcy** — dwa telefony pod lekkim kątem (−8° i +5°), jeden wysunięty
  do przodu, oba w trybie nocnym. Ciemne tło, pod telefonami poświata jak od świateł
  na drodze, za nimi rozmyta krzywa trasy.
- **Mapa i trasa** — **tło całej sekcji**: bardzo delikatna siatka południków
  i równoleżników plus jedna trasa jako świecąca krzywa biegnąca przez sekcję na ukos.
- **Ile zostaje** — ciemne tło, karta zlecenia unosi się z niebieskim cieniem,
  a duża liczba zysku stoi **obok karty** jako element typograficzny, nie w środku makiety.
- **Koszty i paragony** — telefon w perspektywie, obok „odklejony” panel z rozpoznanymi
  polami, jakby dane wyskakiwały ze zdjęcia paragonu.
- **Koniec miesiąca** — kilka arkuszy w perspektywie, jeden na wierzchu: stos dokumentów,
  który zaraz pójdzie do księgowej.
- **Cztery osoby** — cztery różne kadry: trzy ekrany przeglądarki i jeden telefon.
  Ma być widać, że to cztery różne stanowiska pracy.

Zasady: poświaty jednotonowe, nigdy tęczowe. Kąt telefonów maksymalnie 10°.
Tła sekcyjne poniżej 8% kontrastu — mają być tłem, nie wzorem. Nic nie może przeszkadzać
w czytaniu nagłówka.

### Widać transport od pierwszej sekundy
W każdej makiecie **prawdziwe dane z jego świata**: trasy `Warszawa → Mediolan`,
`Poznań → Rotterdam`, numery rejestracyjne `WZ 4821K`, `PO 2093J`, imiona kierowców
`Marek W.`, `Tomasz L.`, słowa: fracht, załadunek, rozładunek, opłata drogowa, dieta.
Kwoty w złotych i w euro.

**Czego nie robimy:** ikon ciężarówek, zdjęć autostrad o zachodzie słońca, rysunkowych
busów, kierowców z kciukiem w górę. Transport widać po danych, nie po obrazkach.

## 5. Pasek nawigacji

Wysokość 72 px, przyklejony, białe tło z rozmyciem, cienka linia u dołu,
cień pojawia się po przewinięciu 24 px.

```
BusiKM     Co robi ▾    Dla kogo ▾    Cennik    Pomoc ▾      Zaloguj się   [ Zobacz demo ]
```

**Zaprojektuj oba rozwijane menu.** To nie mają być listy etykiet — każda pozycja
to korzyść pogrubiona plus jedno zdanie wyjaśnienia.

**Menu „Co robi”** — trzy kolumny z szarymi nagłówkami wersalikami, plus kafel po prawej:

*W TRASIE:*
- **Aplikacja kierowcy** — Nawigacja, trasa i koszty w jednej aplikacji
- **Trasy i mapa floty** — Widzisz, gdzie jest każdy bus. Bez dzwonienia
- **Czas pracy i przerwy** — Wiesz, kiedy kierowca musi stanąć

*W BIURZE:*
- **Dyspozytornia** — Cały dzień pracy na jednym ekranie
- **Zlecenia i faktury** — Ze zlecenia robi się faktura. Klient dostaje ją od razu
- **Ile zostaje** — Zysk na każdym kursie, na bieżąco

*NA KONIEC MIESIĄCA:*
- **Koszty i paragony** — Zdjęcie zamiast reklamówki pod siedzeniem
- **Dane dla księgowej** — Komplet dokumentów jednym przyciskiem
- **Dokumenty i terminy** — Nic nie wygaśnie po cichu

*Kafel po prawej, tło mist:* **Zobacz demo** — Prawdziwa aplikacja z przykładową firmą.
Bez zakładania konta. →

**Menu „Dla kogo”** — cztery pozycje:
- **Właściciel** — Zysk, koszty i cała flota na jednym ekranie
- **Dyspozytor** — Zlecenia, mapa i kierowca w jednym miejscu
- **Księgowa** — Komplet dokumentów jednym przyciskiem
- **Kierowca** — Jeden przycisk: rusz. Resztą zajmuje się telefon

*Na dole menu, drobnym szarym:* W małej firmie jedna osoba nosi dwie role.
Przełączasz widok jednym kliknięciem.

## 6. Sekcje strony — treść dokładnie taka, jak niżej

Nie skracaj i nie parafrazuj nagłówków — są dobrane pod rytm.

### 6.1 Hero — jasna
Nadtytuł (caption, wersaliki, szary): BUSY 2,5–3,5 T · TRANSPORT KRAJOWY I MIĘDZYNARODOWY
Nagłówek (display): **Kierowca jedzie. / Reszta dzieje się sama.**
Podtytuł: *Zlecenia, trasy, koszty, faktury i komplet dla księgowej — w jednym miejscu.
Kierowca ma telefon w kieszeni, Ty masz robotę zrobioną.*
Przyciski: `Wypróbuj 14 dni` (niebieski) · `Zobacz demo` (obrysowany)
Drobnym pod przyciskami: *Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.*
Makieta: duży pulpit właściciela uniesiony nad stroną — trzy liczby (przychód, koszty,
**zysk**), mapa z linią trasy, lista trzech zleceń ze statusami.

### 6.2 Cztery rzeczy, których nie będziesz już robił — jasna, pas mist
Nagłówek (h2): **Cztery rzeczy, których nie będziesz już robił.**
Cztery kolumny, w każdej zdanie przekreślone i zdanie pod nim:
- ~~Dzwonisz do kierowcy: „gdzie jesteś?”~~ → Widzisz go na mapie
- ~~Wieczorem przepisujesz do Excela~~ → Liczy się samo, w trakcie
- ~~Zbierasz paragony z reklamówki~~ → Kierowca robi zdjęcie w trasie
- ~~Odpisujesz księgowej, czego brakuje~~ → Dostaje komplet jednym przyciskiem

### 6.3 Cztery osoby. Jeden system — CIEMNA
Nadtytuł (caption, wersaliki): CZTERY ROLE
Nagłówek: **Cztery osoby. Jeden system. / Każdy widzi swoje.**
Cztery zakładki, po lewej opis, po prawej makieta ekranu tej roli:
- **Właściciel** · przeglądarka — *Widzisz, ile zostaje. Dziś, nie po miesiącu.*
  Przychód, koszty i zysk na pierwszym ekranie. Cała flota na mapie. Marża na każdym kursie.
- **Dyspozytor** · przeglądarka — *Cały dzień pracy na jednym ekranie.*
  Zlecenia, mapa, kierowcy i rozmowa obok siebie. Trasa układa się sama.
- **Księgowa** · przeglądarka — *Koniec miesiąca w jednym kliknięciu.*
  Komplet dokumentów w formacie jej programu. Zamyka miesiąc.
- **Kierowca** · telefon — *Rusz. Resztą zajmuje się telefon.*
  Zlecenie, nawigacja, przerwy i koszty w jednej aplikacji.
Drobnym pod spodem: *Jesteś właścicielem i dyspozytorem w jednej osobie? Normalne.
Przełączasz widok jednym kliknięciem.*

### 6.4 Trzy ruchy — jasna
Nagłówek: **Trzy ruchy. Reszta dzieje się bez Ciebie.**
- **01 Kierowca rusza** — Włącza trasę w telefonie. Robi zdjęcie licznika. Tyle.
- **02 Dane same lecą** — Trasa, kilometry, czas pracy, paragony. Wszystko ląduje u Ciebie —
  nawet wtedy, gdy kierowca nie ma zasięgu.
- **03 Miesiąc się zamyka** — Faktury dla klientów, koszty, przebieg i komplet dla księgowej.
  Jednym przyciskiem.

### 6.5 Dyspozytornia — jasna
Nagłówek: **Cały dzień pracy na jednym ekranie.**
Treść: *Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Nie przełączasz zakładek
i nie szukasz numeru w telefonie. Przypisujesz kierowcę i pojazd, a system podpowiada,
kto ma wszystko ważne.*
Trzy punkty: Zlecenie od przyjęcia po rozliczenie · Kierowca i pojazd przypisani
w dwie sekundy · Rozmowa z kierowcą bez wychodzenia z ekranu
Podpis szary: *Dyspozytor ma w BusiKM własne stanowisko i własny dostęp.*
Makieta: szeroki ekran w trzech kolumnach — lista zleceń, mapa, panel kierowcy z rozmową.

### 6.6 Aplikacja kierowcy — CIEMNA, pełny ekran
Nadtytuł: BUSIKM KIEROWCA · iPHONE I ANDROID
Nagłówek: **Cały dzień pracy w jednej aplikacji.**
Treść: *Kierowca dostaje kod, wpisuje go raz i jest w środku. Nie zakłada konta,
nie wymyśla hasła, nie dzwoni do Ciebie z pytaniem, jak się zalogować.*
Sześć punktów w dwóch rzędach, każdy z drobną ikoną:
- **Nawigacja jest w środku** — Trasa ze zlecenia prowadzi go od razu. Nie przeskakuje
  między aplikacjami
- **Koszt jednym przyciskiem** — Zatankował, pstryknął, jedzie dalej
- **Działa bez zasięgu** — Tunel, góry, terminal promowy. Wszystko dośle, gdy złapie sygnał
- **Widzi, co czeka na wysłanie** — Żadnego zgadywania, czy dane doszły
- **Sześć języków** — Kierowca czyta w swoim języku, nie w Twoim
- **Tryb nocny** — O trzeciej nad ranem ekran nie razi w oczy
Na dole: dwie odznaki sklepów z **prawdziwymi znakami App Store i Google Play** — jabłko w bieli, trójkąt Google Play w czterech kolorach marki. Kontener obrysowany, wysokość 48 px, promień 12 px.
Makieta: dwa telefony pod lekkim kątem, w trybie nocnym, podświetlone od dołu.
Lewy — nawigacja z trasą i kartą zlecenia u dołu. Prawy — dodawanie kosztu ze zdjęciem paragonu.

### 6.7 Zlecenie → faktura → klient — jasna
Nagłówek: **Ze zlecenia robi się faktura. / Klient ma ją, zanim wrócisz do biura.**
Treść: *Zlecenie i faktura to jedno. Kierowca kończy kurs, Ty sprawdzasz kwotę i wysyłasz —
plik na mail klienta i zgłoszenie do systemu e-faktur, jednym kliknięciem. Nic nie przepisujesz.*
Trzy punkty: Faktura powstaje z danych zlecenia · Wysyłka do klienta i do systemu e-faktur
jednym kliknięciem · Korekty i zaliczki tą samą ścieżką
Makieta: karta zlecenia po lewej, faktura po prawej, strzałka między nimi,
na fakturze przycisk „Wyślij” i dwa znaczniki: mail, e-faktura.

### 6.8 Ile zostaje — CIEMNA
Nagłówek: **Wiesz, ile zostaje. / Na tym kursie. Dziś.**
Treść: *Fracht minus paliwo, opłaty drogowe, hotel i dieta kierowcy. Kierowca dodaje
paragon w trasie — liczba na Twoim ekranie zmienia się od razu. Nie na koniec kwartału.*
Trzy punkty: Przychód, koszty i zysk na pulpicie, na bieżąco · Marża na każdym zleceniu
z osobna · Koszty w obcych walutach przeliczone po kursie z dnia
Makieta: karta zlecenia Warszawa → Mediolan, rozbicie kosztów w wierszach,
duża liczba zysku na dole, obok mały wykres dzienny.

### 6.9 Mapa i trasa — jasna
Nagłówek: **Klient pyta, gdzie jest ładunek. / Odpowiadasz w pięć sekund.**
Treść: *Każdy bus na mapie, na żywo. Klikasz — widzisz kierowcę, zlecenie i o której
będzie na miejscu.*
Drugi nagłówek (h3): **Trasa układa się sama.**
Treść: *System proponuje przejazd i bierze pod uwagę, co się dzieje na drodze.
Coś się zmienia w trakcie — poprawiasz trasę u siebie, a kierowca ma nową wersję
w telefonie w tej samej chwili.*
Makieta: mapa Europy z linią trasy i trzema znacznikami pojazdów, jeden dymek
z numerem rejestracyjnym, kierowcą i godziną dojazdu.

### 6.10 Czas pracy i przerwy — CIEMNA
Nagłówek: **Wiesz, kiedy kierowca musi stanąć. / Zanim stanie za późno.**
Treść: *Jazda, przerwy i odpoczynki liczą się same. Kierowca dostaje przypomnienie wcześniej,
nie po fakcie. Ty widzisz to samo, ze swojego biura.*
Trzy punkty: Liczniki działają też bez zasięgu · Miesięczna karta czasu pracy do wydruku ·
Dni w każdym kraju liczone z trasy, nie z notatek
Drugi nagłówek (h3): **Tachograf zapisuje. BusiKM pokazuje.**
Treść: *Tachograf jest wymagany i robi swoje — rejestruje. BusiKM go nie zastępuje i nie udaje.
Jest po to, żeby kierowca widział na ekranie, ile jeszcze może jechać i kiedy musi stanąć.
Wcześniej, a nie po fakcie.*
Makieta: trzy pierścienie postępu (jazda, przerwa, odpoczynek), obok lista kierowców
ze statusem: w normie · przerwa za 40 min · odpoczynek.

### 6.11 Koszty i paragony — jasna
Nagłówek: **Reklamówka paragonów. Do wyrzucenia.**
Treść: *Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same,
a koszt trafia do właściwego zlecenia i właściwego pojazdu.*
Trzy punkty: Paliwo, opłaty drogowe, hotel, prom, parking, naprawa · Obca waluta
przeliczona automatycznie · Zdjęcie zostaje jako dowód
Makieta: telefon ze zdjęciem paragonu, obok formularz z polami podświetlonymi na zielono.

### 6.12 Koniec miesiąca — CIEMNA
Nagłówek: **Księgowa dostaje komplet. / Jednym przyciskiem.**
Treść: *Wybiera miesiąc, klika raz i ma wszystko: sprzedaż, koszty, przebieg, delegacje
i czas pracy. W formacie, który wczyta do programu, którego już używa.*
Trzy punkty: Insert, Comarch Optima, Symfonia albo zwykły arkusz · System sam mówi,
czego brakuje · Zamyka miesiąc i nikt nie zmienia już danych wstecz
Drobnym: *Księgowa może być z zewnątrz. Zapraszasz ją mailem, dostaje własny dostęp.*
Makieta: lista dziewięciu zestawień z licznikami, u góry duży przycisk
„Pobierz komplet za sierpień” i wybór formatu.

### 6.13 Dokumenty i terminy — jasna
Nagłówek: **Nic nie wygaśnie po cichu.**
Treść: *Ubezpieczenie, przegląd, licencja, prawo jazdy, badania kierowców.
System pilnuje dat i mówi wcześniej — Tobie i kierowcy.*
Trzy punkty: Wszystko w jednym miejscu — pojazdy, firma, kierowcy · Przypomnienie
na długo przed terminem, Tobie i kierowcy · Jeden ekran pokazuje, co wymaga uwagi
w tym miesiącu
Makieta: lista dokumentów posortowana po dniach do końca ważności, paski w trzech kolorach.
**To jedyne miejsce na stronie z kolorem amber** — dokument, który zaraz wygaśnie.
**Sekcja ma być spokojna. Żadnej czerwieni, żadnych trójkątów ostrzegawczych,
żadnego odliczania.**

### 6.14 Rzeczy, które widać dopiero w robocie — CIEMNA
Nagłówek: **Rzeczy, które widać dopiero w robocie.**
Siatka ośmiu kafelków, bez makiet:
- **Tryb nocny** — W telefonie kierowcy i w przeglądarce. Oczy podziękują
- **Sześć języków** — Kierowca z Ukrainy, Rumunii czy Mołdawii czyta w swoim
- **Bez zasięgu też działa** — Dane czekają w telefonie i dosyłają się same
- **System sam się odzywa** — Powiadomienie, gdy coś wymaga uwagi. Nie musisz zaglądać
- **Nic nie instalujesz** — Otwierasz w przeglądarce, na laptopie i na telefonie
- **Na starcie nie przytłacza** — Widzisz tylko to, co potrzebne. Reszta z czasem
- **Widać, kto co zmienił** — Każda zmiana ma autora i godzinę
- **Dane zostają w Europie** — I zostają Twoje, także po rezygnacji

### 6.15 Demo — jasna
Nagłówek: **Nie wierz na słowo. Wejdź i poklikaj.**
Treść: *To prawdziwa aplikacja z przykładową firmą. Bez zakładania konta, bez podawania
czegokolwiek. Niczego nie zepsujesz — dane wracają do porządku każdej nocy.*
Cztery kafelki: Pulpit z zyskiem miesiąca · Dyspozytornia z mapą · Zlecenie,
z którego powstaje faktura · Komplet dokumentów dla księgowej
Przycisk: `Wejdź do demo`. Pod nim tekstowo: `Chcesz na swoich danych? Wypróbuj 14 dni →`

### 6.16 Pierwszy dzień — jasna, tło mist
Nagłówek: **Pierwsza trasa jeszcze dziś.**
Trzy kroki z czasem: **Dodajesz pojazd** · 2 minuty — *Numer rejestracyjny i tyle.* ·
**Zapraszasz kierowcę** · 1 minuta — *Dostaje kod. Wpisuje go w aplikacji i już jest w środku.* ·
**Kierowca rusza** · od razu — *Pierwsza trasa pojawia się u Ciebie tego samego dnia.*
Drobnym: *Nie ma wdrożenia, szkolenia ani spotkania z handlowcem.*

### 6.17 Jedna faktura zamiast czterech — jasna
Nagłówek: **Jedna faktura zamiast czterech.**
Dwie kolumny, **bez nazw konkurencji i bez cudzych cen**:
*Dziś płacisz osobno za:* lokalizator w busie · program do rozliczania czasu pracy ·
system do zleceń i faktur · arkusz, który prowadzisz sam
*Z BusiKM:* Jedno konto. Jeden rachunek. Wszystko rozmawia ze sobą.

### 6.18 Cennik — jasna
Nagłówek: **Płacisz za pojazdy. Nie za ludzi.**
Podtytuł: *Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się
do abonamentu.*
Przełącznik Miesięcznie / Rocznie, przy rocznym etykieta **„2 miesiące gratis”** (nie procent).
Dwie karty:
| | Start | Firma |
|---|---|---|
| Miesięcznie | 149 zł netto | 299 zł netto |
| Rocznie | 1 490 zł netto | 2 990 zł netto |
| Pojazdy | do 3 | do 10, każdy kolejny +29 zł |
| Kierowcy | bez limitu | bez limitu |
| Pracownicy biura | bez limitu | bez limitu |
Karta **Firma** wyróżniona obwódką i etykietą „Najczęściej wybierany”.
W Start: zlecenia i dyspozytornia · mapa i trasy · czas pracy · koszty i paragony ·
faktury dla klientów · aplikacja dla kierowców
W Firma: wszystko ze Start, a do tego komplet dla księgowej · zestawienia sprzedaży
i zakupów · rentowność zleceń · raporty kosztów floty
Drobnym: *Bez umowy na czas określony. Rezygnujesz jednym kliknięciem.
Twoje dane pobierzesz zawsze — także po rezygnacji.*

### 6.19 Twoje dane zostają Twoje — CIEMNA
Nagłówek: **Twoje dane zostają Twoje.**
Cztery punkty: Trzymamy je w Europie · Kopia zapasowa codziennie ·
Rezygnujesz — pobierasz wszystko · Widać, kto co zmienił i kiedy

### 6.20 Pytania — jasna
Akordeon, domyślnie zamknięty, dziewięć pozycji:
1. **Mój kierowca tego nie ruszy.** — Kierowca ma trzy przyciski: rusz, zrób zdjęcie,
   zakończ. Dostaje kod, wpisuje go raz i jest w środku. Aplikacja jest w jego języku.
2. **Czy moja księgowa będzie musiała się przestawiać?** — Nie. Pobiera plik i wczytuje
   do programu, którego już używa.
3. **Mam już lokalizator w busach.** — BusiKM pokazuje pozycję z telefonu kierowcy
   i łączy ją z tym, czego lokalizator nie umie: ze zleceniem, kosztami i rozliczeniem.
4. **Mam tachograf. Po co mi jeszcze to?** — Tachograf zapisuje, bo musi. BusiKM pokazuje —
   kierowca widzi na ekranie, ile jeszcze może jechać i kiedy musi stanąć, a Ty widzisz
   to samo z biura. To nie to samo urządzenie i nie ta sama robota.
5. **Co, gdy kierowca nie ma zasięgu?** — Aplikacja pracuje dalej i zapisuje wszystko
   w telefonie. Gdy złapie sygnał, dane dojeżdżają same.
6. **Ile trwa uruchomienie?** — Dodajesz pojazd, zapraszasz kierowcę, kierowca instaluje
   aplikację. Pierwsza trasa pojawia się u Ciebie tego samego dnia.
7. **Czy dyspozytor widzi, ile zarabiam?** — Nie musi. Pieniądze widzi właściciel
   i osoba od rozliczeń.
8. **Czy przyczepa liczy się jako pojazd?** — Nie. Płacisz tylko za pojazdy napędzane.
9. **Co z danymi, gdy zrezygnuję?** — Zostają Twoje. Pobierzesz je w komplecie.

### 6.21 Finał — CIEMNA
Nagłówek (display, wyśrodkowany): **Zacznij od jednej trasy.**
Podtytuł: *14 dni bez opłat. Bez umowy. Bez dzwonienia do handlowca.*
Przyciski: `Wypróbuj 14 dni` · `Zobacz demo`

### 6.22 Stopka — ciemna
Cztery kolumny: **Co robi** (dziewięć pozycji) · **Dla kogo** (cztery role) ·
**Firma** (Cennik, Demo, Pomoc, Kontakt, Status usługi) ·
**Prawne** (Regulamin, Polityka prywatności, Powierzenie danych, Podprocesorzy).
Pasek dolny: nazwa spółki, NIP, adres e-mail, zdanie *„Twoje dane zostają w Europie”*.
Bez ikon mediów społecznościowych.

## 7. Ruch przy przewijaniu

Zaznacz w projekcie (adnotacjami przy sekcjach), że treść **wchodzi** przy przewijaniu:
przezroczystość od zera i przesunięcie 28 px w górę, krzywa `cubic-bezier(0.16,1,0.3,1)`,
700 ms, kaskada 90 ms w grupach. Trzy sekcje są scenami przyklejonymi, w których treść
podmienia się przy przewijaniu: **Cztery osoby**, **Aplikacja kierowcy**, **Trzy ruchy**.
Bez przechwytywania przewijania, bez ruchu poziomego.

## 8. Co wyprodukować

Trzy artboardy na jednym płótnie:

1. **Desktop 1440 px** — cała strona od nawigacji do stopki, jako jedna długa sekcja
2. **Telefon 390 px** — cała strona, z przeskalowaną typografią, kartami cennika jedna
   pod drugą i otwartym menu jako osobnym stanem
3. **Stany nawigacji 1440 × 900 px** — pasek domyślny, pasek po przewinięciu,
   otwarte menu „Co robi”, otwarte menu „Dla kogo”, menu na telefonie

Wszystko po polsku, z polskimi znakami. Treść dokładnie taka, jak wyżej.

Każda makieta w projekcie ma etykietę „DO PODMIANY” z opisem zawartości i nazwą pliku
— patrz rozdział o makietach. Oprawa (poświaty, kąty telefonów, tła sekcyjne) jest częścią
projektu i zostaje po podmianie obrazów.

## 9. Kryterium sukcesu

Właściciel firmy transportowej przewija stronę na telefonie, między jednym telefonem
od klienta a drugim, i po dziesięciu sekundach wie:

**„To zbiera dane z moich kierowców, pokazuje mi zysk i zamyka mi miesiąc.”**

Jeśli musi czytać, żeby to zrozumieć — projekt jest za gęsty.

---
**KONIEC PROMPTU 1**

---
---

## Wspólna część każdego promptu

Jeśli projektujesz w **tej samej rozmowie**, w której powstała strona główna — możesz ten
rozdział pominąć, Claude Design zna już system. W nowej rozmowie wklej go przed treścią strony.

> Projektujesz podstronę serwisu **BusiKM** — polskiego programu dla firm transportowych
> jeżdżących busami 2,5–3,5 t. Język: **polski, z polskimi znakami**. Estetyka Apple:
> spokojna, dorosła, dużo powietrza, duża typografia.
>
> **Kolory:** ink `#0A0A0B`, paper `#FAFAFA`, surface `#111113`, mist `#F2F2F4`,
> line `#E3E3E6`, muted `#6E6E76`, blue `#0B5FFF` (hover `#0A46C0`, pigułka `#E8EFFE`),
> amber `#FF9500` (tylko wygasające dokumenty), green `#30D158`.
> Sekcje naprzemiennie jasne i ciemne, krawędź ostra.
>
> **Typografia** Inter: display 88 / h1 64 / h2 40 / h3 28 / lead 22 / body 17 / caption 14.
> Na telefonie display 44, h1 34, h2 34, h3 22, lead 19.
>
> **Rytm:** sekcje 160 px na desktopie, 96 px na telefonie. Treść w 1120 px, wyśrodkowana.
> Promienie 12 / 20 / 28 px. Cienie delikatne i rozmyte.
>
> **Pasek nawigacji i stopka** takie same jak na stronie głównej.
>
> **Jak pisać:** zdania krótkie, każda funkcja opisana jako to, co czuje właściciel.
> Zakazane: platforma, rozwiązanie, ekosystem, digitalizacja, moduł, funkcjonalność,
> wdrożenie, dedykowany, kompleksowy.
>
> **Zakaz twardy:** ani jednego numeru rozporządzenia, artykułu ustawy, nazwy przepisu
> ani kwoty kary. Zero wymyślonego dowodu społecznego — produkt nie ma jeszcze klientów.
> Zero zdjęć stockowych.
>
> **Szkielet podstrony:**
> 1. Nagłówek — korzyść w dwóch linijkach, zdanie pod spodem, przyciski
>    `Wypróbuj 14 dni` (niebieski) i `Zobacz demo` (obrysowany)
> 2. Duża makieta tego jednego ekranu, o którym jest strona
> 3. Bloki „co to znaczy w praktyce" — naprzemiennie tekst i makieta
> 4. Siatka drobiazgów — sześć kafelków
> 5. Kto tego używa — jedna albo dwie role, z odnośnikiem
> 6. Trzy pytania dotyczące tylko tego obszaru
> 7. Finał, ten sam na wszystkich podstronach: **Zacznij od jednej trasy.**
>    Podtytuł: *14 dni bez opłat. Bez umowy. Bez dzwonienia do handlowca.*
>
> **Makiety:** rysuj uproszczone ekrany interfejsu. Przy każdej umieść etykietę
> „DO PODMIANY", opis zawartości i nazwę pliku — te zrzuty podmienimy na prawdziwe.
> W makietach prawdziwe dane z tego świata: trasy `Warszawa → Mediolan`,
> `Poznań → Rotterdam`, numery `WZ 4821K`, `PO 2093J`, kierowcy `Marek W.`, `Tomasz L.`,
> słowa: fracht, załadunek, rozładunek, opłata drogowa, dieta. Kwoty w złotych i w euro.
>
> **Do wyprodukowania:** dwa artboardy — desktop 1440 i telefon 390.

---
---

# PROMPT 2 — APLIKACJA KIEROWCY

> Adres strony: `/co-robi/aplikacja-kierowcy`
> Skopiuj wszystko poniżej, aż do „KONIEC PROMPTU 2".

---

Zaprojektuj podstronę **Aplikacja kierowcy**.

To najważniejsza podstrona serwisu. Rozstrzyga się na niej największa obiekcja właściciela:
**„mój kierowca tego nie ruszy"**. Wszystko na tej stronie ma pokazywać, że kierowca nie
musi niczego wpisywać ani się uczyć.

**Nadtytuł:** BUSIKM KIEROWCA · iPHONE I ANDROID

**Nagłówek:** Cały dzień pracy w jednej aplikacji. / Bez wpisywania czegokolwiek w trasie.

**Zdanie pod nagłówkiem:** *Kierowca dostaje kod, wpisuje go raz i jest w środku.
Reszta to trzy przyciski.*

**Osiem bloków, naprzemiennie tekst i makieta telefonu:**

1. **Wchodzi kodem, nie zakłada konta** — Wysyłasz zaproszenie, kierowca dostaje kod,
   ustawia własne hasło. Nie dzwoni do Ciebie z pytaniem, jaki ma login.
2. **Nawigacja jest w środku** — Trasa ze zlecenia prowadzi go od razu, w tej samej
   aplikacji. Nie przeskakuje między nawigacją a resztą, nie przepisuje adresu z jednej
   aplikacji do drugiej. Zmieniasz trasę u siebie — on ma nową wersję w telefonie
   w tej samej chwili.
3. **Rusza jednym przyciskiem** — Zdjęcie licznika, przycisk „Rozpocznij trasę" i jedzie.
   Telefon może zostać w kieszeni, ekran wyłączony. Trasa nagrywa się sama.
4. **Koszt dodaje jednym przyciskiem** — Zatankował, pstryknął paragon i jedzie dalej.
   Kwota, data i sprzedawca wpisują się same, koszt trafia do tego zlecenia i tego pojazdu.
5. **Przerwa i powrót jednym tapnięciem** — Aplikacja przypomina o obowiązkowej przerwie
   zanim będzie za późno, nie po fakcie.
6. **Działa bez zasięgu** — Tunel, góry, terminal promowy, parking pod granicą. Wszystko
   zapisuje się w telefonie i dosyła, gdy wróci sygnał. Kierowca ma ekran „Do wysłania"
   i widzi, co jeszcze czeka.
7. **Trasa poza zleceniem** — Dojazd do bazy, przejazd do serwisu też się liczy.
   Start, stop, potwierdzenie.
8. **Jego dokumenty w telefonie** — Prawo jazdy, badania, uprawnienia. Aplikacja przypomina
   o terminach jemu i Tobie.

**Siatka drobiazgów, sześć kafelków:** Tryb nocny · Sześć języków · Powiadomienia o nowym
zleceniu · Bateria wystarcza na całą zmianę · Podgląd własnych tras z historii ·
Kontakt z biurem jednym tapnięciem

**Makiety — pięć ekranów telefonu, wszystkie w trybie nocnym:**
lista zleceń · nawigacja z kartą zlecenia u dołu · dodawanie kosztu ze zdjęciem paragonu ·
licznik czasu pracy · ekran „Do wysłania".
Nazwy plików: `mockup-kierowca-zlecenia-phone.png`, `mockup-kierowca-nawigacja-phone.png`,
`mockup-kierowca-koszt-phone.png`, `mockup-kierowca-czas-phone.png`,
`mockup-kierowca-wysylka-phone.png`. Proporcje 9:19.5.

**Na dole sekcji:** odznaki App Store i Google Play z prawdziwymi znakami sklepów —
jabłko w bieli, czterokolorowy trójkąt Google Play. Kontener obrysowany, wysokość 48 px.

**Kto tego używa:** Kierowca — z odnośnikiem do `/dla-kogo/kierowca`.

**Trzy pytania:**
- **Czy kierowca musi mieć służbowy telefon?** — Nie. Aplikacja działa na jego własnym
  telefonie, a firmowych danych nie zostawia po odejściu.
- **Czy aplikacja zużywa dużo danych?** — Nie. Trasa to punkty, nie obraz. Zdjęcia
  paragonów wysyłają się skompresowane, a bez zasięgu czekają w telefonie.
- **Co, gdy kierowca zmieni telefon?** — Instaluje aplikację na nowym, loguje się
  i ma wszystko. Nic nie ginie, bo dane są u Ciebie, nie w telefonie.

---
**KONIEC PROMPTU 2**

---
---

# PROMPT 3 — DYSPOZYTORNIA

> Adres strony: `/co-robi/dyspozytornia`
> Skopiuj wszystko poniżej, aż do „KONIEC PROMPTU 3".

---

Zaprojektuj podstronę **Dyspozytornia**.

Czytelnikiem jest właściciel, który sam prowadzi trasy, albo firma, w której robi to osobna
osoba. Strona ma pokazać jeden ekran, na którym mieści się cały dzień pracy.

**Nadtytuł:** DYSPOZYTORNIA

**Nagłówek:** Cały dzień pracy na jednym ekranie.

**Zdanie pod nagłówkiem:** *Zlecenia, mapa, kierowcy i rozmowa — obok siebie.
Bez przełączania zakładek.*

**Siedem bloków:**

1. **Jeden ekran zamiast czterech okien** — Po lewej zlecenia, w środku mapa, po prawej
   kierowca. Wszystko widać naraz.
2. **Zlecenie od przyjęcia po rozliczenie** — Zleceniodawca, załadunek, rozładunek, terminy,
   stawka. Status widać na liście: przyjęte, w drodze, rozładunek, dostarczone.
3. **Kierowca i pojazd w dwie sekundy** — Przypisujesz, a system podpowiada, kto ma ważne
   uprawnienia i wolny czas pracy.
4. **Trasa układa się sama** — System proponuje przejazd i bierze pod uwagę, co dzieje się
   na drodze.
5. **Zmiana w trakcie jazdy** — Klient przesuwa rozładunek, na trasie robi się korek —
   poprawiasz u siebie, kierowca ma nową wersję od razu.
6. **Rozmowa bez wychodzenia z ekranu** — Piszesz do kierowcy stąd. Nie szukasz numeru,
   nie dzwonisz, nie tłumaczysz przez telefon, gdzie ma skręcić.
7. **Dyspozytor to osobne stanowisko** — Ma własny dostęp. Widzi to, czego potrzebuje
   do prowadzenia tras — nie musi widzieć rozliczeń firmy. W małej firmie właściciel
   przełącza się na ten widok jednym kliknięciem.

**Siatka drobiazgów, sześć kafelków:** Zlecenie z pliku klienta · Podpowiedź wolnego
kierowcy · Historia zleceń z filtrami · Wysyłka zlecenia na telefon · Statusy widoczne
u klienta · Dwa zlecenia na jednym przejeździe

**Makieta główna:** pełnoekranowy pulpit dyspozytora, trzy kolumny — lista zleceń, mapa
z trasami, panel kierowcy z rozmową. Plik `mockup-dyspozytornia-ekran-desktop.png`, 16:10.
Dodatkowo dwie mniejsze: karta zlecenia (`mockup-dyspozytornia-zlecenie-desktop.png`, 4:3)
i podgląd trasy z korkiem (`mockup-dyspozytornia-trasa-desktop.png`, 4:3).

**Kto tego używa:** Dyspozytor i Właściciel — odnośniki do `/dla-kogo/dyspozytor`
i `/dla-kogo/wlasciciel`.

**Trzy pytania:**
- **Czy dyspozytor widzi, ile zarabiam?** — Nie musi. Prowadzi trasy i zlecenia.
  Pieniądze widzi właściciel i osoba od rozliczeń.
- **Czy mogę być dyspozytorem i właścicielem naraz?** — Tak, i tak jest najczęściej.
  Przełączasz widok jednym kliknięciem.
- **Ilu dyspozytorów mogę dodać?** — Tylu, ilu potrzebujesz. Płacisz za pojazdy,
  nie za ludzi.

---
**KONIEC PROMPTU 3**

---
---

# PROMPT 4 — DANE DLA KSIĘGOWEJ

> Adres strony: `/co-robi/dane-dla-ksiegowej`
> Skopiuj wszystko poniżej, aż do „KONIEC PROMPTU 4".

---

Zaprojektuj podstronę **Dane dla księgowej**.

Czyta ją właściciel, ale decyduje księgowa. Strona ma zdjąć obawę, że trzeba będzie zmienić
program księgowy albo sposób pracy.

**Nadtytuł:** DANE DLA KSIĘGOWEJ

**Nagłówek:** Komplet dokumentów. / Jednym przyciskiem.

**Zdanie pod nagłówkiem:** *Wybiera miesiąc, klika raz i ma wszystko — w formacie programu,
którego już używa.*

**Osiem bloków:**

1. **Wybiera miesiąc i klika raz** — Dostaje wszystko za ten okres, bez proszenia
   o brakujące papiery.
2. **W formacie jej programu** — Insert, Comarch Optima, Symfonia albo zwykły arkusz.
3. **Dziewięć zestawień** — Sprzedaż, zakupy, koszty, przebieg, delegacje, czas pracy,
   kursy walut i pozostałe.
4. **System sam mówi, czego brakuje** — Zanim plik pójdzie dalej, widać, co jest niekompletne.
5. **Zamknięcie miesiąca** — Po zamknięciu nikt nie zmienia danych wstecz.
6. **Historia pobrań** — Każdy plik można pobrać ponownie.
7. **Rozliczenie kierowców** — Dni za granicą, diety, wypłata. Gotowe do wczytania.
8. **Księgowa z zewnątrz** — Zapraszasz ją mailem, dostaje własny dostęp i widzi tylko to,
   co powinna.

**Siatka drobiazgów, sześć kafelków:** Kurs waluty zapisany przy dokumencie · Zdjęcie
paragonu zostaje dowodem · Zestawienie użytych kursów za okres · Wydruk karty czasu pracy ·
Podgląd przed pobraniem · Dostęp tylko do odczytu

**Makieta główna:** centrum eksportów — lista dziewięciu zestawień z licznikami, u góry
duży przycisk „Pobierz komplet za sierpień" i wybór formatu.
Plik `mockup-ksiegowa-eksport-desktop.png`, 4:3.
Dodatkowo: ekran walidacji przed eksportem (`mockup-ksiegowa-walidacja-desktop.png`, 4:3)
i rozliczenie kierowcy z dietami (`mockup-ksiegowa-diety-desktop.png`, 4:3).

**Kto tego używa:** Księgowa — odnośnik do `/dla-kogo/ksiegowa`.

**Trzy pytania:**
- **Czy moja księgowa będzie musiała się przestawiać?** — Nie. Pobiera plik i wczytuje
  do programu, którego już używa.
- **A jeśli mam biuro rachunkowe, nie księgową na etacie?** — To samo. Zapraszasz je mailem
  i dostaje własny dostęp do Twojej firmy.
- **Co, jeśli używa programu, którego nie ma na liście?** — Jest jeszcze zwykły arkusz,
  z osobną zakładką na każde zestawienie.

---
**KONIEC PROMPTU 4**

---
---

# PROMPT 5 — ILE ZOSTAJE

> Adres strony: `/co-robi/rentownosc`
> Skopiuj wszystko poniżej, aż do „KONIEC PROMPTU 5".

---

Zaprojektuj podstronę **Ile zostaje**.

To strona o pieniądzach — jedyna, na której wolno pokazać duże liczby. Ma odpowiadać
na pytanie, którego właściciel nie zadaje głośno: *czy ja na tym w ogóle zarabiam?*

**Nadtytuł:** ILE ZOSTAJE

**Nagłówek:** Wiesz, ile zostaje. / Na tym kursie. Dziś.

**Zdanie pod nagłówkiem:** *Fracht minus paliwo, opłaty drogowe, hotel i dieta kierowcy.
Kierowca dodaje paragon w trasie — liczba zmienia się od razu.*

**Sześć bloków:**

1. **Zysk na pierwszym ekranie** — Przychód, koszty i zysk, na bieżąco.
2. **Marża na każdym zleceniu** — Nie raz na kwartał, tylko od razu.
3. **Liczba zmienia się w trakcie** — Kierowca dodaje paragon, marża przelicza się sama.
4. **Wszystkie koszty w środku** — Paliwo, opłaty drogowe, hotel, dieta, amortyzacja.
5. **Porównanie okresów** — Czy ten miesiąc jest lepszy od poprzedniego.
6. **Raporty** — Per pojazd, per kierowca, per kraj.

**Siatka drobiazgów, sześć kafelków:** Waluty przeliczone po kursie z dnia · Sortowanie
zleceń po marży · Zlecenie na minusie widać od razu · Koszty stałe rozłożone na kursy ·
Eksport do arkusza · Podgląd bez zamykania miesiąca

**Makieta główna:** karta jednego zlecenia Warszawa → Mediolan — fracht, rozbicie kosztów
w wierszach, duża liczba zysku na dole, obok mały wykres dzienny.
Plik `mockup-zysk-karta-desktop.png`, 4:3.
Dodatkowo: tabela zleceń posortowana po marży (`mockup-zysk-tabela-desktop.png`, 16:10)
i porównanie miesięcy (`mockup-zysk-porownanie-desktop.png`, 4:3).

**Jeden mocny akcent typograficzny:** gdzieś na stronie duża liczba zysku jako element
typograficzny obok makiety, nie w niej — tak jak w sekcji „Ile zostaje" na stronie głównej.

**Kto tego używa:** Właściciel — odnośnik do `/dla-kogo/wlasciciel`.

**Trzy pytania:**
- **Skąd system wie, ile kosztowało paliwo?** — Z paragonu, który kierowca pstryknął
  w trasie. Kwota i sprzedawca wpisują się same.
- **Czy amortyzacja też jest liczona?** — Tak, rozkładana na kursy. Możesz ją wyłączyć,
  jeśli wolisz patrzeć na sam wynik gotówkowy.
- **Co z kosztami, które nie należą do żadnego kursu?** — Leasing, ubezpieczenie, serwis —
  wchodzą jako koszty stałe i rozkładają się na przejechane kilometry.

---
**KONIEC PROMPTU 5**

---
---

# FALE 2–4 — POZOSTAŁE PODSTRONY

Prompty powstaną tak samo, gdy fala 1 będzie zaprojektowana. Treść czeka
w `05-podstrony.md`, kolejność w `09-workflow-wdrozenia.md`:

| Fala | Strony | Rozdziały w `05` |
|---|---|---|
| **2** | Zlecenia i faktury · Trasy i mapa · Czas pracy · Koszty i paragony · Dokumenty i terminy | A5, A3, A4, A6, A9 |
| **3** | Cztery strony ról · Cennik · Demo | B1–B4, C3, C4 |
| **4** | Pomoc · Pierwsze kroki · Kontakt · Status · cztery prawne | C5–C12 |
