import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/** Cztery ekrany do sekcji „Cztery osoby" — jeden na rolę. */

type Teksty = {
  wlasciciel: {
    okno: string;
    liczby: [string, string, string, boolean][];
    flota: string;
    marza: string;
    kursy: [string, string, boolean][];
  };
  dyspozytor: {
    okno: string;
    zlecenia: string;
    lista: [string, string, boolean][];
    kierowca: string;
    wiadomosc: string;
    odpowiedz: string;
  };
  ksiegowa: {
    okno: string;
    tytul: string;
    pobierz: string;
    wiersze: [string, string, boolean][];
  };
  kierowca: { trasa: string; rozladunek: string; rusz: string };
};

const TEKSTY: Tlumaczenia<Teksty> = {
  pl: {
    wlasciciel: {
      okno: 'Pulpit · Właściciel',
      liczby: [
        ['Przychód', '184 320 zł', '184 320', false],
        ['Koszty', '121 840 zł', '121 840', false],
        ['Zysk', '62 480 zł', '62 480', true],
      ],
      flota: 'Cała flota · 3 w trasie',
      marza: 'Marża na kursie',
      kursy: [
        ['Gdańsk → Hamburg', '41%', true],
        ['Warszawa → Mediolan', '36%', true],
        ['Kraków → Wiedeń', '18%', false],
      ],
    },
    dyspozytor: {
      okno: 'Dyspozytornia · wtorek',
      zlecenia: 'Zlecenia',
      lista: [
        ['Warszawa → Mediolan', 'Załadunek 06:00', true],
        ['Poznań → Rotterdam', 'W trasie', false],
        ['Łódź → Wiedeń', 'Nieprzypisane', false],
      ],
      kierowca: 'Kierowca',
      wiadomosc: 'Załadunek gotowy, ruszam.',
      odpowiedz: 'Jedź. Rozładunek 15:00.',
    },
    ksiegowa: {
      okno: 'Księgowa · sierpień 2026',
      tytul: 'Komplet za sierpień',
      pobierz: 'Pobierz komplet',
      wiersze: [
        ['Sprzedaż', '42 faktury', true],
        ['Koszty', '318 paragonów', true],
        ['Przebieg', '7 pojazdów', true],
        ['Delegacje', '9 kierowców', true],
        ['Czas pracy', 'gotowe', true],
        ['Format', 'Comarch Optima', false],
      ],
    },
    kierowca: {
      trasa: 'Warszawa → Mediolan',
      rozladunek: 'Rozładunek 08:00 · jutro',
      rusz: 'Rusz',
    },
  },
  en: {
    wlasciciel: {
      okno: 'Dashboard · Owner',
      liczby: [
        ['Revenue', 'PLN 184,320', '184,320', false],
        ['Costs', 'PLN 121,840', '121,840', false],
        ['Profit', 'PLN 62,480', '62,480', true],
      ],
      flota: 'Whole fleet · 3 on the road',
      marza: 'Margin per job',
      kursy: [
        ['Gdańsk → Hamburg', '41%', true],
        ['Warsaw → Milan', '36%', true],
        ['Kraków → Vienna', '18%', false],
      ],
    },
    dyspozytor: {
      okno: 'Dispatch · Tuesday',
      zlecenia: 'Orders',
      lista: [
        ['Warsaw → Milan', 'Loading 06:00', true],
        ['Poznań → Rotterdam', 'En route', false],
        ['Łódź → Vienna', 'Unassigned', false],
      ],
      kierowca: 'Driver',
      wiadomosc: 'Loaded, heading off.',
      odpowiedz: 'Go ahead. Unloading 15:00.',
    },
    ksiegowa: {
      okno: 'Accountant · August 2026',
      tytul: 'August, complete',
      pobierz: 'Download the full set',
      wiersze: [
        ['Sales', '42 invoices', true],
        ['Costs', '318 receipts', true],
        ['Mileage', '7 vehicles', true],
        ['Business trips', '9 drivers', true],
        ['Working time', 'ready', true],
        ['Format', 'Comarch Optima', false],
      ],
    },
    kierowca: {
      trasa: 'Warsaw → Milan',
      rozladunek: 'Unloading 08:00 · tomorrow',
      rusz: 'Go',
    },
  },
};

function Okno({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-line-dark bg-surface shadow-[0_30px_80px_rgba(0,0,0,.5)] lg:aspect-16/10">
      <div className="flex h-8 items-center gap-1.5 border-b border-line-dark px-4 lg:h-10">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[9px] rounded-full bg-[#2E2E34]" />
        ))}
        <span className="ml-3.5 text-[12px] text-ink-muted">{label}</span>
      </div>
      {children}
    </div>
  );
}

export function EkranWlasciciela() {
  const t = TEKSTY[biezacyJezyk()].wlasciciel;
  return (
    <Okno label={t.okno}>
      <div className="flex flex-col gap-4 p-4 lg:gap-5 lg:p-7">
        <div className="grid grid-cols-3 gap-2 lg:gap-3.5">
          {t.liczby.map(([label, full, short, strong]) => (
            <div
              key={label as string}
              className={`rounded-xl border border-line-dark p-2.5 lg:rounded-2xl lg:p-4.5 ${
                strong ? 'bg-surface-2' : ''
              }`}
            >
              <div className="text-[10px] text-ink-muted lg:text-[12px]">{label}</div>
              <div
                className={`mt-1.5 text-[13px] lg:text-[28px] ${
                  strong ? 'font-bold text-green' : 'font-semibold'
                }`}
              >
                <span className="lg:hidden">{short}</span>
                <span className="hidden lg:inline">{full}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3.5 lg:grid-cols-2">
          <div className="relative hidden h-50 overflow-hidden rounded-2xl border border-line-dark bg-surface-3 lg:block">
            <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="size-full" aria-hidden>
              <path
                d="M 30 170 C 90 140, 130 110, 170 90 S 240 50, 270 30"
                fill="none"
                stroke="#0B5FFF"
                strokeWidth="3"
              />
              <circle cx="30" cy="170" r="5" fill="#0B5FFF" />
              <circle cx="270" cy="30" r="5" fill="#0B5FFF" />
              <circle cx="120" cy="120" r="5" fill="#0B5FFF" />
            </svg>
            <div className="absolute top-3 left-3 text-[11px] text-ink-muted">
              {t.flota}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-[12px] lg:gap-2.5 lg:rounded-2xl lg:border lg:border-line-dark lg:p-4 lg:text-[13px]">
            <div className="text-ink-muted">{t.marza}</div>
            {t.kursy.map(([route, margin, good]) => (
              <div key={route as string} className="flex justify-between gap-2">
                <span className="truncate">{route}</span>
                <b className={good ? 'text-green' : ''}>{margin}</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Okno>
  );
}

export function EkranDyspozytora() {
  const t = TEKSTY[biezacyJezyk()].dyspozytor;
  return (
    <Okno label={t.okno}>
      <div className="grid h-[200px] grid-cols-[1fr_1fr_1fr] text-[11px] lg:h-[calc(100%-40px)] lg:grid-cols-[200px_1fr_180px] lg:text-[12px]">
        <div className="flex flex-col gap-2 border-r border-line-dark p-3 lg:p-4">
          <div className="text-ink-muted">{t.zlecenia}</div>
          {t.lista.map(([route, meta, active]) => (
            <div
              key={route as string}
              className={`rounded-[10px] p-2.5 ${active ? 'bg-surface-2' : ''}`}
            >
              <b className="block truncate">{route}</b>
              <div className="truncate text-ink-muted">{meta}</div>
            </div>
          ))}
        </div>

        <div className="relative bg-surface-3">
          <svg viewBox="0 0 300 220" preserveAspectRatio="none" className="size-full" aria-hidden>
            <path
              d="M 40 180 C 100 150, 150 130, 190 90 S 250 40, 280 20"
              fill="none"
              stroke="#0B5FFF"
              strokeWidth="3"
            />
            <circle cx="150" cy="118" r="5" fill="#0B5FFF" />
            <circle cx="230" cy="60" r="5" fill="#0B5FFF" />
          </svg>
        </div>

        <div className="flex flex-col gap-2.5 border-l border-line-dark p-3 lg:p-4">
          <div className="text-ink-muted">{t.kierowca}</div>
          <b>Marek W.</b>
          <div className="text-ink-muted">WZ 4821K</div>
          <div className="mt-1.5 rounded-[10px] bg-surface-2 px-2.5 py-2">
            {t.wiadomosc}
          </div>
          <div className="self-end rounded-[10px] bg-blue px-2.5 py-2 text-white">
            {t.odpowiedz}
          </div>
        </div>
      </div>
    </Okno>
  );
}

export function EkranKsiegowej() {
  const t = TEKSTY[biezacyJezyk()].ksiegowa;
  return (
    <Okno label={t.okno}>
      <div className="flex flex-col gap-4 p-4 text-[12px] lg:gap-5 lg:p-8 lg:text-[13px]">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-[18px] font-semibold lg:text-[22px]">{t.tytul}</div>
          <div className="rounded-[10px] bg-blue px-4 py-2.5 text-center font-semibold text-white lg:py-3">
            {t.pobierz}
          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-2">
          {t.wiersze.map(([label, value, good]) => (
            <div
              key={label as string}
              className="flex justify-between gap-2 rounded-xl border border-line-dark px-3.5 py-3"
            >
              <span>{label}</span>
              <span className={good ? 'text-green' : ''}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </Okno>
  );
}

export function EkranKierowcy() {
  const t = TEKSTY[biezacyJezyk()].kierowca;
  return (
    <div className="relative flex items-center justify-center overflow-hidden lg:aspect-16/10">
      <div
        aria-hidden
        className="absolute bottom-0 left-[30%] right-[30%] h-30 bg-blue opacity-35 blur-[80px]"
      />
      <div className="relative aspect-[195/420] h-[420px] w-[195px] rounded-[32px] border border-[#2A2A30] bg-black p-2.5 shadow-[0_30px_80px_rgba(0,0,0,.6)] lg:h-[92%] lg:w-auto lg:rounded-[40px]">
        <div className="flex h-full flex-col overflow-hidden rounded-[26px] bg-surface text-[12px] lg:rounded-[32px]">
          <div className="flex justify-between px-4.5 pt-5 text-ink-muted">
            <span>14:20</span>
            <span>WZ 4821K</span>
          </div>
          <div className="px-4.5 pt-6 text-[20px] leading-tight font-semibold">
            {t.trasa}
          </div>
          <div className="px-4.5 pt-1.5 text-ink-muted">{t.rozladunek}</div>
          <div className="relative mx-4.5 mt-5.5 flex-1 overflow-hidden rounded-2xl bg-surface-3">
            <svg viewBox="0 0 200 260" preserveAspectRatio="none" className="size-full" aria-hidden>
              <path
                d="M 40 240 C 80 200, 90 150, 110 110 S 150 50, 170 20"
                fill="none"
                stroke="#0B5FFF"
                strokeWidth="4"
              />
              <circle cx="110" cy="110" r="7" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
            </svg>
          </div>
          <div className="m-4.5 rounded-[14px] bg-blue py-4 text-center text-[16px] font-semibold text-white">
            {t.rusz}
          </div>
        </div>
      </div>
    </div>
  );
}
