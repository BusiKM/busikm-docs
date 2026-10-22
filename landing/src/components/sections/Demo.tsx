import { Button } from '@/components/ui/Button';

import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  lead: string;
  odnosnik: string;
}> = {
  pl: {
    naglowek: 'Demo przygotowujemy. Zostaw adres.',
    lead: 'Prawdziwa aplikacja z danymi przykładowej firmy transportowej. Przy wejściu wybierasz rolę: właściciel, dyspozytor albo księgowa. Demo jest tylko do odczytu. Napiszemy w dniu, w którym ruszy – razem z 14 dniami bez opłat.',
    odnosnik: 'Zapisz się po dostęp do demo',
  },
  en: {
    naglowek: 'The demo is on its way. Leave your email.',
    lead: 'The real app, filled with a sample transport company’s data. When you enter, you pick a role: owner, dispatcher or accountant. The demo is read-only. We’ll write to you the day it goes live – along with 14 days free.',
    odnosnik: 'Sign up for demo access',
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
          zapisu – czytelnik klikał, żeby zobaczyć ekran, i lądował gdzie
          indziej. Pulpit widać już w hero, więc tu wystarcza jasny przycisk.
        */}
        <div data-reveal>
          <Button href="/demo" fullWidth className="lg:w-auto">
            {t.odnosnik}
          </Button>
        </div>
      </div>
    </Section>
  );
}
