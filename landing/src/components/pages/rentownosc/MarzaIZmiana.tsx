import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TabelaZlecen } from '@/components/mockups/rentownosc/TabelaZlecen';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  punkty: readonly (readonly [string, string, string])[];
  label: string;
  note: string;
}> = {
  pl: {
    punkty: [
      ['02', 'Marża na każdym zleceniu', 'Nie raz na kwartał, tylko od razu. W raportach widzisz też marżę według kierunku.'],
      ['03', 'Liczba zmienia się w trakcie', 'Kierowca dodaje paragon – gdy ma komplet danych, marża przelicza się sama.'],
    ],
    label: 'Raporty → Zlecenia i trasy · desktop 1440',
    note: 'Raporty, zakładka Zlecenia i trasy: liczba zleceń, średni zysk z kursu, puste kilometry, zlecenia poniżej progu marży, wykres marży według kraju rozładunku i zleceń według przedziału marży.',
  },
  en: {
    punkty: [
      ['02', 'The margin on every order', 'Not once a quarter. Right away. Reports also show the margin by destination.'],
      ['03', 'The number moves as you go', 'The driver adds a receipt – once it has all its details, the margin recalculates itself.'],
    ],
    label: 'Reports → Orders and routes · desktop 1440',
    note: 'Reports, Orders and routes tab: number of orders, average profit per run, empty kilometres, orders below the margin threshold, a chart of margin by unloading country and orders by margin band.',
  },
};

/** 02 + 03 – dwa punkty nad jedną tabelą, bo mówią o tej samej liście. */
export function MarzaIZmiana() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {t.punkty.map(([numer, tytul, tresc]) => (
            <div key={numer} className="flex flex-col gap-4 lg:gap-6">
              <div
                data-reveal
                className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
              >
                {numer}
              </div>
              <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
                {tytul}
              </h2>
              <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
                {tresc}
              </p>
            </div>
          ))}
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-zysk-tabela-desktop.png"
            label={t.label}
            note={t.note}
            ratio="16:10"
            dark
            noteClassName="mx-auto max-w-[600px]"
          >
            <TabelaZlecen />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
