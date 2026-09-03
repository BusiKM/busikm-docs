import { Chrome } from '@/components/mockups/Chrome';

type Wiersz = {
  label: string;
  value: string;
  /** Skrót na telefon, gdy pełna wartość się nie mieści. */
  krotki?: string;
  mocny?: boolean;
};

const zlecenie: Wiersz[] = [
  { label: 'Kontrahent', value: 'Alpina Logistics S.r.l.', krotki: 'Alpina Logistics' },
  { label: 'Fracht', value: '3 900 €', mocny: true },
  { label: 'Załadunek', value: '2.09 · 06:00 · Warszawa', krotki: '2.09 · 06:00' },
  { label: 'Rozładunek', value: '3.09 · 07:52 · Mediolan', krotki: '3.09 · 07:52' },
  { label: 'Termin płatności', value: '30 dni' },
  { label: 'Kierowca · pojazd', value: 'Marek W. · WZ 4821K', krotki: 'Marek W.' },
];

/**
 * Pełne okno aplikacji: zlecenie po lewej, faktura po prawej, między nimi
 * strzałka i jeden przycisk. Na telefonie kolumny stają jedna nad drugą,
 * a strzałka obraca się w dół.
 */
export function ZlecenieIFaktura() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_1px_3px_rgba(0,0,0,.04),0_40px_80px_rgba(11,95,255,.10),0_12px_32px_rgba(0,0,0,.06)] lg:aspect-16/10 lg:rounded-panel">
      <Chrome label="app.busikm.pl · Zlecenie 2026/09/041 · Faktura" />

      <div className="grid flex-1 gap-3 p-4 text-[12px] lg:grid-cols-[1fr_200px_1fr] lg:gap-0 lg:p-12 lg:text-[13px]">
        <div className="flex flex-col gap-2 rounded-[14px] border border-line bg-paper p-4 lg:gap-3 lg:rounded-card lg:p-7">
          <div className="text-muted">Zlecenie · 2026/09/041</div>
          <b className="text-[16px] tracking-[-0.01em] lg:text-[22px]">Warszawa → Mediolan</b>
          {zlecenie.map((r) => (
            <div key={r.label} className="flex justify-between gap-3 border-t border-line py-1.5 lg:py-2.5">
              <span className="flex-none text-muted">{r.label}</span>
              {r.mocny ? (
                <b>{r.value}</b>
              ) : (
                <span className="truncate">
                  <span className="lg:hidden">{r.krotki ?? r.value}</span>
                  <span className="hidden lg:inline">{r.value}</span>
                </span>
              )}
            </div>
          ))}
          <span className="mt-auto self-start rounded-full bg-green/15 px-3 py-1.5 font-semibold text-green-ink">
            Kurs zakończony · 07:52
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 lg:gap-4 lg:px-4">
          <span aria-hidden className="text-[24px] text-blue lg:text-[32px]">
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:inline">→</span>
          </span>
          <div className="rounded-btn bg-blue px-4 py-3 text-center font-semibold whitespace-nowrap text-white lg:px-[18px] lg:py-3.5">
            Wystaw i wyślij
          </div>
          <div className="text-center text-[12px] text-muted">nic do przepisania</div>
        </div>

        <div className="flex flex-col gap-2 rounded-[14px] border border-line p-4 shadow-card lg:gap-3 lg:rounded-card lg:p-7">
          <div className="flex justify-between gap-3 text-muted">
            <span>Faktura VAT</span>
            <span className="flex-none">FV/2026/09/041</span>
          </div>
          <b className="text-[16px] tracking-[-0.01em] lg:text-[22px]">Alpina Logistics S.r.l.</b>
          <div className="text-muted">Via Tortona 12, 20144 Milano · IT 08765432109</div>

          <div className="flex justify-between gap-3 border-t border-line py-1.5 lg:py-2.5">
            <span>
              <span className="lg:hidden">Usługa transportowa</span>
              <span className="hidden lg:inline">Usługa transportowa Warszawa → Mediolan</span>
            </span>
            <span className="flex-none">3 900,00 €</span>
          </div>
          <div className="flex justify-between gap-3 text-muted lg:py-1.5">
            <span>VAT · 0% (np)</span>
            <span>0,00 €</span>
          </div>
          <div className="flex justify-between gap-3 border-t border-line py-1.5 lg:py-2.5">
            <b>Razem</b>
            <b className="flex-none">3 900,00 € · 16 692 zł</b>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3 text-muted">
            <span>Kurs 4,2800 z 3.09.2026</span>
            <span>Płatność do 3.10</span>
          </div>

          <div className="mt-auto flex gap-2 pt-2">
            {['mail', 'e-faktura', 'księgowa'].map((k) => (
              <span
                key={k}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line py-2 text-center"
              >
                <span aria-hidden className="text-green-ink">
                  ●
                </span>
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
