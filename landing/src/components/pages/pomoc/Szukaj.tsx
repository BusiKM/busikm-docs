'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';

type Kategoria = {
  nazwa: string;
  opis: string;
  /** Hasła, po których ta kategoria ma się znaleźć w wyszukiwaniu. */
  hasla: string[];
  href?: string;
};

const kategorie: Kategoria[] = [
  {
    nazwa: 'Pierwsze kroki',
    opis: 'Od założenia konta do pierwszej wystawionej faktury',
    hasla: ['konto', 'rejestracja', 'start', 'pojazd', 'zaproszenie', 'pierwsza faktura'],
    href: '/pomoc/pierwsze-kroki',
  },
  {
    nazwa: 'Kierowcy',
    opis: 'Zaproszenie, aplikacja, trasy, paragony, czas pracy',
    hasla: ['kierowca', 'aplikacja', 'kod', 'trasa', 'nawigacja', 'paragon', 'przerwa', 'czas pracy'],
  },
  {
    nazwa: 'Rozliczenia i księgowość',
    opis: 'Eksporty, formaty, zamknięcie miesiąca, diety',
    hasla: ['eksport', 'księgowa', 'faktura', 'optima', 'insert', 'symfonia', 'dieta', 'zamknięcie miesiąca', 'waluta', 'kurs'],
  },
  {
    nazwa: 'Konto i płatności',
    opis: 'Plan, faktura za BusiKM, użytkownicy, rezygnacja',
    hasla: ['plan', 'cennik', 'płatność', 'rezygnacja', 'użytkownik', 'zmiana planu', 'nip'],
  },
];

const popularne = ['jak dodać kierowcę', 'eksport dla księgowej', 'zmiana planu'];

function pasuje(k: Kategoria, fraza: string) {
  const f = fraza.trim().toLowerCase();
  if (!f) return true;
  return [k.nazwa, k.opis, ...k.hasla].some((t) => t.toLowerCase().includes(f));
}

function LupaIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="pointer-events-none absolute left-5 size-6 text-muted lg:left-7"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

/**
 * Wyszukiwarka i cztery kategorie w jednej całości — pole filtruje karty
 * na żywo, więc wpisanie czegokolwiek daje odpowiedź od razu, bez przeładowania.
 *
 * Kategorie bez adresu nie są odnośnikami. Dopóki nie ma za nimi artykułów,
 * karta, która wygląda jak odnośnik i nigdzie nie prowadzi, jest gorsza
 * niż karta, która o to nie prosi.
 */
export function Szukaj() {
  const [fraza, setFraza] = useState('');
  const widoczne = kategorie.filter((k) => pasuje(k, fraza));

  return (
    <section className="bg-paper px-6 pt-20 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-5 lg:gap-6">
          <Eyebrow>Pomoc</Eyebrow>
          <h1 data-reveal className="text-display-m font-bold text-balance lg:text-display">
            W czym pomóc?
          </h1>
        </div>

        <div data-reveal className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <LupaIcon />
            <input
              type="search"
              value={fraza}
              onChange={(e) => setFraza(e.target.value)}
              placeholder="Wpisz, czego szukasz — np. faktura, przerwa, eksport"
              aria-label="Szukaj w pomocy"
              className="h-16 w-full rounded-card border border-line bg-white pr-5 pl-14 text-[17px] shadow-card outline-none placeholder:text-muted focus:border-blue lg:h-22 lg:pl-18 lg:text-lead"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[14px] lg:text-caption">
            <span className="text-muted">Najczęściej szukane:</span>
            {popularne.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFraza(p.replace(/^jak /, ''))}
                className="cursor-pointer rounded-full bg-mist px-3.5 py-2 transition-colors hover:bg-line"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div data-reveal-group className="grid gap-2.5 lg:grid-cols-2 lg:gap-4">
          {widoczne.map((k) => {
            const tresc = (
              <>
                <div className="text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">
                  {k.nazwa}
                </div>
                <div className="text-[15px] leading-relaxed text-muted lg:text-body">{k.opis}</div>
              </>
            );

            return k.href ? (
              <Link
                key={k.nazwa}
                href={k.href}
                data-reveal
                className="flex min-h-36 flex-col gap-3 rounded-card border border-line bg-white p-6 text-ink shadow-card transition-colors hover:border-blue lg:p-8"
              >
                {tresc}
                <div className="mt-auto text-[14px] font-semibold text-blue lg:text-[15px]">
                  {k.href} →
                </div>
              </Link>
            ) : (
              <div
                key={k.nazwa}
                data-reveal
                className="flex min-h-36 flex-col gap-3 rounded-card border border-dashed border-line bg-white/50 p-6 lg:p-8"
              >
                {tresc}
                <div className="mt-auto text-[14px] text-muted lg:text-[15px]">
                  Artykuły w przygotowaniu — napisz do nas, odpowiemy od ręki.
                </div>
              </div>
            );
          })}

          {widoczne.length === 0 && (
            <p className="text-[16px] leading-relaxed text-muted lg:col-span-2 lg:text-body">
              Nic nie pasuje do „{fraza}". Napisz do nas — odpisujemy tego samego dnia
              roboczego.
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
