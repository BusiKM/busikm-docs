import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { MapaFloty } from '@/components/mockups/MapaFloty';
import { TabelaZlecenWaska } from '@/components/mockups/rentownosc/TabelaZlecen';
import { DokumentyMockup } from '@/components/mockups/DokumentyMockup';

/**
 * Cztery ekrany, które właściciel widzi codziennie — wszystkie już narysowane
 * przy podstronach obszarowych. Strona roli tylko je zestawia, więc nazwy
 * plików są dokładnie te same i jeden zrzut obsłuży oba miejsca.
 */
export function Ekrany() {
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          Cztery ekrany, które widzisz codziennie.
        </h2>

        <div data-reveal-group className="grid gap-8 lg:grid-cols-2 lg:gap-6">
          <div data-reveal>
            <MockupSlot
              file="mockup-hero-pulpit-desktop.png"
              label="Pulpit właściciela · desktop"
              note="Trzy liczby u góry, mapa z trasą, lista zleceń ze statusami."
              ratio="16:10"
              caption="Pulpit z zyskiem"
            >
              <PulpitMockup />
            </MockupSlot>
          </div>

          <div data-reveal>
            <MockupSlot
              file="mockup-mapa-flota-desktop.png"
              label="Mapa floty · desktop"
              note="Mapa Europy z trasami i dymkiem nad pojazdem: kierowca, zlecenie, godzina dojazdu."
              ratio="16:10"
              caption="Mapa floty"
            >
              <MapaFloty />
            </MockupSlot>
          </div>

          <div data-reveal>
            <MockupSlot
              file="mockup-zysk-tabela-desktop.png"
              label="Rentowność zleceń · desktop, tryb nocny"
              note="Zlecenia posortowane po marży, zlecenie na minusie na dole listy."
              ratio="16:10"
              caption="Rentowność zleceń"
            >
              <TabelaZlecenWaska />
            </MockupSlot>
          </div>

          <div data-reveal>
            <MockupSlot
              file="mockup-dokumenty-terminy-desktop.png"
              label="Dokumenty i terminy · desktop"
              note="Lista dokumentów po dniach do końca ważności, paski w trzech kolorach."
              ratio="4:3"
              box="16:10"
              caption="Dokumenty i terminy"
            >
              <DokumentyMockup />
            </MockupSlot>
          </div>
        </div>
      </div>
    </Section>
  );
}
