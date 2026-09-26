import { getDb, firebaseGotowy } from '@/lib/firebase';
import { LIMITY_ZAPISU, type Lista } from '@/content/zapisy';
import { TRESC_ZGODY, WERSJA_ZGODY, KANAL_ZGODY, type Zrodlo } from '@/content/zgoda';
import type { Zainteresowanie } from '@/content/zainteresowanie';
import type { Jezyk } from '@/i18n/jezyki';

export type Zapis = {
  imie: string;
  email: string;
  lista: Lista;
  zrodlo: Zrodlo;
  /**
   * Plan i okres wybrane w cenniku — tylko gdy człowiek przyszedł stamtąd.
   * Wejście wprost na stronę zapisu jest równie poprawne, więc pole jest
   * opcjonalne na całej drodze, aż po reguły Firestore.
   */
  zainteresowanie?: Zainteresowanie | null;
  /**
   * Język strony, na której człowiek się zapisał — a więc i brzmienia zgody,
   * które miał przed oczami. Bez niego zapis z `/en/demo` wskazywałby na
   * polskie słowa, których ta osoba nie widziała.
   */
  jezyk: Jezyk;
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

  // SDK pobierane dopiero teraz — patrz `lib/firebase.ts`.
  const [db, { addDoc, collection, serverTimestamp }] = await Promise.all([
    getDb(),
    import('firebase/firestore'),
  ]);
  if (!db || !firebaseGotowy) throw new Error('Firebase nie jest skonfigurowany.');

  const wybor = dane.zainteresowanie ?? null;

  const oczyszczone = {
    imie: dane.imie.trim().slice(0, LIMITY_ZAPISU.imie),
    email: dane.email.trim().toLowerCase().slice(0, LIMITY_ZAPISU.email),
    zrodlo: dane.zrodlo,
    zgoda: true,
    trescZgody: TRESC_ZGODY[dane.jezyk],
    wersjaZgody: WERSJA_ZGODY,
    kanalZgody: KANAL_ZGODY,
    jezyk: dane.jezyk,
  };

  await addDoc(collection(db, `zapisy-${dane.lista}`), {
    ...oczyszczone,
    // Rozkładane warunkowo, nie jako `plan: undefined`: reguły dopuszczają
    // wyłącznie znane pola, a Firestore zapisałby `undefined` jako `null`
    // i dokument przestałby przechodzić walidację.
    ...(wybor ? { plan: wybor.plan, okres: wybor.okres } : {}),
    createdAt: serverTimestamp(),
    source: 'busikm-landing',
  });

  // Powiadomienie nie blokuje sukcesu — adres jest już zapisany.
  try {
    await fetch('/api/zapis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imie: oczyszczone.imie,
        email: oczyszczone.email,
        zrodlo: dane.zrodlo,
        // Tylko język, nie tekst zgody — trasa bierze brzmienie z `content/zgoda`
        // i nie zapisze do Klaviyo niczego, co przyszło z przeglądarki.
        jezyk: dane.jezyk,
        ...(wybor ? { plan: wybor.plan, okres: wybor.okres } : {}),
      }),
    });
  } catch {
    /* adres leży w bazie, powiadomienie można odtworzyć z konsoli */
  }
}
