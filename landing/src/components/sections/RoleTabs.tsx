'use client';

import { useState } from 'react';

export type Role = {
  name: string;
  device: string;
  title: string;
  body: string;
  /** Ekran roli — składany po stronie serwera, bo sięga do plików makiet. */
  screen: React.ReactNode;
};

/** Zakładki ról. Stan trzymany po stronie klienta, treść przychodzi z serwera. */
export function RoleTabs({ roles }: { roles: Role[] }) {
  const [active, setActive] = useState(0);
  const role = roles[active];

  return (
    <div className="grid gap-8 lg:grid-cols-[400px_1fr] lg:items-center lg:gap-16">
      {/*
        `min-w-0` jest tu konieczne, nie kosmetyczne.

        Element siatki ma domyślnie `min-width: auto`, czyli nie skurczy się
        poniżej szerokości swojej treści. Zakładki mają `flex-none`, więc ich
        łączna szerokość rozpychała tę kolumnę do 407 px przy ekranie 375 px.
        Kontener zakładek dostawał wtedy całą tę szerokość i jego
        `overflow-x-auto` nie miał czego przewijać — „Kierowca" był po prostu
        ucięty przez przodka i nie dało się do niego dotrzeć.
      */}
      <div className="flex min-w-0 flex-col gap-6 lg:gap-10">
        <div
          role="tablist"
          aria-label="Role w BusiKM"
          /*
            Cztery równe kolumny zamiast przewijanej listy. Przewijanie było
            tu ślepym zaułkiem: „Kierowca" wystawał poza ekran i nic nie
            podpowiadało, że da się go przesunąć — wyglądało to na uciętą
            treść, a nie na listę do przewinięcia.

            Zmierzone przy 320 px: na cztery komórki zostaje po 68 px,
            a najszerszy napis („Dyspozytor") ma 73 px przy 13 px pisma
            i 67 px przy 12 px. Stąd stopniowanie — 11 px na najwęższych
            ekranach, 12 px od 360 px, 13 px od 640 px. Na desktopie bez
            zmian: kolumna z pełnym rozmiarem i nazwą urządzenia obok.
          */
          className="grid grid-cols-4 gap-1 lg:flex lg:flex-col lg:gap-1"
        >
          {roles.map((r, i) => (
            <button
              key={r.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex cursor-pointer items-center justify-center gap-4 rounded-[10px] px-1 py-2.5 text-[11px] font-semibold transition-colors min-[360px]:text-[12px] sm:text-[13px] lg:justify-between lg:rounded-btn lg:px-4.5 lg:py-4 lg:text-body ${
                i === active ? 'bg-[#1C1C21] text-paper' : 'text-ink-muted hover:text-paper'
              }`}
            >
              <span>{r.name}</span>
              <span className="hidden text-[13px] font-normal text-ink-muted lg:inline">
                {r.device}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 lg:gap-4">
          <div className="text-[22px] leading-tight font-semibold tracking-[-0.01em] lg:text-h3">
            {role.title}
          </div>
          <div className="text-[16px] leading-relaxed text-ink-muted lg:text-body">
            {role.body}
          </div>
        </div>
      </div>

      {/* Ta sama pułapka po stronie makiety: bez `min-w-0` szeroki zrzut
          rozpychałby kolumnę zamiast się do niej dopasować. */}
      <div className="min-w-0">{role.screen}</div>
    </div>
  );
}
