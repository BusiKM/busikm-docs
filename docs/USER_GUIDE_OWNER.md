# BusiKM — Przewodnik dla właściciela firmy

> Wersja: 1.0 | Data: 15 kwietnia 2026
> Ten przewodnik jest przeznaczony dla właścicieli firm transportowych korzystających z panelu webowego i opcjonalnie z aplikacji mobilnej BusiKM.

---

## Spis treści

1. [Rejestracja firmy](#1-rejestracja-firmy)
2. [Onboarding](#2-onboarding)
3. [Dashboard](#3-dashboard)
4. [Zarządzanie flotą](#4-zarządzanie-flotą)
5. [Zarządzanie kierowcami](#5-zarządzanie-kierowcami)
6. [Trasy](#6-trasy)
7. [Kilometrówka PDF](#7-kilometrówka-pdf)
8. [Eksport do Insert GT](#8-eksport-do-insert-gt)
9. [Alerty](#9-alerty)
10. [Zarządzanie zespołem](#10-zarządzanie-zespołem)
11. [Ustawienia firmy](#11-ustawienia-firmy)
12. [Aplikacja mobilna](#12-aplikacja-mobilna)
13. [FAQ właściciela](#13-faq-właściciela)

---

## 1. Rejestracja firmy

1. Wejdź na stronę **busikm.pl** i kliknij **„Zarejestruj się"**.
2. Podaj swój adres e-mail i utwórz hasło.
3. Uzupełnij dane firmy:
   - Nazwa firmy
   - NIP
   - Adres siedziby
4. Wybierz rolę **„Właściciel"**.
5. Potwierdź rejestrację klikając link aktywacyjny wysłany na Twój e-mail.
6. Gotowe — po zalogowaniu otrzymujesz **14-dniowy okres próbny** ze wszystkimi funkcjami.

---

## 2. Onboarding

Po pierwszym zalogowaniu system przeprowadzi Cię przez trzy proste kroki:

1. **Dodaj pierwszy pojazd** — wpisz numer rejestracyjny, markę i model.
2. **Zaproś pierwszego kierowcę** — podaj adres e-mail kierowcy, a system wyśle mu zaproszenie.
3. **Gotowe!** — Twoja firma jest skonfigurowana i możesz zacząć korzystać z BusiKM.

Możesz pominąć dowolny krok i wrócić do niego później.

---

## 3. Dashboard

Dashboard to Twój główny ekran po zalogowaniu. Wyświetla najważniejsze informacje:

- **Statystyki floty** — łączna liczba pojazdów, aktywnych kierowców, tras w bieżącym miesiącu.
- **Alerty** — pilne powiadomienia o wygasających dokumentach (OC, przegląd, tachograf, prawo jazdy kierowców).
- **Aktywne trasy** — lista kierowców aktualnie w trasie z podglądem na żywo.
- **Dzisiejsze trasy** — podsumowanie tras wykonanych dzisiaj.
- **Koszty** — szacunkowy koszt przebiegu (na podstawie stawki za km) za bieżący miesiąc.

Klikając w dowolny element dashboardu, przechodzisz do szczegółowego widoku.

---

## 4. Zarządzanie flotą

### Dodawanie pojazdu

1. Przejdź do sekcji **„Flota"** w menu bocznym.
2. Kliknij **„Dodaj pojazd"**.
3. Uzupełnij dane:
   - Numer rejestracyjny
   - Marka
   - Model
   - Rok produkcji (opcjonalne)
   - Aktualny przebieg (opcjonalne)
4. Kliknij **„Zapisz"**.

### Dokumenty pojazdu

Dla każdego pojazdu możesz przechowywać dokumenty:

1. Wejdź w szczegóły pojazdu (kliknij na pojazd z listy).
2. Przejdź do zakładki **„Dokumenty"**.
3. Kliknij **„Dodaj dokument"** i wybierz typ:
   - **OC** (ubezpieczenie) — podaj datę ważności i wgraj skan polisy.
   - **Przegląd techniczny** — podaj datę ważności i wgraj skan.
   - **Legalizacja tachografu** — podaj datę ważności i wgraj skan.
4. Kliknij **„Zapisz"**.

### Alerty wygasających dokumentów

System automatycznie monitoruje daty ważności dokumentów i wysyła alerty:

- **30 dni przed** — informacja (poziom: info)
- **14 dni przed** — ostrzeżenie (poziom: warning)
- **7 dni przed** — alert krytyczny (poziom: critical)
- **Po terminie** — status: wygasł (poziom: expired)

---

## 5. Zarządzanie kierowcami

### Zapraszanie kierowcy

1. Przejdź do sekcji **„Kierowcy"** w menu bocznym.
2. Kliknij **„Zaproś kierowcę"**.
3. Wpisz adres e-mail kierowcy.
4. Kliknij **„Wyślij zaproszenie"**.
5. Kierowca otrzyma e-mail z linkiem do akceptacji i ustawienia hasła.

### Dane prawo jazdy

Dla każdego kierowcy możesz uzupełnić:

1. Numer prawa jazdy
2. Datę ważności prawa jazdy
3. Kategorie

### Ewidencja uprawnień

Prowadź ewidencję kwalifikacji zawodowych kierowców:

1. Wejdź w profil kierowcy.
2. Uzupełnij dane kwalifikacji (numer, data ważności).
3. System będzie automatycznie alertować o zbliżającym się terminie wygaśnięcia.

### Compliance dashboard

W sekcji „Kierowcy" znajdziesz zbiorczy widok zgodności:

- Lista kierowców z kolorowym statusem dokumentów (zielony/żółty/czerwony)
- Szybki podgląd, kto ma wygasające lub brakujące dokumenty

---

## 6. Trasy

### Lista tras firmy

1. Przejdź do sekcji **„Trasy"** w menu bocznym.
2. Zobaczysz listę wszystkich tras wykonanych przez kierowców Twojej firmy.

### Filtry

Możesz filtrować trasy według:

- **Kierowca** — wybierz konkretnego kierowcę
- **Pojazd** — wybierz konkretny pojazd
- **Data** — zakres dat (od–do)
- **Typ trasy** — służbowa lub prywatna

### Szczegóły trasy

Kliknij na trasę, aby zobaczyć:

- Mapę GPS z przebiegiem trasy
- Dystans (km)
- Czas trwania
- Kierowcę i pojazd
- Cel podróży
- Zdjęcia drogomierza (start i koniec, jeśli zostały zrobione)

---

## 7. Kilometrówka PDF

Kilometrówka to oficjalny raport ewidencji przebiegu pojazdu zgodny ze wzorem Ministerstwa Finansów.

### Jak wygenerować kilometrówkę

1. Przejdź do sekcji **„Raporty"** w menu bocznym.
2. Wybierz **„Kilometrówka"**.
3. Wybierz **pojazd** z listy.
4. Wybierz **okres** (miesiąc i rok).
5. Kliknij **„Podgląd"** — zobaczysz wersję roboczą raportu.
6. Sprawdź dane (możesz zmienić stawkę za km w oknie podglądu).
7. Kliknij **„Generuj PDF"**.
8. Kliknij **„Pobierz"**, aby zapisać plik PDF na dysku.

### Pola w kilometrówce (wzór MF)

Raport zawiera wymagane pola:

- Dane firmy (nazwa, NIP, adres)
- Dane pojazdu (nr rejestracyjny, marka, model)
- Dane kierowcy
- Tabela tras: data, cel, trasa (skąd–dokąd), liczba km, stan drogomierza
- Podsumowanie: łączna liczba km, stawka za km, łączny koszt
- Podpis (miejsce na podpis)

---

## 8. Eksport do Insert GT

BusiKM umożliwia eksport danych do systemu księgowego Insert GT w formacie EDI++.

### Jak wygenerować plik EDI++

1. Przejdź do sekcji **„Raporty"** w menu bocznym.
2. Wybierz **„Eksport FK"**.
3. Wybierz **pojazd** z listy.
4. Wybierz **okres** (miesiąc i rok).
5. Kliknij **„Generuj plik EDI++"**.
6. Kliknij **„Pobierz"**, aby zapisać plik `.epp` na dysku.

### Jak zaimportować plik w Insert GT

1. Otwórz program **Insert GT** (lub Rewizor GT).
2. Przejdź do menu **Narzędzia → Import danych → Import EDI++**.
3. Kliknij **„Wybierz plik"** i wskaż pobrany plik `.epp`.
4. Sprawdź podgląd importowanych danych.
5. Kliknij **„Importuj"**.
6. Dane zostaną zaimportowane do Twojego systemu księgowego.

---

## 9. Alerty

### Typy alertów

System BusiKM monitoruje i ostrzega o:

- **OC pojazdu** — wygasające ubezpieczenie
- **Przegląd techniczny** — wygasający przegląd
- **Legalizacja tachografu** — wygasająca legalizacja
- **Prawo jazdy kierowcy** — wygasające prawo jazdy lub kwalifikacja

### Poziomy ważności

| Poziom | Kolor | Znaczenie |
|--------|-------|-----------|
| Info | Niebieski | Dokument wygasa za 30+ dni |
| Warning | Żółty | Dokument wygasa za 14–30 dni |
| Critical | Czerwony | Dokument wygasa za mniej niż 14 dni |
| Expired | Ciemnoczerwony | Dokument już wygasł |

### Zarządzanie alertami

1. Przejdź do sekcji **„Alerty"** w menu bocznym lub kliknij ikonkę dzwonka.
2. Zobaczysz listę aktywnych alertów.
3. Dla każdego alertu możesz:
   - **Potwierdź** — oznacz, że zajmujesz się sprawą (np. umówiłeś przegląd).
   - **Odrzuć** — odrzuć alert, jeśli nie dotyczy (np. pojazd został sprzedany).

---

## 10. Zarządzanie zespołem

### Lista użytkowników

1. Przejdź do sekcji **„Zespół"** w menu bocznym.
2. Zobaczysz listę wszystkich użytkowników przypisanych do Twojej firmy (kierowcy, księgowi).

### Zaproszenia

1. Kliknij **„Zaproś użytkownika"**.
2. Wpisz adres e-mail.
3. Wybierz rolę: **Kierowca**, **Księgowy** lub **Właściciel** (współwłaściciel).
4. Kliknij **„Wyślij"**.

### Zmiana ról

1. Kliknij na użytkownika z listy.
2. Zmień jego rolę w polu **„Rola"**.
3. Kliknij **„Zapisz"**.

### Dezaktywacja użytkownika

1. Kliknij na użytkownika z listy.
2. Kliknij **„Dezaktywuj"**.
3. Użytkownik straci dostęp do systemu, ale jego dane (trasy, historia) zostaną zachowane.

---

## 11. Ustawienia firmy

1. Przejdź do sekcji **„Ustawienia"** w menu bocznym.
2. Możesz edytować:
   - Nazwa firmy
   - NIP
   - Adres siedziby
   - Dane kontaktowe
3. Kliknij **„Zapisz"**, aby potwierdzić zmiany.

---

## 12. Aplikacja mobilna

Jako właściciel firmy możesz korzystać również z aplikacji mobilnej BusiKM. Pobierz ją z App Store (iOS) lub Google Play (Android).

W aplikacji mobilnej masz dostęp do:

- **Dashboard** — statystyki floty, alerty, aktywne trasy.
- **Flota** — lista pojazdów, podgląd dokumentów.
- **Kierowcy** — lista kierowców, podgląd statusu.
- **Trasy** — podgląd tras (aktywnych i zakończonych).

Pełna funkcjonalność (raporty, eksporty, zarządzanie zespołem) dostępna jest w panelu webowym.

---

## 13. FAQ właściciela

### Ile kosztuje BusiKM?

Przez pierwsze **14 dni** korzystasz za darmo ze wszystkich funkcji (okres próbny). Po tym czasie dostępne są plany:

- **Starter** — 59 zł/pojazd/miesiąc (do 10 pojazdów)
- **Professional** — 89 zł/pojazd/miesiąc (do 50 pojazdów)
- **Enterprise** — 149 zł/pojazd/miesiąc (bez limitu)

Jest też darmowy plan **Free** (1 pojazd, 1 kierowca, bez raportów).

### Czy mogę eksportować dane do Comarch Optima lub Symfonii?

Obecnie wspieramy eksport do **Insert GT / Rewizor GT** (format EDI++). Integracje z Comarch Optima i Symfonią są planowane — pojawią się w kolejnych aktualizacjach.

### Jak zmienić plan subskrypcji?

Obecnie zmiana planu wymaga kontaktu z naszym zespołem — napisz na **kontakt@busikm.pl**. Opcja samodzielnej zmiany planu w panelu pojawi się wkrótce.

### Czy mogę dodać drugiego właściciela?

Tak. Zaproś nową osobę do zespołu z rolą **„Właściciel"**. Będzie miała pełny dostęp do wszystkich danych i ustawień firmy.

### Co jeśli kierowca zapomni zakończyć trasę?

Jako właściciel możesz zakończyć aktywną trasę kierowcy z poziomu panelu webowego. Przejdź do sekcji „Trasy", znajdź aktywną trasę i kliknij **„Zakończ trasę"**.

### Czy mogę usunąć trasę?

Nie. Ze względów bezpieczeństwa i zgodności z przepisami trasy nie mogą być usuwane. Można je jedynie oznaczać jako prywatne lub edytować cel podróży.

### Jak anulować konto?

Skontaktuj się z nami na **kontakt@busikm.pl**. Pamiętaj, że po usunięciu konta wszystkie dane firmy zostaną trwale usunięte.
