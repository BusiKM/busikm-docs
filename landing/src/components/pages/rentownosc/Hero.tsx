import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { KartaZysku } from '@/components/mockups/KartaZysku';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul: [string, string];
  lead: string;
  label: string;
  note: string;
  zostaje: string;
  kwota: string;
  opis: string;
}> = {
  pl: {
    eyebrow: 'Ile zostaje',
    tytul: ['Wiesz, ile zostaje.', 'Na tym kursie. Dziś.'],
    lead: 'Fracht po kursie NBP minus paliwo, opłaty drogowe, nocleg, parking i diety kierowcy. Kierowca dodaje paragon w trasie – gdy paragon ma komplet danych, wynik przelicza się sam.',
    label: 'Karta zysku · desktop',
    note: 'Zlecenie Warszawa → München, zakładka Finanse: fracht w euro przeliczony po kursie NBP, koszty kursu w wierszach – paliwo, opłaty drogowe, parking – obok wynik, marża i zysk na kilometr.',
    zostaje: 'Zostaje',
    kwota: '3 699 zł',
    opis: 'z 1 020 € frachtu. Liczba zmieni się, gdy Jan doda kolejny paragon.',
  },
  en: {
    eyebrow: 'What you keep',
    tytul: ['You know what you keep.', 'On this job. Today.'],
    lead: 'Freight at the NBP rate minus fuel, tolls, the overnight stay, parking and the driver’s allowances. The driver adds a receipt on the road – once it has all its details, the result updates by itself.',
    label: 'Profit card · desktop',
    note: 'Order Warsaw → Munich, Finance tab: freight in euros converted at the NBP rate, run costs line by line – fuel, tolls, parking – with the result, margin and profit per kilometre alongside.',
    zostaje: 'You keep',
    kwota: 'PLN 3,699',
    opis: 'out of €1,020 in freight. The number will change when Jan adds the next receipt.',
  },
};

/**
 * Nagłówek strony – ciemny. Jedyne miejsce na landingu, w którym wolno
 * postawić naprawdę dużą liczbę: stoi obok karty, nie w niej.
 */
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
          className="max-w-[680px] text-lead-m text-pretty text-ink-muted lg:text-lead"
        >
          {t.lead}
        </p>
      </Container>

      <Container className="relative mt-16 grid gap-10 pb-24 lg:mt-24 lg:grid-cols-[520px_1fr] lg:items-center lg:gap-20 lg:pb-40">
        <div data-reveal className="relative">
          <div
            aria-hidden
            className="absolute right-[10%] bottom-5 left-[10%] h-25 bg-blue opacity-35 blur-[60px] lg:bottom-20 lg:h-40 lg:blur-[100px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-zysk-karta-desktop.png"
              label={t.label}
              note={t.note}
              ratio="4:3"
              dark
            >
              <KartaZysku />
            </MockupSlot>
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-2 lg:gap-3">
          <Eyebrow dark>{t.zostaje}</Eyebrow>
          <div className="text-[56px] leading-none font-bold tracking-[-0.04em] lg:text-[120px]">
            {t.kwota}
          </div>
          <p className="max-w-[460px] text-[16px] leading-relaxed text-ink-muted lg:text-lead">
            {t.opis}
          </p>
        </div>
      </Container>
    </section>
  );
}
