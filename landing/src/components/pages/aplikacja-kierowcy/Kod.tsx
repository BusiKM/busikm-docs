import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EkranZlecenia } from '@/components/mockups/kierowca/EkranZlecenia';

/** 01 — wchodzi kodem. Mail z kodem, strzałka, ekran z listą zleceń. */
export function Kod() {
  return (
    <Section>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div
            data-reveal
            className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
          >
            01
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Wchodzi kodem, nie zakłada konta
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Wysyłasz zaproszenie, kierowca dostaje kod, ustawia własne hasło. Nie dzwoni
            do Ciebie z pytaniem, jaki ma login.
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-kierowca-zlecenia-phone.png"
            label="Lista zleceń · telefon, tryb nocny"
            note="Ekran po wejściu kodem: „Dziś” z dwoma zleceniami, poniżej zakończone, pasek zakładek u dołu."
            ratio="9:19.5"
            box="6:7"
          >
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-center lg:gap-8">
              <div className="flex w-[200px] flex-none flex-col gap-2 rounded-2xl border border-line bg-white p-4.5 text-[12px] shadow-card">
                <div className="text-muted">E-mail · BusiKM</div>
                <div className="leading-relaxed">Marek, Twój kod do BusiKM:</div>
                <div className="text-[26px] font-bold tracking-[0.12em]">482 190</div>
                <div className="text-muted">Wpisz go raz w aplikacji.</div>
              </div>

              <span aria-hidden className="flex-none text-[22px] text-blue">
                <span className="lg:hidden">↓</span>
                <span className="hidden lg:inline">→</span>
              </span>

              <EkranZlecenia />
            </div>
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
