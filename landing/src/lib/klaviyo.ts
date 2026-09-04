import { TRESC_ZGODY, WERSJA_ZGODY, type Zrodlo } from '@/content/zgoda';

/**
 * Zapis profilu na listę w Klaviyo.
 *
 * Wołane po stronie serwera, z tras `/api/zapis` i `/api/powiadom` — klucz
 * Klaviyo jest prywatny i nigdy nie może trafić do przeglądarki.
 *
 * ## Dlaczego dwa wywołania, a nie jedno
 *
 * Wygodniej byłoby wysłać wszystko naraz, ale Klaviyo na to nie pozwala.
 * Punkt `profile-subscription-bulk-create-jobs` przyjmuje **wyłącznie adres
 * i subskrypcję** — na `first_name` odpowiada `400 'first_name' is not
 * a valid field for the resource 'profile'`, na `properties` tak samo.
 * Sprawdzone na żywym API, nie wyczytane z dokumentacji.
 *
 * Stąd podział:
 *
 * 1. `POST /api/profile-import` — imię i właściwości. Idempotentny:
 *    ten sam adres drugi raz zwraca to samo `id` i aktualizuje pola,
 *    zamiast tworzyć duplikat. Sprawdzone.
 * 2. `POST /api/profile-subscription-bulk-create-jobs` — zgoda i lista.
 *    To jedyny punkt, który zapisuje **moment wyrażenia zgody**, a właśnie
 *    ten moment trzeba umieć wykazać.
 *
 * Kolejność ma znaczenie: najpierw dane, potem subskrypcja. Odwrotnie
 * pierwsza wysyłka mogłaby zastać profil bez imienia.
 *
 * Daty zgody **nie podajemy** i to też wyszło z API: przy `historical_import:
 * false` Klaviyo odpowiada `Non-historical email subscription cannot have
 * consented_at timestamp`. Sam stempluje moment wywołania — a że wołamy je
 * zaraz po zapisie, data i tak zgadza się z `createdAt` w Firestore.
 * `consented_at` wolno podać wyłącznie przy imporcie zgód zebranych wcześniej
 * gdzie indziej.
 *
 * ## Odpowiedzialność za wypis
 *
 * Wypisu nie obsługujemy sami i to jest decyzja, nie brak. Klaviyo dokleja
 * odnośnik do każdej wysyłki i prowadzi listę wykluczeń — własny mechanizm
 * oznaczałby dwa źródła prawdy o tym, kto jest wypisany, i wcześniej czy
 * później wysyłkę do kogoś, kto się wypisał gdzie indziej.
 *
 * Zostaje jedna luka: ktoś, do kogo pierwsza wiadomość pójdzie za kilka
 * miesięcy, nie ma w co kliknąć. Dlatego treść zgody podaje też adres —
 * i dlatego wycofanie zgłoszone mailem trzeba **ręcznie** nanieść w Klaviyo.
 *
 * ## Brak konfiguracji nie jest awarią
 *
 * Bez `KLAVIYO_API_KEY` funkcja nic nie robi i zwraca `pominiete`. Adres
 * i tak leży w Firestore z kompletem pól do importu, więc nic nie ginie.
 */

/** Wersja API Klaviyo. Zmiana bez sprawdzenia zmian w schemacie potrafi urwać zapis. */
const REVISION = '2026-07-15';

export type WynikKlaviyo =
  | { ok: true }
  | { ok: false; pominiete: string }
  | { ok: false; blad: string };

export async function zapiszWKlaviyo(dane: {
  imie: string;
  email: string;
  zrodlo: Zrodlo;
  /**
   * Plan i okres wybrane w cenniku — jeśli człowiek przyszedł stamtąd.
   * Osobne właściwości, nie jeden sklejony tekst: w Klaviyo segment buduje
   * się porównaniem wartości, więc `plan == 'firma'` ma działać bez
   * dopasowywania wzorców.
   */
  wybor?: { plan: string; okres: string } | null;
}): Promise<WynikKlaviyo> {
  const klucz = process.env.KLAVIYO_API_KEY;
  const lista = process.env.KLAVIYO_LISTA_ID;

  if (!klucz) return { ok: false, pominiete: 'brak KLAVIYO_API_KEY' };
  if (!lista) return { ok: false, pominiete: 'brak KLAVIYO_LISTA_ID' };

  const naglowki = {
    Authorization: `Klaviyo-API-Key ${klucz}`,
    revision: REVISION,
    'Content-Type': 'application/vnd.api+json',
    accept: 'application/vnd.api+json',
  };

  try {
    // 1. Imię i tag. Idempotentne — ten sam adres aktualizuje istniejący
    //    profil zamiast tworzyć drugi.
    const profil = await fetch('https://a.klaviyo.com/api/profile-import', {
      method: 'POST',
      headers: naglowki,
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email: dane.email,
            first_name: dane.imie,
            properties: {
              zrodlo: dane.zrodlo,
              zgoda_wersja: WERSJA_ZGODY,
              zgoda_tresc: TRESC_ZGODY,
              ...(dane.wybor
                ? { plan: dane.wybor.plan, okres: dane.wybor.okres }
                : {}),
            },
          },
        },
      }),
    });

    if (!profil.ok) {
      return { ok: false, blad: `profil ${profil.status} ${(await profil.text()).slice(0, 250)}` };
    }

    // 2. Zgoda i przypisanie do listy. Punkt asynchroniczny — 202 znaczy
    //    „przyjęte do wykonania".
    const subskrypcja = await fetch(
      'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs',
      {
        method: 'POST',
        headers: naglowki,
        body: JSON.stringify({
          data: {
            type: 'profile-subscription-bulk-create-job',
            attributes: {
              profiles: {
                data: [
                  {
                    type: 'profile',
                    attributes: {
                      email: dane.email,
                      subscriptions: {
                        email: { marketing: { consent: 'SUBSCRIBED' } },
                      },
                    },
                  },
                ],
              },
              historical_import: false,
            },
            relationships: { list: { data: { type: 'list', id: lista } } },
          },
        }),
      },
    );

    if (subskrypcja.status === 202 || subskrypcja.ok) return { ok: true };
    return {
      ok: false,
      blad: `subskrypcja ${subskrypcja.status} ${(await subskrypcja.text()).slice(0, 250)}`,
    };
  } catch (e) {
    return { ok: false, blad: String(e) };
  }
}
