import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { Drobiazgi } from '@/components/ui/Drobiazgi';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/dokumenty/Hero';
import { WJednymMiejscu } from '@/components/pages/dokumenty/WJednymMiejscu';
import { StatusEkran } from '@/components/pages/dokumenty/StatusEkran';
import { WydrukIKolor } from '@/components/pages/dokumenty/WydrukIKolor';
import { UstawPrzypomnienie } from '@/components/mockups/dokumenty/UstawPrzypomnienie';
import { TelefonKierowcy } from '@/components/mockups/dokumenty/TelefonKierowcy';

export const metadata = pageMetadata('co-robi/dokumenty-i-terminy');

const pytania = [
  [
    'Skąd system zna daty?',
    'Wpisujesz je raz przy dokumencie. Po odnowieniu przesuwasz termin jednym kliknięciem.',
  ],
  [
    'Czy przypomnienie przyjdzie mailem?',
    'Tak, mailem i w aplikacji. Kierowca dostaje swoje na telefon.',
  ],
  [
    'Co, gdy dokument dotyczy tylko jednego pojazdu?',
    'Wtedy siedzi przy tym pojeździe i nie miesza się z resztą floty.',
  ],
] as const;

const drobiazgi = [
  'Skan dokumentu przy pozycji',
  'Przypomnienie mailem i w aplikacji',
  'Termin przesuwasz jednym kliknięciem po odnowieniu',
  'Historia poprzednich polis i przeglądów',
  'Dokumenty pojazdu widoczne dla kierowcy w trasie',
  'Lista do wydruku na jedną stronę',
];

/**
 * Dokumenty i terminy — podstrona wg projektu „BusiKM Dokumenty i terminy"
 * z Claude Design (design/10-dokumenty-i-terminy). Treść: docs/landing/05, rozdział A9.
 *
 * Jedyna strona w serwisie, na której wolno użyć koloru `amber` — i tylko dla
 * dokumentu, który zaraz wygaśnie.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WJednymMiejscu />

        <Blok
          numer="02"
          tytul="Przypomnienie z wyprzedzeniem"
          tresc="Na długo przed terminem, nie dzień po. Sam ustawiasz, ile dni wcześniej."
          makieta={<UstawPrzypomnienie />}
        />

        <Blok
          tone="ink"
          strona="left"
          numer="03"
          tytul="Kierowca też dostaje swoje"
          tresc="O jego prawie jazdy i badaniach przypominamy jemu, nie tylko Tobie."
          makieta={
            <MockupSlot
              file="mockup-dokumenty-kierowca-phone.png"
              label="Dokumenty kierowcy · telefon, tryb nocny"
              note="Telefon kierowcy z jego dokumentami i najbliższym terminem badania u góry."
              ratio="9:19.5"
              box="6:7"
              dark
              noteClassName="mx-auto max-w-[520px]"
            >
              <TelefonKierowcy />
            </MockupSlot>
          }
        />

        <StatusEkran />
        <WydrukIKolor />

        <Drobiazgi
          tone="mist"
          kafelki={drobiazgi}
          stopka={
            <>
              Kto tego używa:{' '}
              <Link href="/dla-kogo/wlasciciel">
                Właściciel →
              </Link>
              <span className="mx-3">·</span>
              <Link href="/dla-kogo/kierowca">
                Kierowca →
              </Link>
            </>
          }
        />

        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
