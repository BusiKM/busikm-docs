import type { Artykul } from '@/content/pomoc/typy';

/** Koszty, flota i terminy – to, co pilnuje się w tle i mści przy kontroli. */
export const artykulyKoszty: Artykul[] = [
  {
    slug: 'koszty-w-biurze',
    kategoria: 'koszty',
    tytul: 'Sprawdzanie kosztów',
    lead: 'Kompletny koszt liczy się sam. Ty zajmujesz się tylko tym, czego brakuje albo co wymaga sprawdzenia.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Koszty',
    czas: 'Kilkanaście minut tygodniowo',
    rozdzialy: [
      {
        tytul: 'Stany kosztu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Nie ma osobnej akceptacji: koszt z kompletem danych od razu jest Gotowy i wchodzi do wyniku. Zakładki nad listą pokazują, gdzie jest każdy dokument, a licznik przy „Koszty” w menu – ile czeka na Ciebie.',
          },
          {
            typ: 'tabela',
            naglowki: ['Zakładka', 'Co to znaczy'],
            wiersze: [
              ['Do uzupełnienia', 'Czegoś brakuje albo coś trzeba sprawdzić – np. kwoty, rodzaju kosztu, możliwego duplikatu'],
              ['Gotowe', 'Komplet danych, koszt liczy się w wyniku'],
              ['Zaksięgowane', 'Poszło do księgowej'],
              ['Do zwrotu kierowcom', 'Kierowca zapłacił z własnych pieniędzy'],
            ],
          },
        ],
      },
      {
        tytul: 'Sprawdzenie kosztu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Otwórz zakładkę Do uzupełnienia' },
              {
                tytul: 'Otwórz koszt',
                opis: 'Obok kwot i danych widzisz zdjęcie dokumentu – to, które zrobił kierowca. Nie musisz szukać papieru.',
              },
              {
                tytul: 'Rozstrzygnij, czego brakuje',
                opis: 'Na górze jest karta dla każdego powodu, z gotowymi przyciskami – na przykład Zapisz z pojazdem, Kwota się zgadza, Popraw kwotę albo To ten sam, zostaw jeden.',
              },
              {
                tytul: 'Gdy coś jest niejasne, kliknij Zapytaj kierowcę',
                opis: 'Pytanie trafia do jego aplikacji, a przy koszcie ze zlecenia także do czatu zlecenia. Kierowca odpowiada albo robi zdjęcie jeszcze raz.',
              },
              {
                tytul: 'Prywatny zakup usuń przyciskiem To nie koszt firmy',
                opis: 'Z podaniem powodu. Usunięte koszty znajdziesz w filtrze Usunięte i możesz je przywrócić.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Przy większej liczbie dokumentów zaznacz kilka wierszy i zmień rodzaj, przypisz pojazd albo zlecenie wszystkim naraz.',
          },
        ],
      },
      {
        tytul: 'Skąd biorą się koszty',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Od kierowców – zdjęcie paragonu z aplikacji, w trasie.',
              'Z KSeF – faktury kosztowe pobieramy codziennie o 6:00, nie musisz ich dodawać.',
              'Z maila – faktury przesłane na adres Twojej firmy w BusiKM.',
              'Z karty paliwowej – faktura zbiorcza dzielona na tankowania.',
              'Dodane w biurze – w Koszty → Dodaj koszt wgrywasz pliki albo wpisujesz koszt bez pliku.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Sprzedawcę, kwoty, stawkę VAT i datę odczytuje AI, a BusiKM sprawdza wynik. Każdy plik to osobny koszt.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Koszt w obcej walucie przelicza się kursem NBP z dnia przed datą wystawienia dokumentu. Gdy kursu brakuje, koszt trafia do uzupełnienia z prośbą o wpisanie kursu.',
          },
        ],
      },
      {
        tytul: 'Zamknięcie miesiąca kosztów',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Przycisk Miesiąc nad listą prowadzi do zestawienia miesiąca. Zamkniesz go, gdy nic nie zostało do uzupełnienia – zwroty kierowcom nie blokują. Po zamknięciu koszty z tego miesiąca są tylko do odczytu, a dokument, który dojdzie później, trafia na listę Po zamknięciu.',
          },
          {
            typ: 'akapit',
            tresc:
              'Miesiąc zamyka księgowa, a właściciel – gdy firma nie ma księgowej w BusiKM. Ponowne otwarcie wymaga podania powodu i zostaje w historii.',
          },
        ],
      },
    ],
    powiazane: ['paragony-kierowcy', 'eksport-dla-ksiegowej'],
  },

  {
    slug: 'dokumenty-i-terminy',
    kategoria: 'koszty',
    tytul: 'Dokumenty i terminy',
    lead: 'OC, przegląd, badania kierowcy i karta kierowcy w jednym miejscu – z przypomnieniem, zanim wygasną.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Dokumenty',
    czas: 'Godzina raz, potem samo pilnuje',
    rozdzialy: [
      {
        tytul: 'Dodanie dokumentu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w Dokumenty i kliknij Dodaj dokument',
                opis: 'Możesz też dodać go w karcie pojazdu (Terminy i dokumenty) albo kierowcy (Dokumenty i uprawnienia).',
              },
              {
                tytul: 'Wgraj zdjęcie albo PDF',
                opis: 'Rodzaj, numer, daty i to, czego dokument dotyczy, odczytamy. Ty sprawdzasz.',
              },
              {
                tytul: 'Sprawdź pole Ważny do',
                opis: 'To sedno – bez daty dokument leży, ale nikt o nim nie przypomni.',
              },
              { tytul: 'Kliknij Zapisz dokument' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Po odnowieniu polisy otwierasz dokument i klikasz Dodaj nową wersję – poprzednia zostaje w historii.',
          },
        ],
      },
      {
        tytul: 'Co pilnujemy',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Przy pojeździe', 'Przy kierowcy'],
            wiersze: [
              ['Dowód rejestracyjny, umowa leasingu', 'Prawo jazdy'],
              ['Polisa OC, polisa AC, zielona karta', 'Kod 95'],
              ['Badanie techniczne', 'Badania lekarskie i psychotesty'],
              ['Legalizacja tachografu', 'Karta kierowcy'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Przy firmie: licencja wspólnotowa i wypisy, zezwolenie na wykonywanie zawodu przewoźnika, certyfikat kompetencji zawodowych, zabezpieczenie finansowe, polisa OCP i odpis z KRS.',
          },
          {
            typ: 'akapit',
            tresc:
              'Ekran Dokumenty pokazuje, co jest po terminie, czego brakuje i co kończy się w ciągu 30 dni – osobno dla firmy, pojazdów i kierowców. Pobierz komplet przygotuje zestaw dla klienta albo na kontrolę auta.',
          },
          {
            typ: 'akapit',
            tresc:
              'Przypominamy 60, 30, 14 i 3 dni przed terminem oraz w dniu terminu – w aplikacji i mailem, właścicielowi i dyspozytorowi. Mail przychodzi raz dziennie rano, tylko gdy coś się zmieniło. Kanały ustawisz w Ustawienia → Powiadomienia.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Najdroższa data w firmie transportowej to ta, o której nikt nie wiedział. Wgraj dokumenty raz – kolejny raz to już tylko nowa wersja po odnowieniu polisy.',
          },
        ],
      },
    ],
    powiazane: ['dodajemy-pojazd', 'czas-pracy-kierowcy'],
  },
];
