import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

/**
 * Miejsce na zrzut z aplikacji — wg docs/landing/08-makiety-i-zdjecia.md.
 *
 * Dopóki pliku nie ma w `public/mockups/`, komponent rysuje ramkę z opisem,
 * co ma się tam znaleźć, i z nazwą pliku. Gdy plik się pojawi, ramka znika
 * sama — podmiana to wrzucenie obrazu pod właściwą nazwą, nic więcej.
 *
 * Ramka zajmuje dokładnie tyle miejsca, co docelowy obraz, więc po podmianie
 * układ strony nie skacze.
 */

type Device = 'desktop' | 'desktop-4-3' | 'phone' | 'phone-pair';

const devices: Record<Device, { ratio: string; label: string; maxWidth: string }> = {
  desktop: { ratio: '16 / 10', label: 'Desktop 1440', maxWidth: '100%' },
  'desktop-4-3': { ratio: '4 / 3', label: 'Desktop 1440', maxWidth: '100%' },
  phone: { ratio: '9 / 19.5', label: 'Telefon 390', maxWidth: '300px' },
  'phone-pair': { ratio: '4 / 3', label: 'Dwa telefony 390', maxWidth: '100%' },
};

const MOCKUPS_DIR = path.join(process.cwd(), 'public', 'mockups');

/** Czy zrzut już istnieje. Nazwy są stałymi z kodu, ale odcinamy ścieżki na wszelki wypadek. */
function hasImage(file: string): boolean {
  if (file.includes('/') || file.includes('..')) return false;
  try {
    return fs.existsSync(path.join(MOCKUPS_DIR, file));
  } catch {
    return false;
  }
}

type MockupSlotProps = {
  device: Device;
  /** Nazwa pliku wg schematu `mockup-<obszar>-<ekran>-<urządzenie>.png`. */
  file: string;
  /** Co to za ekran — trafia do etykiety ramki i do tekstu alternatywnego. */
  label: string;
  /** Co dokładnie ma być widać na zrzucie. */
  children: string;
  /** Ramka na ciemnej sekcji. */
  dark?: boolean;
  className?: string;
};

export function MockupSlot({
  device,
  file,
  label,
  children,
  dark = false,
  className = '',
}: MockupSlotProps) {
  const { ratio, label: deviceLabel, maxWidth } = devices[device];
  const box = `relative mx-auto w-full ${className}`;

  if (hasImage(file)) {
    return (
      <div className={box} style={{ aspectRatio: ratio, maxWidth }}>
        <Image
          src={`/mockups/${file}`}
          alt={`${label} — ${children}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1120px"
          className="object-contain"
        />
      </div>
    );
  }

  const frame = dark
    ? 'border-white/18 bg-white/[0.03] text-paper/60'
    : 'border-line bg-mist text-muted';
  const strong = dark ? 'text-paper/85' : 'text-ink/70';

  return (
    <div
      className={`${box} flex flex-col justify-between gap-6 rounded-card border-[1.5px] border-dashed p-6 lg:p-8 ${frame}`}
      style={{ aspectRatio: ratio, maxWidth }}
    >
      <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase">
        Do podmiany · {label} · {deviceLabel}
      </div>

      <p className={`max-w-[46ch] text-[15px] leading-relaxed text-pretty ${strong}`}>
        {children}
      </p>

      <div
        className={`flex flex-wrap items-baseline justify-between gap-3 border-t border-dashed pt-3 font-mono text-[12px] ${
          dark ? 'border-white/18' : 'border-line'
        }`}
      >
        <span className={dark ? 'text-paper/75' : 'text-blue'}>{file}</span>
        <span>{ratio.replace(/ /g, '')}</span>
      </div>
    </div>
  );
}
