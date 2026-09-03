import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DyspozytorniaMockup } from '@/components/mockups/DyspozytorniaMockup';

/** 6.5 — dyspozytornia. Idzie zaraz po „Trzech ruchach", więc bez górnego odstępu. */
export function Dyspozytornia() {
  return (
    <Section spacing="pb-24 lg:pb-40">
      <div className="flex flex-col gap-8 lg:gap-18">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Cały dzień pracy na jednym ekranie.
          </h2>

          <div className="flex flex-col gap-5 lg:gap-6">
            <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
              Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Nie przełączasz zakładek i nie
              szukasz numeru w telefonie. Przypisujesz kierowcę i pojazd, a system podpowiada, kto
              ma wszystko ważne.
            </p>

            <Bullets
              items={[
                'Zlecenie od przyjęcia po rozliczenie',
                'Kierowca i pojazd przypisani w dwie sekundy',
                'Rozmowa z kierowcą bez wychodzenia z ekranu',
              ]}
            />

            <p data-reveal className="text-[13px] leading-relaxed text-muted lg:text-caption">
              Dyspozytor ma w BusiKM własne stanowisko i własny dostęp.
            </p>
          </div>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dyspozytornia-ekran-desktop.png"
            label="Ekran dyspozytora · desktop 1440"
            note="Szeroki ekran w trzech kolumnach: lista zleceń, mapa z trasami, panel kierowcy z rozmową."
            ratio="16:10"
            noteClassName="lg:mx-auto lg:max-w-[600px]"
          >
            <DyspozytorniaMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
