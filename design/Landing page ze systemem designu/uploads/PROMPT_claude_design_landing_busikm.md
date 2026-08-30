# PROMPT DLA CLAUDE DESIGN — landing page BusiKM

Skopiuj całość do Claude Design.

---

Zaprojektuj **landing page produktu BusiKM** — polskiego SaaS dla małych firm transportowych. Język strony: **polski**. Estetyka: **Apple**, w wersji spokojnej i dorosłej, nie krzykliwej.

---

## 1. Kto to czyta

**Właściciel firmy transportowej z trzema do dziesięciu busami 2,5–3,5 t, jeżdżącej w transporcie międzynarodowym.**

Ma 35–55 lat. Zaczynał jako kierowca albo nadal jeździ. Prowadzi firmę z telefonu i z laptopa na kuchennym stole. Nie jest technofobem, ale nie ma cierpliwości do oprogramowania, które trzeba się uczyć.

Jego dzień: dzwoni klient ze zleceniem, dzwoni kierowca z trasy, przychodzi mail od księgowej z pytaniem o brakującą fakturę. Wieczorem przepisuje coś do Excela.

**Czego się boi:** kontroli ITD i urzędu skarbowego, kary, tego że kierowca coś przeoczy, tego że nie wie, czy na danym zleceniu w ogóle zarobił.

**Czego chce:** żeby się samo liczyło. Żeby księgowa przestała dzwonić. Żeby wieczorem nie siedzieć nad papierami.

**Jak mówić do niego:** krótko, konkretnie, bez żargonu IT. Nigdy „platforma", „rozwiązanie", „digitalizacja procesów". Zawsze rzeczownikami z jego świata: trasa, zlecenie, kilometrówka, paragon, kierowca, księgowa, kontrola.

---

## 2. Główna obietnica

> **Kierowca jedzie. Reszta dzieje się sama.**

Cała strona jest rozwinięciem tego jednego zdania. Kierowca ma telefon w kieszeni — z tego powstaje kilometrówka, ewidencja czasu pracy, koszty, dokumenty i komplet danych dla księgowej.

Właściciel nie przepisuje niczego.

---

## 3. Ton i sposób pisania

Zdania krótkie. Często jedno słowo, kropka, drugie słowo. To jest rytm Apple i po polsku działa równie dobrze:

> „Kilometrówka. Sama się liczy."
> „Paragon znika w telefonie."
> „Miesiąc zamknięty. Jednym kliknięciem."

**Zasada nadrzędna: każda funkcja techniczna musi być opisana jako to, co czuje właściciel.**

| Zamiast tego | Napisz to |
|---|---|
| „Automatyczne generowanie ewidencji przebiegu wg wzoru MF" | „Kontrola? Niech przychodzi." |
| „Moduł OCR paragonów z rozpoznawaniem NIP" | „Paragon znika w telefonie." |
| „Silnik zgodności z rozporządzeniem 561/2006" | „Wiesz, kiedy kierowca musi stanąć. Zanim stanie za późno." |
| „Eksport do systemów FK w formatach EPP, XML i TXT" | „Księgowa przestanie dzwonić." |
| „Kalkulacja rentowności zlecenia w oparciu o koszty przypisane" | „Wiesz, ile zostaje." |

Techniczne nazwy pojawiają się **wyłącznie** jako drobny podpis pod korzyścią — jednym szarym zdaniem, żeby ktoś obeznany wiedział, że to jest prawdziwe. Nigdy jako nagłówek.

---

## 4. System wizualny

### Kolory

```
ink        #0A0A0B   tekst na jasnym, tło sekcji ciemnych
paper      #FAFAFA   tło sekcji jasnych
surface    #111113   karty na ciemnym
mist       #F2F2F4   karty na jasnym
line       #E3E3E6   subtelne krawędzie
muted      #6E6E76   tekst drugorzędny
blue       #0B5FFF   akcja główna, linki
amber      #FF9500   TYLKO terminy ustawowe i ostrzeżenia — używaj rzadko
green      #30D158   stany „gotowe" w zrzutach interfejsu
```

Sekcje **naprzemiennie jasne i ciemne**. Ciemna sekcja to moment dramatyczny — obowiązek tachografowy, aplikacja kierowcy, finalne wezwanie. Reszta jasna i przewiewna.

### Typografia

Rodzina: `Inter` z Google Fonts, stos zapasowy `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

```
display   88px / 1.05 / weight 700 / tracking -0.03em    hero
h1        64px / 1.08 / weight 700 / tracking -0.025em   nagłówki sekcji
h2        40px / 1.15 / weight 600 / tracking -0.02em
h3        28px / 1.25 / weight 600 / tracking -0.01em
lead      22px / 1.5  / weight 400 / muted                podtytuły
body      17px / 1.6  / weight 400
caption   14px / 1.5  / weight 400 / muted                podpisy techniczne
```

Na mobile skaluj display do 44px, h1 do 34px.

**Duże nagłówki mają być naprawdę duże.** To jest sygnatura tej estetyki — jedno zdanie zajmujące pół ekranu, wokół niego pustka.

### Przestrzeń i rytm

- Sekcje: 160px odstępu pionowego na desktopie, 96px na mobile
- Maksymalna szerokość treści: 1120px, wyśrodkowana
- Nagłówki sekcji wyśrodkowane, treść pod nimi w siatce
- **Whitespace jest elementem projektu, nie marnowaniem miejsca.** Gdy masz wątpliwość — daj więcej powietrza

### Detale

- Promień narożników: 20px na kartach, 12px na przyciskach, 28px na dużych panelach
- Cienie: bardzo delikatne i rozmyte, `0 1px 3px rgba(0,0,0,.04), 0 12px 32px rgba(0,0,0,.06)`. **Żadnych ostrych cieni**
- Gradienty: tylko subtelne, jednotonowe, jako tło sekcji. Nigdy na tekście, nigdy tęczowe
- Przyciski: wypełniony niebieski (akcja główna), obrysowany (drugorzędna), tekstowy ze strzałką (trzeciorzędna)
- Nawigacja przyklejona u góry, tło z rozmyciem `backdrop-filter: saturate(180%) blur(20px)`

### Zrzuty produktu

Zamiast zdjęć — **narysuj uproszczone makiety interfejsu w SVG albo w HTML**: karty z liczbami, tabelki, wykres, mapa jako abstrakcyjna linia trasy, ekran telefonu z listą zleceń.

Mają wyglądać jak prawdziwy, spokojny interfejs — nie jak clipart. Duże, centralne, na neutralnym tle z delikatnym cieniem. To jest bohater każdej sekcji funkcjonalnej.

---

## 5. Struktura strony — sekcja po sekcji, z gotową treścią

### 5.1 Nawigacja

Logo **BusiKM** po lewej. Pozycje: Funkcje · Dla kogo · Cennik · Pomoc. Po prawej: „Zaloguj się" (tekstowy) i „Wypróbuj za darmo" (niebieski). Wysokość 64px, przyklejona, rozmyte tło po przewinięciu.

### 5.2 Hero — sekcja jasna, pełny ekran

**Nagłówek (display):**
> Kierowca jedzie.
> Reszta dzieje się sama.

**Podtytuł (lead, maks. dwie linie):**
> BusiKM zamienia trasy Twoich kierowców w kilometrówkę, ewidencję czasu pracy i komplet dokumentów dla księgowej. Bez Excela. Bez przepisywania.

**Przyciski:** „Wypróbuj 14 dni" (niebieski) · „Zobacz demo — bez rejestracji" (obrysowany)

**Pod przyciskami, drobnym szarym:** Pierwsze 14 dni bez opłat. Rezygnujesz jednym kliknięciem.

**Wizualnie:** pod tekstem duża, wyśrodkowana makieta pulpitu — mapa z linią trasy, trzy kafelki z liczbami, lista ostatnich zleceń. Lekko uniesiona, z delikatnym cieniem, jakby leżała nad stroną.

### 5.3 Moment ustawowy — sekcja CIEMNA

To jest jedyne miejsce, gdzie wolno użyć **amber**.

**Nadtytuł (amber, caption, wersaliki):** OD 1 LIPCA 2026

**Nagłówek (h1):**
> Tachograf w busie.
> Obowiązkowo.

**Treść (lead, maks. trzy zdania):**
> Busy o DMC powyżej 2,5 tony w transporcie międzynarodowym muszą mieć tachograf inteligentny drugiej generacji. Dane z tachografu pobierasz co 90 dni, z karty kierowcy co 28. Za brak — 12 000 złotych kary.

**Zamknięcie (h3, na biało):**
> BusiKM pilnuje terminów za Ciebie.

**Wizualnie:** ciemne tło, po prawej prosty kalendarz-licznik odliczający do najbliższego pobrania danych z karty kierowcy. Bez straszenia obrazkami — sama liczba i termin.

> **Uwaga dla projektanta:** ta sekcja ma być poważna, nie alarmistyczna. Żadnych czerwonych wykrzykników, żadnych ikon ostrzegawczych w trójkącie. Spokojny fakt i spokojna odpowiedź.

### 5.4 Jak to działa — trzy kroki, sekcja jasna

**Nagłówek:** Trzy rzeczy dzieją się bez Ciebie.

Trzy kolumny, każda z numerem, krótkim nagłówkiem i jednym zdaniem:

**01 — Kierowca rusza**
Włącza trasę w telefonie. Robi zdjęcie licznika. Tyle.

**02 — Dane same lecą**
Trasa, kilometry, czas pracy, paragony. Wszystko ląduje u Ciebie, nawet gdy kierowca nie ma zasięgu.

**03 — Miesiąc się zamyka**
Kilometrówka, koszty, faktury i komplet dla księgowej. Gotowe do pobrania.

### 5.5 Sekcje funkcjonalne — naprzemiennie, każda pełnoekranowa

Każda sekcja ma ten sam układ: **duży nagłówek, jedno zdanie pod nim, makieta interfejsu, jeden szary podpis techniczny na dole.**

Układ tekst-obraz naprzemiennie: lewa, prawa, lewa, prawa.

---

**A. Kilometrówka — sekcja jasna**

Nagłówek: **Kontrola? Niech przychodzi.**

Treść: Ewidencja przebiegu powstaje sama, z każdej trasy. Zgodna z wzorem, kompletna, z podpisem kierowcy i zdjęciem licznika.

Podpis techniczny: *Ewidencja wg art. 86a ustawy o VAT · obsługa VAT-26 · odliczenie 50% albo 100% per pojazd*

Makieta: tabela kilometrówki za miesiąc — data, trasa, cel, licznik, kilometry — z przyciskiem „Pobierz PDF".

---

**B. Czas pracy kierowcy — sekcja ciemna**

Nagłówek: **Wiesz, kiedy kierowca musi stanąć.**

Treść: Przerwy, odpoczynki i limity liczą się na bieżąco. Kierowca dostaje przypomnienie, zanim przekroczy. Ty widzisz to samo, ze swojego biura.

Podpis techniczny: *Rozporządzenie 561/2006 i AETR · 4,5 h jazdy, 45 minut przerwy, 9 godzin odpoczynku · miesięczna karta ewidencji do wydruku*

Makieta: pierścienie postępu — jazda, przerwa, odpoczynek — jak zamknięte kółka aktywności. Obok lista kierowców ze statusem.

---

**C. Zlecenia i CMR — sekcja jasna**

Nagłówek: **Zlecenie, CMR, faktura. Jedna ścieżka.**

Treść: Przyjmujesz zlecenie, przypisujesz kierowcę i pojazd, a dokumenty powstają po drodze. List przewozowy podpisany na telefonie, u odbiorcy.

Podpis techniczny: *CMR z podpisem nadawcy i odbiorcy · etapy trasy · statusy w czasie rzeczywistym · czat z kierowcą*

Makieta: kartka zlecenia ze statusami jako oś pozioma — Przyjęte, W drodze, Rozładunek, Dostarczone — z zielonym znacznikiem na trzecim.

---

**D. Koszty i paragony — sekcja jasna**

Nagłówek: **Paragon znika w telefonie.**

Treść: Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same. Pudełko po butach możesz wyrzucić.

Podpis techniczny: *Odczyt paragonu · przypisanie do pojazdu i zlecenia · paliwo, myto, promy, naprawy, leasing*

Makieta: telefon ze zdjęciem paragonu i wypełnionym formularzem obok — pola podświetlone na zielono jako rozpoznane.

---

**E. Rentowność — sekcja ciemna**

Nagłówek: **Wiesz, ile zostaje.**

Treść: Fracht minus paliwo, myto, dieta kierowcy i amortyzacja. Na każdym zleceniu z osobna, nie raz na kwartał.

Podpis techniczny: *Koszty przypisane do zlecenia · przeliczenie walut po kursie NBP z dnia · marża w złotych i w procentach*

Makieta: karta jednego zlecenia — Warszawa → Berlin — z rozbiciem: fracht, koszty w wierszach, i duża liczba zysku na dole.

---

**F. Dane dla księgowej — sekcja jasna**

Nagłówek: **Księgowa przestanie dzwonić.**

Treść: Na koniec miesiąca wybierasz miesiąc i pobierasz. Rejestry, kilometrówka, delegacje i czas pracy — w formacie, który wczyta do swojego programu.

Podpis techniczny: *Insert, Comarch Optima, Symfonia oraz uniwersalny arkusz · rejestry VAT · JPK\\_FA · dane do rozliczenia kierowców*

Makieta: lista dziewięciu rejestrów z licznikami pozycji i przyciskami pobierania w czterech formatach.

### 5.6 Aplikacja kierowcy — sekcja CIEMNA, pełny ekran

**Nadtytuł (caption, wersaliki):** BUSIKM KIEROWCA

**Nagłówek:**
> Cały dzień pracy w kieszeni.

**Treść:**
> Kierowca dostaje kod, wpisuje go w aplikacji i jest w środku. Bez zakładania konta, bez haseł od Ciebie. Aplikacja działa też bez zasięgu — wszystko dośle, gdy tylko złapie sygnał.

**Trzy krótkie punkty w rzędzie, każdy jedno zdanie:**
- Zlecenia i nawigacja
- Zdjęcie licznika i paragonu
- Czas pracy i przerwy

**Na dole:** odznaki App Store i Google Play (narysuj jako proste, neutralne przyciski — **nie używaj oficjalnych logotypów**).

**Wizualnie:** dwa telefony pod lekkim kątem, jeden z listą zleceń, drugi z ekranem trasy. Ciemne tło, telefony podświetlone od dołu.

### 5.7 Ile masz dziś systemów — sekcja jasna

**Nagłówek:** Jedna faktura zamiast czterech.

Prosty układ dwukolumnowy, bez tabeli z cenami konkurencji — tylko kategorie:

**Dziś płacisz osobno za:**
GPS i monitoring · program do rozliczania czasu pracy · system do zleceń i faktur · arkusz, który prowadzisz sam

**Z BusiKM:**
Jedno konto. Jeden rachunek. Wszystko rozmawia ze sobą.

> **Uwaga dla projektanta:** żadnych nazw konkurencji, żadnych porównawczych cen. Tylko kategorie i kontrast.

### 5.8 Cennik — sekcja jasna

**Nagłówek:** Płacisz za pojazdy. Nie za ludzi.

**Podtytuł:** Kierowcy i pracownicy biura bez limitu. Naczepy i przyczepy nie liczą się do abonamentu.

**Przełącznik:** Miesięcznie / Rocznie. Przy rocznym pojawia się etykieta **„2 miesiące gratis"** — nie procent.

**Dwie karty:**

| | **Start** | **Firma** |
|---|---|---|
| Cena | 149 zł netto / mies. | 299 zł netto / mies. |
| Rocznie | 1 490 zł netto | 2 990 zł netto |
| Pojazdy | do 3 | do 10, każdy kolejny +29 zł |
| Kierowcy | bez limitu | bez limitu |
| Użytkownicy biura | bez limitu | bez limitu |

Karta **Firma** wyróżniona — delikatna niebieska obwódka i etykieta „Najczęściej wybierany".

**Lista w Start:** zlecenia i CMR, GPS i trasy, kilometrówka i VAT-26, czas pracy kierowcy, koszty i paragony, faktury i KSeF, aplikacja dla kierowców.

**Lista w Firma:** wszystko ze Start, a do tego eksport do programów księgowych, rejestry VAT, raporty kosztów floty, rentowność zleceń.

**Pod kartami, drobnym:** Bez umowy na czas określony. Rezygnujesz jednym kliknięciem. Twoje dane pobierzesz zawsze — także po rezygnacji.

### 5.9 Pytania — sekcja jasna

Akordeon, sześć pozycji, domyślnie zamknięte:

**Czy muszę mieć tachograf, żeby korzystać?**
Nie. BusiKM działa niezależnie od tachografu — liczy czas pracy z aplikacji kierowcy. Jeśli masz tachograf, przypomnimy Ci o terminach pobrania danych.

**Co, jeśli kierowca nie umie obsługiwać aplikacji?**
Kierowca ma trzy przyciski: rusz, zrób zdjęcie, zakończ. Wysyłamy mu kod, wpisuje go raz i gotowe. Nie musi zakładać konta ani wymyślać hasła.

**Czy moja księgowa będzie musiała się przestawiać?**
Nie. Pobiera plik i wczytuje do programu, którego już używa — Insert, Comarch, Symfonia albo zwykły arkusz.

**Co z danymi, gdy zrezygnuję?**
Zostają Twoje. Przez 30 dni pobierzesz wszystko w komplecie, w formatach do wczytania gdzie indziej.

**Czy przyczepa liczy się jako pojazd?**
Nie. Płacisz tylko za pojazdy napędzane.

**Ile trwa uruchomienie?**
Dodajesz pojazd, zapraszasz kierowcę, kierowca instaluje aplikację. Pierwsza trasa pojawia się u Ciebie tego samego dnia.

### 5.10 Finał — sekcja CIEMNA

**Nagłówek (display, wyśrodkowany):**
> Zacznij od jednej trasy.

**Podtytuł:**
> 14 dni bez opłat. Bez umowy. Bez dzwonienia do handlowca.

**Przyciski:** „Wypróbuj 14 dni" (niebieski) · „Zobacz demo" (obrysowany)

### 5.11 Stopka

Cztery kolumny: Produkt · Dla kogo · Firma · Prawne (Regulamin, Polityka prywatności, Podprocesorzy). Na dole: BusiKM, NIP, adres e-mail. Bez ikon mediów społecznościowych, jeśli konta nie istnieją.

---

## 6. Czego NIE robić

**Nie wymyślaj dowodu społecznego.** Ten produkt nie ma jeszcze klientów. Zero logotypów firm, zero opinii, zero cytatów, zero liczb w rodzaju „500 zadowolonych przewoźników", zero gwiazdek. Jeśli sekcja wygląda pusto bez opinii — daj więcej powietrza, nie wymyślonego klienta.

**Nie używaj zdjęć stockowych** — uśmiechniętych ludzi w kaskach, uścisków dłoni, ciężarówek o zachodzie słońca. Zamiast tego makiety interfejsu i typografia.

**Nie strasz.** Sekcja o obowiązku tachografowym podaje fakt i termin. Bez czerwieni, bez wykrzykników, bez odliczania „zostało Ci X dni".

**Nie pisz językiem korporacyjnym.** Zakazane: platforma, rozwiązanie, ekosystem, digitalizacja, optymalizacja procesów, synergia, dedykowany, kompleksowy.

**Nie rób kolorowo.** Dwa kolory tekstu, jeden akcent, amber wyłącznie w jednej sekcji. Gradienty subtelne albo wcale.

**Nie zagęszczaj.** Jeśli sekcja mieści się na jednym ekranie z zapasem — dobrze. Jeśli trzeba przewijać w środku sekcji, coś jest za bardzo upchane.

---

## 7. Co wyprodukować

**Trzy artboardy na jednym płótnie:**

1. **Desktop — 1440px szerokości**, cała strona od nawigacji do stopki, jako jedna długa sekcja
2. **Mobile — 390px szerokości**, cała strona, z przeskalowaną typografią i kartami cennika jeden pod drugim
3. **System — 1440 × 900px**: paleta z podpisami hex, skala typograficzna z nazwami, warianty przycisków, karta, pole formularza, odstępy. To ma posłużyć jako podkład do implementacji w Next.js

Wszystko po polsku, z polskimi znakami. Treść dokładnie taka, jak wyżej — nie skracaj i nie parafrazuj nagłówków, bo są dobrane pod rytm.

---

## 8. Kryterium sukcesu

Właściciel firmy transportowej przewija stronę na telefonie, między jednym telefonem od klienta a drugim, i po dziesięciu sekundach wie:

**„To zbiera dane z moich kierowców i zamyka mi miesiąc."**

Jeśli musi czytać, żeby to zrozumieć — projekt jest za gęsty.
