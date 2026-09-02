import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';

const pliki = [
  'komplet-2026-08.optima',
  'komplet-2026-07.optima',
  'diety-2026-07.xlsx',
  'komplet-2026-06.optima',
];

/** 05 i 06 — dwie karty na ciemnym. */
export function ZamkniecieIHistoria() {
  return (
    <Section tone="ink">
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          tone="surface"
          numer="05"
          tytul="Zamknięcie miesiąca"
          tresc="Po zamknięciu nikt nie zmienia danych wstecz."
        >
          <div className="flex flex-col gap-3 rounded-card border border-line-dark bg-ink p-6 text-caption">
            <div className="flex justify-between gap-3 border-b border-line-dark py-2.5">
              <span>Lipiec 2026</span>
              <span className="flex-none text-ink-muted">zamknięty · 4.08, Ewa M.</span>
            </div>
            <div className="flex justify-between gap-3 border-b border-line-dark py-2.5">
              <span>Sierpień 2026</span>
              <span className="flex-none text-green">otwarty</span>
            </div>
            <div className="rounded-xl border border-line-dark-2 p-3 text-center font-semibold">
              Zamknij sierpień
            </div>
          </div>
        </KartaBloku>

        <KartaBloku
          tone="surface"
          numer="06"
          tytul="Historia pobrań"
          tresc="Każdy plik można pobrać ponownie."
        >
          <div className="flex flex-col rounded-card border border-line-dark bg-ink p-6 text-caption">
            {pliki.map((plik, i) => (
              <div
                key={plik}
                className={`flex justify-between gap-3 py-2.5 ${
                  i < pliki.length - 1 ? 'border-b border-line-dark' : ''
                }`}
              >
                <span className="truncate">{plik}</span>
                <span className="flex-none text-blue">pobierz ↓</span>
              </div>
            ))}
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
