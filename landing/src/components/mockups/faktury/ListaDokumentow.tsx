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

/**
 * Kolumny: numer, kontrahent, kwota, status. Godzina wysyłki idzie pod numer —
 * jako piąta kolumna zjadała tyle miejsca, że numery dokumentów się nie mieściły.
 */
const kolumny = 'grid grid-cols-[1fr_74px_82px] gap-3 lg:grid-cols-[1fr_1.2fr_70px_90px]';

/** Wystawione dokumenty miesiąca z datą wysyłki i stanem. */
export function ListaDokumentow() {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line-dark bg-surface p-5 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-4/3 lg:p-8 lg:text-[13px]">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">Wystawione · wrzesień</b>
        <span className="flex-none text-ink-muted">12 dokumentów</span>
      </div>

      <div className={`${kolumny} border-b border-line-dark py-2.5 text-ink-muted`}>
        <span>Numer</span>
        <span className="hidden lg:block">Kontrahent</span>
        <span className="text-right">Kwota</span>
        <span className="text-right">Status</span>
      </div>

      {dokumenty.map((d) => (
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
        <span className="hidden lg:block">Każdy wiersz: podgląd · pobierz ponownie · duplikat</span>
        <span className="lg:hidden">Podgląd · duplikat</span>
        <span className="flex-none">razem 9 230 €</span>
      </div>
    </div>
  );
}
