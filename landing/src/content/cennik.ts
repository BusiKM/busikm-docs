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
 *
 * Liczby i identyfikatory stoją raz, w `CENY` — obie wersje językowe biorą
 * je stąd, więc cena po angielsku nie może rozjechać się z polską.
 */

import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';
import type { PlanId } from '@/content/zainteresowanie';

export type Plan = {
  /** Identyfikator do adresu — patrz `content/zainteresowanie.ts`. */
  id: PlanId;
  name: string;
  /** Kwoty w złotych netto, tysiące rozdzielone spacją. */
  monthly: string;
  yearly: string;
  specs: readonly (readonly [string, string])[];
  features: readonly string[];
  highlighted: boolean;
};

const CENY = [
  { id: 'start', monthly: '149', yearly: '1 490', highlighted: false },
  { id: 'firma', monthly: '299', yearly: '2 990', highlighted: true },
] as const;

type Tekst = Pick<Plan, 'name' | 'specs' | 'features'>;

const TEKSTY: Tlumaczenia<Record<PlanId, Tekst>> = {
  pl: {
    start: {
      name: 'Start',
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
    },
    firma: {
      name: 'Firma',
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
    },
  },
  en: {
    start: {
      name: 'Start',
      specs: [
        ['Vehicles', 'up to 3'],
        ['Drivers', 'unlimited'],
        ['Office staff', 'unlimited'],
      ],
      features: [
        'orders and dispatch',
        'map and routes',
        'working time',
        'costs and receipts',
        'invoices for clients',
        'driver app',
      ],
    },
    firma: {
      name: 'Business',
      specs: [
        ['Vehicles', 'up to 10, then +PLN 29 each'],
        ['Drivers', 'unlimited'],
        ['Office staff', 'unlimited'],
      ],
      features: [
        'everything in Start, plus:',
        'full pack for your accountant',
        'sales and purchase reports',
        'profitability per order',
        'fleet cost reports',
      ],
    },
  },
};

function wJezyku(jezyk: Jezyk): readonly Plan[] {
  return CENY.map((c) => ({ ...c, ...TEKSTY[jezyk][c.id] }));
}

export const plans: Tlumaczenia<readonly Plan[]> = {
  pl: wJezyku('pl'),
  en: wJezyku('en'),
};
