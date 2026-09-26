/**
 * Stan usługi — jedno miejsce do zmiany w razie przerwy.
 *
 * Nie ma jeszcze monitoringu, który zmieniałby to sam, więc stan ustawiamy
 * ręcznie: zmiana `stan` i ewentualne dopisanie zdarzenia to jeden commit.
 * Strona nie udaje, że sprawdza się co pięć minut — mówi wprost, jak jest.
 *
 * Docelowo podłączenie pod Sentry albo Grafanę. Wtedy `stan` i `czesci` przyjdą
 * z monitoringu, `zdarzenia` zostaną ręczne (to nie jest log, tylko wyjaśnienie
 * dla człowieka), a podpis pod nagłówkiem w `app/status/page.tsx` trzeba będzie
 * zmienić z „sprawdzamy ręcznie" na prawdziwą częstotliwość.
 */

import type { Tlumaczenia } from '@/i18n/jezyki';

export type Stan = 'ok' | 'czesciowa' | 'przerwa';

/*
 * Każdy tekst stoi w obu językach naraz, w jednym obiekcie — przy przerwie
 * zmieniasz jeden wpis i nie da się zapomnieć o wersji angielskiej.
 */

export type CzescUslugi = {
  nazwa: Tlumaczenia<string>;
  /** Słowo obok nazwy — „działa", „przerwa", „zapisuje lokalnie". */
  slowo: Tlumaczenia<string>;
  ton: 'ok' | 'uwaga' | 'przerwa';
};

export type Zdarzenie = {
  /** Stały identyfikator wpisu, np. `2026-09-14`. */
  id: string;
  data: Tlumaczenia<string>;
  czas: Tlumaczenia<string>;
  /** Co się stało. */
  co: Tlumaczenia<string>;
  /** Co zrobiliśmy. */
  zrobione: Tlumaczenia<string>;
};

const naglowki: Record<Stan, Tlumaczenia<string>> = {
  ok: { pl: 'Wszystko działa.', en: 'Everything is working.' },
  czesciowa: { pl: 'Przerwa w części usługi.', en: 'Part of the service is down.' },
  przerwa: { pl: 'Przerwa całkowita.', en: 'Full outage.' },
};

export const stan: Stan = 'ok';

export const naglowek = naglowki[stan];

/** Zdanie pod nagłówkiem — dopisujemy je tylko wtedy, gdy coś nie działa. */
export const nota: Tlumaczenia<string> | null = null;

const dziala = { pl: 'działa', en: 'working' };

export const czesci: CzescUslugi[] = [
  { nazwa: { pl: 'Aplikacja webowa', en: 'Web app' }, slowo: dziala, ton: 'ok' },
  { nazwa: { pl: 'Aplikacja kierowcy', en: 'Driver app' }, slowo: dziala, ton: 'ok' },
  { nazwa: { pl: 'Wysyłka faktur', en: 'Invoice sending' }, slowo: dziala, ton: 'ok' },
  {
    nazwa: { pl: 'Eksporty dla księgowej', en: 'Exports for your accountant' },
    slowo: dziala,
    ton: 'ok',
  },
];

/** Ostatnie dwanaście miesięcy. Pusta lista to prawdziwa odpowiedź, nie brak danych. */
export const zdarzenia: Zdarzenie[] = [];
