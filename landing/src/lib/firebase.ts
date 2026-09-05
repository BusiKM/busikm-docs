import type { Firestore } from 'firebase/firestore';

/**
 * Połączenie z Firebase — ten sam układ, co w movgranto-homepage.
 *
 * Klucze są publiczne z założenia: klient Firebase i tak wysyła je
 * w przeglądarce. Tym, co faktycznie chroni bazę, są reguły w
 * `firestore.rules` — pozwalają wyłącznie zapisać wiadomość i to tylko
 * taką, która przejdzie walidację. Odczytu, edycji ani kasowania nie ma
 * nikt poza konsolą i Admin SDK.
 *
 * Bez kompletu zmiennych `getDb()` zwraca `null`, a formularz cofa się do
 * `mailto:`. Dzięki temu praca lokalna i podglądy gałęzi działają bez
 * konfiguracji i nie zaśmiecają bazy.
 *
 * ## Dlaczego SDK ładuje się dopiero przy wysyłce
 *
 * Klient Firebase waży kilkaset kilobajtów i przy zwykłym imporcie wchodził
 * do paczki każdej strony z formularzem — `/kontakt` wysyłał przez to 1,2 MB
 * skryptów, choć odwiedzający najczęściej tylko czyta i wychodzi.
 *
 * Dlatego `getDb()` jest asynchroniczne i sięga po SDK przez `import()`
 * dopiero w momencie zapisu. `firebaseGotowy` zostaje synchroniczne, bo to
 * samo sprawdzenie zmiennych środowiskowych — formularz musi w trakcie
 * renderu wiedzieć, czy pokazać przycisk wysyłki, czy cofnąć się do
 * `mailto:`, i nie ma po co czekać na pobranie biblioteki.
 */

const konfiguracja = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** Czy konfiguracja jest kompletna. */
export const firebaseGotowy = Boolean(
  konfiguracja.apiKey && konfiguracja.projectId && konfiguracja.appId,
);

let baza: Firestore | null = null;

/**
 * Instancja Firestore albo `null`, gdy brak konfiguracji.
 *
 * Pierwsze wywołanie pobiera SDK; kolejne dostają gotową instancję.
 */
export async function getDb(): Promise<Firestore | null> {
  if (!firebaseGotowy) return null;
  if (baza) return baza;

  const [{ initializeApp, getApps, getApp }, { getFirestore }] = await Promise.all([
    import('firebase/app'),
    import('firebase/firestore'),
  ]);

  const app = getApps().length ? getApp() : initializeApp(konfiguracja);
  baza = getFirestore(app);
  return baza;
}
