import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { StatusMiesiaca } from '@/components/mockups/dokumenty/StatusMiesiaca';

/** 04 — ekran statusu na pełną szerokość. */
export function StatusEkran() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div className="flex flex-col gap-4 lg:gap-6">
            <div
              data-reveal
              className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
            >
              04
            </div>
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              Jeden ekran statusu
            </h2>
          </div>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Widać, co wymaga uwagi w tym miesiącu. I nic poza tym.
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-dokumenty-status-desktop.png"
            label="Status miesiąca · desktop 1440"
            note="Trzy kolumny: pojazdy, firma, kierowcy. Tylko to, co wymaga uwagi; reszta jako liczba „w porządku”."
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <StatusMiesiaca />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
