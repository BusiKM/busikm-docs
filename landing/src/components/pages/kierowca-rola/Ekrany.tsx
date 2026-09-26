import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EkranZlecenia } from '@/components/mockups/kierowca/EkranZlecenia';
import { EkranNawigacja } from '@/components/mockups/kierowca/EkranNawigacja';
import { EkranKoszt } from '@/components/mockups/kierowca/EkranKoszt';
import { EkranCzas } from '@/components/mockups/kierowca/EkranCzas';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Powiększenie zrzutów w tym rzędzie.
 *
 * Wszystkie cztery pliki mają ten sam kształt: kadr 4:3, a w nim telefon
 * zajmujący 30% szerokości. Kafle są wąskie — przy pudle 152 px telefon
 * wychodzi bez powiększenia szeroki na 46 px i nie widać z niego nic.
 * Trójka daje mu 137 px, czyli prawie całą szerokość kafla.
 *
 * Wartość wspólna, nie wpisywana przy każdym ekranie: pliki są jednakowe,
 * więc skala przy jednym z czterech znaczyła wyłącznie tyle, że o pozostałych
 * zapomniano — i tak właśnie było.
 */
const POWIEKSZENIE = 3;

const ekrany: { file: string; makieta: React.ReactNode }[] = [
  { file: 'mockup-kierowca-zlecenia-phone.png', makieta: <EkranZlecenia /> },
  { file: 'mockup-kierowca-nawigacja-phone.png', makieta: <EkranNawigacja /> },
  { file: 'mockup-kierowca-koszt-phone.png', makieta: <EkranKoszt /> },
  { file: 'mockup-kierowca-czas-phone.png', makieta: <EkranCzas /> },
];

type Opis = { label: string; note: string; caption: string };

/** Opisy w kolejności `ekrany`. */
const TEKSTY: Tlumaczenia<{ naglowek: string; opisy: [Opis, Opis, Opis, Opis] }> = {
  pl: {
    naglowek: 'Cztery ekrany. Cały dzień.',
    opisy: [
      {
        label: 'Lista zleceń dnia · telefon, tryb nocny',
        note: 'Zlecenia dnia ze statusami, godzina i miejsce załadunku.',
        caption: 'Zlecenia dnia',
      },
      {
        label: 'Nawigacja · telefon, tryb nocny',
        note: 'Trasa z kartą zlecenia u dołu, godzina dojazdu.',
        caption: 'Nawigacja',
      },
      {
        label: 'Dodawanie kosztu · telefon, tryb nocny',
        note: 'Zdjęcie paragonu i pola rozpoznane automatycznie.',
        caption: 'Paragon',
      },
      {
        label: 'Czas pracy · telefon, tryb nocny',
        note: 'Przypomnienie o przerwie u góry, pierścień jazdy, przycisk „Przerwa”.',
        caption: 'Przerwa',
      },
    ],
  },
  en: {
    naglowek: 'Four screens. The whole day.',
    opisy: [
      {
        label: 'Today’s orders · phone, dark mode',
        note: 'Today’s orders with their status, loading time and place.',
        caption: 'Today’s orders',
      },
      {
        label: 'Navigation · phone, dark mode',
        note: 'The route with the order card at the bottom and the arrival time.',
        caption: 'Navigation',
      },
      {
        label: 'Adding a cost · phone, dark mode',
        note: 'A photo of the receipt and fields filled in automatically.',
        caption: 'Receipt',
      },
      {
        label: 'Working time · phone, dark mode',
        note: 'Break reminder at the top, driving ring, “Break” button.',
        caption: 'Break',
      },
    ],
  },
};

/** Cztery telefony w rzędzie — cały dzień kierowcy na czterech ekranach. */
export function Ekrany() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-5">
          {ekrany.map((e, i) => (
            <div key={e.file} data-reveal>
              <MockupSlot
                file={e.file}
                label={t.opisy[i].label}
                note={t.opisy[i].note}
                ratio="9:19.5"
                box="9:19.5"
                imageScale={POWIEKSZENIE}
                // Telefon to 30% kadru, a kafle są wąskie — powiększenie
                // mieści się w nich również na telefonie.
                imageScaleTelefon={POWIEKSZENIE}
                dark
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
