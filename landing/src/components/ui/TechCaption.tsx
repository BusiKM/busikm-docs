/**
 * Podpis techniczny — jedno szare zdanie pod korzyścią.
 * Nigdy jako nagłówek (zasada z briefu).
 */
export function TechCaption({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <p
      className={`mt-6 text-caption lg:mt-10 ${
        dark ? 'text-paper/45' : 'text-muted'
      }`}
    >
      {children}
    </p>
  );
}
