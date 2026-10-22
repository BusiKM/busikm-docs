'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { appLinks } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';
import { lokalizuj } from '@/i18n/trasy';

type Krok = {
  tytul: string;
  tresc: string;
  czas: string;
  /**
   * Przycisk stoi tylko przy kroku, który da się zrobić z tej strony. Pozostałe
   * wymagają zalogowania, więc przycisk z ich nazwą prowadziłby donikąd –
   * mówi o tym zdanie pod listą.
   */
  akcja?: { label: string; href: string };
};

const TEKSTY: Tlumaczenia<{
  odhacz: (nr: number, tytul: string) => string;
  stan: (zrobione: number, wszystkie: number) => string;
  wyczysc: string;
}> = {
  pl: {
    odhacz: (nr, tytul) => `Odhacz krok ${nr}: ${tytul}`,
    stan: (zrobione, wszystkie) =>
      `Odhaczone: ${zrobione} z ${wszystkie} · ta sama lista jest w aplikacji po zalogowaniu, razem z przyciskiem do każdego kroku`,
    wyczysc: 'wyczyść',
  },
  en: {
    odhacz: (nr, tytul) => `Tick off step ${nr}: ${tytul}`,
    stan: (zrobione, wszystkie) =>
      `Ticked off: ${zrobione} of ${wszystkie} · the same list is in the app once you sign in, with a button for each step`,
    wyczysc: 'clear',
  },
};

const kroki: Tlumaczenia<Krok[]> = {
  pl: [
    {
      tytul: 'Załóż konto',
      tresc:
        'Zaczynasz od NIP-u – nazwę i adres firmy pobierzemy z rejestru. Potem imię, e-mail i hasło. Konta otwieramy na razie osobom z listy – zapisz się, a damy znać.',
      czas: '2 minuty',
      akcja: { label: 'Zapisz się na listę', href: appLinks.login },
    },
    {
      tytul: 'Dodaj pierwszy pojazd',
      tresc:
        'Zdjęcie dowodu rejestracyjnego – numer, marka, model i rok wpiszą się same. Możesz też przepisać je ręcznie. Polisę dodasz, kiedy będziesz miał ją pod ręką.',
      czas: '1 minuta',
    },
    {
      tytul: 'Zaproś kierowcę',
      tresc:
        'Dodajesz kierowcę w module Kierowcy, a on dostaje mailem kod zaproszenia i odnośnik do aplikacji. W aplikacji wybiera „Mam zaproszenie”, wpisuje e-mail i kod, ustawia hasło.',
      czas: '2 minuty',
    },
    {
      tytul: 'Wprowadź pierwsze zlecenie',
      tresc: 'Kontrahent, fracht, załadunek, rozładunek. Przypisz kierowcę i pojazd.',
      czas: '3 minuty',
    },
    {
      tytul: 'Kierowca rusza',
      tresc:
        'Zdjęcie licznika i „Zacznij dzień”. Od tego momentu trasa, czas pracy i koszty zapisują się same.',
      czas: 'po jego stronie',
    },
    {
      tytul: 'Sprawdź, co się zebrało',
      tresc:
        'Po zakończeniu kursu masz kilometry, godziny, paragony i marżę. Nic z tego nie wpisywałeś.',
      czas: 'minuta',
    },
    {
      tytul: 'Wystaw fakturę',
      tresc:
        'Ze zlecenia, jednym przyciskiem do KSeF. Wysyłkę do klienta zlecasz od razu – PDF z kodem QR pójdzie na jego mail, gdy KSeF nada numer.',
      czas: 'minuta',
    },
  ],
  en: [
    {
      tytul: 'Create an account',
      tresc:
        'You start with your tax ID (NIP) – we fetch the company name and address from the register. Then your name, email and password. For now we open accounts for people on the list – join it and we’ll let you know.',
      czas: '2 minutes',
      akcja: { label: 'Join the list', href: appLinks.login },
    },
    {
      tytul: 'Add your first vehicle',
      tresc:
        'A photo of the registration certificate – the number, make, model and year fill themselves in. You can also type them in. Add the insurance policy when you have it to hand.',
      czas: '1 minute',
    },
    {
      tytul: 'Invite a driver',
      tresc:
        'You add the driver in the Drivers module and they get an invitation code by email, with a link to the app. In the app they tap “I have an invitation” (Mam zaproszenie), enter their email and the code, and set a password.',
      czas: '2 minutes',
    },
    {
      tytul: 'Enter your first order',
      tresc: 'Client, freight rate, loading, unloading. Assign a driver and a vehicle.',
      czas: '3 minutes',
    },
    {
      tytul: 'The driver sets off',
      tresc:
        'A photo of the odometer, then “Start the day” (Zacznij dzień). From then on the route, working time and costs record themselves.',
      czas: 'on their side',
    },
    {
      tytul: 'Check what’s been collected',
      tresc:
        'When the job is done you have the kilometres, hours, receipts and margin. You didn’t type in any of it.',
      czas: '1 minute',
    },
    {
      tytul: 'Issue the invoice',
      tresc:
        'From the order, with one button to KSeF, Poland’s national e-invoicing system. You send it to the client straight away – the PDF with a QR code goes to their inbox once KSeF assigns the number.',
      czas: '1 minute',
    },
  ],
};

/**
 * Siedem kroków jako lista do odhaczania, nie artykuł – to ten sam materiał,
 * którego używa checklista w aplikacji. Odhaczenie żyje w tej karcie i niczego
 * nie zapisuje; służy do trzymania miejsca w trakcie czytania.
 */
export function Kroki() {
  const jezyk = useJezyk();
  const t = TEKSTY[jezyk];
  const lista = kroki[jezyk];
  const [odhaczone, setOdhaczone] = useState<number[]>([]);

  const przelacz = (i: number) =>
    setOdhaczone((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <section className="bg-paper px-6 pb-24 lg:px-12 lg:pb-32">
      <Container className="flex flex-col">
        {lista.map((k, i) => {
          const zrobiony = odhaczone.includes(i);
          return (
            <div
              key={k.tytul}
              className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-3 border-t border-line py-7 lg:grid-cols-[120px_1fr_200px] lg:gap-10 lg:py-10"
            >
              <div className="flex items-center gap-3 lg:gap-4">
                <button
                  type="button"
                  onClick={() => przelacz(i)}
                  aria-pressed={zrobiony}
                  aria-label={t.odhacz(i + 1, k.tytul)}
                  className={`flex size-8 flex-none cursor-pointer items-center justify-center rounded-full border-2 text-[15px] font-bold text-white transition-colors ${
                    zrobiony ? 'border-blue bg-blue' : 'border-line-strong'
                  }`}
                >
                  {zrobiony ? '✓' : ''}
                </button>
                <span
                  className={`text-[28px] leading-none font-bold tracking-[-0.03em] lg:text-[40px] ${
                    zrobiony ? 'text-line-strong' : 'text-ink'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <div className="col-span-2 flex flex-col gap-2.5 lg:col-span-1">
                <div
                  className={`text-h3-m font-semibold tracking-[-0.01em] lg:text-h3 ${
                    zrobiony ? 'text-muted line-through' : ''
                  }`}
                >
                  {k.tytul}
                </div>
                <div className="max-w-[640px] text-[16px] leading-relaxed text-muted lg:text-body">
                  {k.tresc}
                </div>
              </div>

              <div className="col-span-2 flex items-center gap-4 lg:col-span-1 lg:flex-col lg:items-end lg:gap-3">
                <span className="text-[14px] whitespace-nowrap text-muted">{k.czas}</span>
                {k.akcja && (
                  <a
                    href={lokalizuj(k.akcja.href, jezyk)}
                    className="flex h-10 items-center rounded-btn border border-line bg-white px-4 text-[14px] font-semibold whitespace-nowrap text-ink transition-colors hover:border-blue hover:text-blue"
                  >
                    {k.akcja.label}
                  </a>
                )}
              </div>
            </div>
          );
        })}

        <div className="border-t border-line" />

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 pt-6 text-[14px] text-muted">
          <span>{t.stan(odhaczone.length, lista.length)}</span>
          {odhaczone.length > 0 && (
            <button
              type="button"
              onClick={() => setOdhaczone([])}
              className="cursor-pointer underline underline-offset-4 hover:text-ink"
            >
              {t.wyczysc}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
