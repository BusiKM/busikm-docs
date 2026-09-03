import { firma } from '@/content/firma';
import type { Dokument } from '@/content/dokumenty/typy';

/**
 * Lista podprocesorów.
 *
 * ⚠️ SZKIC. Nazwy podmiotów są przykładowe do czasu podpisania umów — tak też
 * mówi stopka pod tabelą, żeby strona nie twierdziła nieprawdy. Po podpisaniu
 * umów trzeba tu wpisać rzeczywistych dostawców, ich siedziby i daty. Lista
 * jest częścią umowy powierzenia, więc każda zmiana wymaga powiadomienia
 * klientów z 30-dniowym wyprzedzeniem.
 */
export const podprocesorzy: Dokument = {
  href: '/podprocesorzy',
  tytul: 'Podprocesorzy',
  obowiazujeOd: '1 września 2026',
  wersja: 1,
  ostatniaZmiana: '1 września 2026',
  wSkrocie: [
    'Podprocesor to firma, która pomaga nam świadczyć usługę — na przykład trzyma serwery albo wysyła maile.',
    'Wszyscy przetwarzają dane w Europie.',
    'O każdej zmianie na liście uprzedzamy mailem 30 dni wcześniej.',
    'Każdy z nich ma z nami umowę nakładającą te same obowiązki, które my mamy wobec Ciebie.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Kim są podprocesorzy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Podprocesor to dalszy podmiot przetwarzający w rozumieniu art. 28 ust. 4 RODO — firma, której powierzamy część przetwarzania danych, żeby móc świadczyć usługę. Nie moglibyśmy działać bez serwerów, poczty czy operatora płatności, więc korzystamy z wyspecjalizowanych dostawców zamiast budować to samodzielnie.',
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
          naglowki: ['Podmiot', 'Do czego go używamy', 'Jakie dane', 'Kraj', 'Od kiedy'],
          wiersze: [
            [
              'Hetzner Online GmbH',
              'Serwery aplikacji i kopie zapasowe',
              'wszystkie dane w koncie',
              'Niemcy, Finlandia',
              '1.09.2026',
            ],
            [
              'Scaleway SAS',
              'Przechowywanie zdjęć paragonów i dokumentów',
              'zdjęcia, pliki PDF',
              'Francja',
              '1.09.2026',
            ],
            [
              'Postmark (ActiveCampaign)',
              'Wysyłka maili: zaproszenia, faktury, przypomnienia',
              'adres e-mail, treść wiadomości',
              'Irlandia',
              '1.09.2026',
            ],
            [
              'Stripe Payments Europe',
              'Płatności za abonament',
              'dane rozliczeniowe firmy',
              'Irlandia',
              '1.09.2026',
            ],
            [
              'Mapbox (oddział UE)',
              'Mapa i wyznaczanie tras',
              'pozycje pojazdów, adresy',
              'Niemcy',
              '1.09.2026',
            ],
            [
              'SMSAPI sp. z o.o.',
              'Kod zaproszenia dla kierowcy SMS-em',
              'numer telefonu',
              'Polska',
              '1.09.2026',
            ],
          ],
          stopka:
            'Nazwy podmiotów są przykładowe do czasu podpisania umów. Lista zostanie uzupełniona o rzeczywistych dostawców przed uruchomieniem usługi.',
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Zmiany na liście',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'O zamiarze dodania podprocesora albo zastąpienia istniejącego informujemy mailem co najmniej 30 dni przed zmianą. W wiadomości podajemy nazwę podmiotu, zakres przetwarzania i kraj.',
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
