# Integracja z systemami FK (finansowo-księgowymi)

## Spis treści

1. [Przegląd](#przegląd)
2. [Architektura](#architektura)
3. [Modele danych FK](#modele-danych-fk)
4. [Stawki za km (MileageRate)](#stawki-za-km-mileagerate)
5. [Insert GT — format EPP (EDI++)](#insert-gt--format-epp-edi)
6. [Comarch ERP Optima — format XML](#comarch-erp-optima--format-xml)
7. [Symfonia FK — format TXT/AMS](#symfonia-fk--format-txtams)
8. [Endpointy eksportu](#endpointy-eksportu)
9. [Walidacja przed eksportem](#walidacja-przed-eksportem)
10. [Throttling i limity](#throttling-i-limity)
11. [AuditLog — dziennik audytowy](#auditlog--dziennik-audytowy)
12. [Import w systemach FK](#import-w-systemach-fk)
13. [Rozwiązywanie problemów](#rozwiązywanie-problemów)

---

## Przegląd

BusiKM umożliwia eksport danych ewidencji przebiegu i faktur paliwowych do polskich systemów finansowo-księgowych (FK). Celem jest eliminacja ręcznego przepisywania danych — użytkownik generuje plik eksportu w BusiKM, a następnie importuje go w swoim systemie FK.

**Zaimplementowane integracje:**
- **Insert GT** — eksport w formacie EPP (EDI++ 1.05.1), plik `.epp`
- **Comarch ERP Optima** — eksport XML, import przez UI Comarch
- **Symfonia FK** — eksport TXT z szablonem AMS, import specjalny

**Podstawa prawna ewidencji:**
- art. 86a ustawy o VAT (odliczenie 50% vs 100% VAT)
- art. 23 ust. 7 ustawy o PIT (koszty pojazdu)
- druk VAT-26 (zgłoszenie pojazdu do US)
- Rozp. MI 22.12.2022 (Dz.U. 2023 poz. 5) — stawki km od 17.01.2023

---

## Architektura

### Serwisy generatorów

```
busikm/services/
  epp_generator.py     # Insert GT — EPP/EDI++ Windows-1250
  xml_generator.py     # Comarch ERP Optima — UTF-8 XML
  txt_generator.py     # Symfonia FK — UTF-8 TXT + szablon AMS
  export_service.py    # Orchestrator — łączy generatory z DB i AuditLog
  export_validator.py  # Walidacja stanu danych przed eksportem
```

### ExportService — orchestrator

```python
service = ExportService(company, period_year, period_month, user)
result = service.export_insert_gt()
result = service.export_comarch()
result = service.export_symfonia(include_ams=True)
```

Każda metoda wykonuje w `transaction.atomic()`:
1. Generuje plik przez odpowiedni generator
2. Oznacza `MonthlyMileageSummary.status = 'exported'`
3. Blokuje faktury paliwowe (`FuelInvoice.is_locked = True`)
4. Tworzy rekord `AuditLog` z `action='export_generated'`

---

## Modele danych FK

### MonthlyMileageSummary

Miesięczne podsumowanie ewidencji przebiegu per pojazd.

| Pole | Opis |
|---|---|
| `vehicle`, `company` | FK do pojazdu i firmy |
| `period_year`, `period_month` | Rok i miesiąc okresu |
| `odometer_start`, `odometer_end` | Stany licznika |
| `total_km_business` | Łączne km służbowe |
| `total_km_private` | Łączne km prywatne |
| `rate_per_km` | Stawka km (snapshot) |
| `total_cost_pit` | Koszt PIT łączny |
| `status` | `draft / pending / approved / exported` |
| `has_unconfirmed_trips` | Flaga — czy są niezatwierdzone trasy |
| `exported_insert_at` | Timestamp eksportu Insert GT |
| `exported_comarch_at` | Timestamp eksportu Comarch |
| `exported_symfonia_at` | Timestamp eksportu Symfonia |

**Metody:** `recalculate()`, `approve(user)`, `mark_exported(fk_system, filename)`

### FuelInvoice

Faktury paliwowe i eksploatacyjne pojazdu.

| Pole | Opis |
|---|---|
| `invoice_number`, `invoice_date` | Numer i data faktury |
| `vendor_nip`, `vendor_name_short` | Dane dostawcy |
| `amount_net`, `vat_rate` | Kwota netto i stawka VAT |
| `vat_amount`, `amount_gross` | Kwoty obliczane automatycznie |
| `vat_deduction_pct` | Snapshot % odliczenia z pojazdu |
| `vat_deductible_amount` | Kwota VAT do odliczenia |
| `is_locked` | Blokada po eksporcie do FK |
| `epp_description` | Opis do EPP (computed) |
| `vat_symbol_epp` | Symbol VAT dla EPP: `23`, `8`, `zw` |

Unique constraint: `(company, invoice_number)`

### MileageRate

Immutable tabela stawek km z historią.

| Pole | Opis |
|---|---|
| `vehicle_type` | `car / motorcycle / moped` |
| `engine_capacity_max_cc` | Max pojemność (null = bez limitu) |
| `rate_per_km` | Stawka w PLN |
| `valid_from` | Data wejścia w życie |
| `valid_to` | Data wygaśnięcia (null = aktualny) |
| `is_active` | Czy stawka jest aktywna |
| `regulation_ref` | Odniesienie do rozporządzenia |

**Zasada immutability:** Rekordy nigdy nie są edytowane ani usuwane — tylko dodawane. `save()` i `delete()` na istniejącym rekordzie rzucają `PermissionError`.

**Metoda:** `MileageRate.get_rate_for_vehicle(vehicle_type, engine_capacity_cc, trip_date)` — zwraca stawkę obowiązującą w dniu przejazdu.

### AuditLog

Nienaruszalny dziennik zmian dokumentów podatkowych (FK-011).

Każda operacja na danych podatkowych (zmiana trasy, eksport, zatwierdzenie, zmiana VAT-26) jest automatycznie logowana. Rekordy są read-only — `save()` na istniejącym i `delete()` rzucają `PermissionError`. IP adresy anonimizowane po 90 dniach (RODO).

---

## Stawki za km (MileageRate)

Rozporządzenie Ministra Infrastruktury z 22.12.2022 r. (Dz.U. 2023 poz. 5), obowiązuje od 17.01.2023:

| Kategoria pojazdu | Stawka za km (PLN) |
|---|---|
| Samochód osobowy ≤ 900 cm³ | **0,89** |
| Samochód osobowy > 900 cm³ | **1,15** |
| Motocykl | **0,69** |
| Motorower | **0,42** |

Poprzednie stawki (2007–2023, Rozp. MI 23.10.2007):

| Kategoria | Stawka |
|---|---|
| Samochód ≤ 900 cm³ | 0,5214 PLN/km |
| Samochód > 900 cm³ | 0,8358 PLN/km |
| Motocykl | 0,2302 PLN/km |
| Motorower | 0,1382 PLN/km |

**Algorytm query:**
```python
MileageRate.get_rate_for_vehicle(
    vehicle_type='car',
    engine_capacity_cc=1600,
    trip_date=date(2026, 10, 15)
)
# Filtruje: valid_from <= trip_date
# Priorytet: stawki z limitem cc (engine_capacity_max_cc NOT NULL)
# Sortuje: najnowsza valid_from najpierw
# Zwraca: first() lub None
```

Snapshot stawki zapisywany w `Trip.rate_per_km` w momencie zapisu trasy i nigdy nie zmienia się retroaktywnie.

---

## Insert GT — format EPP (EDI++)

### Wymagania techniczne

| Parametr | Wartość |
|---|---|
| Rozszerzenie | `.epp` |
| Kodowanie | **Windows-1250** (cp1250) |
| Separator pól | przecinek `,` |
| Separator dziesiętny | kropka `.` (np. `513.00`) |
| Format daty | `yyyymmddhhnnss` |
| Specyfikacja | EDI++ 1.05.1 |

**Uwaga krytyczna:** Kodowanie musi być Windows-1250. Pliki UTF-8 spowodują błędy polskich znaków w Insert GT.

### Struktura pliku

```
[INFO]           ← dane firmy, wersja, okres
[NAGLOWEK]       ← nagłówek dokumentu FZ (per faktura)
[ZAWARTOSC]      ← stawki VAT per pozycja
[NAGLOWEK]       ← nagłówek dokumentu KM (kilometrówka)
[ZAWARTOSC]      ← stawka npo (nie podlega VAT)
[NAGLOWEK]
KONTRAHENCI      ← kartoteka dostawców
[ZAWARTOSC]      ← jeden rekord per unikalny NIP
[NAGLOWEK]
PRACOWNICY       ← kartoteka kierowców (Tabela 16)
[ZAWARTOSC]      ← PESEL, NIP, adres, zatrudnienie
```

### Nazwa pliku

Format: `busikm_{NIP}_{YYYY}_{MM}.epp`  
Przykład: `busikm_5260211183_2026_10.epp`

### Klasa EPPGenerator

```python
from busikm.services.epp_generator import EPPGenerator

gen = EPPGenerator(company, period_year=2026, period_month=10)
content_bytes = gen.generate_bytes()  # bytes w cp1250
filename = gen.get_filename()
```

---

## Comarch ERP Optima — format XML

### Wymagania techniczne

| Parametr | Wartość |
|---|---|
| Rozszerzenie | `.xml` |
| Kodowanie | UTF-8 |
| Format daty | `YYYY-MM-DD` |
| Separator dziesiętny | kropka `.` |

### Struktura XML

```xml
<BusiKMExport wersja="1.0" system="ComarchERPOptima">
  <Naglowek>
    <Firma><NIP>...</NIP>...</Firma>
    <Okres>2026-10</Okres>
  </Naglowek>
  <Dokumenty>
    <Dokument typ="FZ">   ← per faktura paliwowa
      <NumerFaktury>...</NumerFaktury>
      <Kontrahent>...</Kontrahent>
      <Kwoty><Pozycja>...</Pozycja></Kwoty>
    </Dokument>
    <Dokument typ="KM">   ← ewidencja przebiegu
      <EwidencjaPrzebiegu>...</EwidencjaPrzebiegu>
      <Trasy>
        <Trasa>...</Trasa>  ← per przejazd
      </Trasy>
    </Dokument>
  </Dokumenty>
</BusiKMExport>
```

Import: Comarch ERP Optima → Narzędzia → Importy → Import z pliku XML

---

## Symfonia FK — format TXT/AMS

### Wymagania techniczne

| Parametr | Wartość |
|---|---|
| Rozszerzenie | `.txt` |
| Kodowanie | UTF-8 |
| Separator pól | średnik `;` |
| Separator dziesiętny | **przecinek** `,` (np. `513,00`) |
| Format daty | `DD-MM-YYYY` |

### Typy rekordów

| Typ | Opis | Pola |
|---|---|---|
| `DOK` | Nagłówek dokumentu (FZ lub KM) | 13 pól |
| `VAT` | Rejestr VAT per stawka | 7 pól |
| `ZAP` | Zapis dodatkowy — trasa lub podsumowanie | 12 pól |
| `KON` | Dane kontrahenta | 7 pól |

Linie zaczynające się od `#` to komentarze — ignorowane przez AMS.

### Szablon AMS

Plik `busikm_symfonia.ams` generowany opcjonalnie wraz z TXT (`include_ams=True`). Definiuje mapowanie kolumn TXT na pola Symfonii. Należy skopiować do katalogu szablonów Symfonii i wskazać przy pierwszym imporcie.

Gdy `include_ams=True` — endpoint zwraca ZIP zawierający oba pliki.

Import: Symfonia FK → Księgowość → Import specjalny → wskaż `.txt` i `.ams`

---

## Endpointy eksportu

### Wspólna konwencja

Wszystkie endpointy:
- **Metoda:** `POST`
- **Period w URL:** format `YYYY-MM` (np. `2026-10`) — tylko zakończone miesiące
- **Body:** JSON z `company_id` i opcjonalnym `force`
- **Throttle:** max **3 eksporty per firma per miesiąc** per system FK
- **Response headers:** `X-Invoices-Count`, `X-KM-Included`, `X-Warnings`, `X-Export-Period`

### Insert GT

```
POST /api/exports/insert-gt/{period}/
Body: {"company_id": 123, "force": false}
Response: plik .epp (application/octet-stream)
Header: Content-Disposition: attachment; filename="busikm_5260211183_2026_10.epp"
```

### Comarch ERP Optima

```
POST /api/exports/comarch/{period}/
Body: {"company_id": 123, "force": false}
Response: plik .xml (application/xml)
```

### Symfonia FK

```
POST /api/exports/symfonia/{period}/
Body: {"company_id": 123, "force": false, "include_ams": false}
Response: plik .txt (text/plain) lub .zip gdy include_ams=true
Header: X-AMS-Included: true|false
```

### Kody odpowiedzi

| Kod | Opis |
|---|---|
| 200 | Plik do pobrania |
| 400 | Błąd walidacji (nieprawidłowy period, brak company_id, zły fk_system) |
| 401 | Brak autoryzacji |
| 403 | Brak dostępu do firmy |
| 422 | Dane nie gotowe (summary nie approved, brak danych) |
| 429 | Throttle — max 3 eksporty/mies. |

---

## Walidacja przed eksportem

`ExportValidator` sprawdza przed każdym eksportem:

**Błędy blokujące (→ 422):**
- Brak faktur paliwowych i brak summary dla okresu
- Firma używa innego systemu FK niż endpoint

**Ostrzeżenia (→ 200 + `X-Warnings`):**
- Summary nie jest `approved` (dozwolone tylko z `force=True` przez superusera)
- Niezatwierdzone trasy w miesiącu
- Niekompletne trasy (brak odometer_end)
- Okres był już eksportowany do tego systemu FK

---

## Throttling i limity

Każdy system FK ma osobny licznik w Redis cache:

```
Klucz: export_{fk_system}_{company_id}_{YYYY}_{MM}
Limit: 3 eksporty per firma per miesiąc
```

Po 3 eksportach endpoint zwraca `429 Too Many Requests`. Licznik resetuje się automatycznie po 31 dniach.

---

## AuditLog — dziennik audytowy

Każdy eksport tworzy rekord `AuditLog`:

```python
AuditLog.create_log(
    action='export_generated',
    obj=summary,
    performed_by=user,
    extra_data={
        'fk_system': 'insert_gt',
        'file_name': 'busikm_5260211183_2026_10.epp',
        'records_count': 5,
        'km_included': True,
        'period': '2026-10',
    }
)
```

Logi audytowe dostępne przez:
- `GET /api/audit-logs/` (admin)
- `GET /api/audit-logs/for-object/?model=monthlymileagesummary&object_id=123`
- `GET /api/audit-logs/compliance-report/?company=1&date_from=2026-10-01&date_to=2026-10-31`

---

## Import w systemach FK

### Insert GT (Subiekt GT / Rachmistrz GT / nexo)

1. Otwórz Insert GT
2. Przejdź do **Narzędzia → Import danych → Import EDI++**
3. Wskaż pobrany plik `.epp`
4. Zweryfikuj podgląd danych
5. Kliknij **Importuj**

### Comarch ERP Optima

1. Otwórz Comarch ERP Optima
2. Przejdź do **Narzędzia → Importy → Import z pliku XML**
3. Wskaż pobrany plik `.xml`
4. Zatwierdź import

### Symfonia FK (pierwsze uruchomienie)

1. Skopiuj `busikm_symfonia.ams` do katalogu szablonów Symfonii
2. Otwórz Symfonia FK → **Księgowość → Import specjalny**
3. Wskaż plik `.txt` i szablon `busikm_symfonia.ams`
4. Zatwierdź import

Kolejne importy — już bez kroku z szablonu AMS.

---

## Rozwiązywanie problemów

### Problem: Polskie znaki nieprawidłowe w Insert GT

**Przyczyna:** Plik w UTF-8 zamiast Windows-1250.  
**Sprawdź:** `file -bi plik.epp` — powinno zwrócić `charset=windows-1250`

### Problem: Insert GT odrzuca plik „Nieprawidłowy format"

**Przyczyna:** Brak wymaganej sekcji lub błędna kolejność.  
**Sprawdź:** Obecność `[INFO]`, `[NAGLOWEK]`, `[ZAWARTOSC]`

### Problem: Kwoty w Symfonii są błędne

**Przyczyna:** Separator dziesiętny — kropka zamiast przecinka.  
**Oczekiwane:** `513,00` (przecinek), nie `513.00`

### Problem: Eksport zwraca 422

**Przyczyna:** Summary nie jest w statusie `approved`.  
**Rozwiązanie:** Zatwierdź podsumowanie miesięczne przez `POST /api/monthly-summaries/{id}/approve/` lub użyj `"force": true` (tylko superuser).

### Problem: Eksport zwraca 429

**Przyczyna:** Przekroczony limit 3 eksportów/mies.  
**Rozwiązanie:** Poczekaj do kolejnego miesiąca lub skontaktuj się z adminem.
