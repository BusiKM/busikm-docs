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

export type Stan = 'ok' | 'czesciowa' | 'przerwa';

export type CzescUslugi = {
  nazwa: string;
  /** Słowo obok nazwy — „działa", „przerwa", „zapisuje lokalnie". */
  slowo: string;
  ton: 'ok' | 'uwaga' | 'przerwa';
};

export type Zdarzenie = {
  data: string;
  czas: string;
  /** Co się stało. */
  co: string;
  /** Co zrobiliśmy. */
  zrobione: string;
};

const naglowki: Record<Stan, string> = {
  ok: 'Wszystko działa.',
  czesciowa: 'Przerwa w części usługi.',
  przerwa: 'Przerwa całkowita.',
};

export const stan: Stan = 'ok';

export const naglowek = naglowki[stan];

/** Zdanie pod nagłówkiem — dopisujemy je tylko wtedy, gdy coś nie działa. */
export const nota: string | null = null;

export const czesci: CzescUslugi[] = [
  { nazwa: 'Aplikacja webowa', slowo: 'działa', ton: 'ok' },
  { nazwa: 'Aplikacja kierowcy', slowo: 'działa', ton: 'ok' },
  { nazwa: 'Wysyłka faktur', slowo: 'działa', ton: 'ok' },
  { nazwa: 'Eksporty dla księgowej', slowo: 'działa', ton: 'ok' },
];

/** Ostatnie dwanaście miesięcy. Pusta lista to prawdziwa odpowiedź, nie brak danych. */
export const zdarzenia: Zdarzenie[] = [];
