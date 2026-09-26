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
        label: 'Centrum eksportów · desktop, tryb nocny',
        note: 'Lista dziewięciu zestawień z licznikami, przycisk „Pobierz komplet” i wybór formatu.',
        caption: 'Centrum eksportów',
      },
      {
        label: 'Walidacja przed eksportem · desktop',
        note: 'Lista zestawień ze statusem komplet / do uzupełnienia i krótkim opisem braku.',
        caption: 'Sprawdzenie przed eksportem',
      },
      {
        label: 'Rozliczenie kierowcy z dietami · desktop',
        note: 'Dni za granicą, diety, do wypłaty; tabela krajów ze stawkami.',
        caption: 'Rozliczenie kierowców',
      },
    ],
  },
  en: {
    naglowek: 'Three screens you see every month.',
    opisy: [
      {
        label: 'Export centre · desktop, dark mode',
        note: 'A list of nine reports with counters, a “Download all” button and a choice of format.',
        caption: 'Export centre',
      },
      {
        label: 'Pre-export check · desktop',
        note: 'Reports marked complete / needs attention, with a short note on what’s missing.',
        caption: 'Check before export',
      },
      {
        label: 'Driver settlement with allowances · desktop',
        note: 'Days abroad, daily allowances, amount to pay; a table of countries with their rates.',
        caption: 'Driver settlements',
      },
    ],
  },
};

/**
 * Trzy ekrany księgowej — wszystkie narysowane przy podstronie „Dane dla
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
