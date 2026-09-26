import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Dokument = {
  numer: string;
  krotki: string;
  kontrahent: string;
  kwota: string;
  wyslano: string;
  status: string;
  /** Zielony status to sprawa zamknięta; termin w przyszłości zostaje szary. */
  zamkniete?: boolean;
  tylkoDesktop?: boolean;
};

const dokumenty: Dokument[] = [
  {
    numer: 'FV/2026/09/041',
    krotki: 'FV 09/041',
    kontrahent: 'Alpina Logistics',
    kwota: '3 900 €',
    wyslano: '3.09 · 08:14',
    status: 'dostarczone',
    zamkniete: true,
  },
  {
    numer: 'FV/2026/09/040',
    krotki: 'FV 09/040',
    kontrahent: 'Nordhaven B.V.',
    kwota: '2 650 €',
    wyslano: '2.09 · 17:02',
    status: 'zapłacone',
    zamkniete: true,
  },
  {
    numer: 'FK/2026/09/003',
    krotki: 'FK 09/003',
    kontrahent: 'Hansa Spedition',
    kwota: '− 120 €',
    wyslano: '1.09 · 10:40',
    status: 'dostarczone',
    zamkniete: true,
  },
  {
    numer: 'FV/2026/09/039',
    krotki: 'FV 09/039',
    kontrahent: 'Hansa Spedition',
    kwota: '1 800 €',
    wyslano: '1.09 · 09:15',
    status: 'termin 1.10',
  },
  {
    numer: 'FZ/2026/08/017',
    krotki: 'FZ 08/017',
    kontrahent: 'Alpina Logistics',
    kwota: '1 000 €',
    wyslano: '28.08 · 12:30',
    status: 'zapłacone',
    zamkniete: true,
    tylkoDesktop: true,
  },
];

/** Kwota, godzina wysyłki i status po angielsku — kolejność jak w `dokumenty`. */
const DOKUMENTY_EN: readonly Pick<Dokument, 'kwota' | 'wyslano' | 'status'>[] = [
  { kwota: '€3,900', wyslano: '3 Sep · 08:14', status: 'delivered' },
  { kwota: '€2,650', wyslano: '2 Sep · 17:02', status: 'paid' },
  { kwota: '− €120', wyslano: '1 Sep · 10:40', status: 'delivered' },
  { kwota: '€1,800', wyslano: '1 Sep · 09:15', status: 'due 1 Oct' },
  { kwota: '€1,000', wyslano: '28 Aug · 12:30', status: 'paid' },
];

const TEKSTY: Tlumaczenia<{
  dokumenty: Dokument[];
  naglowek: string;
  ile: string;
  kolumny: readonly [string, string, string, string];
  akcje: string;
  akcjeKrotko: string;
  razem: string;
}> = {
  pl: {
    dokumenty,
    naglowek: 'Wystawione · wrzesień',
    ile: '12 dokumentów',
    kolumny: ['Numer', 'Kontrahent', 'Kwota', 'Status'],
    akcje: 'Każdy wiersz: podgląd · pobierz ponownie · duplikat',
    akcjeKrotko: 'Podgląd · duplikat',
    razem: 'razem 9 230 €',
  },
  en: {
    dokumenty: dokumenty.map((d, i) => ({ ...d, ...DOKUMENTY_EN[i] })),
    naglowek: 'Issued · September',
    ile: '12 documents',
    kolumny: ['Number', 'Client', 'Amount', 'Status'],
    akcje: 'Every row: preview · download again · duplicate',
    akcjeKrotko: 'Preview · duplicate',
    razem: 'total €9,230',
  },
};

/**
 * Kolumny: numer, kontrahent, kwota, status. Godzina wysyłki idzie pod numer —
 * jako piąta kolumna zjadała tyle miejsca, że numery dokumentów się nie mieściły.
 */
const kolumny = 'grid grid-cols-[1fr_74px_82px] gap-3 lg:grid-cols-[1fr_1.2fr_70px_90px]';

/** Wystawione dokumenty miesiąca z datą wysyłki i stanem. */
export function ListaDokumentow() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line-dark bg-surface text-paper p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-8 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">{t.naglowek}</b>
        <span className="flex-none text-ink-muted">{t.ile}</span>
      </div>

      <div className={`${kolumny} border-b border-line-dark py-2.5 text-ink-muted`}>
        <span>{t.kolumny[0]}</span>
        <span className="hidden lg:block">{t.kolumny[1]}</span>
        <span className="text-right">{t.kolumny[2]}</span>
        <span className="text-right">{t.kolumny[3]}</span>
      </div>

      {t.dokumenty.map((d) => (
        <div
          key={d.numer}
          className={`${kolumny} items-center border-b border-line-dark py-2 lg:py-2.5 ${
            d.tylkoDesktop ? 'hidden lg:grid' : ''
          }`}
        >
          <div className="min-w-0">
            <span className="block truncate">
              <span className="lg:hidden">{d.krotki}</span>
              <span className="hidden lg:inline">{d.numer}</span>
            </span>
            <span className="block truncate text-[11px] text-ink-muted lg:text-[12px]">
              {d.wyslano}
            </span>
          </div>
          <span className="hidden truncate lg:block">{d.kontrahent}</span>
          <span className="text-right">{d.kwota}</span>
          <span className={`text-right ${d.zamkniete ? 'text-green' : 'text-ink-muted'}`}>
            {d.status}
          </span>
        </div>
      ))}

      <div className="mt-auto flex justify-between gap-4 pt-1 text-ink-muted">
        <span className="hidden lg:block">{t.akcje}</span>
        <span className="lg:hidden">{t.akcjeKrotko}</span>
        <span className="flex-none">{t.razem}</span>
      </div>
    </div>
  );
}
