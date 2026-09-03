import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TabelaZlecen } from '@/components/mockups/rentownosc/TabelaZlecen';

const punkty = [
  ['02', 'Marża na każdym zleceniu', 'Nie raz na kwartał, tylko od razu.'],
  ['03', 'Liczba zmienia się w trakcie', 'Kierowca dodaje paragon, marża przelicza się sama.'],
] as const;

/** 02 + 03 — dwa punkty nad jedną tabelą, bo mówią o tej samej liście. */
export function MarzaIZmiana() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {punkty.map(([numer, tytul, tresc]) => (
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
            label="Tabela zleceń po marży · desktop 1440, tryb nocny"
            note="Zlecenia posortowane po marży, wyróżniony wiersz z przeliczoną marżą po dodaniu paragonu, zlecenie na minusie na dole."
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
