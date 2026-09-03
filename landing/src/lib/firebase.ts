import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

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

/** Instancja Firestore albo `null`, gdy brak konfiguracji. */
export function getDb(): Firestore | null {
  if (!firebaseGotowy) return null;
  const app: FirebaseApp = getApps().length ? getApp() : initializeApp(konfiguracja);
  if (!baza) baza = getFirestore(app);
  return baza;
}
