import type { PunktDnia } from '@/components/ui/OsDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';
import {
  KartaPulpit,
  KartaMapa,
  KartaFaktura,
  KartaEksport,
} from '@/components/mockups/wlasciciel/KartyOsi';

/** Dzień właściciela — cztery punkty, od pulpitu rano po komplet dla księgowej. */
export const dzienWlasciciela: Tlumaczenia<PunktDnia[]> = {
  pl: [
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
  ],
  en: [
    {
      godzina: '7:10',
      pora: 'morning',
      tresc:
        'You open the dashboard. The month’s revenue, costs and profit on top, and below them whatever needs attention today.',
      karta: <KartaPulpit />,
    },
    {
      godzina: '11:40',
      pora: 'during the day',
      tresc: 'A client calls about their load. You look at the map and answer before they finish asking.',
      karta: <KartaMapa />,
    },
    {
      godzina: '16:20',
      pora: 'afternoon',
      tresc: 'The driver has closed the job. You check the amount, click once — the invoice goes to the client.',
      karta: <KartaFaktura />,
    },
    {
      godzina: 'end',
      pora: 'of the month',
      tresc: 'One button and your accountant has everything. No calls with questions.',
      karta: <KartaEksport />,
    },
  ],
};
