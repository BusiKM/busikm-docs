import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { CentrumEksportow } from '@/components/mockups/ksiegowa/CentrumEksportow';
import { Walidacja } from '@/components/mockups/ksiegowa/Walidacja';
import { RozliczenieKierowcy } from '@/components/mockups/ksiegowa/RozliczenieKierowcy';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Opis = { label: string; note: string; caption: string };

const ekrany = [
  { file: 'mockup-ksiegowa-eksport-desktop.png', makieta: <CentrumEksportow /> },
  { file: 'mockup-ksiegowa-walidacja-desktop.png', makieta: <Walidacja /> },
  { file: 'mockup-ksiegowa-diety-desktop.png', makieta: <RozliczenieKierowcy /> },
];

/** Opisy w kolejności `ekrany`. */
const TEKSTY: Tlumaczenia<{ naglowek: string; opisy: [Opis, Opis, Opis] }> = {
  pl: {
    naglowek: 'Trzy ekrany, które widzisz co miesiąc.',
    opisy: [
      {
        label: 'Rozliczenia → Eksporty · desktop',
        note: 'Dekrety do FK z wyborem programu, rejestry VAT, płace i diety, delegacje, ewidencje przebiegu, VAT-REF i JPK_FA, u góry „Pobierz paczkę dla biura”.',
        caption: 'Eksporty',
      },
      {
        label: 'Zamknięcie miesiąca · desktop',
        note: 'Kroki miesiąca – faktury, koszty, przebieg, płace i diety, deklaracje, zamknięcie – z przejściem do braku, obok najbliższe terminy i zamknięte miesiące.',
        caption: 'Zamknięcie miesiąca',
      },
      {
        label: 'Płace i diety · desktop',
        note: 'Rozliczenie Krzysztofa Kamińskiego za wrzesień: kalendarz dni w Niemczech, wynagrodzenie, diety i noclegi, kwota do rozliczenia.',
        caption: 'Płace i diety',
      },
    ],
  },
  en: {
    naglowek: 'Three screens you see every month.',
    opisy: [
      {
        label: 'Settlements → Exports · desktop',
        note: 'Ledger entries with a choice of software, VAT registers, payroll and allowances, business trips, mileage logs, VAT-REF and JPK_FA, with “Download the package for the office” at the top.',
        caption: 'Exports',
      },
      {
        label: 'Month-end close · desktop',
        note: 'Month-end steps – invoices, costs, mileage, payroll and allowances, tax returns, closing – each linking to what’s missing, with upcoming deadlines and closed months alongside.',
        caption: 'Month-end close',
      },
      {
        label: 'Payroll and allowances · desktop',
        note: 'Krzysztof Kamiński’s September settlement: a calendar of days in Germany, pay, per diems and overnight allowances, the total to settle.',
        caption: 'Payroll and allowances',
      },
    ],
  },
};

/**
 * Trzy ekrany księgowej – wszystkie narysowane przy podstronie „Dane dla
 * księgowej", więc nazwy plików są dokładnie te same. Trzy w rzędzie, bo każdy
 * jest kwadratowy i żaden nie jest ważniejszy od pozostałych.
 */
export function Ekrany() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {ekrany.map((e, i) => (
            <div key={e.file} data-reveal>
              <MockupSlot
                file={e.file}
                label={t.opisy[i].label}
                note={t.opisy[i].note}
                ratio="4:3"
                caption={t.opisy[i].caption}
              >
                {e.makieta}
              </MockupSlot>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
