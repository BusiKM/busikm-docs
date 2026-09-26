import { cache } from 'react';
import { notFound } from 'next/navigation';
import { czyJezyk, JEZYK_DOMYSLNY, type Jezyk } from '@/i18n/jezyki';

/**
 * Język bieżącego renderu — dla komponentów serwerowych.
 *
 * Komponent serwerowy nie ma dostępu do kontekstu Reacta, a przekazywanie
 * `jezyk` w propsach przez kilkadziesiąt poziomów zamieniłoby każdy plik
 * w listę parametrów. `cache()` daje jeden obiekt na render: układ i strona
 * zapisują w nim język z adresu, a każdy komponent niżej go czyta.
 *
 * **Układ i strona muszą ustawić język obie** — Next renderuje je niezależnie
 * i żadne nie ma gwarancji, że drugie zdążyło pierwsze. Robi to
 * `jezykZParametrow`, wołane na początku każdej strony i układu.
 */
const magazyn = cache((): { jezyk: Jezyk } => ({ jezyk: JEZYK_DOMYSLNY }));

export function ustawJezyk(jezyk: Jezyk) {
  magazyn().jezyk = jezyk;
}

/** Język, w którym renderuje się bieżąca strona. */
export function biezacyJezyk(): Jezyk {
  return magazyn().jezyk;
}

/** Parametry każdej strony i układu pod `app/[lang]`. */
export type ParametryJezyka = { params: Promise<{ lang: string }> };

/** Czyta język z adresu, ustawia go dla renderu i zwraca. Obcy kod → 404. */
export async function jezykZParametrow(params: ParametryJezyka['params']): Promise<Jezyk> {
  const { lang } = await params;
  if (!czyJezyk(lang)) notFound();
  ustawJezyk(lang);
  return lang;
}
