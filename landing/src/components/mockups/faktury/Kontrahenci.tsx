const podpowiedzi = [
  {
    nazwa: 'Alpina Logistics S.r.l.',
    adres: 'Via Tortona 12, Milano · IT 08765432109',
    ile: '12 zleceń',
    wybrana: true,
  },
  {
    nazwa: 'Alpen Cargo GmbH',
    adres: 'Innsbruck · AT U12345678',
    ile: '3 zlecenia',
    wybrana: false,
  },
] as const;

/** Pole kontrahenta w nowym zleceniu: trzy litery i reszta wchodzi sama. */
export function Kontrahenci() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:p-8 lg:text-caption">
      <div className="text-[12px] text-muted lg:text-[13px]">Nowe zlecenie · kontrahent</div>

      <div className="flex justify-between gap-3 rounded-btn border border-blue px-3.5 py-3.5">
        <span>
          Alp
          <span aria-hidden className="text-muted">
            |
          </span>
        </span>
        <span className="flex-none text-muted">podpowiedzi</span>
      </div>

      <div className="flex flex-col overflow-hidden rounded-btn border border-line">
        {podpowiedzi.map((k) => (
          <div
            key={k.nazwa}
            className={`flex justify-between gap-3 p-3.5 ${
              k.wybrana ? 'bg-mist' : 'border-t border-line'
            }`}
          >
            <div className="min-w-0">
              <b className="block truncate">{k.nazwa}</b>
              <div className="truncate text-[12px] text-muted lg:text-[13px]">{k.adres}</div>
            </div>
            <span className="flex-none text-[12px] text-muted lg:text-[13px]">{k.ile}</span>
          </div>
        ))}
      </div>

      <div className="text-[12px] text-muted lg:text-[13px]">
        Adres, numer i termin płatności wchodzą same.
      </div>
    </div>
  );
}
