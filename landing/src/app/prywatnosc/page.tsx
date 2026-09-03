import { StronaDokumentu } from '@/components/pages/dokument/StronaDokumentu';
import { pageMetadata } from '@/components/layout/PageShell';
import { prywatnosc, pozostaleDokumenty } from '@/content/dokumenty';

export const metadata = pageMetadata('prywatnosc');

export default function Page() {
  return (
    <StronaDokumentu dokument={prywatnosc} pozostale={pozostaleDokumenty('/prywatnosc')} />
  );
}
