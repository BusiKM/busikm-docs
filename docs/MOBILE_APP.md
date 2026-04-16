# BusiKM -- Specyfikacja techniczna aplikacji mobilnej

## 1. Stos technologiczny

| Warstwa              | Technologia                         |
| -------------------- | ----------------------------------- |
| Framework            | React Native + Expo SDK 52+         |
| Jezyk                | TypeScript (strict mode)            |
| Routing              | Expo Router v4 (file-based routing) |
| Stan globalny        | Zustand                             |
| Klient HTTP          | Axios                               |
| Bezpieczne tokeny    | expo-secure-store                   |
| Lokalizacja GPS      | expo-location                       |
| Aparat / zdjecia     | expo-camera                         |
| Powiadomienia push   | expo-notifications                  |
| Budowanie            | EAS Build + EAS Update              |

Minimalne wersje: iOS 15+, Android 10+ (API 29).

---

## 2. Struktura projektu

```
busikm-mobile/
  app/                    # Expo Router -- strony (file-based routing)
    (auth)/               # Grupa tras autoryzacji
    (driver)/             # Grupa tras kierowcy (tabs)
    (owner)/              # Grupa tras wlasciciela (tabs)
    _layout.tsx           # Root layout
  src/
    api/                  # Klient Axios, interceptory, endpointy
    stores/               # Zustand stores (auth, trip, gps, alerts)
    hooks/                # Hooki (useProtectedRoute, useGPS, useNetworkStatus)
    components/           # Komponenty wspoldzielone (Button, Card, Input, Modal)
    services/             # Logika biznesowa (GPS tracking, upload queue, sync)
    constants/            # Stale (kolory, endpointy, konfiguracja)
    types/                # Typy TypeScript (Trip, Vehicle, User, GPS)
  assets/                 # Fonty, ikony, obrazy
  eas.json                # Konfiguracja EAS Build
  app.config.ts           # Dynamiczna konfiguracja Expo
```

---

## 3. Nawigacja i routing

### Grupy tras

Aplikacja posiada trzy grupy tras (route groups) w Expo Router:

#### (auth) -- autoryzacja

| Ekran               | Sciezka                  | Opis                              |
| -------------------- | ------------------------ | --------------------------------- |
| Logowanie            | `/login`                 | Formularz email + haslo           |
| Rejestracja          | `/register`              | Kreator 3-krokowy                 |
| Reset hasla          | `/forgot-password`       | Wyslanie linku resetujacego       |
| Zaproszenie          | `/invite/[token]`        | Dolaczenie do firmy przez link    |

#### (driver) -- kierowca (4 taby)

| Tab       | Ekran glowny  | Ekrany zagniezdzone                              |
| --------- | ------------- | ------------------------------------------------- |
| Start     | Pulpit        | start-trip, active-trip, trip-summary             |
| Trasa     | Mapa trasy    | trip-detail/[id]                                  |
| Historia  | Lista tras    | trip-detail/[id], trip-export                     |
| Profil    | Dane profilu  | edit-profile, change-password, settings, about    |

#### (owner) -- wlasciciel (5 tabow)

| Tab       | Ekran glowny  | Ekrany zagniezdzone                              |
| --------- | ------------- | ------------------------------------------------- |
| Dashboard | Pulpit        | alert-detail/[id]                                 |
| Flota     | Lista pojazdow| vehicle-detail/[id], add-vehicle, edit-vehicle    |
| Kierowcy  | Lista kierowcow| driver-detail/[id], invite-driver                |
| Trasy     | Lista tras    | trip-detail/[id], trip-export                     |
| Wiecej    | Menu          | reports, export-fk, settings, about, af-panel     |

### Brama autoryzacji

Hook `useProtectedRoute` w root layout:

- Brak tokena -> przekierowanie do `(auth)/login`.
- Token + rola `driver` -> przekierowanie do `(driver)`.
- Token + rola `owner` / `admin` -> przekierowanie do `(owner)`.
- Token wygasly -> proba refresh; jesli nieudana -> wylogowanie.

---

## 4. Sledzenie GPS

### Konfiguracja expo-location

```typescript
// Tryb tla (background)
TaskManager.defineTask(GPS_TASK_NAME, ({ data, error }) => { ... });

await Location.startLocationUpdatesAsync(GPS_TASK_NAME, {
  accuracy: Location.Accuracy.High,
  distanceInterval: 10,       // metry
  timeInterval: 5000,         // milisekundy
  foregroundService: {         // Android
    notificationTitle: "BusiKM",
    notificationBody: "Trasa aktywna - sledzenie GPS",
    notificationColor: "#2563EB",
  },
  showsBackgroundLocationIndicator: true,  // iOS blue bar
  pausesUpdatesAutomatically: false,
});
```

### Profile adaptacyjne baterii

| Poziom baterii | Interwal czasu | Dokladnosc         | distanceInterval |
| -------------- | -------------- | ------------------- | ---------------- |
| > 50%          | 5s             | High                | 10m              |
| 20--50%        | 10s            | Balanced            | 20m              |
| 10--20%        | 30s            | Low                 | 50m              |
| < 10%          | PAUZA          | --                  | --               |

Przelaczanie profili przez `Battery.addBatteryLevelListener()`.

### Bufor GPS

- Punkty GPS zapisywane w Zustand store z persistencja do AsyncStorage.
- Struktura punktu: `{ lat, lng, altitude, speed, accuracy, timestamp, batteryLevel }`.
- Bufor rosnie w trybie offline -- synchronizacja po przywroceniu polaczenia.

### Wysylanie wsadowe (batch upload)

- Wysylka co 30 sekund.
- Maksymalnie 100 punktow na wsad.
- Kazdy wsad ma unikalny `batch_id` (UUID) dla idempotentnosci.
- Endpoint: `POST /trips/{trip_id}/gps-batch/`.
- Potwierdzenie serwera -> usuniecie z bufora.
- Brak odpowiedzi -> ponowna proba przy nastepnym cyklu.

---

## 5. Tryb offline

### MVP (Sprint 1--5)

- **Bufor GPS**: AsyncStorage -- punkty GPS rosna w buforze do momentu przywrocenia sieci.
- **Zustand persist**: kluczowe dane trasy (`activeTrip`, `gpsBuffer`, `gpsBatchQueue`) persistowane przez `zustand/middleware`.
- **Wykrywanie sieci**: `NetInfo` listener przelacza store `isOnline`.
- **Kolejka wysylki**: wsady GPS czekaja w `gpsBatchQueue` -- automatyczna synchronizacja po reconnect.

### Post-MVP (Sprint 7)

- **WatermelonDB** (SQLite) jako lokalna baza danych.
- Pelny silnik synchronizacji pull/push.
- Tworzenie tras offline (zapis lokalny, synchronizacja po polaczeniu).
- Protokol synchronizacji: `GET /sync/pull?last_pulled_at=...` + `POST /sync/push`.
- Rozwiazywanie konfliktow: server-wins z logowaniem.

---

## 6. Aparat i zdjecia licznika

### Wykonywanie zdjec

- **expo-camera**: dedykowany ekran aparatu z nakladka ramki na licznik.
- **Galeria**: fallback przez expo-image-picker (wybor z galerii).
- Zdjecie wymagane przy starcie i zakonczeniu trasy (przebiegi start/stop).

### Przetwarzanie obrazu

| Parametr        | Wartosc              |
| --------------- | -------------------- |
| Rozmiar docelowy| 1920 x 1440 px       |
| Format          | JPEG                 |
| Jakosc          | 80%                  |
| Metadane        | Ekstrakcja EXIF (data, GPS, urzadzenie) |

### Upload

- Wysylka jako `multipart/FormData` z paskiem postepu.
- Endpoint: `POST /trips/{trip_id}/odometer-photo/`.
- **Kolejka pending**: jesli brak sieci, zdjecie trafia do kolejki upload.
- Automatyczna proba wysylki po przywroceniu polaczenia.
- Retry: 3 proby z exponential backoff (2s, 4s, 8s).

---

## 7. Powiadomienia push

### Architektura

```
Serwer Django -> Expo Push Service -> APNs / FCM -> Urzadzenie
```

### Rejestracja tokena

Po zalogowaniu: `POST /notifications/register-device/` z payload:

```json
{
  "expo_push_token": "ExponentPushToken[xxx]",
  "platform": "ios" | "android",
  "device_name": "iPhone 15 Pro"
}
```

### Kanaly powiadomien (Android)

| Kanal    | Priorytet | Uzycie                                  |
| -------- | --------- | --------------------------------------- |
| alerts   | high      | Alerty pojazdow, przeglady, ubezpieczenia|
| trips    | default   | Przypomnienia o trasach, podsumowania    |
| general  | default   | Aktualizacje systemu, wiadomosci ogolne  |

### Obsluga powiadomien

- **Foreground**: banner (in-app) + odswiezenie store alertow.
- **Background**: systemowa notyfikacja (APNs / FCM).
- **Tap**: deep link przez Expo Router do odpowiedniego ekranu (np. `/trip-detail/123`, `/alert-detail/456`).

---

## 8. Autoryzacja i tokeny

### Przechowywanie

- `accessToken` i `refreshToken` w **SecureStore** (szyfrowane na poziomie OS).
- Dane uzytkownika (rola, email, firma) w Zustand store z persist.

### Klient API (Axios)

Interceptory:

1. **Request interceptor**:
   - Dolacza naglowek `Authorization: Bearer <accessToken>`.
   - Pre-emptive refresh: jesli token wygasa w ciagu 60s, odswieza przed wyslaniem.

2. **Response interceptor**:
   - Kod 401 -> uruchamia refresh flow.
   - **Kolejka refresh**: pierwszy request wykonuje refresh, pozostale czekaja na wynik.
   - Udany refresh -> ponowienie wszystkich oczekujacych requestow.
   - Nieudany refresh -> wylogowanie, przekierowanie do logowania.

```typescript
let isRefreshing = false;
let refreshQueue: Array<(token: string) => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            error.config.headers.Authorization = `Bearer ${token}`;
            resolve(api(error.config));
          });
        });
      }
      isRefreshing = true;
      error.config._retry = true;
      // ... refresh logic
    }
  }
);
```

---

## 9. EAS Build i dystrybucja

### Profile budowania

| Profil              | Kanal OTA     | Srodowisko API       | Uzycie                     |
| ------------------- | ------------- | --------------------- | -------------------------- |
| development         | development   | localhost / staging   | Expo Go, dev client        |
| development-device  | development   | staging               | Fizyczne urzadzenie, debug |
| staging             | staging       | staging               | Testy QA                   |
| preview             | staging       | staging               | TestFlight / Internal Track|
| production          | production    | production            | App Store / Google Play    |

### Wersjonowanie

- `buildNumber` (iOS) / `versionCode` (Android): auto-inkrementacja w EAS.
- `version` (semver): reczna zmiana przy wiekszych wydaniach.

### Aktualizacje OTA

- Expo Updates z kanalami: `development`, `staging`, `production`.
- Krytyczne poprawki: OTA bez przechodzenia przez sklepy.
- Migracje wymagajace natywnych zmian: pelny build przez EAS.

---

## 10. Kluczowe ekrany

### Logowanie

- Formularz: email + haslo z walidacja (zod).
- Obsluga bledow: nieprawidlowe dane, konto nieaktywne, brak sieci.
- Przycisk "Zapomnialam/em hasla" -> ekran reset.
- Animacja logo przy ladowaniu.

### Rejestracja (3 kroki)

1. **Konto**: email, haslo, potwierdzenie hasla.
2. **Dane osobowe + rola**: imie, nazwisko, telefon, wybor roli (kierowca / wlasciciel).
3. **Firma**: nazwa firmy, NIP (walidacja formatu + GUS), adres.

Kazdy krok z walidacja przed przejsciem dalej. Pasek postepu na gorze.

### Start / Stop trasy

- **Wybor pojazdu**: picker z lista przypisanych pojazdow (karta z nr rej, marka, model).
- **Typ trasy**: selektor (sluzbowa / prywatna / dojazd).
- **Duzy przycisk START**: centralny element ekranu, zmiana na STOP po uruchomieniu.
- **Statystyki live**: czas trwania, dystans, predkosc.

### Aktywna trasa

- Mini-mapa (MapView) z biezaca pozycja i sledzeniem trasy.
- Wskazniki: predkosc aktualna, dystans, liczba punktow GPS, poziom baterii.
- Status polaczenia: ikona online/offline z informacja o buforze.
- Przycisk STOP z potwierdzeniem (modal).

### Lista tras (Historia)

- Infinite scroll z paginacja (FlatList + onEndReached).
- Filtry: zakres dat, typ trasy, pojazd, kierowca (dla wlasciciela).
- Wyszukiwarka: numer rejestracyjny, nazwa kierowcy.
- Karta trasy: data, pojazd, dystans, czas, typ, status.

### Lista pojazdow (Flota)

- Karty pojazdow z podstawowymi informacjami.
- Alerty: badge z liczba aktywnych alertow (przeglad, ubezpieczenie, OC).
- Kolorowe oznaczenia statusu (aktywny / nieaktywny / serwis).

### Lista alertow

- Badge z poziomem waznosci (krytyczny: czerwony, ostrzezenie: zolty, informacja: niebieski).
- Swipe-to-acknowledge: przesuniecie w prawo potwierdza alert.
- Filtr po typie i statusie (aktywne / potwierdzone / wszystkie).
