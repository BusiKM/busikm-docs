import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';

const miesiace = [
  ['czerwiec', 'bg-mist text-muted'],
  ['lipiec', 'bg-mist text-muted'],
  ['sierpień', 'bg-ink font-semibold text-paper'],
  ['wrzesień', 'border border-dashed border-line text-muted'],
] as const;

const formaty = [
  ['Insert', 'EPP', false],
  ['Comarch Optima', 'wybrany', true],
  ['Symfonia', 'FK', false],
  ['Zwykły arkusz', 'XLSX · zakładka na zestawienie', false],
] as const;

/** 01 i 02 — dwie karty obok siebie. */
export function MiesiacIFormat() {
  return (
    <Section>
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          numer="01"
          tytul="Wybiera miesiąc i klika raz"
          tresc="Dostaje wszystko za ten okres, bez proszenia o brakujące papiery."
        >
          <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-caption">
            <div className="flex flex-wrap gap-2">
              {miesiace.map(([nazwa, klasa]) => (
                <span key={nazwa} className={`rounded-full px-3.5 py-2 ${klasa}`}>
                  {nazwa}
                </span>
              ))}
            </div>
            <div className="rounded-xl bg-blue p-3.5 text-center font-semibold text-white">
              Pobierz komplet za sierpień
            </div>
          </div>
        </KartaBloku>

        <KartaBloku
          numer="02"
          tytul="W formacie jej programu"
          tresc="Insert, Comarch Optima, Symfonia albo zwykły arkusz."
        >
          <div className="flex flex-col rounded-card border border-line bg-white p-6 text-[14px] lg:text-[15px]">
            {formaty.map(([nazwa, opis, wybrany], i) => (
              <div
                key={nazwa}
                className={`flex justify-between gap-3 py-3 ${
                  i < formaty.length - 1 ? 'border-b border-line' : ''
                }`}
              >
                {wybrany ? <b>{nazwa}</b> : <span>{nazwa}</span>}
                <span
                  className={
                    wybrany ? 'flex-none font-semibold text-blue' : 'flex-none text-muted'
                  }
                >
                  {opis}
                </span>
              </div>
            ))}
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
