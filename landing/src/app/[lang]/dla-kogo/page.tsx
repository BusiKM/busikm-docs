import { PageShell } from '@/components/layout/PageShell';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';

export const generateMetadata = metadataPodstrony('dla-kogo');

export default async function Page({ params }: ParametryJezyka) {
  await jezykZParametrow(params);
  return <PageShell slug="dla-kogo" />;
}
