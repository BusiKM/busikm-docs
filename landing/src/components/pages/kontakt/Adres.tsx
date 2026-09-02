'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eyebrow } from '@/components/ui/Section';
import { firma } from '@/content/firma';

const ADRES = firma.email;

/** Adres do skopiowania jednym kliknięciem, bez wchodzenia w formularz. */
export function Adres() {
  const [skopiowane, setSkopiowane] = useState(false);

  const kopiuj = async () => {
    try {
      await navigator.clipboard.writeText(ADRES);
      setSkopiowane(true);
      setTimeout(() => setSkopiowane(false), 1800);
    } catch {
      /* Bez schowka zostaje zaznaczenie myszą — adres i tak jest na wierzchu. */
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 lg:p-8">
        <Eyebrow>Napisz wprost</Eyebrow>
        <button
          type="button"
          onClick={kopiuj}
          className="cursor-pointer text-left text-[22px] font-semibold tracking-[-0.01em] break-all text-ink transition-colors hover:text-blue lg:text-h3"
        >
          {ADRES}
        </button>
        <span
          className={`text-[13px] lg:text-caption ${skopiowane ? 'font-semibold text-green-ink' : 'text-muted'}`}
        >
          {skopiowane ? 'skopiowano' : 'kliknij, aby skopiować'}
        </span>
      </div>

      <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 lg:p-8">
        <Eyebrow>Zanim napiszesz</Eyebrow>
        <p className="text-[16px] leading-relaxed text-muted lg:text-body">
          Odpowiedź może już być w centrum pomocy.
        </p>
        <Link href="/pomoc" className="text-[15px] font-semibold text-blue">
          /pomoc →
        </Link>
      </div>

      <div className="flex flex-col gap-3 p-6 lg:p-8">
        <Eyebrow>Dane firmy</Eyebrow>
        <div className="text-[14px] leading-relaxed text-muted lg:text-caption">
          {firma.nazwa}
          <br />
          {firma.ulica}
          <br />
          {firma.miasto}
          <br />
          NIP {firma.nip} · REGON {firma.regon}
          <br />
          KRS {firma.krs}
        </div>
      </div>
    </div>
  );
}
