# BusiKM -- Schemat bazy danych

## 1. Przeglad strategii bazodanowej

BusiKM korzysta z trzech silnikow przechowywania danych, dobranych pod katem specyfiki obciazen:

| Silnik     | Zastosowanie                                | Uzasadnienie                                      |
|------------|---------------------------------------------|---------------------------------------------------|
| PostgreSQL | Dane transakcyjne, modele domenowe          | ACID, relacje, constrainty, migracje Django ORM   |
| MongoDB    | Punkty GPS (dane szeregowe, duze wolumeny)  | Elastyczny schemat, indeks 2dsphere, TTL, sharding |
| Redis      | Cache, kolejka zadan, blacklist tokenow JWT | Operacje in-memory, TTL, atomowe liczniki          |

Wszystkie modele PostgreSQL posiadaja pola `created_at` i `updated_at` (auto_now_add / auto_now).

---

## 2. Diagram ERD (uproszczony)

```
Company ──1──1── Subscription
   │          └──1──1── AccountingFirm ──1──*── AccountingFirmClient
   │                                                  └── FK → Company (client)
   │
   ├──1──*── User (role: driver/owner/accountant/accounting_firm)
   │            └──1──1── Driver
   │                        ├──1──*── DriverDocument
   │                        └──FK── default_vehicle → Vehicle
   │
   ├──1──*── Vehicle
   │            └──1──*── VehicleDocument
   │
   ├──1──*── Trip
   │            ├──FK── driver, vehicle
   │            ├──1──*── TripClassificationLog
   │            └──1──*── OdometerPhoto
   │
   ├──1──*── Alert ──FK→ Vehicle?, Driver?, VehicleDocument?
   │
   ├──1──*── MileageReport, FleetCostReport, DelegationReport
   │
   ├──1──*── ExportRecord ──1──*── ExportStatusLog
   │
   ├──1──*── Invitation
   │
   └──1──*── UsageSnapshot

User ──1──*── DevicePushToken
Subscription ──1──*── TrialEmailLog
```

---

## 3. PostgreSQL -- modele szczegolowo

### 3.1 User (app: `accounts`)

Dziedziczy po `AbstractUser`. Logowanie przez email (`USERNAME_FIELD = 'email'`).

| Pole              | Typ                  | Ograniczenia                          |
|-------------------|----------------------|---------------------------------------|
| email             | EmailField           | unique, indeks, pole loginu           |
| first_name        | CharField(150)       |                                       |
| last_name         | CharField(150)       |                                       |
| role              | CharField -- choices | driver / owner / accountant / accounting_firm |
| phone             | CharField(20)        | opcjonalne                            |
| company           | FK -> Company        | nullable (accounting_firm bez company)|
| is_active         | BooleanField         | default True                          |
| is_email_verified | BooleanField         | default False                         |
| token_version     | IntegerField         | default 0, inkrementacja = uniewaznij tokeny |
| date_joined       | DateTimeField        | auto_now_add                          |

### 3.2 Company (app: `companies`)

Soft delete -- manager `objects` zwraca tylko nieusuniete, `all_with_deleted` zwraca wszystkie.

| Pole           | Typ              | Ograniczenia                     |
|----------------|------------------|----------------------------------|
| name           | CharField(255)   | wymagane                         |
| nip            | CharField(13)    | unique (warunkowo, gdzie != '')  |
| regon          | CharField(14)    | opcjonalne                       |
| krs            | CharField(14)    | opcjonalne                       |
| street         | CharField(255)   | opcjonalne                       |
| city           | CharField(100)   | opcjonalne                       |
| postal_code    | CharField(10)    | opcjonalne                       |
| country        | CharField(100)   | default 'PL'                     |
| phone          | CharField(20)    | opcjonalne                       |
| email          | EmailField       | opcjonalne                       |
| website        | URLField         | opcjonalne                       |
| license_number | CharField(50)    | numer licencji transportowej     |
| fleet_size     | IntegerField     | zdenormalizowane, default 0      |
| is_active      | BooleanField     | default True                     |
| is_deleted     | BooleanField     | default False                    |
| deleted_at     | DateTimeField    | nullable                         |

### 3.3 Subscription (app: `companies`)

| Pole            | Typ              | Ograniczenia                                          |
|-----------------|------------------|-------------------------------------------------------|
| company         | OneToOneField    | FK -> Company, on_delete CASCADE                      |
| plan            | CharField        | free / starter / professional / enterprise            |
| status          | CharField        | trial / pilot / af_trial / af_client_trial / active / expired / cancelled |
| valid_until     | DateTimeField    | nullable                                              |
| trial_type      | CharField        | nullable                                              |
| trial_started_at| DateTimeField    | nullable                                              |
| downgraded_at   | DateTimeField    | nullable                                              |
| previous_plan   | CharField        | nullable                                              |
| max_vehicles    | IntegerField     |                                                       |
| max_drivers     | IntegerField     |                                                       |
| features        | JSONField        | default dict, elastyczny zbior funkcji planu          |

### 3.4 AccountingFirm (app: `companies`)

| Pole                  | Typ           | Ograniczenia               |
|-----------------------|---------------|----------------------------|
| company               | OneToOneField | FK -> Company              |
| max_clients           | IntegerField  |                            |
| tax_office            | CharField     | opcjonalne                 |
| accountant_license    | CharField     | opcjonalne                 |
| specializations       | JSONField     | lista specjalizacji        |
| onboarding_completed  | BooleanField  | default False              |
| trial_min_clients     | IntegerField  | minimum klientow w trialu  |
| trial_condition_met   | BooleanField  | default False              |

### 3.5 AccountingFirmClient (app: `companies`)

| Pole            | Typ          | Ograniczenia                                  |
|-----------------|--------------|-----------------------------------------------|
| accounting_firm | FK           | -> AccountingFirm                             |
| client_company  | FK           | -> Company                                    |
| is_active       | BooleanField | default True                                  |
| access_level    | CharField    | full / read_only / reports_only               |
| contract_start  | DateField    | nullable                                      |
| contract_end    | DateField    | nullable                                      |
| notes           | TextField    | opcjonalne                                    |
| added_by        | FK           | -> User                                       |

**Unique constraint:** `(accounting_firm, client_company)`

### 3.6 Vehicle (app: `fleet`)

Soft delete. Unique constraint na `(company, plate_number)` gdzie `is_deleted = False`.

| Pole            | Typ           | Ograniczenia                                          |
|-----------------|---------------|-------------------------------------------------------|
| company         | FK            | -> Company                                            |
| plate_number    | CharField(20) |                                                       |
| brand           | CharField(50) |                                                       |
| model           | CharField(50) |                                                       |
| year            | IntegerField  | rok produkcji                                         |
| vin             | CharField(17) | opcjonalne                                            |
| vehicle_type    | CharField     | truck / van / car / bus / semi_trailer / trailer      |
| fuel_type       | CharField     | diesel / petrol / lpg / cng / electric / hybrid       |
| mileage_km      | IntegerField  | aktualny przebieg                                     |
| engine_capacity | IntegerField  | cm3, opcjonalne                                       |
| engine_power_kw | IntegerField  | opcjonalne                                            |
| max_weight_kg   | IntegerField  | DMC, opcjonalne                                       |
| euro_class      | CharField     | norma emisji spalin                                   |
| status          | CharField     | active / in_service / decommissioned                  |
| notes           | TextField     | opcjonalne                                            |
| is_deleted      | BooleanField  | default False                                         |
| deleted_at      | DateTimeField | nullable                                              |

### 3.7 VehicleDocument (app: `fleet`)

| Pole          | Typ           | Ograniczenia                                                      |
|---------------|---------------|-------------------------------------------------------------------|
| vehicle       | FK            | -> Vehicle                                                        |
| document_type | CharField     | oc_insurance / ac_insurance / registration / technical_inspection / tachograph_certificate / transport_license / lease_agreement / other |
| title         | CharField     |                                                                   |
| file          | FileField     | storage: S3                                                       |
| file_name     | CharField     |                                                                   |
| file_size     | IntegerField  | w bajtach                                                         |
| content_type  | CharField     | MIME type                                                         |
| issue_date    | DateField     | nullable                                                          |
| expiry_date   | DateField     | nullable                                                          |
| insurer       | CharField     | opcjonalne, dotyczy polis                                         |
| policy_number | CharField     | opcjonalne, dotyczy polis                                         |
| cost          | DecimalField  | nullable                                                          |
| notes         | TextField     | opcjonalne                                                        |
| uploaded_by   | FK            | -> User                                                           |
| is_deleted    | BooleanField  | default False                                                     |
| deleted_at    | DateTimeField | nullable                                                          |

### 3.8 Driver (app: `drivers`)

| Pole                          | Typ              | Ograniczenia                        |
|-------------------------------|------------------|-------------------------------------|
| user                          | OneToOneField    | -> User                             |
| company                       | FK               | -> Company                          |
| employee_number               | CharField        | opcjonalne                          |
| license_number                | CharField        | unique (warunkowo, != '')           |
| license_categories            | JSONField        | lista, np. ["C", "CE", "D"]        |
| license_expiry_date           | DateField        | nullable                            |
| license_issued_by             | CharField        | opcjonalne                          |
| qualification_certificate     | CharField        | numer swiadectwa kwalifikacji       |
| qualification_expiry_date     | DateField        | nullable                            |
| medical_exam_expiry_date      | DateField        | nullable                            |
| psychological_exam_expiry_date| DateField        | nullable                            |
| tachograph_card_number        | CharField        | opcjonalne                          |
| tachograph_card_expiry        | DateField        | nullable                            |
| default_vehicle               | FK               | -> Vehicle, nullable                |
| status                        | CharField        | active / on_leave / suspended / inactive |
| hire_date                     | DateField        | nullable                            |
| notes                         | TextField        | opcjonalne                          |
| is_deleted                    | BooleanField     | default False                       |
| deleted_at                    | DateTimeField    | nullable                            |

### 3.9 DriverDocument (app: `drivers`)

| Pole          | Typ           | Ograniczenia                                                      |
|---------------|---------------|-------------------------------------------------------------------|
| driver        | FK            | -> Driver                                                         |
| document_type | CharField     | driving_license / qualification_certificate / medical_exam / psychological_exam / tachograph_card / id_card / employment_contract / training_certificate / other |
| title         | CharField     |                                                                   |
| file          | FileField     | storage: S3                                                       |
| file_name     | CharField     |                                                                   |
| file_size     | IntegerField  |                                                                   |
| content_type  | CharField     |                                                                   |
| document_number| CharField    | opcjonalne                                                        |
| issued_by     | CharField     | opcjonalne                                                        |
| issue_date    | DateField     | nullable                                                          |
| expiry_date   | DateField     | nullable                                                          |
| notes         | TextField     | opcjonalne                                                        |
| uploaded_by   | FK            | -> User                                                           |
| is_deleted    | BooleanField  | default False                                                     |
| deleted_at    | DateTimeField | nullable                                                          |

### 3.10 Invitation (app: `drivers`)

| Pole        | Typ           | Ograniczenia                                    |
|-------------|---------------|-------------------------------------------------|
| company     | FK            | -> Company                                      |
| email       | EmailField    |                                                 |
| role        | CharField     | rola przypisywana po akceptacji                 |
| invited_by  | FK            | -> User                                         |
| token       | CharField     | unique, UUID                                    |
| status      | CharField     | pending / accepted / expired / cancelled / declined |
| message     | TextField     | opcjonalne, wiadomosc od zapraszajacego         |
| accepted_by | FK            | -> User, nullable                               |
| accepted_at | DateTimeField | nullable                                        |
| expires_at  | DateTimeField |                                                 |
| resent_count| IntegerField  | default 0                                       |
| last_sent_at| DateTimeField | nullable                                        |

### 3.11 Trip (app: `trips`)

| Pole                   | Typ           | Ograniczenia                   |
|------------------------|---------------|--------------------------------|
| company                | FK            | -> Company                     |
| driver                 | FK            | -> Driver                      |
| vehicle                | FK            | -> Vehicle                     |
| trip_type              | CharField     | business / private             |
| status                 | CharField     | in_progress / completed / cancelled |
| start_time             | DateTimeField |                                |
| end_time               | DateTimeField | nullable                       |
| start_location_name    | CharField     | opcjonalne                     |
| end_location_name      | CharField     | opcjonalne                     |
| start_latitude         | DecimalField  | nullable                       |
| start_longitude        | DecimalField  | nullable                       |
| end_latitude           | DecimalField  | nullable                       |
| end_longitude          | DecimalField  | nullable                       |
| start_odometer_km      | IntegerField  | nullable                       |
| end_odometer_km        | IntegerField  | nullable                       |
| distance_km            | DecimalField  | nullable                       |
| distance_source        | CharField     | gps / odometer / manual        |
| duration_minutes       | IntegerField  | nullable                       |
| purpose                | TextField     | opcjonalne                     |
| route_description      | TextField     | opcjonalne                     |
| gps_points_count       | IntegerField  | default 0                      |
| notes                  | TextField     | opcjonalne                     |
| original_trip_type     | CharField     | nullable, przed reklasyfikacja |
| reclassified_at        | DateTimeField | nullable                       |
| reclassified_by        | FK            | -> User, nullable              |
| reclassification_reason| TextField     | nullable                       |

### 3.12 TripClassificationLog (app: `trips`)

| Pole       | Typ       | Ograniczenia       |
|------------|-----------|--------------------|
| trip       | FK        | -> Trip            |
| from_type  | CharField | business / private |
| to_type    | CharField | business / private |
| changed_by | FK        | -> User            |
| reason     | TextField |                    |

### 3.13 OdometerPhoto (app: `trips`)

| Pole             | Typ           | Ograniczenia              |
|------------------|---------------|---------------------------|
| trip             | FK            | -> Trip                   |
| photo_type       | CharField     | start / end               |
| file             | ImageField    | storage: S3               |
| file_name        | CharField     |                           |
| file_size        | IntegerField  |                           |
| content_type     | CharField     |                           |
| odometer_value_km| IntegerField  | nullable                  |
| latitude         | DecimalField  | nullable                  |
| longitude        | DecimalField  | nullable                  |
| taken_at         | DateTimeField | nullable                  |
| uploaded_by      | FK            | -> User                   |

**Unique constraint:** `(trip, photo_type)`

### 3.14 Alert (app: `fleet`)

| Pole            | Typ           | Ograniczenia                                                      |
|-----------------|---------------|-------------------------------------------------------------------|
| company         | FK            | -> Company                                                        |
| alert_type      | CharField     | oc_expiring / ac_expiring / inspection_expiring / tachograph_expiring / license_expiring / driver_license_expiring / qualification_expiring / medical_exam_expiring / psychological_exam_expiring / tachograph_card_expiring / custom |
| severity        | CharField     | info / warning / critical / expired                               |
| status          | CharField     | active / acknowledged / resolved / dismissed                      |
| title           | CharField     |                                                                   |
| message         | TextField     |                                                                   |
| vehicle         | FK            | -> Vehicle, nullable                                              |
| driver          | FK            | -> Driver, nullable                                               |
| document        | FK            | -> VehicleDocument, nullable                                      |
| expiry_date     | DateField     | nullable                                                          |
| days_remaining  | IntegerField  | nullable                                                          |
| acknowledged_at | DateTimeField | nullable                                                          |
| acknowledged_by | FK            | -> User, nullable                                                 |
| resolved_at     | DateTimeField | nullable                                                          |

**Unique constraint:** `(document, alert_type)` WHERE `status IN ('active', 'acknowledged')`

### 3.15 MileageReport (app: `documents`)

| Pole             | Typ           | Ograniczenia                        |
|------------------|---------------|-------------------------------------|
| company          | FK            | -> Company                          |
| vehicle          | FK            | -> Vehicle                          |
| period_start     | DateField     |                                     |
| period_end       | DateField     |                                     |
| generated_by     | FK            | -> User                             |
| status           | CharField     | generating / completed / failed     |
| file             | FileField     | storage: S3                         |
| file_name        | CharField     |                                     |
| file_size        | IntegerField  | nullable                            |
| trips_count      | IntegerField  | default 0                           |
| total_distance_km| DecimalField  |                                     |
| total_amount     | DecimalField  | kwota za przebieg                   |
| rate_per_km      | DecimalField  | stawka za km                        |
| start_odometer_km| IntegerField  | nullable                            |
| end_odometer_km  | IntegerField  | nullable                            |
| metadata         | JSONField     | default dict                        |
| error_message    | TextField     | nullable                            |
| generated_at     | DateTimeField | nullable                            |

### 3.16 FleetCostReport (app: `documents`)

Struktura analogiczna do MileageReport, z dodatkowymi polami:

| Pole dodatkowe  | Typ          | Ograniczenia           |
|-----------------|--------------|------------------------|
| pdf_file        | FileField    | storage: S3            |
| csv_file        | FileField    | storage: S3            |
| vehicles_count  | IntegerField |                        |
| total_cost      | DecimalField |                        |
| cost_per_km     | DecimalField |                        |

### 3.17 DelegationReport (app: `documents`)

Struktura analogiczna, z polami specyficznymi dla delegacji:

| Pole dodatkowe      | Typ          | Ograniczenia               |
|---------------------|--------------|----------------------------|
| driver              | FK           | -> Driver                  |
| report_type         | CharField    | individual / summary       |
| total_trips         | IntegerField |                            |
| total_work_hours    | DecimalField |                            |
| total_allowance     | DecimalField | dieta                      |
| total_accommodation | DecimalField | koszty noclegu             |
| total_cost          | DecimalField |                            |

### 3.18 ExportRecord (app: `integrations`)

| Pole              | Typ           | Ograniczenia               |
|-------------------|---------------|----------------------------|
| company           | FK            | -> Company                 |
| integration_name  | CharField     | np. optima, symfoniak      |
| export_type       | CharField     |                            |
| period_start      | DateField     |                            |
| period_end        | DateField     |                            |
| vehicle           | FK            | -> Vehicle, nullable       |
| driver            | FK            | -> Driver, nullable        |
| status            | CharField     |                            |
| file              | FileField     | storage: S3                |
| file_name         | CharField     |                            |
| file_size         | IntegerField  | nullable                   |
| records_count     | IntegerField  | default 0                  |
| total_amount      | DecimalField  | nullable                   |
| total_distance_km | DecimalField  | nullable                   |
| warnings          | JSONField     | default list               |
| error_message     | TextField     | nullable                   |
| metadata          | JSONField     | default dict               |
| generated_by      | FK            | -> User                    |
| generated_at      | DateTimeField | nullable                   |

### 3.19 ExportStatusLog (app: `integrations`)

| Pole          | Typ       | Ograniczenia      |
|---------------|-----------|-------------------|
| export_record | FK        | -> ExportRecord   |
| from_status   | CharField |                   |
| to_status     | CharField |                   |
| message       | TextField | opcjonalne        |

### 3.20 DevicePushToken (app: `notifications`)

| Pole        | Typ          | Ograniczenia               |
|-------------|--------------|----------------------------|
| user        | FK           | -> User                    |
| push_token  | CharField    |                            |
| platform    | CharField    | ios / android              |
| device_name | CharField    | opcjonalne                 |
| is_active   | BooleanField | default True               |

**Unique constraint:** `(user, push_token)`

### 3.21 UsageSnapshot (app: `common`)

| Pole                | Typ           | Ograniczenia              |
|---------------------|---------------|---------------------------|
| company             | FK            | -> Company                |
| month               | CharField(7)  | format YYYY-MM            |
| vehicles_active     | IntegerField  | default 0                 |
| drivers_active      | IntegerField  | default 0                 |
| trips_completed     | IntegerField  | default 0                 |
| trips_business      | IntegerField  | default 0                 |
| distance_total_km   | DecimalField  | default 0                 |
| gps_points_ingested | IntegerField  | default 0                 |
| reports_generated   | IntegerField  | default 0                 |
| exports_generated   | IntegerField  | default 0                 |
| logins_count        | IntegerField  | default 0                 |
| active_days         | IntegerField  | default 0                 |
| mobile_sessions     | IntegerField  | default 0                 |
| web_sessions        | IntegerField  | default 0                 |
| snapshotted_at      | DateTimeField |                           |

**Unique constraint:** `(company, month)`

### 3.22 TrialEmailLog (app: `billing`)

| Pole            | Typ           | Ograniczenia             |
|-----------------|---------------|--------------------------|
| subscription    | FK            | -> Subscription          |
| email_type      | CharField     | np. trial_ending_7d      |
| sent_at         | DateTimeField | auto_now_add             |
| recipient_email | EmailField    |                          |

**Unique constraint:** `(subscription, email_type)`

---

## 4. MongoDB -- kolekcje i indeksy

### Kolekcja `gps_points`

Przechowuje surowe punkty GPS rejestrowane przez aplikacje mobilna podczas trasy.

```json
{
  "trip_id":          "ObjectId / UUID",
  "company_id":       "int",
  "driver_id":        "int",
  "vehicle_id":       "int",
  "location":         { "type": "Point", "coordinates": [lng, lat] },
  "latitude":         20.123456,
  "longitude":        50.654321,
  "altitude":         230.5,
  "speed":            65.2,
  "bearing":          180.0,
  "accuracy":         4.5,
  "timestamp":        "ISODate",
  "server_timestamp": "ISODate",
  "battery_level":    82,
  "is_moving":        true,
  "source":           "gps / network / fused",
  "batch_id":         "UUID"
}
```

**Indeksy:**

| Indeks                          | Typ          | Cel                                        |
|---------------------------------|--------------|--------------------------------------------|
| `location`                      | 2dsphere     | Zapytania geospatial (np. trasa na mapie)  |
| `(trip_id, timestamp)`          | compound     | Pobranie punktow trasy w kolejnosci        |
| `timestamp`                     | TTL (90 dni) | Automatyczne usuwanie starych danych       |
| `batch_id`                      | single       | Idempotentnosc przy ponownym wysylaniu     |
| `(company_id, vehicle_id, timestamp)` | compound | Zapytania raportowe po firmie/pojezdzie |

---

## 5. Redis -- logiczne bazy danych

| DB  | Przeznaczenie                | Przykladowe klucze                               |
|-----|------------------------------|--------------------------------------------------|
| 0   | Cache API, liczniki uzycia   | `cache:company:{id}:vehicles`, `usage:{company}:{month}:trips` |
| 1   | Celery broker                | Kolejki zadan: generowanie raportow, alerty, eksporty |
| 2   | Blacklist tokenow JWT, token families | `token_blacklist:{jti}`, `token_family:{family_id}` |

Klucze w DB 0 korzystaja z TTL dostosowanego do typu danych (np. 5 min dla list pojazdow, 1h dla raportow). DB 2 uzywa TTL rownego czasowi wygasniecia tokena refresh.

---

## 6. Relacje i klucze obce

Kluczowe relacje w systemie:

- **Company** jest centralnym wezlem -- wiekszosc modeli posiada FK do Company (izolacja danych tenant).
- **User -> Company**: FK, nullable (konta biur rachunkowych moga nie miec przypisanej firmy transportowej).
- **Driver -> User**: OneToOne -- kazdy kierowca jest powiazany z kontem uzytkownika.
- **Subscription -> Company**: OneToOne -- kazda firma ma dokladnie jedna subskrypcje.
- **AccountingFirm -> Company**: OneToOne -- firma ksiegowa to rozszerzenie encji Company.
- **AccountingFirmClient**: tabela posrednia laczaca biuro rachunkowe z firmami-klientami.
- **Trip -> Driver, Vehicle**: FK -- kazda trasa przypisana do kierowcy i pojazdu.
- **Alert -> Vehicle, Driver, VehicleDocument**: nullable FK -- alert moze dotyczyc pojazdu, kierowcy lub dokumentu.

Wszystkie klucze obce uzywaja `on_delete=CASCADE` lub `on_delete=SET_NULL` (dla pol nullable), zgodnie z logika biznesowa.

---

## 7. Indeksy i constrainty

### Unique constraints warunkowe (partial unique index)

```sql
-- NIP firmy unikalny tylko gdy niepusty
CREATE UNIQUE INDEX uq_company_nip ON companies_company (nip) WHERE nip != '';

-- Numer rejestracyjny unikalny w ramach firmy (aktywne pojazdy)
CREATE UNIQUE INDEX uq_vehicle_plate ON fleet_vehicle (company_id, plate_number)
    WHERE is_deleted = FALSE;

-- Numer prawa jazdy kierowcy unikalny gdy niepusty
CREATE UNIQUE INDEX uq_driver_license ON drivers_driver (license_number)
    WHERE license_number != '';

-- Jeden aktywny alert na dokument danego typu
CREATE UNIQUE INDEX uq_alert_doc_type ON fleet_alert (document_id, alert_type)
    WHERE status IN ('active', 'acknowledged');
```

### Indeksy wydajnosciowe

- `Trip`: indeks na `(company_id, start_time)` -- filtrowanie tras po dacie.
- `Trip`: indeks na `(driver_id, status)` -- aktywne trasy kierowcy.
- `Alert`: indeks na `(company_id, status, severity)` -- dashboard alertow.
- `UsageSnapshot`: indeks na `(company_id, month)` -- unique + szybkie odczyty.

---

## 8. Wzorzec soft delete

Modele z soft delete: **Company**, **Vehicle**, **VehicleDocument**, **Driver**, **DriverDocument**.

Implementacja:

```python
class SoftDeleteManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)

class SoftDeleteModel(models.Model):
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeleteManager()          # domyslny -- bez usunietych
    all_with_deleted = models.Manager()    # wszystkie rekordy

    def soft_delete(self):
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save(update_fields=['is_deleted', 'deleted_at'])

    class Meta:
        abstract = True
```

Rekord oznaczony jako usuniety:
- Nie pojawia sie w domyslnych querysetach (`objects`).
- Zachowuje integralnosc referencyjna (FK nie sa kasowane).
- Moze zostac przywrocony przez admina.
- Unique constraints uwzgledniaja flage `is_deleted` (partial index).

---

## 9. Migracje -- konwencje

- Kazda aplikacja Django (`accounts`, `companies`, `fleet`, `drivers`, `trips`, `documents`, `integrations`, `notifications`, `common`, `billing`) zarzadza wlasnymi migracjami.
- Migracje generowane przez `python manage.py makemigrations` -- nie edytowane recznie, chyba ze wymagana jest migracja danych (`RunPython`).
- Migracje danych (data migrations) stosowane do: seedowania planow subskrypcji, migracji istniejacych rekordow po zmianie schematu, wypelniania pol zdenormalizowanych.
- Srodowisko CI uruchamia `python manage.py migrate --check` aby wykryc brakujace migracje.
- Nazewnictwo: automatyczne (np. `0001_initial`, `0002_add_fleet_size`). Migracje danych nazywane opisowo: `0003_populate_fleet_size`.
