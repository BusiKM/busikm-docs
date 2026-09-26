import { Section } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { PulpitMockup } from '@/components/mockups/PulpitMockup';
import { MapaFloty } from '@/components/mockups/MapaFloty';
import { TabelaZlecenWaska } from '@/components/mockups/rentownosc/TabelaZlecen';
import { DokumentyMockup } from '@/components/mockups/DokumentyMockup';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

type Opis = { label: string; note: string; caption: string };

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  pulpit: Opis;
  mapa: Opis;
  zysk: Opis;
  dokumenty: Opis;
}> = {
  pl: {
    naglowek: 'Cztery ekrany, które widzisz codziennie.',
    pulpit: {
      label: 'Pulpit właściciela · desktop',
      note: 'Trzy liczby u góry, mapa z trasą, lista zleceń ze statusami.',
      caption: 'Pulpit z zyskiem',
    },
    mapa: {
      label: 'Mapa floty · desktop',
      note: 'Mapa Europy z trasami i dymkiem nad pojazdem: kierowca, zlecenie, godzina dojazdu.',
      caption: 'Mapa floty',
    },
    zysk: {
      label: 'Rentowność zleceń · desktop, tryb nocny',
      note: 'Zlecenia posortowane po marży, zlecenie na minusie na dole listy.',
      caption: 'Rentowność zleceń',
    },
    dokumenty: {
      label: 'Dokumenty i terminy · desktop',
      note: 'Lista dokumentów po dniach do końca ważności, paski w trzech kolorach.',
      caption: 'Dokumenty i terminy',
    },
  },
  en: {
    naglowek: 'Four screens you see every day.',
    pulpit: {
      label: 'Owner’s dashboard · desktop',
      note: 'Three figures at the top, a map with the route, a list of orders with their status.',
      caption: 'Dashboard with profit',
    },
    mapa: {
      label: 'Fleet map · desktop',
      note: 'Map of Europe with routes and a bubble over the vehicle: driver, order, arrival time.',
      caption: 'Fleet map',
    },
    zysk: {
      label: 'Order profitability · desktop, dark mode',
      note: 'Orders sorted by margin, the loss-making one at the bottom of the list.',
      caption: 'Order profitability',
    },
    dokumenty: {
      label: 'Documents and deadlines · desktop',
      note: 'Documents listed by days to expiry, with bars in three colours.',
      caption: 'Documents and deadlines',
    },
  },
};

/**
 * Cztery ekrany, które właściciel widzi codziennie — wszystkie już narysowane
 * przy podstronach obszarowych. Strona roli tylko je zestawia, więc nazwy
 * plików są dokładnie te same i jeden zrzut obsłuży oba miejsca.
 */
export function Ekrany() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="flex flex-col gap-10 lg:gap-18">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div data-reveal-group className="grid gap-8 lg:grid-cols-2 lg:gap-6">
          <div data-reveal>
            <MockupSlot
              file="mockup-hero-pulpit-desktop.png"
              label={t.pulpit.label}
              note={t.pulpit.note}
              ratio="16:10"
              caption={t.pulpit.caption}
            >
              <PulpitMockup />
            </MockupSlot>
          </div>

          <div data-reveal>
            <MockupSlot
              file="mockup-mapa-flota-desktop.png"
              label={t.mapa.label}
              note={t.mapa.note}
              ratio="16:10"
              caption={t.mapa.caption}
            >
              <MapaFloty />
            </MockupSlot>
          </div>

          <div data-reveal>
            <MockupSlot
              file="mockup-zysk-tabela-desktop.png"
              label={t.zysk.label}
              note={t.zysk.note}
              ratio="16:10"
              caption={t.zysk.caption}
            >
              <TabelaZlecenWaska />
            </MockupSlot>
          </div>

          <div data-reveal>
            <MockupSlot
              file="mockup-dokumenty-terminy-desktop.png"
              label={t.dokumenty.label}
              note={t.dokumenty.note}
              ratio="4:3"
              box="16:10"
              caption={t.dokumenty.caption}
            >
              <DokumentyMockup />
            </MockupSlot>
          </div>
        </div>
      </div>
    </Section>
  );
}
