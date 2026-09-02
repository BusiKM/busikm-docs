import type { Metadata } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { RevealObserver } from '@/components/motion/RevealObserver';
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

const title = 'BusiKM — Kierowca jedzie. Reszta dzieje się sama.';
const description =
  'BusiKM zamienia trasy Twoich kierowców w kilometrówkę, ewidencję czasu pracy i komplet dokumentów dla księgowej. Bez Excela. Bez przepisywania.';

export const metadata: Metadata = {
  metadataBase: new URL('https://busikm.pl'),
  title,
  description,
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: '/apple-touch-icon.png',
    other: [{ rel: 'mask-icon', url: '/mask-icon.svg', color: '#005CE8' }],
  },
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: 'https://busikm.pl',
    siteName: 'BusiKM',
    title,
    description,
    images: [{ url: '/og-image.png', width: 1219, height: 649, alt: 'BusiKM' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: skrypt niżej dopisuje do <html> atrybut
    // data-reveal, zanim React zdąży się podpiąć. Serwer go nie renderuje,
    // więc bez tego React zgłasza rozjazd przy hydratacji.
    <html
      lang="pl"
      className={`${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Włącza stan ukryty dla [data-reveal] zanim przeglądarka odmaluje
            treść — dzięki temu nic nie mruga. Bez JavaScriptu i przy prośbie
            o mniej ruchu strona jest po prostu widoczna. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.dataset.reveal='on'}}catch(e){}",
          }}
        />
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
