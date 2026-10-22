import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PodgladTrasy } from '@/components/mockups/dyspozytornia/PodgladTrasy';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  bloki: readonly (readonly [string, string, string])[];
  label: string;
  note: string;
}> = {
  pl: {
    bloki: [
      [
        '04',
        'Trasa układa się sama',
        'Wpisujesz punkty – system ustawia kolejność postojów, liczy kilometry i czas. Godzina dojazdu odświeża się z pozycji auta.',
      ],
      [
        '05',
        'Zmiana trasy',
        'Klient przesuwa rozładunek albo nie chcesz płatnych dróg – klikasz „Zmień trasę” i wybierasz wariant: najszybszy albo bez płatnych dróg. Nową trasę widzi kierowca w aplikacji, a klient na stronie śledzenia widzi nową godzinę dojazdu.',
      ],
    ],
    label: 'Trasa i śledzenie · desktop',
    note: 'Zlecenie Olsztyn → München, zakładka Trasa i śledzenie: ostrzeżenie o spóźnieniu, trasa najszybsza 1167 km z przyciskiem „Zmień trasę”, auto na mapie, czas dojazdu i przebieg kursu.',
  },
  en: {
    bloki: [
      [
        '04',
        'The route plans itself',
        'You enter the stops – the system puts them in order and works out the kilometres and time. The arrival time updates from the van’s position.',
      ],
      [
        '05',
        'Changing the route',
        'The client moves the unloading, or you’d rather skip toll roads – you click “Change route” and pick an option: fastest or no toll roads. The driver sees the new route in the app, and the client sees the new arrival time on the tracking page.',
      ],
    ],
    label: 'Route and tracking · desktop',
    note: 'Order Olsztyn → München, Route and tracking tab: a late-arrival warning, the fastest route of 1,167 km with a “Change route” button, the van on the map, arrival time and the run’s timeline.',
  },
};

/** 04 i 05 – dwa bloki tekstu obok jednej makiety trasy. */
export function TrasaIZmiana() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.045)_1px,transparent_1px)] bg-size-[90px_90px] lg:bg-size-[160px_160px]"
      />
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <path
          d="M -50 1150 C 300 900, 500 800, 760 500 S 1100 200, 1500 40"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="36"
          opacity=".045"
        />
        <path
          d="M -50 1150 C 300 900, 500 800, 760 500 S 1100 200, 1500 40"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".2"
        />
      </svg>

      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-8 lg:gap-14">
          {t.bloki.map(([numer, tytul, tresc], i) => (
            <div
              key={numer}
              data-reveal
              className={`flex flex-col gap-4 lg:gap-6 ${
                i > 0 ? 'border-t border-line pt-8 lg:pt-10' : ''
              }`}
            >
              <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
                {numer}
              </div>
              <h2 className="text-h2-m font-semibold text-balance lg:text-h2">{tytul}</h2>
              <p className="text-[16px] leading-relaxed text-muted lg:text-body">{tresc}</p>
            </div>
          ))}
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dyspozytornia-trasa-desktop.png"
            label={t.label}
            note={t.note}
            ratio="4:3"
            noteClassName="bg-paper/80"
          >
            <PodgladTrasy />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
