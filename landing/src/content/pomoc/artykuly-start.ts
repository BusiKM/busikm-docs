import type { Artykul } from '@/content/pomoc/typy';

/**
 * Pierwsze kroki – od zdobycia konta do firmy gotowej do pracy.
 *
 * Kolejność nie jest przypadkowa: bez danych firmy nie wystawisz faktury,
 * bez pojazdu nie policzysz kilometrów, bez kierowcy nie ma czego przydzielać.
 * Dlatego artykuły idą w tej samej kolejności, co realna konfiguracja.
 *
 * Publiczna rejestracja jeszcze nie jest otwarta (strona `/zaloguj` zbiera
 * zapisy), więc artykuł o koncie opisuje, jak rejestracja wygląda, i mówi
 * wprost, że dziś konta dostają osoby z listy.
 */
export const artykulyStart: Artykul[] = [
  {
    slug: 'zakladamy-konto',
    kategoria: 'start',
    tytul: 'Jak założyć konto',
    lead: 'Zaczynasz od NIP-u, resztę danych firmy pobieramy z rejestru. Na razie konta otwieramy osobom z listy.',
    role: ['wlasciciel'],
    czas: 'Pięć minut, razem z potwierdzeniem maila',
    zanim: ['NIP firmy', 'Adres e-mail, na który przyjdzie potwierdzenie'],
    rozdzialy: [
      {
        tytul: 'Na czym stoimy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'BusiKM sprawdzamy na prawdziwych trasach, w małej grupie firm. Zapisz się na listę na stronie „Zaloguj się” – napiszemy, gdy otworzymy konto dla Ciebie.',
          },
          {
            typ: 'wkrotce',
            tresc:
              'Demo obejrzysz już teraz, bez konta – przycisk Zobacz demo na stronie. Rejestracja dla wszystkich ruszy wkrótce; do tego czasu na stronie zapisujesz się na listę, a nie zakładasz konto.',
          },
        ],
      },
      {
        tytul: 'Rejestracja krok po kroku',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wpisz NIP firmy',
                opis: 'Nazwę i adres pobierzemy z rejestru. Jeśli czegoś nie znajdziemy, uzupełnisz dane firmy ręcznie.',
              },
              {
                tytul: 'Podaj swoje dane',
                opis: 'Imię, nazwisko i e-mail. Na ten adres przyjdzie potwierdzenie.',
              },
              { tytul: 'Ustaw hasło' },
              {
                tytul: 'Potwierdź adres e-mail',
                opis: 'Klikasz odnośnik z maila. Konto jest aktywne, a 14 dni próby – bez karty – już trwa.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Okres próbny przysługuje raz na firmę. Jeśli firma o tym NIP-ie ma już konto w BusiKM, rejestracja powie to od razu i pokaże, co dalej.',
          },
        ],
      },
    ],
    powiazane: ['dane-firmy', 'dodajemy-pojazd'],
  },

  {
    slug: 'dane-firmy',
    kategoria: 'start',
    tytul: 'Dane firmy i konfiguracja',
    lead: 'Jedno wypełnienie, z którego bierze się każda faktura i każdy eksport.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Ustawienia → Dane firmy',
    czas: 'Kwadrans',
    zanim: ['Numer konta firmowego', 'Nazwa programu księgowego, z którego korzysta biuro'],
    rozdzialy: [
      {
        tytul: 'Co uzupełnić od razu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w Ustawienia → Dane firmy',
                opis: 'Część danych jest już wpisana z rejestru przy zakładaniu konta. Sprawdź je – drukujemy je na fakturach, CMR i w eksportach dla księgowej.',
              },
              {
                tytul: 'Uzupełnij dane rejestrowe',
                opis: 'Nazwa firmy, Nazwa skrócona, NIP, REGON, KRS i adres siedziby. Pełną nazwę do JPK wpisz, gdy różni się od nazwy firmy.',
              },
              {
                tytul: 'Dopisz numer VAT UE, jeśli wystawiasz faktury firmom z Unii',
                opis: 'Prefiks VAT UE jest potrzebny przy fakturach dla firm z innych krajów UE.',
              },
              {
                tytul: 'Dodaj konto bankowe',
                opis: 'Ustawienia → Konta bankowe. Numer drukuje się na fakturze – bez niego klient nie ma na co przelać.',
              },
              {
                tytul: 'Wskaż program księgowy',
                opis: 'Ustawienia → Program księgowy: Insert GT (także Rachmistrz), Comarch Optima, Symfonia albo inny program z plikiem CSV. Insert GT wymaga też symbolu firmy w programie. W tym samym miejscu wybierasz urząd skarbowy i dane do JPK.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Licencję transportową i wypisy dodaj od razu w Ustawienia → Licencja i wypisy, nawet jeśli dziś nie są potrzebne. Przy kontroli szuka się ich w pośpiechu, a tu leżą w jednym miejscu.',
          },
        ],
      },
      {
        tytul: 'Cele firmy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'W Ustawienia → Cele firmy wpiszesz przychód, koszty i zysk w miesiącu oraz próg marży zlecenia. Pulpit pokazuje wtedy, ile z celu już masz, a zlecenia z niższą marżą oznaczamy w Raportach i na liście zleceń.',
          },
          {
            typ: 'akapit',
            tresc: 'Cele możesz zostawić puste – pulpit po prostu ich nie pokaże.',
          },
        ],
      },
      {
        tytul: 'Reszta ustawień',
        bloki: [
          {
            typ: 'lista',
            wstep: 'Do tych wrócisz, gdy zaczniesz wystawiać i rozliczać:',
            punkty: [
              'Logo na dokumentach – logo na fakturach i dokumentach dla klientów.',
              'Faktury – numeracja faktur i domyślny termin płatności.',
              'KSeF – połączenie z Krajowym Systemem e-Faktur.',
              'Przypomnienia o terminach – przypominamy 60, 30, 14 i 3 dni przed terminem dokumentu.',
              'Stawki z przepisów – diety, kilometrówka i kursy NBP, do podglądu.',
            ],
          },
        ],
      },
    ],
    powiazane: ['dodajemy-pojazd', 'zespol-i-role'],
  },

  {
    slug: 'dodajemy-pojazd',
    kategoria: 'start',
    tytul: 'Jak dodać pojazd',
    lead: 'Bez pojazdu nie ma kilometrów, kosztów paliwa ani ewidencji przebiegu. Wystarczy zdjęcie dowodu rejestracyjnego.',
    role: ['wlasciciel'],
    gdzie: 'Pojazdy → Dodaj pojazd',
    czas: 'Trzy minuty na pojazd',
    zanim: ['Dowód rejestracyjny – zdjęcia wszystkich stron albo PDF', 'Stan licznika na dziś'],
    rozdzialy: [
      {
        tytul: 'Trzy kroki kreatora',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Pojazdy i kliknij Dodaj pojazd' },
              {
                tytul: 'Z dowodu',
                opis: 'Wgraj zdjęcie dowodu rejestracyjnego – możesz wybrać kilka zdjęć naraz. AI odczyta numer rejestracyjny, VIN, markę, model, rok i masy, a Ty sprawdzasz pola z dowodem. Dane możesz też przepisać ręcznie.',
              },
              {
                tytul: 'Jak używasz',
                opis: 'Czyje jest auto (kupione, leasing albo najem), gdzie jeździ, kto jest kierowcą domyślnym i jaki jest licznik dziś. Od tego zależy między innymi odliczenie VAT – przy pełnym odliczeniu podajesz datę złożenia VAT-26.',
              },
              {
                tytul: 'Terminy',
                opis: 'Termin badania technicznego policzymy z dowodu. Wgraj polisę – daty OC, AC i NNW odczytamy z dokumentu.',
              },
              {
                tytul: 'Kliknij Dodaj pojazd',
                opis: 'Auto pojawi się przy przypisywaniu zleceń od razu. Wszystko zmienisz później w karcie auta.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Licznik dziś to punkt startowy – od niego liczymy serwis i przebieg. Wpisz stan z dnia, w którym zaczynacie pracę w BusiKM, a nie z dnia zakupu auta.',
          },
          {
            typ: 'akapit',
            tresc:
              'Numer i VIN sprawdzamy w Twojej flocie, więc ten sam pojazd nie doda się dwa razy. Przyczepy i naczepy nie liczą się do limitu pojazdów w planie.',
          },
        ],
      },
      {
        tytul: 'Dokumenty pojazdu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Kolejne dokumenty dodasz w karcie pojazdu, w zakładce Terminy i dokumenty. Wystarczy zdjęcie albo PDF – rodzaj, numer i daty odczytamy, a Ty je sprawdzasz.',
          },
          {
            typ: 'lista',
            wstep: 'Przy pojeździe pilnujemy między innymi:',
            punkty: [
              'dowodu rejestracyjnego i umowy leasingu,',
              'polisy OC, AC i zielonej karty,',
              'badania technicznego i legalizacji tachografu.',
            ],
          },
        ],
      },
    ],
    powiazane: ['dokumenty-i-terminy', 'przejazdy-i-kilometrowka'],
  },
];
