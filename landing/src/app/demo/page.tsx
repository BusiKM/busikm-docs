import { MockupSlot } from '@/components/ui/MockupSlot';
import { DemoMockup } from '@/components/mockups/DemoMockup';
import { pageMetadata } from '@/components/layout/PageShell';
import { StronaZapisu } from '@/components/pages/zapis/StronaZapisu';
import { listy } from '@/content/zapisy';

export const metadata = pageMetadata('demo');

const kafelki = [
  ['Pulpit z zyskiem', 'trzy liczby i mapa, tak jak widzi to właściciel'],
  ['Dyspozytornia', 'zlecenia, mapa i kierowca obok siebie'],
  ['Zlecenie z fakturą', 'jak jedno robi się drugim'],
  ['Komplet dla księgowej', 'dziewięć zestawień, jeden przycisk'],
] as const;

/**
 * Demo — wczesny dostęp.
 *
 * Do czasu etapu 5 backlogu (BKM-1778 i BKM-1780) demo nie istnieje: nie ma
 * ani firmy demonstracyjnej w trybie tylko do odczytu, ani nocnego resetu,
 * ani wejścia. Strona mówi to wprost i zbiera adres, zamiast obiecywać
 * kliknięcie prowadzące donikąd.
 *
 * Kafelki „co zobaczysz" zostają — opisują to, co demo pokaże, a nie to,
 * co rzekomo już działa. Makieta też, z tego samego powodu.
 */
export default function Page() {
  return (
    <StronaZapisu opis={listy.demo}>
      <div
        aria-hidden
        className="absolute right-[10%] bottom-30 left-[10%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[100px]"
      />
      <div className="relative">
        <MockupSlot
          file="mockup-demo-ekran-desktop.png"
          label="Wejście do demo · desktop 1440"
          note="Demo od środka: pasek „to demo”, przełącznik roli i pulpit właściciela. Ten sam ekran co na stronie głównej."
          ratio="16:10"
          noteClassName="mx-auto max-w-[600px]"
        >
          <DemoMockup />
        </MockupSlot>
      </div>

      <div className="relative flex flex-col gap-3.5">
        <div className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">
          Co zobaczysz w środku
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {kafelki.map(([tytul, opis]) => (
            <div
              key={tytul}
              className="flex flex-col gap-1 rounded-[14px] border border-line bg-white px-4 py-3.5 text-[14px] leading-snug"
            >
              <b>{tytul}</b>
              <span className="text-muted">{opis}</span>
            </div>
          ))}
        </div>
        <div className="rounded-[14px] bg-ink px-4 py-3.5 text-[13px] leading-snug text-paper">
          <b className="text-[14px]">Przełącznik roli: właściciel · dyspozytor · księgowa</b>
          <div className="text-ink-muted">
            W minutę zobaczysz trzy różne stanowiska pracy. Dane wracają do porządku każdej nocy,
            więc niczego nie zepsujesz.
          </div>
        </div>
      </div>
    </StronaZapisu>
  );
}
