# 13. Zgody marketingowe i lista mailingowa

Trzy formularze zbierają adresy do jednego celu: listy, z której kiedyś
pójdzie komunikacja przez narzędzie wysyłkowe. Ten dokument opisuje, co
wolno, czego nie i dlaczego zgoda wygląda inaczej w każdym z nich.

## Podstawa prawna — uwaga na nieaktualne źródła

Marketing przez e-mail opiera się dziś na **art. 6 ust. 1 lit. a RODO**
(zgoda) oraz **art. 398 Prawa komunikacji elektronicznej**.

**Art. 10 ustawy o świadczeniu usług drogą elektroniczną został uchylony
10 listopada 2024.** Większość poradników w sieci nadal go cytuje. PKE scaliło
wszystkie kanały — e-mail, SMS, telefon — w jeden przepis, więc zniknął spór
o to, ile zgód zbierać.

## Kiedy zgoda może być wymagana, a kiedy nie

Art. 7 ust. 4 RODO: zgoda nie jest dobrowolna, jeżeli od niej uzależnia się
wykonanie usługi, dla której nie jest niezbędna.

| Formularz | Usługa | Zgoda | Dlaczego |
|---|---|---|---|
| `/demo` | zapis na listę | **wymagana** | lista **jest** usługą — zgoda nie warunkuje niczego innego |
| `/zaloguj` | zapis na listę | **wymagana** | jak wyżej |
| `/kontakt` | odpowiedź na pytanie | **nieobowiązkowa** | uzależnienie odpowiedzi od zgody to warunkowanie |

To rozróżnienie jest sednem. Gdyby `/demo` obiecywało „powiadomimy Cię
o starcie" i **do tego** wymagało zgody marketingowej, byłoby to podręcznikowe
warunkowanie: usługa A uzależniona od zgody na B. Dlatego oferta na tych
stronach brzmi „zapisz się na listę" — wtedy nie ma czego odmówić osobie,
która zgody nie wyrazi.

## Dowód zgody

Ciężar wykazania spoczywa na nas (art. 7 ust. 1 RODO). Samo `zgoda: true`
niczego nie dowodzi — za rok nikt nie odtworzy, pod czym dana osoba się
podpisała. Przy każdym zapisie idzie więc do bazy:

| Pole | Co zawiera |
|---|---|
| `zgoda` | `true` |
| `trescZgody` | pełne brzmienie z chwili kliknięcia |
| `wersjaZgody` | numer wersji tego brzmienia |
| `kanalZgody` | `email` — art. 398 PKE wymaga wskazania kanału |
| `createdAt` | czas serwera, wymuszony regułą |

Reguły Firestore odrzucą dokument z `zgoda: true` bez kompletu tych pól,
i odwrotnie — zapis bez zgody nie może ich zawierać.

**Zmiana brzmienia zgody = podniesienie `WERSJA_ZGODY`** w
`src/content/zgoda.ts`. Poprawienie tekstu bez zmiany numeru sprawi, że stare
zapisy zaczną wskazywać na słowa, których ich autorzy nigdy nie widzieli.

## Tagi

Pole `zrodlo` w każdym dokumencie:

| Tag | Skąd |
|---|---|
| `demo` | `/demo` |
| `rejestracja` | `/zaloguj` |
| `formularz` | `/kontakt`, **wyłącznie gdy zaznaczono zgodę** |

Adresy z formularza kontaktowego bez zaznaczonej zgody **nie należą do
listy**. Zostają w kolekcji `wiadomosci` i służą wyłącznie do odpowiedzi na
zadane pytanie. Przy eksporcie filtruj po `zgoda == true`.

## Klaviyo — jak to działa

Zapis idzie **wprost z tras `/api/zapis` i `/api/powiadom`**, bez pośrednika.
Punkt końcowy: `POST /api/profile-subscription-bulk-create-jobs`.

To jedyny punkt, który **zapisuje zgodę razem z profilem**. Zwykłe
`POST /api/profiles` tworzy kontakt, ale go nie subskrybuje i nie odnotowuje
momentu wyrażenia zgody — a to właśnie ten moment trzeba umieć wykazać.
`consented_at` ustawiamy na czas zapisu u nas, żeby data w Klaviyo zgadzała
się z `createdAt` w Firestore.

Do profilu trafiają: `email`, `first_name` oraz właściwości `zrodlo`,
`zgoda_wersja`, `zgoda_tresc`. Tag `zrodlo` służy do budowania segmentów.

| Zmienna | Co to |
|---|---|
| `KLAVIYO_API_KEY` | klucz **prywatny**, zakres Profiles (Write) + Subscriptions (Write) |
| `KLAVIYO_LISTA_ID` | sześcioznakowy identyfikator listy |

Bez tych zmiennych funkcja nic nie robi i zwraca `pominiete`. Adres i tak
leży w Firestore z kompletem pól, więc nic nie ginie — można go zaimportować
ręcznie.

**Wynik zapisu do Klaviyo widać w powiadomieniu na skrzynkę.** Wiersz
„Klaviyo" mówi „zapisany" albo podaje powód niepowodzenia. Dzięki temu cicha
awaria integracji nie przejdzie niezauważona.

### Kolejność wywołań

Najpierw Klaviyo, potem wysyłka powiadomienia. Odwrotna kolejność sprawiłaby,
że brak konfiguracji poczty cicho blokowałby zapis kontaktu na listę — a to
lista jest tu rzeczą trwałą, powiadomienie tylko wygodą.

### Filtr zgody na formularzu kontaktowym

Trasa `/api/powiadom` woła Klaviyo **wyłącznie przy `zgoda === true`**.
Brak pola traktujemy jak brak zgody. Ten warunek siedzi w kodzie, a nie
w czyjejś głowie przy ręcznym eksporcie — bo to jest dokładnie ta rzecz,
o której najłatwiej zapomnieć.

## Wypis — świadomie po stronie Klaviyo

Własnego mechanizmu nie budujemy. Klaviyo dokleja odnośnik do każdej wysyłki
i prowadzi listę wykluczeń; drugi mechanizm oznaczałby **dwa źródła prawdy**
o tym, kto jest wypisany, i prędzej czy później wysyłkę do kogoś, kto się
wypisał gdzie indziej. Lista wykluczeń należy do narzędzia, które wysyła.

Zostaje jedna luka i trzeba ją obsłużyć ręcznie. Art. 7 ust. 3 RODO wymaga,
żeby wycofanie było możliwe **w każdej chwili**, nie tylko gdy przyjdzie
wiadomość. Ktoś zapisany dziś, do kogo Klaviyo napisze za trzy miesiące, nie
ma w co kliknąć — dlatego treść zgody (od wersji 2) podaje też adres
`kontakt@busikm.pl`.

**Wycofanie zgłoszone mailem trzeba nanieść w Klaviyo ręcznie.** Profile →
znajdź adres → Suppress. Dopóki nie ma tego w żadnym procesie, jest to
jedyne miejsce, gdzie da się o tym zapomnieć.

## Czego nie wolno

- **Wysyłać do adresów z `zgoda: false`.** To zapisy z formularza
  kontaktowego — mają prawo do odpowiedzi, nie do newslettera.
- **Zmieniać `TRESC_ZGODY` bez wersji.** Patrz wyżej.
- **Utrudniać wycofania.** UODO ukarało ClickQuickNow kwotą ~201 tys. zł
  właśnie za to. Każda wysyłka musi mieć działający odnośnik wypisu, a wypis
  ma działać od razu i bez logowania.
