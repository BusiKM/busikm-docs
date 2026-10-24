'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import Link from '@/i18n/Link';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';

import {
  odczytajZgode,
  odczytajZgodeMarketingowa,
  subskrybujZgode,
  zapiszZgode,
  zapiszZgodeMarketingowa,
  zgodaNaSerwerze,
  ZDARZENIE_OTWARCIA,
} from './zgoda';

const TEKSTY: Tlumaczenia<{
  tytul: string;
  opis: string;
  odnosnik: string;
  zgoda: string;
  odmowa: string;
  wlasny: string;
  zapisz: string;
  analityka: string;
  analitykaOpis: string;
  reklama: string;
  reklamaOpis: string;
  wybrane: string;
  wlaczona: string;
  wylaczona: string;
}> = {
  pl: {
    tytul: 'Liczymy odwiedziny i mierzymy reklamy. Tylko za Twoją zgodą.',
    opis: 'Licznik pokazuje nam, które strony są czytane. Piksel Meta mierzy nasze reklamy na Facebooku i Instagramie i pozwala pokazać je osobom, które już tu były. Każdą zgodę dajesz osobno. Nie sprzedajemy danych.',
    odnosnik: 'Co dokładnie zapisujemy',
    zgoda: 'Zgadzam się na wszystko',
    odmowa: 'Tylko niezbędne',
    wlasny: 'Wybiorę sam',
    zapisz: 'Zapisz wybór',
    analityka: 'Statystyka odwiedzin',
    analitykaOpis: 'Google Analytics, bez reklam',
    reklama: 'Reklama',
    reklamaOpis: 'piksel Meta: pomiar i dobór odbiorców reklam',
    wybrane: 'Teraz wybrane:',
    wlaczona: 'włączona',
    wylaczona: 'wyłączona',
  },
  en: {
    tytul: 'We count visits and measure our ads. Only with your consent.',
    opis: 'The counter shows us which pages get read. The Meta pixel measures our ads on Facebook and Instagram and lets us show them to people who have already been here. You give each consent separately. We do not sell data.',
    odnosnik: 'What exactly we store',
    zgoda: 'Accept all',
    odmowa: 'Essential only',
    wlasny: 'Let me choose',
    zapisz: 'Save my choice',
    analityka: 'Visit statistics',
    analitykaOpis: 'Google Analytics, no ads',
    reklama: 'Advertising',
    reklamaOpis: 'Meta pixel: ad measurement and audiences',
    wybrane: 'Current choice:',
    wlaczona: 'on',
    wylaczona: 'off',
  },
};

/**
 * Wykrycie hydracji bez efektu.
 *
 * Baner nie może trafić do HTML-a budowanego statycznie: mrugnąłby przy
 * każdym wejściu każdemu, kto już zdecydował. Na serwerze migawka mówi więc
 * „jeszcze nie", a po hydracji „już" – i dopiero wtedy widoczność w ogóle
 * wchodzi w grę. Nic tu nie subskrybujemy, bo hydracja zdarza się raz.
 */
const BEZ_ZMIAN = () => () => {};
const PO_HYDRACJI = () => true;
const PRZED_HYDRACJA = () => false;

/**
 * Pytanie o zgodę na analitykę i reklamę.
 *
 * Baner jest obowiązkowy, bo licznik odwiedzin i piksel Meta zapisują
 * ciasteczka, a te – inaczej niż niezbędne – wymagają zgody (art. 399 Prawa
 * komunikacji elektronicznej i RODO). „Zgadzam się na wszystko" i „Tylko
 * niezbędne" są równorzędne, bo zgoda ma być dobrowolna: „odrzuć" schowane
 * albo wyszarzone to najczęściej kwestionowany wzorzec. „Wybiorę sam"
 * pozwala zgodzić się na jeden cel bez drugiego.
 *
 * Baner nie blokuje strony – nie jest modalny, można go zignorować i czytać
 * dalej. Bez decyzji ani licznik, ani piksel się nie ładują.
 */
export function BanerZgody() {
  const t = TEKSTY[useJezyk()];
  // Decyzje czytane wprost z `localStorage`, nie przepisywane do stanu.
  // Dzięki temu „Teraz wybrane" nadąża też za zmianą w innej karcie.
  const analityka = useSyncExternalStore(subskrybujZgode, odczytajZgode, zgodaNaSerwerze);
  const reklama = useSyncExternalStore(
    subskrybujZgode,
    odczytajZgodeMarketingowa,
    zgodaNaSerwerze,
  );
  const poHydracji = useSyncExternalStore(BEZ_ZMIAN, PO_HYDRACJI, PRZED_HYDRACJA);

  /** Otwarcie z odnośnika „Ustawienia cookie" – pokazuje baner mimo decyzji. */
  const [wymuszony, setWymuszony] = useState(false);
  const [zamkniety, setZamkniety] = useState(false);
  /** Rozwinięte przełączniki „Wybiorę sam" i ich robocze położenie. */
  const [szczegoly, setSzczegoly] = useState(false);
  const [chceAnalityki, setChceAnalityki] = useState(false);
  const [chceReklamy, setChceReklamy] = useState(false);

  useEffect(() => {
    const otworz = () => {
      setWymuszony(true);
      setZamkniety(false);
    };
    window.addEventListener(ZDARZENIE_OTWARCIA, otworz);
    return () => window.removeEventListener(ZDARZENIE_OTWARCIA, otworz);
  }, []);

  // Widoczność wyliczana, nie trzymana w stanie: baner należy się temu, kto
  // jeszcze nie zdecydował o którymś z celów (także temu, kto przed dodaniem
  // piksela zgodził się tylko na licznik), albo temu, kto sam po niego
  // sięgnął w stopce.
  const widoczny =
    poHydracji && !zamkniety && (wymuszony || analityka === null || reklama === null);
  if (!widoczny) return null;

  const zdecyduj = (nowaAnalityka: boolean, nowaReklama: boolean) => {
    const cofnieta =
      (odczytajZgode() === 'tak' && !nowaAnalityka) ||
      (odczytajZgodeMarketingowa() === 'tak' && !nowaReklama);
    zapiszZgode(nowaAnalityka ? 'tak' : 'nie');
    zapiszZgodeMarketingowa(nowaReklama ? 'tak' : 'nie');
    setZamkniety(true);
    setSzczegoly(false);
    // Wycofanie zgody musi usunąć skrypt z pamięci, a nie tylko przestać
    // go zasilać – samo odmontowanie komponentu nie cofa tego, co gtag
    // albo fbq zdążyły podpiąć do `window`.
    if (cofnieta) window.location.reload();
  };

  const rozwin = () => {
    setChceAnalityki(analityka === 'tak');
    setChceReklamy(reklama === 'tak');
    setSzczegoly(true);
  };

  const przycisk =
    'inline-flex h-10 flex-1 items-center justify-center rounded-btn px-4 text-[14px] font-semibold transition-colors';
  const glowny = `${przycisk} bg-blue text-white hover:bg-blue-dark`;
  const drugi = `${przycisk} border border-line bg-white text-ink hover:border-muted`;

  return (
    <div
      role="dialog"
      aria-labelledby="zgoda-tytul"
      aria-describedby="zgoda-opis"
      className="fixed inset-x-4 bottom-4 z-50 lg:inset-x-auto lg:left-6 lg:bottom-6 lg:max-w-[440px]"
    >
      <div className="rounded-card border border-line bg-paper p-5 shadow-hero lg:p-6">
        <h2 id="zgoda-tytul" className="text-[15px] font-semibold text-ink">
          {t.tytul}
        </h2>

        <p id="zgoda-opis" className="mt-2 text-[14px] leading-relaxed text-muted">
          {t.opis}{' '}
          <Link
            href="/prywatnosc#p-7"
            className="text-blue underline underline-offset-2 hover:text-blue-dark"
          >
            {t.odnosnik}
          </Link>
          .
        </p>

        {szczegoly && (
          <fieldset className="mt-4 space-y-3">
            <label className="flex items-start gap-3 text-[14px] text-ink">
              <input
                type="checkbox"
                checked={chceAnalityki}
                onChange={(e) => setChceAnalityki(e.target.checked)}
                className="mt-1 size-4 accent-blue"
              />
              <span>
                <span className="font-semibold">{t.analityka}</span>
                <span className="block text-[13px] text-muted">{t.analitykaOpis}</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-[14px] text-ink">
              <input
                type="checkbox"
                checked={chceReklamy}
                onChange={(e) => setChceReklamy(e.target.checked)}
                className="mt-1 size-4 accent-blue"
              />
              <span>
                <span className="font-semibold">{t.reklama}</span>
                <span className="block text-[13px] text-muted">{t.reklamaOpis}</span>
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          {szczegoly ? (
            <button
              type="button"
              onClick={() => zdecyduj(chceAnalityki, chceReklamy)}
              className={glowny}
            >
              {t.zapisz}
            </button>
          ) : (
            <button type="button" onClick={() => zdecyduj(true, true)} className={glowny}>
              {t.zgoda}
            </button>
          )}
          <button type="button" onClick={() => zdecyduj(false, false)} className={drugi}>
            {t.odmowa}
          </button>
        </div>

        {!szczegoly && (
          <button
            type="button"
            onClick={rozwin}
            className="mt-3 text-[13px] font-semibold text-blue underline underline-offset-2 hover:text-blue-dark"
          >
            {t.wlasny}
          </button>
        )}

        {(analityka !== null || reklama !== null) && (
          <p className="mt-3 text-[12px] text-muted">
            {t.wybrane} {t.analityka.toLowerCase()} {analityka === 'tak' ? t.wlaczona : t.wylaczona},{' '}
            {t.reklama.toLowerCase()} {reklama === 'tak' ? t.wlaczona : t.wylaczona}.
          </p>
        )}
      </div>
    </div>
  );
}
