import { StronaDokumentu } from '@/components/pages/dokument/StronaDokumentu';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { regulamin, pozostaleDokumenty } from '@/content/dokumenty';

export const generateMetadata = metadataPodstrony('regulamin');

export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  return (
    <StronaDokumentu
      dokument={regulamin[jezyk]}
      pozostale={pozostaleDokumenty('/regulamin', jezyk)}
    />
  );
}
