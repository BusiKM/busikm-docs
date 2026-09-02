import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DemoMockup } from '@/components/mockups/DemoMockup';

/** 6.15 — demo. Ścieżka bez zobowiązań. */
export function Demo() {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-18">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            Nie wierz na słowo. Wejdź i poklikaj.
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            To prawdziwa aplikacja z przykładową firmą. Bez zakładania konta, bez podawania
            czegokolwiek. Niczego nie zepsujesz — dane wracają do porządku każdej nocy.
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-demo-ekran-desktop.png"
            label="Wejście do demo · desktop 1440"
            note="Demo od środka: pasek „to demo”, przełącznik roli (właściciel · dyspozytor · księgowa) i pulpit właściciela."
            ratio="16:10"
            imageScale={1.5}
            noteClassName="lg:mx-auto lg:max-w-[600px]"
          >
            <DemoMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
