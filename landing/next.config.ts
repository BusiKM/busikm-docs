import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Next generuje AGENTS.md/CLAUDE.md w katalogu projektu — repo ma własne
  agentRules: false,
  // Wskaźnik dev Next.js zasłania lewy dolny róg makiet
  devIndicators: false,
  // Nagłówek `X-Powered-By: Next.js` niczego nie wnosi, a mówi napastnikowi,
  // czego szukać.
  poweredByHeader: false,

  /**
   * Przekierowania po przeprowadzce z Astro.
   *
   * Adresy poprzedniej wersji busikm.pl siedzą w indeksie Google i w cudzych
   * odnośnikach. Bez przekierowania oddajemy pod nimi 404 i tracimy to, co
   * zdążyły zebrać.
   *
   * Przekierowujemy **tylko tam, gdzie istnieje odpowiednik treści**. Zbiorcze
   * zrzucanie wszystkiego na stronę główną Google traktuje jak „miękkie 404"
   * i tak czy owak wyrzuca z indeksu — a przy okazji frustruje czytelnika,
   * który klikał w konkretny temat. Adresy bez odpowiednika (`/roadmapa`,
   * `/technologia`, `/docs/*` poza stroną główną działu, `/en/*`) świadomie
   * zostają przy 404.
   */
  async redirects() {
    return [
      // Role — nazwy się zmieniły, treść została
      { source: '/dla-wlascicieli', destination: '/dla-kogo/wlasciciel', permanent: true },
      { source: '/dla-kierowcow', destination: '/dla-kogo/kierowca', permanent: true },
      { source: '/dla-ksiegowych', destination: '/dla-kogo/ksiegowa', permanent: true },
      // Biura rachunkowe wypadły z zakresu produktu — najbliżej jest księgowa
      {
        source: '/dla-biur-rachunkowych',
        destination: '/dla-kogo/ksiegowa',
        permanent: true,
      },
      // AETR to dokładnie temat czasu pracy i przerw
      { source: '/aetr', destination: '/co-robi/czas-pracy', permanent: true },
      // Przegląd funkcji — dziś rolę spisu pełni strona główna
      { source: '/funkcje', destination: '/', permanent: true },
      // Dokumentacja przeniosła się do repo backendu; czytelnik szuka pomocy
      { source: '/docs', destination: '/pomoc', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ];
  },
};

export default nextConfig;
