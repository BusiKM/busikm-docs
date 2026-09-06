'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { IkonaMenu } from '@/components/layout/IkonaMenu';
import {
  appLinks,
  coRobi,
  dlaKogo,
  menuMobilne,
  navigation,
  rolesNote,
  type NavEntry,
} from '@/content/navigation';

/**
 * Pasek nawigacji — wg artboardu „BusiKM Nawigacja" (pięć stanów).
 *
 * 72 px na desktopie, 64 px na telefonie. Tło białe z rozmyciem; po przewinięciu
 * 24 px dochodzi cień. Przy otwartym menu pasek staje się kryjący, aktywna
 * pozycja robi się niebieska, a strona pod spodem dostaje przyciemnienie.
 */

const CARET = '▾';

/** Do tej wysokości pasek jest zawsze widoczny — jesteśmy jeszcze przy górze. */
const PRZY_GORZE = 80;
/**
 * Mniejsze ruchy ignorujemy.
 *
 * Bez tego progu pasek reagowałby na każde drgnięcie kółka i przy zwykłym
 * czytaniu chowałby się i wracał kilka razy na sekundę. Osiem pikseli to
 * mniej niż jeden „klik" kółka i mniej niż przypadkowy ruch kciuka.
 */
const PROG_KIERUNKU = 8;

/** Znak logowania — prosta sylwetka, bez wypełnienia. */
function UserIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="10" cy="6.5" r="3.25" />
      <path d="M3.75 16.75a6.25 6.25 0 0 1 12.5 0" />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Miniatura pulpitu w kaflu „Zobacz demo" — prosto z projektu. */
function DemoPreview() {
  return (
    <div className="flex h-[110px] flex-col gap-2 rounded-btn border border-line bg-white p-3.5 text-[11px]">
      <div className="text-muted">Pulpit · Trans-Bus Kowalski</div>
      <div className="grid grid-cols-3 gap-1.5">
        {[
          ['Przychód', '184 320', false],
          ['Koszty', '121 840', false],
          ['Zysk', '62 480', true],
        ].map(([label, value, strong]) => (
          <div
            key={label as string}
            className={`rounded-lg border border-line p-1.5 ${strong ? 'bg-mist' : ''}`}
          >
            <div className="text-[9px] text-muted">{label}</div>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [zjechal, setZjechal] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const ostatnieY = useRef(0);

  /**
   * Pasek chowa się przy przewijaniu w dół i wraca przy przewijaniu w górę.
   *
   * Czytanie w dół to ruch kciuka w górę — wtedy pasek nie jest potrzebny
   * i oddaje miejsce treści. Ruch kciuka w dół, czyli powrót w górę strony,
   * zwykle znaczy „szukam nawigacji", więc pasek wraca od razu, bez czekania
   * na dojechanie na samą górę.
   *
   * Przy górze strony jest widoczny zawsze, niezależnie od kierunku.
   */
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);

      if (y <= PRZY_GORZE) {
        ostatnieY.current = y;
        setZjechal(false);
        return;
      }

      const roznica = y - ostatnieY.current;
      if (Math.abs(roznica) < PROG_KIERUNKU) return;
      ostatnieY.current = y;
      setZjechal(roznica > 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /**
   * Kliknięcie w odnośnik zamyka menu — także gdy prowadzi tam, gdzie
   * już jesteśmy.
   *
   * Reset przy zmianie adresu (niżej) tego nie łapie, bo przy odnośniku do
   * bieżącej strony adres się nie zmienia. Menu zostawało wtedy otwarte,
   * a razem z nim blokada przewijania — czyli gorzej niż przed poprawką,
   * bo strona wracała na górę i zastawała człowieka w otwartym panelu.
   */
  const zamknijPoKliknieciu = (e: React.MouseEvent) => {
    if ((e.target as Element).closest('a')) {
      setMobileOpen(false);
      setOpenMega(null);
    }
  };

  // Zmiana adresu zamyka menu. Poprawka stanu w trakcie renderu, a nie
  // w efekcie — React obsługuje ten wzorzec osobno: przerywa render
  // i powtarza go z nową wartością, zanim cokolwiek trafi na ekran.
  // Przez efekt otwarte menu mignęłoby jeszcze na nowej stronie.
  const [poprzedniaSciezka, setPoprzedniaSciezka] = useState(pathname);
  if (poprzedniaSciezka !== pathname) {
    setPoprzedniaSciezka(pathname);
    setOpenMega(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpenMega(null);
      setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!openMega) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMega(null);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [openMega]);

  /**
   * Otwarte menu zatrzymuje pasek na miejscu.
   *
   * Panel na telefonie zaczyna się tuż pod paskiem i jest do niego
   * przypięty, a krzyżyk zamykający siedzi w samym pasku — schowanie go
   * zabrałoby jedyne wyjście z otwartego menu.
   */
  const schowany = zjechal && !mobileOpen && !openMega;

  const mega = navigation.find(
    (e): e is Extract<NavEntry, { kind: 'mega' }> =>
      e.kind === 'mega' && e.label === openMega,
  );

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setOpenMega(null)}
        /*
          Wejście klawiaturą wyciąga schowany pasek z powrotem — inaczej
          ogniskowanie trafiałoby w odnośniki stojące poza ekranem.

          Tym razem jest to bezpieczne, w odróżnieniu od poprzedniej wersji
          z ciemną listwą: pokazanie paska nie zamienia go na inny i niczego
          nie robi `inert`, więc nie ma jak zabrać kliknięcia ani zgubić
          ogniskowania. Myszą i tak nie da się kliknąć paska, którego nie
          ma na ekranie.
        */
        onFocusCapture={() => setZjechal(false)}
        /*
          `translate`, nie `transform`. Tailwind 4 nie składa już `transform`,
          tylko ustawia osobne właściwości, więc `-translate-y-full` daje
          `translate: 0 -100%`. Animowanie `transform` nie robiło tu
          niczego — pasek przeskakiwał w jednej klatce. Zmierzone.
        */
        className={`sticky top-0 z-40 border-b border-line transition-[translate,background-color,box-shadow] duration-300 ease-out ${
          schowany ? '-translate-y-full' : 'translate-y-0'
        } ${
          mega
            ? 'bg-white shadow-card'
            : `bg-white/86 backdrop-blur-[20px] backdrop-saturate-[180%] ${scrolled ? 'shadow-card' : ''}`
        }`}
      >
        {/* 56 px na telefonie zamiast 64: pasek jest przyklejony, więc każdy
            piksel jego wysokości zabiera treści miejsce na każdym ekranie.
            Przycisk menu ma dalej 44 px, czyli tyle, ile trzeba na palec.
            Wysokość musi zgadzać się z `top-14` panelu menu niżej. */}
        <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5 lg:h-18 lg:px-12">
          <div className="flex items-center gap-11">
            <Link
              href="/"
              aria-label="BusiKM — strona główna"
              className="flex items-center gap-2.5 text-[19px] font-bold tracking-[-0.02em] text-ink lg:text-[20px]"
            >
              <Logo decorative className="size-8 flex-none lg:size-9" />
              {/* Sam znak na telefonie. Napis powtarzał to, co ikona już mówi,
                  a przy 375 px każde takie powtórzenie kosztuje miejsce. */}
              <span className="hidden lg:inline">BusiKM</span>
            </Link>

            <nav aria-label="Główna" className="hidden items-center gap-[30px] lg:flex">
              {navigation.map((entry) => {
                const active = isActive(pathname, entry.href);

                if (entry.kind === 'link') {
                  return (
                    <Link
                      key={entry.href}
                      href={entry.href}
                      aria-current={active ? 'page' : undefined}
                      onMouseEnter={() => setOpenMega(null)}
                      className={`text-[15px] font-medium transition-colors hover:text-blue ${
                        active ? 'text-blue' : 'text-ink'
                      }`}
                    >
                      {entry.label}
                    </Link>
                  );
                }

                const open = openMega === entry.label;
                /* Pozycja jest wyłącznie wyzwalaczem menu: najechanie i wejście
                   klawiaturą rozwijają listę, kliknięcie nie robi nic i nigdzie
                   nie prowadzi. Strony zbiorcze nie istnieją. */
                return (
                  <button
                    key={entry.label}
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onMouseEnter={() => setOpenMega(entry.label)}
                    onFocus={() => setOpenMega(entry.label)}
                    className={`inline-flex items-center gap-1.5 text-[15px] font-medium transition-colors hover:text-blue ${
                      open || active ? 'text-blue' : 'text-ink'
                    }`}
                  >
                    {entry.label}
                    <span
                      aria-hidden
                      className={`text-[12px] transition-transform duration-200 ${
                        open ? 'rotate-180 text-blue' : 'text-muted'
                      }`}
                    >
                      {CARET}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3.5 lg:gap-7">
            <a
              href={appLinks.login}
              className="hidden items-center gap-2 text-[15px] font-medium text-ink/65 transition-colors hover:text-ink lg:inline-flex"
            >
              <UserIcon className="size-[18px]" />
              Zaloguj się
            </a>

            {/* Na telefonie tego przycisku nie ma i to jest celowe: pełny
                pasek widać wyłącznie na górze strony, gdzie w hero stoi już
                duży „Zobacz demo". Dwa te same wezwania na jednym ekranie
                zabierały miejsce przy 375 px i nie dodawały niczego.

                Wraca w listwie zwartej po przewinięciu — tam treściowy
                przycisk jest już poza ekranem i wezwanie ma po co być.

                Na desktopie zostaje: pasek jest szeroki, a przycisk siedzi
                w prawym rogu, gdzie go się szuka. */}
            <Link
              href={appLinks.demo}
              className="hidden h-10 items-center rounded-btn border border-line bg-white px-3.5 text-[14px] font-medium text-ink transition-colors hover:border-muted hover:text-ink lg:flex lg:px-[18px] lg:text-[15px]"
            >
              Zobacz demo
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Zamknij menu' : 'Menu'}
              aria-expanded={mobileOpen}
              className="-mr-2.5 flex size-11 cursor-pointer items-center justify-center lg:hidden"
            >
              <IkonaMenu otwarte={mobileOpen} className="bg-ink" />
            </button>
          </div>
        </div>

        {/* Rozwinięte menu */}
        {mega && (
          <div
            onClick={zamknijPoKliknieciu}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-white lg:block"
          >
            {mega.compact ? (
              <div className="mx-auto max-w-[1120px] px-12 py-8">
                <ul className="grid max-w-[560px] grid-cols-2 gap-x-10 gap-y-1.5">
                  {mega.groups[0].items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="-mx-3.5 block rounded-btn px-3.5 py-3 transition-colors hover:bg-mist"
                      >
                        <span className="block text-[15px] font-semibold text-ink">
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-caption leading-relaxed text-muted">
                          {item.benefit}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : mega.cards ? (
              <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-12 py-10">
                <div className="grid grid-cols-4 gap-4">
                  {dlaKogo[0].items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex flex-col gap-3 rounded-card border border-line p-6 transition-colors hover:bg-mist"
                    >
                      <span className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">
                        {item.device}
                      </span>
                      <span className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                        {item.label}
                      </span>
                      <span className="text-caption leading-relaxed text-muted">
                        {item.benefit}
                      </span>
                    </Link>
                  ))}
                </div>
                <p className="text-[13px] leading-relaxed text-muted">{rolesNote}</p>
              </div>
            ) : (
              <div className="mx-auto grid max-w-[1120px] grid-cols-[1fr_1fr_1fr_300px] gap-10 px-12 pt-10 pb-12">
                {coRobi.map((group) => (
                  <div key={group.heading} className="flex flex-col gap-5">
                    <div className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">
                      {group.heading}
                    </div>
                    <ul className="flex flex-col gap-1.5">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className="-mx-3.5 block rounded-btn px-3.5 py-3 transition-colors hover:bg-mist"
                          >
                            <span className="block text-[15px] font-semibold text-ink">
                              {item.label}
                            </span>
                            <span className="mt-0.5 block text-caption leading-relaxed text-muted">
                              {item.benefit}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {mega.promo && (
                  <div className="flex flex-col justify-between gap-6 rounded-card bg-mist p-7">
                    <div className="flex flex-col gap-2.5">
                      <div className="text-[20px] font-semibold tracking-[-0.01em] text-ink">
                        {mega.promo.label}
                      </div>
                      <div className="text-caption leading-relaxed text-muted">
                        {mega.promo.benefit}
                      </div>
                    </div>
                    <DemoPreview />
                    <Link
                      href={mega.promo.href}
                      className="text-[15px] font-semibold text-blue"
                    >
                      Zapisz się po demo →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Przyciemnienie strony pod otwartym menu */}
      {mega && (
        <div
          aria-hidden
          onPointerDown={() => setOpenMega(null)}
          className="fixed inset-0 top-18 z-30 hidden bg-ink/18 lg:block"
        />
      )}

      {/* Menu na telefonie. Poza <header>, bo backdrop-filter tworzy
          containing block dla position: fixed. */}
      {mobileOpen && (
        <div
          onClick={zamknijPoKliknieciu}
          className="fixed inset-x-0 top-14 bottom-0 z-40 flex flex-col bg-white lg:hidden"
        >
          {/* Jedna lista sekcji, każda w tym samym rytmie: nadtytuł, potem
              wiersze „nazwa + po co to". Wcześniej panel mieszał trzy wzorce,
              a podstrony Pomocy nie miały tu żadnej drogi wejścia.

              Bez przypiętej stopki z przyciskami. Zasłaniała ostatnie wiersze
              listy (widać to było na „Ile zostaje"), a te same wezwania stoją
              teraz w sekcji „Zacznij" — w tym samym rytmie, co reszta. */}
          <nav
            aria-label="Menu"
            className="flex flex-1 flex-col gap-8 overflow-y-auto px-5 pt-6 pb-12"
          >
            {menuMobilne.map((sekcja) => (
              <div key={sekcja.heading} className="flex flex-col gap-2">
                <h2 className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
                  {sekcja.heading}
                </h2>
                <div className="flex flex-col">
                  {sekcja.items.map((item, i, all) => {
                    const czynny = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        aria-current={czynny ? 'page' : undefined}
                        className={`py-3.5 ${i < all.length - 1 ? 'border-b border-line' : ''}`}
                      >
                        <b
                          className={`block text-[16px] leading-snug ${
                            czynny ? 'text-blue' : 'text-ink'
                          }`}
                        >
                          {item.label}
                        </b>
                        {item.benefit && (
                          <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">
                            {item.benefit}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
