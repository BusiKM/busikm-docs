'use client';

import { useState } from 'react';
import { Section } from '@/components/ui/Section';

const qa = [
  [
    'Mój kierowca tego nie ruszy.',
    'Kierowca ma trzy przyciski: rusz, zrób zdjęcie, zakończ. Dostaje kod, wpisuje go raz i jest w środku. Aplikacja jest w jego języku.',
  ],
  [
    'Czy moja księgowa będzie musiała się przestawiać?',
    'Nie. Pobiera plik i wczytuje do programu, którego już używa.',
  ],
  [
    'Mam już lokalizator w busach.',
    'BusiKM pokazuje pozycję z telefonu kierowcy i łączy ją z tym, czego lokalizator nie umie: ze zleceniem, kosztami i rozliczeniem.',
  ],
  [
    'Mam tachograf. Po co mi jeszcze to?',
    'Tachograf zapisuje, bo musi. BusiKM pokazuje — kierowca widzi na ekranie, ile jeszcze może jechać i kiedy musi stanąć, a Ty widzisz to samo z biura. To nie to samo urządzenie i nie ta sama robota.',
  ],
  [
    'Co, gdy kierowca nie ma zasięgu?',
    'Aplikacja pracuje dalej i zapisuje wszystko w telefonie. Gdy złapie sygnał, dane dojeżdżają same.',
  ],
  [
    'Ile trwa uruchomienie?',
    'Dodajesz pojazd, zapraszasz kierowcę, kierowca instaluje aplikację. Pierwsza trasa pojawia się u Ciebie tego samego dnia.',
  ],
  [
    'Czy dyspozytor widzi, ile zarabiam?',
    'Nie musi. Pieniądze widzi właściciel i osoba od rozliczeń.',
  ],
  ['Czy przyczepa liczy się jako pojazd?', 'Nie. Płacisz tylko za pojazdy napędzane.'],
  ['Co z danymi, gdy zrezygnuję?', 'Zostają Twoje. Pobierzesz je w komplecie.'],
] as const;

/** 6.20 — pytania. Prawdziwe obiekcje, w kolejności, w jakiej padają. */
export function Pytania() {
  const [open, setOpen] = useState(-1);

  return (
    <Section id="pomoc">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-16">
        <h2 data-reveal className="text-h2-m font-semibold lg:text-h2">
          Pytania
        </h2>

        <div className="flex flex-col border-t border-line">
          {qa.map(([question, answer], i) => {
            const isOpen = open === i;
            return (
              <div key={question} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-5 text-left text-[19px] leading-tight font-semibold tracking-[-0.01em] lg:py-6 lg:text-[22px]"
                >
                  <span>{question}</span>
                  <span
                    aria-hidden
                    className="flex-none text-[22px] font-normal text-muted lg:text-[24px]"
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-6 text-[16px] leading-relaxed text-muted lg:pr-16 lg:pb-7 lg:text-body">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
