import type { PunktDnia } from '@/components/ui/OsDnia';
import {
  KartaKontrahent,
  KartaKierowcy,
  KartaTrasa,
  KartaKorek,
  KartaZamkniecie,
} from '@/components/mockups/dyspozytor/KartyOsi';

/** Dzień dyspozytora — pięć punktów, od przyjęcia zlecenia po zamknięcie dnia. */
export const dzienDyspozytora: PunktDnia[] = [
  {
    godzina: '6:40',
    pora: 'przyjmujesz zlecenie',
    tresc:
      'Wpisujesz raz: kontrahent, fracht, załadunek, rozładunek. Kontrahent podpowiada się sam.',
    karta: <KartaKontrahent />,
  },
  {
    godzina: '7:05',
    pora: 'przypisujesz kierowcę',
    tresc: 'System podpowiada, kto ma wolne godziny i kto jest najbliżej. Decydujesz Ty.',
    karta: <KartaKierowcy />,
  },
  {
    godzina: '7:06',
    pora: 'trasa układa się sama',
    tresc: 'Z ruchem na drodze. Kierowca ma ją w telefonie, nie przepisuje adresu.',
    karta: <KartaTrasa />,
  },
  {
    godzina: '13:20',
    pora: 'coś się zmienia',
    tresc: 'Korek pod Bolzano. Poprawiasz trasę u siebie, kierowca widzi nową wersję od razu.',
    karta: <KartaKorek />,
  },
  {
    godzina: '17:00',
    pora: 'zamykasz dzień',
    tresc: 'Widzisz, kto gdzie jest, kto kończy i kto rusza jutro.',
    karta: <KartaZamkniecie />,
  },
];
