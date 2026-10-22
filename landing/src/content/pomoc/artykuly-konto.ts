import type { Artykul } from '@/content/pomoc/typy';

/** Konto, zespół, uprawnienia, bezpieczeństwo i płatności. */
export const artykulyKonto: Artykul[] = [
  {
    slug: 'zespol-i-role',
    kategoria: 'konto',
    tytul: 'Zespół i uprawnienia',
    lead: 'Kto co widzi i skąd się bierze w systemie – osoby z biura zapraszasz z ustawień, kierowcę dodajesz w module Kierowcy.',
    role: ['wlasciciel'],
    gdzie: 'Ustawienia → Zespół i dostęp',
    rozdzialy: [
      {
        tytul: 'Role',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Rola', 'Co robi'],
            wiersze: [
              ['Właściciel', 'Wszystko, także konta bankowe, zespół, plan i KSeF'],
              ['Księgowa', 'Faktury, koszty, rozliczenia i dane firmy; konta, plan i flotę tylko ogląda'],
              ['Dyspozytor', 'Zlecenia, dyspozytornia, auta i kierowcy, bez kwot i faktur'],
              ['Kierowca', 'Tylko aplikacja na telefonie; dodajesz go w module Kierowcy'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Każda osoba ma jedną rolę. W małej firmie właściciel jest zwykle też dyspozytorem – jego konto ma dostęp do wszystkiego, więc nie potrzebuje drugiego.',
          },
          {
            typ: 'uwaga',
            tresc: 'Zespół i dostęp widzi tylko właściciel.',
          },
        ],
      },
      {
        tytul: 'Zaproszenie do zespołu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Zespół i dostęp' },
              { tytul: 'Kliknij Zaproś osobę' },
              {
                tytul: 'Podaj adres e-mail i wybierz rolę',
                opis: 'Księgowa, Dyspozytor albo Właściciel. Wyślemy e-mail z linkiem do ustawienia hasła. Link działa 7 dni.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Zaproszenia, których nikt jeszcze nie przyjął, widzisz na tej samej stronie, w sekcji Zaproszenia czekające na przyjęcie. Kierowców tu nie ma – dodajesz ich w module Kierowcy, a zaproszenie do aplikacji wychodzi na końcu kreatora.',
          },
        ],
      },
      {
        tytul: 'Zmiana roli i odbieranie dostępu',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Rolę zmieniasz przy osobie na liście. Zmiana działa od razu, bez ponownego logowania, i zapisuje się w Historii zmian.',
              'Gdy współpraca się kończy, kliknij Odbierz dostęp. Osoba nie zaloguje się do firmy, a dostęp przywrócisz jednym kliknięciem.',
              'Kierowcami zarządzasz w module Kierowcy.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Odebranie dostępu nie kasuje historii. Zmiany zrobione przez tę osobę zostają – tak jak powinny, bo dotyczą dokumentów firmy.',
          },
        ],
      },
    ],
    powiazane: ['zapraszamy-kierowce', 'bezpieczenstwo-konta'],
  },

  {
    slug: 'bezpieczenstwo-konta',
    kategoria: 'konto',
    tytul: 'Hasło, kod z telefonu i zalogowane urządzenia',
    lead: 'Trzy rzeczy do zrobienia raz, po których nikt nie wejdzie na Twoje konto z cudzego laptopa.',
    role: ['wlasciciel', 'ksiegowa', 'dyspozytor'],
    gdzie: 'Ustawienia → Logowanie i bezpieczeństwo',
    czas: 'Pięć minut',
    rozdzialy: [
      {
        tytul: 'Zmiana hasła',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Logowanie i bezpieczeństwo' },
              { tytul: 'W sekcji Hasło kliknij Zmień hasło' },
              { tytul: 'Podaj obecne i nowe hasło' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Po zmianie wylogujemy Cię na innych urządzeniach. To zamierzone – jeśli zmieniasz hasło dlatego, że coś Cię zaniepokoiło, telefon w cudzej kieszeni ma stracić dostęp od razu.',
          },
        ],
      },
      {
        tytul: 'Kod z telefonu przy logowaniu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'W sekcji Kod z telefonu przy logowaniu włącz ochronę' },
              {
                tytul: 'Połącz konto z aplikacją uwierzytelniającą',
                opis: 'Google Authenticator, 1Password, Authy – dowolna, która generuje sześciocyfrowe kody.',
              },
              {
                tytul: 'Przepisz kod z aplikacji, żeby potwierdzić',
                opis: 'Od tej chwili przy logowaniu po haśle wpisujesz 6 cyfr z aplikacji na telefonie.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Konto właściciela ma dostęp do faktur, kontrahentów i danych kierowców. Kod z telefonu kosztuje pięć minut raz – a jest różnicą między wykradzionym hasłem a wykradzioną firmą.',
          },
        ],
      },
      {
        tytul: 'Urządzenia z aktywnym logowaniem',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Lista pokazuje, na jakich urządzeniach jesteś zalogowany. Przyciskiem Wyloguj inne urządzenia zamykasz wszystkie pozostałe naraz.',
          },
          {
            typ: 'akapit',
            tresc:
              'Zajrzyj tu po zgubieniu telefonu albo po pracy na cudzym komputerze. Jedno kliknięcie zamyka sprawę.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role'],
  },

  {
    slug: 'plan-i-rezygnacja',
    kategoria: 'konto',
    tytul: 'Plan, płatność, faktury za BusiKM i rezygnacja',
    lead: 'Plan, kartę, faktury i rezygnację załatwiasz sam, w ustawieniach – bez pisania do nas.',
    role: ['wlasciciel'],
    gdzie: 'Ustawienia → Plan i płatności',
    rozdzialy: [
      {
        tytul: 'Sprawdzenie planu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'W Ustawienia → Plan i płatności widzisz plan firmy, do kiedy jest ważny i jego stan: okres próbny, aktywny albo wygasły. Plan zależy od liczby pojazdów – kierowcy i osoby z biura są bez limitu.',
          },
          {
            typ: 'lista',
            punkty: [
              'Start – do 3 pojazdów.',
              'Firma – 10 pojazdów w cenie, każdy kolejny +29 zł, do 50. Większa flota – napisz do nas.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Plan, kartę i faktury za BusiKM zmienia właściciel firmy. Pozostali widzą tylko, jaki plan ma firma.',
          },
        ],
      },
      {
        tytul: 'Wybór planu i płatność',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności' },
              {
                tytul: 'W sekcji Zmień plan kliknij Wybierz plan',
                opis: 'Start albo Firma, płatność miesięczna albo roczna.',
              },
              {
                tytul: 'Podaj kartę na stronie płatności Stripe',
                opis: 'Dane karty wpisujesz u operatora płatności, nie w BusiKM. Jeśli trwa okres próbny, karta zostaje zapisana, a pierwsza opłata schodzi dopiero po jego końcu.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Fakturę za każdą opłatę dostajesz mailem, ze stawką VAT „zw.” – MOVGRANTO jest zwolniona z VAT, więc cena z cennika jest ceną końcową.',
          },
        ],
      },
      {
        tytul: 'Zmiana planu, karty i pobranie faktur',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności' },
              {
                tytul: 'Kliknij Otwórz panel płatności',
                opis: 'Otworzy się panel Stripe. Zmienisz w nim plan i kartę, a faktury za BusiKM pobierzesz w PDF.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Rezygnacja i dane',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Plan i płatności i kliknij Otwórz panel płatności' },
              {
                tytul: 'Zakończ subskrypcję',
                opis: 'Rezygnacja działa na koniec opłaconego okresu, bez zwrotu za jego niewykorzystaną część. Do tego czasu możesz ją wycofać.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Do końca opłaconego okresu pracujesz normalnie. Potem konto zostaje do odczytu: przeglądasz dane i pobierasz faktury, ewidencje przebiegu, zestawienia i eksporty.',
          },
          {
            typ: 'akapit',
            tresc:
              'Swoje dane osobowe pobierzesz w Ustawienia → Twoje dane osobowe. To Twoje dane i wychodzą z nami tak samo łatwo, jak weszły.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role', 'eksport-dla-ksiegowej'],
  },
];
