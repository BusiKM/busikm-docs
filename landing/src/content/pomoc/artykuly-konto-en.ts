import type { Artykul } from '@/content/pomoc/typy';

/** Konto, zespół, uprawnienia i bezpieczeństwo — wersja angielska. */
export const artykulyKontoEn: Artykul[] = [
  {
    slug: 'zespol-i-role',
    kategoria: 'konto',
    tytul: 'Team and permissions',
    lead: 'Who sees what and how they get into the system — you invite the accountant from settings, the driver from the Drivers module.',
    role: ['wlasciciel'],
    gdzie: 'Settings → Company → Team (Ustawienia → Firma → Zespół)',
    rozdzialy: [
      {
        tytul: 'Roles',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Role', 'What they do'],
            wiersze: [
              ['Owner', 'Sees everything: orders, invoices, costs, fleet, reports, settings'],
              ['Accountant', 'Invoices, costs, reports, FK and JPK_FA exports, payroll'],
              ['Dispatcher', 'Orders, Dispatch, assigning drivers'],
              ['Driver', 'Their own orders, trips, receipts and documents — in the phone app'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'One person can hold several roles at once. In a small company the owner is usually the dispatcher too, and nobody sets up a second account just to plan a route.',
          },
          {
            typ: 'uwaga',
            tresc:
              'The Settlements section (Rozliczenia) — FK export, JPK_FA, payroll — is visible to the accountant, not the owner. An owner who uses an accounting office doesn’t generate files for the tax office, so their menu isn’t cluttered with buttons they’ll never use.',
          },
        ],
      },
      {
        tytul: 'Inviting an accountant',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Team (Ustawienia → Zespół)' },
              { tytul: 'Click Invite accountant (Zaproś księgowego)' },
              {
                tytul: 'Enter the email address and send the invitation',
                opis: 'The accountant gets an email with an activation link. Once they accept, they join the company with the Accountant role and access to invoices, reports and FK exports.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'The team list shows the owner and the accountants. Drivers are managed separately — in the Drivers module (Kierowcy).',
          },
        ],
      },
      {
        tytul: 'Changing roles and removing access',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'You switch a role between owner and accountant — that’s the only pair you swap in the team settings.',
              'You deactivate an accountant’s account from the same list when the work together ends.',
              'You remove a driver from the company on their card in the Drivers module.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Deactivating removes access but doesn’t delete history. Invoices and exports made by that person stay — as they should, because they’re company documents.',
          },
        ],
      },
    ],
    powiazane: ['zapraszamy-kierowce', 'bezpieczenstwo-konta'],
  },

  {
    slug: 'bezpieczenstwo-konta',
    kategoria: 'konto',
    tytul: 'Password, two-step verification and sessions',
    lead: 'Three things to do once, after which nobody gets into your account from someone else’s laptop.',
    role: ['wlasciciel', 'ksiegowa', 'dyspozytor'],
    gdzie: 'Settings → Account → Security (Ustawienia → Konto → Bezpieczeństwo)',
    czas: 'Five minutes',
    rozdzialy: [
      {
        tytul: 'Changing your password',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Security (Ustawienia → Bezpieczeństwo)' },
              { tytul: 'In the Password section (Hasło), enter the current one and the new one' },
              { tytul: 'Click Change password (Zmień hasło)' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'After a password change your other devices are signed out. That’s intended — if you’re changing the password because something worried you, a phone in someone else’s pocket should lose access at once.',
          },
        ],
      },
      {
        tytul: 'Two-step verification',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              {
                tytul: 'In the Two-step verification section (Dwuetapowa weryfikacja), turn protection on',
                opis: 'A QR code appears.',
              },
              {
                tytul: 'Scan the code with an authenticator app',
                opis: 'Google Authenticator, 1Password, Authy — any app that generates six-digit codes.',
              },
              {
                tytul: 'Type in the code from the app to confirm',
                opis: 'From now on, signing in asks for a code as well as your password.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'The owner account has access to invoices, clients and driver data. Two-step verification costs five minutes once — and it’s the difference between a stolen password and a stolen company.',
          },
        ],
      },
      {
        tytul: 'Active sessions',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The Active sessions list (Aktywne sesje) shows where you’re signed in — with the device and address. You end a single one with Sign out session (Wyloguj sesję), and all the others at once with Sign out other devices (Wyloguj inne urządzenia).',
          },
          {
            typ: 'akapit',
            tresc:
              'Look here after losing your phone or working on someone else’s computer. One click and it’s dealt with.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role'],
  },

  {
    slug: 'plan-i-rezygnacja',
    kategoria: 'konto',
    tytul: 'Your plan, BusiKM invoices and cancelling',
    lead: 'What you can check yourself, and what we handle by email for now.',
    role: ['wlasciciel'],
    gdzie: 'Settings → Company → Subscription (Ustawienia → Firma → Subskrypcja)',
    rozdzialy: [
      {
        tytul: 'Checking your plan',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'In Settings → Subscription (Ustawienia → Subskrypcja) you see your current plan, the vehicle and driver limits, and what it includes. The plan depends on the size of your fleet.',
          },
        ],
      },
      {
        tytul: 'Changing your plan',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Subscription' },
              {
                tytul: 'Click Choose plan (Wybierz plan) next to the one you want',
                opis: 'An email to us opens with the subject already filled in. We reply the same working day and switch the plan.',
              },
            ],
          },
          {
            typ: 'wkrotce',
            tresc:
              'Card payment and one-click plan changes are being built. For now, plan changes and BusiKM invoices go through us — which is why the button opens an email rather than a payment.',
          },
        ],
      },
      {
        tytul: 'Cancelling and your data',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'You cancel by email. Before the account is closed, download what you want to keep: invoices as PDF, FK exports from the history and reports for every month.',
          },
          {
            typ: 'akapit',
            tresc:
              'You can also download the full data from your account in Settings → GDPR export (Ustawienia → Eksport RODO). It’s your data, and it leaves us as easily as it came in.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role', 'eksport-dla-ksiegowej'],
  },
];
