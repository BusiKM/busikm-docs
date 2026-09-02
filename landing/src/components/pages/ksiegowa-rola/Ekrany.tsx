import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { CentrumEksportow } from '@/components/mockups/ksiegowa/CentrumEksportow';
import { Walidacja } from '@/components/mockups/ksiegowa/Walidacja';
import { RozliczenieKierowcy } from '@/components/mockups/ksiegowa/RozliczenieKierowcy';

const ekrany = [
  {
    file: 'mockup-ksiegowa-eksport-desktop.png',
    label: 'Centrum eksportów · desktop, tryb nocny',
    note: 'Lista dziewięciu zestawień z licznikami, przycisk „Pobierz komplet” i wybór formatu.',
    caption: 'Centrum eksportów',
    makieta: <CentrumEksportow />,
  },
  {
    file: 'mockup-ksiegowa-walidacja-desktop.png',
    label: 'Walidacja przed eksportem · desktop',
    note: 'Lista zestawień ze statusem komplet / do uzupełnienia i krótkim opisem braku.',
    caption: 'Sprawdzenie przed eksportem',
    makieta: <Walidacja />,
  },
  {
    file: 'mockup-ksiegowa-diety-desktop.png',
    label: 'Rozliczenie kierowcy z dietami · desktop',
    note: 'Dni za granicą, diety, do wypłaty; tabela krajów ze stawkami.',
    caption: 'Rozliczenie kierowców',
    makieta: <RozliczenieKierowcy />,
  },
];

/**
 * Trzy ekrany księgowej — wszystkie narysowane przy podstronie „Dane dla
 * księgowej", więc nazwy plików są dokładnie te same. Trzy w rzędzie, bo każdy
 * jest kwadratowy i żaden nie jest ważniejszy od pozostałych.
 */
export function Ekrany() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Trzy ekrany, które widzisz co miesiąc.
        </h2>

        <div data-reveal-group className="grid gap-8 lg:grid-cols-3 lg:gap-6">
          {ekrany.map((e) => (
            <div key={e.file} data-reveal>
              <MockupSlot
                file={e.file}
                label={e.label}
                note={e.note}
                ratio="4:3"
                caption={e.caption}
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
