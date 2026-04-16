# Integracja z systemami FK (finansowo-księgowymi)

## Spis treści

1. [Przegląd](#przegląd)
2. [Architektura](#architektura)
3. [Insert GT — format EDI++](#insert-gt--format-edi)
4. [Insert GT — struktura pliku kilometrówki](#insert-gt--struktura-pliku-kilometrówki)
5. [Insert GT — struktura pliku delegacji](#insert-gt--struktura-pliku-delegacji)
6. [Mapowanie BusiKM → EDI++](#mapowanie-busikm--edi)
7. [Kodowanie znaków](#kodowanie-znaków)
8. [Endpoint i przepływ eksportu](#endpoint-i-przepływ-eksportu)
9. [Import w Insert GT](#import-w-insert-gt)
10. [Historia eksportów](#historia-eksportów)
11. [Rozwiązywanie problemów](#rozwiązywanie-problemów)
12. [Planowane integracje (post-MVP)](#planowane-integracje-post-mvp)
13. [Stawki za km](#stawki-za-km)

---

## Przegląd

BusiKM umożliwia eksport danych kilometrówek i delegacji do polskich systemów finansowo-księgowych (FK). Celem jest eliminacja ręcznego przepisywania danych — użytkownik generuje plik eksportu w BusiKM, a następnie importuje go w swoim systemie FK.

**MVP (Sprint 5-6):**
- **Insert GT** — eksport w formacie EDI++ (pliki `.epp`)

**Post-MVP (Sprint 7+):**
- **Comarch ERP Optima** — synchronizacja przez REST API
- **Symfonia** — eksport XML/CSV
- **KSeF** — integracja z Krajowym Systemem e-Faktur (e-faktury)

---

## Architektura

System integracji oparty jest na wzorcu **Strategy**, co umożliwia dodawanie nowych systemów FK bez modyfikacji istniejącego kodu.

### Klasy bazowe

```python
class AbstractFKIntegration(ABC):
    """Bazowa klasa abstrakcyjna dla wszystkich integracji FK."""

    @abstractmethod
    def export_mileage_log(self, mileage_log: MileageLog) -> bytes:
        """Generuje plik eksportu kilometrówki."""

    @abstractmethod
    def export_delegation(self, delegation: Delegation) -> bytes:
        """Generuje plik eksportu delegacji."""

    @abstractmethod
    def validate_data(self, data: dict) -> list[str]:
        """Waliduje dane przed eksportem. Zwraca listę błędów."""

    @abstractmethod
    def get_file_extension(self) -> str:
        """Zwraca rozszerzenie pliku eksportu."""
```

### Factory i rejestr

```python
# Rejestr integracji z dekoratorem
_INTEGRATION_REGISTRY: dict[str, type[AbstractFKIntegration]] = {}

def register_integration(name: str):
    """Dekorator rejestrujący klasę integracji."""
    def decorator(cls):
        _INTEGRATION_REGISTRY[name] = cls
        return cls
    return decorator

class FKIntegrationFactory:
    @staticmethod
    def create(system_name: str, context: dict) -> AbstractFKIntegration:
        """Tworzy instancję integracji na podstawie nazwy systemu."""
        cls = _INTEGRATION_REGISTRY.get(system_name)
        if cls is None:
            raise ValueError(f"Nieznany system FK: {system_name}")
        return cls(context)
```

### Dodawanie nowego systemu

Dodanie obsługi nowego systemu FK wymaga wyłącznie utworzenia nowej klasy — zero zmian w istniejącym kodzie:

```python
@register_integration('comarch_optima')
class ComarchOptimaIntegration(AbstractFKIntegration):
    # implementacja metod...
```

Użycie:

```python
integration = FKIntegrationFactory.create('insert_gt', context)
file_bytes = integration.export_mileage_log(mileage_log)
```

---

## Insert GT — format EDI++

Insert GT (produkt firmy InsERT) korzysta z formatu wymiany danych **EDI++**. Pliki mają rozszerzenie `.epp`.

### Wymagania techniczne formatu

| Parametr             | Wartość                          |
|----------------------|----------------------------------|
| Rozszerzenie pliku   | `.epp`                           |
| Kodowanie            | **Windows-1250** (NIE UTF-8!)    |
| Końce linii          | **CRLF** (`\r\n`)               |
| Separator dziesiętny | **przecinek** (np. `0,8358`)     |
| Format daty          | `YYYY-MM-DD` (np. `2026-04-15`) |
| Separator pól        | znak `=` (klucz=wartość)         |
| Komentarze           | linie zaczynające się od `;`     |

**Uwaga krytyczna:** Kodowanie musi być Windows-1250. Pliki w UTF-8 spowodują błędy importu w Insert GT — polskie znaki diakrytyczne będą wyświetlane nieprawidłowo.

---

## Insert GT — struktura pliku kilometrówki

Plik `.epp` kilometrówki składa się z sekcji oznaczonych nawiasami kwadratowymi.

### Przykładowy plik

```
; BusiKM - eksport kilometrówki do Insert GT
; Wygenerowano: 2026-04-15 10:30:00

[NAGLOWEK]
WERSJA=1.0
TYP=KILOMETROWKA
DATA_EKSPORTU=2026-04-15
SYSTEM=BusiKM
WERSJA_SYSTEMU=1.2.0

[FIRMA]
NIP=5261234567
NAZWA=Przykładowa Firma Sp. z o.o.
ADRES=ul. Marszałkowska 1
KOD_POCZTOWY=00-001
MIASTO=Warszawa

[POJAZD]
NUMER_REJESTRACYJNY=WA12345
MARKA=Toyota
MODEL=Corolla
POJEMNOSC=1496
KATEGORIA=SAMOCHOD_POWYZEJ_900
STAWKA_ZA_KM=0,8358
WLASCICIEL=PRACOWNIK

[OKRES]
DATA_OD=2026-04-01
DATA_DO=2026-04-30
MIESIAC=4
ROK=2026

[POZYCJA]
LP=1
DATA=2026-04-01
TRASA_SKAD=Warszawa, ul. Marszałkowska 1
TRASA_DOKAD=Warszawa, ul. Puławska 100
CEL_WYJAZDU=Spotkanie z klientem ABC
KILOMETRY=12,50
STAWKA=0,8358
KWOTA=10,45

[POZYCJA]
LP=2
DATA=2026-04-02
TRASA_SKAD=Warszawa, ul. Marszałkowska 1
TRASA_DOKAD=Łódź, ul. Piotrkowska 50
CEL_WYJAZDU=Szkolenie pracowników
KILOMETRY=137,00
STAWKA=0,8358
KWOTA=114,50

[PODSUMOWANIE]
LICZBA_POZYCJI=2
SUMA_KILOMETROW=149,50
SUMA_KWOT=124,95
STAWKA_ZA_KM=0,8358
```

### Opis pól poszczególnych sekcji

**[NAGLOWEK]** — metadane pliku eksportu:
- `WERSJA` — wersja formatu EDI++
- `TYP` — typ dokumentu (`KILOMETROWKA` lub `DELEGACJA`)
- `DATA_EKSPORTU` — data wygenerowania pliku
- `SYSTEM` / `WERSJA_SYSTEMU` — identyfikacja systemu źródłowego

**[FIRMA]** — dane firmy zlecającej:
- `NIP` — numer identyfikacji podatkowej (10 cyfr)
- `NAZWA`, `ADRES`, `KOD_POCZTOWY`, `MIASTO` — dane adresowe

**[POJAZD]** — dane pojazdu:
- `NUMER_REJESTRACYJNY` — tablica rejestracyjna
- `POJEMNOSC` — pojemność silnika w cm³
- `KATEGORIA` — `SAMOCHOD_DO_900` / `SAMOCHOD_POWYZEJ_900` / `CIEZAROWY`
- `STAWKA_ZA_KM` — stawka za 1 km w PLN
- `WLASCICIEL` — `PRACOWNIK` lub `FIRMA`

**[POZYCJA]** — pojedynczy przejazd (powtarzana N razy):
- `LP` — liczba porządkowa
- `DATA` — data przejazdu
- `TRASA_SKAD` / `TRASA_DOKAD` — punkty trasy
- `CEL_WYJAZDU` — cel służbowy
- `KILOMETRY` — dystans w km (przecinek dziesiętny)
- `KWOTA` — koszt = kilometry x stawka

**[PODSUMOWANIE]** — sumy kontrolne:
- `LICZBA_POZYCJI` — ile sekcji [POZYCJA]
- `SUMA_KILOMETROW` / `SUMA_KWOT` — sumy do weryfikacji

---

## Insert GT — struktura pliku delegacji

```
; BusiKM - eksport delegacji do Insert GT
; Wygenerowano: 2026-04-15 10:30:00

[NAGLOWEK]
WERSJA=1.0
TYP=DELEGACJA
DATA_EKSPORTU=2026-04-15
SYSTEM=BusiKM
WERSJA_SYSTEMU=1.2.0

[FIRMA]
NIP=5261234567
NAZWA=Przykładowa Firma Sp. z o.o.
ADRES=ul. Marszałkowska 1
KOD_POCZTOWY=00-001
MIASTO=Warszawa

[PRACOWNIK]
IMIE=Jan
NAZWISKO=Kowalski
STANOWISKO=Przedstawiciel handlowy
NUMER_EWIDENCYJNY=PH-001

[DELEGACJA]
NUMER=DEL/2026/04/001
DATA_OD=2026-04-10
DATA_DO=2026-04-12
GODZINA_OD=08:00
GODZINA_DO=18:00
MIEJSCE_DOCELOWE=Kraków
CEL=Targi branżowe IT Solutions 2026
SRODEK_TRANSPORTU=SAMOCHOD_PRYWATNY

[KOSZTY]
DIETY=120,00
NOCLEGI=350,00
PRZEJAZDY=228,98
INNE_KOSZTY=45,00
OPIS_INNE=Opłata parkingowa
SUMA_KOSZTOW=743,98
ZALICZKA=500,00
DO_ROZLICZENIA=243,98

[DELEGACJA]
NUMER=DEL/2026/04/002
DATA_OD=2026-04-14
DATA_DO=2026-04-14
GODZINA_OD=07:00
GODZINA_DO=20:00
MIEJSCE_DOCELOWE=Wrocław
CEL=Spotkanie z klientem XYZ
SRODEK_TRANSPORTU=SAMOCHOD_PRYWATNY

[KOSZTY]
DIETY=45,00
NOCLEGI=0,00
PRZEJAZDY=285,47
INNE_KOSZTY=0,00
SUMA_KOSZTOW=330,47
ZALICZKA=0,00
DO_ROZLICZENIA=330,47

[PODSUMOWANIE]
LICZBA_DELEGACJI=2
SUMA_DIET=165,00
SUMA_NOCLEGOW=350,00
SUMA_PRZEJAZDOW=514,45
SUMA_INNYCH=45,00
SUMA_KOSZTOW=1074,45
SUMA_ZALICZEK=500,00
SUMA_DO_ROZLICZENIA=574,45
```

---

## Mapowanie BusiKM → EDI++

### Kilometrówka — sekcja [POJAZD]

| Pole EDI++               | Źródło BusiKM                  | Transformacja                                |
|--------------------------|--------------------------------|----------------------------------------------|
| `NUMER_REJESTRACYJNY`    | `Vehicle.registration_number`  | bez zmian                                    |
| `MARKA`                  | `Vehicle.make`                 | bez zmian                                    |
| `MODEL`                  | `Vehicle.model`                | bez zmian                                    |
| `POJEMNOSC`              | `Vehicle.engine_capacity_cc`   | wartość w cm³, int                           |
| `KATEGORIA`              | `Vehicle.engine_capacity_cc`   | ≤900 → `SAMOCHOD_DO_900`, >900 → `SAMOCHOD_POWYZEJ_900`, ciężarowy → `CIEZAROWY` |
| `STAWKA_ZA_KM`           | `MileageRate.rate_per_km`      | Decimal → string z przecinkiem               |

### Kilometrówka — sekcja [POZYCJA]

| Pole EDI++       | Źródło BusiKM            | Transformacja                          |
|------------------|--------------------------|----------------------------------------|
| `LP`             | indeks iteracji          | numeracja od 1                         |
| `DATA`           | `Trip.date`              | format YYYY-MM-DD                      |
| `TRASA_SKAD`     | `Trip.start_address`     | geocoded address lub nazwa punktu      |
| `TRASA_DOKAD`    | `Trip.end_address`       | geocoded address lub nazwa punktu      |
| `CEL_WYJAZDU`    | `Trip.purpose`           | tekst, max 200 znaków                  |
| `KILOMETRY`      | `Trip.distance_km`       | Decimal(2) → string z przecinkiem      |
| `STAWKA`         | `MileageRate.rate_per_km`| Decimal(4) → string z przecinkiem      |
| `KWOTA`          | obliczane                | `KILOMETRY` x `STAWKA`, zaokrąglenie do 2 miejsc |

### Delegacja — sekcja [KOSZTY]

| Pole EDI++         | Źródło BusiKM                      | Transformacja                  |
|--------------------|-------------------------------------|-------------------------------|
| `DIETY`            | `Delegation.diet_amount`            | Decimal(2) → string z przecinkiem |
| `NOCLEGI`          | `Delegation.accommodation_cost`     | Decimal(2) → string z przecinkiem |
| `PRZEJAZDY`        | suma Trip.cost w ramach delegacji   | obliczana suma                |
| `INNE_KOSZTY`      | `Delegation.other_costs`            | Decimal(2) → string z przecinkiem |
| `DO_ROZLICZENIA`   | `SUMA_KOSZTOW` - `ZALICZKA`        | może być ujemne (nadpłata)    |

---

## Kodowanie znaków

### Problem

BusiKM operuje na UTF-8 (standard w Django/PostgreSQL). Insert GT wymaga Windows-1250. Bezpośredni eksport UTF-8 powoduje zniekształcenie polskich znaków diakrytycznych.

### Mapowanie polskich znaków

| Znak | UTF-8 (hex) | Windows-1250 (hex) |
|------|-------------|---------------------|
| ą    | C4 85       | B9                  |
| ć    | C4 87       | E6                  |
| ę    | C4 99       | EA                  |
| ł    | C5 82       | B3                  |
| ń    | C5 84       | F1                  |
| ó    | C3 B3       | F3                  |
| ś    | C5 9B       | 9C                  |
| ź    | C5 BA       | 9F                  |
| ż    | C5 BC       | BF                  |
| Ą    | C4 84       | A5                  |
| Ć    | C4 86       | C6                  |
| Ę    | C4 98       | CA                  |
| Ł    | C5 81       | A3                  |
| Ń    | C5 83       | D1                  |
| Ó    | C3 93       | D3                  |
| Ś    | C5 9A       | 8C                  |
| Ź    | C5 B9       | 8F                  |
| Ż    | C5 BB       | AF                  |

### Klasa EDIEncoder

```python
class EDIEncoder:
    """Konwersja tekstu UTF-8 → Windows-1250 z obsługą błędów."""

    ENCODING = 'windows-1250'
    ERROR_HANDLER = 'replace'  # nieznane znaki → '?'

    @classmethod
    def encode(cls, text: str) -> bytes:
        """Konwertuje string UTF-8 na bajty Windows-1250."""
        return text.encode(cls.ENCODING, errors=cls.ERROR_HANDLER)

    @classmethod
    def encode_line(cls, key: str, value: str) -> bytes:
        """Koduje pojedynczą linię klucz=wartość z CRLF."""
        line = f"{key}={value}"
        return cls.encode(line) + b'\r\n'

    @classmethod
    def encode_section(cls, name: str) -> bytes:
        """Koduje nagłówek sekcji [NAZWA] z CRLF."""
        return cls.encode(f"[{name}]") + b'\r\n'
```

**Zasada:** Nieznane znaki (np. emoji, cyrylica) są zastępowane znakiem `?` — system nigdy nie przerywa eksportu z powodu niekodowalnego znaku.

---

## Endpoint i przepływ eksportu

### Przepływ asynchroniczny

```
POST /api/v1/export/insert-gt/
  Body: { "mileage_log_id": 42, "period": "2026-04" }
  → 202 Accepted
  → Response: { "export_id": "abc-123", "status": "pending" }

  [Celery task w tle]
  → Generowanie pliku .epp
  → Zapis w ExportRecord (status=completed, file_path=...)

GET /api/v1/export/{export_id}/
  → 200 OK
  → Response: { "status": "completed", "download_url": "/api/v1/export/abc-123/download/" }

GET /api/v1/export/{export_id}/download/
  → 200 OK
  → Content-Type: application/octet-stream
  → Content-Disposition: attachment; filename="kilometrowka_2026-04_WA12345.epp"
  → Body: plik .epp (Windows-1250)
```

### Model ExportRecord

```python
class ExportRecord(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    export_type = models.CharField(choices=[
        ('mileage_log', 'Kilometrówka'),
        ('delegation', 'Delegacja'),
    ])
    fk_system = models.CharField(default='insert_gt')
    status = models.CharField(choices=[
        ('pending', 'Oczekuje'),
        ('processing', 'Generowanie'),
        ('completed', 'Zakończono'),
        ('failed', 'Błąd'),
    ])
    file_path = models.FileField(upload_to='exports/', null=True)
    error_message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    period_start = models.DateField()
    period_end = models.DateField()
```

---

## Import w Insert GT

### Instrukcja importu — Insert GT (Subiekt GT / Rachmistrz GT)

1. Otwórz program Insert GT
2. Przejdź do **Narzędzia → Import danych → Import EDI++**
3. Kliknij **Wybierz plik** i wskaż pobrany plik `.epp`
4. System wyświetli **podgląd importowanych danych** — zweryfikuj poprawność
5. Kliknij **Importuj** — dane zostaną dodane do ewidencji

### Instrukcja importu — Rewizor GT

1. Otwórz Rewizor GT
2. Przejdź do **Ewidencje → Import dokumentów → Z pliku EDI++**
3. Wskaż plik `.epp`
4. Dopasuj konta księgowe (jednorazowa konfiguracja)
5. Potwierdź import

### Instrukcja importu — InsERT nexo

1. Otwórz InsERT nexo
2. Przejdź do **Administracja → Import / Eksport → Import EDI++**
3. Przeciągnij plik `.epp` lub kliknij **Przeglądaj**
4. Sprawdź podgląd i zatwierdź

---

## Historia eksportów

### Lista eksportów

`GET /api/v1/export/` — zwraca listę eksportów z paginacją i filtrami:
- `?fk_system=insert_gt` — filtr po systemie FK
- `?status=completed` — filtr po statusie
- `?period=2026-04` — filtr po okresie
- `?export_type=mileage_log` — filtr po typie dokumentu

### Szczegóły eksportu

`GET /api/v1/export/{id}/` — pełne dane eksportu wraz ze statusem i linkiem do pobrania.

### Ponowne pobranie

`GET /api/v1/export/{id}/download/` — ponowne pobranie wygenerowanego pliku. Pliki przechowywane przez 90 dni, potem archiwizowane.

### Ponowienie nieudanego eksportu

`POST /api/v1/export/{id}/retry/` — ponawia generowanie pliku dla eksportów ze statusem `failed`.

### Regeneracja zarchiwizowanego eksportu

`POST /api/v1/export/{id}/regenerate/` — ponownie generuje plik na podstawie aktualnych danych. Przydatne po archiwizacji lub korekcie danych źródłowych.

### Statystyki eksportów

`GET /api/v1/export/statistics/` — zbiorczy widok:
- łączna liczba eksportów (per system FK, per typ)
- procent udanych / nieudanych
- średni czas generowania

---

## Rozwiązywanie problemów

### Problem: Polskie znaki wyświetlają się nieprawidłowo w Insert GT

**Przyczyna:** Plik został wygenerowany w kodowaniu UTF-8 zamiast Windows-1250.

**Rozwiązanie:** Sprawdź czy `EDIEncoder` jest używany. Zweryfikuj kodowanie pliku:
```bash
file -bi exported_file.epp
# Oczekiwane: text/plain; charset=iso-8859-2 lub windows-1250
```

### Problem: Insert GT odrzuca plik — "Nieprawidłowy format"

**Przyczyna:** Końce linii LF zamiast CRLF, lub brak wymaganej sekcji.

**Rozwiązanie:** Sprawdź końce linii:
```bash
xxd exported_file.epp | grep "0d 0a"
# Każda linia powinna kończyć się 0d 0a (CR LF)
```
Zweryfikuj obecność wymaganych sekcji: `[NAGLOWEK]`, `[FIRMA]`, `[PODSUMOWANIE]`.

### Problem: Kwoty się nie zgadzają po imporcie

**Przyczyna:** Separator dziesiętny — kropka zamiast przecinka.

**Rozwiązanie:** Upewnij się, że `format_decimal()` zamienia kropkę na przecinek:
```python
def format_decimal(value: Decimal, places: int = 2) -> str:
    formatted = f"{value:.{places}f}"
    return formatted.replace('.', ',')
```

### Problem: Eksport trwa zbyt długo

**Przyczyna:** Duża liczba pozycji (>1000 przejazdów w miesiącu).

**Rozwiązanie:** Celery task przetwarza pozycje w partiach (batch_size=100). Sprawdź logi Celery pod kątem timeout.

### Problem: Plik ma rozmiar 0 bajtów

**Przyczyna:** Brak danych w wybranym okresie lub błąd walidacji.

**Rozwiązanie:** Sprawdź `ExportRecord.error_message`. Zweryfikuj, że istnieją przejazdy w zadanym okresie.

---

## Planowane integracje (post-MVP)

### Comarch ERP Optima (Sprint 8+)

- **Metoda:** REST API (bezpośrednia synchronizacja, bez plików)
- **Autoryzacja:** OAuth 2.0 lub klucz API
- **Zakres:** dwukierunkowy sync — eksport kilometrówek, import danych firmowych
- **Format danych:** JSON
- **Korzyść:** brak ręcznego importu plików, dane w czasie rzeczywistym

```python
@register_integration('comarch_optima')
class ComarchOptimaIntegration(AbstractFKIntegration):
    BASE_URL = "https://api.comarch.com/optima/v1"
    # ...
```

### Symfonia (Sprint 9+)

- **Metoda:** eksport plików XML lub CSV
- **Format XML:** zgodny ze schematem Symfonia Finanse i Księgowość
- **Format CSV:** separator `;`, kodowanie Windows-1250
- **Import:** ręczny (użytkownik importuje plik w Symfonii)

### KSeF — Krajowy System e-Faktur (Sprint 10+)

- **Metoda:** API KSeF (REST)
- **Zakres:** generowanie e-faktur za usługi transportowe
- **Format:** FA(2) — struktura XML e-faktury
- **Autoryzacja:** token sesji KSeF, podpis kwalifikowany lub zaufany
- **Wymagania:** certyfikat kwalifikowany lub profil zaufany firmy

---

## Stawki za km

Stawki za 1 km przebiegu pojazdu niebędącego własnością pracodawcy (zgodnie z Rozporządzeniem Ministra Infrastruktury):

| Kategoria pojazdu                     | Stawka za km (PLN) |
|---------------------------------------|---------------------|
| Samochód osobowy o pojemności ≤ 900 cm³  | **0,5214**         |
| Samochód osobowy o pojemności > 900 cm³  | **0,8358**         |
| Samochód ciężarowy                       | **0,8358**         |
| Motocykl                                 | **0,2302**         |
| Motorower                                | **0,1382**         |

### Konfiguracja w BusiKM

Stawki są konfigurowalne w panelu administracyjnym firmy:

```python
class MileageRate(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    vehicle_category = models.CharField(choices=[
        ('car_under_900', 'Samochód ≤ 900 cm³'),
        ('car_over_900', 'Samochód > 900 cm³'),
        ('truck', 'Samochód ciężarowy'),
        ('motorcycle', 'Motocykl'),
        ('moped', 'Motorower'),
    ])
    rate_per_km = models.DecimalField(max_digits=6, decimal_places=4)
    valid_from = models.DateField()
    valid_until = models.DateField(null=True, blank=True)
```

**Uwaga:** Stawki mogą ulec zmianie w drodze rozporządzenia. System przechowuje historię stawek z datami obowiązywania (`valid_from` / `valid_until`), dzięki czemu archiwalne kilometrówki zawsze korzystają ze stawek aktualnych w momencie przejazdu.
