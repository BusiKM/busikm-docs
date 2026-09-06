import type { Artykul } from '@/content/pomoc/typy';

/**
 * Pierwsze kroki — od zdobycia konta do firmy gotowej do pracy.
 *
 * Kolejność nie jest przypadkowa: bez danych firmy nie wystawisz faktury,
 * bez pojazdu nie policzysz kilometrów, bez kierowcy nie ma czego przydzielać.
 * Dlatego artykuły idą w tej samej kolejności, co realna konfiguracja.
 */
export const artykulyStart: Artykul[] = [
  {
    slug: 'zakladamy-konto',
    kategoria: 'start',
    tytul: 'Jak założyć konto',
    lead: 'Konta zakładamy po krótkiej rozmowie — i to jest wybór, nie brak przycisku.',
    role: ['wlasciciel'],
    czas: 'Rozmowa trzydzieści minut, konto tego samego dnia',
    rozdzialy: [
      {
        tytul: 'Dlaczego przez rozmowę',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Podczas rozmowy dobieramy plan do wielkości floty i konfigurujemy firmę razem z Tobą: pojazdy, kierowców i eksport do Twojego programu księgowego. Po rozmowie dostajesz link do rejestracji.',
          },
          {
            typ: 'akapit',
            tresc:
              'Pierwszy dzień z pustym systemem to zwykle godzina klikania w ustawieniach, o których nikt nie uprzedził. Wolimy tę godzinę przejść z Tobą raz, niż zostawić Cię z formularzem rejestracji i nadzieją.',
          },
        ],
      },
      {
        tytul: 'Jak się umówić',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Napisz do nas albo umów rozmowę',
                opis: 'Adres i formularz są na stronie kontaktowej. Odpisujemy tego samego dnia roboczego.',
              },
              {
                tytul: 'Przygotuj trzy rzeczy na rozmowę',
                opis: 'NIP firmy, liczbę pojazdów i nazwę programu księgowego, z którego korzysta Twoja księgowa.',
              },
              {
                tytul: 'Odbierz link do rejestracji',
                opis: 'Ustawiasz na nim hasło i wchodzisz do konta właściciela.',
              },
            ],
          },
          {
            typ: 'wkrotce',
            tresc:
              'Rejestracja bez rozmowy i demo do samodzielnego kliknięcia są w planach. Dziś jeszcze ich nie ma — na stronie zapisujesz się na powiadomienie, a nie zakładasz konto.',
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
    gdzie: 'Ustawienia → Firma → Dane firmy',
    czas: 'Kwadrans',
    zanim: ['NIP, REGON i adres z rejestru', 'Numer konta firmowego', 'Nazwa programu księgowego'],
    rozdzialy: [
      {
        tytul: 'Co uzupełnić od razu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w Ustawienia → Dane firmy',
                opis: 'Obowiązkowa jest tylko Nazwa firmy *. Reszta pól jest opcjonalna po stronie formularza, ale bez nich faktura będzie niepełna.',
              },
              {
                tytul: 'Uzupełnij dane rejestrowe',
                opis: 'NIP, REGON, KRS, Ulica i numer, Miasto, Kod pocztowy, Kraj. Nazwa pełna trafia na fakturę, Nazwa skrócona na listy w systemie.',
              },
              {
                tytul: 'Ustaw status podatkowy',
                opis: 'Płatnik VAT oraz — przy przewozach wewnątrzwspólnotowych — VAT EU i Prefix EU VAT.',
              },
              {
                tytul: 'Wpisz konto bankowe',
                opis: 'Numer IBAN i SWIFT / BIC drukują się na fakturze. Bez nich klient nie ma na co przelać.',
              },
              {
                tytul: 'Wskaż System księgowy i Symbol firmy w FK',
                opis: 'Do wyboru Insert GT, Comarch ERP Optima i Symfonia FK. Od tego zależy format pliku, który dostanie księgowa.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Numer licencji transportowej wpisz od razu, nawet jeśli dziś nie jest potrzebny. Przy kontroli szuka się go w pośpiechu, a tu leży w jednym miejscu razem z resztą.',
          },
        ],
      },
      {
        tytul: 'Cele miesięczne',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na dole formularza są trzy pola: Cel miesięczny przychodu (zł), Cel miesięczny kosztów (zł) i Cel miesięczny zysku (zł). Pulpit pokazuje wtedy, ile brakuje do celu, zamiast samej surowej kwoty.',
          },
          {
            typ: 'akapit',
            tresc: 'Można je zostawić puste — pulpit po prostu nie narysuje pasków postępu.',
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
              'Branding i faktury — logo i wygląd dokumentów wysyłanych klientom.',
              'Stawki kilometrówki — stawki za kilometr, z których liczy się ewidencja przebiegu.',
              'Kursy walut — kursy NBP z możliwością własnego wpisu.',
              'Progi alertów — na ile dni przed terminem system ma ostrzegać.',
              'KSeF — połączenie z Krajowym Systemem e-Faktur.',
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
    lead: 'Bez pojazdu nie ma kilometrów, kosztów paliwa ani ewidencji przebiegu. To pierwsza rzecz po danych firmy.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Pojazdy → Nowy pojazd',
    czas: 'Pięć minut na pojazd',
    zanim: ['Dowód rejestracyjny — VIN, rok produkcji, DMC', 'Stan licznika na dziś'],
    rozdzialy: [
      {
        tytul: 'Wypełnienie formularza',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Pojazdy i kliknij Nowy pojazd' },
              {
                tytul: 'Wpisz dane identyfikacyjne',
                opis: 'Numer rejestracyjny *, VIN *, Marka *, Model *, Rok produkcji *, Typ pojazdu *. Gwiazdka znaczy, że bez tego formularz się nie zapisze.',
              },
              {
                tytul: 'Podaj dane techniczne',
                opis: 'Rodzaj paliwa *, DMC (kg), Pojemność (cm³), Moc (kW), Norma Euro. DMC decyduje o tym, które przepisy dotyczą pojazdu.',
              },
              {
                tytul: 'Ustaw Licznik początkowy (km) i Datę startu ewidencji',
                opis: 'To punkt zerowy. Od tej daty i tego stanu licznika liczy się cała ewidencja przebiegu — wpisz stan z dnia, w którym zaczynacie pracę w BusiKM, a nie z dnia zakupu pojazdu.',
              },
              {
                tytul: 'Wypełnij Datę zgłoszenia VAT-26, jeśli pojazd jest zgłoszony',
                opis: 'Dotyczy pojazdów używanych wyłącznie do działalności, przy pełnym odliczeniu VAT.',
              },
              { tytul: 'Zapisz' },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Licznika początkowego nie poprawia się bezkarnie po miesiącu pracy — przeliczyłby się cały przebieg. Sprawdź stan przed zapisaniem.',
          },
        ],
      },
      {
        tytul: 'Dokumenty pojazdu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Po zapisaniu wejdź w kartę pojazdu i dodaj dokumenty z datami ważności. Wtedy system zacznie pilnować terminów za Ciebie.',
          },
          {
            typ: 'tabela',
            naglowki: ['Kategoria', 'Co się w niej mieści'],
            wiersze: [
              ['Dowód rejestracyjny', 'Dowód rejestracyjny, wypis z licencji'],
              ['Ubezpieczenia', 'OC, AC, NNW, GAP, zielona karta'],
              ['Przeglądy i tachograf', 'Badanie techniczne, świadectwo i kalibracja tachografu, norma emisji'],
              ['Certyfikaty specjalistyczne', 'ATP, ADR pojazdu'],
              ['Licencje i leasing', 'Licencja transportowa, umowa leasingu'],
            ],
          },
        ],
      },
    ],
    powiazane: ['dokumenty-i-terminy', 'przejazdy-i-kilometrowka'],
  },
];
