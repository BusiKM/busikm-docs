import type { Artykul } from '@/content/pomoc/typy';

/** Koszty, flota i terminy — wersja angielska. */
export const artykulyKosztyEn: Artykul[] = [
  {
    slug: 'koszty-w-biurze',
    kategoria: 'koszty',
    tytul: 'Approving costs',
    lead: 'Drivers send in receipts from the road, you decide what counts as a company cost.',
    role: ['wlasciciel', 'ksiegowa'],
    gdzie: 'Costs (Koszty)',
    czas: 'A quarter of an hour a week',
    rozdzialy: [
      {
        tytul: 'Four states of a cost',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Above the list are tabs that double as the document’s path. The counter next to “Costs” in the menu shows how many are waiting for your decision.',
          },
          {
            typ: 'tabela',
            naglowki: ['Tab', 'What it means'],
            wiersze: [
              ['To approve (Do akceptacji)', 'Added by a driver, not checked by anyone yet'],
              ['Approved (Zaakceptowane)', 'Checked and accepted as a company cost'],
              ['Booked (Zaksięgowane)', 'Sent to the accountant in an export'],
              ['Rejected (Odrzucone)', 'Not a company cost — with the reason for rejection'],
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
              { tytul: 'Open the To approve tab' },
              {
                tytul: 'Go to Details (Szczegóły)',
                opis: 'Next to the data you see a photo of the document — the one the driver took. No need to hunt for the paper.',
              },
              {
                tytul: 'Compare the fields read with the photo',
                opis: 'Seller, NIP (tax ID), document number, issue date, net amount, VAT %. With a scanned receipt it’s worth a glance, because crumpled printouts read worse.',
              },
              {
                tytul: 'Check the Category * and Deductible VAT',
                opis: 'The category decides where the cost shows up in reports. Whether VAT is deductible depends on how the vehicle is used.',
              },
              { tytul: 'Approve or reject' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'With more documents, tick several rows at once and use a bulk action — month-end then gets done in one sitting.',
          },
        ],
      },
      {
        tytul: 'Where costs come from',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'From the driver’s phone — a photo of a receipt on the road.',
              'From an entry in the office — when the document arrived by post or email.',
              'From a scan in Scan OCR (Skanuj OCR) — you upload a file and the system reads the fields.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'A cost in a foreign currency is converted at the NBP (National Bank of Poland) rate from the day before the document was issued. Nobody copies rates from tables.',
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
    lead: 'Insurance, inspections, driver medicals and the tachograph card in one place — with a warning before they expire.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Documents (Dokumenty)',
    czas: 'An hour once, then it keeps watch by itself',
    rozdzialy: [
      {
        tytul: 'Adding a document',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Open the vehicle or driver card',
                opis: 'Documents sit with whatever they relate to — there’s no single bin for everything.',
              },
              { tytul: 'Add document (Dodaj dokument)' },
              {
                tytul: 'Choose the Document type * (Typ dokumentu)',
                opis: 'The type decides the category and how you’re reminded.',
              },
              {
                tytul: 'Upload the file and enter the expiry date',
                opis: 'Drag the file onto the field or pick it from your disk. The expiry date is the whole point — without it the document is stored, but nobody will remind you about it.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'What the system keeps an eye on',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['For a vehicle', 'For a driver'],
            wiersze: [
              ['Registration certificate, certified copy of the licence', 'Driving licence with categories'],
              ['Third-party liability (OC), comprehensive (AC), personal accident (NNW), GAP, green card', 'Driver CPC, code 95'],
              ['Roadworthiness test, tachograph, calibration', 'Medical and psychological tests'],
              ['ATP, vehicle ADR', 'ADR, HACCP, training'],
              ['Transport licence, leasing', 'Tachograph card, criminal record certificate (KRK), contract'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The Documents screen shows three groups: Expired (Wygasłe), Expiring within 30 days (Wygasają w 30 dni) and Expires today (Wygasa dzisiaj) — split into Company, Vehicles and Drivers. On top of that you get a notification on your phone and by email.',
          },
          {
            typ: 'akapit',
            tresc:
              'You set how many days in advance the warnings go out in Settings → Alert thresholds (Ustawienia → Progi alertów).',
          },
          {
            typ: 'uwaga',
            tresc:
              'The most expensive date in a transport business is the one nobody knew about. Upload the documents once — next time it’s just swapping the file after the policy renews.',
          },
        ],
      },
    ],
    powiazane: ['dodajemy-pojazd', 'czas-pracy-kierowcy'],
  },
];
