import { Section, Eyebrow } from '@/components/ui/Section';

/** 01 — trzy kolumny jednego ekranu, każda jako osobna karta. */
export function JedenEkran() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Jeden ekran zamiast czterech okien
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            Po lewej zlecenia, w środku mapa, po prawej kierowca. Wszystko widać naraz.
          </p>
        </div>

        <div
          data-reveal-group
          className="grid gap-2.5 lg:grid-cols-[1fr_1.4fr_1fr] lg:gap-4"
        >
          {[
            ['Po lewej', 'Zlecenia', false],
            ['W środku', 'Mapa', true],
            ['Po prawej', 'Kierowca', false],
          ].map(([gdzie, co, zMapa]) => (
            <div
              key={co as string}
              data-reveal
              className="relative flex min-h-35 flex-col justify-between gap-6 overflow-hidden rounded-card border border-line-dark bg-surface p-6 lg:min-h-50 lg:p-8"
            >
              {zMapa && (
                <svg
                  viewBox="0 0 300 200"
                  preserveAspectRatio="none"
                  className="absolute inset-0 size-full opacity-50"
                  aria-hidden
                >
                  <path
                    d="M 260 30 C 200 70, 160 110, 120 140 S 60 180, 30 190"
                    fill="none"
                    stroke="#0B5FFF"
                    strokeWidth="3"
                  />
                </svg>
              )}
              <Eyebrow dark className="relative">
                {gdzie}
              </Eyebrow>
              <div className="relative text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
                {co}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
