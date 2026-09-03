const kandydaci = [
  {
    kto: 'Jan S.',
    pojazd: 'KR 5512M',
    stan: 'Uprawnienia ważne · 9:00 jazdy wolne',
    etykieta: 'podpowiedź',
    wariant: 'best',
  },
  {
    kto: 'Anna R.',
    pojazd: 'WZ 7734F',
    stan: 'Uprawnienia ważne · 4:10 jazdy wolne',
    etykieta: 'możliwe',
    wariant: 'ok',
  },
  {
    kto: 'Marek W.',
    pojazd: 'WZ 4821K',
    stan: 'W drodze do Mediolanu',
    etykieta: 'zajęty',
    wariant: 'off',
  },
  {
    kto: 'Piotr K.',
    pojazd: 'GD 7710R',
    stan: 'Odpoczynek do 05:30',
    etykieta: 'odpoczynek',
    wariant: 'off',
  },
] as const;

/** Przypisanie kierowcy z podpowiedzią systemu. */
export function PrzypiszKierowce() {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-line-dark bg-surface p-6 text-[12px] shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:p-7 lg:text-[13px]">
      <div className="mb-1.5 flex justify-between gap-3 text-ink-muted">
        <span>Przypisz kierowcę · Łódź → Praga</span>
        <span className="flex-none">czw. 06:00</span>
      </div>

      {kandydaci.map((k) => (
        <div
          key={k.kto}
          className={`flex items-center justify-between gap-3 rounded-[14px] p-3.5 ${
            k.wariant === 'best'
              ? 'border border-blue bg-surface-2'
              : k.wariant === 'ok'
                ? 'bg-surface-2'
                : 'bg-surface-3'
          }`}
        >
          <div className={k.wariant === 'off' ? 'text-ink-muted' : undefined}>
            <b className="text-paper">{k.kto}</b> · {k.pojazd}
            <div className="mt-0.5 text-ink-muted">{k.stan}</div>
          </div>
          <span
            className={`flex-none ${
              k.wariant === 'best' ? 'font-semibold text-green' : 'text-ink-muted'
            }`}
          >
            {k.etykieta}
          </span>
        </div>
      ))}
    </div>
  );
}
