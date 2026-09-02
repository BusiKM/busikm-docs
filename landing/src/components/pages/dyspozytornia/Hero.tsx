import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DyspozytorniaMockup } from '@/components/mockups/DyspozytorniaMockup';

/** Nagłówek strony z pełnoekranowym pulpitem dyspozytora. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
      />

      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow>Dyspozytornia</Eyebrow>
        <h1
          data-reveal
          className="max-w-[980px] text-display-m font-bold text-balance lg:text-display"
        >
          Cały dzień pracy na jednym ekranie.
        </h1>
        <p data-reveal className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead">
          Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Bez przełączania zakładek.
        </p>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div
          aria-hidden
          className="absolute right-[10%] bottom-35 left-[10%] h-30 rounded-[50%] bg-blue opacity-25 blur-[70px] lg:bottom-50 lg:h-50 lg:blur-[120px]"
        />
        <div data-reveal className="relative">
          <MockupSlot
            file="mockup-dyspozytornia-ekran-desktop.png"
            label="Ekran dyspozytora · desktop 1440"
            note="Pełnoekranowy pulpit, trzy kolumny: lista zleceń ze statusami, mapa z trasami, panel kierowcy z rozmową."
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <DyspozytorniaMockup />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
