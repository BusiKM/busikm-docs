# 12. Listy wczesnego dostępu

Ani aplikacja, ani demo nie są jeszcze publiczne. Zamiast przycisków
prowadzących donikąd — dwie strony, które mówią to wprost i zbierają imię
z adresem.

## Dlaczego tak, a nie bramka na maila

Pierwotny pomysł brzmiał: postawić bramkę przed demem i wpuszczać po podaniu
adresu. Backlog v2 opisuje jednak demo jako **publiczne** — `BKM-1940` firma
demonstracyjna w trybie tylko do odczytu, `BKM-1941` nocny reset, `BKM-1944`
wejście bez konta. I, co ważniejsze, **demo jeszcze nie istnieje**: etap 5
jest piąty z siedmiu, przed nim ponad 90 dni roboczych.

Bramka założona teraz zamykałaby drzwi do pustego pokoju. Wczesny dostęp
zbiera bazę od dziś i niczego nie obiecuje na wyrost.

Gdy etap 5 dojdzie, warto **nie** stawiać bramki na wejściu. Bramka przed
wartością odsiewa większość odwiedzających. Skuteczniejszy jest moment
wartości: wpuszczamy każdego, a o adres pytamy, gdy człowiek chce coś zabrać
ze sobą — wysłać fakturę, pobrać zestawienie. Wtedy już wie, po co go podaje.

## Dwie listy, nie jedna

| Strona | Kolekcja | Kto tam trafia |
|---|---|---|
| `/demo` | `zapisy-demo` | kliknął „Zobacz demo" — chce obejrzeć produkt |
| `/zaloguj` | `zapisy-konto` | kliknął „Zaloguj się" — szukał własnego konta, jest bliżej decyzji |

Osobne kolekcje, nie jedna z polem `lista`: reguły Firestore przypisuje się
do ścieżki, więc każdą walidujemy niezależnie, a przy eksporcie adresów
trudniej je pomylić. Pierwsza wiadomość do tych dwóch grup nie może brzmieć
tak samo, a rozdzielenie po fakcie jest trudniejsze niż zapisanie osobno.

## Po co imię

Żeby pierwsza wiadomość zaczynała się od „Cześć Marek", a nie „Dzień dobry".
To jedyny powód i tak jest napisane pod formularzem.

## Zgoda — odwrotnie niż w formularzu kontaktowym

W formularzu kontaktowym **nie ma** pola zgody: podstawą jest prawnie
uzasadniony interes, czyli odpowiedź na zadane pytanie.

Tutaj jest inaczej i dlatego zgoda **jest**, ale rozdzielona na dwie rzeczy:

- **wysłanie formularza** to prośba o powiadomienie o starcie — usługa,
  o którą człowiek poprosił, art. 6 ust. 1 lit. b RODO. Osobnej zgody nie
  wymaga i pytanie o nią byłoby pytaniem pozornym;
- **pole wyboru** dotyczy wszystkiego ponad tę jedną wiadomość. To już
  informacja handlowa — art. 6 ust. 1 lit. a RODO wraz z art. 10 ustawy
  o świadczeniu usług drogą elektroniczną. Nieobowiązkowe.

Polityka prywatności ma na to dwa osobne wiersze w tabeli celów, z różnymi
podstawami i różnymi okresami przechowywania.

## Gdzie co leży

| Plik | Za co odpowiada |
|---|---|
| `src/content/zapisy.ts` | treść obu stron, definicje list |
| `src/lib/zapisy.ts` | zapis do Firestore + wywołanie powiadomienia |
| `src/app/api/zapis/route.ts` | powiadomienie mailem przez Resend |
| `src/components/pages/zapis/` | wspólny formularz i szkielet strony |
| `landing/firestore.rules` | reguły obu kolekcji |

Bez konfiguracji Firebase formularz cofa się do `mailto:` — ta sama zasada,
co w formularzu kontaktowym.

## Co trzeba zrobić ręcznie

**Opublikować reguły Firestore.** Konsola → Firestore → Rules → wklej całość
z `landing/firestore.rules` → Publish. Bez tego zapis na listę zostanie
odrzucony, a formularz pokaże błąd z odesłaniem na `kontakt@busikm.pl`.

## Co odwrócić, gdy demo ruszy

1. `src/content/zapisy.ts` — treść `/demo` na wejście zamiast zapisu
2. `appLinks.demo` — adres wejścia zamiast `/demo`
3. `src/components/sections/Demo.tsx` — nagłówek i zdanie na stronie głównej
4. `promo` w `src/content/navigation.ts` — opis w menu
5. adresy z listy `zapisy-demo` — wysyłka obiecanej jednej wiadomości

To samo dla `/zaloguj`, gdy dojdzie publiczna rejestracja (`BKM-1858`).
