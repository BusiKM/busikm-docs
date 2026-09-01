import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { footerColumns } from '@/content/navigation';

/**
 * Stopka — cztery kolumny wg docs/landing/03-architektura-informacji.md.
 * Bez ikon mediów społecznościowych, dopóki nie ma tam realnych kont.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 pt-14 pb-10 lg:px-10 lg:pt-20 lg:pb-14">
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <div className="font-mono text-[10.5px] tracking-[0.12em] text-muted uppercase">
                {column.heading}
              </div>
              <div className="mt-4 flex flex-col gap-2.5 text-[15px] lg:mt-5 lg:gap-3">
                {column.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-ink hover:text-blue"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-5 text-caption text-muted lg:mt-16 lg:flex-row lg:items-center lg:gap-8 lg:pt-7">
          <span className="font-semibold text-ink">BusiKM</span>
          <span>Movgranto Sp. z o.o.</span>
          <a href="mailto:kontakt@busikm.pl">kontakt@busikm.pl</a>
          <span className="lg:ml-auto">Twoje dane zostają w Europie.</span>
        </div>
      </Container>
    </footer>
  );
}
