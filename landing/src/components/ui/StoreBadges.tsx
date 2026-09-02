/**
 * Odznaki App Store i Google Play — prawdziwe znaki sklepów.
 *
 * Aplikacja nie jest jeszcze opublikowana, więc odznaki nie prowadzą nigdzie.
 * Gdy pojawi się w sklepach, wystarczy podać adresy w `stores`.
 */

const APPLE =
  'M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57-155.5-127C46.7 790.7 0 663 0 541.8c0-194.4 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z';

function AppleMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 814 1000" className={className} aria-hidden focusable="false">
      <path d={APPLE} fill="currentColor" />
    </svg>
  );
}

function GooglePlayMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden focusable="false">
      <path
        d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z"
        fill="#00A0FF"
      />
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z" fill="#00F076" />
      <path
        d="M472.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8z"
        fill="#FFBC00"
      />
      <path d="M104.6 499l280.8-161.2-60.1-60.1L104.6 499z" fill="#F13A2F" />
    </svg>
  );
}

const stores = [
  { lead: 'Pobierz w', name: 'App Store', href: null as string | null },
  { lead: 'Pobierz z', name: 'Google Play', href: null as string | null },
];

export function StoreBadges() {
  return (
    <div className="flex gap-2.5 lg:gap-3">
      {stores.map((store) => {
        const content = (
          <>
            {store.name === 'App Store' ? (
              <AppleMark className="h-5 w-auto text-paper lg:h-[22px]" />
            ) : (
              <GooglePlayMark className="size-5 lg:size-[22px]" />
            )}
            <div className="text-left leading-tight">
              <div className="text-[10px] text-ink-muted">{store.lead}</div>
              <div className="text-[13px] font-semibold lg:text-caption">{store.name}</div>
            </div>
          </>
        );

        const cn =
          'flex h-12 flex-1 items-center justify-center gap-2.5 rounded-btn border border-line-dark-2 px-4.5 lg:flex-none lg:justify-start';

        return store.href ? (
          <a key={store.name} href={store.href} className={`${cn} hover:border-ink-muted`}>
            {content}
          </a>
        ) : (
          <div key={store.name} className={cn}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
