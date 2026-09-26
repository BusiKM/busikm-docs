import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  do: string;
  kopia: string;
  eFaktura: string;
  mail: string;
  przyjeta: string;
  wyslano: string;
}> = {
  pl: {
    naglowek: 'Wyślij fakturę',
    do: 'Do',
    kopia: 'Kopia',
    eFaktura: 'Zgłoś też do systemu e-faktur',
    mail: 'mail dostarczony · 08:14',
    przyjeta: 'e-faktura przyjęta · 08:14',
    wyslano: 'Wysłano',
  },
  en: {
    naglowek: 'Send invoice',
    do: 'To',
    kopia: 'Cc',
    eFaktura: 'Also submit to the e-invoicing system',
    mail: 'email delivered · 08:14',
    przyjeta: 'e-invoice accepted · 08:14',
    wyslano: 'Sent',
  },
};

/** Okno wysyłki: adresat, załącznik, przełącznik e-faktury i dwa potwierdzenia. */
export function OknoWysylki() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <div className="flex flex-col gap-3.5 rounded-card border border-line bg-white p-6 text-[13px] shadow-card lg:aspect-4/3 lg:p-8 lg:text-caption">
      <div className="flex items-center justify-between gap-3">
        <b className="text-[16px] lg:text-[18px]">{t.naglowek}</b>
        <span className="flex-none text-muted">FV/2026/09/041</span>
      </div>

      <div className="flex flex-col gap-2 border-t border-line pt-2">
        {[
          [t.do, 'faktury@alpina-logistics.it'],
          [t.kopia, 'ewa.m@biuro-rachunkowe.pl'],
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
        <span>{t.eFaktura}</span>
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
            {t.mail}
          </span>
          <span>
            <span aria-hidden className="text-green-ink">
              ●
            </span>{' '}
            {t.przyjeta}
          </span>
        </div>
        <span className="rounded-btn border border-line px-4.5 py-3 font-semibold">{t.wyslano}</span>
      </div>
    </div>
  );
}
