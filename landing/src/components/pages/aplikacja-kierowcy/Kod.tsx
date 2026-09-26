import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { EkranZlecenia } from '@/components/mockups/kierowca/EkranZlecenia';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  tresc: string;
  label: string;
  note: string;
  mail: string;
  powitanie: string;
  kod: string;
  wpisz: string;
}> = {
  pl: {
    naglowek: 'Wchodzi kodem, nie zakłada konta',
    tresc:
      'Wysyłasz zaproszenie, kierowca dostaje kod, ustawia własne hasło. Nie dzwoni do Ciebie z pytaniem, jaki ma login.',
    label: 'Lista zleceń · telefon, tryb nocny',
    note: 'Ekran po wejściu kodem: „Dziś” z dwoma zleceniami, poniżej zakończone, pasek zakładek u dołu.',
    mail: 'E-mail · BusiKM',
    powitanie: 'Marek, Twój kod do BusiKM:',
    kod: '482 190',
    wpisz: 'Wpisz go raz w aplikacji.',
  },
  en: {
    naglowek: 'In with a code, no account to set up',
    tresc:
      'You send an invite, the driver gets a code and sets their own password. No calls to you asking what their login is.',
    label: 'Order list · phone, dark mode',
    note: 'The screen after signing in with the code: “Today” with two orders, finished ones below, tab bar at the bottom.',
    mail: 'Email · BusiKM',
    powitanie: 'Marek, your BusiKM code:',
    kod: '482 190',
    wpisz: 'Enter it once in the app.',
  },
};

/** 01 — wchodzi kodem. Mail z kodem, strzałka, ekran z listą zleceń. */
export function Kod() {
  const t = TEKSTY[biezacyJezyk()];
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
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-kierowca-zlecenia-phone.png"
            label={t.label}
            note={t.note}
            ratio="9:19.5"
            box="6:7"
            // Ta sama wartość, co w blokach niżej — pliki mają identyczny
            // kadr, w którym telefon zajmuje 30% szerokości. Bez tego wychodzi
            // szeroki na 156 px w kolumnie mającej 520.
            imageScale={1.8}
            imageScaleTelefon={1.8}
          >
            <div className="flex flex-col items-center gap-5 lg:flex-row lg:justify-center lg:gap-8">
              <div className="flex w-[200px] flex-none flex-col gap-2 rounded-2xl border border-line bg-white p-4.5 text-[12px] shadow-card">
                <div className="text-muted">{t.mail}</div>
                <div className="leading-relaxed">{t.powitanie}</div>
                <div className="text-[26px] font-bold tracking-[0.12em]">{t.kod}</div>
                <div className="text-muted">{t.wpisz}</div>
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
