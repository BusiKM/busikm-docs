import { firma } from '@/content/firma';

/**
 * Zgoda marketingowa — jedno brzmienie dla wszystkich formularzy.
 *
 * ## Dlaczego treść jest wersjonowana i zapisywana razem z adresem
 *
 * Art. 7 ust. 1 RODO nakłada na nas ciężar dowodu: musimy umieć **wykazać**,
 * że konkretna osoba zgodę wyraziła. Przy okienku na stronie dowodem jest log
 * na serwerze — ale samo `true` niczego nie dowodzi, bo za rok nikt nie
 * odtworzy, pod czym ta osoba się podpisała. Dlatego przy każdym zapisie
 * ląduje w bazie pełne brzmienie zgody i jej numer wersji.
 *
 * **Zmiana treści = nowa wersja.** Nigdy nie poprawiaj `TRESC` bez podniesienia
 * `WERSJA` — inaczej stare zapisy zaczną wskazywać na słowa, których ich
 * autorzy nigdy nie widzieli.
 *
 * Wersja 2 dopisała, **jak** wycofać zgodę. Art. 7 ust. 3 RODO wymaga, żeby
 * było to możliwe w każdej chwili i równie łatwo, jak jej udzielenie —
 * a odnośnik w wiadomości nie wystarcza komuś, do kogo pierwsza wiadomość
 * pójdzie dopiero za kilka miesięcy. Stąd druga droga, przez adres.
 *
 * ## Podstawa prawna
 *
 * Art. 6 ust. 1 lit. a RODO (zgoda) oraz **art. 398 Prawa komunikacji
 * elektronicznej**. To ostatni jest istotny: art. 10 ustawy o świadczeniu
 * usług drogą elektroniczną, na który powoływano się latami, został uchylony
 * 10 listopada 2024 i zastąpiony jednym przepisem obejmującym wszystkie
 * kanały.
 *
 * ## Dlaczego wolno wymagać jej na stronach zapisu
 *
 * Art. 7 ust. 4 RODO zabrania uzależniać wykonanie usługi od zgody, która
 * nie jest do niej niezbędna. Na `/demo` i `/zaloguj` usługą **jest** lista —
 * zgoda nie warunkuje niczego innego, bo nic innego tam nie oferujemy.
 * W formularzu kontaktowym jest odwrotnie: usługą jest odpowiedź na pytanie,
 * więc tam zgoda musi być nieobowiązkowa.
 */

export const WERSJA_ZGODY = 2;

export const TRESC_ZGODY =
  `Zgadzam się na otrzymywanie od ${firma.nazwa} informacji o BusiKM na podany adres ` +
  'e-mail — w tym o uruchomieniu demo i otwarciu zapisów. Zgodę wycofam odnośnikiem ' +
  `w każdej wiadomości albo pisząc na ${firma.email}.`;

/** Kanał, którego zgoda dotyczy. Art. 398 PKE wymaga wskazania go wprost. */
export const KANAL_ZGODY = 'email';

/**
 * Źródło zapisu — przyszły tag w narzędziu do wysyłki.
 *
 * `formularz` różni się od pozostałych: tam zgoda jest nieobowiązkowa, więc
 * na liście lądują wyłącznie te adresy, przy których faktycznie zaznaczono
 * okienko. Reszta zostaje w kolekcji wiadomości i służy wyłącznie do
 * odpowiedzi.
 */
export type Zrodlo = 'demo' | 'rejestracja' | 'formularz';
