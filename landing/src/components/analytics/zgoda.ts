/**
 * Zgody na analitykę i reklamę – jedno miejsce, w którym trzymamy decyzje czytelnika.
 *
 * Polityka prywatności obiecuje wprost: „Analityczne włączamy dopiero po
 * Twojej zgodzie i możesz ją cofnąć w każdej chwili". Dlatego licznik nie
 * ładuje się wcale, dopóki zgody nie ma – nie ładuje się „w trybie bez
 * ciasteczek", tylko po prostu nie ma go na stronie. Wycofanie zgody
 * przeładowuje stronę, żeby skrypt zniknął z pamięci, a nie tylko przestał
 * zapisywać.
 */

export const KLUCZ = 'busikm.zgoda.analityka';

/** Zmiana decyzji – nasłuchuje jej moduł ładujący licznik. */
export const ZDARZENIE_ZMIANY = 'busikm:zgoda-zmiana';
/** Prośba o ponowne pokazanie banera – z odnośnika w stopce. */
export const ZDARZENIE_OTWARCIA = 'busikm:zgoda-otworz';

export type Zgoda = 'tak' | 'nie' | null;

export function odczytajZgode(): Zgoda {
  return czytaj(KLUCZ);
}

/**
 * Zgoda na reklamę – osobna od analityki, bo to inny cel przetwarzania.
 *
 * Polityka prywatności rozdziela je w tabeli celów, więc i baner pozwala
 * zgodzić się na jedno bez drugiego. Pod tą zgodą ładuje się piksel Meta
 * (pomiar i dobór odbiorców reklam na Facebooku i Instagramie).
 */
export const KLUCZ_MARKETING = 'busikm.zgoda.marketing';

export function odczytajZgodeMarketingowa(): Zgoda {
  return czytaj(KLUCZ_MARKETING);
}

function czytaj(klucz: string): Zgoda {
  if (typeof window === 'undefined') return null;
  try {
    const wartosc = window.localStorage.getItem(klucz);
    return wartosc === 'tak' || wartosc === 'nie' ? wartosc : null;
  } catch {
    // Prywatne okno albo zablokowane dane witryny – traktujemy jak brak zgody.
    return null;
  }
}

/**
 * Subskrypcja zmian decyzji – dla `useSyncExternalStore`.
 *
 * Zgoda siedzi w `localStorage`, czyli w magazynie **poza** Reactem. Czytanie
 * jej efektem i przepisywanie do stanu powoduje kaskadę renderów; ten hook
 * powstał dokładnie po to, żeby czytać takie źródła bez tej kaskady.
 *
 * Nasłuchujemy dwóch rzeczy: własnego zdarzenia (decyzja w tej karcie) oraz
 * `storage` (decyzja w innej karcie tej samej witryny – przeglądarka nie
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

/** Serwer nie zna decyzji czytelnika – do hydracji zachowujemy się jak przy jej braku. */
export function zgodaNaSerwerze(): Zgoda {
  return null;
}

export function zapiszZgode(zgoda: Exclude<Zgoda, null>) {
  zapisz(KLUCZ, zgoda);
}

export function zapiszZgodeMarketingowa(zgoda: Exclude<Zgoda, null>) {
  zapisz(KLUCZ_MARKETING, zgoda);
}

function zapisz(klucz: string, zgoda: Exclude<Zgoda, null>) {
  try {
    window.localStorage.setItem(klucz, zgoda);
  } catch {
    /* brak pamięci – decyzja obowiązuje do przeładowania strony */
  }
  window.dispatchEvent(new CustomEvent(ZDARZENIE_ZMIANY, { detail: { klucz, zgoda } }));
}

/** Otwiera baner ponownie – używa tego odnośnik „Ustawienia cookie" w stopce. */
export function otworzUstawieniaCookie() {
  window.dispatchEvent(new Event(ZDARZENIE_OTWARCIA));
}
