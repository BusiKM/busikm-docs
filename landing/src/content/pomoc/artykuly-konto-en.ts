import type { Artykul } from '@/content/pomoc/typy';

/** Konto, zespół, uprawnienia, bezpieczeństwo i płatności – wersja angielska. */
export const artykulyKontoEn: Artykul[] = [
  {
    slug: 'zespol-i-role',
    kategoria: 'konto',
    tytul: 'Team and permissions',
    lead: 'Who sees what and how people get into the system – you invite office staff from settings and add drivers in the Drivers module.',
    role: ['wlasciciel'],
    gdzie: 'Settings → Team and access (Ustawienia → Zespół i dostęp)',
    rozdzialy: [
      {
        tytul: 'Roles',
        bloki: [
          {
            typ: 'tabela',
            naglowki: ['Role', 'What they do'],
            wiersze: [
              ['Owner', 'Everything, including bank accounts, the team, the plan and KSeF'],
              ['Accountant', 'Invoices, costs, settlements and company details; can only view accounts, the plan and the fleet'],
              ['Dispatcher', 'Orders, dispatch, vehicles and drivers, without amounts or invoices'],
              ['Driver', 'Only the phone app; you add them in the Drivers module'],
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Each person has one role. In a small company the owner is usually the dispatcher too – the owner’s account has access to everything, so there’s no need for a second one.',
          },
          {
            typ: 'uwaga',
            tresc: 'Only the owner sees Team and access.',
          },
        ],
      },
      {
        tytul: 'Inviting someone to the team',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Team and access (Ustawienia → Zespół i dostęp)' },
              { tytul: 'Click Invite a person (Zaproś osobę)' },
              {
                tytul: 'Enter the email address and pick a role',
                opis: 'Accountant, Dispatcher or Owner. We send an email with a link to set a password. The link works for 7 days.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'Invitations nobody has accepted yet are listed on the same page, under Invitations waiting to be accepted. Drivers aren’t here – you add them in the Drivers module, and the app invitation goes out at the end of the wizard.',
          },
        ],
      },
      {
        tytul: 'Changing a role and removing access',
        bloki: [
          {
            typ: 'lista',
            punkty: [
              'You change a role next to the person on the list. It takes effect immediately, without signing in again, and is recorded in the change history.',
              'When the collaboration ends, click Remove access (Odbierz dostęp). The person can no longer sign in to the company, and you can restore access in one click.',
              'Drivers are managed in the Drivers module.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Removing access doesn’t delete history. Changes made by that person stay – as they should, because they concern company documents.',
          },
        ],
      },
    ],
    powiazane: ['zapraszamy-kierowce', 'bezpieczenstwo-konta'],
  },

  {
    slug: 'bezpieczenstwo-konta',
    kategoria: 'konto',
    tytul: 'Password, phone code and signed-in devices',
    lead: 'Three things to do once, after which nobody gets into your account from someone else’s laptop.',
    role: ['wlasciciel', 'ksiegowa', 'dyspozytor'],
    gdzie: 'Settings → Sign-in and security (Ustawienia → Logowanie i bezpieczeństwo)',
    czas: 'Five minutes',
    rozdzialy: [
      {
        tytul: 'Changing your password',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Sign-in and security (Ustawienia → Logowanie i bezpieczeństwo)' },
              { tytul: 'In the Password section, click Change password (Zmień hasło)' },
              { tytul: 'Enter your current and new password' },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'After the change we sign you out on your other devices. That’s deliberate – if you’re changing your password because something worried you, a phone in someone else’s pocket should lose access straight away.',
          },
        ],
      },
      {
        tytul: 'Phone code at sign-in',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'In the Phone code at sign-in section (Kod z telefonu przy logowaniu), turn the protection on' },
              {
                tytul: 'Connect your account to an authenticator app',
                opis: 'Google Authenticator, 1Password, Authy – any app that generates six-digit codes.',
              },
              {
                tytul: 'Type in the code from the app to confirm',
                opis: 'From then on, after your password you enter the 6 digits from the app on your phone.',
              },
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'The owner’s account has access to invoices, clients and driver data. The phone code takes five minutes, once – and it’s the difference between a stolen password and a stolen company.',
          },
        ],
      },
      {
        tytul: 'Signed-in devices',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'The list shows the devices you’re signed in on. Sign out other devices (Wyloguj inne urządzenia) closes all the others at once.',
          },
          {
            typ: 'akapit',
            tresc:
              'Check it after losing your phone or working on someone else’s computer. One click sorts it.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role'],
  },

  {
    slug: 'plan-i-rezygnacja',
    kategoria: 'konto',
    tytul: 'Plan, payment, BusiKM invoices and cancelling',
    lead: 'You handle the plan, card, invoices and cancelling yourself, in settings – no need to write to us.',
    role: ['wlasciciel'],
    gdzie: 'Settings → Plan and payments (Ustawienia → Plan i płatności)',
    rozdzialy: [
      {
        tytul: 'Checking your plan',
        bloki: [
          {
            typ: 'akapit',
            tresc:
              'In Settings → Plan and payments (Ustawienia → Plan i płatności) you see the company’s plan, how long it’s valid for and its status: trial, active or expired. The plan depends on the number of vehicles – drivers and office staff are unlimited.',
          },
          {
            typ: 'lista',
            punkty: [
              'Start – up to 3 vehicles.',
              'Business (Firma) – 10 vehicles included, +PLN 29/month for each extra one, up to 50. Larger fleet – write to us.',
            ],
          },
          {
            typ: 'uwaga',
            tresc:
              'Only the company owner changes the plan, card and BusiKM invoices. Everyone else just sees which plan the company is on.',
          },
        ],
      },
      {
        tytul: 'Choosing a plan and paying',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Plan and payments' },
              {
                tytul: 'In the Change plan section (Zmień plan), click Choose plan (Wybierz plan)',
                opis: 'Start or Business, billed monthly or yearly.',
              },
              {
                tytul: 'Enter your card on the Stripe payment page',
                opis: 'You enter card details with the payment provider, not in BusiKM. If your trial is still running, the card is saved and the first payment is taken only when the trial ends.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'You get an invoice by email for every payment, at the “zw.” (VAT-exempt) rate – MOVGRANTO is exempt from VAT, so the price on the pricing page is the final price.',
          },
        ],
      },
      {
        tytul: 'Changing plan or card and downloading invoices',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Plan and payments' },
              {
                tytul: 'Click Open payment panel (Otwórz panel płatności)',
                opis: 'The Stripe panel opens. There you change your plan and card, and download BusiKM invoices as PDF.',
              },
            ],
          },
        ],
      },
      {
        tytul: 'Cancelling and your data',
        bloki: [
          {
            typ: 'kroki',
            kroki: [
              { tytul: 'Go to Settings → Plan and payments and click Open payment panel' },
              {
                tytul: 'Cancel the subscription',
                opis: 'Cancellation takes effect at the end of the period you’ve paid for, with no refund for the unused part. Until then you can undo it.',
              },
            ],
          },
          {
            typ: 'akapit',
            tresc:
              'You work as normal until the paid period ends. After that the account stays read-only: you can browse your data and download invoices, mileage logs, reports and exports.',
          },
          {
            typ: 'akapit',
            tresc:
              'You can download your personal data in Settings → Your personal data (Twoje dane osobowe). It’s your data, and it leaves us as easily as it came in.',
          },
        ],
      },
    ],
    powiazane: ['zespol-i-role', 'eksport-dla-ksiegowej'],
  },
];
