import type { PunktDnia } from '@/components/ui/OsDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';
import {
  KartaPulpit,
  KartaMapa,
  KartaFaktura,
  KartaEksport,
} from '@/components/mockups/wlasciciel/KartyOsi';

/** Dzień właściciela – cztery punkty, od pulpitu rano po komplet dla księgowej. */
export const dzienWlasciciela: Tlumaczenia<PunktDnia[]> = {
  pl: [
    {
      godzina: '7:10',
      pora: 'rano',
      tresc:
        'Otwierasz pulpit. Na górze „Do zrobienia” i to, co dzieje się dziś, niżej przychód, koszty i wynik miesiąca.',
      karta: <KartaPulpit />,
    },
    {
      godzina: '11:40',
      pora: 'w ciągu dnia',
      tresc: 'Dzwoni klient, pyta o ładunek. Patrzysz na mapę w dyspozytorni i odpowiadasz, zanim skończy pytanie.',
      karta: <KartaMapa />,
    },
    {
      godzina: '16:20',
      pora: 'po południu',
      tresc: 'Kierowca zamknął kurs. Sprawdzasz kwotę i klikasz „Wystaw i wyślij do KSeF”. Wysyłkę do klienta zlecasz od razu – wyjdzie, gdy KSeF nada numer.',
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
        'You open the dashboard. “To do” and what’s happening today on top, the month’s revenue, costs and result below.',
      karta: <KartaPulpit />,
    },
    {
      godzina: '11:40',
      pora: 'during the day',
      tresc: 'A client calls about their load. You look at the map in dispatch and answer before they finish asking.',
      karta: <KartaMapa />,
    },
    {
      godzina: '16:20',
      pora: 'afternoon',
      tresc: 'The driver has closed the job. You check the amount and click “Issue and send to KSeF”. Schedule the email to the client – it goes out once KSeF assigns a number.',
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
