import { firma } from '@/content/firma';
import type { Tlumaczenia } from '@/i18n/jezyki';
import type { Dokument } from '@/content/dokumenty/typy';
import { dokumentyUslugi } from '@/content/dokumenty/uslugi';

/**
 * Polityka prywatności i plików cookie strony busikm.pl.
 *
 * Dotyczy wyłącznie strony: formularzy (Firestore, Resend), list zapisów,
 * statystyki, piksela Meta i plików cookie. Przetwarzanie w usłudze BusiKM
 * (konta, kierowcy, trasy, dokumenty, rozliczenia) opisują dokumenty usługi
 * w aplikacji (`content/dokumenty/uslugi.ts`). Tu tylko do nich odsyłamy,
 * zamiast powielać ich treść (AUD-RODO-02, BKM-2787).
 *
 * ⚠️ SZKIC DO PRZEGLĄDU PRAWNEGO. Zawiera komplet informacji wymaganych
 * art. 13 RODO (administrator, cele, podstawy prawne, odbiorcy, okresy
 * przechowywania, prawa, skarga do PUODO, profilowanie) oraz sekcję o cookie.
 * Tabela retencji i lista narzędzi muszą zostać potwierdzone z tym, co system
 * naprawdę robi – dziś opisują stan zakładany.
 */
const pl: Dokument = {
  href: '/prywatnosc',
  tytul: 'Polityka prywatności strony busikm.pl',
  obowiazujeOd: '1 września 2026',
  wersja: 6,
  ostatniaZmiana: '25 października 2026',
  wSkrocie: [
    'Ta polityka dotyczy wyłącznie strony busikm.pl. Dane w usłudze BusiKM (aplikacja webowa i mobilna) opisuje Polityka prywatności usługi BusiKM.',
    'Danych, które zostawiasz na stronie, nie sprzedajemy nikomu.',
    'Przez formularze zbieramy tylko to, co sam wpiszesz: zwykle imię, adres e-mail i treść wiadomości.',
    'Na stronie używamy plików cookie potrzebnych do jej działania. Analityczne i reklamowe (piksel Meta) włączamy dopiero za Twoją zgodą, osobno dla każdego celu.',
    'Zapisując się na listę, zgadzasz się na wiadomości o BusiKM. Zgodę wycofasz odnośnikiem w każdej z nich – zapisujemy jej treść i datę, żeby dało się wykazać, pod czym się podpisałeś.',
    'Masz prawo wglądu, poprawienia, usunięcia i przeniesienia swoich danych. Napisz, a zrobimy to.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Czego dotyczy polityka i kto jest administratorem',
      bloki: [
        {
          typ: 'akapit',
          tresc: `Ta polityka dotyczy wyłącznie strony busikm.pl: formularza kontaktowego, zapisów na listy wczesnego dostępu, statystyki odwiedzin, reklamy i plików cookie strony. Przetwarzanie danych w usłudze BusiKM (aplikacja webowa i mobilna), w tym danych kont, kierowców, tras i dokumentów, opisuje Polityka prywatności usługi BusiKM: ${dokumentyUslugi.prywatnosc}.`,
        },
        {
          typ: 'akapit',
          tresc: `Administratorem danych osobowych jest ${firma.nazwa} z siedzibą w Szczecinie, ${firma.ulica}, ${firma.miasto}, NIP ${firma.nip}, KRS ${firma.krs}.`,
        },
        {
          typ: 'akapit',
          tresc: `We wszystkich sprawach dotyczących danych osobowych piszcie na ${firma.email}. Nie wyznaczyliśmy inspektora ochrony danych – nie mamy takiego obowiązku.`,
        },
        {
          typ: 'akapit',
          tresc: `Dane, które klienci wprowadzają do usługi BusiKM, w tym dane ich kierowców i kontrahentów, przetwarzamy jako podmiot przetwarzający na zasadach Umowy powierzenia: ${dokumentyUslugi.powierzenie}. Dostawców usługi wymienia Rejestr podprocesorów (${dokumentyUslugi.podprocesorzy}), a okresy przechowywania danych w usłudze opisuje Polityka retencji (${dokumentyUslugi.retencja}).`,
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
              'Kontakt i obsługa zgłoszeń',
              'imię, adres e-mail, treść wiadomości',
              'art. 6 ust. 1 lit. f RODO – nasz prawnie uzasadniony interes',
              '2 lata od ostatniej wiadomości w sprawie',
            ],
            [
              'Dochodzenie i obrona roszczeń',
              'dane z formularzy i korespondencji',
              'art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes',
              'do upływu terminu przedawnienia roszczeń',
            ],
            [
              'Wiadomości o BusiKM, w tym o uruchomieniu demo i otwarciu zapisów',
              'imię, adres e-mail',
              'art. 6 ust. 1 lit. a RODO – Twoja zgoda, wraz z art. 398 Prawa komunikacji elektronicznej',
              'do cofnięcia zgody',
            ],
            [
              'Wykazanie, że zgoda została wyrażona',
              'treść i wersja zgody, kanał, data i godzina zaznaczenia',
              'art. 6 ust. 1 lit. c RODO – obowiązek rozliczalności z art. 7 ust. 1 RODO',
              'przez czas przetwarzania na podstawie zgody i okres przedawnienia roszczeń',
            ],
            [
              'Statystyka odwiedzin strony',
              'zanonimizowany adres IP, źródło wejścia, zdarzenia na stronie',
              'art. 6 ust. 1 lit. a RODO – Twoja zgoda',
              'do cofnięcia zgody, nie dłużej niż 14 miesięcy',
            ],
            [
              'Pomiar i kierowanie reklam BusiKM na Facebooku i Instagramie (piksel Meta)',
              'identyfikator przeglądarki zapisany w pliku _fbp, adres IP, dane o przeglądarce i urządzeniu, odwiedzone strony, zdarzenia na stronie (zapis na listę, wysłanie formularza kontaktowego)',
              'art. 6 ust. 1 lit. a RODO - Twoja zgoda, wraz z art. 399 Prawa komunikacji elektronicznej',
              'do cofnięcia zgody; plik _fbp wygasa po 90 dniach, a grupy odbiorców reklam przechowujemy nie dłużej niż 180 dni',
            ],
          ],
          stopka: `Cele, podstawy prawne i okresy przechowywania danych w usłudze BusiKM (konto, rozliczenia, trasy, dokumenty, bezpieczeństwo usługi) opisują Polityka prywatności usługi BusiKM (${dokumentyUslugi.prywatnosc}) i Polityka retencji (${dokumentyUslugi.retencja}).`,
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
            'Podanie danych w formularzach na stronie jest dobrowolne. Bez adresu e-mail nie odpowiemy na wiadomość ani nie zapiszemy Cię na listę wczesnego dostępu, a na listę zapisujemy tylko ze zgodą na wiadomości o BusiKM.',
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
            'dostawców obsługujących formularze na stronie – Google Ireland (baza Firestore, w której zapisujemy wiadomość, region europejski) i Resend (dostarczenie powiadomienia na naszą skrzynkę, region irlandzki). Dotyczy to wyłącznie danych, które sam wpiszesz – w formularzu kontaktowym albo zapisując się na powiadomienie o uruchomieniu;',
            'Meta Platforms Ireland Limited (Merrion Road, Dublin 4, Irlandia) - wyłącznie jeżeli zgodzisz się na reklamę. W zakresie zbierania danych pikselem i przekazania ich do Mety jesteśmy z Metą współadministratorami; dalej Meta przetwarza dane jako odrębny administrator, na zasadach swojej polityki prywatności (facebook.com/privacy/policy);',
            'biura rachunkowego i doradców, w zakresie niezbędnym do rozliczeń;',
            'organów publicznych, jeżeli obowiązek wynika z przepisów.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Z każdym dostawcą, który przetwarza dane w naszym imieniu, mamy zawartą umowę powierzenia. Nie sprzedajemy danych. Do Mety trafiają tylko dane z piksela i tylko po Twojej zgodzie na reklamę.',
        },
        {
          typ: 'akapit',
          tresc: `Dostawców, z których korzysta usługa BusiKM (aplikacja webowa i mobilna), wymienia Rejestr podprocesorów: ${dokumentyUslugi.podprocesorzy}.`,
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
            'Wiadomości z formularza kontaktowego zapisujemy w bazie w regionie europejskim, a powiadomienia o nich wychodzą z serwerów w Irlandii.',
        },
        {
          typ: 'akapit',
          tresc: `Przekazywanie danych poza Europejski Obszar Gospodarczy w ramach usługi BusiKM, na przykład przy odczycie paragonów i powiadomieniach w telefonie kierowcy, opisują Polityka prywatności usługi BusiKM (${dokumentyUslugi.prywatnosc}) i Rejestr podprocesorów (${dokumentyUslugi.podprocesorzy}).`,
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli zgodzisz się na reklamę, dane z piksela Meta mogą trafić do Meta Platforms, Inc. w Stanach Zjednoczonych. Transfer opiera się na decyzji Komisji Europejskiej w sprawie Ram ochrony danych UE-USA (EU-US Data Privacy Framework), w których Meta uczestniczy, a uzupełniająco na standardowych klauzulach umownych.',
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
            'cofnięcia zgody w każdej chwili – bez wpływu na zgodność z prawem tego, co zrobiliśmy przed cofnięciem.',
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
            'Pliki cookie to małe pliki zapisywane w Twojej przeglądarce. Używamy ich w trzech celach.',
        },
        {
          typ: 'definicje',
          pozycje: [
            {
              termin: 'Niezbędne',
              opis:
                'zapamiętują wybraną wersję językową strony (plik „jezyk", opisany niżej) i Twoje decyzje w okienku zgód, które zapisujemy w pamięci przeglądarki. Bez nich strona nie zapamięta Twoich wyborów, więc nie pytamy o zgodę.',
            },
            {
              termin: 'Analityczne',
              opis:
                'liczą odwiedziny i pokazują, które strony są czytane. Włączamy je dopiero po Twojej zgodzie i możesz ją cofnąć w każdej chwili. Wygasają po 14 miesiącach.',
            },
            {
              termin: 'Reklamowe',
              opis:
                'plik _fbp piksela Meta. Pozwala sprawdzić, czy reklama BusiKM na Facebooku lub Instagramie przyprowadziła kogoś na stronę, i pokazać reklamy osobom, które już nas odwiedziły. Włączamy go dopiero po Twojej osobnej zgodzie na reklamę i możesz ją cofnąć w każdej chwili. Wygasa po 90 dniach.',
            },
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Do niezbędnych należy też plik „jezyk". Zapamiętuje wersję językową strony – polską albo angielską – którą wybierzesz przełącznikiem EN/PL, żeby przy kolejnej wizycie strona otworzyła się w tym samym języku. Zapisujemy go dopiero wtedy, gdy sam wybierzesz język; wygasa po roku. Nie pytamy o zgodę, bo służy wyłącznie do dostarczenia funkcji, o którą prosisz (art. 399 ust. 3 Prawa komunikacji elektronicznej).',
        },
        {
          typ: 'akapit',
          tresc:
            'Zgodę na analitykę i na reklamę wyrażasz osobno w okienku, które pokazuje się przy pierwszej wizycie, a cofasz odnośnikiem „Ustawienia cookie" na dole każdej strony. Do czasu zgody ani licznik odwiedzin, ani piksel Meta w ogóle się nie ładują. Piksel nie zbiera automatycznie kliknięć ani treści strony: wysyłamy tylko odsłony stron oraz informację, że ktoś zapisał się na listę albo wysłał formularz, bez Twojego imienia i adresu e-mail.',
        },
        {
          typ: 'akapit',
          tresc: `Strona busikm.pl nie ma logowania ani sesji użytkownika. Konto i logowanie działają w aplikacji pod adresem app.busikm.pl i podlegają Polityce prywatności usługi BusiKM: ${dokumentyUslugi.prywatnosc}.`,
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
          wstep: 'Dane zebrane przez stronę chronimy środkami adekwatnymi do ryzyka, w szczególności:',
          punkty: [
            'szyfrowanie połączeń (TLS) i szyfrowanie danych na dyskach;',
            'dostęp do danych produkcyjnych wyłącznie dla osób, które go potrzebują, z uwierzytelnianiem dwuskładnikowym.',
          ],
        },
        {
          typ: 'akapit',
          tresc: `Zabezpieczenia danych w usłudze BusiKM, w tym kopie zapasowe i rejestrowanie dostępu, opisuje Umowa powierzenia: ${dokumentyUslugi.powierzenie}.`,
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

/**
 * Tłumaczenie angielskie – dla wygody czytelnika. Wiążąca jest wersja polska;
 * strona mówi o tym wprost nad treścią.
 */
const en: Dokument = {
  href: '/prywatnosc',
  tytul: 'busikm.pl Website Privacy Policy',
  obowiazujeOd: '1 September 2026',
  wersja: 6,
  ostatniaZmiana: '25 October 2026',
  wSkrocie: [
    'This policy covers only the busikm.pl website. Data in the BusiKM service (web and mobile app) is covered by the BusiKM Service Privacy Policy.',
    'We never sell the data you leave on the website to anyone.',
    'Through the forms we collect only what you enter yourself: usually your first name, e-mail address and message.',
    'On the website we use the cookies it needs to work. We switch on analytics and advertising cookies (the Meta pixel) only with your consent, separately for each purpose.',
    'By joining the list, you agree to receive messages about BusiKM. You can withdraw consent using the link in any of them – we record its wording and date so that we can show what you agreed to.',
    'You have the right to access, correct, erase and port your data. Write to us and we will do it.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'What this policy covers and who the controller is',
      bloki: [
        {
          typ: 'akapit',
          tresc: `This policy covers only the busikm.pl website: the contact form, early access list sign-ups, visit statistics, advertising and the website's cookies. Data processing in the BusiKM service (web and mobile app), including account, driver, route and document data, is described in the BusiKM Service Privacy Policy (in Polish): ${dokumentyUslugi.prywatnosc}.`,
        },
        {
          typ: 'akapit',
          tresc: `The controller of personal data is ${firma.nazwa}, with its registered office in Szczecin, ${firma.ulica}, ${firma.miasto}, Poland, tax identification number (NIP) ${firma.nip}, National Court Register (KRS) number ${firma.krs}.`,
        },
        {
          typ: 'akapit',
          tresc: `For all matters concerning personal data, write to ${firma.email}. We have not appointed a data protection officer – we are not required to do so.`,
        },
        {
          typ: 'akapit',
          tresc: `Data that clients enter into the BusiKM service, including data of their drivers and business partners, is processed by us as a processor under the Data Processing Agreement: ${dokumentyUslugi.powierzenie}. The service's providers are listed in the Subprocessor Register (${dokumentyUslugi.podprocesorzy}), and retention periods in the service are set out in the Retention Policy (${dokumentyUslugi.retencja}).`,
        },
      ],
    },
    {
      numer: '2',
      tytul: 'Purposes and legal bases',
      bloki: [
        {
          typ: 'tabela',
          naglowki: ['Purpose', 'Categories of data', 'Legal basis', 'Retention period'],
          wiersze: [
            [
              'Contact and handling of enquiries',
              'first name, e-mail address, content of the message',
              'Art. 6(1)(f) of the General Data Protection Regulation (GDPR) - our legitimate interest',
              '2 years from the last message in the matter',
            ],
            [
              'Establishment and defence of legal claims',
              'data from forms and correspondence',
              'Art. 6(1)(f) GDPR – legitimate interest',
              'until the limitation period for claims expires',
            ],
            [
              'Messages about BusiKM, including the launch of the demo and the opening of sign-ups',
              'first name, e-mail address',
              'Art. 6(1)(a) GDPR – your consent, together with Art. 398 of the Electronic Communications Law (Prawo komunikacji elektronicznej, PKE)',
              'until consent is withdrawn',
            ],
            [
              'Demonstrating that consent was given',
              'wording and version of the consent, channel, date and time it was ticked',
              'Art. 6(1)(c) GDPR – the accountability obligation under Art. 7(1) GDPR',
              'for the period of processing based on consent and the limitation period for claims',
            ],
            [
              'Website visit statistics',
              'anonymised IP address, traffic source, events on the website',
              'Art. 6(1)(a) GDPR – your consent',
              'until consent is withdrawn, no longer than 14 months',
            ],
            [
              'Measuring and targeting BusiKM ads on Facebook and Instagram (Meta pixel)',
              'browser identifier stored in the _fbp cookie, IP address, browser and device data, pages visited, events on the website (joining the list, sending the contact form)',
              'Art. 6(1)(a) GDPR - your consent, together with Art. 399 of the Electronic Communications Law',
              'until consent is withdrawn; the _fbp cookie expires after 90 days, and we keep ad audiences for no longer than 180 days',
            ],
          ],
          stopka: `The purposes, legal bases and retention periods for data in the BusiKM service (account, billing, routes, documents, service security) are set out in the BusiKM Service Privacy Policy (${dokumentyUslugi.prywatnosc}) and the Retention Policy (${dokumentyUslugi.retencja}).`,
        },
      ],
    },
    {
      numer: '3',
      tytul: 'Is providing data mandatory',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Providing data in the website forms is voluntary. Without an e-mail address we cannot reply to your message or add you to the early access list, and we add people to the list only with their consent to messages about BusiKM.',
        },
      ],
    },
    {
      numer: '4',
      tytul: 'Who we share data with',
      bloki: [
        {
          typ: 'lista',
          wstep: 'Data may be disclosed to:',
          punkty: [
            'providers operating the forms on the website – Google Ireland (the Firestore database in which we store the message, European region) and Resend (delivering the notification to our mailbox, Irish region). This applies only to data that you enter yourself – in the contact form or when signing up to be notified of the launch;',
            'Meta Platforms Ireland Limited (Merrion Road, Dublin 4, Ireland) - only if you consent to advertising. We and Meta are joint controllers for collecting data with the pixel and transmitting it to Meta; after that, Meta processes the data as a separate controller under its own privacy policy (facebook.com/privacy/policy);',
            'our accounting office and advisers, to the extent necessary for billing and accounting;',
            'public authorities, where required by law.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'We have a data processing agreement in place with every provider that processes data on our behalf. We do not sell data. Only pixel data goes to Meta, and only after you consent to advertising.',
        },
        {
          typ: 'akapit',
          tresc: `The providers used by the BusiKM service (web and mobile app) are listed in the Subprocessor Register: ${dokumentyUslugi.podprocesorzy}.`,
        },
      ],
    },
    {
      numer: '5',
      tytul: 'Is data transferred outside Europe',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We store messages from the contact form in a database in a European region, and notifications about them are sent from servers in Ireland.',
        },
        {
          typ: 'akapit',
          tresc: `Transfers of data outside the European Economic Area within the BusiKM service, for example when reading receipts and sending notifications to the driver's phone, are described in the BusiKM Service Privacy Policy (${dokumentyUslugi.prywatnosc}) and the Subprocessor Register (${dokumentyUslugi.podprocesorzy}).`,
        },
        {
          typ: 'akapit',
          tresc:
            'If you consent to advertising, data from the Meta pixel may be transferred to Meta Platforms, Inc. in the United States. The transfer relies on the European Commission decision on the EU-US Data Privacy Framework, in which Meta participates, and additionally on standard contractual clauses.',
        },
      ],
    },
    {
      numer: '6',
      tytul: 'Your rights',
      bloki: [
        {
          typ: 'lista',
          wstep: 'You have the right to:',
          punkty: [
            'access your data and obtain a copy of it;',
            'rectify inaccurate data and complete incomplete data;',
            'erasure of your data where we have no basis for further processing;',
            'restriction of processing;',
            'port your data to another controller;',
            'object to processing based on our legitimate interest;',
            'withdraw consent at any time – without affecting the lawfulness of what we did before the withdrawal.',
          ],
        },
        {
          typ: 'akapit',
          tresc: `To exercise any of these rights, simply write to ${firma.email}. We respond within one month; if the matter is complex, we will let you know in advance that it will take longer.`,
        },
        {
          typ: 'akapit',
          tresc:
            'If you believe that we process data unlawfully, you may lodge a complaint with the President of the Personal Data Protection Office (Prezes Urzędu Ochrony Danych Osobowych, PUODO), ul. Stawki 2, 00-193 Warsaw, Poland.',
        },
      ],
    },
    {
      numer: '7',
      tytul: 'Cookies',
      bloki: [
        {
          typ: 'akapit',
          tresc: 'Cookies are small files stored in your browser. We use them for three purposes.',
        },
        {
          typ: 'definicje',
          pozycje: [
            {
              termin: 'Strictly necessary',
              opis: 'they remember the language version of the website (the "jezyk" cookie, described below) and your choices in the consent window, which we store in your browser’s local storage. Without them the website cannot remember your choices, so we do not ask for consent.',
            },
            {
              termin: 'Analytics',
              opis: 'they count visits and show which pages are read. We switch them on only after you consent, and you can withdraw consent at any time. They expire after 14 months.',
            },
            {
              termin: 'Advertising',
              opis: 'the _fbp cookie of the Meta pixel. It lets us check whether a BusiKM ad on Facebook or Instagram brought someone to the website, and show ads to people who have already visited us. We switch it on only after your separate consent to advertising, and you can withdraw consent at any time. It expires after 90 days.',
            },
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'The strictly necessary cookies also include the “jezyk” cookie. It remembers the language version of the website – Polish or English – that you choose with the EN/PL switch, so that the website opens in the same language on your next visit. We set it only when you choose a language yourself; it expires after one year. We do not ask for consent because it serves solely to provide a function you have requested (Art. 399(3) of the Electronic Communications Law).',
        },
        {
          typ: 'akapit',
          tresc:
            'You give consent to analytics and to advertising separately in the window that appears on your first visit, and withdraw it using the “Cookie settings” link at the bottom of every page. Until you consent, neither the visit counter nor the Meta pixel is loaded at all. The pixel does not automatically collect clicks or page content: we send only page views and the fact that someone joined the list or sent the form, without your name or e-mail address.',
        },
        {
          typ: 'akapit',
          tresc: `The busikm.pl website has no sign-in or user session. Accounts and sign-in live in the app at app.busikm.pl and are covered by the BusiKM Service Privacy Policy: ${dokumentyUslugi.prywatnosc}.`,
        },
      ],
    },
    {
      numer: '8',
      tytul: 'Do we make automated decisions',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We do not make decisions about you based solely on automated processing, including profiling, which produce legal effects concerning you or similarly significantly affect you.',
        },
      ],
    },
    {
      numer: '9',
      tytul: 'How we protect data',
      bloki: [
        {
          typ: 'lista',
          wstep: 'We protect data collected by the website with measures appropriate to the risk, in particular:',
          punkty: [
            'encryption of connections (TLS) and encryption of data on disk;',
            'access to production data only for those who need it, with two-factor authentication.',
          ],
        },
        {
          typ: 'akapit',
          tresc: `The safeguards for data in the BusiKM service, including backups and access logging, are set out in the Data Processing Agreement: ${dokumentyUslugi.powierzenie}.`,
        },
      ],
    },
    {
      numer: '10',
      tytul: 'Changes to this policy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We notify you of material changes by e-mail at least 30 days in advance. The date of the last change is shown at the bottom of this page.',
        },
      ],
    },
  ],
};

export const prywatnosc: Tlumaczenia<Dokument> = { pl, en };
