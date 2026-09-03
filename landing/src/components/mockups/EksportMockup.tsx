const registers = [
  ['Sprzedaż', '42'],
  ['Zakupy i koszty', '318'],
  ['Przebieg pojazdów', '7'],
  ['Delegacje i diety', '9'],
  ['Czas pracy', '9'],
  ['Opłaty drogowe', '61'],
  ['Paliwo', '124'],
  ['Korekty', '2'],
] as const;

/** Stos arkuszy: komplet dla księgowej za wybrany miesiąc. */
export function EksportMockup() {
  return (
    <div className="relative h-[380px] lg:h-[560px]">
      <div className="absolute top-0 right-2.5 left-[30px] h-[320px] rotate-[-5deg] rounded-xl border border-line-dark bg-surface-3 opacity-60 lg:top-5 lg:right-auto lg:left-[60px] lg:h-[480px] lg:w-[440px] lg:rotate-[-6deg] lg:rounded-2xl" />
      <div className="absolute top-4 right-5 left-[15px] h-[320px] rotate-[-2deg] rounded-xl border border-line-dark bg-[#161619] opacity-80 lg:top-10 lg:right-auto lg:left-10 lg:h-[480px] lg:w-[440px] lg:rotate-[-3deg] lg:rounded-2xl" />

      <div className="absolute top-9 right-[30px] left-0 flex h-[330px] flex-col gap-2 rounded-xl border border-[#2A2A30] bg-surface p-4 text-[11px] shadow-[0_30px_80px_rgba(0,0,0,.6)] lg:top-15 lg:right-auto lg:left-5 lg:h-[480px] lg:w-[460px] lg:gap-3.5 lg:rounded-2xl lg:p-[26px] lg:text-[13px]">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-3">
          <div className="rounded-[10px] bg-blue px-3 py-2.5 text-center font-semibold text-white lg:px-4 lg:py-3 lg:text-left">
            Pobierz komplet za sierpień
          </div>
          <div className="rounded-lg border border-line-dark-2 px-3.5 py-2 text-center text-ink-muted lg:py-2.5">
            Comarch Optima ▾
          </div>
        </div>

        <div className="mt-1.5 flex flex-col">
          {registers.map(([name, count]) => (
            <div
              key={name}
              className="flex justify-between border-b border-line-dark py-1.5 lg:py-[9px]"
            >
              <span>{name}</span>
              <span className="text-ink-muted">{count}</span>
            </div>
          ))}
          <div className="flex justify-between py-1.5 lg:py-[9px]">
            <span>Rejestr zmian</span>
            <span className="text-green">gotowe</span>
          </div>
        </div>
      </div>
    </div>
  );
}
