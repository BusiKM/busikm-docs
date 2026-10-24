import type { Artykul } from '@/content/pomoc/typy';

/**
 * Rozliczenia – ewidencja przebiegu, zamknięcie miesiąca, eksporty, raporty.
 *
 * Rozliczenia i Raporty widzą właściciel i księgowa; dyspozytor ich nie ma
 * w menu. Instrukcje mówią to wprost, żeby nikt nie szukał przycisku, którego
 * u siebie nie zobaczy.
 */
export const artykulyKsiegowosc: Artykul[] = [
  {
    slug: 'przejazdy-i-kilometrowka',
    kategoria: 'ksiegowosc',
    tytul: 'Przejazdy i ewidencja przebiegu',
    lead: 'Trasy zapisują się z telefonu kierowcy. Kierowca je potwierdza, właściciel zatwierdza, a ewidencja przebiegu składa się sama.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Rozliczenia → Ewidencja przebiegu',
    czas: 'Kilka minut tygodniowo',
    rozdzialy: [
      {
        tytul: 'Skąd biorą się przejazdy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Aplikacja kierowcy zapisuje trasę od „Zacznij dzień” do licznika końcowego. Nikt nie przepisuje kilometrów z licznika do zeszytu – trasa pojawia się sama, z datą i przebiegiem.',
          },
          {
            typ: 'akapit',
            tresc:
              'Trasę dopiszesz też ręcznie przyciskiem Nowa trasa, gdy telefon był wyłączony. Do listy tras wejdziesz z ewidencji (Trasy pojazdu) albo z karty pojazdu, z zakładki Przebieg i przejazdy.',
          },
        ],
      },
      {
        tytul: 'Potwierdzanie i zatwierdzanie',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Kierowca potwierdza swoje trasy',
                opis: 'Do tego czasu trasa ma stan Oczekuje na kierowcę.',
              },
              {
                tytul: 'Sprawdź Typ trasy i Cel trasy',
                opis: 'Służbowa albo Prywatna. Cel: Dostawa towaru, Przejazd bez ładunku, Serwis pojazdu, Przejazd techniczny albo Inne. Złą klasyfikację zmienisz przyciskiem Zmień klasyfikację – do czasu eksportu do FK.',
              },
              {
                tytul: 'Właściciel potwierdza albo odrzuca trasę',
                opis: 'Kilka naraz: zaznaczasz trasy i klikasz Potwierdź zaznaczone.',
              },
              {
                tytul: 'Zatwierdź ewidencję pojazdu',
                opis: 'W Rozliczenia → Ewidencja przebiegu właściciel albo księgowa klika Zatwierdź ewidencję. Gdy kierowcy zalegają z potwierdzeniem, Przypomnij kierowcom wyśle im przypomnienie. Gotową ewidencję pobierzesz w PDF.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Ewidencja przebiegu jest potrzebna do odliczenia 100% VAT od pojazdu zgłoszonego na VAT-26. Pojazd z prywatnymi kilometrami odlicza 50%.',
          },
        ],
      },
      {
        tytul: 'Stawki za kilometr',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Kilometrówkę, diety i kursy NBP zobaczysz w Ustawienia → Stawki z przepisów. Są tylko do podglądu – bierzemy je z przepisów.',
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
    lead: 'Sześć kroków z odnośnikiem do każdego braku. Na końcu zamykasz miesiąc i pobierasz ostateczne pliki.',
    role: ['ksiegowa', 'wlasciciel'],
    gdzie: 'Rozliczenia → Miesiąc',
    czas: 'Kwadrans na miesiąc, gdy wszystko jest na bieżąco',
    zanim: ['Zatwierdzona ewidencja przebiegu każdego pojazdu', 'Zatwierdzone płace i diety kierowców'],
    rozdzialy: [
      {
        tytul: 'Sześć kroków',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Licznik pokazuje, ile kroków jest gotowych. Możesz robić je w dowolnej kolejności – każdy prowadzi tam, gdzie go załatwisz.',
          },
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Faktury sprzedaży' },
              { tytul: 'Koszty', opis: 'Z listą kosztów, którym brakuje dokumentu.' },
              { tytul: 'Ewidencja przebiegu', opis: 'Ile pojazdów ma zatwierdzoną ewidencję.' },
              { tytul: 'Płace i diety', opis: 'Ile rozliczeń kierowców jest zatwierdzonych.' },
              { tytul: 'Deklaracje', opis: 'Co jest do złożenia.' },
              { tytul: 'Zamknij miesiąc i pobierz pliki' },
            ],
          },
        ],
      },
      {
        tytul: 'Co blokuje zamknięcie',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Miesiąca nie zamkniesz, dopóki płace i ewidencja przebiegu nie są zatwierdzone. Koszty bez dokumentu nie blokują – zostają na liście braków.',
          },
          {
            typ: 'akapit',
            tresc:
              'Zamknięcie blokuje zmiany w fakturach, trasach, płacach i zaliczkach z tego miesiąca, a pliki dla biura stają się ostateczne. Zamyka właściciel albo księgowa.',
          },
        ],
      },
      {
        tytul: 'Ponowne otwarcie',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Gdy trzeba coś poprawić, kliknij Otwórz miesiąc ponownie i wpisz, dlaczego otwierasz. Powód trafia do historii firmy, a w sekcji Poprzednie miesiące widać, kiedy i dlaczego miesiąc otwarto.',
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
    lead: 'Jedna paczka za miesiąc, w formacie, który Twoja księgowa wczyta bez przepisywania.',
    role: ['ksiegowa', 'wlasciciel'],
    gdzie: 'Rozliczenia → Eksporty',
    czas: 'Dwie minuty',
    zanim: [
      'Program księgowy ustawiony w Ustawienia → Program księgowy',
      'Zamknięty miesiąc – jeśli pliki mają być ostateczne',
    ],
    rozdzialy: [
      {
        tytul: 'Kto to robi',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Eksporty widzą właściciel i księgowa. Dyspozytor nie ma Rozliczeń w menu.',
          },
        ],
      },
      {
        tytul: 'Paczka dla biura',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Rozliczenia → Eksporty' },
              {
                tytul: 'Kliknij Pobierz paczkę dla biura',
                opis: 'Dostajesz jeden plik ZIP: dekrety FK w formacie programu z ustawień, rejestry, listę płac i delegacje.',
              },
              {
                tytul: 'Sprawdź, czy wersja jest ostateczna',
                opis: 'Przed zamknięciem miesiąca paczka jest robocza. Po zamknięciu jest ostateczna i ma też JPK_V7M – o ile firma jest czynnym podatnikiem VAT.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Pojedyncze pliki',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Plik', 'Co dostajesz'],
            wiersze: [
              ['Dekrety do FK', 'Comarch Optima (XML), Insert GT (EPP) albo Symfonia (TXT z szablonem AMS)'],
              ['Rejestry VAT', 'Excel albo PDF'],
              ['Lista płac i diety', 'Excel albo CSV'],
              ['Delegacje kierowców', 'ZIP'],
              ['Ewidencje przebiegu', 'ZIP'],
              ['Zestawienie do KPiR, JPK_PKPIR', 'Przy podatku na księdze: Excel, CSV, XML'],
              ['Zwrot VAT z UE (VAT-REF)', 'Zestawienie do wniosku'],
              ['JPK_FA', 'XML, tylko na żądanie urzędu skarbowego'],
              ['JPK_V7M', 'Po zamknięciu miesiąca'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Gdy biuro pracuje w innym programie, wybierz w Ustawienia → Program księgowy „Inny program” – dostaniesz plik CSV.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Dekrety do FK wygenerujesz najwyżej trzy razy w miesiącu dla każdego programu – wystarcza na wersję właściwą i dwie poprawki. Paczki dla biura ten limit nie dotyczy. Dekrety są za miesiące zakończone, nie za bieżący.',
          },
          {
            typ: 'akapit',
            tresc:
              'Każdy plik zostaje w Historii plików. Pobierzesz go ponownie przez 30 dni.',
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
    lead: 'Siedem zakładek. Każda pokazuje jedną rzecz, o którą i tak pytasz.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Raporty',
    rozdzialy: [
      {
        tytul: 'Zakładki',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Zakładka', 'Co pokazuje'],
            wiersze: [
              ['Wynik', 'Przychód, koszty i to, co zostaje'],
              ['Klienci', 'Na których klientach zarabiasz'],
              ['Zlecenia i trasy', 'Które zlecenia dają zysk, a które tylko obrót'],
              ['Flota', 'Ile kosztuje każde auto'],
              ['Kierowcy', 'Praca kierowców – tę zakładkę widzi tylko właściciel'],
              ['Koszty', 'Gdzie uciekają pieniądze'],
              ['Należności', 'Kto jeszcze nie zapłacił'],
            ],
          },
        ],
      },
      {
        tytul: 'Okres i porównanie',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Wybierasz miesiąc, kwartał, rok albo własny zakres i porównujesz go z poprzednim okresem albo z tym samym okresem rok temu. Przychód liczysz z faktur albo ze zleceń.',
          },
        ],
      },
      {
        tytul: 'Pobieranie',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Pod przyciskiem Pobierz: PDF do druku, Excel (XLSX) albo CSV z bieżącej zakładki, a także Raport miesięczny (PDF) – wszystkie zakładki za miesiąc w jednym pliku.',
          },
          {
            typ: 'akapit',
            tresc:
              'Ewidencję przebiegu w PDF i pliki dla urzędu znajdziesz w Rozliczeniach, nie w Raportach.',
          },
        ],
      },
    ],
    powiazane: ['przejazdy-i-kilometrowka', 'eksport-dla-ksiegowej'],
  },
];
