# Wersja angielska (i18n)

Serwis jest dwujęzyczny: polski pod adresami bez przedrostka, angielski pod `/en`.
Każda strona ma odpowiednik w drugim języku, a przełącznik **EN / PL** w pasku
nawigacji prowadzi na tę samą stronę w drugim języku.

| Polski | Angielski |
|---|---|
| `/` | `/en` |
| `/cennik` | `/en/pricing` |
| `/co-robi/czas-pracy` | `/en/features/working-time` |
| `/dla-kogo/ksiegowa` | `/en/for/accountants` |
| `/pomoc/nowe-zlecenie` | `/en/help/new-order` |
| `/regulamin` | `/en/terms` |

Pełna lista adresów: `landing/src/i18n/trasy.ts`.

## Który język dostaje czytelnik

Decyduje `landing/src/proxy.ts`, przy każdym wejściu, w tej kolejności:

1. **Wybór z przełącznika** — ciasteczko `jezyk` (`pl` / `en`, ważne rok).
   Kto raz kliknął EN, dostaje angielski także z Polski i z polską przeglądarką.
2. **Bez wyboru** — polski, jeśli czytelnik wchodzi z Polski (nagłówek Vercela
   `x-vercel-ip-country: PL`) **albo** pierwszym językiem przeglądarki jest
   polski. Każdy inny kraj i język → angielski.
3. **Nic nie wiadomo** (brak kraju i języka, np. monitoring) → polski.

Gdy język adresu nie zgadza się z wybranym, czytelnik dostaje przekierowanie 307
na tę samą stronę w swoim języku.

**Roboty nie są przekierowywane.** Googlebot indeksuje z USA — przekierowanie
odcięłoby mu polską wersję. O istnieniu obu dowiaduje się z `hreflang`
w metadanych każdej strony i w `sitemap.xml`. To samo dotyczy podglądów linków
(Facebook, LinkedIn, WhatsApp) i Lighthouse w CI.

Lokalnie nagłówka kraju nie ma, więc decyduje język przeglądarki. Żeby
podejrzeć wersję angielską z polską przeglądarką, kliknij **EN** w pasku.

## Jak to działa w kodzie

Obie wersje żyją w jednym drzewie `landing/src/app/[lang]/…` pod **polskimi**
nazwami katalogów. Proxy przepisuje adres publiczny na wewnętrzny:
`/cennik` → `/pl/cennik`, `/en/pricing` → `/en/cennik`. Obie wersje są
generowane statycznie przy budowaniu.

| Plik | Rola |
|---|---|
| `src/i18n/jezyki.ts` | Lista języków, typ `Tlumaczenia<T>` |
| `src/i18n/trasy.ts` | Mapa adresów PL → EN, `lokalizuj()`, `rozpoznaj()` |
| `src/i18n/serwer.ts` | `biezacyJezyk()` dla komponentów serwerowych |
| `src/i18n/klient.tsx` | `useJezyk()` dla komponentów klienckich |
| `src/i18n/Link.tsx` | `next/link`, który sam tłumaczy `href` |
| `src/proxy.ts` | Wykrywanie języka, przekierowania, przepisanie adresu, 404 |
| `src/components/layout/PrzelacznikJezyka.tsx` | Przycisk EN / PL |

Treść siedzi obok siebie w obu językach:

```tsx
const TEKSTY: Tlumaczenia<{ naglowek: string }> = {
  pl: { naglowek: 'Kierowca jedzie.' },
  en: { naglowek: 'The driver drives.' },
};

export function Sekcja() {
  const t = TEKSTY[biezacyJezyk()]; // w komponencie klienckim: useJezyk()
  return <h2>{t.naglowek}</h2>;
}
```

Odnośniki w kodzie zostają **polskie** (`href="/cennik"`) — `@/i18n/Link`
i `Button` zamieniają je na angielskie same. Zwykłe `<a>` przepuszczaj przez
`lokalizuj(href, jezyk)`.

## Nowa podstrona — lista kontrolna

1. Katalog w `src/app/[lang]/…` pod polską nazwą; strona zaczyna się od
   `await jezykZParametrow(params)` i eksportuje
   `generateMetadata = metadataPodstrony('<slug>')`.
2. Wpis w `src/i18n/trasy.ts` (`STRONY`) z angielskim adresem. **Bez niego
   strona zwraca 404 w obu językach** — proxy traktuje nieznany adres jako
   nieistniejący.
3. Opis strony w `src/content/pages.ts` — w `strony` i w `stronyEn`.
4. Wpis w `trasy` w `src/content/seo.ts` (mapa strony dostaje obie wersje sama).
5. Nowy artykuł pomocy: angielski slug w `SLUGI_ARTYKULOW` w `src/i18n/trasy.ts`.

## Dokumenty prawne

Regulamin, polityka prywatności, powierzenie danych i lista podprocesorów są
przetłumaczone, ale **wiążąca jest wersja polska** — każdy dokument po
angielsku ma na górze adnotację z odnośnikiem do oryginału.

Ciasteczko `jezyk` jest niezbędne (zapamiętuje wybór, którego czytelnik sam
dokonał), więc nie wymaga zgody z banera — opisane w polityce prywatności.

## Strona 404

Układ główny stoi w `app/[lang]`, więc wbudowana strona 404 Next.js nie ma
układu (wychodziła bez nagłówka, stopki i `<html lang>`). Dlatego proxy kieruje
każdy nieznany adres na `app/[lang]/nie-znaleziono` ze statusem 404 — adres
w pasku przeglądarki zostaje ten, który wpisał czytelnik.
