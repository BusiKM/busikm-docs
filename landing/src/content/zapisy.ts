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

import type { Zrodlo } from '@/content/zgoda';
import type { Jezyk, Tlumaczenia } from '@/i18n/jezyki';

export type Lista = 'demo' | 'konto';

export type OpisListy = {
  /** Nazwa kolekcji w Firestore. Ta sama wartość waliduje `firestore.rules`. */
  lista: Lista;
  /** Tag, pod którym adres trafi kiedyś do narzędzia wysyłkowego. */
  zrodlo: Zrodlo;
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

/** Pola nietekstowe — raz, wspólne dla obu języków. */
const LISTY: Record<Lista, Pick<OpisListy, 'lista' | 'zrodlo'>> = {
  demo: { lista: 'demo', zrodlo: 'demo' },
  konto: { lista: 'konto', zrodlo: 'rejestracja' },
};

type TekstListy = Omit<OpisListy, 'lista' | 'zrodlo'>;

const TEKSTY: Tlumaczenia<Record<Lista, TekstListy>> = {
  pl: {
    demo: {
      eyebrow: 'Demo',
      naglowek: 'Demo przygotowujemy.',
      lead: [
        'Prawdziwa aplikacja z danymi przykładowej firmy transportowej.',
        'Zapisz się na listę — napiszemy w dniu uruchomienia',
        'i będziemy dzielić się tym, co nowego.',
      ],
      wezwanie: 'Zapisz się na listę',
      obietnica: 'Pierwsza wiadomość w dniu uruchomienia demo. Później rzadko i tylko o BusiKM.',
      poZapisie: 'Napiszemy w dniu, w którym demo ruszy. Zgodę wycofasz odnośnikiem w każdej wiadomości.',
    },
    konto: {
      eyebrow: 'Dostęp do aplikacji',
      naglowek: 'Konta otwieramy wkrótce.',
      lead: [
        'Sprawdzamy BusiKM na prawdziwych trasach, w małej grupie firm.',
        'Zapisz się na listę — napiszemy, gdy otworzymy zapisy.',
      ],
      wezwanie: 'Zapisz się na listę',
      obietnica: 'Pierwsza wiadomość, gdy otworzymy zapisy. Później rzadko i tylko o BusiKM.',
      poZapisie: 'Napiszemy, gdy otworzymy zapisy. Zgodę wycofasz odnośnikiem w każdej wiadomości.',
    },
  },
  en: {
    demo: {
      eyebrow: 'Demo',
      naglowek: 'The demo is on its way.',
      lead: [
        'The real app, filled with data from a sample transport company.',
        'Join the list — we’ll write on launch day',
        'and keep you posted on what’s new.',
      ],
      wezwanie: 'Join the list',
      obietnica: 'First email on the day the demo launches. After that, rarely and only about BusiKM.',
      poZapisie: 'We’ll write on the day the demo goes live. You can withdraw consent via the link in any email.',
    },
    konto: {
      eyebrow: 'App access',
      naglowek: 'Accounts open soon.',
      lead: [
        'We’re testing BusiKM on real routes with a small group of companies.',
        'Join the list — we’ll write when sign-ups open.',
      ],
      wezwanie: 'Join the list',
      obietnica: 'First email when sign-ups open. After that, rarely and only about BusiKM.',
      poZapisie: 'We’ll write when sign-ups open. You can withdraw consent via the link in any email.',
    },
  },
};

function wJezyku(jezyk: Jezyk): Record<Lista, OpisListy> {
  return {
    demo: { ...LISTY.demo, ...TEKSTY[jezyk].demo },
    konto: { ...LISTY.konto, ...TEKSTY[jezyk].konto },
  };
}

export const listy: Tlumaczenia<Record<Lista, OpisListy>> = {
  pl: wJezyku('pl'),
  en: wJezyku('en'),
};

export const LIMITY_ZAPISU = { imie: 80, email: 160 } as const;
