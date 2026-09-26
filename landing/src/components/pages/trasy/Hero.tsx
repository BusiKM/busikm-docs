import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { MapaFloty } from '@/components/mockups/MapaFloty';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek1: string;
  naglowek2: string;
  lead: string;
  label: string;
  note: string;
}> = {
  pl: {
    eyebrow: 'Trasy i mapa floty',
    naglowek1: 'Widzisz, gdzie jest każdy bus.',
    naglowek2: 'Bez dzwonienia.',
    lead: 'Klient pyta o ładunek — odpowiadasz w pięć sekund, patrząc na jeden ekran.',
    label: 'Mapa floty · desktop 1440',
    note: 'Mapa Europy z trasami i dymkiem nad pojazdem: kierowca, zlecenie, godzina dojazdu. Ten sam ekran co na stronie głównej.',
  },
  en: {
    eyebrow: 'Routes and fleet map',
    naglowek1: 'You see where every van is.',
    naglowek2: 'Without picking up the phone.',
    lead: 'A client asks about their load — you answer in five seconds, looking at one screen.',
    label: 'Fleet map · desktop 1440',
    note: 'A map of Europe with routes and a bubble over the vehicle: driver, order, arrival time. The same screen as on the home page.',
  },
};

/** Nagłówek strony — jasny, na siatce południków, z jedną trasą na ukos. */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.045)_1px,transparent_1px)] bg-size-[100px_100px] lg:bg-size-[160px_160px]"
      />
      {/* Trasa przecinająca sekcję na ukos. Wysokość ograniczona, żeby krzywa
          nie rozciągnęła się na całą — bardzo wysoką — sekcję. */}
      <svg
        viewBox="0 0 1440 1400"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] w-full lg:h-[1400px]"
        aria-hidden
      >
        <path
          d="M -50 1350 C 300 1050, 500 950, 760 620 S 1100 260, 1500 60"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="36"
          opacity=".045"
        />
        <path
          d="M -50 1350 C 300 1050, 500 950, 760 620 S 1100 260, 1500 60"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".2"
        />
      </svg>

      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow>{t.eyebrow}</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          {t.naglowek1} <br className="hidden lg:inline" />
          {t.naglowek2}
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          {t.lead}
        </p>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div
          aria-hidden
          className="absolute right-[10%] bottom-40 left-[10%] h-30 rounded-[50%] bg-blue opacity-25 blur-[70px] lg:bottom-50 lg:h-50 lg:blur-[120px]"
        />
        <div data-reveal className="relative">
          <MockupSlot
            file="mockup-mapa-flota-desktop.png"
            label={t.label}
            note={t.note}
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <MapaFloty />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
