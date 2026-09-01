import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ParagonMockup } from '@/components/mockups/ParagonMockup';

/** 6.11 — koszty i paragony. */
export function KosztyIParagony() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Reklamówka paragonów. Do wyrzucenia.
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Kierowca robi zdjęcie na stacji. Kwota, data i sprzedawca wpisują się same, a koszt
            trafia do właściwego zlecenia i właściwego pojazdu.
          </p>
          <Bullets
            items={[
              'Paliwo, opłaty drogowe, hotel, prom, parking, naprawa',
              'Obca waluta przeliczona automatycznie',
              'Zdjęcie zostaje jako dowód',
            ]}
          />
        </div>

        <div data-reveal>
          <MockupSlot
            file="mockup-koszty-paragon-phone.png"
            label="Koszt z paragonu · telefon"
            note="Telefon ze zdjęciem paragonu (perspektywa), obok „odklejony” panel z rozpoznanymi polami podświetlonymi na zielono."
            ratio="9:19.5"
          >
            <ParagonMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
