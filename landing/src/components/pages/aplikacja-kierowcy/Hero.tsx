import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';

/** Trzy telefony wychodzące zza dolnej krawędzi sekcji. */
function TelefonUciety({
  className = '',
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative rounded-t-[38px] border border-b-0 border-[#2A2A30] bg-black px-2 pt-2 lg:rounded-t-[44px] lg:px-2.5 lg:pt-2.5 ${className}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-t-[30px] bg-surface text-[11px] lg:rounded-t-[36px] lg:text-[12px]">
        {children}
      </div>
    </div>
  );
}

/** Nagłówek strony — ciemny, z trzema telefonami u dołu. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <svg
        viewBox="0 0 1440 1100"
        preserveAspectRatio="xMidYMin slice"
        className="pointer-events-none absolute inset-x-0 top-0 h-[900px] w-full lg:h-[1100px]"
        aria-hidden
      >
        <path
          d="M -60 900 C 300 760, 520 820, 760 560 S 1120 200, 1500 80"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="40"
          opacity=".04"
        />
        <path
          d="M -60 900 C 300 760, 520 820, 760 560 S 1120 200, 1500 80"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="2"
          opacity=".14"
        />
      </svg>

      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow dark>BusiKM Kierowca · iPhone i Android</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1040px] text-display-m font-bold text-balance lg:text-display"
        >
          Cały dzień pracy w jednej aplikacji. <br className="hidden lg:inline" />
          Bez wpisywania czegokolwiek w trasie.
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead"
        >
          Kierowca dostaje kod, wpisuje go raz i jest w środku. Reszta to trzy przyciski.
        </p>
      </Container>

      <div className="relative mt-16 flex h-[280px] items-end justify-center gap-4 lg:mt-24 lg:h-[560px] lg:gap-9">
        <div
          aria-hidden
          className="absolute inset-x-[25%] bottom-0 h-40 bg-blue opacity-35 blur-[90px] lg:h-50 lg:blur-[120px]"
        />

        <TelefonUciety className="hidden w-[250px] translate-y-10 rotate-[-4deg] opacity-70 lg:block lg:h-[420px]">
          <div className="p-4.5 text-ink-muted lg:p-5.5">
            <div className="flex justify-between">
              <span>05:40</span>
              <span>Zlecenia</span>
            </div>
            <div className="mt-5 text-[20px] font-semibold text-paper">Dziś</div>
            <div className="mt-3.5 rounded-[14px] bg-surface-2 p-3.5 text-paper">
              <b>Warszawa → Mediolan</b>
              <div className="mt-1 text-ink-muted">Załadunek 06:00</div>
            </div>
          </div>
        </TelefonUciety>

        <TelefonUciety className="z-2 h-[260px] w-[220px] shadow-[0_-20px_80px_rgba(0,0,0,.5)] lg:h-[500px] lg:w-[280px]">
          <div className="flex flex-col gap-3.5 px-4 pt-5 lg:px-5 lg:pt-6 lg:text-[13px]">
            <div className="flex justify-between text-ink-muted">
              <span>06:02</span>
              <span>WZ 4821K</span>
            </div>
            <div className="mt-2 rounded-[18px] bg-surface-2 p-4 lg:p-4.5">
              <div className="text-ink-muted">Licznik przed startem</div>
              <div className="mt-1.5 text-[24px] font-bold tracking-[-0.02em] lg:text-[30px]">
                184 210 km
              </div>
              <div className="mt-3 flex h-[70px] items-center justify-center rounded-xl bg-line-dark text-ink-muted lg:h-[90px]">
                zdjęcie licznika
              </div>
            </div>
            <div className="flex justify-between px-1 text-ink-muted">
              <span>Warszawa → Mediolan</span>
              <span className="text-green">gotowe</span>
            </div>
          </div>
          <div className="mt-auto rounded-t-[18px] bg-blue p-4 text-center text-[16px] font-semibold text-white lg:p-5 lg:text-[18px]">
            Rozpocznij trasę
          </div>
        </TelefonUciety>

        <TelefonUciety className="hidden w-[250px] translate-y-10 rotate-[4deg] opacity-70 lg:block lg:h-[420px]">
          <div className="flex flex-col gap-3.5 p-4.5 text-ink-muted lg:p-5.5">
            <div className="flex justify-between">
              <span>11:38</span>
              <span>Dodaj koszt</span>
            </div>
            <div className="flex h-30 items-center justify-center rounded-[14px] bg-[#1E1E22]">
              <div className="h-21 w-16 rounded-[3px] bg-mist" />
            </div>
            <div className="flex justify-between rounded-xl bg-surface-2 px-3.5 py-3 text-paper">
              <span className="text-ink-muted">Kwota</span>
              <b>103,30 €</b>
            </div>
          </div>
        </TelefonUciety>
      </div>
    </section>
  );
}
