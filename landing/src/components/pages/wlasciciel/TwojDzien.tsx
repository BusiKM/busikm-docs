import { Section } from '@/components/ui/Section';
import {
  KartaPulpit,
  KartaMapa,
  KartaFaktura,
  KartaEksport,
} from '@/components/mockups/wlasciciel/KartyOsi';

const punkty = [
  {
    godzina: '7:10',
    pora: 'rano',
    tresc:
      'Otwierasz pulpit. Przychód, koszty i zysk miesiąca na wierzchu, pod spodem to, co wymaga uwagi dzisiaj.',
    karta: <KartaPulpit />,
  },
  {
    godzina: '11:40',
    pora: 'w ciągu dnia',
    tresc: 'Dzwoni klient, pyta o ładunek. Patrzysz na mapę i odpowiadasz, zanim skończy pytanie.',
    karta: <KartaMapa />,
  },
  {
    godzina: '16:20',
    pora: 'po południu',
    tresc: 'Kierowca zamknął kurs. Sprawdzasz kwotę, klikasz raz — faktura idzie do klienta.',
    karta: <KartaFaktura />,
  },
  {
    godzina: 'koniec',
    pora: 'miesiąca',
    tresc: 'Jeden przycisk i księgowa ma komplet. Nie dzwoni z pytaniami.',
    karta: <KartaEksport />,
    ostatni: true,
  },
];

/**
 * Serce strony roli — jeden dzień na osi czasu.
 *
 * Trzy kolumny: godzina, linia z kropką, treść z drobną kartą obok. Na telefonie
 * kolumna godziny się zwęża, ale linia zostaje — to ona trzyma całość razem.
 */
export function TwojDzien() {
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-12 lg:gap-24">
        <h2 data-reveal className="text-h2-m font-bold text-balance lg:text-h1">
          Twój dzień z BusiKM.
        </h2>

        <div
          data-reveal-group
          className="grid grid-cols-[76px_1px_1fr] gap-x-5 lg:grid-cols-[200px_1px_1fr] lg:gap-x-16"
        >
          {punkty.map((p) => (
            <div key={p.godzina} className="contents">
              <div
                data-reveal
                className={`flex flex-col gap-1 ${p.ostatni ? '' : 'pb-12 lg:pb-24'}`}
              >
                <div className="text-[24px] leading-none font-bold tracking-[-0.03em] lg:text-[40px]">
                  {p.godzina}
                </div>
                <div className="text-[11px] font-medium tracking-[0.1em] text-ink-muted uppercase lg:text-caption">
                  {p.pora}
                </div>
              </div>

              <div
                aria-hidden
                className={`relative ${
                  p.ostatni
                    ? 'bg-linear-to-b from-line-dark from-60% to-transparent'
                    : 'bg-line-dark'
                }`}
              >
                <span className="absolute top-2 -left-[7px] size-[15px] rounded-full bg-blue shadow-[0_0_0_6px_rgba(11,95,255,.2)]" />
              </div>

              <div
                data-reveal
                className={`grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start lg:gap-10 ${
                  p.ostatni ? '' : 'pb-12 lg:pb-24'
                }`}
              >
                <p className="text-lead-m text-pretty lg:text-lead">{p.tresc}</p>
                {p.karta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
