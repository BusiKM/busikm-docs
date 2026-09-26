import { Section, Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { RoleTabs, type Role } from '@/components/sections/RoleTabs';
import {
  EkranWlasciciela,
  EkranDyspozytora,
  EkranKsiegowej,
  EkranKierowcy,
} from '@/components/mockups/EkranyRol';
import { nawigacja } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type TekstRoli = { name: string; device: string; title: string; body: string };

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  tytul1: string;
  tytul2: string;
  label: string;
  note: string;
  role: [TekstRoli, TekstRoli, TekstRoli, TekstRoli];
}> = {
  pl: {
    eyebrow: 'Cztery role',
    tytul1: 'Cztery osoby. Jeden system.',
    tytul2: 'Każdy widzi swoje.',
    label: 'Cztery kadry · 3× przeglądarka + 1× telefon',
    note: 'Właściciel: pulpit z zyskiem i marżą. Dyspozytor: trzy kolumny. Księgowa: komplet za miesiąc. Kierowca: nawigacja i przycisk „Rusz”.',
    role: [
      {
        name: 'Właściciel',
        device: 'przeglądarka',
        title: 'Widzisz, ile zostaje. Dziś, nie po miesiącu.',
        body: 'Przychód, koszty i zysk na pierwszym ekranie. Cała flota na mapie. Marża na każdym kursie.',
      },
      {
        name: 'Dyspozytor',
        device: 'przeglądarka',
        title: 'Cały dzień pracy na jednym ekranie.',
        body: 'Zlecenia, mapa, kierowcy i rozmowa obok siebie. Trasa układa się sama.',
      },
      {
        name: 'Księgowa',
        device: 'przeglądarka',
        title: 'Koniec miesiąca w jednym kliknięciu.',
        body: 'Komplet dokumentów w formacie jej programu. Zamyka miesiąc.',
      },
      {
        name: 'Kierowca',
        device: 'telefon',
        title: 'Rusz. Resztą zajmuje się telefon.',
        body: 'Zlecenie, nawigacja, przerwy i koszty w jednej aplikacji.',
      },
    ],
  },
  en: {
    eyebrow: 'Four roles',
    tytul1: 'Four people. One system.',
    tytul2: 'Each sees what’s theirs.',
    label: 'Four frames · 3× browser + 1× phone',
    note: 'Owner: dashboard with profit and margin. Dispatcher: three columns. Accountant: the month’s full set. Driver: navigation and the “Go” button.',
    role: [
      {
        name: 'Owner',
        device: 'browser',
        title: 'You see what you keep. Today, not a month later.',
        body: 'Revenue, costs and profit on the first screen. The whole fleet on the map. The margin on every job.',
      },
      {
        name: 'Dispatcher',
        device: 'browser',
        title: 'The whole working day on one screen.',
        body: 'Orders, map, drivers and chat side by side. The route plans itself.',
      },
      {
        name: 'Accountant',
        device: 'browser',
        title: 'Month-end in one click.',
        body: 'The full set of documents in the format their software reads. They close the month.',
      },
      {
        name: 'Driver',
        device: 'phone',
        title: 'Tap Go. The phone does the rest.',
        body: 'Order, navigation, breaks and costs in one app.',
      },
    ],
  },
};

function slot(
  label: string,
  note: string,
  file: string,
  ratio: string,
  children: React.ReactNode,
  imageScale?: number,
) {
  return (
    <MockupSlot
      file={file}
      label={label}
      note={note}
      ratio={ratio}
      // Wszystkie cztery role dostają to samo pudło, więc przełączanie
      // zakładek nie zmienia wysokości sekcji.
      box="16:10"
      imageScale={imageScale}
      // Telefon w pudle 16:10 ogranicza wysokość, więc po bokach zostaje
      // pusty margines pliku — powiększenie działa tu także na telefonie,
      // a bez niego zrzut wychodzi znacząco mniejszy niż sąsiednie ekrany.
      imageScaleTelefon={imageScale}
      dark
    >
      {children}
    </MockupSlot>
  );
}

function roles(t: (typeof TEKSTY)['pl']): Role[] {
  const [wlasciciel, dyspozytor, ksiegowa, kierowca] = t.role;
  return [
    {
      ...wlasciciel,
      screen: slot(t.label, t.note, 'mockup-hero-pulpit-desktop.png', '16:10', <EkranWlasciciela />),
    },
    {
      ...dyspozytor,
      screen: slot(
        t.label,
        t.note,
        'mockup-dyspozytornia-ekran-desktop.png',
        '16:10',
        <EkranDyspozytora />,
      ),
    },
    {
      ...ksiegowa,
      screen: slot(t.label, t.note, 'mockup-ksiegowa-eksport-desktop.png', '16:10', <EkranKsiegowej />),
    },
    {
      ...kierowca,
      // Telefon jest wąski i w pudle 16:10 wychodziłby dużo mniejszy niż ekrany
      // przeglądarki, stąd powiększenie. Sam zrzut jest przycięty do korpusu
      // z równymi marginesami, więc centruje się sam.
      screen: slot(
        t.label,
        t.note,
        'mockup-kierowca-nawigacja-phone.png',
        '9:19.5',
        <EkranKierowcy />,
        1.42,
      ),
    },
  ];
}

/** 6.3 — cztery role. Zakładki podmieniają ekran obok. */
export function CzteryOsoby() {
  const jezyk = biezacyJezyk();
  const t = TEKSTY[jezyk];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="flex flex-col gap-5 lg:gap-6">
          <Eyebrow dark>{t.eyebrow}</Eyebrow>
          <h2
            data-reveal
            className="max-w-[820px] text-h2-m font-bold text-balance lg:text-h1"
          >
            {t.tytul1} <br className="hidden lg:inline" />
            {t.tytul2}
          </h2>
        </div>

        <RoleTabs roles={roles(t)} />

        <p className="text-[13px] leading-relaxed text-ink-muted lg:text-caption">{nawigacja(jezyk).rolesNote}</p>
      </div>
    </Section>
  );
}
