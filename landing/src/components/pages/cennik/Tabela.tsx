import { Section } from '@/components/ui/Section';

const parametry = [
  ['Pojazdy', 'do 3', 'do 10, każdy kolejny +29 zł'],
  ['Kierowcy', 'bez limitu', 'bez limitu'],
  ['Pracownicy biura', 'bez limitu', 'bez limitu'],
] as const;

/** Sześć pierwszych pozycji jest w obu planach, cztery ostatnie tylko w Firmie. */
const funkcje = [
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
] as const;

const ceny = [
  ['Miesięcznie', '149 zł', '299 zł'],
  ['Rocznie', '1 490 zł', '2 990 zł'],
] as const;

const wiersz = 'grid grid-cols-[1fr_64px_64px] items-center gap-3 lg:grid-cols-[1fr_200px_200px]';

/** Tabela porównawcza — ma się czytać jak tabela, bez ozdobników. */
export function Tabela() {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-14">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Co jest w którym planie.
        </h2>

        <div data-reveal className="text-[14px] lg:text-body">
          <div
            className={`${wiersz} border-b border-line pb-4 text-[15px] font-semibold lg:text-[19px]`}
          >
            <span />
            <span className="text-center lg:text-left">Start</span>
            <span className="text-center lg:text-left">Firma</span>
          </div>

          {parametry.map(([nazwa, start, firma]) => (
            <div key={nazwa} className={`${wiersz} border-b border-line py-3.5 lg:py-4`}>
              <span className="font-medium">{nazwa}</span>
              <span className="text-center text-muted lg:text-left">{start}</span>
              <span className="text-center text-muted lg:text-left">{firma}</span>
            </div>
          ))}

          {funkcje.map(([nazwa, wStart]) => (
            <div key={nazwa} className={`${wiersz} border-b border-line py-3.5 lg:py-4`}>
              <span className="font-medium">{nazwa}</span>
              <span className={`text-center lg:text-left ${wStart ? 'text-blue' : 'text-muted'}`}>
                {wStart ? '✓' : '—'}
              </span>
              <span className="text-center text-blue lg:text-left">✓</span>
            </div>
          ))}

          {ceny.map(([nazwa, start, firma], i) => (
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
