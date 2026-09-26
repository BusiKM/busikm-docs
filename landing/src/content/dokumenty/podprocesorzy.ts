import { firma } from '@/content/firma';
import type { Tlumaczenia } from '@/i18n/jezyki';
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
const pl: Dokument = {
  href: '/podprocesorzy',
  tytul: 'Podprocesorzy',
  obowiazujeOd: '1 września 2026',
  wersja: 2,
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
            {
              termin: 'Formularz kontaktowy na stronie',
              opis:
                'wiadomość wysłaną z busikm.pl zapisujemy w bazie Firestore (Google Ireland, region europejski), a powiadomienie o niej dostarcza Resend z serwerów w Irlandii. To nie są podprocesorzy w rozumieniu tego rejestru: dotyczą danych, których jesteśmy administratorem, a nie danych powierzonych nam przez klientów. Wymienia ich polityka prywatności.',
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

/**
 * Tłumaczenie angielskie — dla wygody czytelnika. Wiążąca jest wersja polska;
 * strona mówi o tym wprost nad treścią.
 */
const en: Dokument = {
  href: '/podprocesorzy',
  tytul: 'Subprocessors',
  obowiazujeOd: '1 September 2026',
  wersja: 2,
  ostatniaZmiana: '3 September 2026',
  wSkrocie: [
    'A subprocessor is a company that helps us provide the service — for example, by hosting servers or reading the text on a receipt.',
    'We keep servers, databases, files and backups in Europe.',
    'Two things require providers from outside Europe: receipt recognition and phone notifications. We say so plainly instead of hiding it.',
    'We notify you by e-mail 30 days in advance of any change to the list.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Who subprocessors are',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'A subprocessor is a further processor within the meaning of Art. 28(4) of the General Data Protection Regulation (GDPR) — a company to which we entrust part of the data processing so that we can provide the service. We could not operate without servers or a service that recognises text in a photo, so we use specialised providers instead of building these ourselves.',
        },
        {
          typ: 'akapit',
          tresc:
            'We contractually impose on each subprocessor the same data protection obligations that we owe to you. We are liable for their actions as for our own.',
        },
      ],
    },
    {
      numer: '2',
      tytul: 'List of subprocessors',
      bloki: [
        {
          typ: 'tabela',
          naglowki: ['Entity', 'What we use it for', 'What data', 'Where it processes data'],
          wiersze: [
            [
              'Amazon Web Services',
              'Servers, databases (PostgreSQL, Redis, MongoDB), files and backups',
              'all data in the account',
              'European Union (Frankfurt)',
            ],
            [
              'Amazon SES',
              'Sending e-mails: invitations with a code, invoices, deadline reminders',
              'e-mail address, message content and attachments',
              'European Union',
            ],
            [
              'Mapbox',
              'Route planning and converting addresses into coordinates',
              'loading and unloading addresses, vehicle positions',
              'European Union',
            ],
            [
              'Google Cloud (Vision)',
              'Recognising text in photos of receipts',
              'photos of receipts and the amounts read from them',
              'European Union, entity outside the EEA',
            ],
            [
              'Stripe',
              'Subscription payments and invoices for the service',
              'company billing details, e-mail address',
              'European Union (Ireland)',
            ],
            [
              'Sentry',
              'Application error reporting',
              'user identifier, IP address, error context',
              'European Union',
            ],
            [
              'Apple (App Store, notifications)',
              'Distribution of the driver app and delivery of notifications',
              'device token, notification content',
              'outside the EEA',
            ],
            [
              'Google (Google Play, notifications)',
              'Distribution of the driver app and delivery of notifications',
              'device token, notification content',
              'outside the EEA',
            ],
          ],
          stopka:
            'We collect service performance statistics using Grafana running on our own servers — it is not a separate subprocessor, because the data does not leave our infrastructure.',
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Who is not a subprocessor',
      bloki: [
        {
          typ: 'definicje',
          wstep:
            'The application also connects to systems that do not process data on our behalf — for completeness, we list them separately:',
          pozycje: [
            {
              termin: 'National e-Invoicing System (Krajowy System e-Faktur, KSeF)',
              opis: 'a system operated by Poland’s Ministry of Finance. We send invoices there on your instructions; the controller of data in KSeF is the public authority, not us.',
            },
            {
              termin: 'National Bank of Poland (Narodowy Bank Polski)',
              opis: 'a public exchange rate API. We only retrieve exchange rates, without transmitting any data.',
            },
            {
              termin: 'VIES (European Commission)',
              opis: 'verification of business partners’ VAT numbers. We transmit the company’s VAT number, not personal data.',
            },
            {
              termin: 'Grafana',
              opis: 'charts of service load and availability. It runs on our servers; the data does not reach the software vendor.',
            },
            {
              termin: 'Contact form on the website',
              opis: 'a message sent from busikm.pl is stored in a Firestore database (Google Ireland, European region), and the notification about it is delivered by Resend from servers in Ireland. These are not subprocessors within the meaning of this register: they concern data for which we are the controller, not data entrusted to us by clients. They are listed in the Privacy Policy.',
            },
          ],
        },
      ],
    },
    {
      numer: '4',
      tytul: 'Processing outside Europe',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Servers, databases, files, backups, e-mail and payments operate within the European Union. Two things, however, require entities outside the European Economic Area: recognising text on receipts, and delivering notifications to the phone, which always goes through Apple or Google.',
        },
        {
          typ: 'akapit',
          tresc:
            'We safeguard the transfer with standard contractual clauses approved by the European Commission. We set receipt recognition to the provider’s European region. A notification contains the device token and a short message — never photos, documents or billing data.',
        },
        {
          typ: 'akapit',
          tresc:
            'If you would prefer photos of receipts not to leave Europe, write to us — we can switch your account to a recognition engine running on our own servers. Recognition is then slightly less accurate.',
        },
      ],
    },
    {
      numer: '5',
      tytul: 'Changes to the list',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We notify you by e-mail at least 30 days before any intended addition or replacement of a subprocessor. In the message, we give the name of the entity, the scope of processing and the place where the data is processed.',
        },
        {
          typ: 'akapit',
          tresc:
            'During that time, you may raise a reasoned objection. We will try to find a solution — for example, by proposing a different provider. If that is not possible, you may terminate the agreement with effect from the date the change takes effect, at no cost.',
        },
        {
          typ: 'akapit',
          tresc: `Would you like to be notified of changes to this list even though you are not a client yet? Write to ${firma.email} and we will add you.`,
        },
      ],
    },
  ],
};

export const podprocesorzy: Tlumaczenia<Dokument> = { pl, en };
