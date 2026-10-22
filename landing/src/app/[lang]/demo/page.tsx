import { MockupSlot } from '@/components/ui/MockupSlot';
import { DemoMockup } from '@/components/mockups/DemoMockup';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { StronaZapisu } from '@/components/pages/zapis/StronaZapisu';
import { listy } from '@/content/zapisy';

export const generateMetadata = metadataPodstrony('demo');

const TEKSTY: Tlumaczenia<{
  kafelki: readonly (readonly [string, string])[];
  mockupLabel: string;
  mockupNota: string;
  coZobaczysz: string;
  przelacznik: string;
  przelacznikOpis: string;
}> = {
  pl: {
    kafelki: [
      ['Pulpit właściciela', '„Do zrobienia”, „Dziś” i wynik miesiąca'],
      ['Dyspozytornia', 'kolejka zleceń i mapa floty obok siebie'],
      ['Zlecenie z fakturą', 'jak jedno robi się drugim'],
      ['Komplet dla księgowej', 'eksporty i paczka dla biura jednym przyciskiem'],
    ],
    mockupLabel: 'Demo · pulpit właściciela · desktop, tryb nocny',
    mockupNota:
      'Pulpit właściciela na danych przykładowej firmy: „Do zrobienia” z listą spraw i „Dziś” z kursami w trasie.',
    coZobaczysz: 'Co zobaczysz w środku',
    przelacznik: 'Wybór roli przy wejściu: właściciel · dyspozytor · księgowa',
    przelacznikOpis:
      'Wybierasz rolę i oglądasz jej stanowisko pracy na danych przykładowej firmy transportowej. Demo jest tylko do odczytu, więc niczego nie zepsujesz.',
  },
  en: {
    kafelki: [
      ['Owner’s dashboard', '“To do”, “Today” and the month’s result'],
      ['Dispatch', 'the order queue and fleet map side by side'],
      ['Order to invoice', 'how one turns into the other'],
      ['Full pack for your accountant', 'exports and the package for the office in one click'],
    ],
    mockupLabel: 'Demo · owner’s dashboard · desktop, night mode',
    mockupNota:
      'The owner’s dashboard on a sample company’s data: “To do” with a list of tasks and “Today” with the runs on the road.',
    coZobaczysz: 'What you’ll see inside',
    przelacznik: 'Pick a role when you enter: owner · dispatcher · accountant',
    przelacznikOpis:
      'You pick a role and look around its workspace on a sample transport company’s data. The demo is read-only, so you can’t break anything.',
  },
};

/**
 * Demo – wczesny dostęp.
 *
 * Do czasu etapu 5 backlogu (BKM-1778 i BKM-1780) demo nie istnieje: nie ma
 * ani firmy demonstracyjnej w trybie tylko do odczytu, ani nocnego resetu,
 * ani wejścia. Strona mówi to wprost i zbiera adres, zamiast obiecywać
 * kliknięcie prowadzące donikąd.
 *
 * Kafelki „co zobaczysz" zostają – opisują to, co demo pokaże, a nie to,
 * co rzekomo już działa. Makieta też, z tego samego powodu.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <StronaZapisu opis={listy[jezyk].demo}>
      <div
        aria-hidden
        className="absolute right-[10%] bottom-30 left-[10%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[100px]"
      />
      <div className="relative">
        <MockupSlot
          file="mockup-demo-ekran-desktop.png"
          label={t.mockupLabel}
          note={t.mockupNota}
          ratio="16:10"
          noteClassName="mx-auto max-w-[600px]"
        >
          <DemoMockup />
        </MockupSlot>
      </div>

      <div className="relative flex flex-col gap-3.5">
        <div className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">
          {t.coZobaczysz}
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2">
          {t.kafelki.map(([tytul, opis]) => (
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
          <b className="text-[14px]">{t.przelacznik}</b>
          <div className="text-ink-muted">{t.przelacznikOpis}</div>
        </div>
      </div>
    </StronaZapisu>
  );
}
