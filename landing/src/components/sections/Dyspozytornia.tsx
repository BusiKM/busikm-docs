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
    lead: 'Kolejka zleceń i mapa floty obok siebie, pod spodem plan floty. Do kierowcy piszesz jednym kliknięciem, bez szukania numeru w telefonie. Przypisujesz auto, a system podpowiada, kto zdąży na załadunek.',
    bullets: [
      'Zlecenie od przyjęcia po rozliczenie',
      'Podpowiedź, które auto i kierowca zdążą',
      '„Napisz” na karcie kursu otwiera czat zlecenia',
    ],
    nota: 'Dyspozytor ma w BusiKM własne stanowisko i własny dostęp.',
    label: 'Ekran dyspozytora · desktop 1440',
    opis: 'Dyspozytornia: u góry liczniki dnia, po lewej kolejka z zakładkami „Wymaga reakcji”, „Do przypisania” i „W trasie”, po prawej mapa floty z filtrami, niżej plan floty.',
  },
  en: {
    naglowek: 'The whole working day on one screen.',
    lead: 'The order queue and the fleet map side by side, with the fleet plan underneath. You message a driver in one click, no hunting for a number in your phone. You assign a van, and the system tells you who will make the pickup.',
    bullets: [
      'An order from booking to settlement',
      'A hint on which van and driver will make it',
      '“Message” on a run opens the order chat',
    ],
    nota: 'In BusiKM the dispatcher has their own workspace and their own login.',
    label: 'Dispatcher’s screen · desktop 1440',
    opis: 'Dispatch: the day’s counters at the top, the queue on the left with “Needs action”, “To assign” and “On the road” tabs, the fleet map with filters on the right, the fleet plan below.',
  },
};

/** 6.5 – dyspozytornia. Idzie zaraz po „Trzech ruchach", więc bez górnego odstępu. */
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
