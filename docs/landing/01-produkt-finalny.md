# 01 · Produkt finalny — co aplikacja naprawdę robi

Źródła: backlog **BusiKM v2** (artefakt z 1 września 2026, 7 etapów, 45 epików, 191 zadań),
`landing/public/llms.txt`, oraz inwentarz funkcji z poprzedniej wersji strony (historia gita).

> **Uwaga metodologiczna.** Backlog v2 to lista **zmian**, nie spis funkcji. Rzeczy już
> zbudowane i nietykane (nawigacja w aplikacji kierowcy, odczyt paragonów, KSeF, czat)
> mają w nim zero trafień — to nie znaczy, że ich nie ma. Dlatego inwentarz poniżej
> łączy trzy źródła, a każde twierdzenie ma w [tabeli na końcu](#tabela-twierdzeń) status.

---

## 1. Co się zmieniło względem obecnej strony

To są zmiany, przez które obecny landing opisuje aplikację, której **już nie ma**.

| Zmiana | Stan poprzedni | Stan docelowy |
|---|---|---|
| **Biuro rachunkowe** | Osobna rola z panelem multi-tenant, przełączaniem klientów, zbiorczym eksportem | **Usunięte z produktu w całości** — model, rola, uprawnienia, ekrany, testy. Zewnętrzna księgowa dostaje zwykłe konto księgowego w firmie klienta |
| **Dyspozytor** | Nie istniał — właściciel robił wszystko | **Nowa, pełnoprawna rola.** Układa zlecenia, przypisuje kierowców i pojazdy, prowadzi trasy |
| **Role** | Jedna rola na użytkownika | **Zbiór ról** — jedna osoba może być właścicielem i dyspozytorem naraz, z przełącznikiem widoku |
| **Aplikacja mobilna** | Kierowca + okrojony panel właściciela | **Wyłącznie kierowca.** Ekrany właściciela usunięte z aplikacji. Właściciel pracuje w przeglądarce, także na telefonie |
| **Pilotaż** | „Dożywotnio gratis”, bez karty, zapisy przez Calendly | **Usunięty z produktu w całości.** Normalna sprzedaż: 14 dni próby, potem abonament |
| **Cennik** | „Ogłosimy po pilotażu”, brak kwot | **Dwa plany: Start i Firma.** Cennik czytany z API, płatność przez Stripe, portal klienta, faktura VAT za abonament |
| **Rejestracja** | Zgłoszenie do pilotażu | **Samodzielna rejestracja właściciela.** Reszta ludzi wchodzi z zaproszenia |
| **Wejście kierowcy** | Login i hasło od pracodawcy | **Kod z zaproszenia.** Kierowca wpisuje kod, ustawia własne hasło. Nie zakłada konta |
| **Demo** | Brak | **Publiczne demo bez rejestracji** — prawdziwa aplikacja z danymi przykładowymi, tylko do odczytu, kasowana i odtwarzana co noc |

**Konsekwencja dla strony:** znikają wszystkie strony i sekcje o biurach rachunkowych,
o pilotażu, o „aplikacji właściciela”. Pojawia się dyspozytor, cennik z kwotami i demo.

---

## 2. Cztery role

Web ma cztery role. Kierowca jest w telefonie, pozostała trójka w przeglądarce.
Role są zbiorem — w małej firmie jedna osoba nosi dwie albo trzy naraz.

### 2.1 Właściciel — przeglądarka

Widzi wszystko i za wszystko płaci. Pierwszy ekran po zalogowaniu odpowiada na pytanie
„jak nam idzie w tym miesiącu”.

- Pulpit: przychód, koszty, **zysk na żywo**, aktywne zlecenia, porównanie do poprzedniego okresu
- Wykres dzienny przychodu, kosztów i zysku dla wybranego miesiąca
- Pasek alertów: dokumenty, które właśnie wygasły albo wygasają
- Mapa floty — pozycje pojazdów na żywo, po kliknięciu: kierowca, zlecenie, status czasu pracy
- Rentowność każdego zlecenia z osobna: fracht minus paliwo, opłaty drogowe, hotele, diety, amortyzacja
- **Przełącznik widoku: pulpit właściciela ↔ dyspozytornia**
- Pojazdy: dane, dokumenty, forma własności, przypisania
- Kierowcy: zapraszanie, dokumenty, odpięcie kierowcy z zachowaniem historii
- Zatwierdzanie tras i zleceń
- Raporty kosztów per pojazd, kierowca, zlecenie, kraj
- Zaproszenia dla wszystkich ról biurowych i dla drugiego właściciela
- Konto i płatności: plan, faktury za abonament, portal klienta

### 2.2 Dyspozytor — przeglądarka *(rola nowa)*

Układa pracę. Nie musi widzieć pieniędzy firmy. **Pracuje na jednym ekranie** —
zlecenia, mapa, kierowcy i rozmowa w jednym miejscu, bez przełączania się między zakładkami.

- Lista zleceń z pełnym cyklem: przyjęte → w trakcie → zakończone → rozliczone
- Tworzenie zlecenia: zleceniodawca, załadunek, rozładunek, terminy, stawka
- Przypisanie kierowcy i pojazdu, z podpowiedzią kto ma ważne uprawnienia
- **Trasa dobiera się sama** — system proponuje najlepszy przejazd, uwzględniając ruch na drodze
- **Zmiana trasy w trakcie jazdy** — dyspozytor poprawia przejazd, kierowca od razu widzi nową wersję w telefonie
- Podgląd tras na żywo i statusów kierowców
- **Kontakt z kierowcą z tego samego ekranu** — bez szukania numeru w telefonie
- Wysyłka zlecenia na telefon kierowcy
- Historia zleceń z filtrami

### 2.3 Księgowa — przeglądarka

Może być pracownikiem firmy albo osobą z zewnątrz — dostaje zaproszenie mailem.
Pracuje na gotowych danych, nie poprawia cudzej pracy.

- **Jeden przycisk na koniec miesiąca: komplet dokumentów za wybrany okres**
- Dziewięć rejestrów (sprzedaż, zakupy, koszty, przebieg, delegacje, czas pracy, kursy walut i pozostałe)
- Eksport w natywnym formacie: Insert GT, Comarch ERP Optima, Symfonia FK — plus uniwersalny arkusz XLSX, arkusz per rejestr
- Walidacja kompletności **przed** eksportem — braki widać zanim plik trafi do programu księgowego
- Historia eksportów z ponownym pobraniem pliku
- Rejestry VAT sprzedaży i zakupu
- **Zamknięcie miesiąca** — po zamknięciu nikt nie zmienia już danych wstecz
- Rozliczenia kierowców: dni za granicą (z możliwością ręcznej korekty), diety, wypłata
- Karta ewidencji czasu pracy kierowcy — miesięczna, do wydruku
- Zestawienie użytych kursów walut za okres
- Zgłoszenie pojazdu do pełnego odliczenia (VAT‑26) — wydruk i rejestr pojazdów
- Filtr „wymaga działania”: koszty bez kategorii, brakujące skany, niezatwierdzone trasy

### 2.4 Kierowca — aplikacja na telefon (iOS i Android)

Nazwa w sklepach: **BusiKM Kierowca**. Nie zakłada konta — dostaje kod.

- Wejście kodem z zaproszenia, ustawienie własnego hasła, trzy ekrany o zgodach
- Lista własnych zleceń ze szczegółami załadunku i rozładunku
- **Start trasy jednym przyciskiem**, zdjęcie licznika, stop trasy
- **Trasa poza zleceniem** — start, stop, potwierdzenie (przejazd serwisowy, dojazd do bazy)
- **Nawigacja wbudowana w aplikację** — kierowca nie przeskakuje między aplikacjami
- **Dodanie kosztu w trakcie zlecenia jednym przyciskiem** — zdjęcie paragonu, reszta wpisuje się sama
- Przerwa i powrót po przerwie jednym tapnięciem
- Ostrzeżenie o zbliżającej się obowiązkowej przerwie — **zanim**, nie po
- GPS w tle: ekran wyłączony, telefon w kieszeni, dokładność dopasowana do baterii
- **Tryb offline** — trasa, koszty i zdjęcia zapisują się lokalnie i dosyłają, gdy wróci zasięg
- **Ekran „Do wysłania”** — kierowca widzi, co jeszcze czeka na zasięg
- Własne dokumenty w telefonie z przypomnieniem o terminach
- Powiadomienia: nowe zlecenie, zmiana terminu, przerwa, dokumenty
- **Interfejs w sześciu językach** — polski, angielski, niemiecki, włoski, francuski, hiszpański
- **Tryb nocny**

---

## 3. Inwentarz funkcji — po obszarach

Do budowy sekcji strony głównej i podstron.

### Zlecenia i dyspozytornia
**Jeden ekran dyspozytora**: lista zleceń, mapa, kierowcy i rozmowa obok siebie ·
tworzenie zlecenia · przypisanie kierowcy i pojazdu · sprawdzenie uprawnień ·
**automatyczny dobór trasy z uwzględnieniem ruchu na drodze** ·
**zmiana trasy w trakcie jazdy, widoczna u kierowcy od razu** ·
statusy zlecenia · terminy załadunku i rozładunku · powiązanie z trasą GPS i kosztami ·
historia z filtrami · wysyłka zlecenia na telefon kierowcy · dokumenty przewozowe.

### Zlecenie → faktura → klient
**Zlecenie jest połączone z fakturą.** Z zakończonego zlecenia powstaje faktura sprzedaży,
a klient dostaje ją **jednym kliknięciem — PDF mailem i wysyłka do KSeF**.
Do tego: korekty z przyczyną, faktury zaliczkowe, oznaczenia procedur, adnotacja
o odwrotnym obciążeniu, waluty i kurs na dokumencie.

### Mapa i trasy
Pozycje pojazdów na żywo · popup z kierowcą, zleceniem i statusem · trasy historyczne ·
kraje na trasie wykrywane z GPS · uzupełnianie luk w danych GPS · eksport tras.

### Czas pracy kierowcy
Jazda, przerwa, odpoczynek, dyspozycyjność · liczniki na bieżąco, także offline ·
ostrzeżenie do kierowcy przed przekroczeniem i podgląd u właściciela ·
miesięczna karta ewidencji do wydruku · dni pobytu w każdym kraju liczone z trasy.

### Koszty i paragony
Zdjęcie paragonu w aplikacji · odczyt kwoty, daty, sprzedawcy i numeru NIP ·
rozdzielenie podatku · kategorie: paliwo, opłaty drogowe, hotel, posiłek, prom, parking, naprawa ·
przypisanie do zlecenia i pojazdu · przeliczenie waluty po kursie z dnia ·
jeden wspólny model kosztów w całym systemie · ślad kursu na każdym dokumencie.

### Rentowność
Fracht minus wszystkie koszty przypisane do zlecenia · marża w złotych i w procentach ·
**aktualizacja od razu po dodaniu kosztu przez kierowcę** · raporty per pojazd, kierowca, kraj.

### Dokumenty i terminy
Dokumenty pojazdu i firmy · dokumenty kierowców · przypomnienia z wyprzedzeniem
(90 / 30 / 14 / 7 dni) w powiadomieniu i mailu · zbiorczy widok statusu.

### Rozliczenia kierowców
Dni w każdym kraju z trasy, z ręczną korektą · stawki diet zagranicznych ·
rozliczenie z kursem i śladem audytowym · wypłata i zestawienie · eksport do księgowości.

### Dane dla księgowej
Dziewięć rejestrów · eksport natywny do trzech programów księgowych · uniwersalny arkusz ·
walidacja przed eksportem · historia eksportów · zamknięcie miesiąca ·
zestawienie kursów · zgłoszenie pojazdu do pełnego odliczenia.

### Konto, plan i płatności
Samodzielna rejestracja właściciela · 14 dni próby · plany Start i Firma ·
**płatność za pojazdy napędzane — naczepy i przyczepy nie liczą się do abonamentu** ·
kierowcy i pracownicy biura bez limitu · dopłata za pojazd ponad limit, z potwierdzeniem ·
płatność kartą, portal klienta, faktura VAT za abonament ·
tryb tylko do odczytu po wygaśnięciu (dane zostają, nic nie ginie).

### Pierwsze uruchomienie
Publiczne demo bez rejestracji · sensowne komunikaty na pustych ekranach ·
lista kroków pierwszego uruchomienia · nawigacja odsłaniana stopniowo, w miarę
uzupełniania danych · kreator z dodaniem pierwszego kontrahenta · sekwencja
14 maili przez okres próbny · centrum pomocy · okienko wsparcia w aplikacji.

### Rzeczy wspólne, drobne, a ważne
**Tryb nocny w aplikacji kierowcy i w przeglądarce** · sześć języków w aplikacji kierowcy ·
praca bez zasięgu · powiadomienia push i mail · dane na serwerach w Unii ·
codzienna kopia zapasowa · szyfrowanie · dziennik zdarzeń · brak instalacji dla biura.

---

## 4. Tabela twierdzeń

Każde zdanie, które pojawi się na stronie, musi mieć tu wiersz. Kolumna **status**
decyduje, czy wolno je napisać wprost, czy trzeba je zmiękczyć albo wyrzucić.

Legenda:
**[P]** potwierdzone w backlogu v2 · **[I]** z inwentarza produktu (poprzednia strona,
`llms.txt`) — zbudowane, ale niepotwierdzone w v2 · **[U]** podane przez Ciebie ustnie ·
**[?]** do rozstrzygnięcia przed publikacją

| Twierdzenie na stronie | Status | Uwaga |
|---|---|---|
| Cztery role: właściciel, dyspozytor, księgowa, kierowca | **[P]** | Rola dyspozytora i role jako zbiór — etap 2 |
| Kierowca ma aplikację na iOS i Android | **[P]** | Publikacja w App Store i Google Play — etap 6 |
| Aplikacja nazywa się BusiKM Kierowca | **[P]** | Etap 6 |
| Kierowca wchodzi kodem, nie zakłada konta | **[P]** | Etap 2 |
| Aplikacja działa bez zasięgu, ekran „Do wysłania” | **[P]** | Etap 6 |
| Nawigacja wbudowana w aplikację kierowcy | **[U]** | Do potwierdzenia zrzutem ekranu przed publikacją |
| Dodanie kosztu w trasie jednym przyciskiem | **[U] [I]** | Zdjęcie paragonu — funkcja istnieje |
| Odczyt paragonu (kwota, data, sprzedawca, NIP) | **[I]** | Poprzednio opisywany jako odczyt w sześciu językach |
| Sześć języków w aplikacji kierowcy | **[I]** | Do potwierdzenia, czy nadal wszystkie sześć |
| Tryb nocny w aplikacji i w przeglądarce | **[U]** | Do potwierdzenia zrzutem ekranu |
| Zlecenie połączone z fakturą | **[P]** | Faktury sprzedaży, typy transakcji, korekty — etap 4A |
| Wysyłka faktury do klienta: PDF i KSeF jednym kliknięciem | **[U]** ✅ | **Potwierdzone przez właściciela produktu — KSeF działa.** Piszemy w czasie teraźniejszym |
| Komplet dokumentów dla księgowej jednym przyciskiem | **[P]** | Centrum eksportów, dziewięć rejestrów, XLSX — etap 4A |
| Insert GT, Comarch ERP Optima, Symfonia FK | **[P]** | Rozszerzenie generatorów natywnych — etap 4A |
| Walidacja kompletności przed eksportem | **[P]** | Etap 4A |
| Zamknięcie miesiąca przez księgową | **[P]** | Etap 2 |
| Zysk, przychód i koszty na żywo u właściciela | **[P] [I]** | Rentowność zleceń, koszty przypisane — etap 4A |
| Marża aktualizuje się po dodaniu kosztu | **[I]** | |
| Mapa floty na żywo | **[I]** | GPS w tle potwierdzony w v2, sama mapa z inwentarza |
| Dyspozytor pracuje na jednym ekranie | **[U] [P]** | Rola potwierdzona w v2, układ jednoekranowy — do potwierdzenia projektem |
| Trasa dobierana automatycznie, z uwzględnieniem ruchu | **[U]** ✅ | **Potwierdzone przez właściciela produktu — działa.** Czas teraźniejszy |
| Zmiana trasy w trakcie jazdy, widoczna u kierowcy | **[U] [?]** | Do potwierdzenia |
| Kontakt z kierowcą z ekranu dyspozytora | **[U] [I]** | Poprzednio opisywane jako czat z kierowcą |
| Dni w każdym kraju liczone z trasy | **[P]** | Etap 4B |
| Diety zagraniczne | **[P]** | Etap 4B |
| Karta ewidencji czasu pracy do wydruku | **[P]** | Etap 4B |
| Ostrzeżenie o przerwie zanim kierowca przekroczy | **[I]** | Silnik czasu pracy — poza zakresem v2 |
| Przypomnienia o terminach dokumentów | **[I]** | |
| Tachograf — BusiKM **nie** pilnuje terminów tachografu | — ✅ | **Rozstrzygnięte: tachograf to inne urządzenie i inna rola.** Tachograf zapisuje, bo jest wymagany. BusiKM jest **pomocą wizualną dla kierowcy** — pokazuje na ekranie, ile jeszcze może jechać. Nie zastępuje tachografu i tego nie sugeruje |
| Publiczne demo bez rejestracji, dane resetowane co noc | **[P]** | Etap 5 |
| 14 dni próby | **[P]** | Etap 2 |
| Plany Start i Firma, kwoty 149 / 299 zł | **[P]** ✅ | **Kwoty potwierdzone przez właściciela produktu** |
| Płacisz za pojazdy napędzane, przyczepy gratis | **[P]** | Etap 2 |
| Kierowcy i pracownicy biura bez limitu | **[P]** | Etap 2 |
| Karta wymagana przy starcie okresu próbnego | **[P]** ✅ | Zostaje. **Nie komunikujemy tego głośno i nie pisemy „bez karty”** — patrz `02` |
| Rezygnacja jednym kliknięciem, dane zostają | **[P]** | Portal klienta, tryb tylko do odczytu — etap 2 i 3 |
| Dane na serwerach w Unii, RODO, umowa powierzenia | **[P]** | Etap 7 |
| Biuro rachunkowe, panel multi-tenant | **USUNIĘTE** | **Nie wolno pisać** |
| Pilotaż, dożywotnio gratis | **USUNIĘTE** | **Nie wolno pisać** |
| Aplikacja mobilna dla właściciela | **USUNIĘTE** | Właściciel pracuje w przeglądarce, także na telefonie |
| VAT-REF, zwrot podatku z Unii | **[I] [?]** | Nie ma w v2. Domyślnie **nie piszemy** |
| Kabotaż, mapa parkingów, plan wymiany tachografów | **[I] [?]** | Nie ma w v2. Domyślnie **nie piszemy** |

### Rozstrzygnięcia właściciela produktu (2 września 2026)

Wszystkie pięć otwartych kwestii zamkniętych:

1. **KSeF działa.** Sekcja „Zlecenie → faktura → klient” pisana w czasie teraźniejszym:
   *wysyłasz plik na mail klienta i zgłoszenie do systemu e-faktur, jednym kliknięciem*.
2. **Kwoty 149 i 299 zł potwierdzone.**
3. **Karta przy okresie próbnym zostaje, ale nie komunikujemy tego głośno.**
   Nie piszemy „bez karty” i nie piszemy „wymagana karta”. Zdanie pod przyciskiem brzmi:
   *„Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.”*
   Ścieżką całkowicie bez zobowiązań jest **demo** — i tak ją nazywamy.
4. **Automatyczny dobór trasy z uwzględnieniem ruchu działa.** Czas teraźniejszy.
5. **Tachograf — zmiana ramy.** Tachograf to zupełnie inne urządzenie i inna rola:
   jest **wymagany** i **zapisuje**. BusiKM go nie zastępuje, nie pilnuje jego terminów
   i tego nie sugeruje. BusiKM jest **pomocą wizualną dla kierowcy** — pokazuje na ekranie,
   ile jeszcze może jechać i kiedy musi stanąć.

   Na stronie zostaje jako krótki blok w sekcji o czasie pracy:
   **„Tachograf zapisuje. BusiKM pokazuje.”**
   Znika sekcja o terminie lipca 2026 i o pilnowaniu terminów tachografu.
   Kolor `amber` przechodzi na wygasające dokumenty w sekcji 14.
