import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TelefonyKierowcy } from '@/components/mockups/TelefonyKierowcy';
import { appLinks } from '@/content/navigation';

/**
 * Nagłówek strony kierowcy — ciemny i większy niż na pozostałych stronach ról:
 * 96 px zamiast 88, bo to jedyna strona pisana do kierowcy i typografia jest
 * tu częścią przekazu. Telefony stoją pod spodem, na pełną szerokość.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:gap-8">
        <Eyebrow dark>Dla kierowcy</Eyebrow>
        <h1
          data-reveal
          className="text-[46px] leading-[1.02] font-bold tracking-[-0.03em] text-balance lg:text-[96px] lg:leading-[1.05]"
        >
          Rusz. <br />
          Resztą zajmuje się telefon.
        </h1>
        <p data-reveal className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead">
          Jedna aplikacja na cały dzień. Nawigacja w środku, paragon zdjęciem, przerwa
          z wyprzedzeniem.
        </p>
        <div data-reveal className="mt-2 flex flex-col gap-2.5 lg:flex-row lg:gap-3">
          <Button href={appLinks.trial} fullWidth className="lg:w-auto">
            Wypróbuj 14 dni
          </Button>
          <Button href={appLinks.demo} variant="secondaryDark" fullWidth className="lg:w-auto">
            Zobacz demo
          </Button>
        </div>
      </Container>

      <Container className="relative mt-14 flex flex-col items-center pb-24 lg:mt-20 lg:pb-40">
        <div data-reveal className="relative w-full lg:max-w-[820px]">
          <MockupSlot
            file="mockup-kierowca-telefony-phone.png"
            label="Dwa telefony pod kątem · tryb nocny"
            note="Lewy (−8°): nawigacja. Prawy (+5°, z przodu): „Rozpocznij trasę”. Poświata i kąty zostają po podmianie."
            ratio="2 × 9:19.5"
            box="16:10"
            imageScale={1.35}
            dark
            noteClassName="mx-auto max-w-[600px]"
          >
            <TelefonyKierowcy />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
