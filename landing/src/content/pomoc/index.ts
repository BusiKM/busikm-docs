import { artykulyStart } from '@/content/pomoc/artykuly-start';
import { artykulyKierowcy } from '@/content/pomoc/artykuly-kierowcy';
import { artykulyZlecenia } from '@/content/pomoc/artykuly-zlecenia';
import { artykulyKoszty } from '@/content/pomoc/artykuly-koszty';
import { artykulyKsiegowosc } from '@/content/pomoc/artykuly-ksiegowosc';
import { artykulyKonto } from '@/content/pomoc/artykuly-konto';
import { kategorie, type Artykul, type Kategoria } from '@/content/pomoc/typy';

export { kategorie };
export type { Artykul, Kategoria };
export { NAZWY_ROL } from '@/content/pomoc/typy';

/** Wszystkie artykuły w kolejności kategorii ze strony centrum pomocy. */
export const artykuly: Artykul[] = [
  ...artykulyStart,
  ...artykulyKierowcy,
  ...artykulyZlecenia,
  ...artykulyKoszty,
  ...artykulyKsiegowosc,
  ...artykulyKonto,
];

export function artykulPoSlugu(slug: string): Artykul | undefined {
  return artykuly.find((a) => a.slug === slug);
}

export function artykulyKategorii(id: string): Artykul[] {
  return artykuly.filter((a) => a.kategoria === id);
}

/**
 * Tekst, po którym przeszukujemy artykuł.
 *
 * Wchodzi do niego wszystko oprócz treści bloków: tytuł, lead, kategoria,
 * hasła kategorii i tytuły rozdziałów. Pełna treść by tu nie pomogła —
 * szukanie po słowie „kliknij" zwracałoby wszystko.
 */
function indeks(a: Artykul): string {
  const kategoria = kategorie.find((k) => k.id === a.kategoria);
  return [
    a.tytul,
    a.lead,
    a.gdzie ?? '',
    kategoria?.nazwa ?? '',
    ...(kategoria?.hasla ?? []),
    ...a.rozdzialy.map((r) => r.tytul),
  ]
    .join(' ')
    .toLowerCase();
}

const INDEKS = new Map(artykuly.map((a) => [a.slug, indeks(a)]));

export function pasujeDoFrazy(a: Artykul, fraza: string): boolean {
  const f = fraza.trim().toLowerCase();
  if (!f) return true;
  return (INDEKS.get(a.slug) ?? '').includes(f);
}
