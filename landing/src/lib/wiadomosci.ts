import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDb, firebaseGotowy } from '@/lib/firebase';

/** Tematy z formularza. Ten sam zestaw waliduje `firestore.rules`. */
export const tematy = [
  'pytanie przed zakupem',
  'pomoc techniczna',
  'rozliczenia i faktury',
  'coś innego',
] as const;

export type Temat = (typeof tematy)[number];

export type Wiadomosc = {
  imie: string;
  email: string;
  temat: Temat;
  tresc: string;
  /** Ukryte pole antyspamowe — musi zostać puste. */
  pulapka?: string;
};

export const LIMITY = { imie: 120, email: 160, tresc: 4000 } as const;

/**
 * Zapisuje wiadomość w kolekcji `wiadomosci` i — najlepszym staraniem —
 * wysyła powiadomienie na skrzynkę.
 *
 * Kolejność jest celowa: najpierw zapis, potem mail. Gdyby poszło odwrotnie
 * i mail by przeszedł, a zapis nie, wiadomość istniałaby wyłącznie w cudzej
 * skrzynce. Odwrotnie jest bezpiecznie — nieudane powiadomienie zostawia
 * zgłoszenie w bazie i da się je odzyskać.
 */
export async function wyslijWiadomosc(dane: Wiadomosc): Promise<void> {
  // Bot wypełnił ukryte pole — udajemy sukces i nic nie zapisujemy.
  if (dane.pulapka) return;

  const db = getDb();
  if (!db || !firebaseGotowy) throw new Error('Firebase nie jest skonfigurowany.');

  const oczyszczone = {
    imie: dane.imie.trim().slice(0, LIMITY.imie),
    email: dane.email.trim().slice(0, LIMITY.email),
    temat: dane.temat,
    tresc: dane.tresc.trim().slice(0, LIMITY.tresc),
  };

  await addDoc(collection(db, 'wiadomosci'), {
    ...oczyszczone,
    createdAt: serverTimestamp(),
    source: 'busikm-landing',
  });

  // Powiadomienie nie blokuje sukcesu — wiadomość jest już zapisana.
  try {
    await fetch('/api/powiadom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(oczyszczone),
    });
  } catch {
    /* wiadomość leży w bazie, powiadomienie można dosłać ręcznie */
  }
}
