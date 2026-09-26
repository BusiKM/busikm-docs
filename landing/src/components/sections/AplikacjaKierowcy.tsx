import { Section, Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TelefonyKierowcy } from '@/components/mockups/TelefonyKierowcy';
import { StoreBadges } from '@/components/ui/StoreBadges';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Punkt = readonly [string, string];

const PUNKTY: Tlumaczenia<readonly Punkt[]> = {
  pl: [
    ['Nawigacja jest w środku', 'Trasa ze zlecenia prowadzi go od razu. Nie przeskakuje między aplikacjami'],
    ['Koszt jednym przyciskiem', 'Zatankował, pstryknął, jedzie dalej'],
    ['Działa bez zasięgu', 'Tunel, góry, terminal promowy. Wszystko dośle, gdy złapie sygnał'],
    ['Widzi, co czeka na wysłanie', 'Żadnego zgadywania, czy dane doszły'],
    ['Sześć języków', 'Kierowca czyta w swoim języku, nie w Twoim'],
    ['Tryb nocny', 'O trzeciej nad ranem ekran nie razi w oczy'],
  ],
  en: [
    ['Navigation built in', 'The route from the order guides them straight away. No jumping between apps'],
    ['A cost in one tap', 'Filled up, snapped the receipt, back on the road'],
    ['Works without signal', 'Tunnel, mountains, ferry terminal. It all goes through once there’s signal again'],
    ['Sees what’s waiting to send', 'No guessing whether the data got through'],
    ['Six languages', 'The driver reads in their language, not yours'],
    ['Night mode', 'At three in the morning the screen doesn’t dazzle'],
  ],
};

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  lead: string;
  label: string;
  opis: string;
}> = {
  pl: {
    eyebrow: 'BusiKM Kierowca · iPhone i Android',
    naglowek: 'Cały dzień pracy w jednej aplikacji.',
    lead: 'Kierowca dostaje kod, wpisuje go raz i jest w środku. Nie zakłada konta, nie wymyśla hasła, nie dzwoni do Ciebie z pytaniem, jak się zalogować.',
    label: 'Aplikacja kierowcy · telefon, tryb nocny',
    opis: 'Lewy (−8°): nawigacja z trasą i kartą zlecenia u dołu. Prawy (+5°, z przodu): dodawanie kosztu ze zdjęciem paragonu.',
  },
  en: {
    eyebrow: 'BusiKM Driver · iPhone and Android',
    naglowek: 'The whole working day in one app.',
    lead: 'The driver gets a code, enters it once and they’re in. No account to set up, no password to think up, no calling you to ask how to log in.',
    label: 'Driver app · phone, night mode',
    opis: 'Left (−8°): navigation with the route and the order card at the bottom. Right (+5°, in front): adding a cost with a photo of the receipt.',
  },
};

/** 6.6 — aplikacja kierowcy. Sekcja, która zdejmuje obiekcję „on tego nie ruszy". */
export function AplikacjaKierowcy() {
  const jezyk = biezacyJezyk();
  const t = TEKSTY[jezyk];
  return (
    <Section tone="ink">
      <svg
        viewBox="0 0 1440 1400"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 size-full"
        aria-hidden
      >
        <path
          d="M 1500 300 C 1200 500, 1000 900, 700 1000 S 200 1100, -100 1300"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="40"
          opacity=".04"
        />
        <path
          d="M 1500 300 C 1200 500, 1000 900, 700 1000 S 200 1100, -100 1300"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".14"
        />
      </svg>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-8 lg:gap-10">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Eyebrow dark>{t.eyebrow}</Eyebrow>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              {t.naglowek}
            </h2>
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              {t.lead}
            </p>
          </div>

          <div data-reveal-group className="grid gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-7">
            {PUNKTY[jezyk].map(([title, body]) => (
              <div key={title} data-reveal className="flex gap-3.5">
                <span
                  aria-hidden
                  className="hidden size-7 flex-none items-center justify-center rounded-lg border border-line-dark-2 lg:flex"
                >
                  <span className="size-2 rounded-full bg-blue" />
                </span>
                <div>
                  <div className="text-[16px] font-semibold lg:text-body">{title}</div>
                  <div className="mt-1 text-[14px] leading-relaxed text-ink-muted lg:text-[15px]">
                    {body}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <StoreBadges />
        </div>

        {/*
          Odstęp u góry tylko na telefonie i wynika wprost z powiększenia.
          Skala działa w obie strony, więc zrzut wychodzi ponad swoje pudło
          o (368 − 245) / 2 ≈ 61 px i wchodził w odznaki sklepów. `mt-16`
          oddaje mu dokładnie te 64 px.

          Na desktopie makieta stoi w osobnej kolumnie i nie ma czego
          podchodzić, więc odstęp znika.
        */}
        <div data-reveal className="mt-16 lg:mt-0">
          <MockupSlot
            file="mockup-kierowca-telefony-phone.png"
            label={t.label}
            note={t.opis}
            ratio="4:3"
            // Dwa telefony zajmują 67% szerokości kadru — reszta to pusty
            // margines pliku. Powiększenie mieści się w kolumnie właśnie
            // dlatego, że widoczna treść jest węższa od pudła.
            imageScale={1.55}
            // Na telefonie 1,5 zamiast 1,55: przy 327 px pudła treść urasta
            // wtedy do 327 px, czyli dokładnie na szerokość ekranu bez marginesu
            // ujemnego. Wyliczone z udziału treści w kadrze, nie dobrane.
            imageScaleTelefon={1.5}
            dark
          >
            <TelefonyKierowcy />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
