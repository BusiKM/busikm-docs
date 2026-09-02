/** Trasa poprawiona po korku: stara kreskowana, nowa niebieska. */
export function PodgladTrasy() {
  return (
    <div className="relative h-[260px] overflow-hidden rounded-card border border-line bg-white shadow-card lg:aspect-4/3 lg:h-auto">
      <div className="absolute inset-0 bg-mist bg-[linear-gradient(rgba(10,10,11,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.05)_1px,transparent_1px)] bg-size-[48px_48px]" />

      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        <path
          d="M 340 50 C 290 100, 250 130, 210 160 S 120 230, 70 260"
          fill="none"
          stroke="#6E6E76"
          strokeWidth="3"
          strokeDasharray="6 6"
          opacity=".5"
        />
        <path
          d="M 340 50 C 310 120, 240 120, 200 190 S 120 250, 70 260"
          fill="none"
          stroke="#0B5FFF"
          strokeWidth="4"
        />
        <circle cx="340" cy="50" r="6" fill="#0B5FFF" />
        <circle cx="70" cy="260" r="6" fill="#0B5FFF" />
        <circle cx="230" cy="140" r="12" fill="#6E6E76" opacity=".25" />
        <circle cx="230" cy="140" r="5" fill="#6E6E76" />
        <circle cx="262" cy="118" r="8" fill="#fff" stroke="#0B5FFF" strokeWidth="3" />
      </svg>

      <div className="absolute top-4 left-4 flex flex-col gap-0.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-[12px] lg:top-5 lg:left-5 lg:text-[13px]">
        <b>Trasa poprawiona · 07:12</b>
        <span className="text-muted">Korek na A22 · omijamy przez Brixen</span>
      </div>

      <div className="absolute right-4 bottom-4 flex flex-col gap-0.5 rounded-xl border border-line bg-white px-3.5 py-2.5 text-[12px] lg:right-5 lg:bottom-5 lg:text-[13px]">
        <span className="text-muted">Dojazd</span>
        <b>
          <s className="font-normal text-muted">08:40</s> 08:05
        </b>
      </div>

      <div className="absolute bottom-4 left-4 hidden rounded-full border border-line bg-white px-3 py-1.5 text-[12px] lg:block lg:bottom-5 lg:left-5">
        <span className="text-green-ink">●</span> kierowca ma nową wersję
      </div>
    </div>
  );
}
