import { Akordeon } from '@/components/ui/Akordeon';
import type { Tlumaczenia } from '@/i18n/jezyki';
import { biezacyJezyk } from '@/i18n/serwer';

const TEKSTY: Tlumaczenia<{ naglowek: string; qa: readonly (readonly [string, string])[] }> = {
  pl: {
    naglowek: 'Pytania',
    qa: [
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
    ],
  },
  en: {
    naglowek: 'Questions',
    qa: [
      [
        'My driver won’t touch it.',
        'The driver has three buttons: go, take a photo, finish. They get a code, enter it once and they’re in. The app is in their language.',
      ],
      [
        'Will my accountant have to change how they work?',
        'No. They download a file and load it into the software they already use.',
      ],
      [
        'I already have trackers in my vans.',
        'BusiKM shows the position from the driver’s phone and links it to what a tracker can’t: the order, the costs and the settlement.',
      ],
      [
        'I have a tachograph. Why do I need this as well?',
        'The tachograph records because it has to. BusiKM shows — the driver sees on screen how much longer they can drive and when they have to stop, and you see the same from the office. It’s not the same device and not the same job.',
      ],
      [
        'What if the driver has no signal?',
        'The app keeps working and saves everything on the phone. Once there’s signal again, the data catches up by itself.',
      ],
      [
        'How long does it take to get started?',
        'You add a van, invite a driver, the driver installs the app. The first route shows up at your end the same day.',
      ],
      [
        'Can the dispatcher see how much I earn?',
        'They don’t need to. The money is visible to the owner and whoever handles the accounts.',
      ],
      ['Does a trailer count as a vehicle?', 'No. You only pay for powered vehicles.'],
      ['What happens to my data if I cancel?', 'It stays yours. You can download all of it.'],
    ],
  },
};

/** 6.20 — pytania. Prawdziwe obiekcje, w kolejności, w jakiej padają. */
export function Pytania() {
  const t = TEKSTY[biezacyJezyk()];
  return <Akordeon id="pomoc" heading={t.naglowek} items={t.qa} />;
}
