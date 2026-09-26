import Link from '@/i18n/Link';

import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DemoMockup } from '@/components/mockups/DemoMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  odnosnik: string;
  label: string;
  opis: string;
}> = {
  pl: {
    naglowek: 'Demo przygotowujemy. Zostaw adres.',
    lead: 'Prawdziwa aplikacja z danymi przykładowej firmy transportowej. Napiszemy w dniu, w którym ruszy — razem z 14 dniami bez opłat.',
    odnosnik: 'Zapisz się po dostęp do demo',
    label: 'Wejście do demo · desktop 1440',
    opis: 'Demo od środka: pasek „to demo”, przełącznik roli (właściciel · dyspozytor · księgowa) i pulpit właściciela.',
  },
  en: {
    naglowek: 'The demo is on its way. Leave your email.',
    lead: 'The real app, filled with a sample transport company’s data. We’ll write to you the day it goes live — along with 14 days free.',
    odnosnik: 'Sign up for demo access',
    label: 'Demo entrance · desktop 1440',
    opis: 'Inside the demo: a “this is a demo” bar, a role switch (owner · dispatcher · accountant) and the owner’s dashboard.',
  },
};

/** 6.15 — demo. Ścieżka bez zobowiązań. */
export function Demo() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-18">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.lead}
          </p>
        </div>

        {/*
          Makieta jest tu przyciskiem — kliknięcie prowadzi do demo. Obraz ma
          `pointer-events-none` (dokłada je `imageScale`), więc celem kliknięcia
          jest samo pudło odnośnika.

          `imageScale` dobrane pomiarem. Obraz wychodzi poza pudło symetrycznie
          w górę i w dół o `wysokość_pudła × (skala − 1) / 2`, czyli — przy pudle
          16:10 — o `0,0469 × szerokość` dla skali 1.15. Przy 1440 px pudło ma
          700 px wysokości, a nad nim 72 px odstępu do nagłówka: skala 1.5 dawała
          175 px nadmiaru i zasłaniała nagłówek, 1.15 daje 52 px, czyli 20 px
          prześwitu — a makieta i tak jest szersza niż kolumna treści.

          Poniżej `lg` odstęp to stałe 32 px, więc przy szerokim oknie (768–1023 px)
          nadmiar zaczyna go zjadać. Stąd `mt-[5%]`: margines procentowy liczy się
          od szerokości rodzica, więc rośnie razem z makietą (5% > 4,69%) i zostawia
          co najmniej te 32 px prześwitu na każdej szerokości.
        */}
        <div data-reveal className="mt-[5%] lg:mt-0">
          <Link
            href="/demo"
            aria-label={t.odnosnik}
            className="block cursor-pointer rounded-panel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
          >
            <MockupSlot
              file="mockup-demo-ekran-desktop.png"
              label={t.label}
              note={t.opis}
              ratio="16:10"
              imageScale={1.15}
              noteClassName="lg:mx-auto lg:max-w-[600px]"
            >
              <DemoMockup />
            </MockupSlot>
          </Link>
        </div>
      </div>
    </Section>
  );
}
