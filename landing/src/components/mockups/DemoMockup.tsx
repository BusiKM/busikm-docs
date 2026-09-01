import { Chrome } from '@/components/mockups/Chrome';
import { appLinks } from '@/content/navigation';
import Link from 'next/link';

const tiles = [
  { title: 'Pulpit z zyskiem miesiąca', meta: '62 480 zł', big: true },
  { title: 'Dyspozytornia z mapą', meta: '6 zleceń · 3 w trasie', big: false },
  { title: 'Zlecenie, z którego powstaje faktura', meta: 'Warszawa → Mediolan', big: false },
  { title: 'Komplet dokumentów dla księgowej', meta: 'sierpień · 9 zestawień', big: false },
] as const;

/** Ekran startowy demo — cztery kafelki i wejście. */
export function DemoMockup() {
  return (
    <div className="flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-16/10 lg:rounded-panel">
      <Chrome label="demo.busikm.pl · Trans-Bus Kowalski · firma przykładowa" />

      <div className="flex flex-1 flex-col justify-center gap-6 p-5 lg:gap-10 lg:p-14">
        <div className="text-[12px] font-medium tracking-[0.1em] text-muted uppercase lg:text-caption">
          Od czego zaczniesz?
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-4">
          {tiles.map((tile) => (
            <div
              key={tile.title}
              className="flex min-h-[110px] flex-col justify-between rounded-card border border-line p-4 lg:min-h-[190px] lg:p-6"
            >
              <div className="text-[15px] leading-tight font-semibold lg:text-body">
                {tile.title}
              </div>
              <div
                className={
                  tile.big
                    ? 'text-[20px] font-bold tracking-[-0.02em] lg:text-[28px]'
                    : 'text-[13px] text-muted lg:text-caption'
                }
              >
                {tile.meta}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-7">
          <Link
            href={appLinks.demo}
            className="flex h-[52px] items-center justify-center rounded-btn bg-blue px-7 text-body font-semibold text-white hover:bg-blue-dark hover:text-white lg:h-14"
          >
            Wejdź do demo
          </Link>
          <Link href={appLinks.trial} className="text-center text-[16px] font-medium lg:text-body">
            Chcesz na swoich danych? Wypróbuj 14 dni →
          </Link>
        </div>
      </div>
    </div>
  );
}
