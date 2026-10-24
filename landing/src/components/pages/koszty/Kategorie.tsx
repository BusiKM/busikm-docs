import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  tytul: string;
  tresc: string;
  kategorie: readonly string[];
  podpowiedz: string;
}> = {
  pl: {
    tytul: 'Kategorie z życia',
    tresc:
      'Na start: paliwo, parking, opłaty drogowe, mycie, hotel kierowcy, prom, serwis i naprawy, opłata za załadunek lub rozładunek i inne. Listę rodzajów dla kierowców zmieniasz w ustawieniach.',
    kategorie: ['Paliwo', 'Parking', 'Opłaty drogowe', 'Mycie', 'Hotel kierowcy', 'Prom', 'Serwis i naprawy'],
    podpowiedz: 'lista ustalana przez firmę',
  },
  en: {
    tytul: 'Categories from real life',
    tresc:
      'Out of the box: fuel, parking, tolls, vehicle wash, driver hotel, ferry, servicing and repairs, loading or unloading fees and other. You can change the list your drivers pick from in the settings.',
    kategorie: ['Fuel', 'Parking', 'Tolls', 'Vehicle wash', 'Driver hotel', 'Ferry', 'Servicing and repairs'],
    podpowiedz: 'list set by your company',
  },
};

/** 03 – kategorie jako pigułki, pierwsza wybrana. */
export function Kategorie() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="flex flex-col gap-4 lg:gap-6">
          <div
            data-reveal
            className="text-[13px] font-semibold tracking-[0.06em] text-blue lg:text-caption"
          >
            03
          </div>
          <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
            {t.tytul}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-muted lg:text-body">
            {t.tresc}
          </p>
        </div>

        <div
          data-reveal
          className="flex flex-wrap gap-2.5 text-[15px] font-medium lg:gap-3 lg:text-body"
        >
          {t.kategorie.map((k, i) => (
            <span
              key={k}
              className={`rounded-full px-5 py-3.5 lg:px-6 lg:py-4 ${
                i === 0 ? 'bg-ink text-paper' : 'border border-line bg-white'
              }`}
            >
              {k}
            </span>
          ))}
          <span className="rounded-full border border-dashed border-line px-5 py-3.5 text-muted lg:px-6 lg:py-4">
            {t.podpowiedz}
          </span>
        </div>
      </div>
    </Section>
  );
}
