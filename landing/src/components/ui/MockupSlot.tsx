import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

/**
 * Miejsce na zrzut z aplikacji — wg docs/landing/08-makiety-i-zdjecia.md
 * i projektu z Claude Design.
 *
 * Dopóki pliku nie ma w `public/mockups/`, komponent pokazuje rysowaną makietę
 * (`children`) i pod nią przerywaną notkę: co ma się tam znaleźć i jak nazwie
 * się plik. Gdy plik się pojawi, makieta i notka znikają, a na ich miejsce
 * wchodzi obraz — podmiana to wrzucenie pliku pod właściwą nazwą.
 */

const MOCKUPS_DIR = path.join(process.cwd(), 'public', 'mockups');

function hasImage(file: string): boolean {
  if (file.includes('/') || file.includes('..')) return false;
  try {
    return fs.existsSync(path.join(MOCKUPS_DIR, file));
  } catch {
    return false;
  }
}

type MockupSlotProps = {
  /** Nazwa pliku wg schematu `mockup-<obszar>-<ekran>-<urządzenie>.png`. */
  file: string;
  /** Etykieta w notce, wersalikami — np. „Ekran właściciela · desktop 1440". */
  label: string;
  /** Co dokładnie ma być widać na docelowym zrzucie. */
  note: string;
  /** Proporcje docelowego obrazu, np. „16:10". */
  ratio: string;
  /** Rysowana makieta, która stoi tam do czasu podmiany. */
  children: React.ReactNode;
  dark?: boolean;
  /** Klasy opakowania notki — pozwala ją zwęzić albo wyśrodkować. */
  noteClassName?: string;
};

export function MockupSlot({
  file,
  label,
  note,
  ratio,
  children,
  dark = false,
  noteClassName = '',
}: MockupSlotProps) {
  if (hasImage(file)) {
    const [w, h] = ratio.split(':').map(Number);
    return (
      <div className="relative w-full" style={{ aspectRatio: `${w} / ${h}` }}>
        <Image
          src={`/mockups/${file}`}
          alt={`${label} — ${note}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1120px"
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {children}
      <div
        className={`rounded-lg border border-dashed px-3.5 py-2.5 font-mono text-[10px] leading-relaxed lg:text-[11px] ${
          dark
            ? 'border-line-dark-2 text-ink-muted'
            : 'border-line-strong text-muted'
        } ${noteClassName}`}
      >
        <div className="font-semibold tracking-[0.06em] uppercase">
          Do podmiany · {label}
        </div>
        <div>{note}</div>
        <div className="flex flex-wrap justify-between gap-x-4">
          <span>{file}</span>
          <span>{ratio}</span>
        </div>
      </div>
    </div>
  );
}
