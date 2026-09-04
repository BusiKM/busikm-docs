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

## Przeniesienie do narzędzia wysyłkowego

Natywnej integracji Firebase → Klaviyo nie ma. Trzy drogi:

**1. Wprost z `/api/zapis`** — polecana. Trasa już istnieje i już wie
o zapisie; dorzucenie wywołania API Klaviyo to kilkanaście linijek. Bez
pośrednika, bez opóźnienia, bez kolejnego abonamentu. Profil trafia od razu
z tagiem z pola `zrodlo`.

**2. Zapier albo Make** — bez kodu, ale wyzwalacz na Firestore chodzi
z opóźnieniem do 15 minut i dokłada koszt.

**3. Rozszerzenie Firebase** — dla Klaviyo nie istnieje. Jest odpowiednik dla
SendGrid (`twilio/sendgrid-sync-contacts`), gdyby wybór narzędzia był jeszcze
otwarty.

Dopóki tego nie ma, adresy leżą w Firestore z kompletem pól potrzebnych do
importu: imię, e-mail, tag, data i dowód zgody.

## Czego nie wolno

- **Wysyłać do adresów z `zgoda: false`.** To zapisy z formularza
  kontaktowego — mają prawo do odpowiedzi, nie do newslettera.
- **Zmieniać `TRESC_ZGODY` bez wersji.** Patrz wyżej.
- **Utrudniać wycofania.** UODO ukarało ClickQuickNow kwotą ~201 tys. zł
  właśnie za to. Każda wysyłka musi mieć działający odnośnik wypisu, a wypis
  ma działać od razu i bez logowania.
