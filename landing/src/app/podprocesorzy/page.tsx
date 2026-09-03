import { StronaDokumentu } from '@/components/pages/dokument/StronaDokumentu';
import { pageMetadata } from '@/components/layout/PageShell';
import { podprocesorzy, pozostaleDokumenty } from '@/content/dokumenty';

export const metadata = pageMetadata('podprocesorzy');

export default function Page() {
  return (
    <StronaDokumentu dokument={podprocesorzy} pozostale={pozostaleDokumenty('/podprocesorzy')} />
  );
}
