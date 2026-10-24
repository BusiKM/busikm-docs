import { firma } from '@/content/firma';
import type { Tlumaczenia } from '@/i18n/jezyki';
import type { Dokument } from '@/content/dokumenty/typy';

/**
 * Polityka prywatności i plików cookie.
 *
 * ⚠️ SZKIC DO PRZEGLĄDU PRAWNEGO. Zawiera komplet informacji wymaganych
 * art. 13 RODO (administrator, cele, podstawy prawne, odbiorcy, okresy
 * przechowywania, prawa, skarga do PUODO, profilowanie) oraz sekcję o cookie.
 * Tabela retencji i lista narzędzi muszą zostać potwierdzone z tym, co system
 * naprawdę robi – dziś opisują stan zakładany.
 */
const pl: Dokument = {
  href: '/prywatnosc',
  tytul: 'Polityka prywatności',
  obowiazujeOd: '1 września 2026',
  wersja: 5,
  ostatniaZmiana: '17 października 2026',
  wSkrocie: [
    'Twoje dane trzymamy w Europie i nie sprzedajemy ich nikomu.',
    'Zbieramy tylko to, co potrzebne do działania usługi i do wystawienia faktury.',
    'Na stronie używamy plików cookie potrzebnych do jej działania. Analityczne i reklamowe (piksel Meta) włączamy dopiero za Twoją zgodą, osobno dla każdego celu.',
    'Zapisując się na listę, zgadzasz się na wiadomości o BusiKM. Zgodę wycofasz odnośnikiem w każdej z nich – zapisujemy jej treść i datę, żeby dało się wykazać, pod czym się podpisałeś.',
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
          tresc: `We wszystkich sprawach dotyczących danych osobowych piszcie na ${firma.email}. Nie wyznaczyliśmy inspektora ochrony danych – nie mamy takiego obowiązku.`,
        },
        {
          typ: 'akapit',
          tresc:
            'Ta polityka dotyczy danych, których jesteśmy administratorem: danych osób kontaktujących się z nami, osób zakładających konto i odwiedzających stronę. Dane, które nasi klienci wprowadzają do swoich kont – w tym dane ich kierowców i kontrahentów – przetwarzamy jako podmiot przetwarzający, na zasadach opisanych w dokumencie Powierzenie danych.',
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
              'art. 6 ust. 1 lit. b RODO – wykonanie umowy',
              'przez czas trwania umowy i 30 dni po jej zakończeniu',
            ],
            [
              'Rozliczenia i księgowość',
              'dane firmy, NIP, historia płatności, faktury',
              'art. 6 ust. 1 lit. c RODO – obowiązek prawny',
              '5 lat od końca roku, w którym upłynął termin płatności podatku',
            ],
            [
              'Kontakt i obsługa zgłoszeń',
              'imię, adres e-mail, treść wiadomości',
              'art. 6 ust. 1 lit. f RODO – nasz prawnie uzasadniony interes',
              '2 lata od ostatniej wiadomości w sprawie',
            ],
            [
              'Bezpieczeństwo usługi i wykrywanie nadużyć',
              'adres IP, logi dostępu, identyfikator urządzenia',
              'art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes',
              '12 miesięcy',
            ],
            [
              'Dochodzenie i obrona roszczeń',
              'dane umowy i korespondencji',
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
'dostawców, którzy pomagają nam świadczyć usługę – Amazon Web Services (serwery, bazy, pliki), Amazon SES (poczta), Stripe (płatności), Mapbox (trasy), Google Cloud Vision (odczyt paragonów), Sentry (błędy) oraz Apple i Google (dostarczanie powiadomień). Pełną listę z zakresem przetwarzania prowadzimy w dokumencie Podprocesorzy;',
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
                'utrzymują sesję po zalogowaniu, zapamiętują wybór planu i zabezpieczają formularze. Bez nich usługa nie działa, więc nie pytamy o zgodę. Wygasają wraz z sesją albo po 12 miesiącach.',
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

/**
 * Tłumaczenie angielskie – dla wygody czytelnika. Wiążąca jest wersja polska;
 * strona mówi o tym wprost nad treścią.
 */
const en: Dokument = {
  href: '/prywatnosc',
  tytul: 'Privacy Policy',
  obowiazujeOd: '1 September 2026',
  wersja: 5,
  ostatniaZmiana: '17 October 2026',
  wSkrocie: [
    'We keep your data in Europe and never sell it to anyone.',
    'We collect only what the service needs to work and what we need to issue an invoice.',
    'On the website we use the cookies it needs to work. We switch on analytics and advertising cookies (the Meta pixel) only with your consent, separately for each purpose.',
    'By joining the list, you agree to receive messages about BusiKM. You can withdraw consent using the link in any of them – we record its wording and date so that we can show what you agreed to.',
    'You have the right to access, correct, erase and port your data. Write to us and we will do it.',
  ],
  paragrafy: [
    {
      numer: '1',
      tytul: 'Who the controller is',
      bloki: [
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
          tresc:
            'This policy covers data for which we are the controller: data of people who contact us, people who create an account and visitors to the website. Data that our clients enter into their accounts – including data of their drivers and business partners – is processed by us as a processor, under the terms described in the Data Processing Agreement document.',
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
              'Maintaining the account and providing the service',
              'first name, surname, e-mail, company name and details, role in the account',
              'Art. 6(1)(b) of the General Data Protection Regulation (GDPR) – performance of a contract',
              'for the term of the agreement and 30 days after it ends',
            ],
            [
              'Billing and accounting',
              'company details, tax identification number (NIP), payment history, invoices',
              'Art. 6(1)(c) GDPR – legal obligation',
              '5 years from the end of the year in which the tax payment deadline expired',
            ],
            [
              'Contact and handling of enquiries',
              'first name, e-mail address, content of the message',
              'Art. 6(1)(f) GDPR – our legitimate interest',
              '2 years from the last message in the matter',
            ],
            [
              'Security of the service and detection of abuse',
              'IP address, access logs, device identifier',
              'Art. 6(1)(f) GDPR – legitimate interest',
              '12 months',
            ],
            [
              'Establishment and defence of legal claims',
              'details of the agreement and correspondence',
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
            'Providing data is voluntary, but without an e-mail address and company details we cannot create an account or issue an invoice. Without this data, the service cannot be provided.',
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
            'providers who help us deliver the service – Amazon Web Services (servers, databases, files), Amazon SES (e-mail), Stripe (payments), Mapbox (routes), Google Cloud Vision (reading receipts), Sentry (errors) and Apple and Google (delivering notifications). We keep the full list, with the scope of processing, in the Subprocessors document;',
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
      ],
    },
    {
      numer: '5',
      tytul: 'Is data transferred outside Europe',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Servers, databases, files, backups, e-mail and payments operate within the European Economic Area. Messages from the contact form do too: the database is located in a European region, and notifications are sent from servers in Ireland.',
        },
        {
          typ: 'akapit',
          tresc:
            'Two things require entities outside the EEA: recognising text in photos of receipts, and delivering notifications to the driver’s phone, which always goes through Apple or Google. We safeguard the transfer with standard contractual clauses approved by the European Commission, and we set the recognition service to the provider’s European region. Details are set out in the Subprocessors document.',
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
              opis: 'they keep you signed in, remember your choice of plan and secure the forms. The service does not work without them, so we do not ask for consent. They expire at the end of the session or after 12 months.',
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
          wstep: 'We apply measures appropriate to the risk, in particular:',
          punkty: [
            'encryption of connections (TLS) and encryption of data on disk;',
            'access to production data only for those who need it, with two-factor authentication;',
            'backups made daily and tested for restorability;',
            'logging of access to data and regular review of permissions.',
          ],
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
