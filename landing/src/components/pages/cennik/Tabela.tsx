import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Wiersz = readonly [string, string, string];

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  plany: readonly [string, string];
  parametry: readonly Wiersz[];
  /** Sześć pierwszych pozycji jest w obu planach, cztery ostatnie tylko w Firmie. */
  funkcje: readonly (readonly [string, boolean])[];
  ceny: readonly Wiersz[];
}> = {
  pl: {
    naglowek: 'Co jest w którym planie.',
    plany: ['Start', 'Firma'],
    parametry: [
      ['Pojazdy', 'do 3', 'do 10, każdy kolejny +29 zł'],
      ['Kierowcy', 'bez limitu', 'bez limitu'],
      ['Pracownicy biura', 'bez limitu', 'bez limitu'],
    ],
    funkcje: [
      ['Zlecenia i dyspozytornia', true],
      ['Mapa i trasy', true],
      ['Czas pracy', true],
      ['Koszty i paragony', true],
      ['Faktury dla klientów', true],
      ['Aplikacja dla kierowców', true],
      ['Komplet dla księgowej', false],
      ['Zestawienia sprzedaży i zakupów', false],
      ['Rentowność zleceń', false],
      ['Raporty kosztów floty', false],
    ],
    ceny: [
      ['Miesięcznie', '149 zł', '299 zł'],
      ['Rocznie', '1 490 zł', '2 990 zł'],
    ],
  },
  en: {
    naglowek: 'What’s in each plan.',
    plany: ['Start', 'Business'],
    parametry: [
      ['Vehicles', 'up to 3', 'up to 10, then +PLN 29 each'],
      ['Drivers', 'unlimited', 'unlimited'],
      ['Office staff', 'unlimited', 'unlimited'],
    ],
    funkcje: [
      ['Orders and dispatch', true],
      ['Map and routes', true],
      ['Working time', true],
      ['Costs and receipts', true],
      ['Invoices for clients', true],
      ['Driver app', true],
      ['Full pack for your accountant', false],
      ['Sales and purchase reports', false],
      ['Profitability per order', false],
      ['Fleet cost reports', false],
    ],
    ceny: [
      ['Monthly', 'PLN 149', 'PLN 299'],
      ['Yearly', 'PLN 1,490', 'PLN 2,990'],
    ],
  },
};

const wiersz = 'grid grid-cols-[1fr_64px_64px] items-center gap-3 lg:grid-cols-[1fr_200px_200px]';

/** Tabela porównawcza — ma się czytać jak tabela, bez ozdobników. */
export function Tabela() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-14">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal className="text-[14px] lg:text-body">
          <div
            className={`${wiersz} border-b border-line pb-4 text-[15px] font-semibold lg:text-[19px]`}
          >
            <span />
            <span className="text-center lg:text-left">{t.plany[0]}</span>
            <span className="text-center lg:text-left">{t.plany[1]}</span>
          </div>

          {t.parametry.map(([nazwa, start, firma]) => (
            <div key={nazwa} className={`${wiersz} border-b border-line py-3.5 lg:py-4`}>
              <span className="font-medium">{nazwa}</span>
              <span className="text-center text-muted lg:text-left">{start}</span>
              <span className="text-center text-muted lg:text-left">{firma}</span>
            </div>
          ))}

          {t.funkcje.map(([nazwa, wStart]) => (
            <div key={nazwa} className={`${wiersz} border-b border-line py-3.5 lg:py-4`}>
              <span className="font-medium">{nazwa}</span>
              <span className={`text-center lg:text-left ${wStart ? 'text-blue' : 'text-muted'}`}>
                {wStart ? '✓' : '—'}
              </span>
              <span className="text-center text-blue lg:text-left">✓</span>
            </div>
          ))}

          {t.ceny.map(([nazwa, start, firma], i) => (
            <div
              key={nazwa}
              className={`${wiersz} py-3.5 lg:py-4 ${
                i === 0 ? 'border-b border-line' : ''
              }`}
            >
              <span className="font-medium">{nazwa}</span>
              <b className="text-center lg:text-left">{start}</b>
              <b className="text-center lg:text-left">{firma}</b>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
