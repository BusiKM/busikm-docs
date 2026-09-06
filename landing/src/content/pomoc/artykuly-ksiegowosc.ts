import type { Artykul } from '@/content/pomoc/typy';

/**
 * Rozliczenia — przejazdy, zamknięcie miesiąca, eksport, raporty.
 *
 * Sekcja Rozliczenia w menu aplikacji jest widoczna dla księgowego, nie dla
 * właściciela: eksport FK i JPK_FA robi biuro rachunkowe albo księgowa
 * w firmie. Instrukcje muszą to mówić wprost, żeby właściciel nie szukał
 * przycisku, którego u siebie nie zobaczy.
 */
export const artykulyKsiegowosc: Artykul[] = [
  {
    slug: 'przejazdy-i-kilometrowka',
    kategoria: 'ksiegowosc',
    tytul: 'Przejazdy i ewidencja przebiegu',
    lead: 'Trasy zapisują się z telefonu kierowcy. Twoja rola to potwierdzić, co było służbowe.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Przejazdy',
    czas: 'Kilka minut tygodniowo',
    rozdzialy: [
      {
        tytul: 'Skąd biorą się przejazdy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Aplikacja kierowcy zapisuje trasę na podstawie lokalizacji telefonu i etapów zlecenia. Nikt nie przepisuje kilometrów z licznika do zeszytu — przejazd pojawia się na liście sam, z datą, trasą i przebiegiem.',
          },
          {
            typ: 'akapit',
            tresc:
              'Przejazd można też dopisać ręcznie, gdy telefon był wyłączony albo pojazd prowadził ktoś bez aplikacji.',
          },
        ],
      },
      {
        tytul: 'Potwierdzanie',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Przejazdy i ustaw filtr na miesiąc' },
              {
                tytul: 'Sprawdź Typ trasy',
                opis: 'Służbowa albo Prywatna. Przy służbowej wymagany jest Cel trasy *: Dostawa towaru, Przejazd bez ładunku, Serwis pojazdu, Przejazd techniczny albo Inne.',
              },
              {
                tytul: 'Potwierdź przejazd',
                opis: 'Możesz zaznaczyć wiele wierszy i użyć Potwierdź zaznaczone. Odrzucenie też jest tu — z powodem.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Źle zakwalifikowaną trasę przełączysz między służbową a prywatną do czasu eksportu — służy do tego przeklasyfikowanie w szczegółach przejazdu.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Po potwierdzeniu przejazdu nie da się go już edytować ani usunąć. To celowe: ewidencja przebiegu ma być zapisem tego, co się wydarzyło, a nie dokumentem, który da się poprawić po fakcie. Cofnąć potwierdzenie może właściciel.',
          },
        ],
      },
      {
        tytul: 'Stawki za kilometr',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Stawki, po których liczy się ewidencja, siedzą w Ustawienia → Stawki kilometrówki. Zmieniają się rozporządzeniem, więc mają daty obowiązywania — stary miesiąc liczy się starą stawką i tak zostaje.',
          },
        ],
      },
    ],
    powiazane: ['zamkniecie-miesiaca', 'raporty-i-ewidencje'],
  },

  {
    slug: 'zamkniecie-miesiaca',
    kategoria: 'ksiegowosc',
    tytul: 'Zamknięcie miesiąca',
    lead: 'Podsumowanie na pojazd, przeliczenie, zatwierdzenie. Dopiero potem eksport.',
    role: ['ksiegowa', 'wlasciciel'],
    gdzie: 'Raporty → Miesięczne podsumowania',
    czas: 'Kwadrans na miesiąc',
    zanim: ['Wszystkie przejazdy z miesiąca potwierdzone', 'Koszty zaakceptowane albo odrzucone'],
    rozdzialy: [
      {
        tytul: 'Trzy ruchy',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Utwórz podsumowanie',
                opis: 'Podajesz Rok, Miesiąc i Pojazd. Jedno podsumowanie dotyczy jednego pojazdu w jednym miesiącu.',
              },
              {
                tytul: 'Kliknij Przelicz',
                opis: 'System zbiera przejazdy, koszty i kilometry z okresu. Przeliczyć można wielokrotnie, dopóki podsumowanie nie jest zatwierdzone.',
              },
              {
                tytul: 'Kliknij Zatwierdź',
                opis: 'Zatwierdzenie zamyka miesiąc dla tego pojazdu.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Gdy zatwierdzenie nie przechodzi',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'System nie pozwoli zatwierdzić miesiąca, w którym zostały niepotwierdzone albo niekompletne przejazdy. Wróć do Przejazdy, uzupełnij je i przelicz ponownie.',
          },
          {
            typ: 'akapit',
            tresc:
              'Gdy wiesz, co robisz i chcesz zamknąć mimo ostrzeżeń, jest Zatwierdź mimo ostrzeżeń. Używaj tego świadomie — braki nie znikają, tylko przestają blokować.',
          },
        ],
      },
      {
        tytul: 'Statusy',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Status', 'Co znaczy'],
            wiersze: [
              ['Wersja robocza', 'Utworzone, jeszcze nieprzeliczone albo w trakcie poprawek'],
              ['Do zatwierdzenia', 'Przeliczone, czeka na decyzję'],
              ['Zatwierdzone', 'Miesiąc zamknięty, gotowy do eksportu'],
              ['Wyeksportowane', 'Poszło do programu księgowego'],
              ['Zablokowane', 'Zamknięte na stałe — nic już się nie zmieni'],
            ],
          },
        ],
      },
    ],
    powiazane: ['eksport-dla-ksiegowej', 'przejazdy-i-kilometrowka'],
  },

  {
    slug: 'eksport-dla-ksiegowej',
    kategoria: 'ksiegowosc',
    tytul: 'Eksport do programu księgowego',
    lead: 'Jeden plik w formacie, który Twoja księgowa wczyta bez przepisywania.',
    role: ['ksiegowa'],
    gdzie: 'Rozliczenia → Eksport FK',
    czas: 'Dwie minuty',
    zanim: ['Zatwierdzone podsumowanie miesięczne', 'Ustawiony System księgowy w danych firmy'],
    rozdzialy: [
      {
        tytul: 'Kto to robi',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Sekcję Rozliczenia widzi księgowy — właściciel z biurem rachunkowym nie generuje plików do urzędu. Jeśli szukasz Eksportu FK i go nie widzisz, to znaczy, że jesteś zalogowany jako właściciel, a nie że funkcji nie ma.',
          },
        ],
      },
      {
        tytul: 'Wygenerowanie pliku',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Rozliczenia → Eksport FK' },
              {
                tytul: 'Wybierz System księgowy',
                opis: 'Insert GT, Comarch ERP Optima albo Symfonia FK. Ustawienie z danych firmy podpowiada się samo.',
              },
              {
                tytul: 'Wskaż Zakres danych',
                opis: 'Przychody + koszty, Tylko przychody albo Tylko koszty.',
              },
              { tytul: 'Podaj Rok * i Miesiąc *' },
              {
                tytul: 'Sprawdź podgląd',
                opis: 'Zanim pobierzesz plik, widzisz liczbę faktur, wydatków i rozmiar pliku. Zero rekordów oznacza, że miesiąc nie jest domknięty albo zakres jest nie ten.',
              },
              { tytul: 'Kliknij Eksportuj' },
            ],
          },
        ],
      },
      {
        tytul: 'Formaty i limity',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['System', 'Co dostajesz'],
            wiersze: [
              ['Insert GT', 'EPP (EDI++ 1.05.1), Windows-1250 — faktury, kilometrówka, kontrahenci'],
              ['Comarch ERP Optima', 'XML w formacie Comarch, UTF-8'],
              ['Symfonia FK', 'TXT rozdzielany średnikiem, opcjonalnie z szablonem AMS'],
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Przy pierwszym imporcie do Symfonii zaznacz „Dołącz szablon AMS" — bez niego program nie wie, jak ułożyć kolumny. Przy kolejnych miesiącach już nie jest potrzebny.',
          },
          {
            typ: 'akapit',
            tresc:
              'Limit to trzy eksporty na miesiąc dla firmy. Wystarcza na wersję właściwą i dwie poprawki, a chroni przed przypadkowym wysłaniem tego samego miesiąca dziesięć razy.',
          },
          {
            typ: 'akapit',
            tresc:
              'Każdy wygenerowany plik zostaje w Historia eksportów — z datą, formatem i rozmiarem. Można go pobrać ponownie, gdy księgowej zaginie mail.',
          },
        ],
      },
      {
        tytul: 'JPK_FA',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Plik JPK_FA na żądanie urzędu generujesz w Rozliczenia → JPK_FA — ten sam sposób, osobny ekran i osobny podgląd przed pobraniem.',
          },
        ],
      },
    ],
    powiazane: ['zamkniecie-miesiaca', 'raporty-i-ewidencje'],
  },

  {
    slug: 'raporty-i-ewidencje',
    kategoria: 'ksiegowosc',
    tytul: 'Raporty',
    lead: 'Jedenaście gotowych zestawień. Każde odpowiada na jedno pytanie, które i tak sobie zadajesz.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Raporty',
    rozdzialy: [
      {
        tytul: 'Finanse',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Raport', 'Odpowiada na pytanie'],
            wiersze: [
              ['Na czym zarabiam?', 'Które zlecenia i klienci dają zysk, a które tylko obrót'],
              ['Skąd przychody?', 'Podział na klientów i waluty'],
              ['Gdzie wydaję pieniądze?', 'Struktura kosztów — gdzie ucieka marża'],
            ],
          },
        ],
      },
      {
        tytul: 'Flota',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Raport', 'Odpowiada na pytanie'],
            wiersze: [
              ['Co kosztuje moja flota?', 'Paliwo, serwis, ubezpieczenia w rozbiciu na pojazdy'],
              ['Który pojazd jest najtańszy?', 'Koszt na kilometr — kandydat do wymiany widać od razu'],
            ],
          },
        ],
      },
      {
        tytul: 'Dla księgowej i urzędu',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Raport', 'Do czego służy'],
            wiersze: [
              ['Wydruk ewidencji km', 'Zestawienie według wzoru Ministerstwa Finansów, PDF do druku'],
              ['Dane do KPiR', 'Zestawienie dla biura rachunkowego'],
              ['Delegacje kierowców', 'Wyjazdy z dietami i ryczałtami'],
              ['Miesięczne PIT-y', 'Dane do rozliczeń pracowniczych'],
              ['Zwrot VAT z UE', 'Roczny wniosek o VAT z paliwa i autostrad, per kraj'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Raporty pobierzesz jako PDF albo CSV — w zależności od tego, czy mają iść do druku, czy do arkusza.',
          },
        ],
      },
    ],
    powiazane: ['przejazdy-i-kilometrowka', 'eksport-dla-ksiegowej'],
  },
];
