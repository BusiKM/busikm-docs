'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type WheelEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { IkonaFacebook } from '@/components/ui/IkonaFacebook';
import { czasFilmu, type Rolka } from '@/content/rolki';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { useJezyk } from '@/i18n/klient';
import { IkonaOdtworz } from './KafelRolki';

const TEKSTY: Tlumaczenia<{
  odtwarzacz: string;
  zamknij: string;
  z: string;
  poprzednia: string;
  nastepna: string;
  zatrzymaj: string;
  odtworz: string;
  wycisz: string;
  dzwiek: string;
  postep: string;
  oRolce: string;
  wiecej: string;
  mniej: string;
  komentarz: string;
  kopiuj: string;
  skopiowano: string;
  nastepne: string;
  blad: string;
  naFacebooku: string;
}> = {
  pl: {
    odtwarzacz: 'Odtwarzacz rolek',
    zamknij: 'Zamknij odtwarzacz',
    z: 'z',
    poprzednia: 'Poprzednia rolka',
    nastepna: 'Następna rolka',
    zatrzymaj: 'Zatrzymaj',
    odtworz: 'Odtwórz',
    wycisz: 'Wycisz',
    dzwiek: 'Włącz dźwięk',
    postep: 'Postęp filmu',
    oRolce: 'O tej rolce',
    wiecej: 'Więcej',
    mniej: 'Mniej',
    komentarz: 'Skomentuj na Facebooku',
    kopiuj: 'Skopiuj link',
    skopiowano: 'Skopiowano',
    nastepne: 'Następne',
    blad: 'Nie udało się wczytać tego filmu.',
    naFacebooku: 'Obejrzyj na Facebooku',
  },
  en: {
    odtwarzacz: 'Reels player',
    zamknij: 'Close the player',
    z: 'of',
    poprzednia: 'Previous reel',
    nastepna: 'Next reel',
    zatrzymaj: 'Pause',
    odtworz: 'Play',
    wycisz: 'Mute',
    dzwiek: 'Unmute',
    postep: 'Video progress',
    oRolce: 'About this reel',
    wiecej: 'More',
    mniej: 'Less',
    komentarz: 'Comment on Facebook',
    kopiuj: 'Copy link',
    skopiowano: 'Copied',
    nastepne: 'Up next',
    blad: 'This video could not be loaded.',
    naFacebooku: 'Watch on Facebook',
  },
};

/** Tyle pikseli ruchu palcem to już przesunięcie, a nie stuknięcie. */
const PROG_GESTU = 50;
/** Jeden ruch kółkiem to wiele zdarzeń – bez przerwy przeskoczyłby kilka rolek. */
const PRZERWA_KOLKA = 600;

function Ikona({ d, className = 'size-5' }: { d: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={d} />
    </svg>
  );
}

const PRZYCISK_OKRAGLY =
  'flex size-11 flex-none cursor-pointer items-center justify-center rounded-full text-paper transition-colors disabled:cursor-default disabled:opacity-50 motion-reduce:transition-none';

/**
 * Odtwarzacz na cały ekran. Na telefonie sam film, a kolejne rolki przesuwa
 * się palcem; od tabletu w górę obok filmu stoi opis i kolejka.
 *
 * Jeden `<video>` na wszystkie rolki, tylko ze zmienianym `src`. Osobny element
 * na każdą straciłby na iPhonie pozwolenie na dźwięk, które przeglądarka daje
 * za kliknięcie w kafel – a tu kolejna rolka startuje sama.
 *
 * `<dialog>` z `showModal()` daje za darmo pułapkę fokusu, wyłączenie reszty
 * strony dla czytników i warstwę nad banerem zgody.
 */
export function Odtwarzacz({
  rolki,
  indeks,
  onIdz,
  onZamknij,
}: {
  rolki: Rolka[];
  indeks: number;
  /** Przejście na inną rolkę z tej samej listy. */
  onIdz: (indeks: number) => void;
  onZamknij: () => void;
}) {
  const t = TEKSTY[useJezyk()];
  const rolka = rolki[indeks];
  const pierwsza = indeks === 0;
  const ostatnia = indeks === rolki.length - 1;

  const dialog = useRef<HTMLDialogElement>(null);
  const film = useRef<HTMLVideoElement>(null);
  const gest = useRef<HTMLButtonElement>(null);
  const startGestu = useRef(0);
  const byloPrzesuniecie = useRef(false);
  const ostatnieKolko = useRef(0);

  const [gra, setGra] = useState(false);
  const [czas, setCzas] = useState(0);
  const [wyciszony, setWyciszony] = useState(false);
  const [czeka, setCzeka] = useState(true);
  const [blad, setBlad] = useState(false);
  const [rozwiniete, setRozwiniete] = useState(false);
  const [skopiowano, setSkopiowano] = useState(false);

  // Nowa rolka zaczyna od zera. Podczas renderu, nie w efekcie – inaczej przez
  // jedną klatkę pasek postępu pokazywałby czas poprzedniego filmu.
  const [poprzedniSlug, setPoprzedniSlug] = useState(rolka.slug);
  if (poprzedniSlug !== rolka.slug) {
    setPoprzedniSlug(rolka.slug);
    setCzas(0);
    setCzeka(true);
    setBlad(false);
    setRozwiniete(false);
    setSkopiowano(false);
  }

  useEffect(() => {
    const okno = dialog.current;
    const html = document.documentElement;
    const poprzedni = html.style.overflow;
    okno?.showModal();
    // Fokus na filmie, żeby spacja zatrzymywała go od razu. Bez obrysu: to nie
    // ruch klawiaturą, a przy wejściu z linku objąłby cały kadr.
    gest.current?.focus({ focusVisible: false } as FocusOptions);
    html.style.overflow = 'hidden';
    return () => {
      okno?.close();
      html.style.overflow = poprzedni;
    };
  }, []);

  useEffect(() => {
    const v = film.current;
    if (!v) return;
    v.play().catch((e: DOMException) => {
      // Wejście z linku, bez kliknięcia: przeglądarka nie puści dźwięku, a bez
      // dźwięku puści. Lepszy film z przyciskiem „włącz dźwięk" niż stop-klatka.
      if (e.name !== 'NotAllowedError') return;
      v.muted = true;
      v.play().catch(() => {});
    });
  }, [rolka.slug]);

  const idz = (krok: number) => {
    const cel = indeks + krok;
    if (cel >= 0 && cel < rolki.length) onIdz(cel);
  };

  const przelaczGre = () => {
    const v = film.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const przelaczDzwiek = () => {
    if (film.current) film.current.muted = !film.current.muted;
  };

  const kopiuj = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setSkopiowano(true);
    } catch {
      /* Bez schowka zostaje adres w pasku przeglądarki. */
    }
  };

  const klawisz = (e: KeyboardEvent<HTMLDialogElement>) => {
    const pole = (e.target as HTMLElement).tagName === 'INPUT';
    if (e.key === 'ArrowDown' || (e.key === 'ArrowRight' && !pole)) idz(1);
    else if (e.key === 'ArrowUp' || (e.key === 'ArrowLeft' && !pole)) idz(-1);
    else if (e.key === 'm') przelaczDzwiek();
    else return;
    e.preventDefault();
  };

  const kolko = (e: WheelEvent<HTMLDialogElement>) => {
    // Panel z opisem przewija się sam.
    if ((e.target as HTMLElement).closest('aside')) return;
    const teraz = Date.now();
    if (Math.abs(e.deltaY) < 20 || teraz - ostatnieKolko.current < PRZERWA_KOLKA) return;
    ostatnieKolko.current = teraz;
    idz(e.deltaY > 0 ? 1 : -1);
  };

  const procent = Math.min(100, (czas / rolka.sekundy) * 100);

  return (
    <dialog
      ref={dialog}
      aria-label={t.odtwarzacz}
      onCancel={(e) => {
        e.preventDefault();
        onZamknij();
      }}
      onKeyDown={klawisz}
      onWheel={kolko}
      className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-ink p-0 text-paper"
    >
      {/* Poświata z okładki, żeby czarne pasy po bokach filmu nie były martwe. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- tło rozmyte do plamy, optymalizacja nic tu nie da */}
      <img
        src={rolka.okladka}
        alt=""
        className="absolute -inset-[12%] hidden size-[124%] max-w-none object-cover blur-[70px] brightness-[.34] saturate-[1.15] md:block"
      />

      <div className="absolute top-3 left-3 z-20 flex items-center gap-3.5 md:top-6 md:left-6">
        <button
          type="button"
          aria-label={t.zamknij}
          onClick={onZamknij}
          className={`${PRZYCISK_OKRAGLY} bg-paper/15 hover:bg-paper/25`}
        >
          <Ikona d="M6 6l12 12M18 6L6 18" className="size-[22px]" />
        </button>
        <span className="font-mono text-[14px]">
          {indeks + 1} {t.z} {rolki.length}
        </span>
      </div>

      {/* Na telefonie film stoi nad opisem, a nie pod nim: rolki mają napisy
          wtopione w dolną część kadru i nakładka zasłaniałaby je. Z tego samego
          powodu `object-contain` – wyższy ekran nie może obcinać boków napisów. */}
      <div className="relative flex h-full flex-col md:flex-row md:items-center md:justify-center md:gap-4 md:px-6">
        <div className="flex min-h-0 w-full flex-1 flex-col md:relative md:block md:aspect-[9/16] md:h-[min(calc(100dvh-48px),852px)] md:w-auto md:flex-none md:overflow-hidden md:rounded-card md:bg-surface md:shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          <div className="relative min-h-0 flex-1 md:absolute md:inset-0">
          <video
            ref={film}
            src={rolka.film}
            poster={rolka.okladka}
            aria-label={rolka.tytul}
            playsInline
            preload="auto"
            className="absolute inset-0 size-full object-contain md:object-cover"
            onPlay={() => setGra(true)}
            onPause={() => setGra(false)}
            onTimeUpdate={(e) => setCzas(e.currentTarget.currentTime)}
            onVolumeChange={(e) => setWyciszony(e.currentTarget.muted)}
            onWaiting={() => setCzeka(true)}
            onPlaying={() => setCzeka(false)}
            onCanPlay={() => setCzeka(false)}
            onError={() => setBlad(true)}
            onEnded={() => idz(1)}
          />

          {/* Cała powierzchnia filmu: stuknięcie zatrzymuje, przesunięcie zmienia rolkę. */}
          <button
            ref={gest}
            type="button"
            aria-label={gra ? t.zatrzymaj : t.odtworz}
            onClick={() => {
              if (byloPrzesuniecie.current) byloPrzesuniecie.current = false;
              else przelaczGre();
            }}
            onPointerDown={(e) => {
              startGestu.current = e.clientY;
              byloPrzesuniecie.current = false;
            }}
            onPointerUp={(e) => {
              const ruch = e.clientY - startGestu.current;
              if (Math.abs(ruch) < PROG_GESTU) return;
              byloPrzesuniecie.current = true;
              idz(ruch < 0 ? 1 : -1);
            }}
            className="absolute inset-0 z-[1] size-full cursor-pointer touch-none bg-transparent focus-visible:outline-offset-[-6px]"
          />

          {!gra && !czeka && !blad && (
            <span className="pointer-events-none absolute top-1/2 left-1/2 z-[2] flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/65 text-white">
              <IkonaOdtworz className="size-[30px]" />
            </span>
          )}

          {czeka && !blad && (
            <span
              className="pointer-events-none absolute top-1/2 left-1/2 z-[2] size-12 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-[3px] border-paper/30 border-t-paper motion-reduce:animate-none"
              aria-hidden
            />
          )}

          {blad && (
            <div className="absolute inset-x-6 top-1/2 z-[3] flex -translate-y-1/2 flex-col items-center gap-3 rounded-card bg-ink/85 p-6 text-center text-[15px]">
              {t.blad}
              <a href={rolka.facebook} target="_blank" rel="noopener" className="font-semibold text-paper underline hover:text-paper">
                {t.naFacebooku}
              </a>
            </div>
          )}
          </div>

          <div className="relative z-[3] flex-none bg-ink px-2 pt-1 md:absolute md:inset-x-0 md:bottom-0 md:bg-transparent md:bg-gradient-to-t md:from-ink/80 md:to-transparent md:px-3 md:pt-10 md:pb-2.5">
            <div className="relative mx-1.5 flex h-5 items-center">
              <span className="absolute inset-x-0 h-1 overflow-hidden rounded-full bg-paper/30">
                <span className="block h-full bg-white" style={{ width: `${procent}%` }} />
              </span>
              <input
                type="range"
                min={0}
                max={rolka.sekundy}
                step={0.1}
                value={Math.min(czas, rolka.sekundy)}
                aria-label={t.postep}
                onChange={(e) => {
                  if (film.current) film.current.currentTime = Number(e.target.value);
                }}
                className="absolute inset-0 m-0 h-5 w-full cursor-pointer opacity-0"
              />
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                aria-label={gra ? t.zatrzymaj : t.odtworz}
                onClick={przelaczGre}
                className={`${PRZYCISK_OKRAGLY} hover:bg-paper/15`}
              >
                {gra ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden>
                    <rect x="6" y="4.5" width="4" height="15" rx="1" />
                    <rect x="14" y="4.5" width="4" height="15" rx="1" />
                  </svg>
                ) : (
                  <IkonaOdtworz className="size-5" />
                )}
              </button>
              <span className="ml-1.5 font-mono text-[13px] text-white">
                {czasFilmu(czas)} / {czasFilmu(rolka.sekundy)}
              </span>
              <span className="flex-grow" />
              <button
                type="button"
                aria-label={wyciszony ? t.dzwiek : t.wycisz}
                onClick={przelaczDzwiek}
                className={`${PRZYCISK_OKRAGLY} hover:bg-paper/15`}
              >
                <Ikona
                  d={
                    wyciszony
                      ? 'M11 5 6 9H3v6h3l5 4V5zM22 9l-6 6M16 9l6 6'
                      : 'M11 5 6 9H3v6h3l5 4V5zM15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13'
                  }
                />
              </button>
            </div>
          </div>
        </div>

        <div className="hidden flex-col gap-2.5 md:flex">
          <button
            type="button"
            aria-label={t.poprzednia}
            disabled={pierwsza}
            onClick={() => idz(-1)}
            className={`${PRZYCISK_OKRAGLY} bg-paper/15 hover:bg-paper/25`}
          >
            <Ikona d="m6 15 6-6 6 6" className="size-[22px]" />
          </button>
          <button
            type="button"
            aria-label={t.nastepna}
            disabled={ostatnia}
            onClick={() => idz(1)}
            className={`${PRZYCISK_OKRAGLY} bg-paper/15 hover:bg-paper/25`}
          >
            <Ikona d="m6 9 6 6 6-6" className="size-[22px]" />
          </button>
        </div>

        <aside
          aria-label={t.oRolce}
          className="relative flex-none bg-ink px-4 pt-1 pb-[max(12px,env(safe-area-inset-bottom))] md:static md:max-h-[min(calc(100dvh-48px),852px)] md:min-w-[280px] md:flex-[0_1_360px] md:overflow-y-auto md:rounded-panel md:border md:border-line-dark md:bg-surface/80 md:p-7"
        >
          <div className="hidden font-mono text-[13px] text-[#b4b4bb] md:block">{rolka.dataTekst}</div>
          <h2 className="line-clamp-2 text-[16px] leading-[1.25] font-bold tracking-[-0.01em] md:mt-2.5 md:line-clamp-none md:text-[24px]">
            {rolka.tytul}
          </h2>
          <p className={`mt-1.5 text-[14px] leading-relaxed text-[#c9c9cf] md:mt-3 md:block md:text-[15px] ${rozwiniete ? '' : 'hidden'}`}>
            {rolka.opis}
          </p>

          <div className="mt-1.5 flex items-center gap-3 md:mt-5 md:block">
            <Button
              href={rolka.cel.href}
              size="nav"
              fullWidth
              className="!h-11 min-w-0 flex-1 text-center md:!h-[52px]"
            >
              {rolka.cel.etykieta} →
            </Button>
            <button
              type="button"
              onClick={() => setRozwiniete(!rozwiniete)}
              className="inline-flex min-h-11 flex-none cursor-pointer items-center text-[14px] font-medium text-paper underline underline-offset-[0.18em] md:hidden"
            >
              {rozwiniete ? t.mniej : t.wiecej}
            </button>
          </div>

          <div className={`flex-wrap gap-x-4 text-[14px] font-medium md:mt-3 md:flex ${rozwiniete ? 'flex' : 'hidden'}`}>
            <a
              href={rolka.facebook}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 text-paper hover:text-blue-soft-line"
            >
              <IkonaFacebook className="size-4" />
              {t.komentarz}
            </a>
            <button
              type="button"
              onClick={kopiuj}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-paper hover:text-blue-soft-line"
            >
              <Ikona
                d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"
                className="size-4"
              />
              {skopiowano ? t.skopiowano : t.kopiuj}
            </button>
          </div>

          {!ostatnia && (
            <div className="mt-4 hidden border-t border-line-dark pt-4 md:block">
              <div className="font-mono text-[12px] tracking-[0.08em] text-[#b4b4bb] uppercase">
                {t.nastepne}
              </div>
              {rolki.slice(indeks + 1, indeks + 4).map((r, i) => (
                <button
                  key={r.slug}
                  type="button"
                  onClick={() => onIdz(indeks + 1 + i)}
                  className="mt-2.5 flex w-full cursor-pointer items-center gap-3 rounded-btn p-1.5 text-left hover:bg-paper/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- miniatura z okładki, którą przeglądarka już ma */}
                  <img src={r.okladka} alt="" className="h-16 w-11 flex-none rounded-lg bg-surface object-cover" />
                  <span>
                    <span className="block text-[14px] leading-[1.35] font-medium">{r.tytul}</span>
                    <span className="mt-0.5 block font-mono text-[12px] text-[#b4b4bb]">
                      {czasFilmu(r.sekundy)}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>
    </dialog>
  );
}
