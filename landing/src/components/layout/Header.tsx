'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/layout/Logo';
import { appLinks, navigation, rolesNote, type NavEntry } from '@/content/navigation';

/**
 * Pasek nawigacji — wg docs/landing/03-architektura-informacji.md.
 *
 * Dwa rozwijane menu, w których każda pozycja niesie korzyść i zdanie
 * wyjaśnienia. Wygląd paska (72 px, białe tło z rozmyciem, cień po przewinięciu
 * 24 px, pigułka pod aktywną pozycją) zostaje z poprzedniego projektu —
 * dochodzi zawartość menu.
 */

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Cień pod paskiem po przewinięciu 24 px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Zmiana strony zamyka wszystko.
  useEffect(() => {
    setOpenMega(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  // Escape zamyka, menu mobilne blokuje przewijanie pod spodem.
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

  // Kliknięcie poza nagłówkiem zamyka rozwinięte menu.
  useEffect(() => {
    if (!openMega) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMega(null);
    };
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [openMega]);

  const megaEntry = navigation.find(
    (e): e is Extract<NavEntry, { kind: 'mega' }> =>
      e.kind === 'mega' && e.label === openMega,
  );

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setOpenMega(null)}
        className={`sticky top-0 z-30 border-b border-ink/8 bg-white/72 backdrop-blur-[20px] backdrop-saturate-[180%] transition-shadow duration-200 ${
          scrolled ? 'shadow-nav' : ''
        }`}
      >
        <div className="mx-auto grid h-18 max-w-[1120px] grid-cols-[1fr_auto] items-center px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <Link href="/" aria-label="BusiKM — strona główna" className="w-fit">
            <Logo className="h-9 w-9 lg:h-10 lg:w-10" />
          </Link>

          <nav aria-label="Główna" className="hidden items-center gap-1 lg:flex">
            {navigation.map((entry) => {
              const active = isActive(pathname, entry.href);
              const pill = `rounded-full px-3.5 py-2 text-[15px] transition-colors ${
                active
                  ? 'bg-blue-soft font-semibold text-ink'
                  : 'text-ink/60 hover:text-ink'
              }`;

              if (entry.kind === 'link') {
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    aria-current={active ? 'page' : undefined}
                    className={pill}
                    onMouseEnter={() => setOpenMega(null)}
                  >
                    {entry.label}
                  </Link>
                );
              }

              const open = openMega === entry.label;
              return (
                <button
                  key={entry.label}
                  type="button"
                  aria-expanded={open}
                  aria-haspopup="true"
                  onMouseEnter={() => setOpenMega(entry.label)}
                  onClick={() => setOpenMega(open ? null : entry.label)}
                  className={`${pill} inline-flex cursor-pointer items-center gap-1.5`}
                >
                  {entry.label}
                  <span
                    aria-hidden
                    className={`text-[10px] transition-transform duration-200 ${
                      open ? 'rotate-180' : ''
                    }`}
                  >
                    ▾
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <a
              href={appLinks.login}
              className="hidden text-[15px] font-medium text-ink hover:text-blue lg:inline"
            >
              Zaloguj się
            </a>
            <Link
              href={appLinks.demo}
              className="hidden h-10 items-center rounded-full bg-blue px-5 text-[15px] font-semibold text-white hover:bg-blue-dark hover:text-white lg:inline-flex"
            >
              Zobacz demo
            </Link>

            {/* telefon — przy otwartym menu zostaje samo logo i × */}
            <Link
              href={appLinks.demo}
              className={`h-9 items-center rounded-full bg-blue px-4 text-caption font-semibold text-white hover:text-white lg:hidden ${
                mobileOpen ? 'hidden' : 'flex'
              }`}
            >
              Demo
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? 'Zamknij menu' : 'Menu'}
              aria-expanded={mobileOpen}
              className="flex h-[22px] w-[22px] cursor-pointer flex-col justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`h-[1.5px] w-full bg-ink transition-transform duration-200 ${
                  mobileOpen ? 'translate-y-[3.25px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-ink transition-transform duration-200 ${
                  mobileOpen ? '-translate-y-[3.25px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Rozwinięte menu — kolumny z korzyściami plus kafel */}
        {megaEntry && (
          <div className="absolute inset-x-0 top-full hidden border-b border-line bg-white lg:block">
            <div className="mx-auto grid max-w-[1120px] gap-10 px-10 py-9 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]">
              {megaEntry.groups.map((group) => (
                <div key={group.heading}>
                  <div className="mb-4 font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">
                    {group.heading}
                  </div>
                  <ul className="flex flex-col gap-3.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className="group block">
                          <span className="block text-[15px] font-semibold text-ink group-hover:text-blue">
                            {item.label}
                          </span>
                          <span className="block text-caption text-muted">
                            {item.benefit}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {megaEntry.promo ? (
                <Link
                  href={megaEntry.promo.href}
                  className="flex h-fit flex-col gap-1.5 rounded-card border border-blue/25 bg-blue-soft p-6 transition-colors hover:border-blue/45"
                >
                  <span className="text-[15px] font-semibold text-ink">
                    {megaEntry.promo.label} →
                  </span>
                  <span className="text-caption text-muted">
                    {megaEntry.promo.benefit}
                  </span>
                </Link>
              ) : (
                <p className="self-end text-caption text-muted">{rolesNote}</p>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Menu na telefonie. Poza <header>, bo backdrop-filter tworzy
          containing block dla position: fixed. */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-18 bottom-0 z-20 overflow-y-auto bg-paper px-5 pb-10 lg:hidden">
          <nav aria-label="Główna — telefon" className="flex flex-col">
            {navigation.map((entry) => {
              if (entry.kind === 'link') {
                return (
                  <Link
                    key={entry.href}
                    href={entry.href}
                    className={`border-b border-line py-[18px] text-[28px] font-medium tracking-[-0.01em] ${
                      isActive(pathname, entry.href) ? 'text-blue' : 'text-ink'
                    }`}
                  >
                    {entry.label}
                  </Link>
                );
              }

              const open = mobileSection === entry.label;
              return (
                <div key={entry.label} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setMobileSection(open ? null : entry.label)}
                    className="flex w-full cursor-pointer items-center justify-between py-[18px] text-left text-[28px] font-medium tracking-[-0.01em] text-ink"
                  >
                    {entry.label}
                    <span
                      aria-hidden
                      className={`text-[16px] text-muted transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {open && (
                    <div className="flex flex-col gap-7 pb-7">
                      {entry.groups.map((group) => (
                        <div key={group.heading}>
                          <div className="mb-3.5 font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">
                            {group.heading}
                          </div>
                          <ul className="flex flex-col gap-4">
                            {group.items.map((item) => (
                              <li key={item.href}>
                                <Link href={item.href} className="block">
                                  <span className="block text-[17px] font-semibold text-ink">
                                    {item.label}
                                  </span>
                                  <span className="block text-caption text-muted">
                                    {item.benefit}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}

                      {entry.label === 'Dla kogo' && (
                        <p className="text-caption text-muted">{rolesNote}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={appLinks.demo}
              className="flex h-[52px] items-center justify-center rounded-btn bg-blue text-body font-semibold text-white hover:text-white"
            >
              Zobacz demo
            </Link>
            <a
              href={appLinks.login}
              className="flex h-[52px] items-center justify-center rounded-btn border border-line bg-white text-body font-semibold text-ink hover:text-ink"
            >
              Zaloguj się
            </a>
          </div>
        </div>
      )}
    </>
  );
}
