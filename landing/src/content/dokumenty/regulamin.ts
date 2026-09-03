import { firma } from '@/content/firma';
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
export const regulamin: Dokument = {
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
