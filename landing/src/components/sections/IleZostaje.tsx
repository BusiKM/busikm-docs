import { Section, Eyebrow, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { KartaZysku } from '@/components/mockups/KartaZysku';

/** 6.8 — ile zostaje. Liczba zysku stoi obok karty, nie w niej. */
export function IleZostaje() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-8 lg:gap-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            Wiesz, ile zostaje. <br className="hidden lg:inline" />
            Na tym kursie. Dziś.
          </h2>

          <div className="flex flex-col gap-5 lg:gap-6">
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              Fracht minus paliwo, opłaty drogowe, hotel i dieta kierowcy. Kierowca dodaje paragon
              w trasie — liczba na Twoim ekranie zmienia się od razu. Nie na koniec kwartału.
            </p>
            <Bullets
              dark
              items={[
                'Przychód, koszty i zysk na pulpicie, na bieżąco',
                'Marża na każdym zleceniu z osobna',
                'Koszty w obcych walutach przeliczone po kursie z dnia',
              ]}
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[520px_1fr] lg:items-center lg:gap-20">
          <div data-reveal className="relative lg:order-2 lg:flex lg:flex-col lg:gap-3">
            <Eyebrow dark>Zostaje</Eyebrow>
            <div className="text-[56px] leading-none font-bold tracking-[-0.04em] lg:text-[120px]">
              12 540 zł
            </div>
            <div className="hidden text-lead leading-relaxed text-ink-muted lg:block">
              z 3 900 € frachtu. Liczba zmieni się, gdy Marek doda kolejny paragon.
            </div>
          </div>

          <div data-reveal className="relative lg:order-1">
            <div
              aria-hidden
              className="absolute right-[10%] bottom-5 left-[10%] h-25 bg-blue opacity-35 blur-[60px] lg:bottom-20 lg:h-40 lg:blur-[100px]"
            />
            <div className="relative">
              <MockupSlot
                file="mockup-zysk-karta-desktop.png"
                label="Karta zysku · desktop, tryb nocny"
                note="Karta zlecenia Warszawa → Mediolan, rozbicie kosztów w wierszach, zysk na dole, obok mały wykres dzienny."
                ratio="4:3"
                dark
              >
                <KartaZysku />
              </MockupSlot>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
