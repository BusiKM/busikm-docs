import type { Artykul } from '@/content/pomoc/typy';

/**
 * Instrukcje dotyczące kierowców – od zaproszenia po zamknięty dzień pracy.
 *
 * Nazwy przycisków przepisane z aplikacji, nie wymyślone. Gdy w kodzie
 * przycisk nazywa się „Wyślij paragon", tu też tak się nazywa – instrukcja,
 * która każe szukać „Dodaj dokument", jest bezużyteczna.
 */
export const artykulyKierowcy: Artykul[] = [
  {
    slug: 'zapraszamy-kierowce',
    kategoria: 'kierowcy',
    tytul: 'Jak dodać kierowcę',
    lead: 'Wysyłasz zaproszenie mailem. Kierowca dostaje kod i sam ustawia hasło – nie znasz go i nie musisz.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Kierowcy → Zaproś kierowcę',
    czas: 'Dwie minuty u Ciebie, reszta po jego stronie',
    zanim: ['Adres e-mail kierowcy – na ten adres pójdzie zaproszenie'],
    rozdzialy: [
      {
        tytul: 'Wysłanie zaproszenia',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w Kierowcy w menu po lewej',
                opis: 'Zobaczysz listę osób, które już masz w firmie.',
              },
              { tytul: 'Kliknij Zaproś kierowcę' },
              {
                tytul: 'Wpisz Adres e-mail',
                opis: 'To jedyne pole obowiązkowe. Reszta danych uzupełni się, gdy kierowca przyjmie zaproszenie.',
              },
              {
                tytul: 'Dopisz Wiadomość (opcjonalnie)',
                opis: 'Kierowca zobaczy ją w mailu. Przydaje się, gdy zaprasza się kogoś, kto nie spodziewa się wiadomości od nieznanego nadawcy.',
              },
              { tytul: 'Wyślij zaproszenie' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Kierowca dostaje e-mail z 8-znakowym kodem zaproszenia, np. K7QM-4RTZ. W aplikacji BusiKM Kierowca wybiera Mam zaproszenie, wpisuje e-mail i kod, a potem ustawia własne hasło (imię i nazwisko – tylko jeśli ich nie wpisałeś). Do tego czasu widnieje na Twojej liście jako zaproszony.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Hasła kierowcy nie znasz i nie możesz go odczytać. Jeśli kierowca je zgubi, korzysta z „Nie pamiętasz hasła?" na ekranie logowania – nie musisz nic robić.',
          },
        ],
      },
      {
        tytul: 'Gdy zaproszenie nie dochodzi',
        bloki: [
          {
            typ: 'lista',
            wstep: 'Zanim wyślesz drugie, sprawdź po kolei:',
            punkty: [
              'Czy adres jest wpisany bez literówki – najczęstsza przyczyna.',
              'Folder ze spamem u kierowcy. Zaproszenie przychodzi od BusiKM, nie od Ciebie.',
              'Czy kierowca nie ma już konta w innej firmie na tym adresie.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Jeśli nic z tego nie pomogło, napisz do nas – widzimy po swojej stronie, czy wiadomość wyszła i co się z nią stało.',
          },
        ],
      },
    ],
    powiazane: ['kierowca-pierwsze-logowanie', 'zespol-i-role'],
  },

  {
    slug: 'kierowca-pierwsze-logowanie',
    kategoria: 'kierowcy',
    tytul: 'Pierwsze logowanie kierowcy',
    lead: 'Co kierowca robi na swoim telefonie, żeby wejść do aplikacji.',
    role: ['kierowca'],
    gdzie: 'Aplikacja BusiKM Kierowca',
    czas: 'Pięć minut',
    zanim: ['E-mail z kodem zaproszenia od pracodawcy', 'Telefon z Androidem albo iPhone'],
    rozdzialy: [
      {
        tytul: 'Wejście do aplikacji',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Zainstaluj aplikację BusiKM Kierowca z odnośnika w zaproszeniu' },
              { tytul: 'Otwórz aplikację i wybierz Mam zaproszenie' },
              {
                tytul: 'Wpisz e-mail i kod zaproszenia',
                opis: 'Adres, na który przyszło zaproszenie, i 8-znakowy kod z maila, np. K7QM-4RTZ. Wybierz Dalej, sprawdź nazwę firmy i wybierz Dołączam.',
              },
              {
                tytul: 'Ustaw własne hasło',
                opis: 'Hasło wymyśl sam – nikt w firmie go nie zobaczy. Imię i nazwisko wpisujesz tylko wtedy, gdy szef ich nie wpisał. Na koniec wybierz Załóż konto i wejdź.',
              },
              {
                tytul: 'Zgódź się na dostęp do lokalizacji i powiadomień',
                opis: 'Bez lokalizacji trasa nie zapisze się sama i trzeba będzie wpisywać kilometry ręcznie. Powiadomienia to sposób, w jaki dostajesz nowe zlecenia i przypomnienia o przerwie.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Zgódź się na lokalizację podczas używania aplikacji. Na iPhonie po pierwszym kursie wybierz jeszcze „Zawsze" – trasa zapisze się nawet, gdy system zamknie aplikację.',
          },
          {
            typ: 'akapit',
            tresc:
              'Kod wpisujesz tylko raz. Następnym razem logujesz się e-mailem i hasłem: Kontynuuj z e-mailem na ekranie startowym.',
          },
        ],
      },
      {
        tytul: 'Co widzisz w aplikacji',
        bloki: [
          {
            typ: 'lista',
            wstep: 'Na dole ekranu masz pięć zakładek:',
            punkty: [
              'Dziś – bieżący kurs z przyciskami Nawiguj, Zadzwoń i Czat, jeden przycisk na kolejny etap dnia i informacja, za ile przerwa. Tu przyjmujesz też nowe zlecenia.',
              'Zlecenia – Aktywne, Oczekujące i Zakończone.',
              'Dodaj – aparat: zdjęcie paragonu albo dokumentu zlecenia (CMR, WZ).',
              'Czat – rozmowy z biurem przy każdym zleceniu.',
              'Ja – Moje koszty i zwroty, Dokumenty, Czas pracy, Urlopy, Do wysłania i ustawienia.',
            ],
          },
        ],
      },
      {
        tytul: 'Gdy zapomnisz hasła',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Na ekranie logowania wybierz Nie pamiętasz hasła?' },
              { tytul: 'Wpisz swój adres e-mail' },
              { tytul: 'Wpisz kod z maila i ustaw nowe hasło' },
            ],
          },
          {
            typ: 'akapit',
            tresc: 'Nie musisz o to prosić właściciela ani dyspozytora – robisz to sam.',
          },
        ],
      },
    ],
    powiazane: ['trasa-kierowcy', 'paragony-kierowcy'],
  },

  {
    slug: 'trasa-kierowcy',
    kategoria: 'kierowcy',
    tytul: 'Jak kierowca prowadzi trasę',
    lead: 'Od przyjęcia zlecenia do potwierdzonego rozładunku – jeden przycisk na każdy etap dnia.',
    role: ['kierowca'],
    gdzie: 'Aplikacja BusiKM Kierowca → Dziś',
    czas: 'Kilka tapnięć w ciągu dnia',
    rozdzialy: [
      {
        tytul: 'Przyjęcie zlecenia',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Otwórz nowe zlecenie na ekranie Dziś albo w Zlecenia → Oczekujące',
                opis: 'Zobaczysz trasę, godziny i towar. Powiadomienie przychodzi także wtedy, gdy aplikacja jest zamknięta.',
              },
              {
                tytul: 'Wybierz Przyjmij',
                opis: 'Dyspozytor widzi u siebie, że je przyjąłeś, i przestaje dzwonić z pytaniem.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Start dnia i załadunek',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wybierz Zacznij dzień i zrób zdjęcie licznika',
                opis: 'Otworzy się ekran Licznik na start. Stan licznika odczyta się sam ze zdjęcia – sprawdź go i wybierz Potwierdź i rozpocznij. Od tej chwili trasa zapisuje się w tle, a kilometry liczą się same.',
              },
              {
                tytul: 'Wybierz Nawiguj',
                opis: 'Trasa ze zlecenia otwiera się w Apple Maps, Google Maps albo Waze. Aplikację wybierasz raz, zmienisz ją w ustawieniach. Działa z CarPlay i Android Auto.',
              },
              {
                tytul: 'Na miejscu wybierz Jestem na załadunku',
                opis: 'Część statusów zmienia się sama, gdy dojedziesz na miejsce.',
              },
              { tytul: 'Wybierz Zacznij załadunek' },
              { tytul: 'Podaj wagę załadowaną i wybierz Zapisz wagę' },
              {
                tytul: 'Zbierz podpis nadawcy na e-CMR',
                opis: 'Podpis jest zawsze wymagany. Nadawca rysuje go palcem na ekranie.',
              },
              {
                tytul: 'Dodaj plombę i zdjęcia towaru, jeśli trzeba',
                opis: 'To opcjonalne. Zdjęcia – do dwóch – wysyłają się w tle. Nie musisz czekać, aż się prześlą, ani mieć zasięgu w tej chwili.',
              },
              { tytul: 'Wybierz Zakończ załadunek i potwierdź Tak, zakończ' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Status zlecenia zmienia się na „W trasie". Nawigację do rozładunku otwierasz tym samym przyciskiem Nawiguj, a BusiKM zapisuje przejazd w tle.',
          },
          {
            typ: 'akapit',
            tresc:
              'Stajesz na prywatną przerwę? Na ekranie Dziś wybierz Wstrzymaj – zapis trasy stanie do czasu, aż wybierzesz Wznów.',
          },
        ],
      },
      {
        tytul: 'Rozładunek',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na miejscu wybierz Jestem na rozładunku, potem Zacznij rozładunek. Wpisz nazwisko odbiorcy, zbierz jego podpis na e-CMR i wybierz Zakończ rozładunek. Otworzy się ekran Licznik na koniec: zrób zdjęcie licznika i wybierz Potwierdź i zakończ. Dyspozytor widzi to od razu. Potem wybierz Rozpocznij powrót do bazy, a na miejscu Jestem w bazie.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Brak zasięgu niczego nie blokuje. Zdjęcia, podpisy i potwierdzenia czekają w kolejce (Ja → Do wysłania) i wysyłają się same, gdy zasięg wróci. Możesz jechać dalej.',
          },
        ],
      },
      {
        tytul: 'Gdy coś idzie nie tak',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na ekranie Dziś, pod kursem, jest „Nie mogę kontynuować". Wybierasz powód: Awaria auta, Wypadek, Choroba, Odbiorca zamknięty albo Inny powód. Kurs się wstrzymuje, a biuro dostaje powiadomienie – bez telefonu. Opóźnienie, na przykład korek, zgłaszasz przyciskiem Zgłoś w szczegółach zlecenia.',
          },
        ],
      },
    ],
    powiazane: ['czas-pracy-kierowcy', 'paragony-kierowcy'],
  },

  {
    slug: 'paragony-kierowcy',
    kategoria: 'kierowcy',
    tytul: 'Paragon ze zdjęcia',
    lead: 'Kierowca robi zdjęcie i wybiera rodzaj kosztu, a kwotę, datę i sprzedawcę BusiKM odczytuje sam. Reklamówka pod siedzeniem przestaje być potrzebna.',
    role: ['kierowca', 'ksiegowa'],
    gdzie: 'Aplikacja BusiKM Kierowca → Dodaj',
    czas: 'Kilkanaście sekund na paragon',
    rozdzialy: [
      {
        tytul: 'Dodanie paragonu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Dotknij Dodaj na dolnym pasku',
                opis: 'Otworzy się aparat. Tę samą drogę masz w Ja → Moje koszty i zwroty → Dodaj paragon.',
              },
              {
                tytul: 'Zrób zdjęcie paragonu',
                opis: 'Połóż go na płaskim, tak żeby mieścił się w kadrze w całości.',
              },
              {
                tytul: 'Wybierz rodzaj kosztu',
                opis: 'Na start są paliwo, parking, opłaty drogowe, mycie, hotel kierowcy, prom, serwis i naprawy, opłata za załadunek lub rozładunek i inne. Listę zmienia firma.',
              },
              {
                tytul: 'Wybierz, czym zapłacono',
                opis: 'Karta firmowa, karta paliwowa, gotówka firmowa albo moje pieniądze. Za koszt z własnej kieszeni biuro odda Ci pieniądze – zobaczysz to w Moich kosztach.',
              },
              {
                tytul: 'Wybierz zlecenie',
                opis: 'Albo Bez zlecenia, jeśli koszt nie dotyczy kursu.',
              },
              { tytul: 'Wybierz Wyślij paragon' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Kwotę, datę, sprzedawcę i NIP sprzedawcy BusiKM odczytuje sam po wysłaniu – nie musisz niczego przepisywać ani czekać. Bez zasięgu paragon czeka w kolejce Do wysłania i wysyła się, gdy wróci sieć.',
          },
        ],
      },
      {
        tytul: 'Co się dzieje dalej',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'W Moich kosztach kierowca widzi każdy paragon ze statusem: Do uzupełnienia, Gotowe albo Zaksięgowane. Gdy biuro ma pytanie, paragon dostaje status Biuro pyta – kierowca odpowiada i poprawia w aplikacji. Jeśli zdjęcie wyszło nieczytelne, wystarczy zrobić je jeszcze raz.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Koszty w obcych walutach przeliczają się kursem z dnia poprzedzającego wystawienie dokumentu. Kierowca nie musi nic przeliczać ani pamiętać kursu.',
          },
        ],
      },
    ],
    powiazane: ['koszty-w-biurze', 'eksport-dla-ksiegowej'],
  },

  {
    slug: 'czas-pracy-kierowcy',
    kategoria: 'kierowcy',
    tytul: 'Czas pracy, przerwy i odpoczynek',
    lead: 'Jazda i praca zapisują się same, przerwę i odpoczynek włączasz jednym przyciskiem. Przy przewozie międzynarodowym telefon przypomina o przerwie 15 minut wcześniej.',
    role: ['kierowca', 'wlasciciel'],
    gdzie: 'Aplikacja BusiKM Kierowca → Ja → Czas pracy',
    rozdzialy: [
      {
        tytul: 'Co liczy się samo',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Jazda i praca zmieniają się same według etapu zlecenia. Przerwę i odpoczynek zapisujesz sam przyciskami Przerwa i Odpoczynek.',
          },
          {
            typ: 'lista',
            wstep: 'Przy przewozie międzynarodowym ekran Czas pracy pokazuje:',
            punkty: [
              'Trzy wskaźniki: jazdę ciągłą, dzienną i tydzień – każdy z limitem, do którego się zbliżasz.',
              'Pasek Dwa tygodnie.',
              'Pasek dnia z podziałem na jazdę, pracę, przerwę i odpoczynek.',
              'Bieżący stan i od której godziny trwa.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'W kraju ekran nazywa się Mój czas pracy i pokazuje podsumowanie miesiąca: czas pracy wobec normy, jazdę, dni pracy, nadgodziny, porę nocną i nieobecności. Pod spodem jest zasada: do 8 h pracy na dobę i co najmniej 11 h odpoczynku.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Liczniki liczy serwer. Bez sieci ostatni znany stan widzisz na ekranie Dziś, na pasku przerwy – sam ekran Czas pracy pobiera dane z serwera i odświeży się, gdy wróci sieć. Przerwy i odpoczynki zapisane bez zasięgu czekają w kolejce i dochodzą, gdy wróci sygnał.',
          },
        ],
      },
      {
        tytul: 'Rejestracja ręczna',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Przerwę i odpoczynek zapisujesz w sekcji Zarejestruj ręcznie – są tam tylko dwa przyciski: Przerwa i Odpoczynek. Jazdę i pracę aplikacja zapisuje sama według etapu zlecenia.',
          },
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Otwórz Ja → Czas pracy' },
              { tytul: 'Zjedź do sekcji Zarejestruj ręcznie' },
              { tytul: 'Wybierz Przerwa albo Odpoczynek' },
            ],
          },
        ],
      },
      {
        tytul: 'Czego BusiKM nie robi',
        bloki: [
          {
            typ: 'uwaga',
            tresc:
              'BusiKM nie zastępuje tachografu. Tachograf zapisuje i jest urządzeniem wymaganym prawem; BusiKM pokazuje to samo w telefonie i przypomina wcześniej. To dwa osobne obowiązki i jedno nie zwalnia z drugiego.',
          },
        ],
      },
    ],
    powiazane: ['trasa-kierowcy', 'raporty-i-ewidencje'],
  },
];
