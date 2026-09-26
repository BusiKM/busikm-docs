'use client';

import { createContext, useContext } from 'react';
import { JEZYK_DOMYSLNY, type Jezyk } from '@/i18n/jezyki';

/**
 * Język dla komponentów klienckich.
 *
 * Dostawca stoi w układzie głównym, więc każdy komponent kliencki — także
 * osadzony w drzewie serwerowym — widzi język strony bez propsów.
 */
const KontekstJezyka = createContext<Jezyk>(JEZYK_DOMYSLNY);

export function DostawcaJezyka({
  jezyk,
  children,
}: {
  jezyk: Jezyk;
  children: React.ReactNode;
}) {
  return <KontekstJezyka.Provider value={jezyk}>{children}</KontekstJezyka.Provider>;
}

export function useJezyk(): Jezyk {
  return useContext(KontekstJezyka);
}
