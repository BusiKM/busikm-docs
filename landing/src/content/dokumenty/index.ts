import type { Jezyk } from '@/i18n/jezyki';
import { prywatnosc } from '@/content/dokumenty/prywatnosc';
import { dokumentyUslugi, tytulyUslugi } from '@/content/dokumenty/uslugi';

/**
 * Dokumenty prawne publikowane na samym landingu. Został jeden: polityka
 * prywatności strony busikm.pl. Regulamin, umowa powierzenia, polityka
 * prywatności usługi, polityka retencji i rejestr podprocesorów mieszkają
 * w aplikacji (`content/dokumenty/uslugi.ts`).
 *
 * Każdy w dwóch wersjach językowych; wiążąca jest polska, angielska to
 * tłumaczenie dla wygody czytelnika.
 */
export const dokumenty = [prywatnosc];

/**
 * Odnośniki „pozostałe dokumenty" na dole dokumentu: najpierw inne dokumenty
 * landingu, potem dokumenty usługi w aplikacji. `href` dokumentów landingu
 * zostaje polski, bo odnośnik sam zamienia go na angielski; adresy aplikacji
 * są zewnętrzne i przechodzą bez zmian.
 */
export function pozostaleDokumenty(href: string, jezyk: Jezyk = 'pl') {
  const tytuly = tytulyUslugi[jezyk];
  const wLandingu = dokumenty
    .map((d) => d[jezyk])
    .filter((d) => d.href !== href)
    .map((d) => ({ href: d.href, tytul: d.tytul }));
  const wUsludze = (Object.keys(dokumentyUslugi) as (keyof typeof dokumentyUslugi)[]).map(
    (klucz) => ({ href: dokumentyUslugi[klucz], tytul: tytuly[klucz] }),
  );
  return [...wLandingu, ...wUsludze];
}

export { prywatnosc, dokumentyUslugi, tytulyUslugi };
