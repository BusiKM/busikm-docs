import type { PunktDnia } from '@/components/ui/OsDnia';

/**
 * Dzień kierowcy — sześć punktów, każdy w jednym zdaniu.
 *
 * Bez kart obok: ta strona jest pisana do kierowcy, a nie do właściciela,
 * więc zamiast ilustracji przy każdym punkcie idą cztery duże telefony
 * w sekcji obok. Mniej rzeczy naraz.
 */
export const dzienKierowcy: PunktDnia[] = [
  { godzina: '6:00', tresc: 'Zlecenie jest w telefonie. Wiesz, gdzie i o której.' },
  { godzina: '6:05', tresc: 'Zdjęcie licznika, „Rozpocznij trasę”. Tyle.' },
  { godzina: '6:06', tresc: 'Nawigacja prowadzi Cię z tej samej aplikacji.' },
  { godzina: '11:38', tresc: 'Tankujesz. Pstrykasz paragon. Jedziesz dalej.' },
  { godzina: '13:20', tresc: 'Telefon mówi: za 20 minut przerwa. Nie po fakcie.' },
  { godzina: '19:40', tresc: 'Zdjęcie licznika, koniec. Papierów nie ma.' },
];
