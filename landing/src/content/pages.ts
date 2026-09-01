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
  /** Tytuł w zakładce przeglądarki. */
  title: string;
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
    description:
      'Nawigacja, trasa, przerwy i koszty w jednej aplikacji. Działa bez zasięgu, w sześciu językach, z trybem nocnym.',
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
    description:
      'Zlecenia, mapa i kierowcy na jednym ekranie. Trasa układa się sama, a zmiana w trakcie jazdy trafia do kierowcy od razu.',
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
    description:
      'Mapa floty na żywo, historia tras, kraje na trasie i przejazdy poza zleceniem.',
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
    description:
      'Jazda, przerwy i odpoczynki liczone na bieżąco. Miesięczna karta do wydruku i dni w każdym kraju liczone z trasy.',
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
    description:
      'Zlecenie połączone z fakturą. Wysyłka mailem i do KSeF jednym kliknięciem, razem z korektami i zaliczkami.',
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
    description:
      'Zdjęcie zamiast wpisywania. Koszt trafia do właściwego zlecenia i pojazdu, obca waluta przelicza się sama.',
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
    description:
      'Przychód, koszty i zysk na bieżąco. Marża na każdym zleceniu z osobna, z kosztami w obcych walutach.',
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
    description:
      'Dziewięć zestawień za wybrany miesiąc, w formacie Insert, Comarch Optima, Symfonia albo zwykłego arkusza.',
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
    description:
      'Dokumenty pojazdów, firmy i kierowców w jednym miejscu, z przypomnieniem na długo przed terminem.',
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
    description:
      'Zysk na bieżąco, mapa floty, rentowność każdego zlecenia i dokumenty, które nie wygasną po cichu.',
  },

  'dla-kogo/dyspozytor': {
    eyebrow: 'Dyspozytor · przeglądarka',
    heading: 'Cały dzień pracy\nna jednym ekranie.',
    lead: 'Zlecenia, mapa, kierowcy i rozmowa obok siebie. Trasa układa się sama.',
    title: 'BusiKM dla dyspozytora',
    description:
      'Zlecenia, mapa i kierowcy w jednym miejscu. Trasa dobiera się sama, a zmiana w trakcie jazdy trafia do kierowcy od razu.',
  },

  'dla-kogo/ksiegowa': {
    eyebrow: 'Księgowa · przeglądarka',
    heading: 'Koniec miesiąca\nw jednym kliknięciu.',
    lead: 'Komplet dokumentów w formacie Twojego programu. Zamykasz miesiąc i nikt nie zmienia danych wstecz.',
    title: 'BusiKM dla księgowej',
    description:
      'Komplet dokumentów za miesiąc jednym przyciskiem, w formacie Insert, Comarch Optima albo Symfonia.',
  },

  'dla-kogo/kierowca': {
    eyebrow: 'Kierowca · telefon',
    heading: 'Rusz.\nResztą zajmuje się telefon.',
    lead: 'Zlecenie, nawigacja, przerwy i koszty w jednej aplikacji. Bez zakładania konta.',
    title: 'BusiKM dla kierowcy',
    description:
      'Nawigacja w tej samej aplikacji, koszt jednym przyciskiem, praca bez zasięgu i sześć języków.',
  },

  cennik: {
    eyebrow: 'Cennik',
    heading: 'Płacisz za pojazdy.\nNie za ludzi.',
    lead: 'Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się do abonamentu.',
    title: 'Cennik',
    description:
      'Start 149 zł i Firma 299 zł netto miesięcznie. Bez umowy na czas określony, rezygnacja jednym kliknięciem.',
  },

  demo: {
    eyebrow: 'Demo',
    heading: 'Nie wierz na słowo.\nWejdź i poklikaj.',
    lead: 'Prawdziwa aplikacja z przykładową firmą. Bez zakładania konta — i niczego nie zepsujesz.',
    title: 'Demo BusiKM',
    description:
      'Prawdziwa aplikacja z danymi przykładowej firmy transportowej. Bez rejestracji, dane wracają do porządku każdej nocy.',
  },

  pomoc: {
    eyebrow: 'Centrum pomocy',
    heading: 'Pomoc,\nkiedy jej potrzebujesz.',
    lead: 'Pierwsze kroki, praca kierowcy, rozliczenia i konto. A jak czegoś nie ma — piszesz do człowieka.',
    title: 'Centrum pomocy',
    description:
      'Pierwsze kroki, aplikacja kierowcy, rozliczenia i księgowość, konto i płatności.',
  },

  'pomoc/pierwsze-kroki': {
    eyebrow: 'Pierwsze kroki',
    heading: 'Pierwsza trasa\njeszcze dziś.',
    lead: 'Od założenia konta po pierwszą zamkniętą fakturę. Krok po kroku.',
    title: 'Pierwsze kroki',
    description:
      'Dodaj pojazd, zaproś kierowcę, odbierz pierwszą trasę. Cała droga od rejestracji po pierwszą fakturę.',
  },

  kontakt: {
    eyebrow: 'Kontakt',
    heading: 'Napisz.\nOdpisujemy tego samego dnia.',
    lead: 'Pytanie o funkcję, o rozliczenie albo o to, czy BusiKM poradzi sobie z Twoim przypadkiem.',
    title: 'Kontakt',
    description: 'Napisz do nas — odpowiadamy w tym samym dniu roboczym.',
  },

  status: {
    eyebrow: 'Status usługi',
    heading: 'Czy BusiKM\ndziała.',
    lead: 'Aktualny stan usługi i historia przerw.',
    title: 'Status usługi',
    description: 'Aktualny stan działania BusiKM i historia przerw w dostępie.',
  },

  regulamin: {
    eyebrow: 'Dokumenty',
    heading: 'Regulamin',
    lead: 'Zasady korzystania z BusiKM.',
    title: 'Regulamin',
    description: 'Zasady korzystania z serwisu BusiKM.',
  },

  prywatnosc: {
    eyebrow: 'Dokumenty',
    heading: 'Polityka prywatności',
    lead: 'Jakie dane zbieramy, po co i jak długo je trzymamy.',
    title: 'Polityka prywatności',
    description: 'Jakie dane zbiera BusiKM, w jakim celu i jak długo je przechowuje.',
  },

  'powierzenie-danych': {
    eyebrow: 'Dokumenty',
    heading: 'Powierzenie danych',
    lead: 'Umowa powierzenia przetwarzania danych osobowych.',
    title: 'Powierzenie danych',
    description: 'Umowa powierzenia przetwarzania danych osobowych dla klientów BusiKM.',
  },

  podprocesorzy: {
    eyebrow: 'Dokumenty',
    heading: 'Podprocesorzy',
    lead: 'Lista dostawców, którzy przetwarzają dane w imieniu BusiKM.',
    title: 'Podprocesorzy',
    description: 'Publiczny rejestr podprocesorów BusiKM.',
  },
};
