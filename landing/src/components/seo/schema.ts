import { serwis, trasy } from '@/content/seo';
import { firma } from '@/content/firma';
import { pages } from '@/content/pages';
import { plans } from '@/content/cennik';

/**
 * Budowniki grafu danych strukturalnych (schema.org).
 *
 * Jeden graf na stronę główną — firma, serwis i produkt — oraz dwa elementy
 * doklejane na podstronach: ścieżka okruszków i pytania.
 *
 * Świadomie **nie ma tu `aggregateRating` ani `review`**: nie mamy jeszcze
 * ocen, a oznaczenie wymyślonych to naruszenie wytycznych Google, za które
 * leci ręczna kara na całą domenę.
 */

const ID_FIRMA = `${serwis.url}/#organizacja`;
const ID_SERWIS = `${serwis.url}/#serwis`;

/** Kod pocztowy i miasto trzymamy w jednym polu — schema.org chce osobno. */
function adres() {
  const [kod, ...reszta] = firma.miasto.split(' ');
  return {
    '@type': 'PostalAddress',
    streetAddress: firma.ulica,
    postalCode: kod,
    addressLocality: reszta.join(' '),
    addressCountry: 'PL',
  };
}

function organizacja() {
  return {
    '@type': 'Organization',
    '@id': ID_FIRMA,
    name: serwis.nazwa,
    legalName: firma.nazwa,
    url: serwis.url,
    logo: {
      '@type': 'ImageObject',
      url: `${serwis.url}${serwis.logo}`,
      width: 512,
      height: 512,
    },
    image: `${serwis.url}${serwis.ogImage}`,
    email: firma.email,
    address: adres(),
    // NIP w formacie unijnym — z przedrostkiem kraju, tak czyta go VIES.
    vatID: `PL${firma.nip}`,
    taxID: firma.nip,
    identifier: [
      { '@type': 'PropertyValue', name: 'NIP', value: firma.nip },
      { '@type': 'PropertyValue', name: 'REGON', value: firma.regon },
      { '@type': 'PropertyValue', name: 'KRS', value: firma.krs },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: firma.email,
      availableLanguage: ['pl'],
      areaServed: 'PL',
    },
  };
}

function witryna() {
  return {
    '@type': 'WebSite',
    '@id': ID_SERWIS,
    url: serwis.url,
    name: serwis.nazwa,
    description: serwis.opis,
    inLanguage: 'pl-PL',
    publisher: { '@id': ID_FIRMA },
  };
}

/**
 * Produkt z cenami.
 *
 * Ceny biorą się z tej samej tablicy, co cennik na stronie — rozjazd między
 * ceną w wyniku wyszukiwania a ceną na stronie to zgłoszenie „niezgodna
 * cena" i utrata wyniku rozszerzonego.
 */
function aplikacja() {
  const ceny = plans.map((p) => Number(p.monthly.replace(/\s/g, '')));

  return {
    '@type': 'SoftwareApplication',
    '@id': `${serwis.url}/#aplikacja`,
    name: serwis.nazwa,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Zarządzanie flotą i transportem',
    operatingSystem: 'Web, iOS, Android',
    url: serwis.url,
    description: serwis.opis,
    inLanguage: 'pl-PL',
    provider: { '@id': ID_FIRMA },
    screenshot: `${serwis.url}${serwis.ogImage}`,
    featureList: [
      'Automatyczna ewidencja przebiegu pojazdu (kilometrówka)',
      'Ewidencja czasu pracy kierowcy i przerw',
      'Zlecenia transportowe i faktury dla klientów',
      'Mapa floty i planowanie tras',
      'Odczyt paragonów ze zdjęcia',
      'Rentowność zleceń i raporty kosztów',
      'Komplet dokumentów dla biura rachunkowego',
      'Pilnowanie terminów dokumentów i badań',
      'Aplikacja mobilna dla kierowcy',
    ],
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'PLN',
      lowPrice: String(Math.min(...ceny)),
      highPrice: String(Math.max(...ceny)),
      offerCount: plans.length,
      url: `${serwis.url}/cennik`,
      offers: plans.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: p.monthly.replace(/\s/g, ''),
        priceCurrency: 'PLN',
        url: `${serwis.url}/cennik`,
        availability: 'https://schema.org/InStock',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: p.monthly.replace(/\s/g, ''),
          priceCurrency: 'PLN',
          // Ceny w cenniku są netto — bez tego Google przyjmie, że z VAT-em.
          valueAddedTaxIncluded: false,
          billingDuration: 1,
          billingIncrement: 1,
          unitCode: 'MON',
        },
      })),
    },
  };
}

/** Graf strony głównej: firma + serwis + produkt. */
export function grafStronyGlownej() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizacja(), witryna(), aplikacja()],
  };
}

/** Sama firma i serwis — na podstronach, gdzie produkt nie jest tematem. */
export function grafPodstawowy() {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizacja(), witryna()],
  };
}

/**
 * Ścieżka okruszków dla podstrony.
 *
 * Człony pośrednie, które nie mają własnej strony, są pomijane — `/co-robi`
 * i `/dla-kogo` to w nawigacji wyłącznie wyzwalacze menu, więc wskazanie
 * na nie prowadziłoby robota pod adres bez treści.
 */
export function okruszki(sciezka: string) {
  const istnieje = new Set(trasy.map((t) => t.sciezka));
  const czlony = sciezka.split('/').filter(Boolean);

  type Okruch = { '@type': 'ListItem'; position: number; name: string; item: string };
  const elementy: Okruch[] = [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: serwis.url },
  ];

  let biezaca = '';
  for (const czlon of czlony) {
    biezaca += `/${czlon}`;
    if (!istnieje.has(biezaca)) continue;
    const strona = pages[biezaca.slice(1)];
    elementy.push({
      '@type': 'ListItem',
      position: elementy.length + 1,
      name: strona?.title ?? czlon,
      item: `${serwis.url}${biezaca}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: elementy,
  };
}

/**
 * Pytania i odpowiedzi.
 *
 * Uwaga na oczekiwania: od 2023 roku Google pokazuje wyniki rozszerzone
 * FAQ wyłącznie serwisom urzędowym i medycznym. Znacznik zostaje, bo nadal
 * pomaga zrozumieć, o czym jest strona, i jest czytany przez wyszukiwarki
 * odpowiedzi — ale gwiazdek pod wynikiem z niego nie będzie.
 */
export function pytaniaIOdpowiedzi(items: readonly (readonly [string, string])[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([pytanie, odpowiedz]) => ({
      '@type': 'Question',
      name: pytanie,
      acceptedAnswer: { '@type': 'Answer', text: odpowiedz },
    })),
  };
}
