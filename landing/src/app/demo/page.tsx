import { PageShell, pageMetadata } from '@/components/layout/PageShell';

export const metadata = pageMetadata('demo');

export default function Page() {
  return <PageShell slug="demo" />;
}
