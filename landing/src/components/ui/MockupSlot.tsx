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
const DEV = process.env.NODE_ENV === 'development';

/**
 * Adres zrzutu, jeśli plik już jest.
 *
 * W trybie deweloperskim dokładamy sygnaturę czasu ostatniej zmiany i omijamy
 * optymalizator obrazów. Powód: optymalizator trzyma wynik pod adresem, a nie
 * pod zawartością pliku — po podmianie zrzutu pod tą samą nazwą oddaje stary
 * obraz z tym samym ETagiem, aż do restartu serwera. Sprawdzone: plik
 * statyczny zmienia ETag poprawnie, zoptymalizowany nie.
 *
 * W produkcji problemu nie ma, bo pliki nie zmieniają się w locie — tam
 * zostaje optymalizacja i czysty adres.
 */
function imageSrc(file: string): string | null {
  if (file.includes('/') || file.includes('..')) return null;
  try {
    const { mtimeMs } = fs.statSync(path.join(MOCKUPS_DIR, file));
    return DEV ? `/mockups/${file}?v=${Math.round(mtimeMs)}` : `/mockups/${file}`;
  } catch {
    return null;
  }
}

type MockupSlotProps = {
  /** Nazwa pliku wg schematu `mockup-<obszar>-<ekran>-<urządzenie>.png`. */
  file: string;
  /** Etykieta w notce, wersalikami — np. „Ekran właściciela · desktop 1440". */
  label: string;
  /** Co dokładnie ma być widać na docelowym zrzucie. */
  note: string;
  /** Proporcje docelowego zrzutu, np. „16:10". Trafiają do notki. */
  ratio: string;
  /**
   * Kształt pudła w układzie strony. Domyślnie taki jak `ratio`.
   *
   * Rozdzielony, bo zrzut telefonu ma proporcje 9:19.5, ale nie może zajmować
   * pudła o takim kształcie — w kolumnie szerokiej na 660 px dałoby to 1430 px
   * wysokości i zepchnęło resztę sekcji w dół. Telefon dostaje więc pudło
   * takie jak sąsiednie ekrany i mieści się w nim wyśrodkowany.
   */
  box?: string;
  /**
   * Powiększenie samego obrazu ponad pudło, np. 1.35.
   *
   * Zrzut telefonu jest wąski, więc w pudle 16:10 ogranicza go wysokość
   * i wychodzi mały. Powiększenie pozwala mu urosnąć bez zmiany wysokości
   * pudła, czyli bez ruszania układu sekcji. Obraz wychodzi wtedy poza pudło
   * symetrycznie w górę i w dół — na ciemnym tle to niewidoczne, a notki
   * „do podmiany" i tak już nie ma, bo zrzut istnieje.
   */
  imageScale?: number;
  /** Rysowana makieta, która stoi tam do czasu podmiany. */
  children: React.ReactNode;
  dark?: boolean;
  /** Klasy opakowania notki — pozwala ją zwęzić albo wyśrodkować. */
  noteClassName?: string;
  /**
   * Nazwa ekranu pod makietą. Gdy podana, notka „do podmiany" zwija się
   * do jednej linii obok tej nazwy zamiast przerywanej ramki — a sama nazwa
   * zostaje także po podmianie zrzutu. Tak wygląda siatka ekranów na
   * stronach ról, gdzie kilka makiet stoi obok siebie i każda potrzebuje
   * podpisu, a nie akapitu.
   */
  caption?: string;
};

export function MockupSlot({
  file,
  label,
  note,
  ratio,
  box,
  imageScale,
  children,
  dark = false,
  noteClassName = '',
  caption,
}: MockupSlotProps) {
  const src = imageSrc(file);

  const podpis = (brakuje: boolean) =>
    caption ? (
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <b className="text-[15px] lg:text-body">{caption}</b>
        {brakuje && (
          <span
            className={`font-mono text-[10px] lg:text-[11px] ${dark ? 'text-ink-muted' : 'text-muted'}`}
          >
            Do podmiany · {file} · {ratio}
          </span>
        )}
      </div>
    ) : null;

  if (src) {
    const [w, h] = (box ?? ratio).split(':').map(Number);
    const obraz = (
      /*
        `key` przy adresie pliku jest tu istotny, a nie kosmetyczny.
        Gdy sąsiad podmienia makietę w tym samym miejscu — zakładki ról,
        takty sceny przyklejonej — React bez klucza zostawia ten sam
        element `<img>` i tylko zmienia mu `src` oraz `transform`. Styl
        wchodzi natychmiast, bitmapa dopiero po pobraniu, więc przez chwilę
        widać **poprzedni** obraz przeskalowany współczynnikiem nowego:
        laptop puchnie do 1,42, a dopiero potem pojawia się telefon.
        Zmierzone: około 300 ms przy wolniejszym łączu.

        Klucz wymusza wymianę elementu, więc stary obraz znika od razu,
        a nowy wchodzi płynnie klasą `wchodzi`.
      */
      <div
        key={src}
        className="wchodzi relative w-full"
        style={{ aspectRatio: `${w} / ${h}` }}
      >
        <Image
          src={src}
          alt={`${label} — ${note}`}
          fill
          sizes="(max-width: 1024px) 100vw, 1120px"
          className={`object-contain ${imageScale ? 'pointer-events-none' : ''}`}
          style={imageScale ? { transform: `scale(${imageScale})` } : undefined}
          unoptimized={DEV}
        />
      </div>
    );

    if (!caption) return obraz;
    return (
      <div className="flex h-full flex-col gap-3.5">
        {obraz}
        <div className="mt-auto">{podpis(false)}</div>
      </div>
    );
  }

  if (caption) {
    return (
      <div className="flex h-full flex-col gap-3.5">
        {children}
        <div className="mt-auto">{podpis(true)}</div>
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
