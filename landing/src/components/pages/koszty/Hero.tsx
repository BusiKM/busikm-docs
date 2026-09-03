import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ParagonMockup } from '@/components/mockups/ParagonMockup';

/** Nagłówek strony — jasny, z telefonem w perspektywie i odklejonym panelem pól. */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper px-6 pt-24 lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:items-center lg:gap-8 lg:text-center">
        <Eyebrow>Koszty i paragony</Eyebrow>
        <h1
          data-reveal
          className="max-w-[1120px] text-display-m font-bold text-balance lg:text-display"
        >
          Reklamówka paragonów. <br className="hidden lg:inline" />
          Do wyrzucenia.
        </h1>
        <p
          data-reveal
          className="max-w-[640px] text-lead-m text-pretty text-muted lg:text-lead"
        >
          Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same.
        </p>
      </Container>

      <Container className="relative mt-16 flex flex-col items-center pb-24 lg:mt-24 lg:pb-40">
        <div data-reveal className="relative w-full lg:max-w-[600px]">
          <div
            aria-hidden
            className="absolute right-[20%] bottom-10 left-[20%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[110px]"
          />
          <div className="relative">
            <MockupSlot
              file="mockup-koszty-paragon-phone.png"
              label="Koszt z paragonu · telefon, tryb nocny"
              note="Telefon w perspektywie ze zdjęciem paragonu i wypełnionym formularzem; obok „odklejony” panel z rozpoznanymi polami. Ten sam ekran co na stronie głównej."
              ratio="9:19.5"
              box="4:5"
              noteClassName="mx-auto max-w-[600px]"
            >
              <ParagonMockup />
            </MockupSlot>
          </div>
        </div>
      </Container>
    </section>
  );
}
