import type { PunktDnia } from '@/components/ui/OsDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';
import {
  KartaKontrahent,
  KartaKierowcy,
  KartaTrasa,
  KartaKorek,
  KartaZamkniecie,
} from '@/components/mockups/dyspozytor/KartyOsi';

/** Dzień dyspozytora — pięć punktów, od przyjęcia zlecenia po zamknięcie dnia. */
export const dzienDyspozytora: Tlumaczenia<PunktDnia[]> = {
  pl: [
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
  ],
  en: [
    {
      godzina: '6:40',
      pora: 'you take an order',
      tresc:
        'You enter it once: client, freight rate, loading, unloading. The client name fills itself in.',
      karta: <KartaKontrahent />,
    },
    {
      godzina: '7:05',
      pora: 'you assign a driver',
      tresc: 'The system suggests who has hours left and who is closest. You decide.',
      karta: <KartaKierowcy />,
    },
    {
      godzina: '7:06',
      pora: 'the route plans itself',
      tresc: 'With live traffic. The driver has it on their phone and doesn’t retype the address.',
      karta: <KartaTrasa />,
    },
    {
      godzina: '13:20',
      pora: 'something changes',
      tresc: 'A jam near Bolzano. You adjust the route on your side, and the driver sees the new version straight away.',
      karta: <KartaKorek />,
    },
    {
      godzina: '17:00',
      pora: 'you close the day',
      tresc: 'You see who is where, who is finishing and who sets off tomorrow.',
      karta: <KartaZamkniecie />,
    },
  ],
};
