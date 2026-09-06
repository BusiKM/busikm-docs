import type { Artykul } from '@/content/pomoc/typy';

/** Zlecenia, dyspozytornia, kontrahenci i faktury — codzienna praca biura. */
export const artykulyZlecenia: Artykul[] = [
  {
    slug: 'nowe-zlecenie',
    kategoria: 'zlecenia',
    tytul: 'Jak wystawić zlecenie',
    lead: 'Pięć kroków kreatora. Wersja robocza zapisuje się sama, więc przerwa na telefon niczego nie kasuje.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Zlecenia → Nowe zlecenie',
    czas: 'Pięć minut przy pierwszym, dwie przy kolejnych',
    zanim: [
      'Kontrahent w bazie — albo dane, z których go dopiszesz',
      'Adresy załadunku i rozładunku',
      'Ustalona stawka frachtu',
    ],
    rozdzialy: [
      {
        tytul: 'Pięć kroków kreatora',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na górze widzisz „Krok X z 5". Między krokami chodzisz przyciskami Wstecz i Dalej — nic nie ginie po drodze, bo formularz zapisuje wersję roboczą w przeglądarce.',
          },
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Kontrahenci',
                opis: 'Nadawca *, Odbiorca *, Płatnik i Ref. zewnętrzna — numer, pod którym zlecenie występuje u klienta. Płatnik bywa kimś innym niż nadawca i to jest normalne.',
              },
              {
                tytul: 'Ładunek',
                opis: 'Opis ładunku *, Waga (kg) *, Liczba palet, Objętość (m³), Wartość ładunku wraz z walutą.',
              },
              {
                tytul: 'Trasa',
                opis: 'Adres od * i Adres do * z miastem, kodem i krajem, a do tego okna czasowe: Data załadunku od/do i Data dostawy od/do. Przy wielu punktach dodajesz kolejne etapy z typem i planowanymi godzinami.',
              },
              {
                tytul: 'Rozliczenie',
                opis: 'Kwota frachtu * i Waluta *, VAT (%), Opłaty dodatkowe, Metoda płatności i Termin płatności (dni) *. Tu też wpisujesz Instrukcje dla klienta oraz Notatki wewnętrzne — te drugie zostają w firmie.',
              },
              {
                tytul: 'Podsumowanie',
                opis: 'Ostatnie spojrzenie na całość. Zatwierdzasz przyciskiem Utwórz zlecenie.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Przydzielenie kierowcy',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Utworzone zlecenie trafia na listę bez kierowcy. Przydzielasz go z listy zleceń albo z dyspozytorni — kierowca dostaje powiadomienie na telefon i widzi zlecenie w sekcji „Do akceptacji".',
          },
          {
            typ: 'akapit',
            tresc:
              'Kilka zleceń naraz przydzielisz zaznaczeniem wierszy na liście i akcją zbiorczą — przydaje się przy układaniu całego dnia.',
          },
        ],
      },
    ],
    powiazane: ['dyspozytornia', 'faktura-za-zlecenie', 'trasa-kierowcy'],
  },

  {
    slug: 'dyspozytornia',
    kategoria: 'zlecenia',
    tytul: 'Dyspozytornia na co dzień',
    lead: 'Mapa, aktywne zlecenia i wiadomości w jednym oknie — zamiast dzwonienia po kierowcach.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Dyspozytornia',
    rozdzialy: [
      {
        tytul: 'Co jest na ekranie',
        bloki: [
          {
            typ: 'lista',
            wstep: 'U góry cztery liczniki, które mówią, czy dzień idzie zgodnie z planem:',
            punkty: [
              'Aktywne zlecenia — wszystko, co się teraz dzieje.',
              'Nowe dziś — ile przybyło od rana.',
              'W transporcie — pojazdy w drodze.',
              'Zagrożone ETA — te, które nie zdążą na okno czasowe. Tym zajmij się pierwszym.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Pod licznikami są trzy zakładki: Przegląd z listą zleceń, Tracking z mapą pojazdów i Wiadomości. Kliknięcie zlecenia otwiera panel boczny ze szczegółami — mapa zostaje widoczna.',
          },
        ],
      },
      {
        tytul: 'Reagowanie na opóźnienie',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w licznik Zagrożone ETA' },
              {
                tytul: 'Otwórz zlecenie i sprawdź pozycję pojazdu',
                opis: 'Widzisz, gdzie jest kierowca i o ile spóźnia się względem okna.',
              },
              {
                tytul: 'Napisz do kierowcy w zakładce Wiadomości',
                opis: 'Wiadomość dociera do aplikacji w telefonie. Nie musisz dzwonić do jadącego człowieka.',
              },
              {
                tytul: 'Uprzedź klienta',
                opis: 'Lepiej, żeby usłyszał to od Ciebie dwie godziny wcześniej niż od swojego magazynu po fakcie.',
              },
            ],
          },
        ],
      },
    ],
    powiazane: ['nowe-zlecenie', 'trasa-kierowcy'],
  },

  {
    slug: 'kontrahenci',
    kategoria: 'zlecenia',
    tytul: 'Dodawanie kontrahenta',
    lead: 'Raz wpisany kontrahent podpowiada się w zleceniach i fakturach z własną walutą i terminem płatności.',
    role: ['dyspozytor', 'wlasciciel', 'ksiegowa'],
    gdzie: 'Kontrahenci → Nowy kontrahent',
    czas: 'Trzy minuty',
    rozdzialy: [
      {
        tytul: 'Dane firmy',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Kontrahenci i kliknij Nowy kontrahent' },
              {
                tytul: 'Wpisz Nazwa firmy * i NIP',
                opis: 'Przy kontrahencie z Unii kliknij Sprawdź VAT w VIES — system potwierdzi numer w unijnej bazie, zanim wystawisz fakturę bez VAT.',
              },
              {
                tytul: 'Uzupełnij adres',
                opis: 'Ulica i numer, Miasto, Kod pocztowy, Kraj.',
              },
              {
                tytul: 'Zaznacz role',
                opis: 'Nadawca, Odbiorca, Płatnik — jedna firma może pełnić wszystkie trzy. Od tego zależy, gdzie podpowie się w kreatorze zlecenia.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Warunki rozliczeń',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Domyślna waluta * i Domyślny termin płatności (dni) * wchodzą potem do każdej faktury dla tego kontrahenta. Ustaw je raz, zamiast poprawiać co miesiąc.',
          },
          {
            typ: 'lista',
            wstep: 'Warto wypełnić także:',
            punkty: [
              'Email rozliczeń — na ten adres pójdzie faktura, zwykle inny niż kontakt handlowy.',
              'Osoba kontaktowa i Telefon — kto odbiera przy problemie z załadunkiem.',
              'Faktura zbiorcza — gdy klient chce jedną fakturę za miesiąc zamiast dziesięciu.',
            ],
          },
        ],
      },
    ],
    powiazane: ['nowe-zlecenie', 'faktura-za-zlecenie'],
  },

  {
    slug: 'faktura-za-zlecenie',
    kategoria: 'zlecenia',
    tytul: 'Wystawienie faktury',
    lead: 'Od zamkniętego zlecenia do PDF-a w skrzynce klienta.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Faktury sprzedaży → Nowa faktura',
    czas: 'Kilka minut',
    zanim: ['Uzupełnione dane firmy z kontem bankowym', 'Kontrahent z NIP-em w bazie'],
    rozdzialy: [
      {
        tytul: 'Wystawienie',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w Faktury sprzedaży',
                opis: 'Jeśli są zlecenia bez faktury, zobaczysz o tym pasek u góry listy — to najszybsza droga do wystawienia.',
              },
              { tytul: 'Kliknij Nowa faktura' },
              {
                tytul: 'Wybierz Typ faktury * i Kontrahent *',
                opis: 'Reszta danych kontrahenta wpisze się sama, razem z jego walutą i terminem.',
              },
              {
                tytul: 'Ustaw daty',
                opis: 'Data wystawienia *, Data sprzedaży i Termin płatności *. Termin możesz podać w dniach — data policzy się sama.',
              },
              {
                tytul: 'Dodaj Pozycje faktury',
                opis: 'Nazwa usługi, ilość, cena i stawka VAT. Razem netto i Razem brutto liczą się na bieżąco pod tabelą.',
              },
              {
                tytul: 'Przy walucie obcej sprawdź kurs',
                opis: 'Waluta *, Kurs do PLN, Tabela NBP i Data kursu NBP wypełniają się z kursu NBP z dnia poprzedzającego wystawienie. Możesz je nadpisać, jeśli umowa mówi inaczej.',
              },
              {
                tytul: 'Dopisz notatki, jeśli trzeba',
                opis: 'Notatki (widoczne na fakturze) trafiają na dokument. Notatki wewnętrzne (niewidoczne dla klienta) zostają u Ciebie.',
              },
              { tytul: 'Zapisz fakturę' },
            ],
          },
        ],
      },
      {
        tytul: 'Wysyłka i płatność',
        bloki: [
          {
            typ: 'lista',
            wstep: 'Z listy faktur, pod przyciskiem akcji przy wierszu:',
            punkty: [
              'Pobierz PDF — dokument gotowy do wydruku.',
              'Wyślij email — z polem CC i własnym tematem, jeśli chcesz zmienić domyślny.',
              'Oznacz zapłaconą — po zaksięgowaniu przelewu.',
              'Anuluj fakturę — z podaniem powodu.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Zakładki nad listą filtrują to, co najważniejsze: Należności, Opłacona, Po terminie, Anulowana. „Po terminie" to lista telefonów do wykonania w tym tygodniu.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Przypomnienie o płatności wysyłasz z tej samej listy — nie musisz pisać maila od zera ani szukać, komu już przypomniałeś.',
          },
        ],
      },
      {
        tytul: 'Faktura zbiorcza',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Gdy klient chce jedną fakturę za wiele zleceń, użyj trybu zbiorczego: wskazujesz kontrahenta i okres, system pokazuje listę niezafakturowanych zleceń, a Ty zatwierdzasz podsumowanie.',
          },
        ],
      },
    ],
    powiazane: ['kontrahenci', 'eksport-dla-ksiegowej'],
  },
];
