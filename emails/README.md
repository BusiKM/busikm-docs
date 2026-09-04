# Szablony wiadomości (Klaviyo)

Pliki w tym katalogu **nie są częścią strony** — Next.js ich nie buduje i nie
wysyła. To źródła szablonów, które wkleja się do Klaviyo. Trzymamy je w repo,
żeby zmiana treści przechodziła przez zwykły przegląd, a nie ginęła w panelu.

| Plik | Kiedy idzie |
|------|-------------|
| `powitalny.html` | Zaraz po zapisie na listę BusiKM — flow wyzwalany zdarzeniem *Subscribed to List*. |

## Jak wgrać do Klaviyo

1. **Content → Templates → Create template → Code editor** (nie drag-and-drop —
   ten rozłoży ręcznie napisany HTML).
2. Wklej całą zawartość pliku.
3. **Preview → wybierz profil** z listy BusiKM i sprawdź, czy imię oraz zdanie
   zależne od źródła podstawiają się poprawnie.
4. **Flows → Create flow → Metric: Subscribed to List → BusiKM**, dodaj Email
   i wybierz ten szablon. Opóźnienie zostaw zerowe.

Temat wiadomości ustawia się w samym flow, nie w szablonie. Proponowany:
**„Jesteś na liście BusiKM"**, preheader podciąga się z ukrytego akapitu
u góry pliku.

## Tagi, które muszą zostać

- `{% unsubscribe_link %}` — **Klaviyo odmówi zapisania szablonu bez niego.**
  Stoi w `href` odnośnika wypisu; nie zamieniaj go na `{% unsubscribe %}`,
  bo ten drugi wypisuje gotowy `<a>` i wewnątrz `href` się psuje.
- `{% if first_name %}` — bez imienia nagłówek schodzi na „Jesteś na liście."
- `person|lookup:'zrodlo'` — jedno zdanie zmienia się zależnie od tego, skąd
  przyszedł zapis (`demo`, `rejestracja`, `formularz`). Właściwość ustawia
  `landing/src/lib/klaviyo.ts` przy tworzeniu profilu.

Nazwy właściwości są **wrażliwe na wielkość liter** — `zrodlo`, nie `Zrodlo`.

## Czego pilnować przy zmianach

**Układ na tabelach, style w atrybucie `style`.** Nie flexbox, nie grid, nie
klasy — Outlook renderuje silnikiem Worda i zignoruje wszystko poza tym.
`<style>` w nagłówku zostaje wyłącznie na media query; część klientów wycina
go w całości, więc nic istotnego nie może od niego zależeć.

**Szerokość jest płynna** (`width="100%"` + `max-width:600px`), nie stała.
Outlook nie zna `max-width`, dlatego dostaje własną ramkę 600 px w komentarzu
warunkowym `<!--[if mso | IE]>`. Nie usuwaj go.

**Fonty.** Inter i IBM Plex Mono załadują się w Apple Mail i na iOS. Gmail
i Outlook je zignorują i zejdą na stos systemowy — dlatego każdy `font-family`
ma pełny fallback, a nie samo `'Inter'`.

**Kolory** pochodzą z `landing/src/app/globals.css` (sekcja `@theme`) i są tu
wpisane wprost, bo w mailu nie ma zmiennych CSS. Przy zmianie tokenu na stronie
trzeba je podmienić ręcznie: `#0A0A0B`, `#FAFAFA`, `#FFFFFF`, `#E3E3E6`,
`#6C6C74`, `#0B5FFF`, `#8E8E96`, `#26262B`.

## Podgląd lokalny

Tagi Klaviyo nie renderują się w przeglądarce — podstaw je przed otwarciem:

```bash
sed -e "s/{% unsubscribe_link %}/#/" emails/powitalny.html > /tmp/podglad.html
open /tmp/podglad.html
```
