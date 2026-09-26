import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EksportMockup } from '@/components/mockups/EksportMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul1: string;
  tytul2: string;
  lead: string;
  bullets: string[];
  nota: string;
  label: string;
  opis: string;
}> = {
  pl: {
    tytul1: 'Księgowa dostaje komplet.',
    tytul2: 'Jednym przyciskiem.',
    lead: 'Wybiera miesiąc, klika raz i ma wszystko: sprzedaż, koszty, przebieg, delegacje i czas pracy. W formacie, który wczyta do programu, którego już używa.',
    bullets: [
      'Insert, Comarch Optima, Symfonia albo zwykły arkusz',
      'System sam mówi, czego brakuje',
      'Zamyka miesiąc i nikt nie zmienia już danych wstecz',
    ],
    nota: 'Księgowa może być z zewnątrz. Zapraszasz ją mailem, dostaje własny dostęp.',
    label: 'Eksport dla księgowej · desktop, tryb nocny',
    opis: 'Lista dziewięciu zestawień z licznikami, u góry duży przycisk „Pobierz komplet za sierpień” i wybór formatu. Stos arkuszy w perspektywie zostaje.',
  },
  en: {
    tytul1: 'Your accountant gets the full set.',
    tytul2: 'With one button.',
    lead: 'They pick the month, click once and have everything: sales, costs, mileage, business trips and working time. In a format they can load into the software they already use.',
    bullets: [
      'Insert, Comarch Optima, Symfonia or a plain spreadsheet',
      'The system tells you what’s missing',
      'They close the month and nobody can change the data after the fact',
    ],
    nota: 'Your accountant can be external. You invite them by email and they get their own login.',
    label: 'Export for the accountant · desktop, night mode',
    opis: 'A list of nine reports with counters, a large “Download the full set for August” button at the top and a format picker. The stack of sheets in perspective stays.',
  },
};

/** 6.12 — komplet dla księgowej. */
export function KoniecMiesiaca() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:order-2">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {t.lead}
          </p>
          <Bullets dark items={t.bullets} />
          <p data-reveal className="text-[13px] leading-relaxed text-ink-muted lg:text-caption">
            {t.nota}
          </p>
        </div>

        <div data-reveal className="lg:order-1">
          <MockupSlot
            file="mockup-ksiegowa-eksport-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
            dark
          >
            <EksportMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
