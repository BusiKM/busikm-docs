# BusiKM — Przewodnik dla biura rachunkowego

> Wersja: 1.0 | Data: 15 kwietnia 2026
> Ten przewodnik jest przeznaczony dla biur rachunkowych korzystających z panelu webowego BusiKM z obsługą wielu klientów.

---

## Spis treści

1. [Rejestracja biura](#1-rejestracja-biura)
2. [Konfiguracja biura](#2-konfiguracja-biura)
3. [Dodawanie klientów](#3-dodawanie-klientów)
4. [Przełączanie klienta](#4-przełączanie-klienta)
5. [Dashboard zbiorczy](#5-dashboard-zbiorczy)
6. [Praca z klientem](#6-praca-z-klientem)
7. [Generowanie raportów per klient](#7-generowanie-raportów-per-klient)
8. [Eksport FK per klient](#8-eksport-fk-per-klient)
9. [Poziomy dostępu](#9-poziomy-dostępu)
10. [Warunek trialu](#10-warunek-trialu)
11. [Co widzi klient](#11-co-widzi-klient)
12. [FAQ biura rachunkowego](#12-faq-biura-rachunkowego)

---

## 1. Rejestracja biura

1. Wejdź na stronę **busikm.pl** i kliknij **„Zarejestruj się"**.
2. Podaj swój adres e-mail i utwórz hasło.
3. Wpisz **nazwę biura rachunkowego**.
4. Wybierz rolę **„Biuro rachunkowe"**.
5. Potwierdź rejestrację klikając link aktywacyjny wysłany na Twój e-mail.
6. Po zalogowaniu automatycznie otrzymujesz **3-miesięczny okres próbny planu Enterprise** — pełna funkcjonalność, obsługa wielu klientów.

---

## 2. Konfiguracja biura

Po pierwszym zalogowaniu uzupełnij dane biura:

1. Przejdź do sekcji **„Ustawienia biura"** w menu bocznym.
2. Uzupełnij:
   - **Nazwa biura** — pełna nazwa biura rachunkowego.
   - **NIP** — numer identyfikacji podatkowej biura.
   - **Adres** — adres siedziby biura.
   - **Urząd skarbowy** — właściwy urząd skarbowy.
   - **Numer uprawnień** — numer certyfikatu księgowego / wpis do rejestru.
   - **Specjalizacje** — np. transport, logistyka, MŚP (opcjonalne, pomaga klientom Cię znaleźć).
3. Kliknij **„Zapisz"**.

---

## 3. Dodawanie klientów

Istnieją dwa sposoby dodania klienta do Twojego biura:

### Sposób 1: Klient już ma konto w BusiKM

1. Przejdź do sekcji **„Klienci"** w menu bocznym.
2. Kliknij **„Dodaj klienta"**.
3. Wyszukaj firmę klienta po **NIP** lub **nazwie firmy**.
4. System znajdzie firmę w bazie BusiKM.
5. Kliknij **„Wyślij prośbę o dostęp"**.
6. Klient (właściciel firmy) otrzyma powiadomienie i musi zaakceptować połączenie.
7. Po akceptacji firma pojawi się na Twojej liście klientów.

### Sposób 2: Klient nie ma jeszcze konta

1. Przejdź do sekcji **„Klienci"** w menu bocznym.
2. Kliknij **„Dodaj klienta"** → **„Utwórz nową firmę"**.
3. Uzupełnij dane firmy klienta (nazwa, NIP, adres).
4. Podaj adres e-mail właściciela firmy klienta.
5. System utworzy konto firmy i wyśle zaproszenie do właściciela.
6. Właściciel aktywuje konto, a firma automatycznie zostaje powiązana z Twoim biurem.

---

## 4. Przełączanie klienta

Kluczowa funkcja biura rachunkowego — możliwość przełączania się między kontekstami klientów.

1. W **menu bocznym** (sidebar) zobaczysz listę swoich klientów.
2. Kliknij nazwę klienta, aby przełączyć kontekst.
3. Po przełączeniu **cały panel** pokazuje dane wybranego klienta:
   - Flota klienta
   - Kierowcy klienta
   - Trasy klienta
   - Raporty klienta
4. Na górze strony zawsze widzisz, którego klienta aktualnie przeglądasz.
5. Aby wrócić do widoku zbiorczego, kliknij **„Dashboard biura"** w menu.

Każdy klient to osobny, odizolowany kontekst — dane jednego klienta nigdy nie mieszają się z danymi innego.

---

## 5. Dashboard zbiorczy

Dashboard biura to widok podsumowujący wszystkich Twoich klientów:

- **Metryki zbiorcze** — łączna liczba klientów, pojazdów, kierowców, tras w bieżącym miesiącu.
- **Wygasające dokumenty** — lista dokumentów (OC, przegląd, tachograf, PJ) zbliżających się do terminu ważności, pogrupowana per klient.
- **Alerty** — pilne powiadomienia ze wszystkich firm klientów w jednym miejscu.
- **Aktywność klientów** — które firmy miały trasy w ostatnim tygodniu, które są nieaktywne.

Kliknięcie na dowolny element przenosi Cię do kontekstu konkretnego klienta.

---

## 6. Praca z klientem

Po przełączeniu na konkretnego klienta widzisz dane jego firmy. Zakres tego, co możesz robić, zależy od ustawionego **poziomu dostępu** (patrz sekcja 9).

### Przy pełnym dostępie (full)

- Przeglądanie i zarządzanie flotą (dodawanie, edycja pojazdów, dokumenty)
- Przeglądanie i zarządzanie kierowcami
- Przeglądanie tras
- Generowanie raportów i eksportów
- Zarządzanie alertami

### Przy dostępie tylko do odczytu (read_only)

- Przeglądanie floty, kierowców, tras (bez możliwości edycji)
- Generowanie raportów i eksportów

### Przy dostępie do raportów (reports_only)

- Generowanie raportów i eksportów
- Brak dostępu do szczegółów floty, kierowców i tras

---

## 7. Generowanie raportów per klient

### Kilometrówka

1. Przełącz się na kontekst klienta (sidebar).
2. Przejdź do sekcji **„Raporty"** → **„Kilometrówka"**.
3. Wybierz **pojazd** i **okres** (miesiąc/rok).
4. Kliknij **„Podgląd"** — sprawdź dane, stawkę za km, sumy.
5. Kliknij **„Generuj PDF"** → **„Pobierz"**.

### Koszty floty (post-MVP)

1. Przełącz się na kontekst klienta.
2. Przejdź do **„Raporty"** → **„Koszty floty"**.
3. Wybierz okres i format (CSV lub PDF).
4. Raport zawiera breakdown kosztów per pojazd i per kategoria.

### Delegacje (post-MVP)

1. Przełącz się na kontekst klienta.
2. Przejdź do **„Raporty"** → **„Delegacje"**.
3. Wybierz kierowcę i okres.
4. Raport zawiera diety, noclegi i inne koszty per kierowca.

---

## 8. Eksport FK per klient

Eksport do Insert GT generujesz osobno dla każdego klienta.

### Krok po kroku

1. Przełącz się na kontekst klienta (sidebar).
2. Przejdź do sekcji **„Raporty"** → **„Eksport FK"**.
3. Wybierz **pojazd** i **okres** (miesiąc/rok).
4. Kliknij **„Generuj plik EDI++"**.
5. Pobierz plik `.epp`.

### Import w Insert GT

1. Otwórz **Insert GT** (lub Rewizor GT).
2. Przejdź do **Narzędzia → Import danych → Import EDI++**.
3. Wskaż pobrany plik `.epp`.
4. Sprawdź podgląd i kliknij **„Importuj"**.

Powtórz proces dla każdego klienta osobno — każdy plik `.epp` dotyczy jednej firmy.

---

## 9. Poziomy dostępu

Dla każdego klienta możesz ustawić inny poziom dostępu:

| Poziom | Opis | Co możesz robić |
|--------|------|-----------------|
| **Pełny** (full) | Pełne zarządzanie | Flota, kierowcy, trasy, raporty, eksporty, alerty — wszystko jak właściciel |
| **Odczyt** (read_only) | Tylko przeglądanie | Przeglądanie floty, kierowców, tras + generowanie raportów i eksportów |
| **Raporty** (reports_only) | Tylko raporty | Wyłącznie generowanie raportów i eksportów FK |

### Jak ustawić poziom dostępu

1. Przejdź do sekcji **„Klienci"**.
2. Kliknij ikonkę ustawień obok nazwy klienta.
3. W polu **„Poziom dostępu"** wybierz odpowiednią opcję.
4. Kliknij **„Zapisz"**.

Poziom dostępu ustala się wspólnie z klientem — zależy od zakresu współpracy.

---

## 10. Warunek trialu

Twój 3-miesięczny trial Enterprise wymaga spełnienia jednego warunku:

**Musisz dodać minimum 3 klientów w okresie trialu.**

### Jak to śledzić

- W panelu zobaczysz **pasek postępu** pokazujący, ilu klientów masz (np. „2 z 3 wymaganych").
- Po dodaniu 3 klientów pasek zmieni kolor na zielony.

### Co po zakończeniu trialu

Po 3 miesiącach masz dwie opcje:

1. **Wykup subskrypcję Enterprise** — kontynuujesz korzystanie z pełnej funkcjonalności.
2. **Nie wykupujesz** — Twoje konto zostaje obniżone (downgrade). Stracisz dostęp do funkcji multi-klient i będziesz mógł obsługiwać tylko jednego klienta.

Dane Twoich klientów nie zostaną usunięte — będą dostępne po wykupieniu subskrypcji.

---

## 11. Co widzi klient

Transparentność jest ważna — Twoi klienci wiedzą o Twoim dostępie.

- Klient (właściciel firmy) **widzi**, że Twoje biuro rachunkowe ma dostęp do jego danych.
- W ustawieniach firmy klienta wyświetla się nazwa Twojego biura i poziom dostępu.
- Klient **może w każdej chwili cofnąć dostęp** biura rachunkowego do swoich danych.
- Po cofnięciu dostępu tracisz możliwość przeglądania danych tego klienta, ale wcześniej wygenerowane raporty pozostają na Twoim koncie.

---

## 12. FAQ biura rachunkowego

### Ilu klientów mogę obsługiwać?

- **Trial (3 miesiące):** do 10 klientów.
- **Plan Enterprise (płatny):** bez limitu klientów.

### Czy klient płaci osobno za BusiKM?

Tak. Każdy klient (firma transportowa) ma **własną, niezależną subskrypcję** BusiKM. Twoje biuro rachunkowe ma osobną subskrypcję na funkcję multi-klient. Opłaty się nie łączą.

### Jak wytłumaczyć klientowi, czym jest BusiKM?

Najprościej: prześlij klientowi link do rejestracji na **busikm.pl** z informacją, że:

- BusiKM automatyzuje kilometrówkę, która od lipca 2026 jest obowiązkowa dla pojazdów 2,5–3,5 t.
- Kierowca nagrywa trasy telefonem, a system generuje raport zgodny z wzorem MF.
- Jako biuro rachunkowe możesz bezpośrednio pobierać raporty i eksporty FK, bez wymiany papierów.
- Nowi użytkownicy otrzymują **14 dni darmowego dostępu** (firmy) lub **3 miesiące** (biura rachunkowe).

### Czy mogę usunąć klienta z mojej listy?

Tak. Przejdź do sekcji „Klienci", kliknij ikonkę ustawień obok klienta i wybierz **„Usuń klienta"**. Tracisz dostęp do danych klienta, ale dane firmy klienta pozostają nienaruszone.

### Czy moi pracownicy mogą korzystać z konta biura?

Obecnie jedno konto = jeden użytkownik. Obsługa wielu użytkowników w ramach jednego biura rachunkowego jest planowana w przyszłych aktualizacjach.

### Co jeśli klient zmieni biuro rachunkowe?

Klient może cofnąć dostęp Twojego biura i przyznać go nowemu biuru. Twoje konto nie zostanie usunięte — stracisz jedynie dostęp do danych tego konkretnego klienta.

### Czy raporty generowane przez biuro różnią się od raportów właściciela?

Nie. Raporty (kilometrówka, eksport FK) są identyczne niezależnie od tego, czy generuje je właściciel firmy, księgowy czy biuro rachunkowe. Różnica polega wyłącznie na dostępie — biuro rachunkowe może generować raporty dla wielu firm z jednego panelu.
