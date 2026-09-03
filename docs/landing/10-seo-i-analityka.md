# 10. SEO i analityka

Co strona wysyła wyszukiwarkom, skąd to bierze i co trzeba zrobić ręcznie po
wdrożeniu. Wszystko, co da się trzymać w jednym miejscu, siedzi
w `landing/src/content/seo.ts`.

## Gdzie co leży

| Plik | Za co odpowiada |
|---|---|
| `src/content/seo.ts` | adres serwisu, lista tras z priorytetami, strony wyłączone z indeksu |
| `src/lib/metadata.ts` | budowanie `<title>`, opisów, adresów kanonicznych i podglądu OG |
| `src/app/sitemap.ts` | `/sitemap.xml` — generowana z listy tras |
| `src/app/robots.ts` | `/robots.txt` — generowany, wskazuje na mapę strony |
| `src/components/seo/schema.ts` | dane strukturalne (schema.org) |
| `src/components/analytics/` | Google Analytics i zgoda na ciasteczka |

## Dodanie nowej podstrony

1. Opis strony w `src/content/pages.ts` (tytuł, opis dla wyszukiwarek).
2. `export const metadata = pageMetadata('sciezka')` w pliku strony.
3. **Wpis w `trasy` w `src/content/seo.ts`** — bez tego strona nie trafi
   do `sitemap.xml` i Google znajdzie ją dopiero z odnośnika.

Okruszki i pytania dopisują się same: pierwsze z bieżącej ścieżki, drugie
z komponentu `Akordeon`.

## Dane strukturalne

Na każdej stronie: `Organization` (dane firmy z KRS-u), `WebSite`
i `SoftwareApplication` z cenami z `src/content/cennik.ts`. Na podstronach
dodatkowo `BreadcrumbList`, a tam gdzie jest akordeon — `FAQPage`.

Dwie rzeczy, których tam **nie ma i nie powinno być**, dopóki nie będzie
pokrycia w rzeczywistości:

- `aggregateRating` i `review` — oznaczenie wymyślonych ocen to naruszenie
  wytycznych Google i ręczna kara na całą domenę.
- `sameAs` z profilami społecznościowymi — dopisz dopiero, gdy profile
  powstaną.

Ceny w danych strukturalnych i ceny w cenniku pochodzą z jednego pliku.
Rozjazd Google zgłasza jako „niezgodna cena" i odbiera wynik rozszerzony.

## Analityka i zgoda

Licznik Google Analytics 4 **nie ładuje się w ogóle**, dopóki czytelnik nie
kliknie „Zgadzam się". Nie ładuje się „w trybie bez ciasteczek" — po prostu
go nie ma. Tak mówi polityka prywatności (§ 7) i tak działa kod.

- Decyzja siedzi w `localStorage` pod kluczem `busikm.zgoda.analityka`.
- Odnośnik „Ustawienia cookie" w stopce przywraca baner.
- Wycofanie zgody przeładowuje stronę, żeby usunąć skrypt z pamięci.
- Ciasteczko wygasa po 14 miesiącach (`cookie_expires`), bo tyle obiecuje
  polityka prywatności. Domyślne dwa lata GA4 byłyby z nią sprzeczne.

Bez zmiennej `NEXT_PUBLIC_GA_ID` licznik nie istnieje — dlatego praca lokalna
i podglądy na Vercelu nie zaśmiecają statystyk.

## Do zrobienia ręcznie po wdrożeniu

1. **Google Analytics 4** — załóż usługę, wklej `G-XXXXXXXXXX`
   do `NEXT_PUBLIC_GA_ID` w Vercelu, wyłącznie dla środowiska „Production".
   W panelu GA ustaw przechowywanie danych na **14 miesięcy** — inaczej
   polityka prywatności przestanie być prawdziwa.
2. **Google Search Console** — zweryfikuj domenę, kod wklej
   do `GOOGLE_SITE_VERIFICATION`, potem zgłoś `https://busikm.pl/sitemap.xml`.
3. **Bing Webmaster Tools** — import z Search Console jednym kliknięciem.
   Bing zasila też odpowiedzi ChatuGPT.
4. **Profil firmy w Google** — jeśli ma być widoczność lokalna; wtedy dopisz
   `sameAs` w `schema.ts`.
5. Sprawdź podgląd kafelka: Facebook Sharing Debugger, LinkedIn Post
   Inspector. Oba trzymają obraz w pamięci — po podmianie `og-image`
   trzeba wymusić odświeżenie.

## Czego świadomie nie ma

- **`meta keywords`** — Google ignoruje od 2009 roku.
- **`hreflang`** — strona jest jednojęzyczna. Wraca, gdy powstanie `/en`.
- **Przekierowań ze wszystkich starych adresów Astro** — tylko te, które mają
  odpowiednik treści (`next.config.ts`). Zrzucanie reszty na stronę główną
  Google traktuje jak „miękkie 404".
- **Blokady `/_next/` w `robots.txt`** — Google renderuje stronę jak
  przeglądarka i potrzebuje tych plików.
