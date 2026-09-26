import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';

import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const kraje = [
  { czas: '4 h 20 min', udzial: 22, kolor: '#C9CBD1' },
  { czas: '3 h 35 min', udzial: 18, kolor: '#9A9AA2' },
  { czas: '3 h 50 min', udzial: 20, kolor: '#6E6E76' },
  { czas: '2 h 05 min', udzial: 10, kolor: '#0A46C0' },
  { czas: '5 h 50 min', udzial: 30, kolor: '#0B5FFF' },
];

const TEKSTY: Tlumaczenia<{
  kraje: { tytul: string; tresc: string };
  /** Nazwy krajów — kolejność jak w `kraje`. */
  nazwy: readonly string[];
  kurs: string;
  daty: string;
  przejazd: { tytul: string; tresc: string };
  bezZlecenia: string;
  kiedy: string;
  trasa: string;
  powod: string;
  powodWartosc: string;
  przyciski: readonly string[];
}> = {
  pl: {
    kraje: {
      tytul: 'Kraje na trasie',
      tresc: 'System sam widzi, gdzie kierowca był i jak długo. Nikt tego nie zgłasza ręcznie.',
    },
    nazwy: ['Polska', 'Czechy', 'Niemcy', 'Austria', 'Włochy'],
    kurs: 'Marek W. · Warszawa → Mediolan',
    daty: '2–3.09',
    przejazd: {
      tytul: 'Przejazd bez zlecenia też się liczy',
      tresc: 'Dojazd do bazy, wyjazd do serwisu, przeprowadzka pojazdu. Kilometry nie giną.',
    },
    bezZlecenia: 'Przejazd bez zlecenia',
    kiedy: '31.08 · 16:40',
    trasa: 'Mediolan → serwis, Bergamo',
    powod: 'Powód',
    powodWartosc: 'Serwis · WZ 4821K',
    przyciski: ['Start', 'Stop', 'Potwierdź'],
  },
  en: {
    kraje: {
      tytul: 'Countries on the route',
      tresc: 'The system sees for itself where the driver was and for how long. Nobody reports it by hand.',
    },
    nazwy: ['Poland', 'Czechia', 'Germany', 'Austria', 'Italy'],
    kurs: 'Marek W. · Warsaw → Milan',
    daty: '2–3 Sep',
    przejazd: {
      tytul: 'Trips without an order count too',
      tresc: 'Driving to the depot, over to the garage, moving a vehicle. No kilometre goes missing.',
    },
    bezZlecenia: 'Trip without an order',
    kiedy: '31 Aug · 16:40',
    trasa: 'Milan → garage, Bergamo',
    powod: 'Reason',
    powodWartosc: 'Service · WZ 4821K',
    przyciski: ['Start', 'Stop', 'Confirm'],
  },
};

/** 05 + 06 — dwa punkty w dwóch kartach obok siebie. */
export function KrajeIPrzejazd() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section>
      <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          numer="05"
          tytul={t.kraje.tytul}
          tresc={t.kraje.tresc}
        >
          <div className="flex flex-col rounded-card border border-line bg-white p-5 text-[13px] lg:p-6 lg:text-caption">
            <div className="flex justify-between gap-3 pb-2.5 text-muted">
              <span className="truncate">{t.kurs}</span>
              <span className="flex-none">{t.daty}</span>
            </div>
            <div className="mb-3 flex h-2.5 gap-0.5 overflow-hidden rounded-[5px]" aria-hidden>
              {kraje.map((k) => (
                <span key={k.kolor} style={{ width: `${k.udzial}%`, background: k.kolor }} />
              ))}
            </div>
            {kraje.map((k, i) => (
              <div key={k.kolor} className="flex justify-between gap-3 border-t border-line py-2">
                <span>{t.nazwy[i]}</span>
                <span>{k.czas}</span>
              </div>
            ))}
          </div>
        </KartaBloku>

        <KartaBloku
          numer="06"
          tytul={t.przejazd.tytul}
          tresc={t.przejazd.tresc}
        >
          <div className="flex flex-col gap-3.5 rounded-card bg-ink p-5 text-[13px] text-paper lg:p-6 lg:text-caption">
            <div className="flex justify-between gap-3 text-ink-muted">
              <span>{t.bezZlecenia}</span>
              <span className="flex-none">{t.kiedy}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="truncate">{t.trasa}</span>
              <b className="flex-none">48 km · 0:55</b>
            </div>
            <div className="flex justify-between gap-3 text-ink-muted">
              <span>{t.powod}</span>
              <span className="flex-none">{t.powodWartosc}</span>
            </div>
            <div className="mt-1.5 flex gap-2.5">
              {t.przyciski.map((k, i) => (
                <span
                  key={k}
                  className={`flex-1 rounded-btn py-3.5 text-center ${
                    i === 2 ? 'bg-blue font-semibold' : 'bg-surface-2'
                  }`}
                >
                  {k}
                </span>
              ))}
            </div>
          </div>
        </KartaBloku>
      </div>
    </Section>
  );
}
