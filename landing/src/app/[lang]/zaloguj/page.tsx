import { MockupSlot } from '@/components/ui/MockupSlot';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { StronaZapisu } from '@/components/pages/zapis/StronaZapisu';
import { listy } from '@/content/zapisy';

export const generateMetadata = metadataPodstrony('zaloguj');

const TEKSTY: Tlumaczenia<{
  etapy: readonly (readonly [string, string])[];
  kontoTestowe: string;
  zalogujTestowo: string;
  mockupLabel: string;
  mockupNota: string;
}> = {
  pl: {
    etapy: [
      ['Teraz', 'MVP sprawdzamy na prawdziwych trasach, w małej grupie firm'],
      ['Potem', 'otwieramy zapisy — pierwsze 14 dni bez opłat'],
      ['Dalej', 'aplikacja kierowcy w App Store i Google Play'],
    ],
    kontoTestowe: 'Masz już konto testowe?',
    zalogujTestowo: 'Zaloguj się w wersji testowej →',
    mockupLabel: 'Pulpit właściciela · desktop 1440',
    mockupNota:
      'Pulpit po zalogowaniu: trzy liczby u góry, mapa z trasą i lista zleceń ze statusami.',
  },
  en: {
    etapy: [
      ['Now', 'we’re testing the MVP on real routes with a small group of companies'],
      ['Next', 'sign-ups open — the first 14 days free'],
      ['Later', 'the driver app on the App Store and Google Play'],
    ],
    kontoTestowe: 'Already have a test account?',
    zalogujTestowo: 'Sign in to the test version →',
    mockupLabel: 'Owner’s dashboard · desktop 1440',
    mockupNota:
      'The dashboard after signing in: three numbers at the top, a map with the route and a list of orders with their status.',
  },
};

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
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <StronaZapisu
      opis={listy[jezyk].konto}
      podFormularzem={
        <p className="text-[14px] leading-relaxed text-muted lg:text-caption">
          {t.kontoTestowe}{' '}
          <a
            href="https://staging.busikm.pl"
            className="font-medium text-blue"
            rel="nofollow"
          >
            {t.zalogujTestowo}
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
          label={t.mockupLabel}
          note={t.mockupNota}
          ratio="16:10"
          noteClassName="mx-auto max-w-[600px]"
        >
          <PulpitMockup />
        </MockupSlot>
      </div>

      <div className="relative flex flex-col gap-2.5">
        {t.etapy.map(([kiedy, co]) => (
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
