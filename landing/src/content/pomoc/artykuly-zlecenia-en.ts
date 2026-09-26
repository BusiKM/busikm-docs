import type { Artykul } from '@/content/pomoc/typy';

/** Zlecenia, dyspozytornia, kontrahenci i faktury — wersja angielska. */
export const artykulyZleceniaEn: Artykul[] = [
  {
    slug: 'nowe-zlecenie',
    kategoria: 'zlecenia',
    tytul: 'How to create an order',
    lead: 'A five-step wizard. The draft saves itself, so stopping to take a phone call doesn’t wipe anything.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Orders → New order (Zlecenia → Nowe zlecenie)',
    czas: 'Five minutes the first time, two after that',
    zanim: [
      'The client in your database — or the details to add them',
      'Loading and unloading addresses',
      'The agreed freight rate',
    ],
    rozdzialy: [
      {
        tytul: 'The five wizard steps',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'At the top you see “Step X of 5” (Krok X z 5). You move between steps with Back (Wstecz) and Next (Dalej) — nothing gets lost on the way, because the form saves a draft in the browser.',
          },
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Parties (Kontrahenci)',
                opis: 'Sender *, recipient *, payer and external reference — the number the order goes by at the client’s end. The payer is often someone other than the sender, and that’s normal.',
              },
              {
                tytul: 'Cargo (Ładunek)',
                opis: 'Cargo description *, weight (kg) *, number of pallets, volume (m³), cargo value with its currency.',
              },
              {
                tytul: 'Route (Trasa)',
                opis: 'From address * and To address * with city, postcode and country, plus the time windows: loading date from/to and delivery date from/to. With several stops you add further legs, each with a type and planned times.',
              },
              {
                tytul: 'Billing (Rozliczenie)',
                opis: 'Freight amount * and currency *, VAT (%), extra charges, payment method and payment term (days) *. This is also where you add instructions for the client and internal notes — the latter stay inside the company.',
              },
              {
                tytul: 'Summary (Podsumowanie)',
                opis: 'A last look at the whole thing. You confirm with Create order (Utwórz zlecenie).',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Assigning a driver',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'A new order lands on the list without a driver. You assign one from the order list or from Dispatch (Dyspozytornia) — the driver gets a notification on their phone and sees the order in the “To accept” (Do akceptacji) section.',
          },
          {
            typ: 'akapit',
            tresc:
              'To assign several orders at once, tick the rows on the list and use a bulk action — handy when you’re planning a whole day.',
          },
        ],
      },
    ],
    powiazane: ['dyspozytornia', 'faktura-za-zlecenie', 'trasa-kierowcy'],
  },

  {
    slug: 'dyspozytornia',
    kategoria: 'zlecenia',
    tytul: 'Dispatch day to day',
    lead: 'The map, active orders and messages in one window — instead of ringing round the drivers.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Dispatch (Dyspozytornia)',
    rozdzialy: [
      {
        tytul: 'What’s on the screen',
        bloki: [
          {
            typ: 'lista',
            wstep: 'At the top, four counters tell you whether the day is going to plan:',
            punkty: [
              'Active orders (Aktywne zlecenia) — everything happening right now.',
              'New today (Nowe dziś) — how many have come in since the morning.',
              'In transit (W transporcie) — vehicles on the road.',
              'ETA at risk (Zagrożone ETA) — the ones that won’t make their time window. Deal with these first.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Below the counters are three tabs: Overview (Przegląd) with the order list, Tracking with the vehicle map, and Messages (Wiadomości). Clicking an order opens a side panel with the details — the map stays visible.',
          },
        ],
      },
      {
        tytul: 'Responding to a delay',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Open the ETA at risk counter' },
              {
                tytul: 'Open the order and check where the vehicle is',
                opis: 'You see where the driver is and how late they’re running against the window.',
              },
              {
                tytul: 'Message the driver in the Messages tab',
                opis: 'The message reaches the app on their phone. You don’t have to ring someone who’s driving.',
              },
              {
                tytul: 'Warn the client',
                opis: 'Better they hear it from you two hours early than from their own warehouse after the fact.',
              },
            ],
          },
        ],
      },
    ],
    powiazane: ['nowe-zlecenie', 'trasa-kierowcy'],
  },

  {
    slug: 'kontrahenci',
    kategoria: 'zlecenia',
    tytul: 'Adding a client',
    lead: 'Enter a client once and they’re suggested in orders and invoices, with their own currency and payment term.',
    role: ['dyspozytor', 'wlasciciel', 'ksiegowa'],
    gdzie: 'Clients → New client (Kontrahenci → Nowy kontrahent)',
    czas: 'Three minutes',
    rozdzialy: [
      {
        tytul: 'Company details',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Clients (Kontrahenci) and click New client (Nowy kontrahent)' },
              {
                tytul: 'Enter the Company name * and NIP (tax ID)',
                opis: 'For a client in the EU, click Check VAT in VIES (Sprawdź VAT w VIES) — the system confirms the number in the EU database before you issue an invoice without VAT.',
              },
              {
                tytul: 'Fill in the address',
                opis: 'Street and number, city, postcode, country.',
              },
              {
                tytul: 'Tick the roles',
                opis: 'Sender (Nadawca), Recipient (Odbiorca), Payer (Płatnik) — one company can be all three. This decides where it’s suggested in the order wizard.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Payment terms',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Default currency * and Default payment term (days) * then go into every invoice for this client. Set them once instead of correcting them every month.',
          },
          {
            typ: 'lista',
            wstep: 'Also worth filling in:',
            punkty: [
              'Billing email — where the invoice goes, usually not the same as the sales contact.',
              'Contact person and phone — who picks up when there’s a problem at loading.',
              'Collective invoice (Faktura zbiorcza) — when the client wants one invoice a month instead of ten.',
            ],
          },
        ],
      },
    ],
    powiazane: ['nowe-zlecenie', 'faktura-za-zlecenie'],
  },

  {
    slug: 'faktura-za-zlecenie',
    kategoria: 'zlecenia',
    tytul: 'Issuing an invoice',
    lead: 'From a closed order to a PDF in your client’s inbox.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Sales invoices → New invoice (Faktury sprzedaży → Nowa faktura)',
    czas: 'A few minutes',
    zanim: [
      'Company details filled in, including the bank account',
      'The client with their NIP (tax ID) in your database',
    ],
    rozdzialy: [
      {
        tytul: 'Issuing',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Go to Sales invoices (Faktury sprzedaży)',
                opis: 'If there are orders without an invoice, a bar at the top of the list tells you — it’s the quickest way to issue one.',
              },
              { tytul: 'Click New invoice (Nowa faktura)' },
              {
                tytul: 'Choose the Invoice type * and the Client *',
                opis: 'The rest of the client’s details fill in by themselves, including their currency and payment term.',
              },
              {
                tytul: 'Set the dates',
                opis: 'Issue date *, sale date and payment due date *. You can give the due date in days — the date works itself out.',
              },
              {
                tytul: 'Add the Invoice items (Pozycje faktury)',
                opis: 'Service name, quantity, price and VAT rate. The net total and gross total update as you go, under the table.',
              },
              {
                tytul: 'With a foreign currency, check the rate',
                opis: 'Currency *, rate to PLN, NBP table and NBP rate date fill in from the NBP (National Bank of Poland) rate for the day before the issue date. You can override them if your contract says otherwise.',
              },
              {
                tytul: 'Add notes if needed',
                opis: 'Notes visible on the invoice go on the document. Internal notes, not visible to the client, stay with you.',
              },
              { tytul: 'Save invoice (Zapisz fakturę)' },
            ],
          },
        ],
      },
      {
        tytul: 'Sending and payment',
        bloki: [
          {
            typ: 'lista',
            wstep: 'From the invoice list, under the action button on each row:',
            punkty: [
              'Download PDF (Pobierz PDF) — a document ready to print.',
              'Send email (Wyślij email) — with a CC field and your own subject line if you want to change the default.',
              'Mark as paid (Oznacz zapłaconą) — once the transfer has arrived.',
              'Cancel invoice (Anuluj fakturę) — with a reason.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The tabs above the list filter what matters most: Receivables (Należności), Paid (Opłacona), Overdue (Po terminie), Cancelled (Anulowana). “Overdue” is this week’s list of calls to make.',
          },
          {
            typ: 'uwaga',
            tresc:
              'You send payment reminders from the same list — no writing an email from scratch or hunting for who you’ve already reminded.',
          },
        ],
      },
      {
        tytul: 'Collective invoice',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'When a client wants one invoice for many orders, use collective mode: you pick the client and the period, the system lists the orders not yet invoiced, and you confirm the summary.',
          },
        ],
      },
    ],
    powiazane: ['kontrahenci', 'eksport-dla-ksiegowej'],
  },
];
