import type { PunktDnia } from '@/components/ui/OsDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';
import {
  KartaKontrahent,
  KartaKierowcy,
  KartaTrasa,
  KartaKorek,
  KartaZamkniecie,
} from '@/components/mockups/dyspozytor/KartyOsi';

/** Dzień dyspozytora – pięć punktów, od przyjęcia zlecenia po zamknięcie dnia. */
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
      tresc: 'System podpowiada, które auto i kierowca zdążą: dojazd, odpoczynek, ładowność, dokumenty. Decydujesz Ty.',
      karta: <KartaKierowcy />,
    },
    {
      godzina: '7:06',
      pora: 'trasa układa się sama',
      tresc: 'System ustawia kolejność postojów, liczy kilometry i czas. Kierowca ma trasę w telefonie, nie przepisuje adresu.',
      karta: <KartaTrasa />,
    },
    {
      godzina: '13:20',
      pora: 'coś się zmienia',
      tresc: 'Kurs może się spóźnić – widzisz to w kolejce „Wymaga reakcji”. Jednym kliknięciem powiadamiasz klienta albo piszesz do kierowcy.',
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
      tresc: 'The system suggests which van and driver will make it: approach time, rest, payload, documents. You decide.',
      karta: <KartaKierowcy />,
    },
    {
      godzina: '7:06',
      pora: 'the route plans itself',
      tresc: 'The system puts the stops in order and works out the kilometres and time. The driver has the route on their phone and doesn’t retype the address.',
      karta: <KartaTrasa />,
    },
    {
      godzina: '13:20',
      pora: 'something changes',
      tresc: 'A run may arrive late – you see it in the “Needs action” queue. One click to notify the client or message the driver.',
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
