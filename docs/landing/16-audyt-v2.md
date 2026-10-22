# Audyt treści strony względem BusiKM v2 (22.10.2026)

Strona była pisana pod projekt v1. Ten audyt porównuje każde twierdzenie
o produkcie z kodem v2 w trzech repozytoriach: `busikm-web`, `busikm-mobile`
i `busikm-backend` (gałąź v2). Każdy problem dotyczy obu wersji językowych
— blok `en` w tych samych plikach ma te same rozjazdy.

Zasada: strona mówi tylko to, co aplikacja robi dziś. Rzeczy w planach
nie trafiają na stronę jako gotowe.

## 1. Do decyzji właściciela

Tych punktów nie da się rozstrzygnąć z kodu.

| # | Pytanie | Co mówi kod v2 | Co mówi strona |
|---|---|---|---|
| D1 | Czy publiczna rejestracja i demo są już otwarte na produkcji? | Rejestracja (`/register`) i demo (`/demo`: wybór roli, tylko do odczytu, godzina) są zaimplementowane | „Konta otwieramy wkrótce”, „Demo przygotowujemy”, listy zapisów |
| D2 | Czy aplikacja kierowcy jest publicznie w App Store i Google Play? | Android idzie na ścieżkę `internal` jako `draft`, iOS do TestFlight | Odznaki „Pobierz w App Store / z Google Play” |
| D3 | Ceny „netto” czy końcowe? | MOVGRANTO zwolniona z VAT (art. 113), faktura „zw.”, panel nie pisze „netto” | „149 zł netto”, `valueAddedTaxIncluded: false` |
| D4 | Czy plan Start ma mapę floty? | Macierz planów: mapa tylko w Firma, ale nic tego nie blokuje | Start: „Mapa i trasy” |
| D5 | Czy kopie zapasowe zostają w UE? | Kopie w Cloudflare R2 bez jurysdykcji EU | „Serwery i kopie w Europie” |
| D6 | Rejestr podprocesorów | Odczyt dokumentów robi Claude (Anthropic), push idzie przez Expo | Strona wymienia Google Vision i Apple/Google |

D6 to sprawa prawna (polityka prywatności i rejestr podprocesorów) —
poprawiamy dopiero po decyzji.

## 2. Aplikacja kierowcy

| Temat | Strona dziś | Prawda w v2 | Nowe brzmienie |
|---|---|---|---|
| Nawigacja | „Nawigacja jest w środku, nie przeskakuje między aplikacjami” | Trasa otwiera się w Apple Maps, Google Maps albo Waze (też CarPlay i Android Auto); BusiKM zapisuje przejazd w tle | „Nawigacja jednym dotknięciem — Apple Maps, Google Maps albo Waze” |
| Języki | „Sześć języków”, „w jego języku” | Tylko polski | Usunąć |
| Logowanie | „Wpisuje kod raz, nie zakłada konta, nie wymyśla hasła” | Kod zaproszenia ABCD-EFGH z maila + e-mail, potem imię, nazwisko i hasło | „Dostaje kod mailem, wpisuje go, ustawia hasło i jest w środku” |
| Start dnia | Przycisk „Rozpocznij trasę”, „Rusz” | „Zacznij dzień” (zdjęcie licznika), statusy zmieniają się po dojeździe na miejsce | „Zdjęcie licznika, »Zacznij dzień« i jedzie” |
| Przerwa | „Za 20 minut przerwa” | Przypomnienie 15 minut wcześniej | „Za 15 minut przerwa” |
| Liczniki czasu | „Chodzą w telefonie, działają bez zasięgu” | Liczy serwer; bez sieci telefon pokazuje ostatni stan, przerwy czekają w kolejce. Liczniki UE tylko przy przewozie międzynarodowym, w kraju — dzienny czas pracy | „Przerwy zapiszesz bez zasięgu — dojdą, gdy wróci sygnał” |
| Ekran blokady | „Licznik widoczny na ekranie blokady” | Nie ma | Usunąć |
| Paragon | „Kwota, data, sprzedawca wpisują się same, koszt trafia do zlecenia i pojazdu” | Kierowca wybiera rodzaj kosztu i zlecenie, odczyt robi serwer po wysłaniu; pojazdu nie wybiera | „Zdjęcie, rodzaj kosztu, zlecenie. Kwotę, datę i sprzedawcę BusiKM odczyta sam” |
| Kategorie | „Posiłek”, „podpowiedź kategorii po sprzedawcy” | Nie ma posiłku ani podpowiedzi | Lista bez posiłku, bez podpowiedzi |
| Poprawki | „Kierowca poprawia kwotę ręcznie” | Poprawia tylko na pytanie biura albo robi zdjęcie jeszcze raz | „Biuro pyta w aplikacji, kierowca poprawia” |
| Historia tras | „Podgląd własnych tras z historii” | Jest historia zakończonych zleceń | „Historia zakończonych zleceń” |
| Dokumenty pojazdu | „Widoczne dla kierowcy w trasie” | Kierowca widzi dokumenty zlecenia (CMR, WZ) | „Dokumenty zlecenia pod ręką” |
| Zakładki | Pulpit / Zlecenia / Paragony / AETR / Konto | Dziś / Zlecenia / Dodaj / Czat / Ja | Nowe zrzuty |

## 3. Biuro (web)

| Temat | Strona dziś | Prawda w v2 | Nowe brzmienie |
|---|---|---|---|
| Dyspozytornia | Trzy kolumny, rozmowa z kierowcą na ekranie | Kolejka + mapa, pod spodem plan floty; czat w karcie zlecenia | „Kolejka zleceń i mapa floty obok siebie. Do kierowcy piszesz jednym kliknięciem” |
| Filtr kierowców | „jedzie, na przerwie, dostępny” | Mapa: wszystkie / w trasie / wolne / serwis | Zgodnie z aplikacją |
| Korki i przeliczanie | „Trasa bierze pod uwagę korki, przelicza się sama” | Mapbox bez danych o ruchu; system ustawia kolejność postojów; godzina dojazdu co 10 min z pozycji auta; przy zmianie trasy warianty (najszybsza, bez płatnych dróg) | „Wpisujesz punkty — system ustawia kolejność, liczy kilometry i czas. Godzina dojazdu odświeża się z pozycji auta” |
| Postoje | „Postoje dłuższe niż 15 minut zaznaczone” | Nie ma | „Ślad przejazdu do odtworzenia” |
| Pulpit właściciela | „Trzy liczby u góry, mapa z trasą” | Najpierw „Do zrobienia” i „Dziś”, niżej przychód, koszty, wynik; bez mapy | „Na górze to, co wymaga uwagi dziś, niżej przychód, koszty i wynik” |
| Wysyłka faktury | „Jednym kliknięciem mail i e-faktura naraz, status dostarczone” | „Wystaw i wyślij do KSeF”, mail z PDF i QR idzie sam po nadaniu numeru; droga: wystawiona → w KSeF → u klienta → zapłacona | „Jednym przyciskiem do KSeF. Po nadaniu numeru PDF z kodem QR sam idzie do klienta” |
| E-faktury | „E-faktura to drugi kanał, włączasz kiedy chcesz” | KSeF obowiązkowy; jest tryb offline i dosyłanie | „Faktury dla firm idą przez KSeF, BusiKM wysyła je za Ciebie” |
| Korekty | „Korekty tą samą ścieżką” | Korekty są, ale kolejka KSeF ich dziś nie wysyła (prawdopodobny błąd w BE) | Bez obietnicy wysyłki korekty do KSeF |
| Kurs waluty | „Z dnia poprzedzającego wystawienie” | NBP z dnia przed datą sprzedaży | Poprawić |
| Termin płatności | „Liczony od wysyłki” | Od daty wystawienia, dni z karty klienta | Poprawić |
| Duplikat | „Duplikat na życzenie klienta” | „Wyślij ponownie PDF”, „Powiel jako nową fakturę” | Poprawić |
| Amortyzacja | „Rozkładana na kursy, możesz wyłączyć” | Amortyzacja i polisa w kosztach auta (koszt na km), nie na zleceniu | „W kosztach auta — koszt na kilometr na karcie pojazdu” |
| Koszt kierowcy | „…nocleg i koszt kierowcy” | Na zlecenie wchodzą diety | „…nocleg i diety kierowcy” |
| Paragon w wyniku | „Liczba zmienia się od razu” | Liczy się koszt ze statusem Gotowe | „Gdy paragon ma komplet danych, wynik przelicza się sam” |
| Dziewięć zestawień | Sprzedaż, Zakupy, Koszty, Kursy walut, Opłaty, Korekty… | Lista eksportów: dekrety FK, rejestry VAT, płace i diety, delegacje, ewidencje przebiegu, KPiR/JPK_PKPIR, VAT-REF, JPK_FA, JPK_V7M | Nazwy z aplikacji |
| „Pobierz komplet” | Przycisk „Pobierz komplet za sierpień” | „Pobierz paczkę dla biura” (robocza przed zamknięciem, ostateczna z JPK_V7M po) | Nazwa z aplikacji |
| Formaty | „Insert · EPP”, „Symfonia · FK” | Insert GT (EPP), Comarch Optima (XML), Symfonia (TXT + AMS) | Poprawić |
| Historia plików | „Każdy plik pobierzesz ponownie” | Pliki z 30 dni | „Pliki z ostatnich 30 dni” |
| Lista braków | „Z nazwiskiem osoby, która uzupełni” | Pięć kroków miesiąca z odnośnikiem do braku | Poprawić |
| Wiele firm | „Jedno konto, przełączasz się między firmami” | Jedna firma na konto | Usunąć albo „Każda firma zaprasza Cię osobno” |
| Tylko do odczytu | „Księgowa ma dostęp tylko do odczytu, nie widzi mapy ani zleceń” | Wystawia faktury, korekty, zamyka miesiąc; widzi zlecenia i mapę, nie zmienia ich | „Rozliczasz faktury, koszty i miesiąc. Zleceń i tras nie zmieniasz” |
| Przypomnienia o dokumentach | „Tobie i kierowcy” | 60, 30, 14 i 3 dni przed — właścicielowi i dyspozytorowi | Poprawić |
| Instalacja | „Nic nie instalujesz, otwierasz w przeglądarce” | Biuro w przeglądarce, kierowca w aplikacji | „Biuro bez instalacji, kierowca w aplikacji” |

## 4. Przekrojowe

| Temat | Strona dziś | Prawda w v2 | Nowe brzmienie |
|---|---|---|---|
| Limit planu Firma | „Do 10, każdy kolejny +29 zł” | Twardy limit 50 pojazdów | „…do 50 pojazdów. Większa flota — napisz” |
| Pierwszy dzień: pojazd | „Numer rejestracyjny i tyle” | Numer, marka, model, rok; odczyt dowodu ze zdjęcia | „Zdjęcie dowodu — dane wpisują się same” |
| Pierwsze kroki: konto | „Adres e-mail i nazwa firmy” | Pierwszy krok to NIP, dane z rejestru | „NIP i e-mail. Nazwę i adres pobierzemy z rejestru” |
| Centrum pomocy | Zaproszenie z odnośnikiem, płatność mailem, rejestracja po rozmowie | Kod w mailu, Stripe Checkout i portal, rejestracja samoobsługowa | Przepisać artykuły |
| llms.txt | AWS, nawigacja w środku, sześć języków, demo pod busikm.pl/demo | DigitalOcean (Frankfurt), zewnętrzna nawigacja, polski | Poprawić |
| Wyjście z usługi | „Pobierasz wszystko w komplecie” | Konto zostaje do odczytu, eksporty działają; nie ma jednego eksportu całości | „Konto zostaje do odczytu — pobierasz faktury, ewidencje i eksporty” |
| `vatID` w danych strukturalnych | `PL{NIP}` | Firma zwolniona z VAT | Zostawić `taxID`, usunąć `vatID` |

## 5. Czego strona nie mówi, a v2 ma

Warto dopisać tam, gdzie pasuje: e-CMR z podpisami nadawcy i odbiorcy,
zgłoszenie problemu i „Nie mogę kontynuować”, urlopy w aplikacji,
wstrzymanie zapisu trasy na prywatną przerwę, proformy, faktura zbiorcza
z kilku zleceń, noty obciążeniowe, faktury kosztowe pobierane z KSeF,
tryb offline KSeF, JPK_V7M, KPiR, VAT-REF, śledzenie przesyłki dla klienta,
doładunek, podpowiedź „kto zdąży” przy przypisaniu.

## 6. Do zgłoszenia zespołowi (nie strona)

- Korekty faktur nie trafiają do kolejki wysyłki KSeF (`apps/ksef/sending.py:27`),
  choć dokument FA(3) KOR jest gotowy, a mail czeka na numer KSeF.
- Katalog `ios/` w `busikm-mobile` był niezgodny z `package.json`
  (`react-native-keyboard-controller` niewlinkowany) — przy budowaniu
  trzeba robić `expo prebuild --clean`.

## 7. Stan po poprawkach (22.10.2026)

Decyzje: rejestracja i demo jeszcze niepubliczne (listy zapisów zostają),
aplikacja kierowcy „wkrótce w App Store i Google Play”, ceny końcowe bez VAT,
mapa floty na żywo tylko w planie Firma. Teksty PL i EN poprawione według
sekcji 2–4; długie myślniki zamienione na półpauzy w całej stronie.

Doprecyzowanie: mail z fakturą do klienta nie wychodzi sam przy wystawieniu.
Wysyłkę zlecasz („Wyślij klientowi” albo od razu przy wystawianiu), a system
czeka z nią na numer KSeF.

Zostało do decyzji prawnej (nie zmieniane):

- `src/content/dokumenty/regulamin.ts` — § o opłatach mówi „kwoty netto,
  doliczany VAT”, a cennik podaje dziś ceny końcowe (zwolnienie z VAT).
- `src/content/dokumenty/podprocesorzy.ts` — brakuje Anthropic (odczyt
  dokumentów) i Expo (powiadomienia push); Google Cloud Vision jest dziś
  tylko zapasowe.
- Macierz planów w backendzie nie blokuje rentowności i zestawień w planie
  Start, a cennik pokazuje je jako funkcje planu Firma.
