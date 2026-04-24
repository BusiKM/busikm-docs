# BusiKM — Specyfikacja API

## 1. Przegląd API

| Parametr | Wartość |
|---|---|
| Base URL | `/api/v1/` |
| Autoryzacja | JWT Bearer token: `Authorization: Bearer <token>` |
| Format danych | JSON (`application/json`); `multipart/form-data` dla uploadu |
| Paginacja | `PageNumberPagination` — `page_size=20`, max `100` |
| Sortowanie | `?ordering=field_name` (prefix `-` dla DESC) |
| Dokumentacja | Swagger UI: `/api/docs/` · ReDoc: `/api/redoc/` · Schema YAML: `/api/schema/` |

### Rate limiting

| Grupa | Limit | Opis |
|---|---|---|
| `anon` | 30/min | Niezalogowani |
| `user` | 120/min | Zalogowani |
| `login` | 5/min per email | Próby logowania |
| `gps` | 10/min | Upload punktów GPS |
| `export` | 3/mies. per firma per FK system | Generowanie eksportów FK |

---

## 2. Endpointy

### 2.1 Autoryzacja (`auth`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| POST | `/auth/register/` | Rejestracja |
| POST | `/auth/login/` | Logowanie — zwraca JWT |
| POST | `/auth/refresh/` | Odświeżenie tokenów |
| GET | `/auth/me/` | Profil zalogowanego |
| PATCH | `/auth/me/` | Aktualizacja profilu |
| POST | `/auth/logout/` | Wylogowanie |

### 2.2 Firmy (`companies`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/companies/` | Lista firm |
| POST | `/companies/` | Utwórz firmę |
| GET | `/companies/{id}/` | Szczegóły firmy |
| PATCH | `/companies/{id}/` | Aktualizacja |
| DELETE | `/companies/{id}/` | Soft delete |

### 2.3 Pojazdy (`vehicles`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/vehicles/` | Lista pojazdów |
| POST | `/vehicles/` | Dodaj pojazd (response zawiera `vat26_onboarding_alert`) |
| GET | `/vehicles/{id}/` | Szczegóły (zawiera `vat26_alert`, `vat26_alert_message`, `rate_today`) |
| PATCH | `/vehicles/{id}/` | Aktualizacja |
| DELETE | `/vehicles/{id}/` | Soft delete |
| POST | `/vehicles/{id}/register-vat26/` | Zgłoś pojazd na VAT-26 |
| POST | `/vehicles/{id}/unregister-vat26/` | Cofnij rejestrację VAT-26 |

**Pole `vat26_onboarding_alert` w response POST /vehicles/:**
```json
{
  "show": true,
  "title": "Pamiętaj o zgłoszeniu VAT-26",
  "message": "Pojazd WA12345 nie jest zgłoszony...",
  "legal_basis": "art. 86a ust. 12 ustawy o VAT",
  "learn_more_url": "https://www.podatki.gov.pl/vat/vat-26/"
}
```

### 2.4 Kierowcy (`drivers`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/drivers/` | Lista (PESEL/NIP nie zwracane) |
| POST | `/drivers/` | Dodaj kierowcę (PESEL/NIP write_only) |
| GET | `/drivers/{id}/` | Szczegóły (bez PESEL/NIP) |
| PATCH | `/drivers/{id}/` | Aktualizacja |
| DELETE | `/drivers/{id}/` | Soft delete |
| GET | `/drivers/{id}/license-status/` | Status PJ: ok/warning/expired/unknown |
| GET | `/drivers/expiring-licenses/` | Kierowcy z PJ wygasającym w 30 dni |

### 2.5 Trasy (`trips`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/trips/` | Lista tras (filtry: vehicle, period_year, period_month, confirmation_status) |
| POST | `/trips/` | Utwórz trasę (distance_km, rate_per_km, trip_cost obliczane auto) |
| GET | `/trips/{id}/` | Szczegóły (zawiera is_complete, is_exportable, cost_display) |
| PATCH | `/trips/{id}/` | Aktualizacja |
| DELETE | `/trips/{id}/` | Usuń |
| POST | `/trips/{id}/confirm-driver/` | Potwierdzenie przez kierowcę |
| POST | `/trips/{id}/confirm-owner/` | Zatwierdzenie przez właściciela |
| POST | `/trips/{id}/unconfirm/` | Cofnij potwierdzenie (body: role, note) |
| POST | `/trips/confirm-owner-bulk/` | Masowe zatwierdzenie (body: vehicle_id, period_year, period_month) |
| GET | `/trips/pending-confirmation/` | Trasy oczekujące |
| GET | `/trips/{id}/confirmation-log/` | Dziennik potwierdzeń |
| POST | `/trips/{id}/gps-points/` | Bulk upload GPS |
| POST | `/trips/{id}/odometer/` | Upload zdjęcia licznika |

### 2.6 Faktury paliwowe (`fuel-invoices`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/fuel-invoices/` | Lista faktur |
| POST | `/fuel-invoices/` | Dodaj fakturę (vat_amount, amount_gross obliczane auto) |
| GET | `/fuel-invoices/{id}/` | Szczegóły |
| PATCH | `/fuel-invoices/{id}/` | Aktualizacja (zablokowana gdy is_locked=True → 403) |
| POST | `/fuel-invoices/bulk-upload/` | Zbiorowy import |
| GET | `/fuel-invoices/monthly-summary/` | Podsumowanie VAT za miesiąc |

### 2.7 Podsumowania miesięczne (`monthly-summaries`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/monthly-summaries/` | Lista |
| GET | `/monthly-summaries/{id}/` | Szczegóły (zawiera period_label, is_ready_for_export) |
| POST | `/monthly-summaries/{id}/approve/` | Zatwierdź podsumowanie |
| POST | `/monthly-summaries/{id}/recalculate/` | Przelicz agregaty |
| GET | `/monthly-summaries/pending-approval/` | Oczekujące zatwierdzenia |
| GET | `/monthly-summaries/{id}/trips/` | Lista tras podsumowania |

### 2.8 Stawki km (`mileage-rates`)

| Metoda | Ścieżka | Opis | Auth |
|---|---|---|---|
| GET | `/mileage-rates/current/` | Aktualne stawki | PublicAny |
| GET | `/mileage-rates/` | Pełna historia | Admin |
| GET | `/mileage-rates/{id}/` | Szczegóły | Admin |
| POST | `/mileage-rates/` | Dodaj stawkę | Superuser |
| PUT/PATCH | `/mileage-rates/{id}/` | — | **405** (immutable) |
| DELETE | `/mileage-rates/{id}/` | — | **405** (immutable) |

### 2.9 Eksport FK (`exports`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| POST | `/exports/insert-gt/{period}/` | Generuj plik EPP dla Insert GT |
| POST | `/exports/comarch/{period}/` | Generuj XML dla Comarch ERP Optima |
| POST | `/exports/symfonia/{period}/` | Generuj TXT/ZIP dla Symfonia FK |

**Period format:** `YYYY-MM` (np. `2026-10`) — tylko zakończone miesiące.

**Body:**
```json
{
  "company_id": 123,
  "force": false,
  "include_ams": false
}
```

`force=True` — eksport mimo braku approved summary (tylko superuser).  
`include_ams=True` — tylko dla Symfonii, response to ZIP.

**Response headers:**
```
X-Invoices-Count: 5
X-KM-Included: true
X-Warnings: []
X-Export-Period: 2026-10
X-AMS-Included: false
```

### 2.10 Logi audytowe (`audit-logs`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/audit-logs/` | Lista logów (IP ukryte dla non-superuser) |
| GET | `/audit-logs/{id}/` | Szczegóły |
| GET | `/audit-logs/for-object/` | Logi dla obiektu (?model=trip&object_id=123) |
| GET | `/audit-logs/compliance-report/` | Raport zgodności (?company=&date_from=&date_to=) |
| POST/PATCH/DELETE | `/audit-logs/*` | **405** (read-only) |

### 2.11 Walidacja zgodności (`compliance`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/compliance/validate/` | Walidacja ewidencji firmy (?vehicle=&year=&month=) |
| POST | `/compliance/validate-summary/{id}/` | Walidacja przed zatwierdzeniem |

### 2.12 Raporty (`reports`)

| Metoda | Ścieżka | Opis |
|---|---|---|
| POST | `/reports/mileage/` | Generuj raport PDF kilometrówki |
| GET | `/reports/mileage/{id}/download/` | Pobierz PDF |
| POST | `/reports/fleet-costs/` | Raport kosztów floty |
| POST | `/reports/delegations/` | Raport delegacji |

### 2.13 Monitoring

| Metoda | Ścieżka | Opis |
|---|---|---|
| GET | `/health/` | Health check |
| GET | `/metrics/` | Metryki Prometheus |

### 2.14 Powiadomienia

| Metoda | Ścieżka | Opis |
|---|---|---|
| POST | `/notifications/register-device/` | Rejestracja tokena FCM push |

---

## 3. Kody HTTP

| Kod | Opis |
|---|---|
| 200 | OK |
| 201 | Utworzono |
| 400 | Błąd walidacji |
| 401 | Brak autoryzacji |
| 403 | Brak dostępu (np. faktura zablokowana) |
| 404 | Nie znaleziono |
| 405 | Metoda niedozwolona (MileageRate PUT/PATCH/DELETE, AuditLog CUD) |
| 422 | Dane niegotowe (np. summary nie approved, brak danych) |
| 429 | Throttle przekroczony |
| 500 | Błąd serwera |

---

## 4. Pola read_only (nie przekazuj w body)

| Model | Pole | Obliczane z |
|---|---|---|
| Vehicle | `vat_deduction_pct` | `vat26_registered` |
| Vehicle | `vat26_alert`, `vat26_alert_message` | `vat26_registered` |
| Trip | `distance_km` | `odometer_start`, `odometer_end` |
| Trip | `rate_per_km` | `MileageRate` + `trip_date` |
| Trip | `trip_cost` | `distance_km` × `rate_per_km` |
| Trip | `period_year`, `period_month` | `date` |
| Trip | `confirmation_status` | stan potwierdzeń |
| FuelInvoice | `vat_amount`, `amount_gross` | `amount_net` × `vat_rate` |
| FuelInvoice | `vat_deductible_amount` | `vat_amount` × `vat_deduction_pct` |
| FuelInvoice | `period_year`, `period_month` | `invoice_date` |
| FuelInvoice | `company` | `vehicle.company` |
| MonthlyMileageSummary | wszystkie agregaty | `recalculate()` |
| MileageRate | `valid_to`, `is_active` | automatycznie przy nowym rekordzie |

---

## 5. Przykłady request/response

### Logowanie

```http
POST /api/v1/auth/login/
Content-Type: application/json

{"email": "jan@firma.pl", "password": "SecurePass123!"}
```

```json
{
  "access": "eyJhbGciOiJIUzI1NiIs...",
  "refresh": "eyJhbGciOiJIUzI1NiIs...",
  "user": {"id": 1, "email": "jan@firma.pl", "role": "owner"}
}
```

### Dodanie pojazdu (z alertem VAT-26)

```http
POST /api/v1/vehicles/
Authorization: Bearer ...
Content-Type: application/json

{
  "registration_number": "WA12345",
  "vin": "WBA3A5C50CF256839",
  "make": "BMW", "model_name": "3 Series",
  "year": 2020, "vehicle_type": "car",
  "engine_capacity_cc": 1600, "fuel_type": "petrol",
  "vat26_registered": false,
  "odometer_initial": 0,
  "evidencja_start_date": "2026-01-01",
  "company": 1
}
```

```json
{
  "id": 42,
  "registration_number": "WA12345",
  "vat_deduction_pct": 50,
  "vat26_alert": true,
  "vat26_alert_message": "Pojazd WA12345 nie jest zgłoszony...",
  "vat26_onboarding_alert": {
    "show": true,
    "title": "Pamiętaj o zgłoszeniu VAT-26",
    "message": "...",
    "legal_basis": "art. 86a ust. 12 ustawy o VAT"
  }
}
```

### Eksport Insert GT

```http
POST /api/v1/exports/insert-gt/2026-10/
Authorization: Bearer ...
Content-Type: application/json

{"company_id": 1, "force": false}
```

```
HTTP/1.1 200 OK
Content-Type: application/octet-stream
Content-Disposition: attachment; filename="busikm_5260211183_2026_10.epp"
X-Invoices-Count: 5
X-KM-Included: true
X-Warnings: []
X-Export-Period: 2026-10

[binary .epp file content — Windows-1250]
```

### Aktualne stawki km (publiczny endpoint)

```http
GET /api/v1/mileage-rates/current/
```

```json
[
  {
    "vehicle_type": "car",
    "vehicle_type_display": "Samochód osobowy",
    "engine_capacity_max_cc": 900,
    "capacity_label": "do 900 cm³ włącznie",
    "rate_per_km": "0.89",
    "rate_display": "0,89 zł/km",
    "valid_from": "2023-01-17",
    "regulation_ref": "Rozp. MI 22.12.2022 (Dz.U. 2023 poz. 5)"
  },
  {
    "vehicle_type": "car",
    "engine_capacity_max_cc": null,
    "capacity_label": "powyżej 900 cm³",
    "rate_per_km": "1.15",
    "rate_display": "1,15 zł/km",
    "valid_from": "2023-01-17",
    "regulation_ref": "Rozp. MI 22.12.2022 (Dz.U. 2023 poz. 5)"
  }
]
```

---

## 6. Flow ewidencji przebiegu

```
1. POST /vehicles/                        → dodaj pojazd
2. POST /vehicles/{id}/register-vat26/   → (opcja) zgłoś VAT-26
3. POST /trips/                           → utwórz trasę
4. POST /trips/{id}/confirm-driver/      → kierowca potwierdza
5. POST /trips/{id}/confirm-owner/       → właściciel zatwierdza
6. POST /monthly-summaries/{id}/recalculate/ → przelicz miesiąc
7. POST /monthly-summaries/{id}/approve/ → zatwierdź podsumowanie
8. POST /exports/insert-gt/2026-10/      → eksportuj do FK
```
