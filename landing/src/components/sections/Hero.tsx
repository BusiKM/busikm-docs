import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { appLinks } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul1: string;
  tytul2: string;
  lead: string;
  proba: string;
  demo: string;
  nota: string;
  label: string;
  opis: string;
}> = {
  pl: {
    eyebrow: 'Busy 2,5–3,5 t · Transport krajowy i międzynarodowy',
    tytul1: 'Kierowca jedzie.',
    tytul2: 'Reszta dzieje się sama.',
    lead: 'Zlecenia, trasy, koszty, faktury i komplet dla księgowej — w jednym miejscu. Kierowca ma telefon w kieszeni, Ty masz robotę zrobioną.',
    proba: 'Wypróbuj 14 dni',
    demo: 'Zobacz demo',
    nota: 'Przez pierwsze 14 dni nie płacisz. Rezygnujesz jednym kliknięciem.',
    label: 'Ekran właściciela · desktop 1440',
    opis: 'Pulpit po zalogowaniu: trzy liczby u góry (przychód, koszty, zysk), mapa z trasą Warszawa → Mediolan, lista trzech zleceń ze statusami.',
  },
  en: {
    eyebrow: 'Vans 2.5–3.5 t · Domestic and international transport',
    tytul1: 'The driver drives.',
    tytul2: 'Everything else just happens.',
    lead: 'Orders, routes, costs, invoices and everything your accountant needs — in one place. Your driver keeps a phone in their pocket. You get the work done.',
    proba: 'Try 14 days free',
    demo: 'See the demo',
    nota: 'You pay nothing for the first 14 days. Cancel with one click.',
    label: 'Owner’s screen · desktop 1440',
    opis: 'Dashboard after signing in: three figures at the top (revenue, costs, profit), a map with the Warsaw → Milan route, a list of three orders with their status.',
  },
};

/** 6.1 — hero. Siatka i jedna świecąca trasa w tle, pulpit uniesiony nad stroną. */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
      />
      {/* Trasa w tle. Wysokość ograniczona, żeby krzywa nie rozciągnęła się
          na całą — bardzo wysoką — sekcję i nie wyprostowała w linię. */}
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-x-0 top-0 h-[820px] w-full lg:h-[1200px]"
        aria-hidden
      >
        <path
          d="M 220 980 C 520 720, 760 760, 940 480 S 1180 300, 1320 120"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="14"
          opacity=".05"
        />
        <path
          d="M 220 980 C 520 720, 760 760, 940 480 S 1180 300, 1320 120"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".18"
        />
        <circle cx="220" cy="980" r="5" fill="#0B5FFF" opacity=".35" />
        <circle cx="1320" cy="120" r="5" fill="#0B5FFF" opacity=".35" />
      </svg>

      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow data-reveal>{t.eyebrow}</Eyebrow>

        <h1
          data-reveal
          className="max-w-[980px] text-display-m font-bold text-balance lg:text-display"
        >
          {t.tytul1} <br className="hidden lg:inline" />
          {t.tytul2}
        </h1>

        <p
          data-reveal
          className="max-w-[700px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          {t.lead}
        </p>

        <div data-reveal className="flex flex-col gap-2.5 lg:mt-2 lg:items-center lg:gap-4">
          <div className="flex flex-col gap-2.5 lg:flex-row lg:gap-3">
            <Button href={appLinks.trial} fullWidth className="lg:w-auto">
              {t.proba}
            </Button>
            <Button href={appLinks.demo} variant="secondary" fullWidth className="lg:w-auto">
              {t.demo}
            </Button>
          </div>
          <p className="text-center text-[13px] text-muted lg:text-caption">
            {t.nota}
          </p>
        </div>
      </Container>

      <Container className="relative mt-16 pb-24 lg:mt-24 lg:pb-40">
        <div
          aria-hidden
          className="absolute right-[10%] bottom-35 left-[10%] h-30 rounded-[50%] bg-blue opacity-30 blur-[70px] lg:bottom-50 lg:h-50 lg:opacity-28 lg:blur-[120px]"
        />
        <div data-reveal className="relative">
          <MockupSlot
            file="mockup-hero-pulpit-desktop.png"
            label={t.label}
            note={t.opis}
            ratio="16:10"
            noteClassName="mx-auto max-w-[600px]"
          >
            <PulpitMockup />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
