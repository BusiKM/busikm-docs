'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';

const questions = [
  {
    q: 'Czy muszę mieć tachograf, żeby korzystać?',
    a: 'Nie. BusiKM działa niezależnie od tachografu — liczy czas pracy z aplikacji kierowcy. Jeśli masz tachograf, przypomnimy Ci o terminach pobrania danych.',
  },
  {
    q: 'Co, jeśli kierowca nie umie obsługiwać aplikacji?',
    a: 'Kierowca ma trzy przyciski: rusz, zrób zdjęcie, zakończ. Wysyłamy mu kod, wpisuje go raz i gotowe. Nie musi zakładać konta ani wymyślać hasła.',
  },
  {
    q: 'Czy moja księgowa będzie musiała się przestawiać?',
    a: 'Nie. Pobiera plik i wczytuje do programu, którego już używa — Insert, Comarch, Symfonia albo zwykły arkusz.',
  },
  {
    q: 'Co z danymi, gdy zrezygnuję?',
    a: 'Zostają Twoje. Przez 30 dni pobierzesz wszystko w komplecie, w formatach do wczytania gdzie indziej.',
  },
  {
    q: 'Czy przyczepa liczy się jako pojazd?',
    a: 'Nie. Płacisz tylko za pojazdy napędzane.',
  },
  {
    q: 'Ile trwa uruchomienie?',
    a: 'Dodajesz pojazd, zapraszasz kierowcę, kierowca instaluje aplikację. Pierwsza trasa pojawia się u Ciebie tego samego dnia.',
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="pomoc" className="bg-paper px-5 pb-24 lg:px-10 lg:pb-40">
      <Container width="narrow">
        <h2 className="mb-8 text-h1-m font-bold lg:mb-[72px] lg:text-center lg:text-h1">
          Pytania
        </h2>

        {questions.map((item, i) => (
          <div
            key={item.q}
            className={`border-t border-line ${
              i === questions.length - 1 ? 'border-b' : ''
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left lg:items-center lg:gap-6 lg:py-7"
            >
              <span className="text-body font-medium text-ink lg:text-lead lg:tracking-[-0.01em]">
                {item.q}
              </span>
              <span className="text-[19px] text-muted lg:text-lead">
                {open === i ? '−' : '+'}
              </span>
            </button>
            {open === i && (
              <p className="max-w-[640px] pb-5 text-[15px] leading-[1.6] text-muted lg:pb-7 lg:text-body">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </Container>
    </section>
  );
}
