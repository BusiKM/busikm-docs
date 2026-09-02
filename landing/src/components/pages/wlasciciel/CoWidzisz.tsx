import { Section, Eyebrow } from '@/components/ui/Section';

const karty = [
  {
    nadtytul: 'Widzisz',
    tytul: 'Wszystko.',
    tresc: 'Każde zlecenie, każdy koszt, każdą trasę, wszystkie pieniądze.',
  },
  {
    nadtytul: 'Nie musisz',
    tytul: 'Wchodzić w to codziennie.',
    tresc: 'Dyspozytor prowadzi dzień, księgowa zamyka miesiąc, Ty patrzysz na wynik.',
  },
] as const;

/** Zakres dostępu, po ludzku — dwie kolumny zamiast tabeli uprawnień. */
export function CoWidzisz() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Co widzisz, a czego nie musisz.
        </h2>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
          {karty.map((k) => (
            <div
              key={k.nadtytul}
              data-reveal
              className="flex flex-col gap-5 rounded-panel border border-line-dark bg-surface p-7 lg:gap-6 lg:p-14"
            >
              <Eyebrow dark>{k.nadtytul}</Eyebrow>
              <div className="text-h2-m font-semibold text-balance lg:text-h2">{k.tytul}</div>
              <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">{k.tresc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
