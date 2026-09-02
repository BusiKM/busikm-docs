import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PierscienieCzasu } from '@/components/mockups/PierscienieCzasu';

/**
 * Nagłówek strony — ciemny. Nagłówek jest o kilka pikseli mniejszy niż na
 * pozostałych podstronach, bo przy 88 px pierwsza linia by się łamała.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow dark>Czas pracy i przerwy</Eyebrow>
        <h1
          data-reveal
          className="text-display-m font-bold text-balance lg:text-[76px] lg:leading-[1.05] lg:tracking-[-0.03em]"
        >
          Wiesz, kiedy kierowca musi stanąć. <br className="hidden lg:inline" />
          Zanim stanie za późno.
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
        >
          Jazda, przerwy i odpoczynki liczą się same. Kierowca widzi to na telefonie,
          Ty na jednym ekranie.
        </p>
      </Container>

      <Container className="relative mt-16 flex flex-col items-center gap-6 pb-24 lg:mt-24 lg:pb-40">
        <div data-reveal className="relative w-full lg:max-w-[760px]">
          <div
            aria-hidden
            className="absolute right-[10%] bottom-10 left-[10%] h-30 bg-blue opacity-30 blur-[70px] lg:h-45 lg:blur-[110px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-czas-pracy-pierscienie-desktop.png"
              label="Czas pracy · desktop, tryb nocny"
              note="Trzy pierścienie postępu (jazda, przerwa, odpoczynek) i lista kierowców ze statusem. Ten sam ekran co na stronie głównej."
              ratio="4:3"
              dark
              noteClassName="mx-auto max-w-[600px]"
            >
              <PierscienieCzasu />
            </MockupSlot>
          </div>
        </div>
      </Container>
    </section>
  );
}
