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
      tytul: 'Nawigacja jednym dotknięciem',
      tresc:
        'Ekran zlecenia pokazuje trasę i godzinę z BusiKM. Jedno dotknięcie i trasa otwiera się w Apple Maps, Google Maps albo Waze. Kierowca wybiera raz, zmienia w ustawieniach. Działa z CarPlay i Android Auto. Nic nie przepisuje, a BusiKM zapisuje przejazd w tle.',
      label: 'Wybór nawigacji · telefon, tryb nocny',
      note: 'Ekran „Dziś” z kursem Wrocław → Milano, a na nim plansza „Czym nawigujesz?” z wyborem Apple Maps, Google Maps albo Waze.',
    },
    koszt: {
      tytul: 'Paragon dodaje jednym przyciskiem',
      tresc:
        'Zatankował, dotknął „Dodaj” i pstryknął paragon. Wybiera rodzaj kosztu, czym zapłacił i zlecenie, potem „Wyślij paragon” i jedzie dalej. Kwotę, datę i sprzedawcę BusiKM odczyta sam.',
      label: 'Moje koszty · telefon, tryb nocny',
      note: 'Ekran „Moje koszty”: zwrot dla kierowcy, liczniki „Biuro pyta”, „Do uzupełnienia”, „Gotowe” i „Zaksięgowane”, przycisk „Dodaj paragon” i lista paragonów z miesiąca.',
    },
    czas: {
      tytul: 'Przerwa i odpoczynek jednym tapnięciem',
      tresc: 'Przy przewozie międzynarodowym aplikacja przypomina o obowiązkowej przerwie 15 minut wcześniej, nie po fakcie, a na ekranie „Czas pracy” kierowca widzi jazdę ciągłą, dzienną i tydzień. Przerwę albo odpoczynek zapisuje jednym przyciskiem.',
      label: 'Czas pracy · telefon, tryb nocny',
      note: 'Ekran „Czas pracy” przy przewozie międzynarodowym: trzy wskaźniki (jazda ciągła, dzienna, tydzień), pasek „Dwa tygodnie”, przyciski „Przerwa” i „Odpoczynek”.',
    },
    wysylka: {
      tytul: 'Działa bez zasięgu',
      tresc:
        'Tunel, góry, terminal promowy, parking pod granicą. Paragony, zdjęcia i przerwy czekają w telefonie i wysyłają się, gdy wróci sygnał. Kierowca ma ekran „Do wysłania” i widzi, co jeszcze czeka.',
      label: 'Ekran „Do wysłania” · telefon, tryb nocny',
      note: 'Ekran „Do wysłania” z komunikatem „Wszystko wysłane”: wszystkie dane dotarły do serwera.',
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
      tytul: 'Navigation in one tap',
      tresc:
        'The order screen shows the route and the time from BusiKM. One tap and the route opens in Apple Maps, Google Maps or Waze. The driver picks one once and can change it in the settings. It works with CarPlay and Android Auto. Nothing to retype, and BusiKM logs the trip in the background.',
      label: 'Choosing navigation · phone, dark mode',
      note: 'The “Today” screen with the Wrocław → Milan job and the “What do you navigate with?” sheet offering Apple Maps, Google Maps or Waze.',
    },
    koszt: {
      tytul: 'A receipt takes one button',
      tresc:
        'Fill up, tap “Add”, snap the receipt. Pick the cost type, how it was paid and the order, hit “Send receipt” and drive on. BusiKM reads the amount, date and seller itself.',
      label: 'My costs · phone, dark mode',
      note: 'The “My costs” screen: the driver’s refund, counters for “Office asks”, “To complete”, “Ready” and “Booked”, an “Add receipt” button and the month’s receipts.',
    },
    czas: {
      tytul: 'Break or rest in one tap',
      tresc: 'On international jobs the app reminds them about the required break 15 minutes ahead, not after the fact, and the “Working time” screen shows continuous, daily and weekly driving. The driver logs a break or a rest with one button.',
      label: 'Working time · phone, dark mode',
      note: 'The “Working time” screen for international transport: three gauges (continuous driving, daily, week), a “Two weeks” bar, and the “Break” and “Rest” buttons.',
    },
    wysylka: {
      tytul: 'Works with no signal',
      tresc:
        'A tunnel, the mountains, a ferry terminal, a car park by the border. Receipts, photos and breaks wait on the phone and go out once the signal is back. The driver has a “To send” screen and sees what’s still waiting.',
      label: '“To send” screen · phone, dark mode',
      note: 'The “To send” screen showing “All sent”: every piece of data has reached the server.',
    },
  },
};

/** Ekran telefonu w ramce do podmiany – powtarza się cztery razy. */
/**
 * Powiększenie zrzutów telefonu na tej stronie.
 *
 * Wszystkie pliki mają ten sam kształt: kadr 4:3, a w nim telefon zajmujący
 * 30% szerokości i 81% wysokości – reszta to pusty margines. W pudle 6:7
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
      // mnóstwo zapasu – powiększenie działa tu także na telefonie.
      imageScaleTelefon={imageScale}
      dark={dark}
    >
      {children}
    </MockupSlot>
  );
}

/**
 * Aplikacja kierowcy – podstrona wg projektu „BusiKM Aplikacja kierowcy"
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
