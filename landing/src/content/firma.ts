/**
 * Dane rejestrowe spółki. Jedno źródło — stopka i strona kontaktu biorą je stąd,
 * żeby nie rozjechały się przy pierwszej zmianie.
 */
export const firma = {
  nazwa: 'MOVGRANTO Sp. z o.o.',
  ulica: 'ul. Władysława Łokietka 5/2',
  miasto: '70-254 Szczecin',
  nip: '5993238990',
  regon: '382452281',
  krs: '0000767899',
  /**
   * Sąd rejestrowy i kapitał zakładowy.
   *
   * Nie są ozdobą: art. 206 § 1 Kodeksu spółek handlowych wymienia je obok
   * firmy, adresu, numeru KRS i NIP-u jako dane, które spółka z ograniczoną
   * odpowiedzialnością podaje w pismach, zamówieniach handlowych **i na
   * swoich stronach internetowych**.
   */
  sad: 'Sąd Rejonowy w Szczecinie, Wydział Gospodarczy KRS',
  kapital: '5 000 zł',
  email: 'kontakt@busikm.pl',
} as const;
