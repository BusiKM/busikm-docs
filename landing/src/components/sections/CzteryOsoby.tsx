import { Section, Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { RoleTabs, type Role } from '@/components/sections/RoleTabs';
import {
  EkranWlasciciela,
  EkranDyspozytora,
  EkranKsiegowej,
  EkranKierowcy,
} from '@/components/mockups/EkranyRol';
import { rolesNote } from '@/content/navigation';

const NOTE =
  'Właściciel: pulpit z zyskiem i marżą. Dyspozytor: trzy kolumny. Księgowa: komplet za miesiąc. Kierowca: nawigacja i przycisk „Rusz”.';

function slot(
  file: string,
  ratio: string,
  children: React.ReactNode,
  imageScale?: number,
) {
  return (
    <MockupSlot
      file={file}
      label="Cztery kadry · 3× przeglądarka + 1× telefon"
      note={NOTE}
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

const roles: Role[] = [
  {
    name: 'Właściciel',
    device: 'przeglądarka',
    title: 'Widzisz, ile zostaje. Dziś, nie po miesiącu.',
    body: 'Przychód, koszty i zysk na pierwszym ekranie. Cała flota na mapie. Marża na każdym kursie.',
    screen: slot('mockup-hero-pulpit-desktop.png', '16:10', <EkranWlasciciela />),
  },
  {
    name: 'Dyspozytor',
    device: 'przeglądarka',
    title: 'Cały dzień pracy na jednym ekranie.',
    body: 'Zlecenia, mapa, kierowcy i rozmowa obok siebie. Trasa układa się sama.',
    screen: slot('mockup-dyspozytornia-ekran-desktop.png', '16:10', <EkranDyspozytora />),
  },
  {
    name: 'Księgowa',
    device: 'przeglądarka',
    title: 'Koniec miesiąca w jednym kliknięciu.',
    body: 'Komplet dokumentów w formacie jej programu. Zamyka miesiąc.',
    screen: slot('mockup-ksiegowa-eksport-desktop.png', '16:10', <EkranKsiegowej />),
  },
  {
    name: 'Kierowca',
    device: 'telefon',
    title: 'Rusz. Resztą zajmuje się telefon.',
    body: 'Zlecenie, nawigacja, przerwy i koszty w jednej aplikacji.',
    // Telefon jest wąski, więc w pudle 16:10 wychodziłby dużo mniejszy
    // niż ekrany przeglądarki. Powiększenie wyrównuje wrażenie.
    // Telefon jest wąski i w pudle 16:10 wychodziłby dużo mniejszy niż ekrany
    // przeglądarki, stąd powiększenie. Sam zrzut jest przycięty do korpusu
    // z równymi marginesami, więc centruje się sam.
    screen: slot('mockup-kierowca-nawigacja-phone.png', '9:19.5', <EkranKierowcy />, 1.42),
  },
];

/** 6.3 — cztery role. Zakładki podmieniają ekran obok. */
export function CzteryOsoby() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-18">
        <div className="flex flex-col gap-5 lg:gap-6">
          <Eyebrow dark>Cztery role</Eyebrow>
          <h2
            data-reveal
            className="max-w-[820px] text-h2-m font-bold text-balance lg:text-h1"
          >
            Cztery osoby. Jeden system. <br className="hidden lg:inline" />
            Każdy widzi swoje.
          </h2>
        </div>

        <RoleTabs roles={roles} />

        <p className="text-[13px] leading-relaxed text-ink-muted lg:text-caption">{rolesNote}</p>
      </div>
    </Section>
  );
}
