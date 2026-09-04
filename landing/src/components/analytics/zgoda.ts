/**
 * Zgoda na analitykę — jedno miejsce, w którym trzymamy decyzję czytelnika.
 *
 * Polityka prywatności obiecuje wprost: „Analityczne włączamy dopiero po
 * Twojej zgodzie i możesz ją cofnąć w każdej chwili". Dlatego licznik nie
 * ładuje się wcale, dopóki zgody nie ma — nie ładuje się „w trybie bez
 * ciasteczek", tylko po prostu nie ma go na stronie. Wycofanie zgody
 * przeładowuje stronę, żeby skrypt zniknął z pamięci, a nie tylko przestał
 * zapisywać.
 */

export const KLUCZ = 'busikm.zgoda.analityka';

/** Zmiana decyzji — nasłuchuje jej moduł ładujący licznik. */
export const ZDARZENIE_ZMIANY = 'busikm:zgoda-zmiana';
/** Prośba o ponowne pokazanie banera — z odnośnika w stopce. */
export const ZDARZENIE_OTWARCIA = 'busikm:zgoda-otworz';

export type Zgoda = 'tak' | 'nie' | null;

export function odczytajZgode(): Zgoda {
  if (typeof window === 'undefined') return null;
  try {
    const wartosc = window.localStorage.getItem(KLUCZ);
    return wartosc === 'tak' || wartosc === 'nie' ? wartosc : null;
  } catch {
    // Prywatne okno albo zablokowane dane witryny — traktujemy jak brak zgody.
    return null;
  }
}

/**
 * Subskrypcja zmian decyzji — dla `useSyncExternalStore`.
 *
 * Zgoda siedzi w `localStorage`, czyli w magazynie **poza** Reactem. Czytanie
 * jej efektem i przepisywanie do stanu powoduje kaskadę renderów; ten hook
 * powstał dokładnie po to, żeby czytać takie źródła bez tej kaskady.
 *
 * Nasłuchujemy dwóch rzeczy: własnego zdarzenia (decyzja w tej karcie) oraz
 * `storage` (decyzja w innej karcie tej samej witryny — przeglądarka nie
 * wysyła go do karty, która sama zapisała).
 */
export function subskrybujZgode(przy: () => void): () => void {
  window.addEventListener(ZDARZENIE_ZMIANY, przy);
  window.addEventListener('storage', przy);
  return () => {
    window.removeEventListener(ZDARZENIE_ZMIANY, przy);
    window.removeEventListener('storage', przy);
  };
}

/** Serwer nie zna decyzji czytelnika — do hydracji zachowujemy się jak przy jej braku. */
export function zgodaNaSerwerze(): Zgoda {
  return null;
}

export function zapiszZgode(zgoda: Exclude<Zgoda, null>) {
  try {
    window.localStorage.setItem(KLUCZ, zgoda);
  } catch {
    /* brak pamięci — decyzja obowiązuje do przeładowania strony */
  }
  window.dispatchEvent(new CustomEvent(ZDARZENIE_ZMIANY, { detail: zgoda }));
}

/** Otwiera baner ponownie — używa tego odnośnik „Ustawienia cookie" w stopce. */
export function otworzUstawieniaCookie() {
  window.dispatchEvent(new Event(ZDARZENIE_OTWARCIA));
}
