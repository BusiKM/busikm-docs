# 05 · Podstrony

Każda pozycja z nawigacji ma własną stronę. Strony funkcji trzymają jeden szkielet
(opisany w `03`, punkt 5) — tu jest treść, która go wypełnia.

Wspólne dla wszystkich podstron:
- ten sam pasek nawigacji i ta sama stopka,
- na dole ta sama sekcja finałowa: **„Zacznij od jednej trasy.”**,
- pod nagłówkiem zawsze dwa przyciski: `Wypróbuj 14 dni` i `Zobacz demo`,
- link powrotny do sąsiednich obszarów („Zobacz też”).

---

# CZĘŚĆ A — dziewięć stron funkcji

## A1 · Aplikacja kierowcy — `/co-robi/aplikacja-kierowcy`

**Najważniejsza podstrona serwisu.** Tu rozstrzyga się największa obiekcja:
„mój kierowca tego nie ruszy”.

**Nagłówek**
> Cały dzień pracy w jednej aplikacji.
> Bez wpisywania czegokolwiek w trasie.

**Zdanie pod nagłówkiem**
> Kierowca dostaje kod, wpisuje go raz i jest w środku. Reszta to trzy przyciski.

**Bloki:**

1. **Wchodzi kodem, nie zakłada konta**
   Wysyłasz zaproszenie, kierowca dostaje kod, ustawia własne hasło. Nie dzwoni do Ciebie
   z pytaniem, jaki ma login.

2. **Nawigacja jest w środku**
   Trasa ze zlecenia prowadzi go od razu — w tej samej aplikacji. Nie przeskakuje między
   nawigacją a resztą, nie przepisuje adresu z jednej aplikacji do drugiej.
   Zmieniasz trasę u siebie — on ma nową wersję w telefonie w tej samej chwili.

3. **Rusza jednym przyciskiem**
   Zdjęcie licznika, przycisk „Rozpocznij trasę” i jedzie. Telefon może zostać w kieszeni,
   ekran wyłączony. Trasa nagrywa się sama.

4. **Koszt dodaje jednym przyciskiem**
   Zatankował — pstryknął paragon i jedzie dalej. Kwota, data i sprzedawca wpisują się same,
   koszt trafia do tego zlecenia i tego pojazdu.

5. **Przerwa i powrót jednym tapnięciem**
   Aplikacja przypomina o obowiązkowej przerwie zanim będzie za późno, nie po fakcie.

6. **Działa bez zasięgu**
   Tunel, góry, terminal promowy, parking pod granicą. Wszystko zapisuje się w telefonie
   i dosyła, gdy wróci sygnał. Kierowca ma ekran „Do wysłania” i widzi, co jeszcze czeka.

7. **Trasa poza zleceniem**
   Dojazd do bazy, przejazd do serwisu — też się liczy. Start, stop, potwierdzenie.

8. **Jego dokumenty w telefonie**
   Prawo jazdy, badania, uprawnienia. Aplikacja przypomina o terminach jemu i Tobie.

**Siatka drobiazgów (6 kafelków):**
Tryb nocny · Sześć języków · Powiadomienia o nowym zleceniu · Bateria wystarcza na
całą zmianę · Podgląd własnych tras z historii · Kontakt z biurem jednym tapnięciem

**Makiety:** pięć ekranów telefonu — lista zleceń, nawigacja z kartą zlecenia,
dodawanie kosztu, licznik czasu pracy, ekran „Do wysłania”. Tryb nocny.

**Na dole:** neutralne odznaki App Store i Google Play (rysowane).

**Pytania:** Czy kierowca musi mieć służbowy telefon? · Czy aplikacja zużywa dużo danych? ·
Co, gdy kierowca zmieni telefon?

---

## A2 · Dyspozytornia — `/co-robi/dyspozytornia`

**Nagłówek**
> Cały dzień pracy na jednym ekranie.

**Zdanie pod nagłówkiem**
> Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Bez przełączania zakładek.

**Bloki:**

1. **Jeden ekran zamiast czterech okien**
   Po lewej zlecenia, w środku mapa, po prawej kierowca. Wszystko widać naraz.

2. **Zlecenie od przyjęcia po rozliczenie**
   Zleceniodawca, załadunek, rozładunek, terminy, stawka. Status widać na liście:
   przyjęte, w drodze, rozładunek, dostarczone.

3. **Kierowca i pojazd w dwie sekundy**
   Przypisujesz, a system podpowiada, kto ma ważne uprawnienia i wolny czas pracy.

4. **Trasa układa się sama**
   System proponuje przejazd i bierze pod uwagę, co dzieje się na drodze.

5. **Zmiana w trakcie jazdy**
   Klient przesuwa rozładunek, na trasie robi się korek — poprawiasz u siebie,
   kierowca ma nową wersję od razu.

6. **Rozmowa bez wychodzenia z ekranu**
   Piszesz do kierowcy stąd. Nie szukasz numeru, nie dzwonisz, nie tłumaczysz przez telefon,
   gdzie ma skręcić.

7. **Dyspozytor to osobne stanowisko**
   Ma własny dostęp. Widzi to, czego potrzebuje do prowadzenia tras — nie musi widzieć
   rozliczeń firmy. W małej firmie właściciel przełącza się na ten widok jednym kliknięciem.

**Makieta:** pełnoekranowy pulpit dyspozytora, trzy kolumny.

**Pytania:** Czy dyspozytor widzi pieniądze? · Czy mogę być dyspozytorem i właścicielem
naraz? · Ilu dyspozytorów mogę dodać?

---

## A3 · Trasy i mapa floty — `/co-robi/trasy-i-mapa`

**Nagłówek**
> Widzisz, gdzie jest każdy bus.
> Bez dzwonienia.

**Bloki:**
1. **Mapa na żywo** — pozycje pojazdów, po kliknięciu kierowca, zlecenie i godzina dojazdu
2. **Klient pyta, Ty odpowiadasz** — w pięć sekund, bez telefonu do kierowcy
3. **Trasa układa się sama** — z uwzględnieniem ruchu na drodze
4. **Historia tras** — każdy przejazd zapisany, z kilometrami i czasem
5. **Kraje na trasie** — system sam widzi, gdzie kierowca był i jak długo
6. **Przejazd bez zlecenia też się liczy** — dojazd do bazy, serwis, przeprowadzka pojazdu

**Makieta:** mapa Europy z trasami i dymkiem pojazdu; obok lista tras z filtrami.

---

## A4 · Czas pracy i przerwy — `/co-robi/czas-pracy`

**Nagłówek**
> Wiesz, kiedy kierowca musi stanąć.
> Zanim stanie za późno.

**Bloki:**
1. **Liczniki idą same** — jazda, przerwa, odpoczynek, dyspozycyjność
2. **Kierowca dostaje przypomnienie wcześniej** — nie meldunek po fakcie
3. **Ty widzisz to samo** — lista kierowców ze statusem, na jednym ekranie
4. **Działa bez zasięgu** — liczniki chodzą w telefonie, dane dosyłają się później
5. **Miesięczna karta do wydruku** — gotowa, bez przepisywania
6. **Dni w każdym kraju** — liczone z trasy, z możliwością ręcznej poprawki

**Makieta:** pierścienie postępu i lista kierowców; obok podgląd karty miesięcznej.

**Uwaga językowa:** na tej stronie **nie ma ani jednego numeru rozporządzenia**.
Piszemy „przerwa”, „odpoczynek”, „limit dzienny” — bez podstaw prawnych.

---

## A5 · Zlecenia i faktury — `/co-robi/zlecenia-i-faktury`

**Nagłówek**
> Ze zlecenia robi się faktura.
> Klient ma ją, zanim wrócisz do biura.

**Bloki:**
1. **Zlecenie i faktura to jedno** — nic nie przepisujesz
2. **Wysyłka jednym kliknięciem** — plik na mail klienta i zgłoszenie do systemu e-faktur
3. **Korekty i zaliczki** — tą samą ścieżką, bez kombinowania
4. **Waluty** — kwota, kurs i data widoczne na dokumencie
5. **Kontrahenci w jednym miejscu** — raz wprowadzeni, podpowiadają się później
6. **Historia** — co, komu i kiedy wysłano

⚠️ Status wysyłki do KSeF — patrz `01`. Treść w czasie teraźniejszym dopiero po potwierdzeniu.

---

## A6 · Koszty i paragony — `/co-robi/koszty-i-paragony`

**Nagłówek**
> Reklamówka paragonów. Do wyrzucenia.

**Bloki:**
1. **Zdjęcie zamiast wpisywania** — kwota, data i sprzedawca same wchodzą do formularza
2. **Trafia tam, gdzie trzeba** — do tego zlecenia, tego pojazdu, tego kierowcy
3. **Kategorie z życia** — paliwo, opłaty drogowe, hotel, posiłek, prom, parking, naprawa
4. **Obca waluta** — przeliczona po kursie z dnia, z zapisanym śladem
5. **Zdjęcie zostaje dowodem** — nikt nie szuka papierka po trzech miesiącach
6. **Koszty firmowe też** — leasing, ubezpieczenie, serwis; nie tylko to, co w trasie

---

## A7 · Ile zostaje — `/co-robi/rentownosc`

**Nagłówek**
> Wiesz, ile zostaje.
> Na tym kursie. Dziś.

**Bloki:**
1. **Zysk na pierwszym ekranie** — przychód, koszty i zysk, na bieżąco
2. **Marża na każdym zleceniu** — nie raz na kwartał, tylko od razu
3. **Liczba zmienia się w trakcie** — kierowca dodaje paragon, marża przelicza się sama
4. **Wszystkie koszty w środku** — paliwo, opłaty drogowe, hotel, dieta, amortyzacja
5. **Porównanie okresów** — czy ten miesiąc jest lepszy od poprzedniego
6. **Raporty** — per pojazd, per kierowca, per kraj

**Makieta:** karta zlecenia z rozbiciem kosztów i dużą liczbą zysku; obok wykres dzienny.

---

## A8 · Dane dla księgowej — `/co-robi/dane-dla-ksiegowej`

**Nagłówek**
> Komplet dokumentów.
> Jednym przyciskiem.

**Bloki:**
1. **Wybiera miesiąc i klika raz** — dostaje wszystko za ten okres
2. **W formacie jej programu** — Insert, Comarch Optima, Symfonia albo zwykły arkusz
3. **Dziewięć zestawień** — sprzedaż, zakupy, koszty, przebieg, delegacje, czas pracy,
   kursy walut i pozostałe
4. **System sam mówi, czego brakuje** — zanim plik pójdzie dalej
5. **Zamknięcie miesiąca** — po zamknięciu nikt nie zmienia danych wstecz
6. **Historia pobrań** — każdy plik można pobrać ponownie
7. **Rozliczenie kierowców** — dni za granicą, diety, wypłata, gotowe do wczytania
8. **Księgowa z zewnątrz** — zapraszasz mailem, dostaje własny dostęp

**Makieta:** centrum eksportów — lista zestawień, przycisk „Pobierz komplet”, wybór formatu.

---

## A9 · Dokumenty i terminy — `/co-robi/dokumenty-i-terminy`

**Nagłówek**
> Nic nie wygaśnie po cichu.

**Bloki:**
1. **Wszystko w jednym miejscu** — pojazdy, firma, kierowcy
2. **Przypomnienie z wyprzedzeniem** — na długo przed terminem, nie dzień po
3. **Kierowca też dostaje swoje** — o swoich dokumentach przypominamy jemu
4. **Jeden ekran statusu** — widać, co wymaga uwagi w tym miesiącu
5. **Tachograf** — od lipca 2026 bus w trasie zagranicznej musi go mieć; pokazujemy,
   których pojazdów to dotyczy i do kiedy
6. **Wydruk listy** — dla siebie albo dla księgowej

---

# CZĘŚĆ B — cztery strony ról

Szkielet strony roli:
1. Nagłówek: korzyść tej konkretnej osoby
2. „Twój dzień z BusiKM” — oś czasu od rana do wieczora, cztery albo pięć punktów
3. Trzy do pięciu ekranów, które ta osoba widzi codziennie
4. „Czego nie robisz już wcale” — lista przekreślona
5. Co widzi, a czego nie widzi *(zakres dostępu, po ludzku)*
6. Trzy pytania tej roli
7. Finał

## B1 · Właściciel — `/dla-kogo/wlasciciel`

**Nagłówek**
> Wiesz, ile zostaje.
> I gdzie jest każdy bus.

**Twój dzień:** rano — pulpit z zyskiem i alertami · w ciągu dnia — mapa i pytania
klientów · po południu — faktura z zakończonego zlecenia · koniec miesiąca — jeden przycisk
dla księgowej.

**Czego już nie robisz:** ~~dzwonisz z pytaniem „gdzie jesteś”~~ ·
~~przepisujesz do Excela~~ · ~~zbierasz paragony~~ · ~~liczysz marżę po kwartale~~

**Ekrany:** pulpit z zyskiem · mapa floty · rentowność zleceń · dokumenty i terminy

## B2 · Dyspozytor — `/dla-kogo/dyspozytor`

**Nagłówek**
> Cały dzień pracy na jednym ekranie.

**Twój dzień:** przyjmujesz zlecenie · przypisujesz kierowcę i pojazd · trasa układa się
sama · w trakcie coś się zmienia — poprawiasz, kierowca widzi od razu · zamykasz dzień.

**Czego już nie robisz:** ~~dzwonisz do kierowcy trzy razy dziennie~~ ·
~~przepisujesz adres do nawigacji~~ · ~~szukasz, kto ma wolne godziny~~

## B3 · Księgowa — `/dla-kogo/ksiegowa`

**Nagłówek**
> Koniec miesiąca w jednym kliknięciu.

**Twój miesiąc:** przez miesiąc dane wpadają same · pod koniec sprawdzasz, czego brakuje ·
klikasz raz i masz komplet · wczytujesz do swojego programu · zamykasz miesiąc.

**Czego już nie robisz:** ~~prosisz o brakujące paragony~~ · ~~przepisujesz delegacje~~ ·
~~przeliczasz waluty ręcznie~~ · ~~pilnujesz, czy ktoś nie zmienił danych wstecz~~

**Nota:** pracujesz w firmie albo obsługujesz ją z zewnątrz — dostajesz zaproszenie mailem
i własny dostęp.

## B4 · Kierowca — `/dla-kogo/kierowca`

Pisana **do kierowcy**, nie do właściciela. Krótsza, prostsza, większa typografia.

**Nagłówek**
> Rusz. Resztą zajmuje się telefon.

**Twój dzień:** dostajesz zlecenie · klikasz „Rozpocznij trasę” · nawigacja prowadzi Cię
z tej samej aplikacji · tankujesz i pstrykasz paragon · aplikacja mówi, kiedy przerwa ·
kończysz i potwierdzasz.

**Czego już nie robisz:** ~~zbierasz paragony w reklamówce~~ ·
~~przeskakujesz między aplikacjami~~ · ~~liczysz godziny na kartce~~ ·
~~tłumaczysz przez telefon, gdzie jesteś~~

**Nota na dole:** *To pracodawca wybiera narzędzia. Ale to Ty spędzasz w tym osiem godzin
dziennie — pokaż mu tę stronę.*

---

# CZĘŚĆ C — strony pozostałe

## C1 · Przegląd funkcji — `/co-robi`
Dziewięć kafelków z korzyścią i jednym zdaniem, w trzech grupach:
w trasie · w biurze · na koniec miesiąca. Pod spodem: sekcja demo.

## C2 · Dla kogo — `/dla-kogo`
Cztery karty ról obok siebie, z korzyścią i trzema punktami.
Pod spodem nota o łączeniu ról.

## C3 · Cennik — `/cennik`
Karty Start i Firma (jak na stronie głównej) · **kalkulator: ile pojazdów masz →
tyle zapłacisz** · co jest w którym planie, tabelą · pytania o płatności
(faktura, rezygnacja, zmiana planu, co po 14 dniach, co z danymi po rezygnacji).

## C4 · Demo — `/demo`
Opisana w `03`, punkt 4.

## C5 · Pomoc — `/pomoc`
Cztery kategorie: Pierwsze kroki · Kierowcy · Rozliczenia i księgowość ·
Konto i płatności. Wyszukiwarka. Na dole: kontakt do człowieka.

## C6 · Pierwsze kroki — `/pomoc/pierwsze-kroki`
Lista kroków od rejestracji do pierwszej zamkniętej faktury. Ten sam materiał,
którego używa checklista w aplikacji.

## C7 · Kontakt — `/kontakt`
Adres e-mail, godziny odpowiedzi, formularz. Bez numeru telefonu, dopóki nie ma
kogoś, kto go odbierze.

## C8 · Status usługi — `/status`
Prosta strona: działa / nie działa, historia przerw.

## C9–C12 · Dokumenty prawne
`/regulamin` · `/prywatnosc` · `/powierzenie-danych` · `/podprocesorzy`
Zwykły, czytelny tekst. To jedyne miejsce, gdzie wolno używać języka prawnego.
