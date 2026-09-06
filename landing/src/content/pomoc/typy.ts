/**
 * Kształt artykułu pomocy. Treść siedzi w danych, układ w komponencie —
 * dopisanie instrukcji to dopisanie obiektu, nie pisanie JSX.
 *
 * ## Zasada nadrzędna: opisujemy to, co aplikacja robi dziś
 *
 * Instrukcja, która każe kliknąć nieistniejący przycisk, jest gorsza niż jej
 * brak — czytelnik traci czas i zaufanie. Dlatego każdy krok w tych plikach
 * ma pokrycie w kodzie aplikacji, a nazwy przycisków są przepisane z
 * interfejsu, nie wymyślone.
 *
 * Rzeczy zaplanowane, ale niezbudowane, opisujemy wyłącznie w bloku
 * `wkrotce` — i mówimy wprost, że jeszcze ich nie ma.
 */

export type Rola = 'wlasciciel' | 'dyspozytor' | 'ksiegowa' | 'kierowca';

export const NAZWY_ROL: Record<Rola, string> = {
  wlasciciel: 'Właściciel',
  dyspozytor: 'Dyspozytor',
  ksiegowa: 'Księgowa',
  kierowca: 'Kierowca',
};

export type Blok =
  | { typ: 'akapit'; tresc: string }
  /** Ponumerowane kroki — sedno każdej instrukcji. */
  | { typ: 'kroki'; kroki: { tytul: string; opis?: string }[] }
  | { typ: 'lista'; wstep?: string; punkty: string[] }
  /** Wyróżnione ostrzeżenie albo rzecz łatwa do przeoczenia. */
  | { typ: 'uwaga'; tresc: string }
  /** Funkcja zaplanowana, ale jeszcze niedostępna. Zawsze mów o tym wprost. */
  | { typ: 'wkrotce'; tresc: string }
  | { typ: 'tabela'; naglowki: string[]; wiersze: string[][] };

export type Rozdzial = {
  tytul: string;
  bloki: Blok[];
};

export type Artykul = {
  /** Adres: `/pomoc/<slug>`. */
  slug: string;
  kategoria: string;
  tytul: string;
  /** Jedno zdanie: co czytelnik będzie umiał po przeczytaniu. */
  lead: string;
  /** Kto to robi — pokazujemy jako etykiety pod tytułem. */
  role: Rola[];
  /** Ścieżka w aplikacji, np. „Kierowcy → Zaproś kierowcę". */
  gdzie?: string;
  /** Ile to zajmuje. Podawaj uczciwie, łącznie z czekaniem. */
  czas?: string;
  /** Co trzeba mieć, zanim się zacznie. */
  zanim?: string[];
  rozdzialy: Rozdzial[];
  /** Slugi artykułów, do których naturalnie prowadzi ten. */
  powiazane?: string[];
};

export type Kategoria = {
  id: string;
  nazwa: string;
  opis: string;
  /** Hasła, po których kategoria ma się znaleźć w wyszukiwaniu. */
  hasla: string[];
};

/** Kolejność kategorii na stronie centrum pomocy. */
export const kategorie: Kategoria[] = [
  {
    id: 'start',
    nazwa: 'Pierwsze kroki',
    opis: 'Od pierwszego logowania do gotowej firmy w systemie',
    hasla: ['konto', 'start', 'logowanie', 'firma', 'pojazd', 'zespół', 'pierwsze kroki'],
  },
  {
    id: 'kierowcy',
    nazwa: 'Kierowcy',
    opis: 'Zaproszenie, aplikacja, trasa, paragony, czas pracy',
    hasla: [
      'kierowca', 'aplikacja', 'zaproszenie', 'trasa', 'nawigacja',
      'paragon', 'przerwa', 'czas pracy', 'aetr', 'telefon',
    ],
  },
  {
    id: 'zlecenia',
    nazwa: 'Zlecenia i faktury',
    opis: 'Zlecenie, dyspozytornia, faktura, kontrahenci',
    hasla: [
      'zlecenie', 'faktura', 'dyspozytornia', 'kontrahent', 'klient',
      'wystawienie', 'płatność', 'ksef',
    ],
  },
  {
    id: 'koszty',
    nazwa: 'Koszty i flota',
    opis: 'Koszty, paliwo, pojazdy, dokumenty i terminy',
    hasla: ['koszt', 'paliwo', 'pojazd', 'flota', 'dokument', 'termin', 'przegląd', 'ubezpieczenie'],
  },
  {
    id: 'ksiegowosc',
    nazwa: 'Rozliczenia i księgowość',
    opis: 'Eksporty, raporty, kursy walut, stawki kilometrowe',
    hasla: [
      'eksport', 'księgowa', 'optima', 'insert', 'symfonia', 'epp', 'jpk',
      'raport', 'kurs', 'waluta', 'kilometrówka', 'ewidencja przebiegu',
    ],
  },
  {
    id: 'konto',
    nazwa: 'Konto i zespół',
    opis: 'Użytkownicy, role, uprawnienia, ustawienia firmy',
    hasla: ['zespół', 'rola', 'uprawnienia', 'użytkownik', 'ustawienia', 'plan', 'hasło'],
  },
];

/**
 * Kotwica z tytułu rozdziału.
 *
 * Tytuły są po polsku, więc same znaki diakrytyczne trzeba zdjąć — inaczej
 * adres z „Wysłanie zaproszenia" wygląda w pasku jak ciąg procentów.
 * `normalize('NFD')` rozkłada literę na znak podstawowy i znak łączący,
 * a wyrażenie usuwa te drugie.
 */
export function kotwicaRozdzialu(tytul: string): string {
  return tytul
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ł/g, 'l')
    .replace(/Ł/g, 'L')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
