import { Section, Eyebrow } from '@/components/ui/Section';
import { Film } from '@/components/ui/Film';
import { biezacyJezyk } from '@/i18n/serwer';

/**
 * Film i okładka leżą w publicznym buckecie R2 `busikm-public`, a nie w repo.
 * Serwuje je Worker z `media-worker/` (zakresy Range, cache). Nowa wersja
 * filmu = wgranie pliku pod tę samą nazwę; strona dostaje ją najpóźniej
 * po dobie.
 */
const MEDIA = 'https://busikm-media.busikm.workers.dev';

const TEKSTY = {
  eyebrow: 'Minuta z BusiKM',
  naglowek: 'Tak wygląda dzień właściciela.',
  lead: 'Rano wiesz, co pilne. Widzisz zysk z każdego kursu, wystawiasz fakturę prosto ze zlecenia, a księgowa dostaje komplet. Sześćdziesiąt sekund na prawdziwych ekranach aplikacji.',
  label: 'Film: dzień właściciela firmy transportowej w BusiKM, 60 sekund',
};

/**
 * Film właściciela zaraz pod hero — pierwsza rzecz po przewinięciu.
 *
 * Tylko po polsku: napisy w filmie są polskie, a angielskiej wersji jeszcze
 * nie ma. Strona EN pomija sekcję zamiast pokazywać film w obcym języku.
 * Źródło: busikm-video, `out/wlasciciel/wlasciciel-landscape-pl.mp4`.
 * Plik wgrywany do R2 musi mieć `+faststart`, żeby ruszał przed pobraniem
 * całości.
 */
export function FilmWlasciciela() {
  if (biezacyJezyk() !== 'pl') return null;
  const t = TEKSTY;
  return (
    <Section tone="ink">
      <div className="flex flex-col gap-10 lg:items-center lg:gap-14">
        <div className="flex flex-col gap-4 lg:max-w-[760px] lg:items-center lg:gap-5 lg:text-center">
          <Eyebrow dark data-reveal>
            {t.eyebrow}
          </Eyebrow>
          <h2 data-reveal className="text-h1-m font-bold text-balance lg:text-h1">
            {t.naglowek}
          </h2>
          <p data-reveal className="text-[16px] leading-relaxed text-ink-muted lg:text-lead">
            {t.lead}
          </p>
        </div>
        <div
          data-reveal
          className="w-full overflow-hidden rounded-card border border-line-dark shadow-hero lg:rounded-panel"
        >
          <Film
            src={`${MEDIA}/film/wlasciciel-pl.mp4`}
            poster={`${MEDIA}/film/wlasciciel-pl.jpg`}
            label={t.label}
          />
        </div>
      </div>
    </Section>
  );
}
