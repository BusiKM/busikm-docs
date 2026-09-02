# 09 · Workflow: od Claude Design do działającej strony

Podział pracy w jednym zdaniu:
**`docs/landing/` trzyma treść · Claude Design robi wygląd · `landing/` to kod.**

Zasada, która oszczędza najwięcej czasu: **jeśli w Claude Design zmienisz jakieś zdanie,
wraca ono do `04-homepage.md` albo `05-podstrony.md`, zanim trafi do kodu.** Bez tego
po trzech iteracjach nikt nie wie, która wersja treści jest prawdziwa.

---

## Etap 0 · Fundament — nie czeka na projekt

Rzeczy niezależne od tego, jak projekt wyjdzie. Robię je równolegle z Twoją pracą
w Claude Design.

1. **Komponent `MockupSlot`** i katalog `landing/public/mockups/` — ramki zastępcze
   z opisem i nazwą pliku, wg `08`. Podmiana obrazu = wrzucenie pliku.
2. **System animacji** z `06` — `data-reveal`, obserwator, kaskada, `prefers-reduced-motion`
   i mechanika trzech scen przyklejonych.
3. **Rozwijane menu w `Header`** — struktura i stany. Styl dojdzie z projektu.
4. **Dwadzieścia cztery trasy** ze szkieletem i metadanymi. Dzięki temu linki w nawigacji
   działają od pierwszego dnia, a nie na końcu.
5. **Katalog `design/`** z README: gdzie wrzucać eksporty i jak je nazywać.

*Jedna sesja.*

---

## Etap 1 · Strona główna w Claude Design — Ty

1. Otwierasz `07-prompt-claude-design.md`, kopiujesz od `# PROMPT 1 — STRONA GŁÓWNA`
   do `KONIEC PROMPTU 1`. Wklejasz jako jedną wiadomość. Nic nie dodajesz.
2. **Iterujesz w tej samej rozmowie, po polsku.** Konkretne uwagi działają, ogólne nie:

   | Działa | Nie działa |
   |---|---|
   | „Sekcja 7 jest za ciasna — więcej powietrza nad nagłówkiem” | „Zrób ładniej” |
   | „Telefony pod mniejszym kątem, maks. 6 stopni” | „Coś mi nie pasuje z telefonami” |
   | „W makiecie pulpitu kolumna z liczbami jest nieczytelna” | „Popraw pulpit” |
   | „Ciemna sekcja 9 za blisko sekcji 7 — przełam ją jaśniejszą” | „Za dużo ciemnego” |

3. Na koniec upewnij się, że dostałeś **trzeci artboard: stany nawigacji**
   (pasek domyślny, po przewinięciu, oba rozwinięte menu, menu na telefonie).
   Ten najczęściej umyka.
4. Eksportujesz i wrzucasz do repo: **`design/01-home/`**.

*Tyle sesji, ile potrzeba — to najtańszy moment na zmiany.*

---

## Etap 2 · Strona główna w kodzie — ja

Co robię:
- porównuję projekt z `04-homepage.md` i **wypisuję każdą rozbieżność w treści**;
  ty decydujesz, która wersja wygrywa, a wynik ląduje w dokumentacji,
- przenoszę tokeny do `globals.css`, składam sekcje na komponenty,
- w miejscach makiet wstawiam `MockupSlot` z nazwami plików z `08`,
- podpinam animacje wg `06`.

Zanim oddam, sprawdzam: `tsc`, `next build`, brak poziomego przewijania od 320 do 1920 px,
kontrast tekstu, zachowanie przy `prefers-reduced-motion`, kolejność nagłówków.

Dostajesz commit na gałęzi i krótką listę rozbieżności do decyzji.

*Około dwóch sesji.*

---

## Etap 3 · Podstrony falami

Fale nie czekają na siebie: kiedy ja implementuję falę pierwszą, Ty projektujesz drugą.

| Fala | Strony | Dlaczego w tej kolejności | Stan |
|---|---|---|---|
| **1** | Aplikacja kierowcy · Dyspozytornia · Dane dla księgowej · Ile zostaje | Zdejmują cztery największe obiekcje | ✅ zamknięta |
| **2** | Zlecenia i faktury · Trasy i mapa · Czas pracy · Koszty i paragony · Dokumenty | Domykają obszar „Co robi” | ✅ zamknięta |
| **3** | Cztery strony ról · Cennik · Demo | Domykają nawigację | prompty 11–16 gotowe, czeka na projekty |
| **4** | Pomoc · Pierwsze kroki · Kontakt · Status · cztery prawne | Nie potrzebują Claude Design — wystarczy szablon z fali 1 | |

Rytm jednej fali: prompt → projekt → eksport do `design/NN-<nazwa>/` → kod → przegląd.

*Około dwóch sesji na falę.*

---

## Etap 4 · Podmiana makiet

Gdy w aplikacji powstaje prawdziwy ekran:

1. Zrzut w rozdzielczości dwukrotnej, **na danych demo** — te same trasy i numery
   rejestracyjne, co w makietach (`Warszawa → Mediolan`, `WZ 4821K`).
2. Plik do `landing/public/mockups/` pod nazwą z tabeli w `08`.
3. Ramka znika sama.

Podmiany można robić pojedynczo, w dowolnej kolejności. Strona jest gotowa do pokazania
także z ramkami.

---

## Etap 5 · Wyjście na produkcję

1. **Vercel** — Root Directory z `site/` na `landing/`. Bez tego deploy padnie po merge'u.
2. **Przekierowania ze starych adresów.** Stara strona miała 26 podstron w indeksie
   wyszukiwarki. Bez przekierowań tracimy je wszystkie. Do `next.config.ts`:

   | Stary adres | Nowy |
   |---|---|
   | `/funkcje` | `/co-robi` |
   | `/dla-kierowcow` | `/dla-kogo/kierowca` |
   | `/dla-wlascicieli` | `/dla-kogo/wlasciciel` |
   | `/dla-ksiegowych` | `/dla-kogo/ksiegowa` |
   | `/dla-biur-rachunkowych` | `/dla-kogo/ksiegowa` |
   | `/aetr`, `/g2v2-przygotowanie` | `/co-robi/czas-pracy` |
   | `/docs/aplikacja-mobilna` | `/co-robi/aplikacja-kierowcy` |
   | `/docs/aplikacja-webowa` | `/co-robi/dyspozytornia` |
   | `/docs/integracje-fk` | `/co-robi/dane-dla-ksiegowej` |
   | `/docs/*` (reszta) | `/pomoc` |
   | `/roadmapa`, `/technologia` | `/` |
   | `/en/*` | `/` |

   Wszystkie jako trwałe (`permanent: true`).
3. **`robots.txt`** — wskazuje `sitemap-index.xml`, który generowało Astro. Albo dorzucamy
   `src/app/sitemap.ts`, albo usuwamy tę linię.
4. **Podgląd linku** — sprawdzić, jak strona wygląda wklejona na LinkedIn i w mailu.
5. **Merge PR #6.**

---

## Trzy zasady

1. **Jedna rozmowa w Claude Design na wszystko.** System zostaje spójny, kolejne prompty
   są krótsze. Jeśli rozmowa spuchnie — nowa, ale z doklejonymi rozdziałami 3 i 4
   z PROMPTU 1.
2. **Treść zmienia się najpierw w dokumentacji.** Potem w projekcie i w kodzie.
3. **Nie implementujemy strony przed akceptacją projektu.** Poprawka w projekcie kosztuje
   minuty, ta sama poprawka w kodzie — godziny.

---

## Gdzie jesteśmy

- [x] Dokumentacja i treść — `docs/landing/`
- [x] Rozstrzygnięcia produktowe — pięć zamkniętych, patrz `01`
- [x] **Etap 0 — fundament w kodzie** — `MockupSlot`, animacje, rozwijane menu, 25 tras
- [ ] Etap 1 — strona główna w Claude Design ← następny ruch po Twojej stronie
- [ ] Etap 2 — strona główna w kodzie
- [ ] Etap 3 — podstrony, cztery fale
- [ ] Etap 4 — podmiana makiet
- [ ] Etap 5 — produkcja

**Etapy 0 i 1 idą równolegle.** Nie musisz na mnie czekać, żeby wkleić PROMPT 1.
