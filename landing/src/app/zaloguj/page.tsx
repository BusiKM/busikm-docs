import { MockupSlot } from '@/components/ui/MockupSlot';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { pageMetadata } from '@/components/layout/PageShell';
import { StronaZapisu } from '@/components/pages/zapis/StronaZapisu';
import { listy } from '@/content/zapisy';

export const metadata = pageMetadata('zaloguj');

const etapy = [
  ['Teraz', 'MVP sprawdzamy na prawdziwych trasach, w małej grupie firm'],
  ['Potem', 'otwieramy zapisy — pierwsze 14 dni bez opłat'],
  ['Dalej', 'aplikacja kierowcy w App Store i Google Play'],
] as const;

/**
 * Dostęp do aplikacji — wczesny dostęp.
 *
 * Tu trafia każdy, kto kliknie „Zaloguj się". Publicznej rejestracji jeszcze
 * nie ma (BKM-1858, etap 2 backlogu), więc zamiast prowadzić na ekran
 * logowania, na którym nikt się nie zaloguje, strona mówi, na czym stoimy,
 * i zbiera adres.
 *
 * Osoby z kontem testowym mają wyjście pod formularzem — one wiedzą, po co
 * przyszły, i nie potrzebują całego ekranu dla siebie.
 */
export default function Page() {
  return (
    <StronaZapisu
      opis={listy.konto}
      podFormularzem={
        <p className="text-[14px] leading-relaxed text-muted lg:text-caption">
          Masz już konto testowe?{' '}
          <a
            href="https://staging.busikm.pl"
            className="font-medium text-blue"
            rel="nofollow"
          >
            Zaloguj się w wersji testowej →
          </a>
        </p>
      }
    >
      <div
        aria-hidden
        className="absolute right-[10%] bottom-30 left-[10%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[100px]"
      />
      <div className="relative">
        <MockupSlot
          file="mockup-hero-pulpit-desktop.png"
          label="Pulpit właściciela · desktop 1440"
          note="Pulpit po zalogowaniu: trzy liczby u góry, mapa z trasą i lista zleceń ze statusami."
          ratio="16:10"
          noteClassName="mx-auto max-w-[600px]"
        >
          <PulpitMockup />
        </MockupSlot>
      </div>

      <div className="relative flex flex-col gap-2.5">
        {etapy.map(([kiedy, co]) => (
          <div
            key={kiedy}
            className="flex gap-4 rounded-[14px] border border-line bg-white px-4 py-3.5 text-[14px] leading-snug"
          >
            <b className="w-14 flex-none text-muted">{kiedy}</b>
            <span>{co}</span>
          </div>
        ))}
      </div>
    </StronaZapisu>
  );
}
