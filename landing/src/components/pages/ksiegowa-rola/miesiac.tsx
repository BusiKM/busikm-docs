import type { PunktDnia } from '@/components/ui/OsDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';
import {
  KartaWpada,
  KartaSprawdzenie,
  KartaPobierz,
  KartaFormat,
  KartaZamkniecie,
} from '@/components/mockups/ksiegowa-rola/KartyOsi';

/**
 * Księgowa nie żyje dniem, tylko miesiącem – oś jest więc miesięczna,
 * a w kolumnie czasu stoją słowa, nie godziny.
 */
export const miesiacKsiegowej: Tlumaczenia<PunktDnia[]> = {
  pl: [
    {
      godzina: (
        <>
          przez cały
          <br />
          miesiąc
        </>
      ),
      pora: '1–31',
      tresc: 'Faktury, koszty i trasy wpadają same. Nie prosisz o nic. Faktury i korekty wystawisz też tutaj.',
      karta: <KartaWpada />,
    },
    {
      godzina: (
        <>
          ostatni
          <br />
          tydzień
        </>
      ),
      pora: '24–31',
      tresc: 'Otwierasz pięć kroków miesiąca: faktury, koszty, przebieg, płace i diety, deklaracje. Przy braku masz odnośnik prosto do niego.',
      karta: <KartaSprawdzenie />,
    },
    {
      godzina: (
        <>
          pierwszy
          <br />
          dzień po
        </>
      ),
      pora: '1.',
      tresc: 'Wybierasz miesiąc i klikasz „Pobierz paczkę dla biura”. Przed zamknięciem dostajesz wersję roboczą.',
      karta: <KartaPobierz />,
    },
    {
      godzina: 'wczytujesz',
      pora: 'u siebie',
      tresc: 'Do Comarch Optima, Insert GT albo Symfonii. Rejestry i płace także w Excelu.',
      karta: <KartaFormat />,
    },
    {
      godzina: (
        <>
          zamykasz
          <br />
          miesiąc
        </>
      ),
      tresc: 'Zamknięty miesiąc blokuje zmiany wstecz, a paczka staje się ostateczna, z JPK_V7M.',
      karta: <KartaZamkniecie />,
    },
  ],
  en: [
    {
      godzina: (
        <>
          all
          <br />
          month
        </>
      ),
      pora: '1–31',
      tresc: 'Invoices, costs and routes come in on their own. You don’t ask for anything, and you can issue invoices and corrections yourself.',
      karta: <KartaWpada />,
    },
    {
      godzina: (
        <>
          last
          <br />
          week
        </>
      ),
      pora: '24–31',
      tresc: 'You open the five month-end steps: invoices, costs, mileage, payroll and allowances, tax returns. Any gap comes with a link straight to it.',
      karta: <KartaSprawdzenie />,
    },
    {
      godzina: (
        <>
          first day
          <br />
          after
        </>
      ),
      pora: '1st',
      tresc: 'You pick the month and click “Download the package for the office”. Before closing, you get a draft version.',
      karta: <KartaPobierz />,
    },
    {
      godzina: 'you import',
      pora: 'on your side',
      tresc: 'Into Comarch Optima, Insert GT or Symfonia (Polish accounting software). Registers and payroll in Excel too.',
      karta: <KartaFormat />,
    },
    {
      godzina: (
        <>
          you close
          <br />
          the month
        </>
      ),
      tresc: 'A closed month locks changes after the fact, and the package becomes final, with JPK_V7M.',
      karta: <KartaZamkniecie />,
    },
  ],
};
