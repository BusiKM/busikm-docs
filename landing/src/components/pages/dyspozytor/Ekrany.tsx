import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DyspozytorniaMockup } from '@/components/mockups/DyspozytorniaMockup';
import { KartaZlecenia } from '@/components/mockups/dyspozytornia/KartaZlecenia';
import { PodgladTrasy } from '@/components/mockups/dyspozytornia/PodgladTrasy';

/**
 * Trzy ekrany dyspozytora — wszystkie narysowane przy podstronie
 * „Dyspozytornia", więc nazwy plików są dokładnie te same.
 *
 * Główny ekran idzie na pełną szerokość, bo to on jest obietnicą tej strony:
 * cały dzień pracy na jednym ekranie.
 */
export function Ekrany() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Trzy ekrany, które widzisz codziennie.
        </h2>

        <div data-reveal-group className="flex flex-col gap-8 lg:gap-6">
          <div data-reveal>
            <MockupSlot
              file="mockup-dyspozytornia-ekran-desktop.png"
              label="Dyspozytornia · desktop 1440"
              note="Trzy kolumny: lista zleceń, mapa, panel kierowcy z rozmową."
              ratio="16:10"
              caption="Dyspozytornia"
            >
              <DyspozytorniaMockup />
            </MockupSlot>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
            <div data-reveal>
              <MockupSlot
                file="mockup-dyspozytornia-zlecenie-desktop.png"
                label="Karta zlecenia · desktop"
                note="Zlecenie z przypisanym kierowcą i pojazdem, podpowiedź kto ma wolne godziny."
                ratio="4:3"
                caption="Karta zlecenia z przypisaniem"
              >
                <KartaZlecenia />
              </MockupSlot>
            </div>

            <div data-reveal>
              <MockupSlot
                file="mockup-dyspozytornia-trasa-desktop.png"
                label="Podgląd trasy · desktop"
                note="Trasa z możliwością zmiany w trakcie jazdy, kierowca dostaje nową wersję od razu."
                ratio="4:3"
                caption="Trasa i zmiana w trakcie"
              >
                <PodgladTrasy />
              </MockupSlot>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
