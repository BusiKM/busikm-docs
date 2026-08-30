'use client';

import { useEffect, useState } from 'react';
import { Logo } from '@/components/layout/Logo';

const navItems = [
  { href: '#jak-to-dziala', label: 'Jak to działa' },
  { href: '#dlakogo', label: 'Dla kogo' },
  { href: '#cennik', label: 'Cennik' },
  { href: '#pomoc', label: 'Pomoc' },
  { href: '#kontakt', label: 'Kontakt' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Cień po przewinięciu 24px + aktywna pozycja wg sekcji pod paskiem.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const probe = window.scrollY + 100;
      let current: string | null = null;
      for (const item of navItems) {
        const el = document.querySelector(item.href);
        if (el && el.getBoundingClientRect().top + window.scrollY <= probe) {
          current = item.href;
        }
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Menu mobilne to nakładka na całą stronę — blokuj przewijanie pod spodem.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <header
          className={`sticky top-0 z-30 border-b border-ink/8 bg-white/72 backdrop-blur-[20px] backdrop-saturate-[180%] transition-shadow duration-200 ${
          scrolled ? 'shadow-nav' : ''
        }`}
      >
        <div className="mx-auto grid h-18 max-w-[1120px] grid-cols-[1fr_auto] items-center px-5 lg:grid-cols-[1fr_auto_1fr] lg:px-10">
          <a href="#" aria-label="BusiKM — początek strony" className="w-fit">
            <Logo className="h-9 w-9 lg:h-10 lg:w-10" />
          </a>

          {/* Menu wyśrodkowane */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`rounded-full px-3.5 py-2 text-[15px] transition-colors ${
                    isActive
                      ? 'bg-blue-soft font-semibold text-ink'
                      : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center justify-end gap-5">
            <a
              href="#login"
              className="hidden text-[15px] font-medium text-ink hover:text-blue lg:inline"
            >
              Zaloguj się
            </a>
            <a
              href="#demo"
              className="hidden h-10 items-center rounded-full bg-blue px-5 text-[15px] font-semibold text-white hover:bg-blue-dark hover:text-white lg:inline-flex"
            >
              Zobacz demo
            </a>

            {/* mobile — przy otwartym menu zostaje samo logo i × (jak w projekcie) */}
            <a
              href="#demo"
              className={`h-9 items-center rounded-full bg-blue px-4 text-caption font-semibold text-white hover:text-white lg:hidden ${
                open ? 'hidden' : 'flex'
              }`}
            >
              Demo
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Zamknij menu' : 'Menu'}
              aria-expanded={open}
              className="flex h-[22px] w-[22px] cursor-pointer flex-col justify-center gap-[5px] lg:hidden"
            >
              <span
                className={`h-[1.5px] w-full bg-ink transition-transform duration-200 ${
                  open ? 'translate-y-[3.25px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-[1.5px] w-full bg-ink transition-transform duration-200 ${
                  open ? '-translate-y-[3.25px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

      </header>

      {/* Nakładka paper — menu mobilne otwarte. Musi być poza <header>:
          backdrop-filter tworzy containing block dla position:fixed. */}
      {open && (
        <div className="fixed inset-x-0 top-18 bottom-0 z-20 overflow-y-auto bg-paper px-5 pb-10 lg:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active === item.href ? 'page' : undefined}
                className={`border-b border-line py-[18px] text-[28px] font-medium tracking-[-0.01em] ${
                  active === item.href ? 'text-blue' : 'text-ink hover:text-blue'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="flex h-[52px] items-center justify-center rounded-btn bg-blue text-body font-semibold text-white hover:text-white"
            >
              Zobacz demo
            </a>
            <a
              href="#login"
              onClick={() => setOpen(false)}
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
