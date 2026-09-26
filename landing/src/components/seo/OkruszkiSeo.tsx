'use client';

import { usePathname } from 'next/navigation';
import { JsonLd } from './JsonLd';
import { okruszki } from './schema';
import { rozpoznaj } from '@/i18n/trasy';

/**
 * Ścieżka okruszków dla wyszukiwarek — jeden komponent na cały serwis.
 *
 * Stoi w `layout.tsx` i czyta bieżącą ścieżkę, zamiast być wklejany na
 * każdej z dwudziestu kilku podstron. Dzięki temu nowa strona dostaje
 * okruszki od razu, bez pamiętania o kolejnym imporcie.
 *
 * Google zamienia je na ścieżkę widoczną pod wynikiem wyszukiwania —
 * zamiast surowego adresu czytelnik widzi „busikm.pl › Ile zostaje".
 */
export function OkruszkiSeo() {
  // Język z adresu, nie z kontekstu — ten komponent stoi w <head>, poza
  // dostawcą języka.
  const { jezyk, sciezkaPl } = rozpoznaj(usePathname() ?? '/');
  if (!sciezkaPl) return null;
  return <JsonLd dane={okruszki(sciezkaPl, jezyk)} />;
}
