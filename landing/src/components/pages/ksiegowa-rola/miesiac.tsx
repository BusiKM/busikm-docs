import type { PunktDnia } from '@/components/ui/OsDnia';
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
export const miesiacKsiegowej: PunktDnia[] = [
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
];
