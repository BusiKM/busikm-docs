# 11. Formularz kontaktowy

Wiadomość z `/kontakt` trafia do Firestore, a stamtąd powiadomienie idzie
mailem na `kontakt@busikm.pl`. Ten sam układ, co w `movgranto-homepage`.

## Droga wiadomości

```
formularz  →  Firestore (kolekcja `wiadomosci`)  →  /api/powiadom  →  Resend  →  skrzynka
```

Kolejność jest celowa. Najpierw zapis, potem mail — gdyby poszło odwrotnie
i mail by przeszedł, a zapis nie, wiadomość istniałaby wyłącznie w cudzej
skrzynce. Powiadomienie jest „najlepszym staraniem": jego błąd nie wywraca
formularza, bo zgłoszenie leży już w bazie.

## Gdzie co leży

| Plik | Za co odpowiada |
|---|---|
| `src/lib/firebase.ts` | połączenie, wykrywanie braku konfiguracji |
| `src/lib/wiadomosci.ts` | zapis do Firestore + wywołanie powiadomienia |
| `src/app/api/powiadom/route.ts` | wysyłka maila przez Resend |
| `landing/firestore.rules` | reguły bazy — wyłącznie zapis, z walidacją |
| `src/components/pages/kontakt/Formularz.tsx` | formularz i jego stany |

## Bez konfiguracji formularz nadal działa

Gdy brakuje zmiennych Firebase, przycisk zamienia się w odnośnik `mailto:`
i otwiera pocztę czytelnika z gotową treścią. To celowe: praca lokalna,
podglądy gałęzi i ewentualna utrata konfiguracji nie kończą się formularzem,
który połyka wiadomość i mówi „dziękujemy", nie mając gdzie jej zapisać.

## Bezpieczeństwo

Klucze klienta Firebase są **publiczne z założenia** — przeglądarka i tak je
wysyła. Chronią nas reguły, nie klucze:

- wolno wyłącznie **utworzyć** dokument w `wiadomosci`,
- odczyt, edycja i kasowanie zamknięte dla wszystkich; zgłoszenia czyta się
  z konsoli albo Admin SDK,
- walidacja pól po stronie bazy: długości, format adresu, temat z zamkniętej
  listy, `createdAt` musi być czasem serwera,
- `hasOnly` odrzuca dokumenty z dodatkowymi polami — nikt nie dopisze sobie
  własnych danych.

Trasa `/api/powiadom` jest publiczna, więc powtarza tę samą walidację. Nie
zakłada, że wywołał ją nasz formularz.

Ukryte pole-pułapka odsiewa automaty wypełniające wszystko po kolei —
wypełnione oznacza cichy sukces bez zapisu.

## Uruchomienie — krok po kroku

### 1. Projekt Firebase

Konsola Firebase → **Create a project**

- **Nazwa:** `BusiKM Landing`
- **Identyfikator:** `busikm-landing`
- Google Analytics dla projektu: **wyłącz** — ruch mierzymy GA4 wpiętym
  w stronę, druga usługa tylko zdublowałaby dane.

Osobny projekt od aplikacji jest celowy: landing i produkt mają różny cykl
życia i różny zestaw osób z dostępem.

### 2. Firestore

Build → **Firestore Database** → Create database

- Tryb: **Production mode** (reguły i tak nadpisujemy własnymi)
- Lokalizacja: **eur3 (europe-west)** — dane zostają w Europie, tak jak
  obiecuje polityka prywatności

Potem zakładka **Rules**, wklej treść `landing/firestore.rules` i opublikuj.

### 3. Aplikacja webowa

Ustawienia projektu → Twoje aplikacje → **Web** (ikona `</>`)

- Nazwa: `busikm.pl`
- **Nie** zaznaczaj Firebase Hosting — stroną zajmuje się Vercel

Skopiuj sześć wartości z `firebaseConfig` do zmiennych `NEXT_PUBLIC_FIREBASE_*`.

### 4. Resend

`resend.com` → API Keys → Create

- Domena `busikm.pl` jest w Resend zweryfikowana (SPF i DKIM na poddomenie
  `send.busikm.pl`), więc powiadomienia wychodzą z własnego adresu.
- `POWIADOM_OD`: `BusiKM <formularz@busikm.pl>` — ta sama wartość stoi jako
  domyślna w kodzie, na wypadek gdyby zmiennej zabrakło.

  Skrzynka `formularz@` **nie musi istnieć** — do wysyłki wystarczy
  uwierzytelniona domena. Odpowiedzi i tak trafiają gdzie indziej: `reply_to`
  jest ustawiane na adres osoby, która napisała.

### 5. Vercel

Settings → Environment Variables, wyłącznie środowisko **Production**:

| Zmienna | Typ |
|---|---|
| `NEXT_PUBLIC_FIREBASE_*` (sześć) | Config |
| `RESEND_API_KEY` | **Secret** |
| `POWIADOM_NA` | Config — `kontakt@busikm.pl` |
| `POWIADOM_OD` | Config — `BusiKM <formularz@busikm.pl>` |

`NEXT_PUBLIC_*` są wpisywane do kodu w trakcie budowania, więc po zapisaniu
konieczny **Redeploy**.

## Do rozstrzygnięcia z prawnikiem

Formularz **nie ma pola zgody**, i to jest decyzja, nie przeoczenie.
Podstawą przetwarzania jest tu prawnie uzasadniony interes — odpowiedź na
zadane pytanie — a nie zgoda. Pytanie o zgodę, której się nie potrzebuje,
jest błędem: jej wycofanie kazałoby usunąć wątek wsparcia w trakcie.
Zamiast tego pod przyciskiem stoi zdanie informacyjne z odnośnikiem do
polityki prywatności.

`movgranto-homepage` ma w tym miejscu wymaganą zgodę, bo tamten formularz
zbiera leady sprzedażowe. To inny cel i inna podstawa. Warto, żeby prawnik
potwierdził wybór przy okazji przeglądu pozostałych dokumentów.
