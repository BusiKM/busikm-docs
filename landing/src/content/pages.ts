import type { Tlumaczenia } from '@/i18n/jezyki';

/**
 * Szkielety podstron – tytuły, nagłówki i zapowiedzi treści.
 * Źródło: docs/landing/05-podstrony.md
 *
 * Etap 0: strony istnieją, mają metadane i działające linki, a treść czeka
 * na projekt z Claude Design. Etap 2 i 3 wypełniają je sekcjami.
 */

export type PageSpec = {
  /** Nadtytuł nad nagłówkiem – wersalikami. */
  eyebrow?: string;
  /** Nagłówek strony; podwójna linia rozdzielona `\n`. */
  heading: string;
  /** Zdanie pod nagłówkiem. */
  lead: string;
  /** Krótka nazwa strony – okruszki, menu, odwołania w tekście. */
  title: string;
  /**
   * Tytuł dla wyszukiwarki, jeśli ma być inny niż `title`.
   *
   * Google daje na tytuł około 60 znaków i traktuje go jako najmocniejszy
   * sygnał tego, o czym jest strona. Nazwy w głosie marki – „Ile zostaje",
   * „Dyspozytornia" – są dobre w nawigacji, ale nie zawierają słów, które
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
   * ostatnie zdanie – a to zwykle w nim siedzi wezwanie do działania.
   * Skracamy tylko tam, gdzie obcięcie coś kosztuje; urwane ostatnie
   * wyliczenie albo kropka nie są tego warte.
   */
  opisOg?: string;
  /** Co znajdzie się na tej stronie – lista do czasu projektu. */
  outline?: string[];
};

const strony = {
  'co-robi': {
    eyebrow: 'Co robi BusiKM',
    heading: 'Dziewięć rzeczy,\nktóre robią się bez Ciebie.',
    lead: 'Od trasy kierowcy po komplet dokumentów dla księgowej. Wybierz obszar, który Cię interesuje.',
    title: 'Co robi BusiKM',
    description:
      'Zlecenia, trasy, czas pracy, koszty, faktury i dane dla księgowej – dziewięć obszarów w jednym systemie.',
  },

  'co-robi/aplikacja-kierowcy': {
    eyebrow: 'BusiKM Kierowca · iPhone i Android',
    heading: 'Cały dzień pracy w jednej aplikacji.\nBez wpisywania czegokolwiek w trasie.',
    lead: 'Kierowca dostaje kod mailem, wpisuje go w aplikacji, ustawia hasło i jest w środku.',
    title: 'Aplikacja kierowcy',
    seoTitle: 'Aplikacja dla kierowcy busa – trasa i koszty · BusiKM',
    description:
      'Aplikacja dla kierowców: zlecenia, nawigacja w Apple Maps, Google Maps albo Waze, koszt ze zdjęcia i przerwy zapisane bez zasięgu. iPhone i Android.',
    outline: [
      'Wchodzi kodem z zaproszenia i ustawia hasło',
      'Nawigacja jednym dotknięciem – Apple Maps, Google Maps albo Waze',
      'Zdjęcie licznika i „Zacznij dzień”',
      'Koszt dodaje jednym przyciskiem, w trasie',
      'Przerwa i powrót jednym tapnięciem',
      'Przerwy zapisze bez zasięgu – dojdą, gdy wróci sygnał',
      'Trasa poza zleceniem',
      'Dokumenty zlecenia pod ręką',
    ],
  },

  'co-robi/dyspozytornia': {
    eyebrow: 'Dyspozytornia',
    heading: 'Cały dzień pracy\nna jednym ekranie.',
    lead: 'Kolejka zleceń i mapa floty obok siebie. Do kierowcy piszesz jednym kliknięciem.',
    title: 'Dyspozytornia',
    seoTitle: 'Program dla dyspozytora transportu i mapa floty · BusiKM',
    description:
      'Kolejka zleceń i mapa floty na jednym ekranie. System ustawia kolejność postojów i liczy czas, a zmiana trafia do kierowcy od razu.',
    outline: [
      'Jeden ekran zamiast czterech okien',
      'Zlecenie od przyjęcia po rozliczenie',
      'Kierowca i pojazd w dwie sekundy',
      'Kolejność postojów ustawia system',
      'Zmiana w trakcie jazdy',
      'Czat z kierowcą w karcie zlecenia',
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
      'Kolejność postojów ustawia system',
      'Ślad przejazdu do odtworzenia',
      'Kraje na trasie',
      'Przejazd bez zlecenia też się liczy',
    ],
  },

  'co-robi/czas-pracy': {
    eyebrow: 'Czas pracy i przerwy',
    heading: 'Wiesz, kiedy kierowca musi stanąć.\nZanim stanie za późno.',
    lead: 'Czas jazdy i przerwy liczą się same. Kierowca dostaje przypomnienie 15 minut wcześniej, a przerwę zapisze też bez zasięgu.',
    title: 'Czas pracy i przerwy',
    seoTitle: 'Ewidencja czasu pracy kierowcy – program · BusiKM',
    description:
      'Czas jazdy, przerwy i odpoczynki liczone same z trasy. Kierowca wie, kiedy musi stanąć, a Ty masz gotowe zestawienie za miesiąc.',
    outline: [
      'Liczniki idą same',
      'Kierowca dostaje przypomnienie 15 minut wcześniej',
      'Ty widzisz to samo',
      'Przerwy zapisze bez zasięgu',
      'Miesięczna karta do wydruku',
      'Dni w każdym kraju',
      'Tachograf zapisuje. BusiKM pokazuje',
    ],
  },

  'co-robi/zlecenia-i-faktury': {
    eyebrow: 'Zlecenia i faktury',
    heading: 'Ze zlecenia robi się faktura.\nKlient ma ją, zanim wrócisz do biura.',
    lead: 'Faktura powstaje z danych zlecenia i jednym przyciskiem idzie do KSeF. Wysyłkę do klienta zlecasz od razu – PDF z kodem QR wyjdzie, gdy KSeF nada numer.',
    title: 'Zlecenia i faktury',
    seoTitle: 'Zlecenia transportowe i faktury – program · BusiKM',
    description:
      'Ze zlecenia robi się faktura. Jednym przyciskiem idzie do KSeF, klient dostaje PDF mailem, a Ty widzisz, kto jeszcze nie zapłacił.',
    outline: [
      'Zlecenie i faktura to jedno',
      'Do KSeF jednym przyciskiem',
      'Korekty i zaliczki',
      'Waluty',
      'Kontrahenci w jednym miejscu',
      'Droga faktury: wystawiona, w KSeF, u klienta, zapłacona',
    ],
  },

  'co-robi/koszty-i-paragony': {
    eyebrow: 'Koszty i paragony',
    heading: 'Reklamówka paragonów.\nDo wyrzucenia.',
    lead: 'Kierowca robi zdjęcie na stacji, wybiera rodzaj kosztu i zlecenie. Kwotę, datę i sprzedawcę BusiKM odczyta sam.',
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
    lead: 'Kierowca dodaje paragon w trasie. Gdy koszt ma komplet danych, wynik zlecenia przelicza się sam.',
    title: 'Ile zostaje',
    seoTitle: 'Rentowność zleceń transportowych – zysk na kursie · BusiKM',
    description:
      'Przychód, koszty i zysk na każdym kursie z osobna. Marża liczona na bieżąco, razem z kosztami w obcych walutach.',
    outline: [
      'Zysk na pierwszym ekranie',
      'Marża na każdym zleceniu',
      'Wynik przelicza się w trakcie',
      'Wszystkie koszty w środku',
      'Porównanie okresów',
      'Raporty',
    ],
  },

  'co-robi/dane-dla-ksiegowej': {
    eyebrow: 'Dane dla księgowej',
    heading: 'Komplet dokumentów.\nJednym przyciskiem.',
    lead: 'Wybiera miesiąc, klika raz i ma wszystko – w formacie programu, którego już używa.',
    title: 'Dane dla księgowej',
    seoTitle: 'Dokumenty dla księgowej z firmy transportowej · BusiKM',
    description:
      'Paczka dla biura jednym przyciskiem: dekrety FK, rejestry VAT, płace, delegacje i ewidencje przebiegu – dla Insert GT, Optimy albo Symfonii.',
    outline: [
      'Wybiera miesiąc i klika raz',
      'W formacie jej programu',
      'Dekrety, rejestry VAT, JPK i ewidencje',
      'System sam mówi, czego brakuje',
      'Zamknięcie miesiąca',
      'Pliki z ostatnich 30 dni',
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
      'Przypomnienie dla właściciela, dyspozytora i księgowej',
      'Jeden ekran statusu',
      'Pobierz komplet',
    ],
  },

  'dla-kogo': {
    eyebrow: 'Cztery role',
    heading: 'Cztery osoby.\nJeden system.',
    lead: 'Każdy widzi swoje. A w małej firmie właściciel bywa też dyspozytorem – jego konto widzi wszystko.',
    title: 'Dla kogo jest BusiKM',
    description:
      'Właściciel, dyspozytor, księgowa i kierowca – każdy z własnym widokiem i własnym zakresem.',
  },

  'dla-kogo/wlasciciel': {
    eyebrow: 'Właściciel · przeglądarka',
    heading: 'Wiesz, ile zostaje.\nI gdzie jest każdy bus.',
    lead: 'Na pierwszym ekranie to, co wymaga uwagi dziś. Niżej przychód, koszty i wynik.',
    title: 'BusiKM dla właściciela',
    seoTitle: 'BusiKM dla właściciela firmy transportowej',
    description:
      'Na pierwszym ekranie to, co pilne dziś, niżej przychód, koszty i wynik. Wiesz, ile zostaje z każdego kursu, bez czekania na koniec miesiąca.',
  },

  'dla-kogo/dyspozytor': {
    eyebrow: 'Dyspozytor · przeglądarka',
    heading: 'Cały dzień pracy\nna jednym ekranie.',
    lead: 'Kolejka zleceń i mapa floty obok siebie. System ustawia kolejność postojów i liczy czas.',
    title: 'BusiKM dla dyspozytora',
    seoTitle: 'BusiKM dla dyspozytora – zlecenia, mapa, kierowcy',
    description:
      'Kolejka zleceń i mapa floty w jednym oknie, a do kierowcy piszesz z karty zlecenia. Bez dzwonienia, żeby ustalić, gdzie kto jest.',
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
    heading: 'Zacznij dzień.\nResztą zajmuje się telefon.',
    lead: 'Zlecenia, przerwy i koszty w jednej aplikacji. Nawigację otwierasz jednym dotknięciem.',
    title: 'BusiKM dla kierowcy',
    seoTitle: 'BusiKM dla kierowcy – aplikacja na telefon',
    description:
      'Zdjęcie licznika, „Zacznij dzień” i w drogę. Przerwy i koszty w tej samej aplikacji, nawigacja w Apple Maps, Google Maps albo Waze.',
  },

  cennik: {
    eyebrow: 'Cennik',
    heading: 'Płacisz za pojazdy.\nNie za ludzi.',
    lead: 'Kierowcy i pracownicy biura bez limitu. Przyczepy i naczepy nie liczą się do abonamentu.',
    title: 'Cennik',
    seoTitle: 'Cennik – od 149 zł miesięcznie · BusiKM',
    description:
      'Start 149 zł i Firma 299 zł miesięcznie, ceny końcowe bez VAT. Płacisz za pojazdy, kierowcy i biuro bez limitu. 14 dni za darmo.',
    opisOg:
      'Start 149 zł, Firma 299 zł miesięcznie, bez VAT. Płacisz za pojazdy – kierowcy i biuro bez limitu. 14 dni za darmo.',
  },

  demo: {
    eyebrow: 'Demo',
    heading: 'Zobacz BusiKM od środka.\nBez konta.',
    lead: 'Przykładowa firma transportowa, wejście bez konta i wybór roli. Tylko do odczytu.',
    title: 'Demo BusiKM',
    seoTitle: 'Demo BusiKM – zobacz aplikację bez zakładania konta',
    description:
      'Demo BusiKM na danych przykładowej firmy transportowej: wejdź bez konta jako właściciel, dyspozytor albo księgowa i kliknij wszystko. Tylko do odczytu.',
    opisOg:
      'Demo BusiKM z przykładową firmą transportową – bez zakładania konta, tylko do odczytu.',
  },

  zaloguj: {
    eyebrow: 'Dostęp do aplikacji',
    heading: 'Konta otwieramy\nwkrótce.',
    lead: 'BusiKM jest sprawdzany na prawdziwych trasach, w małej grupie firm. Zostaw adres, a odezwiemy się, gdy otworzymy zapisy.',
    title: 'Dostęp do aplikacji',
    seoTitle: 'Dostęp do BusiKM – zapisy wkrótce',
    description:
      'Aplikację sprawdzamy w małej grupie firm transportowych. Zostaw imię i adres, a odezwiemy się, gdy otworzymy zapisy. Pierwsze 14 dni bez opłat.',
    opisOg:
      'Aplikację sprawdzamy w małej grupie firm transportowych. Zostaw adres, a odezwiemy się, gdy otworzymy zapisy.',
  },

  pomoc: {
    eyebrow: 'Centrum pomocy',
    heading: 'Pomoc,\nkiedy jej potrzebujesz.',
    lead: 'Pierwsze kroki, praca kierowcy, rozliczenia i konto. A jak czegoś nie ma – piszesz do człowieka.',
    title: 'Centrum pomocy',
    seoTitle: 'Centrum pomocy · BusiKM',
    description:
      'Pierwsze kroki, aplikacja kierowcy, rozliczenia i księgowość, konto i płatności. A jak czegoś nie ma – piszesz do człowieka.',
  },

  'pomoc/pierwsze-kroki': {
    eyebrow: 'Pierwsze kroki',
    heading: 'Pierwsza trasa\npierwszego dnia.',
    lead: 'Od założenia konta po pierwszą zamkniętą fakturę. Krok po kroku.',
    title: 'Pierwsze kroki',
    seoTitle: 'Pierwsze kroki – od konta do pierwszej faktury · BusiKM',
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
      'Napisz do nas – odpowiadamy tego samego dnia roboczego. Pytania o funkcje, rozliczenia i wdrożenie w Twojej firmie.',
  },

  status: {
    eyebrow: 'Status usługi',
    heading: 'Czy BusiKM\ndziała.',
    lead: 'Aktualny stan usługi i historia przerw.',
    title: 'Status usługi',
    seoTitle: 'Status usługi – czy BusiKM działa · BusiKM',
    description:
      'Aktualny stan działania BusiKM i historia przerw w dostępie. Sprawdź tutaj, zanim napiszesz do nas – może problem jest już u nas na tablicy.',
  },

  // Regulamin, umowa powierzenia i podprocesorzy są w aplikacji
  // (app.busikm.pl). Tu zostaje polityka samej strony busikm.pl.
  prywatnosc: {
    eyebrow: 'Dokumenty',
    heading: 'Polityka prywatności strony busikm.pl',
    lead: 'Jakie dane zbiera strona busikm.pl, po co i jak długo je trzymamy.',
    title: 'Polityka prywatności strony busikm.pl',
    seoTitle: 'Polityka prywatności strony busikm.pl i plików cookie · BusiKM',
    description:
      'Jakie dane zbiera strona busikm.pl: formularze, zapisy na listę, statystyka odwiedzin, reklama i pliki cookie. Przetwarzanie danych w usłudze BusiKM opisuje osobna polityka w aplikacji.',
  },
} satisfies Record<string, PageSpec>;

/**
 * Wersja angielska. Typ z kluczy `strony` pilnuje, żeby żadna podstrona nie
 * została bez tłumaczenia – brakujący albo nadmiarowy klucz to błąd kompilacji.
 */
const stronyEn: Record<keyof typeof strony, PageSpec> = {
  'co-robi': {
    eyebrow: 'What BusiKM does',
    heading: 'Nine things\nthat get done without you.',
    lead: 'From the driver’s route to a full set of documents for your accountant. Pick the area you care about.',
    title: 'What BusiKM does',
    seoTitle: 'Van fleet management software – features · BusiKM',
    description:
      'Orders, routes, working time, costs, invoices and data for your accountant – nine areas in one system for van fleets.',
  },

  'co-robi/aplikacja-kierowcy': {
    eyebrow: 'BusiKM Driver · iPhone and Android',
    heading: 'A whole working day in one app.\nNothing to type on the road.',
    lead: 'The driver gets a code by email, enters it in the app, sets a password and is in.',
    title: 'Driver app',
    seoTitle: 'Van driver app – routes and expenses · BusiKM',
    description:
      'App for van drivers: orders, navigation in Apple Maps, Google Maps or Waze, costs from a photo, and breaks saved without signal. iPhone and Android.',
    outline: [
      'Signs in with an invitation code and sets a password',
      'Navigation in one tap – Apple Maps, Google Maps or Waze',
      'An odometer photo and “Start the day”',
      'Adds a cost with one button, on the road',
      'Break and back in one tap',
      'Breaks saved without signal – sent when it’s back',
      'Trips outside an order',
      'The order’s documents to hand',
    ],
  },

  'co-robi/dyspozytornia': {
    eyebrow: 'Dispatch',
    heading: 'A whole working day\non one screen.',
    lead: 'The order queue and the fleet map side by side. Message a driver in one click.',
    title: 'Dispatch',
    seoTitle: 'Transport dispatch software and fleet map · BusiKM',
    description:
      'The order queue and fleet map on one screen. The system orders the stops and works out the time, and a change reaches the driver straight away.',
    outline: [
      'One screen instead of four windows',
      'An order from booking to billing',
      'Driver and vehicle in two seconds',
      'The system orders the stops',
      'Changes mid-journey',
      'Chat with the driver on the order card',
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
      'The system orders the stops',
      'A replayable trip trace',
      'Countries on the route',
      'A trip without an order counts too',
    ],
  },

  'co-robi/czas-pracy': {
    eyebrow: 'Working time and breaks',
    heading: 'You know when the driver has to stop.\nBefore it’s too late.',
    lead: 'Driving time and breaks count themselves. The driver gets a reminder 15 minutes ahead and can log a break without signal too.',
    title: 'Working time and breaks',
    seoTitle: 'Driver working time and break tracking · BusiKM',
    description:
      'Driving time, breaks and rest periods counted from the route. The driver knows when to stop, and you get a ready monthly summary.',
    outline: [
      'The counters run on their own',
      'The driver gets a reminder 15 minutes ahead',
      'You see the same thing',
      'Breaks saved without signal',
      'Monthly record, ready to print',
      'Days in each country',
      'The tachograph records. BusiKM shows',
    ],
  },

  'co-robi/zlecenia-i-faktury': {
    eyebrow: 'Orders and invoices',
    heading: 'The order becomes the invoice.\nYour client has it before you’re back in the office.',
    lead: 'The invoice is built from the order data and one button sends it to KSeF, Poland’s national e-invoicing system. You send it to the client straight away – the PDF with a QR code goes out once KSeF assigns the number.',
    title: 'Orders and invoices',
    seoTitle: 'Transport order and invoicing software · BusiKM',
    description:
      'An order turns into an invoice. One button sends it to KSeF, the client gets the PDF by email, and you see who still hasn’t paid.',
    outline: [
      'The order and the invoice are one',
      'To KSeF in one click',
      'Credit notes and advance invoices',
      'Currencies',
      'Clients in one place',
      'The invoice’s path: issued, in KSeF, with the client, paid',
    ],
  },

  'co-robi/koszty-i-paragony': {
    eyebrow: 'Costs and receipts',
    heading: 'A carrier bag of receipts.\nStraight in the bin.',
    lead: 'The driver takes a photo at the fuel station and picks the cost type and the order. BusiKM reads the amount, date and seller itself.',
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
    lead: 'The driver adds a receipt on the road. Once the cost has all its details, the job’s result recalculates itself.',
    title: 'What you keep',
    seoTitle: 'Transport job profitability – profit per run · BusiKM',
    description:
      'Revenue, costs and profit on every job separately. Margin calculated as you go, including costs in foreign currencies.',
    outline: [
      'Profit on the first screen',
      'Margin on every order',
      'The result recalculates as you go',
      'All costs included',
      'Comparing periods',
      'Reports',
    ],
  },

  'co-robi/dane-dla-ksiegowej': {
    eyebrow: 'Data for your accountant',
    heading: 'Every document.\nOne button.',
    lead: 'Your accountant picks the month, clicks once and has everything – in the format of the software they already use.',
    title: 'Data for your accountant',
    seoTitle: 'Accounting export for transport companies · BusiKM',
    description:
      'The office pack in one click: accounting entries, VAT registers, payroll, business trips and mileage logs – for Insert GT, Optima or Symfonia.',
    outline: [
      'Pick the month and click once',
      'In the format of their software',
      'Entries, VAT registers, JPK files and mileage logs',
      'The system tells you what’s missing',
      'Closing the month',
      'Files from the last 30 days',
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
      'A reminder for the owner, dispatcher and accountant',
      'One status screen',
      'Download the full set',
    ],
  },

  'dla-kogo': {
    eyebrow: 'Four roles',
    heading: 'Four people.\nOne system.',
    lead: 'Everyone sees their own part. And in a small company the owner is often the dispatcher too – the owner’s account sees everything.',
    title: 'Who BusiKM is for',
    seoTitle: 'Van fleet management for every role · BusiKM',
    description:
      'Owner, dispatcher, accountant and driver – each with their own view and their own access.',
  },

  'dla-kogo/wlasciciel': {
    eyebrow: 'Owner · browser',
    heading: 'You know what you keep.\nAnd where every van is.',
    lead: 'The first screen shows what needs your attention today. Revenue, costs and result below.',
    title: 'BusiKM for owners',
    seoTitle: 'Van fleet software for transport company owners',
    description:
      'The first screen shows what’s urgent today, with revenue, costs and result below. You know what you keep from every job, without waiting for the end of the month.',
  },

  'dla-kogo/dyspozytor': {
    eyebrow: 'Dispatcher · browser',
    heading: 'A whole working day\non one screen.',
    lead: 'The order queue and the fleet map side by side. The system orders the stops and works out the time.',
    title: 'BusiKM for dispatchers',
    seoTitle: 'BusiKM for dispatchers – orders, map, drivers',
    description:
      'The order queue and fleet map in one window, and you message the driver from the order card. No phoning round to find out who is where.',
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
    heading: 'Start the day.\nYour phone does the rest.',
    lead: 'Orders, breaks and costs in one app. Navigation opens in one tap.',
    title: 'BusiKM for drivers',
    seoTitle: 'BusiKM for drivers – the van driver app',
    description:
      'An odometer photo, “Start the day” and off you go. Breaks and costs in the same app, navigation in Apple Maps, Google Maps or Waze.',
  },

  cennik: {
    eyebrow: 'Pricing',
    heading: 'You pay for vehicles.\nNot for people.',
    lead: 'Unlimited drivers and office staff. Trailers and semi-trailers don’t count towards the subscription.',
    title: 'Pricing',
    seoTitle: 'Pricing – from PLN 149 a month · BusiKM',
    description:
      'Start PLN 149 and Business PLN 299 a month, final prices with no VAT on top. You pay per vehicle; drivers and office are unlimited. 14 days free.',
    opisOg:
      'Start PLN 149, Business PLN 299 a month, no VAT on top. You pay per vehicle – drivers and office unlimited. 14 days free.',
  },

  demo: {
    eyebrow: 'Demo',
    heading: 'See BusiKM from the inside.\nNo account.',
    lead: 'A sample transport company, no account needed, pick your role. Read-only.',
    title: 'BusiKM demo',
    seoTitle: 'BusiKM demo – see the app without signing up',
    description:
      'The BusiKM demo on a sample transport company’s data: walk in without an account as the owner, dispatcher or accountant and click everything. Read-only.',
    opisOg:
      'The BusiKM demo with a sample transport company – no account needed, read-only.',
  },

  zaloguj: {
    eyebrow: 'App access',
    heading: 'Accounts open\nsoon.',
    lead: 'BusiKM is being tested on real routes with a small group of companies. Leave your email and we’ll be in touch when sign-ups open.',
    title: 'App access',
    seoTitle: 'BusiKM access – sign-ups opening soon',
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
    heading: 'Your first route\non day one.',
    lead: 'From creating an account to your first closed invoice. Step by step.',
    title: 'Getting started',
    seoTitle: 'Getting started – from account to first invoice · BusiKM',
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
      'Write to us – we reply the same working day. Questions about features, billing and getting BusiKM running in your company.',
  },

  status: {
    eyebrow: 'Service status',
    heading: 'Is BusiKM\nworking.',
    lead: 'Current service status and outage history.',
    title: 'Service status',
    seoTitle: 'Service status – is BusiKM working · BusiKM',
    description:
      'Current BusiKM service status and outage history. Check here before you write to us – we may already be on it.',
  },

  prywatnosc: {
    eyebrow: 'Documents',
    heading: 'busikm.pl Website Privacy Policy',
    lead: 'What data the busikm.pl website collects, why, and how long we keep it.',
    title: 'busikm.pl Website Privacy Policy',
    seoTitle: 'busikm.pl Website Privacy and Cookie Policy · BusiKM',
    description:
      'What data the busikm.pl website collects: forms, list sign-ups, visit statistics, advertising and cookies. Data processing in the BusiKM service is described in a separate policy in the app.',
  },
};

/**
 * Opisy stron w obu językach. Klucz to zawsze ścieżka polska (bez ukośnika),
 * także dla wersji angielskiej – adres angielski wylicza `i18n/trasy.ts`.
 */
export const pages: Tlumaczenia<Record<string, PageSpec>> = {
  pl: strony,
  en: stronyEn,
};
