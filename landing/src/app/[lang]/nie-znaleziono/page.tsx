import type { Metadata } from 'next';
import {
  StronaNieZnaleziona,
  tytulNieZnalezionej,
} from '@/components/pages/nie-znaleziono/StronaNieZnaleziona';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';

/**
 * Strona 404 dla nieznanych adresów.
 *
 * Układ główny stoi w `app/[lang]`, więc Next nie ma własnego układu dla
 * adresu, który nie pasuje do żadnej trasy — jego wbudowana strona 404
 * wychodziła bez nagłówka, stopki i `<html lang>`. Dlatego `proxy.ts`
 * przepisuje każdy nieznany adres tutaj, ze statusem 404. Adres w pasku
 * przeglądarki zostaje ten, który wpisał czytelnik.
 */
export async function generateMetadata({ params }: ParametryJezyka): Promise<Metadata> {
  return {
    title: tytulNieZnalezionej(await jezykZParametrow(params)),
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  return <StronaNieZnaleziona />;
}
