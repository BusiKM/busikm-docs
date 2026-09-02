import { Section } from '@/components/ui/Section';
import { KartaBloku } from '@/components/ui/KartaBloku';

const kraje = [
  { kraj: 'Polska', czas: '4 h 20 min', udzial: 22, kolor: '#C9CBD1' },
  { kraj: 'Czechy', czas: '3 h 35 min', udzial: 18, kolor: '#9A9AA2' },
  { kraj: 'Niemcy', czas: '3 h 50 min', udzial: 20, kolor: '#6E6E76' },
  { kraj: 'Austria', czas: '2 h 05 min', udzial: 10, kolor: '#0A46C0' },
  { kraj: 'Włochy', czas: '5 h 50 min', udzial: 30, kolor: '#0B5FFF' },
];

/** 05 + 06 — dwa punkty w dwóch kartach obok siebie. */
export function KrajeIPrzejazd() {
  return (
    <Section>
      <div className="grid gap-2.5 lg:grid-cols-2 lg:gap-6">
        <KartaBloku
          numer="05"
          tytul="Kraje na trasie"
          tresc="System sam widzi, gdzie kierowca był i jak długo. Nikt tego nie zgłasza ręcznie."
        >
          <div className="flex flex-col rounded-card border border-line bg-white p-5 text-[13px] lg:p-6 lg:text-caption">
            <div className="flex justify-between gap-3 pb-2.5 text-muted">
              <span className="truncate">Marek W. · Warszawa → Mediolan</span>
              <span className="flex-none">2–3.09</span>
            </div>
            <div className="mb-3 flex h-2.5 gap-0.5 overflow-hidden rounded-[5px]" aria-hidden>
              {kraje.map((k) => (
                <span key={k.kraj} style={{ width: `${k.udzial}%`, background: k.kolor }} />
              ))}
            </div>
            {kraje.map((k) => (
              <div key={k.kraj} className="flex justify-between gap-3 border-t border-line py-2">
                <span>{k.kraj}</span>
                <span>{k.czas}</span>
              </div>
            ))}
          </div>
        </KartaBloku>

        <KartaBloku
          numer="06"
          tytul="Przejazd bez zlecenia też się liczy"
          tresc="Dojazd do bazy, wyjazd do serwisu, przeprowadzka pojazdu. Kilometry nie giną."
        >
          <div className="flex flex-col gap-3.5 rounded-card bg-ink p-5 text-[13px] text-paper lg:p-6 lg:text-caption">
            <div className="flex justify-between gap-3 text-ink-muted">
              <span>Przejazd bez zlecenia</span>
              <span className="flex-none">31.08 · 16:40</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="truncate">Mediolan → serwis, Bergamo</span>
              <b className="flex-none">48 km · 0:55</b>
            </div>
            <div className="flex justify-between gap-3 text-ink-muted">
              <span>Powód</span>
              <span className="flex-none">Serwis · WZ 4821K</span>
            </div>
            <div className="mt-1.5 flex gap-2.5">
              {['Start', 'Stop', 'Potwierdź'].map((k, i) => (
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
