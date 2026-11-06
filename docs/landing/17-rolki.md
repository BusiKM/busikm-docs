# Rolki na stronie (`/rolki`)

Rolki z [naszej strony na Facebooku](https://www.facebook.com/busikm) oglądane na
busikm.pl, we własnym odtwarzaczu, od najnowszej. Czytelnik nie potrzebuje konta na
Facebooku i niczego stamtąd nie ładujemy. Nowa rolka pojawia się sama.

## Co robisz przy nowej rolce

1. Renderujesz ją w `busikm-video`. Format story sam trafia do poczekalni w R2.
2. Publikujesz ją na Facebooku, ręcznie lub z planera. **Opis musi mieć hashtag kategorii.**

Nic więcej. Rolka jest na stronie najpóźniej po około 1 godz. 15 min od publikacji.

## Kategorie

Filtr na stronie to hashtag w opisie na Facebooku. Wielkość liter i polskie znaki nie mają
znaczenia.

| Hashtag | Filtr |
|---|---|
| `#WTrasie` | W trasie |
| `#WBiurze` | W biurze |
| `#NaKoniecMiesiaca` | Na koniec miesiąca |
| `#ZZyciaFirmy` | Z życia firmy |

Filtr bez rolek się nie pokazuje. Rolka bez takiego hashtagu nie znika: automat zgaduje
kategorię ze słów w opisie, a w logu zostawia wpis „Bez hashtagu kategorii”.

## Dlaczego własny odtwarzacz

Odtwarzacz Facebooka to obcy skrypt z ciasteczkami Mety. Polityka prywatności obiecuje
przekazywanie danych Mecie wyłącznie po zgodzie na reklamę, więc kto jej nie da, zobaczyłby
prośbę o zgodę zamiast filmu. Wtyczki polubień i komentarzy Meta wyłączyła w lutym 2026,
a komentować przez API można tylko jako strona. Dlatego komentarze zostają na Facebooku,
a „Skomentuj na Facebooku” prowadzi do konkretnej rolki.

## Jak to działa

```
busikm-video ── po renderze ──▶ R2 rolki/pliki/<slug>-<skrót>.mp4, poczekalnia.json
                                        │
Facebook ── lista rolek ──▶ synchronizuj.mjs (GitHub Actions, co godzinę)
                                        │
                   R2 rolki/katalog.json, okładki, w razie potrzeby film z Facebooka
                                        │
                            Worker busikm-media (media-worker/)
                                        │
          landing: pobierzRolki() czyta katalog, odświeża co 15 minut
```

Facebook jest źródłem listy: rolka usunięta tam znika też ze strony, a zmiana opisu
przechodzi na stronę przy następnym przebiegu.

**Który plik trafia na stronę.** Rolka i film z poczekalni są łączone po długości, z
tolerancją 0,05 s. Film bierzemy tylko wtedy, gdy kandydat jest jeden, bo dwie rolki potrafią
mieć identyczną długość, a zły film jest gorszy niż niższa jakość. Bez kandydata automat pobiera
plik z Facebooka i przelicza go na H.264: Facebook oddaje 720p przy około 700 kbit/s, a starsze
rolki w AV1, którego nie odtworzy starszy iPhone. Gdy film z poczekalni pojawi się później, zastąpi
wersję z Facebooka sam. Plik kopiujemy do R2, bo linki z Facebooka wygasają po kilku dniach.

**Tytuł i opis.** Tytuł to pierwsze zdanie opisu na Facebooku, a opis to kolejne zdania. Odpadają
emoji, hashtagi, wyliczenia, pytania i wezwania do działania. Odpadają też zdania z limitami,
karami i podstawami prawnymi, bo [strona nie podaje przepisów](02-odbiorcy-i-jezyk.md).

## Poprawki ręczne

`media-worker/rolki/nadpisania.json`, klucz to numer rolki z `facebook.com/reel/<numer>`:

```json
{
  "1234567890": {
    "tytul": "Inny tytuł",
    "opis": "Inny opis.",
    "temat": "biuro",
    "cel": "/cennik",
    "slug": "inny-adres",
    "ukryta": true
  }
}
```

Każde pole jest opcjonalne. `ukryta: true` usuwa rolkę ze strony, a zostawia ją na Facebooku. `cel`
to strona z `/co-robi/…`, `/cennik` albo `/demo`, a bez wpisu wynika ze słów w opisie. Zmiana wymaga
PR-a, ale nie wdrożenia strony.

## Dostęp i sekrety

Aplikacja Meta to **BusiKM Rolki**, a dostęp ma konto techniczne (System user) portfolio Movgranto,
tylko do strony Busikm.pl i tylko do odczytu. Sekrety w repozytorium GitHub:

| Sekret | Do czego |
|---|---|
| `FB_TOKEN` | Odczyt rolek z Facebooka |
| `CLOUDFLARE_API_TOKEN` | Zapis do R2, tylko bucket `busikm-public` |
| `CLOUDFLARE_ACCOUNT_ID` | Konto Cloudflare |

Repozytorium jest publiczne, a logi akcji też. Dlatego skrypt wysyła token nagłówkiem, nie korzysta
z `paging.next` (Facebook dokleja tam token) i nie wypisuje adresów z Facebooka.

Ręczne uruchomienie: GitHub → Actions → Rolki → Run workflow. GitHub wyłącza harmonogram po 60 dniach
bez aktywności w repozytorium i wysyła o tym maila. Włącza się go tam samo.

Podgląd bez R2:

```bash
FB_TOKEN=… node media-worker/rolki/synchronizuj.mjs --lokalnie /tmp/media
```

Dowolny serwer plików z obsługą Range na tym katalogu i `ROLKI_URL=http://localhost:3011/rolki npm run dev`
pokazują stronę z tymi danymi. `npm run rolka -- <slug> --lokalnie=/tmp/media` robi to samo po stronie
`busikm-video`.

## Zachowanie, które łatwo zepsuć

- **Otwarta rolka żyje w adresie** (`?rolka=slug`). Stąd link do konkretnego filmu i to, że wstecz na
  telefonie zamyka odtwarzacz. Czytanie `searchParams` na serwerze zmusiłoby stronę do renderowania
  przy każdym wejściu.
- **Na telefonie film stoi nad opisem i używa `object-contain`.** Rolki mają napisy wtopione w kadr, więc
  nakładka albo obcięcie boków by je zasłoniły.
- **Jeden `<video>` na wszystkie rolki.** Osobny element na każdą traci na iPhonie pozwolenie na dźwięk,
  a kolejna rolka startuje sama.
- **Wejście z linku startuje bez dźwięku.** Przeglądarka nie puści dźwięku bez kliknięcia, więc film gra
  wyciszony, a obok jest przycisk włączenia dźwięku.
- **Awaria R2 to pusta lista, nie błąd.** Sekcja na stronie głównej znika, podstrona odsyła na Facebooka,
  a build przechodzi bez sieci.
- **Pusta lista z Facebooka niczego nie kasuje.** To raczej awaria niż usunięcie wszystkich rolek.
- **Sekcja na stronie głównej ma próg 4 rolek** i jest tylko po polsku. Po angielsku do rolek prowadzi
  wyłącznie stopka, a strona uprzedza, że filmy są po polsku.
