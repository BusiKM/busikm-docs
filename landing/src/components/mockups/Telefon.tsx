/**
 * Obudowa telefonu w trybie nocnym — wspólna dla wszystkich ekranów kierowcy.
 * Proporcje 270:585 z projektu, na telefonie skalowane w dół.
 */
export function Telefon({
  children,
  glow = false,
  className = '',
}: {
  children: React.ReactNode;
  /** Niebieska poświata pod telefonem — na ciemnych sekcjach. */
  glow?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {glow && (
        <div
          aria-hidden
          className="absolute right-[20%] bottom-10 left-[20%] h-30 bg-blue opacity-35 blur-[70px] lg:bottom-15 lg:h-35 lg:blur-[90px]"
        />
      )}
      {/* Proporcje siedzą na obudowie — ekran wypełnia to, co zostaje po ramce.
          Odwrotnie ekran byłby o 44 px za niski i obcinał zawartość. */}
      <div className="relative mx-auto aspect-270/585 w-[230px] rounded-[38px] border border-[#2A2A30] bg-black p-2 shadow-[0_30px_60px_rgba(0,0,0,.5)] lg:w-[270px] lg:rounded-[44px] lg:p-2.5 lg:shadow-[0_40px_80px_rgba(0,0,0,.6)]">
        <div className="flex h-full flex-col overflow-hidden rounded-[30px] bg-surface text-[11px] text-paper lg:rounded-[36px] lg:text-[12px]">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Pasek stanu u góry ekranu telefonu. */
export function PasekStanu({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex justify-between px-4 pt-5 text-ink-muted lg:px-4.5 lg:pt-5.5">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}
