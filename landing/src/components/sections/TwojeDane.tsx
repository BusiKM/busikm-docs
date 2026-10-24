import Link from '@/i18n/Link';
import { Section } from '@/components/ui/Section';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{
  naglowek: string;
  items: string[];
  wyjatki: string;
  rejestr: string;
}> = {
  pl: {
    naglowek: 'Twoje dane zostają Twoje.',
    items: [
      'Serwery w Europie (Frankfurt)',
      'Kopia codziennie, zaszyfrowana, u drugiego dostawcy',
      'Po rezygnacji konto zostaje do odczytu – pobierasz faktury i eksporty',
      'Widać, kto co zmienił i kiedy',
    ],
    wyjatki: 'Wyjątki – odczyt dokumentów przez AI i powiadomienia w telefonie – opisujemy w',
    rejestr: 'rejestrze podprocesorów',
  },
  en: {
    naglowek: 'Your data stays yours.',
    items: [
      'Servers in Europe (Frankfurt)',
      'A daily backup, encrypted, with a second provider',
      'After you cancel, your account stays read-only – download invoices and exports',
      'You can see who changed what, and when',
    ],
    wyjatki: 'Exceptions – AI reading of documents and phone notifications – are described in our',
    rejestr: 'list of subprocessors',
  },
};

/**
 * 6.19 – dane.
 *
 * Nota o wyjątkach nie jest drobnym drukiem, tylko warunkiem prawdziwości
 * zdania nad nią. Serwery stoją w Europie (DigitalOcean, Frankfurt), ale
 * odczyt dokumentów przez AI i powiadomienia w telefonie idą przez
 * dostawców spoza tej infrastruktury – szczegóły są w rejestrze
 * podprocesorów. O kopiach mówimy tylko tyle, ile wiemy na pewno: codziennie,
 * zaszyfrowane, u drugiego dostawcy – bez obietnicy, że zostają w UE.
 */
export function TwojeDane() {
  const t = TEKSTY[biezacyJezyk()];
  return (
    <Section tone="ink">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold text-balance lg:text-h2">
          {t.naglowek}
        </h2>

        <div
          data-reveal-group
          className="flex flex-col text-[16px] leading-relaxed lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:text-body"
        >
          {t.items.map((item) => (
            <div key={item} data-reveal className="border-t border-line-dark py-3.5 lg:py-5">
              {item}
            </div>
          ))}

          <p
            data-reveal
            className="mt-5 text-[14px] leading-relaxed text-ink-muted lg:col-span-2 lg:mt-3 lg:text-[15px]"
          >
            {t.wyjatki}{' '}
            <Link
              href="/podprocesorzy"
              className="text-paper underline underline-offset-2 hover:text-paper"
            >
              {t.rejestr}
            </Link>
            .
          </p>
        </div>
      </div>
    </Section>
  );
}
