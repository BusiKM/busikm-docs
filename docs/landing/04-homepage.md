# 04 · Strona główna — sekcja po sekcji

Treść gotowa do wklejenia. Nagłówki są dobrane pod rytm — jeśli je zmieniasz, zmieniaj
całe zdanie, nie pojedyncze słowa.

**Rytm tła:** J = jasna (`paper`), C = ciemna (`ink`). Naprzemiennie, ciemna sekcja to
moment, w którym chcemy, żeby ktoś się zatrzymał.

**Makiety:** wszędzie, gdzie niżej jest napisane „makieta”, do czasu powstania kodu stoi
**ramka zastępcza** z opisem zawartości i nazwą pliku do podmiany. Ramki, nazwy plików
i oprawa graficzna każdej sekcji — w `08-makiety-i-zdjecia.md`.

| # | Sekcja | Tło | Odpowiada na pytanie |
|---|---|---|---|
| 1 | Nawigacja | — | — |
| 2 | Hero | J | Co to jest? |
| 3 | Cztery rzeczy, których nie będziesz już robił | J | Czy to o mnie? |
| 4 | Cztery osoby. Jeden system | **C** | Kto z tego korzysta u mnie? |
| 5 | Trzy ruchy | J | Jak to działa? |
| 6 | Dyspozytornia | J | Jak wygląda mój dzień? |
| 7 | Aplikacja kierowcy | **C** | Czy kierowca to ruszy? |
| 8 | Zlecenie → faktura → klient | J | Co z fakturami? |
| 9 | Ile zostaje | **C** | Czy ja na tym zarabiam? |
| 10 | Mapa i trasa | J | Gdzie są moi ludzie? |
| 11 | Czas pracy i przerwy | **C** | Czy coś przeoczymy? |
| 12 | Koszty i paragony | J | Co z tą reklamówką? |
| 13 | Koniec miesiąca | **C** | Co z księgową? |
| 14 | Dokumenty i terminy | J | Co mi wygaśnie? |
| 15 | Rzeczy, które widać dopiero w robocie | **C** | Czy ktoś o tym pomyślał? |
| 16 | Demo | J | Mogę zobaczyć bez zobowiązań? |
| 17 | Pierwszy dzień | J | Ile mi to zajmie? |
| 18 | Jedna faktura zamiast czterech | J | Za co płacę? |
| 19 | Cennik | J | Ile? |
| 20 | Twoje dane zostają Twoje | **C** | A jak coś pójdzie nie tak? |
| 21 | Pytania | J | *(reszta obiekcji)* |
| 22 | Finał | **C** | Jak zacząć? |
| 23 | Stopka | **C** | — |

---

## 1 · Nawigacja

Opisana w `03`. Dwa rozwijane menu z korzyściami, Cennik, Pomoc, „Zaloguj się”,
niebieski przycisk „Zobacz demo”.

---

## 2 · Hero — J

**Nadtytuł** *(caption, wersaliki, szary — nad nagłówkiem)*
> BUSY 2,5–3,5 T · TRANSPORT KRAJOWY I MIĘDZYNARODOWY

*Ta jedna linia zdejmuje pytanie „czy to dla mnie” zanim ktokolwiek zacznie czytać.*

**Nagłówek** *(display)*
> Kierowca jedzie.
> Reszta dzieje się sama.

**Podtytuł** *(lead, maks. dwie linie)*
> Zlecenia, trasy, koszty, faktury i komplet dla księgowej — w jednym miejscu.
> Kierowca ma telefon w kieszeni, Ty masz robotę zrobioną.

**Przyciski:** `Wypróbuj 14 dni` (niebieski) · `Zobacz demo` (obrysowany)

**Pod przyciskami, drobnym szarym:**
> Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.

**Makieta:** duży, wyśrodkowany pulpit właściciela, lekko uniesiony nad stroną —
trzy liczby na górze (przychód, koszty, **zysk**), obok mapa z linią trasy,
pod spodem lista trzech aktywnych zleceń ze statusami.

**Animacja:** sekwencja wejścia (nagłówek → podtytuł → przyciski → makieta),
makieta unosi się i lekko powiększa. Przy przewijaniu delikatnie odjeżdża w górę.
Szczegóły w `06`, poziom 2.

---

## 3 · Cztery rzeczy, których nie będziesz już robił — J

Wąski pas tuż pod hero, tło `mist`. Bez makiety, sama typografia.

**Nagłówek** *(h2)*
> Cztery rzeczy, których nie będziesz już robił.

Cztery kolumny, każda: przekreślone zdanie „przed” i zdanie „po”.

| Przed | Po |
|---|---|
| ~~Dzwonisz do kierowcy: „gdzie jesteś?”~~ | Widzisz go na mapie |
| ~~Wieczorem przepisujesz do Excela~~ | Liczy się samo, w trakcie |
| ~~Zbierasz paragony z reklamówki~~ | Kierowca robi zdjęcie w trasie |
| ~~Odpisujesz księgowej, czego brakuje~~ | Dostaje komplet jednym przyciskiem |

**Animacja:** cztery kolumny wchodzą kaskadą, przekreślenie „przed” rysuje się
od lewej do prawej, gdy kolumna staje się widoczna.

---

## 4 · Cztery osoby. Jeden system — C

Sekcja przyklejona *(sticky)*. To jest odpowiedź na „kto z tego korzysta u mnie”.

**Nadtytuł** *(caption, wersaliki, szary)*: CZTERY ROLE

**Nagłówek**
> Cztery osoby. Jeden system.
> Każdy widzi swoje.

Cztery zakładki przełączane przewijaniem — po lewej nazwa roli i korzyść,
po prawej makieta jej ekranu.

**Właściciel** · przeglądarka
> **Widzisz, ile zostaje. Dziś, nie po miesiącu.**
> Przychód, koszty i zysk na pierwszym ekranie po zalogowaniu. Cała flota na mapie.
> Marża na każdym kursie z osobna.

**Dyspozytor** · przeglądarka
> **Cały dzień pracy na jednym ekranie.**
> Zlecenia, mapa, kierowcy i rozmowa obok siebie. Przypisujesz kierowcę i pojazd,
> trasa układa się sama.

**Księgowa** · przeglądarka
> **Koniec miesiąca w jednym kliknięciu.**
> Komplet dokumentów za wybrany miesiąc, w formacie jej programu. Zamyka miesiąc
> i nikt nie zmienia już danych wstecz.

**Kierowca** · telefon
> **Rusz. Resztą zajmuje się telefon.**
> Zlecenie, nawigacja, przerwy i koszty w jednej aplikacji. Bez zakładania konta,
> bez wpisywania czegokolwiek w trasie.

**Pod spodem, drobnym:**
> Jesteś właścicielem i dyspozytorem w jednej osobie? Normalne.
> Przełączasz widok jednym kliknięciem.

**Animacja:** sekcja trzyma się ekranu przez cztery „takty” przewijania,
makieta po prawej podmienia się z przejściem, aktywna rola podświetla się po lewej.
Szczegóły w `06`, poziom 3.

---

## 5 · Trzy ruchy — J

**Nagłówek**
> Trzy ruchy. Reszta dzieje się bez Ciebie.

Trzy kolumny z numerami.

**01 — Kierowca rusza**
> Włącza trasę w telefonie. Robi zdjęcie licznika. Tyle.

**02 — Dane same lecą**
> Trasa, kilometry, czas pracy, paragony. Wszystko ląduje u Ciebie — nawet wtedy,
> gdy kierowca nie ma zasięgu.

**03 — Miesiąc się zamyka**
> Faktury dla klientów, koszty, przebieg i komplet dla księgowej. Jednym przyciskiem.

**Animacja:** kolumny kaskadą co 90 ms, numery liczone od zera.

---

## 6 · Dyspozytornia — J

**Nagłówek**
> Cały dzień pracy na jednym ekranie.

**Treść**
> Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Nie przełączasz zakładek
> i nie szukasz numeru w telefonie. Przypisujesz kierowcę i pojazd, a system podpowiada,
> kto ma wszystko ważne.

**Trzy punkty**
- Zlecenie od przyjęcia po rozliczenie, w jednym miejscu
- Kierowca i pojazd przypisani w dwie sekundy
- Rozmowa z kierowcą bez wychodzenia z ekranu

**Podpis techniczny** *(szary, drobny)*
> Dyspozytor ma w BusiKM własne stanowisko i własny dostęp — widzi to,
> czego potrzebuje do prowadzenia tras.

**Makieta:** jeden szeroki ekran podzielony na trzy części — lista zleceń po lewej,
mapa w środku, panel kierowcy z rozmową po prawej.

**Link:** `Zobacz, jak pracuje dyspozytor →` `/co-robi/dyspozytornia`

---

## 7 · Aplikacja kierowcy — C, pełny ekran

Najważniejsza sekcja dla obiekcji „mój kierowca tego nie ruszy”.

**Nadtytuł** *(caption, wersaliki)*: BUSIKM KIEROWCA · iPHONE I ANDROID

**Nagłówek**
> Cały dzień pracy w jednej aplikacji.

**Treść**
> Kierowca dostaje kod, wpisuje go raz i jest w środku. Nie zakłada konta,
> nie wymyśla hasła, nie dzwoni do Ciebie z pytaniem, jak się zalogować.

**Sześć punktów** — dwa rzędy po trzy, każdy z małą ikoną:

| | |
|---|---|
| **Nawigacja jest w środku** | Trasa ze zlecenia prowadzi go od razu. Nie przeskakuje między aplikacjami |
| **Koszt jednym przyciskiem** | Zatankował, pstryknął, jedzie dalej |
| **Działa bez zasięgu** | Tunel, góry, terminal promowy. Wszystko dośle, gdy złapie sygnał |
| **Widzi, co czeka na wysłanie** | Żadnego zgadywania, czy dane doszły |
| **Sześć języków** | Kierowca czyta w swoim języku, nie w Twoim |
| **Tryb nocny** | O trzeciej nad ranem ekran nie razi w oczy |

**Na dole:** dwie neutralne odznaki sklepów — narysowane, **nie oficjalne logotypy**.

**Makieta:** dwa telefony pod lekkim kątem. Lewy — nawigacja z trasą i kartą zlecenia
u dołu. Prawy — ekran dodawania kosztu ze zdjęciem paragonu. Oba w trybie nocnym,
podświetlone od dołu.

**Link:** `Zobacz aplikację kierowcy →` `/co-robi/aplikacja-kierowcy`

---

## 8 · Zlecenie → faktura → klient — J

**Nagłówek**
> Ze zlecenia robi się faktura.
> Klient ma ją, zanim wrócisz do biura.

**Treść**
> Zlecenie i faktura to jedno. Kierowca kończy kurs, Ty sprawdzasz kwotę i wysyłasz —
> plik na mail klienta i zgłoszenie do systemu e-faktur, jednym kliknięciem.
> Nic nie przepisujesz.

**Trzy punkty**
- Faktura powstaje z danych zlecenia
- Wysyłka do klienta i do systemu e-faktur — jedno kliknięcie
- Korekty i zaliczki idą tą samą ścieżką

**Makieta:** karta zlecenia po lewej, faktura po prawej, między nimi strzałka.
Na fakturze przycisk „Wyślij”, obok dwa znaczniki: „mail” i „e-faktura”.

**Link:** `Zobacz, jak działają faktury →` `/co-robi/zlecenia-i-faktury`

---

## 9 · Ile zostaje — C

**Nagłówek**
> Wiesz, ile zostaje.
> Na tym kursie. Dziś.

**Treść**
> Fracht minus paliwo, opłaty drogowe, hotel i dieta kierowcy. Kierowca dodaje paragon
> w trasie — liczba na Twoim ekranie zmienia się od razu. Nie na koniec kwartału.

**Trzy punkty**
- Przychód, koszty i zysk na pulpicie, na bieżąco
- Marża na każdym zleceniu z osobna
- Koszty w obcych walutach przeliczone po kursie z dnia

**Makieta:** karta jednego zlecenia — Warszawa → Mediolan — z rozbiciem kosztów
w wierszach i dużą liczbą zysku na dole. Obok mały wykres dzienny.

**Animacja:** liczba zysku liczy się od zera; po chwili do listy „dopada” nowy koszt
i liczba przelicza się w dół. To jest ta jedna animacja, którą warto zrobić dokładnie.

**Link:** `Zobacz rentowność →` `/co-robi/rentownosc`

---

## 10 · Mapa i trasa — J

**Nagłówek**
> Klient pyta, gdzie jest ładunek.
> Odpowiadasz w pięć sekund.

**Treść**
> Każdy bus na mapie, na żywo. Klikasz — widzisz kierowcę, zlecenie i o której będzie
> na miejscu.

**Druga część sekcji, mniejszy nagłówek** *(h3)*
> Trasa układa się sama.

> System proponuje przejazd i bierze pod uwagę, co się dzieje na drodze. Coś się zmienia
> w trakcie — poprawiasz trasę u siebie, a kierowca ma nową wersję w telefonie
> w tej samej chwili.

**Makieta:** mapa Europy z linią trasy i trzema znacznikami pojazdów; jeden dymek
z numerem rejestracyjnym, kierowcą i godziną dojazdu.

**Link:** `Zobacz mapę i trasy →` `/co-robi/trasy-i-mapa`

---

## 11 · Czas pracy i przerwy — C

**Nagłówek**
> Wiesz, kiedy kierowca musi stanąć.
> Zanim stanie za późno.

**Treść**
> Jazda, przerwy i odpoczynki liczą się same. Kierowca dostaje przypomnienie wcześniej,
> nie po fakcie. Ty widzisz to samo, ze swojego biura.

**Trzy punkty**
- Liczniki działają też wtedy, gdy telefon nie ma zasięgu
- Miesięczna karta czasu pracy gotowa do wydruku
- Dni w każdym kraju liczone z trasy, nie z notatek kierowcy

**Druga część sekcji, mniejszy nagłówek** *(h3)*
> Tachograf zapisuje. BusiKM pokazuje.

> Tachograf jest wymagany i robi swoje — rejestruje. BusiKM go nie zastępuje i nie udaje.
> Jest po to, żeby kierowca **widział na ekranie**, ile jeszcze może jechać i kiedy musi
> stanąć. Wcześniej, a nie po fakcie.

**Makieta:** trzy pierścienie postępu (jazda, przerwa, odpoczynek), obok lista kierowców
ze statusem: *w normie · przerwa za 40 min · odpoczynek*.

**Link:** `Zobacz czas pracy →` `/co-robi/czas-pracy`

---

## 12 · Koszty i paragony — J

**Nagłówek**
> Reklamówka paragonów. Do wyrzucenia.

**Treść**
> Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same,
> a koszt trafia do właściwego zlecenia i właściwego pojazdu.

**Trzy punkty**
- Paliwo, opłaty drogowe, hotel, prom, parking, naprawa
- Obca waluta przeliczona automatycznie, po kursie z dnia
- Zdjęcie zostaje jako dowód — nikt niczego nie szuka po miesiącu

**Makieta:** telefon ze zdjęciem paragonu, obok wypełniony formularz z polami
podświetlonymi na zielono jako rozpoznane.

**Link:** `Zobacz koszty →` `/co-robi/koszty-i-paragony`

---

## 13 · Koniec miesiąca — C

**Nagłówek**
> Księgowa dostaje komplet.
> Jednym przyciskiem.

**Treść**
> Wybiera miesiąc, klika raz i ma wszystko: sprzedaż, koszty, przebieg, delegacje
> i czas pracy. W formacie, który wczyta do programu, którego już używa.

**Trzy punkty**
- Insert, Comarch Optima, Symfonia albo zwykły arkusz
- System sam mówi, czego brakuje — zanim plik pójdzie dalej
- Zamyka miesiąc i nikt nie zmienia już danych wstecz

**Pod spodem, drobnym:**
> Księgowa może być z zewnątrz. Zapraszasz ją mailem, dostaje własny dostęp
> i widzi tylko to, co powinna.

**Makieta:** lista dziewięciu zestawień z licznikami pozycji, u góry jeden duży przycisk
„Pobierz komplet za sierpień”, obok wybór formatu.

**Link:** `Zobacz, co dostaje księgowa →` `/co-robi/dane-dla-ksiegowej`

---

## 14 · Dokumenty i terminy — J

**Nagłówek**
> Nic nie wygaśnie po cichu.

**Treść**
> Ubezpieczenie, przegląd, licencja, prawo jazdy, badania kierowców. System pilnuje dat
> i mówi wcześniej — Tobie i kierowcy.

**Trzy punkty**
- Wszystko w jednym miejscu: pojazdy, firma, kierowcy
- Przypomnienie na długo przed terminem — Tobie i kierowcy
- Jeden ekran pokazuje, co wymaga uwagi w tym miesiącu

**Makieta:** lista dokumentów posortowana po dniach do końca ważności,
z paskami statusu w trzech kolorach. **To jedyne miejsce na stronie z kolorem `amber`** —
dokument, który zaraz wygaśnie.

**Link:** `Zobacz dokumenty i terminy →` `/co-robi/dokumenty-i-terminy`

---

## 15 · Rzeczy, które widać dopiero w robocie — C

Siatka ośmiu kafelków, każdy: krótki nagłówek i jedno zdanie. Bez makiet.
To sekcja, która buduje zaufanie do produktu jako do czegoś **przemyślanego**.

**Nagłówek**
> Rzeczy, które widać dopiero w robocie.

| Kafelek | Zdanie |
|---|---|
| **Tryb nocny** | W telefonie kierowcy i w przeglądarce. Oczy podziękują — Twoje i jego |
| **Sześć języków** | Kierowca z Ukrainy, Rumunii czy Mołdawii czyta w swoim |
| **Bez zasięgu też działa** | Dane czekają w telefonie i dosyłają się same |
| **System sam się odzywa** | Dostajesz powiadomienie, gdy coś wymaga uwagi. Nie musisz zaglądać |
| **Nic nie instalujesz** | Otwierasz w przeglądarce — na laptopie i na telefonie |
| **Na starcie nie przytłacza** | Widzisz tylko to, co potrzebne. Reszta pojawia się z czasem |
| **Widać, kto co zmienił** | Każda zmiana ma autora i godzinę |
| **Dane zostają w Europie** | I zostają Twoje — także po rezygnacji |

---

## 16 · Demo — J

**Nagłówek**
> Nie wierz na słowo. Wejdź i poklikaj.

**Treść**
> To prawdziwa aplikacja z przykładową firmą. Bez zakładania konta, bez podawania
> czegokolwiek. Niczego nie zepsujesz — dane wracają do porządku każdej nocy.

**Cztery kafelki: co warto zobaczyć w środku**
- Pulpit z zyskiem miesiąca
- Dyspozytornia z mapą
- Zlecenie, z którego powstaje faktura
- Komplet dokumentów dla księgowej

**Przycisk:** `Wejdź do demo` (niebieski)
**Pod nim:** `Chcesz na swoich danych? Wypróbuj 14 dni →`

---

## 17 · Pierwszy dzień — J *(tło `mist`)*

**Nagłówek**
> Pierwsza trasa jeszcze dziś.

Trzy kroki w rzędzie, z czasem przy każdym.

**Dodajesz pojazd** · 2 minuty
> Numer rejestracyjny i tyle. Resztę uzupełnisz kiedyś przy kawie.

**Zapraszasz kierowcę** · 1 minuta
> Dostaje kod. Wpisuje go w aplikacji i już jest w środku.

**Kierowca rusza** · od razu
> Pierwsza trasa pojawia się u Ciebie na ekranie tego samego dnia.

**Pod spodem, drobnym:**
> Nie ma wdrożenia, szkolenia ani spotkania z handlowcem.

---

## 18 · Jedna faktura zamiast czterech — J

**Nagłówek**
> Jedna faktura zamiast czterech.

Dwie kolumny, bez nazw konkurencji i bez cen cudzych produktów.

**Dziś płacisz osobno za:**
> lokalizator w busie · program do rozliczania czasu pracy ·
> system do zleceń i faktur · arkusz, który prowadzisz sam

**Z BusiKM:**
> Jedno konto. Jeden rachunek. Wszystko rozmawia ze sobą.

---

## 19 · Cennik — J

**Nagłówek**
> Płacisz za pojazdy. Nie za ludzi.

**Podtytuł**
> Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się do abonamentu.

**Przełącznik:** Miesięcznie / Rocznie. Przy rocznym etykieta **„2 miesiące gratis”** —
nie procent.

| | **Start** | **Firma** |
|---|---|---|
| Miesięcznie | 149 zł netto | 299 zł netto |
| Rocznie | 1 490 zł netto | 2 990 zł netto |
| Pojazdy | do 3 | do 10, każdy kolejny +29 zł |
| Kierowcy | bez limitu | bez limitu |
| Pracownicy biura | bez limitu | bez limitu |

Karta **Firma** wyróżniona obwódką i etykietą „Najczęściej wybierany”.

**W Start:** zlecenia i dyspozytornia · mapa i trasy · czas pracy · koszty i paragony ·
faktury dla klientów · aplikacja dla kierowców

**W Firma:** wszystko ze Start, a do tego: komplet dla księgowej w formacie jej programu ·
zestawienia sprzedaży i zakupów · rentowność zleceń · raporty kosztów floty

**Pod kartami, drobnym:**
> Bez umowy na czas określony. Rezygnujesz jednym kliknięciem.
> Twoje dane pobierzesz zawsze — także po rezygnacji.

---

## 20 · Twoje dane zostają Twoje — C

**Nagłówek**
> Twoje dane zostają Twoje.

Cztery krótkie punkty w rzędzie:
- Trzymamy je w Europie
- Kopia zapasowa codziennie
- Rezygnujesz — pobierasz wszystko, w komplecie
- Widać, kto co zmienił i kiedy

**Pod spodem, drobnym:** linki do dokumentów prawnych w stopce.

---

## 21 · Pytania — J

Akordeon, domyślnie zamknięty. Dziewięć pozycji — to są prawdziwe obiekcje,
w kolejności, w jakiej padają.

**Mój kierowca tego nie ruszy.**
> Kierowca ma trzy przyciski: rusz, zrób zdjęcie, zakończ. Dostaje kod, wpisuje go raz
> i jest w środku — nie zakłada konta i nie wymyśla hasła. Aplikacja jest w jego języku.

**Czy moja księgowa będzie musiała się przestawiać?**
> Nie. Pobiera plik i wczytuje do programu, którego już używa — Insert, Comarch, Symfonia
> albo zwykły arkusz. Jeśli jest z zewnątrz, zapraszasz ją mailem.

**Mam już lokalizator w busach.**
> To zostaw go albo wypowiedz — jak wolisz. BusiKM pokazuje pozycję z telefonu kierowcy
> i łączy ją z tym, czego lokalizator nie umie: ze zleceniem, kosztami i rozliczeniem.

**Mam tachograf. Po co mi jeszcze to?**
> Tachograf zapisuje, bo musi. BusiKM pokazuje — kierowca widzi na ekranie, ile jeszcze
> może jechać i kiedy musi stanąć, a Ty widzisz to samo z biura. To nie to samo urządzenie
> i nie ta sama robota.

**Co, gdy kierowca nie ma zasięgu?**
> Aplikacja pracuje dalej i zapisuje wszystko w telefonie. Kierowca widzi, co czeka
> na wysłanie. Gdy złapie sygnał, dane dojeżdżają same.

**Ile trwa uruchomienie?**
> Dodajesz pojazd, zapraszasz kierowcę, kierowca instaluje aplikację.
> Pierwsza trasa pojawia się u Ciebie tego samego dnia.

**Czy dyspozytor widzi, ile zarabiam?**
> Nie musi. Dyspozytor prowadzi trasy i zlecenia. Pieniądze widzi właściciel
> i osoba od rozliczeń.

**Czy przyczepa liczy się jako pojazd?**
> Nie. Płacisz tylko za pojazdy napędzane.

**Co z danymi, gdy zrezygnuję?**
> Zostają Twoje. Pobierzesz je w komplecie, w formatach do wczytania gdzie indziej.

---

## 22 · Finał — C

**Nagłówek** *(display, wyśrodkowany)*
> Zacznij od jednej trasy.

**Podtytuł**
> 14 dni bez opłat. Bez umowy. Bez dzwonienia do handlowca.

**Przyciski:** `Wypróbuj 14 dni` (niebieski) · `Zobacz demo` (obrysowany)

---

## 23 · Stopka — C

Cztery kolumny wg `03`, pasek dolny z danymi spółki.
