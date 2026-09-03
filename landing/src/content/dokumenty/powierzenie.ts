import { firma } from '@/content/firma';
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
export const powierzenie: Dokument = {
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
              'imię i nazwisko, numer telefonu, adres e-mail, numer prawa jazdy i terminy badań, pozycja pojazdu w czasie zlecenia, czas jazdy i przerw, zdjęcia dokumentów',
              'wprowadzasz Ty albo kierowca w aplikacji',
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
