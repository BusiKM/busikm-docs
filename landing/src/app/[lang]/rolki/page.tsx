import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StronaRolek } from '@/components/pages/rolki/StronaRolek';
import { JsonLd } from '@/components/seo/JsonLd';
import { listaRolek } from '@/components/seo/schema';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { IkonaFacebook } from '@/components/ui/IkonaFacebook';
import { Eyebrow } from '@/components/ui/Section';
import { firma } from '@/content/firma';
import { appLinks } from '@/content/navigation';
import { pobierzRolki } from '@/content/rolki';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import { metadataPodstrony } from '@/lib/metadata';

export const generateMetadata = metadataPodstrony('rolki');

const TEKSTY: Tlumaczenia<{
  facebook: { eyebrow: string; naglowek: string; tekst: string; przycisk: string };
  demo: { eyebrow: string; naglowek: string; tekst: string; przycisk: string };
}> = {
  pl: {
    facebook: {
      eyebrow: 'Facebook',
      naglowek: 'Zapytaj pod rolką',
      tekst: 'Tu oglądasz w spokoju. Na naszej stronie na Facebooku napiszesz komentarz i nie przegapisz nowego filmu.',
      przycisk: 'Obserwuj na Facebooku',
    },
    demo: {
      eyebrow: 'Demo',
      naglowek: 'Zobacz to u siebie na ekranie',
      tekst: 'Wejdź bez konta i zobacz aplikację na danych przykładowej firmy.',
      przycisk: 'Zobacz demo',
    },
  },
  en: {
    facebook: {
      eyebrow: 'Facebook',
      naglowek: 'Ask under a reel',
      tekst: 'Watch in peace here. On our Facebook page you can leave a comment and never miss a new video.',
      przycisk: 'Follow on Facebook',
    },
    demo: {
      eyebrow: 'Demo',
      naglowek: 'See it on your own screen',
      tekst: 'Walk in without an account and see the app on a sample company’s data.',
      przycisk: 'See the demo',
    },
  },
};

/** Treść filmów przychodzi z katalogu w R2, patrz `content/rolki.ts`. */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  const rolki = await pobierzRolki(jezyk);

  return (
    <>
      <Header />
      {rolki.length > 0 && <JsonLd dane={listaRolek(rolki, jezyk)} />}
      <main>
        <StronaRolek rolki={rolki} />

        <section className="bg-paper px-6 pb-20 lg:px-12 lg:pb-24">
          <Container className="grid gap-4 lg:grid-cols-2 lg:gap-6">
            <div className="flex flex-col items-start gap-3.5 rounded-panel bg-ink p-6 text-paper lg:p-10">
              <Eyebrow dark>{t.facebook.eyebrow}</Eyebrow>
              <h2 className="text-h3-m font-bold lg:text-h3">{t.facebook.naglowek}</h2>
              <p className="mb-3 flex-grow text-body text-[#b4b4bb]">{t.facebook.tekst}</p>
              <a
                href={firma.facebook}
                target="_blank"
                rel="noopener"
                className="inline-flex h-[52px] w-full items-center justify-center gap-2.5 rounded-btn border border-line-dark-2 px-7 text-body font-semibold text-paper transition-colors hover:border-ink-muted hover:text-paper sm:w-auto lg:h-14"
              >
                <IkonaFacebook />
                {t.facebook.przycisk}
              </a>
            </div>
            <div className="flex flex-col items-start gap-3.5 rounded-panel bg-blue-soft p-6 lg:p-10">
              <Eyebrow className="!text-blue-dark">{t.demo.eyebrow}</Eyebrow>
              <h2 className="text-h3-m font-bold lg:text-h3">{t.demo.naglowek}</h2>
              <p className="mb-3 flex-grow text-body text-[#3f3f46]">{t.demo.tekst}</p>
              <Button href={appLinks.demo} className="w-full sm:w-auto">
                {t.demo.przycisk}
              </Button>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
