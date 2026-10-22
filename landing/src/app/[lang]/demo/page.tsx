import { MockupSlot } from '@/components/ui/MockupSlot';
import { DemoMockup } from '@/components/mockups/DemoMockup';
import { metadataPodstrony } from '@/lib/metadata';
import { jezykZParametrow, type ParametryJezyka } from '@/i18n/serwer';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import Link from '@/i18n/Link';
import { appLinks } from '@/content/navigation';

export const generateMetadata = metadataPodstrony('demo');

const TEKSTY: Tlumaczenia<{
  eyebrow: string;
  naglowek: string;
  lead: readonly string[];
  wejdz: string;
  zasady: string;
  konto: string;
  kontoLink: string;
  kafelki: readonly (readonly [string, string])[];
  mockupLabel: string;
  mockupNota: string;
  coZobaczysz: string;
  przelacznik: string;
  przelacznikOpis: string;
}> = {
  pl: {
    eyebrow: 'Demo',
    naglowek: 'Zobacz BusiKM od środka. Bez konta.',
    lead: [
      'Przykładowa firma transportowa z flotą, zleceniami, fakturami i kosztami.',
      'Wybierasz rolę – właściciel, dyspozytor albo księgowa – i klikasz, ile chcesz.',
    ],
    wejdz: 'Wejdź do demo',
    zasady: 'Bez rejestracji · tylko do odczytu · sesja na godzinę',
    konto: 'Wolisz własne konto?',
    kontoLink: 'Zapisz się na listę',
    kafelki: [
      ['Pulpit właściciela', '„Do zrobienia”, „Dziś” i wynik miesiąca'],
      ['Dyspozytornia', 'kolejka zleceń i mapa floty obok siebie'],
      ['Zlecenie z fakturą', 'jak jedno robi się drugim'],
      ['Komplet dla księgowej', 'eksporty i paczka dla biura jednym przyciskiem'],
    ],
    mockupLabel: 'Demo · pulpit właściciela · desktop, tryb nocny',
    mockupNota:
      'Pulpit właściciela na danych przykładowej firmy: „Do zrobienia” z listą spraw i „Dziś” z kursami w trasie.',
    coZobaczysz: 'Co zobaczysz w środku',
    przelacznik: 'Wybór roli przy wejściu: właściciel · dyspozytor · księgowa',
    przelacznikOpis:
      'Wybierasz rolę i oglądasz jej stanowisko pracy na danych przykładowej firmy transportowej. Demo jest tylko do odczytu, więc niczego nie zepsujesz.',
  },
  en: {
    eyebrow: 'Demo',
    naglowek: 'See BusiKM from the inside. No account.',
    lead: [
      'A sample transport company, with its fleet, orders, invoices and costs.',
      'Pick a role – owner, dispatcher or accountant – and click around as much as you like.',
    ],
    wejdz: 'Enter the demo',
    zasady: 'No sign-up · read-only · one-hour session',
    konto: 'Want your own account?',
    kontoLink: 'Join the list',
    kafelki: [
      ['Owner’s dashboard', '“To do”, “Today” and the month’s result'],
      ['Dispatch', 'the order queue and fleet map side by side'],
      ['Order to invoice', 'how one turns into the other'],
      ['Full pack for your accountant', 'exports and the package for the office in one click'],
    ],
    mockupLabel: 'Demo · owner’s dashboard · desktop, night mode',
    mockupNota:
      'The owner’s dashboard on a sample company’s data: “To do” with a list of tasks and “Today” with the runs on the road.',
    coZobaczysz: 'What you’ll see inside',
    przelacznik: 'Pick a role when you enter: owner · dispatcher · accountant',
    przelacznikOpis:
      'You pick a role and look around its workspace on a sample transport company’s data. The demo is read-only, so you can’t break anything.',
  },
};

/**
 * Demo – wejście do prawdziwej aplikacji.
 *
 * Demo działa w aplikacji (`appLinks.demo`, adres ze zmiennej
 * `NEXT_PUBLIC_DEMO_URL`): przykładowa firma, wybór roli przy wejściu,
 * tylko do odczytu, sesja na godzinę. Ta strona nie zbiera już adresów –
 * mówi, czego się spodziewać, i prowadzi jednym przyciskiem dalej.
 * Kto chce własne konto, ma odnośnik do listy na `/zaloguj`.
 */
export default async function Page({ params }: ParametryJezyka) {
  const jezyk = await jezykZParametrow(params);
  const t = TEKSTY[jezyk];
  return (
    <>
      <Header />
      <main className="relative overflow-hidden bg-paper px-6 py-16 lg:px-12 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(10,10,11,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,10,11,.035)_1px,transparent_1px)] bg-size-[80px_80px] lg:bg-size-[120px_120px]"
        />
        <Container className="relative grid gap-12 lg:grid-cols-[480px_1fr] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8 lg:gap-9">
            <div className="flex flex-col gap-5">
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <h1
                data-reveal
                className="text-display-m font-bold text-balance lg:text-[56px] lg:leading-[1.05] lg:tracking-[-0.03em]"
              >
                {t.naglowek}
              </h1>
              <div
                data-reveal
                className="flex flex-col gap-1.5 text-[17px] leading-relaxed text-muted lg:text-[19px]"
              >
                {t.lead.map((zdanie) => (
                  <span key={zdanie}>{zdanie}</span>
                ))}
              </div>
            </div>

            <div data-reveal className="flex flex-col gap-3">
              <Button href={appLinks.demo} fullWidth className="lg:w-auto lg:self-start">
                {t.wejdz}
              </Button>
              <p className="text-[13px] text-muted lg:text-caption">{t.zasady}</p>
            </div>

            <div data-reveal className="border-t border-line pt-6 text-[14px] text-muted">
              {t.konto}{' '}
              <Link href={appLinks.login} className="font-medium text-blue">
                {t.kontoLink}
              </Link>
            </div>
          </div>

          <div data-reveal className="relative flex flex-col gap-5">
            <div
              aria-hidden
              className="absolute right-[10%] bottom-30 left-[10%] h-30 bg-blue opacity-22 blur-[70px] lg:h-40 lg:blur-[100px]"
            />
            <div className="relative">
              <MockupSlot
                file="mockup-demo-ekran-desktop.png"
                label={t.mockupLabel}
                note={t.mockupNota}
                ratio="16:10"
                noteClassName="mx-auto max-w-[600px]"
              >
                <DemoMockup />
              </MockupSlot>
            </div>

            <div className="relative flex flex-col gap-3.5">
              <div className="text-[12px] font-semibold tracking-[0.1em] text-muted uppercase">
                {t.coZobaczysz}
              </div>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {t.kafelki.map(([tytul, opis]) => (
                  <div
                    key={tytul}
                    className="flex flex-col gap-1 rounded-[14px] border border-line bg-white px-4 py-3.5 text-[14px] leading-snug"
                  >
                    <b>{tytul}</b>
                    <span className="text-muted">{opis}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-[14px] bg-ink px-4 py-3.5 text-[13px] leading-snug text-paper">
                <b className="text-[14px]">{t.przelacznik}</b>
                <div className="text-ink-muted">{t.przelacznikOpis}</div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
