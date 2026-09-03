import { firma } from '@/content/firma';
import type { Dokument } from '@/content/dokumenty/typy';

/**
 * Rejestr podprocesorów — stos docelowy na produkcji.
 *
 * ⚠️ SZKIC DO PRZEGLĄDU PRAWNEGO. Lista jest listą stanu docelowego, nie
 * bieżącego: produkt jest w budowie, a staging chodzi na Railway. Decyzja
 * właściciela produktu: na produkcji AWS (serwery, Postgres, Redis, MongoDB,
 * pliki, kopie), Amazon SES do poczty, Google Cloud Vision do rozpoznawania
 * paragonów, Mapbox do tras, Stripe do płatności, Sentry i Grafana do
 * obserwowalności, sklepy Apple i Google do dystrybucji aplikacji i dostarczania
 * powiadomień. SMS-ów nie ma i nie będzie — kod zaproszenia idzie mailem.
 *
 * Rejestr jest zadaniem BKM-1971 w etapie 7 backlogu. Jeżeli stos zmieni się
 * przed uruchomieniem, ta lista idzie do aktualizacji razem z nim.
 */
export const podprocesorzy: Dokument = {
  href: '/podprocesorzy',
  tytul: 'Podprocesorzy',
  obowiazujeOd: '1 września 2026',
  wersja: 1,
  ostatniaZmiana: '3 września 2026',
  wSkrocie: [
    'Podprocesor to firma, która pomaga nam świadczyć usługę — na przykład trzyma serwery albo rozpoznaje tekst z paragonu.',
    'Serwery, bazy danych, pliki i kopie zapasowe trzymamy w Europie.',
    'Dwie rzeczy wymagają dostawców spoza Europy: rozpoznawanie paragonów i powiadomienia w telefonie. Piszemy o tym wprost, zamiast to chować.',
    'O każdej zmianie na liście uprzedzamy mailem 30 dni wcześniej.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Kim są podprocesorzy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Podprocesor to dalszy podmiot przetwarzający w rozumieniu art. 28 ust. 4 RODO — firma, której powierzamy część przetwarzania danych, żeby móc świadczyć usługę. Nie moglibyśmy działać bez serwerów czy usługi rozpoznającej tekst ze zdjęcia, więc korzystamy z wyspecjalizowanych dostawców zamiast budować to samodzielnie.',
        },
        {
          typ: 'akapit',
          tresc:
            'Na każdego podprocesora nakładamy umownie te same obowiązki ochrony danych, które ciążą na nas wobec Ciebie. Odpowiadamy za ich działania jak za własne.',
        },
      ],
    },
    {
      numer: '2',
      tytul: 'Lista podprocesorów',
      bloki: [
        {
          typ: 'tabela',
          naglowki: ['Podmiot', 'Do czego go używamy', 'Jakie dane', 'Gdzie przetwarza'],
          wiersze: [
            [
              'Amazon Web Services',
              'Serwery, bazy danych (PostgreSQL, Redis, MongoDB), pliki i kopie zapasowe',
              'wszystkie dane w koncie',
              'Unia Europejska (Frankfurt)',
            ],
            [
              'Amazon SES',
              'Wysyłka maili: zaproszenia z kodem, faktury, przypomnienia o terminach',
              'adres e-mail, treść wiadomości i załączniki',
              'Unia Europejska',
            ],
            [
              'Mapbox',
              'Wyznaczanie tras i zamiana adresów na współrzędne',
              'adresy załadunku i rozładunku, pozycje pojazdów',
              'Unia Europejska',
            ],
            [
              'Google Cloud (Vision)',
              'Rozpoznawanie tekstu ze zdjęć paragonów',
              'zdjęcia paragonów i odczytane z nich kwoty',
              'Unia Europejska, podmiot spoza EOG',
            ],
            [
              'Stripe',
              'Płatności za abonament i faktury za usługę',
              'dane rozliczeniowe firmy, adres e-mail',
              'Unia Europejska (Irlandia)',
            ],
            [
              'Sentry',
              'Zgłoszenia błędów aplikacji',
              'identyfikator użytkownika, adres IP, kontekst błędu',
              'Unia Europejska',
            ],
            [
              'Apple (App Store, powiadomienia)',
              'Dystrybucja aplikacji kierowcy i dostarczanie powiadomień',
              'token urządzenia, treść powiadomienia',
              'poza EOG',
            ],
            [
              'Google (Google Play, powiadomienia)',
              'Dystrybucja aplikacji kierowcy i dostarczanie powiadomień',
              'token urządzenia, treść powiadomienia',
              'poza EOG',
            ],
          ],
          stopka:
            'Statystyki działania usługi zbieramy narzędziem Grafana uruchomionym na naszych własnych serwerach — nie jest to osobny podprocesor, bo dane nie opuszczają naszej infrastruktury.',
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Kto nie jest podprocesorem',
      bloki: [
        {
          typ: 'definicje',
          wstep:
            'Aplikacja łączy się też z systemami, które nie przetwarzają danych w naszym imieniu — dla porządku wymieniamy je osobno:',
          pozycje: [
            {
              termin: 'Krajowy System e-Faktur',
              opis:
                'system Ministerstwa Finansów. Wysyłamy tam faktury na Twoje polecenie; administratorem danych w KSeF jest organ, nie my.',
            },
            {
              termin: 'Narodowy Bank Polski',
              opis:
                'publiczne API kursów walut. Pobieramy same kursy, bez przekazywania jakichkolwiek danych.',
            },
            {
              termin: 'VIES (Komisja Europejska)',
              opis:
                'sprawdzanie numerów VAT kontrahentów. Przekazujemy numer VAT firmy, nie dane osobowe.',
            },
            {
              termin: 'Grafana',
              opis:
                'wykresy obciążenia i dostępności usługi. Działa na naszych serwerach, dane nie trafiają do dostawcy oprogramowania.',
            },
          ],
        },
      ],
    },
    {
      numer: '4',
      tytul: 'Przetwarzanie poza Europą',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Serwery, bazy danych, pliki, kopie zapasowe, poczta i płatności działają w Unii Europejskiej. Dwie rzeczy wymagają jednak podmiotów spoza Europejskiego Obszaru Gospodarczego: rozpoznawanie tekstu z paragonów oraz dostarczanie powiadomień do telefonu, które zawsze idzie przez Apple albo Google.',
        },
        {
          typ: 'akapit',
          tresc:
            'Transfer zabezpieczamy standardowymi klauzulami umownymi zatwierdzonymi przez Komisję Europejską. Rozpoznawanie paragonów ustawiamy na region europejski dostawcy. Powiadomienie zawiera token urządzenia i krótką treść — nigdy zdjęć, dokumentów ani danych rozliczeniowych.',
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli wolisz, żeby zdjęcia paragonów nie opuszczały Europy, napisz do nas — możemy przełączyć Twoje konto na silnik rozpoznawania działający na naszych serwerach. Odczyt jest wtedy nieco mniej dokładny.',
        },
      ],
    },
    {
      numer: '5',
      tytul: 'Zmiany na liście',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'O zamiarze dodania podprocesora albo zastąpienia istniejącego informujemy mailem co najmniej 30 dni przed zmianą. W wiadomości podajemy nazwę podmiotu, zakres przetwarzania i miejsce przetwarzania danych.',
        },
        {
          typ: 'akapit',
          tresc:
            'W tym czasie możesz zgłosić uzasadniony sprzeciw. Postaramy się znaleźć rozwiązanie — na przykład wskazać innego dostawcę. Jeżeli się nie uda, możesz rozwiązać umowę ze skutkiem na dzień wejścia zmiany w życie, bez ponoszenia kosztów.',
        },
        {
          typ: 'akapit',
          tresc: `Chcesz dostawać powiadomienia o zmianach na tej liście, choć nie jesteś jeszcze klientem? Napisz na ${firma.email}, dopiszemy Cię.`,
        },
      ],
    },
  ],
};
