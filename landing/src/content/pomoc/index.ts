import { artykulyStart } from '@/content/pomoc/artykuly-start';
import { artykulyKierowcy } from '@/content/pomoc/artykuly-kierowcy';
import { artykulyZlecenia } from '@/content/pomoc/artykuly-zlecenia';
import { artykulyKoszty } from '@/content/pomoc/artykuly-koszty';
import { artykulyKsiegowosc } from '@/content/pomoc/artykuly-ksiegowosc';
import { artykulyKonto } from '@/content/pomoc/artykuly-konto';
import { artykulyStartEn } from '@/content/pomoc/artykuly-start-en';
import { artykulyKierowcyEn } from '@/content/pomoc/artykuly-kierowcy-en';
import { artykulyZleceniaEn } from '@/content/pomoc/artykuly-zlecenia-en';
import { artykulyKosztyEn } from '@/content/pomoc/artykuly-koszty-en';
import { artykulyKsiegowoscEn } from '@/content/pomoc/artykuly-ksiegowosc-en';
import { artykulyKontoEn } from '@/content/pomoc/artykuly-konto-en';
import { kategorie, NAZWY_ROL, type Artykul, type Kategoria } from '@/content/pomoc/typy';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

export { kategorie, NAZWY_ROL };
export type { Artykul, Kategoria };

/**
 * Wszystkie artykuły w kolejności kategorii ze strony centrum pomocy.
 *
 * Wersja polska — z niej biorą się adresy (`generateStaticParams`, mapa
 * strony). Slugi są w obu językach te same; angielskie adresy wylicza
 * `i18n/trasy.ts`.
 */
export const artykuly: Artykul[] = [
  ...artykulyStart,
  ...artykulyKierowcy,
  ...artykulyZlecenia,
  ...artykulyKoszty,
  ...artykulyKsiegowosc,
  ...artykulyKonto,
];

const artykulyEn: Artykul[] = [
  ...artykulyStartEn,
  ...artykulyKierowcyEn,
  ...artykulyZleceniaEn,
  ...artykulyKosztyEn,
  ...artykulyKsiegowoscEn,
  ...artykulyKontoEn,
];

export const artykulyWgJezyka: Tlumaczenia<Artykul[]> = { pl: artykuly, en: artykulyEn };

export function artykulPoSlugu(slug: string, jezyk: Jezyk = 'pl'): Artykul | undefined {
  return artykulyWgJezyka[jezyk].find((a) => a.slug === slug);
}

export function artykulyKategorii(id: string, jezyk: Jezyk = 'pl'): Artykul[] {
  return artykulyWgJezyka[jezyk].filter((a) => a.kategoria === id);
}

/**
 * Tekst, po którym przeszukujemy artykuł — w jego własnym języku.
 *
 * Wchodzi do niego wszystko oprócz treści bloków: tytuł, lead, kategoria,
 * hasła kategorii i tytuły rozdziałów. Pełna treść by tu nie pomogła —
 * szukanie po słowie „kliknij" zwracałoby wszystko.
 */
export function indeksArtykulu(a: Artykul, jezyk: Jezyk): string {
  const kategoria = kategorie[jezyk].find((k) => k.id === a.kategoria);
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

/** Artykuł w wyszukiwarce — tylko to, co pokazuje karta, i gotowy indeks. */
export type PozycjaWyszukiwarki = {
  slug: string;
  tytul: string;
  lead: string;
  role: string;
  indeks: string;
};

export type GrupaWyszukiwarki = {
  kategoria: { id: string; nazwa: string; opis: string };
  pozycje: PozycjaWyszukiwarki[];
};

/**
 * Dane dla wyszukiwarki, liczone na serwerze.
 *
 * Wyszukiwarka jest komponentem klienckim — gdyby importowała artykuły,
 * do przeglądarki pojechałaby pełna treść wszystkich instrukcji w obu
 * językach. Tak jedzie tylko to, co widać na kartach, w jednym języku.
 */
export function grupyWyszukiwarki(jezyk: Jezyk): GrupaWyszukiwarki[] {
  return kategorie[jezyk].map((k) => ({
    kategoria: { id: k.id, nazwa: k.nazwa, opis: k.opis },
    pozycje: artykulyKategorii(k.id, jezyk).map((a) => ({
      slug: a.slug,
      tytul: a.tytul,
      lead: a.lead,
      role: a.role.map((r) => NAZWY_ROL[jezyk][r]).join(' · '),
      indeks: indeksArtykulu(a, jezyk),
    })),
  }));
}
