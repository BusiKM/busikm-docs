import type { Dokument } from '@/content/dokumenty/typy';
import { regulamin } from '@/content/dokumenty/regulamin';
import { prywatnosc } from '@/content/dokumenty/prywatnosc';
import { powierzenie } from '@/content/dokumenty/powierzenie';
import { podprocesorzy } from '@/content/dokumenty/podprocesorzy';

/**
 * Cztery dokumenty prawne. Kolejność jest ta sama co w stopce, więc odnośniki
 * „pozostałe dokumenty" układają się przewidywalnie.
 */
export const dokumenty: Dokument[] = [regulamin, prywatnosc, powierzenie, podprocesorzy];

/** Pozostałe trzy dokumenty — do wypisania na dole każdego z nich. */
export function pozostaleDokumenty(href: string) {
  return dokumenty
    .filter((d) => d.href !== href)
    .map((d) => ({ href: d.href, tytul: d.tytul }));
}

export { regulamin, prywatnosc, powierzenie, podprocesorzy };
