import type { Artykul } from '@/content/pomoc/typy';

/**
 * Pierwsze kroki – wersja angielska. Slugi i `powiazane` zostają polskie,
 * adresy angielskie wylicza `i18n/trasy.ts`.
 *
 * Aplikacja jest dziś tylko po polsku, więc przy pierwszym wystąpieniu
 * przycisku w artykule w nawiasie stoi jego polska etykieta – po niej
 * czytelnik znajdzie go na ekranie.
 */
export const artykulyStartEn: Artykul[] = [
  {
    slug: 'zakladamy-konto',
    kategoria: 'start',
    tytul: 'How to create an account',
    lead: 'You start with your tax ID (NIP) and we fetch the rest of the company details from the register. For now we open accounts for people on the list.',
    role: ['wlasciciel'],
    czas: 'Five minutes, including confirming your email',
    zanim: ['Your company’s tax ID (NIP)', 'An email address for the confirmation'],
    rozdzialy: [
      {
        tytul: 'Where things stand',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'We’re testing BusiKM on real routes with a small group of companies. Join the list on the “Sign in” page and we’ll write when we open an account for you.',
          },
          {
            typ: 'wkrotce',
            tresc:
              'Sign-up for everyone and a demo you can explore on your own are coming soon. Until then, the website puts you on a list rather than creating an account.',
          },
        ],
      },
      {
        tytul: 'Signing up step by step',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Enter your company’s tax ID (NIP)',
                opis: 'We fetch the name and address from the register. If something isn’t there, you fill in the company details yourself.',
              },
              {
                tytul: 'Enter your details',
                opis: 'First name, last name and email. The confirmation goes to that address.',
              },
              { tytul: 'Set a password' },
              {
                tytul: 'Confirm your email address',
                opis: 'Click the link in the email. Your account is active and the 14-day trial – no card needed – has started.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'The trial is available once per company. If a company with that NIP already has a BusiKM account, sign-up tells you straight away and shows you what to do next.',
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
    lead: 'Fill it in once – every invoice and every export takes its data from here.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Settings → Company details (Ustawienia → Dane firmy)',
    czas: 'A quarter of an hour',
    zanim: ['Your business bank account number', 'The accounting software your accounting office uses'],
    rozdzialy: [
      {
        tytul: 'What to fill in straight away',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Go to Settings → Company details (Ustawienia → Dane firmy)',
                opis: 'Some of it is already filled in from the register when you signed up. Check it – we print it on invoices, CMRs and the exports for your accountant.',
              },
              {
                tytul: 'Complete the registration details',
                opis: 'Company name, short name, NIP, REGON, KRS and registered address. Add the full name for JPK if it differs from the company name.',
              },
              {
                tytul: 'Add your EU VAT number if you invoice companies in the EU',
                opis: 'The EU VAT prefix is needed on invoices for companies in other EU countries.',
              },
              {
                tytul: 'Add a bank account',
                opis: 'Settings → Bank accounts (Konta bankowe). The number is printed on the invoice – without it your client has nowhere to pay.',
              },
              {
                tytul: 'Choose your accounting software',
                opis: 'Settings → Accounting software (Program księgowy): Insert GT (also Rachmistrz), Comarch Optima, Symfonia, or another program with a CSV file. Insert GT also needs the company symbol used in the program. This is also where you pick your tax office and the JPK details.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Add your transport licence and its certified copies straight away in Settings → Licence and copies (Licencja i wypisy), even if you don’t need them today. At a roadside check people hunt for them in a rush – here they sit in one place.',
          },
        ],
      },
      {
        tytul: 'Company goals',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'In Settings → Company goals (Cele firmy) you set monthly revenue, costs and profit, plus a minimum margin per order. The dashboard then shows how much of the goal you’ve reached, and orders below the margin are flagged in Reports and on the order list.',
          },
          {
            typ: 'akapit',
            tresc: 'You can leave the goals empty – the dashboard simply won’t show them.',
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
              'Logo on documents (Logo na dokumentach) – your logo on invoices and documents for clients.',
              'Invoices (Faktury) – invoice numbering and the default payment term.',
              'KSeF – the connection to Poland’s National e-Invoicing System.',
              'Deadline reminders (Przypomnienia o terminach) – we remind you 60, 30, 14 and 3 days before a document expires.',
              'Statutory rates (Stawki z przepisów) – allowances, mileage rates and NBP exchange rates, for reference.',
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
    lead: 'No vehicle means no kilometres, no fuel costs and no mileage log. A photo of the registration certificate is enough.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Vehicles → Add vehicle (Pojazdy → Dodaj pojazd)',
    czas: 'Three minutes per vehicle',
    zanim: ['The registration certificate – photos of all pages or a PDF', 'Today’s odometer reading'],
    rozdzialy: [
      {
        tytul: 'Three steps of the wizard',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Vehicles and click Add vehicle (Dodaj pojazd)' },
              {
                tytul: 'From the certificate (Z dowodu)',
                opis: 'Upload a photo of the registration certificate – you can pick several photos at once. AI reads the registration number, VIN, make, model, year and weights, and you check the fields against the certificate. You can also type the details in yourself.',
              },
              {
                tytul: 'How you use it (Jak używasz)',
                opis: 'Who owns the vehicle (bought, leased or rented), where it drives, who the default driver is and today’s odometer reading. Among other things, this decides the VAT deduction – with full deduction you enter the date the VAT-26 form was filed.',
              },
              {
                tytul: 'Deadlines (Terminy)',
                opis: 'We work out the roadworthiness test date from the certificate. Upload the insurance policy – we read the OC, AC and NNW dates from the document.',
              },
              {
                tytul: 'Click Add vehicle',
                opis: 'The vehicle is available for assigning orders straight away. You can change everything later on the vehicle card.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Today’s odometer reading is the starting point – servicing and mileage count from it. Enter the reading from the day you start working in BusiKM, not from the day you bought the vehicle.',
          },
          {
            typ: 'akapit',
            tresc:
              'We check the registration number and VIN against your fleet, so the same vehicle can’t be added twice. Trailers and semi-trailers don’t count towards your plan’s vehicle limit.',
          },
        ],
      },
      {
        tytul: 'Vehicle documents',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Add further documents on the vehicle card, in the Deadlines and documents tab (Terminy i dokumenty). A photo or a PDF is enough – we read the type, number and dates, and you check them.',
          },
          {
            typ: 'lista',
            wstep: 'For a vehicle we keep track of, among others:',
            punkty: [
              'the registration certificate and the lease agreement,',
              'OC and AC insurance and the green card,',
              'the roadworthiness test and the tachograph calibration.',
            ],
          },
        ],
      },
    ],
    powiazane: ['dokumenty-i-terminy', 'przejazdy-i-kilometrowka'],
  },
];
