import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const klasyMiesiecy = [
  'bg-mist text-muted',
  'bg-mist text-muted',
  'bg-ink font-semibold text-paper',
  'border border-dashed border-line text-muted',
] as const;

type Teksty = {
  miesiac: { tytul: string; tresc: string; miesiace: readonly string[]; przycisk: string };
  format: {
    tytul: string;
    tresc: string;
    formaty: readonly (readonly [string, string, boolean])[];
  };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    miesiac: {
      tytul: 'Wybiera miesiąc i klika raz',
      tresc: 'Dostaje wszystko za ten okres w jednym pliku ZIP. Przed zamknięciem miesiąca – wersję roboczą, po zamknięciu – ostateczną, z JPK_V7M.',
      miesiace: ['czerwiec', 'lipiec', 'sierpień', 'wrzesień'],
      przycisk: 'Pobierz paczkę dla biura',
    },
    format: {
      tytul: 'W formacie jej programu',
      tresc: 'Comarch Optima, Insert GT albo Symfonia. Rejestry VAT i płace także w Excelu.',
      formaty: [
        ['Comarch Optima', 'XML · wybrany', true],
        ['Insert GT', 'EPP', false],
        ['Symfonia', 'TXT + AMS', false],
        ['Excel', 'rejestry VAT, płace i diety', false],
      ],
    },
  },
  en: {
    miesiac: {
      tytul: 'Pick a month, click once',
      tresc: 'Everything for that period arrives in one ZIP file. Before the month is closed – a draft version; after closing – the final one, with JPK_V7M.',
      miesiace: ['June', 'July', 'August', 'September'],
      przycisk: 'Download the package for the office',
    },
    format: {
      tytul: 'In the format of their software',
      tresc: 'Comarch Optima, Insert GT or Symfonia (the accounting programs most Polish firms use). VAT registers and payroll in Excel too.',
      formaty: [
        ['Comarch Optima', 'XML · selected', true],
        ['Insert GT', 'EPP', false],
        ['Symfonia', 'TXT + AMS', false],
        ['Excel', 'VAT registers, payroll and allowances', false],
      ],
    },
  },
};

/** 01 i 02 – dwie karty obok siebie. */
export function MiesiacIFormat() {
  const t = TEKSTY[biezacyJezyk()];
  const { formaty } = t.format;
  return (
    <Section>
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          numer="01"
          tytul={t.miesiac.tytul}
          tresc={t.miesiac.tresc}
        >
          <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-caption">
            <div className="flex flex-wrap gap-2">
              {t.miesiac.miesiace.map((nazwa, i) => (
                <span key={nazwa} className={`rounded-full px-3.5 py-2 ${klasyMiesiecy[i]}`}>
                  {nazwa}
                </span>
              ))}
            </div>
            <div className="rounded-xl bg-blue p-3.5 text-center font-semibold text-white">
              {t.miesiac.przycisk}
            </div>
          </div>
        </KartaBloku>

        <KartaBloku
          numer="02"
          tytul={t.format.tytul}
          tresc={t.format.tresc}
        >
          <div className="flex flex-col rounded-card border border-line bg-white p-6 text-[14px] lg:text-[15px]">
            {formaty.map(([nazwa, opis, wybrany], i) => (
              <div
                key={nazwa}
                className={`flex justify-between gap-3 py-3 ${
                  i < formaty.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                {wybrany ? <b>{nazwa}</b> : <span>{nazwa}</span>}
                <span
                  className={
                    wybrany ? 'flex-none font-semibold text-blue' : 'flex-none text-muted'
                  }
                >
                  {opis}
                </span>
              </div>
            ))}
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
