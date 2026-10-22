import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { MapaFloty } from '@/components/mockups/MapaFloty';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul1: string;
  tytul2: string;
  lead: string;
  label: string;
  opis: string;
  trasa: string;
  trasaOpis: string;
}> = {
  pl: {
    tytul1: 'Klient pyta, gdzie jest ładunek.',
    tytul2: 'Odpowiadasz w pięć sekund.',
    lead: 'Każdy bus na mapie, na żywo. Klikasz – widzisz kierowcę, zlecenie i o której będzie na miejscu.',
    label: 'Mapa floty · desktop 1440',
    opis: 'Dyspozytornia: mapa Europy ze znacznikami aut i filtrami „Wszystkie”, „W trasie”, „Wolne”, „Serwis”, obok kolejka kursów, nad nimi liczniki dnia.',
    trasa: 'Trasa układa się sama.',
    trasaOpis: 'Wpisujesz punkty – system ustawia kolejność postojów, liczy kilometry i czas. Godzina dojazdu odświeża się z pozycji auta. Coś się zmienia – wybierasz u siebie inny wariant trasy, a kierowca widzi go w aplikacji.',
  },
  en: {
    tytul1: 'A client asks where the load is.',
    tytul2: 'You answer in five seconds.',
    lead: 'Every van on the map, live. One click – you see the driver, the order and when they’ll get there.',
    label: 'Fleet map · desktop 1440',
    opis: 'Dispatch: a map of Europe with vehicle markers and “All”, “On the road”, “Free”, “Service” filters, the run queue alongside, the day’s counters above.',
    trasa: 'The route plans itself.',
    trasaOpis: 'You enter the stops – the system puts them in order and works out the kilometres and time. The arrival time updates from the van’s position. Something changes – you pick another route option at your end, and the driver sees it in the app.',
  },
};

/** 6.9 – mapa floty. Tło sekcji: siatka i jedna trasa na ukos. */
export function MapaITrasa() {
  const t = TEKSTY[biezacyJezyk()];
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
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.lead}
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-mapa-flota-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="16:10"
            noteClassName="bg-paper/80 lg:mx-auto lg:max-w-[600px]"
          >
            <MapaFloty />
          </MockupSlot>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:items-start lg:gap-16">
          <h3 data-reveal className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">
            {t.trasa}
          </h3>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.trasaOpis}
          </p>
        </div>
      </div>
    </Section>
  );
}
