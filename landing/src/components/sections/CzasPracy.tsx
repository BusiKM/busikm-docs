import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PierscienieCzasu } from '@/components/mockups/PierscienieCzasu';

/** 6.10 — czas pracy. Na dole rozgraniczenie: tachograf zapisuje, BusiKM pokazuje. */
export function CzasPracy() {
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:gap-14">
          <div className="flex flex-col gap-5 lg:gap-6">
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              Wiesz, kiedy kierowca musi stanąć. <br className="hidden lg:inline" />
              Zanim stanie za późno.
            </h2>
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              Jazda, przerwy i odpoczynki liczą się same. Kierowca dostaje przypomnienie wcześniej,
              nie po fakcie. Ty widzisz to samo, ze swojego biura.
            </p>
            <Bullets
              dark
              items={[
                'Liczniki działają też bez zasięgu',
                'Miesięczna karta czasu pracy do wydruku',
                'Dni w każdym kraju liczone z trasy, nie z notatek',
              ]}
            />
          </div>

          <div
            data-reveal
            className="order-last flex flex-col gap-3 border-t border-line-dark pt-7 lg:order-none lg:gap-4 lg:pt-10"
          >
            <h3 className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">
              Tachograf zapisuje. BusiKM pokazuje.
            </h3>
            <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              Tachograf jest wymagany i robi swoje — rejestruje. BusiKM go nie zastępuje i nie
              udaje. Jest po to, żeby kierowca widział na ekranie, ile jeszcze może jechać i kiedy
              musi stanąć. Wcześniej, a nie po fakcie.
            </p>
          </div>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-czas-pracy-pierscienie-desktop.png"
            label="Czas pracy · desktop, tryb nocny"
            note="Trzy pierścienie postępu (jazda, przerwa, odpoczynek), obok lista kierowców ze statusem: w normie · przerwa za 40 min · odpoczynek."
            ratio="4:3"
            dark
          >
            <PierscienieCzasu />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
