import { Section, Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TelefonyKierowcy } from '@/components/mockups/TelefonyKierowcy';

const points = [
  ['Nawigacja jest w środku', 'Trasa ze zlecenia prowadzi go od razu. Nie przeskakuje między aplikacjami'],
  ['Koszt jednym przyciskiem', 'Zatankował, pstryknął, jedzie dalej'],
  ['Działa bez zasięgu', 'Tunel, góry, terminal promowy. Wszystko dośle, gdy złapie sygnał'],
  ['Widzi, co czeka na wysłanie', 'Żadnego zgadywania, czy dane doszły'],
  ['Sześć języków', 'Kierowca czyta w swoim języku, nie w Twoim'],
  ['Tryb nocny', 'O trzeciej nad ranem ekran nie razi w oczy'],
] as const;

/** Odznaki sklepów rysowane, bez oficjalnych logotypów. */
function OdznakiSklepow() {
  return (
    <div className="flex gap-2.5 lg:gap-3">
      <div className="flex h-12 flex-1 items-center justify-center gap-2 rounded-btn border border-line-dark-2 px-4.5 lg:flex-none lg:justify-start lg:gap-2.5">
        <span aria-hidden className="size-4 rounded-[5px] bg-paper lg:size-4.5" />
        <div className="leading-tight">
          <div className="hidden text-[10px] text-ink-muted lg:block">Pobierz w</div>
          <div className="text-[13px] font-semibold lg:text-caption">App Store</div>
        </div>
      </div>
      <div className="flex h-12 flex-1 items-center justify-center gap-2 rounded-btn border border-line-dark-2 px-4.5 lg:flex-none lg:justify-start lg:gap-2.5">
        <span
          aria-hidden
          className="size-0 border-y-[8px] border-l-[14px] border-y-transparent border-l-paper lg:border-y-[9px] lg:border-l-[16px]"
        />
        <div className="leading-tight">
          <div className="hidden text-[10px] text-ink-muted lg:block">Pobierz z</div>
          <div className="text-[13px] font-semibold lg:text-caption">Google Play</div>
        </div>
      </div>
    </div>
  );
}

/** 6.6 — aplikacja kierowcy. Sekcja, która zdejmuje obiekcję „on tego nie ruszy". */
export function AplikacjaKierowcy() {
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
            <Eyebrow dark>BusiKM Kierowca · iPhone i Android</Eyebrow>
            <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
              Cały dzień pracy w jednej aplikacji.
            </h2>
            <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
              Kierowca dostaje kod, wpisuje go raz i jest w środku. Nie zakłada konta, nie wymyśla
              hasła, nie dzwoni do Ciebie z pytaniem, jak się zalogować.
            </p>
          </div>

          <div data-reveal-group className="grid gap-5 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-7">
            {points.map(([title, body]) => (
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

          <OdznakiSklepow />
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-kierowca-telefony-phone.png"
            label="Aplikacja kierowcy · telefon, tryb nocny"
            note="Lewy (−8°): nawigacja z trasą i kartą zlecenia u dołu. Prawy (+5°, z przodu): dodawanie kosztu ze zdjęciem paragonu."
            ratio="4:3"
            dark
          >
            <TelefonyKierowcy />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
