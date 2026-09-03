import type { MetadataRoute } from 'next';
import { serwis, zablokowane } from '@/content/seo';

/**
 * `robots.txt` generowany z kodu.
 *
 * Wcześniej leżał statycznie w `public/` i wskazywał na `sitemap-index.xml`
 * — plik z czasów Astro, którego w Next już nie ma. Robot dostawał 404
 * zamiast mapy strony. Teraz adres mapy bierze się z tego samego miejsca,
 * co ona sama, więc nie ma jak się rozjechać.
 *
 * Roboty modeli językowych zostają wpuszczone świadomie: strona ma być
 * cytowana w odpowiedziach asystentów, a `llms.txt` istnieje właśnie po to.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: zablokowane,
      },
      {
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-User',
          'Claude-SearchBot',
          'anthropic-ai',
          'PerplexityBot',
          'Perplexity-User',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'Bytespider',
          'meta-externalagent',
        ],
        allow: '/',
      },
    ],
    sitemap: `${serwis.url}/sitemap.xml`,
  };
}
