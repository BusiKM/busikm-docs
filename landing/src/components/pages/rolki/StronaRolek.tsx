'use client';

import { useRef, useState, useSyncExternalStore, type MouseEvent } from 'react';
import { Container } from '@/components/ui/Container';
import { IkonaFacebook } from '@/components/ui/IkonaFacebook';
import { Eyebrow } from '@/components/ui/Section';
import { firma } from '@/content/firma';
import { czasFilmu, TEMATY, type Rolka, type Temat } from '@/content/rolki';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';
import { IkonaOdtworz, KadrRolki } from './KafelRolki';
import { Odtwarzacz } from './Odtwarzacz';

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  lead: string;
  odtworz: string;
  obserwuj: string;
  najnowsza: string;
  temat: string;
  wszystkie: string;
  tematy: Record<Temat, string>;
  wiecej: string;
  pusto: string;
}> = {
  pl: {
    eyebrow: 'Rolki',
    naglowek: 'Minuta z firmy transportowej.',
    lead: 'Zlecenia, faktury, trasy i BusiKM od środka. Nowa rolka prawie codziennie. Oglądasz tutaj, bez konta na Facebooku.',
    odtworz: 'Odtwórz najnowszą',
    obserwuj: 'Obserwuj na Facebooku',
    najnowsza: 'Najnowsza',
    temat: 'Temat',
    wszystkie: 'Wszystkie',
    tematy: {
      trasa: 'W trasie',
      biuro: 'W biurze',
      miesiac: 'Na koniec miesiąca',
      firma: 'Z życia firmy',
    },
    wiecej: 'Pokaż starsze',
    pusto: 'Rolki zaraz tu będą. Do tego czasu znajdziesz je na naszej stronie na Facebooku.',
  },
  en: {
    eyebrow: 'Reels',
    naglowek: 'A minute from a transport company.',
    lead: 'Orders, invoices, routes and BusiKM from the inside. Short videos, in Polish, watched right here with no Facebook account.',
    odtworz: 'Play the latest',
    obserwuj: 'Follow on Facebook',
    najnowsza: 'Latest',
    temat: 'Topic',
    wszystkie: 'All',
    tematy: {
      trasa: 'On the road',
      biuro: 'In the office',
      miesiac: 'At month end',
      firma: 'Company life',
    },
    wiecej: 'Show older',
    pusto: 'Reels are coming here soon. Until then, you can find them on our Facebook page.',
  },
};

/** Siatka na wejściu – przy rolce prawie codziennie reszta czeka pod przyciskiem. */
const NA_START = 12;

const ZDARZENIE = 'busikm:rolka';

function subskrybuj(przy: () => void) {
  window.addEventListener('popstate', przy);
  window.addEventListener(ZDARZENIE, przy);
  return () => {
    window.removeEventListener('popstate', przy);
    window.removeEventListener(ZDARZENIE, przy);
  };
}

const rolkaZAdresu = () => new URLSearchParams(window.location.search).get('rolka');

function zmienAdres(slug: string | null, sposob: 'dodaj' | 'podmien') {
  const url = new URL(window.location.href);
  if (slug) url.searchParams.set('rolka', slug);
  else url.searchParams.delete('rolka');
  if (sposob === 'dodaj') window.history.pushState(null, '', url);
  else window.history.replaceState(null, '', url);
  window.dispatchEvent(new Event(ZDARZENIE));
}

/**
 * Podstrona z siatką rolek i odtwarzaczem.
 *
 * Otwarta rolka żyje wyłącznie w adresie (`?rolka=slug`). Dzięki temu link do
 * konkretnego filmu działa, wstecz na telefonie zamyka odtwarzacz zamiast
 * wychodzić ze strony, a strona zostaje statyczna – `searchParams` po stronie
 * serwera zmusiłoby ją do renderowania przy każdym wejściu.
 *
 * Kafle to prawdziwe odnośniki: środkowy przycisk myszy otwiera film w nowej
 * karcie, a robot widzi adres każdej rolki.
 */
export function StronaRolek({ rolki }: { rolki: Rolka[] }) {
  const t = TEKSTY[useJezyk()];
  const [temat, setTemat] = useState<Temat | null>(null);
  const [wszystkie, setWszystkie] = useState(false);
  const otwartaZeStrony = useRef(false);

  const slug = useSyncExternalStore(subskrybuj, rolkaZAdresu, () => null);

  const wybrane = temat ? rolki.filter((r) => r.temat === temat) : rolki;
  // Rolka spoza filtra (link z zewnątrz) gra z pełnej listy.
  const playlista = wybrane.some((r) => r.slug === slug) ? wybrane : rolki;
  const indeks = playlista.findIndex((r) => r.slug === slug);
  const widoczne = wszystkie ? wybrane : wybrane.slice(0, NA_START);

  const otworz = (e: MouseEvent, r: Rolka) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    otwartaZeStrony.current = true;
    zmienAdres(r.slug, 'dodaj');
  };

  const zamknij = () => {
    if (otwartaZeStrony.current) {
      otwartaZeStrony.current = false;
      window.history.back();
    } else {
      zmienAdres(null, 'podmien');
    }
  };

  const obserwuj = (
    <a
      href={firma.facebook}
      target="_blank"
      rel="noopener"
      className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-btn border border-line bg-white px-7 text-body font-semibold text-ink transition-colors hover:border-muted hover:text-ink lg:h-14"
    >
      <IkonaFacebook className="size-5 text-blue" />
      {t.obserwuj}
    </a>
  );

  const [najnowsza, druga, trzecia] = rolki;

  return (
    <>
      <section className="bg-paper px-6 pt-12 pb-12 lg:px-12 lg:pt-[72px] lg:pb-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
          <div className="flex flex-col gap-4">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h1 className="text-h1-m font-bold text-balance lg:text-h1">{t.naglowek}</h1>
            <p className="mt-2 max-w-[540px] text-lead-m text-pretty text-muted lg:text-lead">
              {najnowsza ? t.lead : t.pusto}
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {najnowsza && (
                <a
                  href={`?rolka=${najnowsza.slug}`}
                  onClick={(e) => otworz(e, najnowsza)}
                  className="inline-flex h-[52px] items-center justify-center gap-2.5 rounded-btn bg-blue px-7 text-body font-semibold text-white transition-colors hover:bg-blue-dark hover:text-white lg:h-14"
                >
                  <IkonaOdtworz />
                  {t.odtworz}
                </a>
              )}
              {obserwuj}
            </div>
          </div>

          {trzecia && (
            <div className="flex items-center justify-center gap-2 lg:gap-3.5">
              {[druga, najnowsza, trzecia].map((r) => (
                <a
                  key={r.slug}
                  href={`?rolka=${r.slug}`}
                  aria-label={r.tytul}
                  onClick={(e) => otworz(e, r)}
                  className={`group block rounded-card ${r === najnowsza ? 'flex-[0_0_48%]' : 'flex-[0_0_26%]'}`}
                >
                  <KadrRolki
                    rolka={r}
                    sizes={r === najnowsza ? '(min-width: 1024px) 260px, 48vw' : '(min-width: 1024px) 140px, 26vw'}
                    znacznik={r === najnowsza ? t.najnowsza : undefined}
                    przycisk={r === najnowsza}
                    czas={r === najnowsza}
                    pierwszyPlan={r === najnowsza}
                    className={r === najnowsza ? 'shadow-hero' : ''}
                  />
                </a>
              ))}
            </div>
          )}
        </Container>
      </section>

      {najnowsza && (
        <section aria-label={t.eyebrow} className="bg-paper px-6 pb-16 lg:px-12 lg:pb-[72px]">
          <Container>
            <div
              role="group"
              aria-label={t.temat}
              className="-mx-6 flex gap-2 overflow-x-auto px-6 pt-1 pb-5 [scrollbar-width:none] lg:mx-0 lg:px-0.5 lg:pb-6"
            >
              {[null, ...TEMATY].map((id) => {
                const ile = id ? rolki.filter((r) => r.temat === id).length : rolki.length;
                if (!ile) return null;
                const aktywny = temat === id;
                return (
                  <button
                    key={id ?? 'wszystkie'}
                    type="button"
                    aria-pressed={aktywny}
                    onClick={() => {
                      setTemat(id);
                      setWszystkie(false);
                    }}
                    className={`flex h-11 flex-none cursor-pointer items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-colors ${
                      aktywny
                        ? 'border-ink bg-ink text-paper'
                        : 'border-line bg-white text-ink hover:border-muted'
                    }`}
                  >
                    {id ? t.tematy[id] : t.wszystkie}
                    <span className={`font-mono text-[13px] ${aktywny ? 'text-[#c9c9cf]' : 'text-muted'}`}>
                      {ile}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
              {widoczne.map((r) => (
                <a
                  key={r.slug}
                  href={`?rolka=${r.slug}`}
                  onClick={(e) => otworz(e, r)}
                  className="group block rounded-card text-ink hover:text-ink"
                >
                  <KadrRolki
                    rolka={r}
                    sizes="(min-width: 1024px) 262px, (min-width: 640px) 33vw, 50vw"
                    znacznik={r === najnowsza ? t.najnowsza : undefined}
                  />
                  <span className="mt-2.5 block text-[15px] leading-[1.35] font-semibold tracking-[-0.005em] group-hover:text-blue lg:mt-3.5 lg:text-[16px]">
                    {r.tytul}
                  </span>
                  <span className="mt-1.5 block font-mono text-[12px] text-muted lg:text-[13px]">
                    {r.dataTekst} · {czasFilmu(r.sekundy)}
                  </span>
                </a>
              ))}
            </div>

            {widoczne.length < wybrane.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setWszystkie(true)}
                  className="inline-flex h-[52px] cursor-pointer items-center rounded-btn border border-line bg-white px-7 text-body font-semibold text-ink transition-colors hover:border-muted lg:h-14"
                >
                  {t.wiecej}
                </button>
              </div>
            )}
          </Container>
        </section>
      )}

      {indeks >= 0 && (
        <Odtwarzacz
          rolki={playlista}
          indeks={indeks}
          onIdz={(i) => zmienAdres(playlista[i].slug, 'podmien')}
          onZamknij={zamknij}
        />
      )}
    </>
  );
}
