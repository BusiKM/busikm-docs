/**
 * Dane strukturalne w formacie JSON-LD.
 *
 * Google czyta stąd, czym jest firma, czym jest produkt i ile kosztuje —
 * i na tej podstawie buduje wynik rozszerzony. Znacznik jest niewidoczny
 * dla czytelnika, więc wszystko, co tu wpisujemy, musi mieć pokrycie
 * w treści strony. Wymyślone oceny albo ceny to najprostsza droga
 * do ręcznej kary.
 */
export function JsonLd({ dane }: { dane: object }) {
  return (
    <script
      type="application/ld+json"
      // Ucieczka `<` chroni przed zamknięciem znacznika przez wartość
      // pochodzącą z treści — np. gdyby w opisie planu pojawiło się `</script>`.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(dane).replace(/</g, '\\u003c'),
      }}
    />
  );
}
