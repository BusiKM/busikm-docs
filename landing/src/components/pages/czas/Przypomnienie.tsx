import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EkranCzas } from '@/components/mockups/kierowca/EkranCzas';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  label: string;
  note: string;
  naglowek: string;
  tresc: string;
  tak: string;
  takOdp: string;
  nie: string;
  nieOdp: string;
}> = {
  pl: {
    label: 'Licznik w telefonie · tryb nocny',
    note: 'Ten sam plik co na stronie o aplikacji kierowcy. Przypomnienie „za 20 minut przerwa” u góry, pierścień jazdy, przycisk „Przerwa”.',
    naglowek: 'Kierowca dostaje przypomnienie wcześniej',
    tresc: 'Telefon mówi „za 20 minut przerwa”, a nie „miałeś stanąć godzinę temu”.',
    tak: 'Za 20 minut przerwa',
    takOdp: 'tak',
    nie: 'Miałeś stanąć godzinę temu',
    nieOdp: 'nie',
  },
  en: {
    label: 'Counter on the phone · dark mode',
    note: 'The same file as on the driver app page. A “break in 20 minutes” reminder at the top, the driving ring, a “Break” button.',
    naglowek: 'The driver gets the reminder early',
    tresc: 'The phone says “break in 20 minutes”, not “you should have stopped an hour ago”.',
    tak: 'Break in 20 minutes',
    takOdp: 'yes',
    nie: 'You should have stopped an hour ago',
    nieOdp: 'no',
  },
};

/** 02 — telefon obok dwóch komunikatów: tego, który przychodzi, i tego, którego nie ma. */
export function Przypomnienie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div data-reveal className="relative">
          <div
            aria-hidden
            className="absolute right-[20%] bottom-15 left-[20%] h-25 bg-blue opacity-35 blur-[60px] lg:h-35 lg:blur-[90px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-kierowca-czas-phone.png"
              label={t.label}
              note={t.note}
              ratio="9:19.5"
              box="6:7"
              // Ten sam plik i ta sama wartość, co na stronie aplikacji
              // kierowcy: telefon zajmuje 30% szerokości kadru, więc bez
              // powiększenia wychodzi szeroki na 158 px w kolumnie mającej 520.
              imageScale={1.8}
              imageScaleTelefon={1.8}
              dark
              noteClassName="mx-auto max-w-[520px]"
            >
              <EkranCzas />
            </MockupSlot>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <div
            data-reveal
            className="text-[13px] font-semibold tracking-[0.06em] text-blue-light lg:text-caption"
          >
            02
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {t.tresc}
          </p>

          <div data-reveal className="mt-2 flex flex-col gap-2.5 text-[15px]">
            <div className="flex justify-between gap-4 rounded-[14px] border border-line-dark bg-surface px-4.5 py-3.5">
              <span>{t.tak}</span>
              <span className="flex-none text-green">{t.takOdp}</span>
            </div>
            <div className="flex justify-between gap-4 rounded-[14px] border border-dashed border-line-dark px-4.5 py-3.5 text-ink-faint">
              <span className="line-through">{t.nie}</span>
              <span className="flex-none">{t.nieOdp}</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
