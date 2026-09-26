import type { Tlumaczenia } from '@/i18n/jezyki';

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
  /** Opis dla wyszukiwarek. Google pokazuje około 155 znaków. */
  description: string;
  /**
   * Krótszy opis do podglądu w mediach społecznościowych, jeśli `description`
   * jest za długi.
   *
   * Facebook i LinkedIn ucinają podgląd na telefonie w okolicy 125 znaków,
   * czyli wcześniej niż Google. Opis dobrany pod wyszukiwarkę gubi wtedy
   * ostatnie zdanie — a to zwykle w nim siedzi wezwanie do działania.
   * Skracamy tylko tam, gdzie obcięcie coś kosztuje; „…sześć języków." albo
   * urwana kropka nie są tego warte.
   */
  opisOg?: string;
  /** Co znajdzie się na tej stronie — lista do czasu projektu. */
  outline?: string[];
};

const strony = {
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
    opisOg:
      'Start 149 zł, Firma 299 zł netto miesięcznie. Płacisz za pojazdy — kierowcy i biuro bez limitu. 14 dni za darmo.',
  },

  demo: {
    eyebrow: 'Demo',
    heading: 'Demo przygotowujemy.\nZostaw adres.',
    lead: 'Prawdziwa aplikacja z danymi przykładowej firmy. Dostaniesz ją w dniu uruchomienia.',
    title: 'Demo BusiKM',
    seoTitle: 'Demo BusiKM — zapisz się po wczesny dostęp',
    description:
      'Demo z danymi przykładowej firmy transportowej przygotowujemy. Zostaw adres, a dostaniesz je w dniu uruchomienia, razem z 14 dniami bez opłat.',
    opisOg:
      'Demo z danymi przykładowej firmy transportowej przygotowujemy. Zostaw adres, a dostaniesz je w dniu uruchomienia.',
  },

  zaloguj: {
    eyebrow: 'Dostęp do aplikacji',
    heading: 'Konta otwieramy\nwkrótce.',
    lead: 'BusiKM jest sprawdzany na prawdziwych trasach, w małej grupie firm. Zostaw adres, a odezwiemy się, gdy otworzymy zapisy.',
    title: 'Dostęp do aplikacji',
    seoTitle: 'Dostęp do BusiKM — zapisy wkrótce',
    description:
      'Aplikację sprawdzamy w małej grupie firm transportowych. Zostaw imię i adres, a odezwiemy się, gdy otworzymy zapisy. Pierwsze 14 dni bez opłat.',
    opisOg:
      'Aplikację sprawdzamy w małej grupie firm transportowych. Zostaw adres, a odezwiemy się, gdy otworzymy zapisy.',
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
} satisfies Record<string, PageSpec>;

/**
 * Wersja angielska. Typ z kluczy `strony` pilnuje, żeby żadna podstrona nie
 * została bez tłumaczenia — brakujący albo nadmiarowy klucz to błąd kompilacji.
 */
const stronyEn: Record<keyof typeof strony, PageSpec> = {
  'co-robi': {
    eyebrow: 'What BusiKM does',
    heading: 'Nine things\nthat get done without you.',
    lead: 'From the driver’s route to a full set of documents for your accountant. Pick the area you care about.',
    title: 'What BusiKM does',
    seoTitle: 'Van fleet management software — features · BusiKM',
    description:
      'Orders, routes, working time, costs, invoices and data for your accountant — nine areas in one system for van fleets.',
  },

  'co-robi/aplikacja-kierowcy': {
    eyebrow: 'BusiKM Driver · iPhone and Android',
    heading: 'A whole working day in one app.\nNothing to type on the road.',
    lead: 'The driver gets a code, enters it once and is in. The rest is three buttons.',
    title: 'Driver app',
    seoTitle: 'Van driver app — navigation and expenses · BusiKM',
    description:
      'Mobile app for van drivers: built-in navigation, costs in one tap, breaks, and it works without signal. iPhone and Android, six languages.',
    outline: [
      'Signs in with a code, no account to set up',
      'Navigation is built in — no jumping between apps',
      'Starts with one button',
      'Adds a cost with one button, on the road',
      'Break and back in one tap',
      'Works without signal, with a “To send” screen',
      'Trips outside an order',
      'Their own documents on the phone',
    ],
  },

  'co-robi/dyspozytornia': {
    eyebrow: 'Dispatch',
    heading: 'A whole working day\non one screen.',
    lead: 'Orders, map, drivers and chat — side by side. No switching tabs.',
    title: 'Dispatch',
    seoTitle: 'Transport dispatch software and fleet map · BusiKM',
    description:
      'Orders, fleet map and drivers on one screen. The route plans itself, and a change mid-journey reaches the driver straight away.',
    outline: [
      'One screen instead of four windows',
      'An order from booking to billing',
      'Driver and vehicle in two seconds',
      'The route plans itself',
      'Changes mid-journey',
      'Chat without leaving the screen',
      'Dispatcher is a separate seat',
    ],
  },

  'co-robi/trasy-i-mapa': {
    eyebrow: 'Routes and fleet map',
    heading: 'You see where every van is.\nWithout calling.',
    lead: 'Live positions, route history and trips that count even without an order.',
    title: 'Routes and fleet map',
    seoTitle: 'Live van fleet map and route tracking · BusiKM',
    description:
      'See where every van is without picking up the phone. Routes record themselves and turn into a ready-made vehicle mileage log.',
    outline: [
      'Live map',
      'The client asks, you answer',
      'The route plans itself',
      'Route history',
      'Countries on the route',
      'A trip without an order counts too',
    ],
  },

  'co-robi/czas-pracy': {
    eyebrow: 'Working time and breaks',
    heading: 'You know when the driver has to stop.\nBefore it’s too late.',
    lead: 'The counters run on their own, even without signal. The driver gets a reminder in advance, not after the fact.',
    title: 'Working time and breaks',
    seoTitle: 'Driver working time and break tracking · BusiKM',
    description:
      'Driving time, breaks and rest periods counted from the route. The driver knows when to stop, and you get a ready monthly summary.',
    outline: [
      'The counters run on their own',
      'The driver gets a reminder in advance',
      'You see the same thing',
      'Works without signal',
      'Monthly record, ready to print',
      'Days in each country',
      'The tachograph records. BusiKM shows',
    ],
  },

  'co-robi/zlecenia-i-faktury': {
    eyebrow: 'Orders and invoices',
    heading: 'The order becomes the invoice.\nYour client has it before you’re back in the office.',
    lead: 'The invoice is built from the order data, and sending it to the client and to KSeF, Poland’s national e-invoicing system, takes one click.',
    title: 'Orders and invoices',
    seoTitle: 'Transport order and invoicing software · BusiKM',
    description:
      'Turn an order into an invoice in one click. The client gets it by email, and you see who still hasn’t paid.',
    outline: [
      'The order and the invoice are one',
      'Sent in one click',
      'Credit notes and advance invoices',
      'Currencies',
      'Clients in one place',
      'Sending history',
    ],
  },

  'co-robi/koszty-i-paragony': {
    eyebrow: 'Costs and receipts',
    heading: 'A carrier bag of receipts.\nStraight in the bin.',
    lead: 'The driver takes a photo at the fuel station. Amount, date and seller fill themselves in.',
    title: 'Costs and receipts',
    seoTitle: 'Expense and receipt tracking for transport · BusiKM',
    description:
      'The driver snaps the receipt and the system reads the amount, date and currency. No more bag of receipts under the seat.',
    outline: [
      'A photo instead of typing',
      'It goes where it belongs',
      'Categories from real life',
      'Foreign currency',
      'The photo stays as proof',
      'Company costs too',
    ],
  },

  'co-robi/rentownosc': {
    eyebrow: 'What you keep',
    heading: 'You know what you keep.\nOn this job. Today.',
    lead: 'The driver adds a receipt on the road — the figure on your screen changes straight away.',
    title: 'What you keep',
    seoTitle: 'Transport job profitability — profit per run · BusiKM',
    description:
      'Revenue, costs and profit on every job separately. Margin calculated as you go, including costs in foreign currencies.',
    outline: [
      'Profit on the first screen',
      'Margin on every order',
      'The figure changes as you go',
      'All costs included',
      'Comparing periods',
      'Reports',
    ],
  },

  'co-robi/dane-dla-ksiegowej': {
    eyebrow: 'Data for your accountant',
    heading: 'Every document.\nOne button.',
    lead: 'Your accountant picks the month, clicks once and has everything — in the format of the software they already use.',
    title: 'Data for your accountant',
    seoTitle: 'Accounting export for transport companies · BusiKM',
    description:
      'Every monthly report in one click: mileage, costs, sales and purchase invoices. In a format your accountant can simply import.',
    outline: [
      'Pick the month and click once',
      'In the format of their software',
      'Nine reports',
      'The system tells you what’s missing',
      'Closing the month',
      'Download history',
      'Driver settlements',
      'An outside accountant',
    ],
  },

  'co-robi/dokumenty-i-terminy': {
    eyebrow: 'Documents and deadlines',
    heading: 'Nothing expires\nwithout warning.',
    lead: 'Insurance, inspection, operator licence, driving licence, medicals. The system watches the dates and tells you early.',
    title: 'Documents and deadlines',
    seoTitle: 'Vehicle and driver document expiry reminders · BusiKM',
    description:
      'Inspections, insurance, driver medicals and qualifications in one place. You get a reminder before anything expires.',
    outline: [
      'Everything in one place',
      'A reminder well in advance',
      'The driver gets theirs too',
      'One status screen',
      'Printable list',
    ],
  },

  'dla-kogo': {
    eyebrow: 'Four roles',
    heading: 'Four people.\nOne system.',
    lead: 'Everyone sees their own part. And in a small company one person wears two hats and switches view in one click.',
    title: 'Who BusiKM is for',
    seoTitle: 'Van fleet management for every role · BusiKM',
    description:
      'Owner, dispatcher, accountant and driver — each with their own view and their own access.',
  },

  'dla-kogo/wlasciciel': {
    eyebrow: 'Owner · browser',
    heading: 'You know what you keep.\nAnd where every van is.',
    lead: 'Revenue, costs and profit on the first screen after you sign in. The whole fleet on the map.',
    title: 'BusiKM for owners',
    seoTitle: 'Van fleet software for transport company owners',
    description:
      'Profit, costs and the whole fleet on one screen. You know what you keep from every job, without waiting for the end of the month.',
  },

  'dla-kogo/dyspozytor': {
    eyebrow: 'Dispatcher · browser',
    heading: 'A whole working day\non one screen.',
    lead: 'Orders, map, drivers and chat side by side. The route plans itself.',
    title: 'BusiKM for dispatchers',
    seoTitle: 'BusiKM for dispatchers — orders, map, drivers',
    description:
      'Orders, the map and driver chat in one window. No switching tabs and no phoning round to find out who is where.',
  },

  'dla-kogo/ksiegowa': {
    eyebrow: 'Accountant · browser',
    heading: 'Month-end\nin one click.',
    lead: 'Every document in your accounting software’s format. You close the month and nobody changes the data after the fact.',
    title: 'BusiKM for accountants',
    seoTitle: 'BusiKM for accountants of transport companies',
    description:
      'Every document for the month in one click, in a format ready to import. No chasing missing receipts and invoices.',
  },

  'dla-kogo/kierowca': {
    eyebrow: 'Driver · phone',
    heading: 'Go.\nYour phone does the rest.',
    lead: 'Order, navigation, breaks and costs in one app. No account to set up.',
    title: 'BusiKM for drivers',
    seoTitle: 'BusiKM for drivers — the van driver app',
    description:
      'One button: go. Navigation, breaks and costs in the same app. Works without signal, in six languages.',
  },

  cennik: {
    eyebrow: 'Pricing',
    heading: 'You pay for vehicles.\nNot for people.',
    lead: 'Unlimited drivers and office staff. Trailers and semi-trailers don’t count towards the subscription.',
    title: 'Pricing',
    seoTitle: 'Pricing — from PLN 149 net a month · BusiKM',
    description:
      'Start PLN 149 and Business PLN 299 net a month. You pay per vehicle; drivers and office are unlimited. No fixed term, 14 days free.',
    opisOg:
      'Start PLN 149, Business PLN 299 net a month. You pay per vehicle — drivers and office unlimited. 14 days free.',
  },

  demo: {
    eyebrow: 'Demo',
    heading: 'We’re preparing the demo.\nLeave your email.',
    lead: 'The real app with a sample company’s data. You’ll get it on launch day.',
    title: 'BusiKM demo',
    seoTitle: 'BusiKM demo — sign up for early access',
    description:
      'We’re preparing a demo with a sample transport company’s data. Leave your email and you’ll get it on launch day, with 14 days free.',
    opisOg:
      'We’re preparing a demo with a sample transport company’s data. Leave your email and you’ll get it on launch day.',
  },

  zaloguj: {
    eyebrow: 'App access',
    heading: 'Accounts open\nsoon.',
    lead: 'BusiKM is being tested on real routes with a small group of companies. Leave your email and we’ll be in touch when sign-ups open.',
    title: 'App access',
    seoTitle: 'BusiKM access — sign-ups opening soon',
    description:
      'We’re testing the app with a small group of transport companies. Leave your name and email, and we’ll be in touch when sign-ups open. First 14 days free.',
    opisOg:
      'We’re testing the app with a small group of transport companies. Leave your email and we’ll be in touch when sign-ups open.',
  },

  pomoc: {
    eyebrow: 'Help centre',
    heading: 'Help,\nwhen you need it.',
    lead: 'Getting started, the driver’s work, billing and your account. And if something’s missing, you write to a person.',
    title: 'Help centre',
    seoTitle: 'Help centre · BusiKM',
    description:
      'Getting started, the driver app, billing and accounting, account and payments. And if something’s missing, you write to a person.',
  },

  'pomoc/pierwsze-kroki': {
    eyebrow: 'Getting started',
    heading: 'Your first route\ntoday.',
    lead: 'From creating an account to your first closed invoice. Step by step.',
    title: 'Getting started',
    seoTitle: 'Getting started — from account to first invoice · BusiKM',
    description:
      'Add a vehicle, invite a driver, receive your first route. The whole way from creating an account to your first invoice.',
  },

  kontakt: {
    eyebrow: 'Contact',
    heading: 'Write to us.\nWe reply the same day.',
    lead: 'A question about a feature, about billing, or whether BusiKM can handle your case.',
    title: 'Contact',
    seoTitle: 'Contact · BusiKM',
    description:
      'Write to us — we reply the same working day. Questions about features, billing and getting BusiKM running in your company.',
  },

  status: {
    eyebrow: 'Service status',
    heading: 'Is BusiKM\nworking.',
    lead: 'Current service status and outage history.',
    title: 'Service status',
    seoTitle: 'Service status — is BusiKM working · BusiKM',
    description:
      'Current BusiKM service status and outage history. Check here before you write to us — we may already be on it.',
  },

  regulamin: {
    eyebrow: 'Documents',
    heading: 'Terms of Service',
    lead: 'The rules for using BusiKM.',
    title: 'Terms of Service',
    seoTitle: 'Terms of Service · BusiKM',
    description:
      'The rules for using BusiKM: the contract and your account, fees and billing, service availability, liability, complaints and termination.',
  },

  prywatnosc: {
    eyebrow: 'Documents',
    heading: 'Privacy Policy',
    lead: 'What data we collect, why, and how long we keep it.',
    title: 'Privacy Policy',
    seoTitle: 'Privacy and Cookie Policy · BusiKM',
    description:
      'What data BusiKM collects, for what purpose, how long it keeps it and what rights you have. Plus the rules on using cookies.',
  },

  'powierzenie-danych': {
    eyebrow: 'Documents',
    heading: 'Data Processing Agreement',
    lead: 'The agreement on processing personal data on your behalf.',
    title: 'Data Processing Agreement',
    seoTitle: 'Data Processing Agreement (DPA) · BusiKM',
    description:
      'Terms under which BusiKM processes personal data on behalf of its customers — scope, safeguards and subprocessors.',
  },

  podprocesorzy: {
    eyebrow: 'Documents',
    heading: 'Subprocessors',
    lead: 'The providers that process data on BusiKM’s behalf.',
    title: 'Subprocessors',
    seoTitle: 'Subprocessors — which providers we use · BusiKM',
    description:
      'Public register of BusiKM subprocessors: who processes data on our behalf, why, and where that data is stored.',
  },
};

/**
 * Opisy stron w obu językach. Klucz to zawsze ścieżka polska (bez ukośnika),
 * także dla wersji angielskiej — adres angielski wylicza `i18n/trasy.ts`.
 */
export const pages: Tlumaczenia<Record<string, PageSpec>> = {
  pl: strony,
  en: stronyEn,
};
