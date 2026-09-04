import { TRESC_ZGODY, WERSJA_ZGODY, type Zrodlo } from '@/content/zgoda';

/**
 * Zapis profilu na listę w Klaviyo.
 *
 * Wołane po stronie serwera, z tras `/api/zapis` i `/api/powiadom` — klucz
 * Klaviyo jest prywatny i nigdy nie może trafić do przeglądarki.
 *
 * ## Dlaczego akurat ten punkt końcowy
 *
 * `profile-subscription-bulk-create-jobs` jest jedynym, który **zapisuje
 * zgodę razem z profilem**. Zwykłe `POST /api/profiles` tworzy kontakt, ale
 * nie subskrybuje go i nie odnotowuje momentu wyrażenia zgody — a to właśnie
 * ten moment trzeba umieć wykazać.
 *
 * `consented_at` ustawiamy na czas zapisu u nas, żeby data w Klaviyo zgadzała
 * się z `createdAt` w Firestore. Dwa systemy, jedna data.
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
}): Promise<WynikKlaviyo> {
  const klucz = process.env.KLAVIYO_API_KEY;
  const lista = process.env.KLAVIYO_LISTA_ID;

  if (!klucz) return { ok: false, pominiete: 'brak KLAVIYO_API_KEY' };
  if (!lista) return { ok: false, pominiete: 'brak KLAVIYO_LISTA_ID' };

  const teraz = new Date().toISOString();

  const body = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email: dane.email,
                first_name: dane.imie,
                // Tag, po którym budujesz segmenty w Klaviyo. Ta sama wartość
                // co w polu `zrodlo` w Firestore — dwa systemy, jedna nazwa.
                properties: {
                  zrodlo: dane.zrodlo,
                  zgoda_wersja: WERSJA_ZGODY,
                  zgoda_tresc: TRESC_ZGODY,
                },
                subscriptions: {
                  email: { marketing: { consent: 'SUBSCRIBED', consented_at: teraz } },
                },
              },
            },
          ],
        },
        historical_import: false,
      },
      relationships: { list: { data: { type: 'list', id: lista } } },
    },
  };

  try {
    const odp = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${klucz}`,
        revision: REVISION,
        'Content-Type': 'application/vnd.api+json',
        accept: 'application/vnd.api+json',
      },
      body: JSON.stringify(body),
    });

    // Punkt końcowy jest asynchroniczny: 202 znaczy „przyjęte do wykonania".
    if (odp.status === 202 || odp.ok) return { ok: true };
    return { ok: false, blad: `${odp.status} ${(await odp.text()).slice(0, 300)}` };
  } catch (e) {
    return { ok: false, blad: String(e) };
  }
}
