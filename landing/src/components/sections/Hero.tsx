import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { appLinks } from '@/content/navigation';

/** 6.1 — hero. Siatka i jedna świecąca trasa w tle, pulpit uniesiony nad stroną. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
      />
      {/* Trasa w tle. Wysokość ograniczona, żeby krzywa nie rozciągnęła się
          na całą — bardzo wysoką — sekcję i nie wyprostowała w linię. */}
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] w-full lg:h-[1200px]"
        aria-hidden
      >
        <path
          d="M 220 980 C 520 720, 760 760, 940 480 S 1180 300, 1320 120"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="14"
          opacity=".05"
        />
        <path
          d="M 220 980 C 520 720, 760 760, 940 480 S 1180 300, 1320 120"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".18"
        />
        <circle cx="220" cy="980" r="5" fill="#0B5FFF" opacity=".35" />
        <circle cx="1320" cy="120" r="5" fill="#0B5FFF" opacity=".35" />
      </svg>

      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow data-reveal>Busy 2,5–3,5 t · Transport krajowy i międzynarodowy</Eyebrow>

        <h1
          data-reveal
          className="max-w-[980px] text-display-m font-bold text-balance lg:text-display"
        >
          Kierowca jedzie. <br className="hidden lg:inline" />
          Reszta dzieje się sama.
        </h1>

        <p
          data-reveal
          className="max-w-[700px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          Zlecenia, trasy, koszty, faktury i komplet dla księgowej — w jednym miejscu.
          Kierowca ma telefon w kieszeni, Ty masz robotę zrobioną.
        </p>

        <div data-reveal className="flex flex-col gap-2.5 lg:mt-2 lg:items-center lg:gap-4">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-3">
            <Button href={appLinks.trial} fullWidth className="lg:w-auto">
              Wypróbuj 14 dni
            </Button>
            <Button href={appLinks.demo} variant="secondary" fullWidth className="lg:w-auto">
              Zobacz demo
            </Button>
          </div>
          <p className="text-center text-[13px] text-muted lg:text-caption">
            Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.
          </p>
        </div>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div
          aria-hidden
          className="absolute right-[10%] bottom-35 left-[10%] h-30 rounded-[50%] bg-blue opacity-30 blur-[70px] lg:bottom-50 lg:h-50 lg:opacity-28 lg:blur-[120px]"
        />
        <div data-reveal className="relative">
          <MockupSlot
            file="mockup-hero-pulpit-desktop.png"
            label="Ekran właściciela · desktop 1440"
            note="Pulpit po zalogowaniu: trzy liczby u góry (przychód, koszty, zysk), mapa z trasą Warszawa → Mediolan, lista trzech zleceń ze statusami."
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <PulpitMockup />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
