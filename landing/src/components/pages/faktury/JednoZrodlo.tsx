import { Section } from '@/components/ui/Section';

const pola = [
  { pole: 'Fracht', wartosc: '3 900 €', gdzie: '→ pozycja na fakturze' },
  { pole: 'Kontrahent', wartosc: 'Alpina Logistics', gdzie: '→ nabywca' },
  { pole: 'Termin', wartosc: '30 dni', gdzie: '→ termin płatności' },
  { pole: 'Waluta', wartosc: 'EUR', gdzie: '→ waluta i kurs' },
] as const;

/** 01 — cztery pola wpisane przy zleceniu i miejsce, w które trafiają na fakturze. */
export function JednoZrodlo() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Zlecenie i faktura to jedno
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            Fracht, kontrahent, termin i waluta są już w środku. Faktura powstaje z tego,
            co wpisałeś raz, przy przyjmowaniu zlecenia.
          </p>
        </div>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {pola.map((p) => (
            <div
              key={p.pole}
              data-reveal
              className="flex flex-col gap-2.5 rounded-card border border-line-dark bg-surface p-5 lg:gap-3.5 lg:p-7"
            >
              <div className="text-[12px] text-ink-muted lg:text-[13px]">Wpisane raz</div>
              <div className="text-[15px] font-semibold lg:text-body">{p.pole}</div>
              <div className="text-[14px] text-ink-muted lg:text-[15px]">{p.wartosc}</div>
              <div className="mt-auto border-t border-line-dark pt-3 text-[12px] text-green lg:pt-3.5 lg:text-[13px]">
                {p.gdzie}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
