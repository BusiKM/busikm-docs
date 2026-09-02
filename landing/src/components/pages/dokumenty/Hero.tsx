import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DokumentyMockup } from '@/components/mockups/DokumentyMockup';

/** Nagłówek strony — jasny, spokojny. Bez odliczania i bez straszenia. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow>Dokumenty i terminy</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          Nic nie wygaśnie po cichu.
        </h1>
        <p
          data-reveal
          className="max-w-[680px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          Ubezpieczenie, przegląd, licencja, prawo jazdy, badania. System pilnuje dat
          i mówi wcześniej — Tobie i kierowcy.
        </p>
      </Container>

      <Container className="relative mt-16 flex flex-col items-center pb-24 lg:mt-24 lg:pb-40">
        <div data-reveal className="relative w-full lg:max-w-[760px]">
          <div
            aria-hidden
            className="absolute right-[10%] bottom-10 left-[10%] h-30 bg-blue opacity-20 blur-[70px] lg:h-45 lg:blur-[110px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-dokumenty-terminy-desktop.png"
              label="Dokumenty i terminy · desktop"
              note="Lista dokumentów posortowana po dniach do końca ważności, paski w trzech kolorach, jeden wiersz w kolorze ostrzegawczym. Ten sam ekran co na stronie głównej."
              ratio="4:3"
              noteClassName="mx-auto max-w-[600px]"
            >
              <DokumentyMockup />
            </MockupSlot>
          </div>
        </div>
      </Container>
    </section>
  );
}
