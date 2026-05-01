# BusiKM - Kompletna dokumentacja funkcjonalnosci

> Dokument opisuje pelna matrzyce funkcji systemu BusiKM w podziale na role uzytkownikow,
> plany subskrypcyjne oraz fazy wdrozenia (MVP vs Post-MVP).

---

## Spis tresci

1. [Role uzytkownikow](#1-role-uzytkownikow)
2. [Plany subskrypcyjne](#2-plany-subskrypcyjne)
3. [Matryca funkcji per rola](#3-matryca-funkcji-per-rola)
4. [Matryca funkcji per plan](#4-matryca-funkcji-per-plan)
5. [Szczegolowy opis grup funkcjonalnosci](#5-szczegolowy-opis-grup-funkcjonalnosci)
6. [MVP vs Post-MVP](#6-mvp-vs-post-mvp)
7. [Feature gating per plan](#7-feature-gating-per-plan)

---

## 1. Role uzytkownikow

| Rola | Kod systemowy | Interfejs | Opis |
|------|---------------|-----------|------|
| Kierowca | `DRIVER` | Aplikacja mobilna | Rejestracja tras, sledzenie GPS, zdjecia licznika, podglad swoich tras |
| Wlasciciel / Dyspozytor | `OWNER` | Panel webowy + mobilny | Zarzadzanie flota, kierowcami, raporty, alerty, pelen dostep do danych firmy |
| Ksiegowy | `ACCOUNTANT` | Panel webowy | Raporty, eksport FK, dostep tylko do odczytu (flota, trasy) |
| Biuro Rachunkowe | `ACCOUNTING_FIRM` | Panel webowy | Multi-klient, przelaczanie kontekstu, zagregowany dashboard, wszystkie funkcje ksiegowego per klient |

---

## 2. Plany subskrypcyjne

### Plany dla firm

| Cecha | Free | Starter | Professional |
|-------|------|---------|--------------|
| **Cena** | 0 zł | 19 zł/pojazd/mies. | 29 zł/pojazd/mies. |
| **Min. opłata miesięczna** | — | 38 zł | 319 zł |
| **Pojazdy** | 1 | do 10 | do 50 |
| **Kierowcy** | 1 | do 10 | do 50 |
| **Śledzenie GPS** | Tak | Tak | Tak |
| **Klasyfikacja tras (służbowa/prywatna)** | Tak | Tak | Tak |
| **Zdjęcia licznika** | Tak | Tak | Tak |
| **Raporty PDF (art. 86a)** | Nie | Tak | Tak |
| **Eksport CSV** | Nie | Tak | Tak |
| **Eksport Excel** | Nie | Nie | Tak |
| **Eksport FK (Insert GT, Comarch, Symfonia)** | Nie | Nie | Tak |
| **Alerty dokumentów (push)** | Nie | Tak | Tak |
| **Alerty dokumentów (e-mail)** | Nie | Nie | Tak |
| **Mapa floty real-time** | Nie | Nie | Tak |
| **Dashboard zgodności** | Nie | Nie | Tak |
| **Tryb offline (mobilny)** | Nie | Nie | Tak |
| **Wsparcie** | Brak | E-mail | E-mail + czat |

Powyżej 50 pojazdów → kontakt indywidualny (`kontakt@busikm.pl`). Rozliczenie roczne: rabat -15%.

### Plan dla biur rachunkowych (`af_standard`)

Rozliczenie hurtowe per **aktywny pojazd klienta** (aktywny = min. 1 trasa w danym miesiącu kalendarzowym).

| Liczba aktywnych pojazdów łącznie | Cena za pojazd / mies. |
|-----------------------------------|------------------------|
| 1–30                              | 49 zł                  |
| 31–80                             | 39 zł                  |
| 81+                               | 29 zł                  |

Co dostaje BR: panel multi-tenant, przełączanie kontekstu firm, zbiorczy dashboard, eksport FK, RBAC per klient, alerty dla wszystkich flot.

Co dostają firmy klienta BR (status `af_client`): pełny dostęp odpowiadający planowi Professional **gratis**, dopóki BR ma aktywną subskrypcję `af_trial` lub `af_standard`.

---

## 3. Matryca funkcji per rola

### 3.1 Autoryzacja i konto

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Rejestracja | Tak (zaproszenie) | Tak | Tak (zaproszenie) | Tak |
| Logowanie (JWT) | Tak | Tak | Tak | Tak |
| Refresh token rotation | Tak | Tak | Tak | Tak |
| Wylogowanie | Tak | Tak | Tak | Tak |
| Weryfikacja e-mail | Tak | Tak | Tak | Tak |
| Zarzadzanie uzytkownikami firmy | Nie | Tak | Nie | Tak (per klient) |

### 3.2 Firma i subskrypcja

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Tworzenie firmy | Nie | Tak | Nie | Tak |
| Edycja danych firmy | Nie | Tak | Nie | Ograniczone |
| Podglad danych firmy | Nie | Tak | Tylko odczyt | Tak (per klient) |
| Zarzadzanie subskrypcja | Nie | Tak | Nie | Tak |
| Usuwanie firmy | Nie | Tak | Nie | Nie |

### 3.3 Flota (pojazdy)

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Lista pojazdow | Tylko przypisane | Tak | Tylko odczyt | Tak (per klient) |
| Dodawanie pojazdu | Nie | Tak | Nie | Nie |
| Edycja pojazdu | Nie | Tak | Nie | Nie |
| Usuwanie pojazdu | Nie | Tak | Nie | Nie |
| Dokumenty pojazdu | Podglad | Tak (CRUD) | Tylko odczyt | Tylko odczyt |
| Alerty OC | Powiadomienie | Tak (konfiguracja) | Podglad | Podglad (per klient) |
| Alerty przeglad techniczny | Powiadomienie | Tak (konfiguracja) | Podglad | Podglad (per klient) |
| Alerty tachograf | Powiadomienie | Tak (konfiguracja) | Podglad | Podglad (per klient) |

### 3.4 Kierowcy

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Lista kierowcow | Nie | Tak | Tylko odczyt | Tak (per klient) |
| Dodawanie kierowcy | Nie | Tak | Nie | Nie |
| Edycja kierowcy | Nie | Tak | Nie | Nie |
| Usuwanie kierowcy | Nie | Tak | Nie | Nie |
| Zaproszenia (invite) | Nie | Tak | Nie | Nie |
| Alerty PJ (prawo jazdy) | Powiadomienie | Tak (konfiguracja) | Podglad | Podglad (per klient) |
| Profil wlasny | Tak (edycja) | Tak | Tak | Tak |

### 3.5 Trasy (Trips)

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Rozpoczecie trasy | Tak | Nie | Nie | Nie |
| Zatrzymanie trasy | Tak | Nie | Nie | Nie |
| Sledzenie GPS (background) | Tak | Nie | Nie | Nie |
| Batch upload punktow GPS | Tak | Nie | Nie | Nie |
| Obliczanie dystansu | Automatyczne | Podglad | Podglad | Podglad (per klient) |
| Klasyfikacja (sluzbowa/prywatna) | Tak | Tak (edycja) | Tylko odczyt | Tylko odczyt |
| Zdjecia licznika (start/stop) | Tak | Podglad | Podglad | Podglad (per klient) |
| Lista tras | Tylko wlasne | Wszystkie | Wszystkie (odczyt) | Wszystkie (per klient) |
| Edycja trasy | Tylko wlasne | Tak | Nie | Nie |
| Usuwanie trasy | Nie | Tak | Nie | Nie |

### 3.6 Dokumenty i raporty

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Ewidencja przebiegu (PDF MF) | Nie | Tak | Tak | Tak (per klient) |
| Raporty kosztow floty (CSV+PDF) | Nie | Tak | Tak | Tak (per klient) |
| Raporty delegacji (CSV+PDF) | Nie | Tak | Tak | Tak (per klient) |
| Dashboard zgodnosci | Nie | Tak | Tak | Tak (zagregowany) |
| Pobranie raportow | Nie | Tak | Tak | Tak |

### 3.7 Eksport FK

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Insert GT EDI++ (ewidencja) | Nie | Tak | Tak | Tak (per klient) |
| EDI++ delegacje | Nie | Tak | Tak | Tak (per klient) |
| Comarch ERP Optima | Nie | Tak | Tak | Tak (per klient) |
| Symfonia | Nie | Tak | Tak | Tak (per klient) |
| KSeF | Nie | Tak | Tak | Tak (per klient) |

### 3.8 Aplikacja mobilna

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Logowanie | Tak | Tak | Nie | Nie |
| Rejestracja trasy | Tak | Nie | Nie | Nie |
| Sledzenie GPS | Tak | Nie | Nie | Nie |
| Aparat (zdjecia licznika) | Tak | Nie | Nie | Nie |
| Lista tras | Tak (wlasne) | Tak (wszystkie) | Nie | Nie |
| Powiadomienia push | Tak | Tak | Nie | Nie |
| Podglad floty | Ograniczony | Tak | Nie | Nie |
| Tryb offline (WatermelonDB) | Tak | Nie | Nie | Nie |

### 3.9 Panel webowy

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Dashboard | Nie | Tak | Tak (ograniczony) | Tak (zagregowany) |
| Zarzadzanie flota | Nie | Tak | Tylko odczyt | Tylko odczyt (per klient) |
| Zarzadzanie trasami | Nie | Tak | Tylko odczyt | Tylko odczyt (per klient) |
| Pobieranie raportow | Nie | Tak | Tak | Tak |
| Zarzadzanie uzytkownikami | Nie | Tak | Nie | Tak (per klient) |
| Eksport FK (UI) | Nie | Tak | Tak | Tak |
| Responsywnosc (RWD) | Nie | Tak | Tak | Tak |
| Mapa w czasie rzeczywistym | Nie | Tak | Nie | Tak (per klient) |
| Przelaczanie klientow | Nie | Nie | Nie | Tak |

### 3.10 Monitoring i administracja

| Funkcja | Kierowca | Wlasciciel | Ksiegowy | Biuro Rachunkowe |
|---------|----------|------------|----------|------------------|
| Sentry (bledy) | Automatyczne | Automatyczne | Automatyczne | Automatyczne |
| Grafana (metryki) | Nie | Nie | Nie | Nie |
| Uptime Kuma | Nie | Nie | Nie | Nie |

> Uwaga: Grafana i Uptime Kuma to narzedzia wewnetrzne zespolu DevOps, niedostepne dla uzytkownikow koncowych.

---

## 4. Matryca funkcji per plan

> Uwaga: dla biur rachunkowych (`af_standard`) wszystkie funkcje Professional są dostępne bez limitu pojazdów/kierowców — patrz sekcja 2 (plan dla biur rachunkowych).

### 4.1 Autoryzacja i konto

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Rejestracja + logowanie | Tak | Tak | Tak |
| JWT + refresh rotation | Tak | Tak | Tak |
| Weryfikacja e-mail | Tak | Tak | Tak |
| Zarzadzanie uzytkownikami | 1 kierowca | do 10 | do 50 |

### 4.2 Firma i subskrypcja

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| CRUD firmy | Tak | Tak | Tak |
| Model subskrypcji | Tak | Tak | Tak |
| Multi-tenant (BR) | Nie | Nie | Nie (dostępne wyłącznie w `af_standard`) |
| Stripe billing | Nie | Tak | Tak |

### 4.3 Flota

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Pojazdy (CRUD) | 1 pojazd | do 10 | do 50 |
| Dokumenty pojazdow | Tak | Tak | Tak |
| Alerty OC | Nie | Tak (push) | Tak (push + e-mail) |
| Alerty przeglad | Nie | Tak (push) | Tak (push + e-mail) |
| Alerty tachograf | Nie | Tak (push) | Tak (push + e-mail) |

### 4.4 Kierowcy

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Kierowcy (CRUD) | 1 kierowca | do 10 | do 50 |
| Zaproszenia | Nie | Tak | Tak |
| Alerty PJ | Nie | Tak | Tak |

### 4.5 Trasy

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Start/stop trasy | Tak | Tak | Tak |
| Sledzenie GPS (background) | Tak | Tak | Tak |
| Batch upload GPS | Tak | Tak | Tak |
| Obliczanie dystansu | Tak | Tak | Tak |
| Klasyfikacja (sluzbowa/prywatna) | Tak | Tak | Tak |
| Zdjecia licznika | Tak | Tak | Tak |

### 4.6 Dokumenty i raporty

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Ewidencja przebiegu PDF (MF, art. 86a) | Nie | Tak | Tak |
| Eksport CSV | Nie | Tak | Tak |
| Eksport Excel | Nie | Nie | Tak |
| Raporty kosztow floty (CSV+PDF) | Nie | Nie | Tak |
| Raporty delegacji (CSV+PDF) | Nie | Nie | Tak |
| Dashboard zgodnosci | Nie | Nie | Tak |

### 4.7 Eksport FK

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Insert GT EDI++ (ewidencja) | Nie | Nie | Tak |
| EDI++ delegacje | Nie | Nie | Tak |
| Comarch ERP Optima (XML) | Nie | Nie | Tak |
| Symfonia FK (TXT/AMS) | Nie | Nie | Tak |
| KSeF | Nie | Nie | Post-MVP |

### 4.8 Aplikacja mobilna

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Logowanie | Tak | Tak | Tak |
| Rejestracja tras | Tak | Tak | Tak |
| GPS background | Tak | Tak | Tak |
| Aparat (licznik) | Tak | Tak | Tak |
| Lista tras | Tak | Tak | Tak |
| Powiadomienia push | Nie | Tak | Tak |
| Podglad floty | Ograniczony | Tak | Tak |
| Tryb offline (WatermelonDB) | Nie | Nie | Tak |

### 4.9 Panel webowy

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Dashboard | Podstawowy | Tak | Tak |
| Zarzadzanie flota | 1 pojazd | do 10 | do 50 |
| Zarzadzanie trasami | Tak | Tak | Tak |
| Pobieranie raportow | Nie | PDF + CSV | PDF + CSV + Excel |
| Zarzadzanie uzytkownikami | Nie | Tak | Tak |
| Eksport FK (UI) | Nie | Nie | Tak |
| Mapa floty w czasie rzeczywistym | Nie | Nie | Tak |
| Przelaczanie klientow (BR) | Nie | Nie | Nie (tylko `af_standard`) |

> Plan biura rachunkowego (`af_standard`) udostępnia panel multi-tenant z przełączaniem klientów oraz zagregowany dashboard wszystkich flot — szczegóły w [SUBSCRIPTION_MANAGEMENT.md](./SUBSCRIPTION_MANAGEMENT.md).

### 4.10 Monitoring

| Funkcja | Free | Starter | Professional |
|---------|------|---------|--------------|
| Sentry | Tak | Tak | Tak |
| Grafana | Tak | Tak | Tak |
| Uptime Kuma | Tak | Tak | Tak |

> Monitoring jest wewnetrzny i niezalezny od planu uzytkownika.

---

## 5. Szczegolowy opis grup funkcjonalnosci

### 5.1 Autoryzacja (Auth)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| AUTH-01 | Rejestracja | Formularz rejestracji z NIP, nazwa firmy, e-mail, haslo | MVP |
| AUTH-02 | Logowanie | JWT access + refresh token | MVP |
| AUTH-03 | Refresh token rotation | Automatyczna rotacja refresh tokenow przy kazdym odswiezeniu | MVP |
| AUTH-04 | Wylogowanie | Uniewazniene tokenu po stronie serwera | MVP |
| AUTH-05 | Weryfikacja e-mail | Link weryfikacyjny wysylany po rejestracji | MVP |
| AUTH-06 | Self-serve registration | Automatyczne uruchomienie trialu po rejestracji | Post-MVP |
| AUTH-07 | Rejestracja AF | Dedykowana sciezka rejestracji dla biur rachunkowych z 3-miesiecznym trialem | Post-MVP |

### 5.2 Firma (Company)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| COMP-01 | CRUD firmy | Tworzenie, odczyt, edycja, usuwanie danych firmy | MVP |
| COMP-02 | Model subskrypcji | Przechowywanie aktualnego planu i limitow | MVP |
| COMP-03 | Trial 14 dni | Reverse trial - pelny dostep przez 14 dni, potem downgrade do Free | MVP |
| COMP-04 | Pilot 6 miesiecy | Rozszerzony trial dla pilotazowych klientow | MVP |
| COMP-05 | Stripe billing | Automatyczne rozliczanie subskrypcji przez Stripe | Post-Sprint 7 |
| COMP-06 | Usage tracking | Sledzenie zuzycia zasobow (pojazdy, kierowcy, trasy) | Post-MVP |

### 5.3 Flota (Fleet)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| FLEET-01 | CRUD pojazdow | Dodawanie, edycja, usuwanie, lista pojazdow | MVP |
| FLEET-02 | Dokumenty pojazdow | Upload i zarzadzanie dokumentami (dowod rejestracyjny, polisa) | MVP |
| FLEET-03 | Alert OC | Powiadomienie o zblizajacym sie koncu polisy OC | MVP |
| FLEET-04 | Alert przeglad techniczny | Powiadomienie o zblizajacym sie przegladzie | MVP |
| FLEET-05 | Alert tachograf | Powiadomienie o koniecznosci legalizacji tachografu | MVP |
| FLEET-06 | Raporty kosztow floty | Zestawienie kosztow w formacie CSV i PDF | Post-MVP |
| FLEET-07 | Dashboard zgodnosci | Przegladowy panel statusu dokumentow per kierowca/pojazd | Post-MVP |

### 5.4 Kierowcy (Drivers)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| DRV-01 | CRUD kierowcow | Dodawanie, edycja, usuwanie, lista kierowcow | MVP |
| DRV-02 | Zaproszenia | System zaproszen e-mail dla nowych kierowcow | MVP |
| DRV-03 | Alerty PJ | Powiadomienie o zblizajacym sie koncu waznosci prawa jazdy | MVP |
| DRV-04 | Przypisanie do pojazdow | Powiazanie kierowcow z konkretnymi pojazdami | MVP |

### 5.5 Trasy (Trips)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| TRIP-01 | Start/stop trasy | Reczne rozpoczecie i zakonczenie rejestracji trasy | MVP |
| TRIP-02 | Sledzenie GPS (background) | Zbieranie wspolrzednych GPS w tle (nawet przy wylaczonym ekranie) | MVP |
| TRIP-03 | Batch upload punktow | Wysylanie skumulowanych punktow GPS przy odzyskaniu polaczenia | MVP |
| TRIP-04 | Obliczanie dystansu | Automatyczne wyliczenie przebytej odleglosci na podstawie GPS | MVP |
| TRIP-05 | Klasyfikacja | Oznaczenie trasy jako sluzbowa lub prywatna | MVP |
| TRIP-06 | Zdjecia licznika | Fotografowanie stanu licznika na starcie i koncu trasy | MVP |
| TRIP-07 | Tryb offline (WatermelonDB) | Lokalna baza danych z synchronizacja po odzyskaniu sieci | Post-MVP |

### 5.6 Dokumenty (Documents)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| DOC-01 | Ewidencja przebiegu PDF | Generowanie PDF wg szablonu Ministerstwa Finansow | MVP |
| DOC-02 | Raporty kosztow floty | CSV + PDF z zestawieniem kosztow floty | Post-MVP |
| DOC-03 | Raporty delegacji | CSV + PDF z zestawieniem delegacji | Post-MVP |

### 5.7 Eksport FK (FK Integration)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| FK-01 | Insert GT EDI++ (ewidencja) | Eksport ewidencji przebiegu w formacie EDI++ | MVP |
| FK-02 | EDI++ delegacje | Eksport danych delegacji w formacie EDI++ | Post-MVP |
| FK-03 | Comarch ERP Optima | Integracja z systemem Comarch ERP Optima | Post-Sprint 7 |
| FK-04 | Symfonia | Integracja z systemem Symfonia | Post-Sprint 7 |
| FK-05 | KSeF | Integracja z Krajowym Systemem e-Faktur | Post-Sprint 7 |

### 5.8 Aplikacja mobilna (Mobile)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| MOB-01 | Logowanie kierowcy | Ekran logowania z obsluga JWT | MVP |
| MOB-02 | Rejestracja trasy | Interfejs start/stop z mapa | MVP |
| MOB-03 | Sledzenie GPS | Background location tracking | MVP |
| MOB-04 | Aparat (zdjecia licznika) | Integracja z aparatem do robienia zdjec licznika | MVP |
| MOB-05 | Lista tras | Przegladanie historii wlasnych tras | MVP |
| MOB-06 | Powiadomienia push | Alerty o dokumentach, przypomnienia | MVP |
| MOB-07 | Podglad floty | Podstawowy widok przypisanych pojazdow | MVP |
| MOB-08 | Widok wlasciciela | Podstawowy podglad floty i tras dla roli Owner | MVP |
| MOB-09 | Tryb offline (WatermelonDB) | Pelna obsluga offline z synchronizacja | Post-MVP |

### 5.9 Panel webowy (Web)

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| WEB-01 | Autoryzacja | Ekrany logowania, rejestracji, reset hasla | MVP |
| WEB-02 | Dashboard | Glowny panel z podsumowaniem danych | MVP |
| WEB-03 | Zarzadzanie flota | CRUD pojazdow, dokumenty, alerty | MVP |
| WEB-04 | Przegladanie tras | Lista, filtrowanie, szczegoly tras | MVP |
| WEB-05 | Pobieranie raportow | Generowanie i pobieranie PDF/CSV | MVP |
| WEB-06 | Zarzadzanie uzytkownikami | Dodawanie, edycja, usuwanie uzytkownikow | MVP |
| WEB-07 | Eksport FK (UI) | Interfejs do generowania eksportow FK | MVP |
| WEB-08 | Responsywnosc (RWD) | Pelna responsywnosc na urzadzeniach mobilnych | MVP |
| WEB-09 | Mapa w czasie rzeczywistym | WebSocket + Mapbox, pozycje kierowcow na zywo | Post-MVP |
| WEB-10 | Dashboard AF | Zagregowany widok dla biur rachunkowych | Post-MVP |
| WEB-11 | Przelaczanie klientow | Zmiana kontekstu klienta w ramach AF | Post-MVP |
| WEB-12 | Landing page | Strona główna + 4 strony segmentowe (kierowca / właściciel / księgowa / BR) z hookiem ochrony przed kontrolą US | MVP |

### 5.10 Monitoring

| ID | Funkcja | Opis | Faza |
|----|---------|------|------|
| MON-01 | Sentry | Zbieranie i raportowanie bledow aplikacji | MVP |
| MON-02 | Grafana | Dashboardy z metrykami wydajnosci i biznesowymi | MVP |
| MON-03 | Uptime Kuma | Monitoring dostepnosci uslug | MVP |
| MON-04 | Testy E2E (Playwright, Detox) | Automatyczne testy end-to-end | Post-MVP |
| MON-05 | Testy wydajnosci (k6) | Testy obciazeniowe i wydajnosciowe | Post-MVP |

---

## 6. MVP vs Post-MVP

### 6.1 Funkcje MVP (Sprint 0-5)

| Grupa | Funkcje |
|-------|---------|
| **Auth** | Rejestracja, logowanie, JWT, refresh rotation, wylogowanie, weryfikacja e-mail |
| **Firma** | CRUD, model subskrypcji, trial 14 dni, pilot 6 miesiecy |
| **Flota** | CRUD pojazdow, dokumenty, alerty (OC, przeglad, tachograf) |
| **Kierowcy** | CRUD, zaproszenia, alerty PJ |
| **Trasy** | Start/stop, GPS background, batch upload, dystans, klasyfikacja, zdjecia licznika |
| **Dokumenty** | Ewidencja przebiegu PDF (szablon MF) |
| **Eksport FK** | Insert GT EDI++ (ewidencja przebiegu) |
| **Mobilna** | Logowanie, trasa, GPS, aparat, lista tras, push, podglad floty, widok wlasciciela |
| **Web** | Auth, dashboard, flota, trasy, raporty, uzytkownicy, eksport UI, RWD |
| **Monitoring** | Sentry, Grafana, Uptime Kuma |

### 6.2 Funkcje Post-MVP (Sprint 6-7)

| Grupa | Funkcje |
|-------|---------|
| **AF Multi-tenant** | Rejestracja AF, zarzadzanie klientami, przelaczanie kontekstu, dashboard AF |
| **Mapa** | WebSocket, Mapbox, pozycje kierowcow w czasie rzeczywistym |
| **Raporty** | Dashboard zgodnosci, raporty kosztow floty (CSV+PDF), raporty delegacji (CSV+PDF) |
| **Eksport FK** | EDI++ delegacje |
| **Mobilna** | WatermelonDB (tryb offline) |
| **Testy** | E2E (Playwright, Detox), wydajnosci (k6) |
| **Infrastruktura** | Provisioning produkcyjny |
| **Rejestracja** | Self-serve z auto trial, rejestracja AF z 3-miesiecznym trialem |
| **Analityka** | Usage tracking |
| **Marketing** | Strony segmentowe per persona (Marek/Jan/Ania/Magda), kalkulator ROI dla BR, FAQ z odniesieniami do art. 86a / 23 / 21 |

### 6.3 Funkcje planowane (Post-Sprint 7)

| Grupa | Funkcje |
|-------|---------|
| **Platnosci** | Stripe billing |
| **Integracje FK** | Comarch ERP Optima, Symfonia, KSeF |
| **AI** | RAG Engine, OCR faktur, optymalizacja tras |
| **API** | Publiczne API |
| **White-label** | Mozliwosc rebranding dla partnerow |
| **Ekspansja** | Czechy, Slowacja, Rumunia |

### 6.4 Porownanie faz

| Aspekt | MVP (Sprint 0-5) | Post-MVP (Sprint 6-7) | Post-Sprint 7 |
|--------|-------------------|----------------------|----------------|
| **Cel** | Dzialajacy produkt dla kierowcow i wlascicieli | Rozszerzenie o BR i zaawansowane funkcje | Monetyzacja i skalowanie |
| **Role** | Kierowca, Wlasciciel, Ksiegowy | + Biuro Rachunkowe | Wszystkie |
| **Plany** | Free, Starter, Professional | + `af_standard` (BR) | Pelna oferta |
| **Integracje FK** | Insert GT EDI++, Comarch, Symfonia | + EDI++ delegacje, AMS | + KSeF, white-label BR |
| **Testy** | Jednostkowe, integracyjne | + E2E, wydajnosciowe | Pelne pokrycie |
| **Infrastruktura** | Staging | + Produkcja | Skalowalna |

---

## 7. Feature gating per plan

### 7.1 Ograniczenia planu Free

| Obszar | Ograniczenie | Komunikat dla uzytkownika |
|--------|-------------|---------------------------|
| Pojazdy | Maks. 1 pojazd | "Uaktualnij plan, aby dodac wiecej pojazdow" |
| Kierowcy | Maks. 1 kierowca | "Uaktualnij plan, aby zaprosic wiecej kierowcow" |
| Raporty | Brak generowania | "Raporty dostepne od planu Starter" |
| Eksport FK | Zablokowany | "Eksport FK dostepny od planu Professional" |
| Powiadomienia push | Wylaczone | "Powiadomienia dostepne od planu Starter" |
| Alerty dokumentow | Wylaczone | "Alerty dostepne od planu Starter" |
| Mapa real-time | Zablokowana | "Mapa dostepna od planu Professional" |
| Zaproszenia | Wylaczone | "Zaproszenia dostepne od planu Starter" |

### 7.2 Ograniczenia planu Starter (19 zł/pojazd/mies., min. 38 zł)

| Obszar | Ograniczenie | Roznica vs Professional |
|--------|-------------|------------------------|
| Pojazdy | Maks. 10 | Professional: do 50 |
| Kierowcy | Maks. 10 | Professional: do 50 |
| Raporty | PDF (art. 86a) + CSV | Professional: + Excel |
| Eksport FK | Brak | Professional: Insert GT, Comarch, Symfonia |
| Mapa floty real-time | Brak | Professional: Tak |
| Dashboard zgodnosci | Brak | Professional: Tak |
| Raporty kosztow floty | Brak | Professional: Tak |
| Raporty delegacji | Brak | Professional: Tak |
| Tryb offline (mobilny) | Brak | Professional: Tak |
| Alerty e-mail | Brak (tylko push) | Professional: push + e-mail |

### 7.3 Plan Professional (29 zł/pojazd/mies., min. 319 zł)

Plan Professional zawiera komplet funkcji niezbędnych dla firm z flotą do 50 pojazdów osobowych — JDG, mikrofirmy 2–5 aut oraz firmy z księgową wewnętrzną. Powyżej 50 pojazdów lub 50 kierowców → kontakt indywidualny (`kontakt@busikm.pl`) — warunki dopasowane do skali.

| Obszar | Dostepnosc |
|--------|-----------|
| Pojazdy | do 50 (powyżej — kontakt indywidualny) |
| Kierowcy | do 50 (powyżej — kontakt indywidualny) |
| Raporty PDF (art. 86a, MF) | Tak |
| Eksport CSV / Excel | Tak |
| Eksport FK (Insert GT EDI++, Comarch ERP Optima, Symfonia FK) | Tak |
| Mapa floty w czasie rzeczywistym | Tak |
| Dashboard zgodności | Tak |
| Tryb offline (mobilny, WatermelonDB) | Tak |
| Alerty dokumentów (push + e-mail) | Tak |
| Multi-tenant (BR) | Nie — wymaga planu `af_standard` |

### 7.4 Plan dla biur rachunkowych (`af_standard`)

Rozliczenie hurtowe per aktywny pojazd klienta: 49 / 39 / 29 zł (tiery 1–30 / 31–80 / 81+). Funkcjonalnie udostępnia wszystko z planu Professional **bez limitu pojazdów/kierowców** plus:

| Obszar | Dostepnosc w `af_standard` |
|--------|---------------------------|
| Panel multi-tenant (wiele firm klientów) | Tak |
| Przełączanie kontekstu między klientami | Tak |
| Zbiorczy dashboard wszystkich flot | Tak |
| Dashboard oszczędności (wartość vs koszt ręczny) | Tak |
| RBAC — poziomy dostępu per klient | Tak |
| Zbiorczy raport PDF / CSV (multi-firma) | Tak |
| Klienci BR (`af_client`) korzystają gratis | Tak (dopóki BR ma aktywną subskrypcję) |
| White-label (subdomena, logo) | Post-MVP |

### 7.5 Mechanizm feature gating

| Warstwa | Implementacja |
|---------|--------------|
| **Backend** | Middleware sprawdzajacy plan subskrypcji przed kazdym zapytaniem do chronionych endpointow |
| **Frontend (web)** | Komponenty UI ukryte lub zablokowane z komunikatem o koniecznosci upgrade'u |
| **Frontend (mobile)** | Ekrany paywall z opisem funkcji i przyciskiem "Uaktualnij plan" |
| **Limity zasobow** | Walidacja przy tworzeniu pojazdu/kierowcy — odmowa z kodem HTTP 403 i opisem limitu |
| **Trial firm** | 14-dniowy reverse trial: pelny dostep Professional, po wygasnieciu downgrade do Free |
| **Trial BR** | 3-miesięczny `af_trial`: pelny panel BR, po wygasnieciu 14 dni grace, potem `af_standard` lub BR Free |
| **`af_client`** | Brak własnej daty wygaśnięcia — feature gating dziedziczy z subskrypcji powiązanego BR |

---

> Dokument wygenerowany na podstawie specyfikacji projektu BusiKM.
> Ostatnia aktualizacja: 2026-04-15.
