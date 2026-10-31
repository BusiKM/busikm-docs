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
   * `/technologia`, `/docs/*` poza stroną główną działu) świadomie
   * zostają przy 404.
   *
   * `/en/*` to dziś nowa wersja angielska — obsługuje ją `src/proxy.ts`,
   * a stare adresy angielskie z Astro, których nie ma w `i18n/trasy.ts`,
   * dostają angielską stronę 404.
   *
   * Na końcu listy są przekierowania dokumentów prawnych usługi do
   * aplikacji (app.busikm.pl) - to już nie przeprowadzka z Astro, tylko
   * jedno źródło prawdy dla regulaminu, powierzenia i podprocesorów.
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
      // Dokumentacja przeniosła się do repo backendu. Cztery strony mają
      // jednak dokładny odpowiednik w nowym serwisie, więc idą pod adres
      // o tej samej treści, a nie zbiorczo do pomocy.
      { source: '/docs', destination: '/pomoc', permanent: true },
      {
        source: '/docs/aplikacja-mobilna',
        destination: '/co-robi/aplikacja-kierowcy',
        permanent: true,
      },
      {
        source: '/docs/aplikacja-webowa',
        destination: '/co-robi/dyspozytornia',
        permanent: true,
      },
      {
        source: '/docs/integracje-fk',
        destination: '/co-robi/dane-dla-ksiegowej',
        permanent: true,
      },
      // „Bezpieczeństwo" to dziś § 9 polityki prywatności — „Jak chronimy dane"
      { source: '/docs/bezpieczenstwo', destination: '/prywatnosc', permanent: true },
      { source: '/docs/funkcje-szczegolowo', destination: '/', permanent: true },
      // Bez odpowiednika i bez przekierowania: /docs/slownik, /roadmapa,
      // /technologia i /g2v2-przygotowanie. Roadmapa ma
      // wrócić pod tym samym adresem, więc 404 jest tu stanem przejściowym,
      // a nie decyzją.

      // Dokumenty prawne usługi mają jedno źródło: API backendu, wyświetlane
      // przez aplikację pod app.busikm.pl. Landing publikował drugi komplet,
      // który rozjechał się z oryginałem (AUD-RODO-02, BKM-2787), więc stare
      // adresy idą do aplikacji. Wersje angielskie trafiają na te same polskie
      // strony, bo wiążąca jest tylko wersja polska i tylko taka istnieje.
      // Przekierowania z tej listy działają przed `src/proxy.ts`, więc proxy
      // nie zdąży tych adresów przepisać ani zamienić na 404.
      // `/prywatnosc` zostaje na landingu: opisuje samą stronę busikm.pl.
      {
        source: '/regulamin',
        destination: 'https://app.busikm.pl/regulamin',
        permanent: true,
      },
      {
        source: '/powierzenie-danych',
        destination: 'https://app.busikm.pl/umowa-powierzenia',
        permanent: true,
      },
      {
        source: '/podprocesorzy',
        destination: 'https://app.busikm.pl/podprocesorzy',
        permanent: true,
      },
      // Aplikacja kierowcy 1.0.0 i stare odnośniki prowadzą pod /polityka-prywatnosci - to polityka
      // usługi (aplikacja webowa i mobilna), nie polityka samej strony (/prywatnosc).
      {
        source: '/polityka-prywatnosci',
        destination: 'https://app.busikm.pl/polityka-prywatnosci',
        permanent: true,
      },
      { source: '/en/terms', destination: 'https://app.busikm.pl/regulamin', permanent: true },
      {
        source: '/en/data-processing-agreement',
        destination: 'https://app.busikm.pl/umowa-powierzenia',
        permanent: true,
      },
      {
        source: '/en/subprocessors',
        destination: 'https://app.busikm.pl/podprocesorzy',
        permanent: true,
      },
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
