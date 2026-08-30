import { Container } from '@/components/ui/Container';
import { TachographCard } from '@/components/mockups/TachographCard';

/**
 * Moment ustawowy — jedyne miejsce, gdzie wolno użyć amber.
 * Ton: spokojny fakt i spokojna odpowiedź, nie alarm.
 */
export function Tachograph() {
  return (
    <section className="bg-ink px-5 py-24 text-paper lg:px-10 lg:py-40">
      <Container className="grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <div className="text-caption font-medium tracking-[0.12em] text-amber">
            OD 1 LIPCA 2026
          </div>
          <h2 className="mt-5 text-h1-m font-bold lg:mt-6 lg:text-h1">
            Tachograf w busie.{' '}
            <br className="hidden lg:inline" />
            Obowiązkowo.
          </h2>
          <p className="mt-5 text-lead-m text-pretty text-paper/62 lg:mt-7 lg:text-lead">
            Busy o DMC powyżej 2,5 tony w transporcie międzynarodowym muszą mieć
            tachograf inteligentny drugiej generacji. Dane z tachografu pobierasz
            co 90 dni, z karty kierowcy co 28. Za brak — 12 000 złotych kary.
          </p>
          <h3 className="mt-7 text-h3-m font-semibold text-white lg:mt-10 lg:text-h3">
            BusiKM pilnuje terminów za Ciebie.
          </h3>
        </div>

        <TachographCard />
      </Container>
    </section>
  );
}
