import { Section } from '@/components/ui/Section';

const dokumenty = [
  ['Prawo jazdy · C1', '3 lata', false],
  ['Badania lekarskie', '41 dni', false],
  ['Badania psychologiczne', '41 dni', false],
  ['Kod 95', '2 lata', true],
] as const;

/** 07 i 08 — dwie karty obok siebie. */
export function TrasaIDokumenty() {
  return (
    <Section>
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <div
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-panel bg-mist p-7 lg:gap-10 lg:p-14"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
              07
            </div>
            <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
              Trasa poza zleceniem
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              Dojazd do bazy, przejazd do serwisu też się liczy. Start, stop, potwierdzenie.
            </p>
          </div>

          <div className="flex flex-col gap-3.5 rounded-card bg-ink p-6 text-caption text-paper">
            <div className="flex justify-between text-ink-muted">
              <span>Przejazd bez zlecenia</span>
              <span>16:40</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>Mediolan → serwis, Bergamo</span>
              <b>48 km</b>
            </div>
            <div className="flex gap-2.5">
              <span className="flex-1 rounded-xl bg-surface-2 py-3.5 text-center">Start</span>
              <span className="flex-1 rounded-xl bg-surface-2 py-3.5 text-center">Stop</span>
              <span className="flex-1 rounded-xl bg-blue py-3.5 text-center font-semibold text-white">
                Potwierdź
              </span>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-panel bg-mist p-7 lg:gap-10 lg:p-14"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
              08
            </div>
            <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
              Jego dokumenty w telefonie
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              Prawo jazdy, badania, uprawnienia. Aplikacja przypomina o terminach jemu i Tobie.
            </p>
          </div>

          <div className="flex flex-col rounded-card bg-ink p-6 text-caption text-paper">
            {dokumenty.map(([name, left, good], i) => (
              <div
                key={name}
                className={`flex justify-between gap-3 py-3 ${
                  i < dokumenty.length - 1 ? 'border-b border-line-dark' : ''
                }`}
              >
                <span>{name}</span>
                <span className={good ? 'text-green' : 'text-ink-muted'}>{left}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
