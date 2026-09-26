import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { CentrumEksportow } from '@/components/mockups/ksiegowa/CentrumEksportow';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul: [string, string];
  lead: string;
  label: string;
  note: string;
}> = {
  pl: {
    eyebrow: 'Dane dla księgowej',
    tytul: ['Komplet dokumentów.', 'Jednym przyciskiem.'],
    lead: 'Wybiera miesiąc, klika raz i ma wszystko — w formacie programu, którego już używa.',
    label: 'Centrum eksportów · desktop, tryb nocny',
    note: 'Lista dziewięciu zestawień z licznikami, u góry przycisk „Pobierz komplet za sierpień” i wybór formatu. Stos arkuszy w perspektywie zostaje.',
  },
  en: {
    eyebrow: 'Data for your accountant',
    tytul: ['Every document.', 'One button.'],
    lead: 'Your accountant picks a month, clicks once and has the lot — in the format of the accounting software they already use.',
    label: 'Export centre · desktop, dark mode',
    note: 'List of nine reports with counts, a “Download the full set for August” button at the top and a format picker. The stack of sheets in perspective stays.',
  },
};

/** Nagłówek strony — ciemny, ze stosem arkuszy. */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow dark>{t.eyebrow}</Eyebrow>
        <h1
          data-reveal
          className="max-w-[980px] text-display-m font-bold text-balance lg:text-display"
        >
          {t.tytul[0]} <br className="hidden lg:inline" />
          {t.tytul[1]}
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
        >
          {t.lead}
        </p>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div data-reveal>
          <MockupSlot
            file="mockup-ksiegowa-eksport-desktop.png"
            label={t.label}
            note={t.note}
            ratio="4:3"
            dark
            noteClassName="mx-auto max-w-[600px]"
          >
            <CentrumEksportow />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
