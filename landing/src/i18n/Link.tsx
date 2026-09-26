'use client';

import NextLink from 'next/link';
import type { ComponentProps } from 'react';
import { useJezyk } from '@/i18n/klient';
import { lokalizuj } from '@/i18n/trasy';

/**
 * `next/link`, który sam dobiera adres do języka strony.
 *
 * Odnośniki w kodzie zostają polskie (`/cennik`) — na stronie angielskiej
 * ten komponent zamienia je na `/en/pricing`. Dzięki temu treść nie musi
 * pamiętać o języku przy każdym `href`.
 */
export default function Link({ href, ...reszta }: ComponentProps<typeof NextLink>) {
  const jezyk = useJezyk();
  return <NextLink href={typeof href === 'string' ? lokalizuj(href, jezyk) : href} {...reszta} />;
}
