# BusiKM — Schemat bazy danych

## 1. Przegląd strategii bazodanowej

BusiKM korzysta z trzech silników przechowywania danych:

| Silnik | Zastosowanie | Uzasadnienie |
|---|---|---|
| PostgreSQL | Dane transakcyjne, modele domenowe, ewidencja FK | ACID, relacje, constrainty, migracje Django ORM |
| MongoDB | Punkty GPS (dane szeregowe, duże wolumeny) | Elastyczny schemat, indeks 2dsphere, TTL, sharding |
| Redis | Cache, kolejka zadań, blacklist tokenów JWT | Operacje in-memory, TTL, atomowe liczniki |

Wszystkie modele PostgreSQL posiadają pola `created_at` i `updated_at`.

---

## 2. Diagram ERD (uproszczony)

```
Company ──1──1── Subscription
   │          └──1──1── AccountingFirm ──1──*── AccountingFirmClient
   │                                                  └── FK → Company (client)
   │
   ├──1──*── User (role: driver/owner/accountant/accounting_firm)
   │            └──1──1── Driver
   │                        ├── pesel (encrypted), nip (encrypted)
   │                        ├── pesel_hash (HMAC)
   │                        ├──1──*── DriverDocument
   │                        └──FK── default_vehicle → Vehicle
   │
   ├──1──*── Vehicle
   │            ├── vin, engine_capacity_cc, fuel_type
   │            ├── vat26_registered, vat26_registered_date
   │            ├── vat_deduction_pct (50 | 100)
   │            ├── odometer_initial, evidencja_start_date
   │            └──1──*── VehicleDocument
   │
   ├──1──*── Trip
   │            ├── origin_address, destination_address
   │            ├── odometer_start, odometer_end, distance_km
   │            ├── trip_purpose, trip_type (business/private)
   │            ├── rate_per_km (snapshot), trip_cost
   │            ├── confirmation_status, period_year, period_month
   │            ├──FK── driver, vehicle
   │            ├──1──*── TripConfirmationLog
   │            └──1──*── OdometerPhoto
   │
   ├──1──*── MonthlyMileageSummary
   │            ├── period_year, period_month
   │            ├── total_km_business, total_cost_pit
   │            ├── status (draft/pending/approved/exported)
   │            ├── exported_insert_at, exported_comarch_at, exported_symfonia_at
   │            └──FK── vehicle
   │
   ├──1──*── FuelInvoice
   │            ├── invoice_number, invoice_date
   │            ├── vendor_nip, vendor_name_short
   │            ├── amount_net, vat_rate, vat_amount, amount_gross
   │            ├── vat_deduction_pct (snapshot), vat_deductible_amount
   │            ├── is_locked (po eksporcie)
   │            └──FK── vehicle
   │
   ├──1──*── Alert ──FK→ Vehicle?, Driver?, VehicleDocument?
   │
   ├──1──*── MileageReport, FleetCostReport, DelegationReport
   │
   ├──1──*── ExportRecord ──1──*── ExportStatusLog
   │
   └──1──*── AuditLog (GenericFK → dowolny model)

MileageRate (globalna tabela stawek km — immutable)
   ├── vehicle_type, engine_capacity_max_cc
   ├── rate_per_km, valid_from, valid_to
   └── is_active, regulation_ref
```

---

## 3. PostgreSQL — modele szczegółowo

### 3.1 User (app: `accounts`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| email | EmailField | unique, pole loginu |
| first_name | CharField(150) | |
| last_name | CharField(150) | |
| role | CharField | driver / owner / accountant / accounting_firm |
| phone | CharField(20) | opcjonalne |
| company | FK → Company | nullable |
| is_active | BooleanField | default True |
| token_version | IntegerField | default 0 |

### 3.2 Company (app: `companies`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| nip | CharField(13) | unique (partial — gdzie != '') |
| regon | CharField(14) | opcjonalne |
| company_name_short | CharField(40) | max 40 znaków (limit EPP) |
| company_name_full | CharField(255) | |
| city | CharField(30) | max 30 znaków (limit EPP) |
| postal_code | CharField(6) | format XX-XXX |
| street_and_number | CharField(50) | max 50 znaków (limit EPP) |
| country | CharField(100) | default 'Polska' |
| eu_prefix | CharField(2) | np. 'PL' |
| is_eu_vat | BooleanField | default False |
| fk_system | CharField | insert_gt / comarch_optima / symfonia / none |
| fk_symbol | CharField | wymagany dla insert_gt |
| is_vat_payer | BooleanField | default True |
| is_deleted | BooleanField | soft delete |

### 3.3 Subscription (app: `companies`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| company | OneToOneField | FK → Company |
| plan | CharField | free / starter / professional / enterprise |
| status | CharField | trial / active / expired / cancelled |
| valid_until | DateTimeField | nullable |
| max_vehicles | IntegerField | |
| features | JSONField | elastyczny zbiór funkcji planu |

### 3.4 Vehicle (app: `fleet`)

Soft delete. Unique constraint na `(company, registration_number)` gdzie `is_deleted = False`.

| Pole | Typ | Ograniczenia |
|---|---|---|
| company | FK → Company | |
| registration_number | CharField(20) | |
| vin | CharField(17) | unique, ISO 3779 (bez I/O/Q) |
| make | CharField(50) | |
| model_name | CharField(50) | |
| year | IntegerField | rok produkcji |
| vehicle_type | CharField | car / motorcycle / moped |
| engine_capacity_cc | IntegerField | wymagane dla aut spalinowych |
| fuel_type | CharField | petrol / diesel / lpg / ev / hydrogen |
| vat26_registered | BooleanField | default False |
| vat26_registered_date | DateField | nullable |
| vat_deduction_pct | IntegerField | 50 lub 100, obliczane z vat26_registered |
| odometer_initial | IntegerField | default 0 |
| evidencja_start_date | DateField | data rozpoczęcia ewidencji |
| assigned_driver | FK → User | nullable |
| is_deleted | BooleanField | soft delete |

**Properties:** `vat26_alert` (bool), `vat26_alert_message` (str|None), `vat26_status` (dict)

**Metody:** `get_mileage_rate(trip_date)`, `register_vat26(date, user)`, `unregister_vat26(user)`

### 3.5 Driver (app: `drivers`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| user | OneToOneField → User | |
| company | FK → Company | |
| last_name | CharField(30) | max 30 (limit EPP) |
| first_name | CharField(20) | max 20 (limit EPP) |
| second_name | CharField(20) | nullable, max 20 |
| pesel | EncryptedCharField | write_only, AES-256 |
| pesel_hash | CharField | HMAC-SHA256, db_index |
| nip | EncryptedCharField | write_only |
| birth_date | DateField | nullable |
| birth_place | CharField(30) | nullable |
| street | CharField(50) | max 50 (limit EPP) |
| house_number | CharField(5) | max 5 (limit EPP) |
| apartment_number | CharField(5) | nullable |
| postal_code | CharField(6) | format XX-XXX |
| city | CharField(30) | max 30 (limit EPP) |
| commune | CharField(30) | nullable |
| county | CharField(30) | nullable |
| voivodeship | CharField(30) | nullable |
| country | CharField(50) | default 'Polska' |
| license_number | CharField | nullable |
| license_expiry | DateField | nullable |
| license_categories | JSONField | np. ['B', 'C'] |
| employment_date | DateField | nullable |
| termination_date | DateField | nullable |
| employment_type | IntegerField | default 0 |
| epp_analytics | CharField(5) | max 5 (limit EPP) |
| is_active | BooleanField | computed z termination_date |
| is_deleted | BooleanField | soft delete |

**Properties:** `full_name` (format EPP: Nazwisko Imię), `full_name_natural`, `license_alert` (dni), `epp_address` (dict)

### 3.6 Trip (app: `trips`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| company | FK → Company | |
| vehicle | FK → Vehicle | |
| driver | FK → User | |
| date | DateField | |
| departed_at | DateTimeField | |
| arrived_at | DateTimeField | nullable |
| origin_address | CharField(255) | |
| destination_address | CharField(255) | |
| odometer_start | IntegerField | |
| odometer_end | IntegerField | nullable |
| odometer_start_photo | ImageField | nullable |
| odometer_end_photo | ImageField | nullable |
| distance_km | DecimalField | obliczane z licznika |
| gps_distance_km | DecimalField | nullable |
| gps_track | JSONField | nullable |
| trip_purpose | CharField(255) | wymagane dla business |
| trip_type | CharField | business / private |
| rate_per_km | DecimalField | snapshot z MileageRate |
| trip_cost | DecimalField | distance_km × rate_per_km |
| rate_source | CharField | identyfikator rekordu MileageRate |
| rate_regulation_ref | CharField | np. 'Rozp. MI 22.12.2022' |
| driver_confirmed_at | DateTimeField | nullable |
| driver_confirmed_by | FK → User | nullable |
| driver_confirmation_ip | GenericIPAddressField | nullable |
| owner_confirmed_at | DateTimeField | nullable |
| owner_confirmed_by | FK → User | nullable |
| owner_confirmation_ip | GenericIPAddressField | nullable |
| confirmation_status | CharField | pending_driver / pending_owner / confirmed / exported |
| period_year | IntegerField | z date |
| period_month | IntegerField | z date |

**Properties:** `is_complete`, `is_exportable`, `cost_display`, `rate_display`

**Metody:** `confirm_by_driver(user, ip)`, `confirm_by_owner(user, ip)`, `reset_confirmations(user)`, `recalculate_cost(force)`, `bulk_confirm_by_owner(vehicle, year, month, user)`

**Unique constraint:** brak (jedna trasa może być wielokrotnie w miesiącu)  
**Index:** `(vehicle, period_year, period_month)`, `(vehicle, trip_type, driver_confirmed_at, owner_confirmed_at)`

### 3.7 TripConfirmationLog (app: `trips`)

Immutable dziennik potwierdzeń — analogicznie do AuditLog.

| Pole | Typ | Ograniczenia |
|---|---|---|
| trip | FK → Trip | |
| action | CharField | driver_confirmed / driver_unconfirmed / owner_confirmed / owner_unconfirmed |
| performed_by | FK → User | nullable |
| performed_at | DateTimeField | auto_now_add |
| ip_address | GenericIPAddressField | nullable |
| note | TextField | nullable |

### 3.8 MonthlyMileageSummary (app: `trips`)

Miesięczne podsumowanie ewidencji przebiegu per pojazd.

| Pole | Typ | Ograniczenia |
|---|---|---|
| vehicle | FK → Vehicle | |
| company | FK → Company | |
| period_year | IntegerField | |
| period_month | IntegerField | |
| period_start | DateField | pierwszy dzień miesiąca |
| period_end | DateField | ostatni dzień miesiąca |
| odometer_start | IntegerField | z pierwszej trasy |
| odometer_end | IntegerField | z ostatniej trasy, nullable |
| total_km_business | DecimalField | suma km służbowych |
| total_km_private | DecimalField | suma km prywatnych |
| total_km_all | DecimalField | suma wszystkich km |
| trips_count_business | IntegerField | |
| trips_count_private | IntegerField | |
| trips_count_total | IntegerField | |
| rate_per_km | DecimalField | nullable, gdy różne stawki |
| rate_regulation_ref | CharField | nullable |
| total_cost_pit | DecimalField | suma kosztów PIT |
| status | CharField | draft / pending / approved / exported |
| has_unconfirmed_trips | BooleanField | flaga |
| has_incomplete_trips | BooleanField | flaga |
| owner_approved_at | DateTimeField | nullable |
| owner_approved_by | FK → User | nullable |
| exported_insert_at | DateTimeField | nullable |
| exported_comarch_at | DateTimeField | nullable |
| exported_symfonia_at | DateTimeField | nullable |
| exported_file_name | CharField | nullable |
| last_recalculated_at | DateTimeField | |

**Unique constraint:** `(vehicle, period_year, period_month)`

**Metody:** `recalculate()`, `approve(user)`, `mark_exported(fk_system, filename)`, `get_or_create_for_period(vehicle, year, month)`

### 3.9 FuelInvoice (app: `trips`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| vehicle | FK → Vehicle | |
| company | FK → Company | |
| added_by | FK → User | |
| invoice_number | CharField(50) | |
| invoice_date | DateField | |
| operation_date | DateField | default = invoice_date |
| vendor_nip | CharField(20) | |
| vendor_name_short | CharField(40) | max 40 (limit EPP) |
| vendor_name_full | CharField(255) | |
| vendor_city | CharField(30) | nullable |
| vendor_postal_code | CharField(6) | nullable |
| vendor_street | CharField(50) | nullable |
| amount_net | DecimalField | > 0 |
| vat_rate | DecimalField | 23.00 / 8.00 / 5.00 / 0.00 / -1.00 |
| vat_amount | DecimalField | obliczane: netto × vat_rate% |
| amount_gross | DecimalField | obliczane: netto + vat |
| vat_deduction_pct | IntegerField | snapshot z vehicle.vat_deduction_pct |
| vat_deductible_amount | DecimalField | obliczane: vat × pct% |
| vat_non_deductible_amount | DecimalField | obliczane: vat − deductible |
| expense_type | CharField | fuel / service / toll / other |
| description | TextField | nullable |
| period_year | IntegerField | z invoice_date |
| period_month | IntegerField | z invoice_date |
| invoice_photo | ImageField | nullable |
| fk_document_type | CharField | default 'FZ' |
| is_locked | BooleanField | default False, True po eksporcie |
| exported_at | DateTimeField | nullable |
| exported_in_summary | FK → MonthlyMileageSummary | nullable |

**Unique constraint:** `(company, invoice_number)`

**Properties (computed):** `epp_description`, `vat_symbol_epp`  
**Metody:** `mark_exported(summary=None)`

### 3.10 MileageRate (globalna tabela stawek km)

> **IMMUTABLE** — rekordy nigdy nie są edytowane ani usuwane.

| Pole | Typ | Ograniczenia |
|---|---|---|
| vehicle_type | CharField | car / motorcycle / moped |
| engine_capacity_max_cc | IntegerField | nullable (null = bez limitu) |
| fuel_type | CharField | nullable |
| rate_per_km | DecimalField(10,2) | > 0 |
| valid_from | DateField | |
| valid_to | DateField | nullable |
| is_active | BooleanField | |
| regulation_ref | CharField | np. 'Rozp. MI 22.12.2022 (Dz.U. 2023 poz. 5)' |
| regulation_journal | CharField | np. 'Dz.U. 2023 poz. 5' |
| notes | TextField | nullable |
| created_by | FK → User | nullable |

**Classmethod:** `get_rate_for_vehicle(vehicle_type, engine_capacity_cc, trip_date)` → MileageRate|None

**Index:** `(vehicle_type, engine_capacity_max_cc, valid_from)`, `(valid_from)`

### 3.11 AuditLog (app: `busikm`)

> **IMMUTABLE** — rekordy nigdy nie są edytowane ani usuwane. IP anonimizowane po 90 dniach.

| Pole | Typ | Ograniczenia |
|---|---|---|
| content_type | FK → ContentType | GenericForeignKey |
| object_id | PositiveIntegerField | |
| object_repr | CharField(255) | str(obj) w momencie logowania |
| action | CharField | create / update / delete / vat26_registered / export_generated / ... |
| changed_field | CharField | nullable, przy action=update |
| old_value | TextField | nullable, wrażliwe → '[ENCRYPTED]' |
| new_value | TextField | nullable, wrażliwe → '[UPDATED]' |
| performed_by | FK → User | nullable (system action) |
| performed_by_repr | CharField | 'Jan Kowalski (jan@test.pl)' |
| is_system_action | BooleanField | True = Celery/sygnały |
| performed_at | DateTimeField | auto_now_add |
| ip_address | GenericIPAddressField | nullable, anonimizowane po 90d |
| user_agent | CharField(255) | nullable |
| session_key | CharField(40) | nullable |
| extra_data | JSONField | nullable |
| company | FK → Company | nullable |

**Classmethod:** `create_log(action, obj, performed_by, ...)`, `get_logs_for_object(obj, limit)`, `get_logs_for_company(company, ...)`

**Index:** `(content_type, object_id)`, `(performed_at)`, `(company, performed_at)`, `(action)`

### 3.12 OdometerPhoto (app: `trips`)

| Pole | Typ | Ograniczenia |
|---|---|---|
| trip | FK → Trip | |
| photo_type | CharField | start / end |
| file | ImageField | storage: S3 |
| odometer_value_km | IntegerField | nullable |
| taken_at | DateTimeField | nullable |
| uploaded_by | FK → User | |

**Unique constraint:** `(trip, photo_type)`

### 3.13–3.20 Pozostałe modele (bez zmian)

Alert, VehicleDocument, DriverDocument, Invitation, MileageReport, FleetCostReport, ExportRecord, DevicePushToken — niezmienione względem poprzedniej wersji dokumentu.

---

## 4. MongoDB — kolekcje i indeksy

### Kolekcja `gps_points`

```json
{
  "trip_id": "UUID",
  "company_id": "int",
  "location": {"type": "Point", "coordinates": [lng, lat]},
  "speed": 65.2,
  "accuracy": 4.5,
  "timestamp": "ISODate",
  "batch_id": "UUID"
}
```

**Indeksy:** `location` (2dsphere), `(trip_id, timestamp)` (compound), `timestamp` (TTL 90 dni)

---

## 5. Redis — logiczne bazy danych

| DB | Przeznaczenie | Przykładowe klucze |
|---|---|---|
| 0 | Cache API, throttle eksportów | `cache:company:{id}:vehicles`, `export_insert_gt_{company_id}_{YYYY}_{MM}` |
| 1 | Celery broker | Kolejki: reports, default |
| 2 | Blacklist tokenów JWT | `token_blacklist:{jti}` |

Throttle eksportów FK: klucz `export_{fk_system}_{company_id}_{YYYY}_{MM}`, TTL 31 dni, limit 3.

---

## 6. Indeksy i constrainty

### Unique constraints warunkowe (partial unique index)

```sql
-- NIP firmy unikalny gdy niepusty
CREATE UNIQUE INDEX uq_company_nip ON companies_company (nip) WHERE nip != '';

-- Numer rejestracyjny unikalny w ramach firmy (aktywne pojazdy)
CREATE UNIQUE INDEX uq_vehicle_plate ON fleet_vehicle (company_id, registration_number)
    WHERE is_deleted = FALSE;

-- VIN unikalny
CREATE UNIQUE INDEX uq_vehicle_vin ON fleet_vehicle (vin) WHERE vin != '';

-- Jeden aktywny alert na dokument danego typu
CREATE UNIQUE INDEX uq_alert_doc_type ON fleet_alert (document_id, alert_type)
    WHERE status IN ('active', 'acknowledged');

-- Unikalne podsumowanie miesięczne per pojazd i okres
CREATE UNIQUE INDEX uq_monthly_summary ON busikm_monthlymileagesummary (vehicle_id, period_year, period_month);

-- Unikalny numer faktury w ramach firmy
CREATE UNIQUE INDEX uq_fuel_invoice ON busikm_fuelinvoice (company_id, invoice_number);
```

### Indeksy wydajnościowe FK

```sql
-- Trasy per pojazd i okres
CREATE INDEX idx_trip_vehicle_period ON busikm_trip (vehicle_id, period_year, period_month);

-- Trasy do eksportu (potwierdzone)
CREATE INDEX idx_trip_confirmation ON busikm_trip (vehicle_id, trip_type, driver_confirmed_at, owner_confirmed_at);

-- Stawki km — query historyczny
CREATE INDEX idx_mileage_rate_lookup ON busikm_mileagerate (vehicle_type, engine_capacity_max_cc, valid_from DESC);

-- AuditLog per firma i czas
CREATE INDEX idx_auditlog_company_time ON busikm_auditlog (company_id, performed_at DESC);
```

---

## 7. Wzorzec soft delete

Modele z soft delete: **Company**, **Vehicle**, **VehicleDocument**, **Driver**, **DriverDocument**.

```python
class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()        # bez usuniętych
    all_with_deleted = models.Manager() # wszystkie

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save(update_fields=['is_deleted', 'deleted_at'])

    class Meta:
        abstract = True
```

---

## 8. Wzorzec AuditableMixin

Modele które mają być automatycznie audytowane dziedziczą po `AuditableMixin`:

```python
class Trip(AuditableMixin, models.Model):
    AUDITED_FIELDS = [
        'trip_purpose', 'odometer_start', 'odometer_end',
        'origin_address', 'destination_address', 'trip_type',
    ]

# Użycie:
trip._audit_user = request.user
trip._audit_ip = ip
trip.save_with_audit()  # automatycznie tworzy AuditLog per zmienione pole
```

Modele objęte AuditableMixin: `Trip`, `FuelInvoice`, `Vehicle`, `Driver`.

---

## 9. Migracje — konwencje

- Każda aplikacja Django zarządza własnymi migracjami.
- Migracje FK (BKM-131) w kolejności: Etap 1 (Company, MileageRate) → Etap 2 (Vehicle, Driver) → Etap 3 (Trip, TripConfirmationLog) → Etap 4 (MonthlyMileageSummary, FuelInvoice) → Etap 5 (AuditLog) → Etap 6 (data migrations + fixtures).
- Data migrations: `DM-01` do `DM-07` — uzupełnianie danych dla istniejących rekordów.
- Fixtures MileageRate: 4 aktualne stawki (pk 1–4) + 4 historyczne (pk 5–8).
