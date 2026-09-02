import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';

const zaliczka = [
  { label: 'Zaliczka · FZ/2026/08/017', value: '1 000 €' },
  { label: 'Faktura końcowa · FV/2026/09/041', value: '3 900 €' },
  { label: 'Odliczona zaliczka', value: '− 1 000 €', przygaszony: true },
  { label: 'Do zapłaty', value: '2 900 €', mocny: true },
];

const waluta = [
  { label: 'Kwota', value: '3 900,00 €', mocny: true },
  { label: 'Kurs', value: '4,2800 zł' },
  { label: 'Data przeliczenia', value: '3.09.2026' },
  { label: 'W złotych', value: '16 692,00 zł', mocny: true },
];

type Wiersz = {
  label: string;
  value: string;
  krotki?: string;
  mocny?: boolean;
  przygaszony?: boolean;
};

/** Panel z wierszami wewnątrz karty — obie karty tej sekcji mają taki sam. */
function Panel({ wiersze, etykietyPrzygaszone }: { wiersze: Wiersz[]; etykietyPrzygaszone?: boolean }) {
  return (
    <div className="flex flex-col rounded-card border border-line-dark bg-ink p-5 text-[13px] lg:p-6 lg:text-caption">
      {wiersze.map((w, i) => (
        <div
          key={w.label}
          className={`flex justify-between gap-3 py-2 lg:py-2.5 ${
            i < wiersze.length - 1 ? 'border-b border-line-dark' : ''
          } ${w.przygaszony ? 'text-ink-muted' : ''}`}
        >
          <span className={etykietyPrzygaszone && !w.przygaszony ? 'text-ink-muted' : ''}>
            {w.label}
          </span>
          {w.mocny ? (
            <b className="flex-none">{w.value}</b>
          ) : (
            <span className="flex-none truncate">
              <span className="lg:hidden">{w.krotki ?? w.value}</span>
              <span className="hidden lg:inline">{w.value}</span>
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/** 03 + 04 — dwa punkty w dwóch kartach obok siebie. */
export function KorektyIWaluty() {
  return (
    <Section tone="ink">
      <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          tone="surface"
          numer="03"
          tytul="Korekty i zaliczki"
          tresc="Tą samą ścieżką. Korekta wie, do czego się odnosi, zaliczka odlicza się od faktury końcowej. Bez kombinowania w arkuszu."
        >
          <div className="flex flex-col gap-2">
            <Panel wiersze={zaliczka} />
            <p className="text-[13px] text-ink-muted lg:text-caption">
              Korekta FK/2026/09/003 → odnosi się do FV/2026/09/041
            </p>
          </div>
        </KartaBloku>

        <KartaBloku
          tone="surface"
          numer="04"
          tytul="Waluty"
          tresc="Kwota, kurs i data przeliczenia zostają na dokumencie. Nikt nie liczy tego w kalkulatorze trzy tygodnie później."
        >
          <div className="flex flex-col gap-2">
            <Panel wiersze={waluta} etykietyPrzygaszone />
            <p className="text-[13px] text-ink-muted lg:text-caption">
              Kurs z dnia poprzedzającego wystawienie — zapisany przy dokumencie na stałe.
            </p>
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
