import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ListaKosztow } from '@/components/mockups/koszty/ListaKosztow';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ tytul: string; tresc: string; label: string; note: string }> = {
  pl: {
    tytul: 'Zdjęcie zostaje dowodem',
    tresc: 'Nikt nie szuka papierka po trzech miesiącach. Zdjęcie leży przy koszcie.',
    label: 'Lista kosztów miesiąca · desktop 1440',
    note: 'Koszty z kategoriami, pojazdami i miniaturami zdjęć; filtry u góry.',
  },
  en: {
    tytul: 'The photo is your proof',
    tresc: 'Nobody hunts for a slip of paper three months later. The photo sits with the cost.',
    label: 'Monthly cost list · desktop 1440',
    note: 'Costs with categories, vehicles and photo thumbnails; filters at the top.',
  },
};

/** 05 — lista kosztów miesiąca na pełną szerokość, z miniaturą przy każdym wierszu. */
export function Dowod() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              05
            </div>
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.tytul}
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-koszty-lista-desktop.png"
            label={t.label}
            note={t.note}
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <ListaKosztow />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
