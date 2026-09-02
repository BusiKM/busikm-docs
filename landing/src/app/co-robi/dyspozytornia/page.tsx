import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FinalCta } from '@/components/sections/FinalCta';
import { Akordeon } from '@/components/ui/Akordeon';
import { Blok } from '@/components/ui/Blok';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { pageMetadata } from '@/components/layout/PageShell';
import { Hero } from '@/components/pages/dyspozytornia/Hero';
import { JedenEkran } from '@/components/pages/dyspozytornia/JedenEkran';
import { TrasaIZmiana } from '@/components/pages/dyspozytornia/TrasaIZmiana';
import { Drobiazgi } from '@/components/pages/dyspozytornia/Drobiazgi';
import { KartaZlecenia } from '@/components/mockups/dyspozytornia/KartaZlecenia';
import { PrzypiszKierowce } from '@/components/mockups/dyspozytornia/PrzypiszKierowce';
import { Rozmowa } from '@/components/mockups/dyspozytornia/Rozmowa';
import { ZakresDostepu } from '@/components/mockups/dyspozytornia/ZakresDostepu';

export const metadata = pageMetadata('co-robi/dyspozytornia');

const pytania = [
  [
    'Czy dyspozytor widzi, ile zarabiam?',
    'Nie musi. Prowadzi trasy i zlecenia. Pieniądze widzi właściciel i osoba od rozliczeń.',
  ],
  [
    'Czy mogę być dyspozytorem i właścicielem naraz?',
    'Tak, i tak jest najczęściej. Przełączasz widok jednym kliknięciem.',
  ],
  [
    'Ilu dyspozytorów mogę dodać?',
    'Tylu, ilu potrzebujesz. Płacisz za pojazdy, nie za ludzi.',
  ],
] as const;

const statusy = [
  ['przyjęte', 'bg-mist text-ink'],
  ['w drodze', 'bg-blue-soft text-blue'],
  ['rozładunek', 'bg-mist text-ink'],
  ['dostarczone', 'bg-green/14 text-green-ink'],
] as const;

/**
 * Dyspozytornia — podstrona wg projektu „BusiKM Dyspozytornia" z Claude Design
 * (design/03-dyspozytornia). Treść: docs/landing/05, rozdział A2.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JedenEkran />

        <Blok
          numer="02"
          tytul="Zlecenie od przyjęcia po rozliczenie"
          tresc="Zleceniodawca, załadunek, rozładunek, terminy, stawka. Status widać na liście: przyjęte, w drodze, rozładunek, dostarczone."
          dodatek={
            <div className="flex flex-wrap gap-2 text-[14px] font-medium">
              {statusy.map(([nazwa, klasa]) => (
                <span key={nazwa} className={`rounded-full px-3.5 py-2 ${klasa}`}>
                  {nazwa}
                </span>
              ))}
            </div>
          }
          makieta={
            <MockupSlot
              file="mockup-dyspozytornia-zlecenie-desktop.png"
              label="Karta zlecenia · desktop"
              note="Zleceniodawca, załadunek, rozładunek, stawka, kierowca i pojazd; pasek statusów u dołu."
              ratio="4:3"
            >
              <KartaZlecenia />
            </MockupSlot>
          }
        />

        <Blok
          tone="ink"
          strona="left"
          numer="03"
          tytul="Kierowca i pojazd w dwie sekundy"
          tresc="Przypisujesz, a system podpowiada, kto ma ważne uprawnienia i wolny czas pracy."
          makieta={<PrzypiszKierowce />}
        />

        <TrasaIZmiana />

        <Blok
          tone="ink"
          numer="06"
          tytul="Rozmowa bez wychodzenia z ekranu"
          tresc="Piszesz do kierowcy stąd. Nie szukasz numeru, nie dzwonisz, nie tłumaczysz przez telefon, gdzie ma skręcić."
          makieta={<Rozmowa />}
        />

        <Blok
          strona="left"
          numer="07"
          tytul="Dyspozytor to osobne stanowisko"
          tresc="Ma własny dostęp. Widzi to, czego potrzebuje do prowadzenia tras — nie musi widzieć rozliczeń firmy. W małej firmie właściciel przełącza się na ten widok jednym kliknięciem."
          makieta={<ZakresDostepu />}
        />

        <Drobiazgi />
        <Akordeon heading="Trzy pytania" items={pytania} />
      </main>
      <FinalCta />
      <Footer />
    </>
  );
}
