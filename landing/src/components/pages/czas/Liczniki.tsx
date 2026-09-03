import { Section } from '@/components/ui/Section';

const liczniki = [
  { label: 'Jazda', value: '6:07', udzial: 68, kolor: 'bg-blue', opis: 'z 9:00 limitu dziennego' },
  { label: 'Przerwa', value: '0:40', udzial: 85, kolor: 'bg-ink', opis: 'do następnej przerwy' },
  { label: 'Odpoczynek', value: '11:00', udzial: 100, kolor: 'bg-green', opis: 'wykonany w nocy' },
  { label: 'Dyspozycyjność', value: '1:15', udzial: 30, kolor: 'bg-[#9A9AA2]', opis: 'załadunek i oczekiwanie' },
] as const;

/** 01 — cztery liczniki, które chodzą same. */
export function Liczniki() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Liczniki idą same
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-muted lg:text-lead">
            Jazda, przerwa, odpoczynek, dyspozycyjność. Nikt nic nie zapisuje w zeszycie.
          </p>
        </div>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {liczniki.map((l) => (
            <div
              key={l.label}
              data-reveal
              className="flex flex-col gap-3 rounded-card border border-line bg-white p-5 shadow-card lg:p-8"
            >
              <div className="text-[13px] text-muted lg:text-caption">{l.label}</div>
              <div className="text-[30px] font-semibold tracking-[-0.03em] lg:text-[40px]">
                {l.value}
              </div>
              <div className="h-1.5 overflow-hidden rounded-[3px] bg-mist" aria-hidden>
                <div className={`h-full ${l.kolor}`} style={{ width: `${l.udzial}%` }} />
              </div>
              <div className="text-[12px] text-muted lg:text-[13px]">{l.opis}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
