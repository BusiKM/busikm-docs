'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

import {
  odczytajZgode,
  subskrybujZgode,
  zapiszZgode,
  zgodaNaSerwerze,
  ZDARZENIE_OTWARCIA,
} from './zgoda';

/**
 * Wykrycie hydracji bez efektu.
 *
 * Baner nie może trafić do HTML-a budowanego statycznie: mrugnąłby przy
 * każdym wejściu każdemu, kto już zdecydował. Na serwerze migawka mówi więc
 * „jeszcze nie", a po hydracji „już" — i dopiero wtedy widoczność w ogóle
 * wchodzi w grę. Nic tu nie subskrybujemy, bo hydracja zdarza się raz.
 */
const BEZ_ZMIAN = () => () => {};
const PO_HYDRACJI = () => true;
const PRZED_HYDRACJA = () => false;

/**
 * Pytanie o zgodę na analitykę.
 *
 * Baner jest obowiązkowy, bo licznik odwiedzin zapisuje ciasteczka, a te
 * — inaczej niż niezbędne — wymagają zgody (art. 173 Prawa telekomunikacyjnego
 * i RODO). Dwa równorzędne przyciski, bo zgoda ma być dobrowolna: „odrzuć"
 * schowane albo wyszarzone to najczęściej kwestionowany wzorzec.
 *
 * Baner nie blokuje strony — nie jest modalny, można go zignorować i czytać
 * dalej. Bez decyzji licznik po prostu się nie ładuje.
 */
export function BanerZgody() {
  // Decyzja czytana wprost z `localStorage`, nie przepisywana do stanu.
  // Dzięki temu „Teraz wybrane" nadąża też za zmianą w innej karcie.
  const wybor = useSyncExternalStore(subskrybujZgode, odczytajZgode, zgodaNaSerwerze);
  const poHydracji = useSyncExternalStore(BEZ_ZMIAN, PO_HYDRACJI, PRZED_HYDRACJA);

  /** Otwarcie z odnośnika „Ustawienia cookie" — pokazuje baner mimo decyzji. */
  const [wymuszony, setWymuszony] = useState(false);
  const [zamkniety, setZamkniety] = useState(false);

  useEffect(() => {
    const otworz = () => {
      setWymuszony(true);
      setZamkniety(false);
    };
    window.addEventListener(ZDARZENIE_OTWARCIA, otworz);
    return () => window.removeEventListener(ZDARZENIE_OTWARCIA, otworz);
  }, []);

  // Widoczność wyliczana, nie trzymana w stanie: baner należy się temu, kto
  // jeszcze nie zdecydował, albo temu, kto sam po niego sięgnął w stopce.
  const widoczny = poHydracji && !zamkniety && (wymuszony || wybor === null);
  if (!widoczny) return null;

  const zdecyduj = (zgoda: 'tak' | 'nie') => {
    const poprzednia = odczytajZgode();
    zapiszZgode(zgoda);
    setZamkniety(true);
    // Wycofanie zgody musi usunąć licznik z pamięci, a nie tylko przestać
    // go zasilać — samo odmontowanie komponentu nie cofa tego, co gtag
    // zdążył podpiąć do `window`.
    if (poprzednia === 'tak' && zgoda === 'nie') window.location.reload();
  };

  return (
    <div
      role="dialog"
      aria-labelledby="zgoda-tytul"
      aria-describedby="zgoda-opis"
      className="fixed inset-x-4 bottom-4 z-50 lg:inset-x-auto lg:left-6 lg:bottom-6 lg:max-w-[420px]"
    >
      <div className="rounded-card border border-line bg-paper p-5 shadow-hero lg:p-6">
        <h2 id="zgoda-tytul" className="text-[15px] font-semibold text-ink">
          Liczymy odwiedziny. Tylko za Twoją zgodą.
        </h2>

        <p id="zgoda-opis" className="mt-2 text-[14px] leading-relaxed text-muted">
          Chcemy wiedzieć, które strony są czytane — nic poza tym. Bez reklam,
          bez profilowania, bez sprzedawania danych.{' '}
          <Link
            href="/prywatnosc#p-7"
            className="text-blue underline underline-offset-2 hover:text-blue-dark"
          >
            Co dokładnie zapisujemy
          </Link>
          .
        </p>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => zdecyduj('tak')}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-btn bg-blue px-4 text-[14px] font-semibold text-white transition-colors hover:bg-blue-dark"
          >
            Zgadzam się
          </button>
          <button
            type="button"
            onClick={() => zdecyduj('nie')}
            className="inline-flex h-10 flex-1 items-center justify-center rounded-btn border border-line bg-white px-4 text-[14px] font-semibold text-ink transition-colors hover:border-muted"
          >
            Tylko niezbędne
          </button>
        </div>

        {wybor !== null && (
          <p className="mt-3 text-[12px] text-muted">
            Teraz wybrane: {wybor === 'tak' ? 'analityka włączona' : 'tylko niezbędne'}.
          </p>
        )}
      </div>
    </div>
  );
}
