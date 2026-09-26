import type { Artykul } from '@/content/pomoc/typy';

/**
 * Pierwsze kroki — wersja angielska. Slugi i `powiazane` zostają polskie,
 * adresy angielskie wylicza `i18n/trasy.ts`.
 *
 * Aplikacja jest dziś tylko po polsku, więc przy pierwszym wystąpieniu
 * przycisku w artykule w nawiasie stoi jego polska etykieta — po niej
 * czytelnik znajdzie go na ekranie.
 */
export const artykulyStartEn: Artykul[] = [
  {
    slug: 'zakladamy-konto',
    kategoria: 'start',
    tytul: 'How to create an account',
    lead: 'We set up accounts after a short call — and that’s a choice, not a missing button.',
    role: ['wlasciciel'],
    czas: 'A thirty-minute call, account the same day',
    rozdzialy: [
      {
        tytul: 'Why a call',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'On the call we match the plan to the size of your fleet and set up the company with you: vehicles, drivers and the export to your accounting software. After the call you get a sign-up link.',
          },
          {
            typ: 'akapit',
            tresc:
              'A first day with an empty system usually means an hour of clicking through settings nobody warned you about. We’d rather go through that hour with you once than leave you with a sign-up form and a hope.',
          },
        ],
      },
      {
        tytul: 'How to book it',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Write to us or book a call',
                opis: 'The address and the form are on the contact page. We reply the same working day.',
              },
              {
                tytul: 'Have three things ready for the call',
                opis: 'Your company’s NIP (Polish tax ID), the number of vehicles and the name of the accounting software your accountant uses.',
              },
              {
                tytul: 'Open the sign-up link',
                opis: 'There you set a password and go straight into the owner account.',
              },
            ],
          },
          {
            typ: 'wkrotce',
            tresc:
              'Sign-up without a call and a self-service demo are planned. They don’t exist yet — on the website you join a notification list, you don’t create an account.',
          },
        ],
      },
    ],
    powiazane: ['dane-firmy', 'dodajemy-pojazd'],
  },

  {
    slug: 'dane-firmy',
    kategoria: 'start',
    tytul: 'Company details and setup',
    lead: 'Fill it in once — every invoice and every export takes its data from here.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Settings → Company → Company details (Ustawienia → Firma → Dane firmy)',
    czas: 'Fifteen minutes',
    zanim: [
      'NIP, REGON and the address from the company register',
      'The company bank account number',
      'The name of your accounting software',
    ],
    rozdzialy: [
      {
        tytul: 'What to fill in straight away',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Go to Settings → Company details (Ustawienia → Dane firmy)',
                opis: 'Only Company name * (Nazwa firmy *) is required. The form accepts the rest as optional, but without it your invoices will be incomplete.',
              },
              {
                tytul: 'Fill in the registration details',
                opis: 'NIP (tax ID), REGON (business ID), KRS (court register number), street and number, city, postcode, country. The full name goes on invoices, the short name on lists inside the system.',
              },
              {
                tytul: 'Set your tax status',
                opis: 'VAT payer (Płatnik VAT) and — for transport within the EU — EU VAT (VAT EU) and EU VAT prefix (Prefix EU VAT).',
              },
              {
                tytul: 'Enter the bank account',
                opis: 'The IBAN and SWIFT / BIC are printed on the invoice. Without them your client has nowhere to send the money.',
              },
              {
                tytul: 'Choose the Accounting system (System księgowy) and the Company code in FK (Symbol firmy w FK)',
                opis: 'The options are Insert GT, Comarch ERP Optima and Symfonia FK. This decides the file format your accountant receives.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Enter your transport licence number now, even if you don’t need it today. During a roadside check people hunt for it in a hurry — here it sits in one place with everything else.',
          },
        ],
      },
      {
        tytul: 'Monthly targets',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'At the bottom of the form there are three fields: monthly revenue target, monthly cost target and monthly profit target, all in PLN (Cel miesięczny przychodu / kosztów / zysku). The dashboard then shows how far you are from the target instead of a bare figure.',
          },
          {
            typ: 'akapit',
            tresc: 'You can leave them empty — the dashboard just won’t draw the progress bars.',
          },
        ],
      },
      {
        tytul: 'The rest of the settings',
        bloki: [
          {
            typ: 'lista',
            wstep: 'You’ll come back to these once you start invoicing and settling up:',
            punkty: [
              'Branding and invoices (Branding i faktury) — your logo and the look of documents sent to clients.',
              'Mileage rates (Stawki kilometrówki) — the per-kilometre rates used to calculate the mileage log.',
              'Exchange rates (Kursy walut) — NBP (National Bank of Poland) rates, with the option to enter your own.',
              'Alert thresholds (Progi alertów) — how many days before a deadline the system should warn you.',
              'KSeF — the connection to KSeF, Poland’s national e-invoicing system.',
            ],
          },
        ],
      },
    ],
    powiazane: ['dodajemy-pojazd', 'zespol-i-role'],
  },

  {
    slug: 'dodajemy-pojazd',
    kategoria: 'start',
    tytul: 'How to add a vehicle',
    lead: 'No vehicle means no kilometres, no fuel costs and no mileage log. It’s the first thing to do after the company details.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Vehicles → New vehicle (Pojazdy → Nowy pojazd)',
    czas: 'Five minutes per vehicle',
    zanim: [
      'The registration certificate — VIN, year of manufacture, gross vehicle weight',
      'Today’s odometer reading',
    ],
    rozdzialy: [
      {
        tytul: 'Filling in the form',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Vehicles (Pojazdy) and click New vehicle (Nowy pojazd)' },
              {
                tytul: 'Enter the identification details',
                opis: 'Registration number *, VIN *, make *, model *, year of manufacture *, vehicle type *. An asterisk means the form won’t save without it.',
              },
              {
                tytul: 'Add the technical details',
                opis: 'Fuel type *, gross vehicle weight (DMC, kg), engine capacity (cm³), power (kW), Euro emission standard. The gross weight decides which rules apply to the vehicle.',
              },
              {
                tytul: 'Set the Starting odometer (Licznik początkowy, km) and the Log start date (Data startu ewidencji)',
                opis: 'This is your zero point. The whole mileage log is counted from this date and this reading — enter the reading from the day you start working in BusiKM, not the day you bought the vehicle.',
              },
              {
                tytul: 'Fill in the VAT-26 filing date (Data zgłoszenia VAT-26) if the vehicle has been registered for it',
                opis: 'VAT-26 is the Polish tax form for vehicles used solely for business, with full VAT deduction.',
              },
              { tytul: 'Save (Zapisz)' },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'You can’t freely correct the starting odometer after a month of work — the whole mileage would be recalculated. Check the reading before you save.',
          },
        ],
      },
      {
        tytul: 'Vehicle documents',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Once saved, open the vehicle card and add its documents with their expiry dates. From then on the system keeps track of the deadlines for you.',
          },
          {
            typ: 'tabela',
            naglowki: ['Category', 'What goes in it'],
            wiersze: [
              ['Registration certificate', 'Registration certificate, certified copy of the licence'],
              ['Insurance', 'Third-party liability (OC), comprehensive (AC), personal accident (NNW), GAP, green card'],
              ['Inspections and tachograph', 'Roadworthiness test, tachograph certificate and calibration, emission standard'],
              ['Specialist certificates', 'ATP, vehicle ADR'],
              ['Licences and leasing', 'Transport licence, lease agreement'],
            ],
          },
        ],
      },
    ],
    powiazane: ['dokumenty-i-terminy', 'przejazdy-i-kilometrowka'],
  },
];
