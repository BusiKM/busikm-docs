/**
 * Pięć drobnych kart przy osi dnia dyspozytora. Nie są makietami do podmiany —
 * to ilustracje przy punktach osi.
 */

const ramka =
  'rounded-2xl border border-line-dark bg-surface p-4 text-[11px] text-paper lg:p-4.5';

/** 6:40 — kontrahent podpowiada się po trzech literach. */
export function KartaKontrahent() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      <div className="flex justify-between gap-3 rounded-lg border border-blue px-2.5 py-2">
        <span>
          Alp
          <span aria-hidden className="text-ink-muted">
            |
          </span>
        </span>
        <span className="flex-none text-ink-muted">podpowiedź</span>
      </div>
      <div className="rounded-lg bg-surface-2 px-2.5 py-2">
        <b>Alpina Logistics S.r.l.</b>
        <div className="text-ink-muted">Milano · 12 zleceń</div>
      </div>
      <div className="flex justify-between gap-3 border-t border-line-dark pt-2">
        <span className="text-ink-muted">Fracht</span>
        <b>3 900 €</b>
      </div>
    </div>
  );
}

/** 7:05 — kto ma wolne godziny i kto jest najbliżej. */
export function KartaKierowcy() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {[
        { kto: 'Jan S.', poj: '· KR 5512M', stan: '9:00 wolne · 12 km', pigulka: 'podpowiedź' },
        { kto: 'Anna R.', poj: '· WZ 7734F', stan: '4:10 wolne · 40 km', pigulka: 'możliwe' },
      ].map((k, i) => (
        <div
          key={k.kto}
          className={`flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 ${
            i === 0 ? 'border border-blue-soft-line bg-surface-2' : 'border border-line-dark'
          }`}
        >
          <div className="min-w-0">
            <b>{k.kto}</b> <span className="text-ink-muted">{k.poj}</span>
            <div className="truncate text-ink-muted">{k.stan}</div>
          </div>
          <span className={`flex-none ${i === 0 ? 'text-blue-light' : 'text-ink-muted'}`}>
            {k.pigulka}
          </span>
        </div>
      ))}
    </div>
  );
}

/** 7:06 — trasa gotowa i już w telefonie kierowcy. */
export function KartaTrasa() {
  return (
    <div className="relative h-32 overflow-hidden rounded-2xl border border-line-dark bg-surface text-paper">
      <svg viewBox="0 0 320 130" preserveAspectRatio="none" className="size-full" aria-hidden>
        <path
          d="M 290 25 C 230 55, 190 75, 145 92 S 75 118, 25 122"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="3"
        />
        <circle cx="290" cy="25" r="5" fill="#0B5FFF" />
        <circle cx="25" cy="122" r="5" fill="#0B5FFF" />
      </svg>
      <div className="absolute top-3 left-3.5 rounded-lg bg-surface-2 px-2.5 py-2 text-[11px]">
        <b>Łódź → Praga</b> <span className="text-ink-muted">· 540 km</span>
        <div className="text-ink-muted">w telefonie Jana S. · 07:06</div>
      </div>
    </div>
  );
}

/** 13:20 — korek i przeliczona godzina dojazdu. */
export function KartaKorek() {
  return (
    <div className={`${ramka} flex flex-col gap-2.5`}>
      <div className="flex justify-between gap-3">
        <span className="truncate">Korek · A22, Bolzano</span>
        <span className="flex-none text-ink-muted">14 km</span>
      </div>
      <div className="flex items-end gap-3 border-t border-line-dark pt-2.5">
        <span className="text-ink-muted">Dojazd</span>
        <span className="text-ink-muted line-through">08:40</span>
        <b className="text-[15px]">08:05</b>
      </div>
      <div className="text-green">kierowca ma nową wersję · 13:21</div>
    </div>
  );
}

/** 17:00 — kto gdzie kończy i kto rusza jutro. */
export function KartaZamkniecie() {
  return (
    <div className={`${ramka} flex flex-col gap-2`}>
      {[
        ['Marek W.', 'Bolzano · kończy 19:30'],
        ['Tomasz L.', 'rozładowany · Rotterdam'],
        ['Jan S.', 'rusza jutro 06:00'],
      ].map(([kto, stan]) => (
        <div key={kto} className="flex justify-between gap-3 rounded-lg bg-surface-2 px-2.5 py-2">
          <b>{kto}</b>
          <span className="truncate text-ink-muted">{stan}</span>
        </div>
      ))}
    </div>
  );
}
