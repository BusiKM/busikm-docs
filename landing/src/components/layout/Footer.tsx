import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { firma } from '@/content/firma';
import { Logo } from '@/components/layout/Logo';
import { footerColumns } from '@/content/navigation';
import { PrzyciskCookie } from '@/components/analytics/PrzyciskCookie';

/** 6.22 — stopka. Ciemna, pięć kolumn, bez ikon mediów społecznościowych. */
export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-ink px-6 pt-16 pb-10 text-paper lg:px-12 lg:pt-20">
      <Container className="flex flex-col gap-10 lg:gap-16">
        <div className="grid gap-8 text-[15px] leading-relaxed lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr] lg:gap-8">
          <Link
            href="/"
            aria-label="BusiKM — strona główna"
            className="flex h-fit items-center gap-2.5 text-[20px] font-bold tracking-[-0.02em] text-paper hover:text-paper"
          >
            <Logo decorative className="size-9 flex-none" />
            BusiKM
          </Link>

          {footerColumns.map((column) => (
            <div key={column.heading} className="flex flex-col gap-2">
              <div className="mb-2 font-semibold">{column.heading}</div>
              {column.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ink-muted hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t border-line-dark pt-6 text-caption text-ink-muted lg:gap-6">
          <span>
            {firma.nazwa} · NIP {firma.nip} ·{' '}
            <a href={`mailto:${firma.email}`} className="text-ink-muted hover:text-paper">
              {firma.email}
            </a>
          </span>
          <span className="flex flex-wrap items-center gap-4 lg:gap-6">
            <PrzyciskCookie />
            Twoje dane zostają w Europie
          </span>
        </div>
      </Container>
    </footer>
  );
}
