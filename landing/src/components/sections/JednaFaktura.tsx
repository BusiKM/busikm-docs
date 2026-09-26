import { Section, Eyebrow } from '@/components/ui/Section';
import { PlynaceKsztalty } from '@/components/motion/PlynaceKsztalty';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  dzis: string;
  paid: string[];
  zBusikm: string;
  puenta: string;
}> = {
  pl: {
    naglowek: 'Jedna faktura zamiast czterech.',
    dzis: 'Dziś płacisz osobno za:',
    paid: [
      'lokalizator w busie',
      'program do rozliczania czasu pracy',
      'system do zleceń i faktur',
      'arkusz, który prowadzisz sam',
    ],
    zBusikm: 'Z BusiKM:',
    puenta: 'Jedno konto. Jeden rachunek. Wszystko rozmawia ze sobą.',
  },
  en: {
    naglowek: 'One invoice instead of four.',
    dzis: 'Today you pay separately for:',
    paid: [
      'a tracker in the van',
      'working-time software',
      'a system for orders and invoices',
      'a spreadsheet you keep yourself',
    ],
    zBusikm: 'With BusiKM:',
    puenta: 'One account. One bill. Everything talks to everything else.',
  },
};

/** 6.17 — co to zastępuje. Bez nazw konkurencji i bez cudzych cen. */
export function JednaFaktura() {
  const t = TEKSTY[biezacyJezyk()];
  const paid = t.paid;
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:gap-20">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
          <div
            data-reveal
            className="flex flex-col gap-3 rounded-card border border-line p-6 lg:gap-5 lg:p-10"
          >
            <Eyebrow>{t.dzis}</Eyebrow>
            <div className="flex flex-col text-[16px] leading-relaxed lg:text-body">
              {paid.map((item, i) => (
                <div
                  key={item}
                  className={`py-2.5 lg:py-3.5 ${i < paid.length - 1 ? 'border-b border-line' : ''}`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/*
            Karta z animowanym tłem. `isolate` domyka kontekst nakładania,
            żeby płótno nie wychodziło poza zaokrąglone rogi, a treść siedzi
            nad nim w osobnej warstwie.
          */}
          <div
            data-reveal
            className="relative isolate flex min-h-64 flex-col justify-between gap-4 overflow-hidden rounded-card bg-ink p-6 text-paper lg:min-h-80 lg:gap-5 lg:p-10"
          >
            <PlynaceKsztalty />

            {/*
              Przyciemnienie tylko pod tekstem — nadtytuł u góry i zdanie
              u dołu. Środek karty zostaje odsłonięty, więc animacja ma gdzie
              grać. Bez tego jaśniejsza bryła podjeżdża pod litery i zbija
              kontrast poniżej progu; sprawdzane pomiarem pikseli.
            */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-ink from-0% via-transparent via-30% to-ink to-78%"
            />

            {/* Jaśniejszy niż zwykły nadtytuł na ciemnym: pod spodem
                pracuje animacja, a szarość #8E8E96 nie miała tu zapasu. */}
            <Eyebrow dark className="relative text-paper/80">
              {t.zBusikm}
            </Eyebrow>
            <div className="relative text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
              {t.puenta}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
