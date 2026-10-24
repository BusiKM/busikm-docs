import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul: string;
  tresc: string;
  zestawienia: readonly (readonly [string, string])[];
}> = {
  pl: {
    tytul: 'Wszystkie eksporty w jednym miejscu',
    tresc: 'Rozliczenia → Eksporty: od dekretów do FK po JPK. Przy księdze przychodów i rozchodów dochodzą KPiR i JPK_PKPIR.',
    zestawienia: [
      ['Dekrety do FK', '56 faktur, 192 koszty'],
      ['Rejestry VAT', 'Excel · PDF'],
      ['Lista płac i diety', '7 kierowców'],
      ['Delegacje kierowców', '7 kierowców'],
      ['Ewidencje przebiegu', '7 pojazdów'],
      ['Zwrot VAT z UE', 'VAT-REF · 6 krajów'],
      ['JPK_FA', '56 faktur'],
      ['JPK_V7M', 'do 25.10'],
      ['KPiR i JPK_PKPIR', 'przy KPiR'],
    ],
  },
  en: {
    tytul: 'Every export in one place',
    tresc: 'Settlements → Exports: from ledger entries to JPK files. Firms on the simplified revenue and expense ledger also get KPiR and JPK_PKPIR.',
    zestawienia: [
      ['Ledger entries', '56 invoices, 192 costs'],
      ['VAT registers', 'Excel · PDF'],
      ['Payroll and allowances', '7 drivers'],
      ['Drivers’ business trips', '7 drivers'],
      ['Mileage logs', '7 vehicles'],
      ['EU VAT refund', 'VAT-REF · 6 countries'],
      ['JPK_FA', '56 invoices'],
      ['JPK_V7M', 'by 25 Oct'],
      ['KPiR and JPK_PKPIR', 'for KPiR firms'],
    ],
  },
};

/** 03 – dziewięć zestawień jako siatka kafelków z licznikami. */
export function DziewiecZestawien() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
            >
              03
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.tytul}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            {t.tresc}
          </p>
        </div>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-3 lg:gap-4">
          {t.zestawienia.map(([nazwa, licznik]) => (
            <div
              key={nazwa}
              data-reveal
              className="flex min-h-25 items-end justify-between gap-2 rounded-card border border-line-dark bg-surface p-4.5 lg:min-h-30 lg:p-7"
            >
              <span className="text-[15px] font-semibold lg:text-body">{nazwa}</span>
              <span className="flex-none text-[12px] text-ink-muted lg:text-[13px]">
                {licznik}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
