'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import { firma } from '@/content/firma';
import { firebaseGotowy } from '@/lib/firebase';
import { zapiszNaListe } from '@/lib/zapisy';
import { LIMITY_ZAPISU, type OpisListy } from '@/content/zapisy';
import { TRESC_ZGODY } from '@/content/zgoda';
import {
  odczytajWybor,
  opiszWybor,
  type Zainteresowanie,
} from '@/content/zainteresowanie';
import { Wymagane } from '@/components/ui/Wymagane';

const pole =
  'h-13 w-full rounded-btn border border-line bg-white px-4 text-[16px] outline-none placeholder:text-muted focus:border-blue lg:text-body';

type Stan = 'gotowy' | 'wysyłam' | 'zapisany' | 'błąd';

/**
 * Zapis na listę — imię, adres i zgoda.
 *
 * Zgoda jest tu **wymagana** i to jest zgodne z prawem, choć wygląda na
 * pierwszy rzut oka odwrotnie. Art. 7 ust. 4 RODO zabrania uzależniać
 * wykonanie usługi od zgody, która nie jest do niej niezbędna — ale na tych
 * stronach usługą **jest** lista. Zgoda nie warunkuje niczego innego, bo nic
 * innego tu nie oferujemy. W formularzu kontaktowym jest odwrotnie i tam
 * okienko musi być nieobowiązkowe.
 *
 * Imię nie jest ozdobą: pierwsza wiadomość ma zaczynać się od „Cześć Marek",
 * a nie od „Dzień dobry".
 *
 * Bez konfiguracji Firebase formularz cofa się do `mailto:` — nigdy nie
 * połknie adresu, nie mając gdzie go zapisać.
 */
export function FormularzZapisu({ opis }: { opis: OpisListy }) {
  const [imie, setImie] = useState('');
  const [mail, setMail] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [pulapka, setPulapka] = useState('');
  const [stan, setStan] = useState<Stan>('gotowy');

  /**
   * Plan i okres wybrane w cenniku, jeśli człowiek przyszedł stamtąd.
   *
   * Czytane z `window` po zamontowaniu, a nie hookiem `useSearchParams` —
   * ten wymaga granicy `Suspense` nad formularzem i przy stronie budowanej
   * statycznie każe pokazać zastępczy stan zamiast pól. Formularz jest tu
   * treścią główną, więc ma się wyrenderować od razu; wybór z cennika to
   * dodatek, który może dojść ułamek sekundy później. Dzięki temu
   * `/zaloguj` zostaje stroną statyczną.
   */
  const [wybor, setWybor] = useState<Zainteresowanie | null>(null);
  useEffect(() => {
    setWybor(odczytajWybor(new URLSearchParams(window.location.search)));
  }, []);

  const kompletne =
    imie.trim().length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail) && zgoda;

  const linkPocztowy = () =>
    `mailto:${firma.email}?subject=${encodeURIComponent(
      `BusiKM · ${opis.lista === 'demo' ? 'powiadom mnie o demo' : 'powiadom mnie o zapisach'}`,
    )}&body=${encodeURIComponent([imie && `Imię: ${imie}`, mail && `E-mail: ${mail}`].filter(Boolean).join('\n'))}`;

  const wyslij = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kompletne || stan === 'wysyłam') return;
    setStan('wysyłam');
    try {
      await zapiszNaListe({
        imie,
        email: mail,
        lista: opis.lista,
        zrodlo: opis.zrodlo,
        zainteresowanie: wybor,
        pulapka,
      });
      setStan('zapisany');
    } catch {
      setStan('błąd');
    }
  };

  if (stan === 'zapisany') {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-card border border-line bg-mist p-6 lg:p-8"
      >
        <div className="text-[19px] font-semibold lg:text-h3">
          Zapisane, {imie.trim().split(/\s+/)[0]}.
        </div>
        <p className="text-[16px] leading-relaxed text-muted lg:text-body">{opis.poZapisie}</p>
      </div>
    );
  }

  return (
    <form onSubmit={wyslij} className="flex flex-col gap-4 lg:gap-5">
      {/*
        Pokazujemy wybór z cennika, zamiast wozić go po cichu. Człowiek widzi,
        że nie przepadł, i ma jak go poprawić — a my nie zbieramy w tle
        niczego, czego nie postawilibyśmy mu przed oczami.
      */}
      {wybor && (
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-btn border border-blue-soft-line bg-blue-soft px-4 py-3 text-[14px] lg:text-caption">
          <span className="text-muted">Wybrany plan:</span>
          <b>{opiszWybor(wybor)}</b>
          <Link
            href="/cennik"
            className="ml-auto font-medium text-blue-dark underline-offset-2 hover:underline"
          >
            zmień
          </Link>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium lg:text-caption">
            Imię
            <Wymagane />
          </span>
          <input
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            maxLength={LIMITY_ZAPISU.imie}
            placeholder="Marek"
            autoComplete="given-name"
            required
            className={pole}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium lg:text-caption">
            Adres e-mail
            <Wymagane />
          </span>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            maxLength={LIMITY_ZAPISU.email}
            placeholder="marek@twojafirma.pl"
            autoComplete="email"
            required
            className={pole}
          />
        </label>
      </div>


      {/* Znaczenie gwiazdki musi być wyjaśnione — WCAG 3.3.2. */}
      <p className="text-[12px] text-muted">
        <span aria-hidden className="text-red-ink">*</span> pola wymagane
      </p>

      {/* Pułapka na boty — człowiek tego pola nie zobaczy i nie zatabuluje. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Nie wypełniaj tego pola
          <input
            tabIndex={-1}
            autoComplete="off"
            value={pulapka}
            onChange={(e) => setPulapka(e.target.value)}
          />
        </label>
      </div>

      {/*
        Brzmienie zgody jest jedno dla całego serwisu i wersjonowane —
        razem z adresem trafia do bazy, bo to na nas spoczywa ciężar dowodu
        (art. 7 ust. 1 RODO). Nie zmieniaj go tutaj: `content/zgoda.ts`.
      */}
      <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-muted lg:text-caption">
        <input
          type="checkbox"
          checked={zgoda}
          onChange={(e) => setZgoda(e.target.checked)}
          required
          className="mt-0.5 size-4.5 flex-none accent-blue"
        />
        <span>
          {TRESC_ZGODY}
          <Wymagane />
        </span>
      </label>

      {firebaseGotowy ? (
        <button
          type="submit"
          disabled={!kompletne || stan === 'wysyłam'}
          className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted lg:h-14 lg:self-start lg:text-body"
        >
          {stan === 'wysyłam' ? 'Zapisuję…' : opis.wezwanie}
        </button>
      ) : (
        <a
          href={linkPocztowy()}
          className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark lg:h-14 lg:self-start lg:text-body"
        >
          {opis.wezwanie}
        </a>
      )}

      <p aria-live="polite" className="text-[13px] leading-relaxed text-muted lg:text-caption">
        {stan === 'błąd' ? (
          <span className="text-ink">
            Nie udało się zapisać. Napisz wprost na{' '}
            <a href={linkPocztowy()} className="text-blue">
              {firma.email}
            </a>{' '}
            — ta droga działa zawsze.
          </span>
        ) : (
          <>
            {opis.obietnica}{' '}
            <Link href="/prywatnosc" className="text-blue">
              Polityka prywatności
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
