import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDb, firebaseGotowy } from '@/lib/firebase';
import { LIMITY_ZAPISU, type Lista } from '@/content/zapisy';
import { TRESC_ZGODY, WERSJA_ZGODY, KANAL_ZGODY, type Zrodlo } from '@/content/zgoda';

export type Zapis = {
  imie: string;
  email: string;
  lista: Lista;
  zrodlo: Zrodlo;
  /** Ukryte pole antyspamowe — musi zostać puste. */
  pulapka?: string;
};

/**
 * Zapisuje adres na listę.
 *
 * Zgody nie przekazujemy parametrem, bo na tych stronach nie ma zapisu bez
 * niej — formularz nie puści dalej. Zapisujemy natomiast **jej brzmienie**:
 * ciężar dowodu spoczywa na nas (art. 7 ust. 1 RODO), a samo `true` nie
 * dowodzi, pod czym dana osoba się podpisała.
 *
 * Osobna kolekcja na listę, nie jedna z polem: reguły Firestore przypisuje
 * się do ścieżki, więc każdą walidujemy niezależnie, a przy eksporcie
 * adresów trudniej je pomylić.
 */
export async function zapiszNaListe(dane: Zapis): Promise<void> {
  if (dane.pulapka) return;

  const db = getDb();
  if (!db || !firebaseGotowy) throw new Error('Firebase nie jest skonfigurowany.');

  const oczyszczone = {
    imie: dane.imie.trim().slice(0, LIMITY_ZAPISU.imie),
    email: dane.email.trim().toLowerCase().slice(0, LIMITY_ZAPISU.email),
    zrodlo: dane.zrodlo,
    zgoda: true,
    trescZgody: TRESC_ZGODY,
    wersjaZgody: WERSJA_ZGODY,
    kanalZgody: KANAL_ZGODY,
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
      body: JSON.stringify({ imie: oczyszczone.imie, email: oczyszczone.email, zrodlo: dane.zrodlo }),
    });
  } catch {
    /* adres leży w bazie, powiadomienie można odtworzyć z konsoli */
  }
}
