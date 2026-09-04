import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDb, firebaseGotowy } from '@/lib/firebase';
import { LIMITY_ZAPISU, type Lista } from '@/content/zapisy';

export type Zapis = {
  imie: string;
  email: string;
  lista: Lista;
  /**
   * Zgoda na dalszą komunikację poza jedną wiadomością o uruchomieniu.
   *
   * Rozdzielona świadomie. Samo wysłanie formularza to prośba o powiadomienie
   * o starcie — to usługa, o którą człowiek poprosił, i nie wymaga osobnej
   * zgody. Wszystko ponad to jest już informacją handlową i wymaga zgody
   * wyrażonej osobno (art. 10 ustawy o świadczeniu usług drogą elektroniczną).
   */
  zgodaNaWiesci: boolean;
  /** Ukryte pole antyspamowe — musi zostać puste. */
  pulapka?: string;
};

/**
 * Zapisuje adres na listę wczesnego dostępu.
 *
 * Osobna kolekcja na listę, nie jedna z polem `lista`: reguły Firestore
 * przypisuje się do ścieżki, więc osobne kolekcje pozwalają je walidować
 * niezależnie, a przy okazji utrudniają pomyłkę przy eksporcie adresów.
 */
export async function zapiszNaListe(dane: Zapis): Promise<void> {
  if (dane.pulapka) return;

  const db = getDb();
  if (!db || !firebaseGotowy) throw new Error('Firebase nie jest skonfigurowany.');

  const oczyszczone = {
    imie: dane.imie.trim().slice(0, LIMITY_ZAPISU.imie),
    email: dane.email.trim().toLowerCase().slice(0, LIMITY_ZAPISU.email),
    zgodaNaWiesci: dane.zgodaNaWiesci,
  };

  await addDoc(collection(db, `zapisy-${dane.lista}`), {
    ...oczyszczone,
    createdAt: serverTimestamp(),
    source: 'busikm-landing',
  });

  // Powiadomienie nie blokuje sukcesu — adres jest już zapisany.
  try {
    await fetch('/api/zapis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...oczyszczone, lista: dane.lista }),
    });
  } catch {
    /* adres leży w bazie, powiadomienie można odtworzyć z konsoli */
  }
}
