import type { Artykul } from '@/content/pomoc/typy';

/** Zlecenia, dyspozytornia, kontrahenci i faktury – wersja angielska. */
export const artykulyZleceniaEn: Artykul[] = [
  {
    slug: 'nowe-zlecenie',
    kategoria: 'zlecenia',
    tytul: 'How to create an order',
    lead: 'Four steps in the wizard. The draft saves itself on this device, so stopping to take a call doesn’t lose anything.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Orders → New order (Zlecenia → Nowe zlecenie)',
    czas: 'Five minutes the first time, two after that',
    zanim: [
      'The client in your database – or the details to add them',
      'Loading and unloading addresses',
      'The agreed freight rate',
    ],
    rozdzialy: [
      {
        tytul: 'Four steps of the wizard',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'At the bottom you see “Step X of 4” (Krok X z 4). You move between steps with Back (Wstecz) and Next (Dalej), and you can change everything later. The draft is saved in the browser on this device and disappears once you create the order.',
          },
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Client (Klient)',
                opis: 'Who is ordering the transport: Client, Payer and the client’s order number. The payer is sometimes someone other than the client, and that’s normal. Under Start faster (Zacznij szybciej) you can start from a previous order.',
              },
              {
                tytul: 'Route (Trasa)',
                opis: 'Stops in driving order. Each is a loading (Załadunek) or unloading (Rozładunek), with an address, day and time window, reference number and contact on site.',
              },
              {
                tytul: 'Load (Ładunek)',
                opis: 'Load description, weight (kg), EUR pallets, loading metres (LDM), volume (m³) and goods value. Plus controlled temperature, dangerous goods (ADR) and pallet exchange, where they apply.',
              },
              {
                tytul: 'Price and terms (Cena i warunki)',
                opis: 'Net freight and currency, payment term (days) from the client card and payment method. This is also where you add notes for the driver – they see them in the app – and an internal note that only the office sees.',
              },
              {
                tytul: 'Create order (Utwórz zlecenie)',
                opis: 'Or straight away Create and assign a driver (Utwórz i przypisz kierowcę) – you go directly to assigning in Dispatch.',
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
              'You assign the driver and vehicle in Dispatch (Przypisz) or on the order card (Przypisz kierowcę). The panel shows who will make the loading in time and marks the recommended vehicle. Assign and notify (Przypisz i powiadom) sends the job to the driver’s app, with the route and time windows.',
          },
          {
            typ: 'akapit',
            tresc:
              'The driver accepts the order in the app or rejects it with a reason. Until then the list shows “Waiting for driver” (Czeka na kierowcę). With no answer for 4 hours, the order goes back to drafts without a driver.',
          },
          {
            typ: 'uwaga',
            tresc:
              'If no vehicle can make it in time, hand the job to a carrier – in the last step of the wizard (Oddaj przewoźnikowi) or from the order card.',
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
    lead: 'The queue, the fleet map and the fleet plan in one place – instead of phoning round the drivers.',
    role: ['dyspozytor', 'wlasciciel'],
    gdzie: 'Dispatch (Dyspozytornia)',
    rozdzialy: [
      {
        tytul: 'What’s on the screen',
        bloki: [
          {
            typ: 'lista',
            wstep: 'At the top, counters that tell you whether the day is going to plan:',
            punkty: [
              'Loadings today and unloadings today.',
              'On the road – vehicles under way.',
              'To assign – jobs without a driver.',
              'Free vehicles.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Below the counters is the queue with the tabs Needs attention (Wymaga reakcji – start here), To assign and On the road, and next to it the fleet map with the filter All, On the road, Free and Service. Further down is the fleet plan for 3 days or a week. On a phone you switch between List, Map and Fleet plan.',
          },
          {
            typ: 'uwaga',
            tresc: 'The live fleet map is part of the Business plan.',
          },
        ],
      },
      {
        tytul: 'Dealing with a delay',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Check the Needs attention tab',
                opis: 'A delay shows up there on its own: “will be N min late”, with the arrival time and the end of the unloading window. We work out the arrival time from the vehicle’s position.',
              },
              {
                tytul: 'Click Notify client (Powiadom klienta)',
                opis: 'The email goes to the address on the client card. Better that the client hears it from you two hours early than from their warehouse after the fact.',
              },
              {
                tytul: 'Message the driver',
                opis: 'Reply (Odpowiedz) opens the chat on the order card. The message reaches the app on their phone – no need to call someone who’s driving.',
              },
              {
                tytul: 'Change the time slot if needed',
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
    lead: 'Enter a client once and they’re suggested in orders and invoices, with their own currency and payment terms.',
    role: ['dyspozytor', 'wlasciciel', 'ksiegowa'],
    gdzie: 'Clients → Add client (Kontrahenci → Dodaj kontrahenta)',
    czas: 'Two minutes',
    rozdzialy: [
      {
        tytul: 'Company details',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Clients and click Add client (Dodaj kontrahenta)' },
              {
                tytul: 'Choose the type of company',
                opis: 'A company from Poland, a company from the EU, or no tax ID.',
              },
              {
                tytul: 'Enter the tax ID and click Fetch details (Pobierz dane)',
                opis: 'We check a Polish NIP in the GUS register and on the Ministry of Finance white list, and an EU VAT number in VIES. You also see the VAT status. If the register isn’t responding, choose I’ll type it in (Wpiszę ręcznie).',
              },
              {
                tytul: 'Mark what you do together',
                opis: 'Client, Carrier or Supplier. For a carrier you also add the OCP policy and licence.',
              },
              {
                tytul: 'Add a contact person',
                opis: 'Optional – who picks up the phone when there’s a problem at loading.',
              },
              { tytul: 'Click Save client (Zapisz kontrahenta)' },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'If the company is already in BusiKM, the form spots it – the client won’t be created twice.',
          },
        ],
      },
      {
        tytul: 'Billing terms',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The payment term (30 days by default) and the currency – based on the company’s country, which you can change – are then suggested on invoices. Set them once instead of correcting them every month.',
          },
          {
            typ: 'lista',
            wstep: 'Also worth filling in:',
            punkty: [
              'Invoice email – where the invoice goes, usually different from the sales contact.',
              'A contact person with a phone number – for when something goes wrong on site.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'If the client wants one invoice for many orders, click Collective invoice (Faktura zbiorcza) in the client preview on the list.',
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
    lead: 'From a delivered order to an invoice in KSeF and a PDF in your client’s inbox.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Invoices → New invoice (Faktury → Nowa faktura)',
    czas: 'A few minutes',
    zanim: [
      'Complete company details, including the bank account',
      'The client in your database, with a tax ID',
      'A KSeF connection in Settings → KSeF',
    ],
    rozdzialy: [
      {
        tytul: 'Issuing',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Go to Invoices and click New invoice (Nowa faktura)',
                opis: 'Or on the order card choose Issue invoice (Wystaw fakturę) – a draft is created from the order data.',
              },
              {
                tytul: 'Choose From orders (Ze zleceń)',
                opis: 'You tick the delivered orders and the client, route, freight, currency and exchange rate carry over by themselves. You can also choose a blank sales invoice, an advance invoice, a pro forma for prepayment or an invoice settling advances.',
              },
              {
                tytul: 'Check the transaction type and VAT',
                opis: 'Client from Poland, company from another EU country, company outside the EU, transport from or to outside the EU, or domestic reverse charge.',
              },
              {
                tytul: 'Check the dates',
                opis: 'The sale date defaults to the day the order was completed. The payment term counts from the issue date, and the number of days comes from the client card.',
              },
              {
                tytul: 'For a foreign currency, check the rate',
                opis: 'We take the NBP rate from the last working day before the sale date. You can enter a different one if the contract says otherwise.',
              },
              {
                tytul: 'Click Issue and send to KSeF (Wystaw i wyślij do KSeF)',
                opis: 'The invoice gets its number and goes straight to KSeF. Without a KSeF connection the button is called Issue invoice (Wystaw fakturę). If it isn’t ready, keep it as a draft.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Sending to the client and payment',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'On the invoice, click Send to client (Wyślij klientowi). For an invoice in KSeF you choose Send once numbered (Wyślij po nadaniu numeru) – the email with the PDF and QR code goes out as soon as KSeF assigns the number. The address comes from the client card.',
          },
          {
            typ: 'akapit',
            tresc:
              'The invoice card shows its path: Issued, In KSeF, With the client, Paid.',
          },
          {
            typ: 'lista',
            wstep: 'On the invoice, in the buttons and the More actions menu (Więcej akcji):',
            punkty: [
              'Record payment (Zarejestruj wpłatę) – amount, date and payment method.',
              'Resend PDF (Wyślij ponownie PDF) – when the client has lost the email.',
              'Issue a correction (Wystaw korektę) – an invoice in KSeF can’t be cancelled or deleted; you change it with a correction.',
              'Duplicate as a new invoice (Powiel jako nową fakturę) – when the next one is almost the same.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The tabs above the list filter what matters most: Drafts, To send to KSeF, To be paid, Overdue, Paid and Corrections. “Overdue” is your list of calls to make this week.',
          },
          {
            typ: 'uwaga',
            tresc:
              'We put payment reminders together every day – 3 days before the due date and 7 and 14 days after it. Nothing goes out on its own: you review them under the Reminders button (Przypomnienia) on the invoice list and send the ones you tick.',
          },
        ],
      },
      {
        tytul: 'Collective invoice',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'When a client wants one invoice for many orders, choose New invoice → From orders and tick the orders, or click Collective invoice (Faktura zbiorcza) in the client preview. With several clients at once you choose whether there’s one invoice per client and currency, or a separate one for each order.',
          },
        ],
      },
    ],
    powiazane: ['kontrahenci', 'eksport-dla-ksiegowej'],
  },
];
