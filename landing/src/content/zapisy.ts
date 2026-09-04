/**
 * Listy wczesnego dostępu.
 *
 * Ani aplikacja, ani demo nie są jeszcze publiczne. Zamiast przycisków
 * prowadzących donikąd — dwie strony, które mówią to wprost i zbierają
 * imię z adresem, żeby dało się odezwać, gdy będzie czym.
 *
 * Dwie osobne listy, nie jedna z etykietą: te osoby przychodzą w innym
 * momencie i po co innego. Ktoś, kto kliknął „Zobacz demo", chce obejrzeć
 * produkt. Ktoś, kto kliknął „Zaloguj się", szukał własnego konta — jest
 * bliżej decyzji. Pierwsza wiadomość do nich nie może brzmieć tak samo,
 * a rozdzielenie po fakcie jest trudniejsze niż zapisanie osobno od razu.
 */

export type Lista = 'demo' | 'konto';

export type OpisListy = {
  /** Nazwa kolekcji w Firestore. Ta sama wartość waliduje `firestore.rules`. */
  lista: Lista;
  eyebrow: string;
  naglowek: string;
  /** Zdania pod nagłówkiem — każde w osobnej linii, jak w projekcie. */
  lead: string[];
  /** Nagłówek nad formularzem. */
  wezwanie: string;
  /** Co się stanie po wysłaniu — pod przyciskiem. */
  obietnica: string;
  /** Komunikat po zapisie. */
  poZapisie: string;
};

export const listy: Record<Lista, OpisListy> = {
  demo: {
    lista: 'demo',
    eyebrow: 'Demo',
    naglowek: 'Demo przygotowujemy.',
    lead: [
      'Prawdziwa aplikacja z danymi przykładowej firmy transportowej.',
      'Zostaw adres, a dostaniesz je w dniu uruchomienia.',
      'Razem z 14 dniami bez opłat.',
    ],
    wezwanie: 'Powiadom mnie o demo',
    obietnica: 'Napiszemy raz — w dniu uruchomienia.',
    poZapisie: 'Napiszemy w dniu, w którym demo ruszy.',
  },
  konto: {
    lista: 'konto',
    eyebrow: 'Dostęp do aplikacji',
    naglowek: 'Konta otwieramy wkrótce.',
    lead: [
      'Sprawdzamy BusiKM na prawdziwych trasach, w małej grupie firm.',
      'Zostaw adres, a odezwiemy się, gdy otworzymy zapisy.',
    ],
    wezwanie: 'Powiadom mnie o zapisach',
    obietnica: 'Napiszemy raz — gdy otworzymy zapisy.',
    poZapisie: 'Napiszemy, gdy otworzymy zapisy.',
  },
};

export const LIMITY_ZAPISU = { imie: 80, email: 160 } as const;
