import type { Metadata } from 'next';
import {
  StronaNieZnaleziona,
  tytulNieZnalezionej,
} from '@/components/pages/nie-znaleziono/StronaNieZnaleziona';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * 404 dla `notFound()` wywołanego w trakcie renderu strony.
 *
 * Nieznane adresy tu nie trafiają — `proxy.ts` kieruje je od razu na
 * `/[lang]/nie-znaleziono`, statyczną stronę z nagłówkiem i stopką.
 */
export function generateMetadata(): Metadata {
  // Bez `robots` — Next dokłada tu `noindex` sam.
  return { title: tytulNieZnalezionej(biezacyJezyk()) };
}

export default function NotFound() {
  return <StronaNieZnaleziona />;
}
