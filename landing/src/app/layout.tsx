import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { Analytics } from '@/components/analytics/Analytics';
import { BanerZgody } from '@/components/analytics/BanerZgody';
import { JsonLd } from '@/components/seo/JsonLd';
import { grafStronyGlownej } from '@/components/seo/schema';
import { OkruszkiSeo } from '@/components/seo/OkruszkiSeo';
import { metadataStronyGlownej } from '@/lib/metadata';
import { serwis } from '@/content/seo';
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

export const metadata: Metadata = metadataStronyGlownej();

/**
 * Kolor paska przeglądarki na Androidzie i w aplikacji zainstalowanej
 * z ekranu głównego. Musi zgadzać się z `theme_color` w `site.webmanifest`.
 */
export const viewport: Viewport = {
  themeColor: '#0B5FFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: skrypt niżej dopisuje do <html> atrybut
    // data-reveal, zanim React zdąży się podpiąć. Serwer go nie renderuje,
    // więc bez tego React zgłasza rozjazd przy hydratacji.
    <html
      lang={serwis.jezyk}
      className={`${inter.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Wyprzedzające połączenie z serwerem czcionek. `next/font` pobiera
            pliki z własnej domeny, ale arkusz Google Fonts nadal wychodzi
            na zewnątrz przy pierwszym wejściu. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* Dane strukturalne opisujące firmę, serwis i produkt. Stoją
            w korzeniu, bo dotyczą całego serwisu, a nie pojedynczej strony. */}
        <JsonLd dane={grafStronyGlownej()} />
        <OkruszkiSeo />
      </head>
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
        <BanerZgody />
        <Analytics />
      </body>
    </html>
  );
}
