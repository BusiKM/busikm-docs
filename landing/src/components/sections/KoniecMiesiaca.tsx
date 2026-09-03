import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EksportMockup } from '@/components/mockups/EksportMockup';

/** 6.12 — komplet dla księgowej. */
export function KoniecMiesiaca() {
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:order-2">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Księgowa dostaje komplet. <br className="hidden lg:inline" />
            Jednym przyciskiem.
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            Wybiera miesiąc, klika raz i ma wszystko: sprzedaż, koszty, przebieg, delegacje i czas
            pracy. W formacie, który wczyta do programu, którego już używa.
          </p>
          <Bullets
            dark
            items={[
              'Insert, Comarch Optima, Symfonia albo zwykły arkusz',
              'System sam mówi, czego brakuje',
              'Zamyka miesiąc i nikt nie zmienia już danych wstecz',
            ]}
          />
          <p data-reveal className="text-[13px] leading-relaxed text-ink-muted lg:text-caption">
            Księgowa może być z zewnątrz. Zapraszasz ją mailem, dostaje własny dostęp.
          </p>
        </div>

        <div data-reveal className="lg:order-1">
          <MockupSlot
            file="mockup-ksiegowa-eksport-desktop.png"
            label="Eksport dla księgowej · desktop, tryb nocny"
            note="Lista dziewięciu zestawień z licznikami, u góry duży przycisk „Pobierz komplet za sierpień” i wybór formatu. Stos arkuszy w perspektywie zostaje."
            ratio="4:3"
            dark
          >
            <EksportMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
