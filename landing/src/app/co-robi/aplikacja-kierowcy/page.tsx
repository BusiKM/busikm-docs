import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/aplikacja-kierowcy/Hero';
import { Blok } from '@/components/ui/Blok';
import { Kod } from '@/components/pages/aplikacja-kierowcy/Kod';
import { Rusza } from '@/components/pages/aplikacja-kierowcy/Rusza';
import { TrasaIDokumenty } from '@/components/pages/aplikacja-kierowcy/TrasaIDokumenty';
import { Drobiazgi } from '@/components/pages/aplikacja-kierowcy/Drobiazgi';
import { EkranNawigacja } from '@/components/mockups/kierowca/EkranNawigacja';
import { EkranKoszt } from '@/components/mockups/kierowca/EkranKoszt';
import { EkranCzas } from '@/components/mockups/kierowca/EkranCzas';
import { EkranWysylka } from '@/components/mockups/kierowca/EkranWysylka';

export const metadata = pageMetadata('co-robi/aplikacja-kierowcy');

const pytania = [
  [
    'Czy kierowca musi mieć służbowy telefon?',
    'Nie. Aplikacja działa na jego własnym telefonie, a firmowych danych nie zostawia po odejściu.',
  ],
  [
    'Czy aplikacja zużywa dużo danych?',
    'Nie. Trasa to punkty, nie obraz. Zdjęcia paragonów wysyłają się skompresowane, a bez zasięgu czekają w telefonie.',
  ],
  [
    'Co, gdy kierowca zmieni telefon?',
    'Instaluje aplikację na nowym, loguje się i ma wszystko. Nic nie ginie, bo dane są u Ciebie, nie w telefonie.',
  ],
] as const;

/** Ekran telefonu w ramce do podmiany — powtarza się cztery razy. */
function Slot({
  file,
  label,
  note,
  dark,
  children,
}: {
  file: string;
  label: string;
  note: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <MockupSlot file={file} label={label} note={note} ratio="9:19.5" box="6:7" dark={dark}>
      {children}
    </MockupSlot>
  );
}

/**
 * Aplikacja kierowcy — podstrona wg projektu „BusiKM Aplikacja kierowcy"
 * z Claude Design (design/02-aplikacja-kierowcy). Treść: docs/landing/05, rozdział A1.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Kod />

        <Blok
          tone="ink"
          strona="left"
          numer="02"
          tytul="Nawigacja jest w środku"
          tresc="Trasa ze zlecenia prowadzi go od razu, w tej samej aplikacji. Nie przeskakuje między nawigacją a resztą, nie przepisuje adresu z jednej aplikacji do drugiej. Zmieniasz trasę u siebie — on ma nową wersję w telefonie w tej samej chwili."
          makieta={
            <Slot
              dark
              file="mockup-kierowca-nawigacja-phone.png"
              label="Nawigacja · telefon, tryb nocny"
              note="Nawigacja z trasą, u góry następny manewr i godzina dojazdu, u dołu karta zlecenia."
            >
              <EkranNawigacja />
            </Slot>
          }
        />

        <Rusza />

        <Blok
          tone="ink"
          strona="left"
          numer="04"
          tytul="Koszt dodaje jednym przyciskiem"
          tresc="Zatankował, pstryknął paragon i jedzie dalej. Kwota, data i sprzedawca wpisują się same, koszt trafia do tego zlecenia i tego pojazdu."
          makieta={
            <Slot
              dark
              file="mockup-kierowca-koszt-phone.png"
              label="Dodawanie kosztu · telefon, tryb nocny"
              note="Zdjęcie paragonu u góry, pod nim rozpoznane pola (kwota, data, rodzaj, zlecenie, pojazd), przycisk „Zapisz”."
            >
              <EkranKoszt />
            </Slot>
          }
        />

        <Blok
          numer="05"
          tytul="Przerwa i powrót jednym tapnięciem"
          tresc="Aplikacja przypomina o obowiązkowej przerwie zanim będzie za późno, nie po fakcie."
          makieta={
            <Slot
              file="mockup-kierowca-czas-phone.png"
              label="Licznik czasu pracy · telefon, tryb nocny"
              note="Duży pierścień jazdy, przypomnienie o przerwie u góry, jeden przycisk „Przerwa” u dołu."
            >
              <EkranCzas />
            </Slot>
          }
        />

        <Blok
          tone="ink"
          strona="left"
          numer="06"
          tytul="Działa bez zasięgu"
          tresc="Tunel, góry, terminal promowy, parking pod granicą. Wszystko zapisuje się w telefonie i dosyła, gdy wróci sygnał. Kierowca ma ekran „Do wysłania” i widzi, co jeszcze czeka."
          makieta={
            <Slot
              dark
              file="mockup-kierowca-wysylka-phone.png"
              label="Ekran „Do wysłania” · telefon, tryb nocny"
              note="Lista rzeczy czekających na sygnał (punkty trasy, paragon, przerwa), jedna już wysłana."
            >
              <EkranWysylka />
            </Slot>
          }
        />

        <TrasaIDokumenty />
        <Drobiazgi />
        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
