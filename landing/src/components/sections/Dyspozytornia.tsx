import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DyspozytorniaMockup } from '@/components/mockups/DyspozytorniaMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  bullets: string[];
  nota: string;
  label: string;
  opis: string;
}> = {
  pl: {
    naglowek: 'Cały dzień pracy na jednym ekranie.',
    lead: 'Zlecenia, mapa, kierowcy i rozmowa — obok siebie. Nie przełączasz zakładek i nie szukasz numeru w telefonie. Przypisujesz kierowcę i pojazd, a system podpowiada, kto ma wszystko ważne.',
    bullets: [
      'Zlecenie od przyjęcia po rozliczenie',
      'Kierowca i pojazd przypisani w dwie sekundy',
      'Rozmowa z kierowcą bez wychodzenia z ekranu',
    ],
    nota: 'Dyspozytor ma w BusiKM własne stanowisko i własny dostęp.',
    label: 'Ekran dyspozytora · desktop 1440',
    opis: 'Szeroki ekran w trzech kolumnach: lista zleceń, mapa z trasami, panel kierowcy z rozmową.',
  },
  en: {
    naglowek: 'The whole working day on one screen.',
    lead: 'Orders, map, drivers and chat — side by side. No switching tabs, no hunting for a number in your phone. You assign a driver and a van, and the system tells you whose papers are all in date.',
    bullets: [
      'An order from booking to settlement',
      'Driver and van assigned in two seconds',
      'Talk to the driver without leaving the screen',
    ],
    nota: 'In BusiKM the dispatcher has their own workspace and their own login.',
    label: 'Dispatcher’s screen · desktop 1440',
    opis: 'A wide screen in three columns: order list, map with routes, driver panel with chat.',
  },
};

/** 6.5 — dyspozytornia. Idzie zaraz po „Trzech ruchach", więc bez górnego odstępu. */
export function Dyspozytornia() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section spacing="pb-24 lg:pb-40">
      <div className="flex flex-col gap-8 lg:gap-18">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>

          <div className="flex flex-col gap-5 lg:gap-6">
            <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.lead}
            </p>

            <Bullets items={t.bullets} />

            <p data-reveal className="text-[13px] leading-relaxed text-muted lg:text-caption">
              {t.nota}
            </p>
          </div>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dyspozytornia-ekran-desktop.png"
            label={t.label}
            note={t.opis}
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
