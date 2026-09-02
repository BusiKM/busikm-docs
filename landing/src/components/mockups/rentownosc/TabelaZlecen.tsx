import { Chrome } from '@/components/mockups/Chrome';

type Zlecenie = {
  trasa: string;
  skrot: string;
  kto: string;
  fracht: string;
  koszty: string;
  zysk: string;
  marza: string;
  /** Marża sprzed przeliczenia — pokazana obok nowej. */
  poprzednia?: string;
  /** Powód przeliczenia; wiersz z notatką jest wyróżniony. */
  nota?: string;
  dobra?: boolean;
  minus?: boolean;
  /** Wiersz spoza pierwszej piątki — na telefonie lista byłaby za długa. */
  tylkoDesktop?: boolean;
};

const zlecenia: Zlecenie[] = [
  {
    trasa: 'Gdańsk → Hamburg',
    skrot: 'GDA → HAM',
    kto: 'Piotr K. · GD 7710R',
    fracht: '1 800 €',
    koszty: '− 1 062 €',
    zysk: '738 €',
    marza: '41%',
    dobra: true,
  },
  {
    trasa: 'Warszawa → Mediolan',
    skrot: 'WAW → MIL',
    kto: 'Marek W. · WZ 4821K',
    fracht: '3 900 €',
    koszty: '− 1 101 €',
    zysk: '2 799 €',
    marza: '36%',
    poprzednia: '← 38%',
    nota: 'paragon dodany 11:42 · OMV Brno',
    dobra: true,
  },
  {
    trasa: 'Wrocław → Drezno',
    skrot: 'WRO → DRS',
    kto: 'Ewa D. · SZ 3140P',
    fracht: '1 150 €',
    koszty: '− 771 €',
    zysk: '379 €',
    marza: '33%',
    dobra: true,
  },
  {
    trasa: 'Poznań → Rotterdam',
    skrot: 'POZ → RTM',
    kto: 'Tomasz L. · PO 2093J',
    fracht: '2 650 €',
    koszty: '− 1 855 €',
    zysk: '795 €',
    marza: '30%',
    dobra: true,
  },
  {
    trasa: 'Szczecin → Kopenhaga',
    skrot: 'SZZ → CPH',
    kto: 'Rafał B. · LU 8265T',
    fracht: '2 100 €',
    koszty: '− 1 512 €',
    zysk: '588 €',
    marza: '28%',
    tylkoDesktop: true,
  },
  {
    trasa: 'Lublin → Monachium',
    skrot: 'LUB → MUC',
    kto: 'Piotr K. · GD 7710R',
    fracht: '1 950 €',
    koszty: '− 1 482 €',
    zysk: '468 €',
    marza: '24%',
    tylkoDesktop: true,
  },
  {
    trasa: 'Katowice → Praga',
    skrot: 'KTW → PRG',
    kto: 'Tomasz L. · PO 2093J',
    fracht: '4 800 zł',
    koszty: '− 3 792 zł',
    zysk: '1 008 zł',
    marza: '21%',
    tylkoDesktop: true,
  },
  {
    trasa: 'Kraków → Wiedeń',
    skrot: 'KRK → VIE',
    kto: 'Anna R. · KR 5512M',
    fracht: '1 450 €',
    koszty: '− 1 189 €',
    zysk: '261 €',
    marza: '18%',
    tylkoDesktop: true,
  },
  {
    trasa: 'Łódź → Praga',
    skrot: 'ŁDZ → PRG',
    kto: 'Jan S. · KR 5512M',
    fracht: '4 200 zł',
    koszty: '− 4 410 zł',
    zysk: '− 210 zł',
    marza: '− 5%',
    minus: true,
  },
];

/** Kolumny szerokie tylko na desktopie — na telefonie zostaje trasa, zysk i marża. */
const kolumny =
  'grid grid-cols-[1fr_auto_54px] gap-3 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr_90px] lg:gap-4';

/**
 * Zlecenia posortowane po marży. Wyróżniony wiersz to ten, w którym marża
 * przeliczyła się po dodaniu paragonu — stąd „← 38%" obok nowej wartości.
 */
export function TabelaZlecen() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line-dark bg-surface shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-16/10 lg:rounded-panel">
      <Chrome dark label="Zlecenia · wrzesień · posortowane po marży" />

      <div className="flex flex-1 flex-col p-4 text-[12px] lg:p-10 lg:text-caption">
        <div
          className={`${kolumny} border-b border-line-dark py-2.5 text-[11px] text-ink-muted lg:text-[13px]`}
        >
          <span>Zlecenie</span>
          <span className="hidden lg:block">Kierowca · pojazd</span>
          <span className="hidden text-right lg:block">Fracht</span>
          <span className="hidden text-right lg:block">Koszty</span>
          <span className="text-right">Zysk</span>
          <span className="text-right">Marża ↓</span>
        </div>

        {zlecenia.map((z) => (
          <div
            key={z.trasa}
            className={`${kolumny} items-center border-b border-line-dark py-3 lg:py-4 ${
              z.nota ? '-mx-2.5 rounded-xl bg-surface-2 px-2.5 lg:-mx-4 lg:px-4' : ''
            } ${z.tylkoDesktop ? 'hidden lg:grid' : ''}`}
          >
            <div className="min-w-0">
              <b className="block truncate">
                <span className="lg:hidden">{z.skrot}</span>
                <span className="hidden lg:inline">{z.trasa}</span>
              </b>
              {z.nota && (
                <div className="hidden text-[12px] text-ink-muted lg:block">{z.nota}</div>
              )}
            </div>
            <span className="hidden truncate text-ink-muted lg:block">{z.kto}</span>
            <span className="hidden text-right lg:block">{z.fracht}</span>
            <span className="hidden text-right text-ink-muted lg:block">{z.koszty}</span>
            <span className="text-right">{z.zysk}</span>
            <b className={`text-right ${z.dobra ? 'text-green' : ''} ${z.minus ? 'text-ink-muted' : ''}`}>
              {z.marza}
              {z.poprzednia && (
                <span className="hidden text-[12px] font-normal text-ink-muted lg:inline">
                  {' '}
                  {z.poprzednia}
                </span>
              )}
            </b>
          </div>
        ))}

        <div className="mt-auto flex justify-between gap-4 pt-3 text-[11px] text-ink-muted lg:pt-0 lg:text-[13px]">
          <span className="hidden lg:block">
            Zlecenie na minusie widać od razu — bez czerwieni, po prostu na dole listy.
          </span>
          <span className="lg:hidden">Minus na dole listy</span>
          <span className="flex-none">razem: 62 480 zł</span>
        </div>
      </div>
    </div>
  );
}
