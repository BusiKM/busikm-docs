# BusiKM - Dokumentacja Bezpieczenstwa

## Spis tresci

1. [Uwierzytelnianie JWT](#1-uwierzytelnianie-jwt)
2. [Kontrola dostepu oparta na rolach (RBAC)](#2-kontrola-dostepu-oparta-na-rolach-rbac)
3. [Izolacja danych firmowych](#3-izolacja-danych-firmowych)
4. [Uprawnienia na poziomie obiektu](#4-uprawnienia-na-poziomie-obiektu)
5. [Izolacja multi-tenant dla biur rachunkowych](#5-izolacja-multi-tenant-dla-biur-rachunkowych)
6. [Ograniczanie liczby zapytan (Rate Limiting)](#6-ograniczanie-liczby-zapytan-rate-limiting)
7. [Ochrona przed atakami brute force](#7-ochrona-przed-atakami-brute-force)
8. [Zgodnosc z OWASP Top 10](#8-zgodnosc-z-owasp-top-10)
9. [Bezpieczenstwo transportu](#9-bezpieczenstwo-transportu)
10. [Polityka CORS](#10-polityka-cors)
11. [Bezpieczenstwo uploadu plikow](#11-bezpieczenstwo-uploadu-plikow)
12. [Zarzadzanie sekretami](#12-zarzadzanie-sekretami)
13. [Bezpieczenstwo warstwy webowej](#13-bezpieczenstwo-warstwy-webowej)
14. [Bezpieczenstwo aplikacji mobilnej](#14-bezpieczenstwo-aplikacji-mobilnej)
15. [Skanowanie zaleznosci i analiza statyczna](#15-skanowanie-zaleznosci-i-analiza-statyczna)

---

## 1. Uwierzytelnianie JWT

### Przeplyw logowania

System BusiKM wykorzystuje dwutokenowy mechanizm JWT (JSON Web Token) oparty na bibliotece `djangorestframework-simplejwt`:

```
Uzytkownik                  Backend                    Redis (DB2)
    |                          |                          |
    |-- POST /api/auth/login ->|                          |
    |                          |-- Weryfikacja danych     |
    |                          |-- Generowanie tokenow    |
    |<-- access + refresh -----|                          |
    |                          |                          |
    |-- request + access ----->|                          |
    |                          |-- Walidacja tokenu       |
    |<-- odpowiedz ------------|                          |
    |                          |                          |
    |-- POST /api/auth/refresh |                          |
    |   + refresh token ------>|                          |
    |                          |-- Rotacja tokenu ------->|-- Blacklist starego
    |<-- nowy access + refresh |                          |
```

### Parametry tokenow

| Parametr | Wartosc | Opis |
|----------|---------|------|
| Access token TTL | 15 minut | Krotki czas zycia minimalizuje ryzyko przejecia |
| Refresh token TTL | 7 dni | Umozliwia dluzsze sesje bez ponownego logowania |
| Algorytm | HS256 | HMAC z kluczem symetrycznym (SECRET_KEY) |
| Rotacja refresh | Wlaczona | Kazde odswiezenie generuje nowy refresh token |
| Blacklisting | Redis DB2 | Uniewaznione tokeny przechowywane w Redis |

### Rotacja tokenow

Po kazdym uzyciu refresh tokena:

1. Stary refresh token trafia na blackliste w Redis DB2.
2. Generowany jest nowy pair access + refresh.
3. Klient otrzymuje oba nowe tokeny.

Zapobiega to ponownemu uzyciu skradzionego refresh tokena.

### Mechanizm `token_version` - wylogowanie ze wszystkich urzadzen

Kazdy uzytkownik posiada pole `token_version` w modelu. Przy operacji "wyloguj ze wszystkich urzadzen":

1. `token_version` jest inkrementowany.
2. Wszystkie istniejace tokeny zawieraja stara wersje.
3. Middleware porownuje `token_version` z tokenu z aktualnym w bazie.
4. Niezgodnosc wersji powoduje odrzucenie tokenu (HTTP 401).

Dzieki temu wylogowanie ze wszystkich urzadzen jest natychmiastowe, bez koniecznosci blacklistowania kazdego tokenu z osobna.

---

## 2. Kontrola dostepu oparta na rolach (RBAC)

### Role systemowe

System definiuje 4 role uzytkownikow:

| Rola | Identyfikator | Opis |
|------|---------------|------|
| Kierowca | `driver` | Rejestracja tras, podglad wlasnych danych |
| Wlasciciel firmy | `owner` | Pelny dostep do danych firmy, zarzadzanie uzytkownikami |
| Ksiegowy | `accountant` | Dostep do danych finansowych i raportow firmy |
| Biuro rachunkowe | `accounting_firm` | Obsluga wielu firm klientow z roznym poziomem dostepu |

### Klasy uprawnien (Permission Classes)

System implementuje granularne klasy uprawnien DRF:

| Klasa | Opis |
|-------|------|
| `IsDriver` | Dostep tylko dla kierowcow |
| `IsOwner` | Dostep tylko dla wlascicieli firm |
| `IsAccountant` | Dostep tylko dla ksiegowych |
| `IsAccountingFirm` | Dostep tylko dla biur rachunkowych |
| `IsDriverOrOwner` | Dostep dla kierowcow i wlascicieli |
| `IsOwnerOrAccountantOrAF` | Dostep dla wlascicieli, ksiegowych i biur rachunkowych |
| `IsAccountantOrAF` | Dostep dla ksiegowych i biur rachunkowych |

### ActionPermissionMixin

Mixin umozliwia definiowanie uprawnien per-akcja w ViewSetach:

```python
class TripViewSet(ActionPermissionMixin, viewsets.ModelViewSet):
    action_permissions = {
        'list':     [IsAuthenticated, IsDriverOrOwner],
        'create':   [IsAuthenticated, IsDriver],
        'retrieve': [IsAuthenticated, IsOwnTrip],
        'export':   [IsAuthenticated, IsOwnerOrAccountantOrAF],
    }
```

Pozwala to na precyzyjne okreslenie, ktora rola moze wykonac ktora operacje, zamiast stosowania jednej listy uprawnien na caly ViewSet.

---

## 3. Izolacja danych firmowych

### CompanyScopedMixin

Kluczowy mechanizm bezpieczenstwa gwarantujacy, ze kazdy uzytkownik widzi wylacznie dane swojej firmy:

```python
class CompanyScopedMixin:
    def get_queryset(self):
        return super().get_queryset().filter(
            company_id=self.request.user.company_id
        )
```

Mixin jest stosowany we wszystkich ViewSetach operujacych na danych firmowych. Automatycznie filtruje queryset po `company_id` zalogowanego uzytkownika.

### Zasada 404 zamiast 403

Gdy uzytkownik probuje uzyskac dostep do obiektu nalezacego do innej firmy, system zwraca **HTTP 404 (Not Found)**, a nie 403 (Forbidden). Dzieki temu:

- Atakujacy nie wie, czy obiekt istnieje.
- Nie mozna enumerowac zasobow innych firm.
- Brak wycieku informacji o strukturze danych.

### Pokrycie testami

Izolacja firmowa jest zabezpieczona ponad **50 testami** weryfikujacymi:

- Brak dostepu do obiektow cudzej firmy (trasy, pojazdy, uzytkownicy).
- Poprawnosc filtrowania list.
- Zwracanie 404 przy probie dostepu do obiektu obcej firmy.
- Brak mozliwosci modyfikacji danych innej firmy.
- Poprawnosc izolacji w operacjach CRUD.

---

## 4. Uprawnienia na poziomie obiektu

Oproc izolacji firmowej system implementuje uprawnienia na poziomie pojedynczego obiektu:

| Klasa | Zastosowanie |
|-------|-------------|
| `IsOwnTrip` | Kierowca widzi i edytuje tylko swoje trasy |
| `IsOwnVehicle` | Kierowca widzi tylko pojazdy przypisane do niego |
| `IsOwnCompany` | Uzytkownik moze modyfikowac tylko dane swojej firmy |

Przyklad dzialania `IsOwnTrip`:

```python
class IsOwnTrip(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.role == 'driver':
            return obj.driver_id == request.user.id
        return True  # Wlasciciele widza wszystkie trasy firmy
```

Uprawnienia obiektowe dzialaja jako dodatkowa warstwa ochrony - nawet jesli uzytkownik przejdzie filtr firmowy, musi jeszcze spelniac warunki wlasnosci obiektu.

---

## 5. Izolacja multi-tenant dla biur rachunkowych

### Architektura

Biura rachunkowe (AF) obsluguja wiele firm klientow. System implementuje izolacje kontekstowa:

```
Biuro rachunkowe
    |
    |-- Klient A (full access)
    |-- Klient B (read_only)
    |-- Klient C (reports_only)
```

### TenantContextMiddleware

Middleware przechwytuje naglowek `X-Client-Context` i ustawia kontekst klienta:

1. Biuro rachunkowe wysyla `X-Client-Context: <company_id>` w kazdym zapytaniu.
2. Middleware weryfikuje, czy AF ma aktywna relacje z dana firma.
3. Kontekst klienta jest zapisywany w Redis (szybki dostep w kolejnych zapytaniach).
4. Wszystkie querysety sa automatycznie filtrowane po kontekscie.

### Klasy uprawnien AF

| Klasa | Opis |
|-------|------|
| `HasActiveClient` | Sprawdza, czy AF ma aktywna relacje z wybranym klientem |
| `AFAccessLevelPermission` | Weryfikuje poziom dostepu do operacji |

### Poziomy dostepu

| Poziom | Opis | Dozwolone operacje |
|--------|------|--------------------|
| `full` | Pelny dostep | Odczyt, zapis, edycja, eksport, raporty |
| `read_only` | Tylko odczyt | Przegladanie danych, bez modyfikacji |
| `reports_only` | Tylko raporty | Generowanie i pobieranie raportow |

Proba wykonania operacji zapisu przez AF z poziomem `read_only` skutkuje odpowiedzia HTTP 403.

---

## 6. Ograniczanie liczby zapytan (Rate Limiting)

### Warstwa globalna (Middleware)

Globalne ograniczenie na poziomie middleware, przed dotarciem do logiki DRF:

| Typ uzytkownika | Limit | Okno czasowe |
|-----------------|-------|-------------|
| Anonimowy | 100 zapytan | 1 minuta |
| Uwierzytelniony | 300 zapytan | 1 minuta |

Implementacja oparta na algorytmie **sliding window** w Redis, co zapewnia dokladniejsze limity niz klasyczne okna staloczasowe.

### Warstwa DRF (Throttle Classes)

Granularne ograniczenia na poziomie endpointow:

| Klasa throttle | Limit | Zakres | Zastosowanie |
|----------------|-------|--------|-------------|
| `AnonRateThrottle` | 30/min | Per IP | Endpointy publiczne |
| `UserRateThrottle` | 120/min | Per user | Endpointy uwierzytelnione |
| `LoginRateThrottle` | 5/min | Per email | Logowanie (ochrona brute force) |
| `GPSUploadThrottle` | 10/min | Per user | Upload danych GPS |
| `ExportThrottle` | 5/min | Per user | Generowanie eksportow/raportow |

### Odpowiedz przy przekroczeniu limitu

Przy przekroczeniu limitu system zwraca:

- HTTP 429 (Too Many Requests)
- Naglowek `Retry-After` z liczba sekund do odblokowania
- Tresc odpowiedzi z informacja o limicie

---

## 7. Ochrona przed atakami brute force

### Wielowarstwowa ochrona logowania

1. **LoginRateThrottle per email** - maksymalnie 5 prob logowania na minute na dany adres email, niezaleznie od IP.
2. **LoginRateThrottle per IP** - ograniczenie prob logowania z jednego adresu IP.
3. **Logowanie nieudanych prob** - kazda nieudana proba logowania jest rejestrowana z adresem IP, adresem email i timestampem.

### Mechanizm dzialania

```
Proba logowania
    |
    |-- Sprawdzenie limitu per IP -----> Przekroczony? -> 429
    |
    |-- Sprawdzenie limitu per email --> Przekroczony? -> 429
    |
    |-- Weryfikacja danych logowania
    |       |
    |       |-- Niepoprawne -> Log + inkrementacja licznikow
    |       |
    |       |-- Poprawne -> Reset licznikow + wydanie tokenow
```

---

## 8. Zgodnosc z OWASP Top 10

| ID | Kategoria | Status | Dowody / Implementacja |
|----|-----------|--------|----------------------|
| A01 | Broken Access Control | Zabezpieczone | RBAC, CompanyScopedMixin, uprawnienia obiektowe, 50+ testow izolacji, 404 zamiast 403 |
| A02 | Cryptographic Failures | Zabezpieczone | JWT z HS256, hasla hashowane (bcrypt/argon2), HTTPS everywhere, brak PII w logach |
| A03 | Injection | Zabezpieczone | Django ORM (parametryzowane zapytania), walidacja serializatorow DRF, brak raw SQL |
| A04 | Insecure Design | Zabezpieczone | Wielowarstwowa architektura bezpieczenstwa, zasada najmniejszych uprawnien, code review |
| A05 | Security Misconfiguration | Zabezpieczone | DEBUG=False w produkcji, usuniety domyslny SECRET_KEY, CSP headers, HSTS |
| A06 | Vulnerable Components | Zabezpieczone | pip-audit, npm audit, Dependabot, bandit SAST, regularne aktualizacje |
| A07 | Identification and Authentication Failures | Zabezpieczone | JWT z rotacja, brute force protection, token_version, blacklisting |
| A08 | Software and Data Integrity Failures | Zabezpieczone | Podpisane tokeny JWT, walidacja MIME plikow, CI/CD z kontrola integralnosci |
| A09 | Security Logging and Monitoring Failures | Zabezpieczone | Logowanie nieudanych logow, rate limit events, structured logging |
| A10 | Server-Side Request Forgery (SSRF) | Zabezpieczone | Brak endpointow pobierajacych URL od uzytkownika, walidacja uploadu plikow |

---

## 9. Bezpieczenstwo transportu

### HTTPS

- Cala komunikacja odbywa sie wylacznie przez HTTPS.
- Konfiguracja `SECURE_SSL_REDIRECT = True` wymusza przekierowanie HTTP -> HTTPS.
- Certyfikaty TLS zarzadzane przez platforme hostingowa.

### HSTS (HTTP Strict Transport Security)

```python
SECURE_HSTS_SECONDS = 31536000        # 1 rok
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
```

Przegladarka zapamietuje, ze domena wymaga HTTPS i nie pozwala na polaczenie HTTP nawet przy bezposrednim wpisaniu adresu.

### Bezpieczne ciasteczka

```python
SESSION_COOKIE_SECURE = True      # Tylko przez HTTPS
CSRF_COOKIE_SECURE = True         # Tylko przez HTTPS
SESSION_COOKIE_HTTPONLY = True     # Niedostepne z JavaScript
```

### Ochrona PII

- Brak danych osobowych (PII) w logach systemowych.
- Brak PII w parametrach URL (query string).
- Tokeny i hasla sa maskowane w logach.

---

## 10. Polityka CORS

Konfiguracja CORS oparta na bialej liscie domen per srodowisko:

| Srodowisko | Dozwolone origin |
|------------|-----------------|
| Development | `http://localhost:3000`, `http://localhost:8081` |
| Staging | `https://staging.busikm.pl` |
| Produkcja | `https://app.busikm.pl`, `https://busikm.pl` |

Konfiguracja:

```python
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS')
CORS_ALLOW_CREDENTIALS = True
```

- Brak `CORS_ALLOW_ALL_ORIGINS = True` w produkcji.
- Credentials (ciasteczka) dozwolone tylko dla whitelistowanych domen.

---

## 11. Bezpieczenstwo uploadu plikow

### Walidacja wielopoziomowa

1. **Walidacja rozszerzenia** - dozwolone tylko okreslone rozszerzenia plikow.
2. **Walidacja MIME type** - sprawdzenie naglowka Content-Type.
3. **Walidacja magic bytes** - odczyt pierwszych bajtow pliku w celu weryfikacji rzeczywistego formatu (zapobiega zmianie rozszerzenia).
4. **Limit rozmiaru** - maksymalnie 10-15 MB w zaleznosci od typu pliku.

### Ochrona przed XSS przez pliki

Wszystkie pliki serwowane z naglowkiem:

```
Content-Disposition: attachment
```

Zapobiega to interpretacji plikow przez przegladarke (np. plik HTML uploadowany jako zdjecie nie zostanie wyrenderowany).

### Przechowywanie plikow

- Pliki przechowywane w **prywatnym bucket S3** (brak publicznego dostepu).
- Dostep do plikow wylacznie przez **presigned URLs** z ograniczonym czasem waznosci.
- Presigned URL generowany na zadanie i wygasa po krotkim czasie.

---

## 12. Zarzadzanie sekretami

### Zasada: zero hardcodowanych sekretow

| Srodowisko | Mechanizm | Opis |
|------------|-----------|------|
| Backend (dev/prod) | Plik `.env` | Nigdy nie commitowany do repozytorium (w `.gitignore`) |
| Aplikacja mobilna | EAS Secrets | Szyfrowane zmienne srodowiskowe Expo Application Services |
| CI/CD | GitHub Secrets | Szyfrowane zmienne dostepne w GitHub Actions |
| Produkcja | Zmienne srodowiskowe | Ustawiane bezposrednio na platformie hostingowej |

### Kontrole bezpieczenstwa

- `.env` znajduje sie w `.gitignore` - brak mozliwosci przypadkowego commitu.
- Pre-commit hook sprawdza obecnosc potencjalnych sekretow w commitowanych plikach.
- Brak hardcodowanych hasel, kluczy API ani tokenow w kodzie zrodlowym.
- Regularne rotowanie SECRET_KEY i kluczy API.

---

## 13. Bezpieczenstwo warstwy webowej

### Ciasteczka httpOnly dla JWT

W kliencie webowym tokeny JWT sa przechowywane w ciasteczkach `httpOnly`:

- Token niedostepny z poziomu JavaScript (ochrona przed XSS).
- Automatycznie dolaczany do zapytan przez przegladarke.
- Flagi `Secure` i `SameSite=Lax`.

### Wzorzec BFF (Backend for Frontend)

Warstwa BFF (proxy) posredniczy miedzy aplikacja webowa a API:

1. Klient webowy komunikuje sie z BFF na tej samej domenie.
2. BFF zarzadza tokenami JWT (przechowuje w httpOnly cookies).
3. BFF przekazuje zapytania do API, dolaczajac token w naglowku Authorization.
4. Eliminuje to koniecznosc przechowywania tokenow w localStorage/sessionStorage.

### Naglowki bezpieczenstwa

```python
# Content Security Policy
CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = ("'self'",)
CSP_STYLE_SRC = ("'self'", "'unsafe-inline'")
CSP_IMG_SRC = ("'self'", "data:", "https:")

# Pozostale naglowki
X_FRAME_OPTIONS = 'DENY'                    # Ochrona przed clickjacking
SECURE_CONTENT_TYPE_NOSNIFF = True           # Blokada MIME sniffing
SECURE_BROWSER_XSS_FILTER = True             # Filtr XSS przegladarki
```

---

## 14. Bezpieczenstwo aplikacji mobilnej

### SecureStore (Expo)

Tokeny JWT w aplikacji mobilnej przechowywane sa w **SecureStore**:

- Na iOS: Keychain (szyfrowanie sprzetowe).
- Na Android: Keystore + EncryptedSharedPreferences.
- Dane niedostepne dla innych aplikacji.

### Zasady bezpieczenstwa mobilnego

- Tokeny nigdy nie sa logowane (nawet w trybie debug).
- Brak tokenow w stanu komponentow React Native dostepnych przez DevTools.
- Automatyczne czyszczenie tokenow przy wylogowaniu.
- Certificate pinning planowany w przyszlych wersjach.

---

## 15. Skanowanie zaleznosci i analiza statyczna

### Narzedzia bezpieczenstwa

| Narzedzie | Typ | Jezyk | Zastosowanie |
|-----------|-----|-------|-------------|
| `bandit` | SAST | Python | Analiza statyczna kodu pod katem podatnosci |
| `pip-audit` | SCA | Python | Skanowanie zaleznosci pip pod katem znanych CVE |
| `npm audit` | SCA | JavaScript | Skanowanie zaleznosci npm pod katem znanych CVE |
| `eslint-plugin-security` | SAST | JavaScript | Reguly ESLint wykrywajace niebezpieczne wzorce |
| `Dependabot` | SCA | Wszystkie | Automatyczne PR z aktualizacjami bezpieczenstwa |

### Integracja z CI/CD

Wszystkie narzedzia skanujace sa uruchamiane automatycznie w pipeline CI/CD:

1. **Pre-commit** - bandit na zmienionych plikach Python.
2. **Pull Request** - pelne skanowanie bandit + pip-audit + npm audit.
3. **Dependabot** - cotygodniowe sprawdzanie nowych CVE i automatyczne tworzenie PR.

### Polityka reakcji na podatnosci

- **Krytyczne (Critical)** - natychmiastowa naprawa, deploy w ciagu 24h.
- **Wysokie (High)** - naprawa w biezacym sprincie.
- **Srednie (Medium)** - naprawa w kolejnym sprincie.
- **Niskie (Low)** - umieszczenie w backlogu.

---

## Podsumowanie

Bezpieczenstwo BusiKM opiera sie na wielowarstwowej architekturze ochrony:

1. **Warstwa transportu** - HTTPS, HSTS, bezpieczne ciasteczka.
2. **Warstwa uwierzytelniania** - JWT z rotacja, blacklisting, token_version.
3. **Warstwa autoryzacji** - RBAC, uprawnienia obiektowe, ActionPermissionMixin.
4. **Warstwa izolacji danych** - CompanyScopedMixin, TenantContextMiddleware.
5. **Warstwa ochrony przed naduzyciem** - rate limiting, brute force protection.
6. **Warstwa przechowywania** - szyfrowane tokeny (SecureStore/httpOnly), prywatny S3.
7. **Warstwa CI/CD** - automatyczne skanowanie SAST/SCA, Dependabot.

Kazda warstwa dziala niezaleznie - kompromitacja jednej nie oznacza kompromitacji calego systemu (zasada defense in depth).
