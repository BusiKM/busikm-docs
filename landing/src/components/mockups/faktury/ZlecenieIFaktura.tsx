import { Chrome } from '@/components/mockups/Chrome';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Wiersz = {
  label: string;
  value: string;
  /** Skrót na telefon, gdy pełna wartość się nie mieści. */
  krotki?: string;
  mocny?: boolean;
};

const TEKSTY: Tlumaczenia<{
  zlecenie: Wiersz[];
  okno: string;
  numer: string;
  trasa: string;
  zakonczony: string;
  wystaw: string;
  nicDoPrzepisania: string;
  faktura: string;
  usluga: string;
  uslugaTrasa: string;
  kwota: string;
  vat: string;
  vatKwota: string;
  razem: string;
  razemKwota: string;
  kurs: string;
  platnosc: string;
  kanaly: readonly string[];
}> = {
  pl: {
    zlecenie: [
      { label: 'Kontrahent', value: 'Alpina Logistics S.r.l.', krotki: 'Alpina Logistics' },
      { label: 'Fracht', value: '3 900 €', mocny: true },
      { label: 'Załadunek', value: '2.09 · 06:00 · Warszawa', krotki: '2.09 · 06:00' },
      { label: 'Rozładunek', value: '3.09 · 07:52 · Mediolan', krotki: '3.09 · 07:52' },
      { label: 'Termin płatności', value: '30 dni' },
      { label: 'Kierowca · pojazd', value: 'Marek W. · WZ 4821K', krotki: 'Marek W.' },
    ],
    okno: 'app.busikm.pl · Zlecenie 2026/09/041 · Faktura',
    numer: 'Zlecenie · 2026/09/041',
    trasa: 'Warszawa → Mediolan',
    zakonczony: 'Kurs zakończony · 07:52',
    wystaw: 'Wystaw i wyślij',
    nicDoPrzepisania: 'nic do przepisania',
    faktura: 'Faktura VAT',
    usluga: 'Usługa transportowa',
    uslugaTrasa: 'Usługa transportowa Warszawa → Mediolan',
    kwota: '3 900,00 €',
    vat: 'VAT · 0% (np)',
    vatKwota: '0,00 €',
    razem: 'Razem',
    razemKwota: '3 900,00 € · 16 692 zł',
    kurs: 'Kurs 4,2800 z 3.09.2026',
    platnosc: 'Płatność do 3.10',
    kanaly: ['mail', 'e-faktura', 'księgowa'],
  },
  en: {
    zlecenie: [
      { label: 'Client', value: 'Alpina Logistics S.r.l.', krotki: 'Alpina Logistics' },
      { label: 'Freight', value: '€3,900', mocny: true },
      { label: 'Loading', value: '2 Sep · 06:00 · Warsaw', krotki: '2 Sep · 06:00' },
      { label: 'Unloading', value: '3 Sep · 07:52 · Milan', krotki: '3 Sep · 07:52' },
      { label: 'Payment term', value: '30 days' },
      { label: 'Driver · vehicle', value: 'Marek W. · WZ 4821K', krotki: 'Marek W.' },
    ],
    okno: 'app.busikm.pl · Order 2026/09/041 · Invoice',
    numer: 'Order · 2026/09/041',
    trasa: 'Warsaw → Milan',
    zakonczony: 'Job finished · 07:52',
    wystaw: 'Issue and send',
    nicDoPrzepisania: 'nothing to retype',
    faktura: 'VAT invoice',
    usluga: 'Transport service',
    uslugaTrasa: 'Transport service Warsaw → Milan',
    kwota: '€3,900.00',
    vat: 'VAT · 0% (out of scope)',
    vatKwota: '€0.00',
    razem: 'Total',
    razemKwota: '€3,900.00 · PLN 16,692',
    kurs: 'Rate 4.2800 of 3 Sep 2026',
    platnosc: 'Due by 3 Oct',
    kanaly: ['email', 'e-invoice', 'accountant'],
  },
};

/**
 * Pełne okno aplikacji: zlecenie po lewej, faktura po prawej, między nimi
 * strzałka i jeden przycisk. Na telefonie kolumny stają jedna nad drugą,
 * a strzałka obraca się w dół.
 */
export function ZlecenieIFaktura() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_1px_3px_rgba(0,0,0,.04),0_40px_80px_rgba(11,95,255,.10),0_12px_32px_rgba(0,0,0,.06)] lg:aspect-16/10 lg:rounded-panel">
      <Chrome label={t.okno} />

      <div className="grid flex-1 gap-3 p-4 text-[12px] lg:grid-cols-[1fr_200px_1fr] lg:gap-0 lg:p-12 lg:text-[13px]">
        <div className="flex flex-col gap-2 rounded-[14px] border border-line bg-paper p-4 lg:gap-3 lg:rounded-card lg:p-7">
          <div className="text-muted">{t.numer}</div>
          <b className="text-[16px] tracking-[-0.01em] lg:text-[22px]">{t.trasa}</b>
          {t.zlecenie.map((r) => (
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
            {t.zakonczony}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 lg:gap-4 lg:px-4">
          <span aria-hidden className="text-[24px] text-blue lg:text-[32px]">
            <span className="lg:hidden">↓</span>
            <span className="hidden lg:inline">→</span>
          </span>
          <div className="rounded-btn bg-blue px-4 py-3 text-center font-semibold whitespace-nowrap text-white lg:px-[18px] lg:py-3.5">
            {t.wystaw}
          </div>
          <div className="text-center text-[12px] text-muted">{t.nicDoPrzepisania}</div>
        </div>

        <div className="flex flex-col gap-2 rounded-[14px] border border-line p-4 shadow-card lg:gap-3 lg:rounded-card lg:p-7">
          <div className="flex justify-between gap-3 text-muted">
            <span>{t.faktura}</span>
            <span className="flex-none">FV/2026/09/041</span>
          </div>
          <b className="text-[16px] tracking-[-0.01em] lg:text-[22px]">Alpina Logistics S.r.l.</b>
          <div className="text-muted">Via Tortona 12, 20144 Milano · IT 08765432109</div>

          <div className="flex justify-between gap-3 border-t border-line py-1.5 lg:py-2.5">
            <span>
              <span className="lg:hidden">{t.usluga}</span>
              <span className="hidden lg:inline">{t.uslugaTrasa}</span>
            </span>
            <span className="flex-none">{t.kwota}</span>
          </div>
          <div className="flex justify-between gap-3 text-muted lg:py-1.5">
            <span>{t.vat}</span>
            <span>{t.vatKwota}</span>
          </div>
          <div className="flex justify-between gap-3 border-t border-line py-1.5 lg:py-2.5">
            <b>{t.razem}</b>
            <b className="flex-none">{t.razemKwota}</b>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3 text-muted">
            <span>{t.kurs}</span>
            <span>{t.platnosc}</span>
          </div>

          <div className="mt-auto flex gap-2 pt-2">
            {t.kanaly.map((k) => (
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
