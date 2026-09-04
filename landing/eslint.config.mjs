/**
 * ESLint — konfiguracja płaska.
 *
 * Next 16 usunął polecenie `next lint`, a razem z nim automatyczne
 * ustawianie reguł. Skrypt `lint` w package.json wołał je nadal i wywracał
 * się na „no such directory: /landing/lint" — ESLinta w tym projekcie nigdy
 * nie było, został sam skrypt po szablonie.
 *
 * `eslint-config-next` w wersji 16 eksportuje gotowe tablice konfiguracji
 * płaskiej, więc nie potrzeba pomostu `FlatCompat` z `@eslint/eslintrc`,
 * który do niedawna był tu konieczny.
 *
 * - `core-web-vitals` — reguły Nexta plus te wpływające na Core Web Vitals,
 *   podniesione z ostrzeżenia do błędu.
 * - `typescript` — warstwa dla TypeScriptu. Sprawdzanie typów zostaje
 *   po stronie `tsc --noEmit`; tutaj chodzi o wzorce, nie o typy.
 */
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

const konfiguracja = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
    ],
  },
  ...coreWebVitals,
  ...typescript,
];

export default konfiguracja;
