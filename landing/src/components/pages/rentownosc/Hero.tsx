import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { KartaZysku } from '@/components/mockups/KartaZysku';

/**
 * Nagłówek strony — ciemny. Jedyne miejsce na landingu, w którym wolno
 * postawić naprawdę dużą liczbę: stoi obok karty, nie w niej.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow dark>Ile zostaje</Eyebrow>
        <h1
          data-reveal
          className="max-w-[980px] text-display-m font-bold text-balance lg:text-display"
        >
          Wiesz, ile zostaje. <br className="hidden lg:inline" />
          Na tym kursie. Dziś.
        </h1>
        <p
          data-reveal
          className="max-w-[680px] text-lead-m text-pretty text-ink-muted lg:text-lead"
        >
          Fracht minus paliwo, opłaty drogowe, nocleg i koszt kierowcy. Kierowca dodaje paragon
          w trasie — liczba zmienia się od razu.
        </p>
      </Container>

      <Container className="relative mt-16 grid gap-10 pb-24 lg:mt-24 lg:grid-cols-[520px_1fr] lg:items-center lg:gap-20 lg:pb-40">
        <div data-reveal className="relative">
          <div
            aria-hidden
            className="absolute right-[10%] bottom-5 left-[10%] h-25 bg-blue opacity-35 blur-[60px] lg:bottom-20 lg:h-40 lg:blur-[100px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-zysk-karta-desktop.png"
              label="Karta zysku · desktop, tryb nocny"
              note="Karta zlecenia Warszawa → Mediolan: fracht, rozbicie kosztów w wierszach, zysk na dole, obok mały wykres dzienny."
              ratio="4:3"
              dark
            >
              <KartaZysku />
            </MockupSlot>
          </div>
        </div>

        <div data-reveal className="flex flex-col gap-2 lg:gap-3">
          <Eyebrow dark>Zostaje</Eyebrow>
          <div className="text-[56px] leading-none font-bold tracking-[-0.04em] lg:text-[120px]">
            6 009 zł
          </div>
          <p className="max-w-[460px] text-[16px] leading-relaxed text-ink-muted lg:text-lead">
            z 3 900 € frachtu. Liczba zmieni się, gdy Marek doda kolejny paragon.
          </p>
        </div>
      </Container>
    </section>
  );
}
