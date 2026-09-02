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
  email: 'kontakt@busikm.pl',
} as const;
