# BusiKM — Przewodnik dla księgowego

> Wersja: 1.0 | Data: 15 kwietnia 2026
> Ten przewodnik jest przeznaczony dla księgowych korzystających z panelu webowego BusiKM.

---

## Spis treści

1. [Dostęp do systemu](#1-dostęp-do-systemu)
2. [Co widzisz po zalogowaniu](#2-co-widzisz-po-zalogowaniu)
3. [Raporty — kilometrówka](#3-raporty--kilometrówka)
4. [Raporty — koszty floty](#4-raporty--koszty-floty)
5. [Raporty — delegacje](#5-raporty--delegacje)
6. [Eksport FK — Insert GT](#6-eksport-fk--insert-gt)
7. [Czego NIE możesz robić](#7-czego-nie-możesz-robić)
8. [FAQ księgowego](#8-faq-księgowego)

---

## 1. Dostęp do systemu

Jako księgowy nie rejestrujesz się samodzielnie — dostęp otrzymujesz od właściciela firmy.

1. Właściciel firmy wyśle Ci zaproszenie na Twój adres e-mail.
2. Otwórz wiadomość e-mail od BusiKM.
3. Kliknij przycisk **„Akceptuj zaproszenie"**.
4. Ustaw swoje hasło na stronie rejestracji.
5. Zaloguj się do panelu webowego na **app.busikm.pl**.

Od teraz masz dostęp do danych firmy, która Cię zaprosiła.

---

## 2. Co widzisz po zalogowaniu

Po zalogowaniu zobaczysz **dashboard** z najważniejszymi informacjami:

### Dane w trybie odczytu

- **Flota** — lista pojazdów firmy (nr rejestracyjne, marki, modele, dokumenty). Możesz przeglądać, ale nie edytować.
- **Trasy** — lista tras wykonanych przez kierowców. Możesz przeglądać szczegóły (mapa, dystans, czas), ale nie edytować.
- **Kierowcy** — lista kierowców firmy. Możesz przeglądać dane, ale nie zarządzać.

### Pełny dostęp

- **Raporty** — generowanie kilometrówek, raportów kosztów, raportów delegacji.
- **Eksporty FK** — generowanie plików do importu w systemach księgowych.

---

## 3. Raporty — kilometrówka

Kilometrówka to kluczowy raport — ewidencja przebiegu pojazdu zgodna ze wzorem Ministerstwa Finansów.

### Generowanie kilometrówki PDF

1. Przejdź do sekcji **„Raporty"** w menu bocznym.
2. Wybierz **„Kilometrówka"**.
3. Wybierz **pojazd** z listy rozwijalnej.
4. Wybierz **okres** — miesiąc i rok (np. marzec 2026).
5. Kliknij **„Podgląd"**.

### Podgląd i weryfikacja

Na ekranie podglądu sprawdź:

- **Stawkę za km** — domyślna stawka to stawka ustawowa. Możesz ją zmienić w oknie podglądu, jeśli firma stosuje inną stawkę.
- **Sumy** — łączna liczba km i łączny koszt powinny zgadzać się z Twoimi danymi.
- **Stan drogomierza** — stan początkowy i końcowy powinien być spójny z poprzednim miesiącem.
- **Listę tras** — sprawdź, czy wszystkie trasy mają uzupełniony cel podróży.

### Pobieranie

1. Po weryfikacji kliknij **„Generuj PDF"**.
2. Kliknij **„Pobierz"**, aby zapisać plik na dysku.
3. Raport jest gotowy do wydruku lub przesłania do urzędu skarbowego.

---

## 4. Raporty — koszty floty

> Ta funkcja pojawi się w przyszłej aktualizacji (post-MVP).

Raport kosztów floty będzie zawierał:

- Zestawienie kosztów **per pojazd** i **per kategoria** (paliwo, serwis, ubezpieczenie, opłaty).
- Format: **CSV** (do dalszej obróbki w Excelu) oraz **PDF** (do wydruku).
- Okres: dowolny zakres dat.

---

## 5. Raporty — delegacje

> Ta funkcja pojawi się w przyszłej aktualizacji (post-MVP).

Raport delegacji będzie zawierał:

- Zestawienie **per kierowca**.
- Obliczone **diety** krajowe i zagraniczne.
- **Noclegi** i inne koszty delegacji.
- Format: CSV i PDF.

---

## 6. Eksport FK — Insert GT

### Czym jest eksport FK?

Eksport FK pozwala przenieść dane z BusiKM bezpośrednio do systemu księgowego Insert GT (lub Rewizor GT) w formacie EDI++. Dzięki temu nie musisz ręcznie przepisywać danych.

### Generowanie pliku .epp — krok po kroku

1. Przejdź do sekcji **„Raporty"** w menu bocznym.
2. Wybierz **„Eksport FK"**.
3. Wybierz **pojazd** z listy.
4. Wybierz **okres** (miesiąc i rok).
5. Kliknij **„Generuj plik EDI++"**.
6. System wygeneruje plik z rozszerzeniem `.epp`.
7. Kliknij **„Pobierz"**, aby zapisać plik na dysku.

### Import w Insert GT / Rewizor GT

1. Otwórz program **Insert GT** (lub Rewizor GT).
2. Przejdź do menu **Narzędzia → Import danych → Import EDI++**.
3. Kliknij **„Wybierz plik"** i wskaż pobrany plik `.epp`.
4. Sprawdź podgląd importowanych dekretów.
5. Kliknij **„Importuj"**.
6. Gotowe — dane są w systemie księgowym.

### Rozwiązywanie problemów

| Problem | Rozwiązanie |
|---------|------------|
| Plik nie otwiera się w Insert GT | Upewnij się, że plik ma rozszerzenie `.epp` (nie `.epp.txt`). |
| Polskie znaki wyświetlają się niepoprawnie | Plik używa kodowania Windows-1250. Upewnij się, że Insert GT jest ustawiony na to kodowanie. |
| Brak dekretów po imporcie | Sprawdź, czy wybrany okres zawiera jakiekolwiek trasy. Pusty miesiąc = pusty plik. |
| Niezgodność kont księgowych | Skonfiguruj mapowanie kont w ustawieniach importu Insert GT. |

---

## 7. Czego NIE możesz robić

Jako księgowy masz dostęp **tylko do odczytu** w zakresie danych operacyjnych. Nie możesz:

- Dodawać, edytować ani usuwać **pojazdów**
- Zapraszać ani usuwać **kierowców**
- Zmieniać **ustawień firmy** (nazwa, NIP, adres)
- Usuwać **tras** ani **danych**
- Zarządzać **subskrypcją** firmy
- Zapraszać nowych **użytkowników**

Jeśli potrzebujesz zmian w danych firmy, skontaktuj się z właścicielem firmy.

---

## 8. FAQ księgowego

### Czy mogę obsługiwać wiele firm jako księgowy?

Jako **księgowy** (rola Accountant) jesteś przypisany do jednej firmy. Jeśli obsługujesz wiele firm, skorzystaj z roli **Biuro Rachunkowe** — pozwala na zarządzanie wieloma klientami z jednego konta. Zobacz osobny przewodnik: [Przewodnik dla biura rachunkowego](./USER_GUIDE_AF.md).

### Jak zmienić stawkę za km w raporcie?

Stawkę za km możesz zmienić w momencie generowania raportu:

1. Na ekranie podglądu kilometrówki kliknij pole **„Stawka za km"**.
2. Wpisz nową wartość.
3. Sumy przeliczą się automatycznie.
4. Wygeneruj PDF z nową stawką.

### Czy mogę edytować wygenerowany raport?

Nie. Wygenerowany PDF jest dokumentem końcowym. Jeśli chcesz zmienić dane (np. stawkę), wygeneruj raport ponownie z nowymi parametrami.

### Jak często powinienem generować kilometrówkę?

Zalecamy generowanie **raz w miesiącu** — na koniec miesiąca lub na początku następnego. Dzięki temu masz pewność, że wszystkie trasy z danego miesiąca zostały zakończone i zsynchronizowane.

### Czy raporty są zgodne z przepisami?

Tak. Kilometrówka generowana przez BusiKM jest zgodna ze wzorem Ministerstwa Finansów wymaganym do:

- **100% odliczenia VAT** od pojazdu firmowego (art. 86a ustawy o VAT + druk VAT-26),
- **100% kosztów pojazdu w PIT/CIT** (art. 23 ust. 7 ustawy o PIT),
- **zwrotu kilometrowego pracownika bez PIT** (art. 21 ust. 1 pkt 23b).

Stawki przebiegu obliczane są wg **Dz.U. 2023 poz. 5** — 0,89 / 1,15 zł/km dla samochodów osobowych (≤ 900 cm³ / > 900 cm³), 0,69 zł/km dla motocykli, 0,42 zł/km dla motorowerów. System dobiera stawkę automatycznie po dacie trasy.
