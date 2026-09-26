import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const podpowiedzi = [
  {
    nazwa: 'Alpina Logistics S.r.l.',
    adres: 'Via Tortona 12, Milano · IT 08765432109',
    wybrana: true,
  },
  {
    nazwa: 'Alpen Cargo GmbH',
    adres: 'Innsbruck · AT U12345678',
    wybrana: false,
  },
] as const;

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  podpowiedzi: string;
  /** Liczba zleceń — kolejność jak w `podpowiedzi`. */
  ile: readonly string[];
  stopka: string;
}> = {
  pl: {
    naglowek: 'Nowe zlecenie · kontrahent',
    podpowiedzi: 'podpowiedzi',
    ile: ['12 zleceń', '3 zlecenia'],
    stopka: 'Adres, numer i termin płatności wchodzą same.',
  },
  en: {
    naglowek: 'New order · client',
    podpowiedzi: 'suggestions',
    ile: ['12 orders', '3 orders'],
    stopka: 'Address, tax number and payment term fill in by themselves.',
  },
};

/** Pole kontrahenta w nowym zleceniu: trzy litery i reszta wchodzi sama. */
export function Kontrahenci() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="text-[12px] text-muted lg:text-[13px]">{t.naglowek}</div>

      <div className="flex justify-between gap-3 rounded-btn border border-blue px-3.5 py-3.5">
        <span>
          Alp
          <span aria-hidden className="text-muted">
            |
          </span>
        </span>
        <span className="flex-none text-muted">{t.podpowiedzi}</span>
      </div>

      <div className="flex flex-col overflow-hidden rounded-btn border border-line">
        {podpowiedzi.map((k, i) => (
          <div
            key={k.nazwa}
            className={`flex justify-between gap-3 p-3.5 ${
              k.wybrana ? 'bg-mist' : 'border-t border-line'
            }`}
          >
            <div className="min-w-0">
              <b className="block truncate">{k.nazwa}</b>
              <div className="truncate text-[12px] text-muted lg:text-[13px]">{k.adres}</div>
            </div>
            <span className="flex-none text-[12px] text-muted lg:text-[13px]">{t.ile[i]}</span>
          </div>
        ))}
      </div>

      <div className="text-[12px] text-muted lg:text-[13px]">
        {t.stopka}
      </div>
    </div>
  );
}
