'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import {
  appLinks,
  coRobi,
  dlaKogo,
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

/** Poniżej tej wysokości pasek zawsze wygląda normalnie — jesteśmy jeszcze w hero. */
const HERO_END = 640;
/** Mniejsze ruchy kółka ignorujemy, żeby pasek nie drgał. */
const MIN_DELTA = 8;

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  // W dół — pasek zamienia się w listwę z akcją. W górę — wraca menu.
  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);

      if (y < HERO_END) {
        lastY.current = y;
        setCompact(false);
        return;
      }

      const delta = y - lastY.current;
      if (Math.abs(delta) < MIN_DELTA) return;
      lastY.current = y;
      setCompact(delta > 0);
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

  // Otwarte menu i wejście klawiaturą zawsze przywracają pełny pasek —
  // inaczej nawigacja byłaby nieosiągalna z klawiatury.
  useEffect(() => {
    if (mobileOpen || openMega) setCompact(false);
  }, [mobileOpen, openMega]);

  useEffect(() => {
    setOpenMega(null);
    setMobileOpen(false);
  }, [pathname]);

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

  const mega = navigation.find(
    (e): e is Extract<NavEntry, { kind: 'mega' }> =>
      e.kind === 'mega' && e.label === openMega,
  );

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setOpenMega(null)}
        onFocusCapture={() => setCompact(false)}
        className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-300 ease-out ${
          compact
            ? 'border-line-dark bg-ink shadow-card'
            : mega
              ? 'border-line bg-white shadow-card'
              : `border-line bg-white/86 backdrop-blur-[20px] backdrop-saturate-[180%] ${scrolled ? 'shadow-card' : ''}`
        }`}
      >
        <div className="relative mx-auto h-16 max-w-[1440px] lg:h-18">
          {/* Pełny pasek — widoczny w hero i po przewinięciu w górę. */}
          <div
            inert={compact || undefined}
            className={`absolute inset-0 flex items-center justify-between px-5 transition-opacity ease-out lg:px-12 ${
              compact
                ? 'pointer-events-none opacity-0 duration-200'
                : 'opacity-100 duration-300 delay-150'
            }`}
          >
          <div className="flex items-center gap-11">
            <Link
              href="/"
              aria-label="BusiKM — strona główna"
              className="flex items-center gap-2.5 text-[19px] font-bold tracking-[-0.02em] text-ink lg:text-[20px]"
            >
              <Logo decorative className="size-8 flex-none lg:size-9" />
              BusiKM
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

            <Link
              href={appLinks.demo}
              className={`h-10 items-center rounded-btn border border-line bg-white px-3.5 text-[14px] font-medium text-ink transition-colors hover:border-muted hover:text-ink lg:flex lg:px-[18px] lg:text-[15px] ${
                mobileOpen ? 'hidden' : 'flex'
              }`}
            >
              Zobacz demo
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Zamknij menu' : 'Menu'}
              aria-expanded={mobileOpen}
              className="-mr-2.5 flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              {mobileOpen ? (
                <span className="text-[22px] leading-none text-ink">×</span>
              ) : (
                <>
                  <span className="h-0.5 w-5 bg-ink" />
                  <span className="h-0.5 w-5 bg-ink" />
                </>
              )}
            </button>
          </div>
          </div>

          {/* Listwa z akcją — po przewinięciu w dół. Menu schodzi, bo czytelnik
              jest już w treści; zostaje droga wejścia, której nie ma na ekranie. */}
          <div
            inert={!compact || undefined}
            className={`absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center px-5 transition-opacity ease-out lg:px-12 ${
              compact
                ? 'opacity-100 duration-300 delay-150'
                : 'pointer-events-none opacity-0 duration-200'
            }`}
          >
            <Link
              href="/"
              aria-label="BusiKM — strona główna"
              className="flex w-fit items-center gap-2.5 text-[19px] font-bold tracking-[-0.02em] text-paper hover:text-paper lg:text-[20px]"
            >
              <Logo decorative className="size-8 flex-none lg:size-9" />
              <span className="hidden sm:inline">BusiKM</span>
            </Link>

            <Link
              href={appLinks.demo}
              className="flex h-10 items-center gap-2 rounded-btn bg-blue px-4 text-[14px] font-semibold text-white transition-colors hover:bg-blue-dark hover:text-white lg:px-6 lg:text-[15px]"
            >
              Zobacz demo
              <span aria-hidden className="text-[13px] opacity-70">
                →
              </span>
            </Link>

            <div className="flex items-center justify-end gap-3.5">
              <a
                href={appLinks.login}
                className="hidden items-center gap-2 text-[15px] font-medium text-paper/65 transition-colors hover:text-paper lg:inline-flex"
              >
                <UserIcon className="size-[18px]" />
                Zaloguj się
              </a>

              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className="-mr-2.5 flex size-11 cursor-pointer flex-col items-center justify-center gap-1.5 lg:hidden"
              >
                <span className="h-0.5 w-5 bg-paper" />
                <span className="h-0.5 w-5 bg-paper" />
              </button>
            </div>
          </div>
        </div>

        {/* Rozwinięte menu */}
        {mega && (
          <div className="absolute inset-x-0 top-full hidden border-b border-line bg-white lg:block">
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
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-white lg:hidden">
          <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-5 py-6">
            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
                Co robi
              </div>
              <div className="flex flex-col text-[16px]">
                {coRobi
                  .flatMap((g) => g.items)
                  .map((item, i, all) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`py-3 ${i < all.length - 1 ? 'border-b border-line' : ''}`}
                    >
                      <b className="text-ink">{item.label}</b>
                      <div className="text-[13px] text-muted">{item.benefit}</div>
                    </Link>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase">
                Dla kogo
              </div>
              <div className="flex flex-wrap gap-2 text-[14px] font-semibold">
                {dlaKogo[0].items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full bg-mist px-3.5 py-2.5 text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex gap-6 text-[16px] font-semibold">
              <Link href="/cennik" className="text-ink">
                Cennik
              </Link>
              <Link href="/pomoc" className="text-ink">
                Pomoc
              </Link>
              <a href={appLinks.login} className="text-ink">
                Zaloguj się
              </a>
            </div>
          </div>

          <div className="flex flex-none flex-col gap-2.5 border-t border-line px-5 pt-4 pb-6">
            <Link
              href={appLinks.trial}
              className="flex h-[52px] items-center justify-center rounded-btn bg-blue text-body font-semibold text-white hover:text-white"
            >
              Wypróbuj 14 dni
            </Link>
            <Link
              href={appLinks.demo}
              className="flex h-[52px] items-center justify-center rounded-btn border border-line text-body font-semibold text-ink hover:text-ink"
            >
              Zobacz demo
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
