import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BusiKM — Kierowca jedzie. Reszta dzieje się sama.',
  description:
    'BusiKM zamienia trasy Twoich kierowców w kilometrówkę, ewidencję czasu pracy i komplet dokumentów dla księgowej. Bez Excela. Bez przepisywania.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${inter.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
