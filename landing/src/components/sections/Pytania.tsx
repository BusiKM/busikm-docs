import { Akordeon } from '@/components/ui/Akordeon';

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
  return <Akordeon id="pomoc" heading="Pytania" items={qa} />;
}
