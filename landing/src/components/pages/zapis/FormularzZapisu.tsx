'use client';

import { useState } from 'react';
import Link from 'next/link';

import { firma } from '@/content/firma';
import { firebaseGotowy } from '@/lib/firebase';
import { zapiszNaListe } from '@/lib/zapisy';
import { LIMITY_ZAPISU, type OpisListy } from '@/content/zapisy';

const pole =
  'h-13 w-full rounded-btn border border-line bg-white px-4 text-[16px] outline-none placeholder:text-muted focus:border-blue lg:text-body';

type Stan = 'gotowy' | 'wysyłam' | 'zapisany' | 'błąd';

/**
 * Zapis na listę wczesnego dostępu — imię i adres.
 *
 * Imię nie jest ozdobą: pierwsza wiadomość ma zaczynać się od „Cześć Marek",
 * a nie od „Dzień dobry". To jedyny powód, dla którego o nie pytamy, i tak
 * jest napisane pod polem.
 *
 * Bez konfiguracji Firebase formularz cofa się do `mailto:` — ta sama zasada,
 * co w formularzu kontaktowym. Nigdy nie połknie adresu, nie mając gdzie go
 * zapisać.
 */
export function FormularzZapisu({ opis }: { opis: OpisListy }) {
  const [imie, setImie] = useState('');
  const [mail, setMail] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [pulapka, setPulapka] = useState('');
  const [stan, setStan] = useState<Stan>('gotowy');

  const kompletne = imie.trim().length > 0 && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail);

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
        zgodaNaWiesci: zgoda,
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
      <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium lg:text-caption">Imię</span>
          <input
            value={imie}
            onChange={(e) => setImie(e.target.value)}
            maxLength={LIMITY_ZAPISU.imie}
            placeholder="Marek"
            autoComplete="given-name"
            className={pole}
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[14px] font-medium lg:text-caption">Adres e-mail</span>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            maxLength={LIMITY_ZAPISU.email}
            placeholder="marek@twojafirma.pl"
            autoComplete="email"
            className={pole}
          />
        </label>
      </div>

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
        Zgoda jest dobrowolna i dotyczy wyłącznie tego, co ponad jedną
        wiadomość o starcie. Samo wysłanie formularza to prośba o to
        powiadomienie — pytanie o zgodę na coś, o co człowiek właśnie
        poprosił, byłoby pytaniem pozornym.
      */}
      <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-muted lg:text-caption">
        <input
          type="checkbox"
          checked={zgoda}
          onChange={(e) => setZgoda(e.target.checked)}
          className="mt-0.5 size-4.5 flex-none accent-blue"
        />
        <span>Chcę dostawać wiadomości o BusiKM. Nieobowiązkowe.</span>
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
