const registers = [
  { name: 'Rejestr sprzedaży VAT', count: '31', unit: ' poz.' },
  { name: 'Rejestr zakupów VAT', count: '128', unit: ' poz.' },
  { name: 'Kilometrówka', count: '6', unit: ' pojazdów' },
  { name: 'Delegacje i diety', count: '4', unit: ' kierowców' },
  { name: 'Ewidencja czasu pracy', count: '4', unit: ' karty' },
  { name: 'Koszty paliwa', count: '71', unit: ' poz.', desktopOnly: true },
  { name: 'Myto i opłaty drogowe', count: '22', unit: ' poz.', desktopOnly: true },
  { name: 'Naprawy i serwis', count: '9', unit: ' poz.', desktopOnly: true },
  { name: 'JPK_FA', count: '1', unit: ' plik' },
];

const formats = [
  { label: 'EPP' },
  { label: 'XML' },
  { label: 'TXT', desktopOnly: true },
  { label: 'XLSX' },
];

/** Paczka rejestrów dla księgowej — lista z licznikami i formatami. */
export function ExportPack() {
  return (
    <div className="rounded-panel border border-line bg-white p-5 shadow-card lg:p-7">
      <div className="flex items-center justify-between lg:mb-2">
        <div className="text-[15px] font-semibold lg:text-body">
          Paczka za sierpień 2026
        </div>
        <div className="flex gap-1 font-mono text-[11px] text-muted lg:gap-1.5 lg:text-[12px]">
          {formats.map((format) => (
            <span
              key={format.label}
              className={`rounded-lg border border-line px-1.5 py-[3px] lg:px-2 lg:py-1 ${
                format.desktopOnly ? 'hidden lg:inline' : ''
              }`}
            >
              {format.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-col lg:mt-0">
        {registers.map((register) => (
          <div
            key={register.name}
            className={`flex items-center justify-between border-t border-mist py-[11px] text-[15px] lg:py-[13px] ${
              register.desktopOnly ? 'hidden lg:flex' : ''
            }`}
          >
            <span>{register.name}</span>
            <span className="text-muted">
              {register.count}
              <span className="hidden lg:inline">{register.unit}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex h-11 items-center justify-center rounded-btn bg-blue text-[15px] font-semibold text-white lg:mt-6 lg:inline-flex lg:px-[22px]">
        Pobierz wszystko
      </div>
    </div>
  );
}
