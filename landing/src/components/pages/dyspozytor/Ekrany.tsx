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
      note: 'Liczniki dnia, kolejka z zakładkami „Wymaga reakcji”, „Do przypisania” i „W trasie”, obok mapa floty z filtrami, niżej plan floty.',
      caption: 'Dyspozytornia',
    },
    zlecenie: {
      label: 'Karta zlecenia · desktop',
      note: 'Zlecenie Wrocław → Milano, zakładka Przegląd: pasek etapów, postoje z mapą, kierowca i auto z przyciskami „Zadzwoń” i „Napisz”.',
      caption: 'Karta zlecenia',
    },
    trasa: {
      label: 'Trasa i śledzenie · desktop',
      note: 'Zlecenie Olsztyn → München: ostrzeżenie o spóźnieniu, trasa z przyciskiem „Zmień trasę”, auto na mapie i czas dojazdu z pozycji auta.',
      caption: 'Trasa i śledzenie',
    },
  },
  en: {
    naglowek: 'Three screens you see every day.',
    ekran: {
      label: 'Dispatch · desktop 1440',
      note: 'The day’s counters, the queue with “Needs action”, “To assign” and “On the road” tabs, the fleet map with filters beside it, the fleet plan below.',
      caption: 'Dispatch',
    },
    zlecenie: {
      label: 'Order card · desktop',
      note: 'Order Wrocław → Milano, Overview tab: progress bar, stops with a map, driver and van with “Call” and “Message” buttons.',
      caption: 'Order card',
    },
    trasa: {
      label: 'Route and tracking · desktop',
      note: 'Order Olsztyn → München: a late-arrival warning, the route with a “Change route” button, the van on the map and the arrival time from its position.',
      caption: 'Route and tracking',
    },
  },
};

/**
 * Trzy ekrany dyspozytora – wszystkie narysowane przy podstronie
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
