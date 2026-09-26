import { firma } from '@/content/firma';
import type { Tlumaczenia } from '@/i18n/jezyki';
import type { Dokument } from '@/content/dokumenty/typy';

/**
 * Umowa powierzenia przetwarzania danych osobowych (DPA).
 *
 * ⚠️ SZKIC DO PRZEGLĄDU PRAWNEGO. Zawiera komplet elementów wymaganych
 * art. 28 ust. 3 RODO: przedmiot, czas trwania, charakter i cel przetwarzania,
 * rodzaj danych, kategorie osób, a także obowiązki podmiotu przetwarzającego
 * z lit. a–h. Brak choćby jednego elementu czyni umowę wadliwą, więc przed
 * publikacją musi to sprawdzić prawnik.
 */
const pl: Dokument = {
  href: '/powierzenie-danych',
  tytul: 'Powierzenie danych',
  obowiazujeOd: '1 września 2026',
  wersja: 1,
  ostatniaZmiana: '1 września 2026',
  wSkrocie: [
    'Ty jesteś administratorem danych swoich kierowców i kontrahentów. My tylko je przetwarzamy — na Twoje polecenie.',
    'Nie robimy z nimi nic poza tym, co potrzebne do działania usługi.',
    'Podwykonawców mamy wypisanych z nazwy. O każdej zmianie uprzedzamy 30 dni wcześniej.',
    'Po zakończeniu umowy zwracamy dane albo je usuwamy — decydujesz Ty.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Czym jest ten dokument',
      bloki: [
        {
          typ: 'akapit',
          tresc: `Ten dokument jest umową powierzenia przetwarzania danych osobowych w rozumieniu art. 28 RODO. Zawierasz ją z ${firma.nazwa} w chwili zawarcia umowy o świadczenie usługi BusiKM. Stanowi integralną część Regulaminu i nie wymaga osobnego podpisu.`,
        },
        {
          typ: 'definicje',
          pozycje: [
            {
              termin: 'Administrator',
              opis: 'Klient, czyli firma, która korzysta z usługi i wprowadza do niej dane.',
            },
            {
              termin: 'Podmiot przetwarzający',
              opis: `${firma.nazwa}, czyli my.`,
            },
            {
              termin: 'Podprocesor',
              opis:
                'dalszy podmiot przetwarzający, z którego korzystamy przy świadczeniu usługi. Ich lista jest w dokumencie Podprocesorzy.',
            },
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli Twoja organizacja wymaga podpisania odrębnej umowy powierzenia na własnym wzorze, napisz — ustalimy jej treść indywidualnie.',
        },
      ],
    },
    {
      numer: '2',
      tytul: 'Przedmiot, charakter i cel przetwarzania',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Powierzasz nam przetwarzanie danych osobowych wyłącznie w celu świadczenia usługi BusiKM: prowadzenia zleceń, tras, czasu pracy, kosztów, dokumentów i rozliczeń oraz udostępniania ich osobom, którym nadałeś dostęp.',
        },
        {
          typ: 'lista',
          wstep: 'Przetwarzanie polega na wykonywaniu na danych następujących operacji:',
          punkty: [
            'zbieranie i utrwalanie — przez formularze aplikacji i aplikację kierowcy;',
            'przechowywanie — na serwerach podprocesorów wskazanych na liście;',
            'porządkowanie, przeglądanie i wyszukiwanie — na potrzeby wyświetlania i zestawień;',
            'przesyłanie — do odbiorców wskazanych przez Ciebie, w tym do klientów i księgowości;',
            'usuwanie — na Twoje polecenie i po zakończeniu umowy.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Nie wykorzystujemy powierzonych danych do własnych celów, w tym marketingowych i analitycznych, ani ich nie sprzedajemy.',
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Czas trwania',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Przetwarzamy dane przez czas trwania umowy o świadczenie usługi oraz przez 30 dni po jej zakończeniu — tak, abyś zdążył pobrać dane. Po tym okresie postępujemy zgodnie z punktem 9.',
        },
      ],
    },
    {
      numer: '4',
      tytul: 'Rodzaj danych i kategorie osób',
      bloki: [
        {
          typ: 'tabela',
          naglowki: ['Kategoria osób', 'Jakie dane', 'Skąd pochodzą'],
          wiersze: [
            [
              'Kierowcy',
              'imię i nazwisko, adres e-mail, numer prawa jazdy i terminy badań, pozycja pojazdu w czasie zlecenia, czas jazdy i przerw, zdjęcia dokumentów; numer telefonu, jeżeli go wpiszesz',
              'wprowadzasz Ty przy zaproszeniu albo kierowca w aplikacji',
            ],
            [
              'Pracownicy biura',
              'imię i nazwisko, adres e-mail, rola w koncie',
              'wprowadzasz Ty',
            ],
            [
              'Osoby kontaktowe kontrahentów',
              'imię i nazwisko, adres e-mail, telefon, dane firmy',
              'wprowadzasz Ty albo pochodzą z dokumentów',
            ],
          ],
          stopka:
            'Nie powierzasz nam danych szczególnych kategorii (art. 9 RODO) ani danych o wyrokach. Jeżeli wprowadzisz je mimo to, robisz to na własną odpowiedzialność.',
        },
      ],
    },
    {
      numer: '5',
      tytul: 'Nasze obowiązki',
      bloki: [
        {
          typ: 'lista',
          wstep: 'Zobowiązujemy się, że:',
          punkty: [
            'przetwarzamy dane wyłącznie na Twoje udokumentowane polecenie — poleceniem jest także korzystanie przez Ciebie z funkcji aplikacji;',
            'jeżeli obowiązek przetwarzania nałoży na nas prawo, uprzedzimy Cię przed przetwarzaniem, chyba że prawo tego zabrania;',
            'zapewniamy, że osoby dopuszczone do danych są zobowiązane do zachowania tajemnicy;',
            'stosujemy środki bezpieczeństwa opisane w punkcie 6;',
            'pomagamy Ci wywiązać się z obowiązku odpowiadania na żądania osób, których dane dotyczą;',
            'pomagamy Ci w ocenie skutków dla ochrony danych i w konsultacjach z organem nadzorczym, w zakresie informacji, którymi dysponujemy;',
            'po zakończeniu umowy zwracamy albo usuwamy dane, zgodnie z punktem 9;',
            'udostępniamy Ci informacje niezbędne do wykazania zgodności i umożliwiamy audyt na zasadach z punktu 8.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli uznamy, że Twoje polecenie narusza RODO lub inne przepisy o ochronie danych, niezwłocznie Cię o tym poinformujemy.',
        },
      ],
    },
    {
      numer: '6',
      tytul: 'Bezpieczeństwo',
      bloki: [
        {
          typ: 'lista',
          wstep:
            'Stosujemy środki techniczne i organizacyjne odpowiadające ryzyku, w szczególności:',
          punkty: [
            'szyfrowanie danych w przesyle (TLS) i w spoczynku;',
            'kontrolę dostępu opartą na rolach oraz uwierzytelnianie dwuskładnikowe dla dostępu administracyjnego;',
            'rozdzielenie danych poszczególnych klientów;',
            'kopie zapasowe wykonywane codziennie, przechowywane w Europie i testowane pod kątem odtwarzania;',
            'rejestrowanie dostępu do danych produkcyjnych i okresowy przegląd uprawnień;',
            'procedurę postępowania w razie naruszenia ochrony danych.',
          ],
        },
      ],
    },
    {
      numer: '7',
      tytul: 'Podprocesorzy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Wyrażasz ogólną zgodę na korzystanie przez nas z podprocesorów. Ich aktualną listę — z nazwą, zakresem i krajem przetwarzania — prowadzimy w dokumencie Podprocesorzy.',
        },
        {
          typ: 'akapit',
          tresc:
            'O zamiarze dodania podprocesora albo zmiany istniejącego informujemy mailem co najmniej 30 dni wcześniej. W tym czasie możesz zgłosić uzasadniony sprzeciw. Jeżeli nie znajdziemy rozwiązania, możesz rozwiązać umowę ze skutkiem na dzień wejścia zmiany w życie, bez ponoszenia kosztów.',
        },
        {
          typ: 'akapit',
          tresc:
            'Na każdego podprocesora nakładamy te same obowiązki ochrony danych, które ciążą na nas. Odpowiadamy przed Tobą za działania podprocesorów jak za własne.',
        },
      ],
    },
    {
      numer: '8',
      tytul: 'Naruszenia i audyt',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'O naruszeniu ochrony powierzonych danych informujemy Cię bez zbędnej zwłoki, nie później niż w ciągu 24 godzin od jego stwierdzenia. Przekazujemy opis naruszenia, kategorie i przybliżoną liczbę osób i rekordów, prawdopodobne konsekwencje oraz środki, które zastosowaliśmy.',
        },
        {
          typ: 'akapit',
          tresc:
            'Masz prawo do audytu przetwarzania, w tym inspekcji, przeprowadzanego przez Ciebie lub audytora przez Ciebie upoważnionego. Audyt zapowiadasz z 14-dniowym wyprzedzeniem, przeprowadzasz w godzinach pracy i nie częściej niż raz w roku — chyba że powodem jest stwierdzone naruszenie. Zamiast audytu możemy przedstawić aktualny raport z audytu niezależnego podmiotu.',
        },
      ],
    },
    {
      numer: '9',
      tytul: 'Co po zakończeniu umowy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Po zakończeniu umowy przez 30 dni masz dostęp do pobrania danych. Po upływie tego okresu usuwamy dane z systemów produkcyjnych. Z kopii zapasowych dane znikają wraz z ich rotacją, nie później niż po 90 dniach.',
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli wolisz otrzymać dane zamiast ich usunięcia albo chcesz, żebyśmy usunęli je wcześniej — napisz, a zrobimy to i potwierdzimy wykonanie.',
        },
        {
          typ: 'akapit',
          tresc:
            'Możemy zachować dane dłużej wyłącznie wtedy, gdy nakazuje to prawo. W takim wypadku informujemy Cię o podstawie i zakresie.',
        },
      ],
    },
    {
      numer: '10',
      tytul: 'Odpowiedzialność i kontakt',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Każda ze stron odpowiada za szkody wyrządzone przetwarzaniem na zasadach określonych w art. 82 RODO.',
        },
        {
          typ: 'akapit',
          tresc: `Sprawy dotyczące powierzenia kierujcie na ${firma.email}. W tytule wystarczy „powierzenie danych".`,
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
  href: '/powierzenie-danych',
  tytul: 'Data Processing Agreement',
  obowiazujeOd: '1 September 2026',
  wersja: 1,
  ostatniaZmiana: '1 September 2026',
  wSkrocie: [
    'You are the controller of your drivers’ and business partners’ data. We only process it — on your instructions.',
    'We do nothing with it beyond what the service needs to work.',
    'Our subcontractors are listed by name. We give 30 days’ notice of any change.',
    'When the agreement ends, we return the data or delete it — you decide.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'What this document is',
      bloki: [
        {
          typ: 'akapit',
          tresc: `This document is an agreement on the processing of personal data within the meaning of Art. 28 of the General Data Protection Regulation (GDPR). You conclude it with ${firma.nazwa} at the moment you conclude the agreement for the provision of the BusiKM service. It forms an integral part of the Terms of Service and does not require a separate signature.`,
        },
        {
          typ: 'definicje',
          pozycje: [
            {
              termin: 'Controller',
              opis: 'the Client, that is, the business that uses the service and enters data into it.',
            },
            {
              termin: 'Processor',
              opis: `${firma.nazwa}, that is, us.`,
            },
            {
              termin: 'Subprocessor',
              opis: 'a further processor that we use to provide the service. The list of subprocessors is in the Subprocessors document.',
            },
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'If your organisation requires a separate data processing agreement to be signed on its own template, write to us — we will agree its content individually.',
        },
      ],
    },
    {
      numer: '2',
      tytul: 'Subject matter, nature and purpose of processing',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'You entrust us with the processing of personal data solely for the purpose of providing the BusiKM service: managing orders, routes, working time, costs, documents and billing, and making them available to the persons to whom you have granted access.',
        },
        {
          typ: 'lista',
          wstep: 'Processing consists of performing the following operations on the data:',
          punkty: [
            'collection and recording — through the application’s forms and the driver app;',
            'storage — on the servers of the subprocessors indicated on the list;',
            'organisation, viewing and retrieval — for display and reporting purposes;',
            'transmission — to recipients indicated by you, including clients and accounting;',
            'erasure — on your instructions and after the agreement ends.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'We do not use the entrusted data for our own purposes, including marketing and analytics, and we do not sell it.',
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Duration',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We process the data for the term of the service agreement and for 30 days after it ends — so that you have time to download the data. After that period, we proceed in accordance with section 9.',
        },
      ],
    },
    {
      numer: '4',
      tytul: 'Type of data and categories of data subjects',
      bloki: [
        {
          typ: 'tabela',
          naglowki: ['Category of data subjects', 'What data', 'Where it comes from'],
          wiersze: [
            [
              'Drivers',
              'first name and surname, e-mail address, driving licence number and medical examination dates, vehicle position during an order, driving and break times, photos of documents; phone number, if you enter it',
              'entered by you when sending the invitation, or by the driver in the app',
            ],
            [
              'Office staff',
              'first name and surname, e-mail address, role in the account',
              'entered by you',
            ],
            [
              'Contact persons at business partners',
              'first name and surname, e-mail address, phone number, company details',
              'entered by you or taken from documents',
            ],
          ],
          stopka:
            'You do not entrust us with special categories of data (Art. 9 GDPR) or data relating to criminal convictions. If you enter such data nonetheless, you do so at your own risk.',
        },
      ],
    },
    {
      numer: '5',
      tytul: 'Our obligations',
      bloki: [
        {
          typ: 'lista',
          wstep: 'We undertake that we:',
          punkty: [
            'process the data only on your documented instructions — your use of the application’s functions also constitutes an instruction;',
            'will inform you before processing if the law imposes an obligation to process on us, unless the law prohibits this;',
            'ensure that persons authorised to access the data are bound by confidentiality;',
            'apply the security measures described in section 6;',
            'assist you in fulfilling your obligation to respond to requests from data subjects;',
            'assist you with data protection impact assessments and prior consultations with the supervisory authority, to the extent of the information available to us;',
            'return or delete the data after the agreement ends, in accordance with section 9;',
            'make available to you the information necessary to demonstrate compliance and allow audits under the terms of section 8.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'If we consider that your instruction infringes the GDPR or other data protection provisions, we will inform you immediately.',
        },
      ],
    },
    {
      numer: '6',
      tytul: 'Security',
      bloki: [
        {
          typ: 'lista',
          wstep:
            'We apply technical and organisational measures appropriate to the risk, in particular:',
          punkty: [
            'encryption of data in transit (TLS) and at rest;',
            'role-based access control and two-factor authentication for administrative access;',
            'separation of individual clients’ data;',
            'backups made daily, stored in Europe and tested for restorability;',
            'logging of access to production data and periodic review of permissions;',
            'a procedure for handling personal data breaches.',
          ],
        },
      ],
    },
    {
      numer: '7',
      tytul: 'Subprocessors',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'You give us general authorisation to engage subprocessors. We keep their current list — with the name, scope and country of processing — in the Subprocessors document.',
        },
        {
          typ: 'akapit',
          tresc:
            'We notify you by e-mail at least 30 days in advance of any intended addition or replacement of a subprocessor. During that time, you may raise a reasoned objection. If we cannot find a solution, you may terminate the agreement with effect from the date the change takes effect, at no cost.',
        },
        {
          typ: 'akapit',
          tresc:
            'We impose on each subprocessor the same data protection obligations that apply to us. We are liable to you for the actions of subprocessors as for our own.',
        },
      ],
    },
    {
      numer: '8',
      tytul: 'Breaches and audits',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We notify you of a breach of the entrusted data without undue delay, and no later than 24 hours after becoming aware of it. We provide a description of the breach, the categories and approximate number of data subjects and records concerned, the likely consequences and the measures we have taken.',
        },
        {
          typ: 'akapit',
          tresc:
            'You have the right to audit the processing, including inspections, carried out by you or by an auditor mandated by you. You announce an audit 14 days in advance and carry it out during business hours, no more than once a year — unless the reason is an identified breach. Instead of an audit, we may present a current audit report from an independent party.',
        },
      ],
    },
    {
      numer: '9',
      tytul: 'What happens after the agreement ends',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'For 30 days after the agreement ends, you can access and download the data. After that period, we delete the data from production systems. The data disappears from backups as they are rotated, no later than after 90 days.',
        },
        {
          typ: 'akapit',
          tresc:
            'If you would rather receive the data than have it deleted, or you want us to delete it earlier — write to us, and we will do so and confirm that it has been done.',
        },
        {
          typ: 'akapit',
          tresc:
            'We may retain the data for longer only where required by law. In that case, we inform you of the legal basis and scope.',
        },
      ],
    },
    {
      numer: '10',
      tytul: 'Liability and contact',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Each party is liable for damage caused by processing under the rules set out in Art. 82 GDPR.',
        },
        {
          typ: 'akapit',
          tresc: `Please send matters concerning data processing to ${firma.email}. The subject line “data processing agreement” is enough.`,
        },
      ],
    },
  ],
};

export const powierzenie: Tlumaczenia<Dokument> = { pl, en };
