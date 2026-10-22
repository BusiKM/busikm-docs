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
    naglowek: 'Wchodzi kodem z maila',
    tresc:
      'Wysyłasz zaproszenie, kierowca dostaje mailem kod. W aplikacji wybiera „Mam zaproszenie”, wpisuje e-mail i kod, potem własne hasło – imię i nazwisko tylko wtedy, gdy ich nie wpisałeś. Następnym razem loguje się e-mailem i hasłem. Nie dzwoni do Ciebie z pytaniem, jaki ma login.',
    label: 'Zlecenia · telefon, tryb nocny',
    note: 'Lista „Zlecenia” z zakładkami Aktywne, Oczekujące i Zakończone: kurs Wrocław → Milano „W trasie”, pasek zakładek u dołu.',
    mail: 'E-mail · BusiKM',
    powitanie: 'Marek, Twój kod zaproszenia do BusiKM:',
    kod: 'K7QM-4RTZ',
    wpisz: 'W aplikacji wybierz „Mam zaproszenie”.',
  },
  en: {
    naglowek: 'In with a code from the email',
    tresc:
      'You send an invite and the driver gets a code by email. In the app they choose “I have an invitation”, enter their email and the code, then their own password – and their name only if you haven’t entered it. After that they sign in with email and password. No calls to you asking what their login is.',
    label: 'Orders · phone, dark mode',
    note: 'The “Orders” list with Active, Pending and Finished tabs: the Wrocław → Milan job “On the road”, tab bar at the bottom.',
    mail: 'Email · BusiKM',
    powitanie: 'Marek, your BusiKM invitation code:',
    kod: 'K7QM-4RTZ',
    wpisz: 'In the app, choose “I have an invitation”.',
  },
};

/** 01 – wchodzi kodem. Mail z kodem, strzałka, ekran z listą zleceń. */
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
            // Ta sama wartość, co w blokach niżej – pliki mają identyczny
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
