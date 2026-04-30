# BusiKM — Slownik pojec

> Slownik terminow uzywanych w dokumentacji projektu BusiKM.
> Dokumentacja powiazana: [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | [ROADMAP.md](./ROADMAP.md) | [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 1. Pojecia transportowe

| Skrot / Termin       | Pelna nazwa                                      | Opis                                                                                              |
|----------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------|
| DMC                  | Dopuszczalna Masa Calkowita                      | Maksymalna dopuszczalna waga pojazdu (pojazd + ladunek + pasazerowie). Wplyw na kategorie oplat.  |
| OC                   | Ubezpieczenie odpowiedzialnosci cywilnej         | Obowiazkowe ubezpieczenie od szkod wyrzadzonych osobom trzecim. Wymagane dla kazdego pojazdu.     |
| AC                   | Autocasco                                        | Dobrowolne ubezpieczenie pojazdu od uszkodzen, kradziezy i zniszczenia.                           |
| PJ                   | Prawo Jazdy                                      | Dokument uprawniajacy do prowadzenia pojazdu. BusiKM sled daty waznosci i kategorie.             |
| Tachograf G2V2       | Tachograf cyfrowy drugiej generacji (wersja 2)   | Obowiazkowe urzadzenie rejestrujace czas jazdy, odpoczynku i predkosc. Wymog regulacji UE.       |
| ADR                  | Accord europeen relatif au transport international des marchandises Dangereuses par Route | Certyfikat uprawniajacy do przewozu towarow niebezpiecznych. BusiKM sledzi daty waznosci. |
| CMR                  | Convention relative au contrat de transport international de Marchandises par Route | Miedzynarodowa konwencja o umowie przewozu drogowego towarow. Reguluje odpowiedzialnosc przewoznika. |
| e-TOLL               | Elektroniczny system poboru oplat drogowych      | Polski system poboru oplat za korzystanie z drog krajowych. Dotyczy pojazdow o DMC > 3.5t.        |
| SENT                 | System Elektronicznego Nadzoru Transportu        | System monitorowania przewozu towarow wrazliwych (paliwa, tytoniu itp.). Obowiazek zgloszeniowy.  |
| KSeF                 | Krajowy System e-Faktur                          | Polski system elektronicznych faktur ustrukturyzowanych. Obowiazkowy od 2026 roku.               |
| Kilometrowka         | Ewidencja przebiegu pojazdu                      | Dokument rejestrujacy trasy sluzbowe pojazdu. Wymagany przez Ministerstwo Finansow (wzor MF).    |
| Wzor MF              | Wzor Ministerstwa Finansow                       | Urzedowy szablon ewidencji przebiegu pojazdu okreslony rozporzadzeniem MF.                       |
| Stawka za km          | Stawka kilometrowa                               | Kwota za kilometr przebiegu pojazdu prywatnego uzywanego do celow sluzbowych. Okreslanaf rozporzadzeniem. |

---

## 2. Pojecia techniczne

| Skrot / Termin       | Pelna nazwa                                      | Opis                                                                                              |
|----------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------|
| JWT                  | JSON Web Token                                   | Standard tokenow uwierzytelniajacych. BusiKM uzywa access token (15 min) + refresh token (7 dni).|
| RBAC                 | Role-Based Access Control                        | System uprawnien oparty na rolach uzytkownikow (Driver, Owner, Accountant, AccountingFirm).       |
| ASGI                 | Asynchronous Server Gateway Interface            | Interfejs serwera asynchronicznego. Uzywany przez Django Channels do obslugi WebSocket.           |
| SSG                  | Static Site Generation                           | Pre-renderowanie stron podczas budowania. Uzywane w Next.js dla stron statycznych.                |
| ISR                  | Incremental Static Regeneration                  | Strategia cache w Next.js — regeneracja stron statycznych w tle po uplywie czasu.                 |
| EDI++                | Electronic Data Interchange (format InsERT)      | Format wymiany danych elektronicznych firmy InsERT. Uzywany do eksportu danych do Subiekta/Rewizora GT. |
| BFF                  | Backend For Frontend                             | Wzorzec proxy w Next.js — warstwa posrednia miedzy frontendem a API backendu.                     |
| OTA                  | Over The Air                                     | Aktualizacja aplikacji mobilnej bez koniecznosci recenzji w App Store / Google Play.              |
| WebSocket            | WebSocket                                        | Protokol dwukierunkowej komunikacji w czasie rzeczywistym. Uzywany do live GPS tracking.          |
| Presigned URL        | Presigned URL (podpisany URL)                    | Tymczasowy, podpisany adres URL do S3/MinIO z ograniczonym czasem waznosci. Do uploadu plikow.   |

---

## 3. Pojecia biznesowe

| Skrot / Termin       | Pelna nazwa                                      | Opis                                                                                              |
|----------------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------|
| MRR                  | Monthly Recurring Revenue                        | Miesieczny przychod cykliczny z aktywnych subskrypcji.                                           |
| ARR                  | Annual Recurring Revenue                         | Roczny przychod cykliczny. Obliczany jako MRR x 12.                                             |
| ARPU                 | Average Revenue Per User                         | Sredni miesieczny przychod na firme. Obliczany jako MRR / liczba platnych firm.                  |
| CAC                  | Customer Acquisition Cost                        | Koszt pozyskania jednego platnego klienta (marketing + sprzedaz / nowi klienci).                 |
| LTV                  | Lifetime Value                                   | Calkowity przychod od klienta w calym okresie wspolpracy. LTV = ARPU / churn rate.              |
| Churn                | Churn rate (wskaznik rezygnacji)                 | Procent klientow rezygnujacych z subskrypcji w danym miesiacu.                                   |
| NPS                  | Net Promoter Score                               | Wskaznik satysfakcji klienta (skala -100 do 100). Pytanie: "Czy polecilbys BusiKM?"             |
| Van Westendorp       | Van Westendorp Price Sensitivity Meter           | Metoda badania wrazliwosci cenowej. 4 pytania o cene: za tania, akceptowalna, droga, za droga.  |
| Reverse trial        | Reverse trial (odwrocony trial)                  | Model trialu: pelna funkcjonalnosc przez 14 dni, po zakonczeniu degradacja do planu Free.        |
| Feature gating       | Feature gating (bramkowanie funkcji)             | Ograniczanie dostepu do funkcji na podstawie planu subskrypcyjnego (Free / Starter / Professional / `af_standard` dla biur rachunkowych). |
| AF                   | Accounting Firm (biuro rachunkowe)               | Biuro rachunkowe — kluczowy kanal dystrybucji BusiKM. Obsluguje wiele firm transportowych.       |

---

## 4. Pojecia BusiKM (wewnetrzne)

| Termin                    | Typ                    | Opis                                                                                          |
|---------------------------|------------------------|-----------------------------------------------------------------------------------------------|
| CompanyScopedMixin        | Django mixin           | Mixin automatycznie filtrujacy querysety po firmie (company). Zapobiega wyciekowi danych miedzy firmami. |
| TenantContextMiddleware   | Django middleware       | Middleware zarzadzajacy kontekstem klienta biura rachunkowego. Przechowuje aktywna firme w Redis. |
| AbstractFKIntegration     | Klasa bazowa (Python)  | Abstrakcyjna klasa bazowa dla integracji z systemami FK. Wzorzec Strategy: export(), validate(), sync(). |
| BasePDFGenerator          | Klasa bazowa (Python)  | Klasa bazowa do generowania raportow PDF (WeasyPrint). Kilometrowki, raporty floty, zestawienia kosztow. |
| UsageTracker              | Serwis (Redis)         | Kolektor metryk uzycia per firma (liczba tras, pojazdow, eksportow). Podstawa do feature gating i limityow. |
| ExportRecord              | Model Django           | Model sledzacy historie eksportow do systemow FK: status (pending/success/failed), timestamp, format, bledy. |

---

> Slownik jest aktualizowany wraz z rozwojem dokumentacji BusiKM.
