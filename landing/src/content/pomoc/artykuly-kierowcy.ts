import type { Artykul } from '@/content/pomoc/typy';

/**
 * Instrukcje dotyczące kierowców — od zaproszenia po zamknięty dzień pracy.
 *
 * Nazwy przycisków przepisane z aplikacji, nie wymyślone. Gdy w kodzie
 * przycisk nazywa się „Zeskanuj paragon", tu też tak się nazywa — instrukcja,
 * która każe szukać „Dodaj dokument", jest bezużyteczna.
 */
export const artykulyKierowcy: Artykul[] = [
  {
    slug: 'zapraszamy-kierowce',
    kategoria: 'kierowcy',
    tytul: 'Jak dodać kierowcę',
    lead: 'Wysyłasz zaproszenie mailem. Kierowca sam ustawia hasło — nie znasz go i nie musisz.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Kierowcy → Zaproś kierowcę',
    czas: 'Dwie minuty u Ciebie, reszta po jego stronie',
    zanim: ['Adres e-mail kierowcy — na ten adres pójdzie zaproszenie'],
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
              'Kierowca dostaje e-mail z odnośnikiem. Po kliknięciu ustawia własne hasło i od razu trafia do aplikacji. Do tego czasu widnieje na Twojej liście jako zaproszony.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Hasła kierowcy nie znasz i nie możesz go odczytać. Jeśli kierowca je zgubi, korzysta z „Nie pamiętasz hasła?" na ekranie logowania — nie musisz nic robić.',
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
              'Czy adres jest wpisany bez literówki — najczęstsza przyczyna.',
              'Folder ze spamem u kierowcy. Zaproszenie przychodzi od BusiKM, nie od Ciebie.',
              'Czy kierowca nie ma już konta w innej firmie na tym adresie.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Jeśli nic z tego nie pomogło, napisz do nas — widzimy po swojej stronie, czy wiadomość wyszła i co się z nią stało.',
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
    zanim: ['Zaproszenie w skrzynce', 'Telefon z Androidem albo iPhone'],
    rozdzialy: [
      {
        tytul: 'Wejście do aplikacji',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Otwórz e-mail z zaproszeniem i kliknij odnośnik',
                opis: 'Otworzy się strona, na której ustawiasz własne hasło. Wymyśl je sam — nikt w firmie go nie zobaczy.',
              },
              { tytul: 'Zainstaluj aplikację BusiKM Kierowca ze sklepu' },
              {
                tytul: 'Otwórz aplikację i wybierz Kontynuuj z e-mailem',
                opis: 'Wpisz ten sam adres, na który przyszło zaproszenie, i hasło, które przed chwilą ustawiłeś.',
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
              'Lokalizację ustaw na „Zawsze", nie „Podczas używania aplikacji". Przy tym drugim ustawieniu telefon przestaje zapisywać trasę, gdy schowasz aplikację — a właśnie wtedy jedziesz.',
          },
        ],
      },
      {
        tytul: 'Co widzisz na pulpicie',
        bloki: [
          {
            typ: 'lista',
            wstep: 'Pierwszy ekran to wszystko, czego potrzebujesz w trasie:',
            punkty: [
              'Aktywne zlecenie z przyciskiem nawigacji — albo „Brak aktywnego zlecenia", gdy nic nie jedzie.',
              'Do akceptacji — zlecenia, które dyspozytor Ci przydzielił i czekają na Twoje potwierdzenie.',
              'Czas pracy — ile jedziesz i za ile masz przerwę.',
              'Dodaj koszt — zdjęcie paragonu jednym tapnięciem.',
              'Dokumenty i Wiadomości.',
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
              { tytul: 'Otwórz wiadomość i ustaw nowe hasło' },
            ],
          },
          {
            typ: 'akapit',
            tresc: 'Nie musisz o to prosić właściciela ani dyspozytora — robisz to sam.',
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
    lead: 'Od przyjęcia zlecenia do potwierdzonego rozładunku — bez wpisywania czegokolwiek z ręki.',
    role: ['kierowca'],
    gdzie: 'Aplikacja BusiKM Kierowca → Zlecenia',
    czas: 'Kilka tapnięć w ciągu dnia',
    rozdzialy: [
      {
        tytul: 'Przyjęcie zlecenia',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Otwórz zlecenie z sekcji Do akceptacji',
                opis: 'Zobaczysz trasę, godziny i towar. Powiadomienie przychodzi także wtedy, gdy aplikacja jest zamknięta.',
              },
              {
                tytul: 'Zaakceptuj zlecenie',
                opis: 'Dyspozytor widzi u siebie, że je przyjąłeś, i przestaje dzwonić z pytaniem.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Załadunek',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wpisz stan licznika',
                opis: 'Aplikacja prosi o niego raz, przed ruszeniem. Od tej chwili kilometry liczą się same.',
              },
              {
                tytul: 'Zrób zdjęcia towaru',
                opis: 'Zdjęcia wysyłają się w tle — nie musisz czekać, aż się prześlą, ani mieć zasięgu w tej chwili.',
              },
              { tytul: 'Podaj wagę i wybierz Zapisz wagę' },
              {
                tytul: 'Zbierz podpis, jeśli zleceniodawca go wymaga',
                opis: 'Podpis rysuje się palcem na ekranie.',
              },
              { tytul: 'Potwierdź Załadunek zakończony' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Status zlecenia zmienia się na „W trasie" i pojawia się przycisk Nawiguj do rozładunku. Nawigacja jest w tej samej aplikacji — nie przełączasz się do innej.',
          },
        ],
      },
      {
        tytul: 'Rozładunek',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Przebiega tak samo jak załadunek: zdjęcia, dane odbiorcy, podpis i potwierdzenie. Po nim zlecenie jest zamknięte, a dyspozytor widzi to od razu.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Brak zasięgu niczego nie blokuje. Zdjęcia, podpisy i potwierdzenia czekają w telefonie i wysyłają się same, gdy zasięg wróci. Możesz jechać dalej.',
          },
        ],
      },
      {
        tytul: 'Gdy coś idzie nie tak',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Na pulpicie jest „Nie mogę kontynuować". Zgłaszasz nim awarię, korek albo zamknięty załadunek — dyspozytor dostaje informację od razu, bez telefonu.',
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
    lead: 'Kierowca robi zdjęcie, system odczytuje kwotę i datę. Reklamówka pod siedzeniem przestaje być potrzebna.',
    role: ['kierowca', 'ksiegowa'],
    gdzie: 'Aplikacja BusiKM Kierowca → Paragony',
    czas: 'Kilkanaście sekund na paragon',
    rozdzialy: [
      {
        tytul: 'Dodanie paragonu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wybierz Zeskanuj paragon',
                opis: 'Także z pulpitu, kaflem Dodaj koszt — to ta sama droga.',
              },
              {
                tytul: 'Zrób zdjęcie paragonu',
                opis: 'Połóż go na płaskim, tak żeby mieścił się w kadrze w całości.',
              },
              {
                tytul: 'Sprawdź, co system odczytał',
                opis: 'Kwota, data, sprzedawca i NIP sprzedawcy uzupełniają się same. Popraw, jeśli coś się nie zgadza — zwłaszcza przy pogniecionym albo wyblakłym paragonie.',
              },
              { tytul: 'Zapisz' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Jeśli odczyt się nie uda, wybierz Pomiń i wpisz ręcznie. Zdjęcie i tak zostaje przy koszcie, więc księgowa ma do czego wrócić.',
          },
        ],
      },
      {
        tytul: 'Co się dzieje dalej',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Paragon trafia na listę jako Oczekujący. Ktoś w biurze go zatwierdza i wtedy zmienia status na Zatwierdzony. Kierowca widzi obie listy i wie, czy jego koszt przeszedł.',
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
    lead: 'Liczniki idą same. Telefon uprzedza, zanim przerwa stanie się obowiązkowa.',
    role: ['kierowca', 'wlasciciel'],
    gdzie: 'Aplikacja BusiKM Kierowca → AETR',
    rozdzialy: [
      {
        tytul: 'Co liczy się samo',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Jazda, praca, przerwa i odpoczynek zmieniają się automatycznie na podstawie tego, co robi pojazd i na jakim etapie jest zlecenie. Kierowca nie musi niczego przełączać.',
          },
          {
            typ: 'lista',
            wstep: 'Na ekranie AETR widzisz:',
            punkty: [
              'Jazdę ciągłą, dzienną i tygodniową — każdą z limitem, do którego się zbliżasz.',
              'Pasek dnia z podziałem na jazdę, pracę, przerwę i odpoczynek.',
              'Bieżący stan i od której godziny trwa.',
            ],
          },
        ],
      },
      {
        tytul: 'Rejestracja ręczna',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Gdy trzeba coś dopisać — na przykład pracę bez jazdy — służy do tego Zarejestruj ręcznie z przyciskami Przerwa i Odpoczynek.',
          },
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Otwórz zakładkę AETR' },
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
