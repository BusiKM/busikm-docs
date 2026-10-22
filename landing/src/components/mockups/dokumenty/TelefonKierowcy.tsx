import { Telefon, PasekStanu } from '@/components/mockups/Telefon';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Pozycja = { co: string; kiedy: string; stan: string; odnosnik?: boolean };

type Teksty = {
  tytul: string;
  najblizszy: { co: string; ile: string; wazne: string; przypomnienie: string };
  pozycje: readonly Pozycja[];
  zakladki: readonly [string, string, string, string, string];
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    tytul: 'Moje dokumenty',
    najblizszy: {
      co: 'Badania lekarskie',
      ile: '41 dni',
      wazne: 'Ważne do 13.10.2026',
      przypomnienie: 'Termin widzisz na ekranie Dziś. Szef dostaje przypomnienie.',
    },
    pozycje: [
      { co: 'Prawo jazdy · B', kiedy: 'do 2029', stan: 'ważne' },
      { co: 'Karta kierowcy', kiedy: 'do 2028', stan: 'ważne' },
      { co: 'Kod 95', kiedy: 'do 2028', stan: 'ważne' },
      { co: 'Dokumenty zlecenia', kiedy: 'CMR i WZ · do wglądu w trasie', stan: '→', odnosnik: true },
    ],
    zakladki: ['Dziś', 'Zlecenia', 'Dodaj', 'Czat', 'Ja'],
  },
  en: {
    tytul: 'My documents',
    najblizszy: {
      co: 'Medical check',
      ile: '41 days',
      wazne: 'Valid until 13 Oct 2026',
      przypomnienie: 'You see the deadline on the Today screen. Your boss gets a reminder.',
    },
    pozycje: [
      { co: 'Driving licence · B', kiedy: 'until 2029', stan: 'valid' },
      { co: 'Driver card', kiedy: 'until 2028', stan: 'valid' },
      { co: 'Code 95 (Driver CPC)', kiedy: 'until 2028', stan: 'valid' },
      { co: 'Order documents', kiedy: 'CMR and delivery note · ready for checks', stan: '→', odnosnik: true },
    ],
    zakladki: ['Today', 'Orders', 'Add', 'Chat', 'Me'],
  },
};

/** Dokumenty kierowcy w jego telefonie – z najbliższym terminem u góry. */
export function TelefonKierowcy() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Telefon>
      <PasekStanu left="07:40" right="Tomasz L." />

      <div className="px-4 pt-6 text-[20px] font-semibold lg:px-4.5 lg:text-[22px]">
        {t.tytul}
      </div>

      <div className="mx-4 mt-4 flex flex-col gap-1.5 rounded-2xl border border-line-dark bg-surface-2 p-4 lg:mx-4.5">
        <div className="flex justify-between gap-2">
          <b className="text-[13px] lg:text-[14px]">{t.najblizszy.co}</b>
          <span className="flex-none text-ink-muted">{t.najblizszy.ile}</span>
        </div>
        <div className="text-ink-muted">{t.najblizszy.wazne}</div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-[3px] bg-line-dark">
          <div className="h-full w-[34%] bg-blue" />
        </div>
        <div className="mt-1 text-ink-muted">{t.najblizszy.przypomnienie}</div>
      </div>

      <div className="flex flex-col gap-2 p-4 lg:p-4.5">
        {t.pozycje.map((p) => (
          <div
            key={p.co}
            className="flex items-center justify-between gap-2 rounded-[14px] bg-surface-3 p-3.5"
          >
            <div className="min-w-0">
              <b className="block truncate">{p.co}</b>
              <div className="truncate text-ink-muted">{p.kiedy}</div>
            </div>
            <span className={`flex-none ${p.odnosnik ? 'text-ink-muted' : 'text-green'}`}>
              {p.stan}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex justify-around border-t border-line-dark px-2 pt-3.5 pb-5 text-[10px] text-ink-muted lg:text-[11px]">
        {t.zakladki.slice(0, 4).map((z) => (
          <span key={z}>{z}</span>
        ))}
        <span className="text-paper">{t.zakladki[4]}</span>
      </div>
    </Telefon>
  );
}
