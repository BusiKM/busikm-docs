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
          className="-mx-6 flex gap-1.5 overflow-x-auto px-6 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
        >
          {roles.map((r, i) => (
            <button
              key={r.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={`flex flex-none cursor-pointer items-center justify-between gap-4 rounded-[10px] px-3.5 py-2.5 text-[14px] font-semibold transition-colors lg:rounded-btn lg:px-4.5 lg:py-4 lg:text-body ${
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
