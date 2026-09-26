import { Section, Eyebrow, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { KartaZysku } from '@/components/mockups/KartaZysku';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul1: string;
  tytul2: string;
  lead: string;
  bullets: string[];
  eyebrow: string;
  kwota: string;
  podpis: string;
  label: string;
  opis: string;
}> = {
  pl: {
    tytul1: 'Wiesz, ile zostaje.',
    tytul2: 'Na tym kursie. Dziś.',
    lead: 'Fracht minus paliwo, opłaty drogowe, nocleg i koszt kierowcy. Kierowca dodaje paragon w trasie — liczba na Twoim ekranie zmienia się od razu. Nie na koniec kwartału.',
    bullets: [
      'Przychód, koszty i zysk na pulpicie, na bieżąco',
      'Marża na każdym zleceniu z osobna',
      'Koszty w obcych walutach przeliczone po kursie z dnia',
    ],
    eyebrow: 'Zostaje',
    kwota: '6 009 zł',
    podpis: 'z 3 900 € frachtu. Liczba zmieni się, gdy Marek doda kolejny paragon.',
    label: 'Karta zysku · desktop, tryb nocny',
    opis: 'Karta zlecenia Warszawa → Mediolan, rozbicie kosztów w wierszach, zysk na dole, obok mały wykres dzienny.',
  },
  en: {
    tytul1: 'You know what you keep.',
    tytul2: 'On this job. Today.',
    lead: 'Freight minus fuel, tolls, overnight stay and the driver’s cost. The driver adds a receipt on the road — the figure on your screen changes straight away. Not at the end of the quarter.',
    bullets: [
      'Revenue, costs and profit on the dashboard, always up to date',
      'The margin on every single order',
      'Foreign-currency costs converted at the day’s rate',
    ],
    eyebrow: 'You keep',
    kwota: 'PLN 6,009',
    podpis: 'out of €3,900 freight. The figure will change when Marek adds another receipt.',
    label: 'Profit card · desktop, night mode',
    opis: 'Order card Warsaw → Milan, costs broken down line by line, profit at the bottom, a small daily chart alongside.',
  },
};

/** 6.8 — ile zostaje. Liczba zysku stoi obok karty, nie w niej. */
export function IleZostaje() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-8 lg:gap-20">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>

          <div className="flex flex-col gap-5 lg:gap-6">
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              {t.lead}
            </p>
            <Bullets dark items={t.bullets} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[520px_1fr] lg:items-center lg:gap-20">
          <div data-reveal className="relative lg:order-2 lg:flex lg:flex-col lg:gap-3">
            <Eyebrow dark>{t.eyebrow}</Eyebrow>
            <div className="text-[56px] leading-none font-bold tracking-[-0.04em] lg:text-[120px]">
              {t.kwota}
            </div>
            <div className="hidden text-lead leading-relaxed text-ink-muted lg:block">
              {t.podpis}
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
                label={t.label}
                note={t.opis}
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
