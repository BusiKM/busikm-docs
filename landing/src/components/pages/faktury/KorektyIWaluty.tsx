import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Wiersz = {
  label: string;
  value: string;
  krotki?: string;
  mocny?: boolean;
  przygaszony?: boolean;
};

const TEKSTY: Tlumaczenia<{
  zaliczka: Wiersz[];
  waluta: Wiersz[];
  korekty: { tytul: string; tresc: string; przypis: string };
  waluty: { tytul: string; tresc: string; przypis: string };
}> = {
  pl: {
    zaliczka: [
      { label: 'Zaliczka · FZ/2026/08/017', value: '1 000 €' },
      { label: 'Faktura końcowa · FV/2026/09/041', value: '3 900 €' },
      { label: 'Odliczona zaliczka', value: '− 1 000 €', przygaszony: true },
      { label: 'Do zapłaty', value: '2 900 €', mocny: true },
    ],
    waluta: [
      { label: 'Kwota', value: '3 900,00 €', mocny: true },
      { label: 'Kurs', value: '4,2800 zł' },
      { label: 'Data przeliczenia', value: '3.09.2026' },
      { label: 'W złotych', value: '16 692,00 zł', mocny: true },
    ],
    korekty: {
      tytul: 'Korekty i zaliczki',
      tresc:
        'Tą samą ścieżką. Korekta wie, do czego się odnosi, zaliczka odlicza się od faktury końcowej. Bez kombinowania w arkuszu.',
      przypis: 'Korekta FK/2026/09/003 → odnosi się do FV/2026/09/041',
    },
    waluty: {
      tytul: 'Waluty',
      tresc:
        'Kwota, kurs i data przeliczenia zostają na dokumencie. Nikt nie liczy tego w kalkulatorze trzy tygodnie później.',
      przypis: 'Kurs z dnia poprzedzającego wystawienie — zapisany przy dokumencie na stałe.',
    },
  },
  en: {
    zaliczka: [
      { label: 'Advance · FZ/2026/08/017', value: '€1,000' },
      { label: 'Final invoice · FV/2026/09/041', value: '€3,900' },
      { label: 'Advance deducted', value: '− €1,000', przygaszony: true },
      { label: 'To pay', value: '€2,900', mocny: true },
    ],
    waluta: [
      { label: 'Amount', value: '€3,900.00', mocny: true },
      { label: 'Rate', value: 'PLN 4.2800' },
      { label: 'Conversion date', value: '3 Sep 2026' },
      { label: 'In złoty', value: 'PLN 16,692.00', mocny: true },
    ],
    korekty: {
      tytul: 'Corrections and advances',
      tresc:
        'Same path. A correction knows what it refers to, and an advance is deducted from the final invoice. No juggling in a spreadsheet.',
      przypis: 'Correction FK/2026/09/003 → refers to FV/2026/09/041',
    },
    waluty: {
      tytul: 'Currencies',
      tresc:
        'The amount, rate and conversion date stay on the document. Nobody works it out on a calculator three weeks later.',
      przypis: 'Rate from the day before the invoice date — saved with the document for good.',
    },
  },
};

/** Panel z wierszami wewnątrz karty — obie karty tej sekcji mają taki sam. */
function Panel({ wiersze, etykietyPrzygaszone }: { wiersze: Wiersz[]; etykietyPrzygaszone?: boolean }) {
  return (
    <div className="flex flex-col rounded-card border border-line-dark bg-ink p-5 text-[13px] lg:p-6 lg:text-caption">
      {wiersze.map((w, i) => (
        <div
          key={w.label}
          className={`flex justify-between gap-3 py-2 lg:py-2.5 ${
            i < wiersze.length - 1 ? 'border-b border-line-dark' : ''
          } ${w.przygaszony ? 'text-ink-muted' : ''}`}
        >
          <span className={etykietyPrzygaszone && !w.przygaszony ? 'text-ink-muted' : ''}>
            {w.label}
          </span>
          {w.mocny ? (
            <b className="flex-none">{w.value}</b>
          ) : (
            <span className="flex-none truncate">
              <span className="lg:hidden">{w.krotki ?? w.value}</span>
              <span className="hidden lg:inline">{w.value}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** 03 + 04 — dwa punkty w dwóch kartach obok siebie. */
export function KorektyIWaluty() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          tone="surface"
          numer="03"
          tytul={t.korekty.tytul}
          tresc={t.korekty.tresc}
        >
          <div className="flex flex-col gap-2">
            <Panel wiersze={t.zaliczka} />
            <p className="text-[13px] text-ink-muted lg:text-caption">
              {t.korekty.przypis}
            </p>
          </div>
        </KartaBloku>

        <KartaBloku
          tone="surface"
          numer="04"
          tytul={t.waluty.tytul}
          tresc={t.waluty.tresc}
        >
          <div className="flex flex-col gap-2">
            <Panel wiersze={t.waluta} etykietyPrzygaszone />
            <p className="text-[13px] text-ink-muted lg:text-caption">
              {t.waluty.przypis}
            </p>
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
