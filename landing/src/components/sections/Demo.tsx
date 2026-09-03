import Link from 'next/link';

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
            aria-label="Zobacz demo"
            className="block cursor-pointer rounded-panel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue"
          >
            <MockupSlot
              file="mockup-demo-ekran-desktop.png"
              label="Wejście do demo · desktop 1440"
              note="Demo od środka: pasek „to demo”, przełącznik roli (właściciel · dyspozytor · księgowa) i pulpit właściciela."
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
