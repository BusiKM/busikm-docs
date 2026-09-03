import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { HeroRoli } from '@/components/ui/HeroRoli';
import { OsDnia } from '@/components/ui/OsDnia';
import { PrzekreslonaLista } from '@/components/ui/PrzekreslonaLista';
import { ZakresRoli } from '@/components/ui/ZakresRoli';
import { pageMetadata } from '@/components/layout/PageShell';
import { miesiacKsiegowej } from '@/components/pages/ksiegowa-rola/miesiac';
import { Ekrany } from '@/components/pages/ksiegowa-rola/Ekrany';

export const metadata = pageMetadata('dla-kogo/ksiegowa');

const pytania = [
  [
    'Czy będę musiała się przestawiać?',
    'Nie. Pobierasz plik i wczytujesz do programu, którego już używasz.',
  ],
  [
    'Obsługuję dziewięć firm. Dziewięć kont?',
    'Nie. Jedno konto, przełączasz się między firmami, które Cię zaprosiły.',
  ],
  [
    'Co, gdy w danych czegoś brakuje?',
    'Zobaczysz to przed pobraniem, na liście sprawdzenia, razem z nazwiskiem osoby, która może to uzupełnić.',
  ],
] as const;

const nieRobisz = [
  'prosisz o brakujące paragony',
  'przepisujesz delegacje z kartek',
  'przeliczasz waluty ręcznie',
  'sprawdzasz, czy ktoś nie zmienił danych wstecz',
  'dzwonisz po kursy z tabeli',
];

/**
 * Księgowa — strona roli wg projektu „BusiKM Dla księgowej" z Claude Design
 * (design/13-ksiegowa). Treść: docs/landing/05, rozdział B3.
 *
 * Rytm inny niż na pozostałych stronach ról: oś jest miesięczna, nie godzinowa.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroRoli
          nadtytul="Dla księgowej"
          tytul="Koniec miesiąca w jednym kliknięciu."
          lead="Dane wpadają przez cały miesiąc. Ty wybierasz okres, klikasz raz i masz komplet w formacie swojego programu."
        />
        <OsDnia naglowek="Twój miesiąc z BusiKM." punkty={miesiacKsiegowej} skala="slowa" />
        <Ekrany />
        <PrzekreslonaLista rzeczy={nieRobisz} />
        <ZakresRoli
          naglowek="Co widzisz, a czego nie widzisz."
          kolumny={[
            {
              nadtytul: 'Widzisz',
              pozycje: ['Dokumenty', 'Koszty i przebieg', 'Delegacje i czas pracy', 'Kursy walut'],
              tresc: 'Wszystko za wybrany okres.',
            },
            {
              nadtytul: 'Nie widzisz',
              pozycje: ['Pozycji kierowców na mapie', 'Bieżących zleceń'],
              tresc: 'To nie Twoja robota.',
              przygaszona: true,
            },
          ]}
          nota="Pracujesz w firmie albo obsługujesz ją z zewnątrz — i tak dostajesz zaproszenie mailem i własny dostęp, tylko do odczytu i tylko do tego, co potrzebne."
        />
        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
