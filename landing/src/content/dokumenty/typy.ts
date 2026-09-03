/**
 * Wspólny kształt czterech dokumentów prawnych. Treść siedzi w danych, układ
 * w komponencie — dzięki temu zmiana w regulaminie to zmiana tekstu, a nie JSX.
 */

export type Blok =
  | { typ: 'akapit'; tresc: string }
  | { typ: 'lista'; wstep?: string; punkty: string[] }
  /** Termin i jego wyjaśnienie — „Usługodawca — BusiKM sp. z o.o. …". */
  | { typ: 'definicje'; wstep?: string; pozycje: { termin: string; opis: string }[] }
  | { typ: 'tabela'; naglowki: string[]; wiersze: string[][]; stopka?: string };

export type Paragraf = {
  /** „§ 1" albo — w dokumentach bez paragrafów — sam numer porządkowy. */
  numer: string;
  tytul: string;
  bloki: Blok[];
};

export type Dokument = {
  /** Adres strony, np. `/regulamin`. */
  href: string;
  tytul: string;
  obowiazujeOd: string;
  wersja: number;
  ostatniaZmiana: string;
  /** Trzy–cztery zdania prostym językiem. Jedyna część, którą ktokolwiek przeczyta. */
  wSkrocie: string[];
  paragrafy: Paragraf[];
};

/** Identyfikator kotwicy paragrafu — używany po stronie serwera i klienta. */
export function kotwica(numer: string) {
  return `p-${numer.replace(/\s+/g, '')}`;
}
