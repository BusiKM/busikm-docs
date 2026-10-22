import type { Artykul } from '@/content/pomoc/typy';

/**
 * Instrukcje dotyczące kierowców – wersja angielska.
 *
 * Nazwy przycisków po angielsku, a przy pierwszym wystąpieniu w artykule
 * w nawiasie polska etykieta z aplikacji – bez niej czytelnik nie znajdzie
 * przycisku w polskim interfejsie.
 */
export const artykulyKierowcyEn: Artykul[] = [
  {
    slug: 'zapraszamy-kierowce',
    kategoria: 'kierowcy',
    tytul: 'How to add a driver',
    lead: 'You send an invitation by email. The driver gets a code and sets their own password – you don’t know it and don’t need to.',
    role: ['wlasciciel', 'dyspozytor'],
    gdzie: 'Drivers → Invite driver (Kierowcy → Zaproś kierowcę)',
    czas: 'Two minutes for you, the rest is on their side',
    zanim: ['The driver’s email address – the invitation goes there'],
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
              'The driver gets an email with an 8-character invitation code, such as K7QM-4RTZ. In the BusiKM Driver app they choose I have an invitation (Mam zaproszenie), enter their email and the code, then their first name, last name and their own password. Until then they show on your list as invited.',
          },
          {
            typ: 'uwaga',
            tresc:
              'You don’t know the driver’s password and can’t look it up. If they lose it, they use “Forgotten your password?” (Nie pamiętasz hasła?) on the sign-in screen – you don’t need to do anything.',
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
              'Is the address typed without a mistake – the most common cause.',
              'The driver’s spam folder. The invitation comes from BusiKM, not from you.',
              'Does the driver already have an account with another company on this address.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'If none of that helps, write to us – on our side we can see whether the message went out and what happened to it.',
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
    zanim: ['The email with the invitation code from your employer', 'An Android phone or an iPhone'],
    rozdzialy: [
      {
        tytul: 'Getting into the app',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Install the BusiKM Driver app (BusiKM Kierowca) from the link in your invitation' },
              { tytul: 'Open the app and choose I have an invitation (Mam zaproszenie)' },
              {
                tytul: 'Enter your email and the invitation code (Kod zaproszenia)',
                opis: 'The address the invitation came to and the 8-character code from the email, such as K7QM-4RTZ. Choose Next (Dalej), check the company name and choose I’m joining (Dołączam).',
              },
              {
                tytul: 'Enter your first name, last name and a password',
                opis: 'Make the password up yourself – nobody in the company will see it. Finish with Create account and sign in (Załóż konto i wejdź).',
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
              'Set location to “Always”, not “While using the app”. With the second setting the phone stops recording the route when you put the app in the background – which is exactly when you’re driving.',
          },
          {
            typ: 'akapit',
            tresc:
              'You only enter the code once. After that you sign in with your email and password: Continue with email (Kontynuuj z e-mailem) on the start screen.',
          },
        ],
      },
      {
        tytul: 'What you see in the app',
        bloki: [
          {
            typ: 'lista',
            wstep: 'At the bottom of the screen there are five tabs:',
            punkty: [
              'Today (Dziś) – the current job with Navigate (Nawiguj), Call (Zadzwoń) and Chat (Czat) buttons, one button for the next stage of the day and how long until your break. New orders are accepted here too.',
              'Orders (Zlecenia) – Active, Pending and Finished (Aktywne, Oczekujące, Zakończone).',
              'Add (Dodaj) – the camera: a photo of a receipt or of an order document (CMR, delivery note).',
              'Chat (Czat) – conversations with the office on each order.',
              'Me (Ja) – My costs and refunds, Documents, Working time, Leave and To send (Moje koszty i zwroty, Dokumenty, Czas pracy, Urlopy, Do wysłania), plus settings.',
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
              { tytul: 'Enter the code from the email and set a new password' },
            ],
          },
          {
            typ: 'akapit',
            tresc: 'You don’t need to ask the owner or the dispatcher – you do it yourself.',
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
    lead: 'From accepting the order to a confirmed delivery – one button for each stage of the day.',
    role: ['kierowca'],
    gdzie: 'BusiKM Driver app → Today (BusiKM Kierowca → Dziś)',
    czas: 'A few taps during the day',
    rozdzialy: [
      {
        tytul: 'Accepting the order',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Open the new order on the Today screen or under Orders → Pending (Zlecenia → Oczekujące)',
                opis: 'You’ll see the route, the times and the goods. The notification arrives even when the app is closed.',
              },
              {
                tytul: 'Choose Accept (Przyjmij)',
                opis: 'The dispatcher sees that you’ve taken it and stops ringing to ask.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Starting the day and loading',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Take a photo of the odometer and choose Start the day (Zacznij dzień)',
                opis: 'From then on the route records in the background and the kilometres count themselves.',
              },
              {
                tytul: 'Choose Navigate (Nawiguj)',
                opis: 'The route from the order opens in Apple Maps, Google Maps or Waze. You pick the app once and can change it in the settings. It works with CarPlay and Android Auto.',
              },
              {
                tytul: 'When you arrive, choose At loading (Jestem na załadunku)',
                opis: 'Some statuses change by themselves once you get there.',
              },
              {
                tytul: 'Choose Start loading (Zacznij załadunek) and take photos of the goods',
                opis: 'Photos upload in the background – you don’t have to wait for them or have signal right then.',
              },
              { tytul: 'Enter the weight and choose Save weight (Zapisz wagę)' },
              {
                tytul: 'Collect the sender’s signature on the e-CMR if the client requires one',
                opis: 'The signature is drawn with a finger on the screen.',
              },
              { tytul: 'Choose Finish loading (Dokończ załadunek)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The order status changes to “On the road” (W trasie). You open navigation to the unloading point with the same Navigate button, and BusiKM logs the trip in the background.',
          },
          {
            typ: 'akapit',
            tresc:
              'Stopping for a private break? On the Today screen choose Pause (Wstrzymaj) – route recording stops until you choose Resume (Wznów).',
          },
        ],
      },
      {
        tytul: 'Unloading',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'When you arrive, choose At unloading (Jestem na rozładunku), then Start unloading (Zacznij rozładunek). From there it works just like loading: photos, recipient details, the recipient’s signature on the e-CMR and confirmation. After that the order is closed, and the dispatcher sees it straight away.',
          },
          {
            typ: 'uwaga',
            tresc:
              'No signal doesn’t block anything. Photos, signatures and confirmations wait in the queue (Me → To send, Ja → Do wysłania) and send themselves when the signal comes back. You can keep driving.',
          },
        ],
      },
      {
        tytul: 'When something goes wrong',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'On the Today screen, below the job, there’s “I can’t continue” (Nie mogę kontynuować). Use it to report a breakdown, a traffic jam or a closed loading point – the report goes to the office in the order chat, without a phone call.',
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
    lead: 'The driver takes a photo and picks the cost type, and BusiKM reads the amount, date and seller itself. The carrier bag under the seat is no longer needed.',
    role: ['kierowca', 'ksiegowa'],
    gdzie: 'BusiKM Driver app → Add (BusiKM Kierowca → Dodaj)',
    czas: 'A few seconds per receipt',
    rozdzialy: [
      {
        tytul: 'Adding a receipt',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'Tap Add (Dodaj) on the bottom bar',
                opis: 'The camera opens. You’ll find the same path under Me → My costs and refunds → Add receipt (Ja → Moje koszty i zwroty → Dodaj paragon).',
              },
              {
                tytul: 'Take a photo of the receipt',
                opis: 'Lay it flat so it fits entirely in the frame.',
              },
              {
                tytul: 'Choose the cost type (Rodzaj kosztu)',
                opis: 'Your company sets the list. Out of the box it has fuel, parking, tolls, vehicle wash and other.',
              },
              {
                tytul: 'Choose how it was paid (Czym zapłacono?)',
                opis: 'Company card, fuel card, company cash or my own money. If you paid out of your own pocket, the office pays you back – you’ll see it in My costs.',
              },
              {
                tytul: 'Choose the order (Zlecenie)',
                opis: 'Or No order (Bez zlecenia) if the cost isn’t tied to a job.',
              },
              { tytul: 'Choose Send receipt (Wyślij paragon)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'BusiKM reads the amount, date, seller and the seller’s NIP (tax ID) itself after you send it – nothing to type in and nothing to wait for. With no signal, the receipt waits in the To send (Do wysłania) queue and goes out once the network is back.',
          },
        ],
      },
      {
        tytul: 'What happens next',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'In My costs the driver sees every receipt with its status: To complete, Ready or Booked (Do uzupełnienia, Gotowe, Zaksięgowane). When the office has a question, the receipt gets the Office asks (Biuro pyta) status – the driver replies and corrects it in the app. If the photo came out unreadable, they just take it again.',
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
    lead: 'The counters run by themselves. The phone reminds you 15 minutes before a break becomes mandatory.',
    role: ['kierowca', 'wlasciciel'],
    gdzie: 'BusiKM Driver app → Me → Working time (BusiKM Kierowca → Ja → Czas pracy)',
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
            wstep: 'On the Working time (Czas pracy) screen you see:',
            punkty: [
              'Three gauges: continuous driving, daily and weekly – each with the limit you’re getting close to.',
              'A Two weeks (Dwa tygodnie) bar.',
              'A day bar split into driving, work, break and rest.',
              'Your current state and the time it started.',
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Counters under the EU drivers’ hours rules appear on international jobs. On domestic jobs the app shows daily working time and rest.',
          },
          {
            typ: 'uwaga',
            tresc:
              'The server does the counting. With no network the phone shows the last known state, and breaks and rest logged with no signal wait in a queue and go through once it’s back.',
          },
        ],
      },
      {
        tytul: 'Recording by hand',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'When you need to add something – work without driving, for example – use Record manually (Zarejestruj ręcznie) with the Break (Przerwa) and Rest (Odpoczynek) buttons.',
          },
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Open Me → Working time (Ja → Czas pracy)' },
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
