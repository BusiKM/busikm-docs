import type { Artykul } from '@/content/pomoc/typy';

/** Zlecenia, dyspozytornia, kontrahenci i faktury – codzienna praca biura. */
export const artykulyZlecenia: Artykul[] = [
  {
    slug: 'nowe-zlecenie',
    kategoria: 'zlecenia',
    tytul: 'Jak wystawić zlecenie',
    lead: 'Cztery kroki kreatora. Szkic zapisuje się sam na tym urządzeniu, więc przerwa na telefon niczego nie kasuje.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Zlecenia → Nowe zlecenie',
    czas: 'Pięć minut przy pierwszym, dwie przy kolejnych',
    zanim: [
      'Kontrahent w bazie – albo dane, z których go dopiszesz',
      'Adresy załadunku i rozładunku',
      'Ustalona stawka frachtu',
    ],
    rozdzialy: [
      {
        tytul: 'Cztery kroki kreatora',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na dole widzisz „Krok X z 4”. Między krokami chodzisz przyciskami Wstecz i Dalej, a wszystko zmienisz później. Szkic zapisuje się w przeglądarce na tym urządzeniu i znika, gdy utworzysz zlecenie.',
          },
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Klient',
                opis: 'Kto zleca przewóz: Klient, Płatnik i Numer zlecenia klienta. Płatnik bywa kimś innym niż klient i to jest normalne. W sekcji Zacznij szybciej wystartujesz od poprzedniego zlecenia.',
              },
              {
                tytul: 'Trasa',
                opis: 'Postoje w kolejności jazdy. Każdy to Załadunek albo Rozładunek, z adresem, dniem i godzinami okna, numerem referencyjnym i osobą na miejscu.',
              },
              {
                tytul: 'Ładunek',
                opis: 'Opis ładunku, Waga (kg), Palety EUR, Metry ładowne (LDM), Objętość (m³) i Wartość towaru. Do tego kontrolowana temperatura, towar niebezpieczny (ADR) i wymiana palet, jeśli dotyczą.',
              },
              {
                tytul: 'Cena i warunki',
                opis: 'Fracht netto i Waluta, Termin płatności (dni) z karty klienta i Forma płatności. Tu wpisujesz też Uwagi dla kierowcy – zobaczy je w aplikacji – i Notatkę wewnętrzną, którą widzi tylko biuro.',
              },
              {
                tytul: 'Utwórz zlecenie',
                opis: 'Albo od razu Utwórz i przypisz kierowcę – przejdziesz prosto do przypisania w Dyspozytorni.',
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
              'Kierowcę i auto przypisujesz w Dyspozytorni (Przypisz) albo w karcie zlecenia (Przypisz kierowcę). Panel pokazuje, kto zdąży na załadunek, i oznacza polecane auto. Przycisk Przypisz i powiadom wysyła kurs do aplikacji kierowcy, z trasą i oknami.',
          },
          {
            typ: 'akapit',
            tresc:
              'Kierowca przyjmuje zlecenie w aplikacji albo je odrzuca z powodem. Do tego czasu na liście widzisz „Czeka na kierowcę”. Bez odpowiedzi przez 4 godziny zlecenie wraca do szkiców bez kierowcy.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Gdy żadne auto nie zdąży, oddasz kurs przewoźnikowi – w ostatnim kroku kreatora (Oddaj przewoźnikowi) albo z karty zlecenia.',
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
    lead: 'Kolejka spraw, mapa floty i plan floty w jednym miejscu – zamiast dzwonienia po kierowcach.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Dyspozytornia',
    rozdzialy: [
      {
        tytul: 'Co jest na ekranie',
        bloki: [
          {
            typ: 'lista',
            wstep: 'U góry liczniki, które mówią, czy dzień idzie zgodnie z planem:',
            punkty: [
              'Załadunki dziś i Rozładunki dziś.',
              'W trasie – auta w drodze.',
              'Do przypisania – kursy bez kierowcy.',
              'Wolne auta.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Pod licznikami jest kolejka z zakładkami Wymaga reakcji (od niej zaczynaj), Do przypisania i W trasie, a obok mapa floty z filtrem Wszystkie, W trasie, Wolne i Serwis. Niżej plan floty na 3 dni albo tydzień. Na telefonie przełączasz się między Listą, Mapą i Planem floty.',
          },
          {
            typ: 'uwaga',
            tresc: 'Mapa floty na żywo jest w planie Firma.',
          },
        ],
      },
      {
        tytul: 'Reagowanie na opóźnienie',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Zajrzyj w zakładkę Wymaga reakcji',
                opis: 'Spóźnienie pojawia się tam samo: „spóźni się N min”, z godziną dojazdu i końcem okna rozładunku. Godzinę dojazdu liczymy z pozycji auta.',
              },
              {
                tytul: 'Kliknij Powiadom klienta',
                opis: 'E-mail idzie na adres z karty kontrahenta. Lepiej, żeby klient usłyszał to od Ciebie dwie godziny wcześniej niż od swojego magazynu po fakcie.',
              },
              {
                tytul: 'Napisz do kierowcy',
                opis: 'Odpowiedz otwiera czat w karcie zlecenia. Wiadomość dociera do aplikacji w telefonie – nie musisz dzwonić do jadącego człowieka.',
              },
              {
                tytul: 'Zmień termin, jeśli trzeba',
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
    gdzie: 'Kontrahenci → Dodaj kontrahenta',
    czas: 'Dwie minuty',
    rozdzialy: [
      {
        tytul: 'Dane firmy',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Kontrahenci i kliknij Dodaj kontrahenta' },
              {
                tytul: 'Wybierz rodzaj firmy',
                opis: 'Firma z Polski, Firma z UE albo Bez NIP.',
              },
              {
                tytul: 'Wpisz NIP i kliknij Pobierz dane',
                opis: 'Polski NIP sprawdzamy w GUS i na Białej Liście MF, numer VAT UE w VIES. Widzisz też status VAT. Gdy rejestr nie odpowiada, wybierz Wpiszę ręcznie.',
              },
              {
                tytul: 'Zaznacz, co robicie razem',
                opis: 'Klient, Przewoźnik albo Dostawca. Przy przewoźniku dochodzi polisa OCP i licencja.',
              },
              {
                tytul: 'Dodaj osobę do kontaktu',
                opis: 'Nieobowiązkowo – kto odbiera przy problemie z załadunkiem.',
              },
              { tytul: 'Kliknij Zapisz kontrahenta' },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Jeśli ta firma już jest w BusiKM, formularz to wykryje – kontrahent nie powstanie drugi raz.',
          },
        ],
      },
      {
        tytul: 'Warunki rozliczeń',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Termin płatności (domyślnie 30 dni) i Waluta – z kraju firmy, możesz zmienić – podpowiadają się potem na fakturach. Ustaw je raz, zamiast poprawiać co miesiąc.',
          },
          {
            typ: 'lista',
            wstep: 'Warto wypełnić także:',
            punkty: [
              'E-mail do faktur – na ten adres pójdzie faktura, zwykle inny niż kontakt handlowy.',
              'Osobę do kontaktu z telefonem – gdy coś pójdzie nie tak na miejscu.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Gdy klient chce jedną fakturę za wiele zleceń, kliknij Faktura zbiorcza w podglądzie kontrahenta na liście.',
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
    lead: 'Od dostarczonego zlecenia do faktury w KSeF i PDF-a w skrzynce klienta.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Faktury → Nowa faktura',
    czas: 'Kilka minut',
    zanim: [
      'Uzupełnione dane firmy z kontem bankowym',
      'Kontrahent z NIP-em w bazie',
      'Połączenie z KSeF w Ustawienia → KSeF',
    ],
    rozdzialy: [
      {
        tytul: 'Wystawienie',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w Faktury i kliknij Nowa faktura',
                opis: 'Albo w karcie zlecenia wybierz Wystaw fakturę – powstanie szkic z danymi zlecenia.',
              },
              {
                tytul: 'Wybierz Ze zleceń',
                opis: 'Zaznaczasz dostarczone zlecenia, a klient, trasa, fracht, waluta i kurs przechodzą same. Do wyboru jest też pusta faktura sprzedaży, zaliczkowa, proforma do przedpłaty i faktura rozliczająca zaliczki.',
              },
              {
                tytul: 'Sprawdź rodzaj transakcji i VAT',
                opis: 'Klient z Polski, firma z innego kraju UE, firma spoza UE, przewóz spoza lub poza UE albo krajowe odwrotne obciążenie.',
              },
              {
                tytul: 'Sprawdź daty',
                opis: 'Data sprzedaży to domyślnie dzień zakończenia zlecenia. Termin płatności liczy się od daty wystawienia, a liczbę dni bierzemy z karty klienta.',
              },
              {
                tytul: 'Przy walucie obcej sprawdź kurs',
                opis: 'Kurs NBP bierzemy z ostatniego dnia roboczego przed datą sprzedaży. Możesz wpisać inny, jeśli umowa mówi inaczej.',
              },
              {
                tytul: 'Kliknij Wystaw i wyślij do KSeF',
                opis: 'Faktura dostaje numer i od razu idzie do KSeF. Bez połączenia z KSeF przycisk nazywa się Wystaw fakturę. Niegotową fakturę zostawisz jako szkic.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Wysyłka do klienta i płatność',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na fakturze kliknij Wyślij klientowi. Przy fakturze w KSeF wybierasz Wyślij po nadaniu numeru – mail z PDF-em i kodem QR wyjdzie, gdy KSeF nada numer. Adres podpowiada się z karty klienta.',
          },
          {
            typ: 'akapit',
            tresc:
              'Na karcie faktury widzisz jej drogę: Wystawiona, W KSeF, U klienta, Zapłacona.',
          },
          {
            typ: 'lista',
            wstep: 'Na fakturze, w przyciskach i w menu Więcej akcji:',
            punkty: [
              'Zarejestruj wpłatę – kwota, data i forma wpłaty.',
              'Wyślij ponownie PDF – gdy klient zgubił maila.',
              'Wystaw korektę – faktury z KSeF nie anulujesz ani nie usuniesz, zmieniasz ją korektą.',
              'Powiel jako nową fakturę – gdy kolejna jest prawie taka sama.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Zakładki nad listą filtrują to, co najważniejsze: Szkice, Do wysłania do KSeF, Do zapłaty, Po terminie, Zapłacone i Korekty. „Po terminie” to lista telefonów do wykonania w tym tygodniu.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Przypomnienia o płatności układamy codziennie – 3 dni przed terminem oraz 7 i 14 dni po nim. Nic nie wychodzi samo: przeglądasz je pod przyciskiem Przypomnienia na liście faktur i wysyłasz zaznaczone.',
          },
        ],
      },
      {
        tytul: 'Faktura zbiorcza',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Gdy klient chce jedną fakturę za wiele zleceń, wybierz Nowa faktura → Ze zleceń i zaznacz zlecenia albo kliknij Faktura zbiorcza w podglądzie kontrahenta. Przy kilku klientach naraz ustawiasz, czy faktura ma być jedna na klienta i walutę, czy osobna na każde zlecenie.',
          },
        ],
      },
    ],
    powiazane: ['kontrahenci', 'eksport-dla-ksiegowej'],
  },
];
