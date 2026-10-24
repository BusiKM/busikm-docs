import { Button } from '@/components/ui/Button';
import { appLinks } from '@/content/navigation';

import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  odnosnik: string;
}> = {
  pl: {
    naglowek: 'Zobacz BusiKM od środka. Bez konta.',
    lead: 'Prawdziwa aplikacja na danych przykładowej firmy transportowej. Przy wejściu wybierasz rolę – właściciel, dyspozytor albo księgowa – i klikasz, ile chcesz. Demo jest tylko do odczytu, więc niczego nie zepsujesz.',
    odnosnik: 'Wejdź do demo',
  },
  en: {
    naglowek: 'See BusiKM from the inside. No account.',
    lead: 'The real app, on a sample transport company’s data. When you enter, you pick a role – owner, dispatcher or accountant – and click around as much as you like. The demo is read-only, so you can’t break anything.',
    odnosnik: 'Enter the demo',
  },
};

/** 6.15 – demo. Ścieżka bez zobowiązań. */
export function Demo() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-18">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.lead}
          </p>
        </div>

        {/*
          Dawniej stał tu duży zrzut pulpitu owinięty w odnośnik do /demo.
          Wyglądał jak obraz do powiększenia, a przenosił do formularza
          zapisu. Pulpit widać już w hero, więc tu wystarcza jasny przycisk –
          prosto do demo w aplikacji.
        */}
        <div data-reveal>
          <Button href={appLinks.demo} fullWidth className="lg:w-auto">
            {t.odnosnik}
          </Button>
        </div>
      </div>
    </Section>
  );
}
