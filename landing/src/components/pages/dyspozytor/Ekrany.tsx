import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DyspozytorniaMockup } from '@/components/mockups/DyspozytorniaMockup';
import { KartaZlecenia } from '@/components/mockups/dyspozytornia/KartaZlecenia';
import { PodgladTrasy } from '@/components/mockups/dyspozytornia/PodgladTrasy';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Opis = { label: string; note: string; caption: string };

const TEKSTY: Tlumaczenia<{ naglowek: string; ekran: Opis; zlecenie: Opis; trasa: Opis }> = {
  pl: {
    naglowek: 'Trzy ekrany, które widzisz codziennie.',
    ekran: {
      label: 'Dyspozytornia · desktop 1440',
      note: 'Trzy kolumny: lista zleceń, mapa, panel kierowcy z rozmową.',
      caption: 'Dyspozytornia',
    },
    zlecenie: {
      label: 'Karta zlecenia · desktop',
      note: 'Zlecenie z przypisanym kierowcą i pojazdem, podpowiedź kto ma wolne godziny.',
      caption: 'Karta zlecenia z przypisaniem',
    },
    trasa: {
      label: 'Podgląd trasy · desktop',
      note: 'Trasa z możliwością zmiany w trakcie jazdy, kierowca dostaje nową wersję od razu.',
      caption: 'Trasa i zmiana w trakcie',
    },
  },
  en: {
    naglowek: 'Three screens you see every day.',
    ekran: {
      label: 'Dispatch · desktop 1440',
      note: 'Three columns: order list, map, driver panel with chat.',
      caption: 'Dispatch',
    },
    zlecenie: {
      label: 'Order card · desktop',
      note: 'An order with its assigned driver and vehicle, and a hint on who has hours left.',
      caption: 'Order card with assignment',
    },
    trasa: {
      label: 'Route preview · desktop',
      note: 'A route you can change mid-journey; the driver gets the new version straight away.',
      caption: 'Route and changes on the go',
    },
  },
};

/**
 * Trzy ekrany dyspozytora — wszystkie narysowane przy podstronie
 * „Dyspozytornia", więc nazwy plików są dokładnie te same.
 *
 * Główny ekran idzie na pełną szerokość, bo to on jest obietnicą tej strony:
 * cały dzień pracy na jednym ekranie.
 */
export function Ekrany() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="flex flex-col gap-8 lg:gap-6">
          <div data-reveal>
            <MockupSlot
              file="mockup-dyspozytornia-ekran-desktop.png"
              label={t.ekran.label}
              note={t.ekran.note}
              ratio="16:10"
              caption={t.ekran.caption}
            >
              <DyspozytorniaMockup />
            </MockupSlot>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
            <div data-reveal>
              <MockupSlot
                file="mockup-dyspozytornia-zlecenie-desktop.png"
                label={t.zlecenie.label}
                note={t.zlecenie.note}
                ratio="4:3"
                caption={t.zlecenie.caption}
              >
                <KartaZlecenia />
              </MockupSlot>
            </div>

            <div data-reveal>
              <MockupSlot
                file="mockup-dyspozytornia-trasa-desktop.png"
                label={t.trasa.label}
                note={t.trasa.note}
                ratio="4:3"
                caption={t.trasa.caption}
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
