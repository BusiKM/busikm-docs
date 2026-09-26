import Link from '@/i18n/Link';
import { Container } from '@/components/ui/Container';
import { firma } from '@/content/firma';
import { Logo } from '@/components/layout/Logo';
import { nawigacja } from '@/content/navigation';
import { PrzyciskCookie } from '@/components/analytics/PrzyciskCookie';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Stopka — nawigacja, dane rejestrowe i pasek prawny.
 *
 * Układ w trzech warstwach, od najbardziej do najmniej użytecznej:
 * kolumny z odnośnikami, potem kto stoi za serwisem, na końcu drobny druk
 * i dokumenty. Kto szuka podstrony, dostaje ją najwyżej; kto szuka NIP-u
 * albo regulaminu, wie, że takie rzeczy są na samym dole.
 *
 * Dokumenty prawne zeszły z kolumn do paska dolnego. W kolumnie stały
 * jako czwarty równorzędny dział, choć nikt nie przegląda stopki w
 * poszukiwaniu rozdziału o powierzeniu danych — sięga po nie wtedy, gdy
 * ich potrzebuje, a wtedy szuka ich właśnie u dołu.
 */

/**
 * Drobny druk.
 *
 * Trzy zdania, które prostują to, co najłatwiej sobie dopowiedzieć: że cena
 * z cennika to kwota na fakturze, że BusiKM zdejmuje obowiązek tachografu
 * i że „w chmurze" znaczy gdziekolwiek. Wszystkie mają pokrycie w treści
 * serwisu — nie dopisuj tu niczego, czego nie ma na stronach.
 */
const TEKSTY: Tlumaczenia<{
  domu: string;
  drobnyDruk: string[];
  sad: string;
  kapital: string;
  odpowiedz: string;
}> = {
  pl: {
    domu: 'BusiKM — strona główna',
    drobnyDruk: [
      'Ceny w cenniku są netto — do faktury doliczamy VAT.',
      'BusiKM nie zastępuje tachografu. Tachograf zapisuje, BusiKM pokazuje.',
      'Serwery, bazy i kopie zapasowe stoją w Unii Europejskiej.',
    ],
    sad: firma.sad,
    kapital: `Kapitał zakładowy ${firma.kapital}`,
    odpowiedz: 'Odpisujemy tego samego dnia roboczego',
  },
  en: {
    domu: 'BusiKM — home',
    drobnyDruk: [
      'Prices are net — VAT is added to the invoice.',
      'BusiKM does not replace the tachograph. The tachograph records, BusiKM shows.',
      'Servers, databases and backups are located in the European Union.',
    ],
    // Nazwa sądu po polsku w nawiasie — tak brzmi w KRS i tak da się ją sprawdzić.
    sad: `District Court in Szczecin, Commercial Division of the National Court Register (${firma.sad})`,
    kapital: `Share capital PLN 5,000`,
    odpowiedz: 'We reply the same business day',
  },
};

export function Footer() {
  // Rok bierze się z chwili budowania. Przy naszym rytmie wdrożeń to
  // wystarcza, a data wpisana na sztywno zestarzałaby się po cichu.
  const rok = new Date().getFullYear();
  const jezyk = biezacyJezyk();
  const t = TEKSTY[jezyk];
  const { kolumnyStopki: kolumnyNawigacji, dokumenty } = nawigacja(jezyk);

  return (
    <footer className="border-t border-line-dark bg-ink px-6 pt-16 pb-10 text-paper lg:px-12 lg:pt-20">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="grid gap-8 text-[15px] leading-relaxed lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-8">
          <Link
            href="/"
            aria-label={t.domu}
            className="flex h-fit items-center gap-2.5 text-[20px] font-bold tracking-[-0.02em] text-paper hover:text-paper"
          >
            <Logo decorative className="size-9 flex-none" />
            BusiKM
          </Link>

          {kolumnyNawigacji.map((column) => (
            <div key={column.heading} className="flex flex-col gap-2">
              <div className="mb-2 font-semibold">{column.heading}</div>
              {column.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-ink-muted hover:text-paper"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Kto stoi za serwisem. Dane rejestrowe spółki z ograniczoną
            odpowiedzialnością muszą być dostępne na stronie — art. 206
            Kodeksu spółek handlowych. */}
        <div className="flex flex-col gap-2.5 border-t border-line-dark pt-10 text-[13px] leading-relaxed text-ink-muted lg:text-caption">
          <div className="flex flex-col gap-x-3 gap-y-0.5 lg:flex-row lg:flex-wrap lg:items-baseline">
            <span className="font-semibold text-paper">{firma.nazwa}</span>
            <span>
              {firma.ulica}, {firma.miasto}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>NIP {firma.nip}</span>
            <span>REGON {firma.regon}</span>
            <span>KRS {firma.krs}</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span>{t.sad}</span>
            <span>{t.kapital}</span>
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <a href={`mailto:${firma.email}`} className="text-ink-muted hover:text-paper">
              {firma.email}
            </a>
            <span>{t.odpowiedz}</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 text-[12px] leading-relaxed text-ink-faint lg:text-[13px]">
          {t.drobnyDruk.map((zdanie) => (
            <p key={zdanie}>{zdanie}</p>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-line-dark pt-6 text-[12px] text-ink-muted lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:text-caption">
          <span>
            © {rok} {firma.nazwa}
          </span>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {dokumenty.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ink-muted hover:text-paper"
              >
                {item.label}
              </Link>
            ))}
            <PrzyciskCookie />
          </div>
        </div>
      </Container>
    </footer>
  );
}
