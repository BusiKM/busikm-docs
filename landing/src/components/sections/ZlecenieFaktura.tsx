import { Section, Bullets } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { ZlecenieFakturaMockup } from '@/components/mockups/ZlecenieFakturaMockup';

/** 6.7 — ze zlecenia robi się faktura. */
export function ZlecenieFaktura() {
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-7 lg:order-2">
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            Ze zlecenia robi się faktura. <br className="hidden lg:inline" />
            Klient ma ją, zanim wrócisz do biura.
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            Zlecenie i faktura to jedno. Kierowca kończy kurs, Ty sprawdzasz kwotę i wysyłasz —
            plik na mail klienta i zgłoszenie do systemu e-faktur, jednym kliknięciem.
            Nic nie przepisujesz.
          </p>
          <Bullets
            items={[
              'Faktura powstaje z danych zlecenia',
              'Wysyłka do klienta i do systemu e-faktur jednym kliknięciem',
              'Korekty i zaliczki tą samą ścieżką',
            ]}
          />
        </div>

        <div data-reveal className="lg:order-1">
          <MockupSlot
            file="mockup-faktury-zlecenie-desktop.png"
            label="Zlecenie i faktura · desktop"
            note="Karta zlecenia po lewej, faktura po prawej, strzałka między nimi, przycisk „Wyślij”, znaczniki: mail, e-faktura."
            ratio="4:3"
          >
            <ZlecenieFakturaMockup />
          </MockupSlot>
        </div>
      </div>
    </Section>
  );
}
