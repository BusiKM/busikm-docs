import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PodgladTrasy } from '@/components/mockups/dyspozytornia/PodgladTrasy';

const bloki = [
  [
    '04',
    'Trasa układa się sama',
    'System proponuje przejazd i bierze pod uwagę, co dzieje się na drodze.',
  ],
  [
    '05',
    'Zmiana w trakcie jazdy',
    'Klient przesuwa rozładunek, na trasie robi się korek — poprawiasz u siebie, kierowca ma nową wersję od razu.',
  ],
] as const;

/** 04 i 05 — dwa bloki tekstu obok jednej makiety trasy. */
export function TrasaIZmiana() {
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
          {bloki.map(([numer, tytul, tresc], i) => (
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
            label="Podgląd trasy z korkiem · desktop"
            note="Stara trasa kreskowana, nowa niebieska, znacznik korka, dymek z nową godziną dojazdu."
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
