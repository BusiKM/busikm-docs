import type { PunktDnia } from '@/components/ui/OsDnia';
import type { Tlumaczenia } from '@/i18n/jezyki';

/**
 * Dzień kierowcy — sześć punktów, każdy w jednym zdaniu.
 *
 * Bez kart obok: ta strona jest pisana do kierowcy, a nie do właściciela,
 * więc zamiast ilustracji przy każdym punkcie idą cztery duże telefony
 * w sekcji obok. Mniej rzeczy naraz.
 */
export const dzienKierowcy: Tlumaczenia<PunktDnia[]> = {
  pl: [
    { godzina: '6:00', tresc: 'Zlecenie jest w telefonie. Wiesz, gdzie i o której.' },
    { godzina: '6:05', tresc: 'Zdjęcie licznika, „Rozpocznij trasę”. Tyle.' },
    { godzina: '6:06', tresc: 'Nawigacja prowadzi Cię z tej samej aplikacji.' },
    { godzina: '11:38', tresc: 'Tankujesz. Pstrykasz paragon. Jedziesz dalej.' },
    { godzina: '13:20', tresc: 'Telefon mówi: za 20 minut przerwa. Nie po fakcie.' },
    { godzina: '19:40', tresc: 'Zdjęcie licznika, koniec. Papierów nie ma.' },
  ],
  en: [
    { godzina: '6:00', tresc: 'The order is on your phone. You know where and when.' },
    { godzina: '6:05', tresc: 'Photo of the odometer, “Start route”. That’s it.' },
    { godzina: '6:06', tresc: 'Navigation guides you from the same app.' },
    { godzina: '11:38', tresc: 'You fill up. Snap the receipt. Drive on.' },
    { godzina: '13:20', tresc: 'Your phone says: break in 20 minutes. Not after the fact.' },
    { godzina: '19:40', tresc: 'Photo of the odometer, done. No paperwork.' },
  ],
};
