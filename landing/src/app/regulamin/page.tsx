import { StronaDokumentu } from '@/components/pages/dokument/StronaDokumentu';
import { pageMetadata } from '@/components/layout/PageShell';
import { regulamin, pozostaleDokumenty } from '@/content/dokumenty';

export const metadata = pageMetadata('regulamin');

export default function Page() {
  return (
    <StronaDokumentu dokument={regulamin} pozostale={pozostaleDokumenty('/regulamin')} />
  );
}
