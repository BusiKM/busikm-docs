'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { appLinks } from '@/content/navigation';

type Krok = {
  tytul: string;
  tresc: string;
  czas: string;
  /**
   * Przycisk stoi tylko przy kroku, który da się zrobić z tej strony. Pozostałe
   * wymagają zalogowania, więc przycisk z ich nazwą prowadziłby donikąd —
   * mówi o tym zdanie pod listą.
   */
  akcja?: { label: string; href: string };
};

const kroki: Krok[] = [
  {
    tytul: 'Załóż konto',
    tresc: 'Adres e-mail i nazwa firmy. Reszta danych potem.',
    czas: '2 minuty',
    akcja: { label: 'Załóż konto', href: appLinks.trial },
  },
  {
    tytul: 'Dodaj pierwszy pojazd',
    tresc:
      'Numer rejestracyjny i to wszystko. Ubezpieczenie i przegląd dopiszesz, kiedy będziesz miał pod ręką.',
    czas: '1 minuta',
  },
  {
    tytul: 'Zaproś kierowcę',
    tresc:
      'Wpisujesz imię i numer telefonu, kierowca dostaje kod. Instaluje aplikację i ustawia własne hasło.',
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
      'Zdjęcie licznika, „Rozpocznij trasę”. Od tego momentu trasa, czas pracy i koszty zapisują się same.',
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
    tresc: 'Ze zlecenia, jednym kliknięciem. Plik idzie na mail klienta i do systemu e-faktur.',
    czas: 'minuta',
  },
];

/**
 * Siedem kroków jako lista do odhaczania, nie artykuł — to ten sam materiał,
 * którego używa checklista w aplikacji. Odhaczenie żyje w tej karcie i niczego
 * nie zapisuje; służy do trzymania miejsca w trakcie czytania.
 */
export function Kroki() {
  const [odhaczone, setOdhaczone] = useState<number[]>([]);

  const przelacz = (i: number) =>
    setOdhaczone((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  return (
    <section className="bg-paper px-6 pb-24 lg:px-12 lg:pb-32">
      <Container className="flex flex-col">
        {kroki.map((k, i) => {
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
                  aria-label={`Odhacz krok ${i + 1}: ${k.tytul}`}
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
                    href={k.akcja.href}
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
          <span>
            Odhaczone: {odhaczone.length} z {kroki.length} · ta sama lista jest w aplikacji
            po zalogowaniu, razem z przyciskiem do każdego kroku
          </span>
          {odhaczone.length > 0 && (
            <button
              type="button"
              onClick={() => setOdhaczone([])}
              className="cursor-pointer underline underline-offset-4 hover:text-ink"
            >
              wyczyść
            </button>
          )}
        </div>
      </Container>
    </section>
  );
}
