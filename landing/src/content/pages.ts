/**
 * Szkielety podstron — tytuły, nagłówki i zapowiedzi treści.
 * Źródło: docs/landing/05-podstrony.md
 *
 * Etap 0: strony istnieją, mają metadane i działające linki, a treść czeka
 * na projekt z Claude Design. Etap 2 i 3 wypełniają je sekcjami.
 */

export type PageSpec = {
  /** Nadtytuł nad nagłówkiem — wersalikami. */
  eyebrow?: string;
  /** Nagłówek strony; podwójna linia rozdzielona `\n`. */
  heading: string;
  /** Zdanie pod nagłówkiem. */
  lead: string;
  /** Krótka nazwa strony — okruszki, menu, odwołania w tekście. */
  title: string;
  /**
   * Tytuł dla wyszukiwarki, jeśli ma być inny niż `title`.
   *
   * Google daje na tytuł około 60 znaków i traktuje go jako najmocniejszy
   * sygnał tego, o czym jest strona. Nazwy w głosie marki — „Ile zostaje",
   * „Dyspozytornia" — są dobre w nawigacji, ale nie zawierają słów, które
   * ktokolwiek wpisuje w wyszukiwarce. Dlatego tytuł w wyniku wyszukiwania
   * jest rozdzielony od nagłówka na stronie: nagłówek zostaje w głosie marki,
   * tytuł mówi językiem zapytań.
   */
  seoTitle?: string;
  /** Opis dla wyszukiwarek. */
  description: string;
  /** Co znajdzie się na tej stronie — lista do czasu projektu. */
  outline?: string[];
};

export const pages: Record<string, PageSpec> = {
  'co-robi': {
    eyebrow: 'Co robi BusiKM',
    heading: 'Dziewięć rzeczy,\nktóre robią się bez Ciebie.',
    lead: 'Od trasy kierowcy po komplet dokumentów dla księgowej. Wybierz obszar, który Cię interesuje.',
    title: 'Co robi BusiKM',
    description:
      'Zlecenia, trasy, czas pracy, koszty, faktury i dane dla księgowej — dziewięć obszarów w jednym systemie.',
  },

  'co-robi/aplikacja-kierowcy': {
    eyebrow: 'BusiKM Kierowca · iPhone i Android',
    heading: 'Cały dzień pracy w jednej aplikacji.\nBez wpisywania czegokolwiek w trasie.',
    lead: 'Kierowca dostaje kod, wpisuje go raz i jest w środku. Reszta to trzy przyciski.',
    title: 'Aplikacja kierowcy',
    seoTitle: 'Aplikacja dla kierowcy busa — nawigacja i koszty · BusiKM',
    description:
      'Aplikacja mobilna dla kierowców: nawigacja w środku, koszt jednym przyciskiem, przerwy i praca bez zasięgu. iPhone i Android, sześć języków.',
    outline: [
      'Wchodzi kodem, nie zakłada konta',
      'Nawigacja jest w środku — nie przeskakuje między aplikacjami',
      'Rusza jednym przyciskiem',
      'Koszt dodaje jednym przyciskiem, w trasie',
      'Przerwa i powrót jednym tapnięciem',
      'Działa bez zasięgu, z ekranem „Do wysłania”',
      'Trasa poza zleceniem',
      'Jego dokumenty w telefonie',
    ],
  },

  'co-robi/dyspozytornia': {
    eyebrow: 'Dyspozytornia',
    heading: 'Cały dzień pracy\nna jednym ekranie.',
    lead: 'Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Bez przełączania zakładek.',
    title: 'Dyspozytornia',
    seoTitle: 'Program dla dyspozytora transportu i mapa floty · BusiKM',
    description:
      'Zlecenia, mapa floty i kierowcy na jednym ekranie. Trasa układa się sama, a zmiana w trakcie jazdy trafia do kierowcy od razu.',
    outline: [
      'Jeden ekran zamiast czterech okien',
      'Zlecenie od przyjęcia po rozliczenie',
      'Kierowca i pojazd w dwie sekundy',
      'Trasa układa się sama',
      'Zmiana w trakcie jazdy',
      'Rozmowa bez wychodzenia z ekranu',
      'Dyspozytor to osobne stanowisko',
    ],
  },

  'co-robi/trasy-i-mapa': {
    eyebrow: 'Trasy i mapa floty',
    heading: 'Widzisz, gdzie jest każdy bus.\nBez dzwonienia.',
    lead: 'Pozycje na żywo, historia tras i przejazdy, które liczą się nawet bez zlecenia.',
    title: 'Trasy i mapa floty',
    seoTitle: 'Mapa floty i trasy busów na żywo · BusiKM',
    description:
      'Widzisz, gdzie jest każdy bus, bez dzwonienia. Trasa zapisuje się sama i zamienia w gotową ewidencję przebiegu pojazdu.',
    outline: [
      'Mapa na żywo',
      'Klient pyta, Ty odpowiadasz',
      'Trasa układa się sama',
      'Historia tras',
      'Kraje na trasie',
      'Przejazd bez zlecenia też się liczy',
    ],
  },

  'co-robi/czas-pracy': {
    eyebrow: 'Czas pracy i przerwy',
    heading: 'Wiesz, kiedy kierowca musi stanąć.\nZanim stanie za późno.',
    lead: 'Liczniki idą same, także bez zasięgu. Kierowca dostaje przypomnienie wcześniej, nie po fakcie.',
    title: 'Czas pracy i przerwy',
    seoTitle: 'Ewidencja czasu pracy kierowcy — program · BusiKM',
    description:
      'Czas jazdy, przerwy i odpoczynki liczone same z trasy. Kierowca wie, kiedy musi stanąć, a Ty masz gotowe zestawienie za miesiąc.',
    outline: [
      'Liczniki idą same',
      'Kierowca dostaje przypomnienie wcześniej',
      'Ty widzisz to samo',
      'Działa bez zasięgu',
      'Miesięczna karta do wydruku',
      'Dni w każdym kraju',
      'Tachograf zapisuje. BusiKM pokazuje',
    ],
  },

  'co-robi/zlecenia-i-faktury': {
    eyebrow: 'Zlecenia i faktury',
    heading: 'Ze zlecenia robi się faktura.\nKlient ma ją, zanim wrócisz do biura.',
    lead: 'Faktura powstaje z danych zlecenia, a wysyłka do klienta i do systemu e-faktur to jedno kliknięcie.',
    title: 'Zlecenia i faktury',
    seoTitle: 'Zlecenia transportowe i faktury — program · BusiKM',
    description:
      'Ze zlecenia robi się faktura jednym kliknięciem. Klient dostaje ją mailem, a Ty widzisz, kto jeszcze nie zapłacił.',
    outline: [
      'Zlecenie i faktura to jedno',
      'Wysyłka jednym kliknięciem',
      'Korekty i zaliczki',
      'Waluty',
      'Kontrahenci w jednym miejscu',
      'Historia wysyłek',
    ],
  },

  'co-robi/koszty-i-paragony': {
    eyebrow: 'Koszty i paragony',
    heading: 'Reklamówka paragonów.\nDo wyrzucenia.',
    lead: 'Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same.',
    title: 'Koszty i paragony',
    seoTitle: 'Rozliczanie kosztów i paragonów w transporcie · BusiKM',
    description:
      'Kierowca robi zdjęcie paragonu, a system sam odczytuje kwotę, datę i walutę. Koniec z reklamówką rachunków pod siedzeniem.',
    outline: [
      'Zdjęcie zamiast wpisywania',
      'Trafia tam, gdzie trzeba',
      'Kategorie z życia',
      'Obca waluta',
      'Zdjęcie zostaje dowodem',
      'Koszty firmowe też',
    ],
  },

  'co-robi/rentownosc': {
    eyebrow: 'Ile zostaje',
    heading: 'Wiesz, ile zostaje.\nNa tym kursie. Dziś.',
    lead: 'Kierowca dodaje paragon w trasie — liczba na Twoim ekranie zmienia się od razu.',
    title: 'Ile zostaje',
    seoTitle: 'Rentowność zleceń transportowych — zysk na kursie · BusiKM',
    description:
      'Przychód, koszty i zysk na każdym kursie z osobna. Marża liczona na bieżąco, razem z kosztami w obcych walutach.',
    outline: [
      'Zysk na pierwszym ekranie',
      'Marża na każdym zleceniu',
      'Liczba zmienia się w trakcie',
      'Wszystkie koszty w środku',
      'Porównanie okresów',
      'Raporty',
    ],
  },

  'co-robi/dane-dla-ksiegowej': {
    eyebrow: 'Dane dla księgowej',
    heading: 'Komplet dokumentów.\nJednym przyciskiem.',
    lead: 'Wybiera miesiąc, klika raz i ma wszystko — w formacie programu, którego już używa.',
    title: 'Dane dla księgowej',
    seoTitle: 'Dokumenty dla księgowej z firmy transportowej · BusiKM',
    description:
      'Komplet zestawień za miesiąc jednym przyciskiem: przebieg, koszty, faktury sprzedaży i zakupu. W formacie, który księgowa po prostu wczyta.',
    outline: [
      'Wybiera miesiąc i klika raz',
      'W formacie jej programu',
      'Dziewięć zestawień',
      'System sam mówi, czego brakuje',
      'Zamknięcie miesiąca',
      'Historia pobrań',
      'Rozliczenie kierowców',
      'Księgowa z zewnątrz',
    ],
  },

  'co-robi/dokumenty-i-terminy': {
    eyebrow: 'Dokumenty i terminy',
    heading: 'Nic nie wygaśnie\npo cichu.',
    lead: 'Ubezpieczenie, przegląd, licencja, prawo jazdy, badania. System pilnuje dat i mówi wcześniej.',
    title: 'Dokumenty i terminy',
    seoTitle: 'Pilnowanie terminów dokumentów i badań w firmie · BusiKM',
    description:
      'Przeglądy, ubezpieczenia, badania kierowców i uprawnienia w jednym miejscu. Dostajesz przypomnienie, zanim coś wygaśnie.',
    outline: [
      'Wszystko w jednym miejscu',
      'Przypomnienie z wyprzedzeniem',
      'Kierowca też dostaje swoje',
      'Jeden ekran statusu',
      'Wydruk listy',
    ],
  },

  'dla-kogo': {
    eyebrow: 'Cztery role',
    heading: 'Cztery osoby.\nJeden system.',
    lead: 'Każdy widzi swoje. A w małej firmie jedna osoba nosi dwie role i przełącza widok jednym kliknięciem.',
    title: 'Dla kogo jest BusiKM',
    description:
      'Właściciel, dyspozytor, księgowa i kierowca — każdy z własnym widokiem i własnym zakresem.',
  },

  'dla-kogo/wlasciciel': {
    eyebrow: 'Właściciel · przeglądarka',
    heading: 'Wiesz, ile zostaje.\nI gdzie jest każdy bus.',
    lead: 'Przychód, koszty i zysk na pierwszym ekranie po zalogowaniu. Cała flota na mapie.',
    title: 'BusiKM dla właściciela',
    seoTitle: 'BusiKM dla właściciela firmy transportowej',
    description:
      'Zysk, koszty i cała flota na jednym ekranie. Wiesz, ile zostaje z każdego kursu, bez czekania na koniec miesiąca.',
  },

  'dla-kogo/dyspozytor': {
    eyebrow: 'Dyspozytor · przeglądarka',
    heading: 'Cały dzień pracy\nna jednym ekranie.',
    lead: 'Zlecenia, mapa, kierowcy i rozmowa obok siebie. Trasa układa się sama.',
    title: 'BusiKM dla dyspozytora',
    seoTitle: 'BusiKM dla dyspozytora — zlecenia, mapa, kierowcy',
    description:
      'Zlecenia, mapa i rozmowa z kierowcą w jednym oknie. Bez przełączania zakładek i bez dzwonienia, żeby ustalić, gdzie kto jest.',
  },

  'dla-kogo/ksiegowa': {
    eyebrow: 'Księgowa · przeglądarka',
    heading: 'Koniec miesiąca\nw jednym kliknięciu.',
    lead: 'Komplet dokumentów w formacie Twojego programu. Zamykasz miesiąc i nikt nie zmienia danych wstecz.',
    title: 'BusiKM dla księgowej',
    seoTitle: 'BusiKM dla księgowej firmy transportowej',
    description:
      'Komplet dokumentów za miesiąc jednym przyciskiem, w formacie do wczytania. Bez dopytywania o brakujące paragony i faktury.',
  },

  'dla-kogo/kierowca': {
    eyebrow: 'Kierowca · telefon',
    heading: 'Rusz.\nResztą zajmuje się telefon.',
    lead: 'Zlecenie, nawigacja, przerwy i koszty w jednej aplikacji. Bez zakładania konta.',
    title: 'BusiKM dla kierowcy',
    seoTitle: 'BusiKM dla kierowcy — aplikacja na telefon',
    description:
      'Jeden przycisk: rusz. Nawigacja, przerwy i koszty w tej samej aplikacji. Działa bez zasięgu, w sześciu językach.',
  },

  cennik: {
    eyebrow: 'Cennik',
    heading: 'Płacisz za pojazdy.\nNie za ludzi.',
    lead: 'Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się do abonamentu.',
    title: 'Cennik',
    seoTitle: 'Cennik — od 149 zł netto miesięcznie · BusiKM',
    description:
      'Start 149 zł i Firma 299 zł netto miesięcznie. Płacisz za pojazdy, kierowcy i biuro bez limitu. Bez umowy terminowej, 14 dni za darmo.',
  },

  demo: {
    eyebrow: 'Demo',
    heading: 'Nie wierz na słowo.\nWejdź i poklikaj.',
    lead: 'Prawdziwa aplikacja z przykładową firmą. Bez zakładania konta — i niczego nie zepsujesz.',
    title: 'Demo BusiKM',
    seoTitle: 'Demo — zobacz program bez zakładania konta · BusiKM',
    description:
      'Prawdziwa aplikacja z danymi przykładowej firmy transportowej. Bez rejestracji i bez podawania czegokolwiek — wchodzisz i klikasz.',
  },

  pomoc: {
    eyebrow: 'Centrum pomocy',
    heading: 'Pomoc,\nkiedy jej potrzebujesz.',
    lead: 'Pierwsze kroki, praca kierowcy, rozliczenia i konto. A jak czegoś nie ma — piszesz do człowieka.',
    title: 'Centrum pomocy',
    seoTitle: 'Centrum pomocy · BusiKM',
    description:
      'Pierwsze kroki, aplikacja kierowcy, rozliczenia i księgowość, konto i płatności. A jak czegoś nie ma — piszesz do człowieka.',
  },

  'pomoc/pierwsze-kroki': {
    eyebrow: 'Pierwsze kroki',
    heading: 'Pierwsza trasa\njeszcze dziś.',
    lead: 'Od założenia konta po pierwszą zamkniętą fakturę. Krok po kroku.',
    title: 'Pierwsze kroki',
    seoTitle: 'Pierwsze kroki — od konta do pierwszej faktury · BusiKM',
    description:
      'Dodaj pojazd, zaproś kierowcę, odbierz pierwszą trasę. Cała droga od założenia konta po pierwszą wystawioną fakturę.',
  },

  kontakt: {
    eyebrow: 'Kontakt',
    heading: 'Napisz.\nOdpisujemy tego samego dnia.',
    lead: 'Pytanie o funkcję, o rozliczenie albo o to, czy BusiKM poradzi sobie z Twoim przypadkiem.',
    title: 'Kontakt',
    seoTitle: 'Kontakt · BusiKM',
    description:
      'Napisz do nas — odpowiadamy tego samego dnia roboczego. Pytania o funkcje, rozliczenia i wdrożenie w Twojej firmie.',
  },

  status: {
    eyebrow: 'Status usługi',
    heading: 'Czy BusiKM\ndziała.',
    lead: 'Aktualny stan usługi i historia przerw.',
    title: 'Status usługi',
    seoTitle: 'Status usługi — czy BusiKM działa · BusiKM',
    description:
      'Aktualny stan działania BusiKM i historia przerw w dostępie. Sprawdź tutaj, zanim napiszesz do nas — może problem jest już u nas na tablicy.',
  },

  regulamin: {
    eyebrow: 'Dokumenty',
    heading: 'Regulamin',
    lead: 'Zasady korzystania z BusiKM.',
    title: 'Regulamin',
    seoTitle: 'Regulamin serwisu · BusiKM',
    description:
      'Zasady korzystania z BusiKM: zawarcie umowy i konto, opłaty i rozliczenia, dostępność usługi, odpowiedzialność, reklamacje i rozwiązanie umowy.',
  },

  prywatnosc: {
    eyebrow: 'Dokumenty',
    heading: 'Polityka prywatności',
    lead: 'Jakie dane zbieramy, po co i jak długo je trzymamy.',
    title: 'Polityka prywatności',
    seoTitle: 'Polityka prywatności i plików cookie · BusiKM',
    description:
      'Jakie dane zbiera BusiKM, w jakim celu, jak długo je przechowuje i jakie masz prawa. Wraz z zasadami używania plików cookie.',
  },

  'powierzenie-danych': {
    eyebrow: 'Dokumenty',
    heading: 'Powierzenie danych',
    lead: 'Umowa powierzenia przetwarzania danych osobowych.',
    title: 'Powierzenie danych',
    seoTitle: 'Umowa powierzenia przetwarzania danych · BusiKM',
    description:
      'Warunki powierzenia przetwarzania danych osobowych dla klientów BusiKM — zakres, zabezpieczenia i podprocesorzy.',
  },

  podprocesorzy: {
    eyebrow: 'Dokumenty',
    heading: 'Podprocesorzy',
    lead: 'Lista dostawców, którzy przetwarzają dane w imieniu BusiKM.',
    title: 'Podprocesorzy',
    seoTitle: 'Podprocesorzy — z jakich dostawców korzystamy · BusiKM',
    description:
      'Publiczny rejestr podprocesorów BusiKM: kto przetwarza dane w naszym imieniu, po co i gdzie te dane się znajdują.',
  },
};
