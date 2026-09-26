import { Section } from '@/components/ui/Section';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Pole = { pole: string; wartosc: string; gdzie: string };

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  wpisane: string;
  pola: readonly Pole[];
}> = {
  pl: {
    naglowek: 'Zlecenie i faktura to jedno',
    lead: 'Fracht, kontrahent, termin i waluta są już w środku. Faktura powstaje z tego, co wpisałeś raz, przy przyjmowaniu zlecenia.',
    wpisane: 'Wpisane raz',
    pola: [
      { pole: 'Fracht', wartosc: '3 900 €', gdzie: '→ pozycja na fakturze' },
      { pole: 'Kontrahent', wartosc: 'Alpina Logistics', gdzie: '→ nabywca' },
      { pole: 'Termin', wartosc: '30 dni', gdzie: '→ termin płatności' },
      { pole: 'Waluta', wartosc: 'EUR', gdzie: '→ waluta i kurs' },
    ],
  },
  en: {
    naglowek: 'Order and invoice are one thing',
    lead: 'Freight, client, payment term and currency are already in there. The invoice is built from what you entered once, when you took the order.',
    wpisane: 'Entered once',
    pola: [
      { pole: 'Freight', wartosc: '€3,900', gdzie: '→ line on the invoice' },
      { pole: 'Client', wartosc: 'Alpina Logistics', gdzie: '→ buyer' },
      { pole: 'Term', wartosc: '30 days', gdzie: '→ payment due date' },
      { pole: 'Currency', wartosc: 'EUR', gdzie: '→ currency and rate' },
    ],
  },
};

/** 01 — cztery pola wpisane przy zleceniu i miejsce, w które trafiają na fakturze. */
export function JednoZrodlo() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
            >
              01
            </div>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
          </div>
          <p data-reveal className="text-lead-m text-ink-muted lg:text-lead">
            {t.lead}
          </p>
        </div>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {t.pola.map((p) => (
            <div
              key={p.pole}
              data-reveal
              className="flex flex-col gap-2.5 rounded-card border border-line-dark bg-surface p-5 lg:gap-3.5 lg:p-7"
            >
              <div className="text-[12px] text-ink-muted lg:text-[13px]">{t.wpisane}</div>
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
