import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DokumentyMockup } from '@/components/mockups/DokumentyMockup';

/** 6.13 — dokumenty i terminy. Jedyne miejsce na stronie z kolorem amber. */
export function DokumentyITerminy() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Nic nie wygaśnie po cichu.
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Ubezpieczenie, przegląd, licencja, prawo jazdy, badania kierowców. System pilnuje dat
            i mówi wcześniej — Tobie i kierowcy.
          </p>
          <Bullets
            items={[
              'Wszystko w jednym miejscu — pojazdy, firma, kierowcy',
              'Przypomnienie na długo przed terminem, Tobie i kierowcy',
              'Jeden ekran pokazuje, co wymaga uwagi w tym miesiącu',
            ]}
          />
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dokumenty-terminy-desktop.png"
            label="Dokumenty i terminy · desktop"
            note="Lista dokumentów posortowana po dniach do końca ważności, paski w trzech kolorach. Amber tylko tu."
            ratio="4:3"
          >
            <DokumentyMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
