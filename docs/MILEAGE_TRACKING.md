# BusiKM — Moduł ewidencji przebiegu pojazdów

> Nowy dokument — opisuje kompletny moduł ewidencji przebiegu zgodny z art. 86a ustawy o VAT.
> Implementacja: Sprint 4, BKM-121–BKM-149.

---

## 1. Podstawa prawna

| Przepis | Dotyczy |
|---|---|
| art. 86a ustawy o VAT | Ewidencja przebiegu, 50% vs 100% odliczenie VAT |
| art. 23 ust. 7 ustawy o PIT | Koszty pojazdu w działalności |
| druk VAT-26 | Zgłoszenie pojazdu do US jako wyłącznie służbowego |
| Rozp. MI 22.12.2022 (Dz.U. 2023 poz. 5) | Stawki za km od 17.01.2023 |

### Kiedy 100% VAT?

Aby odliczyć 100% VAT od paliwa i kosztów eksploatacyjnych pojazdu osobowego, firma musi:
1. Złożyć druk VAT-26 do US (termin: 7 dni od pierwszego wydatku)
2. Prowadzić ewidencję przebiegu (kilometrówkę) dla każdego przejazdu
3. Wykluczyć prywatne użycie pojazdu (regulamin)
4. Pojazd zarejestrowany jako środek trwały firmy

Bez VAT-26 → tylko 50% VAT od wszystkich kosztów pojazdu.

---

## 2. Workflow ewidencji

### Dla firmy (właściciel/dyspozytor)

```
1. Dodaj pojazd do floty
   ↓
2. Zgłoś VAT-26 (opcjonalne — dla 100% odliczenia)
   ↓
3. Zaproś kierowcę (email)
   ↓
4. Kierowca rejestruje trasy (aplikacja mobilna)
   ↓
5. Właściciel zatwierdza trasy
   ↓
6. Na koniec miesiąca: zatwierdź podsumowanie
   ↓
7. Eksportuj do systemu FK
```

### Dla kierowcy (aplikacja mobilna)

```
1. Rozpocznij trasę (Start) → zdjęcie licznika start
2. GPS śledzi przejazd w tle
3. Zakończ trasę (Stop) → zdjęcie licznika koniec
4. Wpisz cel wyjazdu (służbowy) lub oznacz jako prywatny
5. Potwierdź trasę
```

---

## 3. Model Trip — pola ewidencji art. 86a

Każda trasa służbowa musi zawierać zgodnie z art. 86a ust. 7:
- datę wyjazdu
- cel wyjazdu (opis)
- trasa (skąd–dokąd)
- liczbę przejechanych km
- stan licznika na początku i końcu trasy
- podpis kierowcy i właściciela

BusiKM implementuje to przez:

| Pole Trip | Wymóg prawny | Uwagi |
|---|---|---|
| `date` | data wyjazdu | |
| `trip_purpose` | cel wyjazdu | wymagany dla `trip_type=business` |
| `origin_address` | trasa skąd | |
| `destination_address` | trasa dokąd | |
| `odometer_start`, `odometer_end` | stan licznika | |
| `distance_km` | km | obliczane automatycznie |
| `driver_confirmed_at` | podpis kierowcy | |
| `owner_confirmed_at` | podpis właściciela | |

---

## 4. System potwierdzeń

### Statusy confirmation_status

```
pending_driver → pending_owner → confirmed → exported
      ↑               ↑
   (po edycji)    (po cofnięciu)
```

| Status | Opis |
|---|---|
| `pending_driver` | Nowa trasa — czeka na potwierdzenie kierowcy |
| `pending_owner` | Kierowca potwierdził — czeka na właściciela |
| `confirmed` | Oba potwierdzenia — gotowa do eksportu |
| `exported` | Wyeksportowana do FK — zablokowana |

### Reguły

- Edycja pól `trip_purpose`, `odometer_end`, `origin_address`, `destination_address` → automatyczne **cofnięcie potwierdzeń**
- Wyeksportowana trasa (`exported`) → **niemożliwa do edycji**
- Bulk confirm: `POST /trips/confirm-owner-bulk/` — zatwierdza wszystkie trasy `pending_owner` za dany miesiąc i pojazd

### TripConfirmationLog

Każda zmiana statusu potwierdzenia jest logowana w `TripConfirmationLog` (immutable) i `AuditLog`.

---

## 5. Snapshot stawki km

Przy zapisie trasy BusiKM automatycznie:
1. Pobiera aktualną stawkę: `MileageRate.get_rate_for_vehicle(vehicle_type, engine_cc, trip_date)`
2. Zapisuje snapshot: `Trip.rate_per_km = rate.rate_per_km`
3. Oblicza koszt: `Trip.trip_cost = distance_km × rate_per_km` (ROUND_HALF_UP)
4. Zapisuje odniesienie: `Trip.rate_source`, `Trip.rate_regulation_ref`

**Snapshot jest immutable** — zmiana stawek w tabeli `MileageRate` nie wpływa na historyczne trasy. Tylko `recalculate_cost(force=True)` może zaktualizować snapshot (logowane w AuditLog).

---

## 6. MonthlyMileageSummary

### Obliczanie agregatorów

`recalculate()` sumuje z Trip:
- `total_km_business` — wszystkie trasy `trip_type=business` z `distance_km IS NOT NULL`
- `total_cost_pit` — trasy `confirmed` lub `exported` (tylko zatwierdzone)
- `has_unconfirmed_trips` — czy są trasy `pending_driver` lub `pending_owner`

### Zatwierdzenie

`approve(user)` blokuje gdy:
- `has_unconfirmed_trips = True` → błąd 422
- `has_incomplete_trips = True` → błąd 422

### Eksport

`mark_exported(fk_system, filename)`:
- Ustawia `exported_{fk_system}_at = now()`
- Zmienia `status = 'exported'`
- Zmienia `confirmation_status` wszystkich tras na `'exported'`

---

## 7. VAT-26 i vat_deduction_pct

### Mechanizm

```python
vehicle.vat26_registered = False → vat_deduction_pct = 50
vehicle.vat26_registered = True  → vat_deduction_pct = 100
```

Snapshot `vat_deduction_pct` jest kopiowany do każdej `FuelInvoice` przy jej tworzeniu. Zmiana statusu VAT-26 pojazdu **nie zmienia** historycznych faktur.

### Alert VAT-26

Przy dodaniu pojazdu (POST /vehicles/) gdy `vat26_registered=False`:

```json
"vat26_onboarding_alert": {
  "show": true,
  "title": "Pamiętaj o zgłoszeniu VAT-26",
  "message": "Bez zgłoszenia możesz odliczyć tylko 50% VAT...",
  "legal_basis": "art. 86a ust. 12 ustawy o VAT"
}
```

Właściwości `vat26_alert` i `vat26_alert_message` dostępne zawsze w response GET /vehicles/{id}/.

---

## 8. Walidacje biznesowe

### OdometerValidator

1. `odometer_start >= 0`
2. `odometer_end >= odometer_start`
3. `odometer_start >= vehicle.odometer_initial`
4. Ciągłość z poprzednią trasą (`odometer_start >= poprzedni odometer_end`)
5. Ciągłość między miesiącami
6. Spójność `distance_km = odometer_end - odometer_start`

### VATValidator

7. Stawka VAT z dozwolonych: 23%, 8%, 5%, 0%, -1% (zw)
8. Spójność kwot: `vat_amount = netto × rate%` (tolerancja 0.01 PLN)
9. Poprawność `vat_deductible_amount = vat_amount × pct%`
10. VAT-26 wymagany dla 100% odliczenia
11. Faktura nie może być przed datą VAT-26

### MileageRateValidator

12. Trasa służbowa powinna mieć stawkę km (warning gdy brak)
13. `trip_cost = distance_km × rate_per_km` (tolerancja 0.01 PLN)
14. Snapshot rate_per_km zgodny z tabelą (warning gdy rozbieżność)
15. `rate_per_km > 0`
16. Suma `trip_cost` w miesiącu = `total_cost_pit` w summary

### ContinuityValidator

17. Brak przerw w miesięcznych podsumowaniach
18. Wszystkie trasy potwierdzone przed approve()
19. Brak nakładających się tras (overlapping trips)
20. Data trasy >= `vehicle.evidencja_start_date`
21. Suma km z tras = `total_km_business` w summary

---

## 9. AuditLog — co jest logowane

| Akcja | Kiedy |
|---|---|
| `create` | Nowa trasa, pojazd, faktura |
| `update` | Zmiana pola w AUDITED_FIELDS |
| `vat26_registered` | Zgłoszenie VAT-26 |
| `vat26_unregistered` | Cofnięcie VAT-26 |
| `trip_confirmed_driver` | Potwierdzenie kierowcy |
| `trip_confirmed_owner` | Zatwierdzenie właściciela |
| `trip_unconfirmed` | Cofnięcie potwierdzenia |
| `invoice_exported` | Faktura wyeksportowana |
| `summary_approved` | Podsumowanie zatwierdzone |
| `summary_exported` | Podsumowanie wyeksportowane |
| `export_generated` | Wygenerowano plik FK |
| `rate_force_updated` | Zmiana stawki km (force) |

Pola wrażliwe (`pesel`, `nip`) są maskowane: `old_value='[ENCRYPTED]'`, `new_value='[UPDATED]'`.
IP adresy anonimizowane po 90 dniach (Celery task `anonymize_old_audit_logs` codziennie o 03:00).

---

## 10. Zarządzanie stawkami km

### Aktualnie obowiązujące (od 17.01.2023)

| Pojazd | Stawka |
|---|---|
| Samochód ≤ 900 cm³ | **0,89 PLN/km** |
| Samochód > 900 cm³ | **1,15 PLN/km** |
| Motocykl | **0,69 PLN/km** |
| Motorower | **0,42 PLN/km** |

### Procedura aktualizacji stawek

Przy zmianie rozporządzenia:

```bash
# 1. Sprawdź aktualne stawki
python manage.py verify_mileage_rates

# 2. Dodaj nową stawkę (nie edytuj istniejącej!)
python manage.py add_mileage_rate \
  --vehicle-type car \
  --engine-cc-max 900 \
  --rate 0.99 \
  --valid-from 2027-01-01 \
  --regulation "Rozp. MI DD.MM.RRRR (Dz.U. RRRR poz. N)"

# 3. Zweryfikuj
python manage.py verify_mileage_rates
```

**Nigdy nie edytuj istniejących rekordów MileageRate** — tabela jest immutable.
