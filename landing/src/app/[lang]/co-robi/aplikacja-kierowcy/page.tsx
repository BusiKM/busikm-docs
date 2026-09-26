import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { metadataPodstrony } from '@/lib/metadata';
import { biezacyJezyk, jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
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

export const generateMetadata = metadataPodstrony('co-robi/aplikacja-kierowcy');

type Teksty = {
  pytania: readonly (readonly [string, string])[];
  naglowekPytan: string;
  nawigacja: { tytul: string; tresc: string; label: string; note: string };
  koszt: { tytul: string; tresc: string; label: string; note: string };
  czas: { tytul: string; tresc: string; label: string; note: string };
  wysylka: { tytul: string; tresc: string; label: string; note: string };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    pytania: [
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
    ],
    naglowekPytan: 'Trzy pytania',
    nawigacja: {
      tytul: 'Nawigacja jest w środku',
      tresc:
        'Trasa ze zlecenia prowadzi go od razu, w tej samej aplikacji. Nie przeskakuje między nawigacją a resztą, nie przepisuje adresu z jednej aplikacji do drugiej. Zmieniasz trasę u siebie — on ma nową wersję w telefonie w tej samej chwili.',
      label: 'Nawigacja · telefon, tryb nocny',
      note: 'Nawigacja z trasą, u góry następny manewr i godzina dojazdu, u dołu karta zlecenia.',
    },
    koszt: {
      tytul: 'Koszt dodaje jednym przyciskiem',
      tresc:
        'Zatankował, pstryknął paragon i jedzie dalej. Kwota, data i sprzedawca wpisują się same, koszt trafia do tego zlecenia i tego pojazdu.',
      label: 'Dodawanie kosztu · telefon, tryb nocny',
      note: 'Zdjęcie paragonu u góry, pod nim rozpoznane pola (kwota, data, rodzaj, zlecenie, pojazd), przycisk „Zapisz”.',
    },
    czas: {
      tytul: 'Przerwa i powrót jednym tapnięciem',
      tresc: 'Aplikacja przypomina o obowiązkowej przerwie zanim będzie za późno, nie po fakcie.',
      label: 'Licznik czasu pracy · telefon, tryb nocny',
      note: 'Duży pierścień jazdy, przypomnienie o przerwie u góry, jeden przycisk „Przerwa” u dołu.',
    },
    wysylka: {
      tytul: 'Działa bez zasięgu',
      tresc:
        'Tunel, góry, terminal promowy, parking pod granicą. Wszystko zapisuje się w telefonie i dosyła, gdy wróci sygnał. Kierowca ma ekran „Do wysłania” i widzi, co jeszcze czeka.',
      label: 'Ekran „Do wysłania” · telefon, tryb nocny',
      note: 'Lista rzeczy czekających na sygnał (punkty trasy, paragon, przerwa), jedna już wysłana.',
    },
  },
  en: {
    pytania: [
      [
        'Does the driver need a company phone?',
        'No. The app runs on their own phone, and no company data stays on it when they leave.',
      ],
      [
        'Does the app use a lot of data?',
        'No. A route is a set of points, not a picture. Receipt photos are sent compressed, and with no signal they wait on the phone.',
      ],
      [
        'What if the driver changes phones?',
        'They install the app on the new one, sign in and have everything. Nothing is lost, because the data sits with you, not on the phone.',
      ],
    ],
    naglowekPytan: 'Three questions',
    nawigacja: {
      tytul: 'Navigation is built in',
      tresc:
        'The route from the order guides them straight away, in the same app. No jumping between a sat nav and everything else, no copying addresses from one app to another. Change the route on your side and the new version is on their phone the same moment.',
      label: 'Navigation · phone, dark mode',
      note: 'Navigation with the route: next turn and arrival time at the top, the order card at the bottom.',
    },
    koszt: {
      tytul: 'A cost takes one button',
      tresc:
        'Fill up, snap the receipt, drive on. Amount, date and seller fill themselves in, and the cost lands on that order and that vehicle.',
      label: 'Adding a cost · phone, dark mode',
      note: 'Receipt photo at the top, recognised fields below (amount, date, type, order, vehicle), a “Save” button.',
    },
    czas: {
      tytul: 'Break and back in one tap',
      tresc: 'The app reminds them about the required break before it’s too late, not after the fact.',
      label: 'Working time counter · phone, dark mode',
      note: 'A large driving ring, a break reminder at the top, a single “Break” button at the bottom.',
    },
    wysylka: {
      tytul: 'Works with no signal',
      tresc:
        'A tunnel, the mountains, a ferry terminal, a car park by the border. Everything is saved on the phone and sent once the signal is back. The driver has a “To send” screen and sees what’s still waiting.',
      label: '“To send” screen · phone, dark mode',
      note: 'A list of items waiting for signal (route points, a receipt, a break), one already sent.',
    },
  },
};

/** Ekran telefonu w ramce do podmiany — powtarza się cztery razy. */
/**
 * Powiększenie zrzutów telefonu na tej stronie.
 *
 * Wszystkie pliki mają ten sam kształt: kadr 4:3, a w nim telefon zajmujący
 * 30% szerokości i 81% wysokości — reszta to pusty margines. W pudle 6:7
 * ogranicza je szerokość, więc bez powiększenia telefon wychodzi szeroki
 * na 156 px w kolumnie mającej 520 i wygląda jak miniaturka.
 *
 * 1,8 daje mu 281 px szerokości i 569 px wysokości, czyli mniej więcej tyle,
 * ile ma pudło. Poza kadr wychodzi sam pusty margines pliku.
 *
 * Wartość domyślna, nie wpisywana przy każdym bloku: pliki są jednakowe,
 * więc różne skale znaczyłyby wyłącznie tyle, że ktoś zapomniał jednej.
 */
const POWIEKSZENIE = 1.8;

function Slot({
  file,
  label,
  note,
  dark,
  imageScale = POWIEKSZENIE,
  children,
}: {
  file: string;
  label: string;
  note: string;
  dark?: boolean;
  imageScale?: number;
  children: React.ReactNode;
}) {
  return (
    <MockupSlot
      file={file}
      label={label}
      note={note}
      ratio="9:19.5"
      box="6:7"
      imageScale={imageScale}
      // Telefon zajmuje 30% szerokości kadru, więc nawet przy 1,8 zostaje
      // mnóstwo zapasu — powiększenie działa tu także na telefonie.
      imageScaleTelefon={imageScale}
      dark={dark}
    >
      {children}
    </MockupSlot>
  );
}

/**
 * Aplikacja kierowcy — podstrona wg projektu „BusiKM Aplikacja kierowcy"
 * z Claude Design (design/02-aplikacja-kierowcy). Treść: docs/landing/05, rozdział A1.
 */
export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  const t = TEKSTY[biezacyJezyk()];
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
          tytul={t.nawigacja.tytul}
          tresc={t.nawigacja.tresc}
          makieta={
            <Slot
              dark
              file="mockup-kierowca-nawigacja-phone.png"
              label={t.nawigacja.label}
              note={t.nawigacja.note}
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
          tytul={t.koszt.tytul}
          tresc={t.koszt.tresc}
          makieta={
            <Slot
              dark
              file="mockup-kierowca-koszt-phone.png"
              label={t.koszt.label}
              note={t.koszt.note}
            >
              <EkranKoszt />
            </Slot>
          }
        />

        <Blok
          numer="05"
          tytul={t.czas.tytul}
          tresc={t.czas.tresc}
          makieta={
            <Slot
              file="mockup-kierowca-czas-phone.png"
              label={t.czas.label}
              note={t.czas.note}
            >
              <EkranCzas />
            </Slot>
          }
        />

        <Blok
          tone="ink"
          strona="left"
          numer="06"
          tytul={t.wysylka.tytul}
          tresc={t.wysylka.tresc}
          makieta={
            <Slot
              dark
              file="mockup-kierowca-wysylka-phone.png"
              label={t.wysylka.label}
              note={t.wysylka.note}
            >
              <EkranWysylka />
            </Slot>
          }
        />

        <TrasaIDokumenty />
        <Drobiazgi />
        <Akordeon heading={t.naglowekPytan} items={t.pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
