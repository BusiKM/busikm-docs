import type { Artykul } from '@/content/pomoc/typy';

/** Koszty, flota i terminy – wersja angielska. */
export const artykulyKosztyEn: Artykul[] = [
  {
    slug: 'koszty-w-biurze',
    kategoria: 'koszty',
    tytul: 'Checking costs',
    lead: 'A complete cost counts on its own. You only deal with what’s missing or needs checking.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Costs (Koszty)',
    czas: 'A quarter of an hour a week',
    rozdzialy: [
      {
        tytul: 'Cost states',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'There’s no separate approval step: a cost with complete details is Ready (Gotowe) straight away and goes into the result. The tabs above the list show where each document is, and the counter next to “Costs” in the menu shows how many are waiting for you.',
          },
          {
            typ: 'tabela',
            naglowki: ['Tab', 'What it means'],
            wiersze: [
              ['To complete (Do uzupełnienia)', 'Something is missing or needs checking – e.g. the amount, the cost type, a possible duplicate'],
              ['Ready (Gotowe)', 'Complete details, the cost counts in the result'],
              ['Posted (Zaksięgowane)', 'Passed on to the accountant'],
              ['To refund to drivers (Do zwrotu kierowcom)', 'The driver paid out of their own pocket'],
            ],
          },
        ],
      },
      {
        tytul: 'Checking a cost',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Open the To complete tab' },
              {
                tytul: 'Open the cost',
                opis: 'Next to the amounts and details you see the photo of the document – the one the driver took. No need to hunt for the paper.',
              },
              {
                tytul: 'Resolve what’s missing',
                opis: 'At the top there’s a card for each reason, with ready-made buttons – for example Save with vehicle, The amount is right, Correct the amount, or It’s the same one, keep one.',
              },
              {
                tytul: 'If something is unclear, click Ask the driver (Zapytaj kierowcę)',
                opis: 'The question goes to their app and, for a cost on an order, to the order chat too. The driver answers or takes the photo again.',
              },
              {
                tytul: 'Remove a private purchase with Not a company cost (To nie koszt firmy)',
                opis: 'With a reason. Removed costs are under the Removed filter and you can restore them.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'With more documents, tick several rows and change the type, or assign a vehicle or an order to all of them at once.',
          },
        ],
      },
      {
        tytul: 'Where costs come from',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'From drivers – a photo of the receipt from the app, on the road.',
              'From KSeF – we fetch purchase invoices every day at 6:00, so you don’t have to add them.',
              'By email – invoices forwarded to your company’s BusiKM address.',
              'From a fuel card – the collective invoice split into fill-ups.',
              'Added in the office – in Costs → Add cost (Dodaj koszt) you upload files or enter a cost without a file.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'AI reads the seller, amounts, VAT rate and date, and BusiKM checks the result. Each file is a separate cost.',
          },
          {
            typ: 'uwaga',
            tresc:
              'A cost in a foreign currency is converted at the NBP rate from the day before the document’s issue date. If the rate is missing, the cost goes to To complete with a request to enter it.',
          },
        ],
      },
      {
        tytul: 'Closing the month for costs',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The Month button (Miesiąc) above the list takes you to the month summary. You can close it once nothing is left to complete – refunds to drivers don’t block it. After closing, the month’s costs are read-only, and a document that arrives later goes on the After closing list (Po zamknięciu).',
          },
          {
            typ: 'akapit',
            tresc:
              'The accountant closes the month, or the owner if the company has no accountant in BusiKM. Reopening needs a reason, which stays in the history.',
          },
        ],
      },
    ],
    powiazane: ['paragony-kierowcy', 'eksport-dla-ksiegowej'],
  },

  {
    slug: 'dokumenty-i-terminy',
    kategoria: 'koszty',
    tytul: 'Documents and deadlines',
    lead: 'Insurance, roadworthiness tests, driver medicals and driver cards in one place – with a reminder before they expire.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Documents (Dokumenty)',
    czas: 'An hour once, then it keeps watch on its own',
    rozdzialy: [
      {
        tytul: 'Adding a document',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Go to Documents and click Add document (Dodaj dokument)',
                opis: 'You can also add it on the vehicle card (Terminy i dokumenty) or the driver card (Dokumenty i uprawnienia).',
              },
              {
                tytul: 'Upload a photo or a PDF',
                opis: 'We read the type, number, dates and what the document relates to. You check them.',
              },
              {
                tytul: 'Check the Valid until field (Ważny do)',
                opis: 'That’s the key part – without a date the document just sits there and nobody gets reminded.',
              },
              { tytul: 'Click Save document (Zapisz dokument)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'After renewing a policy, open the document and click Add new version (Dodaj nową wersję) – the previous one stays in the history.',
          },
        ],
      },
      {
        tytul: 'What we keep track of',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['For a vehicle', 'For a driver'],
            wiersze: [
              ['Registration certificate, lease agreement', 'Driving licence'],
              ['OC policy, AC policy, green card', 'Code 95'],
              ['Roadworthiness test', 'Medical and psychological tests'],
              ['Tachograph calibration', 'Driver card'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'For the company: Community licence and certified copies, authorisation to pursue the occupation of road haulage operator, certificate of professional competence, financial standing, OCP carrier’s policy and the KRS extract.',
          },
          {
            typ: 'akapit',
            tresc:
              'The Documents screen shows what’s overdue, what’s missing and what expires within 30 days – separately for the company, vehicles and drivers. Download set (Pobierz komplet) prepares a pack for a client or for a vehicle check.',
          },
          {
            typ: 'akapit',
            tresc:
              'We send reminders 60, 30, 14 and 3 days before the deadline and on the day itself – in the app and by email, to the owner and the dispatcher. The email comes once a day in the morning, only when something has changed. You choose the channels in Settings → Notifications (Powiadomienia).',
          },
          {
            typ: 'uwaga',
            tresc:
              'The most expensive date in a transport company is the one nobody knew about. Upload the documents once – after that it’s just a new version when a policy is renewed.',
          },
        ],
      },
    ],
    powiazane: ['dodajemy-pojazd', 'czas-pracy-kierowcy'],
  },
];
