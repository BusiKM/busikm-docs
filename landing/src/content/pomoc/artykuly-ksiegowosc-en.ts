import type { Artykul } from '@/content/pomoc/typy';

/**
 * Rozliczenia – wersja angielska. Ta sama zasada co w polskiej: Rozliczenia
 * i Raporty widzą właściciel i księgowa, dyspozytor nie, i instrukcja mówi
 * to wprost.
 */
export const artykulyKsiegowoscEn: Artykul[] = [
  {
    slug: 'przejazdy-i-kilometrowka',
    kategoria: 'ksiegowosc',
    tytul: 'Trips and the mileage log',
    lead: 'Routes are recorded from the driver’s phone. The driver confirms them, the owner approves them, and the mileage log builds itself.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Settlements → Mileage log (Rozliczenia → Ewidencja przebiegu)',
    czas: 'A few minutes a week',
    rozdzialy: [
      {
        tytul: 'Where trips come from',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The driver app records the route from “Start the day” (Zacznij dzień) to the final odometer reading. Nobody copies kilometres from the odometer into a notebook – the trip appears on its own, with the date and distance.',
          },
          {
            typ: 'akapit',
            tresc:
              'You can also add a trip by hand with New trip (Nowa trasa) when the phone was switched off. You reach the trip list from the mileage log (Trasy pojazdu) or from the vehicle card, in the Mileage and trips tab (Przebieg i przejazdy).',
          },
        ],
      },
      {
        tytul: 'Confirming and approving',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'The driver confirms their trips',
                opis: 'Until then the trip has the status Waiting for driver (Oczekuje na kierowcę).',
              },
              {
                tytul: 'Check the trip type and purpose',
                opis: 'Business (Służbowa) or Private (Prywatna). Purpose: delivery of goods, empty run, vehicle service, technical run or other. You fix a wrong classification with Change classification (Zmień klasyfikację) – until the FK export.',
              },
              {
                tytul: 'The owner confirms or rejects the trip',
                opis: 'Several at once: tick the trips and click Confirm selected (Potwierdź zaznaczone).',
              },
              {
                tytul: 'Approve the vehicle’s mileage log',
                opis: 'In Settlements → Mileage log the owner or the accountant clicks Approve log (Zatwierdź ewidencję). If drivers are behind with confirming, Remind drivers (Przypomnij kierowcom) sends them a reminder. You can download the finished log as PDF.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'The mileage log is needed to deduct 100% VAT on a vehicle registered on the VAT-26 form. A vehicle with private kilometres deducts 50%.',
          },
        ],
      },
      {
        tytul: 'Mileage rates',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Mileage rates, allowances and NBP exchange rates are in Settings → Statutory rates (Stawki z przepisów). They’re for reference only – we take them from the regulations.',
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
    lead: 'Six steps, each with a link to what’s missing. At the end you close the month and download the final files.',
    role: ['ksiegowa', 'wlasciciel'],
    gdzie: 'Settlements → Month (Rozliczenia → Miesiąc)',
    czas: 'A quarter of an hour a month, when everything is up to date',
    zanim: ['An approved mileage log for every vehicle', 'Approved driver payroll and allowances'],
    rozdzialy: [
      {
        tytul: 'Six steps',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The counter shows how many steps are done. You can do them in any order – each one takes you to where you sort it out.',
          },
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Sales invoices' },
              { tytul: 'Costs', opis: 'With a list of costs missing a document.' },
              { tytul: 'Mileage log', opis: 'How many vehicles have an approved log.' },
              { tytul: 'Payroll and allowances', opis: 'How many driver settlements are approved.' },
              { tytul: 'Tax returns', opis: 'What’s due to be filed.' },
              { tytul: 'Close the month and download the files' },
            ],
          },
        ],
      },
      {
        tytul: 'What blocks closing',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'You can’t close the month until payroll and the mileage log are approved. Costs without a document don’t block it – they stay on the list of gaps.',
          },
          {
            typ: 'akapit',
            tresc:
              'Closing locks changes to the month’s invoices, trips, payroll and advances, and the files for the accounting office become final. The owner or the accountant closes the month.',
          },
        ],
      },
      {
        tytul: 'Reopening',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'If something needs fixing, click Reopen the month (Otwórz ponownie) and say why. The reason goes into the company history, and the Previous months section shows when and why the month was reopened.',
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
    lead: 'One pack per month, in a format your accountant can import without retyping.',
    role: ['ksiegowa', 'wlasciciel'],
    gdzie: 'Settlements → Exports (Rozliczenia → Eksporty)',
    czas: 'Two minutes',
    zanim: [
      'Accounting software set in Settings → Accounting software (Program księgowy)',
      'A closed month – if the files are to be final',
    ],
    rozdzialy: [
      {
        tytul: 'Who does it',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The owner and the accountant see the exports. The dispatcher doesn’t have Settlements in their menu.',
          },
        ],
      },
      {
        tytul: 'The office pack',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settlements → Exports' },
              {
                tytul: 'Click Download the office pack (Pobierz paczkę dla biura)',
                opis: 'You get one ZIP file: FK accounting entries in the format of the program set in settings, registers, payroll and business trips.',
              },
              {
                tytul: 'Check whether the version is final',
                opis: 'Before the month is closed, the pack is a working version. After closing it’s final and also includes JPK_V7M – provided the company is an active VAT payer.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Individual files',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['File', 'What you get'],
            wiersze: [
              ['FK accounting entries', 'Comarch Optima (XML), Insert GT (EPP) or Symfonia (TXT with an AMS template)'],
              ['VAT registers', 'Excel or PDF'],
              ['Payroll and allowances', 'Excel or CSV'],
              ['Driver business trips', 'ZIP'],
              ['Mileage logs', 'ZIP'],
              ['KPiR summary, JPK_PKPIR', 'For tax on the revenue and expense ledger: Excel, CSV, XML'],
              ['EU VAT refund (VAT-REF)', 'A summary for the application'],
              ['JPK_FA', 'XML, only when the tax office asks for it'],
              ['JPK_V7M', 'After the month is closed'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'If the accounting office uses a different program, choose “Other program” (Inny program) in Settings → Accounting software – you get a CSV file.',
          },
          {
            typ: 'uwaga',
            tresc:
              'You can generate FK entries at most three times a month per program – enough for the proper version and two corrections. The office pack isn’t subject to this limit. FK entries are for completed months, not the current one.',
          },
          {
            typ: 'akapit',
            tresc:
              'Every file stays in the file history (Historia plików). You can download it again for 30 days.',
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
    lead: 'Seven tabs. Each one shows one thing you end up asking about anyway.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Reports (Raporty)',
    rozdzialy: [
      {
        tytul: 'Tabs',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Tab', 'What it shows'],
            wiersze: [
              ['Result (Wynik)', 'Revenue, costs and what you keep'],
              ['Clients (Klienci)', 'Which clients you make money on'],
              ['Orders and routes (Zlecenia i trasy)', 'Which orders bring profit and which only turnover'],
              ['Fleet (Flota)', 'What each vehicle costs'],
              ['Drivers (Kierowcy)', 'Drivers’ work – only the owner sees this tab'],
              ['Costs (Koszty)', 'Where the money goes'],
              ['Receivables (Należności)', 'Who hasn’t paid yet'],
            ],
          },
        ],
      },
      {
        tytul: 'Period and comparison',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'You choose a month, quarter, year or your own range and compare it with the previous period or the same period a year ago. Revenue can be counted from invoices or from orders.',
          },
        ],
      },
      {
        tytul: 'Downloading',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Under the Download button (Pobierz): a printable PDF, Excel (XLSX) or CSV of the current tab, and a Monthly report (PDF) with all the tabs for the month in one file.',
          },
          {
            typ: 'akapit',
            tresc:
              'The mileage log as PDF and the files for the tax office are in Settlements, not in Reports.',
          },
        ],
      },
    ],
    powiazane: ['przejazdy-i-kilometrowka', 'eksport-dla-ksiegowej'],
  },
];
