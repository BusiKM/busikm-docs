import { StronaDokumentu } from '@/components/pages/dokument/StronaDokumentu';
import { pageMetadata } from '@/components/layout/PageShell';
import { powierzenie, pozostaleDokumenty } from '@/content/dokumenty';

export const metadata = pageMetadata('powierzenie-danych');

export default function Page() {
  return (
    <StronaDokumentu dokument={powierzenie} pozostale={pozostaleDokumenty('/powierzenie-danych')} />
  );
}
