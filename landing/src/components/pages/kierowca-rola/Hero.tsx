import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Section';
import { MockupSlot } from '@/components/ui/MockupSlot';
import { TelefonyKierowcy } from '@/components/mockups/TelefonyKierowcy';
import { appLinks } from '@/content/navigation';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  nadtytul: string;
  tytul: React.ReactNode;
  lead: string;
  proba: string;
  demo: string;
  label: string;
  note: string;
}> = {
  pl: {
    nadtytul: 'Dla kierowcy',
    tytul: (
      <>
        Rusz. <br />
        Resztą zajmuje się telefon.
      </>
    ),
    lead: 'Jedna aplikacja na cały dzień. Nawigacja w środku, paragon zdjęciem, przerwa z wyprzedzeniem.',
    proba: 'Wypróbuj 14 dni',
    demo: 'Zobacz demo',
    label: 'Dwa telefony pod kątem · tryb nocny',
    note: 'Lewy (−8°): nawigacja. Prawy (+5°, z przodu): „Rozpocznij trasę”. Poświata i kąty zostają po podmianie.',
  },
  en: {
    nadtytul: 'For drivers',
    tytul: (
      <>
        Go. <br />
        Your phone does the rest.
      </>
    ),
    lead: 'One app for the whole day. Navigation built in, receipts by photo, breaks flagged in advance.',
    proba: 'Try 14 days free',
    demo: 'See the demo',
    label: 'Two phones at an angle · dark mode',
    note: 'Left (−8°): navigation. Right (+5°, in front): “Start route”. The glow and angles stay after the swap.',
  },
};

/**
 * Nagłówek strony kierowcy — ciemny i większy niż na pozostałych stronach ról:
 * 96 px zamiast 88, bo to jedyna strona pisana do kierowcy i typografia jest
 * tu częścią przekazu. Telefony stoją pod spodem, na pełną szerokość.
 */
export function Hero() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <section className="relative overflow-hidden bg-ink px-6 pt-24 text-paper lg:px-12 lg:pt-40">
      <Container className="relative flex flex-col gap-6 lg:gap-8">
        <Eyebrow dark>{t.nadtytul}</Eyebrow>
        <h1
          data-reveal
          className="text-[46px] leading-[1.02] font-bold tracking-[-0.03em] text-balance lg:text-[96px] lg:leading-[1.05]"
        >
          {t.tytul}
        </h1>
        <p data-reveal className="max-w-[640px] text-lead-m text-pretty text-ink-muted lg:text-lead">
          {t.lead}
        </p>
        <div data-reveal className="mt-2 flex flex-col gap-2.5 lg:flex-row lg:gap-3">
          <Button href={appLinks.trial} fullWidth className="lg:w-auto">
            {t.proba}
          </Button>
          <Button href={appLinks.demo} variant="secondaryDark" fullWidth className="lg:w-auto">
            {t.demo}
          </Button>
        </div>
      </Container>

      <Container className="relative mt-14 flex flex-col items-center pb-24 lg:mt-20 lg:pb-40">
        <div data-reveal className="relative w-full lg:max-w-[820px]">
          <MockupSlot
            file="mockup-kierowca-telefony-phone.png"
            label={t.label}
            note={t.note}
            ratio="2 × 9:19.5"
            box="16:10"
            imageScale={1.35}
            // Na telefonie mocniej niż na desktopie. Zrzut ma proporcje 4:3,
            // więc w pudle 16:10 ogranicza go wysokość i zostaje pusty
            // margines pliku — poza ekran wychodzi sam ten margines. Same
            // telefony zajmują 66% szerokości kadru, więc przy 1,35 wychodziły
            // na wąskim ekranie zbyt małe jak na hero, w którym są treścią.
            //
            // 1,8 wyliczone, nie dobrane na oko: przy 375 px daje telefonom
            // 324 px, czyli po 25 px marginesu z każdej strony. Przy 2,0
            // zostawało 7 px i kadr wyglądał na przycięty.
            imageScaleTelefon={1.8}
            dark
            noteClassName="mx-auto max-w-[600px]"
          >
            <TelefonyKierowcy />
          </MockupSlot>
        </div>
      </Container>
    </section>
  );
}
