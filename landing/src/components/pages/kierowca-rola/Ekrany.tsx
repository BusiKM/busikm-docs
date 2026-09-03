import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EkranZlecenia } from '@/components/mockups/kierowca/EkranZlecenia';
import { EkranNawigacja } from '@/components/mockups/kierowca/EkranNawigacja';
import { EkranKoszt } from '@/components/mockups/kierowca/EkranKoszt';
import { EkranCzas } from '@/components/mockups/kierowca/EkranCzas';

const ekrany: {
  file: string;
  label: string;
  note: string;
  caption: string;
  imageScale?: number;
  makieta: React.ReactNode;
}[] = [
  {
    file: 'mockup-kierowca-zlecenia-phone.png',
    label: 'Lista zleceń dnia · telefon, tryb nocny',
    note: 'Zlecenia dnia ze statusami, godzina i miejsce załadunku.',
    caption: 'Zlecenia dnia',
    makieta: <EkranZlecenia />,
  },
  {
    file: 'mockup-kierowca-nawigacja-phone.png',
    label: 'Nawigacja · telefon, tryb nocny',
    note: 'Trasa z kartą zlecenia u dołu, godzina dojazdu.',
    caption: 'Nawigacja',
    /* Zrzut jest w kadrze poziomym, telefon zajmuje w nim 30% szerokości. */
    imageScale: 3,
    makieta: <EkranNawigacja />,
  },
  {
    file: 'mockup-kierowca-koszt-phone.png',
    label: 'Dodawanie kosztu · telefon, tryb nocny',
    note: 'Zdjęcie paragonu i pola rozpoznane automatycznie.',
    caption: 'Paragon',
    makieta: <EkranKoszt />,
  },
  {
    file: 'mockup-kierowca-czas-phone.png',
    label: 'Czas pracy · telefon, tryb nocny',
    note: 'Przypomnienie o przerwie u góry, pierścień jazdy, przycisk „Przerwa”.',
    caption: 'Przerwa',
    makieta: <EkranCzas />,
  },
];

/** Cztery telefony w rzędzie — cały dzień kierowcy na czterech ekranach. */
export function Ekrany() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
          Cztery ekrany. Cały dzień.
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-5">
          {ekrany.map((e) => (
            <div key={e.file} data-reveal>
              <MockupSlot
                file={e.file}
                label={e.label}
                note={e.note}
                ratio="9:19.5"
                box="9:19.5"
                imageScale={e.imageScale}
                dark
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
