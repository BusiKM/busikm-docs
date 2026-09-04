import { firma } from '@/content/firma';
import type { Dokument } from '@/content/dokumenty/typy';

/**
 * Polityka prywatności i plików cookie.
 *
 * ⚠️ SZKIC DO PRZEGLĄDU PRAWNEGO. Zawiera komplet informacji wymaganych
 * art. 13 RODO (administrator, cele, podstawy prawne, odbiorcy, okresy
 * przechowywania, prawa, skarga do PUODO, profilowanie) oraz sekcję o cookie.
 * Tabela retencji i lista narzędzi muszą zostać potwierdzone z tym, co system
 * naprawdę robi — dziś opisują stan zakładany.
 */
export const prywatnosc: Dokument = {
  href: '/prywatnosc',
  tytul: 'Polityka prywatności',
  obowiazujeOd: '1 września 2026',
  wersja: 3,
  ostatniaZmiana: '3 września 2026',
  wSkrocie: [
    'Twoje dane trzymamy w Europie i nie sprzedajemy ich nikomu.',
    'Zbieramy tylko to, co potrzebne do działania usługi i do wystawienia faktury.',
    'Na stronie używamy plików cookie potrzebnych do jej działania. Analityczne włączamy dopiero za Twoją zgodą.',
    'Jeśli zostawisz adres, żeby dostać wiadomość o uruchomieniu — użyjemy go do tej jednej wiadomości. Cokolwiek ponad to wymaga osobnej zgody, którą zaznaczasz sam.',
    'Masz prawo wglądu, poprawienia, usunięcia i przeniesienia swoich danych. Napisz, a zrobimy to.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Kto jest administratorem',
      bloki: [
        {
          typ: 'akapit',
          tresc: `Administratorem danych osobowych jest ${firma.nazwa} z siedzibą w Szczecinie, ${firma.ulica}, ${firma.miasto}, NIP ${firma.nip}, KRS ${firma.krs}.`,
        },
        {
          typ: 'akapit',
          tresc: `We wszystkich sprawach dotyczących danych osobowych piszcie na ${firma.email}. Nie wyznaczyliśmy inspektora ochrony danych — nie mamy takiego obowiązku.`,
        },
        {
          typ: 'akapit',
          tresc:
            'Ta polityka dotyczy danych, których jesteśmy administratorem: danych osób kontaktujących się z nami, osób zakładających konto i odwiedzających stronę. Dane, które nasi klienci wprowadzają do swoich kont — w tym dane ich kierowców i kontrahentów — przetwarzamy jako podmiot przetwarzający, na zasadach opisanych w dokumencie Powierzenie danych.',
        },
      ],
    },
    {
      numer: '2',
      tytul: 'Po co i na jakiej podstawie',
      bloki: [
        {
          typ: 'tabela',
          naglowki: ['Cel', 'Kategorie danych', 'Podstawa prawna', 'Jak długo'],
          wiersze: [
            [
              'Prowadzenie konta i świadczenie usługi',
              'imię, nazwisko, e-mail, nazwa i dane firmy, rola w koncie',
              'art. 6 ust. 1 lit. b RODO — wykonanie umowy',
              'przez czas trwania umowy i 30 dni po jej zakończeniu',
            ],
            [
              'Rozliczenia i księgowość',
              'dane firmy, NIP, historia płatności, faktury',
              'art. 6 ust. 1 lit. c RODO — obowiązek prawny',
              '5 lat od końca roku, w którym upłynął termin płatności podatku',
            ],
            [
              'Kontakt i obsługa zgłoszeń',
              'imię, adres e-mail, treść wiadomości',
              'art. 6 ust. 1 lit. f RODO — nasz prawnie uzasadniony interes',
              '2 lata od ostatniej wiadomości w sprawie',
            ],
            [
              'Bezpieczeństwo usługi i wykrywanie nadużyć',
              'adres IP, logi dostępu, identyfikator urządzenia',
              'art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes',
              '12 miesięcy',
            ],
            [
              'Dochodzenie i obrona roszczeń',
              'dane umowy i korespondencji',
              'art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes',
              'do upływu terminu przedawnienia roszczeń',
            ],
            [
              'Powiadomienie o uruchomieniu demo i otwarciu zapisów',
              'imię, adres e-mail',
              'art. 6 ust. 1 lit. b RODO — działania na Twoje żądanie przed zawarciem umowy',
              'do wysłania powiadomienia, nie dłużej niż 12 miesięcy od zapisu',
            ],
            [
              'Wiadomości o tym, co nowego w BusiKM',
              'imię, adres e-mail',
              'art. 6 ust. 1 lit. a RODO — Twoja zgoda, wraz z art. 10 ustawy o świadczeniu usług drogą elektroniczną',
              'do cofnięcia zgody',
            ],
            [
              'Statystyka odwiedzin strony',
              'zanonimizowany adres IP, źródło wejścia, zdarzenia na stronie',
              'art. 6 ust. 1 lit. a RODO — Twoja zgoda',
              'do cofnięcia zgody, nie dłużej niż 14 miesięcy',
            ],
          ],
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Czy podanie danych jest obowiązkowe',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Podanie danych jest dobrowolne, ale bez adresu e-mail i danych firmy nie założymy konta ani nie wystawimy faktury. Bez tych danych nie da się świadczyć usługi.',
        },
      ],
    },
    {
      numer: '4',
      tytul: 'Komu przekazujemy dane',
      bloki: [
        {
          typ: 'lista',
          wstep: 'Dane mogą trafić do:',
          punkty: [
'dostawców, którzy pomagają nam świadczyć usługę — Amazon Web Services (serwery, bazy, pliki), Amazon SES (poczta), Stripe (płatności), Mapbox (trasy), Google Cloud Vision (odczyt paragonów), Sentry (błędy) oraz Apple i Google (dostarczanie powiadomień). Pełną listę z zakresem przetwarzania prowadzimy w dokumencie Podprocesorzy;',
            'dostawców obsługujących formularze na stronie — Google Ireland (baza Firestore, w której zapisujemy wiadomość, region europejski) i Resend (dostarczenie powiadomienia na naszą skrzynkę, region irlandzki). Dotyczy to wyłącznie danych, które sam wpiszesz — w formularzu kontaktowym albo zapisując się na powiadomienie o uruchomieniu;',
            'biura rachunkowego i doradców, w zakresie niezbędnym do rozliczeń;',
            'organów publicznych, jeżeli obowiązek wynika z przepisów.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Z każdym dostawcą, który przetwarza dane w naszym imieniu, mamy zawartą umowę powierzenia. Nie sprzedajemy danych i nie udostępniamy ich do celów marketingowych osób trzecich.',
        },
      ],
    },
    {
      numer: '5',
      tytul: 'Czy dane wyjeżdżają poza Europę',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Serwery, bazy danych, pliki, kopie zapasowe, poczta i płatności działają w Europejskim Obszarze Gospodarczym. Wiadomości z formularza kontaktowego również: baza stoi w regionie europejskim, a powiadomienia wychodzą z serwerów w Irlandii.',
        },
        {
          typ: 'akapit',
          tresc:
            'Dwie rzeczy wymagają podmiotów spoza EOG: rozpoznawanie tekstu ze zdjęć paragonów oraz dostarczanie powiadomień do telefonu kierowcy, które zawsze przechodzi przez Apple albo Google. Transfer zabezpieczamy standardowymi klauzulami umownymi zatwierdzonymi przez Komisję Europejską, a usługę rozpoznawania ustawiamy na region europejski dostawcy. Szczegóły opisuje dokument Podprocesorzy.',
        },
      ],
    },
    {
      numer: '6',
      tytul: 'Twoje prawa',
      bloki: [
        {
          typ: 'lista',
          wstep: 'Masz prawo do:',
          punkty: [
            'dostępu do swoich danych i otrzymania ich kopii;',
            'sprostowania danych nieprawidłowych i uzupełnienia niekompletnych;',
            'usunięcia danych, jeżeli nie mamy podstawy do dalszego ich przetwarzania;',
            'ograniczenia przetwarzania;',
            'przeniesienia danych do innego administratora;',
            'sprzeciwu wobec przetwarzania opartego na naszym prawnie uzasadnionym interesie;',
            'cofnięcia zgody w każdej chwili — bez wpływu na zgodność z prawem tego, co zrobiliśmy przed cofnięciem.',
          ],
        },
        {
          typ: 'akapit',
          tresc: `Żeby skorzystać z któregokolwiek z tych praw, wystarczy napisać na ${firma.email}. Odpowiadamy w ciągu miesiąca; jeżeli sprawa jest złożona, uprzedzimy o dłuższym terminie.`,
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli uznasz, że przetwarzamy dane niezgodnie z prawem, możesz złożyć skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.',
        },
      ],
    },
    {
      numer: '7',
      tytul: 'Pliki cookie',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Pliki cookie to małe pliki zapisywane w Twojej przeglądarce. Używamy ich w dwóch celach.',
        },
        {
          typ: 'definicje',
          pozycje: [
            {
              termin: 'Niezbędne',
              opis:
                'utrzymują sesję po zalogowaniu, zapamiętują wybór planu i zabezpieczają formularze. Bez nich usługa nie działa, więc nie pytamy o zgodę. Wygasają wraz z sesją albo po 12 miesiącach.',
            },
            {
              termin: 'Analityczne',
              opis:
                'liczą odwiedziny i pokazują, które strony są czytane. Włączamy je dopiero po Twojej zgodzie i możesz ją cofnąć w każdej chwili. Wygasają po 14 miesiącach.',
            },
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Nie używamy plików cookie do reklamy ani do profilowania w celach marketingowych. Zgodę na analitykę wyrażasz w okienku, które pokazuje się przy pierwszej wizycie — a cofasz odnośnikiem „Ustawienia cookie" na dole każdej strony. Do czasu zgody licznik odwiedzin w ogóle się nie ładuje.',
        },
      ],
    },
    {
      numer: '8',
      tytul: 'Czy podejmujemy decyzje automatycznie',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na automatycznym przetwarzaniu, w tym profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały.',
        },
      ],
    },
    {
      numer: '9',
      tytul: 'Jak chronimy dane',
      bloki: [
        {
          typ: 'lista',
          wstep: 'Stosujemy środki adekwatne do ryzyka, w szczególności:',
          punkty: [
            'szyfrowanie połączeń (TLS) i szyfrowanie danych na dyskach;',
            'dostęp do danych produkcyjnych wyłącznie dla osób, które go potrzebują, z uwierzytelnianiem dwuskładnikowym;',
            'kopie zapasowe wykonywane codziennie i testowane pod kątem odtwarzania;',
            'rejestrowanie dostępu do danych i regularny przegląd uprawnień.',
          ],
        },
      ],
    },
    {
      numer: '10',
      tytul: 'Zmiany polityki',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'O istotnych zmianach informujemy mailem co najmniej 30 dni wcześniej. Data ostatniej zmiany jest widoczna na dole tej strony.',
        },
      ],
    },
  ],
};
