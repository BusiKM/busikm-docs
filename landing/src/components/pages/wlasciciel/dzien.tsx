import type { PunktDnia } from '@/components/ui/OsDnia';
import {
  KartaPulpit,
  KartaMapa,
  KartaFaktura,
  KartaEksport,
} from '@/components/mockups/wlasciciel/KartyOsi';

/** Dzień właściciela — cztery punkty, od pulpitu rano po komplet dla księgowej. */
export const dzienWlasciciela: PunktDnia[] = [
  {
    godzina: '7:10',
    pora: 'rano',
    tresc:
      'Otwierasz pulpit. Przychód, koszty i zysk miesiąca na wierzchu, pod spodem to, co wymaga uwagi dzisiaj.',
    karta: <KartaPulpit />,
  },
  {
    godzina: '11:40',
    pora: 'w ciągu dnia',
    tresc: 'Dzwoni klient, pyta o ładunek. Patrzysz na mapę i odpowiadasz, zanim skończy pytanie.',
    karta: <KartaMapa />,
  },
  {
    godzina: '16:20',
    pora: 'po południu',
    tresc: 'Kierowca zamknął kurs. Sprawdzasz kwotę, klikasz raz — faktura idzie do klienta.',
    karta: <KartaFaktura />,
  },
  {
    godzina: 'koniec',
    pora: 'miesiąca',
    tresc: 'Jeden przycisk i księgowa ma komplet. Nie dzwoni z pytaniami.',
    karta: <KartaEksport />,
  },
];
