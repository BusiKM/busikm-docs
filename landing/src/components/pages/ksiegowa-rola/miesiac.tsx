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
 * Księgowa nie żyje dniem, tylko miesiącem — oś jest więc miesięczna,
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
      tresc: 'Faktury, koszty i trasy wpadają same. Nie prosisz o nic.',
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
      tresc: 'Otwierasz listę sprawdzenia. System sam mówi, czego brakuje.',
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
      tresc: 'Wybierasz miesiąc, klikasz raz, pobierasz komplet.',
      karta: <KartaPobierz />,
    },
    {
      godzina: 'wczytujesz',
      pora: 'u siebie',
      tresc: 'Do Insertu, Optimy, Symfonii albo do zwykłego arkusza.',
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
      tresc: 'Po zamknięciu nikt nie zmieni danych wstecz.',
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
      tresc: 'Invoices, costs and routes come in on their own. You don’t ask for anything.',
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
      tresc: 'You open the checklist. The system tells you what’s missing.',
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
      tresc: 'You pick the month, click once and download everything.',
      karta: <KartaPobierz />,
    },
    {
      godzina: 'you import',
      pora: 'on your side',
      tresc: 'Into Insert, Optima, Symfonia (Polish accounting software) or a plain spreadsheet.',
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
      tresc: 'Once it’s closed, nobody can change past data.',
      karta: <KartaZamkniecie />,
    },
  ],
};
