import { StronaDokumentu } from '@/components/pages/dokument/StronaDokumentu';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { podprocesorzy, pozostaleDokumenty } from '@/content/dokumenty';

export const generateMetadata = metadataPodstrony('podprocesorzy');

export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  return (
    <StronaDokumentu
      dokument={podprocesorzy[jezyk]}
      pozostale={pozostaleDokumenty('/podprocesorzy', jezyk)}
    />
  );
}
