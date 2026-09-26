import type { Metadata, Viewport } from 'next';
import { Inter, IBM_Plex_Mono } from 'next/font/google';
import { RevealObserver } from '@/components/motion/RevealObserver';
import { PowrotNaGore } from '@/components/layout/PowrotNaGore';
import { Analytics } from '@/components/analytics/Analytics';
import { BanerZgody } from '@/components/analytics/BanerZgody';
import { JsonLd } from '@/components/seo/JsonLd';
import { grafStronyGlownej } from '@/components/seo/schema';
import { OkruszkiSeo } from '@/components/seo/OkruszkiSeo';
import { metadataStronyGlownej } from '@/lib/metadata';
import { jezyki, KODY } from '@/i18n/jezyki';
import { DostawcaJezyka } from '@/i18n/klient';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import '../globals.css';

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

/**
 * Obie wersje językowe powstają przy budowaniu.
 *
 * Bez `dynamicParams = false`: ustawienie z układu obejmuje całe drzewo,
 * także trasę-łapacz nieznanych adresów, i Next zgłaszał wtedy 404 przed
 * układem — strona błędu wychodziła bez nagłówka, stopki i `<html lang>`.
 * Obcy kod języka i tak nie przejdzie: `proxy.ts` nigdy go nie tworzy,
 * a `jezykZParametrow` odpowiada na niego 404.
 */
export function generateStaticParams() {
  return jezyki.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: ParametryJezyka): Promise<Metadata> {
  return metadataStronyGlownej(await jezykZParametrow(params));
}

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

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode }> & ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);

  return (
    // suppressHydrationWarning: skrypt niżej dopisuje do <html> atrybut
    // data-reveal, zanim React zdąży się podpiąć. Serwer go nie renderuje,
    // więc bez tego React zgłasza rozjazd przy hydratacji.
    <html
      lang={KODY[jezyk].lang}
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
        <JsonLd dane={grafStronyGlownej(jezyk)} />
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
        <DostawcaJezyka jezyk={jezyk}>
          <PowrotNaGore />
          {children}
          <RevealObserver />
          <BanerZgody />
          <Analytics />
        </DostawcaJezyka>
      </body>
    </html>
  );
}
