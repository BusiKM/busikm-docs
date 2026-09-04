/**
 * Plany i ceny — jedno źródło.
 *
 * Wyjęte z komponentu sekcji, bo te same liczby czyta budownik danych
 * strukturalnych (`components/seo/schema.ts`), a ten działa po stronie
 * serwera. Wartość wyeksportowana z modułu oznaczonego `'use client'`
 * dociera do serwera jako odsyłacz do komponentu klienckiego, nie jako
 * tablica — stąd osobny plik.
 *
 * Rozjazd między ceną w cenniku a ceną w wyniku wyszukiwania Google zgłasza
 * jako „niezgodna cena" i odbiera wynik rozszerzony, więc te liczby muszą
 * pochodzić z jednego miejsca.
 */

export const plans = [
  {
    /** Identyfikator do adresu — patrz `content/zainteresowanie.ts`. */
    id: 'start',
    name: 'Start',
    monthly: '149',
    yearly: '1 490',
    specs: [
      ['Pojazdy', 'do 3'],
      ['Kierowcy', 'bez limitu'],
      ['Pracownicy biura', 'bez limitu'],
    ],
    features: [
      'zlecenia i dyspozytornia',
      'mapa i trasy',
      'czas pracy',
      'koszty i paragony',
      'faktury dla klientów',
      'aplikacja dla kierowców',
    ],
    highlighted: false,
  },
  {
    id: 'firma',
    name: 'Firma',
    monthly: '299',
    yearly: '2 990',
    specs: [
      ['Pojazdy', 'do 10, każdy kolejny +29 zł'],
      ['Kierowcy', 'bez limitu'],
      ['Pracownicy biura', 'bez limitu'],
    ],
    features: [
      'wszystko ze Start, a do tego:',
      'komplet dla księgowej',
      'zestawienia sprzedaży i zakupów',
      'rentowność zleceń',
      'raporty kosztów floty',
    ],
    highlighted: true,
  },
] as const;

export type Plan = (typeof plans)[number];
