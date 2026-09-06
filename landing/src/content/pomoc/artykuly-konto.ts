import type { Artykul } from '@/content/pomoc/typy';

/** Konto, zespół, uprawnienia i bezpieczeństwo. */
export const artykulyKonto: Artykul[] = [
  {
    slug: 'zespol-i-role',
    kategoria: 'konto',
    tytul: 'Zespół i uprawnienia',
    lead: 'Kto co widzi i skąd się bierze w systemie — księgowego zapraszasz z ustawień, kierowcę z modułu Kierowcy.',
    role: ['wlasciciel'],
    gdzie: 'Ustawienia → Firma → Zespół',
    rozdzialy: [
      {
        tytul: 'Role',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Rola', 'Co robi'],
            wiersze: [
              ['Właściciel', 'Widzi całość: zlecenia, faktury, koszty, flotę, raporty, ustawienia'],
              ['Księgowy', 'Faktury, koszty, raporty, eksporty FK i JPK_FA, wynagrodzenia'],
              ['Dyspozytor', 'Zlecenia, dyspozytornia, przydzielanie kierowców'],
              ['Kierowca', 'Własne zlecenia, przejazdy, paragony i dokumenty — w aplikacji na telefonie'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Jedna osoba może mieć kilka ról naraz. W małej firmie właściciel jest zwykle też dyspozytorem i nikt nie zakłada sobie drugiego konta, żeby ułożyć trasę.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Zestawienie Rozliczenia — eksport FK, JPK_FA, wynagrodzenia — jest widoczne dla księgowego, nie dla właściciela. Właściciel z biurem rachunkowym nie generuje plików do urzędu, więc menu nie zaśmieca mu się przyciskami, których nie użyje.',
          },
        ],
      },
      {
        tytul: 'Zaproszenie księgowego',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Zespół' },
              { tytul: 'Kliknij Zaproś księgowego' },
              {
                tytul: 'Podaj adres e-mail i wyślij zaproszenie',
                opis: 'Księgowy dostaje mail z linkiem aktywacyjnym. Po akceptacji dołącza do firmy z rolą Księgowy i dostępem do faktur, raportów i eksportów FK.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Na liście zespołu widzisz właściciela i księgowych. Kierowcami zarządzasz osobno — w module Kierowcy.',
          },
        ],
      },
      {
        tytul: 'Zmiana roli i odbieranie dostępu',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Rolę przełączasz między właścicielem a księgowym — to jedyna para, którą wymienia się w ustawieniach zespołu.',
              'Konto księgowego dezaktywujesz z tej samej listy, gdy współpraca się kończy.',
              'Kierowcę odłączasz od firmy w jego karcie w module Kierowcy.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Dezaktywacja odbiera dostęp, ale nie kasuje historii. Faktury i eksporty zrobione przez tę osobę zostają — tak jak powinny, bo są dokumentami firmy.',
          },
        ],
      },
    ],
    powiazane: ['zapraszamy-kierowce', 'bezpieczenstwo-konta'],
  },

  {
    slug: 'bezpieczenstwo-konta',
    kategoria: 'konto',
    tytul: 'Hasło, weryfikacja dwuetapowa i sesje',
    lead: 'Trzy rzeczy do zrobienia raz, po których nikt nie wejdzie na Twoje konto z cudzego laptopa.',
    role: ['wlasciciel', 'ksiegowa', 'dyspozytor'],
    gdzie: 'Ustawienia → Konto → Bezpieczeństwo',
    czas: 'Pięć minut',
    rozdzialy: [
      {
        tytul: 'Zmiana hasła',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Bezpieczeństwo' },
              { tytul: 'W sekcji Hasło podaj obecne i nowe' },
              { tytul: 'Kliknij Zmień hasło' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Po zmianie hasła inne urządzenia zostają wylogowane. To zamierzone — jeśli zmieniasz hasło dlatego, że coś Cię zaniepokoiło, telefon w cudzej kieszeni ma stracić dostęp od razu.',
          },
        ],
      },
      {
        tytul: 'Weryfikacja dwuetapowa',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'W sekcji Dwuetapowa weryfikacja włącz ochronę',
                opis: 'Pojawi się kod QR.',
              },
              {
                tytul: 'Zeskanuj kod aplikacją uwierzytelniającą',
                opis: 'Google Authenticator, 1Password, Authy — dowolna, która generuje sześciocyfrowe kody.',
              },
              {
                tytul: 'Przepisz kod z aplikacji, żeby potwierdzić',
                opis: 'Od tej chwili logowanie prosi o kod obok hasła.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Konto właściciela ma dostęp do faktur, kontrahentów i danych kierowców. Weryfikacja dwuetapowa kosztuje pięć minut raz — a jest różnicą między wykradzionym hasłem a wykradzioną firmą.',
          },
        ],
      },
      {
        tytul: 'Aktywne sesje',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Lista Aktywne sesje pokazuje, gdzie jesteś zalogowany — z urządzeniem i adresem. Pojedynczą pozycję kończysz przyciskiem Wyloguj sesję, wszystkie inne naraz — Wyloguj inne urządzenia.',
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
    tytul: 'Plan, faktury za BusiKM i rezygnacja',
    lead: 'Co możesz sprawdzić sam, a co dziś załatwiamy mailem.',
    role: ['wlasciciel'],
    gdzie: 'Ustawienia → Firma → Subskrypcja',
    rozdzialy: [
      {
        tytul: 'Sprawdzenie planu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'W Ustawienia → Subskrypcja widzisz swój bieżący plan, limity pojazdów i kierowców oraz to, co obejmuje. Plan zależy od wielkości floty.',
          },
        ],
      },
      {
        tytul: 'Zmiana planu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Wejdź w Ustawienia → Subskrypcja' },
              {
                tytul: 'Kliknij Wybierz plan przy tym, który Cię interesuje',
                opis: 'Otworzy się wiadomość do nas z wpisanym tematem. Odpowiadamy tego samego dnia roboczego i przestawiamy plan.',
              },
            ],
          },
          {
            typ: 'wkrotce',
            tresc:
              'Płatność kartą i zmiana planu jednym kliknięciem są w budowie. Dziś zmiana planu i faktury za BusiKM idą przez nas — dlatego przycisk otwiera maila, a nie płatność.',
          },
        ],
      },
      {
        tytul: 'Rezygnacja i dane',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Rezygnację zgłaszasz mailem. Przed zamknięciem konta pobierz to, co ma zostać u Ciebie: faktury w PDF, eksporty FK z historii i raporty za wszystkie miesiące.',
          },
          {
            typ: 'akapit',
            tresc:
              'Komplet danych z konta pobierzesz też w Ustawienia → Eksport RODO. To Twoje dane i wychodzą z nami tak samo łatwo, jak weszły.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role', 'eksport-dla-ksiegowej'],
  },
];
