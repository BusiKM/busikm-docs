import type { Artykul } from '@/content/pomoc/typy';

/** Koszty, flota i terminy — to, co pilnuje się w tle i mści przy kontroli. */
export const artykulyKoszty: Artykul[] = [
  {
    slug: 'koszty-w-biurze',
    kategoria: 'koszty',
    tytul: 'Akceptacja kosztów',
    lead: 'Kierowcy wrzucają paragony z trasy, Ty decydujesz, co wchodzi w koszty firmy.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Koszty',
    czas: 'Kilkanaście minut tygodniowo',
    rozdzialy: [
      {
        tytul: 'Cztery stany kosztu',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Nad listą są zakładki, które są jednocześnie ścieżką dokumentu. Licznik przy „Koszty" w menu pokazuje, ile czeka na Twoją decyzję.',
          },
          {
            typ: 'tabela',
            naglowki: ['Zakładka', 'Co to znaczy'],
            wiersze: [
              ['Do akceptacji', 'Kierowca dodał, nikt jeszcze nie sprawdził'],
              ['Zaakceptowane', 'Sprawdzone i uznane za koszt firmy'],
              ['Zaksięgowane', 'Poszło do księgowej w eksporcie'],
              ['Odrzucone', 'Nie jest kosztem firmy — z powodem odrzucenia'],
            ],
          },
        ],
      },
      {
        tytul: 'Sprawdzenie kosztu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Otwórz zakładkę Do akceptacji' },
              {
                tytul: 'Wejdź w Szczegóły',
                opis: 'Obok danych zobaczysz zdjęcie dokumentu — to, które zrobił kierowca. Nie musisz szukać papieru.',
              },
              {
                tytul: 'Porównaj odczytane pola ze zdjęciem',
                opis: 'Sprzedawca, NIP, Numer dokumentu, Data wystawienia, Kwota netto, VAT %. Przy paragonie ze skanu warto rzucić okiem, bo pogniecione wydruki czyta się gorzej.',
              },
              {
                tytul: 'Sprawdź Kategoria * i VAT do odliczenia',
                opis: 'Kategoria decyduje, w którym miejscu koszt pojawi się w raportach. Odliczenie VAT zależy od tego, jak używany jest pojazd.',
              },
              { tytul: 'Zaakceptuj albo odrzuć' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Przy większej liczbie dokumentów zaznacz kilka wierszy naraz i użyj akcji zbiorczej — koniec miesiąca robi się wtedy w jednym posiedzeniu.',
          },
        ],
      },
      {
        tytul: 'Skąd biorą się koszty',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'Z telefonu kierowcy — zdjęcie paragonu na trasie.',
              'Z wpisu w biurze — gdy dokument przyszedł pocztą albo mailem.',
              'Ze skanu w Skanuj OCR — wrzucasz plik, system odczytuje pola.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Koszt w obcej walucie przelicza się kursem NBP z dnia poprzedzającego wystawienie dokumentu. Nikt nie przepisuje kursów z tabel.',
          },
        ],
      },
    ],
    powiazane: ['paragony-kierowcy', 'eksport-dla-ksiegowej'],
  },

  {
    slug: 'dokumenty-i-terminy',
    kategoria: 'koszty',
    tytul: 'Dokumenty i terminy',
    lead: 'OC, przegląd, badania kierowcy i karta tachografu w jednym miejscu — z ostrzeżeniem, zanim wygasną.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Dokumenty',
    czas: 'Godzina raz, potem samo pilnuje',
    rozdzialy: [
      {
        tytul: 'Dodanie dokumentu',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Wejdź w kartę pojazdu albo kierowcy',
                opis: 'Dokumenty wisi przy tym, czego dotyczą — nie ma jednego worka na wszystko.',
              },
              { tytul: 'Dodaj dokument' },
              {
                tytul: 'Wybierz Typ dokumentu *',
                opis: 'Od typu zależy kategoria i sposób przypominania.',
              },
              {
                tytul: 'Wgraj plik i wpisz datę ważności',
                opis: 'Plik przeciągasz na pole albo wybierasz z dysku. Data ważności jest sednem — bez niej dokument leży, ale nikt o nim nie przypomni.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Co system pilnuje',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Przy pojeździe', 'Przy kierowcy'],
            wiersze: [
              ['Dowód rejestracyjny, wypis z licencji', 'Prawo jazdy z kategoriami'],
              ['OC, AC, NNW, GAP, zielona karta', 'Kwalifikacja zawodowa (CPC), kod 95'],
              ['Badanie techniczne, tachograf, kalibracja', 'Badania lekarskie i psychologiczne'],
              ['ATP, ADR pojazdu', 'ADR, HACCP, szkolenia'],
              ['Licencja transportowa, leasing', 'Karta tachografu, KRK, umowa'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Ekran Dokumenty pokazuje trzy grupy: Wygasłe, Wygasają w 30 dni i Wygasa dzisiaj — z podziałem na Firma, Pojazdy i Kierowcy. Do tego przychodzi powiadomienie na telefon i mailem.',
          },
          {
            typ: 'akapit',
            tresc:
              'Ile dni wcześniej mają iść ostrzeżenia, ustawisz w Ustawienia → Progi alertów.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Najdroższa data w firmie transportowej to ta, o której nikt nie wiedział. Wgraj dokumenty raz — kolejny raz to już tylko podmiana pliku po odnowieniu polisy.',
          },
        ],
      },
    ],
    powiazane: ['dodajemy-pojazd', 'czas-pracy-kierowcy'],
  },
];
