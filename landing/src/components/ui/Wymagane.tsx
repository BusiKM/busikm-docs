/**
 * Gwiazdka przy polu wymaganym.
 *
 * `aria-hidden`, bo czytnik ekranu i tak ogłosi „wymagane" z atrybutu
 * `required` na samym polu — przeczytana na głos gwiazdka byłaby drugim,
 * mniej zrozumiałym komunikatem o tym samym.
 *
 * Kolor to `red-ink`, nie systemowy `red`: ten drugi ma na jasnym tle 3,4:1
 * i jest zarezerwowany dla kropki przerwy na stronie statusu.
 */
export function Wymagane() {
  return (
    <span aria-hidden className="ml-0.5 text-red-ink">
      *
    </span>
  );
}
