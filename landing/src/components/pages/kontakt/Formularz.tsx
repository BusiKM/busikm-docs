'use client';

import { useState } from 'react';
import Link from 'next/link';

import { firma } from '@/content/firma';
import { firebaseGotowy } from '@/lib/firebase';
import { wyslijWiadomosc, tematy, LIMITY } from '@/lib/wiadomosci';
import { TRESC_ZGODY } from '@/content/zgoda';
import { Wymagane } from '@/components/ui/Wymagane';

const pole =
  'h-13 w-full rounded-btn border border-line bg-white px-4 text-[16px] outline-none placeholder:text-muted focus:border-blue lg:text-body';

type Stan = 'gotowy' | 'wysyłam' | 'wysłane' | 'błąd';

/**
 * Formularz kontaktowy.
 *
 * Wiadomość ląduje w Firestore (kolekcja `wiadomosci`), a stamtąd trasa
 * `/api/powiadom` wysyła powiadomienie na skrzynkę. Ten sam układ, co
 * w movgranto-homepage.
 *
 * **Bez konfiguracji Firebase formularz cofa się do `mailto:`** — otwiera
 * pocztę czytelnika z gotową treścią. To celowe: przy pracy lokalnej,
 * w podglądach gałęzi i gdyby konfiguracja kiedykolwiek zniknęła,
 * formularz nadal działa. Nigdy nie połknie wiadomości i nie powie
 * „dziękujemy", nie mając gdzie jej zapisać.
 */
export function Formularz() {
  const [imie, setImie] = useState('');
  const [mail, setMail] = useState('');
  const [temat, setTemat] = useState(0);
  const [tresc, setTresc] = useState('');
  const [zgoda, setZgoda] = useState(false);
  const [pulapka, setPulapka] = useState('');
  const [stan, setStan] = useState<Stan>('gotowy');

  const kompletne = imie.trim() && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail) && tresc.trim();

  const linkPocztowy = () => {
    const podpis = [imie && `— ${imie}`, mail].filter(Boolean).join('\n');
    const body = [tresc, podpis].filter(Boolean).join('\n\n');
    return `mailto:${firma.email}?subject=${encodeURIComponent(
      `BusiKM · ${tematy[temat]}`,
    )}&body=${encodeURIComponent(body)}`;
  };

  const wyslij = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kompletne || stan === 'wysyłam') return;
    setStan('wysyłam');
    try {
      await wyslijWiadomosc({
        imie,
        email: mail,
        temat: tematy[temat],
        tresc,
        zgoda,
        pulapka,
      });
      setStan('wysłane');
      setImie('');
      setMail('');
      setTresc('');
      setZgoda(false);
    } catch {
      setStan('błąd');
    }
  };

  if (stan === 'wysłane') {
    return (
      <div
        role="status"
        className="flex flex-col gap-3 rounded-card border border-line bg-mist p-6 lg:p-8"
      >
        <div className="text-[19px] font-semibold lg:text-h3">Wiadomość poszła.</div>
        <p className="text-[16px] leading-relaxed text-muted lg:text-body">
          Odpowiadamy tego samego dnia roboczego, na adres, który podałeś. Jeśli sprawa
          jest pilna, napisz wprost na{' '}
          <a href={`mailto:${firma.email}`} className="text-blue">
            {firma.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStan('gotowy')}
          className="self-start text-[15px] font-semibold text-blue lg:text-body"
        >
          Napisz jeszcze raz
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={wyslij} className="flex flex-col gap-5 lg:gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">
          Imię
          <Wymagane />
        </span>
        <input
          value={imie}
          onChange={(e) => setImie(e.target.value)}
          maxLength={LIMITY.imie}
          placeholder="Marek"
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
          maxLength={LIMITY.email}
          placeholder="marek@twojafirma.pl"
          required
          className={pole}
        />
      </label>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 text-[14px] font-medium lg:text-caption">Czego dotyczy</legend>
        <div className="flex flex-wrap gap-2">
          {tematy.map((t, i) => (
            <button
              key={t}
              type="button"
              aria-pressed={i === temat}
              onClick={() => setTemat(i)}
              className={`cursor-pointer rounded-full border px-4 py-2.5 text-[14px] transition-colors lg:text-caption ${
                i === temat
                  ? 'border-ink bg-ink text-paper'
                  : 'border-line bg-white text-ink hover:border-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="text-[14px] font-medium lg:text-caption">
          Wiadomość
          <Wymagane />
        </span>
        <textarea
          value={tresc}
          onChange={(e) => setTresc(e.target.value)}
          rows={6}
          maxLength={LIMITY.tresc}
          placeholder="Napisz, co się dzieje albo o co chcesz zapytać."
          required
          className="w-full resize-y rounded-btn border border-line bg-white px-4 py-3.5 text-[16px] leading-relaxed outline-none placeholder:text-muted focus:border-blue lg:text-body"
        />
      </label>


      {/* Znaczenie gwiazdki musi być wyjaśnione — WCAG 3.3.2. */}
      <p className="text-[12px] text-muted">
        <span aria-hidden className="text-red-ink">*</span> pola wymagane
      </p>

      {/*
        Pułapka na boty. Człowiek tego pola nie zobaczy i nie zatabuluje do
        niego; automat wypełniający wszystko po kolei owszem. Wypełnione =
        cicho udajemy sukces i nic nie zapisujemy.
      */}
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
        Zgoda **nieobowiązkowa** i to jest tu istotne. Usługą jest odpowiedź
        na pytanie — uzależnienie jej od zgody marketingowej byłoby
        warunkowaniem zakazanym przez art. 7 ust. 4 RODO. Na stronach zapisu
        jest odwrotnie, bo tam usługą jest sama lista.
      */}
      {firebaseGotowy && (
        <label className="flex cursor-pointer items-start gap-3 text-[14px] leading-relaxed text-muted lg:text-caption">
          <input
            type="checkbox"
            checked={zgoda}
            onChange={(e) => setZgoda(e.target.checked)}
            className="mt-0.5 size-4.5 flex-none accent-blue"
          />
          <span>{TRESC_ZGODY}</span>
        </label>
      )}

      <div className="flex flex-col gap-3">
        {firebaseGotowy ? (
          <button
            type="submit"
            disabled={!kompletne || stan === 'wysyłam'}
            className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark disabled:cursor-not-allowed disabled:bg-line disabled:text-muted lg:h-14 lg:self-start lg:text-body"
          >
            {stan === 'wysyłam' ? 'Wysyłam…' : 'Wyślij wiadomość'}
          </button>
        ) : (
          // Prawdziwy odnośnik, nie przycisk: działa prawy przycisk myszy,
          // kopiowanie adresu i otwarcie w nowej karcie.
          <a
            href={linkPocztowy()}
            className="inline-flex h-13 items-center justify-center rounded-btn bg-blue px-7 text-[16px] font-semibold text-white transition-colors hover:bg-blue-dark lg:h-14 lg:self-start lg:text-body"
          >
            Wyślij wiadomość
          </a>
        )}

        <p aria-live="polite" className="text-[13px] leading-relaxed text-muted lg:text-caption">
          {stan === 'błąd' ? (
            <span className="text-ink">
              Nie udało się wysłać. Napisz wprost na{' '}
              <a href={linkPocztowy()} className="text-blue">
                {firma.email}
              </a>{' '}
              — ta droga działa zawsze.
            </span>
          ) : firebaseGotowy ? (
            <>
              Odpowiadamy na podany adres. Twoje dane wykorzystujemy wyłącznie do
              odpowiedzi na tę wiadomość —{' '}
              <Link href="/prywatnosc" className="text-blue">
                polityka prywatności
              </Link>
              .
            </>
          ) : (
            <>
              Otworzy się Twój program pocztowy z gotową wiadomością. Odpowiadamy na ten
              sam adres, z którego piszesz.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
