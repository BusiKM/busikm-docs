import { Section } from '@/components/ui/Section';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Czy termin jest daleko – kolor zielony. Kolejność jak w `dokumenty` niżej. */
const DALEKO = [false, false, false, true] as const;

const TEKSTY: Tlumaczenia<{
  trasa: { naglowek: string; tresc: string };
  bezZlecenia: string;
  przejazd: string;
  /** Rodzaj trasy bez zlecenia – dwie pigułki przed przyciskiem startu. */
  sluzbowa: string;
  prywatna: string;
  potwierdz: string;
  dok: { naglowek: string; tresc: string };
  dokumenty: readonly (readonly [string, string])[];
}> = {
  pl: {
    trasa: {
      naglowek: 'Trasa poza zleceniem',
      tresc:
        'Dojazd do bazy i przejazd do serwisu też się liczą. „Trasa bez zlecenia”: służbowa albo prywatna, „Rozpocznij trasę” i „Zakończ trasę”. Na prywatną przerwę zapis trasy wstrzymasz jednym przyciskiem.',
    },
    bezZlecenia: 'Trasa bez zlecenia',
    przejazd: 'Milano → serwis, Bergamo',
    sluzbowa: 'Służbowa',
    prywatna: 'Prywatna',
    potwierdz: 'Rozpocznij trasę',
    dok: {
      naglowek: 'Jego dokumenty w telefonie',
      tresc:
        '„Moje dokumenty”: prawo jazdy, świadectwo kwalifikacji, badania, karta kierowcy – każdy z datą ważności. Aplikacja przypomina o terminach jemu i Tobie. Do tego dokumenty zlecenia, CMR i WZ, pod ręką w trasie.',
    },
    dokumenty: [
      ['Prawo jazdy · B', '3 lata'],
      ['Badania lekarskie', '41 dni'],
      ['Badania psychologiczne', '41 dni'],
      ['Świadectwo kwalifikacji', '2 lata'],
    ],
  },
  en: {
    trasa: {
      naglowek: 'Trips outside an order',
      tresc:
        'Driving to the depot or over to the garage counts too. “Trip without an order”: business or private, then start the trip and finish it. For a private break, one button pauses route recording.',
    },
    bezZlecenia: 'Trip without an order',
    przejazd: 'Milan → garage, Bergamo',
    sluzbowa: 'Business',
    prywatna: 'Private',
    potwierdz: 'Start trip',
    dok: {
      naglowek: 'Their documents on the phone',
      tresc:
        '“My documents”: driving licence, driver CPC, medicals and the tachograph card – each with its expiry date. The app reminds both of you when they’re due. Plus the order documents, CMR and delivery notes, to hand on the road.',
    },
    dokumenty: [
      ['Driving licence · B', '3 years'],
      ['Medical check', '41 days'],
      ['Psychological assessment', '41 days'],
      ['Driver CPC (Code 95)', '2 years'],
    ],
  },
};

/** 07 i 08 – dwie karty obok siebie. */
export function TrasaIDokumenty() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <div
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-panel bg-mist p-7 lg:gap-10 lg:p-14"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
              07
            </div>
            <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.trasa.naglowek}
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.trasa.tresc}
            </p>
          </div>

          <div className="flex flex-col gap-3.5 rounded-card bg-ink p-6 text-caption text-paper">
            <div className="flex justify-between text-ink-muted">
              <span>{t.bezZlecenia}</span>
              <span>16:40</span>
            </div>
            <div className="flex justify-between gap-3">
              <span>{t.przejazd}</span>
              <b>48 km</b>
            </div>
            <div className="flex gap-2.5">
              <span className="flex-1 rounded-xl bg-surface-2 py-3.5 text-center">{t.sluzbowa}</span>
              <span className="flex-1 rounded-xl bg-surface-2 py-3.5 text-center">{t.prywatna}</span>
              <span className="flex-1 rounded-xl bg-blue py-3.5 text-center font-semibold text-white">
                {t.potwierdz}
              </span>
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="flex flex-col justify-between gap-8 rounded-panel bg-mist p-7 lg:gap-10 lg:p-14"
        >
          <div className="flex flex-col gap-4 lg:gap-5">
            <div className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption">
              08
            </div>
            <h2 className="text-h2-m font-semibold text-balance lg:text-h2">
              {t.dok.naglowek}
            </h2>
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.dok.tresc}
            </p>
          </div>

          <div className="flex flex-col rounded-card bg-ink p-6 text-caption text-paper">
            {t.dokumenty.map(([name, left], i) => (
              <div
                key={name}
                className={`flex justify-between gap-3 py-3 ${
                  i < t.dokumenty.length - 1 ? 'border-b border-line-dark' : ''
                }`}
              >
                <span>{name}</span>
                <span className={DALEKO[i] ? 'text-green' : 'text-ink-muted'}>{left}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
