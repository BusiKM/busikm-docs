import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ListaKosztow } from '@/components/mockups/koszty/ListaKosztow';

/** 05 — lista kosztów miesiąca na pełną szerokość, z miniaturą przy każdym wierszu. */
export function Dowod() {
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
              Zdjęcie zostaje dowodem
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Nikt nie szuka papierka po trzech miesiącach. Zdjęcie leży przy koszcie.
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-koszty-lista-desktop.png"
            label="Lista kosztów miesiąca · desktop 1440"
            note="Koszty z kategoriami, pojazdami i miniaturami zdjęć; filtry u góry."
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
