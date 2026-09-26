import type { MetadataRoute } from 'next';
import { serwis, trasy, dataZmiany } from '@/content/seo';
import { jezyki, KODY } from '@/i18n/jezyki';
import { lokalizuj } from '@/i18n/trasy';

/**
 * Mapa strony pod adresem `/sitemap.xml`.
 *
 * Zawiera wyłącznie strony, które mają trafić do indeksu — lista `trasy`
 * w `content/seo.ts` jest tu jedynym źródłem. Strona wykluczona z indeksu
 * (`nieindeksowane`) nie może być w mapie: wskazanie robotowi adresu,
 * którego zaraz zabraniamy indeksować, to sprzeczny sygnał i Search Console
 * zgłasza go jako błąd.
 *
 * Każda strona występuje w obu językach, a każdy wpis wskazuje obie wersje
 * przez `hreflang` — tak jak w metadanych samej strony.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return trasy.flatMap((trasa) => {
    const pl = trasa.sciezka || '/';
    const languages = Object.fromEntries(
      jezyki.map((j) => [KODY[j].lang, `${serwis.url}${lokalizuj(pl, j)}`.replace(/\/$/, '')]),
    );

    return jezyki.map((j) => ({
      url: `${serwis.url}${j === 'pl' ? trasa.sciezka : lokalizuj(pl, j)}`,
      lastModified: dataZmiany(trasa),
      changeFrequency: trasa.czestotliwosc,
      priority: trasa.priorytet,
      alternates: { languages },
    }));
  });
}
