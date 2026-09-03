import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { MapaFloty } from '@/components/mockups/MapaFloty';

/** 6.9 — mapa floty. Tło sekcji: siatka i jedna trasa na ukos. */
export function MapaITrasa() {
  return (
    <Section>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.045)_1px,transparent_1px)] bg-size-[90px_90px] lg:bg-size-[160px_160px]"
      />
      <svg
        viewBox="0 0 1440 1300"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <path
          d="M -50 1250 C 300 1000, 500 900, 760 600 S 1100 250, 1500 50"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="36"
          opacity=".045"
        />
        <path
          d="M -50 1250 C 300 1000, 500 900, 760 600 S 1100 250, 1500 50"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".2"
        />
      </svg>

      <div className="flex flex-col gap-8 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Klient pyta, gdzie jest ładunek. <br className="hidden lg:inline" />
            Odpowiadasz w pięć sekund.
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Każdy bus na mapie, na żywo. Klikasz — widzisz kierowcę, zlecenie i o której będzie
            na miejscu.
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-mapa-flota-desktop.png"
            label="Mapa floty · desktop 1440"
            note="Mapa Europy z linią trasy i trzema znacznikami pojazdów, jeden dymek z numerem rejestracyjnym, kierowcą i godziną dojazdu."
            ratio="16:10"
            noteClassName="bg-paper/80 lg:mx-auto lg:max-w-[600px]"
          >
            <MapaFloty />
          </MockupSlot>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h3 data-reveal className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">
            Trasa układa się sama.
          </h3>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            System proponuje przejazd i bierze pod uwagę, co się dzieje na drodze. Coś się zmienia
            w trakcie — poprawiasz trasę u siebie, a kierowca ma nową wersję w telefonie w tej samej
            chwili.
          </p>
        </div>
      </div>
    </Section>
  );
}
