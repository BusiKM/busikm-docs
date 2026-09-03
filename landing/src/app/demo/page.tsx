import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { DemoMockup } from '@/components/mockups/DemoMockup';
import { pageMetadata } from '@/components/layout/PageShell';
import { appLinks } from '@/content/navigation';

export const metadata = pageMetadata('demo');

const kafelki = [
  ['Pulpit z zyskiem', 'trzy liczby i mapa, tak jak widzi to właściciel'],
  ['Dyspozytornia', 'zlecenia, mapa i kierowca obok siebie'],
  ['Zlecenie z fakturą', 'jak jedno robi się drugim'],
  ['Komplet dla księgowej', 'dziewięć zestawień, jeden przycisk'],
] as const;

/**
 * Demo — wg projektu „BusiKM Demo" z Claude Design (design/16-demo).
 * Treść: docs/landing/03, punkt 4.
 *
 * Najkrótsza strona serwisu i ma taka zostać: jeden ekran, piętnaście sekund
 * czytania. Bez drobiazgów, bez pytań, bez finału i bez stopki — jedynym
 * wyjściem stąd jest wejście do demo.
 */
export default function Page() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-paper px-6 py-16 lg:px-12 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
        />

        <Container className="relative grid gap-12 lg:grid-cols-[480px_1fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8 lg:gap-9">
            <div className="flex flex-col gap-5">
              <Eyebrow>Demo</Eyebrow>
              <h1
                data-reveal
                className="text-display-m font-bold text-balance lg:text-[62px] lg:leading-[1.05] lg:tracking-[-0.03em]"
              >
                Wejdź i poklikaj.
              </h1>
              <div
                data-reveal
                className="flex flex-col gap-1.5 text-[17px] leading-relaxed text-muted lg:text-[19px]"
              >
                <span>To prawdziwa aplikacja z przykładową firmą.</span>
                <span>Bez zakładania konta, bez podawania czegokolwiek.</span>
                <span>Niczego nie zepsujesz — dane wracają do porządku każdej nocy.</span>
              </div>
            </div>

            <div data-reveal className="flex flex-col gap-3.5">
              <div className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">
                Co warto zobaczyć w środku
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {kafelki.map(([tytul, opis]) => (
                  <div
                    key={tytul}
                    className="flex flex-col gap-1 rounded-[14px] border border-line bg-white px-4 py-3.5 text-[14px] leading-snug"
                  >
                    <b>{tytul}</b>
                    <span className="text-muted">{opis}</span>
                  </div>
                ))}
              </div>
            </div>

            <div data-reveal className="flex flex-col gap-3.5">
              <Button href={appLinks.demo} size="duzy" fullWidth className="lg:w-auto lg:self-start">
                Wejdź do demo
              </Button>
              <Link href={appLinks.trial} className="text-[15px] font-medium text-blue">
                Chcesz na swoich danych? Wypróbuj 14 dni →
              </Link>
            </div>
          </div>

          <div data-reveal className="relative flex flex-col gap-5">
            <div
              aria-hidden
              className="absolute right-[10%] bottom-30 left-[10%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[100px]"
            />
            <div className="relative">
              <MockupSlot
                file="mockup-demo-ekran-desktop.png"
                label="Wejście do demo · desktop 1440"
                note="Demo od środka: pasek „to demo”, przełącznik roli i pulpit właściciela. Ten sam ekran co na stronie głównej."
                ratio="16:10"
                noteClassName="mx-auto max-w-[600px]"
              >
                <DemoMockup />
              </MockupSlot>
            </div>

            <div className="relative grid gap-2.5 text-[13px] leading-snug lg:grid-cols-[1fr_1fr_1.4fr]">
              <div className="rounded-[14px] border border-line px-4 py-3.5 text-muted">
                Pasek u góry mówi, że to demo i że dane resetują się co noc.
              </div>
              <div className="rounded-[14px] border border-line px-4 py-3.5 text-muted">
                Tryb tylko do odczytu, nic się nie psuje.
              </div>
              <div className="flex flex-col gap-1 rounded-[14px] bg-ink px-4 py-3.5 text-paper">
                <b className="text-[14px]">Przełącznik roli: właściciel · dyspozytor · księgowa</b>
                <span className="text-ink-muted">W minutę widzisz trzy różne stanowiska pracy.</span>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
