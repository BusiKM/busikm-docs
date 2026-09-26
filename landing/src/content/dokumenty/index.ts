import type { Jezyk } from '@/i18n/jezyki';
import { regulamin } from '@/content/dokumenty/regulamin';
import { prywatnosc } from '@/content/dokumenty/prywatnosc';
import { powierzenie } from '@/content/dokumenty/powierzenie';
import { podprocesorzy } from '@/content/dokumenty/podprocesorzy';

/**
 * Cztery dokumenty prawne. Kolejność jest ta sama co w stopce, więc odnośniki
 * „pozostałe dokumenty" układają się przewidywalnie.
 *
 * Każdy w dwóch wersjach językowych; wiążąca jest polska, angielska to
 * tłumaczenie dla wygody czytelnika.
 */
export const dokumenty = [regulamin, prywatnosc, powierzenie, podprocesorzy];

/**
 * Pozostałe trzy dokumenty — do wypisania na dole każdego z nich. `href`
 * zostaje polski: odnośnik sam zamienia go na angielski.
 */
export function pozostaleDokumenty(href: string, jezyk: Jezyk = 'pl') {
  return dokumenty
    .map((d) => d[jezyk])
    .filter((d) => d.href !== href)
    .map((d) => ({ href: d.href, tytul: d.tytul }));
}

export { regulamin, prywatnosc, powierzenie, podprocesorzy };
