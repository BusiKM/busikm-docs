import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ naglowek: string; tiles: readonly (readonly [string, string])[] }> = {
  pl: {
    naglowek: 'Rzeczy, które widać dopiero w robocie.',
    tiles: [
      ['Tryb nocny', 'W telefonie kierowcy i w przeglądarce. Oczy podziękują'],
      ['Sześć języków', 'Kierowca z Ukrainy, Rumunii czy Mołdawii czyta w swoim'],
      ['Bez zasięgu też działa', 'Dane czekają w telefonie i dosyłają się same'],
      ['System sam się odzywa', 'Powiadomienie, gdy coś wymaga uwagi. Nie musisz zaglądać'],
      ['Nic nie instalujesz', 'Otwierasz w przeglądarce, na laptopie i na telefonie'],
      ['Na starcie nie przytłacza', 'Widzisz tylko to, co potrzebne. Reszta z czasem'],
      ['Widać, kto co zmienił', 'Każda zmiana ma autora i godzinę'],
      ['Serwery w Europie', 'Dane zostają Twoje, także po rezygnacji'],
    ],
  },
  en: {
    naglowek: 'Things you only notice once it’s working.',
    tiles: [
      ['Night mode', 'On the driver’s phone and in the browser. Your eyes will thank you'],
      ['Six languages', 'A driver from Ukraine, Romania or Moldova reads in their own'],
      ['Works without signal too', 'Data waits on the phone and sends itself later'],
      ['The system speaks up', 'A notification when something needs attention. No need to keep checking'],
      ['Nothing to install', 'Open it in the browser, on a laptop or a phone'],
      ['Not overwhelming at the start', 'You see only what you need. The rest comes with time'],
      ['See who changed what', 'Every change has an author and a time'],
      ['Servers in Europe', 'Your data stays yours, even after you cancel'],
    ],
  },
};

/** 6.14 — drobiazgi, które widać dopiero w użyciu. */
export function RzeczyWRobocie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:gap-20">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {t.tiles.map(([title, body]) => (
            <div
              key={title}
              data-reveal
              className="flex flex-col gap-1.5 rounded-card border border-line-dark bg-surface p-4.5 lg:min-h-45 lg:gap-2.5 lg:p-7"
            >
              <div className="text-[15px] font-semibold lg:text-body">{title}</div>
              <div className="text-[13px] leading-relaxed text-ink-muted lg:text-[15px]">
                {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
