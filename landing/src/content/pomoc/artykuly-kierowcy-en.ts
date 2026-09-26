import type { Artykul } from '@/content/pomoc/typy';

/**
 * Instrukcje dotyczące kierowców — wersja angielska.
 *
 * Nazwy przycisków po angielsku, a przy pierwszym wystąpieniu w artykule
 * w nawiasie polska etykieta z aplikacji — bez niej czytelnik nie znajdzie
 * przycisku w polskim interfejsie.
 */
export const artykulyKierowcyEn: Artykul[] = [
  {
    slug: 'zapraszamy-kierowce',
    kategoria: 'kierowcy',
    tytul: 'How to add a driver',
    lead: 'You send an invitation by email. The driver sets their own password — you don’t know it and don’t need to.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Drivers → Invite driver (Kierowcy → Zaproś kierowcę)',
    czas: 'Two minutes for you, the rest is on their side',
    zanim: ['The driver’s email address — the invitation goes there'],
    rozdzialy: [
      {
        tytul: 'Sending the invitation',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Go to Drivers (Kierowcy) in the menu on the left',
                opis: 'You’ll see the list of people already in your company.',
              },
              { tytul: 'Click Invite driver (Zaproś kierowcę)' },
              {
                tytul: 'Enter the Email address (Adres e-mail)',
                opis: 'It’s the only required field. The rest fills in once the driver accepts the invitation.',
              },
              {
                tytul: 'Add a Message (Wiadomość) if you like',
                opis: 'The driver sees it in the email. Useful when you’re inviting someone who isn’t expecting a message from an unknown sender.',
              },
              { tytul: 'Send invitation (Wyślij zaproszenie)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The driver gets an email with a link. After clicking it they set their own password and land straight in the app. Until then they show on your list as invited.',
          },
          {
            typ: 'uwaga',
            tresc:
              'You don’t know the driver’s password and can’t look it up. If they lose it, they use “Forgotten your password?” (Nie pamiętasz hasła?) on the sign-in screen — you don’t need to do anything.',
          },
        ],
      },
      {
        tytul: 'When the invitation doesn’t arrive',
        bloki: [
          {
            typ: 'lista',
            wstep: 'Before you send a second one, check in this order:',
            punkty: [
              'Is the address typed without a mistake — the most common cause.',
              'The driver’s spam folder. The invitation comes from BusiKM, not from you.',
              'Does the driver already have an account with another company on this address.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'If none of that helps, write to us — on our side we can see whether the message went out and what happened to it.',
          },
        ],
      },
    ],
    powiazane: ['kierowca-pierwsze-logowanie', 'zespol-i-role'],
  },

  {
    slug: 'kierowca-pierwsze-logowanie',
    kategoria: 'kierowcy',
    tytul: 'The driver’s first sign-in',
    lead: 'What the driver does on their own phone to get into the app.',
    role: ['kierowca'],
    gdzie: 'The BusiKM Driver app (BusiKM Kierowca)',
    czas: 'Five minutes',
    zanim: ['The invitation in the inbox', 'An Android phone or an iPhone'],
    rozdzialy: [
      {
        tytul: 'Getting into the app',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Open the invitation email and click the link',
                opis: 'A page opens where you set your own password. Make it up yourself — nobody in the company will see it.',
              },
              { tytul: 'Install the BusiKM Driver app (BusiKM Kierowca) from the store' },
              {
                tytul: 'Open the app and choose Continue with email (Kontynuuj z e-mailem)',
                opis: 'Enter the same address the invitation came to and the password you’ve just set.',
              },
              {
                tytul: 'Allow access to location and notifications',
                opis: 'Without location the route won’t record itself and you’ll have to enter kilometres by hand. Notifications are how you get new orders and break reminders.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Set location to “Always”, not “While using the app”. With the second setting the phone stops recording the route when you put the app in the background — which is exactly when you’re driving.',
          },
        ],
      },
      {
        tytul: 'What you see on the dashboard',
        bloki: [
          {
            typ: 'lista',
            wstep: 'The first screen is everything you need on the road:',
            punkty: [
              'The active order with a navigation button — or “No active order” (Brak aktywnego zlecenia) when nothing is running.',
              'To accept (Do akceptacji) — orders the dispatcher has assigned to you, waiting for your confirmation.',
              'Working time (Czas pracy) — how long you’ve been driving and when your break is due.',
              'Add cost (Dodaj koszt) — a photo of a receipt in one tap.',
              'Documents (Dokumenty) and Messages (Wiadomości).',
            ],
          },
        ],
      },
      {
        tytul: 'If you forget your password',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'On the sign-in screen choose Forgotten your password? (Nie pamiętasz hasła?)',
              },
              { tytul: 'Enter your email address' },
              { tytul: 'Open the message and set a new password' },
            ],
          },
          {
            typ: 'akapit',
            tresc: 'You don’t need to ask the owner or the dispatcher — you do it yourself.',
          },
        ],
      },
    ],
    powiazane: ['trasa-kierowcy', 'paragony-kierowcy'],
  },

  {
    slug: 'trasa-kierowcy',
    kategoria: 'kierowcy',
    tytul: 'How the driver runs a route',
    lead: 'From accepting the order to a confirmed delivery — without typing anything in by hand.',
    role: ['kierowca'],
    gdzie: 'BusiKM Driver app → Orders (BusiKM Kierowca → Zlecenia)',
    czas: 'A few taps during the day',
    rozdzialy: [
      {
        tytul: 'Accepting the order',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Open the order from the To accept section (Do akceptacji)',
                opis: 'You’ll see the route, the times and the goods. The notification arrives even when the app is closed.',
              },
              {
                tytul: 'Accept the order',
                opis: 'The dispatcher sees that you’ve taken it and stops ringing to ask.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Loading',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Enter the odometer reading',
                opis: 'The app asks for it once, before you set off. From then on the kilometres count themselves.',
              },
              {
                tytul: 'Take photos of the goods',
                opis: 'Photos upload in the background — you don’t have to wait for them or have signal right then.',
              },
              { tytul: 'Enter the weight and choose Save weight (Zapisz wagę)' },
              {
                tytul: 'Collect a signature if the client requires one',
                opis: 'The signature is drawn with a finger on the screen.',
              },
              { tytul: 'Confirm Loading complete (Załadunek zakończony)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The order status changes to “On the road” (W trasie) and a Navigate to unloading (Nawiguj do rozładunku) button appears. Navigation is in the same app — you don’t switch to another one.',
          },
        ],
      },
      {
        tytul: 'Unloading',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'It works just like loading: photos, recipient details, signature and confirmation. After that the order is closed, and the dispatcher sees it straight away.',
          },
          {
            typ: 'uwaga',
            tresc:
              'No signal doesn’t block anything. Photos, signatures and confirmations wait on the phone and send themselves when the signal comes back. You can keep driving.',
          },
        ],
      },
      {
        tytul: 'When something goes wrong',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The dashboard has “I can’t continue” (Nie mogę kontynuować). Use it to report a breakdown, a traffic jam or a closed loading point — the dispatcher is told at once, without a phone call.',
          },
        ],
      },
    ],
    powiazane: ['czas-pracy-kierowcy', 'paragony-kierowcy'],
  },

  {
    slug: 'paragony-kierowcy',
    kategoria: 'kierowcy',
    tytul: 'Receipts from a photo',
    lead: 'The driver takes a photo, the system reads the amount and the date. The carrier bag under the seat is no longer needed.',
    role: ['kierowca', 'ksiegowa'],
    gdzie: 'BusiKM Driver app → Receipts (BusiKM Kierowca → Paragony)',
    czas: 'A few seconds per receipt',
    rozdzialy: [
      {
        tytul: 'Adding a receipt',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Choose Scan receipt (Zeskanuj paragon)',
                opis: 'Or from the dashboard, with the Add cost (Dodaj koszt) tile — it’s the same path.',
              },
              {
                tytul: 'Take a photo of the receipt',
                opis: 'Lay it flat so it fits entirely in the frame.',
              },
              {
                tytul: 'Check what the system has read',
                opis: 'The amount, date, seller and seller’s NIP (tax ID) fill in by themselves. Correct anything that doesn’t match — especially with a crumpled or faded receipt.',
              },
              { tytul: 'Save (Zapisz)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'If the reading fails, choose Skip (Pomiń) and type it in by hand. The photo stays with the cost anyway, so the accountant has something to go back to.',
          },
        ],
      },
      {
        tytul: 'What happens next',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The receipt goes on the list as Pending (Oczekujący). Someone in the office approves it and the status changes to Approved (Zatwierdzony). The driver sees both lists and knows whether their cost has gone through.',
          },
          {
            typ: 'uwaga',
            tresc:
              'Costs in foreign currencies are converted at the rate from the day before the document was issued. The driver doesn’t have to convert anything or remember the rate.',
          },
        ],
      },
    ],
    powiazane: ['koszty-w-biurze', 'eksport-dla-ksiegowej'],
  },

  {
    slug: 'czas-pracy-kierowcy',
    kategoria: 'kierowcy',
    tytul: 'Working time, breaks and rest',
    lead: 'The counters run by themselves. The phone warns you before a break becomes mandatory.',
    role: ['kierowca', 'wlasciciel'],
    gdzie: 'BusiKM Driver app → AETR (BusiKM Kierowca → AETR)',
    rozdzialy: [
      {
        tytul: 'What counts itself',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'Driving, other work, breaks and rest switch automatically, based on what the vehicle is doing and which stage the order is at. The driver doesn’t have to switch anything.',
          },
          {
            typ: 'lista',
            wstep: 'On the AETR screen (the European rules on drivers’ hours) you see:',
            punkty: [
              'Continuous, daily and weekly driving — each with the limit you’re getting close to.',
              'A day bar split into driving, work, break and rest.',
              'Your current state and the time it started.',
            ],
          },
        ],
      },
      {
        tytul: 'Recording by hand',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'When you need to add something — work without driving, for example — use Record manually (Zarejestruj ręcznie) with the Break (Przerwa) and Rest (Odpoczynek) buttons.',
          },
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Open the AETR tab' },
              { tytul: 'Scroll down to the Record manually section' },
              { tytul: 'Choose Break or Rest' },
            ],
          },
        ],
      },
      {
        tytul: 'What BusiKM doesn’t do',
        bloki: [
          {
            typ: 'uwaga',
            tresc:
              'BusiKM doesn’t replace the tachograph. The tachograph records and is a device required by law; BusiKM shows the same thing on your phone and reminds you earlier. They’re two separate obligations, and one doesn’t release you from the other.',
          },
        ],
      },
    ],
    powiazane: ['trasa-kierowcy', 'raporty-i-ewidencje'],
  },
];
