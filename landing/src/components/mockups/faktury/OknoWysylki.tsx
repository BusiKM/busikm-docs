/** Okno wysyłki: adresat, załącznik, przełącznik e-faktury i dwa potwierdzenia. */
export function OknoWysylki() {
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">Wyślij fakturę</b>
        <span className="flex-none text-muted">FV/2026/09/041</span>
      </div>

      <div className="flex flex-col gap-2 border-t border-line pt-2">
        {[
          ['Do', 'faktury@alpina-logistics.it'],
          ['Kopia', 'ewa.m@biuro-rachunkowe.pl'],
        ].map(([label, adres]) => (
          <div
            key={label}
            className="flex justify-between gap-3 rounded-btn border border-line px-3.5 py-3"
          >
            <span className="flex-none text-muted">{label}</span>
            <span className="truncate">{adres}</span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-3 rounded-btn bg-mist px-3.5 py-3">
          <span className="flex min-w-0 items-center gap-2.5">
            <span aria-hidden className="h-8.5 w-7 flex-none rounded-[4px] border border-line bg-white" />
            <span className="truncate">FV-2026-09-041.pdf</span>
          </span>
          <span className="flex-none text-muted">92 KB</span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-line py-3">
        <span>Zgłoś też do systemu e-faktur</span>
        <span aria-hidden className="relative h-6.5 w-11 flex-none rounded-full bg-blue">
          <span className="absolute top-[3px] right-[3px] size-5 rounded-full bg-white" />
        </span>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1 text-[13px]">
          <span>
            <span aria-hidden className="text-green-ink">
              ●
            </span>{' '}
            mail dostarczony · 08:14
          </span>
          <span>
            <span aria-hidden className="text-green-ink">
              ●
            </span>{' '}
            e-faktura przyjęta · 08:14
          </span>
        </div>
        <span className="rounded-btn border border-line px-4.5 py-3 font-semibold">Wysłano</span>
      </div>
    </div>
  );
}
