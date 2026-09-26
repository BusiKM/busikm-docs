import type { Artykul } from '@/content/pomoc/typy';

/**
 * Rozliczenia — wersja angielska. Ta sama zasada co w polskiej: sekcję
 * Rozliczenia widzi księgowy, nie właściciel, i instrukcja mówi to wprost.
 */
export const artykulyKsiegowoscEn: Artykul[] = [
  {
    slug: 'przejazdy-i-kilometrowka',
    kategoria: 'ksiegowosc',
    tytul: 'Trips and the mileage log',
    lead: 'Routes are recorded from the driver’s phone. Your job is to confirm what was business travel.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Trips (Przejazdy)',
    czas: 'A few minutes a week',
    rozdzialy: [
      {
        tytul: 'Where trips come from',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The driver app records the route from the phone’s location and the order stages. Nobody copies kilometres from the odometer into a notebook — the trip appears on the list by itself, with the date, the route and the distance.',
          },
          {
            typ: 'akapit',
            tresc:
              'You can also add a trip by hand, when the phone was off or the vehicle was driven by someone without the app.',
          },
        ],
      },
      {
        tytul: 'Confirming',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Trips (Przejazdy) and set the filter to the month' },
              {
                tytul: 'Check the Trip type (Typ trasy)',
                opis: 'Business (Służbowa) or Private (Prywatna). A business trip needs a Trip purpose * (Cel trasy): delivery of goods, empty run, vehicle service, technical run or other.',
              },
              {
                tytul: 'Confirm the trip',
                opis: 'You can tick several rows and use Confirm selected (Potwierdź zaznaczone). Rejecting is here too — with a reason.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'You can switch a wrongly classified trip between business and private until it’s exported — use reclassify in the trip details.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Once a trip is confirmed it can no longer be edited or deleted. That’s deliberate: the mileage log is meant to record what happened, not be a document you can fix after the fact. The owner can undo a confirmation.',
          },
        ],
      },
      {
        tytul: 'Rates per kilometre',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The rates the mileage log uses live in Settings → Mileage rates (Ustawienia → Stawki kilometrówki). They change by government regulation, so they have effective dates — an old month is calculated at the old rate and stays that way.',
          },
        ],
      },
    ],
    powiazane: ['zamkniecie-miesiaca', 'raporty-i-ewidencje'],
  },

  {
    slug: 'zamkniecie-miesiaca',
    kategoria: 'ksiegowosc',
    tytul: 'Closing the month',
    lead: 'A summary per vehicle, recalculate, approve. Only then export.',
    role: ['ksiegowa', 'wlasciciel'],
    gdzie: 'Reports → Monthly summaries (Raporty → Miesięczne podsumowania)',
    czas: 'Fifteen minutes a month',
    zanim: ['All trips for the month confirmed', 'Costs approved or rejected'],
    rozdzialy: [
      {
        tytul: 'Three moves',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Create a summary',
                opis: 'You give the year, month and vehicle. One summary covers one vehicle in one month.',
              },
              {
                tytul: 'Click Recalculate (Przelicz)',
                opis: 'The system gathers trips, costs and kilometres for the period. You can recalculate as many times as you like until the summary is approved.',
              },
              {
                tytul: 'Click Approve (Zatwierdź)',
                opis: 'Approving closes the month for that vehicle.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'When approval won’t go through',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The system won’t let you approve a month that still has unconfirmed or incomplete trips. Go back to Trips, complete them and recalculate.',
          },
          {
            typ: 'akapit',
            tresc:
              'When you know what you’re doing and want to close despite the warnings, there’s Approve despite warnings (Zatwierdź mimo ostrzeżeń). Use it deliberately — the gaps don’t disappear, they just stop blocking you.',
          },
        ],
      },
      {
        tytul: 'Statuses',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Status', 'What it means'],
            wiersze: [
              ['Draft (Wersja robocza)', 'Created, not yet recalculated, or being corrected'],
              ['To approve (Do zatwierdzenia)', 'Recalculated, waiting for a decision'],
              ['Approved (Zatwierdzone)', 'Month closed, ready to export'],
              ['Exported (Wyeksportowane)', 'Sent to the accounting software'],
              ['Locked (Zablokowane)', 'Closed for good — nothing will change any more'],
            ],
          },
        ],
      },
    ],
    powiazane: ['eksport-dla-ksiegowej', 'przejazdy-i-kilometrowka'],
  },

  {
    slug: 'eksport-dla-ksiegowej',
    kategoria: 'ksiegowosc',
    tytul: 'Export to accounting software',
    lead: 'One file, in a format your accountant can import without retyping.',
    role: ['ksiegowa'],
    gdzie: 'Settlements → FK export (Rozliczenia → Eksport FK)',
    czas: 'Two minutes',
    zanim: [
      'An approved monthly summary',
      'The Accounting system set in the company details',
    ],
    rozdzialy: [
      {
        tytul: 'Who does it',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The Settlements section (Rozliczenia) is visible to the accountant — an owner who uses an accounting office doesn’t generate files for the tax office. If you’re looking for FK export (Eksport FK; FK is the ledger in your accounting software) and can’t see it, it means you’re signed in as the owner, not that the feature is missing.',
          },
        ],
      },
      {
        tytul: 'Generating the file',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settlements → FK export' },
              {
                tytul: 'Choose the Accounting system (System księgowy)',
                opis: 'Insert GT, Comarch ERP Optima or Symfonia FK. The setting from your company details is suggested automatically.',
              },
              {
                tytul: 'Pick the Data range (Zakres danych)',
                opis: 'Revenue + costs, revenue only, or costs only.',
              },
              { tytul: 'Enter the Year * and Month *' },
              {
                tytul: 'Check the preview',
                opis: 'Before you download the file you see the number of invoices, the number of expenses and the file size. Zero records means the month isn’t closed or the range is wrong.',
              },
              { tytul: 'Click Export (Eksportuj)' },
            ],
          },
        ],
      },
      {
        tytul: 'Formats and limits',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['System', 'What you get'],
            wiersze: [
              ['Insert GT', 'EPP (EDI++ 1.05.1), Windows-1250 — invoices, mileage log, clients'],
              ['Comarch ERP Optima', 'XML in Comarch format, UTF-8'],
              ['Symfonia FK', 'Semicolon-separated TXT, optionally with an AMS template'],
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'On your first import into Symfonia, tick “Include AMS template” (Dołącz szablon AMS) — without it the program doesn’t know how to arrange the columns. In later months you don’t need it.',
          },
          {
            typ: 'akapit',
            tresc:
              'The limit is three exports a month per company. That’s enough for the real one and two corrections, and it stops the same month being sent ten times by accident.',
          },
          {
            typ: 'akapit',
            tresc:
              'Every file you generate stays in Export history (Historia eksportów) — with its date, format and size. You can download it again when your accountant loses the email.',
          },
        ],
      },
      {
        tytul: 'JPK_FA',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The JPK_FA file (the invoice data file the Polish tax office can request) is generated in Settlements → JPK_FA — the same way, on a separate screen with its own preview before download.',
          },
        ],
      },
    ],
    powiazane: ['zamkniecie-miesiaca', 'raporty-i-ewidencje'],
  },

  {
    slug: 'raporty-i-ewidencje',
    kategoria: 'ksiegowosc',
    tytul: 'Reports',
    lead: 'Eleven ready-made reports. Each answers one question you’re asking yourself anyway.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Reports (Raporty)',
    rozdzialy: [
      {
        tytul: 'Finance',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Report', 'Answers the question'],
            wiersze: [
              ['What am I earning on? (Na czym zarabiam?)', 'Which orders and clients bring profit, and which just turnover'],
              ['Where does revenue come from? (Skąd przychody?)', 'Broken down by client and currency'],
              ['Where does the money go? (Gdzie wydaję pieniądze?)', 'Cost structure — where the margin leaks away'],
            ],
          },
        ],
      },
      {
        tytul: 'Fleet',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Report', 'Answers the question'],
            wiersze: [
              ['What does my fleet cost? (Co kosztuje moja flota?)', 'Fuel, servicing, insurance, broken down by vehicle'],
              ['Which vehicle is cheapest? (Który pojazd jest najtańszy?)', 'Cost per kilometre — the one to replace stands out at once'],
            ],
          },
        ],
      },
      {
        tytul: 'For the accountant and the tax office',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Report', 'What it’s for'],
            wiersze: [
              ['Mileage log printout (Wydruk ewidencji km)', 'A log in the Ministry of Finance format, PDF for printing'],
              ['KPiR data (Dane do KPiR)', 'A summary for the accounting office for the KPiR (Polish revenue and expense ledger)'],
              ['Driver business trips (Delegacje kierowców)', 'Trips with per diems and flat-rate allowances'],
              ['Monthly PITs (Miesięczne PIT-y)', 'Data for employee income tax (PIT) settlements'],
              ['EU VAT refund (Zwrot VAT z UE)', 'The annual claim for VAT on fuel and motorways, per country'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'You can download reports as PDF or CSV — depending on whether they’re for printing or for a spreadsheet.',
          },
        ],
      },
    ],
    powiazane: ['przejazdy-i-kilometrowka', 'eksport-dla-ksiegowej'],
  },
];
