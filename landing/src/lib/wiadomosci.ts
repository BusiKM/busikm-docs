import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDb, firebaseGotowy } from '@/lib/firebase';
import { TRESC_ZGODY, WERSJA_ZGODY, KANAL_ZGODY } from '@/content/zgoda';

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
  /**
   * Zgoda marketingowa — tutaj **nieobowiązkowa**, inaczej niż na stronach
   * zapisu. Usługą jest odpowiedź na pytanie, więc uzależnianie jej od zgody
   * byłoby warunkowaniem zakazanym przez art. 7 ust. 4 RODO.
   */
  zgoda: boolean;
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
    zgoda: dane.zgoda,
    // Brzmienie zapisujemy tylko wtedy, gdy zgoda faktycznie padła — pusty
    // dowód przy braku zgody byłby mylący przy późniejszym eksporcie.
    ...(dane.zgoda
      ? { trescZgody: TRESC_ZGODY, wersjaZgody: WERSJA_ZGODY, kanalZgody: KANAL_ZGODY }
      : {}),
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
      body: JSON.stringify({
        imie: oczyszczone.imie,
        email: oczyszczone.email,
        temat: oczyszczone.temat,
        tresc: oczyszczone.tresc,
        // Trasa musi wiedzieć o zgodzie, bo tylko przy niej wolno dopisać
        // adres do listy. Bez zgody zostaje w bazie i służy do odpowiedzi.
        zgoda: oczyszczone.zgoda,
      }),
    });
  } catch {
    /* wiadomość leży w bazie, powiadomienie można dosłać ręcznie */
  }
}
