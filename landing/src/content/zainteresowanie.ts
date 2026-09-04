/**
 * Wybór z cennika przeniesiony na stronę zapisu.
 *
 * Ktoś, kto klika „Wypróbuj 14 dni" przy planie Firma z rozliczeniem
 * rocznym, powiedział o sobie więcej niż samym adresem. Ta informacja
 * ginęła: przycisk prowadził na `/zaloguj` bez śladu po tym, co człowiek
 * przed chwilą oglądał. Tutaj jedzie w adresie i dalej — do bazy,
 * powiadomienia i Klaviyo.
 *
 * To **deklaracja zainteresowania, nie zamówienie**. Nikt jeszcze nie
 * płaci i nie wybiera planu wiążąco: rejestracji nie ma, a wybrany plan
 * można zmienić przy zakładaniu konta. Dlatego pola są opcjonalne wszędzie
 * dalej — wejście wprost na `/zaloguj`, z zakładki albo z wyszukiwarki,
 * jest równie poprawne i nie może niczego wywracać.
 *
 * Identyfikatory są bez ogonków i małą literą, bo jadą w adresie. Nazwy
 * do pokazania człowiekowi trzyma `NAZWY_*` — nie odtwarzaj ich z
 * identyfikatora wielką literą, bo „miesiecznie" nie zamieni się w
 * „miesięcznie".
 */

export const PLANY = ['start', 'firma'] as const;
export const OKRESY = ['miesiecznie', 'rocznie'] as const;

export type PlanId = (typeof PLANY)[number];
export type OkresId = (typeof OKRESY)[number];

export type Zainteresowanie = {
  plan: PlanId;
  okres: OkresId;
};

const NAZWY_PLANOW: Record<PlanId, string> = {
  start: 'Start',
  firma: 'Firma',
};

const NAZWY_OKRESOW: Record<OkresId, string> = {
  miesiecznie: 'miesięcznie',
  rocznie: 'rocznie',
};

/** Do pokazania człowiekowi i do powiadomienia: „Firma · rocznie". */
export function opiszWybor({ plan, okres }: Zainteresowanie): string {
  return `${NAZWY_PLANOW[plan]} · ${NAZWY_OKRESOW[okres]}`;
}

export function nazwaPlanu(plan: PlanId): string {
  return NAZWY_PLANOW[plan];
}

export function nazwaOkresu(okres: OkresId): string {
  return NAZWY_OKRESOW[okres];
}

/** Adres, pod który prowadzi „Wypróbuj 14 dni" w cenniku. */
export function linkProbny(wybor: Zainteresowanie): string {
  return `/zaloguj?plan=${wybor.plan}&okres=${wybor.okres}`;
}

/**
 * Odczyt z adresu.
 *
 * Parametry przychodzą z zewnątrz i każdy może wpisać w pasku, co zechce —
 * dlatego przechodzą wyłącznie wartości z listy. Cokolwiek innego, brak
 * jednego z dwóch albo brak obu daje `null`, czyli „nie wiemy" — i tak ma
 * być, bo to zwykłe wejście na stronę zapisu.
 */
export function odczytajWybor(
  params: URLSearchParams | null | undefined,
): Zainteresowanie | null {
  if (!params) return null;

  const plan = params.get('plan');
  const okres = params.get('okres');

  const planOk = PLANY.includes(plan as PlanId);
  const okresOk = OKRESY.includes(okres as OkresId);

  if (!planOk || !okresOk) return null;
  return { plan: plan as PlanId, okres: okres as OkresId };
}

/** Ta sama walidacja po stronie serwera — trasa API nie ufa temu, co dostaje. */
export function poprawnyWybor(
  plan: unknown,
  okres: unknown,
): Zainteresowanie | null {
  return odczytajWybor(
    new URLSearchParams({ plan: String(plan ?? ''), okres: String(okres ?? '') }),
  );
}
