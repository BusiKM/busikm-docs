'use client';

import { useMemo, useState } from 'react';
import Link from '@/i18n/Link';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import type { GrupaWyszukiwarki } from '@/content/pomoc';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  placeholder: string;
  etykietaPola: string;
  popularneEtykieta: string;
  popularne: string[];
  wyczysc: string;
  startTytul: string;
  startOpis: string;
  startAkcja: string;
  brak: (fraza: string) => string;
}> = {
  pl: {
    eyebrow: 'Pomoc',
    naglowek: 'W czym pomóc?',
    placeholder: 'Wpisz, czego szukasz — np. faktura, przerwa, eksport',
    etykietaPola: 'Szukaj w pomocy',
    popularneEtykieta: 'Najczęściej szukane:',
    popularne: ['kierowca', 'faktura', 'eksport', 'paragon', 'przerwa'],
    wyczysc: 'Wyczyść',
    startTytul: 'Dopiero zaczynasz?',
    startOpis: 'Siedem kroków od konta do pierwszej faktury, do odhaczania po kolei.',
    startAkcja: 'Przejdź listę →',
    brak: (fraza) =>
      `Nic nie pasuje do „${fraza}”. Napisz do nas — odpisujemy tego samego dnia roboczego.`,
  },
  en: {
    eyebrow: 'Help',
    naglowek: 'How can we help?',
    placeholder: 'Type what you’re looking for — e.g. invoice, break, export',
    etykietaPola: 'Search help',
    popularneEtykieta: 'Most searched:',
    popularne: ['driver', 'invoice', 'export', 'receipt', 'break'],
    wyczysc: 'Clear',
    startTytul: 'Just getting started?',
    startOpis: 'Seven steps from account to first invoice, to tick off one by one.',
    startAkcja: 'Go through the list →',
    brak: (fraza) =>
      `Nothing matches “${fraza}”. Write to us — we reply the same working day.`,
  },
};

function pasujeDoFrazy(indeks: string, fraza: string): boolean {
  const f = fraza.trim().toLowerCase();
  if (!f) return true;
  return indeks.includes(f);
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
 * Wyszukiwarka i spis artykułów.
 *
 * Pole filtruje listę na żywo, bez przeładowania — ktoś tu trafia
 * zniecierpliwiony i pierwsze, co widzi, ma być drogą do odpowiedzi.
 *
 * Kategorie bez trafień znikają w całości. Zwijanie pustego działu zamiast
 * pokazywania nagłówka nad niczym jest tu ważniejsze niż stabilność układu:
 * po wpisaniu „paragon" mają zostać dwa artykuły, a nie sześć nagłówków
 * i dwa artykuły.
 *
 * Artykuły przychodzą z serwera już w języku strony (`grupyWyszukiwarki`),
 * razem z indeksem — do przeglądarki nie jedzie pełna treść instrukcji.
 */
export function Szukaj({ grupy }: { grupy: GrupaWyszukiwarki[] }) {
  const t = TEKSTY[useJezyk()];
  const [fraza, setFraza] = useState('');

  const znalezione = useMemo(
    () =>
      grupy
        .map((g) => ({
          kategoria: g.kategoria,
          pozycje: g.pozycje.filter((a) => pasujeDoFrazy(a.indeks, fraza)),
        }))
        .filter((g) => g.pozycje.length > 0),
    [grupy, fraza],
  );

  const razem = znalezione.reduce((suma, g) => suma + g.pozycje.length, 0);

  return (
    <section className="bg-paper px-6 pt-20 pb-24 lg:px-12 lg:pt-32 lg:pb-32">
      <Container className="flex flex-col gap-10 lg:gap-14">
        <div className="flex flex-col gap-5 lg:gap-6">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h1 data-reveal className="text-display-m font-bold text-balance lg:text-display">
            {t.naglowek}
          </h1>
        </div>

        <div data-reveal className="flex flex-col gap-5">
          <div className="relative flex items-center">
            <LupaIcon />
            <input
              type="search"
              value={fraza}
              onChange={(e) => setFraza(e.target.value)}
              placeholder={t.placeholder}
              aria-label={t.etykietaPola}
              className="h-16 w-full rounded-card border border-line bg-white pr-5 pl-14 text-[17px] shadow-card outline-none placeholder:text-muted focus:border-blue lg:h-22 lg:pl-18 lg:text-lead"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[14px] lg:text-caption">
            <span className="text-muted">{t.popularneEtykieta}</span>
            {t.popularne.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setFraza(p)}
                className="cursor-pointer rounded-full bg-mist px-3.5 py-2 transition-colors hover:bg-line"
              >
                {p}
              </button>
            ))}
            {fraza && (
              <button
                type="button"
                onClick={() => setFraza('')}
                className="cursor-pointer rounded-full px-3.5 py-2 text-muted transition-colors hover:text-ink"
              >
                {t.wyczysc}
              </button>
            )}
          </div>
        </div>

        {!fraza && (
          <Link
            data-reveal
            href="/pomoc/pierwsze-kroki"
            className="flex flex-col gap-2 rounded-card bg-ink p-6 text-paper lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8"
          >
            <span className="flex flex-col gap-1.5">
              <span className="text-[19px] font-semibold tracking-[-0.01em] lg:text-[22px]">
                {t.startTytul}
              </span>
              <span className="text-[15px] leading-relaxed text-ink-muted lg:text-body">
                {t.startOpis}
              </span>
            </span>
            <span className="text-[15px] font-semibold whitespace-nowrap lg:text-body">
              {t.startAkcja}
            </span>
          </Link>
        )}

        <div data-reveal-group className="flex flex-col gap-10 lg:gap-14">
          {znalezione.map(({ kategoria, pozycje }) => (
            <div key={kategoria.id} data-reveal className="flex flex-col gap-4 lg:gap-5">
              <div className="flex flex-col gap-1">
                <h2 className="text-h3-m font-semibold tracking-[-0.01em] lg:text-h3">
                  {kategoria.nazwa}
                </h2>
                <p className="text-[15px] text-muted lg:text-body">{kategoria.opis}</p>
              </div>

              <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-4">
                {pozycje.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/pomoc/${a.slug}`}
                    className="flex flex-col gap-2.5 rounded-card border border-line bg-white p-5 text-ink shadow-card transition-colors hover:border-blue lg:p-6"
                  >
                    <span className="text-[18px] font-semibold tracking-[-0.01em] lg:text-[20px]">
                      {a.tytul}
                    </span>
                    <span className="text-[15px] leading-relaxed text-muted">{a.lead}</span>
                    <span className="mt-auto pt-1 text-[13px] text-muted">
                      {a.role}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {razem === 0 && (
            <p className="text-[16px] leading-relaxed text-muted lg:text-body">
              {t.brak(fraza)}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
