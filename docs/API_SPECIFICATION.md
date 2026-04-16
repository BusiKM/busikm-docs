# BusiKM -- Specyfikacja API

## 1. Przegląd API

| Parametr | Wartość |
|---|---|
| Base URL | `/api/v1/` |
| Autoryzacja | JWT Bearer token w nagłówku `Authorization: Bearer <token>` |
| Wersjonowanie | Ścieżka URL (`/api/v1/`) |
| Format danych | JSON (`application/json`); `multipart/form-data` dla uploadu plików |
| Paginacja | `PageNumberPagination` -- `page_size=20`, max `100`, parametry `?page=N&page_size=M` |
| Sortowanie | `?ordering=field_name` (prefix `-` dla DESC) |
| Filtrowanie | `?field=value` -- per endpoint |

### Rate limiting

| Grupa | Limit | Opis |
|---|---|---|
| `anon` | 30/min | Niezalogowani użytkownicy |
| `user` | 120/min | Zalogowani użytkownicy |
| `login` | 5/min per email | Próby logowania |
| `gps` | 10/min | Upload punktów GPS |
| `export` | 5/min | Generowanie eksportów |

Odpowiedź przy przekroczeniu limitu: `429 Too Many Requests` z nagłówkiem `Retry-After`.

---

## 2. Endpointy

### 2.1 Autoryzacja (`auth`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| POST | `/auth/register/` | Rejestracja nowego użytkownika | AllowAny |
| GET | `/auth/verify-email/` | Weryfikacja tokena e-mail (`?token=...`) | AllowAny |
| POST | `/auth/login/` | Logowanie -- zwraca parę JWT (access + refresh) | AllowAny |
| POST | `/auth/refresh/` | Odświeżenie tokenów JWT | AllowAny |
| GET | `/auth/me/` | Pobranie profilu zalogowanego użytkownika | IsAuthenticated |
| PATCH | `/auth/me/` | Aktualizacja profilu (imię, nazwisko, język) | IsAuthenticated |
| POST | `/auth/logout/` | Wylogowanie bieżącego urządzenia (blacklist refresh token) | IsAuthenticated |
| POST | `/auth/logout-all/` | Wylogowanie ze wszystkich urządzeń | IsAuthenticated |

### 2.2 Firmy (`companies`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/companies/` | Lista firm użytkownika | IsAuthenticated |
| POST | `/companies/` | Utworzenie nowej firmy | IsOwner |
| GET | `/companies/{id}/` | Szczegóły firmy | IsOwnerOrAccountantOrAF |
| PATCH | `/companies/{id}/` | Aktualizacja danych firmy | IsOwner, IsOwnCompany |
| DELETE | `/companies/{id}/` | Soft delete firmy | IsOwner, IsOwnCompany |

### 2.3 Pojazdy (`fleet`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/vehicles/` | Lista pojazdów (filtry: status, typ) | IsOwnerOrAccountantOrAF |
| POST | `/vehicles/` | Dodanie pojazdu do floty | IsOwner |
| GET | `/vehicles/{id}/` | Szczegóły pojazdu | IsOwnerOrAccountantOrAF |
| PATCH | `/vehicles/{id}/` | Aktualizacja danych pojazdu | IsOwner |
| DELETE | `/vehicles/{id}/` | Soft delete pojazdu | IsOwner |
| POST | `/vehicles/{id}/restore/` | Przywrócenie usuniętego pojazdu | IsOwner |
| GET | `/vehicles/stats/` | Statystyki floty (liczba pojazdów, przebieg) | IsOwnerOrAccountantOrAF |

**Dokumenty pojazdu:**

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/vehicles/{id}/documents/` | Lista dokumentów pojazdu | IsOwnerOrAccountantOrAF |
| POST | `/vehicles/{id}/documents/` | Upload dokumentu (multipart) | IsOwner |
| GET | `/vehicles/{id}/documents/{doc_id}/` | Szczegóły dokumentu | IsOwnerOrAccountantOrAF |
| PATCH | `/vehicles/{id}/documents/{doc_id}/` | Aktualizacja metadanych dokumentu | IsOwner |
| DELETE | `/vehicles/{id}/documents/{doc_id}/` | Soft delete dokumentu | IsOwner |
| GET | `/vehicles/{id}/documents/{doc_id}/download/` | Pobranie pliku dokumentu | IsOwnerOrAccountantOrAF |
| GET | `/documents/expiring/` | Wygasające dokumenty w całej flocie | IsOwnerOrAccountantOrAF |
| GET | `/vehicles/{id}/alerts/` | Alerty powiązane z pojazdem | IsOwnerOrAccountantOrAF |

### 2.4 Kierowcy (`drivers`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/drivers/` | Lista kierowców | IsOwnerOrAccountantOrAF |
| POST | `/drivers/` | Dodanie kierowcy (istniejący user lub nowy) | IsOwner |
| GET | `/drivers/{id}/` | Szczegóły kierowcy | IsOwnerOrAccountantOrAF |
| PATCH | `/drivers/{id}/` | Aktualizacja danych kierowcy | IsOwner |
| DELETE | `/drivers/{id}/` | Soft delete kierowcy | IsOwner |
| POST | `/drivers/{id}/restore/` | Przywrócenie kierowcy | IsOwner |
| GET | `/drivers/{id}/documents/` | Podsumowanie dokumentów kierowcy | IsOwnerOrAccountantOrAF |
| POST | `/drivers/{id}/documents/` | Upload dokumentu kierowcy | IsOwner |
| GET | `/drivers/compliance/` | Przegląd zgodności (ważność badań, uprawnień) | IsOwnerOrAccountantOrAF |
| GET | `/drivers/stats/` | Statystyki kierowców | IsOwnerOrAccountantOrAF |

### 2.5 Zaproszenia (`drivers`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/invitations/` | Lista zaproszeń | IsOwner |
| POST | `/invitations/` | Utworzenie zaproszenia dla kierowcy | IsOwner |
| POST | `/invitations/{id}/resend/` | Ponowne wysłanie zaproszenia | IsOwner |
| POST | `/invitations/{id}/cancel/` | Anulowanie zaproszenia | IsOwner |
| GET | `/invitations/verify/{token}/` | Weryfikacja tokena zaproszenia | AllowAny |
| POST | `/invitations/accept/{token}/` | Przyjęcie zaproszenia | AllowAny |
| POST | `/invitations/decline/{token}/` | Odrzucenie zaproszenia | AllowAny |

### 2.6 Przejazdy (`trips`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| POST | `/trips/` | Rozpoczęcie przejazdu | IsDriverOrOwner |
| GET | `/trips/` | Lista przejazdów (filtry: data, kierowca, pojazd, klasyfikacja) | role-scoped |
| GET | `/trips/{id}/` | Szczegóły przejazdu | role-scoped |
| POST | `/trips/{id}/stop/` | Zakończenie przejazdu | IsDriverOrOwner, IsOwnTrip |
| POST | `/trips/{id}/cancel/` | Anulowanie przejazdu | IsDriverOrOwner, IsOwnTrip |
| POST | `/trips/{id}/reclassify/` | Zmiana klasyfikacji (prywatny/służbowy) | IsDriverOrOwner |
| GET | `/trips/{id}/classification-history/` | Historia zmian klasyfikacji | IsOwnerOrAccountant |
| GET | `/trips/active/` | Aktywne przejazdy w czasie rzeczywistym | IsOwnerOrAccountantOrAF |
| GET | `/trips/summary/` | Podsumowanie okresu z agregacjami | IsOwnerOrAccountantOrAF |

**GPS i odometr:**

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| POST | `/trips/{id}/gps-points/` | Bulk upload punktów GPS (batch) | IsDriverOrOwner, GPSUploadThrottle |
| GET | `/trips/{id}/gps-points/` | Pobranie trasy GPS | IsOwner |
| POST | `/trips/{id}/odometer/` | Upload zdjęcia odometru (multipart) | IsDriverOrOwner |
| GET | `/trips/{id}/odometer/` | Lista zdjęć odometru | role-scoped |
| DELETE | `/trips/{id}/odometer/{photo_id}/` | Usunięcie zdjęcia odometru | IsDriverOrOwner |

### 2.7 Raporty (`documents`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| POST | `/reports/mileage/` | Generowanie raportu ewidencji przebiegu | IsOwnerOrAccountant |
| GET | `/reports/mileage/` | Lista wygenerowanych raportów | IsOwnerOrAccountant |
| GET | `/reports/mileage/{id}/` | Szczegóły raportu | IsOwnerOrAccountant |
| GET | `/reports/mileage/{id}/download/` | Pobranie raportu PDF | IsOwnerOrAccountant |
| POST | `/reports/mileage/preview/` | Podgląd danych bez generowania pliku | IsOwnerOrAccountant |
| POST | `/reports/fleet-costs/` | Raport kosztów floty (post-MVP) | IsOwnerOrAccountant |
| POST | `/reports/delegations/` | Raport delegacji (post-MVP) | IsOwnerOrAccountant |

### 2.8 Eksport FK (`integrations`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| POST | `/export/insert-gt/` | Generowanie eksportu EDI++ (.epp) | IsAccountantOrAF |
| GET | `/export/history/` | Lista historii eksportów | IsAccountantOrAF |
| GET | `/export/history/{id}/` | Szczegóły eksportu | IsAccountantOrAF |
| GET | `/export/history/{id}/download/` | Pobranie pliku .epp | IsAccountantOrAF |
| POST | `/export/history/{id}/retry/` | Ponowienie nieudanego eksportu | IsAccountantOrAF |
| POST | `/export/history/{id}/regenerate/` | Regeneracja zarchiwizowanego eksportu | IsAccountantOrAF |
| GET | `/export/stats/` | Statystyki eksportów | IsAccountantOrAF |
| GET | `/export/integrations/` | Lista dostępnych integracji | IsAuthenticated |

### 2.9 Alerty (`fleet`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/alerts/` | Lista alertów | IsOwnerOrAccountantOrAF |
| GET | `/alerts/{id}/` | Szczegóły alertu | IsOwnerOrAccountantOrAF |
| POST | `/alerts/{id}/acknowledge/` | Potwierdzenie alertu | IsOwner |
| POST | `/alerts/{id}/dismiss/` | Odrzucenie alertu | IsOwner |
| POST | `/alerts/bulk-acknowledge/` | Potwierdzenie wielu alertów jednocześnie | IsOwner |
| POST | `/alerts/` | Utworzenie niestandardowego alertu | IsOwner |
| GET | `/alerts/summary/` | Podsumowanie (liczba per typ i priorytet) | IsOwnerOrAccountantOrAF |

### 2.10 Biuro rachunkowe (`accounting-firms`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/af/profile/` | Profil biura rachunkowego | IsAccountingFirm |
| PATCH | `/af/profile/` | Aktualizacja profilu biura | IsAccountingFirm |
| GET | `/af/clients/` | Lista klientów biura | IsAccountingFirm |
| POST | `/af/clients/` | Dodanie klienta | IsAccountingFirm |
| GET | `/af/clients/{id}/` | Szczegóły klienta | IsAccountingFirm |
| PATCH | `/af/clients/{id}/` | Aktualizacja poziomu dostępu | IsAccountingFirm |
| DELETE | `/af/clients/{id}/` | Zakończenie współpracy | IsAccountingFirm |
| POST | `/af/clients/{id}/switch/` | Przełączenie kontekstu na klienta | IsAccountingFirm |
| GET | `/af/context/` | Aktualny kontekst klienta | IsAccountingFirm |
| DELETE | `/af/context/` | Wyczyszczenie kontekstu | IsAccountingFirm |
| GET | `/af/dashboard/` | Zagregowany dashboard wszystkich klientów | IsAccountingFirm |
| GET | `/af/search-companies/` | Wyszukiwanie firm po NIP/nazwie | IsAccountingFirm |
| POST | `/af/clients/create-with-company/` | Utworzenie klienta wraz z firmą | IsAccountingFirm |
| GET | `/af/trial-status/` | Status okresu próbnego biura | IsAccountingFirm |

### 2.11 Billing (`billing`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/billing/trial-status/` | Status trialu z informacją o bannerze | IsAuthenticated |
| GET | `/billing/plans/` | Dostępne plany subskrypcji | AllowAny |

### 2.12 Monitoring (`monitoring`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/health/` | Podstawowy health check | AllowAny |
| GET | `/health/detailed/` | Szczegółowy status (DB, Redis, MongoDB) | IsAuthenticated |
| GET | `/metrics/` | Metryki Prometheus | AllowAny |

### 2.13 Admin (wewnętrzne)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| GET | `/admin/usage/` | Metryki użycia per firma | IsAdminUser |

### 2.14 Powiadomienia (`notifications`)

| Metoda | Ścieżka | Opis | Uprawnienia |
|---|---|---|---|
| POST | `/notifications/register-device/` | Rejestracja tokena push (FCM) | IsAuthenticated |
| POST | `/notifications/unregister-device/` | Wyrejestrowanie urządzenia | IsAuthenticated |

---

## 3. Przykłady request/response

### 3.1 Logowanie

**Request:**
```http
POST /api/v1/auth/login/
Content-Type: application/json

{
  "email": "jan@firma.pl",
  "password": "SecurePass123!"
}
```

**Response `200 OK`:**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIs...",
  "refresh": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "jan@firma.pl",
    "first_name": "Jan",
    "last_name": "Kowalski",
    "role": "owner"
  }
}
```

### 3.2 Rozpoczęcie przejazdu

**Request:**
```http
POST /api/v1/trips/
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "vehicle_id": 42,
  "classification": "business",
  "purpose": "Spotkanie z klientem w Krakowie",
  "start_odometer": 125430
}
```

**Response `201 Created`:**
```json
{
  "id": 1001,
  "vehicle": 42,
  "driver": 5,
  "status": "in_progress",
  "classification": "business",
  "purpose": "Spotkanie z klientem w Krakowie",
  "start_odometer": 125430,
  "started_at": "2026-04-15T08:30:00Z"
}
```

### 3.3 Bulk upload punktów GPS

**Request:**
```http
POST /api/v1/trips/1001/gps-points/
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "points": [
    {"lat": 50.0647, "lng": 19.9450, "timestamp": "2026-04-15T08:30:05Z", "speed": 45.2, "accuracy": 5.0},
    {"lat": 50.0650, "lng": 19.9455, "timestamp": "2026-04-15T08:30:10Z", "speed": 52.1, "accuracy": 4.5},
    {"lat": 50.0658, "lng": 19.9462, "timestamp": "2026-04-15T08:30:15Z", "speed": 60.0, "accuracy": 3.8}
  ]
}
```

**Response `201 Created`:**
```json
{
  "accepted": 3,
  "rejected": 0,
  "trip_id": 1001
}
```

### 3.4 Generowanie raportu ewidencji przebiegu

**Request:**
```http
POST /api/v1/reports/mileage/
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "company_id": 10,
  "vehicle_id": 42,
  "date_from": "2026-03-01",
  "date_to": "2026-03-31",
  "format": "pdf"
}
```

**Response `202 Accepted`:**
```json
{
  "id": 55,
  "status": "generating",
  "company": 10,
  "vehicle": 42,
  "period": {"from": "2026-03-01", "to": "2026-03-31"},
  "created_at": "2026-04-15T10:00:00Z"
}
```

### 3.5 Eksport EDI++ (Insert GT)

**Request:**
```http
POST /api/v1/export/insert-gt/
Authorization: Bearer eyJhbGciOi...
Content-Type: application/json

{
  "company_id": 10,
  "date_from": "2026-03-01",
  "date_to": "2026-03-31",
  "include_private": false
}
```

**Response `202 Accepted`:**
```json
{
  "id": 88,
  "status": "processing",
  "format": "edi_plus_plus",
  "file_name": "export_firma_2026-03.epp",
  "created_at": "2026-04-15T10:05:00Z"
}
```

---

## 4. Kody błędów

| Kod | Znaczenie | Przykładowy komunikat |
|---|---|---|
| `400` | Błąd walidacji | `{"field_name": ["To pole jest wymagane."]}` |
| `401` | Brak lub nieważny token JWT | `{"detail": "Token wygasł."}` |
| `403` | Brak uprawnień do zasobu | `{"detail": "Nie masz uprawnień do tej operacji."}` |
| `404` | Zasób nie znaleziony | `{"detail": "Nie znaleziono."}` |
| `409` | Konflikt stanu (np. przejazd już zakończony) | `{"detail": "Przejazd jest już zakończony."}` |
| `429` | Przekroczony limit zapytań | `{"detail": "Zbyt wiele zapytań. Spróbuj ponownie za 30s."}` |
| `500` | Błąd serwera | `{"detail": "Wystąpił błąd serwera."}` |

Standardowa struktura błędu walidacji:
```json
{
  "field_name": ["Komunikat błędu 1.", "Komunikat błędu 2."],
  "non_field_errors": ["Błąd ogólny."]
}
```

---

## 5. Rate limiting -- szczegóły per endpoint

| Endpoint / grupa | Throttle class | Limit |
|---|---|---|
| `/auth/login/` | `LoginRateThrottle` | 5/min per email |
| `/trips/{id}/gps-points/` (POST) | `GPSUploadThrottle` | 10/min |
| `/export/insert-gt/` (POST) | `ExportThrottle` | 5/min |
| `/reports/mileage/` (POST) | `ExportThrottle` | 5/min |
| Pozostałe (niezalogowani) | `AnonRateThrottle` | 30/min |
| Pozostałe (zalogowani) | `UserRateThrottle` | 120/min |

Nagłówki odpowiedzi przy rate limiting:
- `X-RateLimit-Limit` -- maksymalna liczba zapytań
- `X-RateLimit-Remaining` -- pozostałe zapytania
- `Retry-After` -- sekundy do resetu (przy 429)

---

## 6. Protokół WebSocket

### Połączenie

```
wss://api.busikm.pl/ws/trips/live/?token=<jwt_access_token>
```

Token JWT przekazywany jako parametr query (WebSocket nie obsługuje nagłówków Authorization).

### Wiadomości serwera (downstream)

**Aktualizacja pozycji:**
```json
{
  "type": "position_update",
  "trip_id": 1001,
  "driver_id": 5,
  "vehicle_id": 42,
  "lat": 50.0647,
  "lng": 19.9450,
  "speed": 45.2,
  "timestamp": "2026-04-15T08:30:05Z"
}
```

**Zmiana statusu przejazdu:**
```json
{
  "type": "trip_status",
  "trip_id": 1001,
  "status": "completed",
  "timestamp": "2026-04-15T09:15:00Z"
}
```

### Wiadomości klienta (upstream)

**Subskrypcja firmy:**
```json
{
  "type": "subscribe",
  "company_id": 10
}
```

**Anulowanie subskrypcji:**
```json
{
  "type": "unsubscribe",
  "company_id": 10
}
```

Serwer wysyła `ping` co 30s. Klient powinien odpowiedzieć `pong` w ciągu 10s, inaczej połączenie zostanie zamknięte.

---

## 7. Generacja klienta TypeScript (Orval)

Schemat OpenAPI generowany automatycznie przez `drf-spectacular` pod adresem:

```
GET /api/v1/schema/ — format YAML (domyślnie)
GET /api/v1/schema/?format=json — format JSON
```

### Konfiguracja Orval (`orval.config.ts`)

```typescript
export default {
  busikm: {
    input: {
      target: "http://localhost:8000/api/v1/schema/?format=json",
    },
    output: {
      target: "./src/api/generated.ts",
      client: "react-query",
      mode: "tags-split",
      override: {
        mutator: {
          path: "./src/api/axios-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
};
```

Generowanie klienta:

```bash
npx orval --config orval.config.ts
```

Wynik: osobny plik per tag (`auth.ts`, `fleet.ts`, `trips.ts`, itd.) z hookami React Query i typami TypeScript.
