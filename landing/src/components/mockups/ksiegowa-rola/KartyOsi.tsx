import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Pięć drobnych kart przy osi miesiąca księgowej. Nie są makietami do podmiany —
 * to ilustracje przy punktach osi.
 */

type Wiersz = { co: string; stan: string; brak: boolean };

const TEKSTY: Tlumaczenia<{
  wpada: [string, string][];
  sprawdzenie: Wiersz[];
  lipiec: string;
  sierpien: string;
  pobierz: string;
  formaty: [string, string, boolean][];
  zamkniety: string;
  miesiacZamkniety: string;
  kto: string;
  miesiacOtwarty: string;
  otwarty: string;
}> = {
  pl: {
    wpada: [
      ['3.09 · faktura FV/2026/09/041', 'wpadła'],
      ['2.09 · paragon Shell · 648 zł', 'wpadł'],
      ['2.09 · trasa Warszawa → Mediolan', 'wpadła'],
    ],
    sprawdzenie: [
      { co: 'Sprzedaż · 42', stan: 'komplet', brak: false },
      { co: 'Koszty · 3 bez zlecenia', stan: 'Tomasz L.', brak: true },
      { co: 'Czas pracy · 9', stan: 'komplet', brak: false },
    ],
    lipiec: 'lipiec',
    sierpien: 'sierpień',
    pobierz: 'Pobierz komplet za sierpień',
    formaty: [
      ['Insert', 'EPP', false],
      ['Comarch Optima', 'wybrany', true],
      ['Symfonia', 'FK', false],
      ['Zwykły arkusz', 'XLSX', false],
    ],
    miesiacZamkniety: 'Sierpień 2026',
    zamkniety: 'zamknięty',
    kto: '· 2.09, Ewa M.',
    miesiacOtwarty: 'Wrzesień 2026',
    otwarty: 'otwarty',
  },
  en: {
    wpada: [
      ['3 Sep · invoice FV/2026/09/041', 'in'],
      ['2 Sep · Shell receipt · PLN 648', 'in'],
      ['2 Sep · route Warsaw → Milan', 'in'],
    ],
    sprawdzenie: [
      { co: 'Sales · 42', stan: 'complete', brak: false },
      { co: 'Costs · 3 without an order', stan: 'Tomasz L.', brak: true },
      { co: 'Working time · 9', stan: 'complete', brak: false },
    ],
    lipiec: 'July',
    sierpien: 'August',
    pobierz: 'Download everything for August',
    formaty: [
      ['Insert', 'EPP', false],
      ['Comarch Optima', 'selected', true],
      ['Symfonia', 'FK', false],
      ['Plain spreadsheet', 'XLSX', false],
    ],
    miesiacZamkniety: 'August 2026',
    zamkniety: 'closed',
    kto: '· 2 Sep, Ewa M.',
    miesiacOtwarty: 'September 2026',
    otwarty: 'open',
  },
};

const ramka =
  'rounded-2xl border border-line-dark bg-surface p-4 text-[11px] text-paper lg:p-4.5';

/** przez cały miesiąc — dane wpadają same. */
export function KartaWpada() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {t.wpada.map(([co, stan]) => (
        <div key={co} className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2">
          <span className="truncate">{co}</span>
          <span className="flex-none text-green">{stan}</span>
        </div>
      ))}
    </div>
  );
}

/** ostatni tydzień — lista sprawdzenia mówi, czego brakuje. */
export function KartaSprawdzenie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {t.sprawdzenie.map((w) => (
        <div
          key={w.co}
          className={`flex justify-between gap-3 rounded-lg px-2.5 py-2 ${
            w.brak ? 'border border-line-dark-2 bg-surface-2' : 'bg-surface-2'
          }`}
        >
          <span className="truncate">{w.co}</span>
          <span className={`flex-none ${w.brak ? 'text-ink-muted' : 'text-green'}`}>{w.stan}</span>
        </div>
      ))}
    </div>
  );
}

/** pierwszy dzień po — wybierasz miesiąc i klikasz raz. */
export function KartaPobierz() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2.5`}>
      <div className="flex gap-2">
        <span className="flex-1 rounded-lg border border-line-dark px-2.5 py-2 text-center text-ink-muted">
          {t.lipiec}
        </span>
        <span className="flex-1 rounded-lg border border-blue-soft-line bg-surface-2 px-2.5 py-2 text-center font-semibold">
          {t.sierpien}
        </span>
      </div>
      <div className="rounded-[10px] bg-blue py-2.5 text-center font-semibold text-white">
        {t.pobierz}
      </div>
    </div>
  );
}

/** wczytujesz — w formacie swojego programu. */
export function KartaFormat() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {t.formaty.map(([nazwa, format, wybrany]) => (
        <div
          key={nazwa}
          className={`flex justify-between gap-3 rounded-lg px-2.5 py-2 ${
            wybrany ? 'border border-blue-soft-line bg-surface-2' : 'bg-surface-2'
          }`}
        >
          <span className="truncate">{nazwa}</span>
          <span className={`flex-none ${wybrany ? 'text-blue-light' : 'text-ink-muted'}`}>{format}</span>
        </div>
      ))}
    </div>
  );
}

/** zamykasz miesiąc — po zamknięciu nikt nie zmieni danych wstecz. */
export function KartaZamkniecie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      <div className="rounded-lg bg-surface-2 px-2.5 py-2">
        <div className="flex justify-between gap-3">
          <b>{t.miesiacZamkniety}</b>
          <span className="flex-none text-green">{t.zamkniety}</span>
        </div>
        <div className="text-ink-muted">{t.kto}</div>
      </div>
      <div className="flex justify-between gap-3 rounded-lg border border-dashed border-line-dark px-2.5 py-2">
        <span>{t.miesiacOtwarty}</span>
        <span className="flex-none text-ink-muted">{t.otwarty}</span>
      </div>
    </div>
  );
}
