# 03 · Architektura informacji

---

## 1. Nawigacja

Pasek zostaje wizualnie taki, jaki jest dziś (72 px, białe tło z rozmyciem, cień po
przewinięciu 24 px, pigułka pod aktywną pozycją). **Zmienia się zawartość:** zamiast
suchych etykiet — dwa rozwijane menu, w których każda pozycja niesie korzyść, nie nazwę modułu.

```
BusiKM     Co robi ▾    Dla kogo ▾    Cennik    Pomoc ▾        Zaloguj się   [ Zobacz demo ]
```

### Menu „Co robi” — trzy kolumny plus kafel

Nagłówki kolumn są szare, drobne, wersalikami. Pozycja to **korzyść pogrubiona
plus jedno zdanie wyjaśnienia** — to jest właśnie „rozbudowanie nawigacji korzyściami”.

**W TRASIE**
| Pozycja | Zdanie pod nią | Adres |
|---|---|---|
| Aplikacja kierowcy | Nawigacja, trasa i koszty w jednej aplikacji | `/co-robi/aplikacja-kierowcy` |
| Trasy i mapa floty | Widzisz, gdzie jest każdy bus. Bez dzwonienia | `/co-robi/trasy-i-mapa` |
| Czas pracy i przerwy | Wiesz, kiedy kierowca musi stanąć | `/co-robi/czas-pracy` |

**W BIURZE**
| Pozycja | Zdanie pod nią | Adres |
|---|---|---|
| Dyspozytornia | Cały dzień pracy na jednym ekranie | `/co-robi/dyspozytornia` |
| Zlecenia i faktury | Ze zlecenia robi się faktura. Klient dostaje ją od razu | `/co-robi/zlecenia-i-faktury` |
| Ile zostaje | Zysk na każdym kursie, na bieżąco | `/co-robi/rentownosc` |

**NA KONIEC MIESIĄCA**
| Pozycja | Zdanie pod nią | Adres |
|---|---|---|
| Koszty i paragony | Zdjęcie zamiast reklamówki pod siedzeniem | `/co-robi/koszty-i-paragony` |
| Dane dla księgowej | Komplet dokumentów jednym przyciskiem | `/co-robi/dane-dla-ksiegowej` |
| Dokumenty i terminy | Nic nie wygaśnie po cichu | `/co-robi/dokumenty-i-terminy` |

**Kafel po prawej** (tło `mist`, promień 20 px), zawsze widoczny w tym menu:

> **Zobacz demo**
> Prawdziwa aplikacja z przykładową firmą. Bez zakładania konta. →

### Menu „Dla kogo” — cztery role

| Pozycja | Zdanie pod nią | Adres |
|---|---|---|
| Właściciel | Zysk, koszty i cała flota na jednym ekranie | `/dla-kogo/wlasciciel` |
| Dyspozytor | Zlecenia, mapa i kierowca w jednym miejscu | `/dla-kogo/dyspozytor` |
| Księgowa | Komplet dokumentów jednym przyciskiem | `/dla-kogo/ksiegowa` |
| Kierowca | Jeden przycisk: rusz. Resztą zajmuje się telefon | `/dla-kogo/kierowca` |

Stopka tego menu, drobnym szarym:
> W małej firmie jedna osoba nosi dwie role. Przełączasz widok jednym kliknięciem.

### Menu „Pomoc”

Centrum pomocy `/pomoc` · Pierwsze kroki `/pomoc/pierwsze-kroki` ·
Kontakt `/kontakt` · Status usługi `/status`

### Nawigacja na telefonie

Zamknięta: logo · przycisk **Demo** · hamburger.
Otwarta: nakładka na całą stronę, pozycje jako składane sekcje (Co robi, Dla kogo)
plus Cennik i Pomoc. Na dole dwa przyciski: **Zobacz demo** (niebieski) i **Zaloguj się** (obrysowany).
Zdania-korzyści zostają także na telefonie — to one sprzedają, nie etykiety.

---

## 2. Mapa stron

```
/                                    Strona główna
│
├── /co-robi                         Przegląd: dziewięć obszarów, każdy z linkiem
│   ├── /aplikacja-kierowcy          ← najważniejsza podstrona
│   ├── /dyspozytornia
│   ├── /trasy-i-mapa
│   ├── /czas-pracy
│   ├── /zlecenia-i-faktury
│   ├── /koszty-i-paragony
│   ├── /rentownosc
│   ├── /dane-dla-ksiegowej
│   └── /dokumenty-i-terminy
│
├── /dla-kogo                        Cztery role obok siebie
│   ├── /wlasciciel
│   ├── /dyspozytor
│   ├── /ksiegowa
│   └── /kierowca
│
├── /cennik                          Plany, kalkulator pojazdów, pytania o płatności
├── /demo                            Strona-próg przed wejściem do aplikacji
├── /pomoc                           Centrum pomocy
│   └── /pierwsze-kroki
├── /kontakt
├── /status                          Czy usługa działa
│
└── Dokumenty prawne (tylko stopka)
    ├── /regulamin
    ├── /prywatnosc
    ├── /powierzenie-danych
    └── /podprocesorzy
```

**Razem: 24 strony.** Strona główna, dziewięć stron funkcji, hub funkcji, cztery strony
ról, hub ról, cennik, demo, pomoc, pierwsze kroki, kontakt, status, cztery dokumenty prawne.

---

## 3. System przycisków

| Rodzaj | Napis | Dokąd | Gdzie występuje |
|---|---|---|---|
| Główny (niebieski) | **Wypróbuj 14 dni** | rejestracja w aplikacji | Hero, cennik, finał, każda podstrona na dole |
| Drugi (obrysowany) | **Zobacz demo** | demo w aplikacji | Pasek nawigacji, hero, sekcja demo, podstrony |
| Trzeci (tekst ze strzałką) | **Zobacz, jak to działa →** | podstrona funkcji | Pod każdą sekcją na stronie głównej |
| Tekstowy z ikoną sylwetki | **Zaloguj się** | logowanie w aplikacji | Tylko pasek nawigacji |

**Zasada:** na jednym ekranie nigdy więcej niż jeden niebieski przycisk.

**Demo w pasku zostaje obrysowane.** Wypełnienie kolorem `ink` było sprawdzone i odrzucone —
za ciężkie na jasnym pasku. „Zaloguj się" zostaje tekstem z ikoną sylwetki i stonowanym
kolorem, bo to droga dla tych, którzy już mają konto, a nie zaproszenie dla nowych.

Pod głównym przyciskiem zawsze ten sam podpis, drobnym szarym:
> Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.

*(Nie piszemy „bez karty” — patrz `02`, punkt o pułapce.)*

---

## 4. Ścieżka demo

To jest najważniejsza ścieżka na stronie, bo zdejmuje całe ryzyko z pierwszego kontaktu.

```
Strona → [ Zobacz demo ] → strona /demo → aplikacja z przykładową firmą
                              (jeden ekran, 15 sekund czytania)
```

**Strona `/demo`** istnieje po to, żeby człowiek wiedział, w co wchodzi, i nie odbił się
od pustego pulpitu. Zawiera:

- Nagłówek: **Wejdź i poklikaj.**
- Trzy zdania: to prawdziwa aplikacja, dane są przykładowe, niczego nie zepsujesz.
- Cztery kafelki: co warto zobaczyć w środku *(pulpit z zyskiem · dyspozytornia ·
  zlecenie z fakturą · komplet dla księgowej)*
- Duży przycisk: **Wejdź do demo**
- Pod nim: **Chcesz na swoich danych? Wypróbuj 14 dni →**

**Wewnątrz aplikacji** (wymaganie do zespołu produktowego, nie do projektanta strony):
- pasek u góry: *„To jest demo. Dane przykładowe, resetują się co noc.”* plus przycisk
  **Załóż własne konto**
- tryb tylko do odczytu — nic się nie psuje
- **przełącznik roli**: właściciel · dyspozytor · księgowa. To jest najmocniejszy argument
  całej strony — człowiek w minutę widzi trzy różne stanowiska pracy

> **Do rozstrzygnięcia:** czy demo startuje na pulpicie właściciela (rekomendacja: tak)
> i czy przełącznik ról w demo jest w zakresie etapu 5.

---

## 5. Powtarzalne elementy podstron

Każda z dziewięciu stron funkcji ma ten sam szkielet — dzięki temu Claude Design
projektuje jeden układ, a nie dziewięć:

1. **Nagłówek** — korzyść w dwóch linijkach, jedno zdanie pod spodem, dwa przyciski
2. **Duża makieta** — ten jeden ekran, o którym jest ta strona
3. **Trzy do pięciu bloków** „co to znaczy w praktyce” — naprzemiennie tekst i makieta
4. **Drobiazgi** — siatka sześciu kafelków z rzeczami, które widać dopiero w użyciu
5. **Kto tego używa** — jedna albo dwie role z linkiem do strony roli
6. **Pytania** — trzy, dotyczące tylko tego obszaru
7. **Finał** — ten sam na wszystkich podstronach: „Zacznij od jednej trasy”

Strony ról mają szkielet własny, opisany w `05`.

---

## 6. Stopka

Cztery kolumny plus pasek dolny.

| Co robi | Dla kogo | Firma | Prawne |
|---|---|---|---|
| Aplikacja kierowcy | Właściciel | Cennik | Regulamin |
| Dyspozytornia | Dyspozytor | Demo | Polityka prywatności |
| Trasy i mapa | Księgowa | Pomoc | Powierzenie danych |
| Czas pracy | Kierowca | Kontakt | Podprocesorzy |
| Zlecenia i faktury | | Status usługi | |
| Koszty i paragony | | | |
| Ile zostaje | | | |
| Dane dla księgowej | | | |
| Dokumenty i terminy | | | |

Pasek dolny: nazwa spółki, NIP, adres e-mail, zdanie *„Twoje dane zostają w Europie”*.
Bez ikon mediów społecznościowych, dopóki nie ma tam realnych kont.
