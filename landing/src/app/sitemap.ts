import type { MetadataRoute } from 'next';
import { serwis, trasy, dataZmiany } from '@/content/seo';

/**
 * Mapa strony pod adresem `/sitemap.xml`.
 *
 * Zawiera wyłącznie strony, które mają trafić do indeksu — lista `trasy`
 * w `content/seo.ts` jest tu jedynym źródłem. Strona wykluczona z indeksu
 * (`nieindeksowane`) nie może być w mapie: wskazanie robotowi adresu,
 * którego zaraz zabraniamy indeksować, to sprzeczny sygnał i Search Console
 * zgłasza go jako błąd.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return trasy.map((trasa) => ({
    url: `${serwis.url}${trasa.sciezka}`,
    lastModified: dataZmiany(trasa),
    changeFrequency: trasa.czestotliwosc,
    priority: trasa.priorytet,
  }));
}
