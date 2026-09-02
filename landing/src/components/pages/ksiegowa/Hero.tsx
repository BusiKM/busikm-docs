import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { CentrumEksportow } from '@/components/mockups/ksiegowa/CentrumEksportow';

/** Nagłówek strony — ciemny, ze stosem arkuszy. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow dark>Dane dla księgowej</Eyebrow>
        <h1
          data-reveal
          className="max-w-[980px] text-display-m font-bold text-balance lg:text-display"
        >
          Komplet dokumentów. <br className="hidden lg:inline" />
          Jednym przyciskiem.
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
        >
          Wybiera miesiąc, klika raz i ma wszystko — w formacie programu, którego już używa.
        </p>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div data-reveal>
          <MockupSlot
            file="mockup-ksiegowa-eksport-desktop.png"
            label="Centrum eksportów · desktop, tryb nocny"
            note="Lista dziewięciu zestawień z licznikami, u góry przycisk „Pobierz komplet za sierpień” i wybór formatu. Stos arkuszy w perspektywie zostaje."
            ratio="4:3"
            dark
            noteClassName="mx-auto max-w-[600px]"
          >
            <CentrumEksportow />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
