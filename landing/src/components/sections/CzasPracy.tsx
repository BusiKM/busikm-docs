import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PierscienieCzasu } from '@/components/mockups/PierscienieCzasu';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul1: string;
  tytul2: string;
  lead: string;
  bullets: string[];
  tacho: string;
  tachoOpis: string;
  label: string;
  opis: string;
}> = {
  pl: {
    tytul1: 'Wiesz, kiedy kierowca musi stanąć.',
    tytul2: 'Zanim stanie za późno.',
    lead: 'Jazda i praca liczą się same, przerwę kierowca włącza jednym przyciskiem. Kierowca dostaje przypomnienie 15 minut przed przerwą, nie po fakcie. Ty widzisz to samo, ze swojego biura.',
    bullets: [
      'Przerwę zapisze bez zasięgu – dojdzie, gdy wróci sygnał',
      'Miesięczna karta czasu pracy do wydruku',
      'Dni w każdym kraju liczone z trasy, nie z notatek',
    ],
    tacho: 'Tachograf zapisuje. BusiKM pokazuje.',
    tachoOpis: 'Tachograf jest wymagany i robi swoje – rejestruje. BusiKM go nie zastępuje i nie udaje. Jest po to, żeby kierowca widział na ekranie, ile jeszcze może jechać i kiedy musi stanąć. Wcześniej, a nie po fakcie.',
    label: 'Kierowcy, zakładka „Czas pracy” · desktop',
    opis: 'Lista kierowców z kolumnami: teraz, jazda dziś, do przerwy, tydzień, dwa tygodnie, powrót do domu i stan „W normie”; u góry kafle „W trasie teraz”, „Blisko limitu” i „Naruszenia”.',
  },
  en: {
    tytul1: 'You know when the driver has to stop.',
    tytul2: 'Before it’s too late.',
    lead: 'Driving and work time count themselves; the driver starts a break with one tap. The driver gets a reminder 15 minutes before a break is due, not after the fact. You see the same thing from your office.',
    bullets: [
      'Breaks logged with no signal – they go through once it’s back',
      'A monthly working-time sheet, ready to print',
      'Days in each country counted from the route, not from notes',
    ],
    tacho: 'The tachograph records. BusiKM shows.',
    tachoOpis: 'The tachograph is required and does its job – it records. BusiKM doesn’t replace it and doesn’t pretend to. It’s there so the driver can see on screen how much longer they can drive and when they have to stop. Ahead of time, not after the fact.',
    label: 'Drivers, “Working time” tab · desktop',
    opis: 'A list of drivers with columns for now, driving today, time to break, week, two weeks, home time and a “Within limits” status; tiles at the top for “On the road now”, “Close to the limit” and “Infringements”.',
  },
};

/** 6.10 – czas pracy. Na dole rozgraniczenie: tachograf zapisuje, BusiKM pokazuje. */
export function CzasPracy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:gap-14">
          <div className="flex flex-col gap-5 lg:gap-6">
            <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.tytul1} <br className="hidden lg:inline" />
              {t.tytul2}
            </h2>
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              {t.lead}
            </p>
            <Bullets dark items={t.bullets} />
          </div>

          <div
            data-reveal
            className="order-last flex flex-col gap-3 border-t border-line-dark pt-7 lg:order-none lg:gap-4 lg:pt-10"
          >
            <h3 className="text-[22px] font-semibold tracking-[-0.01em] lg:text-h3">
              {t.tacho}
            </h3>
            <p className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              {t.tachoOpis}
            </p>
          </div>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-czas-pracy-pierscienie-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
            dark
          >
            <PierscienieCzasu />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
