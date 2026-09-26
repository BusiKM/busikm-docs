import { firma } from '@/content/firma';
import type { Tlumaczenia } from '@/i18n/jezyki';
import type { Dokument } from '@/content/dokumenty/typy';

/**
 * Regulamin świadczenia usługi BusiKM.
 *
 * ⚠️ SZKIC DO PRZEGLĄDU PRAWNEGO. Treść oparta na standardzie polskich usług
 * SaaS B2B i na wymogach ustawy o świadczeniu usług drogą elektroniczną
 * (art. 8 ust. 3 — obowiązkowe elementy regulaminu). Przed publikacją musi to
 * przeczytać prawnik: opisane zasady odpowiedzialności, SLA i rozliczeń mają
 * odpowiadać temu, co produkt naprawdę robi.
 */
const pl: Dokument = {
  href: '/regulamin',
  tytul: 'Regulamin',
  obowiazujeOd: '1 września 2026',
  wersja: 1,
  ostatniaZmiana: '1 września 2026',
  wSkrocie: [
    'Płacisz za pojazdy, nie za ludzi. Kierowcy i pracownicy biura bez limitu.',
    'Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem, bez okresu wypowiedzenia.',
    'Dane są Twoje. Pobierzesz je zawsze, także po rezygnacji.',
    'Usługa jest dla firm. Trzymamy dane w Europie i nie sprzedajemy ich nikomu.',
  ],
  paragrafy: [
    {
      numer: '§ 1',
      tytul: 'Kto świadczy usługę',
      bloki: [
        {
          typ: 'akapit',
          tresc: `Usługę świadczy ${firma.nazwa} z siedzibą w Szczecinie, ${firma.ulica}, ${firma.miasto}, NIP ${firma.nip}, REGON ${firma.regon}, KRS ${firma.krs}.`,
        },
        {
          typ: 'akapit',
          tresc: `Kontakt we wszystkich sprawach, w tym reklamacyjnych: ${firma.email}. Odpowiadamy w dni robocze.`,
        },
        {
          typ: 'akapit',
          tresc:
            'Regulamin określa zasady korzystania z usługi BusiKM i jest regulaminem w rozumieniu ustawy o świadczeniu usług drogą elektroniczną. Udostępniamy go nieodpłatnie przed zawarciem umowy, w formie umożliwiającej pobranie i zapisanie.',
        },
      ],
    },
    {
      numer: '§ 2',
      tytul: 'Definicje',
      bloki: [
        {
          typ: 'definicje',
          wstep: 'Pojęcia użyte w Regulaminie mają następujące znaczenie:',
          pozycje: [
            { termin: 'Usługodawca', opis: `${firma.nazwa}, o której mowa w § 1.` },
            {
              termin: 'Usługa',
              opis:
                'dostęp do aplikacji BusiKM w przeglądarce oraz do aplikacji mobilnej BusiKM Kierowca, w zakresie wynikającym z wybranego Planu.',
            },
            {
              termin: 'Klient',
              opis:
                'przedsiębiorca, który założył Konto i korzysta z Usługi w związku z prowadzoną działalnością gospodarczą.',
            },
            {
              termin: 'Konto',
              opis:
                'wydzielona przestrzeń Klienta w Usłudze, obejmująca jego dane, pojazdy, zlecenia i dokumenty.',
            },
            {
              termin: 'Użytkownik',
              opis:
                'osoba, której Klient nadał dostęp do Konta w jednej z ról: właściciel, dyspozytor, księgowa albo kierowca.',
            },
            {
              termin: 'Pojazd',
              opis:
                'pojazd silnikowy wprowadzony do Konta. Przyczepy i naczepy nie są Pojazdami w rozumieniu Regulaminu i nie wpływają na wysokość opłaty.',
            },
            {
              termin: 'Plan',
              opis:
                'wariant Usługi wskazany w Cenniku, określający limit Pojazdów i zakres funkcji.',
            },
            {
              termin: 'Okres próbny',
              opis: 'pierwsze 14 dni od założenia Konta, w których Usługa jest bezpłatna.',
            },
            {
              termin: 'Okres rozliczeniowy',
              opis: 'miesiąc albo rok, zależnie od wyboru Klienta przy zakupie Planu.',
            },
          ],
        },
      ],
    },
    {
      numer: '§ 3',
      tytul: 'Dla kogo jest usługa',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Usługa jest przeznaczona dla przedsiębiorców i nie jest kierowana do konsumentów. Zakładając Konto, Klient oświadcza, że zawiera umowę bezpośrednio związaną z prowadzoną działalnością gospodarczą.',
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli Klient jest osobą fizyczną prowadzącą działalność gospodarczą, a umowa nie ma dla niej charakteru zawodowego, stosuje się do niej przepisy o ochronie konsumentów w zakresie wskazanym w ustawie o prawach konsumenta — w szczególności prawo odstąpienia od umowy w terminie 14 dni.',
        },
      ],
    },
    {
      numer: '§ 4',
      tytul: 'Zakres usługi i warunki techniczne',
      bloki: [
        {
          typ: 'lista',
          wstep: 'W ramach Usługi, w zakresie wynikającym z wybranego Planu, Klient może:',
          punkty: [
            'prowadzić zlecenia transportowe oraz wystawiać i wysyłać faktury, w tym do systemu e-faktur;',
            'rejestrować trasy, koszty i czas pracy przez aplikację BusiKM Kierowca;',
            'prowadzić ewidencję pojazdów, dokumentów i terminów ich ważności;',
            'przygotowywać zestawienia dla księgowości w formatach wskazanych w Cenniku.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Zestawienia księgowe generowane są za wybrany miesiąc kalendarzowy. Po zamknięciu miesiąca dane za ten okres nie podlegają zmianie.',
        },
        {
          typ: 'akapit',
          tresc:
            'Funkcje wspierające pracę kierowcy, w tym liczniki czasu jazdy i przerw, mają charakter pomocniczy. Nie zastępują tachografu ani innych urządzeń i dokumentów wymaganych przepisami, a Klient pozostaje odpowiedzialny za wypełnianie obowiązków przewoźnika.',
        },
        {
          typ: 'lista',
          wstep: 'Do korzystania z Usługi potrzebne są:',
          punkty: [
            'urządzenie z dostępem do internetu i aktualną przeglądarką (Chrome, Safari, Firefox lub Edge w wersji nie starszej niż dwa lata wstecz);',
            'w przypadku aplikacji mobilnej — telefon z systemem iOS 15 lub Android 10 albo nowszym;',
            'aktywny adres e-mail;',
            'włączona obsługa plików cookie i JavaScript.',
          ],
        },
      ],
    },
    {
      numer: '§ 5',
      tytul: 'Zawarcie umowy, konto i użytkownicy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Umowa zostaje zawarta z chwilą założenia Konta, czyli wypełnienia formularza rejestracji i potwierdzenia akceptacji Regulaminu. Potwierdzenie zawarcia umowy wysyłamy na adres e-mail podany przy rejestracji.',
        },
        {
          typ: 'akapit',
          tresc:
            'Klient nadaje i odbiera dostęp Użytkownikom oraz określa ich role. Liczba Użytkowników jest nieograniczona i nie wpływa na wysokość opłaty. Klient odpowiada za działania Użytkowników jak za własne.',
        },
        {
          typ: 'lista',
          wstep: 'Klient zobowiązuje się nie:',
          punkty: [
            'udostępniać danych logowania osobom spoza swojej organizacji;',
            'wprowadzać do Usługi treści bezprawnych ani danych, do których nie ma tytułu prawnego;',
            'podejmować działań zagrażających stabilności lub bezpieczeństwu Usługi, w tym testów obciążeniowych i prób obejścia zabezpieczeń;',
            'zwielokrotniać, dekompilować ani odsprzedawać Usługi bez naszej zgody.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'W razie istotnego naruszenia powyższych zasad możemy zawiesić dostęp do Konta po uprzednim wezwaniu Klienta do zaprzestania naruszenia i wyznaczeniu terminu nie krótszego niż 7 dni. Jeżeli naruszenie zagraża bezpieczeństwu danych innych klientów, zawieszenie może nastąpić natychmiast, z jednoczesnym powiadomieniem Klienta.',
        },
      ],
    },
    {
      numer: '§ 6',
      tytul: 'Opłaty i rozliczenia',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Przez pierwsze 14 dni Usługa jest bezpłatna. Po tym okresie Klient wybiera Plan i płaci z góry za wybrany Okres rozliczeniowy. Jeżeli Klient nie wybierze Planu, Konto przechodzi w tryb tylko do odczytu — dane pozostają dostępne do pobrania.',
        },
        {
          typ: 'akapit',
          tresc:
            'Wysokość opłat określa Cennik dostępny na stronie Usługi. Opłata zależy od liczby Pojazdów w Koncie. Ceny podawane są w złotych, w kwotach netto; do opłaty doliczany jest podatek VAT według obowiązującej stawki.',
        },
        {
          typ: 'akapit',
          tresc:
            'Fakturę wystawiamy automatycznie za każdy Okres rozliczeniowy i wysyłamy na adres e-mail Klienta. Klient wyraża zgodę na otrzymywanie faktur w formie elektronicznej.',
        },
        {
          typ: 'akapit',
          tresc:
            'Zmiana Planu jest możliwa w obie strony w każdej chwili. Różnicę rozliczamy proporcjonalnie do liczby dni pozostałych do końca Okresu rozliczeniowego. Zwiększenie liczby Pojazdów ponad limit Planu powoduje naliczenie dopłaty zgodnie z Cennikiem od kolejnego Okresu rozliczeniowego.',
        },
        {
          typ: 'akapit',
          tresc:
            'W razie opóźnienia w płatności wzywamy Klienta do zapłaty mailem. Jeżeli opóźnienie przekroczy 14 dni od wezwania, możemy przełączyć Konto w tryb tylko do odczytu do czasu uregulowania należności. Dane Klienta pozostają wtedy dostępne do pobrania.',
        },
      ],
    },
    {
      numer: '§ 7',
      tytul: 'Dostępność usługi',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Dokładamy starań, aby Usługa była dostępna nieprzerwanie. Planowane prace serwisowe zapowiadamy z co najmniej 24-godzinnym wyprzedzeniem i prowadzimy je w miarę możliwości poza godzinami 6:00–20:00 w dni robocze.',
        },
        {
          typ: 'akapit',
          tresc:
            'Aktualny stan Usługi oraz historię przerw publikujemy na stronie /status. O przerwie trwającej dłużej niż godzinę informujemy Klientów mailem.',
        },
        {
          typ: 'akapit',
          tresc:
            'Aplikacja BusiKM Kierowca działa bez dostępu do sieci: dane zapisują się w telefonie i są dosyłane po powrocie połączenia. Przerwa w działaniu części serwerowej nie przerywa rejestrowania trasy ani czasu pracy.',
        },
      ],
    },
    {
      numer: '§ 8',
      tytul: 'Dane Klienta i własność',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Dane wprowadzone do Konta pozostają własnością Klienta. Nie wykorzystujemy ich do własnych celów handlowych, nie udostępniamy osobom trzecim poza przypadkami opisanymi w Polityce prywatności i w umowie powierzenia oraz nie sprzedajemy ich.',
        },
        {
          typ: 'akapit',
          tresc:
            'Klient może w każdej chwili pobrać swoje dane w formatach pozwalających na ich odczytanie bez naszego udziału, w tym po rozwiązaniu umowy.',
        },
        {
          typ: 'akapit',
          tresc:
            'Prawa do aplikacji, jej kodu, wyglądu i znaków towarowych należą do Usługodawcy. Klient otrzymuje niewyłączną, nieprzenoszalną licencję na korzystanie z Usługi na czas trwania umowy, wyłącznie na potrzeby własnej działalności.',
        },
      ],
    },
    {
      numer: '§ 9',
      tytul: 'Odpowiedzialność',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Odpowiadamy za niewykonanie lub nienależyte wykonanie umowy na zasadach ogólnych, z ograniczeniami opisanymi niżej.',
        },
        {
          typ: 'lista',
          wstep: 'Nie odpowiadamy za:',
          punkty: [
            'skutki podania przez Klienta nieprawidłowych danych, w tym błędnych stawek, terminów i danych kontrahentów;',
            'decyzje podjęte przez Klienta na podstawie zestawień i wyliczeń, które mają charakter pomocniczy;',
            'przerwy wynikające z awarii po stronie Klienta, jego dostawcy internetu lub operatora sieci komórkowej;',
            'działanie systemów zewnętrznych, w tym systemu e-faktur, dostawców map i operatorów płatności — poza doborem i nadzorem nad tymi dostawcami.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'W stosunkach z Klientami niebędącymi konsumentami ani osobami, o których mowa w § 3 ust. 2, nasza odpowiedzialność ograniczona jest do wysokości opłat zapłaconych przez Klienta w ciągu dwunastu miesięcy poprzedzających zdarzenie i nie obejmuje utraconych korzyści. Ograniczenie nie dotyczy szkody wyrządzonej umyślnie.',
        },
      ],
    },
    {
      numer: '§ 10',
      tytul: 'Reklamacje',
      bloki: [
        {
          typ: 'akapit',
          tresc: `Reklamacje przyjmujemy mailem na adres ${firma.email}. Reklamacja powinna zawierać nazwę Klienta, opis problemu oraz — jeżeli to możliwe — datę i godzinę zdarzenia.`,
        },
        {
          typ: 'akapit',
          tresc:
            'Reklamację rozpatrujemy w terminie 14 dni od jej otrzymania i w tym samym terminie wysyłamy odpowiedź na adres e-mail, z którego reklamacja wpłynęła. Jeżeli sprawa wymaga dłuższego wyjaśnienia, informujemy o tym przed upływem terminu i wskazujemy przewidywany termin odpowiedzi.',
        },
      ],
    },
    {
      numer: '§ 11',
      tytul: 'Rozwiązanie umowy',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Klient może rozwiązać umowę w każdej chwili, bez podania przyczyny, w ustawieniach Konta. Rozwiązanie następuje z końcem opłaconego Okresu rozliczeniowego; nie stosujemy okresu wypowiedzenia ani opłat za rezygnację.',
        },
        {
          typ: 'akapit',
          tresc:
            'Klientowi, o którym mowa w § 3 ust. 2, przysługuje prawo odstąpienia od umowy w terminie 14 dni od jej zawarcia, bez podania przyczyny. Rozpoczęcie korzystania z Usługi w Okresie próbnym nie pozbawia tego prawa.',
        },
        {
          typ: 'akapit',
          tresc:
            'Możemy rozwiązać umowę z zachowaniem miesięcznego okresu wypowiedzenia, a w razie istotnego naruszenia Regulaminu przez Klienta — ze skutkiem natychmiastowym, po bezskutecznym wezwaniu opisanym w § 5.',
        },
        {
          typ: 'akapit',
          tresc:
            'Po rozwiązaniu umowy dane Klienta pozostają dostępne do pobrania przez 30 dni. Po tym czasie usuwamy je z systemów produkcyjnych, a z kopii zapasowych — w cyklu opisanym w umowie powierzenia. Na pisemne żądanie Klienta usuwamy dane wcześniej.',
        },
      ],
    },
    {
      numer: '§ 12',
      tytul: 'Zmiany regulaminu',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'O zmianie Regulaminu informujemy Klienta mailem co najmniej 30 dni przed jej wejściem w życie, wskazując, co się zmienia. Poprzednie wersje pozostają dostępne na stronie dokumentu.',
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli Klient nie akceptuje zmiany, może rozwiązać umowę ze skutkiem na dzień poprzedzający jej wejście w życie. Korzystanie z Usługi po tej dacie oznacza akceptację nowej wersji.',
        },
      ],
    },
    {
      numer: '§ 13',
      tytul: 'Postanowienia końcowe',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Do umowy stosuje się prawo polskie. Sądem właściwym do rozpoznania sporów jest sąd właściwy dla siedziby Usługodawcy, chyba że przepis bezwzględnie obowiązujący stanowi inaczej.',
        },
        {
          typ: 'akapit',
          tresc:
            'Zasady przetwarzania danych osobowych opisuje Polityka prywatności. Zasady powierzenia nam przetwarzania danych, których administratorem jest Klient, opisuje dokument Powierzenie danych, stanowiący integralną część umowy.',
        },
        {
          typ: 'akapit',
          tresc:
            'Jeżeli którekolwiek postanowienie Regulaminu okaże się nieważne, pozostałe zachowują moc, a w miejsce postanowienia nieważnego stosuje się przepisy prawa.',
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
  href: '/regulamin',
  tytul: 'Terms of Service',
  obowiazujeOd: '1 September 2026',
  wersja: 1,
  ostatniaZmiana: '1 September 2026',
  wSkrocie: [
    'You pay per vehicle, not per person. Drivers and office staff are unlimited.',
    'You pay nothing for the first 14 days. You cancel with one click, with no notice period.',
    'Your data is yours. You can download it at any time, including after you cancel.',
    'The service is for businesses. We keep data in Europe and never sell it to anyone.',
  ],
  paragrafy: [
    {
      numer: '§ 1',
      tytul: 'Who provides the service',
      bloki: [
        {
          typ: 'akapit',
          tresc: `The service is provided by ${firma.nazwa}, with its registered office in Szczecin, ${firma.ulica}, ${firma.miasto}, Poland, tax identification number (NIP) ${firma.nip}, statistical number (REGON) ${firma.regon}, National Court Register (KRS) number ${firma.krs}.`,
        },
        {
          typ: 'akapit',
          tresc: `Contact for all matters, including complaints: ${firma.email}. We respond on business days.`,
        },
        {
          typ: 'akapit',
          tresc:
            'These Terms set out the rules for using the BusiKM service and constitute terms and conditions within the meaning of the Act of 18 July 2002 on the Provision of Electronic Services (ustawa o świadczeniu usług drogą elektroniczną). We make them available free of charge before the agreement is concluded, in a form that allows them to be downloaded and saved.',
        },
      ],
    },
    {
      numer: '§ 2',
      tytul: 'Definitions',
      bloki: [
        {
          typ: 'definicje',
          wstep: 'The terms used in these Terms have the following meanings:',
          pozycje: [
            {
              termin: 'Service Provider',
              opis: `${firma.nazwa}, referred to in § 1.`,
            },
            {
              termin: 'Service',
              opis: 'access to the BusiKM application in a web browser and to the BusiKM Driver mobile application, to the extent provided by the selected Plan.',
            },
            {
              termin: 'Client',
              opis: 'a business that has created an Account and uses the Service in connection with its business activity.',
            },
            {
              termin: 'Account',
              opis: 'the Client’s separate space within the Service, comprising its data, vehicles, orders and documents.',
            },
            {
              termin: 'User',
              opis: 'a person to whom the Client has granted access to the Account in one of the following roles: owner, dispatcher, accountant or driver.',
            },
            {
              termin: 'Vehicle',
              opis: 'a motor vehicle entered into the Account. Trailers and semi-trailers are not Vehicles within the meaning of these Terms and do not affect the amount of the fee.',
            },
            {
              termin: 'Plan',
              opis: 'a variant of the Service specified in the Price List, which determines the Vehicle limit and the scope of functions.',
            },
            {
              termin: 'Trial Period',
              opis: 'the first 14 days after the Account is created, during which the Service is free of charge.',
            },
            {
              termin: 'Billing Period',
              opis: 'a month or a year, as chosen by the Client when purchasing a Plan.',
            },
          ],
        },
      ],
    },
    {
      numer: '§ 3',
      tytul: 'Who the service is for',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'The Service is intended for businesses and is not directed at consumers. By creating an Account, the Client declares that it is concluding an agreement directly related to its business activity.',
        },
        {
          typ: 'akapit',
          tresc:
            'If the Client is a natural person conducting business activity and the agreement is not of a professional nature for that person, the consumer protection provisions apply to that person to the extent set out in the Act of 30 May 2014 on Consumer Rights (ustawa o prawach konsumenta) — in particular the right to withdraw from the agreement within 14 days.',
        },
      ],
    },
    {
      numer: '§ 4',
      tytul: 'Scope of the service and technical requirements',
      bloki: [
        {
          typ: 'lista',
          wstep:
            'As part of the Service, to the extent provided by the selected Plan, the Client may:',
          punkty: [
            'manage transport orders and issue and send invoices, including to Poland’s national e-invoicing system (KSeF);',
            'record routes, costs and working time through the BusiKM Driver application;',
            'keep a register of vehicles, documents and their expiry dates;',
            'prepare reports for accounting purposes in the formats specified in the Price List.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'Accounting reports are generated for a selected calendar month. Once a month is closed, the data for that period cannot be changed.',
        },
        {
          typ: 'akapit',
          tresc:
            'Functions supporting the driver’s work, including driving time and break counters, are auxiliary in nature. They do not replace the tachograph or any other devices and documents required by law, and the Client remains responsible for fulfilling the obligations of a carrier.',
        },
        {
          typ: 'lista',
          wstep: 'To use the Service, the following are required:',
          punkty: [
            'a device with internet access and an up-to-date browser (Chrome, Safari, Firefox or Edge, in a version no more than two years old);',
            'for the mobile application — a phone running iOS 15 or Android 10 or later;',
            'an active e-mail address;',
            'cookies and JavaScript enabled.',
          ],
        },
      ],
    },
    {
      numer: '§ 5',
      tytul: 'Conclusion of the agreement, the account and users',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'The agreement is concluded when the Account is created, that is, when the registration form is completed and acceptance of these Terms is confirmed. We send confirmation of the conclusion of the agreement to the e-mail address provided during registration.',
        },
        {
          typ: 'akapit',
          tresc:
            'The Client grants and revokes Users’ access and determines their roles. The number of Users is unlimited and does not affect the amount of the fee. The Client is liable for the actions of Users as for its own.',
        },
        {
          typ: 'lista',
          wstep: 'The Client undertakes not to:',
          punkty: [
            'share login credentials with persons outside its organisation;',
            'enter into the Service any unlawful content or data to which it has no legal title;',
            'take any action that threatens the stability or security of the Service, including load testing and attempts to circumvent security measures;',
            'copy, decompile or resell the Service without our consent.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'In the event of a material breach of the above rules, we may suspend access to the Account after first calling on the Client to cease the breach and setting a deadline of no less than 7 days. If the breach threatens the security of other clients’ data, the suspension may take effect immediately, with simultaneous notice to the Client.',
        },
      ],
    },
    {
      numer: '§ 6',
      tytul: 'Fees and billing',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'The Service is free of charge for the first 14 days. After that period, the Client chooses a Plan and pays in advance for the selected Billing Period. If the Client does not choose a Plan, the Account switches to read-only mode — the data remains available for download.',
        },
        {
          typ: 'akapit',
          tresc:
            'The fees are set out in the Price List available on the Service website. The fee depends on the number of Vehicles in the Account. Prices are given in Polish zloty (PLN) as net amounts; VAT at the applicable rate is added to the fee.',
        },
        {
          typ: 'akapit',
          tresc:
            'We issue an invoice automatically for each Billing Period and send it to the Client’s e-mail address. The Client consents to receiving invoices in electronic form.',
        },
        {
          typ: 'akapit',
          tresc:
            'The Plan may be changed in either direction at any time. The difference is settled pro rata to the number of days remaining until the end of the Billing Period. Increasing the number of Vehicles above the Plan limit results in a surcharge in accordance with the Price List from the next Billing Period.',
        },
        {
          typ: 'akapit',
          tresc:
            'In the event of late payment, we send the Client a payment reminder by e-mail. If the delay exceeds 14 days from the reminder, we may switch the Account to read-only mode until the amount due is paid. The Client’s data then remains available for download.',
        },
      ],
    },
    {
      numer: '§ 7',
      tytul: 'Service availability',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We make every effort to keep the Service available without interruption. We announce planned maintenance at least 24 hours in advance and, where possible, carry it out outside the hours of 6:00–20:00 on business days.',
        },
        {
          typ: 'akapit',
          tresc:
            'We publish the current status of the Service and the history of outages on the /status page. We inform Clients by e-mail of any outage lasting longer than one hour.',
        },
        {
          typ: 'akapit',
          tresc:
            'The BusiKM Driver application works without network access: data is saved on the phone and sent once the connection is restored. An outage of the server side does not interrupt the recording of the route or working time.',
        },
      ],
    },
    {
      numer: '§ 8',
      tytul: 'Client data and ownership',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'Data entered into the Account remains the property of the Client. We do not use it for our own commercial purposes, we do not disclose it to third parties except in the cases described in the Privacy Policy and in the data processing agreement, and we do not sell it.',
        },
        {
          typ: 'akapit',
          tresc:
            'The Client may download its data at any time in formats that allow it to be read without our involvement, including after the agreement has been terminated.',
        },
        {
          typ: 'akapit',
          tresc:
            'The rights to the application, its code, its appearance and its trademarks belong to the Service Provider. The Client receives a non-exclusive, non-transferable licence to use the Service for the term of the agreement, solely for the purposes of its own business.',
        },
      ],
    },
    {
      numer: '§ 9',
      tytul: 'Liability',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We are liable for non-performance or improper performance of the agreement on general terms, subject to the limitations described below.',
        },
        {
          typ: 'lista',
          wstep: 'We are not liable for:',
          punkty: [
            'the consequences of the Client providing incorrect data, including incorrect rates, dates and client details;',
            'decisions made by the Client on the basis of reports and calculations, which are auxiliary in nature;',
            'interruptions resulting from failures on the side of the Client, its internet provider or its mobile network operator;',
            'the operation of external systems, including the e-invoicing system, map providers and payment operators — except for the selection and supervision of those providers.',
          ],
        },
        {
          typ: 'akapit',
          tresc:
            'In relations with Clients who are neither consumers nor persons referred to in § 3(2), our liability is limited to the amount of fees paid by the Client in the twelve months preceding the event and does not cover lost profits. This limitation does not apply to damage caused intentionally.',
        },
      ],
    },
    {
      numer: '§ 10',
      tytul: 'Complaints',
      bloki: [
        {
          typ: 'akapit',
          tresc: `We accept complaints by e-mail at ${firma.email}. A complaint should include the Client’s name, a description of the problem and — where possible — the date and time of the event.`,
        },
        {
          typ: 'akapit',
          tresc:
            'We handle a complaint within 14 days of receiving it and, within the same period, send a response to the e-mail address from which the complaint was sent. If the matter requires a longer investigation, we notify the Client of this before the deadline expires and indicate the expected date of the response.',
        },
      ],
    },
    {
      numer: '§ 11',
      tytul: 'Termination of the agreement',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'The Client may terminate the agreement at any time, without giving a reason, in the Account settings. Termination takes effect at the end of the paid Billing Period; we do not apply a notice period or cancellation fees.',
        },
        {
          typ: 'akapit',
          tresc:
            'A Client referred to in § 3(2) has the right to withdraw from the agreement within 14 days of its conclusion, without giving a reason. Starting to use the Service during the Trial Period does not deprive the Client of this right.',
        },
        {
          typ: 'akapit',
          tresc:
            'We may terminate the agreement with one month’s notice and, in the event of a material breach of these Terms by the Client, with immediate effect after an unsuccessful call to cease the breach as described in § 5.',
        },
        {
          typ: 'akapit',
          tresc:
            'After the agreement is terminated, the Client’s data remains available for download for 30 days. After that time, we delete it from production systems, and from backups — on the cycle described in the data processing agreement. At the Client’s written request, we delete the data earlier.',
        },
      ],
    },
    {
      numer: '§ 12',
      tytul: 'Amendments to the Terms',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'We notify the Client of any amendment to these Terms by e-mail at least 30 days before it takes effect, indicating what is changing. Previous versions remain available on the document page.',
        },
        {
          typ: 'akapit',
          tresc:
            'If the Client does not accept the amendment, it may terminate the agreement with effect from the day before the amendment takes effect. Using the Service after that date constitutes acceptance of the new version.',
        },
      ],
    },
    {
      numer: '§ 13',
      tytul: 'Final provisions',
      bloki: [
        {
          typ: 'akapit',
          tresc:
            'The agreement is governed by Polish law. Disputes are resolved by the court having jurisdiction over the Service Provider’s registered office, unless a mandatory provision of law provides otherwise.',
        },
        {
          typ: 'akapit',
          tresc:
            'The rules for processing personal data are described in the Privacy Policy. The rules under which the Client entrusts us with the processing of data for which it is the controller are described in the Data Processing Agreement document, which forms an integral part of the agreement.',
        },
        {
          typ: 'akapit',
          tresc:
            'If any provision of these Terms proves to be invalid, the remaining provisions remain in force, and the invalid provision is replaced by the provisions of law.',
        },
      ],
    },
  ],
};

export const regulamin: Tlumaczenia<Dokument> = { pl, en };
