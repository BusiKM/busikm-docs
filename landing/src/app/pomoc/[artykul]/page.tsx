import { notFound } from 'next/navigation';
import { metadataTresci } from '@/lib/metadata';
import { StronaArtykulu } from '@/components/pages/pomoc/StronaArtykulu';
import { artykuly, artykulPoSlugu } from '@/content/pomoc';

/**
 * Artykuły pomocy pod `/pomoc/<slug>`.
 *
 * Trasa dynamiczna, ale strony powstają przy budowaniu — `generateStaticParams`
 * wylicza je z listy artykułów, więc każda jest zwykłym plikiem HTML.
 * `dynamicParams = false` zamyka furtkę: adres spoza listy dostaje 404, a nie
 * pustą stronę wygenerowaną w locie.
 *
 * `/pomoc/pierwsze-kroki` ma własny plik i wygrywa z tą trasą — Next stawia
 * segment statyczny przed dynamicznym. To celowe: tamta strona jest listą do
 * odhaczania z paskiem postępu, a nie artykułem.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return artykuly.map((a) => ({ artykul: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ artykul: string }> }) {
  const { artykul: slug } = await params;
  const artykul = artykulPoSlugu(slug);
  if (!artykul) return {};

  return metadataTresci({
    sciezka: `/pomoc/${artykul.slug}`,
    tytul: artykul.tytul,
    opis: artykul.lead,
  });
}

export default async function Page({ params }: { params: Promise<{ artykul: string }> }) {
  const { artykul: slug } = await params;
  const artykul = artykulPoSlugu(slug);
  if (!artykul) notFound();

  return <StronaArtykulu artykul={artykul} />;
}
